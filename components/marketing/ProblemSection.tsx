// The problem section sits between the hero and the team intro. Its job
// is to bridge the gap between "you have problems" and "you need a team".
//
// Reframed 2026-06: each problem is now (a) universal — applies to every
// private owner with 2+ properties regardless of let type or geography —
// and (b) cleanly attributed to a single specialist on the AC Agent Team.
//
// Earlier version had an "STR operator black box" problem which assumed
// the owner was already running short-lets through a commissioned
// operator. That's not universal — plenty of owners are pure long-let.
// The truly universal version of that problem is the let-type decision
// itself: every owner has to choose long-let or short-let, and most
// commit to one without ever modelling the alternative.
//
// Mapping post-reframe (one specialist per problem):
//
//   visibility gap        → Finance Manager (CFO)
//   let-type decision     → Market Analyst (models the option)
//   timing trap           → Operations Manager (COO)
//   comparison problem    → Your CEO (synthesis)
//
// The Portfolio Personal Assistant doesn't own a problem here because the PA is the
// concierge — they help with all four indirectly but the "Handled by"
// attribution should name the agent who decides the outcome, not the
// one who files the paperwork.
//
// Compliance language: "may" / "appears" / "after costs" / "should know"
// maintained. No "we recommend" / "guaranteed".

type Problem = {
  title: string;
  body: string;
  /** Which agent on the AC Agent Team handles this. Drives the
   *  "Handled by" footer line — keeps copy tight to the post-2026-06
   *  positioning (lib/agent-team.ts). One specialist per problem so
   *  the attribution reads cleanly. */
  handledBy: string;
};

const problems: Problem[] = [
  {
    title: "The visibility gap",
    body:
      "You find out what your portfolio actually earned when your accountant files the return — twelve months after the fact. In the meantime, the bank balance moves and you assume the picture is roughly right. It often isn't. Net yield, after-cost return, asset-by-asset performance — most owners haven't seen these numbers in real time.",
    handledBy: "Finance Manager",
  },
  {
    title: "The let-type decision",
    body:
      "Long-let or short-let? Every property forces this choice — and most owners pick one and never look back. Short-let advertises higher gross yield. After operator commission (typically 20–30%), seasonality, voids and the constant decisions, the net often disappoints. Long-let trades upside for predictability. You should know which model wins on each property before you commit — and check it's still winning after you have.",
    handledBy: "Market Analyst",
  },
  {
    title: "The timing trap",
    body:
      "Your fixed mortgage rate reverts in four months. A stage payment is due in six. A lease expires in eight. None of these are on a calendar you check. By the time you remember, the window to prepare — refinance quotes, lender pack, rent review — is already closing.",
    handledBy: "Operations Manager",
  },
  {
    title: "The comparison problem",
    body:
      "You have properties in different cities, different currencies, different tax regimes — sitting in different spreadsheets. You can't compare them, so you don't. You don't know which asset is working hardest, which one to sell, or where the next euro of capital should go.",
    handledBy: "Your CEO",
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
