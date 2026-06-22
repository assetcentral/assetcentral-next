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

const TITLE = "Model Property Investment Decisions | AssetCentral";
const DESCRIPTION =
  "See what a modelled property looks like — inputs, yields, scenarios and AI-team review. Compare hold, sell, refinance and renovation cases with example portfolio data. From €19/month.";

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
            Pillar 01 · Model
          </p>
          <h1
            className="text-[44px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Every property, on paper, in 10 minutes.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Upload a tenancy contract. Paste a rent receipt. Tell AC Voice
            the address. The model builds itself — rent, mortgage, costs,
            ownership, market position — and five AI agents validate as
            you go.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Model your first property →
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

      {/* ── Why model matters ────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Without a model, your portfolio is just a list.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A spreadsheet with addresses, rents, and mortgages is data —
            not a model. A model knows what each line item should be,
            flags when it isn&rsquo;t, and projects what changes when
            something shifts. That&rsquo;s the difference between knowing
            you own a property and knowing how it&rsquo;s actually
            performing.
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
