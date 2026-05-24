"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Fires Plausible custom events as the user scrolls past 25%, 50%, 75%, and
 * 100% of the page. Each milestone fires at most once per page view.
 *
 * Use on long-form pages where engagement is meaningful (articles, calculators).
 *
 * The custom event in Plausible is `scroll_depth` with a `pct` prop. Set up a
 * "Custom Event" goal in Plausible with name `scroll_depth` to track in the UI.
 */
export function ScrollDepth({ page }: { page?: string }) {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    function compute() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 100;
      return Math.min(100, Math.round((window.scrollY / max) * 100));
    }

    function onScroll() {
      const pct = compute();
      for (const m of MILESTONES) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m);
          try {
            window.plausible?.("scroll_depth", {
              props: {
                pct: String(m),
                ...(page ? { page } : {}),
              },
            });
          } catch {}
        }
      }
    }

    // Some pages are short enough that the user is already at 100% on load.
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  return null;
}
