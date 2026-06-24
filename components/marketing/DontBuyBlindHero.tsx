// Top-of-funnel B2C hero — "Run the numbers first."
//
// 2026-06 repositioning (Phase 2). AssetCentral.ai is repositioned as
// the default place people go BEFORE making any property decision —
// buy, sell, mortgage, refinance, renovate, rent out. The hero leads
// with the behavioural ask ("run the numbers first") and the eyebrow
// keeps the "Don't buy blind" brand line.
//
// Component name kept as DontBuyBlindHero for import-history reasons.

import Link from "next/link";

export function DontBuyBlindHero() {
  return (
    <section
      id="run-the-numbers"
      aria-label="Run the numbers first — AssetCentral"
      className="bg-white pt-16 lg:pt-24 pb-12 lg:pb-16"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <p
          className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)] font-semibold mb-5"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          DON&rsquo;T BUY BLIND
        </p>

        <h1
          className="text-[44px] md:text-[58px] lg:text-[68px] leading-[1.02] tracking-tight text-[color:var(--color-navy)] font-semibold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Run the numbers{" "}
          <span className="text-[color:var(--color-accent)] italic">first.</span>
        </h1>

        <p
          className="mt-6 text-[18px] lg:text-[22px] leading-[1.5] text-[color:var(--color-ink)] max-w-3xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Before you buy, sell, mortgage, refinance, renovate or rent out a
          property, AssetCentral helps you check whether the numbers actually
          make sense.
        </p>

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
            href="#example-analysis"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] px-6 py-3.5 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] text-[15.5px] font-semibold transition hover:border-[color:var(--color-navy)]"
          >
            See example analysis
          </Link>
        </div>

        <p
          className="mt-4 text-[13px] text-[color:var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Free AI property checks. Upgrade only when you need deeper analysis.
        </p>
      </div>
    </section>
  );
}
