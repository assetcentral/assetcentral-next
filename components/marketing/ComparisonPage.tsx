// ComparisonPage — shared template for the five /compare/* detail
// pages. Each page is a thin wrapper that imports its config from
// lib/compare.ts and renders this template with it.
//
// Sections, top-to-bottom:
//   1. Breadcrumb        — Home → How it works → Compare options → [this]
//   2. Hero              — H1 + sub + dual CTA + disclaimer
//   3. Positioning       — short paragraph framing the comparison
//   4. Summary table     — 9 standardised dimensions, side-by-side
//   5. When to use       — fair, balanced — when other / when AC
//   6. AI team           — the five-agent panel (why AC is different)
//   7. Model/Monitor/Manage block
//   8. Example scenario
//   9. FAQ + JSON-LD FAQPage schema
//  10. Cross-links       — the other four comparisons
//  11. Final CTA         — signup + internal-link block
//
// Tone: confident but fair. No competitor-bashing. Compliance language
// baked into the hero and FAQ closing.

import Link from "next/link";
import type { CompareConfig, CompareSlug } from "@/lib/compare";
import { COMPARISONS, COMPARISON_SLUGS } from "@/lib/compare";

interface ComparisonPageProps {
  config: CompareConfig;
}

const DISCLAIMER_LINE =
  "AssetCentral provides decision-support tools and information. It does not provide financial, tax, legal or investment advice.";

const AI_TEAM = [
  {
    acronym: "CEO",
    role: "Chief Executive Officer",
    line: "Strategy and priorities — ranks the next three things across the portfolio.",
    accent: "var(--color-ceo-mid)",
  },
  {
    acronym: "CIO",
    role: "Chief Investment Officer",
    line: "Investment modelling — hold, sell, refinance and acquisition scenarios with IRR + cash-on-cash.",
    accent: "var(--color-cio-mid)",
  },
  {
    acronym: "CFO",
    role: "Chief Financial Officer",
    line: "Cash flow and financial monitoring — net yield, debt, liquidity, rate-reset alerts.",
    accent: "var(--color-cfo-mid)",
  },
  {
    acronym: "COO",
    role: "Chief Operations Officer",
    line: "Operations and execution — leases, occupancy, maintenance follow-through.",
    accent: "var(--color-coo-mid)",
  },
  {
    acronym: "PA",
    role: "Personal Assistant",
    line: "Documents, tasks and coordination — routes every question to the right specialist.",
    accent: "var(--color-pa-mid)",
  },
] as const;

const MMM_PILLARS = [
  {
    name: "Model",
    href: "/model",
    line: "Build every property as a financial object — rent, mortgage, costs, yield. Pressure-test hold, sell, refinance and acquisition scenarios.",
  },
  {
    name: "Monitor",
    href: "/monitor",
    line: "Watch the portfolio live — net yield, cash flow, lease state, debt position, market drift. Flag what's moving off target.",
  },
  {
    name: "Manage",
    href: "/manage",
    line: "Turn signals into a ranked action list. Reminders fire on time. Tasks get tracked. Reports stay current.",
  },
] as const;

export function ComparisonPage({ config }: ComparisonPageProps) {
  const otherSlugs = COMPARISON_SLUGS.filter((s) => s !== config.slug);

  // FAQ JSON-LD — sibling of the Organization schema in the root layout.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // Breadcrumb JSON-LD — helps Google render the trail in search results.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://assetcentral.ai/" },
      { "@type": "ListItem", position: 2, name: "Compare options", item: "https://assetcentral.ai/compare/" },
      {
        "@type": "ListItem",
        position: 3,
        name: `AssetCentral ${config.shortLabel}`,
        item: `https://assetcentral.ai/compare/${config.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-white border-b border-[var(--color-border)]"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-4">
          <ol
            className="flex flex-wrap items-center gap-2 text-[12.5px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <li>
              <Link href="/" className="hover:text-[var(--color-navy)]">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/compare/" className="hover:text-[var(--color-navy)]">
                Compare options
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-[var(--color-navy)] font-medium" aria-current="page">
              AssetCentral {config.shortLabel}
            </li>
          </ol>
        </div>
      </nav>

      {/* ── 2. Hero ────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-12 lg:pt-20 pb-10 lg:pb-14">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Compare · AssetCentral {config.shortLabel}
          </p>
          <h1
            className="text-[40px] sm:text-[48px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {config.h1}
          </h1>
          <p
            className="mt-6 text-[17px] lg:text-[19px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {config.subheadline}
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              {config.ctaPrimary} →
            </Link>
            <Link
              href="/compare/"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              See all comparisons
            </Link>
          </div>
          <p
            className="mt-4 text-[12.5px] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {DISCLAIMER_LINE}
          </p>
        </div>
      </section>

      {/* ── 3. Positioning + optional clarifier ─────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-14 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The honest comparison
          </p>
          <p
            className="text-[17px] lg:text-[19px] leading-[1.65] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {config.positioning}
          </p>
          {config.clarify ? (
            <p
              className="mt-5 rounded-lg bg-white border border-[var(--color-border)] px-5 py-4 text-[14.5px] leading-[1.6] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span className="font-semibold text-[var(--color-navy)]">To be clear: </span>
              {config.clarify}
            </p>
          ) : null}
        </div>
      </section>

      {/* ── 4. Summary comparison table ────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Summary comparison
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Side-by-side on nine dimensions.
          </h2>

          {/* Desktop / tablet: real table. Mobile-friendly via horizontal
              scroll on the wrapper. Each row uses three columns: label,
              other, AssetCentral. */}
          <div
            className="mt-10 overflow-x-auto rounded-xl border border-[var(--color-border)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <table className="w-full text-[14.5px] min-w-[640px]">
              <caption className="sr-only">
                {`AssetCentral compared to ${config.otherName} on nine dimensions`}
              </caption>
              <thead>
                <tr className="text-left bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                  <th scope="col" className="font-semibold py-3 px-4 text-[12px] uppercase tracking-[0.1em] text-[var(--color-muted)] w-[28%]">
                    Dimension
                  </th>
                  <th scope="col" className="font-semibold py-3 px-4 text-[13px] text-[var(--color-navy)]">
                    {config.otherName}
                  </th>
                  <th scope="col" className="font-semibold py-3 px-4 text-[13px] text-[var(--color-accent)]">
                    AssetCentral
                  </th>
                </tr>
              </thead>
              <tbody>
                {config.summaryRows.map((r, i) => (
                  <tr
                    key={r.dimension}
                    className={`border-b border-[var(--color-border)] ${
                      i % 2 === 0 ? "bg-white" : "bg-[var(--color-surface)]/40"
                    } last:border-0`}
                  >
                    <th scope="row" className="text-left font-semibold py-3 px-4 text-[var(--color-navy)] align-top">
                      {r.dimension}
                    </th>
                    <td className="py-3 px-4 text-[var(--color-ink)] leading-[1.55] align-top">
                      {r.other}
                    </td>
                    <td className="py-3 px-4 text-[var(--color-ink)] leading-[1.55] align-top">
                      {r.assetcentral}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bullet lists below the table — same content, less dense. */}
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-5" style={{ fontFamily: "var(--font-sans)" }}>
              <h3
                className="text-[18px] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {config.otherName}
              </h3>
              <ul className="mt-3 space-y-2 text-[14.5px] leading-[1.55] text-[var(--color-ink)]">
                {config.otherPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span aria-hidden className="text-[var(--color-muted)] shrink-0 mt-[2px]">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl p-5 border"
              style={{
                fontFamily: "var(--font-sans)",
                borderColor: "var(--color-accent)",
                backgroundColor: "rgba(79, 110, 247, 0.04)",
              }}
            >
              <h3
                className="text-[18px] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                AssetCentral
              </h3>
              <ul className="mt-3 space-y-2 text-[14.5px] leading-[1.55] text-[var(--color-ink)]">
                {config.acPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span aria-hidden className="text-[var(--color-accent)] shrink-0 mt-[2px]">›</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. When to use each option ──────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            When to use each option
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Both can be the right call — it depends on the job.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-5" style={{ fontFamily: "var(--font-sans)" }}>
            <div className="rounded-xl bg-white border border-[var(--color-border)] p-6">
              <div className="text-[12px] uppercase tracking-wider font-semibold text-[var(--color-muted)] mb-2">
                Use {config.otherName.toLowerCase()} when
              </div>
              <p className="text-[15px] leading-[1.65] text-[var(--color-ink)]">
                {config.whenToUse.useOther}
              </p>
            </div>
            <div
              className="rounded-xl p-6 border"
              style={{
                borderColor: "var(--color-accent)",
                backgroundColor: "rgba(79, 110, 247, 0.04)",
              }}
            >
              <div className="text-[12px] uppercase tracking-wider font-semibold text-[var(--color-accent)] mb-2">
                Use AssetCentral when
              </div>
              <p className="text-[15px] leading-[1.65] text-[var(--color-ink)]">
                {config.whenToUse.useAc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Why AssetCentral is different — the AI team ──────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Why AssetCentral is different
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One AI team. Five roles. One coordinated answer.
          </h2>
          <p
            className="mt-5 text-[16px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            You own the properties. Your AI team does the modelling, monitoring and managing.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {AI_TEAM.map((a) => (
              <Link
                key={a.acronym}
                href={`/ai-property-${a.acronym.toLowerCase()}`}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5 hover:border-[var(--color-navy)] transition-colors block"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: a.accent }}
                  />
                  <span
                    className="text-[18px] text-[var(--color-navy)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {a.acronym}
                  </span>
                </div>
                <div className="mt-1 text-[11.5px] uppercase tracking-wide text-[var(--color-muted)]">
                  {a.role}
                </div>
                <p className="mt-3 text-[13px] leading-[1.55] text-[var(--color-ink)]">
                  {a.line}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Model / Monitor / Manage ─────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How it works
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Model. Monitor. Manage.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4" style={{ fontFamily: "var(--font-sans)" }}>
            {MMM_PILLARS.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="rounded-xl border border-[var(--color-border)] bg-white p-6 hover:border-[var(--color-navy)] transition-colors block"
              >
                <div
                  className="text-[22px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.name}
                </div>
                <p className="mt-3 text-[14px] leading-[1.6] text-[var(--color-ink)]">
                  {p.line}
                </p>
                <div className="mt-4 text-[13px] text-[var(--color-accent)] font-semibold">
                  How {p.name} works →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Example scenario ─────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Example scenario
          </p>
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {config.scenario.title}
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[17.5px] leading-[1.7] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {config.scenario.body}
          </p>
          <p
            className="mt-5 text-[12px] text-[var(--color-muted)] italic"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Illustrative scenario based on a typical AssetCentral workflow.
          </p>
        </div>
      </section>

      {/* ── 9. FAQ ─────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            FAQ
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Questions owners ask first.
          </h2>
          <dl className="mt-10 space-y-4" style={{ fontFamily: "var(--font-sans)" }}>
            {config.faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl bg-white border border-[var(--color-border)] px-5 py-4"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <dt className="text-[16px] leading-[1.4] font-semibold text-[var(--color-navy)]">
                    {f.question}
                  </dt>
                  <span
                    aria-hidden
                    className="text-[var(--color-muted)] shrink-0 transition-transform group-open:rotate-180 mt-1"
                  >
                    ▾
                  </span>
                </summary>
                <dd className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink)]">
                  {f.answer}
                </dd>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 10. Cross-links to the other comparisons ────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            See the other comparisons
          </p>
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How AssetCentral compares with every other option.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherSlugs.map((s) => {
              const c = COMPARISONS[s];
              return (
                <Link
                  key={s}
                  href={`/compare/${s}/`}
                  className="rounded-xl border border-[var(--color-border)] bg-white p-5 hover:border-[var(--color-navy)] transition-colors block"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <div className="text-[11.5px] uppercase tracking-wider text-[var(--color-muted)] font-semibold mb-1">
                    AssetCentral {c.shortLabel}
                  </div>
                  <p className="text-[14px] leading-[1.55] text-[var(--color-ink)]">
                    {c.cardText.split(".")[0]}.
                  </p>
                  <div className="mt-3 text-[13px] text-[var(--color-accent)] font-semibold">
                    Compare →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 11. Final CTA ──────────────────────────────────────────── */}
      <section className="bg-white border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-16 lg:py-24 text-center">
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Add your first property. Meet your AI team.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            From €19/month, 7-day free trial, no card required. {DISCLAIMER_LINE}
          </p>
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link href="/signup" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors">
              {config.ctaPrimary}
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors">
              See pricing
            </Link>
            <Link href="/features" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors">
              All features
            </Link>
            <Link href="/calculators" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors">
              Try the calculators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** Helper for detail-page wrappers — pulls config + Next.js Metadata.
 *  Uses title.absolute so the root layout's "%s | AssetCentral" template
 *  doesn't append a second brand suffix (every metaTitle is already
 *  brand-suffixed in lib/compare.ts). */
export function getComparisonMetadata(slug: CompareSlug) {
  const config = COMPARISONS[slug];
  return {
    config,
    metadata: {
      title: { absolute: config.metaTitle },
      description: config.metaDescription,
      alternates: { canonical: `/compare/${slug}/` },
      openGraph: {
        title: config.metaTitle,
        description: config.metaDescription,
        type: "website" as const,
        url: `https://assetcentral.ai/compare/${slug}/`,
      },
      twitter: {
        card: "summary_large_image" as const,
        title: config.metaTitle,
        description: config.metaDescription,
      },
    },
  };
}
