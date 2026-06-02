// Marketing section that introduces the AC Agent Team — the five-agent
// framing that the app uses post the 2026-06 redesign. Copy here mirrors
// lib/agent-team.ts on the app side so a visitor sees the same names,
// roles and descriptions on the marketing surface as on the dashboard.
//
// Ordering matches the app sidebar (organisational + frequency-of-use):
// Your CEO → Finance Manager → Market Analyst → Operations Manager →
// Portfolio Personal Assistant. Your CEO leads because it's the
// synthesis layer — the headline promise. Portfolio PA sits last because
// it's the support role / concierge.
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
      "Turns portfolio data into decision support and ranks the highest-impact actions to improve returns.",
    owns: [
      "Ranked actions: Improve / Refinance / Hold / Review / Acquire",
      "Portfolio health + concentration risk",
      "5-year projection and capital deployment view",
    ],
    tint: "navy",
  },
  {
    role: "CFO",
    name: "Finance Manager",
    description:
      "Provides the numbers and the financial analysis — real yield, cashflow, debt position, refinancing decisions and portfolio performance.",
    owns: [
      "Yield analysis vs target",
      "12-month cashflow forecast",
      "Debt tracker + refinance prep",
    ],
    tint: "white",
  },
  {
    role: "CMO",
    name: "Market Analyst",
    description:
      "Benchmarks rent, market value, comparable transactions and yield opportunities across your markets.",
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
      "Tracks renewals, statements, reminders, costs, rent checks and operational actions across every property.",
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
      "Your concierge. Answers how-to questions, helps you upload data, set alerts, generate reports, and flags anything missing across your properties.",
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
            team — a CEO, a CFO, a market analyst, an operations manager and a
            personal assistant — that works across every property you own, in every
            currency, all the time.
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

        {/* Cautious-language disclaimer — same posture as the app's
            DECISION_SUPPORT_DISCLAIMER. The marketing site doesn't need
            it verbatim, but it should be visible enough that a visitor
            understands the "decision support, not advice" framing
            before they sign up. */}
        <p
          className="mt-10 text-[13px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          AssetCentral provides software, analysis and decision support. It does
          not provide regulated financial, tax, legal or investment advice. You
          remain responsible for your own decisions.
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
