// /.netlify/functions/check-save — email + (eventual) lead-capture
// for the /check funnel.
//
// Phase 2 ships: POST handler that validates inputs, builds a clean
// HTML email of the verdict, and ships it via Resend's REST API.
// No Resend SDK dep — just fetch + JSON. Keeps the function bundle
// small enough to live inside the Netlify deploy without pulling in
// another package.
//
// Required Netlify env vars (set in the site's build settings):
//   RESEND_API_KEY            — Resend API key
//   RESEND_FROM_EMAIL         — e.g. "AssetCentral <hello@assetcentral.ai>"
//                               (must be a verified sender on Resend)
//
// Optional:
//   CHECK_SAVE_BCC            — comma-separated emails to BCC every
//                               result to (useful for ops visibility
//                               on volume + content during launch)
//
// If RESEND_API_KEY is unset, the function 503s with a clear message
// rather than silently dropping the email — the client soft-fails the
// UI in that case.

import type { Context } from "@netlify/functions";

// ── Types (mirror lib/check-engine.ts) ──────────────────────────────

interface CheckInputs {
  price: number;
  deposit: number;
  ratePct: number;
  termYrs: number;
  monthlyRent: number;
  monthlyServiceCharge: number;
  monthlyMaintenance: number;
  managementPct: number;
  vacancyMonths: number;
}

interface Verdict {
  tone: "attractive" | "borderline" | "risky";
  label: string;
  summary: string;
  redFlag: { title: string; body: string };
  improvement: { title: string; body: string };
}

interface CheckResult {
  monthlyMortgage: number;
  effectiveAnnualRent: number;
  annualOpex: number;
  annualDebtService: number;
  monthlyCashFlow: number;
  grossYieldPct: number;
  netYieldPct: number;
  dscr: number;
  verdict: Verdict;
}

interface Payload {
  email: string;
  inputs: CheckInputs;
  result: CheckResult;
}

// ── Handler ─────────────────────────────────────────────────────────

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Light validation — enough to reject junk, not enough to be picky.
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return json({ error: "invalid_email" }, 400);
  }
  if (!payload.inputs || !payload.result) {
    return json({ error: "missing_payload" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    // Soft-config-failure — tell the client clearly so we can surface
    // it in logs without silently dropping leads.
    console.error("[check-save] missing RESEND_API_KEY or RESEND_FROM_EMAIL");
    return json({ error: "email_not_configured" }, 503);
  }

  const bccCsv = process.env.CHECK_SAVE_BCC;
  const bcc = bccCsv
    ? bccCsv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;

  const subject = `Your AssetCentral property check — ${payload.result.verdict.label}`;
  const html = renderEmail(payload);

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [payload.email],
        ...(bcc && bcc.length ? { bcc } : {}),
        subject,
        html,
      }),
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      console.error("[check-save] resend_error", resp.status, text);
      return json({ error: "send_failed", upstream: resp.status }, 502);
    }
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("[check-save] fetch_error", err);
    return json({ error: "send_failed" }, 502);
  }
};

// ── Helpers ─────────────────────────────────────────────────────────

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function fmtMoney(n: number): string {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(Math.round(n));
  return `${sign}£${abs.toLocaleString("en-GB")}`;
}

const TONE_COLOR: Record<Verdict["tone"], string> = {
  attractive: "#16a34a",
  borderline: "#d97706",
  risky: "#dc2626",
};

const TONE_BG_SOFT: Record<Verdict["tone"], string> = {
  attractive: "#ecfdf5",
  borderline: "#fef3c7",
  risky: "#fee2e2",
};

// Ordered worst → best so the meter reads left-to-right like a risk
// scale. The active segment is filled with the tone colour; inactive
// segments stay neutral grey so the highlighted one truly pops.
const VERDICT_SCALE: { tone: Verdict["tone"]; label: string; sub: string }[] = [
  { tone: "risky", label: "Risky", sub: "Don't proceed yet" },
  { tone: "borderline", label: "Borderline", sub: "Needs work" },
  { tone: "attractive", label: "Attractive", sub: "Worth pursuing" },
];

/** Inline-styled HTML — keeps the email client-agnostic. Plain navy
 *  brand palette. Two structural additions over the v1 email:
 *
 *  1. A "smart graphic" verdict meter — a 3-segment scale (Risky /
 *     Borderline / Attractive) where the active verdict is the only
 *     one filled with its tone colour, so the reader sees where the
 *     property landed at a glance before reading any numbers.
 *  2. A three-tier upgrade strip (Free / Individual / Pro) instead
 *     of the single Pro CTA — mirrors the live PricingPreview so the
 *     reader can pick the right next step rather than being asked to
 *     jump straight to Pro. Individual is the "Most popular" card. */
function renderEmail({ inputs, result }: Payload): string {
  const v = result.verdict;
  const toneColor = TONE_COLOR[v.tone];
  const toneSoft = TONE_BG_SOFT[v.tone];
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Your AssetCentral check</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;line-height:1.5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">

        <!-- Header -->
        <tr><td style="padding:24px 28px 18px 28px;border-bottom:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4f6ef7;font-weight:700;">AssetCentral · AI property check</p>
          <h1 style="margin:8px 0 0 0;font-size:26px;line-height:1.2;color:#1a1a2e;font-weight:700;">Your verdict: ${escapeHtml(v.label)}</h1>
          <p style="margin:10px 0 0 0;font-size:14px;color:#475569;">${escapeHtml(v.summary)}</p>
        </td></tr>

        <!-- Smart graphic: verdict scale meter -->
        <tr><td style="padding:22px 28px 6px 28px;">
          <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#64748b;font-weight:700;">AI verdict scale</p>
          ${renderVerdictMeter(v.tone)}
        </td></tr>

        <!-- Key numbers -->
        <tr><td style="padding:18px 28px 4px 28px;">
          <p style="margin:0 0 12px 0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#64748b;font-weight:700;">Key numbers</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;">
            <tr><td style="padding:6px 0;color:#64748b;">Purchase price</td><td align="right" style="padding:6px 0;color:#0f172a;font-weight:600;">${fmtMoney(inputs.price)}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Monthly mortgage</td><td align="right" style="padding:6px 0;color:#0f172a;font-weight:600;">${fmtMoney(result.monthlyMortgage)}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Gross / net yield</td><td align="right" style="padding:6px 0;color:#0f172a;font-weight:600;">${result.grossYieldPct.toFixed(1)}% / ${result.netYieldPct.toFixed(1)}%</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Monthly cash flow</td><td align="right" style="padding:6px 0;color:${result.monthlyCashFlow >= 0 ? "#16a34a" : "#dc2626"};font-weight:700;">${fmtMoney(result.monthlyCashFlow)}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">DSCR</td><td align="right" style="padding:6px 0;color:#0f172a;font-weight:600;">${result.dscr.toFixed(2)}x</td></tr>
          </table>
        </td></tr>

        <!-- Red flag card -->
        <tr><td style="padding:14px 28px 12px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;">
            <tr><td style="padding:14px 16px;">
              <p style="margin:0;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#dc2626;font-weight:700;">Red flag · ${escapeHtml(v.redFlag.title)}</p>
              <p style="margin:6px 0 0 0;font-size:14px;color:#0f172a;">${escapeHtml(v.redFlag.body)}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- One thing to fix card -->
        <tr><td style="padding:0 28px 22px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;">
            <tr><td style="padding:14px 16px;">
              <p style="margin:0;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#16a34a;font-weight:700;">One thing to fix · ${escapeHtml(v.improvement.title)}</p>
              <p style="margin:6px 0 0 0;font-size:14px;color:#0f172a;">${escapeHtml(v.improvement.body)}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Three-tier upgrade strip -->
        <tr><td style="background:#1a1a2e;padding:26px 28px 22px 28px;">
          <p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4f6ef7;font-weight:700;">What you unlock next</p>
          <h2 style="margin:6px 0 4px 0;font-size:20px;line-height:1.25;color:#ffffff;font-weight:700;">Pick the level of help you want.</h2>
          <p style="margin:0 0 18px 0;font-size:13.5px;color:rgba(255,255,255,0.7);">Free covers another check. Individual unlocks the full report. Pro brings the whole AI team.</p>

          ${renderPlanCard({
            tier: "Free",
            tagline: "Run another check",
            price: "€0",
            cadence: "forever",
            blurb: "No card, no commitment. Use the calculators and AI check whenever you need a quick read.",
            features: [
              "8 free Level 1 calculators",
              "Free AI verdict + red flag",
              "3-row stress test on every calculator",
              "1 saved property to track over time",
            ],
            href: "https://assetcentral.ai/check",
            ctaLabel: "Run another check",
            popular: false,
          })}

          ${renderPlanCard({
            tier: "Individual",
            tagline: "Unlock the full property report",
            price: "€19",
            cadence: "per month",
            blurb: "For a serious decision on one or several properties. 7-day trial, no card.",
            features: [
              "Everything in Free, plus:",
              "Full property decision report (PDF + Word)",
              "10-year cash-flow forecast",
              "Rate / rent / capital-growth scenarios",
              "Sell-vs-hold + refinance modelling",
            ],
            href: "https://assetcentral.ai/signup?plan=individual_monthly&intent=direct",
            ctaLabel: "Start a 7-day trial",
            popular: true,
          })}

          ${renderPlanCard({
            tier: "Pro",
            tagline: "Model, monitor and manage your portfolio",
            price: "€49",
            cadence: "per month",
            blurb: "For owners and investors with 2–50 properties. 7-day trial, no card.",
            features: [
              "Everything in Individual, plus:",
              "Up to 50 properties + portfolio dashboard",
              "5-agent AI team (CIO · CFO · COO · CEO · PA)",
              "22 monitoring alerts (email + WhatsApp)",
              "Voice line — call your AI team",
            ],
            href: "https://assetcentral.ai/signup?plan=pro_monthly&intent=direct",
            ctaLabel: "Start a 7-day Pro trial",
            popular: false,
          })}
        </td></tr>

        <!-- Footer disclaimer -->
        <tr><td style="padding:18px 28px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:11px;line-height:1.5;background:#f8fafc;">
          <p style="margin:0;">Verdict generated from the inputs you provided. Numbers are illustrative, not financial advice — please confirm with a qualified mortgage, tax or legal advisor before acting. <span style="display:inline-block;margin-left:4px;padding:1px 8px;border-radius:9999px;background:${toneSoft};color:${toneColor};font-weight:700;letter-spacing:.05em;">${escapeHtml(v.label.toUpperCase())}</span></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ── Smart graphic: verdict meter ────────────────────────────────────
//
// Three pill cells in a single row. The cell whose tone matches the
// AI verdict gets filled with that tone's brand colour; the others
// stay muted. The active cell also carries a small ▲ marker so the
// graphic reads correctly even when colour rendering is muted (dark
// mode, accessibility filters, BW print).
function renderVerdictMeter(active: Verdict["tone"]): string {
  const cells = VERDICT_SCALE.map((seg) => {
    const isActive = seg.tone === active;
    const bg = isActive ? TONE_COLOR[seg.tone] : "#f1f5f9";
    const labelColor = isActive ? "#ffffff" : "#94a3b8";
    const subColor = isActive ? "rgba(255,255,255,0.85)" : "#cbd5e1";
    const marker = isActive
      ? `<div style="margin-top:6px;font-size:14px;line-height:1;color:#ffffff;">&#9650;</div>`
      : "";
    return `<td width="33.33%" valign="middle" align="center" style="padding:14px 6px;background:${bg};border-right:2px solid #ffffff;">
      <div style="font-size:12.5px;font-weight:700;color:${labelColor};letter-spacing:.06em;text-transform:uppercase;">${escapeHtml(seg.label)}</div>
      <div style="margin-top:3px;font-size:10.5px;color:${subColor};">${escapeHtml(seg.sub)}</div>
      ${marker}
    </td>`;
  }).join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;table-layout:fixed;">
    <tr>${cells}</tr>
  </table>`;
}

// ── Three-tier upgrade card ─────────────────────────────────────────
//
// Renders a single dark-on-navy plan card with a feature list and a
// pill CTA. Three of these stack vertically under the upgrade strip
// header — side-by-side breaks in too many email clients to be worth
// the layout effort. Popular plan gets an accent border + chip.
function renderPlanCard(p: {
  tier: string;
  tagline: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  href: string;
  ctaLabel: string;
  popular: boolean;
}): string {
  const borderColor = p.popular ? "#4f6ef7" : "rgba(255,255,255,0.12)";
  const popularChip = p.popular
    ? `<span style="display:inline-block;margin-bottom:8px;padding:2px 8px;border-radius:9999px;background:#4f6ef7;color:#ffffff;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Most popular</span>`
    : "";
  const featureItems = p.features
    .map(
      (f) =>
        `<tr><td valign="top" style="padding:3px 0 3px 0;color:rgba(255,255,255,0.82);font-size:13px;line-height:1.5;"><span style="display:inline-block;width:6px;height:6px;border-radius:9999px;background:#4f6ef7;vertical-align:middle;margin-right:8px;"></span>${escapeHtml(f)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:12px;background:rgba(255,255,255,0.04);border:1px solid ${borderColor};border-radius:10px;">
    <tr><td style="padding:18px 18px 16px 18px;">
      ${popularChip}
      <p style="margin:0;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#4f6ef7;font-weight:700;">${escapeHtml(p.tier)}</p>
      <h3 style="margin:4px 0 2px 0;font-size:18px;line-height:1.25;color:#ffffff;font-weight:600;">${escapeHtml(p.tagline)}</h3>
      <p style="margin:8px 0 0 0;">
        <span style="font-size:26px;font-weight:700;color:#ffffff;">${escapeHtml(p.price)}</span>
        <span style="font-size:12.5px;color:rgba(255,255,255,0.6);margin-left:4px;">${escapeHtml(p.cadence)}</span>
      </p>
      <p style="margin:10px 0 12px 0;font-size:13px;color:rgba(255,255,255,0.7);line-height:1.5;">${escapeHtml(p.blurb)}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${featureItems}</table>
      <p style="margin:14px 0 0 0;">
        <a href="${escapeHtml(p.href)}" style="display:inline-block;background:${p.popular ? "#ffffff" : "transparent"};color:${p.popular ? "#1a1a2e" : "#ffffff"};border:1px solid ${p.popular ? "#ffffff" : "rgba(255,255,255,0.35)"};padding:9px 16px;border-radius:6px;text-decoration:none;font-weight:700;font-size:13.5px;">${escapeHtml(p.ctaLabel)} &rarr;</a>
      </p>
    </td></tr>
  </table>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
