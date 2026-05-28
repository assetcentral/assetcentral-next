"use client";

// Inline "your current preference" panel shown on /cookies.
//
// Lets the user see what they previously decided + change it. Mirrors
// the banner's accept/reject buttons. Useful for the "I clicked
// reject by accident" or "actually I'd like to support the site
// now" cases — without it, the user has to clear localStorage to get
// the banner back.

import { useEffect, useState } from "react";
import { readConsent, writeConsent, clearConsent, type ConsentState } from "@/lib/cookieConsent";

export function CookiePreferences({ className = "" }: { className?: string }) {
  const [state, setState] = useState<ConsentState | null>(null);

  useEffect(() => {
    setState(readConsent());
  }, []);

  // Don't paint anything until we've read localStorage — avoids a
  // server-vs-client mismatch flash where the SSR render says
  // "undecided" and the client immediately swaps to "accepted".
  if (state === null) return null;

  const label =
    state === "accepted"
      ? "Marketing cookies: accepted"
      : state === "rejected"
        ? "Marketing cookies: rejected"
        : "Marketing cookies: not decided yet";

  return (
    <div
      className={`rounded-xl border border-white/15 bg-white/[0.04] p-5 ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            Your current preference
          </div>
          <div className="mt-1 text-[16px] text-white">{label}</div>
        </div>
        <div className="flex items-center gap-2">
          {state !== "accepted" && (
            <button
              type="button"
              onClick={() => {
                writeConsent("accepted");
                setState("accepted");
              }}
              className="inline-flex items-center justify-center min-h-[40px] px-4 rounded-md bg-white text-[var(--color-navy)] text-[13.5px] font-semibold hover:bg-slate-100 transition-colors"
            >
              Accept all
            </button>
          )}
          {state !== "rejected" && (
            <button
              type="button"
              onClick={() => {
                writeConsent("rejected");
                setState("rejected");
              }}
              className="inline-flex items-center justify-center min-h-[40px] px-4 rounded-md border border-white/25 text-white text-[13.5px] font-medium hover:bg-white/5 transition-colors"
            >
              Reject non-essential
            </button>
          )}
          {state !== "undecided" && (
            <button
              type="button"
              onClick={() => {
                clearConsent();
                setState("undecided");
              }}
              className="inline-flex items-center justify-center min-h-[40px] px-3 rounded-md text-white/55 text-[12.5px] hover:text-white hover:underline transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      {state === "accepted" && (
        <p className="mt-3 text-[12.5px] text-white/55">
          Google Ads cookies will load on your next page view (or now if
          you stay on this page).
        </p>
      )}
      {state === "rejected" && (
        <p className="mt-3 text-[12.5px] text-white/55">
          Google Ads cookies aren&rsquo;t loading. Plausible (cookieless)
          continues to count anonymous page views.
        </p>
      )}
    </div>
  );
}
