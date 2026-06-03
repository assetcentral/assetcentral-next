// Marketing section that introduces the AC Agent Team — the five-agent
// framing that the app uses post the 2026-06 yield-led reposition.
// Names now mirror the agent-team brand: Portfolio Personal Assistant, Finance Manager,
// Market Analyst, Operations Manager, Your CEO.
//
// Ordering matches the app sidebar (organisational + frequency-of-use):
// Your CEO → Finance Manager → Market Analyst → Operations Manager →
// Portfolio Personal Assistant. Your CEO leads because it's the synthesis layer — the
// headline promise. Portfolio Personal Assistant sits last because it's the concierge.
// Descriptions reorient around yield (the north-star metric) without
// crowding out the other roles each agent plays.
//
// Compliance language matches the app: "may", "decision support",
// "appears", "based on available data". Never "we recommend",
// "guaranteed".

type Agent = {
  /** Role label shown above the name (CFO, CEO, Concierge, etc). */
  role: string;
  /** Full name as it appears in the app sidebar. */
  name: string;
  /** One-line description. Matches lib/agent-team.ts AGENTS[key].description. */
  description: string;
  /** What the agent owns — short list of surfaces / outputs. */
  owns: string[];
  /** Card tint — alternates navy / white for visual rhythm.
   *  Your CEO is navy (lead) so it visually anchors the grid. */
  tint: "navy" | "white";
};

const agents: Agent[] = [
  {
    role: "CEO",
    name: "Your CEO",
    description:
      "Sets portfolio strategy and drives it through the team. Reports what's driven yield this period, charts where the portfolio is heading next, and seeks out opportunities to grow and strengthen returns.",
    owns: [
      "Strategy: hold / refinance / improve / sell / acquire across every property",
      "Progress report — what's moved yield this period and why",
      "Forward view — where yield, equity and cashflow are heading",
      "Opportunity radar — growth and strengthening moves to pursue",
    ],
    tint: "navy",
  },
  {
    role: "CFO",
    name: "Finance Manager",
    description:
      "Provides the numbers and the financial analysis — real net yield, cashflow, debt position, refinancing decisions and per-property performance.",
    owns: [
      "Real net yield vs target",
      "12-month cashflow forecast",
      "Debt tracker + refinance prep",
    ],
    tint: "white",
  },
  {
    role: "CIO",
    name: "Market Analyst",
    description:
      "Benchmarks rent against the local market, reviews comparable transactions and highlights where income may be below potential.",
    owns: [
      "Rent benchmarking",
      "Comparable sales + transaction radar",
      "Short-term rental vs long-let analysis",
    ],
    tint: "white",
  },
  {
    role: "COO",
    name: "Operations Manager",
    description:
      "Stops yield leakage — checks renewals, operator statements, service charges, payments and cost anomalies before they reduce returns.",
    owns: [
      "Lease and renewal alerts",
      "Statement and rent-collection checks",
      "Cost anomaly flags",
    ],
    tint: "white",
  },
  {
    role: "Concierge",
    name: "Portfolio Personal Assistant",
    description:
      "Your concierge. Organises property data, helps you upload documents, sets alerts and keeps leases, loans and statements structured so the rest of the team can do its job.",
    owns: [
      "How-to guidance + setup wizards",
      "Document organising + data completeness",
      "Alert and report setup",
    ],
    tint: "white",
  },
];

export function MeetTheTeamSection() {
  return (
    <section className="bg-white" id="meet-the-team">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Meet your AC Agent Team
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Five specialists working on your portfolio. One team.
          </h2>
          <p
            className="mt-5 text-[17px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AssetCentral isn&rsquo;t a dashboard you have to drive. It&rsquo;s an AI
            team — Your CEO, Finance Manager, Market Analyst, Operations Manager and
            Portfolio Personal Assistant — working across every property you own, in every currency,
            all the time, to identify practical actions that can improve yield.
          </p>
        </div>

        {/* Hero card: Your CEO spans the full width. The synthesis layer
            is the headline product — giving it the lead position visually
            mirrors how the app puts it first in the sidebar. */}
        <div className="mt-12">
          <AgentCard agent={agents[0]} featured />
        </div>

        {/* The other four — two-up on tablet, four-up on desktop. */}
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {agents.slice(1).map((a) => (
            <AgentCard key={a.name} agent={a} />
          ))}
        </div>

        {/* Role acronym glossary — sits between the cards and the
            disclaimer so a visitor scanning "CEO / CFO / CIO / COO"
            on the cards above sees the expansion in one place rather
            than having to recall them. Compact one-row format on
            desktop, wraps to two on mobile. */}
        <dl
          className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[12.5px] leading-[1.5] text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
          aria-label="Role acronyms used above"
        >
          <div className="flex items-baseline gap-1.5">
            <dt className="font-semibold text-[var(--color-ink)]">CEO</dt>
            <dd>Chief Executive Officer</dd>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="font-semibold text-[var(--color-ink)]">CFO</dt>
            <dd>Chief Financial Officer</dd>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="font-semibold text-[var(--color-ink)]">CIO</dt>
            <dd>Chief Information Officer</dd>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="font-semibold text-[var(--color-ink)]">COO</dt>
            <dd>Chief Operating Officer</dd>
          </div>
        </dl>

        {/* Cautious-language disclaimer — same posture as the app's
            DECISION_SUPPORT_DISCLAIMER. The marketing site doesn't need
            it verbatim, but it should be visible enough that a visitor
            understands the "decision support, not advice" framing
            before they sign up. */}
        <p
          className="mt-6 text-[13px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          AssetCentral provides software, analysis and decision support. It does
          not provide financial, tax, legal or investment advice. Owners and
          investors remain responsible for their own decisions.
        </p>
      </div>
    </section>
  );
}

function AgentCard({
  agent,
  featured,
}: {
  agent: Agent;
  /** The featured card spans full width with a larger description block
   *  and the role badge sitting prominently in the corner. Used for the
   *  Your CEO card at the top of the grid. */
  featured?: boolean;
}) {
  const isNavy = agent.tint === "navy";
  return (
    <article
      className={`rounded-2xl border p-7 lg:p-9 flex flex-col gap-5 ${
        isNavy
          ? "bg-[var(--color-navy)] border-[var(--color-navy)] text-white"
          : "bg-white border-[var(--color-border)] text-[var(--color-ink)]"
      } ${featured ? "lg:p-10" : ""}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span
          className={`text-[12px] uppercase tracking-[0.12em] ${
            isNavy ? "text-white/70" : "text-[var(--color-muted)]"
          }`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {agent.role}
        </span>
      </div>

      <div>
        <h3
          className={`${
            featured ? "text-[30px] lg:text-[40px]" : "text-[22px] lg:text-[24px]"
          } leading-[1.1] ${isNavy ? "text-white" : "text-[var(--color-navy)]"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {agent.name}
        </h3>
        <p
          className={`mt-3 ${
            featured ? "text-[16px] lg:text-[17px]" : "text-[14px] lg:text-[14.5px]"
          } leading-[1.55] ${isNavy ? "text-white/85" : "text-[var(--color-ink)]"}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {agent.description}
        </p>
      </div>

      <ul className={`space-y-2.5 ${featured ? "lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0" : ""}`}>
        {agent.owns.map((item) => (
          <li
            key={item}
            className={`flex gap-3 text-[13.5px] leading-[1.5] ${
              isNavy ? "text-white/90" : "text-[var(--color-ink)]"
            }`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span
              aria-hidden
              className={`mt-2 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                isNavy ? "bg-[var(--color-accent)]" : "bg-[var(--color-navy)]"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
