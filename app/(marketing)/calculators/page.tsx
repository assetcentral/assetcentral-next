import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Property Investment Calculators | AssetCentral",
  description:
    "IRR calculator, STR yield calculator, retrofit cost estimator, and ownership comparator. Free tools for residential property investors. No account required.",
  alternates: { canonical: "/calculators" },
};

interface Calc {
  slug: string
  name: string
  blurb: string
  inputs: string[]
  /** Gated calculators land on a marketing-LP rather than a live tool.
   *  The tile shows a "Trial required" pill and CTA copy nudging signup;
   *  click goes to the landing page which itself funnels to /signup. */
  gated?: boolean
}

const calcs: Calc[] = [
  {
    slug: "mortgage",
    name: "Mortgage Calculator",
    blurb:
      "Country-specific rules for 8 markets. Monthly payment, stamp duty / transfer tax, LTV limits, cash needed at completion.",
    inputs: ["Country", "Resident or non-resident", "Property price", "Deposit", "Rate", "Term", "Loan type"],
  },
  {
    slug: "irr",
    name: "IRR Calculator",
    blurb:
      "Model your full return over any hold period — gross yield, cash-on-cash, and IRR after exit.",
    inputs: ["Purchase price", "Deposit", "Mortgage rate", "Annual rent", "Exit price", "Hold period"],
  },
  {
    slug: "str-yield",
    name: "STR Yield Calculator",
    blurb:
      "Short-term rental vs long-let. See whether the agency commission and seasonality leave you better or worse off.",
    inputs: ["ADR", "Occupancy %", "Operator commission", "Annual costs"],
  },
  {
    slug: "retrofit",
    name: "Retrofit Cost Calculator",
    blurb:
      "Estimate upgrade costs and the rent uplift they unlock. See payback period and net yield change.",
    inputs: ["Upgrade cost", "Monthly rent uplift", "Hold period", "Discount rate"],
  },
  {
    slug: "ownership",
    name: "Ownership Comparator",
    blurb:
      "Outright vs mortgaged. Compare cash-on-cash, leverage, and total return for the same property.",
    inputs: ["Purchase price", "LTV options", "Mortgage rate", "Annual rent", "Hold period"],
  },
  {
    slug: "off-plan",
    name: "Off-Plan Rolling-Return Calculator",
    blurb:
      "Should you assign now or hold to handover? Rolling launch-to-handover model with cost of money, payment plan, scenario snapshots, value-path chart, and live DLD market comps. Dubai-focused but works for any off-plan market.",
    inputs: ["Launch date", "Payment plan", "Growth periods", "Current market value", "Cost of money", "Project / area"],
    gated: true,
  },
];

export default function CalculatorsHubPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <div className="max-w-3xl">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Free tools
            </p>
            <h1
              className="text-[44px] lg:text-[56px] leading-[1.05] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Free tools for smarter property decisions.
            </h1>
            <p
              className="mt-5 text-[17px] lg:text-[19px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Used by thousands of landlords before they buy, sell, or refinance. No account required. Save your results and import them into your portfolio later.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {calcs.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className={`group rounded-2xl border bg-white p-7 lg:p-8 transition ${
                  c.gated
                    ? "border-[var(--color-border)] hover:border-emerald-500 hover:shadow-[0_20px_50px_-30px_rgba(16,185,129,0.3)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-navy)] hover:shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)]"
                }`}
              >
                {/* Gating pill — anchored top-right of the title so the
                    tile reads as "this exists but needs a trial" before
                    the user clicks. Free tiles render no pill. */}
                {c.gated && (
                  <div
                    className="inline-flex items-center gap-1 mb-3 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <LockIcon /> Free 14-day trial
                  </div>
                )}
                <h2
                  className="text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.name}
                </h2>
                <p
                  className="text-[14.5px] leading-[1.6] text-[var(--color-ink)] mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.blurb}
                </p>
                <div
                  className="text-[12px] text-[var(--color-muted)] mb-5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Inputs: {c.inputs.join(" · ")}
                </div>
                <span
                  className={`inline-flex items-center text-[14px] font-medium group-hover:underline ${
                    c.gated ? "text-emerald-700" : "text-[var(--color-accent)]"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.gated ? "See what's inside →" : "Use calculator →"}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <h3
                className="text-[20px] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Want to track your portfolio, not just individual assets?
              </h3>
              <p
                className="mt-1 text-[14px] text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                AssetCentral imports calculator results into a full portfolio workspace.
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors whitespace-nowrap"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start free trial
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** Small padlock SVG used by gated tiles. Stroke-only so it inherits
 *  the emerald colour from the surrounding pill text. */
function LockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
