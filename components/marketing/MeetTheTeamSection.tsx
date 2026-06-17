// Marketing section that introduces the AI Property Team — the five
// C-suite agents framing introduced in the 2026-06 "team that works
// for you" positioning pivot.
//
// Layout: a connected-team composition. CEO sits centrally because
// that's the agent that synthesises the team's findings into a
// recommendation. CIO and CFO cluster on the LEFT under the "Model"
// discipline. COO and PA cluster on the RIGHT under "Monitor" and
// "Manage". A thin connector rail above the cards shows the five
// agents work as one team, not five independent chatbots.
//
// Compliance language matches the app: "may", "decision support",
// "based on available data". Never "we recommend", "guaranteed",
// "will improve".

import Link from "next/link";

/** Disciplines drive the layout grouping. CFO and COO each have a
 *  secondary discipline but appear under their primary in the
 *  connected-team layout to avoid duplication. */
type Discipline = "Model" | "Monitor" | "Manage" | "Coordinate";

/** Role accent — restrained colour cue per spec. Mapped to Tailwind-
 *  friendly class strings so the cards render server-side without any
 *  runtime style computation. */
interface Accent {
  badgeBg: string;
  badgeText: string;
  dot: string;
  cardTint: string;
  cardBorder: string;
}

interface Agent {
  /** Acronym chip: CIO, CFO, CEO, COO, PA. */
  acronym: string;
  /** Full C-suite name. */
  name: string;
  /** Primary discipline(s) — first one drives layout placement. */
  disciplines: Discipline[];
  /** Punchy one-line purpose. Stays close to the spec's "purpose"
   *  field per agent. */
  purpose: string;
  /** Six-ish concrete functions. Same level of detail as the app
   *  side carries on the AgentMeta type. */
  capabilities: string[];
  /** Sample current-activity status line — owner-voice phrasing
   *  ("Modelling…", "Reviewing…"). The marketing site is allowed
   *  to use these illustratively; the app side reads real status. */
  exampleStatus: string;
  accent: Accent;
}

const ACCENT_CIO: Accent = {
  badgeBg: "bg-purple-100",
  badgeText: "text-purple-900",
  dot: "bg-purple-500",
  cardTint: "bg-purple-50/40",
  cardBorder: "border-purple-200",
};
const ACCENT_CFO: Accent = {
  badgeBg: "bg-blue-100",
  badgeText: "text-blue-900",
  dot: "bg-blue-500",
  cardTint: "bg-blue-50/40",
  cardBorder: "border-blue-200",
};
const ACCENT_CEO: Accent = {
  badgeBg: "bg-slate-900",
  badgeText: "text-white",
  dot: "bg-slate-900",
  cardTint: "bg-white",
  cardBorder: "border-slate-300",
};
const ACCENT_COO: Accent = {
  badgeBg: "bg-teal-100",
  badgeText: "text-teal-900",
  dot: "bg-teal-500",
  cardTint: "bg-teal-50/40",
  cardBorder: "border-teal-200",
};
const ACCENT_PA: Accent = {
  badgeBg: "bg-pink-100",
  badgeText: "text-pink-900",
  dot: "bg-pink-500",
  cardTint: "bg-pink-50/40",
  cardBorder: "border-pink-200",
};

// Order matters — this is left-to-right placement in the connected-team
// composition. CEO sits in slot 3 (the centre). CIO + CFO precede it
// (Model side), COO + PA follow (Monitor / Manage side).
const TEAM: Agent[] = [
  {
    acronym: "CIO",
    name: "Chief Investment Officer",
    disciplines: ["Model"],
    purpose: "Models investments, scenarios and capital allocation.",
    capabilities: [
      "Investment modelling",
      "Scenario analysis",
      "IRR & equity multiple",
      "Market insights",
      "Hold · sell · refinance · improve",
      "Acquisition analysis",
    ],
    exampleStatus:
      "Modelling the five-year return on your Dubai Marina property.",
    accent: ACCENT_CIO,
  },
  {
    acronym: "CFO",
    name: "Chief Financial Officer",
    disciplines: ["Model", "Monitor"],
    purpose: "Understands the real financial performance of every property.",
    capabilities: [
      "Cashflow modelling",
      "Net-yield calculations",
      "Debt & financing",
      "Liquidity forecasting",
      "Budget vs actual",
      "Portfolio financial reporting",
    ],
    exampleStatus:
      "Analysing cashflow and refinancing options across your portfolio.",
    accent: ACCENT_CFO,
  },
  {
    acronym: "CEO",
    name: "Chief Executive Officer",
    disciplines: ["Manage"],
    purpose:
      "Turns the team's findings into priorities and a clear recommendation.",
    capabilities: [
      "Portfolio strategy",
      "Decision support",
      "Goal setting",
      "Prioritisation",
      "Executive briefings",
      "Big-picture portfolio focus",
    ],
    exampleStatus:
      "Reviewing the strategic impact of three recommended actions.",
    accent: ACCENT_CEO,
  },
  {
    acronym: "COO",
    name: "Chief Operations Officer",
    disciplines: ["Monitor", "Manage"],
    purpose:
      "Monitors property operations and makes sure actions get completed.",
    capabilities: [
      "Property operations",
      "Occupancy monitoring",
      "Lease & tenancy tracking",
      "Property-manager oversight",
      "Maintenance oversight",
      "Cost control",
    ],
    exampleStatus:
      "Checking lease expiries, occupancy and overdue actions.",
    accent: ACCENT_COO,
  },
  {
    acronym: "PA",
    name: "Personal Assistant",
    disciplines: ["Manage", "Coordinate"],
    purpose:
      "Organises information, tasks, documents and follow-ups for the team.",
    capabilities: [
      "Information retrieval",
      "Task management",
      "Reminders & alerts",
      "Document management",
      "Calendar & deadlines",
      "Drafting communications",
    ],
    exampleStatus:
      "Preparing your portfolio briefing and action list.",
    accent: ACCENT_PA,
  },
];

export function MeetTheTeamSection() {
  return (
    <section className="bg-white" id="meet-the-team" aria-label="Your AI Property Team">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24">
        {/* ── Heading ────────────────────────────────────────────── */}
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Your AI Property Team
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Five specialists. Three disciplines. One objective.
          </h2>
          <p
            className="mt-5 text-[17px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            You own the assets. Your AI team models opportunities, monitors
            performance and manages the actions that improve your returns —
            so you&rsquo;re not the one running every calculator and checking
            every metric yourself.
          </p>
        </div>

        {/* ── Discipline rail ────────────────────────────────────────
            Three labelled discipline tags that explain how the agents
            split. Renders above the team grid as a key the visitor can
            map onto the cards below. */}
        <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl">
          <DisciplinePill label="Model" tag="Run the numbers." />
          <DisciplinePill label="Monitor" tag="Track performance." />
          <DisciplinePill label="Manage" tag="Take action." />
        </div>

        {/* ── Connector rail ──────────────────────────────────────────
            Thin line + five dots above the cards, hinting that the
            agents work as one team. Pure decorative SVG; hidden on
            small screens because the cards stack vertically and the
            connector wouldn't read. */}
        <div
          className="hidden lg:block mt-12 mb-3 px-6"
          aria-hidden="true"
        >
          <ConnectorRail accents={TEAM.map((a) => a.accent.dot)} />
        </div>

        {/* ── Team grid ───────────────────────────────────────────────
            Desktop: 5 columns left-to-right (CIO · CFO · CEO · COO · PA)
            so the visual mirrors the connector rail above. CEO card
            sits in the centre and gets a thicker border to read as the
            synthesiser.
            Tablet: 2 columns, CEO spans both at the top of row 2.
            Mobile: stacked single column, CEO leads (most important
            agent — the synthesis layer). */}
        <div className="lg:hidden mt-8 space-y-4">
          {/* CEO first on small screens — leads the read. */}
          <AgentCard agent={TEAM[2]} featured />
          <div className="grid sm:grid-cols-2 gap-4">
            <AgentCard agent={TEAM[0]} />
            <AgentCard agent={TEAM[1]} />
            <AgentCard agent={TEAM[3]} />
            <AgentCard agent={TEAM[4]} />
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-5 gap-3">
          {TEAM.map((a, idx) => (
            <AgentCard key={a.acronym} agent={a} featured={idx === 2} />
          ))}
        </div>

        {/* ── One-team line ─────────────────────────────────────────── */}
        <div className="mt-10 bg-slate-50 border border-slate-200 rounded-lg p-5 max-w-3xl">
          <p
            className="text-[14.5px] text-[var(--color-ink)] leading-[1.55]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span className="font-semibold">One team. One goal. Your portfolio.</span>{" "}
            Your AI team collaborates so you can focus on the decisions that
            matter. The CIO models. The CFO checks the numbers. The COO watches
            operations. The PA keeps everything organised. The CEO synthesises
            it all into a clear next step.
          </p>
        </div>

        {/* ── CTAs ────────────────────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-4 flex-wrap">
          <Link
            href="/get-started"
            className="px-6 py-3 bg-[var(--color-accent)] text-white text-[15px] font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Meet your AI team →
          </Link>
          <Link
            href="/features"
            className="text-[15px] text-[var(--color-accent)] font-medium hover:underline"
          >
            See all features
          </Link>
        </div>

        {/* ── Compliance line ────────────────────────────────────── */}
        <p
          className="mt-10 text-[13px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
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

// ─── Atoms ───────────────────────────────────────────────────────────────

function DisciplinePill({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="border border-slate-200 rounded-lg p-3">
      <div
        className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-navy)] font-bold"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </div>
      <div
        className="text-[12px] text-[var(--color-muted)] mt-1"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {tag}
      </div>
    </div>
  );
}

function ConnectorRail({ accents }: { accents: string[] }) {
  return (
    <div className="relative h-6">
      {/* Connecting line */}
      <div className="absolute top-1/2 left-3 right-3 h-px bg-slate-200" />
      {/* Dots evenly spaced — one per agent */}
      <div className="absolute inset-0 flex items-center justify-between px-3">
        {accents.map((dotClass, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${dotClass} ring-4 ring-white`}
          />
        ))}
      </div>
    </div>
  );
}

function AgentCard({ agent, featured = false }: { agent: Agent; featured?: boolean }) {
  return (
    <article
      className={`rounded-xl p-5 border ${agent.accent.cardTint} ${
        featured
          ? `${agent.accent.cardBorder} border-2 shadow-sm`
          : agent.accent.cardBorder
      }`}
    >
      {/* Acronym chip + name */}
      <div className="flex items-baseline gap-2 flex-wrap mb-1">
        <span
          className={`text-[10px] uppercase tracking-[0.12em] font-bold px-2 py-0.5 rounded ${agent.accent.badgeBg} ${agent.accent.badgeText}`}
        >
          {agent.acronym}
        </span>
        <h3
          className="text-[14.5px] font-semibold text-[var(--color-navy)] leading-tight"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {agent.name}
        </h3>
      </div>

      {/* Discipline tags */}
      <div
        className="text-[10px] uppercase tracking-[0.06em] text-[var(--color-muted)] font-semibold mb-3"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {agent.disciplines.join(" · ")}
      </div>

      {/* Purpose */}
      <p
        className="text-[13px] leading-[1.45] text-[var(--color-ink)] mb-3"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {agent.purpose}
      </p>

      {/* Capabilities */}
      <ul
        className="text-[12px] text-[var(--color-muted)] space-y-1 mb-3"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {agent.capabilities.map((c) => (
          <li key={c} className="flex items-start gap-1.5">
            <span aria-hidden className={`mt-1.5 w-1 h-1 rounded-full ${agent.accent.dot} shrink-0`} />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      {/* Example status — italic, sits at the bottom so the eye reads
          purpose → capabilities → "what they're up to right now" */}
      <div
        className="text-[11.5px] italic text-[var(--color-muted)] pt-3 border-t border-slate-200/70"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {agent.exampleStatus}
      </div>
    </article>
  );
}
