// The problem section sits between the hero and the team intro. Its job
// is to bridge the gap between "you have problems" and "you need a team".
// Each problem here is named after a real pain a private owner hits, and
// tagged with the specialist on the AC Agent Team who handles it. The
// mapping reads:
//
//   visibility gap          → Finance Manager (CFO)
//   operator black box      → Operations Manager (COO)
//   timing trap             → Operations Manager (COO) + Finance Manager
//                              depending on event — we attribute it to
//                              Operations because it's about *missed
//                              calendar events*, which is the ops feed
//   comparison problem      → Your CEO + Finance Manager (synthesis)
//
// The pattern: each card ends with "→ Handled by [Agent]" so the visitor
// arrives at the team section already primed that "team" means specific
// roles solving specific problems, not vague AI hand-waving.
//
// Compliance language: "may" / "appears" / "decision support" maintained.
// No "we recommend" or "guaranteed".

type Problem = {
  title: string;
  body: string;
  /** Which agent on the AC Agent Team handles this. Drives the
   *  "Handled by" footer line — keeps copy tight to the post-2026-06
   *  positioning (lib/agent-team.ts). */
  handledBy: string;
};

const problems: Problem[] = [
  {
    title: "The visibility gap",
    body:
      "You find out how much your portfolio earned when your accountant does the tax return. Once a year. In the meantime, you see what hits your bank account — which isn't the same thing as yield, return, or whether you're making good decisions.",
    handledBy: "Finance Manager (CFO)",
  },
  {
    title: "The operator black box",
    body:
      "Your STR operator charges 25% commission. Your long-term property manager charges 5%. Do you actually check their statements? Most owners don't. They see the net figure in their bank and assume it's roughly right. It often isn't.",
    handledBy: "Operations Manager (COO)",
  },
  {
    title: "The timing trap",
    body:
      "Your fixed mortgage rate reverts in 4 months. Your off-plan stage payment is due in 6. Your lease expires in 8. None of these are on a calendar you check. Each one is a decision that requires preparation — and the window to prepare is already closing.",
    handledBy: "Operations Manager (COO)",
  },
  {
    title: "The comparison problem",
    body:
      "You have apartments in Dubai, Athens, and Lisbon. They're in three currencies, three tax regimes, and three separate spreadsheets. You can't compare them — so you don't. You have no idea which asset is working hardest, which one to sell, or where to put the next euro of capital.",
    handledBy: "Your CEO + Market Analyst",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Why a team, not a dashboard
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Four problems every private owner hits. Each one needs a specialist.
          </h2>
          <p
            className="mt-5 text-[16.5px] leading-[1.6] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A dashboard shows you numbers. A team works on the problem behind the
            numbers — and tells you what to do next.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {problems.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-8 flex flex-col"
            >
              <h3
                className="text-[22px] lg:text-[24px] leading-[1.15] text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.title}
              </h3>
              <p
                className="text-[15px] leading-[1.6] text-[var(--color-ink)] flex-1"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {p.body}
              </p>
              {/* Specialist attribution — visually quiet (border-top + small
                  text) so the problem statement stays primary, but unmissable.
                  This is the bridge into the next section. */}
              <div
                className="mt-5 pt-4 border-t border-[var(--color-border)] text-[12.5px] text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span className="text-[var(--color-muted)]">Handled by </span>
                <span className="font-semibold text-[var(--color-navy)]">
                  {p.handledBy}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
