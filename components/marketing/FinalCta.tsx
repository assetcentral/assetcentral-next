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
          DON&rsquo;T BUY BLIND
        </p>
        <h2
          className="text-[40px] lg:text-[56px] leading-[1.05] text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Run it by AssetCentral before you make an offer.
        </h2>
        <p
          className="mt-5 text-[17px] lg:text-[19px] leading-[1.55] text-white/75 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Free AI check on any property — mortgage, yield, cash flow, red flags. Then Pro for the rest of the decision: portfolio monitoring, lender packs, the 5-agent AI team. From €49/month.
        </p>

        {/* CTA hierarchy on the final-cta (2026-06 B2C reposition):
              Primary    "Check a property for free"   — top-of-funnel
              Secondary  "Start a Pro trial"           — Pro conversion */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/calculators/mortgage"
            className="plausible-event-name=free_check_cta_click plausible-event-location=final_check inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[15.5px] font-semibold hover:bg-slate-100 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Check a property for free
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/signup?plan=pro_monthly&intent=direct"
            className="plausible-event-name=signup_cta_click plausible-event-location=final_direct inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-6 rounded-md bg-[var(--color-accent)] text-white text-[15.5px] font-semibold hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Start a 7-day Pro trial
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
