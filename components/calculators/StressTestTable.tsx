"use client";

// 3-row stress-test mini-table that drops beneath any calculator's
// result panel. Shows how the headline metric moves under three
// plausible stresses — gives the visitor a free "wow" without
// duplicating the full scenario-analysis surface that Starter
// unlocks (10y forecast, sensitivities across the whole life of
// the investment, capital-growth scenarios, etc).
//
// The data is pre-computed by the parent calculator and passed in.
// Keeps this component pure presentation so each calculator can run
// its own three scenarios using its own engine.

interface StressRow {
  /** What we're stressing — e.g. "Mortgage rate +200bps". */
  label: string;
  /** Base value (formatted by the parent). */
  base: string;
  /** Value under stress (formatted by the parent). */
  stressed: string;
  /** Optional tone to colour the stressed value:
   *   - "negative" — worse than base (default for cashflow-style rows)
   *   - "positive" — better than base
   *   - "warning" — borderline */
  tone?: "negative" | "positive" | "warning" | "neutral";
}

export interface StressTestTableProps {
  /** Headline that names the metric being stressed (e.g. "Monthly cash
   *  flow under stress" or "Net yield under stress"). */
  metricLabel: string;
  /** Three rows. Always three — fewer would feel skimpy, more would
   *  start to leak the Starter scenario-analysis surface. */
  rows: [StressRow, StressRow, StressRow];
  /** Optional one-line interpretation under the table. */
  caption?: string;
}

const TONE_CLASS = {
  negative: "text-[var(--color-negative)]",
  positive: "text-[var(--color-positive)]",
  warning: "text-[var(--color-warning)]",
  neutral: "text-[var(--color-ink)]",
} as const;

export function StressTestTable({ metricLabel, rows, caption }: StressTestTableProps) {
  return (
    <section
      aria-label="Stress test"
      className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 lg:p-6"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-accent)] font-semibold mb-1">
            Free stress test
          </p>
          <h3 className="text-[16px] font-semibold text-[color:var(--color-navy)]">
            {metricLabel}
          </h3>
        </div>
        <p className="text-[11.5px] text-[color:var(--color-muted)] italic">
          Three what-ifs. Starter unlocks the full sensitivity grid.
        </p>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
            <th className="py-2 pr-4 font-medium">What if</th>
            <th className="py-2 px-4 text-right font-medium">Base</th>
            <th className="py-2 pl-4 text-right font-medium">Under stress</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const toneClass = TONE_CLASS[r.tone ?? "negative"];
            return (
              <tr
                key={r.label}
                className="border-t border-[var(--color-border)] text-[14px]"
              >
                <td className="py-2.5 pr-4 text-[color:var(--color-ink)]">
                  {r.label}
                </td>
                <td className="py-2.5 px-4 text-right num text-[color:var(--color-ink)]">
                  {r.base}
                </td>
                <td className={`py-2.5 pl-4 text-right num font-semibold ${toneClass}`}>
                  {r.stressed}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {caption && (
        <p className="mt-4 text-[12.5px] leading-[1.5] text-[color:var(--color-muted)] italic">
          {caption}
        </p>
      )}
    </section>
  );
}
