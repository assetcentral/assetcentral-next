// Homepage "what's inside" section. Previously a flat 8-feature grid;
// now grouped by which agent on the AC Agent Team owns each feature.
// Aligns with the 2026-06 reframe — the visitor walks away with "Your
// CEO does X / Y / Z, Finance Manager does A / B / C" rather than a
// generic feature menu.
//
// Mapping reflects lib/agent-team.ts ownedSurfaces on the app side, with
// concrete artefacts named (lender pack, refinance maths, market radar,
// etc.) so the team feels tangible.
//
// Layout: 5 stacked agent blocks. On lg+ the header sits left and the
// feature list right, so the screen reads like a contents page of a
// team's quarterly report rather than a SaaS feature wall.

import Link from "next/link";

type AgentBlock = {
  /** Role / org-chart equivalent shown above the agent name. */
  role: string;
  /** Agent name — matches lib/agent-team.ts AGENTS[key].name. */
  name: string;
  /** Short framing line for what this agent owns. */
  framing: string;
  /** Concrete capabilities. Each one short enough to skim, specific
   *  enough to make the agent feel like a real role. */
  capabilities: string[];
};

const blocks: AgentBlock[] = [
  {
    role: "CEO",
    name: "Your CEO",
    framing:
      "Reads the rest of the team's work and ranks the actions with the biggest yield impact.",
    capabilities: [
      "Ranked actions: Improve / Refinance / Hold / Review / Acquire",
      "Portfolio health score and concentration risk",
      "5-year projection of yield, equity and cashflow",
      "Decision Room view — the brief, the maths and the comp set in one place",
    ],
  },
  {
    role: "CFO",
    name: "Finance Manager",
    framing:
      "Owns the numbers. Real net yield, cashflow, debt, refinance.",
    capabilities: [
      "Real net yield per property and across the portfolio",
      "12-month cashflow forecast vs actual",
      "Loan tracker — rate reversion dates, maturity, monthly payment",
      "Refinancing maths and the lender pack, generated from your data",
    ],
  },
  {
    role: "CMO",
    name: "Market Analyst",
    framing:
      "Watches the markets you're in. Rent, comps, transactions, possible upside.",
    capabilities: [
      "Rent benchmarking against the local median",
      "Comparable sales and live transaction radar (DLD / HMLR / DVF)",
      "Short-term rental vs long-let modelling per asset",
      "Acquisition simulator: portfolio impact of a candidate purchase",
    ],
  },
  {
    role: "COO",
    name: "Operations Manager",
    framing:
      "Stops yield leakage — catches the things that go wrong while you're not looking.",
    capabilities: [
      "Lease renewals, mortgage reversion and stage-payment alerts",
      "Short-term rental and property-manager statement audits",
      "Cost anomaly flags — service charges, capex, utility spikes",
      "Rent collection monitoring across every property",
    ],
  },
  {
    role: "Concierge",
    name: "Portfolio Personal Assistant",
    framing:
      "The agent that organises your property data — and the team member you talk to. Available on every plan.",
    capabilities: [
      "Document vault with AI extraction — upload, snap or email",
      "Data ingestion via WhatsApp, email forwarding or file upload",
      "Setup wizards for new properties, calculators and reports",
      "Glossary and how-to guidance any time you're unsure",
    ],
  },
];

export function FeaturesGrid() {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What&rsquo;s inside
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What each specialist does for your portfolio.
          </h2>
        </div>

        <div className="mt-12 space-y-5">
          {blocks.map((b) => (
            <AgentBlockCard key={b.name} block={b} />
          ))}
        </div>

        <p
          className="mt-10 text-[14.5px] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          And more — multi-currency, full report suite, team seats on Team
          and Enterprise, partner programmes for brokers and advisers.{" "}
          <Link
            href="/features"
            className="text-[var(--color-accent)] font-medium hover:underline"
          >
            See all features →
          </Link>
        </p>
      </div>
    </section>
  );
}

function AgentBlockCard({ block }: { block: AgentBlock }) {
  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-9 lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
      {/* Header column — role + name + framing. Sticky-ish vertical
          anchor at lg+; stacked on mobile. */}
      <div>
        <p
          className="text-[11.5px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {block.role}
        </p>
        <h3
          className="text-[26px] lg:text-[30px] leading-[1.1] text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {block.name}
        </h3>
        <p
          className="mt-3 text-[14.5px] leading-[1.55] text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {block.framing}
        </p>
      </div>

      {/* Capabilities grid — 2-up on md+, stacked on mobile. */}
      <ul className="mt-6 lg:mt-0 grid sm:grid-cols-2 gap-x-8 gap-y-3">
        {block.capabilities.map((c) => (
          <li
            key={c}
            className="flex gap-3 text-[14px] leading-[1.55] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span
              aria-hidden
              className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0"
            />
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
