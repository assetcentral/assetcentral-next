import type { Metadata } from "next";
import Link from "next/link";

// Dedicated landing page for the June 2026 UAE Google Ads campaign.
// Target audience: the "Fractured Portfolio Investor" — a Dubai
// resident (or resident-investor) with a local Dubai book of 3-30
// units, often including off-plan. They optimise for yield and tax
// savings. They're skeptical of generic AI marketing.
//
// Hero leads with Dubai-specific geo-hook, then pivots immediately
// to the ICP profile. Pain section names the three pains the way
// they actually sound for a Dubai-resident investor. Solution leads
// with outcomes, not the 5-agent count.
//
// Structure:
//   1. Hero — geo-hook → ICP self-ID
//   2. Three named pains
//   3. Outcomes — what changes when you switch
//   4. Persona snapshot — 4 Dubai-shaped portfolios
//   5. Trust block — live CBUAE + DLD indicators (kept) + outcome
//      statement + cross-link to STR operator check + disclaimer
//   6. Pricing band + ROI line
//   7. Final CTA
//
// Route, canonical, OG type, sitemap, design tokens, UTM tagging
// and disclaimers unchanged.

export const metadata: Metadata = {
  title: "Dubai Property Portfolio Tracker",
  description:
    "For Dubai-based investors with 3-30 units across the Marina, JVC, Saadiyat or Palm. Real net cashflow, RERA renewal alerts, service-charge audit. Get off Excel.",
  alternates: { canonical: "/dubai-property-tracker" },
  openGraph: {
    title: "Dubai Property Portfolio Tracker",
    description:
      "Built for the Dubai-resident investor running a local UAE book. RERA, DLD comps and service-charge tracking — without Sunday-afternoon spreadsheets.",
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
            For the Dubai-resident investor with a local book
          </div>
          <h1
            className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.04] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Three apartments. Two off-plan. One mortgage. Where&rsquo;s the dashboard?
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            You&rsquo;re a Dubai-based professional or business owner with
            3 to 30 units across the Marina, JVC, Saadiyat, the Palm — and
            an off-plan unit handing over next year. Your time is worth
            hundreds an hour. You shouldn&rsquo;t be hunting RERA index
            data in tabs at 11pm.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup?campaign=dubai-tracker&utm_source=dubai_tracker_lp&utm_medium=cta&utm_campaign=dubai_tracker&utm_content=hero"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get your Dubai portfolio off Excel — 7-day trial
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
            Yield doesn&rsquo;t leak out of bad investments. It leaks out of bad admin.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Pain
              tag="Pain #1"
              title="The WhatsApp & PDF Nightmare"
              body="Three management companies. Two Owners' Association WhatsApp groups. A service-charge invoice that arrived as a photo. An Ejari PDF in your inbox from 2023. Whose tenancy is rolling — and is the rent at market?"
              cost="If you can't answer 'what was my real net cashflow last quarter — by tower' in 10 seconds, you're already losing yield to admin."
            />
            <Pain
              tag="Pain #2"
              title="Reversion Anxiety"
              body="The Marina 2-bed RERA index says +12% YoY. Your tenant signed at AED 95k in 2024 — comparable units are letting at AED 118k now. Service charges on the Downtown unit went up 14% this quarter. None of this is in any one place."
              cost="One missed RERA renewal at the right rent compounds quarterly. One off-plan payment plan missed costs developer-grade penalties. The cost of not knowing is always higher than the cost of knowing."
            />
            <Pain
              tag="Pain #3"
              title="Spreadsheet Fatigue"
              body="It's Saturday morning at home in Emirates Hills. You've got a meeting on Monday. You should be at the beach with the kids. You're updating the same Excel you've maintained for four years."
              cost="If your time is worth AED 1,500/hour, a Saturday morning of admin is AED 6,000. That's a flight to London. That's a weekend with your sister. That's not what Dubai was supposed to look like."
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
            Five outcomes. Specific to a Dubai book.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Outcome
              title="Real net cashflow, in 10 seconds."
              body="Forward every management statement and service-charge invoice to one inbox. Rent in, costs out, by tower, in AED. The dashboard tells you the truth your Excel was supposed to."
            />
            <Outcome
              title="RERA renewal windows caught at the right rent."
              body="Your unit's rent vs the live RERA per-area index. When the renewal window opens and you're 8%+ below market, we flag it with comparable evidence to send your letting agent."
            />
            <Outcome
              title="Service-charge audit, per tower per sqft."
              body="Track service charge per sqft against community benchmarks. When the JLT bill jumps 14% YoY while neighbours sit flat, you see it before you pay it."
            />
            <Outcome
              title="Off-plan rolling-return modelling."
              body="Payment plan, cost of money, intermediate exit vs hold-to-handover. Built for Dubai's developer-led market — not a generic IRR calc."
            />
            <Outcome
              title="Saturdays back."
              body="Set up takes 90 seconds via voice or 3 minutes via spreadsheet. From there it's automatic. AED invoices and English statements both work; no language tagging needed."
            />
            <Outcome
              title="DLD comparables on tap."
              body="When you're deciding whether to sell the Downtown unit and roll into off-plan, DLD comp transactions are surfaced next to your unit — not buried six tabs deep on a portal."
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
              title="The Dubai-Marina resident-investor"
              shape="Lives in the Marina, owns the unit she lives in plus three more around JVC and the Greens. A Saturday-spreadsheet veteran."
            />
            <Persona
              title="The expatriated-British in Palm Jumeirah"
              shape="Sold up in Surrey, rolled into a Palm villa and three Downtown rentals. Still files a UK return. Cares about reversion timing."
            />
            <Persona
              title="The Saadiyat resident with Abu Dhabi units"
              shape="A senior medic on Saadiyat. Five clinical-staff rentals around Reem and Yas. Wants the RERA index for Abu Dhabi, not Dubai."
            />
            <Persona
              title="The family-office director with off-plan"
              shape="London-headquartered family office, four Dubai off-plan units across Emaar and DAMAC. Payment plans, handover dates, capital cycles."
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

      {/* ── Trust block — live indicators + outcome statement + cross-link */}
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
                Sitting next to every unit in your dashboard.
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
            className="mt-8 text-[16px] leading-[1.6] text-[var(--color-ink)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Built for owners running 3 to 30 properties in our nine
            covered markets. The product can ingest, structure and
            analyse a typical 8-unit Dubai book in 90 seconds — across
            towers, payment plans and service-charge regimes.
          </p>
          <p
            className="mt-4 text-[16px] leading-[1.6] text-[var(--color-ink)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Letting your unit on a holiday-let platform? Operator quality
            varies wildly in Dubai. Our reference guide on auditing them:
          </p>
          <Link
            href="/resources/str-operator-performance-check"
            className="mt-3 inline-flex items-center text-[14px] font-semibold text-[var(--color-accent)] hover:underline"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Read: How to audit your short-term rental operator&rsquo;s performance →
          </Link>
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
              Trial includes the off-plan rolling-return calculator (normally Pro-only)
            </div>
            <p
              className="mt-6 text-[15px] leading-[1.6] text-[var(--color-ink)] max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Pro is €49/month. If we catch one sub-market rent review at
              the next RERA renewal, the year pays for itself in the first
              month. If we catch one inflated service-charge increase, it
              pays for itself again.
            </p>
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
            Get your Dubai portfolio off Excel.
          </h2>
          <p
            className="mt-4 text-[16px] leading-[1.55] text-[var(--color-muted)] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Forward one Ejari, one service-charge invoice, or your last
            management statement. Real net cashflow on your first unit by
            the end of the day.
          </p>
          <Link
            href="/signup?campaign=dubai-tracker&utm_source=dubai_tracker_lp&utm_medium=cta&utm_campaign=dubai_tracker&utm_content=final"
            className="mt-7 inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[var(--color-navy)] text-white text-[16px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Get your Dubai portfolio off Excel →
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
