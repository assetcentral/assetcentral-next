import type { Metadata } from "next";
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
import { TeamForPriceSection } from "@/components/marketing/TeamForPriceSection";

export const metadata: Metadata = {
  title: "AssetCentral — Your AI Team for Property Owners",
  description:
    "AssetCentral is your AI team for property owners. Five specialists — Your CEO, Finance Manager, Market Analyst, Operations Manager and Portfolio Personal Assistant — working on your portfolio together. Built for private owners with 2 to 50 properties.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AssetCentral",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "49", priceCurrency: "EUR" },
  description:
    "AI team for private property owners — Your CEO, Finance Manager, Market Analyst, Operations Manager and Portfolio Personal Assistant.",
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
      {/* Homepage flow post-2026-06 deeper alignment:
            HeroSection      — yield north-star strapline + team H1
            ProblemSection   — 4 problems, each mapped to the agent who handles it
            MeetTheTeamSection — formal intro to the five specialists
            TeamForPriceSection — "Five specialists. €49 a month." — the value-prop maths
            ProductDemoTabs  — guided product walkthrough
            FeaturesGrid     — what each agent does (grouped by agent owner)
          The previous flow ran problem → demo → features as a generic SaaS
          walk; the new flow keeps the team theme front-of-mind end-to-end. */}
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
    </>
  );
}
