// FAQ block + JSON-LD FAQPage schema for the 5 stage pillar pages
// (/capture, /structure, /model, /monitor, /manage).
//
// Two outputs per render:
//   1. <script type="application/ld+json"> with FAQPage schema —
//      Google picks this up for rich-result eligibility (the FAQ
//      accordion that appears under the search result).
//   2. Accessible <details> accordion UI — zero JS required, opens
//      on click, respects prefers-reduced-motion.
//
// Pattern lifted from components/marketing/AgentSeoPage.tsx so the
// two surfaces produce identical schema markup. Don't extend without
// keeping that one in sync.

export interface PillarFaqItem {
  q: string;
  a: string;
}

export function PillarFaq({
  heading = "Frequently asked questions",
  faqs,
}: {
  heading?: string;
  faqs: PillarFaqItem[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        aria-label={heading}
        className="bg-white border-y border-[color:var(--color-border)]"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-muted)] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            FAQ
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {heading}
          </h2>
          <ul className="mt-10 divide-y divide-[color:var(--color-border)]">
            {faqs.map((f) => (
              <li key={f.q}>
                <details className="group py-5">
                  <summary
                    className="flex items-start justify-between gap-4 cursor-pointer list-none text-[16.5px] lg:text-[18px] leading-[1.4] font-semibold text-[color:var(--color-navy)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span>{f.q}</span>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[14px] text-[color:var(--color-muted)] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="mt-3 text-[15px] lg:text-[16px] leading-[1.65] text-[color:var(--color-ink)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
