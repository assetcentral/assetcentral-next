// /features — restructured around the full five-stage AssetCentral
// framework that the homepage MessyInClearOutSection introduces:
//
//   01 · Capture   →  PA  — get every scrap of property data in
//   02 · Structure →  CFO — clean it into a comparable asset record
//   03 · Model     →  CIO — project it forward across scenarios
//   04 · Monitor   →  CEO — watch yield, cash flow, debt and risk
//   05 · Manage    →  COO — turn insight into recommended actions
//
// Reading order:
//   1. Hero — what the page is for
//   2. TeamGalleryStrip — the 5 portraits. Sits high so visitors
//      coming from "AI team" entries in nav land on faces fast.
//   3. Five pillar blocks. Each pillar lists the lead agent(s), 2–5
//      capabilities and a mini mockup from FeatureMinis (with the
//      Capture and Structure pillars using lightweight inline mockups
//      defined at the bottom of this file).
//   4. ComparisonTable + final CTA — unchanged from prior version.

import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { TeamGalleryStrip } from "@/components/marketing/TeamGalleryStrip";
import {
  AcquisitionMini,
  AlertsMini,
  CashflowMini,
  IngestionMini,
  LoanMini,
  OperatorMini,
  PortfolioMini,
  RefinanceMini,
  ScoreMini,
  SellHoldMini,
  YieldOptMini,
} from "@/components/marketing/FeatureMinis";

export const metadata: Metadata = {
  title: "Features — Capture · Structure · Model · Monitor · Manage",
  description:
    "Five stages, five AI agents. Capture every scrap of data, structure it into a clean property record, model the decision, monitor live, manage the recommended actions.",
  alternates: { canonical: "/features" },
};

interface Capability {
  title: string;
  bullets: string[];
  mockup: React.ReactNode;
  flip?: boolean;
}

interface Pillar {
  /** Anchor + identifier. Matches the corresponding stage on
   *  /how-it-works (#capture, #structure, …). */
  id: "capture" | "structure" | "model" | "monitor" | "manage";
  /** Step label, e.g. "01 · Capture". */
  number: string;
  /** Headline H2. */
  headline: string;
  /** One-line intro under the headline. */
  intro: string;
  /** Per-pillar agent leads — drawn from the same 5 names used on
   *  the homepage MeetTheTeamSection. Renders as small role chips
   *  under the headline so the team faces above tie to specific
   *  pillars below. */
  leads: { acronym: string; title: string; bandClass: string; href: string }[];
  /** Two or more capability blocks. Each one alternates left/right
   *  layout. */
  capabilities: Capability[];
  /** Background colour for the pillar section — alternates surface
   *  / white down the page for visual rhythm. */
  background: "white" | "surface";
}

const PILLARS: Pillar[] = [
  {
    id: "capture",
    number: "01 · Capture",
    headline: "Capture every scrap of property data — automatically.",
    intro:
      "Forward emails, photograph invoices, drop spreadsheets, talk to your team by voice. Your Personal Assistant catches it all and routes it to the right asset before anything is asked of you.",
    leads: [
      {
        acronym: "PA",
        title: "Personal Assistant",
        bandClass: "bg-[color:var(--color-pa-mid)]",
        href: "/ai-property-pa",
      },
    ],
    capabilities: [
      {
        title: "Forward it. We read it. Nothing slips through.",
        bullets: [
          "Email statements, WhatsApp documents, photographed invoices",
          "AI extracts dates and amounts; everything filed against the right asset",
          "22 distinct alert types fed straight from incoming data",
        ],
        mockup: <IngestionMini />,
      },
      {
        title: "Voice in. Spreadsheet in. CSV in.",
        bullets: [
          "Call your AI team and talk through a new property — no typing",
          "Paste an existing portfolio spreadsheet — AI maps the columns for you",
          "API + email ingestion for power users",
        ],
        mockup: <CaptureChannelsMini />,
        flip: true,
      },
    ],
    background: "white",
  },
  {
    id: "structure",
    number: "02 · Structure",
    headline: "Structure raw inputs into a clean, comparable property record.",
    intro:
      "Mixed currencies, country-specific tax, irregular statements, photographed contracts — your CFO normalises all of it into one comparable record per asset, so every downstream stage works off the same numbers.",
    leads: [
      {
        acronym: "CFO",
        title: "Chief Financial Officer",
        bandClass: "bg-[color:var(--color-cfo-mid)]",
        href: "/ai-property-cfo",
      },
    ],
    capabilities: [
      {
        title: "One asset record. Every field. Every currency.",
        bullets: [
          "Multi-currency conversion to your base currency, daily FX",
          "Country-specific tax framing applied per asset",
          "Lease, loan, ownership and statement fields normalised",
        ],
        mockup: <StructureRecordMini />,
      },
      {
        title: "A free AI verdict from the structured data.",
        bullets: [
          "Attractive / Borderline / Risky — instant read on any new property",
          "Key number + biggest red flag + suggested next move",
          "Same engine the Individual and Pro tiers run on every asset",
        ],
        mockup: <ScoreMini />,
        flip: true,
      },
    ],
    background: "surface",
  },
  {
    id: "model",
    number: "03 · Model",
    headline: "Model decisions before committing capital.",
    intro:
      "Underwrite every purchase, refinance, renovation, sale and acquisition the way a fund would — with 10-year cash-flow forecasts and proper scenario maths.",
    leads: [
      {
        acronym: "CIO",
        title: "Chief Investment Officer",
        bandClass: "bg-[color:var(--color-cio-mid)]",
        href: "/ai-property-cio",
      },
      {
        acronym: "CFO",
        title: "Chief Financial Officer",
        bandClass: "bg-[color:var(--color-cfo-mid)]",
        href: "/ai-property-cfo",
      },
    ],
    capabilities: [
      {
        title: "Sell or hold — modelled, per asset.",
        bullets: [
          "Capital gain vs cumulative yield NPV at any horizon",
          "Off-plan value acceleration curve near handover",
          "Optimal exit window recommendation",
        ],
        mockup: <SellHoldMini />,
      },
      {
        title: "New acquisition — portfolio impact, before you commit.",
        bullets: [
          "Simulate any new property in seconds",
          "Compare base / bull / bear scenarios",
          "Blended yield, leverage and DSCR before vs after acquisition",
        ],
        mockup: <AcquisitionMini />,
        flip: true,
      },
      {
        title: "Refinance pack — lender-ready, in minutes.",
        bullets: [
          "Rent roll, valuation evidence, DSCR calculation",
          "Comparable transactions assembled from your portfolio data",
          "Branded PDF, ready to send to the lender",
        ],
        mockup: <RefinanceMini />,
      },
    ],
    background: "white",
  },
  {
    id: "monitor",
    number: "04 · Monitor",
    headline: "Monitor yield, cash flow, debt and risk — live.",
    intro:
      "Most owners can't tell you their real net yield. AssetCentral can — to the basis point, after vacancy, costs, mortgage, fees and tax, in your currency.",
    leads: [
      {
        acronym: "CFO",
        title: "Chief Financial Officer",
        bandClass: "bg-[color:var(--color-cfo-mid)]",
        href: "/ai-property-cfo",
      },
      {
        acronym: "COO",
        title: "Chief Operations Officer",
        bandClass: "bg-[color:var(--color-coo-mid)]",
        href: "/ai-property-coo",
      },
    ],
    capabilities: [
      {
        title: "Real net yield. Live.",
        bullets: [
          "Real net yield per asset — after vacancy, costs, mortgage, fees, tax",
          "Multi-currency conversion to your base currency, daily FX",
          "Colour-coded performance signals at a glance",
        ],
        mockup: <PortfolioMini />,
      },
      {
        title: "Rate reversions — caught 90 days out.",
        bullets: [
          "Rate reversion alerts 90 days out, per loan",
          "Full payment history per loan, per currency",
          "Automatic cashflow impact when a rate changes",
        ],
        mockup: <LoanMini />,
        flip: true,
      },
      {
        title: "No cashflow surprises. Ever.",
        bullets: [
          "Stage payments, mortgages, capex, rent — one calendar",
          "12 months ahead, every currency converted",
          "Alert when any month is projected to go negative",
        ],
        mockup: <CashflowMini />,
      },
    ],
    background: "surface",
  },
  {
    id: "manage",
    number: "05 · Manage",
    headline: "Manage the work that actually protects returns.",
    intro:
      "Operators, statements, leases, rate reviews, document chases — the unglamorous monthly work that erodes returns when nobody owns it. Your AI team owns it.",
    leads: [
      {
        acronym: "CEO",
        title: "Chief Executive",
        bandClass: "bg-[color:var(--color-ceo-mid)]",
        href: "/ai-property-ceo",
      },
      {
        acronym: "COO",
        title: "Chief Operations Officer",
        bandClass: "bg-[color:var(--color-coo-mid)]",
        href: "/ai-property-coo",
      },
      {
        acronym: "PA",
        title: "Personal Assistant",
        bandClass: "bg-[color:var(--color-pa-mid)]",
        href: "/ai-property-pa",
      },
    ],
    capabilities: [
      {
        title: "Ranked actions, with the reasoning underneath.",
        bullets: [
          "Yield vs benchmark, leverage levels, cashflow resilience",
          "Risk events combined into a single ranked action list",
          "Plain-English action bullets, ranked by impact",
        ],
        mockup: <AlertsMini />,
      },
      {
        title: "Your short-term rental operator — audited monthly.",
        bullets: [
          "Verifies statements against expected bookings and rates",
          "Flags under-performance vs market occupancy",
          "Models self-management vs agency cost",
        ],
        mockup: <OperatorMini />,
        flip: true,
      },
      {
        title: "Your rent vs the market. To the euro.",
        bullets: [
          "Area median rent from market data",
          "Monthly upside calculated in your currency",
          "Rent review date tracked per tenancy",
        ],
        mockup: <YieldOptMini />,
      },
    ],
    background: "white",
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <div className="max-w-3xl">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] mb-4 font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Features
            </p>
            <h1
              className="text-[44px] lg:text-[56px] leading-[1.05] text-[color:var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Capture · Structure · Model · Monitor · Manage.
              <br />
              Run by five AI agents.
            </h1>
            <p
              className="mt-5 text-[17px] lg:text-[19px] leading-[1.55] text-[color:var(--color-muted)] max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The infrastructure a property fund runs on, scaled to private
              owners with 2&ndash;50 properties. Five stages, one per agent —
              capture, structure, model, monitor, manage. You make the
              decisions, the team does everything else.
            </p>
            <div
              className="mt-7 flex flex-wrap gap-2.5 text-[13px]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {[
                { id: "capture", label: "01 · Capture" },
                { id: "structure", label: "02 · Structure" },
                { id: "model", label: "03 · Model" },
                { id: "monitor", label: "04 · Monitor" },
                { id: "manage", label: "05 · Manage" },
              ].map((s) => (
                <Link
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center justify-center min-h-[40px] px-3.5 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] font-semibold transition hover:border-[color:var(--color-navy)]"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI team strip — keeps the 5 portraits visible on /features.
           Sits high so a visitor landing from a "Meet the team" nav
           entry sees faces before walls of capability bullets. ── */}
      <TeamGalleryStrip
        eyebrow="Your AI property team"
        heading="One agent per stage. Five stages, five agents."
        body="PA captures. CFO structures. CIO models. CEO monitors. COO manages. Click any face to read the per-agent detail page."
      />

      {/* ── Three pillars ──────────────────────────────────────── */}
      {PILLARS.map((p) => (
        <PillarSection key={p.id} pillar={p} />
      ))}

      {/* ── Comparison table ───────────────────────────────────── */}
      <ComparisonTable />

      {/* ── End CTA ────────────────────────────────────────────── */}
      <section className="bg-[color:var(--color-surface)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-20 text-center">
          <h2
            className="text-[32px] lg:text-[40px] leading-[1.1] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            First property added. Five minutes.
          </h2>
          <p
            className="mt-4 text-[16.5px] text-[color:var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            See your real yield. Let your CEO rank the actions that could
            improve returns. From €19/month — 7-day trial on every tier.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup?plan=pro_monthly&intent=direct"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-[color:var(--color-navy)] text-white text-[14.5px] font-semibold hover:bg-[color:var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Subscribe now
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] text-[14.5px] font-semibold transition hover:border-[color:var(--color-navy)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Capture pillar inline mockup ────────────────────────────────────
//
// Three intake channels in a column: Voice, Spreadsheet, Email/API. Each
// row shows a small chip + a one-line "what came in" example so the
// reader sees that ingestion is genuinely multi-modal, not just email
// forwarding. Stays inline (no SVG file) because the visual is just a
// three-row table — adding a separate FeatureMinis export for one page
// would be overhead.
function CaptureChannelsMini() {
  const ROWS = [
    {
      label: "Voice",
      bandClass: "bg-[color:var(--color-pa-mid)]",
      example: "“Add 12 Maple View, three beds, valued at £312,000.”",
    },
    {
      label: "Spreadsheet",
      bandClass: "bg-[color:var(--color-cfo-mid)]",
      example: "portfolio.xlsx — 14 rows · AI mapped 18 of 19 columns",
    },
    {
      label: "Email / API",
      bandClass: "bg-[color:var(--color-cio-mid)]",
      example: "ops@hostingco.com → SR statement Aug 2026 — filed",
    },
  ];
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-5 lg:p-6 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.25)]">
      <p
        className="text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted)] font-semibold mb-4"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Today · 3 inputs captured
      </p>
      <ul className="space-y-3" style={{ fontFamily: "var(--font-sans)" }}>
        {ROWS.map((r) => (
          <li
            key={r.label}
            className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2.5"
          >
            <span
              className={`${r.bandClass} inline-flex items-center justify-center min-w-[80px] rounded-full px-2.5 py-1 text-white text-[10.5px] font-semibold tracking-wide`}
            >
              {r.label}
            </span>
            <span className="text-[12.5px] leading-[1.4] text-[color:var(--color-ink)]">
              {r.example}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Structure pillar inline mockup ──────────────────────────────────
//
// Two-pane "before / after" — raw inputs on the left, structured asset
// record on the right. The visual story: messy stuff goes in, one clean
// record comes out. Mirrors the homepage MessyInClearOutSection idea on
// a per-asset scale.
function StructureRecordMini() {
  const RAW = [
    "“rent went up to 1,650 in march”",
    "loan-statement-q2.pdf",
    "AED 4.2m purchase price (form)",
    "voice memo · service charge",
  ];
  const RECORD: { label: string; value: string; subdued?: boolean }[] = [
    { label: "Address", value: "Apt 1204, Marina Heights, Dubai" },
    { label: "Price (AED)", value: "4,200,000" },
    { label: "Price (EUR)", value: "1,054,318", subdued: true },
    { label: "Monthly rent", value: "AED 8,250 · from Mar 2026" },
    { label: "Service charge", value: "AED 16,200 / year" },
    { label: "Loan balance", value: "AED 2,310,000 · 5.4%" },
  ];
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-5 lg:p-6 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.25)]">
      <div
        className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* Raw inputs (left) */}
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-muted)] font-semibold mb-2">
            Raw in
          </p>
          <ul className="space-y-1.5">
            {RAW.map((r) => (
              <li
                key={r}
                className="rounded-md border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2.5 py-1.5 text-[11.5px] leading-[1.35] text-[color:var(--color-muted)]"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Arrow */}
        <div
          aria-hidden
          className="flex items-center justify-center text-[color:var(--color-accent)] text-[20px] font-bold"
        >
          →
        </div>

        {/* Structured record (right) */}
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-accent)] font-semibold mb-2">
            Asset record
          </p>
          <ul className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] divide-y divide-[color:var(--color-border)]">
            {RECORD.map((r) => (
              <li
                key={r.label}
                className="flex items-baseline justify-between gap-2 px-2.5 py-1.5"
              >
                <span className="text-[10.5px] text-[color:var(--color-muted)]">
                  {r.label}
                </span>
                <span
                  className={`text-[11.5px] font-semibold tabular-nums ${
                    r.subdued
                      ? "text-[color:var(--color-muted)]"
                      : "text-[color:var(--color-ink)]"
                  }`}
                >
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PillarSection({ pillar }: { pillar: Pillar }) {
  const bg = pillar.background === "surface" ? "bg-[color:var(--color-surface)]" : "bg-white";
  return (
    <section id={pillar.id} className={`${bg} scroll-mt-24`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="num text-[color:var(--color-accent)] text-[14px] font-semibold uppercase tracking-[0.14em] mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {pillar.number}
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {pillar.headline}
          </h2>
          <p
            className="mt-3 text-[16.5px] italic text-[color:var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {pillar.intro}
          </p>

          {/* Lead-agent chips for this pillar. Visual link between
              the portrait strip up top and the work it owns down here. */}
          <ul
            className="mt-6 flex flex-wrap gap-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {pillar.leads.map((l) => (
              <li key={l.acronym}>
                <Link
                  href={l.href}
                  className={`${l.bandClass} inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white text-[12px] font-semibold transition hover:opacity-90`}
                >
                  <span className="font-bold tracking-wide">{l.acronym}</span>
                  <span className="opacity-90">·</span>
                  <span className="font-normal opacity-95">{l.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 space-y-16">
          {pillar.capabilities.map((b, i) => (
            <div
              key={b.title}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
                (b.flip ?? i % 2 === 1) ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <h3
                  className="text-[24px] lg:text-[28px] leading-[1.15] text-[color:var(--color-navy)] mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {b.title}
                </h3>
                <ul className="space-y-2.5">
                  {b.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[14.5px] leading-[1.55] text-[color:var(--color-ink)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span
                        aria-hidden
                        className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-navy)] flex-shrink-0"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>{b.mockup}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
