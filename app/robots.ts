import type { MetadataRoute } from "next";

// Allow indexing on the production deploy (assetcentral.ai), block
// EVERYTHING on Vercel preview deploys — that includes preview.assetcentral.ai
// (pinned to the redesign-2026 branch) and any per-PR preview URLs.
//
// Vercel sets VERCEL_ENV at build time:
//   • 'production' → the main-branch deploy → public, indexable
//   • 'preview'    → any non-main branch deploy → robots Disallow: /
//   • 'development' → local dev → doesn't matter, not crawled
//
// Without this gate, Google would index the in-progress redesign at
// preview.assetcentral.ai and we'd end up with duplicate-content
// penalties against the canonical assetcentral.ai.

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (isPreview) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://assetcentral.ai/sitemap.xml",
  };
}
