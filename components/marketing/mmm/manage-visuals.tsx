// Visual sections injected into the /manage pillar page.
//
// Server components, composed from shared atoms + sample data.

import {
  SAMPLE_ACTIONS,
  SAMPLE_MISSING_DOCS,
  MANAGEMENT_WORKFLOW,
  CEO_WEEKLY_BRIEFING,
  BEFORE_AC,
  WITH_AC,
} from "@/lib/mmm-samples";
import {
  AgentBadge,
  ComplianceNote,
  ExampleBadge,
  PriorityBadge,
  StatusBadge,
  SectionHeading,
  VisualSection,
} from "./shared";

/* ──────────────────────────────────────────────────────────────
 * Section 1: Action priority table
 *   The "from insight to action" demonstration. Five sample
 *   tasks, each owned by an agent, with reason + expected impact.
 * ────────────────────────────────────────────────────────────── */

export function ActionPrioritySection() {
  return (
    <VisualSection bg="white" id="manage-actions">
      <SectionHeading
        eyebrow="From insight to action"
        title="What managed actions look like."
        subtitle="AssetCentral helps turn portfolio intelligence into clear next steps. Each action has an owner, a reason it&rsquo;s open, and the impact closing it should have."
        badge={<ExampleBadge label="Sample AssetCentral output" />}
      />

      <article
        className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* ── Desktop table ─────────────────────────────────── */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left text-[13.5px] text-[var(--color-ink)] min-w-[860px]">
            <caption className="sr-only">
              Five sample action items prioritised by AssetCentral, each with the responsible agent, reason, expected impact, and status.
            </caption>
            <thead className="bg-[var(--color-surface)] text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Priority</th>
                <th scope="col" className="px-4 py-3 font-semibold">Action</th>
                <th scope="col" className="px-4 py-3 font-semibold">Property</th>
                <th scope="col" className="px-4 py-3 font-semibold">Owner</th>
                <th scope="col" className="px-4 py-3 font-semibold">Reason</th>
                <th scope="col" className="px-4 py-3 font-semibold">Expected impact</th>
                <th scope="col" className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_ACTIONS.map((a, idx) => (
                <tr
                  key={a.action + a.property}
                  className={idx > 0 ? "border-t border-[var(--color-border)]" : ""}
                >
                  <td className="px-4 py-3 align-top">
                    <PriorityBadge priority={a.priority} />
                  </td>
                  <th
                    scope="row"
                    className="px-4 py-3 font-semibold text-[var(--color-navy)] align-top"
                  >
                    {a.action}
                  </th>
                  <td className="px-4 py-3 text-[var(--color-ink)] align-top whitespace-nowrap">
                    {a.property}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <AgentBadge agent={a.owner} />
                  </td>
                  <td className="px-4 py-3 text-[var(--color-muted)] align-top">
                    {a.reason}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-ink)] align-top">
                    {a.impact}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <StatusBadge status={a.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile card list ──────────────────────────────── */}
        <ul className="md:hidden divide-y divide-[var(--color-border)]">
          {SAMPLE_ACTIONS.map((a) => (
            <li key={a.action + a.property} className="px-4 py-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[15px] font-semibold text-[var(--color-navy)]">
                  {a.action}
                </h3>
                <PriorityBadge priority={a.priority} />
              </div>
              <p className="mt-1 text-[12.5px] text-[var(--color-muted)]">
                {a.property}
              </p>
              <p className="mt-3 text-[13px] text-[var(--color-ink)]">
                <span className="text-[var(--color-muted)]">Reason · </span>
                {a.reason}
              </p>
              <p className="mt-1 text-[13px] text-[var(--color-ink)]">
                <span className="text-[var(--color-muted)]">Impact · </span>
                {a.impact}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <AgentBadge agent={a.owner} />
                <StatusBadge status={a.status} />
              </div>
            </li>
          ))}
        </ul>

        <footer className="px-5 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[var(--color-muted)]">
          <span>You own the properties. Your AI team does the modelling, monitoring and managing.</span>
          <ComplianceNote />
        </footer>
      </article>
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 2: Management workflow graphic
 *   Vertical stepper on mobile, horizontal row on desktop.
 * ────────────────────────────────────────────────────────────── */

export function ManagementWorkflowSection() {
  return (
    <VisualSection bg="surface" id="manage-workflow">
      <SectionHeading
        eyebrow="How an insight becomes an action"
        title="Prioritise the work that improves portfolio performance."
        subtitle="Every alert flows through the same seven steps — so you always know what was detected, who reviewed it, and what happened next."
      />

      <ol
        className="grid gap-3 lg:gap-4 lg:grid-cols-7"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {MANAGEMENT_WORKFLOW.map((step, idx) => {
          const isLast = idx === MANAGEMENT_WORKFLOW.length - 1;
          return (
            <li
              key={step.step}
              className="relative rounded-2xl border border-[var(--color-border)] bg-white p-4"
            >
              {/* Connector — desktop horizontal arrow, mobile vertical bar */}
              {!isLast ? (
                <>
                  <span
                    aria-hidden
                    className="hidden lg:block absolute top-1/2 right-[-14px] -translate-y-1/2 text-[var(--color-disc-manage)] text-[18px] leading-none z-10"
                  >
                    →
                  </span>
                  <span
                    aria-hidden
                    className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-[-14px] text-[var(--color-disc-manage)] text-[18px] leading-none"
                  >
                    ↓
                  </span>
                </>
              ) : null}

              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11.5px] font-bold text-white"
                  style={{ backgroundColor: "var(--color-disc-manage)" }}
                >
                  {idx + 1}
                </span>
                <AgentBadge agent={step.agent} />
              </div>
              <h3
                className="mt-3 text-[14.5px] leading-tight text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.step}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--color-muted)]">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 3: CEO weekly briefing card
 *   Card mocked up like a board report — numbered list of
 *   priorities + role-contribution badges underneath.
 * ────────────────────────────────────────────────────────────── */

export function CeoBriefingSection() {
  return (
    <VisualSection bg="white" id="manage-briefing">
      <SectionHeading
        eyebrow="What lands in your inbox"
        title="A briefing your CEO writes for you, every week."
        subtitle="One page. Five priorities. Where each one came from and who&rsquo;s on it."
        badge={<ExampleBadge label="Sample AssetCentral output" />}
      />

      <article
        className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <header className="px-5 lg:px-7 py-5 border-b border-[var(--color-border)] flex items-center justify-between gap-3">
          <div>
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Weekly portfolio briefing
            </p>
            <h3
              className="mt-1 text-[20px] lg:text-[22px] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              This week&rsquo;s portfolio priorities
            </h3>
          </div>
          <AgentBadge agent="CEO" size="md" />
        </header>

        <ol
          className="px-5 lg:px-7 py-6 space-y-4 text-[14.5px] leading-[1.6] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {CEO_WEEKLY_BRIEFING.map((line, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <span
                aria-hidden
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-navy)] text-white text-[12px] font-bold shrink-0 mt-[2px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {idx + 1}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ol>

        <footer className="px-5 lg:px-7 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)] font-semibold">
            Contributions this week
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <AgentBadge agent="CFO" />
            <AgentBadge agent="CIO" />
            <AgentBadge agent="COO" />
            <AgentBadge agent="PA" />
            <AgentBadge agent="CEO" />
          </div>
        </footer>
      </article>

      <ComplianceNote className="mt-6" />
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 4: Missing documents table
 * ────────────────────────────────────────────────────────────── */

export function MissingDocumentsSection() {
  return (
    <VisualSection bg="surface" id="manage-documents">
      <SectionHeading
        eyebrow="Tasks and documents"
        title="Manage tasks, documents and follow-up."
        subtitle="The PA chases missing information — and tells you who&rsquo;s waiting on what."
        badge={<ExampleBadge label="Sample AssetCentral output" />}
      />

      <article
        className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px] text-[var(--color-ink)]">
            <caption className="sr-only">
              Sample missing-document workflow — what is missing per property, why it matters, who&rsquo;s assigned and the current status.
            </caption>
            <thead className="bg-[var(--color-surface)] text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Missing item</th>
                <th scope="col" className="px-5 py-3 font-semibold">Property</th>
                <th scope="col" className="px-5 py-3 font-semibold">Why it matters</th>
                <th scope="col" className="px-5 py-3 font-semibold">Assigned to</th>
                <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_MISSING_DOCS.map((d, idx) => (
                <tr
                  key={d.item}
                  className={idx > 0 ? "border-t border-[var(--color-border)]" : ""}
                >
                  <th
                    scope="row"
                    className="px-5 py-3 font-semibold text-[var(--color-navy)] align-top whitespace-nowrap"
                  >
                    {d.item}
                  </th>
                  <td className="px-5 py-3 text-[var(--color-ink)] align-top whitespace-nowrap">
                    {d.property}
                  </td>
                  <td className="px-5 py-3 text-[var(--color-muted)] align-top">
                    {d.why}
                  </td>
                  <td className="px-5 py-3 align-top">
                    <AgentBadge agent={d.owner} />
                  </td>
                  <td className="px-5 py-3 align-top">
                    <StatusBadge status={d.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </VisualSection>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Section 5: Before / With AssetCentral
 * ────────────────────────────────────────────────────────────── */

export function BeforeAfterSection() {
  return (
    <VisualSection bg="white" id="manage-before-after">
      <SectionHeading
        eyebrow="Before and after"
        title="From scattered to structured."
        subtitle="A portfolio without AssetCentral lives across spreadsheets, emails and WhatsApp. With AssetCentral, the same portfolio runs as a system."
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <article
          className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <header className="px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)] font-semibold">
              Before AssetCentral
            </p>
            <h3
              className="mt-1 text-[18px] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Scattered and reactive
            </h3>
          </header>
          <ul className="p-5 lg:p-6 space-y-3 text-[14px] text-[var(--color-ink)]">
            {BEFORE_AC.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[6px] inline-flex h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: "var(--color-negative)" }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article
          className="rounded-2xl border border-[var(--color-navy)] bg-white overflow-hidden"
          style={{ fontFamily: "var(--font-sans)", boxShadow: "0 2px 12px rgba(15, 23, 42, 0.04)" }}
        >
          <header className="px-5 py-4 border-b border-[var(--color-navy)] bg-[var(--color-navy)] text-white">
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-white/65 font-semibold">
              With AssetCentral
            </p>
            <h3
              className="mt-1 text-[18px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Structured and prioritised
            </h3>
          </header>
          <ul className="p-5 lg:p-6 space-y-3 text-[14px] text-[var(--color-ink)]">
            {WITH_AC.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[5px] inline-flex h-4 w-4 items-center justify-center rounded-full text-white text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: "var(--color-positive)" }}
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </VisualSection>
  );
}
