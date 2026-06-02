import Link from "next/link";

export function FinalCta() {
  return (
    <section className="bg-[var(--color-navy)]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 py-24 lg:py-32 text-center">
        {/* Yield north-star strapline — same line that opens the hero,
            closing the loop so the visitor leaves with the same idea
            they arrived with. */}
        <p
          className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          One number. Your yield going up.
        </p>
        <h2
          className="text-[40px] lg:text-[56px] leading-[1.05] text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          You have a portfolio. Meet the team that works on it.
        </h2>
        <p
          className="mt-5 text-[17px] lg:text-[19px] leading-[1.55] text-white/75 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Add your first property in 5 minutes. See your real yield. Let Your CEO rank the actions that lift returns. Free for up to 3 properties — 7-day trial on Pro.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="plausible-event-name=signup_cta_click plausible-event-location=final inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[15.5px] font-semibold hover:bg-slate-100 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Start free — up to 3 properties
          </Link>
          <Link
            href="/signup?plan=pro_monthly"
            className="plausible-event-name=signup_cta_click plausible-event-location=final_pro inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-6 rounded-md border border-white/30 text-white text-[15.5px] font-semibold hover:bg-white/10 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Hire the team — 7-day trial
          </Link>
        </div>

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
