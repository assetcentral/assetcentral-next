import type { Metadata } from "next";
import { CalculatorsCta } from "@/components/marketing/CalculatorsCta";
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
  // Note: the homepage sets `title` directly (not templated) — the
  // root layout's title template appends "| AssetCentral", which we
  // don't want duplicated here since the brand is already in the
  // sentence. Target: ≤60 chars.
  title: "AI Agent Team for Property Yield — AssetCentral",
  // Target: 140–160 chars. Communicates: 5 agents · portfolio scale ·
  // outcome · price hook. Sits at ~155.
  description:
    "Five AI agents on your portfolio of 2 to 50 properties. Real data, better decisions, higher yield. Built for private property investors. From €49/month.",
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
      {/* Homepage flow:
            HeroSection         — yield north-star strapline + agent-team H1
            ProblemSection      — 5 problems, each mapped to the agent(s)
                                  who handle them
            MeetTheTeamSection  — meet the team + each agent's yield-job +
                                  concrete capabilities they own
            ProductDemoTabs     — How it works (guided product walkthrough)
                                  Moved UP per the 2026-06 reorder so the
                                  visitor sees how the team operates before
                                  the cost / pricing pitch.
            CalculatorsCta      — free calculators teaser
            LeadMagnetsSection  — guides + downloads
            TeamForPriceSection — "Five specialists. €49 a month." — moved
                                  DOWN so it segues into PricingPreview as
                                  the value-prop lead-in rather than an
                                  early hero-style section. Visually toned
                                  down (smaller padding + smaller H2) to
                                  read as a supporting section, not a
                                  full-stop. */}
      <ProblemSection />
      <MeetTheTeamSection />
      <div id="how-it-works" />
      <ProductDemoTabs />
      <CalculatorsCta />
      <LeadMagnetsSection />
      <TeamForPriceSection />
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
