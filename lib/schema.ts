const BASE = "https://assetcentral.ai";

export function articleSchema(opts: {
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO 8601
  dateModified?: string;
  readMins: number;
}) {
  const url = `${BASE}/resources/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: `${BASE}/og-image.png`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Organization",
      name: "AssetCentral editorial team",
      url: BASE,
    },
    publisher: {
      "@type": "Organization",
      name: "AssetCentral",
      logo: { "@type": "ImageObject", url: `${BASE}/og-image.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    timeRequired: `PT${opts.readMins}M`,
    inLanguage: "en",
  };
}

export function articleBreadcrumb(slug: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${BASE}/resources` },
      { "@type": "ListItem", position: 3, name: title, item: `${BASE}/resources/${slug}` },
    ],
  };
}

export function calculatorBreadcrumb(slug: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${BASE}/calculators` },
      { "@type": "ListItem", position: 3, name, item: `${BASE}/calculators/${slug}` },
    ],
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AssetCentral",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "EUR", name: "Free" },
      { "@type": "Offer", price: "49", priceCurrency: "EUR", name: "Pro" },
      { "@type": "Offer", price: "199", priceCurrency: "EUR", name: "Team" },
    ],
    description:
      "AI-powered property portfolio management platform for private owners. Real net yield, multi-currency cashflow, AI document ingestion, operator-statement verification, sell-vs-hold modelling.",
  };
}
