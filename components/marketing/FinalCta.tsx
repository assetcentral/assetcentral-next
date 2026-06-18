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
          Hire a property family office. From €19 a month.
        </h2>
        <p
          className="mt-5 text-[17px] lg:text-[19px] leading-[1.55] text-white/75 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Five AI executives. Every property decision. Every morning briefed. Add your first property in 5 minutes — or just call your team and ask.
        </p>

        {/* CTA hierarchy on the final-cta (2026-06 family-office shift):
              Primary    "Call My Team"             — lead family-office action
              Secondary  "Subscribe now"            — direct paid conversion
            Both routes land in the signup flow, differentiated by
            `intent=` so the post-signup experience can branch (Phase 4
            voice screen for call-team, dashboard for direct). */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup?plan=pro_monthly&intent=call-team"
            className="plausible-event-name=signup_cta_click plausible-event-location=final_call_team inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[15.5px] font-semibold hover:bg-slate-100 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-pa-mid)]"
            />
            Call My Team
          </Link>
          <Link
            href="/signup?plan=pro_monthly&intent=direct"
            className="plausible-event-name=signup_cta_click plausible-event-location=final_direct inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-6 rounded-md bg-[var(--color-accent)] text-white text-[15.5px] font-semibold hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Add your first property
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
