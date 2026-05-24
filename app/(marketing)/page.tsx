import type { Metadata } from "next";
import { CalculatorsCta } from "@/components/marketing/CalculatorsCta";
import { FeaturesGrid } from "@/components/marketing/FeaturesGrid";
import { FinalCta } from "@/components/marketing/FinalCta";
import { FourJobsSection } from "@/components/marketing/FourJobsSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { LeadCapture } from "@/components/marketing/LeadCapture";
import { LeadMagnetsSection } from "@/components/marketing/LeadMagnetsSection";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { ProductDemoTabs } from "@/components/marketing/ProductDemoTabs";

export const metadata: Metadata = {
  title: "AssetCentral — Your Real Estate PA | Property Portfolio Intelligence",
  description:
    "AssetCentral is your AI-powered Real Estate PA. Track real yield, verify operator statements, manage cashflow, and make smarter decisions across your multi-country property portfolio.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AssetCentral",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "49", priceCurrency: "EUR" },
  description: "Property portfolio intelligence platform for private landlords.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ProblemSection />
      <div id="how-it-works" />
      <ProductDemoTabs />
      <FourJobsSection />
      <FeaturesGrid />
      <CalculatorsCta />
      <LeadMagnetsSection />
      <PricingPreview />
      <LeadCapture />
      <FinalCta />
    </>
  );
}
