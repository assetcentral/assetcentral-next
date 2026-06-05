import type { Metadata } from "next";
import Link from "next/link";

// Dedicated landing page for the June 2026 UAE Google Ads campaign
// targeting Dubai residents (expat or local) with a local Dubai
// portfolio. Off-plan investors or rental owners — they want RERA
// index tracking, DLD comparables, service-charge analysis, and
// off-plan rolling-return modelling.
//
// Why this lives separately from the homepage:
//   • Single ICP message — Dubai-portfolio owner. Homepage stays
//     multi-market.
//   • Lets us A/B-test calculator-led vs trial-led variants by
//     duplicating the route.
//   • Google Ads quality score rewards precise message-match.
//   • Conversion attribution clean: signups originating here are
//     measured separately from generic homepage signups.
//
// Page structure follows the /uk-dubai template:
//   1. Hero — Dubai-specific badge + headline + sub + dual CTA
//      (signup + off-plan calculator)
//   2. Three-prong value props (RERA · off-plan rolling return ·
//      service-charge audit)
//   3. Pain section — the three-tower-three-charge picture
//   4. Solution — the 5-agent team (Market Analyst is the hero here)
//   5. Trust block — live CBUAE + DLD indicators, compliance copy
//   6. Pricing in EUR with off-plan calculator trial perk
//   7. Final CTA

export const metadata: Metadata = {
  title: "Dubai Property Portfolio Tracker",
  description:
    "RERA-aware rent benchmarking, DLD comps, off-plan rolling-return modelling and service-charge audit. Built for owners with one Dubai unit or fifty.",
  alternates: { canonical: "/dubai-property-tracker" },
  openGraph: {
    title: "Dubai Property Portfolio Tracker",
    description:
      "RERA + DLD + service-charge tracking for Dubai property owners. Off-plan rolling-return calculator included.",
    type: "website",
  },
};

export default function DubaiPropertyTrackerLanding() {
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
            <span aria-hidden className="text-base">🇦🇪</span>
            Dubai-specific · RERA + DLD + off-plan
          </div>
          <h1
            className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.04] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Dubai property, tracked properly.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            RERA index integration, DLD comparables, off-plan rolling
            return modelling, service-charge tracking. Built for owners
            with one Dubai unit or fifty.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup?campaign=dubai-tracker&utm_source=dubai_tracker_lp&utm_medium=cta&utm_campaign=dubai_tracker&utm_content=hero"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start 7-day trial
            </Link>
            <Link
              href="/calculators/off-plan"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Try the off-plan calculator →
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
            Public data, made actionable. Three things every Dubai owner needs.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Prong
              flag="📊"
              title="RERA-aware rent benchmarking"
              points={[
                "Per-area RERA index plumbed in",
                "See what your unit should be renting for",
                "Benchmark before negotiating with your tenant",
                "Renewal-window alerts so you don't miss it",
              ]}
            />
            <Prong
              flag="🏗️"
              title="Off-plan rolling return"
              points={[
                "Model launch → handover → resale or hold",
                "Track payment plan and cost of money",
                "Compare intermediate exit vs hold to handover",
                "Specific to Dubai's developer-led market",
              ]}
            />
            <Prong
              flag="🧾"
              title="Service charge audit"
              points={[
                "Track service charge per sqft per tower",
                "Compare against community benchmarks",
                "Flag overpayment before it compounds",
                "Forward the invoice — AED extracted automatically",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Pain section — the three-tower-three-charge picture ──────── */}
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
                Three units, three towers, three different service charge stories.
              </h2>
            </div>
            <div>
              <p
                className="text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Dubai property looks simple until you own three units across
                three towers. Service charges vary. RERA index moves quietly.
                Off-plan payment plans overlap. The DLD comp data is public
                but not in a form you can act on. Most owners can&rsquo;t
                quickly answer &ldquo;should I sell this one and reinvest
                into off-plan?&rdquo;
              </p>
              <p
                className="mt-4 text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                AssetCentral pulls the public indicators into the dashboard
                and lines them up against your own unit&rsquo;s rent, charges
                and payment plan. The decision becomes obvious — not buried
                in tabs.
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
            Five specialists. RERA + DLD live in your dashboard.
          </h2>
          <p
            className="mt-4 text-[16px] leading-[1.6] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            For Dubai owners the Market Analyst pulls the heaviest weight.
            But all five agents work together on the portfolio job.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Agent
              title="Market Analyst"
              note="RERA index per area, DLD comp transactions, service-charge benchmarks. The Dubai-specific surface."
              accent
            />
            <Agent
              title="Your CEO"
              note="Surfaces the actions that move yield most this month — across your full Dubai book."
            />
            <Agent
              title="Finance Manager"
              note="Tracks rent, costs and debt in AED. Flags overdue service charges and developer payment plans."
            />
            <Agent
              title="Operations Manager"
              note="Chases renewals, voids and capex. Reminds you when a tenancy is rolling and an Ejari is due."
            />
            <Agent
              title="Portfolio Personal Assistant"
              note="Ingests AED invoices, statements and photos via email, WhatsApp or voice. Files everything to the right unit."
            />
          </div>
        </div>
      </section>

      {/* ── Trust block — live CBUAE + DLD indicators ────────────────── */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid md:grid-cols-[2fr_3fr] gap-10 items-start">
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Live indicators
              </p>
              <h2
                className="text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Indicators we surface in your dashboard.
              </h2>
              <p
                className="mt-4 text-[13px] leading-[1.55] text-[var(--color-muted)] italic"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Sourced from CBUAE and Dubai Land Department. 2026-Q2.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Indicator label="Base rate" value="5.40%" note="CBUAE" />
              <Indicator label="Mortgage rate" value="4.50%" note="Market avg" />
              <Indicator label="CPI" value="2.10%" note="YoY" />
              <Indicator label="Residential growth" value="+5.20%" note="YoY · DLD" />
            </div>
          </div>
          <p
            className="mt-8 text-[13px] leading-[1.55] text-[var(--color-muted)] italic max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Indicators sourced from CBUAE + Dubai Land Department. Decision
            support based on available data; not investment advice. Always
            consult a qualified, licensed adviser.
          </p>
          <p
            className="mt-3 text-[13px] leading-[1.55] text-[var(--color-muted)] italic max-w-3xl"
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

      {/* ── Pricing band — EUR-led with calculator perk ──────────────── */}
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
              Trial includes the off-plan rolling-return calculator (normally Pro-only)
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/signup?campaign=dubai-tracker&utm_source=dubai_tracker_lp&utm_medium=cta&utm_campaign=dubai_tracker&utm_content=pricing_band"
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
            Track your first Dubai unit.
          </h2>
          <p
            className="mt-4 text-[16px] leading-[1.55] text-[var(--color-muted)] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Forward your tenancy contract or service-charge invoice to
            agent@assetcentral.ai and you&rsquo;ll see your unit on the
            board the same day.
          </p>
          <Link
            href="/signup?campaign=dubai-tracker&utm_source=dubai_tracker_lp&utm_medium=cta&utm_campaign=dubai_tracker&utm_content=final"
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

function Agent({
  title,
  note,
  accent,
}: {
  title: string;
  note: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-white p-5 ${
        accent
          ? "border-[var(--color-accent)] shadow-[0_0_0_3px_rgba(79,110,247,0.08)]"
          : "border-[var(--color-border)]"
      }`}
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

function Indicator({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-white p-4"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
        {label}
      </div>
      <div
        className="text-[24px] font-semibold tabular-nums text-[var(--color-navy)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] text-[var(--color-muted)]">{note}</div>
    </div>
  );
}
