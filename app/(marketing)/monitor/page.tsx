// Monitor — second pillar. Owns the SEO and ad-funnel for "track my
// portfolio" / "property performance monitoring" intent. Sister pages:
// /model, /manage.
//
// Structure mirrors /model so the three pillar pages read as a set.

import type { Metadata } from "next";
import Link from "next/link";

import {
  MonitorKpiGridSection,
  PortfolioSnapshotSection,
  YieldByPropertyChartSection,
  MonitoringAlertsSection,
  MonitoringRolePanelsSection,
} from "@/components/marketing/mmm/monitor-visuals";

const TITLE = "Monitor Property Portfolio Yield and Cash Flow | AssetCentral";
const DESCRIPTION =
  "Real-time NOI, yield drift and variance tracking — not rear-view accounting. The live operational map institutional desks run on, for private portfolios of 2 to 50 properties. €49/month.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/monitor" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
};

const WHAT_GETS_WATCHED = [
  {
    label: "Live yield",
    body: "Gross + net, per property and portfolio. Updates the moment a cost or rent changes.",
  },
  {
    label: "Cashflow vs. budget",
    body: "12-month rolling. Highlights variance, flags categories drifting from forecast.",
  },
  {
    label: "Service-charge spikes",
    body: "Compares against historic baseline AND local-block averages. Catches unusual hits early.",
  },
  {
    label: "Void days mounting",
    body: "Time-to-relet vs. market average. Surfaces underpriced rents and dragging agents.",
  },
  {
    label: "Refinance windows",
    body: "Counts down to rate reset. Pings when market rates move below your current product.",
  },
  {
    label: "Document inbox",
    body: "Statements, invoices, contracts parsed as they arrive — no manual entry, no missed items.",
  },
] as const;

const NAVY = "#1a1a2e";

export default function MonitorPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pillar I · Information Parity
          </p>
          <h1
            className="text-[44px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stop running your portfolio in the rear-view mirror.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A fund&rsquo;s asset manager knows what every property earned last week — NOI, occupancy, variance against budget, yield drift, service-charge creep. Private investors learn the same numbers six months later, once the WhatsApps and PDFs are reconciled. AssetCentral closes that gap.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup?plan=pro_monthly&intent=direct"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Build the live map →
            </Link>
            <Link
              href="/demo/60"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch the explainer
            </Link>
          </div>
          <p
            className="mt-4 text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            From €19/month. 7-day free trial on every tier, no card required.
          </p>
        </div>
      </section>

      {/* ── Why monitoring matters ──────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Yield drift is invisible until the variance lands.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A service charge that crept 18% over two years. A tenancy that rolled at the same rent for a fourth year while comparables climbed 9%. A fixed-rate window that closed without a refinance conversation. None of these announce themselves on the spreadsheet — they show up as a smaller bank balance twelve months later. Institutional desks catch each one in the week it starts. AssetCentral hands you the same week-one telemetry.
          </p>
        </div>
      </section>

      {/* ── What gets watched ───────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What the agents watch
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Six things you&rsquo;d ask for — if you remembered to ask.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHAT_GETS_WATCHED.map((w) => (
              <div
                key={w.label}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div
                  className="text-[17px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {w.label}
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--color-ink)]">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── New: concrete demo sections (KPI grid → portfolio snapshot →
              yield chart → alerts table → CFO/COO role panels) ───────── */}
      <MonitorKpiGridSection />
      <PortfolioSnapshotSection />
      <YieldByPropertyChartSection />
      <MonitoringAlertsSection />
      <MonitoringRolePanelsSection />

      {/* ── Next pillar nav ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: NAVY }} className="text-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-white/55 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Next pillar
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Monitoring tells you something is moving. Managing decides what to do.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-white/75 max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            When the monitor fires — refinance window, void streak, yield
            slip — the next move is a scenario, not a guess. That&rsquo;s
            the Manage pillar.
          </p>
          <div
            className="mt-7 flex flex-wrap gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/manage"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[14.5px] font-medium hover:bg-white/90 transition-colors"
            >
              How Manage works →
            </Link>
            <Link
              href="/model"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-white/20 text-white text-[14.5px] font-medium hover:bg-white/5 transition-colors"
            >
              Back to Model
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-24 text-center">
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start monitoring your portfolio today.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free for up to 3 properties. No card. The agents start
            watching the moment your first model is built.
          </p>
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Add your first property
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              See all features
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
