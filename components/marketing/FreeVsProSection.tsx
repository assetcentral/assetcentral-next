// FreeVsProSection — short, scannable comparison of what's free vs
// what Pro unlocks. Sits between the free-AI-result preview and the
// existing Pro positioning section. The point is to set expectations:
// free is real and useful for one property; Pro is for portfolios and
// for decisions that justify a deeper, recurring workflow.
//
// No edge stripes / decorative bars (banned). Cards differentiated by
// shadow + a single coloured chip in the header.

import Link from "next/link";

interface Row {
  /** Capability label. */
  label: string;
  /** Free column — true / false / short string. */
  free: boolean | string;
  /** Pro column — same. */
  pro: boolean | string;
}

const ROWS: Row[] = [
  { label: "Mortgage calculator", free: true, pro: true },
  { label: "Rental yield + cash flow check", free: true, pro: true },
  { label: "AI verdict (attractive / borderline / risky)", free: true, pro: true },
  { label: "One red flag + one improvement suggestion", free: true, pro: true },
  { label: "Email a copy of the result", free: true, pro: true },
  { label: "Save and compare multiple properties", free: false, pro: true },
  { label: "10-year cash flow forecast", free: false, pro: true },
  { label: "Rate-shock + lease-rollover stress tests", free: false, pro: true },
  { label: "Hold-vs-sell, refinance and renovation scenarios", free: false, pro: true },
  { label: "Lender-ready credit packs + tax reports", free: false, pro: true },
  { label: "Voice line + 5-agent AI team", free: false, pro: true },
  { label: "Continuous monitoring + alerts", free: false, pro: true },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span
        className="text-[16px] font-bold"
        style={{ color: "var(--color-positive)" }}
        aria-label="included"
      >
        ✓
      </span>
    );
  if (v === false)
    return (
      <span
        className="text-[16px]"
        style={{ color: "var(--color-border)" }}
        aria-label="not included"
      >
        —
      </span>
    );
  return (
    <span className="text-[13px] text-[color:var(--color-ink)] tabular-nums">
      {v}
    </span>
  );
}

export function FreeVsProSection() {
  return (
    <section
      id="free-vs-pro"
      aria-label="Free vs Pro — what each tier gives you"
      className="bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            FREE VS PRO
          </p>
          <h2
            className="text-[30px] lg:text-[40px] leading-[1.1] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Free for one property. Pro for the rest of the decision.
          </h2>
          <p
            className="mt-4 text-[16px] lg:text-[17px] leading-[1.55] text-[color:var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The free check is real — same calculator, same AI verdict the Pro
            user runs on every property. Pro adds the depth and the workflow:
            stress tests, multi-property comparison, lender-ready exports and
            continuous monitoring.
          </p>
        </div>

        {/* ── Comparison table ────────────────────────────────── */}
        <div
          className="mt-10 rounded-2xl border border-[color:var(--color-border)] bg-white overflow-hidden"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] text-[color:var(--color-ink)]">
              <caption className="sr-only">
                Side-by-side comparison of what AssetCentral Free includes
                versus what Pro adds.
              </caption>
              <thead className="bg-[color:var(--color-surface)] text-[11.5px] uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold w-[58%]">
                    Capability
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold text-center">
                    <div style={{ color: "var(--color-positive)" }}>Free</div>
                    <div className="font-normal normal-case tracking-normal text-[11px] text-[color:var(--color-muted)]">
                      No card · 60s
                    </div>
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold text-center">
                    <div className="text-[color:var(--color-navy)]">Pro</div>
                    <div className="font-normal normal-case tracking-normal text-[11px] text-[color:var(--color-muted)]">
                      €49 / month
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={r.label}
                    className={
                      i > 0 ? "border-t border-[color:var(--color-border)]" : ""
                    }
                  >
                    <th
                      scope="row"
                      className="px-5 py-3 font-medium text-[color:var(--color-ink)] align-top"
                    >
                      {r.label}
                    </th>
                    <td className="px-5 py-3 text-center align-top">
                      <Cell v={r.free} />
                    </td>
                    <td className="px-5 py-3 text-center align-top">
                      <Cell v={r.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className="px-5 py-4 border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12.5px] text-[color:var(--color-muted)]">
            <span>
              Same calculator engine. Same AI. The difference is depth and
              workflow.
            </span>
            <div className="flex gap-3">
              <Link
                href="/check"
                className="text-[13px] font-semibold text-[color:var(--color-positive)] hover:underline"
              >
                Run a free check →
              </Link>
              <Link
                href="/pricing"
                className="text-[13px] font-semibold text-[color:var(--color-accent)] hover:underline"
              >
                See Pro pricing →
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
