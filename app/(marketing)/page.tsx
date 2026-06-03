import type { Metadata } from "next";
import { AgentYieldSection } from "@/components/marketing/AgentYieldSection";
import { CalculatorsCta } from "@/components/marketing/CalculatorsCta";
import { FeaturesGrid } from "@/components/marketing/FeaturesGrid";
import { FinalCta } from "@/components/marketing/FinalCta";
import { HeroSection } from "@/components/marketing/HeroSection";
import { LeadCapture } from "@/components/marketing/LeadCapture";
import { LeadMagnetsSection } from "@/components/marketing/LeadMagnetsSection";
import { MeetTheTeamSection } from "@/components/marketing/MeetTheTeamSection";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { ProductDemoTabs } from "@/components/marketing/ProductDemoTabs";
import { StickyCta } from "@/components/marketing/StickyCta";
import { TeamForPriceSection } from "@/components/marketing/TeamForPriceSection";

export const metadata: Metadata = {
  title: "AssetCentral — Increase Property Yield with Your AI Agent Team",
  description:
    "AssetCentral gives private property investors a team of AI agents that organise, monitor and analyse their portfolio to identify practical actions that can improve yield. Built for portfolios of 2 to 50 properties.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AssetCentral",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "49", priceCurrency: "EUR" },
  description:
    "AI agent team for private property investors — Portfolio Personal Assistant, Finance Manager, Market Analyst, Operations Manager and Your CEO working to identify practical actions to improve yield.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      {/* The homepage stays market-agnostic — investors landing here
          may be in any of our 9 supported markets. Campaign-specific
          targeting (e.g. UK-investor-with-Dubai-property) lives on its
          own dedicated landing page at /uk-dubai, which the Google Ads
          campaign points at directly. */}
      {/* Homepage flow post-2026-06 yield-led reposition:
            HeroSection         — yield north-star strapline + agent-team H1
            AgentYieldSection   — how each agent works to increase yield (new)
            ProblemSection      — 4 problems, each mapped to the agent who handles it
            MeetTheTeamSection  — formal intro to the five agents
            TeamForPriceSection — "Five specialists. €49 a month." — the value-prop maths
            ProductDemoTabs     — guided product walkthrough
            FeaturesGrid        — what each agent does (grouped by agent owner)
          AgentYieldSection slots in right after the hero so the
          "increase yield" promise is unpacked into named agents and
          their yield contribution before the visitor reads the
          problem statement. Previously the flow jumped from hero
          directly into problems; now the bridge is explicit. */}
      <AgentYieldSection />
      <ProblemSection />
      <MeetTheTeamSection />
      <TeamForPriceSection />
      <div id="how-it-works" />
      <ProductDemoTabs />
      <FeaturesGrid />
      <CalculatorsCta />
      <LeadMagnetsSection />
      <PricingPreview />
      <LeadCapture />
      <FinalCta />
      {/* Mobile sticky CTA — appears after scrolling 40% of the page.
          Default props now push "Add first property" / yield framing
          rather than the older "Meet your AC Agent Team" pitch. */}
      <StickyCta />
    </>
  );
}
