// "Your team starts work before you do." — daily briefing section.
// Closes the family-office promise: the team isn't just available
// when you call, they're already working in the background.
//
// Visual: a "letter from your team" card with a serif headline, three
// bullets (each owned by an agent acronym + accent dot), an action
// count, and a small monospaced sources strip below the card so the
// "always informed" claim is grounded.
//
// Static. The marketing version doesn't fetch a real briefing — that's
// the in-app TodaysBriefingPanel (Phase 2). This section's job is to
// pre-position the experience.

interface BriefingBullet {
  agentAcronym: "CIO" | "CFO" | "CEO" | "COO" | "PA";
  text: string;
  /** Dot colour matches the role-accent palette. */
  dotClass: string;
}

const EXAMPLE_BULLETS: ReadonlyArray<BriefingBullet> = [
  {
    agentAcronym: "COO",
    text: "One lease expires in 94 days.",
    dotClass: "bg-[color:var(--color-coo-mid)]",
  },
  {
    agentAcronym: "CIO",
    text:
      "Dubai Marina appears under-rented vs comparable units in the building.",
    dotClass: "bg-[color:var(--color-cio-mid)]",
  },
  {
    agentAcronym: "CIO",
    text: "A new launch in JVC may fit your strategy.",
    dotClass: "bg-[color:var(--color-cio-mid)]",
  },
];

const SOURCES_REVIEWED: ReadonlyArray<string> = [
  "market news",
  "property transactions",
  "rental transactions",
  "interest rates",
  "FX",
  "mortgage products",
  "portfolio events",
];

export function DailyBriefingSection() {
  return (
    <section
      id="daily-briefing"
      aria-label="Your team starts work before you do"
      className="bg-[color:var(--color-surface)] py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Every morning
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-[44px] font-semibold text-[color:var(--color-navy)] leading-[1.1] tracking-tight">
            Your team starts work before you do.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[color:var(--color-muted)] leading-relaxed">
            Every morning, your team reviews the markets that matter to you, your portfolio events, the news, the rates, and any leases on the horizon. You get a briefing. They&rsquo;ve already prepared the actions for you to consider.
          </p>
        </div>

        {/* Briefing card — "letter from your team" treatment. Soft
            cream-tinted background, serif headline, agent-attributed
            bullets, action count, dual CTA. */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <article className="rounded-2xl bg-white border border-[color:var(--color-border)] shadow-sm p-6 md:p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-muted)] font-semibold">
                Daily briefing
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold text-[color:var(--color-navy)] leading-tight">
                Good morning, James.
              </h3>

              <ul className="mt-6 space-y-4">
                {EXAMPLE_BULLETS.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 items-start text-[15px] md:text-base text-[color:var(--color-ink)] leading-relaxed"
                  >
                    <span
                      className={`mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0 ${b.dotClass}`}
                      aria-hidden
                    />
                    <span className="flex-1">{b.text}</span>
                    <span className="text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-muted)] font-bold shrink-0 mt-1">
                      — {b.agentAcronym}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 pt-5 border-t border-[color:var(--color-border)] text-sm text-[color:var(--color-ink)]">
                <strong className="font-semibold">Three actions recommended today.</strong>{" "}
                <span className="text-[color:var(--color-muted)]">Reviewed: 47 market signals · 12 portfolio events.</span>
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href="/signup?plan=pro_monthly&intent=call-team"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-navy)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
                >
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-pa-mid)]"
                  />
                  Review with the CEO
                </a>
                <a
                  href="/signup?plan=pro_monthly&intent=direct"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[color:var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--color-navy)] transition hover:bg-[color:var(--color-surface)]"
                >
                  Open dashboard
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          </div>

          {/* Right column — explainer + sources reviewed strip. Reads as
              "here's what the team is monitoring on your behalf." */}
          <div className="lg:col-span-5 lg:pt-2">
            <p className="text-base text-[color:var(--color-muted)] leading-relaxed">
              You don&rsquo;t need to check the dashboard to know what changed. Your team prepares the briefing while you sleep, attributes every observation to the agent who owns it, and queues actions ready for your sign-off.
            </p>

            <p
              className="mt-8 text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted)] font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sources reviewed
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOURCES_REVIEWED.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center rounded-md bg-white border border-[color:var(--color-border)] px-2.5 py-1 text-[12px] text-[color:var(--color-ink)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
