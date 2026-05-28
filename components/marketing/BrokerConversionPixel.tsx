"use client";

import { useEffect } from "react";

// Broker Partner Lead — primary conversion for the Dubai brokers Google Ads
// campaign. Fires on:
//   • /partners/dubai-brokers/thanks (broker partner application thanks)
//   • /free-client-portfolio-review/thanks (free review submission thanks)
//
// Both surfaces produce the same conversion type (a broker lead), so they
// share the label. If you later split out "Free portfolio review submitted"
// as its own conversion action in Google Ads, swap the label per page.
//
// Hardcoded label/account ID rather than env vars because:
//   • Conversion labels are public anyway (visible in the rendered page)
//   • Netlify static export needs NEXT_PUBLIC_ env vars set at build time,
//     and we don't want a missing env var to silently break tracking
//
// Dedupes per page-visit via sessionStorage so a refresh of the thanks
// page doesn't double-fire. Each unique form submission redirects to a
// fresh thanks page with no session-storage state, so the dedupe is safe.

const ADS_ID = "AW-18179673413";

// Conversion labels per action. Add new entries as Google Ads conversions
// are created; the `kind` prop on the component picks the right one.
const LABELS = {
  broker_partner_lead: "iE0ICM7Q6bMcEMWa39xD",
} as const;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

interface BrokerConversionPixelProps {
  kind: keyof typeof LABELS;
}

export function BrokerConversionPixel({ kind }: BrokerConversionPixelProps) {
  useEffect(() => {
    const label = LABELS[kind];
    if (!label) return;

    // Dedupe per browser session — a refresh of the thanks page shouldn't
    // double-count. Try/catch handles private-mode / disabled storage:
    // we'd rather over-count once than miss the conversion entirely.
    const storageKey = `gads_broker_${kind}`;
    try {
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // fall through and fire
    }

    // Lazy-load gtag.js once per page (other pixels on the site may also
    // load it; the script tag check is the de-dupe).
    if (!document.querySelector(`script[data-gads="${ADS_ID}"]`)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
      s.dataset.gads = ADS_ID;
      document.head.appendChild(s);
    }

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
    window.gtag = window.gtag || gtag;

    gtag("js", new Date());
    gtag("config", ADS_ID);
    gtag("event", "conversion", {
      send_to: `${ADS_ID}/${label}`,
    });
  }, [kind]);

  return null;
}
