// Visual sections injected into the /monitor pillar page.
//
// Each function below renders one self-contained <section>. The
// data lives in @/lib/mmm-samples — the visuals are pure
// presentation. Everything is server-rendered.

import {
  SAMPLE_PORTFOLIO,
  SAMPLE_KPIS,
  SAMPLE_ALERTS,
  CFO_MONITORING_WATCHLIST,
  COO_MONITORING_WATCHLIST,
} from "@/lib/mmm-samples";
import {
  AgentBadge,
  ComplianceNote,
  DataCompletenessBar,
  ExampleBadge,
  RiskBadge,
  SectionHeading,
  VisualSection,
} from "./shared";

/* ──────────────────────────────────────────────────────────────
 * Section 1: KPI grid — the dashboard at a glance
 *   Four cards, each with label, big number, secondary note.
 * ────────────────────────────────────────────────────────────── */

const KPI_ACCENT: Record<number, string> = {
  0: "var(--color-accent)",
  1: "var(--color-positive)",
  2: "var(--color-disc-monitor)",
  3: "var(--color-warning)",
};

export function MonitorKpiGridSection() {
  return (
    <VisualSection bg="surface" id="monitor-dashboard">
      <SectionHeading
        eyebrow="What the dashboard looks like"
        title="What a monitored portfolio looks like."
        subtitle="Five properties under continuous watch. AssetCentral keeps the headline numbers fresh so the moment something drifts, you see it."
        badge={<ExampleBadge label="Sample AssetCentral output" />}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {SAMPLE_KPIS.map((k, idx) => (
          <article
            key={k.label}
            className="rounded-2xl border border-[var(--color-border)] bg-white p-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
              {k.label}
            </p>
            <p
              className="mt-2 text-[26px] lg:text-[30px] leading-[1.1] tabular-nums text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {k.value}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: KPI_ACCENT[idx] }}
              />
              <span className="text-[12.5px] text-[var(--color-muted)] leading-tight">
                {k.note}
              </span>
            </div>
          </article>
        ))}
      </div>
      <ComplianceNote className="mt-6" />
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 2: Portfolio snapshot table
 *   Desktop: 8-column table.
 *   Mobile: collapses to a stacked card list with the same data.
 * ────────────────────────────────────────────────────────────── */

export function PortfolioSnapshotSection() {
  // For the inline yield bar inside the table, scale to the max
  // yield in the sample portfolio so the visual comparison is
  // immediate without absolute decoration.
  const maxYield = Math.max(...SAMPLE_PORTFOLIO.map((p) => p.netYield));

  return (
    <VisualSection bg="white" id="monitor-portfolio">
      <SectionHeading
        eyebrow="Property by property"
        title="Track yield, cash flow, debt and risk in one view."
        subtitle="A live, sortable picture of the whole portfolio — yield, cash flow, occupancy, debt risk, data completeness, and the open alert per property."
        badge={<ExampleBadge label="Example portfolio" />}
      />

      <article
        className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* ── Desktop table ─────────────────────────────────── */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left text-[13px] text-[var(--color-ink)] min-w-[860px]">
            <caption className="sr-only">
              Sample 5-property portfolio with net yield, monthly cash flow, occupancy, debt risk, data status and open alert per property.
            </caption>
            <thead className="bg-[var(--color-surface)] text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Property</th>
                <th scope="col" className="px-4 py-3 font-semibold">Location</th>
                <th scope="col" className="px-4 py-3 font-semibold">Net yield</th>
                <th scope="col" className="px-4 py-3 font-semibold">Monthly cash flow</th>
                <th scope="col" className="px-4 py-3 font-semibold">Occupancy</th>
                <th scope="col" className="px-4 py-3 font-semibold">Debt risk</th>
                <th scope="col" className="px-4 py-3 font-semibold">Data status</th>
                <th scope="col" className="px-4 py-3 font-semibold">Alert</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_PORTFOLIO.map((p, idx) => {
                const yieldFraction = maxYield > 0 ? p.netYield / maxYield : 0;
                return (
                  <tr
                    key={p.property}
                    className={idx > 0 ? "border-t border-[var(--color-border)]" : ""}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-semibold text-[var(--color-navy)] align-top whitespace-nowrap"
                    >
                      {p.property}
                    </th>
                    <td className="px-4 py-3 text-[var(--color-muted)] align-top whitespace-nowrap">
                      {p.location}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center gap-2">
                        <div
                          aria-hidden
                          className="h-1.5 w-14 rounded-full overflow-hidden"
                          style={{ backgroundColor: "var(--color-border)" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${yieldFraction * 100}%`,
                              backgroundColor: "var(--color-disc-monitor)",
                            }}
                          />
                        </div>
                        <span className="tabular-nums text-[var(--color-navy)] font-semibold">
                          {p.netYield.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-[var(--color-ink)] align-top whitespace-nowrap">
                      {p.monthlyCashflowDisplay}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-[var(--color-ink)] align-top">
                      {p.occupancy}%
                    </td>
                    <td className="px-4 py-3 align-top">
                      <RiskBadge risk={p.debtRisk} />
                    </td>
                    <td className="px-4 py-3 align-top min-w-[140px]">
                      <DataCompletenessBar value={p.dataCompleteness} />
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap"
                        style={{
                          backgroundColor: "rgba(79, 110, 247, 0.10)",
                          color: "var(--color-accent)",
                        }}
                      >
                        <span aria-hidden>●</span>
                        {p.alert}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Mobile card list ──────────────────────────────── */}
        <ul className="md:hidden divide-y divide-[var(--color-border)]">
          {SAMPLE_PORTFOLIO.map((p) => (
            <li
              key={p.property}
              className="px-4 py-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--color-navy)]">
                    {p.property}
                  </h3>
                  <p className="text-[12.5px] text-[var(--color-muted)]">{p.location}</p>
                </div>
                <RiskBadge risk={p.debtRisk} />
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[13px]">
                <div>
                  <dt className="text-[11.5px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    Net yield
                  </dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-[var(--color-navy)]">
                    {p.netYield.toFixed(1)}%
                  </dd>
                </div>
                <div>
                  <dt className="text-[11.5px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    Cash flow
                  </dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-[var(--color-ink)]">
                    {p.monthlyCashflowDisplay}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11.5px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    Occupancy
                  </dt>
                  <dd className="mt-0.5 tabular-nums text-[var(--color-ink)]">{p.occupancy}%</dd>
                </div>
                <div>
                  <dt className="text-[11.5px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    Data
                  </dt>
                  <dd className="mt-0.5">
                    <DataCompletenessBar value={p.dataCompleteness} />
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-[12.5px] text-[var(--color-accent)] font-semibold">
                ● {p.alert}
              </p>
            </li>
          ))}
        </ul>

        <footer className="px-5 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[var(--color-muted)]">
          <span>5 sample properties across 3 markets — figures illustrative.</span>
          <div className="flex items-center gap-1.5">
            <AgentBadge agent="CFO" />
            <AgentBadge agent="COO" />
          </div>
        </footer>
      </article>
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 3: Yield-by-property bar chart
 *   Accessible: rendered as a table; bars are decorative.
 * ────────────────────────────────────────────────────────────── */

export function YieldByPropertyChartSection() {
  const sorted = [...SAMPLE_PORTFOLIO].sort((a, b) => b.netYield - a.netYield);
  const max = Math.max(...sorted.map((p) => p.netYield));
  const avg = sorted.reduce((s, p) => s + p.netYield, 0) / sorted.length;

  return (
    <VisualSection bg="surface" id="monitor-yield">
      <SectionHeading
        eyebrow="Yield by property"
        title="See the spread in 5 seconds."
        subtitle="Net yield, sorted highest to lowest. The portfolio average is overlaid so the under-performers are obvious without scanning a list."
        badge={<ExampleBadge label="Sample AssetCentral output" />}
      />

      <article
        className="rounded-2xl border border-[var(--color-border)] bg-white p-5 lg:p-6"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="flex items-center justify-between gap-3 mb-5">
          <h3
            className="text-[16px] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Net yield by property (%)
          </h3>
          <div className="flex items-center gap-3 text-[12px] text-[var(--color-muted)]">
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block h-2 w-3 rounded-sm"
                style={{ backgroundColor: "var(--color-disc-monitor)" }}
              />
              Property
            </span>
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block h-0 w-3 border-t-2 border-dashed"
                style={{ borderColor: "var(--color-warning)" }}
              />
              Portfolio avg {avg.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="relative">
          <table className="w-full text-left text-[13px]">
            <caption className="sr-only">
              Net yield percentage by property in the example portfolio, with the {avg.toFixed(1)}% portfolio average overlaid.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="sr-only">Property</th>
                <th scope="col" className="sr-only">Net yield</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => {
                const fraction = max > 0 ? p.netYield / max : 0;
                return (
                  <tr key={p.property}>
                    <th
                      scope="row"
                      className="py-2 pr-4 align-middle font-medium text-[var(--color-ink)] whitespace-nowrap w-[40%]"
                    >
                      {p.property}
                    </th>
                    <td className="py-2 align-middle">
                      <div className="flex items-center gap-3">
                        <div
                          aria-hidden
                          className="relative h-3 flex-1 rounded-full overflow-hidden"
                          style={{ backgroundColor: "var(--color-surface)" }}
                        >
                          <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              width: `${fraction * 100}%`,
                              backgroundColor:
                                p.netYield >= avg
                                  ? "var(--color-disc-monitor)"
                                  : "var(--color-warning)",
                            }}
                          />
                          {/* avg overlay line */}
                          <div
                            className="absolute inset-y-0 border-l-2 border-dashed"
                            style={{
                              left: `${(avg / max) * 100}%`,
                              borderColor: "var(--color-warning)",
                            }}
                          />
                        </div>
                        <span className="tabular-nums text-[var(--color-navy)] font-semibold w-[3.5rem] text-right">
                          {p.netYield.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 4: Monitoring alerts and triggers
 * ────────────────────────────────────────────────────────────── */

export function MonitoringAlertsSection() {
  return (
    <VisualSection bg="white" id="monitor-alerts">
      <SectionHeading
        eyebrow="What sets off an alert"
        title="Spot issues before they affect returns."
        subtitle="Six monitoring triggers run continuously across every property. When one fires, your AI team turns it into an action — not just a notification."
      />

      <article
        className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px] text-[var(--color-ink)]">
            <caption className="sr-only">
              Monitoring triggers run by AssetCentral, what each one checks, and a sample alert it might raise.
            </caption>
            <thead className="bg-[var(--color-surface)] text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Trigger</th>
                <th scope="col" className="px-5 py-3 font-semibold">What AssetCentral checks</th>
                <th scope="col" className="px-5 py-3 font-semibold">Example alert</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_ALERTS.map((a, idx) => (
                <tr
                  key={a.trigger}
                  className={idx > 0 ? "border-t border-[var(--color-border)]" : ""}
                >
                  <th
                    scope="row"
                    className="px-5 py-3 font-semibold text-[var(--color-navy)] align-top whitespace-nowrap"
                  >
                    {a.trigger}
                  </th>
                  <td className="px-5 py-3 text-[var(--color-ink)] align-top">
                    {a.checks}
                  </td>
                  <td className="px-5 py-3 align-top">
                    <span
                      className="inline-flex items-start gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[13px] text-[var(--color-ink)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--color-warning)" }}
                      />
                      <span>{a.example}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="px-5 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[12px] text-[var(--color-muted)]">
          Alerts only fire when the underlying data is complete enough to support them — see <a href="#model-readiness" className="underline">model readiness</a>.
        </footer>
      </article>
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 5: CFO + COO side-by-side panels
 * ────────────────────────────────────────────────────────────── */

export function MonitoringRolePanelsSection() {
  return (
    <VisualSection bg="surface" id="monitor-roles">
      <SectionHeading
        eyebrow="Who watches what"
        title="Two agents lead the monitoring shift."
        subtitle="Your CFO watches the money. Your COO watches the property and the people running it. Both report into your CEO, who decides what makes the briefing."
      />
      <div className="grid lg:grid-cols-2 gap-4">
        <RolePanel
          agent="CFO"
          accent="var(--color-cfo-deep)"
          tint="var(--color-cfo-tint)"
          title="Financial monitoring"
          subtitle="Tracks the money side of the portfolio."
          items={CFO_MONITORING_WATCHLIST as readonly string[]}
        />
        <RolePanel
          agent="COO"
          accent="var(--color-coo-deep)"
          tint="var(--color-coo-tint)"
          title="Operational monitoring"
          subtitle="Tracks the property and the people running it."
          items={COO_MONITORING_WATCHLIST as readonly string[]}
        />
      </div>
    </VisualSection>
  );
}

function RolePanel({
  agent,
  accent,
  tint,
  title,
  subtitle,
  items,
}: {
  agent: "CFO" | "COO";
  accent: string;
  tint: string;
  title: string;
  subtitle: string;
  items: readonly string[];
}) {
  return (
    <article
      className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <header
        className="px-5 lg:px-6 py-5 border-b border-[var(--color-border)] flex items-center gap-3"
        style={{ backgroundColor: tint }}
      >
        <AgentBadge agent={agent} size="md" />
        <div>
          <h3
            className="text-[18px] leading-tight"
            style={{ fontFamily: "var(--font-display)", color: accent }}
          >
            {title}
          </h3>
          <p className="text-[12.5px] text-[var(--color-ink)] opacity-80">{subtitle}</p>
        </div>
      </header>
      <ul className="p-5 lg:p-6 grid grid-cols-2 gap-x-4 gap-y-2 text-[14px] text-[var(--color-ink)]">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span
              aria-hidden
              className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0"
              style={{ backgroundColor: accent }}
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
