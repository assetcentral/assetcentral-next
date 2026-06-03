// The "maths" value-prop section. Anchors the page on the promise:
// you get the team for your subscription. Previously rendered as a
// long per-role hires list with strike-through costs, individual
// "Included in €49/mo" chips and a price-card with CTAs — but the
// per-role descriptions were already covered in MeetTheTeam two
// sections above (same five agents) so the breakdown read as
// repetition. Now reduced to a snappy two-card comparison: the
// strike-through total of hiring manually vs the €49 punchline.
// No CTAs in this section — PricingPreview sits directly below it
// and carries the Subscribe / Trial buttons.
//
// Compliance posture: the "€9,000+/month" total is an illustrative
// market-rate range for fractional / part-time professional roles.
// Not regulated financial advice. The footnote below the cards
// states this explicitly.

export function TeamForPriceSection() {
  return (
    // Visually demoted relative to the other homepage sections — sits
    // as a value-prop lead-in to PricingPreview rather than as a
    // hero-style stop. Lighter padding (py-12 lg:py-16 vs py-20
    // lg:py-28 elsewhere), surface-tinted background to nest it
    // visually with the PricingPreview that follows, and a smaller H2
    // so the "Five specialists. €49 a month." reads as a subhead next
    // to the actual pricing tiles below — not as a competing headline.
    <section className="bg-[var(--color-surface)]" id="team-for-price">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 lg:py-16">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The maths
          </p>
          <h2
            className="text-[26px] lg:text-[32px] leading-[1.15] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Five specialists. €49 a month.
          </h2>
          <p
            className="mt-3 text-[15px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Family offices put a team of specialists onto their property
            holdings. Private owners can&rsquo;t justify the cost. AssetCentral
            collapses the team into AI agents — same roles, same outputs, a
            fraction of the price.
          </p>
        </div>

        {/* Snappy two-card cost comparison. No agent role-by-role
            breakdown (that's already in MeetTheTeam above) — just the
            total-vs-€49 punchline. No CTAs in this section: the actual
            pricing tiles + Subscribe / Trial buttons live in
            PricingPreview directly below, so adding CTAs here would
            double up. */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4 lg:gap-5">
          {/* Manual hire — strike-through total. Visually muted so
              the eye lands on the €49 card. */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 lg:p-7">
            <div
              className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)] font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Hire the team yourself
            </div>
            <div
              className="mt-3 num text-[40px] lg:text-[48px] font-semibold leading-none text-[var(--color-muted)] line-through"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              €9,000+/month
            </div>
            <p
              className="mt-3 text-[13px] leading-[1.55] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Illustrative — fractional CFO, CIO, COO, personal assistant and
              CEO at typical market rates.
            </p>
          </div>

          {/* €49 card — the punchline. Navy filled to grab the eye
              against the demoted background. No CTAs — those live in
              PricingPreview below. */}
          <div className="rounded-2xl border-2 border-[var(--color-navy)] bg-[var(--color-navy)] text-white p-6 lg:p-7 shadow-[0_24px_60px_-25px_rgba(26,26,46,0.35)]">
            <div
              className="text-[11px] uppercase tracking-[0.14em] text-white/70 font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The AC Agent Team
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="num text-[40px] lg:text-[48px] font-semibold leading-none">
                €49
              </span>
              <span
                className="text-[15px] text-white/70"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                /month
              </span>
            </div>
            <p
              className="mt-3 text-[13px] leading-[1.55] text-white/85"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              All five agents working on your portfolio. 2 to 50 properties,
              every currency, no per-asset fees.
            </p>
          </div>
        </div>

        {/* Cautious-language footnote — kept brief, sits below the
            two cards. Replaces the previous longer disclaimer that
            lived inside the price box. */}
        <p
          className="mt-4 text-[11.5px] italic leading-[1.55] text-[var(--color-muted)] max-w-2xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Manual-hire figures are illustrative market-rate ranges for fractional
          / part-time professional roles and vary widely by geography, scope and
          experience. AssetCentral provides software and decision support — not
          financial, tax, legal or investment advice.
        </p>
      </div>
    </section>
  );
}
