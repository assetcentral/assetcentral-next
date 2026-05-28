// "How to Use AssetCentral in 60 Seconds" tutorial walkthrough.
//
// Step-labeled beginner tutorial: welcomes the user, then steps through
// add a property, upload/manual, AI structures, dashboard, choose a tool,
// compare scenarios, AI insights, and export a report. Plays silent in
// the browser so the user can layer their own VO + music externally.

import type { Metadata } from "next";
import Link from "next/link";
import {
  ExplainerVideoV2,
  SHOTS_GET_STARTED,
} from "@/components/marketing/ExplainerVideoV2";
import { DemoVideoSwitcher } from "@/components/marketing/DemoVideoSwitcher";

const TITLE = "How to Use AssetCentral in 60 Seconds";
const DESCRIPTION =
  "A short, beginner-friendly walkthrough: add a property, see the numbers, compare scenarios, and export a clear report. No financial-modelling experience required.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/demo/get-started" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const NAVY = "#0a0e27";
const ACCENT = "#4f6ef7";

// Eight numbered steps shown below the video — gives skimmers and finished
// viewers a written summary they can scan and act on.
const STEPS = [
  { title: "Add your property",        note: "Enter the address, purchase price, rent, financing, and ownership basics." },
  { title: "Add your data",            note: "Upload a file, enter manually, forward an email, or send a photo via WhatsApp — AI handles the rest." },
  { title: "AI structures it",         note: "Scattered files become a clean investment view: price, rent, tenant, financing." },
  { title: "See the key numbers",      note: "Rental income, net yield, cashflow, IRR, and risk flags — at a glance." },
  { title: "Choose the right tool",    note: "IRR, rent review, hold/sell, refinance, STR vs long-let, portfolio roll-up." },
  { title: "Compare scenarios",        note: "See how rent uplifts, refinance, or an exit change the return." },
  { title: "AI explains the numbers",  note: "Specific actions to consider — not just data, real recommendations." },
  { title: "Export a clear report",    note: "Share with your advisor, lender, or partners as a PDF or a link." },
];

export default function GetStartedPage() {
  return (
    <div style={{ backgroundColor: NAVY }} className="text-white">
      {/* Video switcher — surfaces both explainer videos at the top so
          a mobile visitor can hop between "What is AssetCentral" and
          "How to get started" without scrolling to the closing CTA. */}
      <DemoVideoSwitcher current="get-started" />

      {/* ── Video-first hero ─────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 pt-6 lg:pt-8 pb-8" id="video">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap" style={{ fontFamily: "var(--font-sans)" }}>
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.25em] text-white/45 mb-1"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                AssetCentral · Get started
              </p>
              <h1
                className="text-[24px] sm:text-[28px] lg:text-[32px] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How to use AssetCentral in 60 seconds.
              </h1>
            </div>
            <span className="text-[12.5px] lg:text-[13.5px] text-white/55 max-w-xs text-right">
              8 steps · 80-second voice-over walkthrough
            </span>
          </div>
        </div>
        {/* Video frame — shown at all viewport sizes. Silent + autoplay
            means it starts on its own without a user gesture, which
            modern mobile browsers allow for muted videos. The fullscreen
            toggle in the controls lets users expand for a clearer view. */}
        <div className="mx-auto max-w-5xl sm:px-6 lg:px-10">
          <div className="overflow-hidden sm:rounded-xl sm:border sm:border-white/10 sm:shadow-2xl">
            <ExplainerVideoV2
              embedded
              shots={SHOTS_GET_STARTED}
              subtitles={[]}
              audioSrc="/demo-vo-get-started.mp3"
              totalMs={81000}
              variantLabel=""
            />
          </div>
          {/* Mobile-only fullscreen hint */}
          <p
            className="md:hidden mt-3 px-4 text-center text-[12.5px] text-white/55"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Tap to play · rotate to landscape and tap fullscreen for the
            clearest view
          </p>
        </div>
      </section>

      {/* ── Pitch / context (moved beneath the video) ──────────────────── */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A beginner-friendly walkthrough.
          </h2>
          <p
            className="mt-6 text-[17px] sm:text-[19px] leading-[1.55] text-white/80 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Add a property, see the numbers, compare scenarios, and export a
            clear report — no financial-modelling experience required.
          </p>
          <p
            className="mt-6 text-[20px] sm:text-[24px] leading-tight"
            style={{ fontFamily: "var(--font-display)", color: ACCENT }}
          >
            Real data. Better decisions. Better returns.
          </p>
        </div>
      </section>

      {/* ── Eight steps ──────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What you just saw
          </p>
          <h2
            className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Eight steps. One workflow.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="text-[11px] uppercase tracking-wider text-white/45">
                  Step {i + 1}
                </div>
                <div
                  className="text-[15px] text-white mt-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.title}
                </div>
                <div className="text-[12.5px] text-white/55 mt-1.5 leading-snug">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start with one property today.
          </h2>
          <p
            className="mt-5 text-[16px] sm:text-[18px] lg:text-[20px] text-white/75 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Real data. Better decisions. Better returns.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="https://app.assetcentral.ai/signup"
              className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-white text-[#0a0e27] px-6 text-[14.5px] font-medium hover:bg-white/90 transition-colors"
            >
              Add your first property →
            </Link>
            <Link
              href="/demo/60"
              className="inline-flex items-center justify-center min-h-[48px] rounded-md border border-white/20 text-white px-6 text-[14.5px] font-medium hover:bg-white/5 transition-colors"
            >
              Watch the full pitch
            </Link>
          </div>
          <p
            className="mt-6 text-[12.5px] text-white/45"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
