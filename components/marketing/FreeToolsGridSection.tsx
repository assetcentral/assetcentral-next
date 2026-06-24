// Free Level 1 tools grid — "Run the first numbers, free."
//
// 2026-06 Phase 2 repositioning. Replaces the older CalculatorsCta
// teaser. Eight free tools cover the eight property decisions
// AssetCentral helps people think through (buy / sell / mortgage /
// refinance / renovate / rent-out / yield / STR-vs-LTR). Each tool
// runs in plain English, captures email only when the user wants the
// AI summary, and ends with the same upgrade path to a full report.

import Link from "next/link";

interface Tool {
  /** Display name. */
  name: string;
  /** The question this tool answers — first person. */
  question: string;
  /** What the tool returns. */
  output: string;
  /** Page to send the user to. */
  href: string;
  /** True when the tool is live on the marketing site today. False
   *  cards still surface (so the grid stays complete) but link to
   *  /check as the closest available substitute and carry a "soon"
   *  chip. */
  live: boolean;
}

const TOOLS: Tool[] = [
  {
    name: "Mortgage calculator",
    question: "Can I afford this property?",
    output: "Monthly payment, deposit, total interest, affordability warning.",
    href: "/calculators/mortgage",
    live: true,
  },
  {
    name: "Buy-to-let calculator",
    question: "Does this property make money?",
    output: "Gross yield, net yield, monthly cash flow, IRR over hold period.",
    href: "/calculators/irr",
    live: true,
  },
  {
    name: "Rental yield checker",
    question: "Is the rent good enough?",
    output: "Gross yield, net yield, rent needed to hit your target.",
    href: "/check",
    live: true,
  },
  {
    name: "Sell or hold checker",
    question: "Should I keep this property or sell?",
    output: "Estimated equity, cash flow, return on equity, hold-vs-sell signal.",
    href: "/calculators/sell-or-hold",
    live: true,
  },
  {
    name: "Renovation ROI checker",
    question: "Are the works worth doing?",
    output: "Cost of works, rent uplift, value uplift, payback period.",
    href: "/calculators/retrofit",
    live: true,
  },
  {
    name: "Rent-out checker",
    question: "What rent do I need to cover costs?",
    output: "Break-even rent, target rent, margin after costs.",
    href: "/calculators/rent-out",
    live: true,
  },
  {
    name: "Refinance checker",
    question: "Would a new mortgage improve my return?",
    output: "Old vs new payment, cash flow change, payback period for fees.",
    href: "/calculators/refinance",
    live: true,
  },
  {
    name: "Short-let vs long-let checker",
    question: "Would short-term rental outperform a normal tenant?",
    output: "Annual income each way, occupancy sensitivity, recommendation.",
    href: "/calculators/str-yield",
    live: true,
  },
];

export function FreeToolsGridSection() {
  return (
    <section
      id="free-tools"
      aria-label="Free tools to run the first numbers"
      className="bg-white py-16 lg:py-24 border-t border-[color:var(--color-border)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            FREE TOOLS
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Free tools to run the first numbers.
          </h2>
          <p
            className="mt-3 text-[16px] lg:text-[17px] leading-[1.55] text-[color:var(--color-ink)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Start with the question you actually have. Each tool returns the
            numbers immediately, then offers a free AI sense-check — no card,
            no spam. Upgrade only when you need the full decision report.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map((t) => (
            <ToolCard key={t.name} tool={t} />
          ))}
        </div>

        <p
          className="mt-10 text-[14px] text-[color:var(--color-muted)] text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          A mortgage calculator tells you the payment. AssetCentral tells you
          whether the property makes sense.
        </p>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.href}
      className="group block rounded-2xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] p-5 transition hover:border-[color:var(--color-navy)] hover:bg-white hover:shadow-[0_12px_32px_-18px_rgba(15,23,42,0.25)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <h3 className="text-[16.5px] font-semibold text-[color:var(--color-navy)]">
          {tool.name}
        </h3>
        <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[color:var(--color-positive)]">
          Free
        </span>
      </div>
      <p className="text-[14px] italic text-[color:var(--color-muted)] mb-3">
        {tool.question}
      </p>
      <p className="text-[13.5px] leading-[1.55] text-[color:var(--color-ink)]">
        {tool.output}
      </p>
      <p className="mt-4 text-[13.5px] font-semibold text-[color:var(--color-accent)] group-hover:underline">
        Run it →
      </p>
    </Link>
  );
}
