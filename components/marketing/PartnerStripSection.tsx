// Partner strip — quiet bottom-of-funnel CTA for brokers, advisors,
// accountants and property advisors who want to offer the free
// Level 1 AI check to their own clients then refer serious users
// into the deeper Pro product.

import Link from "next/link";

export function PartnerStripSection() {
  return (
    <section
      aria-label="For brokers, mortgage advisors, accountants and property advisors"
      className="bg-white border-t border-[color:var(--color-border)] py-14 lg:py-16"
    >
      <div
        className="mx-auto max-w-5xl px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="max-w-2xl">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] font-semibold mb-3">
            FOR ADVISORS
          </p>
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.15] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Give your clients a better property check.
          </h2>
          <p className="mt-3 text-[15.5px] leading-[1.55] text-[color:var(--color-ink)]">
            Brokers, mortgage advisors, accountants and property advisors can
            offer free Level&nbsp;1 AI analysis to clients, then refer serious
            users into deeper reports and portfolio tools.
          </p>
        </div>
        <Link
          href="/partners"
          className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-[color:var(--color-navy)] text-white text-[14.5px] font-semibold transition hover:bg-[color:var(--color-navy-light)] shrink-0"
        >
          Explore partner options →
        </Link>
      </div>
    </section>
  );
}
