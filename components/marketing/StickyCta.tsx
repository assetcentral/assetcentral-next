"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DISMISS_KEY = "ac_sticky_dismissed_v1";

export function StickyCta({
  label = "Add first property",
  href = "/signup",
  message = "Free for up to 3 properties. No card required.",
  /** Show after scrolling this fraction of the page (0–1). */
  threshold = 0.4,
}: {
  label?: string;
  href?: string;
  message?: string;
  threshold?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
        return;
      }
    } catch {}

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const ratio = window.scrollY / max;
      setVisible(ratio > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  if (dismissed) return null;

  return (
    <div
      aria-hidden={!visible}
      // pb-[env(safe-area-inset-bottom)] sits the bar above the iOS
      // home-indicator on iPhones — without it the bar overlaps the
      // indicator and the dismiss button moves into a tap-dead-zone.
      className={`fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] transition-transform duration-200 ${
        visible ? "translate-y-0 pointer-events-auto" : "translate-y-full pointer-events-none"
      }`}
    >
      <div
        className="mx-auto max-w-3xl m-3 sm:m-4 rounded-xl bg-[var(--color-navy)] text-white shadow-[0_18px_50px_-15px_rgba(15,23,42,0.45)] p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="flex-1 min-w-0">
          {/* Don't truncate on mobile — at 375px the CTA + dismiss
              consume enough horizontal space that the message gets
              chopped mid-sentence. Letting it wrap to 2 lines is the
              better trade. */}
          <div className="text-[13px] sm:text-[14px] leading-snug text-white/90">
            {message}
          </div>
        </div>
        <Link
          href={href}
          className="plausible-event-name=signup_cta_click plausible-event-location=sticky inline-flex items-center justify-center whitespace-nowrap min-h-[44px] rounded-md bg-white text-[var(--color-navy)] text-[13.5px] sm:text-[14px] font-semibold px-3.5 sm:px-5 hover:bg-slate-100 transition-colors"
        >
          {label} →
        </Link>
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.setItem(DISMISS_KEY, "1");
            } catch {}
            setDismissed(true);
          }}
          aria-label="Dismiss"
          // 44×44 minimum touch target so it doesn't get mis-tapped
          // against the adjacent primary CTA on mobile. Adds an
          // explicit ml to push it slightly clear of the CTA edge.
          className="ml-0.5 inline-flex items-center justify-center w-11 h-11 rounded-md text-white/75 hover:text-white hover:bg-white/10 transition-colors shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
