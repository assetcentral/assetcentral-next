import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://assetcentral.ai";

// Per-route lastModified — for resource articles and other content with a
// known publish date the article files export a `datePublished` constant.
// For non-article routes we use the date this sitemap was last edited as
// a stable signal that beats `new Date()` on every build (which Google
// reads as noise and may discount). When you ship a substantive change to
// a route, bump the date here in the same commit.
const ROUTE_LAST_MODIFIED = "2026-06-22";

// Per-resource-article publish dates — kept in sync with the
// `datePublished` constants inside each article's page.tsx.
const ARTICLE_DATES: Record<string, string> = {
  "mortgage-types-explained": "2026-05-21",
  "mortgage-rules-by-country": "2026-05-21",
  "net-yield-vs-gross-yield": "2026-05-15",
  "off-plan-handover-options": "2026-05-19",
  "str-operator-performance-check": "2026-05-12",
  "uk-tax-on-dubai-property": "2026-05-24",
  "winners-and-losers": "2026-05-18",
  "yield-protection": "2026-05-22",
  "portfolio-baseline-audit": "2026-05-16",
  "lift-yield-90-days": "2026-05-20",
};

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string;
};

// Priority guidance:
//   1.0  homepage (single most-important page on the site)
//   0.9  pricing — closest page to the conversion event
//   0.8  hubs (features, calculators index, resources index) + campaign
//        landing pages (uk-dubai, free-client-portfolio-review)
//   0.7  individual calculators + resource articles + about + partners
//   0.5  utility surfaces (cookies, partners/apply, demo/get-started,
//        partners/dubai-brokers)
//   excl thanks pages, privacy/terms boilerplate, /unavailable, /downloads/*
//        (download-gated lead magnets — robots-allowed but not worth
//        sitemap surface area).
const routes: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },

  // Primary product surfaces
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/features", priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators", priority: 0.8, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.8, changeFrequency: "weekly" },

  // Three-pillar framework pages (Model / Monitor / Manage). Each one
  // is a top-level positioning surface — owns SEO + ad-funnel for its
  // pillar's intent. Sit at the same priority as /features since they
  // map directly to buyer-journey verbs the homepage now leads with.
  { path: "/model", priority: 0.8, changeFrequency: "monthly" },
  { path: "/monitor", priority: 0.8, changeFrequency: "monthly" },
  { path: "/manage", priority: 0.8, changeFrequency: "monthly" },

  // Per-agent SEO landing pages (2026-06-22). Owns search intent for
  // "AI property [CEO/CIO/CFO/COO/PA]" — one page per agent in the
  // five-agent property team. Same priority as /model/etc. since they
  // share the buyer-journey weight: pillar pages frame the framework,
  // agent pages frame the team.
  { path: "/ai-property-ceo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ai-property-cio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ai-property-cfo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ai-property-coo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ai-property-pa", priority: 0.8, changeFrequency: "monthly" },

  // Calculators (individual)
  { path: "/calculators/mortgage", priority: 0.7, changeFrequency: "monthly" },
  { path: "/calculators/irr", priority: 0.7, changeFrequency: "monthly" },
  { path: "/calculators/str-yield", priority: 0.7, changeFrequency: "monthly" },
  { path: "/calculators/retrofit", priority: 0.7, changeFrequency: "monthly" },
  { path: "/calculators/ownership", priority: 0.7, changeFrequency: "monthly" },
  { path: "/calculators/off-plan", priority: 0.7, changeFrequency: "monthly" },

  // Resource articles — lastModified comes from ARTICLE_DATES
  { path: "/resources/mortgage-types-explained", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["mortgage-types-explained"] },
  { path: "/resources/mortgage-rules-by-country", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["mortgage-rules-by-country"] },
  { path: "/resources/net-yield-vs-gross-yield", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["net-yield-vs-gross-yield"] },
  { path: "/resources/off-plan-handover-options", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["off-plan-handover-options"] },
  { path: "/resources/str-operator-performance-check", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["str-operator-performance-check"] },
  { path: "/resources/uk-tax-on-dubai-property", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["uk-tax-on-dubai-property"] },
  { path: "/resources/winners-and-losers", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["winners-and-losers"] },
  { path: "/resources/yield-protection", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["yield-protection"] },
  { path: "/resources/portfolio-baseline-audit", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["portfolio-baseline-audit"] },
  { path: "/resources/lift-yield-90-days", priority: 0.7, changeFrequency: "monthly", lastModified: ARTICLE_DATES["lift-yield-90-days"] },

  // Campaign landing pages
  { path: "/uk-dubai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/free-client-portfolio-review", priority: 0.8, changeFrequency: "monthly" },
  // UAE Ads campaign (June 2026) — three ICP-focused landing pages
  { path: "/uae-expat", priority: 0.7, changeFrequency: "monthly" },
  { path: "/dubai-property-tracker", priority: 0.7, changeFrequency: "monthly" },
  { path: "/multi-currency-portfolio", priority: 0.7, changeFrequency: "monthly" },

  // Partner surfaces
  { path: "/partners", priority: 0.7, changeFrequency: "monthly" },
  { path: "/partners/dubai-brokers", priority: 0.7, changeFrequency: "monthly" },
  { path: "/partners/apply", priority: 0.5, changeFrequency: "monthly" },

  // Demos
  { path: "/demo/60", priority: 0.7, changeFrequency: "monthly" },
  { path: "/demo/get-started", priority: 0.5, changeFrequency: "monthly" },

  // Company / utility
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },

  // Lead-magnet downloads — keep in sitemap but low priority. These are
  // the standalone landing pages, not the PDF files themselves.
  { path: "/downloads/portfolio-health-checklist", priority: 0.5, changeFrequency: "monthly" },
  { path: "/downloads/off-plan-handover-decision-tree", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(r.lastModified ?? ROUTE_LAST_MODIFIED),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
