// AgentSeoPage — shared template for the five /ai-property-* SEO
// landing pages. Each page is a thin wrapper that imports its config
// from lib/agent-seo.ts and renders this template with it. Keeping
// the structure in one place means the five surfaces stay
// consistently designed and the page wrappers stay small enough to
// read at a glance.
//
// Sections, top-to-bottom:
//   1. Hero       — eyebrow + H1 + sub + dual CTA + portrait
//   2. Role       — explanation paragraph in owner language
//   3. Capabilities — 7 cards
//   4. Questions  — "Ask your AI [ROLE]" example questions
//   5. Output     — one realistic illustrative output quote-card
//   6. M/M/M map  — which pillar(s) the agent contributes to + links
//   7. Cross-links — meet the other four agents
//   8. FAQ        — 4–6 questions with JSON-LD FAQPage schema
//   9. CTA        — Start with your first property / Meet the team
//
// Premium tone: no AI hype, no autoplay animations, no exclamation
// marks. Decision-support language throughout.

import Image from "next/image";
import Link from "next/link";
import type { AgentSeoConfig, AgentSlug } from "@/lib/agent-seo";
import { AGENTS, AGENT_SLUGS } from "@/lib/agent-seo";

interface AgentSeoPageProps {
  agent: AgentSeoConfig;
}

/** Pillar-to-page map for the M/M/M section. Coordinate has no
 *  dedicated page yet — render as plain text without a link. */
const PILLAR_HREF: Record<string, string | null> = {
  Model: "/model",
  Monitor: "/monitor",
  Manage: "/manage",
  Coordinate: null,
};

export function AgentSeoPage({ agent }: AgentSeoPageProps) {
  // FAQ JSON-LD — Google reads the FAQPage type to render a rich
  // result in search. Inline-stringified for SSG; no client JS.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: agent.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const otherAgents = AGENT_SLUGS.filter((s) => s !== agent.slug);

  return (
    <>
      {/* JSON-LD FAQPage. Rendered as a script tag in the head-equivalent
          position so SSR ships it with the initial HTML payload. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── 1. Hero ────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12 lg:pb-16">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <p
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-semibold mb-5"
                style={{
                  color: agent.accent.deepVar,
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: agent.accent.midVar }}
                />
                AssetCentral · {agent.roleTitle}
              </p>
              <h1
                className="text-[40px] sm:text-[48px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {agent.h1}
              </h1>
              <p
                className="mt-6 text-[17px] lg:text-[19px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {agent.subheadline}
              </p>
              <div
                className="mt-8 flex flex-col sm:flex-row gap-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <Link
                  href="/signup"
                  className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
                >
                  Start with your first property →
                </Link>
                <Link
                  href="/#team"
                  className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
                >
                  Meet the full AI team
                </Link>
              </div>
              <p
                className="mt-4 text-[13px] text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                From €19/month. 7-day free trial, no card required.
              </p>
            </div>

            {/* Portrait — generous size, role-tinted ring + halo behind. */}
            <div className="relative mx-auto lg:mx-0 max-w-[320px] w-full">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[40%] blur-2xl opacity-50"
                style={{ backgroundColor: agent.accent.tintVar }}
              />
              <div
                className="relative rounded-2xl overflow-hidden ring-4 shadow-xl"
                style={{ borderColor: agent.accent.midVar }}
              >
                <Image
                  src={agent.portraitSrc}
                  alt={`Portrait of the AssetCentral AI ${agent.roleTitle}`}
                  width={640}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div
                  className="px-4 py-3 text-white text-center"
                  style={{ backgroundColor: agent.accent.midVar }}
                >
                  <div
                    className="text-base font-bold leading-none"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {agent.acronym}
                  </div>
                  <div
                    className="text-[11px] uppercase tracking-wide mt-0.5 opacity-95"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {agent.roleTitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Role explanation ────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What this agent actually does
          </p>
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Owner-side, not analyst-side.
          </h2>
          <p
            className="mt-5 text-[16.5px] lg:text-[18px] leading-[1.65] text-[var(--color-ink)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {agent.roleExplanation}
          </p>
        </div>
      </section>

      {/* ── 3. Capabilities ────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What this agent helps with
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Seven jobs across your portfolio.
          </h2>
          <ul
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {agent.capabilities.map((c) => (
              <li
                key={c}
                className="rounded-xl border border-[var(--color-border)] bg-white px-5 py-4 text-[15px] leading-[1.5] text-[var(--color-ink)] flex items-start gap-3"
              >
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 mt-2 rounded-full shrink-0"
                  style={{ backgroundColor: agent.accent.midVar }}
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 4. Example questions ──────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Ask your AI {agent.acronym}
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The questions owners actually ask.
          </h2>
          <ul
            className="mt-10 grid sm:grid-cols-2 gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {agent.exampleQuestions.map((q) => (
              <li
                key={q}
                className="rounded-xl bg-white border border-[var(--color-border)] px-5 py-4 text-[15px] leading-[1.5] text-[var(--color-ink)] flex items-start gap-3"
              >
                <span
                  aria-hidden
                  className="text-[var(--color-muted)] shrink-0 mt-[2px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5. Example output ─────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Example output
          </p>
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What your {agent.acronym} reports back.
          </h2>
          <div
            className="mt-10 rounded-2xl p-8 lg:p-10 relative"
            style={{
              backgroundColor: agent.accent.tintVar,
              borderLeft: `4px solid ${agent.accent.midVar}`,
            }}
          >
            <div
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] font-bold mb-4"
              style={{
                color: agent.accent.deepVar,
                fontFamily: "var(--font-sans)",
              }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: agent.accent.midVar }}
              />
              {agent.acronym} · illustrative output
            </div>
            <p
              className="text-[17px] lg:text-[19px] leading-[1.7] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {agent.exampleOutput}
            </p>
            <p
              className="mt-5 text-[12px] text-[var(--color-muted)] italic"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Illustrative — your {agent.acronym} draws on your real portfolio data once your first property is on file.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. M/M/M mapping ──────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How it fits the framework
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Capture. Structure. Model. Monitor. Manage.
          </h2>
          <p
            className="mt-5 text-[16.5px] leading-[1.65] text-[var(--color-ink)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {agent.pillarRationale}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" style={{ fontFamily: "var(--font-sans)" }}>
            {agent.pillars.map((p) => {
              const href = PILLAR_HREF[p];
              const active = agent.pillars.includes(p);
              const className = `inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold border ${
                active
                  ? "text-white"
                  : "bg-white text-[var(--color-muted)] border-[var(--color-border)]"
              }`;
              const style = active
                ? {
                    backgroundColor: agent.accent.midVar,
                    borderColor: agent.accent.midVar,
                  }
                : undefined;
              if (href) {
                return (
                  <Link key={p} href={href} className={className} style={style}>
                    {p} →
                  </Link>
                );
              }
              return (
                <span key={p} className={className} style={style}>
                  {p}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. Cross-links — meet the rest of the team ────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The rest of the team
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One team. One coordinated answer.
          </h2>
          <p
            className="mt-5 text-[16px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            You own the properties. Your AI team does the modelling, monitoring and managing.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherAgents.map((slug) => {
              const a = AGENTS[slug];
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="rounded-xl border border-[var(--color-border)] bg-white p-5 hover:border-[var(--color-navy)] transition-colors block"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={a.portraitSrc}
                      alt={`Portrait of the AssetCentral AI ${a.roleTitle}`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div
                        className="text-[18px] text-[var(--color-navy)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {a.acronym}
                      </div>
                      <div className="text-[12px] text-[var(--color-muted)] leading-tight">
                        {a.roleTitle}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-[1.55] text-[var(--color-ink)]">
                    {a.subheadline.split(".")[0]}.
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-24">
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
          <dl
            className="mt-10 space-y-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {agent.faqs.map((f) => (
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

      {/* ── 9. Final CTA + internal links ─────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-16 lg:py-24 text-center">
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Add your first property. Meet your team.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Your AI {agent.acronym} starts work the moment your first property is on file. From €19/month, 7-day free trial, no card required.
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
            <Link
              href="/features"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              All features
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              Try the calculators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** Helper for page wrappers — pulls the agent config and the page's
 *  Next.js Metadata object out of the shared data module so the
 *  individual page.tsx files stay one-liners. Uses `title.absolute`
 *  so the root layout's "%s | AssetCentral" template doesn't append
 *  a second brand suffix (every metaTitle already ends in
 *  "| AssetCentral"). */
export function getAgentMetadata(slug: AgentSlug) {
  const agent = AGENTS[slug];
  return {
    agent,
    metadata: {
      title: { absolute: agent.metaTitle },
      description: agent.metaDescription,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        title: agent.metaTitle,
        description: agent.metaDescription,
        type: "website" as const,
        url: `https://assetcentral.ai/${slug}`,
        images: [
          {
            url: agent.portraitSrc,
            width: 640,
            height: 800,
            alt: `AssetCentral AI ${agent.roleTitle}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image" as const,
        title: agent.metaTitle,
        description: agent.metaDescription,
      },
    },
  };
}
