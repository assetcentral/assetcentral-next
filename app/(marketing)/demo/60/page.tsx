// Public-facing explainer page. Marketing page with the 72-second
// video embedded; a first-time visitor reads the page and understands
// what AssetCentral is before pressing play. Recording-mode lives at
// /demo/60/full for clean screen captures.

import type { Metadata } from "next";
import Link from "next/link";
import {
  ExplainerVideoV2,
  SHOTS_60,
} from "@/components/marketing/ExplainerVideoV2";

const TITLE = "What is AssetCentral? — Your AI Real Estate PA";
const DESCRIPTION =
  "AssetCentral uses AI to find, structure and interpret real property data, helping owners and investors with 2 to 50 properties make faster decisions and improve portfolio returns.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/demo/60" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const NAVY = "#0a0e27";
const ACCENT = "#4f6ef7";

const AUDIENCE = [
  "Property owners with 2 to 50 properties",
  "Residential portfolio investors",
  "Expat owners",
  "Short-term rental owners",
  "Off-plan investors",
  "Owners managing multiple countries or currencies",
];

const WHAT_YOU_SEE = [
  { title: "Real net yield",       note: "After every cost, per property and at portfolio level" },
  { title: "Monthly cashflow",     note: "12-month forecast and live actual" },
  { title: "Debt tracking",        note: "Balance, rate, payment schedule" },
  { title: "Loan maturity",        note: "Rate-reset alerts 90 days out" },
  { title: "Documents",            note: "AI-classified, one searchable vault" },
  { title: "Operator checks",      note: "Verify STR operator fees and yields" },
  { title: "Market benchmarks",    note: "Live comps from DLD, HMRC, MLS" },
  { title: "Sell-versus-hold",     note: "Modelled IRR for every property" },
];

export default function Demo60Page() {
  return (
    <div style={{ backgroundColor: NAVY }} className="text-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 pt-14 lg:pt-20 pb-10">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AssetCentral · Explainer
          </p>
          <h1
            className="text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your AI-powered return platform for real estate.
          </h1>
          <p
            className="mt-6 text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.55] text-white/80 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AssetCentral uses AI to find, structure and interpret real property
            data — helping owners and investors with 2 to 50 properties make
            faster decisions and improve portfolio returns.
          </p>
          <p
            className="mt-7 text-[20px] sm:text-[24px] lg:text-[28px] leading-tight"
            style={{ fontFamily: "var(--font-display)", color: ACCENT }}
          >
            Real data. Better decisions. Better returns.
          </p>
        </div>
      </section>

      {/* ── Video ────────────────────────────────────────────────────────── */}
      <section className="pb-14 lg:pb-20" id="video">
        {/* Heading stays inside the standard page padding */}
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div
            className="flex items-baseline justify-between gap-4 mb-3 flex-wrap"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <h2 className="text-[18px] lg:text-[22px]" style={{ fontFamily: "var(--font-display)" }}>
              What is AssetCentral?
            </h2>
            <span className="text-[12.5px] lg:text-[13.5px] text-white/55">
              A short explainer for owners and investors with 2 to 50 properties
            </span>
          </div>
        </div>
        {/* The video frame — md+ only. The 1920×1080 logical canvas
            inside ExplainerVideoV2 scales to fit its container, which
            on a 390px phone viewport works out to ~0.2× — every piece
            of body text inside the scenes (some as small as 8.5px in
            the logical canvas) renders at ~1.7px on the device. Even
            at fullscreen-portrait the math doesn't recover (Safari
            ignores orientation.lock so it stays portrait). Rather
            than pretend it's watchable on a phone, we hide it at
            <md and render the same beats as text below. */}
        <div className="hidden md:block mx-auto max-w-5xl sm:px-6 lg:px-10">
          <div className="overflow-hidden sm:rounded-xl sm:border sm:border-white/10 sm:shadow-2xl">
            <ExplainerVideoV2
              embedded
              shots={SHOTS_60}
              subtitles={[]}
              audioSrc="/demo-vo-60.mp3"
              totalMs={91000}
              variantLabel=""
            />
          </div>
        </div>

        {/* Mobile alternative — covers the same five beats as the video
            in legible body text. Visible only at <md. Last paragraph
            offers the video for anyone on a bigger screen. */}
        <div className="md:hidden mx-auto max-w-2xl px-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The 60-second version
            </p>
            <ol
              className="space-y-4 text-[15px] text-white/80 leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <li>
                <strong className="text-white">Your data, anywhere.</strong>{" "}
                Forward an email, drop a PDF, or take a photo of a contract.
                AssetCentral parses it into your portfolio automatically.
              </li>
              <li>
                <strong className="text-white">See your real return.</strong>{" "}
                Net yield after every cost — service charge, agency fee, void,
                tax — across every property, in your base currency.
              </li>
              <li>
                <strong className="text-white">Answer real questions.</strong>{" "}
                Should I sell or hold? Refinance? Switch to short-let? Pick
                the right tool and model the actual numbers.
              </li>
              <li>
                <strong className="text-white">Spot the signals.</strong>{" "}
                The radar scans HMLR, DLD, DVF and other government registers
                for price compression, volume spikes, and market drift in
                areas you own.
              </li>
              <li>
                <strong className="text-white">Act with confidence.</strong>{" "}
                Plain-English AI insights, exportable PDF reports, and the
                data behind every decision.
              </li>
            </ol>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p
                className="text-[13px] text-white/55 leading-relaxed"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                The animated version of this is best on a tablet or desktop —
                the screens we built for it pack a lot of detail into 90
                seconds. Open this page on a bigger screen to watch it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Who it&rsquo;s for
          </p>
          <h2
            className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built for owners and investors with 2 to 50 properties.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AUDIENCE.map((t) => (
              <div
                key={t}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] lg:text-[15px] text-white/85"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The problem
          </p>
          <h2
            className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your portfolio data is everywhere except in one place.
          </h2>
          <p
            className="text-[16px] lg:text-[18px] leading-[1.65] text-white/75"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Rent statements, debt, invoices, service charges, operator reports,
            documents and market data are scattered across emails, PDFs, bank
            accounts, portals and spreadsheets. The information that drives real
            returns is the information you can&rsquo;t see clearly.
          </p>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How it works
          </p>
          <h2
            className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Send us what you have. AI does the rest.
          </h2>
          <p
            className="text-[16px] lg:text-[18px] leading-[1.65] text-white/75"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Upload a lease, forward an email, photograph an invoice, import a
            calculator result, or add a property manually. AI extracts key
            dates, amounts, risks and insights — and links them to the right
            property automatically.
          </p>
        </div>
      </section>

      {/* ── What you see ─────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/45 mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What you see
          </p>
          <h2
            className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One intelligent workspace. Every decision a question away.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WHAT_YOU_SEE.map((c) => (
              <div
                key={c.title}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div
                  className="text-[15px] text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.title}
                </div>
                <div className="text-[12.5px] text-white/55 mt-1.5 leading-snug">
                  {c.note}
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
            Stop guessing what your portfolio is really earning.
          </h2>
          <p
            className="mt-5 text-[16px] sm:text-[18px] lg:text-[20px] text-white/75 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Use real data to make better decisions and improve returns.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="https://app.assetcentral.ai/signup"
              className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-white text-[#0a0e27] px-6 text-[14.5px] font-medium hover:bg-white/90 transition-colors"
            >
              Start with your first property →
            </Link>
            <Link
              href="#video"
              className="inline-flex items-center justify-center min-h-[48px] rounded-md border border-white/20 text-white px-6 text-[14.5px] font-medium hover:bg-white/5 transition-colors"
            >
              Watch the demo
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
