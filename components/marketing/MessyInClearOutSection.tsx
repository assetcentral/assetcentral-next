// Mobile-first "messy in → clear out" flow chart.
//
// Sits below the hero on the homepage. Tells the user that AssetCentral
// is more than a calculator — it ingests messy property info from many
// channels (PDFs, emails, WhatsApp photos, calculators, rough notes),
// structures it into clean fields, models decisions across six
// scenarios, and outputs reports, dashboards, alerts and next actions.
//
// Structure: a vertical 4-stage flow with the AC AI hub anchoring the
// middle. Each stage is a rounded card with floating "evidence chips"
// (the small pill widgets) around it that demonstrate what goes in and
// what comes out at that stage. Connector lines between stages are
// drawn as dashed SVG paths so they tile responsively without DOM bloat.
//
// Animations: every motion is gated behind
// `prefers-reduced-motion: no-preference`. We do three calm effects —
// a 1.4s float on input chips, a 2.4s pulse on the AC hub, and a
// 0.45s staggered fade-in on the output cards via animation-delay on
// each child. Nothing flashes; nothing demands attention.
//
// Self-contained — all SVG icons and the keyframes live in this file
// so the section can be moved between pages without dragging a graph
// of helpers. The single dependency is next/link for the CTAs.

import Link from "next/link";

interface Chip {
  label: string;
  icon: keyof typeof CHIP_ICONS;
}

const CAPTURE_CHIPS: Chip[] = [
  { label: "PDF document", icon: "pdf" },
  { label: "Email", icon: "email" },
  { label: "WhatsApp photo", icon: "whatsapp" },
  { label: "Calculator", icon: "calculator" },
  { label: "Voice note", icon: "voice" },
  { label: "Rough notes", icon: "notes" },
  { label: "External data", icon: "external" },
];

const STRUCTURE_CHIPS: Chip[] = [
  { label: "Rent", icon: "pound" },
  { label: "Mortgage", icon: "house" },
  { label: "Costs", icon: "wallet" },
  { label: "Dates", icon: "calendar" },
  { label: "Valuation", icon: "trend" },
  { label: "Yield", icon: "percent" },
  { label: "Tenancy", icon: "tenancy" },
  { label: "Cash flow", icon: "flow" },
];

const MODEL_CHIPS: Chip[] = [
  { label: "Buy", icon: "cart" },
  { label: "Sell", icon: "tag" },
  { label: "Refinance", icon: "refresh" },
  { label: "Renovate", icon: "tools" },
  { label: "Rent-out", icon: "key" },
  { label: "Hold", icon: "lock" },
  { label: "Portfolio", icon: "portfolio" },
];

const MONITOR_CHIPS: Chip[] = [
  { label: "Mortgage resets", icon: "refresh" },
  { label: "Rent drift", icon: "trend" },
  { label: "Yield movement", icon: "percent" },
  { label: "Vacancies", icon: "key" },
  { label: "Service charges", icon: "wallet" },
  { label: "Document dates", icon: "calendar" },
  { label: "Alerts", icon: "bell" },
  { label: "Portfolio risk", icon: "shield" },
];

// AssetCentral's 5-agent AI team — wired into the flow so the user sees
// not just data moving, but a specialist agent owning each stage. Role
// → stage mapping per the design brief: PA captures, CFO structures,
// CIO models, COO outputs, CEO orchestrates. Accent colours map to the
// CSS variables in globals.css so they stay in sync with the standalone
// MeetTheTeamSection further down the page.
interface Agent {
  acronym: "CEO" | "CIO" | "CFO" | "COO" | "PA";
  avatarSrc: string;
  description: string;
  accent: string;
}

// CEO moves from "orchestrator above the flow" to the Monitor stage in
// the 5-step framework. The new mapping mirrors how the team works in
// production: PA captures, CFO validates the financials, CIO models
// scenarios, CEO watches what's changing, COO turns it into action.
const AGENT_PA: Agent = {
  acronym: "PA",
  avatarSrc: "/team/pa.webp",
  description: "Gathers and organises documents, emails, WhatsApp photos, notes and reminders",
  accent: "var(--color-pa-mid)",
};
const AGENT_CFO: Agent = {
  acronym: "CFO",
  avatarSrc: "/team/cfo.webp",
  description: "Validates rent, mortgage, costs, dates, valuations, yields and cash flow",
  accent: "var(--color-cfo-mid)",
};
const AGENT_CIO: Agent = {
  acronym: "CIO",
  avatarSrc: "/team/cio.webp",
  description: "Tests buy, sell, refinance, renovate, rent-out and hold scenarios",
  accent: "var(--color-cio-mid)",
};
const AGENT_CEO: Agent = {
  acronym: "CEO",
  avatarSrc: "/team/ceo.webp",
  description: "Watches portfolio priorities, risk, opportunities and strategic decisions",
  accent: "var(--color-ceo-mid)",
};
const AGENT_COO: Agent = {
  acronym: "COO",
  avatarSrc: "/team/coo.webp",
  description: "Turns intelligence into execution, tasks, follow-up and next actions",
  accent: "var(--color-coo-mid)",
};

export function MessyInClearOutSection() {
  return (
    <section
      id="how-it-works-flow"
      aria-label="How AssetCentral turns messy property information into clear intelligence"
      className="relative bg-[color:var(--color-surface)] py-16 lg:py-24"
    >
      <style>{SECTION_STYLES}</style>

      <div className="mx-auto max-w-3xl px-6">
        {/* ── Headline ─────────────────────────────────────────────── */}
        <h2
          className="text-center text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.08] tracking-tight text-[color:var(--color-navy)] font-semibold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Messy property information{" "}
          <span className="text-[color:var(--color-accent)] italic">
            goes in.
          </span>
          <br />
          Clear property intelligence{" "}
          <span className="text-[color:var(--color-accent)] italic">
            comes out.
          </span>
        </h2>

        {/* ── Sub-message ─────────────────────────────────────────── */}
        <p
          className="mt-5 mx-auto max-w-xl text-center text-[14px] lg:text-[16px] leading-[1.55] text-[color:var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          AssetCentral captures your property data, structures it, models the
          decision, monitors what changes and helps you take action.
        </p>

        {/* ── 1. Capture ──────────────────────────────────────────── */}
        <FlowStage step={1} title="Capture" copy="Documents, emails, WhatsApp photos, calculators, voice notes, rough numbers and external data." agent={AGENT_PA}>
          <ChipCluster chips={CAPTURE_CHIPS} variant="capture" />
        </FlowStage>

        <Connector />

        {/* ── 2. Structure ────────────────────────────────────────── */}
        <FlowStage step={2} title="Structure" copy="Rent, mortgage, costs, dates, valuations, yields, tenancy details and cash flow." agent={AGENT_CFO}>
          <ChipCluster chips={STRUCTURE_CHIPS} variant="structure" />
        </FlowStage>

        <Connector />

        {/* ── 3. Model ────────────────────────────────────────────── */}
        <FlowStage step={3} title="Model" copy="Buy, sell, refinance, renovate, rent-out, hold and portfolio scenarios." agent={AGENT_CIO}>
          <ChipCluster chips={MODEL_CHIPS} variant="model" />
        </FlowStage>

        <Connector />

        {/* ── AC AI hub (centre of the 5-stage flow) ──────────────── */}
        <div className="my-2 flex justify-center">
          <AcHub />
        </div>

        <Connector />

        {/* ── 4. Monitor ──────────────────────────────────────────── */}
        <FlowStage step={4} title="Monitor" copy="Mortgage resets, rent drift, yield movement, vacancies, service charges, document dates, alerts and portfolio risk." agent={AGENT_CEO}>
          <ChipCluster chips={MONITOR_CHIPS} variant="monitor" />
        </FlowStage>

        <Connector />

        {/* ── 5. Action ───────────────────────────────────────────── */}
        <FlowStage step={5} title="Action" copy="Reports, alerts, lender packs, reminders, task lists, follow-up calls and next steps." agent={AGENT_COO}>
          <OutputGrid />
        </FlowStage>

        {/* ── Bottom team strip ──────────────────────────────────── */}
        <TeamFooterStrip />

        {/* ── CTAs ─────────────────────────────────────────────────── */}
        <div className="mt-10 lg:mt-12 text-center">
          <div
            className="flex flex-col sm:flex-row justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/check"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] px-6 py-3.5 rounded-md bg-[color:var(--color-navy)] text-white text-[15.5px] font-semibold shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
            >
              Start free property check
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="#example-analysis"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] text-[14.5px] font-semibold transition hover:border-[color:var(--color-navy)]"
            >
              See example analysis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stage card ─────────────────────────────────────────────────────

function FlowStage({
  step,
  title,
  copy,
  agent,
  children,
}: {
  step: number;
  title: string;
  copy: string;
  agent: Agent;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 lg:mt-12">
      {/* Agent badge sits to the left of the card on mobile + desktop.
          The badge column is intentionally narrow so the card keeps
          enough room for the copy on a 375px viewport. A short dashed
          line connects the badge to the card. */}
      <div className="flex items-stretch gap-2 sm:gap-3">
        <div className="w-[68px] sm:w-[88px] shrink-0 flex flex-col items-center">
          <AgentBadge agent={agent} />
        </div>
        <div className="flex-1 relative">
          {/* connector tick from agent to card */}
          <span
            aria-hidden
            className="absolute -left-2 sm:-left-3 top-9 w-2 sm:w-3 border-t border-dashed border-[color:var(--color-accent)]/40"
          />
          <div className="rounded-2xl bg-white border border-[color:var(--color-border)] shadow-[0_18px_60px_-24px_rgba(15,23,42,0.18)] px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-white text-[13px] font-semibold tabular-nums"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {step}
              </span>
              <h3
                className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-[color:var(--color-navy)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {title}
              </h3>
            </div>
            <p
              className="mt-3 text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-[1.55] text-[color:var(--color-ink)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {copy}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

// ─── Agent badge (used inside each stage + by the CEO orchestrator) ──

function AgentBadge({ agent }: { agent: Agent }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={agent.avatarSrc}
          alt={`${agent.acronym} portrait`}
          loading="lazy"
          decoding="async"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white shadow-sm"
        />
        <span
          aria-hidden
          className="absolute -right-2 -bottom-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-white text-[9px] font-bold tracking-wide shadow-sm"
          style={{ backgroundColor: agent.accent, fontFamily: "var(--font-sans)" }}
        >
          {agent.acronym}
        </span>
      </div>
      <p
        className="mt-2 text-[10.5px] sm:text-[11px] leading-[1.25] text-[color:var(--color-muted)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {agent.description}
      </p>
    </div>
  );
}

// ─── CEO orchestrator above the flow ─────────────────────────────────

// CeoOrchestrator removed — CEO is now embedded in the Monitor stage
// (step 4) of the 5-step framework rather than orchestrating from
// above. The five agents now sit one-per-stage in production order.

// ─── Bottom strip ────────────────────────────────────────────────────

interface TeamFooterRole {
  acronym: Agent["acronym"];
  description: string;
  accent: string;
}

// Order matches the production flow above: Capture → Structure →
// Model → Monitor → Action. Reader sees the same sequence twice
// (stages above, agents below), reinforcing the mapping.
const TEAM_FOOTER_ROLES: TeamFooterRole[] = [
  { acronym: "PA", description: "Captures everything", accent: "var(--color-pa-mid)" },
  { acronym: "CFO", description: "Validates the financials", accent: "var(--color-cfo-mid)" },
  { acronym: "CIO", description: "Tests the scenarios", accent: "var(--color-cio-mid)" },
  { acronym: "CEO", description: "Watches what changes", accent: "var(--color-ceo-mid)" },
  { acronym: "COO", description: "Drives the next action", accent: "var(--color-coo-mid)" },
];

function TeamFooterStrip() {
  return (
    <div
      className="mt-12 rounded-xl bg-white border border-[color:var(--color-border)] px-4 py-4 sm:px-5 sm:py-4 shadow-sm"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 shrink-0 text-[color:var(--color-positive)]" aria-hidden />
        <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[color:var(--color-navy)]">
          Powered by your AI property team
        </p>
      </div>
      <ul className="mt-3 grid grid-cols-5 gap-1 sm:gap-2">
        {TEAM_FOOTER_ROLES.map((r) => (
          <li key={r.acronym} className="flex flex-col items-center text-center">
            <span
              aria-hidden
              className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-white text-[10px] font-bold tracking-wide"
              style={{ backgroundColor: r.accent }}
            >
              {r.acronym}
            </span>
            <span className="mt-1 text-[9.5px] sm:text-[10.5px] leading-[1.25] text-[color:var(--color-muted)]">
              {r.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Chip cluster ───────────────────────────────────────────────────

function ChipCluster({
  chips,
  variant,
}: {
  chips: Chip[];
  variant: "capture" | "structure" | "model" | "monitor";
}) {
  const ariaLabel: Record<typeof variant, string> = {
    capture: "Example input sources",
    structure: "Structured data fields",
    model: "Decision scenarios modelled",
    monitor: "Things AssetCentral keeps watching",
  };
  return (
    <ul
      className={
        "ac-chip-cluster flex flex-wrap justify-center gap-2.5 " +
        (variant === "capture" ? "ac-chips-float" : "")
      }
      aria-label={ariaLabel[variant]}
    >
      {chips.map((c, i) => (
        <li
          key={c.label}
          className="ac-chip-item"
          style={{ animationDelay: `${i * 0.18}s` }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white border border-[color:var(--color-border)] shadow-sm pl-2 pr-3 py-1.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span
              aria-hidden
              className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-[color:var(--color-accent)]/10"
            >
              <ChipIcon name={c.icon} />
            </span>
            <span className="text-[12.5px] font-medium text-[color:var(--color-navy)]">
              {c.label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

// ─── AC hub ─────────────────────────────────────────────────────────

function AcHub() {
  return (
    <div
      className="relative w-[120px] h-[120px] flex items-center justify-center"
      aria-hidden
    >
      {/* Outer dotted ring */}
      <svg
        className="absolute inset-0 w-full h-full text-[color:var(--color-accent)]/45"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 5"
        />
      </svg>
      {/* Soft pulsing halo */}
      <span className="ac-hub-halo absolute inset-2 rounded-full bg-[color:var(--color-accent)]/20 blur-xl" />
      {/* Logo badge */}
      <span
        className="relative inline-flex w-14 h-14 items-center justify-center rounded-[12px] bg-[color:var(--color-navy)] text-white text-[15px] font-bold tracking-wide shadow-lg"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        AC
        <span
          aria-hidden
          className="absolute -top-1.5 -right-1.5 inline-flex w-4 h-4 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[9px] font-semibold"
        >
          ✦
        </span>
      </span>
    </div>
  );
}

// ─── Output grid ───────────────────────────────────────────────────

function OutputGrid() {
  return (
    <ul
      className="ac-output-grid grid grid-cols-2 gap-3 max-w-md mx-auto"
      aria-label="Outputs"
    >
      <li className="ac-output-card" style={{ animationDelay: "0s" }}>
        <OutputCard title="Investment Report">
          <div className="aspect-[5/3] rounded-md bg-gradient-to-br from-[#e0e7ff] via-[#e2e8f0] to-[#f1f5f9] overflow-hidden">
            <PropertyThumb className="w-full h-full" />
          </div>
          <div className="mt-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-50 text-[9px] font-bold tracking-wider text-red-600">
            PDF
          </div>
        </OutputCard>
      </li>

      <li className="ac-output-card" style={{ animationDelay: "0.12s" }}>
        <OutputCard title="Portfolio Dashboard">
          <p
            className="text-[10.5px] uppercase tracking-wider text-[color:var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Total Value
          </p>
          <div
            className="flex items-baseline gap-2 mt-0.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span className="text-[16px] font-semibold text-[color:var(--color-navy)] tabular-nums">
              £1,248,000
            </span>
            <span className="text-[10px] font-semibold text-[color:var(--color-positive)] tabular-nums">
              ↑ 8.4%
            </span>
          </div>
          <Sparkline className="mt-1.5 w-full h-7" />
        </OutputCard>
      </li>

      <li className="ac-output-card" style={{ animationDelay: "0.24s" }}>
        <OutputCard title="Alert">
          <div className="flex flex-col items-center justify-center text-center py-2">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-[color:var(--color-accent)]/10">
              <Bell className="w-5 h-5 text-[color:var(--color-accent)]" />
            </span>
            <p
              className="mt-1.5 text-[11.5px] font-semibold text-[color:var(--color-navy)] leading-tight"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Rate locked
            </p>
            <p
              className="text-[10.5px] text-[color:var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              3.89% for 60 days
            </p>
          </div>
        </OutputCard>
      </li>

      <li className="ac-output-card" style={{ animationDelay: "0.36s" }}>
        <OutputCard title="Next Actions">
          <ul
            className="space-y-1.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {[
              "Review refinance options",
              "Book valuation",
              "Update rent roll",
            ].map((t) => (
              <li key={t} className="flex items-start gap-1.5 text-[11.5px] text-[color:var(--color-navy)] leading-snug">
                <Check className="w-3 h-3 mt-0.5 shrink-0 text-[color:var(--color-accent)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </OutputCard>
      </li>
    </ul>
  );
}

function OutputCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white border border-[color:var(--color-border)] shadow-sm p-3 h-full">
      <p
        className="text-[10.5px] uppercase tracking-wider font-semibold text-[color:var(--color-muted)] mb-2"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

// ─── Connector line ─────────────────────────────────────────────────

function Connector() {
  return (
    <div className="flex justify-center my-2" aria-hidden>
      <svg width="20" height="48" viewBox="0 0 20 48" xmlns="http://www.w3.org/2000/svg" className="text-[color:var(--color-accent)]/45">
        <line x1="10" y1="0" x2="10" y2="38" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 5" />
        <path d="M5 36 L10 44 L15 36 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

// ─── Inline icons ───────────────────────────────────────────────────

const CHIP_ICONS = {
  pdf: "pdf",
  email: "email",
  whatsapp: "whatsapp",
  calculator: "calculator",
  notes: "notes",
  voice: "voice",
  external: "external",
  pound: "pound",
  house: "house",
  wallet: "wallet",
  calendar: "calendar",
  trend: "trend",
  percent: "percent",
  flow: "flow",
  tenancy: "tenancy",
  cart: "cart",
  tag: "tag",
  refresh: "refresh",
  tools: "tools",
  key: "key",
  lock: "lock",
  portfolio: "portfolio",
  bell: "bell",
  shield: "shield",
} as const;

type ChipIconName = keyof typeof CHIP_ICONS;

function ChipIcon({ name }: { name: ChipIconName }) {
  const common = {
    width: 13,
    height: 13,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--color-accent)",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "pdf":
      return (
        <svg {...common} aria-hidden>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4" />
          <text x="9" y="17" fontSize="6" fill="var(--color-accent)" stroke="none" fontWeight="700">PDF</text>
        </svg>
      );
    case "email":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 8l9 6 9-6" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common} aria-hidden>
          <path d="M5 19l1.2-3.3A8 8 0 1 1 12 20a8 8 0 0 1-3.7-.9z" />
          <path d="M9 11c1 2 2 3 4 4l1.5-1 2 1-1 2c-3 0-7-4-7-7l2-1 1 2z" />
        </svg>
      );
    case "calculator":
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <rect x="8" y="6" width="8" height="3" />
          <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" />
        </svg>
      );
    case "notes":
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 9h6M9 13h6M9 17h3" />
        </svg>
      );
    case "voice":
      return (
        <svg {...common} aria-hidden>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
        </svg>
      );
    case "external":
      return (
        <svg {...common} aria-hidden>
          <path d="M18 16a4 4 0 0 0 0-8 6 6 0 0 0-12 1 4 4 0 0 0 1 8h11z" />
          <path d="M12 12v6M9 15l3 3 3-3" />
        </svg>
      );
    case "pound":
      return (
        <svg {...common} aria-hidden>
          <path d="M16 7a3 3 0 0 0-6 0v3H8m8 4H8c2 0 3 1 3 3l-1 3h9" />
        </svg>
      );
    case "house":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M16 12h3" />
          <path d="M3 9V7a2 2 0 0 1 2-2h12" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common} aria-hidden>
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <path d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 17l5-5 4 4 7-7" />
          <path d="M14 9h6v6" />
        </svg>
      );
    case "percent":
      return (
        <svg {...common} aria-hidden>
          <path d="M5 19L19 5" />
          <circle cx="7" cy="7" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    case "flow":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 7c4 0 4 4 8 4s4-4 8-4" />
          <path d="M4 17c4 0 4-4 8-4s4 4 8 4" />
        </svg>
      );
    case "tenancy":
      return (
        <svg {...common} aria-hidden>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 19a6 6 0 0 1 12 0" />
          <path d="M17 11h4M19 9v4" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 4h2l2 12h12l2-8H7" />
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="17" cy="20" r="1.4" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 12V4h8l10 10-8 8z" />
          <circle cx="7.5" cy="7.5" r="1.2" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case "tools":
      return (
        <svg {...common} aria-hidden>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a1.4 1.4 0 0 0 2 2l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5h-1.5V8.8l2.5-2.5z" />
        </svg>
      );
    case "key":
      return (
        <svg {...common} aria-hidden>
          <circle cx="8" cy="15" r="3" />
          <path d="M10 13l9-9 2 2-2 2 1.5 1.5-2 2L17 10l-4 4" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "portfolio":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="6" width="18" height="14" rx="2" />
          <path d="M9 6V4h6v2" />
          <path d="M3 12h18" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common} aria-hidden>
          <path d="M6 8a6 6 0 1 1 12 0v5l2 2H4l2-2z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" />
          <path d="M12 9v4M12 16h.01" />
        </svg>
      );
  }
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Bell({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 8a6 6 0 1 1 12 0v5l2 2H4l2-2z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

function Sparkline({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="sl-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 22 L12 20 L24 23 L36 18 L48 17 L60 14 L72 13 L84 9 L100 5 L100 28 L0 28 Z"
        fill="url(#sl-grad)"
      />
      <path
        d="M0 22 L12 20 L24 23 L36 18 L48 17 L60 14 L72 13 L84 9 L100 5"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function PropertyThumb({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 72"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x="30" y="28" width="60" height="34" fill="#f8fafc" stroke="#cbd5e1" />
      <path d="M24 30 L60 8 L96 30 Z" fill="#1a1a2e" />
      <rect x="55" y="40" width="10" height="22" fill="#4f6ef7" />
      <g fill="#bae6fd" stroke="#1a1a2e" strokeWidth="0.8">
        <rect x="36" y="34" width="12" height="9" />
        <rect x="72" y="34" width="12" height="9" />
        <rect x="36" y="48" width="12" height="9" />
        <rect x="72" y="48" width="12" height="9" />
      </g>
      <rect x="0" y="62" width="120" height="10" fill="#e2e8f0" />
    </svg>
  );
}

// ─── Animation styles ──────────────────────────────────────────────

const SECTION_STYLES = `
  .ac-chip-cluster .ac-chip-item {
    opacity: 1;
  }
  @media (prefers-reduced-motion: no-preference) {
    .ac-chips-float .ac-chip-item {
      animation: ac-chip-float 4.2s ease-in-out infinite;
    }
    .ac-hub-halo {
      animation: ac-hub-pulse 2.4s ease-in-out infinite;
    }
    .ac-output-card {
      animation: ac-output-fade 0.6s ease-out both;
    }
  }
  @keyframes ac-chip-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @keyframes ac-hub-pulse {
    0%, 100% { transform: scale(0.92); opacity: 0.5; }
    50% { transform: scale(1.08); opacity: 0.9; }
  }
  @keyframes ac-output-fade {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
