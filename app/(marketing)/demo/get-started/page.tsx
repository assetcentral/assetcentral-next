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
            How to use AssetCentral in 60 seconds.
          </h1>
          <p
            className="mt-6 text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.55] text-white/80 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A short, beginner-friendly walkthrough. Add a property, see the
            numbers, compare scenarios, and export a clear report — no
            financial-modelling experience required.
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
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div
            className="flex items-baseline justify-between gap-4 mb-3 flex-wrap"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <h2 className="text-[18px] lg:text-[22px]" style={{ fontFamily: "var(--font-display)" }}>
              The 60-second tutorial
            </h2>
            <span className="text-[12.5px] lg:text-[13.5px] text-white/55">
              8 steps · silent walkthrough
            </span>
          </div>
        </div>
        {/* Video — md+ only. Same reason as /demo/60: the 1920×1080
            canvas inside ExplainerVideoV2 scales unreadably small on
            phones. We render a step-by-step text equivalent below at
            <md so phone visitors actually learn how to get started
            rather than squinting at a 2px-tall scene. */}
        <div className="hidden md:block mx-auto max-w-5xl sm:px-6 lg:px-10">
          <div className="overflow-hidden sm:rounded-xl sm:border sm:border-white/10 sm:shadow-2xl">
            <ExplainerVideoV2
              embedded
              shots={SHOTS_GET_STARTED}
              subtitles={[]}
              silent
              totalMs={70000}
              variantLabel=""
            />
          </div>
        </div>

        {/* Mobile alternative — the same getting-started flow as text.
            The 8 detailed steps section that follows below is for both
            desktop and mobile (it's already text). This card is just
            the punchy 5-beat summary the video covers. */}
        <div className="md:hidden mx-auto max-w-2xl px-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get started in 60 seconds
            </p>
            <ol
              className="space-y-4 text-[15px] text-white/80 leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <li>
                <strong className="text-white">Add your first property.</strong>{" "}
                Type the address, or forward a contract by email. AssetCentral
                fills in the rest automatically.
              </li>
              <li>
                <strong className="text-white">See your numbers.</strong>{" "}
                Net yield, monthly cashflow, equity, debt — calculated from
                the data you (or the AI) entered. In your base currency.
              </li>
              <li>
                <strong className="text-white">Compare scenarios.</strong>{" "}
                What if you raised the rent? Refinanced? Switched to
                short-let? Use the calculators to model each before you
                commit.
              </li>
              <li>
                <strong className="text-white">Export a clear report.</strong>{" "}
                Investor-grade PDF you can send to a lender, accountant or
                advisor — built from the numbers you modelled.
              </li>
              <li>
                <strong className="text-white">Repeat for every property.</strong>{" "}
                Same flow scales from one property to fifty. The portfolio
                dashboard rolls them up into a single view.
              </li>
            </ol>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p
                className="text-[13px] text-white/55 leading-relaxed"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                The animated walkthrough is best on a tablet or desktop. Open
                this page on a bigger screen to watch the dashboard in
                motion.
              </p>
            </div>
          </div>
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
