import type { Metadata } from "next";
import { LeadMagnetLayout } from "@/components/marketing/LeadMagnetLayout";

const TITLE = "Portfolio Health Checklist";
const DESCRIPTION =
  "The 24 things every private owner with 2–50 properties should review every quarter. Per-asset checks, portfolio-wide checks, and an action priority framework. Free PDF.";

export const metadata: Metadata = {
  title: `${TITLE} · Free PDF for private owners | AssetCentral`,
  description: DESCRIPTION,
  alternates: { canonical: "/downloads/portfolio-health-checklist" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://assetcentral.ai/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://assetcentral.ai/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: TITLE,
      item: "https://assetcentral.ai/downloads/portfolio-health-checklist",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <LeadMagnetLayout
        magnet="portfolio-health-checklist"
        magnetName="Portfolio Health Checklist"
        downloadPath="/downloads/portfolio-health-checklist.pdf"
        eyebrow="Quarterly review · free download"
        title="The Portfolio Health Checklist"
        subtitle="The 24 things every private owner should review every quarter. Per-asset checks, portfolio-wide checks, and an action priority framework. Most owners skip half. The half they skip is usually where the money is."
        insideHeading="What's inside"
        insideBullets={[
          "8 per-asset checks: real net yield, cashflow reconciliation, operator statement verification, tenancy status, loan reversion, insurance, service charge, capex pipeline",
          "8 portfolio-wide checks: blended yield, rolling cashflow, currency and geographic concentration, leverage, off-plan handovers, document completeness, tax records",
          "Action priority framework — red / amber / yellow / green, with timing rules for each tier",
          "How each check maps to AssetCentral's automation (and which ones still need you)",
        ]}
        whoFor="Private owners with 2–50 properties who want a structured, repeatable quarterly review."
        pageCount={4}
      />
    </>
  );
}
