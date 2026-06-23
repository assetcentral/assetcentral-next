// GetStartedSection — homepage "here's what your first property looks
// like" section. Replaces the "every morning" briefing + "what changes"
// capability sections with a single concrete worked example: data
// table on the left, 5-year equity progression chart on the right.
//
// The visitor sees what their property record will look like after
// onboarding before they've had to imagine it. Data + chart both
// reuse the canonical sample set in lib/mmm-samples.ts so the homepage
// preview stays in lock-step with the deeper /model page.

import Link from "next/link";

import { SAMPLE_PROPERTY } from "@/lib/mmm-samples";
import { EquityProjectionChart } from "./mmm/model-charts";

/* ── Input-row kind tag styles ───────────────────────────────── */

const KIND_LABEL: Record<string, string> = {
  value: "Asset value",
  income: "Income",
  debt: "Debt",
  cost: "Cost",
  calc: "Calculated",
};

const KIND_TINT: Record<string, string> = {
  value: "rgba(79, 110, 247, 0.10)",
  income: "rgba(22, 163, 74, 0.10)",
  debt: "rgba(220, 38, 38, 0.10)",
  cost: "rgba(217, 119, 6, 0.10)",
  calc: "rgba(139, 92, 246, 0.10)",
};

const KIND_FG: Record<string, string> = {
  value: "var(--color-accent)",
  income: "var(--color-positive)",
  debt: "var(--color-negative)",
  cost: "var(--color-warning)",
  calc: "var(--color-cio-deep)",
};

export function GetStartedSection() {
  return (
    <section
      id="get-started"
      aria-label="Get started — see what a modelled property looks like"
      className="bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* ── Section heading ─────────────────────────────────── */}
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Get started
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Here&rsquo;s what a modelled property looks like.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.6] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            One property in. Inputs categorised, yields calculated, five-year value
            case projected against four decisions. This is the shape every property
            takes on after a ten-minute onboarding — sample numbers, real layout.
          </p>
        </div>

        {/* ── Two-column: data table + chart ──────────────────── */}
        <div className="mt-10 lg:mt-12 grid gap-5 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-start">
          {/* ── Data table card ───────────────────────────────── */}
          <article
            className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <header className="px-5 lg:px-6 py-5 border-b border-[var(--color-border)]">
              <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Property #1 · {SAMPLE_PROPERTY.currency}
              </p>
              <h3
                className="mt-1 text-[20px] lg:text-[22px] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {SAMPLE_PROPERTY.name}
              </h3>
              <p className="mt-1 text-[13px] text-[var(--color-muted)]">
                {SAMPLE_PROPERTY.type}
              </p>
            </header>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px] text-[var(--color-ink)]">
                <caption className="sr-only">
                  Modelled inputs and calculated yields for {SAMPLE_PROPERTY.name},
                  an example property.
                </caption>
                <thead className="bg-[var(--color-surface)] text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  <tr>
                    <th scope="col" className="px-5 py-2.5 font-semibold">
                      Input
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-semibold">
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-2.5 text-right font-semibold"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_PROPERTY.inputs.map((row, idx) => {
                    const isCalc =
                      idx === SAMPLE_PROPERTY.inputs.length - 3;
                    return (
                      <tr
                        key={row.label}
                        className={
                          isCalc
                            ? "border-t border-[var(--color-border)] bg-[color:rgba(79,110,247,0.03)]"
                            : "border-t border-[var(--color-border)]"
                        }
                      >
                        <th
                          scope="row"
                          className="px-5 py-2.5 font-medium text-[var(--color-ink)] align-top"
                        >
                          {row.label}
                        </th>
                        <td className="px-3 py-2.5 align-top">
                          <span
                            className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap"
                            style={{
                              backgroundColor: KIND_TINT[row.kind],
                              color: KIND_FG[row.kind],
                            }}
                          >
                            {KIND_LABEL[row.kind]}
                          </span>
                        </td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-[var(--color-navy)] font-semibold align-top whitespace-nowrap">
                          {row.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <footer className="px-5 lg:px-6 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex flex-wrap items-center justify-between gap-3 text-[12px] text-[var(--color-muted)]">
              <span>Calculated row highlighted</span>
              <span className="tabular-nums">
                8 inputs · 0 assumptions overridden
              </span>
            </footer>
          </article>

          {/* ── Equity projection chart ─────────────────────── */}
          <div>
            <EquityProjectionChart />
          </div>
        </div>

        {/* ── Bottom CTA rail ─────────────────────────────────── */}
        <div
          className="mt-10 lg:mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 lg:px-8 lg:py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div>
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-accent)] font-semibold">
              Ready to model yours
            </p>
            <p className="mt-1 text-[15px] lg:text-[16px] text-[var(--color-navy)] leading-snug">
              Send a tenancy contract, a mortgage statement and a service-charge
              demand — your first property is on paper in under ten minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              href="/signup?plan=pro_monthly&intent=direct"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-navy)] px-5 py-3 text-[14.5px] font-semibold text-white transition hover:bg-[var(--color-navy-light)]"
            >
              Build the map
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/model"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-border)] bg-white px-5 py-3 text-[14.5px] font-semibold text-[var(--color-navy)] transition hover:border-[var(--color-navy)]"
            >
              See more scenarios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
