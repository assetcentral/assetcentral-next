import type { Metadata } from "next";
import Link from "next/link";

// Dedicated landing page for the June 2026 UAE Google Ads campaign.
// Target audience: the "Fractured Portfolio Investor" — a UAE-based
// senior professional (Tech VP, doctor, lawyer, business owner) who
// owns 3-30 units back in the UK / EU / India and is running them out
// of WhatsApp threads, scattered PDFs and a Sunday-afternoon Excel.
//
// Hero/pain/solution copy is rewritten for ICP self-ID rather than
// generic geo-targeted SaaS messaging. AI capability is positioned as
// the invisible engine — outcomes ("Sundays back", "refinance window
// caught") lead, not the agent count.
//
// Structure (kept in line with the route's siblings):
//   1. Hero — geo-hook → ICP self-ID
//   2. Three named pains — WhatsApp/PDF, reversion anxiety, spreadsheet
//   3. Outcomes — what changes when you switch (5 cards)
//   4. Persona snapshot — "if you're one of these, this is for you"
//   5. Trust block — portfolio profile + cross-link + disclaimer
//   6. Pricing band + ROI line
//   7. Final CTA — outcome verb
//
// Route, canonical, OG type, sitemap entry, design tokens, pricing
// band, UTM tagging, disclaimers and banned-word list are unchanged.

export const metadata: Metadata = {
  title: "UAE Expat Property Portfolio Tracker",
  description:
    "For UAE-based professionals running 3-30 units back home. Real net cashflow, refinance alerts, sub-market rent reviews caught early. Forward a statement — done.",
  alternates: { canonical: "/uae-expat" },
  openGraph: {
    title: "UAE Expat Property Portfolio Tracker",
    description:
      "Built for the Tech VP, doctor, lawyer or business owner in Dubai still managing UK / EU / Indian property. Get your home-country portfolio out of WhatsApp.",
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
            For the Dubai resident with property back home
          </div>
          <h1
            className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.04] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built for the busy professional who left London for Dubai — but still owns the flat. And the four BTLs in Manchester.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            You&rsquo;re a Tech VP, doctor, lawyer or business owner running
            3 to 30 units across two timezones. Your time is worth hundreds
            an hour. Right now you&rsquo;re losing it to scattered PDFs,
            missed refinance windows and Sunday afternoons in Excel. Forward
            one statement — we do the rest.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup?campaign=uae-expat&utm_source=uae_expat_lp&utm_medium=cta&utm_campaign=uae_expat&utm_content=hero"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get your portfolio out of WhatsApp — 7-day trial
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

      {/* ── Pain section — three named pains ──────────────────────────── */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The three things eating your yield
          </p>
          <h2
            className="text-[28px] lg:text-[34px] leading-[1.12] text-[var(--color-navy)] max-w-3xl mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            If two of these sound familiar, you&rsquo;re losing money you don&rsquo;t know about.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Pain
              tag="Pain #1"
              title="The WhatsApp & PDF Nightmare"
              body="Three property managers. Three different PDF formats. Two WhatsApp groups. One blurry photo of a service-charge invoice. By the time you've reconciled the month, the next month's started."
              cost="How much real net cashflow are you running this quarter? If you can't answer in 10 seconds, you're already losing yield to admin."
            />
            <Pain
              tag="Pain #2"
              title="Reversion Anxiety"
              body="Your 2.4% fixed-rate UK mortgage matures in eleven months. Your Manchester tenant signed at £1,400 in 2023 — market today is £1,800. The Dubai service-charge bill jumped 14% last quarter. None of this is in any one place."
              cost="One missed refinance window can cost £30k over five years. One sub-market rent review compounds quarterly. The cost of not knowing is always higher than the cost of knowing."
            />
            <Pain
              tag="Pain #3"
              title="Spreadsheet Fatigue"
              body="It's Sunday afternoon in Dubai Marina. You've opened the spreadsheet. The kids are calling you for lunch. You haven't been to the gym this week. You're optimising a column width."
              cost="If your time is worth £300/hour, a Sunday afternoon of admin is £1,200. That's 24 sessions a year. £29,000 a year you didn't spend on the next deal — or your kids."
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
            What changes when you switch
          </p>
          <h2
            className="text-[28px] lg:text-[34px] leading-[1.12] text-[var(--color-navy)] max-w-3xl mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Five outcomes. Same week you forward your first statement.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Outcome
              title="Real net cashflow, in 10 seconds."
              body="Forward every statement to one inbox. Your dashboard shows actual money in vs out — by property, by currency, by month. AED costs and GBP rent in the same view."
            />
            <Outcome
              title="Refinance windows you didn't know about."
              body="We track every mortgage maturity in your portfolio. 90 days out you get an alert with rate-shopping options — not a 'FYI, your mortgage is up'."
            />
            <Outcome
              title="Sub-market rent reviews caught early."
              body="Your rent vs the live local index — Rightmove in the UK, RERA in Dubai, MagicBricks in India. When you're 8%+ below market, we flag it with the comparable evidence to send your letting agent."
            />
            <Outcome
              title="Tax-efficient holding structures, surfaced."
              body="UK BTL in your personal name while you're UAE tax-resident? Probably not optimal. We flag the structure mismatch — your tax adviser does the rest."
            />
            <Outcome
              title="Sundays back."
              body="Set up takes 90 seconds via voice or 3 minutes via spreadsheet. From there it's automatic. Forward statements in any language and currency; the rest happens without you."
            />
            <Outcome
              title="One inbox, three property managers."
              body="Stop chasing your Manchester agent on WhatsApp at 11pm Dubai time. Forward their statement to one address — rent, costs, dates and parties extracted and filed."
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
            If you&rsquo;re one of these, AssetCentral is built for you.
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Persona
              title="The London-banker-turned-Dubai-resident"
              shape="6 units across the UK and UAE. The Marylebone flat, three BTLs in Manchester, a Marina 2-bed, an off-plan unit handing over in 2027."
            />
            <Persona
              title="The Munich orthopaedic surgeon"
              shape="A Berlin Mietshaus, three Spanish holiday lets in Mallorca, and an off-plan Dubai unit bought after a conference in 2024."
            />
            <Persona
              title="The Mumbai lawyer relocated to DIFC"
              shape="A Bandra apartment let out, a Pune builder-floor under construction, a Dubai studio for the family when they visit."
            />
            <Persona
              title="The Sydney-based tech CTO"
              shape="An Indian portfolio inherited from his father — six units in Bengaluru and Hyderabad — plus a Dubai apartment he bought as a hedge."
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

      {/* ── Trust block — portfolio profile + cross-link + disclaimer ── */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid md:grid-cols-[2fr_3fr] gap-10 items-start">
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Built for your portfolio shape
              </p>
              <h2
                className="text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                3 to 30 units. UK, India, GCC, EU. AED, GBP, EUR, INR, USD.
              </h2>
            </div>
            <div>
              <p
                className="text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Built for owners running 3 to 30 properties in our nine
                covered markets. The product can ingest, structure and
                analyse a typical 8-property mixed-currency portfolio in
                90 seconds — voice, email, WhatsApp or spreadsheet, in
                any source language.
              </p>
              <p
                className="mt-4 text-[16px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                UK tax-resident, Dubai tax-resident, somewhere in between?
                Your worldwide income still flows through a UK return if
                you&rsquo;re domiciled there. Our reference guide explains:
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
              catch one refinance window, it pays for itself for the next
              decade.
            </p>
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
            Get your home-country portfolio out of WhatsApp.
          </h2>
          <p
            className="mt-4 text-[16px] leading-[1.55] text-[var(--color-muted)] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Five minutes to sign up. Forward one PDF. See real net
            cashflow on your first property by the end of the day.
          </p>
          <Link
            href="/signup?campaign=uae-expat&utm_source=uae_expat_lp&utm_medium=cta&utm_campaign=uae_expat&utm_content=final"
            className="mt-7 inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[var(--color-navy)] text-white text-[16px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Get your home-country portfolio out of WhatsApp →
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
