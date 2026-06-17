// "What your AI team unlocks" — family-office-grade capabilities, at
// investor pricing. Replaces the prior 4-step ProductDemoTabs that
// read as a generic feature walkthrough; the new section reframes the
// product as a list of things that, until now, were a family-office
// privilege: pulling data from dozens of sources, modelling like a
// senior analyst, surfacing trends and anomalies a spreadsheet misses,
// publishing board-grade reports, and putting the whole household on
// the same page.
//
// Each card carries a role accent on the icon badge so the reader maps
// the capability to the agent that owns it without us having to spell
// it out — Personal Assistant pink for data ingestion, CIO purple for
// models, CFO blue for trend detection, COO teal for anomalies, CEO
// navy for board reports, PA pink again for multi-user sharing
// (because the PA also runs the inbox / access list).
//
// Compliance: language stays neutral ("until now this was…", "things
// you'd miss"); no "guaranteed yield uplift" claims, no "10x your
// returns" puffery.

interface Capability {
  accent: "pa" | "cio" | "cfo" | "coo" | "ceo";
  /** Short label rendered above the headline as a category tag. */
  tag: string;
  /** Card headline — what you can now do. */
  headline: string;
  /** One-sentence "before vs after" framing — what changed because of
   *  the AI team. */
  blurb: string;
  /** Small concrete proof-points listed below the blurb. Three or
   *  four short bullets — visible at a glance, easy to skim. */
  bullets: string[];
  icon: React.ReactNode;
}

const CAPABILITIES: ReadonlyArray<Capability> = [
  {
    accent: "pa",
    tag: "Data in, automatically",
    headline: "Pulls your data from everywhere",
    blurb:
      "Your statements, tenancies, mortgage docs and registry records arrive in your portfolio without you re-keying anything.",
    bullets: [
      "Bank, registry, operator + broker connectors",
      "Voice, WhatsApp, email and file upload",
      "AI files each document to the right property",
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 11-9-9c2.4 0 4.5.9 6.1 2.5" />
        <polyline points="21 4 21 10 15 10" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    accent: "cio",
    tag: "Senior-analyst models",
    headline: "Modelling that used to take a family office",
    blurb:
      "IRR, ownership structure, retrofit ROI, refinance shock-test — pre-built and tuned for owners with 2 to 50 properties, not 2,000.",
    bullets: [
      "Country-aware tax and mortgage rules",
      "Long-let vs short-let vs operator-led IRR",
      "Refinance window simulation against rate moves",
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    accent: "cfo",
    tag: "Trend detection",
    headline: "Trends a spreadsheet won't surface",
    blurb:
      "Year-on-year drift, seasonality, fee creep — patterns you'd never catch reading rows of numbers month by month.",
    bullets: [
      "YoY net yield, asset-by-asset",
      "Opex and service-charge creep",
      "Occupancy and arrears seasonality",
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h3l3-7 4 14 3-7h5" />
      </svg>
    ),
  },
  {
    accent: "coo",
    tag: "Anomalies caught early",
    headline: "Catches what you'd otherwise miss",
    blurb:
      "An operator overcharge, an unpaid rent, a tenancy quietly drifting onto a worse rate — flagged the week it happens.",
    bullets: [
      "Operator fee + statement reconciliation",
      "Rent vs market benchmark per property",
      "Lease, mortgage and certificate expiry alerts",
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    accent: "ceo",
    tag: "Board-grade reports",
    headline: "Reports a family office would send",
    blurb:
      "Lender packs, IC memos, decision board reports — PDF and Word, on your letterhead. Beyond what Excel produces.",
    bullets: [
      "Portfolio summary, refinancing pack, IC memo",
      "Per-asset board report with full audit trail",
      "PDF + Word export, ready to send",
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
        <line x1="8" y1="9" x2="10" y2="9" />
      </svg>
    ),
  },
  {
    accent: "pa",
    tag: "Whole household on one page",
    headline: "Your spouse, accountant, lawyer — same view",
    blurb:
      "Share the portfolio with the people who matter, give each the right level of access, and stop emailing spreadsheet attachments around.",
    bullets: [
      "Multi-user shared portfolios",
      "Role-based access (owner / admin / viewer)",
      "Activity log so you can see who changed what",
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

/** Maps accent key → mid + tint Tailwind classes that hit the
 *  @theme-defined CSS variables in globals.css. Kept compact so the
 *  card renderer reads cleanly. */
function accentClasses(accent: Capability["accent"]): { bg: string; fg: string } {
  switch (accent) {
    case "pa":
      return { bg: "bg-[color:var(--color-pa-tint)]", fg: "text-[color:var(--color-pa-mid)]" };
    case "cio":
      return { bg: "bg-[color:var(--color-cio-tint)]", fg: "text-[color:var(--color-cio-mid)]" };
    case "cfo":
      return { bg: "bg-[color:var(--color-cfo-tint)]", fg: "text-[color:var(--color-cfo-mid)]" };
    case "coo":
      return { bg: "bg-[color:var(--color-coo-tint)]", fg: "text-[color:var(--color-coo-mid)]" };
    case "ceo":
      return { bg: "bg-[color:var(--color-ceo-tint)]", fg: "text-[color:var(--color-ceo-mid)]" };
  }
}

export function WhatAIUnlocksSection() {
  return (
    <section
      id="how-it-works"
      aria-label="What your AI team unlocks"
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What changes
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-[44px] font-semibold text-[color:var(--color-navy)] leading-[1.1] tracking-tight">
            What your AI team unlocks.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[color:var(--color-muted)] leading-relaxed">
            Until now, modelling like a senior analyst, pulling data from a dozen sources, and spotting drift you&apos;d miss took a family-office team you couldn&apos;t afford. AssetCentral ships it with your subscription.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {CAPABILITIES.map((c, i) => {
            const a = accentClasses(c.accent);
            return (
              <li
                key={i}
                className="bg-white border border-[color:var(--color-border)] rounded-xl p-5 md:p-6"
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${a.bg} ${a.fg} mb-4`}
                  aria-hidden
                >
                  {c.icon}
                </div>
                <p className="text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-muted)] font-semibold">
                  {c.tag}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg md:text-xl font-semibold text-[color:var(--color-navy)] leading-snug">
                  {c.headline}
                </h3>
                <p className="mt-2 text-sm md:text-[15px] text-[color:var(--color-muted)] leading-relaxed">
                  {c.blurb}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {c.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-[13px] text-[color:var(--color-ink)] leading-snug"
                    >
                      <span
                        className={`mt-1.5 inline-block h-1 w-1 rounded-full shrink-0 ${a.fg.replace("text-", "bg-")}`}
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-sm text-[color:var(--color-muted)] max-w-2xl leading-relaxed">
          Decision support, not autopilot. Every claim in your account links back to the underlying data — you stay in control of every action.
        </p>
      </div>
    </section>
  );
}
