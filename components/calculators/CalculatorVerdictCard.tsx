"use client";

// Free AI verdict card — mirrors the /check verdict-card pattern in
// PropertyCheckClient but generalised so any calculator can drop it
// at the bottom of its results panel. Each calculator passes its own
// signal label + numeric summary + the single red flag and one
// suggested next move.
//
// Tone drives the chrome (green / amber / red / neutral navy) so the
// card reads at a glance.

import Link from "next/link";

export type VerdictTone = "strong" | "borderline" | "weak" | "risky" | "neutral";

interface ToneStyle {
  bg: string;
  border: string;
  text: string;
  chip: string;
  chipText: string;
}

const TONE: Record<VerdictTone, ToneStyle> = {
  strong: {
    bg: "rgba(22, 163, 74, 0.06)",
    border: "var(--color-positive)",
    text: "var(--color-positive)",
    chip: "rgba(22, 163, 74, 0.12)",
    chipText: "var(--color-positive)",
  },
  borderline: {
    bg: "rgba(217, 119, 6, 0.06)",
    border: "var(--color-warning)",
    text: "var(--color-warning)",
    chip: "rgba(217, 119, 6, 0.12)",
    chipText: "var(--color-warning)",
  },
  weak: {
    bg: "rgba(100, 116, 139, 0.06)",
    border: "var(--color-muted)",
    text: "var(--color-muted)",
    chip: "rgba(100, 116, 139, 0.12)",
    chipText: "var(--color-muted)",
  },
  risky: {
    bg: "rgba(220, 38, 38, 0.06)",
    border: "var(--color-negative)",
    text: "var(--color-negative)",
    chip: "rgba(220, 38, 38, 0.12)",
    chipText: "var(--color-negative)",
  },
  neutral: {
    bg: "rgba(15, 23, 42, 0.04)",
    border: "var(--color-navy)",
    text: "var(--color-navy)",
    chip: "rgba(15, 23, 42, 0.08)",
    chipText: "var(--color-navy)",
  },
};

export interface CalculatorVerdictCardProps {
  /** Tone — colours the chrome. */
  tone: VerdictTone;
  /** Short label (e.g. "Strong", "Borderline", "Skip"). */
  label: string;
  /** The single key number that drives the verdict. */
  keyMetric: { label: string; value: string };
  /** Plain-English narrative. One to three sentences. */
  summary: string;
  /** Single biggest red flag — what could go wrong. */
  redFlag: string;
  /** One thing the user could do next to improve the picture. */
  nextMove: string;
  /** Optional upgrade CTA shown beneath the card. The default is the
   *  high-intent Starter trial — the user just ran a Level-1 number and
   *  the next step is the full property decision report, which lives
   *  behind a 7-day no-card trial. Calculators with a more specific
   *  next step (e.g. the mortgage funnel deep-links into /check with
   *  the inputs prefilled) override this. */
  upgradeHref?: string;
  upgradeLabel?: string;
}

export function CalculatorVerdictCard({
  tone,
  label,
  keyMetric,
  summary,
  redFlag,
  nextMove,
  upgradeHref = "/signup?plan=individual_monthly",
  upgradeLabel = "Try full analysis free for 7 days",
}: CalculatorVerdictCardProps) {
  const t = TONE[tone];
  return (
    <section
      aria-label="AI verdict"
      className="mt-8 rounded-2xl border p-5 lg:p-6"
      style={{
        borderColor: t.border,
        background: t.bg,
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-[11px] uppercase tracking-[0.12em] font-bold rounded-full px-2 py-0.5"
          style={{ background: t.chip, color: t.chipText }}
        >
          AssetCentral view
        </span>
        <span
          className="text-[18px] lg:text-[20px] font-semibold"
          style={{ color: t.text, fontFamily: "var(--font-display)" }}
        >
          {label}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-5 lg:gap-7">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-muted)] font-semibold mb-1">
            {keyMetric.label}
          </div>
          <div
            className="num text-[28px] lg:text-[32px] font-semibold leading-tight"
            style={{ color: t.text }}
          >
            {keyMetric.value}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[14.5px] leading-[1.55] text-[color:var(--color-ink)]">
            {summary}
          </p>
          <p className="text-[13.5px] leading-[1.55] text-[color:var(--color-ink)]">
            <strong className="font-semibold">Red flag · </strong>
            {redFlag}
          </p>
          <p className="text-[13.5px] leading-[1.55] text-[color:var(--color-ink)]">
            <strong className="font-semibold">Next move · </strong>
            {nextMove}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <Link
          href={upgradeHref}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-md bg-[color:var(--color-navy)] text-white text-[14px] font-semibold transition hover:bg-[color:var(--color-navy-light)]"
        >
          {upgradeLabel}
          <span aria-hidden>→</span>
        </Link>
        <p className="text-[12px] text-[color:var(--color-muted)] sm:self-center">
          7-day Starter trial. No card required.
        </p>
      </div>
    </section>
  );
}
