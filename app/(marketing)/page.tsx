import type { Metadata } from "next";
import { CalculatorsCta } from "@/components/marketing/CalculatorsCta";
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
  title: { absolute: "Institutional Property Infrastructure for Private Investors — AssetCentral" },
  // Target: 140–160 chars.
  description:
    "The decision-making architecture institutional desks run on — live data, standardized underwriting, debt-maturity maps, capital runway — for portfolios of 2 to 50 properties. €49/month.",
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
      {/* MeetTheTeamSection — "Your AI Property Family Office" team
          hero. The Get-a-call CTA card lives INSIDE this section now,
          slotted under the 5 portraits in the right column (was a
          standalone section underneath; user wanted it tucked into
          the blank space next to the dual CTA on the left). */}
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
