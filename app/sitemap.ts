import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://assetcentral.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "/",
    "/features",
    "/pricing",
    "/calculators",
    "/calculators/mortgage",
    "/calculators/irr",
    "/calculators/str-yield",
    "/calculators/retrofit",
    "/calculators/ownership",
    "/resources",
    "/resources/mortgage-types-explained",
    "/resources/mortgage-rules-by-country",
    "/resources/net-yield-vs-gross-yield",
    "/resources/off-plan-handover-options",
    "/resources/str-operator-performance-check",
    "/downloads/portfolio-health-checklist",
    "/downloads/off-plan-handover-decision-tree",
    "/about",
    "/privacy",
    "/terms",
  ];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
