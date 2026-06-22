import type { Metadata } from "next";
import { CalculatorsCta } from "@/components/marketing/CalculatorsCta";
import { CallMeBackForm } from "@/components/marketing/CallMeBackForm";
import { CallYourTeamSection } from "@/components/marketing/CallYourTeamSection";
import { DailyBriefingSection } from "@/components/marketing/DailyBriefingSection";
import { FinalCta } from "@/components/marketing/FinalCta";
import { GetDataInSection } from "@/components/marketing/GetDataInSection";
import { LeadCapture } from "@/components/marketing/LeadCapture";
import { MeetTheTeamSection } from "@/components/marketing/MeetTheTeamSection";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { StickyCta } from "@/components/marketing/StickyCta";
import { WhatAIUnlocksSection } from "@/components/marketing/WhatAIUnlocksSection";
// HeroSection / ThreePillarsSection / ProblemSection / LeadMagnetsSection
// retired in the 2026-06 team-as-hero simplification.
// ProductDemoTabs retired in the family-office capabilities reframe.
// Components stay in the repo for possible reuse — just no longer
// imported from the homepage.

export const metadata: Metadata = {
  // 2026-06 family-office positioning shift. Title leads with the
  // family-office framing; description names the team + briefing +
  // segment + price hook.
  title: "Your AI Property Family Office — AssetCentral",
  // Target: 140–160 chars.
  description:
    "Hire an AI Property Family Office. Five executives — CIO, CFO, CEO, COO, PA — already briefed on your portfolio and today's market. From €19/month.",
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
      {/* Top strip — Get-a-call CTA pinned to the right side, sitting
          above the MeetTheTeamSection on desktop. Sub-headline labels
          it "Test the system" so it reads as DIFFERENT from the
          subscriber-facing "Call My Team" CTA buried in MeetTheTeamSection
          below. On mobile, this strip wraps and the form sits full-width
          above the team hero. The dark-blue HeroLiveTeam band was
          removed in this iteration — duplicated team portraits. */}
      <section
        aria-label="Try the system — get a call"
        className="w-full bg-[#1a1a2e] py-5 sm:py-7"
      >
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row md:items-center md:justify-end gap-3 md:gap-6">
          <div className="md:text-right md:max-w-xs">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-blue-300">
              Test the system
            </div>
            <p className="text-sm text-blue-100/80 mt-1 leading-snug">
              Get a free call from your AI team in 10 seconds — no signup.
            </p>
          </div>
          <div className="w-full md:w-auto md:max-w-sm">
            <CallMeBackForm variant="hero" />
          </div>
        </div>
      </section>

      {/* MeetTheTeamSection — "Your AI Property Family Office" team
          hero. The dark-blue HeroLiveTeam band was removed in this
          iteration — it duplicated the team portraits the
          MeetTheTeamSection already shows. */}
      <MeetTheTeamSection />
      <CallYourTeamSection />
      <DailyBriefingSection />
      <GetDataInSection />
      <div id="how-it-works" />
      <WhatAIUnlocksSection />
      <CalculatorsCta />
      <PricingPreview />
      <LeadCapture />
      <FinalCta />
      <StickyCta />
    </>
  );
}
