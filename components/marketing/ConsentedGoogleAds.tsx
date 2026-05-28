"use client";

// Gates the Google Ads gtag.js loader on cookie consent.
//
// Previously the gtag <Script> tags lived directly in app/layout.tsx
// and loaded on every page view, unconditionally. That's fine for
// product analytics (Plausible — cookieless) but Google Ads sets
// advertising + remarketing cookies which require explicit consent
// under PECR (UK) + GDPR (EU). We now load the gtag scripts ONLY
// when the consent state is 'accepted'.
//
// Listens for consent changes via the lib/cookieConsent event so a
// user who accepts via the banner gets the tag loaded immediately
// (no page reload required). If they later revoke consent from the
// /cookies page, the gtag stays loaded for the current page —
// removing it cleanly mid-session is harder than it sounds (the
// global dataLayer + injected event handlers etc.) — but no NEW
// page views will reload it and the cookies set previously expire
// on their normal schedule.

import { useEffect, useState } from "react";
import Script from "next/script";
import { onConsentChange, readConsent } from "@/lib/cookieConsent";

const GOOGLE_ADS_ID = "AW-18179673413";

export function ConsentedGoogleAds() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(readConsent() === "accepted");
    const unsubscribe = onConsentChange((state) => {
      // Only flip ON — flipping off requires a reload anyway, and
      // we want to avoid React unmounting the <Script> tag (which
      // would try to clean up DOM the way next/script doesn't expect).
      if (state === "accepted") setConsented(true);
    });
    return unsubscribe;
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        id="gads-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      <Script id="gads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
