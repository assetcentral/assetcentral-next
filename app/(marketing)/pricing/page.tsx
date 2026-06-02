import type { Metadata } from "next";
import { PRICING_FAQS } from "@/lib/pricing-faqs";
import { PLAN_PRICES } from "@/lib/pricing";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing | AssetCentral",
  description:
    "Free for up to 3 properties. Pro €49/month for the full AC Agent Team. Team €199/month with up to 5 seats. 7-day free trial on paid plans, no credit card. Per-currency billing in EUR, USD, GBP, or AED.",
  alternates: { canonical: "/pricing" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AssetCentral",
  description:
    "Property portfolio management platform for private owners with 2–50 properties across multiple countries.",
  brand: { "@type": "Brand", name: "AssetCentral" },
  offers: [
    {
      "@type": "Offer",
      name: "Pro",
      price: String(PLAN_PRICES.pro.EUR.monthly),
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(PLAN_PRICES.pro.EUR.monthly),
        priceCurrency: "EUR",
        unitText: "MONTH",
      },
      availability: "https://schema.org/InStock",
      url: "https://assetcentral.ai/pricing",
    },
    {
      "@type": "Offer",
      name: "Team",
      price: String(PLAN_PRICES.team.EUR.monthly),
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(PLAN_PRICES.team.EUR.monthly),
        priceCurrency: "EUR",
        unitText: "MONTH",
      },
      availability: "https://schema.org/InStock",
      url: "https://assetcentral.ai/pricing",
    },
  ],
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://assetcentral.ai/" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://assetcentral.ai/pricing" },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PricingClient />
    </>
  );
}
