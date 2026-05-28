// Block page for marketing-site visitors whose country is on the geofence
// list. The Netlify Edge Function at netlify/edge-functions/geoblock.ts
// rewrites blocked traffic to this URL.
//
// Kept inside the (marketing) route group so the Nav + Footer chrome
// render around the message — looks like a real "we can't serve you"
// page rather than a bare 451. The block list lives in the edge function
// + assetcentral-app/lib/geofence.ts (mirror copy).

import type { Metadata } from "next";
import Link from "next/link";

const NAVY = "#0a0e27";
const ACCENT = "#4f6ef7";

export const metadata: Metadata = {
  title: "AssetCentral — unavailable in your region",
  // Don't index — defensive surface, not content.
  robots: { index: false, follow: false },
};

export default function UnavailablePage() {
  return (
    <div style={{ backgroundColor: NAVY }} className="text-white min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-2xl px-6 lg:px-10 py-20 text-center">
        <p
          className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-5"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          AssetCentral · Region check
        </p>
        <h1
          className="text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          AssetCentral isn&rsquo;t available in your region.
        </h1>
        <p
          className="mt-6 text-[16px] sm:text-[18px] text-white/75 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          We can&rsquo;t currently offer AssetCentral where you&rsquo;re
          accessing from. If you think this is a mistake — for example you&rsquo;re
          travelling or using a VPN — please get in touch and we&rsquo;ll review
          your request.
        </p>
        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <a
            href="mailto:hello@assetcentral.ai?subject=Region%20access%20request"
            className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-white text-[#0a0e27] px-6 text-[14.5px] font-medium hover:bg-white/90 transition-colors"
          >
            Get in touch
          </a>
          <Link
            href="/terms"
            className="inline-flex items-center justify-center min-h-[48px] rounded-md border border-white/20 text-white px-6 text-[14.5px] font-medium hover:bg-white/5 transition-colors"
          >
            Read our terms
          </Link>
        </div>
        <p
          className="mt-12 text-[12.5px] text-white/45"
          style={{ fontFamily: "var(--font-sans)", color: ACCENT }}
        >
          Real data. Better decisions. Better returns.
        </p>
      </div>
    </div>
  );
}
