// Netlify Edge Function — geofence the marketing site.
//
// Runs on Netlify's Deno-based edge runtime BEFORE the static asset is
// served, so a blocked-country visitor never even fetches the homepage.
//
// `context.geo.country.code` is populated automatically by Netlify from
// the MaxMind GeoLite2 database for every request. No third-party lookup
// needed.
//
// Mirror of `assetcentral-app/lib/geofence.ts` — duplicated rather than
// imported because the Next.js build can't share TS modules with Edge
// Functions cleanly. Keep both files in sync.

import type { Context } from "https://edge.netlify.com";

const BLOCKED_COUNTRIES = new Set<string>([
  "IR", // Iran           — OFAC sanctioned
  "KP", // North Korea    — OFAC sanctioned
  "SY", // Syria          — OFAC sanctioned
  "CU", // Cuba           — OFAC sanctioned
  "RU", // Russia         — EU + US sanctions
  "BY", // Belarus        — EU + US sanctions
  "AF", // Afghanistan    — OFAC / banking risk
  "MM", // Myanmar        — EU sanctions
  "VE", // Venezuela      — OFAC partial sanctions
  "CN", // China          — internal policy
  "IN", // India          — internal policy
]);

// Paths that ALWAYS resolve, even from blocked countries. The block page
// itself must be reachable to avoid a redirect loop; legal pages stay
// open so blocked visitors can still read terms / privacy.
const ALWAYS_ALLOWED = ["/unavailable", "/terms", "/privacy"];

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  if (ALWAYS_ALLOWED.some((p) => path === p || path.startsWith(p + "/"))) {
    return; // pass through
  }

  const code = context.geo?.country?.code;
  if (code && BLOCKED_COUNTRIES.has(code.toUpperCase())) {
    // Rewrite (not redirect) so the URL bar stays put — feels less hostile.
    // Cache-bust so Netlify doesn't cache the block response against the
    // requested URL for non-blocked users sharing the same CDN node.
    return new Response(null, {
      status: 307,
      headers: {
        Location: "/unavailable",
        "Cache-Control": "no-store",
      },
    });
  }
};

export const config = {
  // Run on every page request. Static assets (images, fonts, JS bundles)
  // are exempt — Netlify's edge runtime auto-skips them based on extension
  // so we don't waste compute on every PNG load.
  path: "/*",
  excludedPath: [
    "/_next/*",
    "/static/*",
    "/*.png",
    "/*.jpg",
    "/*.jpeg",
    "/*.gif",
    "/*.svg",
    "/*.ico",
    "/*.webp",
    "/*.mp3",
    "/*.mp4",
    "/*.wav",
    "/*.woff",
    "/*.woff2",
    "/*.css",
    "/*.js",
    "/*.json",
    "/*.xml",
    "/*.txt",
    "/*.pdf",
  ],
};
