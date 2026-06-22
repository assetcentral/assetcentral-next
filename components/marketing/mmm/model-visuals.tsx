// Visual sections injected into the /model pillar page.
//
// Server components only — every visual is composed from the
// shared atoms in ./shared and the static sample data in
// @/lib/mmm-samples. Nothing in here is interactive; the visuals
// are a "demo you can see without signing in" rather than a live
// app.

import Link from "next/link";

import {
  SAMPLE_PROPERTY,
  SAMPLE_SCENARIOS,
  MODEL_DATA_COMPLETENESS,
  MODEL_ROLE_CONTRIBUTIONS,
} from "@/lib/mmm-samples";
import type { AgentKey } from "@/lib/mmm-samples";
import {
  AgentBadge,
  ComplianceNote,
  ExampleBadge,
  HorizontalBar,
  SectionHeading,
  VisualSection,
  DataCompletenessBar,
} from "./shared";

const AGENT_PAGE: Record<AgentKey, string> = {
  CIO: "/ai-property-cio",
  CFO: "/ai-property-cfo",
  CEO: "/ai-property-ceo",
  COO: "/ai-property-coo",
  PA: "/ai-property-pa",
};

/* ──────────────────────────────────────────────────────────────
 * Section 1: What a modelled property looks like
 *   - Header card with property name + type
 *   - Two-column: 8-row table on the left, side panel on the right
 * ────────────────────────────────────────────────────────────── */

const KIND_LABEL: Record<string, string> = {
  value: "Asset value",
  income: "Income",
  debt: "Debt",
  cost: "Cost",
  calc: "Calculated",
};

const KIND_TINT: Record<string, string> = {
  value: "rgba(79, 110, 247, 0.10)",
  income: "rgba(22, 163, 74, 0.10)",
  debt: "rgba(220, 38, 38, 0.10)",
  cost: "rgba(217, 119, 6, 0.10)",
  calc: "rgba(139, 92, 246, 0.10)",
};

const KIND_FG: Record<string, string> = {
  value: "var(--color-accent)",
  income: "var(--color-positive)",
  debt: "var(--color-negative)",
  cost: "var(--color-warning)",
  calc: "var(--color-cio-deep)",
};

export function ModelledPropertySection() {
  return (
    <VisualSection bg="white" id="model-example">
      <SectionHeading
        eyebrow="A property, modelled"
        title="What a modelled property looks like."
        subtitle="AssetCentral turns scattered property data into structured scenarios, assumptions and decision outputs. Below is a real-world shape — sample numbers only."
        badge={<ExampleBadge label="Sample AssetCentral output" />}
      />

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
        {/* ── The model table ───────────────────────────────── */}
        <article
          className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <header className="flex items-start justify-between gap-4 px-5 lg:px-6 py-5 border-b border-[var(--color-border)]">
            <div>
              <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Property #1 · {SAMPLE_PROPERTY.currency}
              </p>
              <h3
                className="mt-1 text-[20px] lg:text-[22px] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {SAMPLE_PROPERTY.name}
              </h3>
              <p className="mt-1 text-[13px] text-[var(--color-muted)]">
                {SAMPLE_PROPERTY.type}
              </p>
            </div>
            <ExampleBadge />
          </header>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] text-[var(--color-ink)]">
              <caption className="sr-only">
                Input values and calculated yields for {SAMPLE_PROPERTY.name}, an example property.
              </caption>
              <thead className="bg-[var(--color-surface)] text-[12px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="px-5 lg:px-6 py-3 font-semibold">
                    Input
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Type
                  </th>
                  <th scope="col" className="px-5 lg:px-6 py-3 text-right font-semibold">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_PROPERTY.inputs.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={
                      idx === SAMPLE_PROPERTY.inputs.length - 3
                        ? "border-t border-[var(--color-border)] bg-[color:rgba(79,110,247,0.03)]"
                        : ""
                    }
                  >
                    <th
                      scope="row"
                      className="px-5 lg:px-6 py-3 font-medium text-[var(--color-ink)] align-top"
                    >
                      {row.label}
                    </th>
                    <td className="px-5 py-3 align-top">
                      <span
                        className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap"
                        style={{
                          backgroundColor: KIND_TINT[row.kind],
                          color: KIND_FG[row.kind],
                        }}
                      >
                        {KIND_LABEL[row.kind]}
                      </span>
                    </td>
                    <td className="px-5 lg:px-6 py-3 text-right tabular-nums text-[var(--color-navy)] font-semibold align-top">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className="px-5 lg:px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between gap-3 text-[12.5px] text-[var(--color-muted)]">
            <span>Calculated row highlighted</span>
            <span className="tabular-nums">8 inputs · 0 assumptions overridden</span>
          </footer>
        </article>

        {/* ── Side: context + agent stamps ──────────────────── */}
        <aside className="flex flex-col gap-4">
          <div
            className="rounded-2xl border border-[var(--color-border)] bg-white p-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Context
            </p>
            <dl className="mt-3 space-y-2.5 text-[13.5px]">
              {SAMPLE_PROPERTY.context.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">{row.label}</dt>
                  <dd className="text-[var(--color-navy)] font-semibold tabular-nums">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="rounded-2xl border border-[var(--color-border)] bg-white p-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Touched by
            </p>
            <p className="mt-3 text-[13.5px] leading-[1.55] text-[var(--color-ink)]">
              The model is checked, costed and benchmarked by your AI team before it&rsquo;s shown to you.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <AgentBadge agent="CIO" />
              <AgentBadge agent="CFO" />
              <AgentBadge agent="PA" />
            </div>
          </div>

          <ComplianceNote />
        </aside>
      </div>
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 2: Scenario comparison
 *   - 4 scenarios, one table row each, with an inline cash-flow
 *     bar so the relative magnitudes read at a glance.
 *   - A small stacked-bar SVG beside the table compares the
 *     5-year value case.
 * ────────────────────────────────────────────────────────────── */

const AI_TONE: Record<
  "neutral" | "positive" | "watch",
  { bg: string; fg: string }
> = {
  neutral: { bg: "rgba(100, 116, 139, 0.10)", fg: "var(--color-muted)" },
  positive: { bg: "rgba(22, 163, 74, 0.10)", fg: "var(--color-positive)" },
  watch: { bg: "rgba(217, 119, 6, 0.10)", fg: "var(--color-warning)" },
};

export function ScenarioComparisonSection() {
  const maxCashflow = Math.max(...SAMPLE_SCENARIOS.map((s) => s.cashflow12m));
  return (
    <VisualSection bg="surface" id="model-scenarios">
      <SectionHeading
        eyebrow="Compare your options"
        title="Compare hold, sell, refinance and improve scenarios."
        subtitle="One property, four ways forward. AssetCentral models the cash flow, the five-year value case and the operational risk for each — then your AI team weighs in."
        badge={<ExampleBadge label="Sample AssetCentral output" />}
      />

      <div
        className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px] text-[var(--color-ink)] min-w-[720px]">
            <caption className="sr-only">
              Four scenarios compared for the Dubai Marina Apartment example, including 12-month cash flow, 5-year value case, main risk and AI team view.
            </caption>
            <thead className="bg-[var(--color-surface)] text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Scenario</th>
                <th scope="col" className="px-5 py-3 font-semibold">12-month cash flow</th>
                <th scope="col" className="px-5 py-3 font-semibold">5-year value case</th>
                <th scope="col" className="px-5 py-3 font-semibold">Main risk</th>
                <th scope="col" className="px-5 py-3 font-semibold">AI team view</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_SCENARIOS.map((s, idx) => {
                const fraction = maxCashflow > 0 ? s.cashflow12m / maxCashflow : 0;
                return (
                  <tr
                    key={s.label}
                    className={idx > 0 ? "border-t border-[var(--color-border)]" : ""}
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 font-semibold text-[var(--color-navy)] align-top whitespace-nowrap"
                    >
                      {s.label}
                    </th>
                    <td className="px-5 py-4 align-top">
                      <HorizontalBar
                        fraction={fraction}
                        label={s.cashflowDisplay}
                        color="var(--color-disc-model)"
                      />
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <div
                          aria-hidden
                          className="h-1.5 w-10 rounded-full overflow-hidden"
                          style={{ backgroundColor: "var(--color-border)" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${s.fiveYearWeight * 100}%`,
                              backgroundColor: "var(--color-disc-model)",
                            }}
                          />
                        </div>
                        <span className="text-[13px] text-[var(--color-ink)]">
                          {s.fiveYear}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top text-[var(--color-muted)]">
                      {s.risk}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap"
                        style={{
                          backgroundColor: AI_TONE[s.aiTone].bg,
                          color: AI_TONE[s.aiTone].fg,
                        }}
                      >
                        {s.aiView}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <footer className="px-5 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex flex-wrap items-center justify-between gap-3 text-[12px] text-[var(--color-muted)]">
          <span>Sized bars indicate relative 12-month cash flow.</span>
          <ComplianceNote />
        </footer>
      </div>
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 3: AI team contribution (per-role explainer cards)
 * ────────────────────────────────────────────────────────────── */

export function AiTeamContributionSection() {
  return (
    <VisualSection bg="surface" id="model-ai-team">
      <SectionHeading
        eyebrow="The team behind the model"
        title="Four agents shape every model."
        subtitle="Each scenario is reviewed by the agent that owns the relevant dimension. You stay in control — they do the modelling."
      />
      <div className="grid sm:grid-cols-2 gap-4">
        {MODEL_ROLE_CONTRIBUTIONS.map((r) => (
          <Link
            key={r.agent}
            href={AGENT_PAGE[r.agent]}
            className="group rounded-2xl border border-[var(--color-border)] bg-white p-5 transition-colors hover:border-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <div className="flex items-center gap-2">
              <AgentBadge agent={r.agent} size="md" />
              <span className="text-[13.5px] text-[var(--color-muted)]">{r.fullName}</span>
            </div>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-[var(--color-ink)]">
              {r.body}
            </p>
            <p className="mt-3 text-[12.5px] text-[var(--color-accent)] group-hover:underline">
              Meet the {r.agent} →
            </p>
          </Link>
        ))}
      </div>
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 4: Data completeness card
 *   - "Model readiness 82%" with two lists: complete + missing.
 * ────────────────────────────────────────────────────────────── */

export function DataCompletenessSection() {
  const dc = MODEL_DATA_COMPLETENESS;
  return (
    <VisualSection bg="white" id="model-readiness">
      <SectionHeading
        eyebrow="See the assumptions behind every decision."
        title="Model readiness tells you what to trust."
        subtitle="Every figure in a scenario is backed by a source field. When a field is missing, AssetCentral marks it — so you know exactly how complete your model is before you act on it."
        badge={<ExampleBadge label="Sample AssetCentral output" />}
      />

      <article
        className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="px-5 lg:px-6 py-5 border-b border-[var(--color-border)] flex flex-wrap items-center gap-4 justify-between">
          <div>
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
              {SAMPLE_PROPERTY.name}
            </p>
            <h3
              className="mt-1 text-[18px] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Model readiness
            </h3>
          </div>
          <div className="min-w-[180px] max-w-[280px] flex-1">
            <DataCompletenessBar value={dc.readiness} size="md" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
          <div className="p-5 lg:p-6">
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-positive)] font-semibold">
              Complete · {dc.complete.length}
            </p>
            <ul className="mt-3 space-y-2 text-[14px] text-[var(--color-ink)]">
              {dc.complete.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-[6px] h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--color-positive)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 lg:p-6">
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-warning)] font-semibold">
              Missing · {dc.missing.length}
            </p>
            <ul className="mt-3 space-y-2 text-[14px] text-[var(--color-ink)]">
              {dc.missing.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-[6px] h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--color-warning)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="px-5 lg:px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[var(--color-muted)]">
          <span>The PA chases the missing items so the model stays honest.</span>
          <AgentBadge agent="PA" />
        </footer>
      </article>
    </VisualSection>
  );
}
