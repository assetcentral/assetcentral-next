"use client";

// Bottom-screen cookie consent banner.
//
// Shown only while the consent state is 'undecided' (first visit, or
// after the user explicitly clears their preference from the cookies
// policy page). Two visible buttons + a one-line policy link:
//
//   [Reject non-essential]  [Accept all]    Manage preferences →
//
// Picking either button persists the decision via lib/cookieConsent
// and the banner dismisses. The Google Ads loader (ConsentedGoogleAds)
// listens on the same change event and loads / doesn't load
// gtag.js accordingly.
//
// Plausible is genuinely cookieless so it ALWAYS loads — no consent
// needed under PECR / GDPR. The banner copy reflects this so users
// know "Reject" doesn't disable everything.

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, writeConsent, type ConsentState } from "@/lib/cookieConsent";

export function CookieBanner() {
  // Render nothing on first paint (server has no localStorage) — once
  // mounted, read the stored decision and show only when undecided.
  // Using a state that starts 'undecided' would briefly flash the
  // banner for users who'd already accepted/rejected; null avoids that.
  const [state, setState] = useState<ConsentState | null>(null);

  useEffect(() => {
    setState(readConsent());
  }, []);

  if (state === null || state !== "undecided") return null;

  const decide = (v: "accepted" | "rejected") => {
    writeConsent(v);
    setState(v);
  };

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)]"
    >
      <div
        className="mx-auto max-w-4xl m-3 sm:m-4 rounded-xl bg-[var(--color-navy)] text-white shadow-[0_18px_50px_-15px_rgba(15,23,42,0.55)] p-4 sm:p-5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
          <div className="flex-1 min-w-0">
            <p className="text-[14px] sm:text-[14.5px] leading-snug text-white">
              We use cookies to measure how the site performs.
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/70">
              Essential analytics (Plausible — no cookies, no personal
              data) are always on. Marketing cookies (Google Ads, used
              for remarketing + conversion tracking) only load if you
              accept.{" "}
              <Link
                href="/cookies"
                className="underline hover:text-white"
              >
                See our cookies policy
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:shrink-0">
            <button
              type="button"
              onClick={() => decide("rejected")}
              className="inline-flex items-center justify-center min-h-[40px] px-4 rounded-md border border-white/25 text-white text-[13.5px] font-medium hover:bg-white/5 transition-colors"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="inline-flex items-center justify-center min-h-[40px] px-4 rounded-md bg-white text-[var(--color-navy)] text-[13.5px] font-semibold hover:bg-slate-100 transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
