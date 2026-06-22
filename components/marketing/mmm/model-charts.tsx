// Time-series charts for the /model pillar page.
//
// Two pure-SVG, accessible charts that show how a property's value
// evolves under each scenario. Both come with a sr-only <table>
// fallback so screen readers and people with images disabled get
// the exact numbers, not just the visual shape.
//
// Values are illustrative — base equity (current value − mortgage)
// projected forward five years under each scenario with a simple
// blend of appreciation, retained cash flow, and one-off capex /
// reinvestment effects. The shapes are right; the absolute numbers
// are a design system, not a forecast.

import { ExampleBadge, ComplianceNote } from "./shared";

/* ── Equity projection (multi-line) ──────────────────────────── */

interface SeriesPoint {
  label: string;
  color: string;
  // Six values: Y0, Y1, ..., Y5 — AED thousands.
  points: [number, number, number, number, number, number];
  note: string;
}

const SERIES: SeriesPoint[] = [
  {
    label: "Hold as-is",
    color: "var(--color-muted)",
    points: [1430, 1540, 1660, 1786, 1919, 2061],
    note: "Steady appreciation + retained cash flow.",
  },
  {
    label: "Refinance",
    color: "var(--color-cfo-deep)",
    points: [1430, 1565, 1709, 1864, 2030, 2210],
    note: "Lower debt cost lifts the slope from Y1.",
  },
  {
    label: "Improve + raise rent",
    color: "var(--color-cio-deep)",
    points: [1330, 1490, 1668, 1865, 2083, 2326],
    note: "Capex dips Y0, higher rent compounds after.",
  },
  {
    label: "Sell + reinvest",
    color: "var(--color-warning)",
    points: [1430, 1516, 1607, 1703, 1805, 1914],
    note: "Equity recycled into a lower-yield asset class.",
  },
];

const YEARS = ["Y0", "Y1", "Y2", "Y3", "Y4", "Y5"] as const;

// SVG geometry. The chart is a fluid block — width comes from the
// container, height from the viewBox.
const W = 760;
const H = 320;
const PAD = { top: 24, right: 28, bottom: 44, left: 56 };
const INNER_W = W - PAD.left - PAD.right;
const INNER_H = H - PAD.top - PAD.bottom;

const Y_MIN = 1200;
const Y_MAX = 2400;
const Y_TICKS = [1200, 1500, 1800, 2100, 2400] as const;

const xOf = (idx: number) => PAD.left + (idx / 5) * INNER_W;
const yOf = (v: number) =>
  PAD.top + INNER_H - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * INNER_H;

const buildPath = (pts: readonly number[]) =>
  pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`)
    .join(" ");

const fmt = (k: number) => (k >= 1000 ? `${(k / 1000).toFixed(1)}m` : `${k}k`);

export function EquityProjectionChart() {
  return (
    <article
      className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <header className="px-5 lg:px-6 py-5 border-b border-[var(--color-border)] flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Dubai Marina Apartment · 5-year projection
          </p>
          <h3
            className="mt-1 text-[20px] lg:text-[22px] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Equity progression by scenario
          </h3>
          <p className="mt-1 text-[12.5px] text-[var(--color-muted)]">
            Cumulative equity in AED, ending each year. Starts at AED 1.43m (current value
            less mortgage balance).
          </p>
        </div>
        <ExampleBadge label="Sample AssetCentral output" />
      </header>

      <div className="px-3 lg:px-5 pt-4 pb-2">
        <svg
          role="img"
          aria-label="Cumulative equity over five years for four scenarios — Hold, Refinance, Improve and raise rent, Sell and reinvest. Numeric values follow in the table below."
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* ── Y gridlines + labels ──────────────────────── */}
          {Y_TICKS.map((tick) => {
            const y = yOf(tick);
            return (
              <g key={tick}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={y}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeDasharray={tick === Y_MIN ? "0" : "2 4"}
                />
                <text
                  x={PAD.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="var(--color-muted)"
                >
                  AED {fmt(tick)}
                </text>
              </g>
            );
          })}

          {/* ── X axis ticks ──────────────────────────────── */}
          {YEARS.map((y, i) => (
            <text
              key={y}
              x={xOf(i)}
              y={H - PAD.bottom + 22}
              textAnchor="middle"
              fontSize="11"
              fill="var(--color-muted)"
            >
              {y}
            </text>
          ))}

          {/* ── Series paths ──────────────────────────────── */}
          {SERIES.map((s) => (
            <g key={s.label}>
              <path
                d={buildPath(s.points)}
                stroke={s.color}
                strokeWidth={2.5}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {s.points.map((v, i) => (
                <circle
                  key={i}
                  cx={xOf(i)}
                  cy={yOf(v)}
                  r={3.5}
                  fill="white"
                  stroke={s.color}
                  strokeWidth={2}
                />
              ))}
              {/* End-of-line label */}
              <text
                x={xOf(5) + 4}
                y={yOf(s.points[5]!) + 3}
                fontSize="10.5"
                fill={s.color}
                fontWeight="600"
                textAnchor="start"
                style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 3 }}
              >
                {`AED ${fmt(s.points[5]!)}`}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* ── Legend ─────────────────────────────────────────── */}
      <ul
        className="px-5 lg:px-6 pb-5 pt-3 grid grid-cols-2 lg:grid-cols-4 gap-2 text-[12.5px]"
        aria-label="Chart legend"
      >
        {SERIES.map((s) => (
          <li key={s.label} className="flex items-start gap-2 text-[var(--color-ink)]">
            <span
              aria-hidden
              className="mt-[6px] inline-block h-1 w-4 rounded-full shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span>
              <span className="font-semibold">{s.label}</span>
              <span className="block text-[var(--color-muted)] text-[11.5px] leading-tight">
                {s.note}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* ── Accessible data table ──────────────────────────── */}
      <details className="px-5 lg:px-6 pb-5 text-[12.5px]">
        <summary className="cursor-pointer text-[var(--color-muted)] hover:text-[var(--color-navy)]">
          Show numeric values
        </summary>
        <table className="mt-3 w-full text-left tabular-nums text-[var(--color-ink)]">
          <caption className="sr-only">
            Cumulative equity in AED thousands by year for each scenario.
          </caption>
          <thead className="text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
            <tr>
              <th scope="col" className="py-1 pr-3 font-semibold">Scenario</th>
              {YEARS.map((y) => (
                <th key={y} scope="col" className="py-1 px-2 text-right font-semibold">
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SERIES.map((s) => (
              <tr key={s.label} className="border-t border-[var(--color-border)]">
                <th scope="row" className="py-1 pr-3 font-medium text-[var(--color-navy)]">
                  {s.label}
                </th>
                {s.points.map((v, i) => (
                  <td key={i} className="py-1 px-2 text-right">
                    {fmt(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <footer className="px-5 lg:px-6 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <ComplianceNote />
      </footer>
    </article>
  );
}

/* ── Annual cash-flow trajectory (stacked bars) ──────────────── */

// Per-year P&L for the "Improve and raise rent" scenario. Rent
// rises in Y1 after refurb, costs creep at 2.5%/yr, debt service
// is constant. Net = rent − costs − debt. AED.
interface YearRow {
  year: string;
  rent: number;
  costs: number;
  debt: number;
  net: number;
}

const CASHFLOW_YEARS: YearRow[] = [
  { year: "Y1", rent: 165_000, costs: 38_000, debt: 63_000, net: 64_000 },
  { year: "Y2", rent: 170_000, costs: 39_000, debt: 63_000, net: 68_000 },
  { year: "Y3", rent: 175_000, costs: 40_000, debt: 63_000, net: 72_000 },
  { year: "Y4", rent: 180_000, costs: 41_000, debt: 63_000, net: 76_000 },
  { year: "Y5", rent: 185_000, costs: 42_000, debt: 63_000, net: 80_000 },
];

const fmtK = (n: number) => `${Math.round(n / 1000)}k`;

export function AnnualCashflowChart() {
  // Bar geometry. Each year gets a column whose height is the rent
  // (top of stack); costs and debt drop down from rent; the net
  // sliver is what remains. Layout is pure flex — no SVG needed,
  // which keeps it crisp at every breakpoint.
  const maxRent = Math.max(...CASHFLOW_YEARS.map((r) => r.rent));

  return (
    <article
      className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <header className="px-5 lg:px-6 py-5 border-b border-[var(--color-border)] flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Improve + raise rent · annual breakdown
          </p>
          <h3
            className="mt-1 text-[20px] lg:text-[22px] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What makes the cash flow, year by year.
          </h3>
          <p className="mt-1 text-[12.5px] text-[var(--color-muted)]">
            Rent, costs and debt service for one scenario over five years. Net cash flow is
            what falls through.
          </p>
        </div>
        <ExampleBadge label="Sample AssetCentral output" />
      </header>

      {/* ── Chart ─────────────────────────────────────────── */}
      <div className="px-5 lg:px-6 pt-5">
        <ul
          className="flex items-end justify-between gap-2 lg:gap-4 h-[220px]"
          aria-label="Annual cash-flow composition. Numeric values in the table below."
          role="presentation"
        >
          {CASHFLOW_YEARS.map((row) => {
            const rentH = (row.rent / maxRent) * 100;
            const costH = (row.costs / row.rent) * rentH;
            const debtH = (row.debt / row.rent) * rentH;
            const netH = (row.net / row.rent) * rentH;
            return (
              <li key={row.year} className="flex-1 flex flex-col items-center gap-2 h-full">
                <div className="flex-1 w-full flex items-end" aria-hidden>
                  <div className="relative w-full max-w-[64px] mx-auto h-full">
                    {/* Costs (top slice) */}
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-t-md"
                      style={{
                        height: `${rentH}%`,
                        backgroundColor: "var(--color-warning)",
                        opacity: 0.85,
                      }}
                      title={`Costs ${fmtK(row.costs)}`}
                    />
                    {/* Debt service (middle slice) */}
                    <div
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        height: `${rentH - costH}%`,
                        backgroundColor: "var(--color-negative)",
                        opacity: 0.85,
                      }}
                      title={`Debt service ${fmtK(row.debt)}`}
                    />
                    {/* Net (bottom slice — what the owner keeps) */}
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-b-md"
                      style={{
                        height: `${netH}%`,
                        backgroundColor: "var(--color-positive)",
                      }}
                      title={`Net ${fmtK(row.net)}`}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                    {row.year}
                  </p>
                  <p className="mt-0.5 text-[12.5px] font-semibold text-[var(--color-positive)] tabular-nums">
                    Net {fmtK(row.net)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Legend ─────────────────────────────────────────── */}
      <ul
        className="px-5 lg:px-6 py-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[var(--color-ink)]"
        aria-label="Stacked-bar legend"
      >
        <li className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: "var(--color-warning)", opacity: 0.85 }}
          />
          Costs
        </li>
        <li className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: "var(--color-negative)", opacity: 0.85 }}
          />
          Debt service
        </li>
        <li className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: "var(--color-positive)" }}
          />
          Net cash flow
        </li>
        <li className="ml-auto text-[var(--color-muted)]">
          Total rent collected sits at the top of each bar.
        </li>
      </ul>

      {/* ── Accessible numbers ─────────────────────────────── */}
      <details className="px-5 lg:px-6 pb-5 text-[12.5px]">
        <summary className="cursor-pointer text-[var(--color-muted)] hover:text-[var(--color-navy)]">
          Show numeric values
        </summary>
        <div className="overflow-x-auto">
          <table className="mt-3 w-full text-left tabular-nums text-[var(--color-ink)]">
            <caption className="sr-only">
              Annual rent, costs, debt service and net cash flow in AED for the Improve and
              raise rent scenario, years 1 to 5.
            </caption>
            <thead className="text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="py-1 pr-3 font-semibold">Year</th>
                <th scope="col" className="py-1 px-2 text-right font-semibold">Rent</th>
                <th scope="col" className="py-1 px-2 text-right font-semibold">Costs</th>
                <th scope="col" className="py-1 px-2 text-right font-semibold">Debt service</th>
                <th scope="col" className="py-1 px-2 text-right font-semibold">Net</th>
              </tr>
            </thead>
            <tbody>
              {CASHFLOW_YEARS.map((r) => (
                <tr key={r.year} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="py-1 pr-3 font-medium text-[var(--color-navy)]">
                    {r.year}
                  </th>
                  <td className="py-1 px-2 text-right">AED {fmtK(r.rent)}</td>
                  <td className="py-1 px-2 text-right">AED {fmtK(r.costs)}</td>
                  <td className="py-1 px-2 text-right">AED {fmtK(r.debt)}</td>
                  <td className="py-1 px-2 text-right text-[var(--color-positive)] font-semibold">
                    AED {fmtK(r.net)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <footer className="px-5 lg:px-6 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <ComplianceNote />
      </footer>
    </article>
  );
}
