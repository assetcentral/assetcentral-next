// Shared atoms for the /model, /monitor and /manage visual sections.
//
// All components here are server-only and accept simple props. They
// implement the small set of UI primitives used across the three
// pillar pages so the visuals read as one coherent demo, not three
// disconnected ones:
//
//   - SectionEyebrow       — tiny uppercase label above each H2
//   - ExampleBadge         — flags any sample-data visual as illustrative
//   - ComplianceNote       — single-line disclaimer under tables
//   - AgentBadge           — coloured chip per agent role
//   - RiskBadge            — Low / Medium / High with icon + colour
//   - StatusBadge          — task and document status pills
//   - PriorityBadge        — High / Medium / Low task priorities
//   - HorizontalBar        — accessible bar used inside table cells
//   - DataCompletenessBar  — labelled progress bar
//
// Colour is never the only indicator — every badge pairs colour with
// a short text label and (where useful) a small icon glyph.

import type {
  ActionStatus,
  AgentKey,
  DebtRisk,
  DocStatus,
  Priority,
} from "@/lib/mmm-samples";

/* ── Eyebrows + section chrome ───────────────────────────────── */

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </p>
  );
}

export function ExampleBadge({
  variant = "subtle",
  label = "Example portfolio",
}: {
  variant?: "subtle" | "strong";
  label?: string;
}) {
  const strong = variant === "strong";
  return (
    <span
      className={
        strong
          ? "inline-flex items-center gap-1.5 rounded-full bg-[var(--color-navy)] text-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
          : "inline-flex items-center gap-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
      }
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
      {label}
    </span>
  );
}

export function ComplianceNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-[12px] leading-[1.55] text-[var(--color-muted)] ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      Example only. AssetCentral provides decision-support tools and
      information, not financial, tax, legal or investment advice.
    </p>
  );
}

/* ── Agent badges (per-role colour tokens) ────────────────────── */

const AGENT_META: Record<
  AgentKey,
  { fullName: string; tint: string; deep: string; symbol: string }
> = {
  CIO: {
    fullName: "Chief Investment Officer",
    tint: "var(--color-cio-tint)",
    deep: "var(--color-cio-deep)",
    symbol: "C",
  },
  CFO: {
    fullName: "Chief Financial Officer",
    tint: "var(--color-cfo-tint)",
    deep: "var(--color-cfo-deep)",
    symbol: "F",
  },
  CEO: {
    fullName: "Chief Executive Officer",
    tint: "var(--color-ceo-tint)",
    deep: "var(--color-ceo-deep)",
    symbol: "E",
  },
  COO: {
    fullName: "Chief Operations Officer",
    tint: "var(--color-coo-tint)",
    deep: "var(--color-coo-deep)",
    symbol: "O",
  },
  PA: {
    fullName: "Personal Assistant",
    tint: "var(--color-pa-tint)",
    deep: "var(--color-pa-deep)",
    symbol: "P",
  },
};

export function AgentBadge({
  agent,
  size = "sm",
}: {
  agent: AgentKey;
  size?: "sm" | "md";
}) {
  const meta = AGENT_META[agent];
  const sizes =
    size === "md"
      ? "text-[12.5px] px-2.5 py-1"
      : "text-[11px] px-2 py-0.5";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizes}`}
      style={{
        backgroundColor: meta.tint,
        color: meta.deep,
        fontFamily: "var(--font-sans)",
      }}
      title={meta.fullName}
    >
      <span
        aria-hidden
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
        style={{ backgroundColor: meta.deep }}
      >
        {meta.symbol}
      </span>
      {agent}
    </span>
  );
}

/* ── Risk + status badges ────────────────────────────────────── */

export function RiskBadge({ risk }: { risk: DebtRisk }) {
  const map = {
    Low: {
      bg: "rgba(22, 163, 74, 0.10)",
      fg: "var(--color-positive)",
      dot: "var(--color-positive)",
    },
    Medium: {
      bg: "rgba(217, 119, 6, 0.10)",
      fg: "var(--color-warning)",
      dot: "var(--color-warning)",
    },
    High: {
      bg: "rgba(220, 38, 38, 0.10)",
      fg: "var(--color-negative)",
      dot: "var(--color-negative)",
    },
  }[risk];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-semibold"
      style={{ backgroundColor: map.bg, color: map.fg, fontFamily: "var(--font-sans)" }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: map.dot }} />
      {risk}
    </span>
  );
}

export function StatusBadge({
  status,
}: {
  status: ActionStatus | DocStatus;
}) {
  const map: Record<string, { bg: string; fg: string; glyph: string }> = {
    "To do": { bg: "rgba(79, 110, 247, 0.10)", fg: "var(--color-accent)", glyph: "○" },
    "In progress": { bg: "rgba(217, 119, 6, 0.10)", fg: "var(--color-warning)", glyph: "◐" },
    "Waiting": { bg: "rgba(100, 116, 139, 0.10)", fg: "var(--color-muted)", glyph: "◑" },
    "Draft": { bg: "rgba(100, 116, 139, 0.10)", fg: "var(--color-muted)", glyph: "✎" },
    "Requested": { bg: "rgba(217, 119, 6, 0.10)", fg: "var(--color-warning)", glyph: "◐" },
    "Missing": { bg: "rgba(220, 38, 38, 0.10)", fg: "var(--color-negative)", glyph: "!" },
    "Uploaded": { bg: "rgba(22, 163, 74, 0.10)", fg: "var(--color-positive)", glyph: "✓" },
    "Needed": { bg: "rgba(220, 38, 38, 0.10)", fg: "var(--color-negative)", glyph: "!" },
  };
  const m = map[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-semibold whitespace-nowrap"
      style={{ backgroundColor: m.bg, color: m.fg, fontFamily: "var(--font-sans)" }}
    >
      <span aria-hidden className="font-mono">{m.glyph}</span>
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const map = {
    High: { bg: "rgba(220, 38, 38, 0.12)", fg: "var(--color-negative)", glyph: "▲" },
    Medium: { bg: "rgba(217, 119, 6, 0.12)", fg: "var(--color-warning)", glyph: "■" },
    Low: { bg: "rgba(100, 116, 139, 0.12)", fg: "var(--color-muted)", glyph: "•" },
  }[priority];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-semibold"
      style={{ backgroundColor: map.bg, color: map.fg, fontFamily: "var(--font-sans)" }}
    >
      <span aria-hidden>{map.glyph}</span>
      {priority}
    </span>
  );
}

/* ── Bars + progress ─────────────────────────────────────────── */

// Accessible bar rendered inside a table cell. The numeric value
// shows as text alongside; the bar itself is decorative
// (aria-hidden). Width is a fraction 0–1.
export function HorizontalBar({
  fraction,
  color = "var(--color-accent)",
  label,
}: {
  fraction: number;
  color?: string;
  label: string;
}) {
  const clamped = Math.max(0, Math.min(1, fraction));
  return (
    <div className="flex items-center gap-3 min-w-[140px]">
      <div
        aria-hidden
        className="relative h-2 flex-1 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--color-border)" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${clamped * 100}%`, backgroundColor: color }}
        />
      </div>
      <span
        className="text-[12.5px] tabular-nums text-[var(--color-ink)] whitespace-nowrap"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </span>
    </div>
  );
}

export function DataCompletenessBar({
  value,
  size = "sm",
}: {
  value: number; // 0–100
  size?: "sm" | "md";
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const tone =
    clamped >= 85
      ? "var(--color-positive)"
      : clamped >= 70
        ? "var(--color-warning)"
        : "var(--color-negative)";
  const trackHeight = size === "md" ? "h-2.5" : "h-1.5";
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Data completeness ${clamped}%`}
      className="flex items-center gap-2 min-w-[120px]"
    >
      <div
        className={`relative ${trackHeight} flex-1 rounded-full overflow-hidden`}
        style={{ backgroundColor: "var(--color-border)" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${clamped}%`, backgroundColor: tone }}
        />
      </div>
      <span
        className="text-[12px] tabular-nums text-[var(--color-ink)] whitespace-nowrap"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {clamped}%
      </span>
    </div>
  );
}

/* ── Section frame ───────────────────────────────────────────── */

export function VisualSection({
  bg = "white",
  children,
  id,
}: {
  bg?: "white" | "surface" | "navy";
  children: React.ReactNode;
  id?: string;
}) {
  const cls =
    bg === "navy"
      ? "bg-[var(--color-navy)] text-white"
      : bg === "surface"
        ? "bg-[var(--color-surface)] border-y border-[var(--color-border)]"
        : "bg-white";
  return (
    <section className={cls} id={id}>
      <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  badge,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
}) {
  return (
    <header className="mb-10 lg:mb-12">
      <div className="flex items-center gap-3 flex-wrap">
        {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
        {badge ? <span className="mb-4">{badge}</span> : null}
      </div>
      <h2
        className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className="mt-4 text-[16px] lg:text-[18px] leading-[1.6] text-[var(--color-muted)] max-w-3xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
