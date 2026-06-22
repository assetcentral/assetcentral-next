// AI Property Management Team — homepage marketing section.
//
// Layout (2026-06 mockup-match rebuild): two-column desktop.
//   - LEFT column: headline + three discipline pills (Model / Monitor /
//     Manage) + primary CTA. Disciplines read as the framework; the
//     team on the right embody it.
//   - RIGHT column: 5 portrait cards in a single row (CIO · CFO · CEO ·
//     COO · PA), connected by a dashed rail at the top with a coloured
//     dot per role. CEO sits centre and is the visual featured card
//     (slightly larger, darker frame) because the CEO synthesises the
//     team's output into the decision view.
//   - BOTTOM full-width synthesis card: "One Team. One Goal. Your
//     Success." reinforces the team-as-one positioning before the next
//     marketing section.
//
// Portraits live in /public/team/ as stylised SVG placeholders. Real
// photos drop in as cio.png / cfo.png / etc. when generated — see
// public/team/README.md for the prompts. Each <Image> uses the SVG
// path directly so swapping in raster files is a one-line change in
// the TEAM_DATA constant.
//
// Compliance language matches the app: "may", "decision support",
// "based on available data". Never "we recommend", "guaranteed".

import Image from "next/image";
import Link from "next/link";
import { CallMeBackForm } from "./CallMeBackForm";

/** Disciplines drive the left-column pills. The three pillars also
 *  reappear as per-card tags above each role's name. */
type Discipline = "Model" | "Monitor" | "Manage";

interface RoleAccent {
  /** Background tint for the role colour band below the photo. */
  band: string;
  /** Border for the photo card frame. */
  border: string;
  /** Dot colour on the connector rail. */
  dot: string;
  /** Capability bullet colour. */
  bullet: string;
}

interface Agent {
  acronym: "CIO" | "CFO" | "CEO" | "COO" | "PA";
  fullTitle: string;
  discipline: Discipline;
  /** Path to a portrait image. SVG placeholders ship in /public/team/
   *  — when you generate real photos, drop them in at the same
   *  filenames with a `.png` or `.jpg` extension and update the path
   *  here (one line per role). */
  avatarSrc: string;
  /** Four short capability lines — match the mockup's chip-list look.
   *  Keep at four; the card sizing assumes a fixed list height. */
  capabilities: { label: string; icon: CapIcon }[];
  accent: RoleAccent;
  /** True for CEO — gets the featured visual treatment (slight scale
   *  up, darker frame, drop shadow). */
  featured?: boolean;
}

/** Tiny icon set for the capability bullets. Inline so we don't drag
 *  in lucide-react or similar just for five glyphs. The icons map to
 *  the *kind* of work the capability does, not the role. */
type CapIcon =
  | "chart"
  | "scenario"
  | "insight"
  | "target"
  | "money"
  | "cashflow"
  | "debt"
  | "analytics"
  | "strategy"
  | "decision"
  | "goal"
  | "compass"
  | "operations"
  | "vendor"
  | "wrench"
  | "gears"
  | "inbox"
  | "task"
  | "alert"
  | "calendar";

function CapIconSvg({ kind }: { kind: CapIcon }) {
  const props = {
    width: 14,
    height: 14,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "chart":
      return (
        <svg {...props}>
          <path d="M2 14V2M2 14h12M5 11V8M8 11V5M11 11V7" />
        </svg>
      );
    case "scenario":
      return (
        <svg {...props}>
          <circle cx="5" cy="5" r="2.5" />
          <circle cx="11" cy="11" r="2.5" />
          <path d="M7 7l2 2" />
        </svg>
      );
    case "insight":
      return (
        <svg {...props}>
          <path d="M8 1.5a4 4 0 00-2.5 7.1V11h5V8.6A4 4 0 008 1.5zM6 13h4M6.5 14.5h3" />
        </svg>
      );
    case "target":
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="6" />
          <circle cx="8" cy="8" r="3" />
          <circle cx="8" cy="8" r="0.6" fill="currentColor" />
        </svg>
      );
    case "money":
      return (
        <svg {...props}>
          <path d="M8 2v12M11 5H6.5a1.5 1.5 0 000 3h3a1.5 1.5 0 010 3H5" />
        </svg>
      );
    case "cashflow":
      return (
        <svg {...props}>
          <path d="M2 8h12M11 5l3 3-3 3" />
          <path d="M5 11l-3-3 3-3" />
        </svg>
      );
    case "debt":
      return (
        <svg {...props}>
          <rect x="2" y="4" width="12" height="9" rx="1" />
          <path d="M2 7h12M5 10h2" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...props}>
          <path d="M2 12l4-4 3 3 5-6" />
          <path d="M11 5h3v3" />
        </svg>
      );
    case "strategy":
      return (
        <svg {...props}>
          <rect x="2" y="2" width="5" height="5" rx="0.5" />
          <rect x="9" y="2" width="5" height="5" rx="0.5" />
          <rect x="2" y="9" width="5" height="5" rx="0.5" />
          <rect x="9" y="9" width="5" height="5" rx="0.5" />
        </svg>
      );
    case "decision":
      return (
        <svg {...props}>
          <path d="M3 6l2.5 4.5L8 7.5l3 4 2-7" />
        </svg>
      );
    case "goal":
      return (
        <svg {...props}>
          <path d="M3 14V3l8 2-8 2" />
          <circle cx="3" cy="14" r="0.7" fill="currentColor" />
        </svg>
      );
    case "compass":
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="6" />
          <path d="M10 6l-1 3-3 1 1-3z" />
        </svg>
      );
    case "operations":
      return (
        <svg {...props}>
          <rect x="2" y="6" width="4" height="8" />
          <rect x="6" y="3" width="4" height="11" />
          <rect x="10" y="8" width="4" height="6" />
        </svg>
      );
    case "vendor":
      return (
        <svg {...props}>
          <circle cx="5" cy="6" r="2" />
          <circle cx="11" cy="6" r="2" />
          <path d="M2 13c0-1.7 1.3-3 3-3s3 1.3 3 3M8 13c0-1.7 1.3-3 3-3s3 1.3 3 3" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...props}>
          <path d="M11 2a3 3 0 00-2.8 4l-5.5 5.5 1.8 1.8 5.5-5.5A3 3 0 0011 2z" />
        </svg>
      );
    case "gears":
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="2.5" />
          <path d="M8 2v2M8 12v2M2 8h2M12 8h2M4 4l1.4 1.4M10.6 10.6L12 12M4 12l1.4-1.4M10.6 5.4L12 4" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...props}>
          <path d="M2 9v4a1 1 0 001 1h10a1 1 0 001-1V9M2 9l2-5h8l2 5M2 9h4l1 2h2l1-2h4" />
        </svg>
      );
    case "task":
      return (
        <svg {...props}>
          <rect x="3" y="2" width="10" height="12" rx="1" />
          <path d="M5 5h6M5 8h6M5 11h3" />
        </svg>
      );
    case "alert":
      return (
        <svg {...props}>
          <path d="M8 1l-7 13h14L8 1zM8 6v4M8 12v.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <rect x="2" y="3" width="12" height="11" rx="1" />
          <path d="M2 6h12M5 1v3M11 1v3" />
        </svg>
      );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Per-role accent classes. Five distinct role colours — purple (CIO),
// blue (CFO), navy/slate (CEO), teal (COO), pink (PA) — set on the
// coloured band under each portrait, the connector dot, and the
// capability bullets. Tints come from the @theme variables in
// globals.css.
// ────────────────────────────────────────────────────────────────────────────
const ACCENT_CIO: RoleAccent = {
  band: "bg-[color:var(--color-cio-mid)]",
  border: "border-[color:var(--color-cio-tint)]",
  dot: "bg-[color:var(--color-cio-mid)]",
  bullet: "text-[color:var(--color-cio-mid)]",
};
const ACCENT_CFO: RoleAccent = {
  band: "bg-[color:var(--color-cfo-mid)]",
  border: "border-[color:var(--color-cfo-tint)]",
  dot: "bg-[color:var(--color-cfo-mid)]",
  bullet: "text-[color:var(--color-cfo-mid)]",
};
const ACCENT_CEO: RoleAccent = {
  band: "bg-[color:var(--color-ceo-mid)]",
  border: "border-[color:var(--color-ceo-mid)]",
  dot: "bg-[color:var(--color-ceo-mid)]",
  bullet: "text-[color:var(--color-ceo-mid)]",
};
const ACCENT_COO: RoleAccent = {
  band: "bg-[color:var(--color-coo-mid)]",
  border: "border-[color:var(--color-coo-tint)]",
  dot: "bg-[color:var(--color-coo-mid)]",
  bullet: "text-[color:var(--color-coo-mid)]",
};
const ACCENT_PA: RoleAccent = {
  band: "bg-[color:var(--color-pa-mid)]",
  border: "border-[color:var(--color-pa-tint)]",
  dot: "bg-[color:var(--color-pa-mid)]",
  bullet: "text-[color:var(--color-pa-mid)]",
};

const TEAM: Agent[] = [
  {
    acronym: "CIO",
    fullTitle: "Chief Investment Officer",
    discipline: "Model",
    avatarSrc: "/team/cio.webp",
    capabilities: [
      { label: "Investment Modeling", icon: "chart" },
      { label: "Scenario Analysis", icon: "scenario" },
      { label: "Market Insights", icon: "insight" },
      { label: "Return Optimization", icon: "target" },
    ],
    accent: ACCENT_CIO,
  },
  {
    acronym: "CFO",
    fullTitle: "Chief Financial Officer",
    discipline: "Model",
    avatarSrc: "/team/cfo.webp",
    capabilities: [
      { label: "Financial Modeling", icon: "money" },
      { label: "Cash Flow Monitoring", icon: "cashflow" },
      { label: "Debt & Financing", icon: "debt" },
      { label: "Performance Analytics", icon: "analytics" },
    ],
    accent: ACCENT_CFO,
  },
  {
    acronym: "CEO",
    fullTitle: "Chief Executive Officer",
    discipline: "Manage",
    avatarSrc: "/team/ceo.webp",
    capabilities: [
      { label: "Portfolio Strategy", icon: "strategy" },
      { label: "Decision Making", icon: "decision" },
      { label: "Goal Setting", icon: "goal" },
      { label: "Big Picture Focus", icon: "compass" },
    ],
    accent: ACCENT_CEO,
    featured: true,
  },
  {
    acronym: "COO",
    fullTitle: "Chief Operations Officer",
    discipline: "Monitor",
    avatarSrc: "/team/coo.webp",
    capabilities: [
      { label: "Property Operations", icon: "operations" },
      { label: "Vendor Management", icon: "vendor" },
      { label: "Maintenance Oversight", icon: "wrench" },
      { label: "Efficiency & Execution", icon: "gears" },
    ],
    accent: ACCENT_COO,
  },
  {
    acronym: "PA",
    fullTitle: "Personal Assistant",
    discipline: "Manage",
    avatarSrc: "/team/pa.webp",
    capabilities: [
      { label: "Information Hub", icon: "inbox" },
      { label: "Task Management", icon: "task" },
      { label: "Reminders & Alerts", icon: "alert" },
      { label: "Calendar & Docs", icon: "calendar" },
    ],
    accent: ACCENT_PA,
  },
];

interface DisciplinePillData {
  name: Discipline;
  /** Three-line copy beneath each pill name. */
  lines: [string, string, string];
  /** Background colour for the round icon badge. */
  iconBg: string;
  /** Icon glyph (inline SVG). */
  icon: React.ReactNode;
}

const DISCIPLINES: DisciplinePillData[] = [
  {
    name: "Model",
    lines: ["Run the numbers.", "Test every option.", "See the future."],
    iconBg: "bg-[color:var(--color-disc-model)]",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    name: "Monitor",
    lines: [
      "Track performance.",
      "Spot issues early.",
      "Stay in control.",
    ],
    iconBg: "bg-[color:var(--color-disc-monitor)]",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12h3l3-7 4 14 3-7h5" />
      </svg>
    ),
  },
  {
    name: "Manage",
    lines: ["Take action.", "Execute strategies.", "Maximise returns."],
    iconBg: "bg-[color:var(--color-disc-manage)]",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12l4 4 10-10" />
      </svg>
    ),
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Main section
// ────────────────────────────────────────────────────────────────────────────
export function MeetTheTeamSection() {
  return (
    <section
      id="team"
      aria-label="Your AI property management team"
      className="bg-white pt-20 pb-16 md:pt-28 md:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN — headline + disciplines + CTA. The H1 lives
              here because this section IS the page hero (2026-06
              team-as-hero simplification — the standalone HeroSection
              was retired). */}
          <div className="lg:col-span-4">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[color:var(--color-navy)] leading-[1.05] tracking-tight">
              Your AI Property Family Office.
            </h1>
            <p className="mt-5 font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[color:var(--color-navy)] leading-tight">
              Model. Monitor. Manage.
            </p>
            <p className="mt-4 text-base md:text-lg text-[color:var(--color-muted)] leading-relaxed">
              One call. Five AI experts.
              <br />
              Every property decision.
            </p>

            {/* Discipline pills */}
            <ul className="mt-8 space-y-5">
              {DISCIPLINES.map((d) => (
                <li key={d.name} className="flex items-start gap-4">
                  <div
                    className={`mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${d.iconBg}`}
                    aria-hidden
                  >
                    {d.icon}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-[color:var(--color-ink)]">
                      {d.name}
                    </div>
                    <div className="mt-1 text-sm text-[color:var(--color-muted)] leading-snug">
                      {d.lines[0]}
                      <br />
                      {d.lines[1]}
                      <br />
                      {d.lines[2]}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Dual CTA — Call My Team is the lead family-office framing.
                "Add your first property" remains as the concrete signup
                action for visitors who'd rather start with their data. */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup?plan=pro_monthly&intent=call-team"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-navy)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
              >
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-pa-mid)]"
                />
                Call My Team
              </Link>
              <Link
                href="/signup?plan=pro_monthly&intent=direct"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[color:var(--color-border)] bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--color-navy)] transition hover:bg-[color:var(--color-surface)]"
              >
                Add your first property
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN — 5 portrait cards with connector rail */}
          <div className="lg:col-span-8 relative">
            {/* "Your AI Team" label, top right */}
            <div className="hidden lg:block absolute -top-2 right-0 font-[family-name:var(--font-display)] italic text-[color:var(--color-muted)] text-base">
              Your AI Team
            </div>

            {/* Connector rail — curved dashed SVG with five coloured
                dots, one above each card. Hidden on small screens
                where cards stack. */}
            <div className="hidden lg:block relative h-8 mb-0">
              <svg
                className="absolute inset-x-0 top-0 w-full h-8"
                viewBox="0 0 1000 32"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden
              >
                <path
                  d="M 100 26 Q 250 -4, 400 12 T 700 12 T 900 26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 5"
                  className="text-[color:var(--color-border)]"
                />
              </svg>
              {/* The dots are positioned on the same horizontal axis as
                  the card columns below. 5 cards = 5 dots at 10%, 30%,
                  50%, 70%, 90% across the rail. */}
              <div className="absolute inset-x-0 top-0 h-8 grid grid-cols-5">
                {TEAM.map((agent) => (
                  <div key={agent.acronym} className="flex justify-center items-start">
                    <span
                      className={`block h-3 w-3 rounded-full ${agent.accent.dot} ring-4 ring-white`}
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* The 5 portrait cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2.5 mt-2">
              {TEAM.map((agent) => (
                <AgentCard key={agent.acronym} agent={agent} />
              ))}
            </div>

            {/* Get-a-call CTA — slotted under the 5 portraits in the
                right column. The form's `compact` variant renders its
                own slim dark card, so we don't double-wrap with another
                navy box here (was a double-card before; visually noisy
                and dominated the section). Just sizing + alignment. */}
            <div className="mt-6 lg:mt-8 lg:max-w-xs lg:ml-auto">
              <CallMeBackForm variant="compact" />
            </div>
          </div>
        </div>

        {/* Synthesis card — "One Team. One Goal. Your Success." */}
        <div className="mt-12 lg:mt-16 rounded-2xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] p-6 lg:p-8 flex items-start gap-5">
          <div
            className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-cio-tint)]"
            aria-hidden
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-cio-deep)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="9" r="3" />
              <circle cx="17" cy="9" r="3" />
              <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5M14 19c0-2.5 2-4.5 5-4.5" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-[color:var(--color-navy)] leading-tight">
              One Team. One Goal. Your Success.
            </h3>
            <p className="mt-2 text-sm md:text-base text-[color:var(--color-muted)] leading-relaxed max-w-3xl">
              Your AI team collaborates around the clock to model
              opportunities, monitor performance, and manage the small
              set of decisions that move your portfolio yield —
              presented as decision support so you stay in control of
              every action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Single agent card — portrait + role band + four capabilities
// ────────────────────────────────────────────────────────────────────────────
function AgentCard({ agent }: { agent: Agent }) {
  const featured = agent.featured ?? false;
  return (
    <article
      className={
        "flex flex-col rounded-xl bg-white overflow-hidden " +
        (featured
          ? "border-2 border-[color:var(--color-ceo-mid)] shadow-lg lg:scale-[1.03]"
          : "border border-[color:var(--color-border)] shadow-sm")
      }
    >
      {/* Portrait */}
      <div className="relative aspect-[4/5] w-full bg-[color:var(--color-surface)]">
        <Image
          src={agent.avatarSrc}
          alt={`Portrait of ${agent.fullTitle}`}
          fill
          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 32vw, 48vw"
          className="object-cover"
        />
      </div>

      {/* Role band — coloured strip with acronym + full title */}
      <div className={`${agent.accent.band} px-3 py-2.5 text-white`}>
        <div className="text-base lg:text-lg font-bold leading-none">
          {agent.acronym}
        </div>
        <div className="text-[11px] lg:text-[11.5px] font-medium leading-tight mt-0.5 opacity-95">
          {agent.fullTitle}
        </div>
      </div>

      {/* Capability list */}
      <ul className="flex-1 px-3 py-2.5 space-y-1.5 bg-white">
        {agent.capabilities.map((cap) => (
          <li
            key={cap.label}
            className="flex items-center gap-1.5 text-[11px] lg:text-[11.5px] text-[color:var(--color-ink)]"
          >
            <span className={agent.accent.bullet} aria-hidden>
              <CapIconSvg kind={cap.icon} />
            </span>
            <span className="truncate">{cap.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
