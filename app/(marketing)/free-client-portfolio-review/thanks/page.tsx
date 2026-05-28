// Post-submission thanks for the free client portfolio review form.
// Fires the Broker Partner Lead Google Ads conversion on mount.

import type { Metadata } from "next";
import Link from "next/link";
import { BrokerConversionPixel } from "@/components/marketing/BrokerConversionPixel";

const NAVY = "#1a1a2e";
const ACCENT = "#4f6ef7";

export const metadata: Metadata = {
  title: "Review request received — AssetCentral",
  robots: { index: false, follow: false },
};

export default function FreeReviewThanksPage() {
  return (
    <div
      style={{ backgroundColor: NAVY }}
      className="text-white min-h-[80vh] flex items-center"
    >
      <BrokerConversionPixel kind="broker_partner_lead" />
      <div className="mx-auto max-w-2xl px-6 lg:px-10 py-20 text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6"
          style={{ backgroundColor: `${ACCENT}25`, color: ACCENT }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12 L10 17 L19 8" />
          </svg>
        </div>
        <p
          className="text-[12px] uppercase tracking-[0.25em] text-white/55 mb-5"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Request received
        </p>
        <h1
          className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Thanks — your client&rsquo;s review is queued.
        </h1>
        <p
          className="mt-6 text-[16px] sm:text-[18px] text-white/75 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          We&rsquo;ll email you within one business day to confirm what we
          need and walk through the analysis once it&rsquo;s ready. Typical
          turnaround is 48 hours from the moment we have full data.
        </p>
        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link
            href="/partners/dubai-brokers"
            className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-white text-[#1a1a2e] px-6 text-[14.5px] font-medium hover:bg-white/90 transition-colors"
          >
            See the broker partner program
          </Link>
          <a
            href="mailto:partners@assetcentral.ai?subject=Free%20portfolio%20review%20follow-up"
            className="inline-flex items-center justify-center min-h-[48px] rounded-md border border-white/20 text-white px-6 text-[14.5px] font-medium hover:bg-white/5 transition-colors"
          >
            Email us directly
          </a>
        </div>
      </div>
    </div>
  );
}
