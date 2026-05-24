import Link from "next/link";

// Audience-targeting band for the British-investor-in-Dubai cohort.
//
// Built for the May 2026 Google Ads campaign (UK + Dubai geos)
// targeting "British investors who own or are considering Dubai
// property". Sits directly below the hero so paid traffic gets
// message-match within the first scroll instead of a generic landing.
//
// Why it lives as its own component rather than a tweak to HeroSection:
//   • Keeps the hero copy applicable to other audiences (Greece, Saudi,
//     Portugal investors all hit the same homepage).
//   • Lets us easily add more audience-specific bands later (e.g.
//     UK + Greece, Saudi + UK) without competing with the hero.
//   • The "two flags" framing is more impactful as a standalone band
//     than buried in the hero.
//
// The two CTAs differ deliberately:
//   • Primary: Start free trial — for users ready to sign up
//   • Secondary: Off-plan calculator — the strongest free tool for
//     this cohort. Drives them deeper into the funnel even if not
//     ready to sign up yet.

export function UkDubaiBand() {
  return (
    <section
      className="bg-white border-b border-[var(--color-border)]"
      aria-label="For British investors with Dubai property"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 items-center">
          {/* Left — headline + flag badge */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3 font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span aria-hidden className="text-base">🇬🇧 🇦🇪</span>
              For UK investors with Dubai property
            </div>
            <h2
              className="text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              One workspace for your UK and Dubai properties.
            </h2>
            <p
              className="mt-4 text-[15px] lg:text-[16px] leading-[1.55] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Most landlords with cross-border property end up in a spreadsheet
              graveyard — one tab for UK BTL, one for AED off-plan, one for FX,
              and a folder of PDFs they can&rsquo;t find. AssetCentral holds the
              whole portfolio in one place.
            </p>
          </div>

          {/* Right — three concrete value props in a single column */}
          <div className="space-y-3">
            <BandPoint
              icon="🏠"
              title="UK BTL"
              body="Rent due dates, tenancy expiry alerts, HMRC-ready document vault, mortgage rate moves — modelled in GBP."
            />
            <BandPoint
              icon="🌅"
              title="Dubai off-plan + operational"
              body="Stage-payment tracking, handover countdown, assign-vs-hold rolling-return model with live DLD comps — modelled in AED."
            />
            <BandPoint
              icon="💱"
              title="Both, side-by-side"
              body="GBP + AED cashflow in one calendar. FX-aware totals. No more spreadsheet hopping at 9pm on a Sunday."
            />
            <div className="pt-3 flex flex-wrap gap-3">
              <Link
                href="/signup?utm_source=hp_band&utm_medium=cta&utm_campaign=uk_dubai"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-[var(--color-navy)] text-white text-[14px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Start free — 14 days
              </Link>
              <Link
                href="/calculators/off-plan"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14px] font-semibold hover:border-[var(--color-navy)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Try the Dubai off-plan calculator →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Single value-prop row in the band. Icon + title + one-line body. */
function BandPoint({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className="flex items-start gap-3"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <span aria-hidden className="text-[20px] leading-none mt-0.5 shrink-0">
        {icon}
      </span>
      <div>
        <span className="block text-[14px] font-semibold text-[var(--color-navy)]">
          {title}
        </span>
        <span className="block text-[13.5px] text-[var(--color-muted)] leading-[1.5] mt-0.5">
          {body}
        </span>
      </div>
    </div>
  );
}
