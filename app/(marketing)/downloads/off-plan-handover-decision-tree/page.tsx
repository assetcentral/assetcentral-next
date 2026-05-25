import type { Metadata } from "next";
import { LeadMagnetLayout } from "@/components/marketing/LeadMagnetLayout";

const TITLE = "Off-plan Handover Decision Tree";
const DESCRIPTION =
  "Stage payment due, cash tight. Four options, three decision questions, the documents each path requires. Free PDF for owners with off-plan units approaching handover.";

export const metadata: Metadata = {
  title: `${TITLE} · Free PDF for off-plan owners | AssetCentral`,
  description: DESCRIPTION,
  alternates: { canonical: "/downloads/off-plan-handover-decision-tree" },
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
      item: "https://assetcentral.ai/downloads/off-plan-handover-decision-tree",
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
        magnet="off-plan-handover-decision-tree"
        magnetName="Off-plan Handover Decision Tree"
        downloadPath="/downloads/off-plan-handover-decision-tree.pdf"
        eyebrow="Decision tree · free download"
        title="Off-plan handover: which option is yours?"
        subtitle="Stage payment due. Cash tight. Four options, three decision questions, and the documents each path requires. Built for owners with off-plan units approaching handover in 6–12 months."
        insideHeading="What's inside"
        insideBullets={[
          "Three decision questions to map your situation to a path — time until handover, conviction in the asset, alternative uses of capital",
          "Four options broken down: complete with own funds, refinance, secondary-market sale, developer renegotiation — each with when to use it, process, timing, documents needed, and risks",
          "Common mistakes — waiting, single-path planning, counting on developer flexibility, underestimating the valuation gap",
          "How AssetCentral models all four options in parallel with NPV and cashflow impact",
        ]}
        whoFor="Owners with one or more off-plan units within 12 months of handover, especially if cashflow is tight or the market has softened since purchase."
        pageCount={4}
      />
    </>
  );
}
