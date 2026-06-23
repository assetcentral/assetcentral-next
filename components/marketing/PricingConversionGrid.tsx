// PricingConversionGrid — the "what do you actually get for €49?"
// section that sits above the plan cards on /pricing.
//
// The conventional pricing page leads with the plan grid and lets the
// visitor decide what €49 is worth in isolation. This component does
// the work for them: it compares AssetCentral Pro against the two
// alternatives a 2-50 property owner actually evaluates against —
// hiring a junior analyst, or running everything from a spreadsheet
// stack — across the dimensions that matter when you're making a
// €49/month decision.
//
// Server component. No state. Styled with the existing design tokens
// so it slots cleanly between the pricing hero and the plan cards.

import Link from "next/link";

interface Row {
  dimension: string;
  analyst: string;
  spreadsheet: string;
  assetcentral: string;
  /** When true, the AssetCentral cell renders bold + accent-coloured. */
  highlight?: boolean;
}

const ROWS: Row[] = [
  {
    dimension: "Annual cost",
    analyst: "€50,000 – €65,000 + on-costs",
    spreadsheet: "“Free” + your weekends",
    assetcentral: "€588 / year",
    highlight: true,
  },
  {
    dimension: "Hours of cover",
    analyst: "~40 a week",
    spreadsheet: "As many as you donate",
    assetcentral: "Continuous",
    highlight: true,
  },
  {
    dimension: "Live operational data",
    analyst: "Refreshed when they get to it",
    spreadsheet: "Refreshed when you remember",
    assetcentral: "On document arrival",
  },
  {
    dimension: "Standardized underwriting",
    analyst: "If they were trained well",
    spreadsheet: "If you build it from scratch",
    assetcentral: "Built in, every property",
  },
  {
    dimension: "Debt-maturity map",
    analyst: "Manually maintained",
    spreadsheet: "Manually maintained",
    assetcentral: "Automatic, to the day",
  },
  {
    dimension: "Rate-shock + lease-rollover stress tests",
    analyst: "Ad-hoc, on request",
    spreadsheet: "Rebuilt every cycle",
    assetcentral: "One click per scenario",
  },
  {
    dimension: "Refinance pack, lender-ready",
    analyst: "3 – 5 working days",
    spreadsheet: "A weekend you'll resent",
    assetcentral: "On demand, PDF + Word",
  },
  {
    dimension: "Document parsing (PDF, WhatsApp, statements)",
    analyst: "Their inbox, your problem",
    spreadsheet: "Yours, manually",
    assetcentral: "Automated",
  },
  {
    dimension: "Variance tracking against budget",
    analyst: "Quarterly review",
    spreadsheet: "Whenever it occurs to you",
    assetcentral: "Continuous",
  },
  {
    dimension: "Time to a defensible hold/sell decision",
    analyst: "2 – 3 weeks",
    spreadsheet: "A weekend of modelling",
    assetcentral: "Under 2 minutes",
    highlight: true,
  },
  {
    dimension: "Capital runway, portfolio-level",
    analyst: "If they know how",
    spreadsheet: "Almost certainly not",
    assetcentral: "Modelled, stress-tested",
  },
  {
    dimension: "Audit trail you can hand a lender",
    analyst: "If they wrote it up",
    spreadsheet: "The spreadsheet you saved",
    assetcentral: "Exportable, dated, sourced",
  },
];

export function PricingConversionGrid() {
  return (
    <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        {/* ── Heading ───────────────────────────────────────── */}
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What €49 actually buys
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The same architecture. Three different price points.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.6] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A junior real-estate analyst, a spreadsheet stack, or AssetCentral Pro. The honest comparison across the dimensions that decide whether a 2-to-50 property portfolio compounds or drifts.
          </p>
        </div>

        {/* ── Comparison ────────────────────────────────────── */}
        <div className="mt-10">
          {/* Desktop table */}
          <div
            className="hidden md:block rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px] text-[var(--color-ink)]">
                <caption className="sr-only">
                  Side-by-side comparison of a junior real-estate analyst, a spreadsheet
                  stack, and AssetCentral Pro across cost, coverage, underwriting,
                  debt-maturity tracking and decision speed.
                </caption>
                <thead className="bg-[var(--color-surface)] text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold w-[28%]">
                      Dimension
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Junior analyst
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Spreadsheet stack
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold text-[var(--color-navy)]">
                      AssetCentral Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, idx) => (
                    <tr
                      key={row.dimension}
                      className={idx > 0 ? "border-t border-[var(--color-border)]" : ""}
                    >
                      <th
                        scope="row"
                        className="px-5 py-3.5 font-medium text-[var(--color-navy)] align-top"
                      >
                        {row.dimension}
                      </th>
                      <td className="px-5 py-3.5 text-[var(--color-muted)] align-top">
                        {row.analyst}
                      </td>
                      <td className="px-5 py-3.5 text-[var(--color-muted)] align-top">
                        {row.spreadsheet}
                      </td>
                      <td
                        className={`px-5 py-3.5 align-top ${
                          row.highlight
                            ? "font-semibold text-[var(--color-accent)]"
                            : "text-[var(--color-ink)]"
                        }`}
                      >
                        {row.assetcentral}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile card stack — same content, paired comparisons */}
          <ul className="md:hidden space-y-3">
            {ROWS.map((row) => (
              <li
                key={row.dimension}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <p className="text-[12px] uppercase tracking-[0.1em] text-[var(--color-muted)] font-semibold">
                  {row.dimension}
                </p>
                <dl className="mt-3 space-y-2 text-[13px]">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-[var(--color-muted)] shrink-0">Junior analyst</dt>
                    <dd className="text-[var(--color-ink)] text-right">{row.analyst}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-[var(--color-muted)] shrink-0">Spreadsheet</dt>
                    <dd className="text-[var(--color-ink)] text-right">{row.spreadsheet}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 pt-1 border-t border-[var(--color-border)]">
                    <dt className="text-[var(--color-navy)] font-semibold shrink-0">AssetCentral Pro</dt>
                    <dd
                      className={`text-right ${
                        row.highlight
                          ? "text-[var(--color-accent)] font-semibold"
                          : "text-[var(--color-ink)]"
                      }`}
                    >
                      {row.assetcentral}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>

        {/* ── The math, said plainly ───────────────────────── */}
        <div
          className="mt-12 grid md:grid-cols-[2fr_1fr] gap-6 items-start"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 lg:p-7">
            <h3
              className="text-[20px] lg:text-[22px] text-[var(--color-navy)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The math, said plainly.
            </h3>
            <p className="mt-4 text-[15px] leading-[1.6] text-[var(--color-ink)]">
              A junior analyst costs ~€55,000 a year and watches the portfolio about
              forty hours a week. A spreadsheet costs nothing and watches it whenever
              you do.
            </p>
            <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-ink)]">
              <strong className="font-semibold text-[var(--color-navy)]">
                AssetCentral Pro costs €588 a year and watches it 168 hours a week.
              </strong>{" "}
              Per property at the low end of the target range — two properties — that
              is <span className="font-semibold">€24.50 per property per month</span>.
              At fifty properties it is <span className="font-semibold">€0.98</span>.
            </p>
            <p className="mt-3 text-[14px] leading-[1.6] text-[var(--color-muted)]">
              The institutional desks you compete with for stock pay six-figure
              salaries to assemble the same architecture. They aren&rsquo;t paying for
              talent you don&rsquo;t have. They are paying for infrastructure
              you&rsquo;ve been forced to do without.
            </p>
          </div>

          <aside className="rounded-2xl border-2 border-[var(--color-navy)] bg-white p-6 lg:p-7">
            <p
              className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-accent)] font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The honest close
            </p>
            <p className="mt-3 text-[15px] leading-[1.55] text-[var(--color-ink)]">
              You will not get a better instinct for under €50 a month. You already
              have the instinct. €49 buys you the{" "}
              <strong className="font-semibold">decision-making architecture</strong>{" "}
              that turns instinct into a defensible position — the same architecture
              the fund on the other side of your next transaction is running on.
            </p>
            <Link
              href="/signup?plan=pro_monthly&intent=direct"
              className="mt-5 inline-flex items-center justify-center gap-2 w-full rounded-md bg-[var(--color-navy)] px-5 py-3 text-[14.5px] font-semibold text-white transition hover:bg-[var(--color-navy-light)]"
            >
              Build the map
              <span aria-hidden>→</span>
            </Link>
            <p className="mt-3 text-[12px] text-[var(--color-muted)] text-center">
              7-day trial. No card.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
