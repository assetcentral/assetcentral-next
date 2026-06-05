import type { Metadata } from "next";
import Link from "next/link";

// Dedicated landing page for the June 2026 UAE Google Ads campaign
// targeting cross-border investors — owners with property in 2+
// countries / currencies. AED + GBP + EUR + USD. They need
// base-currency consolidation, real-time FX, and multi-market
// benchmarks.
//
// Why this lives separately from the homepage:
//   • Single ICP message — multi-currency owner. Homepage doesn't
//     foreground the consolidation angle.
//   • Google Ads quality score rewards precise message-match for
//     "multi-currency property portfolio" search intent.
//   • Conversion attribution clean.
//
// Page structure follows the /uk-dubai template:
//   1. Hero — flag row + headline + sub + dual CTA (signup + IRR
//      calculator)
//   2. Three-prong value props (base currency · 9 markets · forward
//      in any language)
//   3. Pain section — spreadsheet nightmare
//   4. Solution — 5-agent team (Finance Manager + PA are heroes here)
//   5. Trust block — 9-flag row + supported markets statement
//   6. Pricing in EUR
//   7. Final CTA

export const metadata: Metadata = {
  title: "Multi-Currency Property Portfolio Tracker",
  description:
    "Consolidate AED, GBP, EUR and USD property in one workspace. Real-time FX, 9-market data, AI extraction in any language. 7-day trial.",
  alternates: { canonical: "/multi-currency-portfolio" },
  openGraph: {
    title: "Multi-Currency Property Portfolio Tracker",
    description:
      "For cross-border property investors. Pick your base currency, see consolidated yield across UAE, UK and EU markets.",
    type: "website",
  },
};

const FLAGS = [
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇪🇸", name: "Spain" },
  { flag: "🇵🇹", name: "Portugal" },
  { flag: "🇬🇷", name: "Greece" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇨🇭", name: "Switzerland" },
  { flag: "🇮🇪", name: "Ireland" },
];

export default function MultiCurrencyPortfolioLanding() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 80% at 80% -10%, rgba(79,110,247,0.10), rgba(255,255,255,0) 60%), linear-gradient(180deg, #ffffff 0%, var(--color-surface) 100%)",
          }}
        />
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-14 pb-14 lg:pt-20 lg:pb-16">
          <div
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-5 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span aria-hidden className="text-base">🇬🇧 🇦🇪 🇪🇸 🇮🇪 🇫🇷</span>
            Multi-currency · cross-border owner
          </div>
          <h1
            className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.04] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Multi-currency property portfolio — in one workspace.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AssetCentral consolidates your AED, GBP, EUR, USD rentals in
            your base currency. Real-time FX. Live market data across 9
            countries. Forwarding works in any language.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup?campaign=multi-currency&utm_source=multi_currency_lp&utm_medium=cta&utm_campaign=multi_currency&utm_content=hero"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start 7-day trial
            </Link>
            <Link
              href="/calculators/irr"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Try the IRR calculator →
            </Link>
          </div>
          <p
            className="mt-4 text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No credit card required · Cancel anytime · From €49/mo after trial
          </p>
        </div>
      </section>

      {/* ── Three-prong value props ───────────────────────────────────── */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <h2
            className="text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)] max-w-2xl mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built for owners whose portfolio doesn&rsquo;t fit in one currency.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Prong
              flag="💱"
              title="Pick your base currency"
              points={[
                "EUR, GBP, USD or AED as base",
                "Total value, debt and net cashflow consolidated",
                "FX rates from a daily-refreshed feed",
                "Per-asset records stay in local currency",
              ]}
            />
            <Prong
              flag="🌐"
              title="9 markets, one workspace"
              points={[
                "UAE, UK, France, Spain, Portugal, Greece",
                "Germany, Switzerland, Ireland",
                "Curated indicators — base rate, mortgage, CPI, growth",
                "Add other markets manually any time",
              ]}
            />
            <Prong
              flag="🗣️"
              title="Forward in any language"
              points={[
                "English, French, Arabic, Spanish, German, Italian",
                "Portfolio PA extracts regardless of source language",
                "Photos and PDFs both supported",
                "AED, GBP, EUR, USD detected automatically",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Pain section — spreadsheet nightmare ──────────────────────── */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid md:grid-cols-[2fr_3fr] gap-10 items-start">
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                The picture today
              </p>
              <h2
                className="text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Three countries, three regulators, one spreadsheet you don&rsquo;t trust.
              </h2>
            </div>
            <div>
              <p
                className="text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Owning property in 3 countries is a spreadsheet nightmare.
                Currencies drift. Each market&rsquo;s rent regulation rules
                are different. By the time you&rsquo;ve manually consolidated
                this quarter&rsquo;s numbers, the next quarter&rsquo;s started.
              </p>
              <p
                className="mt-4 text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                AssetCentral keeps each unit in its local currency, applies a
                daily FX feed, and rolls everything up into your chosen base.
                You see real position, not a stale snapshot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution — the 5-agent team ───────────────────────────────── */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Your AI team
          </p>
          <h2
            className="text-[28px] lg:text-[34px] leading-[1.12] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Five specialists. One consolidated view of your portfolio.
          </h2>
          <p
            className="mt-4 text-[16px] leading-[1.6] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Each agent works across every country you own in — same logic,
            different rules per market.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Agent
              title="Your CEO"
              note="Consolidates the actions that move yield most this month — across all 9 markets and currencies."
            />
            <Agent
              title="Finance Manager"
              note="Holds rent, costs and debt in local currency. Rolls up FX-aware totals into your chosen base."
            />
            <Agent
              title="Market Analyst"
              note="Per-market indicators (base rate, mortgage rate, CPI, residential growth) baked in for all 9 markets."
            />
            <Agent
              title="Operations Manager"
              note="Per-country rent regulation rules — renewal windows, rent caps, notice periods — all tracked."
            />
            <Agent
              title="Portfolio Personal Assistant"
              note="Forwards work in any language. AED invoices, GBP statements, EUR contracts — same inbox."
            />
          </div>
        </div>
      </section>

      {/* ── Trust block — 9-flag row + supported markets statement ───── */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold text-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Markets covered
          </p>
          <h2
            className="text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)] max-w-3xl mx-auto text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nine markets today. Plus anything else you want to add manually.
          </h2>
          <div className="mt-10 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4">
            {FLAGS.map((m) => (
              <div
                key={m.name}
                className="rounded-xl border border-[var(--color-border)] bg-white p-3 flex flex-col items-center text-center"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span aria-hidden className="text-[28px] leading-none mb-2">
                  {m.flag}
                </span>
                <span className="text-[12px] text-[var(--color-ink)]">
                  {m.name}
                </span>
              </div>
            ))}
          </div>
          <p
            className="mt-8 text-[15px] leading-[1.6] text-[var(--color-ink)] max-w-3xl mx-auto text-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Covered today — UAE, UK, France, Spain, Portugal, Greece,
            Germany, Switzerland, Ireland. Add other markets manually; AI
            extraction works in any language and currency.
          </p>
          <p
            className="mt-6 text-[13px] leading-[1.55] text-[var(--color-muted)] italic max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AssetCentral is software for tracking and analysing property
            portfolios. Information and outputs are not financial, tax,
            legal, or investment advice. Always consult a qualified,
            licensed adviser before making any property, tax, or financing
            decision.
          </p>
        </div>
      </section>

      {/* ── Pricing band ──────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <div className="text-center">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Pricing
            </p>
            <h2
              className="text-[28px] lg:text-[34px] leading-[1.12] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              €49 a month. 7-day free trial.
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.55] text-[var(--color-muted)] max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              ~AED 195/month, billed in EUR. No per-asset fees. No card
              required to start. Cancel anytime during the trial.
            </p>
            <div
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-positive)]/10 text-[var(--color-positive)] px-3 py-1.5 text-[12px] font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span aria-hidden>✓</span>
              Save 20% on annual — €470/yr instead of €588
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/signup?campaign=multi-currency&utm_source=multi_currency_lp&utm_medium=cta&utm_campaign=multi_currency&utm_content=pricing_band"
                className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Start 7-day trial
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-semibold hover:border-[var(--color-navy)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                See full pricing
              </Link>
            </div>
            <p
              className="mt-6 text-[12px] leading-[1.55] text-[var(--color-muted)] max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Decision support based on available data; not investment
              advice. Always consult a qualified adviser.
            </p>
          </div>
        </div>
      </section>

      {/* ── Final close ───────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-14 lg:py-20 text-center">
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.12] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Add your first property.
          </h2>
          <p
            className="mt-4 text-[16px] leading-[1.55] text-[var(--color-muted)] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Forward one statement to agent@assetcentral.ai in whatever
            language and currency you have it. We&rsquo;ll do the rest.
          </p>
          <Link
            href="/signup?campaign=multi-currency&utm_source=multi_currency_lp&utm_medium=cta&utm_campaign=multi_currency&utm_content=final"
            className="mt-7 inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[var(--color-navy)] text-white text-[16px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Start 7-day trial →
          </Link>
          <p
            className="mt-3 text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No card required · Cancel anytime · From €49/mo after trial
          </p>
        </div>
      </section>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Prong({
  flag,
  title,
  points,
}: {
  flag: string;
  title: string;
  points: string[];
}) {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <div className="flex items-center gap-2 mb-3">
        <span aria-hidden className="text-[24px] leading-none">
          {flag}
        </span>
        <h3
          className="text-[18px] font-semibold text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
      </div>
      <ul className="space-y-2">
        {points.map((p) => (
          <li
            key={p}
            className="text-[14px] leading-[1.5] text-[var(--color-ink)] flex items-start gap-2"
          >
            <span aria-hidden className="text-[var(--color-positive)] mt-0.5 shrink-0">
              ✓
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Agent({ title, note }: { title: string; note: string }) {
  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-white p-5"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <h3
        className="text-[18px] font-semibold text-[var(--color-navy)] mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="text-[14px] leading-[1.55] text-[var(--color-ink)]">
        {note}
      </p>
    </div>
  );
}
