import type { Metadata } from "next";
import { CalculatorsCta } from "@/components/marketing/CalculatorsCta";
import { FinalCta } from "@/components/marketing/FinalCta";
import { GetDataInSection } from "@/components/marketing/GetDataInSection";
import { LeadCapture } from "@/components/marketing/LeadCapture";
import { MeetTheTeamSection } from "@/components/marketing/MeetTheTeamSection";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { ProductDemoTabs } from "@/components/marketing/ProductDemoTabs";
import { StickyCta } from "@/components/marketing/StickyCta";
// HeroSection / ThreePillarsSection / ProblemSection / LeadMagnetsSection
// were retired in the 2026-06 "team-as-hero" simplification. The team
// section now opens the page as the landing hero — it carries the
// headline, the Model/Monitor/Manage discipline pills, the five
// portraits, and the synthesis card, so the standalone hero / pillars /
// problem framings were redundant. Components are kept in the repo for
// possible reuse but no longer imported from the homepage.

export const metadata: Metadata = {
  // The team section IS the hero, so the title leads with the team
  // framing rather than the framework verbs.
  title: "Your AI Property Management Team — AssetCentral",
  // Target: 140–160 chars. Communicates: the team metaphor · target
  // segment (2–50 properties) · north star (yield) · price hook.
  description:
    "Five AI specialists working on your portfolio across Model, Monitor and Manage — for property owners with 2 to 50 properties. Grow your returns. From €19/month.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AssetCentral",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "19", priceCurrency: "EUR" },
  description:
    "AI property management team for owners with 2–50 properties — a Chief Investment Officer, Chief Financial Officer, Chief Executive Officer, Chief Operations Officer and Personal Assistant working continuously across Model, Monitor and Manage to grow portfolio yield.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Homepage flow (2026-06 team-as-hero simplification):
            MeetTheTeamSection — five-portrait landing hero with the
                                 Model/Monitor/Manage discipline pills,
                                 "Your AI Property Management Team" H1
                                 and the team synthesis card
            GetDataInSection   — five-channel ingestion strip; answers
                                 "now how do I start?" right after the
                                 team intro. Voice positioned as "your
                                 PA calls you".
            ProductDemoTabs    — guided product walkthrough
            CalculatorsCta     — free calculators teaser
            PricingPreview     — Individual / Pro / Team tiers
            LeadCapture        — email capture
            FinalCta           — close
            StickyCta          — mobile-only conversion pill */}
      <MeetTheTeamSection />
      <GetDataInSection />
      <div id="how-it-works" />
      <ProductDemoTabs />
      <CalculatorsCta />
      <PricingPreview />
      <LeadCapture />
      <FinalCta />
      <StickyCta />
    </>
  );
}
