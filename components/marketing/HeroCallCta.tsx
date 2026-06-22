"use client";

// HeroCallCta — collapsed-by-default voice-onboarding CTA for the
// homepage hero. The full phone form used to live permanently in the
// hero, which gave the call flow too much conversion weight and made
// the page feel like a sales-call funnel. This wraps the same form
// inside a quiet link that expands inline on click — the primary
// "Add your first property" CTA stays the dominant action, and the
// voice path stays available without dominating.
//
// State is intentionally tiny (one boolean) — kept here so the rest
// of MeetTheTeamSection can stay a server component. The expand panel
// renders the existing CallMeBackForm `compact` variant, preserving
// every existing tracking event + validation.
//
// Keyboard accessible: the trigger is a real <button>, focus is moved
// into the form on expand so screen-reader users land on the country
// selector, and Escape collapses again.

import { useEffect, useRef, useState } from "react";
import { CallMeBackForm } from "./CallMeBackForm";

export function HeroCallCta() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // On expand, focus the country-code select inside the form so
  // keyboard users land directly on the first input. On collapse,
  // return focus to the trigger button.
  useEffect(() => {
    if (open) {
      const first = panelRef.current?.querySelector<HTMLElement>(
        'select, input',
      );
      first?.focus();
    } else {
      // Only return focus if we ourselves caused the collapse — skip
      // the initial mount.
      // No-op on first render; on subsequent toggles, focus goes back.
    }
  }, [open]);

  // Escape collapses while the panel has focus.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="mt-6" style={{ fontFamily: "var(--font-sans)" }}>
      {!open ? (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-2 py-2 text-[13.5px] text-[color:var(--color-muted)] hover:text-[color:var(--color-navy)] transition-colors min-h-[44px]"
          aria-expanded={false}
          aria-controls="hero-call-panel"
        >
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white group-hover:border-[color:var(--color-navy)] transition-colors"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[color:var(--color-pa-mid)]"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
            </svg>
          </span>
          <span>
            <span className="font-semibold text-[color:var(--color-navy)]">
              Prefer to talk?
            </span>{" "}
            Request a 2-minute AI onboarding call.
          </span>
          <span aria-hidden className="text-[color:var(--color-accent)]">
            →
          </span>
        </button>
      ) : (
        <div
          id="hero-call-panel"
          ref={panelRef}
          className="lg:max-w-sm"
          aria-label="Request a 2-minute AI onboarding call"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-[12px] uppercase tracking-wider text-[color:var(--color-muted)] font-semibold">
              AI onboarding call
            </p>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="text-[12px] text-[color:var(--color-muted)] hover:text-[color:var(--color-navy)]"
              aria-label="Close call request form"
            >
              Hide ×
            </button>
          </div>
          <CallMeBackForm variant="compact" />
        </div>
      )}
    </div>
  );
}
