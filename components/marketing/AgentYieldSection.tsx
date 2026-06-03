// "How your agents work to increase yield" — the bridge section that
// sits between the hero promise (higher yield via an agent team) and
// the problem statement (why owners hit yield walls). Five stacked
// cards: each agent gets a role chip, the agent name, a one-line
// headline, the practical copy, and a yield-link strapline at the
// bottom that ties the role back to yield.
//
// Card visual rhythm intentionally mirrors MeetTheTeamSection so the
// homepage flow reads as one consistent team-introduction language —
// AgentYieldSection answers "what do they do for yield?", MeetTheTeam
// answers "who are they and what do they own?". Different angles, same
// agents.
//
// Order matches the workflow shape of the product:
//   1. Portfolio Personal Assistant      — gets the data right
//   2. Finance Manager     — calculates real yield
//   3. Market Analyst    — finds upside
//   4. Operations Manager  — stops leakage
//   5. Your CEO         — ranks the actions
//
// Compliance language: "may", "can", "identify possible" — never
// guaranteed. Matches the cautious-language posture on the app side
// (lib/agent-team.ts DECISION_SUPPORT_DISCLAIMER).

type AgentYieldCard = {
  /** Agent name — exact match to the post-2026-06 sweep
   *  (Portfolio Personal Assistant, Finance Manager, Market Analyst, Operations Manager,
   *  Your CEO). */
  name: string;
  /** Role chip shown uppercase / accent above the agent name. Mirrors
   *  the CEO / CFO / CMO / COO / Concierge labelling on
   *  MeetTheTeamSection so the visitor builds the same mental map of
   *  the team across both surfaces. */
  role: string;
  /** Bold one-line headline — what this agent does in one breath. */
  headline: string;
  /** Practical copy — what the agent looks at and why. */
  copy: string;
  /** Yield-link strapline at the bottom — italic, accent colour. Ties
   *  the agent's job back to the yield north star. */
  yieldLink: string;
};

const cards: AgentYieldCard[] = [
  {
    name: "Portfolio Personal Assistant",
    role: "Concierge",
    headline: "Organises your property data",
    copy: "Sets up properties, checks missing information and keeps leases, loans, statements and costs structured.",
    yieldLink: "Better data means better yield decisions.",
  },
  {
    name: "Finance Manager",
    role: "CFO",
    headline: "Finds your real net yield",
    copy: "Calculates rent, costs, debt, cashflow and refinance exposure across each property.",
    yieldLink: "See which assets are really performing.",
  },
  {
    name: "Market Analyst",
    role: "CMO",
    headline: "Finds market upside",
    copy: "Benchmarks rent, reviews local market evidence and highlights where income may be below potential.",
    yieldLink: "Identify possible rent and value upside.",
  },
  {
    name: "Operations Manager",
    role: "COO",
    headline: "Stops yield leakage",
    copy: "Checks renewals, short-term rental statements, operator data, service charges, payments and cost anomalies.",
    yieldLink: "Catch issues before they reduce returns.",
  },
  {
    name: "Your CEO",
    role: "CEO",
    headline: "Ranks what to do next",
    copy: "Turns portfolio data into decision support so owners can review what to hold, sell, refinance or improve.",
    yieldLink: "Focus on the actions with the biggest yield impact.",
  },
];

export function AgentYieldSection() {
  return (
    <section className="bg-white" id="how-yield">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Your yield team at work
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How your agents work to increase yield
          </h2>
          <p
            className="mt-5 text-[17px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Each agent has a specific job. Together they help you find practical actions to improve yield across your portfolio.
          </p>
        </div>

        {/* Cards: stacked on mobile / 2-up on lg with the Your CEO
            card spanning full width as the punchline at the bottom.
            That mirrors how Your CEO sits visually in MeetTheTeam — the
            synthesis layer gets the lead position, not because it
            dominates but because it's where the team's work resolves. */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {cards.slice(0, 4).map((c) => (
            <YieldCard key={c.name} card={c} />
          ))}
          <div className="lg:col-span-2">
            <YieldCard card={cards[4]} featured />
          </div>
        </div>
      </div>
    </section>
  );
}

function YieldCard({
  card,
  featured,
}: {
  card: AgentYieldCard;
  /** Featured = Your CEO span-full at the bottom. Larger agent name,
   *  bigger headline, more breathing room. */
  featured?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-9 flex flex-col gap-4 ${
        featured ? "lg:p-10" : ""
      }`}
    >
      <span
        className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {card.role}
      </span>
      <div>
        <h3
          className={`${
            featured ? "text-[28px] lg:text-[34px]" : "text-[22px] lg:text-[24px]"
          } leading-[1.1] text-[var(--color-navy)]`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {card.name}
        </h3>
        <p
          className={`mt-3 ${
            featured ? "text-[17px] lg:text-[18px]" : "text-[15.5px] lg:text-[16px]"
          } font-semibold leading-[1.35] text-[var(--color-ink)]`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {card.headline}
        </p>
      </div>
      <p
        className="text-[14.5px] leading-[1.6] text-[var(--color-muted)] flex-1"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {card.copy}
      </p>
      <p
        className="mt-2 pt-4 border-t border-[var(--color-border)] text-[13px] italic text-[var(--color-accent)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {card.yieldLink}
      </p>
    </article>
  );
}
