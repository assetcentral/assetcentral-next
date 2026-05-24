import Link from "next/link";
import { DashboardMockup } from "./DashboardMockup";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle background tint that fades to white */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 80% -10%, rgba(79,110,247,0.08), rgba(255,255,255,0) 60%), linear-gradient(180deg, #ffffff 0%, var(--color-surface) 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* copy */}
          <div>
            <h1
              className="text-[44px] leading-[1.05] sm:text-[56px] lg:text-[64px] lg:leading-[1.02] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Real Estate PA. Finally.
            </h1>

            <p
              className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              AssetCentral manages your property portfolio the way a professional asset manager would — but it works for you, not a fund. Built for private landlords with 2 to 50 properties — from a second home to a multi-country portfolio.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="plausible-event-name=signup_cta_click plausible-event-location=hero inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Start free — 14 days
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                See how it works
              </Link>
            </div>

            <p
              className="mt-4 text-[13px] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              No credit card required · Cancel anytime · Free calculators always free
            </p>
          </div>

          {/* mockup */}
          <div className="relative lg:pl-4">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Social-proof strip — flag order tuned for the May 2026 ad
          campaign: 🇬🇧 + 🇦🇪 lead because the UK Google Ads campaign
          targets British investors who own or are buying Dubai
          property. The testimonial below also speaks for that
          cross-border cohort. */}
      <div className="border-y border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-col lg:flex-row gap-4 lg:gap-10 items-start lg:items-center justify-between">
          <p
            className="text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Used by landlords in <span aria-hidden>🇬🇧</span> UK ·{" "}
            <span aria-hidden>🇦🇪</span> UAE · <span aria-hidden>🇸🇦</span> Saudi ·{" "}
            <span aria-hidden>🇴🇲</span> Oman · <span aria-hidden>🇬🇷</span> Greece ·{" "}
            <span aria-hidden>🇵🇹</span> Portugal · <span aria-hidden>🇫🇷</span> France
          </p>
          <blockquote
            className="text-[14px] text-[var(--color-ink)] lg:text-right max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span className="italic">
              &ldquo;I&rsquo;ve got a flat in Manchester, a BTL in Reading and two off-plan
              in Dubai Marina. Three currencies, three sets of rules. AssetCentral
              is the first thing that actually held all of it in one place.&rdquo;
            </span>
            <span className="block text-[12px] text-[var(--color-muted)] mt-1 not-italic">
              Private landlord · UK &amp; Dubai
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
