// /compare/assetcentral-vs-family-office — SEO comparison page.

import { ComparisonPage, getComparisonMetadata } from "@/components/marketing/ComparisonPage";

const { config, metadata: pageMetadata } = getComparisonMetadata("assetcentral-vs-family-office");
export const metadata = pageMetadata;
export default function Page() { return <ComparisonPage config={config} />; }
