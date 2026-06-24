// "What do you want to check?" — persona router below the new top
// hero. Routes each visitor to the entry point that fits them:
//
//   I'm buying            → /calculators/mortgage (free check)
//   I own a property      → /calculators/irr      (free check + save)
//   I have 2-50           → Pro section anchor (#pro)
//   I advise clients      → /partners
//
// The two B2C cards (buying + owning one) sit on the left and lead
// to the free flow. The two upgrade cards (portfolio + partner) sit
// on the right and lead deeper into the existing product. Card style
// stays plain — no edge stripes — colour-coded only by left-side dot.

import Link from "next/link";

interface PersonaCard {
  /** Tiny header chip. */
  who: string;
  /** Card headline. */
  headline: string;
  /** Body — what they get next. */
  body: string;
  /** Where the card lands. */
  href: string;
  /** Link label inside the card. */
  cta: string;
  /** Dot colour — uses existing role tokens. */
  dotColor: string;
  /** True for the two free-flow cards (slightly more emphasis). */
  free?: boolean;
}

const PERSONAS: PersonaCard[] = [
  {
    who: "I'm buying a property",
    headline: "Check the deal before you make an offer.",
    body: "Free mortgage check + rental yield + AI sense-check. Verdict in 60 seconds — attractive, borderline or risky, with one red flag and one improvement.",
    href: "/calculators/mortgage",
    cta: "Run a free check",
    dotColor: "var(--color-accent)",
    free: true,
  },
  {
    who: "I own a property",
    headline: "Find out what your property is really earning.",
    body: "Free yield + cash flow check on what you already own. Save the result and compare against alternatives — refinance, renovate, hold or sell.",
    href: "/calculators/irr",
    cta: "Check what you own",
    dotColor: "var(--color-positive)",
    free: true,
  },
  {
    who: "I own 2 to 50 properties",
    headline: "Move from spreadsheets to an AI family-office layer.",
    body: "AssetCentral Pro: 5-agent AI team, IC-grade underwriting, 16-report library, voice line, live monitoring. From €49/month.",
    href: "#pro",
    cta: "See the Pro product",
    dotColor: "var(--color-cio-mid)",
  },
  {
    who: "I advise clients",
    headline: "Run institutional analysis for buyers and owners.",
    body: "Brokers, mortgage advisors, accountants, buying agents — offer AI-grade analysis under your brand. Co-branded reports, partner revenue share.",
    href: "/partners",
    cta: "See the partner program",
    dotColor: "var(--color-pa-mid)",
  },
];

export function WhatToCheckSection() {
  return (
    <section
      id="what-to-check"
      aria-label="What do you want to check on AssetCentral?"
      className="bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            START HERE
          </p>
          <h2
            className="text-[30px] lg:text-[40px] leading-[1.1] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What do you want to check?
          </h2>
          <p
            className="mt-4 text-[16px] lg:text-[17px] leading-[1.55] text-[color:var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pick the path that fits. Buyers and one-property owners start free.
            Portfolio owners and advisors get the full product.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {PERSONAS.map((p) => (
            <Link
              key={p.who}
              href={p.href}
              className="group block rounded-2xl border border-[color:var(--color-border)] bg-white p-6 lg:p-7 hover:border-[color:var(--color-navy)] hover:shadow-[0_12px_30px_-20px_rgba(15,23,42,0.25)] transition"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: p.dotColor }}
                />
                <p className="text-[11.5px] uppercase tracking-[0.1em] text-[color:var(--color-muted)] font-semibold">
                  {p.who}
                </p>
                {p.free ? (
                  <span
                    className="ml-auto text-[10px] uppercase tracking-[0.1em] font-bold rounded-full px-2 py-0.5"
                    style={{
                      backgroundColor: "rgba(22, 163, 74, 0.10)",
                      color: "var(--color-positive)",
                    }}
                  >
                    Free
                  </span>
                ) : null}
              </div>
              <h3
                className="mt-3 text-[20px] lg:text-[22px] leading-[1.2] text-[color:var(--color-navy)] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.headline}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-[color:var(--color-ink)]">
                {p.body}
              </p>
              <p className="mt-5 text-[13.5px] font-semibold text-[color:var(--color-accent)] group-hover:underline">
                {p.cta} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
