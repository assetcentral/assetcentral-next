import type { Metadata } from "next";
import Link from "next/link";
import { BrandCampaignSection } from "@/components/marketing/BrandCampaignSection";
import { DontBuyBlindHero } from "@/components/marketing/DontBuyBlindHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { FreeAIResultSection } from "@/components/marketing/FreeAIResultSection";
import { FreeToolsGridSection } from "@/components/marketing/FreeToolsGridSection";
import { FreeVsProSection } from "@/components/marketing/FreeVsProSection";
import { GetDataInSection } from "@/components/marketing/GetDataInSection";
import { GetStartedSection } from "@/components/marketing/GetStartedSection";
import { InfrastructureSection } from "@/components/marketing/InfrastructureSection";
import { LeadCapture } from "@/components/marketing/LeadCapture";
import { MeetTheTeamSection } from "@/components/marketing/MeetTheTeamSection";
import { PartnerStripSection } from "@/components/marketing/PartnerStripSection";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { StickyCta } from "@/components/marketing/StickyCta";
import { WhatToCheckSection } from "@/components/marketing/WhatToCheckSection";
// HeroSection / ThreePillarsSection / ProblemSection / LeadMagnetsSection
// retired in the 2026-06 team-as-hero simplification.
// ProductDemoTabs retired in the family-office capabilities reframe.
// Components stay in the repo for possible reuse — just no longer
// imported from the homepage.

export const metadata: Metadata = {
  // 2026-06 Phase 2 — "Run the numbers first" repositioning. Title
  // leads with the behavioural ask; description names the eight
  // decisions AssetCentral checks for and the freemium ladder.
  title: { absolute: "Run the Numbers First | AssetCentral" },
  // Target: 140–160 chars.
  description:
    "Before you buy, sell, mortgage, refinance, renovate or rent out a property, run the numbers first on AssetCentral. Free AI property checks. Upgrade for the full report.",
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
      {/* Homepage flow (2026-06 Phase 2 — "Run the numbers first").
          AssetCentral.ai is repositioned as the default place people
          go BEFORE making any property decision. The page is a wide
          B2C funnel above the #pro anchor, with the existing Pro
          story preserved below for the 2-50 property owner cohort.

            DontBuyBlindHero        — "Run the numbers first." Primary
                                      CTA: Check a property for free.
            WhatToCheckSection      — Decision router. Seven cards
                                      (buy / sell / mortgage / refi /
                                      works / rent-out / STR-vs-LTR)
                                      plus a quieter "I own multiple"
                                      row pointing at Pro.
            FreeAIResultSection     — Example analysis card. Makes the
                                      free AI output tangible.
            FreeToolsGridSection    — Eight free Level 1 tools in a
                                      grid. The freemium acquisition
                                      layer.
            FreeVsProSection        — Side-by-side: free run-the-
                                      numbers vs Pro decide-properly.
            ProTransitionBand       — Transition into the Pro story.
            MeetTheTeamSection      — Pro: five-agent AI team.
            InfrastructureSection   — Pro: what the agent infra unlocks.
            GetStartedSection       — Pro: getting started.
            GetDataInSection        — Pro: ingestion channels.
            PricingPreview          — Free / Individual / Pro / Team /
                                      Enterprise pricing.
            PartnerStripSection     — Quiet bottom CTA for advisors.
            LeadCapture             — email capture.
            FinalCta                — close.
            StickyCta               — mobile-only conversion pill. */}

      {/* ── B2C funnel (top of page) ───────────────────────────── */}
      <DontBuyBlindHero />
      <WhatToCheckSection />
      <FreeAIResultSection />
      <FreeToolsGridSection />
      <FreeVsProSection />
      <BrandCampaignSection />

      {/* ── Pro positioning (preserved below the #pro anchor) ──── */}
      <ProTransitionBand />
      <div id="pro" />
      <MeetTheTeamSection />
      <InfrastructureSection />
      <GetStartedSection />
      <div id="how-it-works" />
      <GetDataInSection />
      <PricingPreview />
      <PartnerStripSection />
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
