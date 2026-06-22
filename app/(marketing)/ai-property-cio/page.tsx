// AI Property CIO — SEO landing page.
// Thin wrapper: pulls config from lib/agent-seo.ts, hands it to the
// shared <AgentSeoPage> template, and exports the page Metadata.

import { AgentSeoPage, getAgentMetadata } from "@/components/marketing/AgentSeoPage";

const { agent, metadata: pageMetadata } = getAgentMetadata("ai-property-cio");

export const metadata = pageMetadata;

export default function AiPropertyCioPage() {
  return <AgentSeoPage agent={agent} />;
}
