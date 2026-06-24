// /features — restructured around Model · Monitor · Manage + the
// 5-agent team. Replaces the prior "Set-Up / Uplift / Workhorse /
// Winners" jobs taxonomy with the pillar framing the rest of the
// site already uses (see /model, /monitor, /manage and the homepage
// MMM chips).
//
// Reading order:
//   1. Hero — what the page is for
//   2. TeamGalleryStrip — the 5 portraits. Sits high so visitors
//      coming from "AI team" entries in nav land on faces fast.
//   3. Three pillar blocks — Model · Monitor · Manage. Each pillar
//      lists the lead agent(s), three capabilities and a mini
//      mockup from FeatureMinis.
//   4. ComparisonTable + final CTA — unchanged from prior version.
//
// We deliberately keep the FeatureMinis components so the page still
// shows the product, not just lists of capabilities.

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
  title: "Features — Model · Monitor · Manage",
  description:
    "Model decisions before committing capital. Monitor yield, cash flow and debt. Manage the work that protects returns. Run by five AI agents — CIO · CFO · COO · CEO · PA.",
  alternates: { canonical: "/features" },
};

interface Capability {
  title: string;
  bullets: string[];
  mockup: React.ReactNode;
  flip?: boolean;
}

interface Pillar {
  /** Anchor + identifier. Matches the corresponding /model · /monitor
   *  · /manage landing page slug. */
  id: "model" | "monitor" | "manage";
  /** Step label, e.g. "01 · Model". */
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
  /** Three or fewer capability blocks. Each one alternates left/right
   *  layout. */
  capabilities: Capability[];
  /** Background colour for the pillar section — alternates surface
   *  / white down the page for visual rhythm. */
  background: "white" | "surface";
}

const PILLARS: Pillar[] = [
  {
    id: "model",
    number: "01 · Model",
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
    number: "02 · Monitor",
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
    number: "03 · Manage",
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
        title: "One score. The reasoning underneath.",
        bullets: [
          "Yield vs benchmark, leverage levels, cashflow resilience",
          "Upcoming risk events combined into a single score",
          "Plain-English action bullets, ranked by impact",
        ],
        mockup: <ScoreMini />,
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
      {
        title: "Forward it. We read it. Nothing slips through.",
        bullets: [
          "Email statements, WhatsApp documents, photographed invoices",
          "AI extracts key dates and amounts; everything filed against the right asset",
          "22 distinct alert types across loans, cashflow, yield, documents",
        ],
        mockup: <IngestionMini />,
        flip: true,
      },
      {
        title: "Alerts that move with the portfolio.",
        bullets: [
          "Daily email digest or instant WhatsApp for critical alerts",
          "Snooze, dismiss, or convert to a task",
          "Briefed daily — the next 7 things worth your attention",
        ],
        mockup: <AlertsMini />,
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
              Model · Monitor · Manage.
              <br />
              Run by five AI agents.
            </h1>
            <p
              className="mt-5 text-[17px] lg:text-[19px] leading-[1.55] text-[color:var(--color-muted)] max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The infrastructure a property fund runs on, scaled to private
              owners with 2&ndash;50 properties. Five named AI agents do the
              modelling, monitoring and managing — you make the decisions.
            </p>
            <div
              className="mt-7 flex flex-wrap gap-3 text-[13px]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <Link
                href="#model"
                className="inline-flex items-center justify-center min-h-[40px] px-4 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] font-semibold transition hover:border-[color:var(--color-navy)]"
              >
                Jump to Model
              </Link>
              <Link
                href="#monitor"
                className="inline-flex items-center justify-center min-h-[40px] px-4 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] font-semibold transition hover:border-[color:var(--color-navy)]"
              >
                Jump to Monitor
              </Link>
              <Link
                href="#manage"
                className="inline-flex items-center justify-center min-h-[40px] px-4 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] font-semibold transition hover:border-[color:var(--color-navy)]"
              >
                Jump to Manage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI team strip — keeps the 5 portraits visible on /features.
           Sits high so a visitor landing from a "Meet the team" nav
           entry sees faces before walls of capability bullets. ── */}
      <TeamGalleryStrip
        eyebrow="Your AI property team"
        heading="The team that runs the model · monitor · manage loop."
        body="Five agents, each with a defined remit. Click any face to read the per-agent detail page."
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
