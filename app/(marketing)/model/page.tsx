// Model — first pillar of the three-pillar framework. The page that
// owns the SEO and ad-funnel for "model my portfolio" / "portfolio
// modelling" intent. Sister pages: /monitor, /manage.
//
// The page is structured top-to-bottom:
//   1. Hero — pillar eyebrow, headline, sub, two CTAs (Add property /
//      Watch the explainer).
//   2. Why Model matters — the framing that a portfolio without a
//      model is just a list, not an asset class.
//   3. What you can model — ingestion paths (Voice, document upload,
//      spreadsheet, manual), illustrated as a 4-card grid.
//   4. The agents on Model — names the two agents that lead this
//      pillar (Chief Investment Officer + Personal Assistant) so visitors map agents
//      to pillars from the outset.
//   5. Cross-link to /monitor — "once your portfolio is modelled,
//      monitor it" navigation.
//   6. Final CTA + FAQ-style "What if I don't have all the docs?"
//      reassurance.

import type { Metadata } from "next";
import Link from "next/link";

import {
  ModelledPropertySection,
  ScenarioComparisonSection,
  ScenarioProjectionSection,
  AiTeamContributionSection,
  DataCompletenessSection,
} from "@/components/marketing/mmm/model-visuals";
import { PillarFaq } from "@/components/marketing/PillarFaq";

const TITLE = "Model Property Investment Decisions | AssetCentral";
const DESCRIPTION =
  "Underwrite every property decision before you make it. IRR, rate-shock at +200bps, lease rollover, yield drift — the same standardized framework an investment committee runs. €49/month.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/model" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
};

const INGESTION_PATHS = [
  {
    icon: "🎙",
    label: "Voice",
    body:
      "Tell AC Voice the address, the rent, and the mortgage. It fills in the rest from market data.",
  },
  {
    icon: "📎",
    label: "Documents",
    body:
      "Drop a tenancy contract, mortgage statement, or rent receipt. The agents extract what they need.",
  },
  {
    icon: "📊",
    label: "Spreadsheet",
    body:
      "Upload an Excel or CSV — even a messy one. The import wizard maps columns and confirms before saving.",
  },
  {
    icon: "✍",
    label: "Manual",
    body:
      "Type the address. Google autocomplete handles the geography. Add fields as you have them.",
  },
] as const;

const WHAT_GETS_MODELLED = [
  "Rent (current + market benchmark)",
  "Mortgage product, rate, term, LTV",
  "Service charge, agent fees, voids, repairs",
  "Yield (gross, net), IRR, cash-on-cash",
  "Ownership structure (personal vs. corporate)",
  "Market position vs. local comparables",
  "Refinance windows and rate-reset risk",
  "Currency exposure for cross-border owners",
] as const;

const NAVY = "#1a1a2e";

export default function ModelPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pillar II · Structural Experience
          </p>
          <h1
            className="text-[44px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Underwrite every decision before you make it.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Investment committees don&rsquo;t approve hold-vs-sell from instinct. They run the same modelled framework on every property — IRR, cash-on-cash, rate-shock at +200bps, lease rollover at -10%. AssetCentral ships that framework as a one-click underwrite on each of your properties.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup?plan=pro_monthly&intent=direct"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Underwrite your first property →
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

      {/* ── Definition intro (200 words) — owns the "What is property
           modelling?" type informational query. ── */}
      <section
        aria-label="What is property modelling?"
        className="bg-white border-t border-[color:var(--color-border)]"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-12 lg:py-16">
          <h2
            className="text-[22px] lg:text-[26px] leading-[1.2] text-[var(--color-navy)] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What is property modelling?
          </h2>
          <p
            className="mt-4 text-[15.5px] lg:text-[16.5px] leading-[1.7] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Property modelling is the discipline of projecting the financial
            outcome of a property decision before you commit capital. For a
            single property it means running the underwriting an investment
            committee would run on every deal: IRR, cash-on-cash return,
            10-year cash-flow forecast, rate-shock at &plus;200bps, lease
            rollover at &minus;10%, capital growth scenarios. For an existing
            asset it means re-running those projections every time the inputs
            change &mdash; a refinance window opens, a tenancy comes up for
            renewal, a stamp-duty rule changes &mdash; so the decision in front
            of you is always informed by the latest numbers. Most private
            owners run a partial version of modelling in their head, commit the
            capital, then discover the gap twelve months later when the
            variance lands in the bank account. AssetCentral ships the same
            standardised modelling framework that institutional desks use,
            scaled to private portfolios of 2&ndash;50 properties. Modelling
            is the third of five stages in the framework (Capture &middot;
            Structure &middot; Model &middot; Monitor &middot; Manage) and is
            led by your AI Chief Investment Officer.
          </p>
        </div>
      </section>

      {/* ── Why model matters ────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The institutional desks aren&rsquo;t smarter. They&rsquo;re structured.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A fund&rsquo;s investment committee runs the same modelled framework on every property — IRR, cash-on-cash, equity multiple, stress-tested at +100, +200, +300bps, lease rolled at -5%, -10%, -15%. Private investors run the same calculation in their head, commit the capital, and discover the gap twelve months later when the variance lands. AssetCentral gives you the framework, not the headcount.
          </p>
        </div>
      </section>

      {/* ── New: concrete demo sections (modelled property, scenarios,
              5-year progression charts, data completeness, AI team) ── */}
      <ModelledPropertySection />
      <ScenarioComparisonSection />
      <ScenarioProjectionSection />
      <DataCompletenessSection />
      <AiTeamContributionSection />

      {/* ── Ingestion paths ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Four ways in
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Use what you have. Skip the data-entry chore.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INGESTION_PATHS.map((p) => (
              <div
                key={p.label}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="text-[28px] leading-none" aria-hidden>{p.icon}</div>
                <div
                  className="mt-3 text-[18px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.label}
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--color-ink)]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What gets modelled ──────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What the model captures
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Eight columns of truth per property.
          </h2>
          <ul
            className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {WHAT_GETS_MODELLED.map((line) => (
              <li key={line} className="flex items-start gap-2 leading-[1.5]">
                <span aria-hidden className="text-[var(--color-accent)] shrink-0 mt-[2px]">›</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ + JSON-LD FAQPage schema ───────────────────────────── */}
      <PillarFaq
        faqs={[
          {
            q: "What is property modelling, in plain English?",
            a: "Running the numbers on a property decision the way a fund's investment committee would: IRR, cash-on-cash, 10-year cash-flow forecast, stress tests at +200bps and -10% rent. Not a back-of-envelope estimate, not a spreadsheet you'll lose track of — a documented, repeatable framework you can re-run any time the inputs change.",
          },
          {
            q: "How is this different from a property calculator?",
            a: "Calculators give you one number on one assumption set. Modelling gives you the full surface — base / bull / bear scenarios, sensitivity to rate moves, sensitivity to rent moves, year-by-year cash-flow projection over 10 years, and the verdict that comes out of all of that combined. A calculator answers \"what's the yield?\". Modelling answers \"should I do this deal?\".",
          },
          {
            q: "What scenarios does AssetCentral stress-test by default?",
            a: "Rate-shock at +100, +200 and +300 basis points (relevant for variable and fix-then-revert mortgages). Lease rollover at -5%, -10% and -15% (relevant for short-term-rental and end-of-fixed-term lets). Capital growth at the bull / base / bear levels for the relevant market. Each scenario re-projects the 10-year cash flow so you can see when the deal breaks.",
          },
          {
            q: "Do I need to know all my inputs before modelling can start?",
            a: "No. Modelling runs on what you have and flags what's missing. If you don't know the service charge yet, the model uses a market-typical figure for the building type and country, and labels the assumption as a gap to fill. As you capture more data, the gaps close and the projection tightens. You don't have to wait for complete data to start.",
          },
          {
            q: "Can the model handle sell-vs-hold and refinance scenarios?",
            a: "Yes — both are first-class. Sell-vs-hold compares the NPV of holding (cumulative net yield plus capital growth) against the NPV of selling now and putting the equity to work elsewhere at your chosen alternative return. Refinance compares the old loan against any new product structure including arrangement fees, term extensions and rate-type changes, and tells you the cumulative cash impact over the remaining mortgage term.",
          },
        ]}
      />

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
            Once your portfolio is modelled, you need to monitor it.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-white/75 max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Modelling is one-time per property. Monitoring is forever.
            The framework moves from setup to live tracking the moment
            the first rent comes in.
          </p>
          <div
            className="mt-7 flex flex-wrap gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/monitor"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[14.5px] font-medium hover:bg-white/90 transition-colors"
            >
              How Monitor works →
            </Link>
            <Link
              href="/manage"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-white/20 text-white text-[14.5px] font-medium hover:bg-white/5 transition-colors"
            >
              How Manage works →
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
            Model your first property in ten minutes.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free for up to 3 properties. No card. You bring what you
            have, the agents do the rest.
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
              href="/calculators"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              Try the calculators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
