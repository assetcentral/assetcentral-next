// Manage — third pillar. Owns the SEO and ad-funnel for "should I
// sell or hold my property" / "refinance my portfolio" / "property
// portfolio scenarios" intent. Sister pages: /model, /monitor.

import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Manage your property portfolio — AssetCentral";
const DESCRIPTION =
  "Make the call the agents would make. Sell or hold? Refinance or wait? Switch to short-term? Scenarios, recommendations, and the co-branded report to back it up. From €49/month.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/manage" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
};

const DECISIONS = [
  {
    label: "Sell or hold",
    body:
      "Modelled IRR for continued ownership vs. exit at today's market price. Includes capital-gain tax exposure by jurisdiction.",
  },
  {
    label: "Refinance or wait",
    body:
      "Rate-reset impact, capital-release scenarios, product-switch comparison. Pulls live rates from the mortgage scanner.",
  },
  {
    label: "Switch to short-term",
    body:
      "Annualised income under short-term let vs. long-term, factoring local rules, voids, ops cost, and seasonality.",
  },
  {
    label: "Retrofit / improve",
    body:
      "Cost-of-works vs. uplift in rent or sale price. Includes EPC compliance and tax-deductibility by jurisdiction.",
  },
  {
    label: "Ownership structure",
    body:
      "Personal vs. corporate vs. JV — modelled for total return after tax and admin. Catches the cost of the wrong wrapper.",
  },
  {
    label: "Expand or consolidate",
    body:
      "How a candidate property fits the existing portfolio's risk, currency, and yield profile. Avoid concentration drift.",
  },
] as const;

const DELIVERABLES = [
  {
    label: "Board report",
    body:
      "Portfolio-wide one-pager: headline metrics, top moves, risks. PDF + Word.",
  },
  {
    label: "Refinancing pack",
    body:
      "Lender-ready document: current product, rate-reset timeline, target structure, comparable rates.",
  },
  {
    label: "Investor pitch",
    body:
      "Landscape presentation if you're raising co-investment or pitching the portfolio to a buyer.",
  },
  {
    label: "Single-asset deep-dive",
    body:
      "Per-property report covering yield, cashflow, hold-vs-sell IRR, refinance opportunity.",
  },
] as const;

const AGENTS_ON_MANAGE = [
  {
    name: "Portfolio Manager",
    role:
      "Owns sell/hold, refinance, and capital-allocation decisions. Models the scenarios end-to-end and ranks them by IRR uplift.",
  },
  {
    name: "Your CEO",
    role:
      "Owns the long-arc strategy — concentration, currency, jurisdiction. Writes the board report you can hand to anyone.",
  },
] as const;

const NAVY = "#1a1a2e";

export default function ManagePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pillar 03 · Manage
          </p>
          <h1
            className="text-[44px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Make the call the agents would make.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Sell or hold? Refinance or wait? Switch to short-term?
            AssetCentral runs the scenarios, ranks the recommendations,
            and writes the report you can hand to a lender, tenant, or
            accountant.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Run your first scenario →
            </Link>
            <Link
              href="/demo/60"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch the explainer
            </Link>
          </div>
          <p
            className="mt-4 text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free for up to 3 properties. No card required.
          </p>
        </div>
      </section>

      {/* ── Why management matters ──────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The yield that matters is the one you didn&rsquo;t leave behind.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A model that flags &ldquo;refinance window open&rdquo; is useful.
            A monitor that flags &ldquo;you&rsquo;re paying 1.2% above market&rdquo;
            is useful. Neither makes the call. Management is the layer
            where a portfolio stops drifting and starts compounding.
          </p>
        </div>
      </section>

      {/* ── Decisions you can run ───────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Decisions you can run
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Six scenarios. Live data. Ranked output.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DECISIONS.map((d) => (
              <div
                key={d.label}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div
                  className="text-[17px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {d.label}
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--color-ink)]">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What lands in your inbox
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Reports the agents write, ready to share.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Each scenario produces a document you can forward to a
            lender, accountant, tenant, or partner. PDF and Word, with
            optional co-branding for partners.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {DELIVERABLES.map((d) => (
              <div
                key={d.label}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div
                  className="text-[18px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {d.label}
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink)]">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agents on this pillar ───────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The agents on Manage
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Two agents lead this pillar.
          </h2>
          <div className="mt-10 grid lg:grid-cols-2 gap-5">
            {AGENTS_ON_MANAGE.map((a) => (
              <div
                key={a.name}
                className="rounded-xl border border-[var(--color-border)] bg-white p-6"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div
                  className="text-[22px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {a.name}
                </div>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-[var(--color-ink)]">
                  {a.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Back-to-pillars nav ─────────────────────────────────────── */}
      <section style={{ backgroundColor: NAVY }} className="text-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-white/55 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The framework
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Manage closes the loop. Model and Monitor make it possible.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-white/75 max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            You can&rsquo;t manage what you haven&rsquo;t modelled. You
            can&rsquo;t catch the moment to act without monitoring. The
            three pillars run as a cycle — every model produces things
            to monitor, every monitor surfaces things to manage.
          </p>
          <div
            className="mt-7 flex flex-wrap gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/model"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[14.5px] font-medium hover:bg-white/90 transition-colors"
            >
              How Model works →
            </Link>
            <Link
              href="/monitor"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-white/20 text-white text-[14.5px] font-medium hover:bg-white/5 transition-colors"
            >
              How Monitor works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-24 text-center">
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Run the scenario you&rsquo;ve been putting off.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free for up to 3 properties. The scenario engine runs as
            soon as one property is modelled.
          </p>
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Add your first property
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
