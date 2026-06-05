import type { Metadata } from "next";
import Link from "next/link";

// Dedicated landing page for the June 2026 UAE Google Ads campaign
// targeting UAE-based expats (British / European / Indian / GCC
// nationals) who own property back home. Tax-free income, time-poor,
// multi-country property — they want set-and-forget portfolio
// monitoring with AI agents doing the legwork.
//
// Why this lives separately from the homepage:
//   • Single ICP message — UAE-resident expat with home-country
//     property. Homepage stays market-agnostic.
//   • Lets us A/B-test headline / CTA / hero variants cleanly later
//     by duplicating this route.
//   • Google Ads quality score rewards landing-page-message-match —
//     "Manage your home-country property from Dubai" beats a generic
//     homepage on the relevance dimension.
//   • Conversion-tracking attribution stays clean: signups originating
//     here can be measured separately from generic homepage signups.
//
// Page structure follows the /uk-dubai template:
//   1. Hero — flag badge + headline + sub + dual CTA
//   2. Three-prong value props (one workspace · no Friday-night email
//      · built for the time you don't have)
//   3. Pain section — the "before AssetCentral" picture
//   4. Solution — the 5 AI agents (abbreviated mirror of homepage)
//   5. Trust block — multi-country, multi-currency framing
//   6. Pricing in EUR with AED conversion note
//   7. Final CTA
//
// No top-of-page navigation — the marketing layout (app/(marketing)/
// layout) renders the header and footer.

export const metadata: Metadata = {
  // Short, keyword-rich title aimed at the UAE Google Ads campaign.
  // The root layout's title template appends " | AssetCentral" so the
  // SERP entry stays inside ~60 chars.
  title: "UAE Expat Property Portfolio Tracker",
  description:
    "Manage your UK, EU or Indian property from Dubai. AI agents track rent, costs and yield across countries. Forward a statement — done. 7-day trial.",
  alternates: { canonical: "/uae-expat" },
  openGraph: {
    title: "UAE Expat Property Portfolio Tracker",
    description:
      "For UAE-based expats with home-country property. Five AI agents track your UK, EU or Indian portfolio in one workspace.",
    type: "website",
  },
};

export default function UaeExpatLanding() {
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
            Tax-free wealth · multi-country property
          </div>
          <h1
            className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.04] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Manage your home-country property from Dubai.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AssetCentral gives time-poor UAE expats five AI agents — CEO,
            Finance, Market, Operations, PA — that track your UK / EU /
            Indian property portfolio in one workspace. Forward a statement,
            send a WhatsApp, or ask us to call. Rough numbers are fine.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup?campaign=uae-expat&utm_source=uae_expat_lp&utm_medium=cta&utm_campaign=uae_expat&utm_content=hero"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start 7-day trial — no credit card
            </Link>
            <Link
              href="/demo/60"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              See the 60-second tour →
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
            Built for owners whose property is in one country and whose calendar is in another.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Prong
              flag="🌍"
              title="One workspace, multiple countries"
              points={[
                "UK BTL, Indian rentals, off-plan units — same dashboard",
                "Pick your base currency for consolidated totals",
                "FX-aware net cashflow and portfolio value",
                "Per-country rent regulation rules baked in",
              ]}
            />
            <Prong
              flag="📨"
              title="No more email Friday nights"
              points={[
                "Forward your last statement to agent@assetcentral.ai",
                "AI extracts rent, costs, dates and parties",
                "Works in any source language and currency",
                "Photos and PDFs land in your property records",
              ]}
            />
            <Prong
              flag="⏱️"
              title="Built for the time you don't have"
              points={[
                "5 AI agents monitor your portfolio 24/7",
                "Weekly yield briefing — what changed, what to do",
                "Renewals, voids and rate moves flagged early",
                "Ask via WhatsApp, voice, or web — your call",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Pain section — the "before AssetCentral" picture ─────────── */}
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
                WhatsApp threads, scattered PDFs, and a spreadsheet that&rsquo;s six months out of date.
              </h2>
            </div>
            <div>
              <p
                className="text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Most UAE expats end up running their home-country property
                portfolio out of WhatsApp threads, scattered PDFs and a
                spreadsheet they update once a quarter. Time difference makes
                property managers harder to chase. Currency conversion is
                opaque. By the time the year-end statement arrives,
                opportunities have closed.
              </p>
              <p
                className="mt-4 text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                AssetCentral changes the shape of the work. You forward
                source documents in. Five specialist agents do the rest —
                tracking, comparing, and surfacing the actions that move
                yield most this month.
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
            Five specialists. One workspace. No payroll.
          </h2>
          <p
            className="mt-4 text-[16px] leading-[1.6] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Each agent owns a slice of the portfolio job. Together they
            replace the spreadsheet, the PDF folder, and the mental load.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Agent
              title="Your CEO"
              note="Surfaces the actions that move yield most this month — across every country you own in."
            />
            <Agent
              title="Finance Manager"
              note="Tracks rent, costs and debt. Flags missed payments, rate resets, and refinance windows."
            />
            <Agent
              title="Market Analyst"
              note="Compares your rents and asset values to live market data. Tells you where you're under-rented."
            />
            <Agent
              title="Operations Manager"
              note="Chases renewals, capex and voids. Reminds you when a tenancy is rolling and a manager is silent."
            />
            <Agent
              title="Portfolio Personal Assistant"
              note="Ingests statements, files and photos via email, WhatsApp or voice. Files everything to the right property."
            />
          </div>
        </div>
      </section>

      {/* ── Trust block — multi-country / compliance framing ──────────── */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid md:grid-cols-[2fr_3fr] gap-10 items-start">
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Designed for your profile
              </p>
              <h2
                className="text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Built for portfolios spanning UK, India, GCC and EU markets.
              </h2>
            </div>
            <div>
              <p
                className="text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Designed with UAE-based expats in mind — built for owners
                with 2 to 50 properties spread across multiple countries
                and currencies. The system speaks AED, GBP, EUR, INR, USD
                natively. Forwarding works in any language.
              </p>
              <p
                className="mt-4 text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                UK tax-resident? Your worldwide income still flows through
                a UK return. Our reference guide explains the rules:
              </p>
              <Link
                href="/resources/uk-tax-on-dubai-property"
                className="mt-4 inline-flex items-center text-[14px] font-semibold text-[var(--color-accent)] hover:underline"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Read: UK tax on Dubai property — what British owners need to know →
              </Link>
              <p
                className="mt-6 text-[13px] leading-[1.55] text-[var(--color-muted)] italic"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                AssetCentral is software for tracking and analysing
                property portfolios. Information and outputs are not
                financial, tax, legal, or investment advice. Always
                consult a qualified, licensed adviser before making any
                property, tax, or financing decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing band — EUR-led with AED conversion note ───────────── */}
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
                href="/signup?campaign=uae-expat&utm_source=uae_expat_lp&utm_medium=cta&utm_campaign=uae_expat&utm_content=pricing_band"
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
            Forward your first statement today.
          </h2>
          <p
            className="mt-4 text-[16px] leading-[1.55] text-[var(--color-muted)] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Five minutes to sign up. Forward one PDF. See your first
            property and its yield position by the end of the day.
          </p>
          <Link
            href="/signup?campaign=uae-expat&utm_source=uae_expat_lp&utm_medium=cta&utm_campaign=uae_expat&utm_content=final"
            className="mt-7 inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[var(--color-navy)] text-white text-[16px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Start 7-day trial — no credit card →
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
