// /compare/assetcentral-vs-broker-valuation — SEO comparison page.

import { ComparisonPage, getComparisonMetadata } from "@/components/marketing/ComparisonPage";

const { config, metadata: pageMetadata } = getComparisonMetadata("assetcentral-vs-broker-valuation");
export const metadata = pageMetadata;
export default function Page() { return <ComparisonPage config={config} />; }
