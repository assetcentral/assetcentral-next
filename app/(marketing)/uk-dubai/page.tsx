import type { Metadata } from "next";
import Link from "next/link";

// Dedicated landing page for the May 2026 UK Google Ads campaign
// targeting British investors who own or are considering Dubai property.
//
// Why this lives separately from the homepage:
//   • Single message, single audience — no distraction from other ICP
//     copy (Greece, Saudi, EU investors etc).
//   • Lets us A/B-test headline / CTA variants cleanly later by
//     duplicating this route under /uk-dubai-v2 etc.
//   • Higher Google Ads quality score: landing-page-message-match is
//     a direct input. A page that explicitly mentions "UK investor with
//     Dubai property" beats a generic homepage on quality score.
//   • Conversion-tracking attribution stays clean: signups originating
//     here can be measured separately from generic homepage signups.
//
// Page structure deliberately minimal:
//   1. Hero — flag badge, headline, sub, dual CTA
//   2. Three-prong value props (UK BTL · Dubai off-plan · Both side-by-side)
//   3. Calculator preview (visual reinforcement of the off-plan tool)
//   4. UK-specific trust block (tax article + cohort testimonial)
//   5. Pricing in GBP
//   6. Final CTA
//
// No top-of-page navigation — the marketing layout (app/(marketing)/layout)
// renders the header, but we keep the page content tightly focused.

export const metadata: Metadata = {
  // Short, keyword-rich title aimed at the UK Google Ads campaign that
  // points at this page. The root layout appends "| AssetCentral" so
  // the SERP entry stays inside ~60 chars.
  title: "UK + Dubai Property Portfolio Tracker",
  description:
    "For British owners with UK BTL and Dubai property. Track GBP and AED side-by-side, model off-plan exits, stay on top of UK tax. 14-day trial.",
  alternates: { canonical: "/uk-dubai" },
  openGraph: {
    title: "UK + Dubai Property Portfolio Tracker",
    description:
      "For British owners with UK BTL and Dubai property. One workspace for both currencies, both tax regimes, both timezones.",
    type: "website",
  },
};

export default function UkDubaiLanding() {
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
            <span aria-hidden className="text-base">🇬🇧 🇦🇪</span>
            For British investors with Dubai property
          </div>
          <h1
            className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.04] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            London salary. Manchester BTL. Dubai flat. Where&rsquo;s the dashboard?
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            UK BTL, Dubai off-plan, AED service charges, GBP mortgage
            payments. Most owners with property in both countries end up
            in a spreadsheet graveyard. AssetCentral holds the whole portfolio
            in one workspace — GBP and AED side-by-side, both tax regimes,
            both timezones.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup?utm_source=uk_dubai_lp&utm_medium=cta&utm_campaign=uk_dubai&utm_content=hero"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start free — 14 days
            </Link>
            <Link
              href="/calculators/off-plan"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Try the Dubai off-plan calculator →
            </Link>
          </div>
          <p
            className="mt-4 text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No credit card required · Cancel anytime · From £39/mo after trial
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
            Two countries. One workspace. Zero tab-hopping.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Prong
              flag="🏠"
              title="Your UK BTL"
              points={[
                "Rent due dates + tenancy expiry alerts",
                "Mortgage rate moves + fix-end countdowns",
                "HMRC-ready document vault per asset",
                "Section 24 + post-FHL income tax modelling",
              ]}
            />
            <Prong
              flag="🌅"
              title="Your Dubai unit"
              points={[
                "Stage-payment tracker for off-plan",
                "Handover countdown + assign-vs-hold model",
                "Live DLD comps by tower / subzone",
                "DLD fees + service-charge tracking in AED",
              ]}
            />
            <Prong
              flag="💱"
              title="Both, together"
              points={[
                "Cashflow calendar in GBP and AED",
                "FX-aware totals so you see real position",
                "Forward an AED invoice or a UK gas bill — same inbox",
                "AI Personal Assistant that knows the whole picture",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── The decision panel — uses the calculator as social proof ──── */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Off-plan calculator
              </p>
              <h2
                className="text-[28px] lg:text-[34px] leading-[1.12] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Assign now. Or hold to handover. The math, in AED.
              </h2>
              <p
                className="mt-4 text-[16px] leading-[1.55] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                The off-plan rolling-return calculator models the exit
                decision in AED — walk-away cash gain or loss for selling
                today vs holding to handover, three market scenarios
                (current assumptions, flat, bearish −10%), and the break-even
                handover value. Live DLD market comps grounded in real recent
                Dubai Land Department transactions.
              </p>
              <p
                className="mt-4 text-[14px] leading-[1.55] text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Free with a 14-day trial. No credit card required.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/calculators/off-plan"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-[var(--color-navy)] text-white text-[14px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Open the calculator →
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-[var(--color-border)] p-6 shadow-sm">
              <div
                className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Worked example · AED 1.0M unit, 18 months in
              </div>
              <div className="space-y-3">
                <KpiRow label="Sell today · walk-away cash" value="+AED 64,000" tone="pos" />
                <KpiRow label="Hold to handover (6% p.a. growth)" value="+AED 194,845" tone="pos" />
                <KpiRow label="If market goes flat" value="−AED 53,600" tone="neg" />
                <KpiRow label="If market corrects −10%" value="−AED 164,000" tone="neg" />
              </div>
              <p
                className="mt-4 text-[11px] text-[var(--color-muted)] italic"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Illustrative figures from the public calculator. Your unit&rsquo;s
                numbers depend on payment plan, exit friction and cost of money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── UK-specific trust block — tax article + cohort line ──────── */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid md:grid-cols-[2fr_3fr] gap-10 items-start">
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                UK tax matters
              </p>
              <h2
                className="text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                HMRC doesn&rsquo;t care the UAE is 0%.
              </h2>
            </div>
            <div>
              <p
                className="text-[16px] leading-[1.55] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                If you&rsquo;re UK tax-resident, HMRC taxes your worldwide
                income — Dubai rental gets added to your UK return on form
                SA106, taxed at your marginal rate. There&rsquo;s no UAE tax
                to credit against your UK bill, so you pay the full UK rate.
                When you sell, UK CGT applies on the GBP-equivalent gain.
              </p>
              <p
                className="mt-3 text-[16px] leading-[1.55] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                AssetCentral keeps your Dubai records in AED and your UK
                records in GBP, with FX-aware totals so your accountant gets
                what they need at year-end. Plus our reference guide breaks
                down the UK rules in plain language:
              </p>
              <Link
                href="/resources/uk-tax-on-dubai-property"
                className="mt-4 inline-flex items-center text-[14px] font-semibold text-[var(--color-accent)] hover:underline"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Read: UK tax on Dubai property — what British owners need to know →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing band — GBP-led for UK audience ────────────────────── */}
      <section className="bg-[var(--color-surface)]">
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
              From £39/mo. 14 days free.
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.55] text-[var(--color-muted)] max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              No per-asset fees. No card required to start. Cancel anytime
              during the trial.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/signup?utm_source=uk_dubai_lp&utm_medium=cta&utm_campaign=uk_dubai&utm_content=pricing_band"
                className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Start free — 14 days
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-semibold hover:border-[var(--color-navy)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                See full pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final close ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-14 lg:py-20 text-center">
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.12] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Close the tabs. One roof. Both currencies.
          </h2>
          <Link
            href="/signup?utm_source=uk_dubai_lp&utm_medium=cta&utm_campaign=uk_dubai&utm_content=final"
            className="mt-7 inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[var(--color-navy)] text-white text-[16px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Start free 14-day trial →
          </Link>
          <p
            className="mt-3 text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No card required · Cancel anytime · From £39/mo after trial
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

function KpiRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "pos" | "neg";
}) {
  const colour =
    tone === "pos"
      ? "text-[var(--color-positive)]"
      : "text-[var(--color-negative)]";
  return (
    <div
      className="flex items-baseline justify-between gap-3"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <span className="text-[13px] text-[var(--color-ink)]">{label}</span>
      <span className={`text-[15px] font-semibold tabular-nums ${colour}`}>
        {value}
      </span>
    </div>
  );
}
