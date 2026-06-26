// FreeVsProSection — 3-column comparison (Free · Individual · Pro) on the
// homepage. Reads as the upgrade ladder from the freemium repositioning:
// Free runs the first numbers, Individual unlocks the full property
// decision report, Pro adds the portfolio command centre.
//
// Component name kept for import-history reasons even though it's now
// a 3-way table. Mounted on the homepage between the example analysis
// card and the Pro transition band.
//
// No edge stripes / decorative bars (banned). Cards differentiated by
// shadow + a single coloured chip in the header.

import Link from "next/link";

interface Row {
  /** Capability label. */
  label: string;
  free: boolean | string;
  individual: boolean | string;
  pro: boolean | string;
}

const ROWS: Row[] = [
  // Everyone-gets group — establishes that Free is real.
  { label: "8 free Level 1 calculators", free: true, individual: true, pro: true },
  { label: "Free AI property check — verdict + red flag + next move", free: true, individual: true, pro: true },
  { label: "3-row stress test on every calculator", free: true, individual: true, pro: true },
  { label: "Email or save the result", free: true, individual: true, pro: true },
  { label: "Saved properties", free: "1", individual: "Up to 3", pro: "Up to 50" },

  // Individual unlocks — the full property decision report.
  { label: "Full property decision report (PDF + Word)", free: false, individual: true, pro: true },
  { label: "10-year cash-flow forecast", free: false, individual: true, pro: true },
  { label: "Scenario analysis (rate · rent · capital growth)", free: false, individual: true, pro: true },
  { label: "Sell-vs-hold + refinance modelling", free: false, individual: true, pro: true },
  { label: "Side-by-side property comparison", free: false, individual: true, pro: true },
  { label: "Tax-adjusted analysis per country", free: false, individual: true, pro: true },
  { label: "Multi-currency tracking (EUR · GBP · USD · AED)", free: false, individual: true, pro: true },

  // Pro unlocks — the portfolio command centre.
  { label: "Portfolio dashboard + real-time net-yield monitoring", free: false, individual: false, pro: true },
  { label: "5-agent AI team — CIO · CFO · COO · CEO · PA", free: false, individual: false, pro: true },
  { label: "22 monitoring alert types (email + WhatsApp)", free: false, individual: false, pro: true },
  { label: "Document vault + AI extraction", free: false, individual: false, pro: true },
  { label: "Voice line — phone in and talk to your AI team", free: false, individual: false, pro: true },
  { label: "Lender packs (Refinancing · Investor · Tax)", free: false, individual: false, pro: true },
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
      aria-label="Free vs Individual vs Pro — what each tier gives you"
      className="bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            FREE VS STARTER VS PRO
          </p>
          <h2
            className="text-[30px] lg:text-[40px] leading-[1.1] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Free for the first numbers. Individual for the full report. Pro for the
            portfolio.
          </h2>
          <p
            className="mt-4 text-[16px] lg:text-[17px] leading-[1.55] text-[color:var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free is real — the same calculator and AI verdict a Individual or Pro
            user runs on every property. Individual unlocks the full decision
            report. Pro adds the portfolio command centre — dashboard, agents,
            monitoring, lender packs.
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
                Side-by-side comparison of what AssetCentral Free, Individual and
                Pro each include.
              </caption>
              <thead className="bg-[color:var(--color-surface)] text-[11.5px] uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold w-[46%]">
                    Capability
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold text-center">
                    <div style={{ color: "var(--color-positive)" }}>Free</div>
                    <div className="font-normal normal-case tracking-normal text-[11px] text-[color:var(--color-muted)]">
                      No card · forever
                    </div>
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold text-center">
                    <div className="text-[color:var(--color-navy)]">Individual</div>
                    <div className="font-normal normal-case tracking-normal text-[11px] text-[color:var(--color-muted)]">
                      €19 / month · 7-day trial
                    </div>
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold text-center">
                    <div className="text-[color:var(--color-navy)]">Pro</div>
                    <div className="font-normal normal-case tracking-normal text-[11px] text-[color:var(--color-muted)]">
                      €49 / month · 7-day trial
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
                      <Cell v={r.individual} />
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
              Same calculator engine and AI across all three tiers. The
              difference is depth, persistence and the portfolio layer.
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link
                href="/signup?plan=free"
                className="text-[13px] font-semibold text-[color:var(--color-positive)] hover:underline"
              >
                Sign up free →
              </Link>
              <Link
                href="/check"
                className="text-[13px] font-semibold text-[color:var(--color-muted)] hover:underline"
              >
                Run a free check →
              </Link>
              <Link
                href="/signup?plan=individual_monthly"
                className="text-[13px] font-semibold text-[color:var(--color-accent)] hover:underline"
              >
                Try Individual free for 7 days →
              </Link>
              <Link
                href="/pricing"
                className="text-[13px] font-semibold text-[color:var(--color-navy)] hover:underline"
              >
                See full pricing →
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
