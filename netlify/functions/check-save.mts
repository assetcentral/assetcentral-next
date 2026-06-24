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

/** Inline-styled HTML — keeps the email client-agnostic. Plain navy
 *  brand palette, no images, no remote assets. */
function renderEmail({ inputs, result }: Payload): string {
  const v = result.verdict;
  const toneColor = TONE_COLOR[v.tone];
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Your AssetCentral check</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;line-height:1.5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <tr><td style="padding:24px 28px;border-bottom:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4f6ef7;font-weight:700;">AssetCentral · property check</p>
          <h1 style="margin:8px 0 0 0;font-size:24px;line-height:1.2;color:#1a1a2e;font-weight:700;">Your verdict: ${escapeHtml(v.label)}</h1>
          <p style="margin:8px 0 0 0;font-size:14px;color:#64748b;">${escapeHtml(v.summary)}</p>
        </td></tr>

        <tr><td style="padding:20px 28px;">
          <p style="margin:0 0 12px 0;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#64748b;font-weight:700;">Key numbers</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;">
            <tr><td style="padding:6px 0;color:#64748b;">Purchase price</td><td align="right" style="padding:6px 0;color:#0f172a;font-weight:600;">${fmtMoney(inputs.price)}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Monthly mortgage</td><td align="right" style="padding:6px 0;color:#0f172a;font-weight:600;">${fmtMoney(result.monthlyMortgage)}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Gross / net yield</td><td align="right" style="padding:6px 0;color:#0f172a;font-weight:600;">${result.grossYieldPct.toFixed(1)}% / ${result.netYieldPct.toFixed(1)}%</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Monthly cash flow</td><td align="right" style="padding:6px 0;color:${result.monthlyCashFlow >= 0 ? "#16a34a" : "#dc2626"};font-weight:700;">${fmtMoney(result.monthlyCashFlow)}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">DSCR</td><td align="right" style="padding:6px 0;color:#0f172a;font-weight:600;">${result.dscr.toFixed(2)}x</td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:0 28px 12px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;">
            <tr><td style="padding:14px 16px;">
              <p style="margin:0;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#dc2626;font-weight:700;">Red flag · ${escapeHtml(v.redFlag.title)}</p>
              <p style="margin:6px 0 0 0;font-size:14px;color:#0f172a;">${escapeHtml(v.redFlag.body)}</p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:0 28px 24px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border:2px solid #16a34a;border-radius:8px;">
            <tr><td style="padding:14px 16px;">
              <p style="margin:0;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#16a34a;font-weight:700;">One thing to fix · ${escapeHtml(v.improvement.title)}</p>
              <p style="margin:6px 0 0 0;font-size:14px;color:#0f172a;">${escapeHtml(v.improvement.body)}</p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="background:#1a1a2e;color:#ffffff;padding:24px 28px;">
          <p style="margin:0;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#4f6ef7;font-weight:700;">Going deeper · AssetCentral Pro</p>
          <p style="margin:6px 0 14px 0;font-size:14px;color:rgba(255,255,255,0.85);">10-year forecast, rate-shock + lease-rollover stress tests, lender-ready credit packs, the full 5-agent AI team — from €49/month.</p>
          <a href="https://assetcentral.ai/signup?plan=pro_monthly&amp;intent=direct" style="display:inline-block;background:#ffffff;color:#1a1a2e;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px;">Start a 7-day Pro trial &rarr;</a>
        </td></tr>

        <tr><td style="padding:18px 28px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:11px;line-height:1.5;">
          <p style="margin:0;">Verdict generated from the inputs you provided. Numbers are illustrative, not financial advice — please confirm with a qualified mortgage, tax or legal advisor before acting. <span style="color:${toneColor};font-weight:700;">${escapeHtml(v.label.toUpperCase())}</span></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
