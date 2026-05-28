// Two-pill switcher that surfaces both explainer videos from the top
// of either demo page. Previously the cross-link between the two videos
// only existed in the closing CTA at the bottom of each page — on
// mobile that means scrolling past the entire long-form page before
// realising there's a second video.
//
// Renders as a horizontal chip strip:
//   [ • What is AssetCentral? · 90s ]   [ Get started in 60s → ]
// Current page's pill is highlighted (filled white), the other is
// outlined and acts as a link to the other video.

import Link from "next/link";

type DemoKey = "explainer" | "get-started";

const TABS: { key: DemoKey; label: string; sub: string; href: string }[] = [
  {
    key: "explainer",
    label: "What is AssetCentral?",
    sub: "90-second pitch",
    href: "/demo/60",
  },
  {
    key: "get-started",
    label: "How to get started",
    sub: "60-second walkthrough",
    href: "/demo/get-started",
  },
];

export function DemoVideoSwitcher({ current }: { current: DemoKey }) {
  return (
    <nav
      aria-label="Demo videos"
      className="mx-auto max-w-5xl px-6 lg:px-10 pt-4 sm:pt-6"
    >
      <div
        className="flex flex-col sm:flex-row gap-2 sm:gap-3"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {TABS.map((tab) => {
          const isCurrent = tab.key === current;
          if (isCurrent) {
            return (
              <div
                key={tab.key}
                aria-current="page"
                className="flex items-center gap-2.5 rounded-lg bg-white text-[#0a0e27] px-3.5 py-2 sm:py-2.5"
              >
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#4f6ef7] shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[13.5px] font-semibold leading-tight">
                    {tab.label}
                  </div>
                  <div className="text-[11px] text-black/55 leading-tight mt-0.5">
                    Now playing · {tab.sub}
                  </div>
                </div>
              </div>
            );
          }
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className="flex items-center justify-between gap-2.5 rounded-lg border border-white/20 text-white px-3.5 py-2 sm:py-2.5 hover:border-white/40 hover:bg-white/[0.04] transition-colors group"
            >
              <div className="min-w-0">
                <div className="text-[13.5px] font-semibold leading-tight">
                  {tab.label}
                </div>
                <div className="text-[11px] text-white/55 leading-tight mt-0.5">
                  {tab.sub}
                </div>
              </div>
              <span
                aria-hidden
                className="text-white/55 group-hover:text-white shrink-0 text-[14px]"
              >
                →
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
