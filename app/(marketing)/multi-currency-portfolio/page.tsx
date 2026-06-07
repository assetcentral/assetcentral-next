import type { Metadata } from "next";
import Link from "next/link";

// Dedicated landing page for the June 2026 UAE Google Ads campaign.
// Target audience: the "Fractured Portfolio Investor" — a cross-border
// investor with property in 2+ countries / currencies. Bay Area Tech
// VP with a Stanford condo + off-plan Dubai. Munich surgeon with a
// Berlin Mietshaus + Mallorca holiday lets. London family-office
// director with portfolio across UK / Greece / France.
//
// Hero pivots from the multi-currency geo-hook to the ICP profile:
// senior professional, time worth hundreds an hour, losing yield to
// admin and FX confusion.
//
// Structure:
//   1. Hero — geo-hook → ICP self-ID
//   2. Three named pains (WhatsApp/PDF, reversion anxiety, spreadsheet)
//   3. Outcomes — what changes when you switch (5 cards)
//   4. Persona snapshot — 4 cross-border portfolios
//   5. Trust block — 9-flag row (kept) + outcome statement + cross-link
//      to net-yield-vs-gross-yield + disclaimer
//   6. Pricing band + ROI line
//   7. Final CTA — outcome verb
//
// Route, canonical, OG type, sitemap, design tokens, UTM tagging and
// disclaimers unchanged.

export const metadata: Metadata = {
  title: "Multi-Currency Property Portfolio Tracker",
  description:
    "For cross-border investors running 3-30 units across UK, EU and the GCC. Real net cashflow in your base currency, refinance windows caught, sub-market rents flagged.",
  alternates: { canonical: "/multi-currency-portfolio" },
  openGraph: {
    title: "Multi-Currency Property Portfolio Tracker",
    description:
      "Built for the cross-border senior professional. AED, GBP, EUR, USD rentals in one consolidated view — without the Sunday-afternoon spreadsheet.",
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
            <span aria-hidden className="text-base">🇬🇧 🇦🇪 🇪🇸 🇩🇪 🇫🇷</span>
            For the cross-border investor with 3-30 units
          </div>
          <h1
            className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.04] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One spreadsheet. Three currencies. Two regulators. None of it real-time.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            You&rsquo;re a Tech VP, surgeon, lawyer or family-office director
            running 3 to 30 units across two or three countries. Your time
            is worth hundreds an hour. Right now your AED rent, GBP costs
            and EUR mortgages live in a tab nobody&rsquo;s updated since
            March. One consolidated view — pick your base currency.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup?campaign=multi-currency&utm_source=multi_currency_lp&utm_medium=cta&utm_campaign=multi_currency&utm_content=hero"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get one view across currencies — 7-day trial
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

      {/* ── Pain section — three named pains ──────────────────────────── */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Three things eating your yield
          </p>
          <h2
            className="text-[28px] lg:text-[34px] leading-[1.12] text-[var(--color-navy)] max-w-3xl mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Yield leaks from currencies you can&rsquo;t see straight.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Pain
              tag="Pain #1"
              title="WhatsApp. PDFs. Photos of invoices."
              body="Your Manchester agent emails monthly PDFs in GBP. Your Mallorca manager sends a quarterly Spanish spreadsheet in EUR. Your Dubai service-charge invoice arrives as a WhatsApp photo. Reconciling the quarter takes a Sunday — and then FX has moved."
              cost="What's your real net cashflow this quarter in your base currency? If you can't answer in 10 seconds, you're already losing yield to admin."
            />
            <Pain
              tag="Pain #2"
              title="Reversion Anxiety"
              body="Your UK fixed rate at 2.4% matures in nine months. Your Berlin Mietshaus has a tenant in below-Mietspiegel rent. Your Spanish lease rolls over to indefinida if you don't act in October. Three regulators. Three timeline calendars. One brain."
              cost="One missed refinance window can cost £30k over five years. One sub-market rent review compounds quarterly. Across three countries the cost compounds in three places."
            />
            <Pain
              tag="Pain #3"
              title="Spreadsheet Fatigue"
              body="It's Sunday afternoon in your SF Mission flat. You've opened the spreadsheet with the FX column you've maintained for three years. The kids are asking when you'll be done. You haven't refreshed FX since February."
              cost="If your time is worth $400/hour, a Sunday afternoon of admin is $1,600. That's 24 sessions a year. $38,000 a year you didn't spend on the next deal — or your family."
            />
          </div>
        </div>
      </section>

      {/* ── Solution — outcomes, not features ─────────────────────────── */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What you get back
          </p>
          <h2
            className="text-[28px] lg:text-[34px] leading-[1.12] text-[var(--color-navy)] max-w-3xl mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Five outcomes. First statement, same week.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Outcome
              title="Real net cashflow. Your base currency. 10 seconds."
              body="Forward every statement in any language. AED, GBP, EUR, USD — extracted in the local currency, rolled up FX-aware to your base. Daily-refreshed feed; per-asset records stay local."
            />
            <Outcome
              title="Refinance windows. Three countries. 90 days out."
              body="Every mortgage maturity, every fixed-rate end date, every payment-plan milestone. 90 days out you get an alert with rate-shopping options for that country's market."
            />
            <Outcome
              title="Sub-market rent reviews caught early — per regulator."
              body="UK Rightmove, Spanish Idealista, German Mietspiegel, RERA in Dubai. When you're 8%+ below market and the renewal window is open, we flag it with the comparable evidence."
            />
            <Outcome
              title="Tax-efficient holding structures, surfaced."
              body="UK BTL in your personal name while you're US-resident? German Mietshaus held outside a GmbH? Probably not optimal. We flag the mismatch — your tax adviser does the rest."
            />
            <Outcome
              title="Sundays back. In any timezone."
              body="Set up takes 90 seconds via voice or 3 minutes via spreadsheet. From there it's automatic. Forward AED invoices, GBP statements, EUR contracts to one inbox — no language tagging required."
            />
            <Outcome
              title="One number you trust."
              body="No more reconciling between an FX tab, an Excel sheet and three property managers. One portfolio view, one base currency, one number per quarter — and the math is auditable."
            />
          </div>
        </div>
      </section>

      {/* ── Persona snapshot — name them explicitly ───────────────────── */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Who this is for
          </p>
          <h2
            className="text-[28px] lg:text-[34px] leading-[1.12] text-[var(--color-navy)] max-w-3xl mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built for one of these.
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Persona
              title="The Bay Area tech VP"
              shape="A Stanford-area condo she still owns, two off-plan Dubai units bought as a hedge, and a Lisbon apartment from her D7 visa days."
            />
            <Persona
              title="The Munich orthopaedic surgeon"
              shape="A Berlin Mietshaus, three Spanish holiday lets in Mallorca, an off-plan Dubai unit. Three regulators, three currencies, one Excel."
            />
            <Persona
              title="The London family-office director"
              shape="A portfolio across UK, Greece and France. Six BTLs in the Midlands, a Mykonos villa for short lets, an Antibes apartment held in an SCI."
            />
            <Persona
              title="The Singapore banker with UK + UAE"
              shape="Two Marylebone flats from her previous London posting, three Dubai units bought after relocating, a Sentosa condo where she lives."
            />
          </div>
          <p
            className="mt-8 text-[14px] leading-[1.55] text-[var(--color-muted)] italic max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Illustrative profiles. Names are not real owners.
          </p>
        </div>
      </section>

      {/* ── Trust block — 9-flag row + outcome statement + cross-link ── */}
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
            Nine markets today. Add others manually.
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
            className="mt-8 text-[16px] leading-[1.6] text-[var(--color-ink)] max-w-3xl mx-auto text-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Built for owners running 3 to 30 properties in our nine
            covered markets. The product can ingest, structure and
            analyse a typical 8-property mixed-currency portfolio in 90
            seconds — voice, email or spreadsheet, in any source language.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/resources/net-yield-vs-gross-yield"
              className="inline-flex items-center text-[14px] font-semibold text-[var(--color-accent)] hover:underline"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Read: Net yield vs gross yield — what cross-border owners get wrong →
            </Link>
          </div>
          <p
            className="mt-8 text-[13px] leading-[1.55] text-[var(--color-muted)] italic max-w-3xl mx-auto"
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

      {/* ── Pricing band — EUR-led with ROI framing ───────────────────── */}
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
            <p
              className="mt-6 text-[15px] leading-[1.6] text-[var(--color-ink)] max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Pro is €49/month. If we catch one sub-market rent review per
              year, the year pays for itself in the first month. If we
              catch one refinance window across the portfolio, it pays for
              itself for the next decade.
            </p>
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
            Get one consolidated view across currencies.
          </h2>
          <p
            className="mt-4 text-[16px] leading-[1.55] text-[var(--color-muted)] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Forward one statement in any language and currency. Real net
            cashflow in your base currency by the end of the day.
          </p>
          <Link
            href="/signup?campaign=multi-currency&utm_source=multi_currency_lp&utm_medium=cta&utm_campaign=multi_currency&utm_content=final"
            className="mt-7 inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[var(--color-navy)] text-white text-[16px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Get one consolidated view across currencies →
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

function Pain({
  tag,
  title,
  body,
  cost,
}: {
  tag: string;
  title: string;
  body: string;
  cost: string;
}) {
  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-white p-6 flex flex-col"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)] font-semibold mb-2">
        {tag}
      </div>
      <h3
        className="text-[20px] font-semibold text-[var(--color-navy)] mb-3 leading-[1.2]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="text-[14px] leading-[1.55] text-[var(--color-ink)]">
        {body}
      </p>
      <p className="mt-4 pt-4 border-t border-[var(--color-border)] text-[14px] leading-[1.55] text-[var(--color-ink)] font-medium">
        {cost}
      </p>
    </div>
  );
}

function Outcome({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-white p-5"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <h3
        className="text-[18px] font-semibold text-[var(--color-navy)] mb-2 leading-[1.25]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="text-[14px] leading-[1.55] text-[var(--color-ink)]">
        {body}
      </p>
    </div>
  );
}

function Persona({ title, shape }: { title: string; shape: string }) {
  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-white p-5"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <h3
        className="text-[16px] font-semibold text-[var(--color-navy)] mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="text-[14px] leading-[1.55] text-[var(--color-ink)]">
        {shape}
      </p>
    </div>
  );
}
