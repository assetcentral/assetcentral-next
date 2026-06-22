// AI Property COO — SEO landing page.
// Thin wrapper: pulls config from lib/agent-seo.ts, hands it to the
// shared <AgentSeoPage> template, and exports the page Metadata.

import { AgentSeoPage, getAgentMetadata } from "@/components/marketing/AgentSeoPage";

const { agent, metadata: pageMetadata } = getAgentMetadata("ai-property-coo");

export const metadata = pageMetadata;

export default function AiPropertyCooPage() {
  return <AgentSeoPage agent={agent} />;
}
