import Link from "next/link";

// Three-card section right under the homepage hero, naming the three
// pillars (Model / Monitor / Manage) and what each one does.
//
// Why this section exists:
//   • The hero promises "portfolio intelligence" — vague on its own.
//     The three cards make it concrete by naming the three jobs the
//     product does and the order they happen in.
//   • Visitors map their own portfolio workflow onto the framework
//     ("I've modelled mine in a spreadsheet, but I never monitor it,
//     and I don't really manage scenarios"). The framework gives them
//     a vocabulary to describe their gap and a tier to fill it.
//   • Each card cross-links to the dedicated /model, /monitor,
//     /manage landing page so visitors who lead with one pillar
//     (refinancing brokers care most about Manage; new-portfolio
//     investors care most about Model) can deep-dive without
//     scrolling the whole homepage.

const PILLARS = [
  {
    num: "01",
    name: "Model",
    href: "/model",
    headline: "Every property, on paper, in 10 minutes.",
    body:
      "Upload a tenancy contract, paste a rent receipt, or just tell AC Voice the address. The model builds itself — rent, mortgage, costs, ownership, market position. The agents validate as you go.",
    features: [
      "Voice / email / WhatsApp / spreadsheet ingestion",
      "Mortgage products and rate benchmarks",
      "Yield, IRR, and market comparables baked in",
    ],
  },
  {
    num: "02",
    name: "Monitor",
    href: "/monitor",
    headline: "Catch the drift before it costs you.",
    body:
      "Live yield. Cashflow vs. budget. Service-charge spikes. Void days mounting. Refinance windows opening. Every property, every month — without you opening a spreadsheet.",
    features: [
      "Per-property Health Score and live alerts",
      "Portfolio cashflow vs. forecast",
      "Document inbox that parses statements as they arrive",
    ],
  },
  {
    num: "03",
    name: "Manage",
    href: "/manage",
    headline: "Make the call the agents would make.",
    body:
      "Sell or hold? Refinance or wait? Switch to short-term let? AssetCentral runs the scenarios, ranks the recommendations, and writes the report you can hand to a lender, tenant, or accountant.",
    features: [
      "Sell/hold, refinance, and short-term scenarios",
      "Board report, refinancing pack, investor pitch",
      "Word + PDF export, share with anyone",
    ],
  },
] as const;

export function ThreePillarsSection() {
  return (
    <section className="bg-white border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <p
          className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          How AssetCentral works
        </p>
        <h2
          className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)] max-w-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Three pillars. Five agents. One portfolio.
        </h2>
        <p
          className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-2xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          The same three jobs every serious portfolio runs through —
          built for owners with 2 to 50 properties, not 2,000. The five
          AI agents execute across all three.
        </p>

        <div className="mt-12 grid lg:grid-cols-3 gap-5 lg:gap-6">
          {PILLARS.map((p) => (
            <article
              key={p.name}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-8 flex flex-col"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="text-[12px] font-medium text-[var(--color-accent)] tracking-wider"
                  style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
                >
                  {p.num}
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  Pillar {p.num}
                </span>
              </div>
              <h3
                className="mt-3 text-[26px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.name}.
              </h3>
              <p
                className="mt-2 text-[18px] lg:text-[19px] leading-[1.35] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.headline}
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.65] text-[var(--color-muted)]">
                {p.body}
              </p>

              <ul className="mt-5 space-y-2 text-[13.5px] text-[var(--color-ink)]">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 leading-[1.5]">
                    <span
                      aria-hidden
                      className="text-[var(--color-accent)] shrink-0 mt-[2px]"
                    >
                      ›
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
                <Link
                  href={p.href}
                  className="inline-flex items-center text-[13.5px] font-medium text-[var(--color-accent)] hover:text-[var(--color-navy)] transition-colors"
                >
                  How {p.name} works →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
