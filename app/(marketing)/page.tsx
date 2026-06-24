import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorsCta } from "@/components/marketing/CalculatorsCta";
import { DontBuyBlindHero } from "@/components/marketing/DontBuyBlindHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { FreeAIResultSection } from "@/components/marketing/FreeAIResultSection";
import { FreeVsProSection } from "@/components/marketing/FreeVsProSection";
import { GetDataInSection } from "@/components/marketing/GetDataInSection";
import { GetStartedSection } from "@/components/marketing/GetStartedSection";
import { InfrastructureSection } from "@/components/marketing/InfrastructureSection";
import { LeadCapture } from "@/components/marketing/LeadCapture";
import { MeetTheTeamSection } from "@/components/marketing/MeetTheTeamSection";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { StickyCta } from "@/components/marketing/StickyCta";
import { WhatToCheckSection } from "@/components/marketing/WhatToCheckSection";
// HeroSection / ThreePillarsSection / ProblemSection / LeadMagnetsSection
// retired in the 2026-06 team-as-hero simplification.
// ProductDemoTabs retired in the family-office capabilities reframe.
// Components stay in the repo for possible reuse — just no longer
// imported from the homepage.

export const metadata: Metadata = {
  // 2026-06 family-office positioning shift. Title leads with the
  // family-office framing; description names the team + briefing +
  // segment + price hook.
  title: { absolute: "Don't Buy Blind — Free AI Property Check | AssetCentral" },
  // Target: 140–160 chars.
  description:
    "Before you buy, run the numbers. Free AI property check on any deal — mortgage, yield, cash flow, red flags. Pro for owners of 2 to 50 properties. €49/month.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AssetCentral",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "19", priceCurrency: "EUR" },
  description:
    "AI Property Family Office for owners with 2–50 properties. Five AI executives — Chief Investment Officer, Chief Financial Officer, Chief Executive Officer, Chief Operations Officer and Personal Assistant — work continuously across Model, Monitor and Manage. Daily briefings, on-call advice, recommended actions.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Homepage flow (2026-06 AI Property Family Office reposition,
          Phase 1):
            MeetTheTeamSection      — the team hero. H1 now reads
                                      "Your AI Property Family Office."
                                      Dual CTA: Call My Team + Add
                                      your first property.
            CallYourTeamSection     — NEW. Boardroom + example transcript.
                                      Pre-positions the conversational
                                      experience before the underlying
                                      voice screen ships in Phase 4.
            DailyBriefingSection    — NEW. "Letter from your team"
                                      briefing card + sources strip.
                                      Pre-positions the in-app
                                      TodaysBriefingPanel that lands
                                      in Phase 2.
            GetDataInSection        — five-channel ingestion strip.
            WhatAIUnlocksSection    — six family-office capabilities.
            CalculatorsCta          — free calculators teaser.
            PricingPreview          — Individual / Pro / Team tiers.
            LeadCapture             — email capture.
            FinalCta                — close. Call My Team is now the
                                      lead conversion action.
            StickyCta               — mobile-only conversion pill,
                                      defaults to Call My Team. */}
      {/* ── B2C funnel (top of page) ─────────────────────────────
           2026-06 repositioning. The homepage now opens with a
           consumer-friendly "Don't Buy Blind" hero, routes by
           persona, shows what the free AI check returns, then
           compares free vs Pro before transitioning into the
           existing Pro positioning. The Pro funnel is preserved
           intact below the #pro anchor for the 2-50 property
           owner cohort. */}
      <DontBuyBlindHero />
      <WhatToCheckSection />
      <FreeAIResultSection />
      <FreeVsProSection />

      {/* ── Pro positioning (preserved below the #pro anchor) ──── */}
      <ProTransitionBand />
      <div id="pro" />
      <MeetTheTeamSection />
      <InfrastructureSection />
      <GetStartedSection />
      <div id="how-it-works" />
      <GetDataInSection />
      <CalculatorsCta />
      <PricingPreview />
      <LeadCapture />
      <FinalCta />
      <StickyCta />
    </>
  );
}

/** Small transition band that signals the page shifts from the
 *  B2C free-flow story to the Pro positioning below. Saves a full
 *  component file for a 30-line strip. */
function ProTransitionBand() {
  return (
    <section
      aria-label="Switching to the Pro product for owners of 2 to 50 properties"
      className="bg-[color:var(--color-navy)] text-white py-14 lg:py-16"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <p
          className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)] font-semibold mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          OWN 2 TO 50 PROPERTIES?
        </p>
        <h2
          className="text-[30px] lg:text-[42px] leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Move from spreadsheets to an AI family-office layer.
        </h2>
        <p
          className="mt-4 text-[16px] lg:text-[18px] leading-[1.55] text-white/75 max-w-2xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          AssetCentral Pro is the rest of the product — built for portfolio
          owners who&rsquo;ve outgrown the spreadsheet. Five AI agents, live
          monitoring, lender-ready packs, voice line. From €49/month.
        </p>
        <div
          className="mt-7 flex flex-col sm:flex-row gap-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link
            href="/signup?plan=pro_monthly&intent=direct"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-white text-[color:var(--color-navy)] text-[14.5px] font-semibold transition hover:bg-white/90"
          >
            Start a 7-day Pro trial
          </Link>
          <Link
            href="#pro"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-white/25 text-white text-[14.5px] font-semibold transition hover:bg-white/5"
          >
            See the full Pro product →
          </Link>
        </div>
      </div>
    </section>
  );
}
