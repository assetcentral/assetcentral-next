// "Get started" walkthrough video. Sister page to /demo/60 — same component,
// different timeline. Where /demo/60 pitches WHAT AssetCentral is, this video
// shows HOW to actually get going: the four ways to add property data, then
// the three core outputs (dashboard, alerts, AI insights).

import type { Metadata } from "next";
import Link from "next/link";
import {
  ExplainerVideoV2,
  SHOTS_GET_STARTED,
} from "@/components/marketing/ExplainerVideoV2";

const TITLE = "How to get started with AssetCentral";
const DESCRIPTION =
  "Setting up your first property takes minutes. Type an address, upload a document, forward an email, or snap a WhatsApp photo — then see real net yield, alerts and AI insights.";

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

// Four ways in — restated below the video so visitors who skim or finish the
// video have a written summary to scan and act on.
const WAYS = [
  {
    title: "Type the address",
    note: "Auto-populates market rents, comps and DLD/HMRC/MLS ownership data.",
  },
  {
    title: "Upload a document",
    note: "Drag in a lease, mortgage statement, invoice — AI reads dates, amounts and terms.",
  },
  {
    title: "Forward an email",
    note: "Each property gets a unique inbox address. Rent statements file themselves.",
  },
  {
    title: "Snap on WhatsApp",
    note: "Take a photo of an invoice on your phone — it lands in the right property in seconds.",
  },
];

const OUTPUTS = [
  {
    title: "Live dashboard",
    note: "Real net yield, monthly cashflow, debt status — per property and portfolio-wide.",
  },
  {
    title: "Smart alerts",
    note: "Rate resets, voids, covenant breaches, renewal decisions — surfaced before they cost you.",
  },
  {
    title: "AI insights",
    note: "Ask any question. Sell vs hold, refinance timing, operator performance — modelled in real IRR.",
  },
];

export default function GetStartedPage() {
  return (
    <div style={{ backgroundColor: NAVY }} className="text-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 pt-14 lg:pt-20 pb-10">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AssetCentral · Get started
          </p>
          <h1
            className="text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Setting up your first property takes minutes.
          </h1>
          <p
            className="mt-6 text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.55] text-white/80 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Four ways to get going. Type an address, upload a document, forward an
            email, or snap a photo on WhatsApp. AI does the rest — and you get
            real net yield, alerts and decisions on day one.
          </p>
          <p
            className="mt-7 text-[20px] sm:text-[24px] lg:text-[28px] leading-tight"
            style={{ fontFamily: "var(--font-display)", color: ACCENT }}
          >
            Get going in 90 seconds.
          </p>
        </div>
      </section>

      {/* ── Video ────────────────────────────────────────────────────────── */}
      <section className="pb-14 lg:pb-20" id="video">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div
            className="flex items-baseline justify-between gap-4 mb-3 flex-wrap"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <h2 className="text-[18px] lg:text-[22px]" style={{ fontFamily: "var(--font-display)" }}>
              How to get going
            </h2>
            <span className="text-[12.5px] lg:text-[13.5px] text-white/55">
              90-second walkthrough · audio recommended
            </span>
          </div>
        </div>
        <div className="mx-auto max-w-5xl sm:px-6 lg:px-10">
          <div className="overflow-hidden sm:rounded-xl sm:border sm:border-white/10 sm:shadow-2xl">
            <ExplainerVideoV2
              embedded
              shots={SHOTS_GET_STARTED}
              subtitles={[]}
              silent
              totalMs={93000}
              variantLabel=""
            />
          </div>
        </div>
      </section>

      {/* ── Four ways ────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Inputs
          </p>
          <h2
            className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Four ways to get your data into AssetCentral.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WAYS.map((w, i) => (
              <div
                key={w.title}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="text-[11px] uppercase tracking-wider text-white/45">
                  Way {i + 1}
                </div>
                <div
                  className="text-[15px] text-white mt-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {w.title}
                </div>
                <div className="text-[12.5px] text-white/55 mt-1.5 leading-snug">
                  {w.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three outputs ────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Outputs
          </p>
          <h2
            className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What you see on day one.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {OUTPUTS.map((o) => (
              <div
                key={o.title}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div
                  className="text-[16px] text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {o.title}
                </div>
                <div className="text-[13px] text-white/60 mt-2 leading-snug">
                  {o.note}
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
            Start with one property. Add the rest as you go.
          </h2>
          <p
            className="mt-5 text-[16px] sm:text-[18px] lg:text-[20px] text-white/75 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            14-day free trial · no card required.
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
        </div>
      </section>
    </div>
  );
}
