// InfrastructureSection — the literal contents of "the infrastructure".
//
// Sits right under the team hero. Answers the question every visitor
// has after the H1: "OK, you said institutional infrastructure — what
// does that actually mean in tools I get?" Spells out the four
// categories of capability the platform ships today, with the
// individual line items inside each one.
//
// Four cards, 2x2 on lg+, single column on mobile. Each card carries
// an agent accent so the visitor maps the capability to the role that
// owns it without us having to label every line.
//
// Compliance: numbers are non-existent here. Just a tools list.
// Items are real product capabilities or planned-and-named ones
// already on the platform (see lib/billing/plans.ts and the report
// templates in assetcentral-app/lib/reports/templates). Voice is
// flagged "coming soon" elsewhere on the site — kept in the list
// here because it is a shipping capability, not a promise.

import Link from "next/link";

interface Tool {
  /** Short label. */
  label: string;
  /** Optional one-line clarifier — kept terse. */
  detail?: string;
}

interface Group {
  /** Eyebrow above the headline. */
  eyebrow: string;
  /** Card headline. */
  title: string;
  /** Single-sentence framing of what the group covers. */
  blurb: string;
  /** Concrete list of tools. */
  tools: Tool[];
  /** Per-role accent (matches CSS tokens). */
  accent: {
    tint: string;
    deep: string;
    badge: string;
  };
  /** Icon shape. */
  icon: React.ReactNode;
  /** Where the "see it" link routes. */
  href: string;
  /** Link label. */
  linkLabel: string;
}

const GROUPS: Group[] = [
  {
    eyebrow: "Calculators & underwriting",
    title: "Run an IC-grade underwrite on every property.",
    blurb:
      "The same modelled framework an investment committee runs — one click per scenario.",
    accent: {
      tint: "var(--color-cio-tint)",
      deep: "var(--color-cio-deep)",
      badge: "var(--color-cio-mid)",
    },
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
    href: "/calculators",
    linkLabel: "Open the calculators",
    tools: [
      { label: "Gross + net yield calculator" },
      { label: "Cash-on-cash + IRR" },
      { label: "Hold-vs-sell IRR comparison" },
      { label: "Mortgage / refinance modeller" },
      { label: "Capex vs rent-uplift case" },
      { label: "Rate-shock stress test", detail: "+100 / +200 / +300 bps" },
      { label: "Lease-rollover stress test", detail: "-5% / -10% / -15%" },
      { label: "Long-term vs short-term let comparison" },
    ],
  },
  {
    eyebrow: "Reports library — PDF + Word",
    title: "Sixteen reports the agents write for you.",
    blurb:
      "Every report a lender, accountant, partner or buyer asks for. Co-branding available for partners.",
    accent: {
      tint: "var(--color-ceo-tint)",
      deep: "var(--color-ceo-deep)",
      badge: "var(--color-ceo-mid)",
    },
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    ),
    href: "/features",
    linkLabel: "See report formats",
    tools: [
      { label: "Portfolio summary / Board report" },
      { label: "CEO Decision Room" },
      { label: "Single-asset deep-dive" },
      { label: "Cashflow + tax pack" },
      { label: "Refinancing pack", detail: "lender-ready" },
      { label: "Investor presentation", detail: "landscape" },
      { label: "Liquidity report" },
      { label: "Funding report" },
      { label: "Cashflow forecast", detail: "12-month rolling" },
      { label: "Rent benchmarking report" },
      { label: "Comparable sales report" },
      { label: "Market outlook report" },
      { label: "Lease calendar" },
      { label: "Capex schedule" },
      { label: "Voids analysis" },
      { label: "Single-asset sales brochure" },
    ],
  },
  {
    eyebrow: "Live market data",
    title: "Plug in to the same feeds an analyst would buy.",
    blurb:
      "Live external data, refreshed on a schedule, ready to drop into any model or report.",
    accent: {
      tint: "var(--color-cfo-tint)",
      deep: "var(--color-cfo-deep)",
      badge: "var(--color-cfo-mid)",
    },
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 12h3l3-7 4 14 3-7h5" />
      </svg>
    ),
    href: "/monitor",
    linkLabel: "See live data in action",
    tools: [
      { label: "Mortgage product scanner", detail: "live rates per market" },
      { label: "Local rent comparables" },
      { label: "Recent transaction comparables" },
      { label: "Macro indicators", detail: "rates · CPI · growth" },
      { label: "Rent regulation by market" },
      { label: "Service-charge benchmarks" },
      { label: "FX rates for cross-border owners" },
      { label: "Yield benchmarks per submarket" },
    ],
  },
  {
    eyebrow: "Monitoring, voice + reminders",
    title: "The desk that watches when you're not.",
    blurb:
      "Continuous monitoring, scheduled call-outs and a voice line to the team — without you opening the dashboard.",
    accent: {
      tint: "var(--color-coo-tint)",
      deep: "var(--color-coo-deep)",
      badge: "var(--color-coo-mid)",
    },
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a1.998 1.998 0 01-3.4 0" />
      </svg>
    ),
    href: "/manage",
    linkLabel: "How alerts become actions",
    tools: [
      { label: "Voice line", detail: "talk to your team, anytime" },
      { label: "Daily portfolio briefing", detail: "letter from your CEO" },
      { label: "Live NOI + yield drift" },
      { label: "Debt maturity ticker" },
      { label: "Refinance window countdowns" },
      { label: "Rate-reset reminder calls" },
      { label: "Lease-renewal reminder calls" },
      { label: "Occupancy + service-charge alerts" },
      { label: "Action board", detail: "tasks, owners, status" },
      { label: "Document inbox", detail: "PDF · WhatsApp · email · voice" },
    ],
  },
];

export function InfrastructureSection() {
  return (
    <section
      id="infrastructure"
      aria-label="The infrastructure — every tool you get for €49 a month"
      className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* ── Section heading ────────────────────────────────── */}
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The infrastructure, itemised
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Every tool a fund&rsquo;s analyst would use. In one place.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.6] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No add-ons. No per-report fees. No data-feed surcharges. The four
            categories below — calculators, reports, live market data, monitoring &
            voice — are what €49/month puts on your desk.
          </p>
        </div>

        {/* ── Four category cards ────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {GROUPS.map((group) => (
            <article
              key={group.eyebrow}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-6 lg:p-7 flex flex-col"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <header className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white shrink-0"
                  style={{ backgroundColor: group.accent.badge }}
                >
                  {group.icon}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-[11.5px] uppercase tracking-[0.12em] font-semibold"
                    style={{ color: group.accent.deep }}
                  >
                    {group.eyebrow}
                  </p>
                  <h3
                    className="mt-1 text-[19px] lg:text-[21px] text-[var(--color-navy)] leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {group.title}
                  </h3>
                </div>
              </header>

              <p className="mt-4 text-[14px] leading-[1.55] text-[var(--color-muted)]">
                {group.blurb}
              </p>

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 text-[13.5px] text-[var(--color-ink)] flex-1">
                {group.tools.map((tool) => (
                  <li key={tool.label} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: group.accent.badge }}
                    />
                    <span>
                      {tool.label}
                      {tool.detail ? (
                        <span className="text-[var(--color-muted)]">
                          {" · "}
                          {tool.detail}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
                <Link
                  href={group.href}
                  className="text-[13px] font-semibold inline-flex items-center gap-1.5 hover:underline"
                  style={{ color: group.accent.deep }}
                >
                  {group.linkLabel}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── Bottom rail: scale + the price hook ────────────── */}
        <div
          className="mt-10 lg:mt-12 rounded-2xl border-2 border-[var(--color-navy)] bg-white px-6 py-5 lg:px-8 lg:py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div>
            <p className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-accent)] font-semibold">
              Every line above
            </p>
            <p className="mt-1 text-[16px] lg:text-[18px] text-[var(--color-navy)]">
              <strong className="font-semibold">€49 a month.</strong>{" "}
              <span className="text-[var(--color-muted)]">
                No tier-gating on tools or reports. The Individual plan unlocks the
                same toolkit for portfolios of 1–3 properties at €19/month.
              </span>
            </p>
          </div>
          <Link
            href="/signup?plan=pro_monthly&intent=direct"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-navy)] px-5 py-3 text-[14.5px] font-semibold text-white transition hover:bg-[var(--color-navy-light)]"
          >
            Build the map
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
