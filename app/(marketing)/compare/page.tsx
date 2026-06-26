// /compare/ — parent landing page for the five comparison surfaces.
//
// Renders five cards (one per comparison), a short Model/Monitor/Manage
// explainer, the five-agent AI team panel, and CTAs into the main
// product surfaces. Each card links to /compare/[slug].

import type { Metadata } from "next";
import Link from "next/link";
import { COMPARISONS, COMPARISON_SLUGS } from "@/lib/compare";

const TITLE = "Compare Property Portfolio Tools | AssetCentral";
const DESCRIPTION =
  "Compare AssetCentral with spreadsheets, property management software, accounting software, broker valuations and family office support for managing property portfolios.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/compare/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://assetcentral.ai/compare/",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const DISCLAIMER_LINE =
  "AssetCentral provides decision-support tools and information. It does not provide financial, tax, legal or investment advice.";

const MMM = [
  { name: "Model", href: "/model", line: "Hold, sell, refinance, acquire — scenarios with IRR and cash-on-cash." },
  { name: "Monitor", href: "/monitor", line: "Live yield, cash flow, lease state, debt position." },
  { name: "Manage", href: "/manage", line: "Ranked priorities, tasks, reminders and follow-up." },
] as const;

const AI_TEAM = [
  { acronym: "CEO", role: "Chief Executive Officer", line: "Strategy + priorities", accent: "var(--color-ceo-mid)", href: "/ai-property-ceo" },
  { acronym: "CIO", role: "Chief Investment Officer", line: "Investment modelling", accent: "var(--color-cio-mid)", href: "/ai-property-cio" },
  { acronym: "CFO", role: "Chief Financial Officer", line: "Cash flow + yield + debt", accent: "var(--color-cfo-mid)", href: "/ai-property-cfo" },
  { acronym: "COO", role: "Chief Operations Officer", line: "Operations + leases", accent: "var(--color-coo-mid)", href: "/ai-property-coo" },
  { acronym: "PA", role: "Personal Assistant", line: "Documents + tasks + coordination", accent: "var(--color-pa-mid)", href: "/ai-property-pa" },
] as const;

export default function CompareIndexPage() {
  // Breadcrumb JSON-LD — Home → Compare options.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://assetcentral.ai/" },
      { "@type": "ListItem", position: 2, name: "Compare options", item: "https://assetcentral.ai/compare/" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-4">
          <ol
            className="flex flex-wrap items-center gap-2 text-[12.5px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <li><Link href="/" className="hover:text-[var(--color-navy)]">Home</Link></li>
            <li aria-hidden>›</li>
            <li className="text-[var(--color-navy)] font-medium" aria-current="page">Compare options</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-12 lg:pt-20 pb-12">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Compare options
          </p>
          <h1
            className="text-[40px] sm:text-[48px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Compare AssetCentral with other ways to manage a property portfolio.
          </h1>
          <p
            className="mt-6 text-[17px] lg:text-[19px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            See how AssetCentral helps private owners and investors move beyond spreadsheets and disconnected tools to model, monitor and manage portfolio performance with an AI property team.
          </p>
          <p
            className="mt-4 text-[12.5px] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {DISCLAIMER_LINE}
          </p>
        </div>
      </section>

      {/* Five comparison cards */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Five honest comparisons
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Spreadsheets and tools help you store information. AssetCentral helps turn property data into decisions.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {COMPARISON_SLUGS.map((slug) => {
              const c = COMPARISONS[slug];
              return (
                <Link
                  key={slug}
                  href={`/compare/${slug}/`}
                  className="rounded-xl border border-[var(--color-border)] bg-white p-6 lg:p-7 hover:border-[var(--color-navy)] transition-colors block"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <div className="text-[11.5px] uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-2">
                    AssetCentral {c.shortLabel}
                  </div>
                  <h3
                    className="text-[22px] lg:text-[24px] text-[var(--color-navy)] leading-[1.2]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {c.otherName}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-ink)]">
                    {c.cardText}
                  </p>
                  <div className="mt-5 text-[13.5px] font-semibold text-[var(--color-accent)]">
                    {c.cardCta} →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Model / Monitor / Manage */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How AssetCentral works
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Capture. Structure. Model. Monitor. Manage.
          </h2>
          <p
            className="mt-5 text-[16px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Five stages, one operating layer. The framework every comparison below is built around.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-4" style={{ fontFamily: "var(--font-sans)" }}>
            {MMM.map((p) => (
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

      {/* AI team */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The AI team
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One team. Five specialists. One coordinated answer.
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
                href={a.href}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5 hover:border-[var(--color-navy)] transition-colors block"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: a.accent }} />
                  <span className="text-[18px] text-[var(--color-navy)]" style={{ fontFamily: "var(--font-display)" }}>
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

      {/* Final CTA */}
      <section className="bg-white">
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
            From €19/month. 7-day free trial. No card required.
          </p>
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link href="/signup" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors">
              Start with your first property
            </Link>
            <Link href="/#team" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors">
              Meet the AI team
            </Link>
            <Link href="/features" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors">
              All features
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors">
              Pricing
            </Link>
            <Link href="/calculators" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors">
              Calculators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
