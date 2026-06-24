// "What do you want to check?" — decision router under the new
// "Run the numbers first" hero.
//
// 2026-06 Phase 2 repositioning. The grid lists the seven property
// decisions AssetCentral helps people think through, each landing on
// the matching free tool or, in the portfolio case, the Pro story.
// The seven B2C cards lead with the user's situation; the eighth
// (portfolio owner) is intentionally smaller / quieter so the front
// door stays consumer-friendly.

import Link from "next/link";

interface DecisionCard {
  /** First-person framing — "I'm …". */
  who: string;
  /** Card body — what AssetCentral checks for them. */
  body: string;
  /** Free tool the CTA opens. */
  href: string;
  /** CTA label inside the card. */
  cta: string;
  /** Coloured dot — uses an existing role / state token. */
  dotColor: string;
}

const DECISIONS: DecisionCard[] = [
  {
    who: "I'm buying a property",
    body: "Check affordability, yield, cash flow and risk before you make an offer.",
    href: "/check",
    cta: "Check a purchase",
    dotColor: "var(--color-accent)",
  },
  {
    who: "I'm selling a property",
    body: "Check whether selling now makes more sense than holding.",
    href: "/calculators/sell-or-hold",
    cta: "Run sell or hold",
    dotColor: "var(--color-positive)",
  },
  {
    who: "I'm taking a mortgage",
    body: "Calculate the payment, then check if the property still makes sense.",
    href: "/calculators/mortgage",
    cta: "Use mortgage calculator",
    dotColor: "var(--color-cfo-mid)",
  },
  {
    who: "I'm refinancing",
    body: "Compare your current loan with a new loan and see the cash flow impact.",
    href: "/calculators/refinance",
    cta: "Check refinance",
    dotColor: "var(--color-cio-mid)",
  },
  {
    who: "I'm doing works",
    body: "Estimate whether renovation spend creates enough rent or value uplift.",
    href: "/calculators/retrofit",
    cta: "Check works ROI",
    dotColor: "var(--color-warning)",
  },
  {
    who: "I'm renting out",
    body: "Find the rent you need to cover costs and hit your return target.",
    href: "/calculators/rent-out",
    cta: "Check rent",
    dotColor: "var(--color-coo-mid)",
  },
  {
    who: "I'm comparing short-let vs long-let",
    body: "See whether short-term holiday letting would beat a normal tenant.",
    href: "/calculators/str-yield",
    cta: "Compare lets",
    dotColor: "var(--color-pa-mid)",
  },
];

export function WhatToCheckSection() {
  return (
    <section
      id="what-to-check"
      aria-label="Decide what to check"
      className="bg-[color:var(--color-surface)] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            START HERE
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What do you want to check?
          </h2>
          <p
            className="mt-3 text-[16px] lg:text-[17px] leading-[1.55] text-[color:var(--color-ink)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pick the situation closest to yours. Each one runs in under a
            minute and ends with a plain-English AI view — no card required.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DECISIONS.map((d) => (
            <DecisionCardItem key={d.who} card={d} />
          ))}
        </div>

        {/* Quiet eighth row — portfolio owner sit-down. Visually
            separated so the consumer journey above stays the lead. */}
        <div
          className="mt-8 rounded-2xl border border-[color:var(--color-border)] bg-white p-6 lg:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div className="max-w-2xl">
            <div
              className="text-[12px] uppercase tracking-[0.12em] text-[color:var(--color-muted)] font-semibold mb-1"
            >
              OR
            </div>
            <h3
              className="text-[20px] lg:text-[22px] text-[color:var(--color-navy)] font-semibold"
            >
              I own multiple properties
            </h3>
            <p className="mt-1.5 text-[14.5px] text-[color:var(--color-ink)]">
              Move from spreadsheets to AssetCentral Pro — five AI agents,
              monitoring, lender-ready packs.
            </p>
          </div>
          <Link
            href="#pro"
            className="inline-flex items-center justify-center min-h-[44px] px-5 rounded-md border border-[color:var(--color-navy)] text-[color:var(--color-navy)] text-[14px] font-semibold transition hover:bg-[color:var(--color-navy)] hover:text-white"
          >
            Explore Pro →
          </Link>
        </div>
      </div>
    </section>
  );
}

function DecisionCardItem({ card }: { card: DecisionCard }) {
  return (
    <Link
      href={card.href}
      className="group block rounded-2xl bg-white border border-[color:var(--color-border)] p-6 transition hover:border-[color:var(--color-navy)] hover:shadow-[0_12px_32px_-18px_rgba(15,23,42,0.25)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          aria-hidden
          className="inline-block w-2.5 h-2.5 rounded-full"
          style={{ background: card.dotColor }}
        />
        <p className="text-[13px] uppercase tracking-[0.08em] text-[color:var(--color-muted)] font-semibold">
          {card.who}
        </p>
      </div>
      <p className="text-[15.5px] leading-[1.55] text-[color:var(--color-ink)]">
        {card.body}
      </p>
      <p className="mt-4 text-[14px] font-semibold text-[color:var(--color-accent)] group-hover:underline">
        {card.cta} →
      </p>
    </Link>
  );
}
