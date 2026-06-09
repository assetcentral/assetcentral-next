import Link from "next/link";

export function FinalCta() {
  return (
    <section className="bg-[var(--color-navy)]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 py-24 lg:py-32 text-center">
        {/* Same strapline as the hero — closes the loop so the visitor
            leaves with the same idea they arrived with. Yield is the
            north star both inside the app (see lib/ai/system-prompt.ts)
            and on the marketing site post the 2026-06 reposition. */}
        <p
          className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Model. Monitor. Manage.
        </p>
        <h2
          className="text-[40px] lg:text-[56px] leading-[1.05] text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          You have a portfolio. Let the team find the yield.
        </h2>
        <p
          className="mt-5 text-[17px] lg:text-[19px] leading-[1.55] text-white/75 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Add your first property in 5 minutes. See your real yield. Let your CEO rank the actions that could improve returns. From €19/month — 7-day trial on every tier.
        </p>

        {/* CTA hierarchy on the final-cta (2026-06 pricing change):
              Primary    "Start 7-day trial"        — no-card entry path
              Primary    "Subscribe now"            — direct paid conversion
              Tertiary   currency line              — quiet text below

            Free signup retired alongside the Free tier. The trial is
            now the no-card-required entry; "Subscribe now" remains the
            high-intent path that goes straight to Stripe Checkout. */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup?plan=individual_monthly"
            className="plausible-event-name=signup_cta_click plausible-event-location=final inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[15.5px] font-semibold hover:bg-slate-100 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Start 7-day free trial
          </Link>
          <Link
            href="/signup?plan=pro_monthly&intent=direct"
            className="plausible-event-name=signup_cta_click plausible-event-location=final_direct inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-6 rounded-md bg-[var(--color-accent)] text-white text-[15.5px] font-semibold hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Subscribe now
          </Link>
        </div>
        <p
          className="mt-4 text-center text-[12.5px] text-white/55"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          No credit card to start. Cancel any time.
        </p>

        <ul
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-white/65"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <li>🔒 Bank-level encryption</li>
          <li>🇪🇺 GDPR compliant</li>
          <li>💳 No card required</li>
          <li>🚫 No ads, ever</li>
        </ul>
      </div>
    </section>
  );
}
