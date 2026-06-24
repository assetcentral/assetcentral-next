// /check — the B2C free AI property check funnel.
//
// Phase 2 of the "Don't Buy Blind" repositioning. The homepage hero,
// persona router, FreeAIResultSection, FreeVsProSection and FinalCta
// all point here. Standalone page (no navbar collapse / no calculator
// chrome — this is the conversion experience, not a tool page).

import type { Metadata } from "next";
import { PropertyCheckClient } from "./PropertyCheckClient";

const TITLE = "Free AI Property Check — Mortgage, Yield, Cash Flow, Stress Test | AssetCentral";
const DESCRIPTION =
  "Run any property through nine checks in 60 seconds: mortgage, gross + net yield, cash flow, DSCR, rate / vacancy / rent stress tests, capital required, five-year cash flow and an AI verdict with red flag + fix. No card.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/check" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
};

export default function CheckPage() {
  return (
    <main className="bg-[color:var(--color-surface)]">
      {/* ── Page header ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-12 lg:pt-16 pb-8">
          <p
            className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)] font-semibold mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            FREE AI PROPERTY CHECK · 9 CHECKS · 60 SECONDS
          </p>
          <h1
            className="text-[36px] md:text-[44px] lg:text-[52px] leading-[1.05] text-[color:var(--color-navy)] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A proper underwrite of the property, before you commit.
          </h1>
          <p
            className="mt-4 text-[16px] lg:text-[18px] leading-[1.55] text-[color:var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Not a basic mortgage calculator. AssetCentral runs your property
            through the same checks a fund credit committee runs: mortgage,
            yield, cash flow, debt cover, stress tests for rate / void / rent
            shocks, capital required, five-year cumulative cash flow and an AI
            verdict with the single biggest red flag and the one fix that
            would change it. 60 seconds. No card.
          </p>
        </div>
      </section>

      {/* ── What this check covers ──────────────────────────────
           Sets expectations BEFORE the user sees Step 1 (which is
           mortgage inputs and could otherwise read as "just a
           mortgage calculator"). Eight cells, two rows, no chrome
           — keeps the page above-the-fold compact. */}
      <section className="bg-[color:var(--color-surface)] border-b border-[color:var(--color-border)]">
        <div
          className="mx-auto max-w-5xl px-6 lg:px-10 py-8 lg:py-10"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <p
            className="text-[11.5px] uppercase tracking-[0.12em] text-[color:var(--color-muted)] font-semibold mb-4"
          >
            What the check covers
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-3">
            {CHECK_DIMENSIONS.map((d) => (
              <li key={d.title} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-2 w-2 rounded-full bg-[color:var(--color-accent)] flex-shrink-0"
                />
                <div>
                  <p className="text-[13.5px] font-semibold text-[color:var(--color-navy)] leading-tight">
                    {d.title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-[1.45] text-[color:var(--color-muted)]">
                    {d.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The flow ────────────────────────────────────────── */}
      <PropertyCheckClient />
    </main>
  );
}

const CHECK_DIMENSIONS = [
  { title: "Monthly mortgage", body: "Payment, total interest, loan-to-value." },
  { title: "Gross & net yield", body: "After vacancy and operating costs." },
  { title: "Real monthly cash flow", body: "Rent minus opex minus debt service." },
  { title: "DSCR (debt cover)", body: "How much your rent covers the mortgage." },
  { title: "Rate-shock stress test", body: "What happens at +200bps." },
  { title: "Vacancy stress test", body: "Six-month void impact on annual cash." },
  { title: "5-year cumulative cash flow", body: "What you'll pocket — or pay in." },
  { title: "AI verdict + red flag + fix", body: "Attractive · Borderline · Risky, with the one lever to pull." },
] as const;
