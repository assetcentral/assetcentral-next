"use client";

/**
 * Captures signup attribution into a `.assetcentral.ai` cookie on
 * every marketing-site page load. The dashboard's signup form reads
 * the same cookie (cross-subdomain via the leading dot) and forwards
 * it into the signUp server action.
 *
 * What's tracked per session (FIRST-touch wins):
 *   • first_referrer — document.referrer at first visit
 *   • first_landing_url — the URL of the first page they hit
 *   • first_visit_at — ISO timestamp
 *   • utm_source / medium / campaign / content / term — URL params
 *   • gclid / fbclid / msclkid / ttclid / li_fat_id — ad-network click
 *     IDs. Captured once and frozen; let admin pinpoint which specific
 *     ad creative drove the signup.
 *
 * What's tracked per pageview (rolling, last-N wins):
 *   • pageview_paths — chronological list of path-only URLs the visitor
 *     hit on the marketing site, capped at 30 entries. Trail tells the
 *     admin whether the user did the full browse-then-convert journey
 *     or jumped straight to /signup from an ad.
 *
 * Why a cookie rather than localStorage:
 *   • Cookies cross subdomains when scoped to `.assetcentral.ai`;
 *     localStorage is per-origin so `assetcentral.ai` and
 *     `app.assetcentral.ai` would each see their own empty bucket.
 *
 * 90-day TTL by default — long enough that a visitor who browses, comes
 * back a month later, and signs up still gets attributed correctly.
 */

import { useEffect } from "react";

const COOKIE_NAME = "ac_attr";
const COOKIE_TTL_DAYS = 90;
const COOKIE_DOMAIN = ".assetcentral.ai";
const MAX_TRAIL_LENGTH = 30; // cap pageview trail; row column is 2000 chars

interface AttributionShape {
  first_referrer: string | null;
  first_landing_url: string | null;
  first_visit_at: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  // Click IDs — captured FIRST-touch like UTMs. Once set, never
  // overwritten so a later internal navigation can't blank them.
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  ttclid: string | null;
  li_fat_id: string | null;
  // Partner ref code from `?ref=XXXX` URL param. Captured FIRST-touch
  // (same logic as UTMs) so the partner who originally introduced the
  // visitor keeps attribution even if the user wanders the site and
  // signs up days later via a different entry point. Resolved to a
  // `partners.code` row by the signup action, and recorded on
  // `users.referred_by_partner_code` for the lifetime of the account.
  partner_ref: string | null;
  // Rolling pageview trail — list of path+search strings in chronological
  // order. Each entry is added on a fresh pageview; we never dedupe
  // because the order matters more than uniqueness.
  pageview_paths: string[];
}

export function AttributionTracker() {
  useEffect(() => {
    try {
      capture();
    } catch {
      // Never let an analytics-style capture break the page render.
    }
  }, []);
  return null;
}

function capture() {
  const existing = readAttrCookie();
  const now = new Date().toISOString();
  const params = new URLSearchParams(window.location.search);
  const paramOrNull = (k: string) => params.get(k) || null;

  // First-touch fields — set only on the very first page load.
  // Click IDs and UTMs go in this bucket; once recorded they're frozen.
  const firstTouchExists = !!(existing && existing.first_visit_at);

  const merged: AttributionShape = {
    first_referrer: firstTouchExists ? existing!.first_referrer : (document.referrer || null),
    first_landing_url: firstTouchExists ? existing!.first_landing_url : (window.location.href || null),
    first_visit_at: firstTouchExists ? existing!.first_visit_at : now,

    utm_source: firstTouchExists ? existing!.utm_source : paramOrNull("utm_source"),
    utm_medium: firstTouchExists ? existing!.utm_medium : paramOrNull("utm_medium"),
    utm_campaign: firstTouchExists ? existing!.utm_campaign : paramOrNull("utm_campaign"),
    utm_content: firstTouchExists ? existing!.utm_content : paramOrNull("utm_content"),
    utm_term: firstTouchExists ? existing!.utm_term : paramOrNull("utm_term"),

    gclid: firstTouchExists ? existing!.gclid : paramOrNull("gclid"),
    fbclid: firstTouchExists ? existing!.fbclid : paramOrNull("fbclid"),
    msclkid: firstTouchExists ? existing!.msclkid : paramOrNull("msclkid"),
    ttclid: firstTouchExists ? existing!.ttclid : paramOrNull("ttclid"),
    li_fat_id: firstTouchExists ? existing!.li_fat_id : paramOrNull("li_fat_id"),
    // Partner code from ?ref=XXXX. Uppercase + 6–12 chars enforced server-
    // side at signup; we still trim/upper-case here so the cookie stores
    // the canonical form and the signup form picks up a clean value.
    partner_ref: firstTouchExists ? existing!.partner_ref : normalizeRef(paramOrNull("ref")),

    pageview_paths: appendPath(
      existing?.pageview_paths ?? [],
      window.location.pathname + window.location.search,
    ),
  };

  writeAttrCookie(merged);
}

/** Append the current path to the trail, deduping only against the
 *  IMMEDIATE previous entry (so back-and-forth navigation is preserved,
 *  but a page refresh doesn't fake an extra entry). Trail capped at
 *  MAX_TRAIL_LENGTH to keep the cookie small and the DB column bounded. */
function appendPath(existing: string[], path: string): string[] {
  if (existing.length > 0 && existing[existing.length - 1] === path) return existing;
  const next = [...existing, path];
  if (next.length > MAX_TRAIL_LENGTH) {
    // Drop oldest. Keeps the most recent journey, which is the bit
    // closest to the conversion — more useful than the dawn-of-time
    // first pageview for attribution.
    return next.slice(next.length - MAX_TRAIL_LENGTH);
  }
  return next;
}

function readAttrCookie(): AttributionShape | null {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<AttributionShape>;
    // Be tolerant of older cookie shapes that pre-date the click-ID +
    // pageview-trail fields. Default missing fields rather than reject
    // the whole cookie.
    return {
      first_referrer: parsed.first_referrer ?? null,
      first_landing_url: parsed.first_landing_url ?? null,
      first_visit_at: parsed.first_visit_at ?? null,
      utm_source: parsed.utm_source ?? null,
      utm_medium: parsed.utm_medium ?? null,
      utm_campaign: parsed.utm_campaign ?? null,
      utm_content: parsed.utm_content ?? null,
      utm_term: parsed.utm_term ?? null,
      gclid: parsed.gclid ?? null,
      fbclid: parsed.fbclid ?? null,
      msclkid: parsed.msclkid ?? null,
      ttclid: parsed.ttclid ?? null,
      li_fat_id: parsed.li_fat_id ?? null,
      partner_ref: parsed.partner_ref ?? null,
      pageview_paths: Array.isArray(parsed.pageview_paths) ? parsed.pageview_paths : [],
    };
  } catch {
    return null;
  }
}

function writeAttrCookie(attribution: AttributionShape) {
  const value = encodeURIComponent(JSON.stringify(attribution));
  const maxAge = COOKIE_TTL_DAYS * 24 * 60 * 60;
  const isProd =
    typeof window !== "undefined" &&
    /\.assetcentral\.ai$/i.test(window.location.hostname);

  const parts = [
    `${COOKIE_NAME}=${value}`,
    `Max-Age=${maxAge}`,
    "Path=/",
    "SameSite=Lax",
  ];
  if (isProd) {
    parts.push(`Domain=${COOKIE_DOMAIN}`);
    parts.push("Secure");
  }
  document.cookie = parts.join("; ");
}

/** Canonicalise a partner ref code from a URL: trim whitespace, upper-case,
 *  strip anything that isn't [A-Z0-9]. Returns null for empty / nonsense
 *  values so we don't pollute the cookie with garbage. The server still
 *  validates against the partners table — this is just hygiene. */
function normalizeRef(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length < 3 || cleaned.length > 24) return null;
  return cleaned;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match ? match.slice(name.length + 1) : null;
}
