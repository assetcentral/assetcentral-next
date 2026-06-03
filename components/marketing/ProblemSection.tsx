// The problem section sits between the hero and the team intro. Its job
// is to bridge the gap between "you have problems" and "you need a team".
//
// Reframed 2026-06: each problem is now (a) universal — applies to every
// private owner with 2+ properties regardless of let type or geography —
// and (b) attributed to the specialist(s) on the AC Agent Team who own
// the problem. Some problems span more than one agent (let-type =
// Finance + Market intelligence, timing = Finance forecasting +
// Operations execution) and the attribution reflects that honestly.
//
// Mapping post-reframe:
//
//   1. visibility gap         → Portfolio Personal Assistant
//                               (organising the picture comes first —
//                                before any analysis or decision the
//                                data has to be current and complete)
//   2. let-type decision      → Finance Manager + Market Analyst
//                               (Finance models the economics, Market
//                                Analyst feeds in rents / comps / STR
//                                benchmarks)
//   3. timing trap            → Finance Manager + Operations Manager
//                               (Finance handles forecasting and
//                                liquidity; Operations actively manages
//                                the events — capex, repairs, leases,
//                                short-term agreements, payments)
//   4. comparison problem     → Finance Manager (cross-portfolio
//                                analysis — which asset is performing,
//                                where the next euro of capital goes;
//                                CFO territory, not CEO synthesis)
//   5. continual change       → Your CEO (continual navigation —
//                                market moves, rate cycles, life
//                                events; the portfolio that worked
//                                last year may not work this year)
//
// Compliance language: "may" / "appears" / "after costs" / "should know"
// maintained. No "we recommend" / "guaranteed".

type Problem = {
  title: string;
  body: string;
  /** Which agent(s) on the AC Agent Team own this problem. Drives the
   *  "Handled by" footer line. May name one specialist or two when
   *  the problem genuinely spans two roles. */
  handledBy: string;
};

const problems: Problem[] = [
  {
    title: "The visibility gap",
    body:
      "You can't decide on what you can't see. Property data is scattered across statements, leases, debt papers, costs, tenant emails and operator portals. Before any analysis can happen — let alone any decision — the picture has to be current and complete. Most owners' portfolios live in their head plus a spreadsheet that's already out of date.",
    handledBy: "Portfolio Personal Assistant",
  },
  {
    title: "The let-type decision",
    body:
      "Long-let or short-let? Every property forces this choice — and most owners pick one and never look back. Short-let advertises higher gross yield. After operator commission (typically 20–30%), seasonality, voids and the constant decisions, the net often disappoints. Long-let trades upside for predictability. You should know which model wins on each property before you commit — and check it's still winning after you have.",
    handledBy: "Finance Manager + Market Analyst",
  },
  {
    title: "The timing trap",
    body:
      "Mortgage rate reverts in four months. Stage payment in six. Lease expires in eight. Capex due. Operator statements to audit. Rent collections to chase. None of these are on a calendar you check, and they don't wait. By the time you remember, the window to prepare — forecast the cashflow hit, line up liquidity, line up the next action — is already closing.",
    handledBy: "Finance Manager + Operations Manager",
  },
  {
    title: "The comparison problem",
    body:
      "You have properties in different cities, different currencies, different tax regimes — sitting in different spreadsheets. You can't compare them, so you don't. You don't know which asset is working hardest, which one to sell, or where the next euro of capital should go.",
    handledBy: "Finance Manager",
  },
  {
    title: "The constant-change problem",
    body:
      "Everything is dynamic. The market goes up, the market goes down. Rates move. Tax rules shift. Your circumstances change — kids, careers, retirement, inheritance. A portfolio that made sense last year may not make sense this year. The work isn't picking the right strategy once — it's re-deciding as the world keeps changing around you.",
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
            Five problems every private owner hits. Each one needs a specialist.
          </h2>
          <p
            className="mt-5 text-[16.5px] leading-[1.6] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A dashboard shows you numbers. A team works on the problem behind the
            numbers — and tells you what to do next.
          </p>
        </div>

        {/* Grid: 1-col on mobile, 2-col from md+. The 5th card
            (constant-change, the strategic "meta" problem owned by
            Your CEO) spans both columns so the grid resolves cleanly
            without an orphaned half-row AND so the synthesis problem
            visually anchors the bottom of the section. */}
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {problems.map((p, idx) => (
            <article
              key={p.title}
              className={`rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-8 flex flex-col ${
                idx === problems.length - 1 ? "md:col-span-2" : ""
              }`}
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
