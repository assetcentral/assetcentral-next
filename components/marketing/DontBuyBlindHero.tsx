// "Don't buy blind" — the new B2C top-of-funnel hero.
//
// 2026-06 repositioning: the homepage now speaks first to the person
// thinking about buying / refinancing / renovating ONE property, not
// only to portfolio owners. The Pro positioning (5-agent team, IC-grade
// underwriting, etc.) moves further down the page and remains intact
// for the 2-50 property owner cohort.
//
// Primary CTA points at /calculators/mortgage — that's the current
// best entry point to the free flow until the dedicated /check
// experience ships. Secondary CTA scrolls to the persona router so
// non-buyers can find their path.

import Link from "next/link";

export function DontBuyBlindHero() {
  return (
    <section
      id="dont-buy-blind"
      aria-label="Before you buy, run the numbers — AssetCentral"
      className="bg-white pt-16 lg:pt-24 pb-12 lg:pb-16"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* ── Eyebrow ─────────────────────────────────────────── */}
        <p
          className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)] font-semibold mb-5"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          DON&rsquo;T BUY BLIND
        </p>

        {/* ── H1 ───────────────────────────────────────────────
             Display-serif headline. Two-line break tuned so the
             second line ("run the numbers.") sits in accent blue and
             reads as the call to action. */}
        <h1
          className="text-[44px] md:text-[58px] lg:text-[68px] leading-[1.02] tracking-tight text-[color:var(--color-navy)] font-semibold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Before you buy,{" "}
          <span className="text-[color:var(--color-accent)] italic">
            run the numbers.
          </span>
        </h1>

        {/* ── Subhead — plain English, no jargon ─────────────── */}
        <p
          className="mt-6 text-[18px] lg:text-[22px] leading-[1.5] text-[color:var(--color-ink)] max-w-3xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          AssetCentral helps property buyers and owners check whether a property
          makes financial sense — before they commit. Free AI property check.
          No card. No spam.
        </p>

        {/* ── CTAs ────────────────────────────────────────────
             Primary lands on the mortgage calculator which is the
             biggest current ad-funnel entry; secondary scrolls down
             to the persona router. */}
        <div
          className="mt-9 flex flex-col sm:flex-row gap-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link
            href="/check"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] px-6 py-3.5 rounded-md bg-[color:var(--color-navy)] text-white text-[15.5px] font-semibold shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
          >
            Check a property for free
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="#what-to-check"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] px-6 py-3.5 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] text-[15.5px] font-semibold transition hover:border-[color:var(--color-navy)]"
          >
            See how it works
          </Link>
        </div>

        {/* ── Reassurance line ────────────────────────────────── */}
        <p
          className="mt-4 text-[13px] text-[color:var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Free AI check covers monthly mortgage payment, rental yield, cash
          flow, one red flag and one improvement suggestion. Takes 60 seconds.
        </p>
      </div>
    </section>
  );
}
