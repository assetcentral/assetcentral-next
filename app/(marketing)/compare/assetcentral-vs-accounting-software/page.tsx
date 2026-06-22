// /compare/assetcentral-vs-accounting-software — SEO comparison page.

import { ComparisonPage, getComparisonMetadata } from "@/components/marketing/ComparisonPage";

const { config, metadata: pageMetadata } = getComparisonMetadata("assetcentral-vs-accounting-software");
export const metadata = pageMetadata;
export default function Page() { return <ComparisonPage config={config} />; }
