type Problem = {
  title: string;
  body: string;
};

const problems: Problem[] = [
  {
    title: "The visibility gap",
    body:
      "You find out how much your portfolio earned when your accountant does the tax return. Once a year. In the meantime, you see what hits your bank account — which isn't the same thing as yield, return, or whether you're making good decisions.",
  },
  {
    title: "The operator black box",
    body:
      "Your STR operator charges 25% commission. Your long-term property manager charges 5%. Do you actually check their statements? Most owners don't. They see the net figure in their bank and assume it's roughly right. It often isn't.",
  },
  {
    title: "The timing trap",
    body:
      "Your fixed mortgage rate reverts in 4 months. Your off-plan stage payment is due in 6. Your lease expires in 8. None of these are on a calendar you check. Each one is a decision that requires preparation — and the window to prepare is already closing.",
  },
  {
    title: "The comparison problem",
    body:
      "You have apartments in Dubai, Athens, and Lisbon. They're in three currencies, three tax regimes, and three separate spreadsheets. You can't compare them — so you don't. You have no idea which asset is working hardest, which one to sell, or where to put the next euro of capital.",
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
            The reality of self-managing a portfolio
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Most owners don&rsquo;t know what their portfolio is actually earning.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {problems.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-8"
            >
              <h3
                className="text-[22px] lg:text-[24px] leading-[1.15] text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.title}
              </h3>
              <p
                className="text-[15px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
