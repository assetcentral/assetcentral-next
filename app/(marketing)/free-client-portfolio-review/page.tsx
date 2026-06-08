// Free first-client portfolio review — secondary landing page for the
// Dubai brokers Google Ads campaign. Lighter than /partners/dubai-brokers:
// no commission/partner-tier detail — just the offer, what's in the
// review, and a focused form.
//
// Targeted by ad groups 3, 4, 5 (Property Investor Clients, STR, Off-Plan).
// Form posts to the same /api/partner/apply endpoint as the dubai-brokers
// page (was previously a separate Netlify Forms target which only emailed
// the founder and never reached the database). Leads land in admin triage
// with partner_type='portfolio_review' so the source page is preserved.

import type { Metadata } from "next";
import Link from "next/link";
import { FreePortfolioReviewForm } from "@/components/marketing/FreePortfolioReviewForm";

const TITLE = "Free Client Portfolio Review";
const DESCRIPTION =
  "Dubai brokers: bring one investor client and we'll run an AI-powered portfolio review free. Real net yield, cashflow, short-term vs long-let, hold vs sell.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/free-client-portfolio-review" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    // images inherited from the global app/opengraph-image.tsx
  },
};

const NAVY = "#1a1a2e";
const ACCENT = "#4f6ef7";

const WHATS_INCLUDED = [
  { title: "Real net yield",          note: "After every cost — service charge, agent fees, financing, voids." },
  { title: "Cashflow forecast",       note: "12-month projection with live + scheduled events per property." },
  { title: "Short-term rental vs long-let",         note: "Modelled annual income under each rental strategy." },
  { title: "Hold vs sell",            note: "Modelled IRR for continued hold vs exit at today's market price." },
  { title: "Refinance scenarios",     note: "Test rate-reset, lender switch, capital release impact." },
  { title: "AI recommendations",      note: "Plain-English actions ranked by impact on portfolio return." },
];

const HOW_IT_WORKS = [
  { n: 1, title: "Submit one client's portfolio",       note: "Address, rent, mortgage, costs — whatever you have. PDFs welcome." },
  { n: 2, title: "AssetCentral runs the analysis",     note: "Typically 2 business days — we'll email you when the report is ready." },
  { n: 3, title: "Share the report with your client",  note: "Co-branded PDF available on eligible partner tiers." },
];

export default function FreeReviewPage() {
  return (
    <div className="bg-white text-[#1a1a2e]">
      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 px-4 py-3 flex gap-2">
        <a
          href="#submit"
          className="flex-1 inline-flex items-center justify-center min-h-[44px] rounded-md text-white text-sm font-semibold"
          style={{ backgroundColor: ACCENT }}
        >
          Submit client portfolio
        </a>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(79,110,247,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(79,110,247,0.12), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24 text-white">
          <p
            className="text-[12px] uppercase tracking-[0.28em] text-white/55 mb-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            For Dubai brokers · Free offer
          </p>
          <h1
            className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.05] tracking-tight max-w-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One client. Full portfolio review. On us.
          </h1>
          <p
            className="mt-6 text-[18px] sm:text-[20px] leading-[1.5] text-white/85 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Bring one investor client with a small portfolio. We&rsquo;ll show how
            AssetCentral turns scattered property data into clear decisions —
            and how the partner model can work for your agency.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <a
              href="#submit"
              className="inline-flex items-center justify-center min-h-[52px] rounded-md text-white px-7 text-[15px] font-semibold transition-colors"
              style={{ backgroundColor: ACCENT }}
            >
              Submit client portfolio →
            </a>
            <Link
              href="/partners/dubai-brokers"
              className="inline-flex items-center justify-center min-h-[52px] rounded-md border border-white/25 text-white px-7 text-[15px] font-medium hover:bg-white/5 transition-colors"
            >
              See the partner program
            </Link>
          </div>
          <p
            className="mt-7 text-[13px] text-white/50"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            One free review per agency. Subject to partner terms.
          </p>
        </div>
      </section>

      {/* ── What's included ────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What&rsquo;s in the review
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Six numbers. The whole portfolio.
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-gray-600 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Real numbers across every property — not generic market averages.
            Built from your client&rsquo;s own data and benchmarked against live
            Dubai comparables.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHATS_INCLUDED.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-gray-200 p-5"
              >
                <div
                  className="w-10 h-10 rounded-md inline-flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${ACCENT}15` }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                </div>
                <div
                  className="text-[16px] text-gray-900 mb-1.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.title}
                </div>
                <div
                  className="text-[13.5px] text-gray-600 leading-snug"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How it works
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Three steps. Forty-eight hours.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map((s) => (
              <div
                key={s.n}
                className="rounded-xl bg-white border border-gray-200 p-6"
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white text-[15px] font-semibold mb-4"
                  style={{ backgroundColor: ACCENT, fontFamily: "var(--font-sans)" }}
                >
                  {s.n}
                </div>
                <div
                  className="text-[17px] text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.title}
                </div>
                <div
                  className="text-[14px] text-gray-600 leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ───────────────────────────────────────────────────────── */}
      <section
        id="submit"
        className="px-6 lg:px-10 py-20 lg:py-28 text-white relative overflow-hidden scroll-mt-16"
        style={{ backgroundColor: NAVY }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% 100%, rgba(79,110,247,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/55 mb-4 text-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Submit your first client
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tell us about the client.
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-white/75 text-center max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Anonymise the name if you prefer — we just need enough to run the
            analysis. We&rsquo;ll email you within one business day.
          </p>

          <FreePortfolioReviewForm thanksPath="/free-client-portfolio-review/thanks" />

          <p
            className="mt-8 text-center text-[13px] text-white/55"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Want to see the full partner program first?{" "}
            <Link
              href="/partners/dubai-brokers"
              className="underline hover:text-white"
            >
              Read about broker partnerships
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

