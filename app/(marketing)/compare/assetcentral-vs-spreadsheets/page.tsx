// /compare/assetcentral-vs-spreadsheets — SEO comparison page.

import { ComparisonPage, getComparisonMetadata } from "@/components/marketing/ComparisonPage";

const { config, metadata: pageMetadata } = getComparisonMetadata("assetcentral-vs-spreadsheets");
export const metadata = pageMetadata;
export default function Page() { return <ComparisonPage config={config} />; }
