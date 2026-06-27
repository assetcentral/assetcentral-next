// Structure — second stage of the five-stage framework. Owns the SEO
// and ad-funnel for "structure property data" / "property data
// normalisation" intent. Sister pages: /capture, /model, /monitor,
// /manage.
//
// Structure mirrors /model and /capture so the five pillar pages read
// as a set — hero, why-it-matters, what structuring delivers, what
// gets normalised, next pillar nav, final CTA.

import type { Metadata } from "next";
import Link from "next/link";
import { PillarFaq } from "@/components/marketing/PillarFaq";

const TITLE = "Structure Property Data into Clean Records | AssetCentral";
const DESCRIPTION =
  "Mixed currencies, country-specific tax, irregular statements, photographed contracts — your CFO normalises all of it into one comparable record per asset. Free Attractive / Borderline / Risky verdict on every property.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/structure" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
};

const WHAT_STRUCTURING_DELIVERS = [
  {
    icon: "🧮",
    label: "Free AI verdict",
    body:
      "Attractive · Borderline · Risky — instant read on any new property, plus the key number, the biggest red flag and one suggested next move.",
  },
  {
    icon: "💱",
    label: "Multi-currency normalisation",
    body:
      "Daily FX conversion to your base currency. AED, GBP, USD and EUR live side-by-side without you doing the maths.",
  },
  {
    icon: "🌍",
    label: "Country-specific tax framing",
    body:
      "Each asset is filed against the right tax framework — UK Section 24, UAE freehold, Irish CGT — so downstream models start from the right baseline.",
  },
  {
    icon: "📂",
    label: "Field-level normalisation",
    body:
      "Lease, loan, ownership and statement fields all conform to one schema. Comparing two properties is a row-by-row read, not a translation exercise.",
  },
] as const;

const WHAT_GETS_STRUCTURED = [
  "Address + country + tax framework",
  "Purchase price + current valuation (any currency)",
  "Monthly rent + review dates",
  "Loan balance + rate + reset window",
  "Service charge + agency fees",
  "Lease terms + tenant + renewal status",
  "Ownership structure (personal vs corporate)",
  "Yield, cash flow, DSCR, equity multiple",
] as const;

const NAVY = "#1a1a2e";

export default function StructurePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Stage 02 · Structure
          </p>
          <h1
            className="text-[44px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Structure raw inputs into one clean record per property.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Mixed currencies, country-specific tax rules, irregular statements,
            photographed contracts — your Chief Financial Officer normalises all
            of it into a single comparable asset record. Every downstream stage
            works off the same clean numbers.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/check"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Get a free AI verdict →
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
            Free AI verdict on any property. No card, no signup.
          </p>
        </div>
      </section>

      {/* ── Definition intro (200 words) — owns the "What is property
           data structuring?" type informational query. ── */}
      <section
        aria-label="What is property data structuring?"
        className="bg-white border-t border-[color:var(--color-border)]"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-12 lg:py-16">
          <h2
            className="text-[22px] lg:text-[26px] leading-[1.2] text-[color:var(--color-navy)] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What is property data structuring?
          </h2>
          <p
            className="mt-4 text-[15.5px] lg:text-[16.5px] leading-[1.7] text-[color:var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Property data structuring is the step that takes raw inputs &mdash;
            mixed currencies, country-specific tax frameworks, irregular
            operator statements, photographed contracts &mdash; and normalises
            them into one clean, comparable record per asset. A spreadsheet that
            blends AED and GBP figures, a rent number that's actually gross of
            management fees, a purchase price that ignored stamp duty and
            conveyancing: these are the inputs that produce bad decisions
            downstream, even when the modelling logic is sound. Structuring
            removes that whole class of error before it can reach a model. Every
            field is held in the same units. Every property is comparable to
            every other. Currency conversion runs against daily FX. Tax framing
            is applied per country. The result is a single asset record that's
            ready for every downstream stage &mdash; modelling, monitoring,
            managing &mdash; without manual reformatting at each step. Structure
            is also where AssetCentral produces its free AI verdict
            (Attractive, Borderline or Risky) on any new property, because the
            verdict can only be trusted when the underlying numbers are. The
            stage is led by your AI Chief Financial Officer, the second of five
            agents in the framework.
          </p>
        </div>
      </section>

      {/* ── Why structure matters ────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Bad decisions are usually bad data with confident framing.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A spreadsheet mixing AED and GBP. A rent figure that&rsquo;s actually
            gross of management fees. A purchase price that ignored stamp duty
            and conveyancing. Most decision errors trace back to inputs that were
            never normalised. Structure removes that whole class of error before
            it can reach a model — one clean record per asset, every field in
            the same units, every property comparable to every other.
          </p>
        </div>
      </section>

      {/* ── What structuring delivers ────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What structuring delivers
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Raw in. Clean asset record out.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHAT_STRUCTURING_DELIVERS.map((p) => (
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

      {/* ── What gets structured ─────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What the record contains
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Eight normalised fields per property.
          </h2>
          <ul
            className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {WHAT_GETS_STRUCTURED.map((line) => (
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
            q: "What does \"structuring\" property data actually mean?",
            a: "It means taking raw inputs in whatever form they arrive (spreadsheet, email, photograph, voice memo) and turning them into a single clean record per asset, with every field in standard units. Currencies converted to your base. Costs separated from gross figures. Tax framing applied per country. The result is one row per property that's directly comparable to every other property in your portfolio.",
          },
          {
            q: "How does AssetCentral handle multi-currency portfolios?",
            a: "Daily FX conversion to your base currency, with every original-currency figure retained for audit. If you own in AED, GBP and EUR, the dashboard shows everything in your chosen base (typically your home currency for tax purposes) while letting you drill into the original-currency figures on any asset. Reports and lender packs render in the base currency by default but can be re-rendered in any other.",
          },
          {
            q: "Does the AI verdict really only take 60 seconds?",
            a: "Yes — the free AI property check on /check takes typical inputs (price, rent, mortgage, costs) and returns one of three verdicts (Attractive, Borderline or Risky) plus the single biggest red flag and one suggested next move. The same engine runs on every paid property added later; the structuring step is what makes that verdict trustworthy, because the numbers underneath have been normalised first.",
          },
          {
            q: "What if my country has unusual tax rules?",
            a: "AssetCentral applies country-specific tax framing for the major markets it serves (UK Section 24, UAE freehold rules, Irish CGT, France SCI structures and so on). For markets outside the covered set, you can override the assumptions on a per-property basis and the modelling will respect them — the structuring layer simply needs the right framework label so downstream stages know which rules to apply.",
          },
          {
            q: "Why is structuring separated out as its own stage?",
            a: "Because modelling, monitoring and action-ranking all assume clean data. When property data lives in spreadsheets, structuring happens implicitly inside each calculation — and inconsistently, because every formula author makes slightly different assumptions. Separating structuring out as a stage makes those assumptions explicit, documented and auditable. Every downstream stage works off the same standardised baseline.",
          },
        ]}
      />

      {/* ── Next stage nav ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: NAVY }} className="text-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-white/55 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Next stage
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Once it&rsquo;s structured, you can model the decision.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-white/75 max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Structure produces the clean record. Model runs the underwrite —
            IRR, rate-shock at +200bps, sell-vs-hold, 10-year cash-flow — on the
            same standardised baseline a fund&rsquo;s investment committee would
            use.
          </p>
          <div
            className="mt-7 flex flex-wrap gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/model"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[14.5px] font-medium hover:bg-white/90 transition-colors"
            >
              How Model works →
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-white/20 text-white text-[14.5px] font-medium hover:bg-white/5 transition-colors"
            >
              See the full journey
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
            Get a clean asset record. Free.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Run a free AI property check — verdict + key number + biggest red
            flag in 60 seconds. No card, no signup.
          </p>
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/check"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Run a free check
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
