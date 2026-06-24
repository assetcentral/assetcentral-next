import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Was 51 chars before suffix; this lands at 43 chars before suffix
  // so the appended "| AssetCentral" still fits inside ~60 total.
  title: "Free Property Investment Calculators",
  // Was 192 chars; trimmed to ~155.
  description:
    "IRR, short-term rental yield, retrofit, mortgage and ownership comparator. Free tools for residential property investors — no account required.",
  alternates: { canonical: "/calculators" },
};

interface Calc {
  slug: string
  name: string
  /** Plain-English question the calculator answers — what the visitor
   *  is actually trying to find out. Sits above the output line so the
   *  card reads as Q → A from top to bottom. */
  question: string
  /** What the calculator returns — the four-or-so numbers the visitor
   *  walks away with. */
  output: string
  /** CTA label specific to the calculator. "Run mortgage numbers" /
   *  "Check buy-to-let" etc — more useful than a generic "Open". */
  cta: string
  /** Inputs the visitor will be asked for. Shown small at the bottom
   *  of the card as a transparency cue. */
  inputs: string[]
  /** Gated calculators land on a marketing-LP rather than a live tool.
   *  The tile shows a "Trial required" pill and CTA copy nudging signup;
   *  click goes to the landing page which itself funnels to /signup. */
  gated?: boolean
}

const calcs: Calc[] = [
  {
    slug: "mortgage",
    name: "Mortgage calculator",
    question: "Can I afford this property?",
    output: "Monthly payment, deposit, total interest, stamp duty / transfer tax, affordability warning.",
    cta: "Run mortgage numbers",
    inputs: ["Country", "Resident or non-resident", "Property price", "Deposit", "Rate", "Term", "Loan type"],
  },
  {
    slug: "irr",
    name: "Buy-to-let calculator",
    question: "Does this property make money?",
    output: "Gross yield, net yield, monthly cash flow, levered IRR — plus AssetCentral verdict.",
    cta: "Check buy-to-let",
    inputs: ["Purchase price", "Deposit", "Mortgage rate", "Annual rent", "Exit price", "Hold period"],
  },
  {
    slug: "sell-or-hold",
    name: "Sell or hold checker",
    question: "Should I keep this property or sell?",
    output: "Equity today, hold-vs-sell ending wealth, return on equity, simple hold/sell signal.",
    cta: "Run sell or hold",
    inputs: ["Current value", "Mortgage balance", "Monthly cash flow", "Growth %", "Alt return %", "Horizon"],
  },
  {
    slug: "refinance",
    name: "Refinance checker",
    question: "Would a new mortgage improve my return?",
    output: "Old payment vs new payment, monthly saving, fee payback, 5- and 10-year net.",
    cta: "Check refinance",
    inputs: ["Current balance", "Current rate", "New rate", "New term", "Arrangement fee", "Exit fee"],
  },
  {
    slug: "retrofit",
    name: "Renovation ROI checker",
    question: "Are the works worth doing?",
    output: "Works cost, rent uplift, value uplift, project NPV, payback period.",
    cta: "Check works ROI",
    inputs: ["Upgrade cost", "Monthly rent uplift", "Valuation uplift", "Hold period", "Discount rate"],
  },
  {
    slug: "rent-out",
    name: "Rent-out checker",
    question: "What rent do I need to cover my costs?",
    output: "Break-even rent, rent needed to hit your target margin, monthly margin after costs.",
    cta: "Check rent needed",
    inputs: ["Mortgage", "Service charge", "Insurance", "Maintenance %", "Management %", "Vacancy"],
  },
  {
    slug: "str-yield",
    name: "Short-let vs long-let checker",
    question: "Would short-term rental outperform a long tenant?",
    output: "Annual income each way, occupancy sensitivity, cost difference, basic recommendation.",
    cta: "Compare rental options",
    inputs: ["ADR", "Occupancy %", "Operator commission", "Annual costs"],
  },
  {
    slug: "ownership",
    name: "Ownership comparator",
    question: "Cash purchase or mortgage — which wins?",
    output: "Cash-on-cash, levered IRR, year-1 cashflow at two LTVs side-by-side.",
    cta: "Compare ownership",
    inputs: ["Purchase price", "LTV options", "Mortgage rate", "Annual rent", "Hold period"],
  },
  {
    slug: "off-plan",
    name: "Off-plan rolling-return calculator",
    question: "Does this off-plan investment still make sense?",
    output: "Deposit exposure, remaining payments, estimated value, rolling return, exit options.",
    cta: "Check off-plan return",
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
              Free tools to run the numbers first.
            </h1>
            <p
              className="mt-5 text-[17px] lg:text-[19px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Before you buy, sell, mortgage, refinance, renovate or rent out a
              property, use AssetCentral&rsquo;s free calculators and AI property
              checks to see whether the numbers make sense. No account required.
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
                    <LockIcon /> Free 7-day trial
                  </div>
                )}
                <h2
                  className="text-[22px] lg:text-[26px] leading-[1.15] text-[var(--color-navy)] mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.name}
                </h2>
                {/* Plain-English question, italic, muted — primes the
                    visitor to read the output that follows as the
                    answer. Reads as Q → A from top to bottom. */}
                <p
                  className="text-[14px] italic text-[var(--color-muted)] mb-3"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.question}
                </p>
                <p
                  className="text-[14.5px] leading-[1.55] text-[var(--color-ink)] mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.output}
                </p>
                <div
                  className="text-[12px] text-[var(--color-muted)] mb-5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Inputs: {c.inputs.join(" · ")}
                </div>
                <span
                  className={`inline-flex items-center text-[14px] font-semibold group-hover:underline ${
                    c.gated ? "text-emerald-700" : "text-[var(--color-accent)]"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.gated ? "See what's inside →" : `${c.cta} →`}
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
              href="/signup?plan=pro_monthly&intent=direct"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors whitespace-nowrap"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Subscribe now
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
