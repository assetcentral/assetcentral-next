// AI Property CFO — SEO landing page.
// Thin wrapper: pulls config from lib/agent-seo.ts, hands it to the
// shared <AgentSeoPage> template, and exports the page Metadata.

import { AgentSeoPage, getAgentMetadata } from "@/components/marketing/AgentSeoPage";

const { agent, metadata: pageMetadata } = getAgentMetadata("ai-property-cfo");

export const metadata = pageMetadata;

export default function AiPropertyCfoPage() {
  return <AgentSeoPage agent={agent} />;
}
