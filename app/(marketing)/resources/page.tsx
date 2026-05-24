import type { Metadata } from "next";
import Link from "next/link";
import { LeadMagnetsSection } from "@/components/marketing/LeadMagnetsSection";

export const metadata: Metadata = {
  title: "Guides for serious property investors | AssetCentral",
  description:
    "Practical, specific guides for financially literate landlords. Net yield, off-plan handover, STR operator performance.",
  alternates: { canonical: "/resources" },
};

const articles = [
  {
    slug: "portfolio-baseline-audit",
    title: "Know what you actually own — the portfolio baseline audit",
    blurb:
      "Most landlords think they know their yield. Run this six-data-point audit and you will usually find it differs by 80–200 basis points from the figure in your head.",
    readMins: 9,
  },
  {
    slug: "lift-yield-90-days",
    title: "Lift portfolio yield in 90 days — the four levers",
    blurb:
      "Four levers move yield. Most landlords pull only one. Here is how to pull all four — cost, rent, use, improvements — in the right order, in 90 days.",
    readMins: 10,
  },
  {
    slug: "yield-protection",
    title:
      "Keep yield from sliding back — the 11 things quietly eroding your portfolio",
    blurb:
      "Lifting yield is the easy part. The hard part is keeping it there. The eleven yield killers most landlords miss, grouped by category, with the alerts that catch each one.",
    readMins: 8,
  },
  {
    slug: "winners-and-losers",
    title: "Spot winners, prune losers, buy the next one well",
    blurb:
      "Every portfolio has a quiet loser. Identifying it changes the conversation from 'should I buy another?' to 'should I sell the bottom one and trade up?'",
    readMins: 10,
  },
  {
    slug: "mortgage-types-explained",
    title:
      "Mortgage types explained: fixed, variable, fix-then-revert, repayment, interest-only",
    blurb:
      "The five mortgage structures every property investor needs to understand. Repayment vs interest-only, fixed vs variable, the UK fix-then-revert pattern — what each costs over a 25-year hold and who they suit.",
    readMins: 9,
  },
  {
    slug: "mortgage-rules-by-country",
    title:
      "Mortgage rules by country: how the UAE, UK, France, Spain, Portugal, Greece, Germany, and Switzerland differ",
    blurb:
      "LTV caps, term limits, transfer taxes, stress tests, and the rules non-residents actually run into across the eight major investor markets.",
    readMins: 11,
  },
  {
    slug: "net-yield-vs-gross-yield",
    title: "Gross yield vs net yield — and why it matters more than you think",
    blurb:
      "Why headline gross yield numbers are misleading, how to calculate real net yield, and a worked Dubai example where 7% gross turns into 3.8% net.",
    readMins: 7,
  },
  {
    slug: "off-plan-handover-options",
    title: "Off-plan handover and you can't complete: four options",
    blurb:
      "When a stage payment is due and the liquidity isn't there. Honest walk-through of completion finance, secondary-market sale, and operator negotiation.",
    readMins: 8,
  },
  {
    slug: "str-operator-performance-check",
    title: "Is your STR operator earning their 25%?",
    blurb:
      "How to read a short-term rental operator statement, what to expect for the commission, and three questions to ask before renewing.",
    readMins: 6,
  },
  {
    // Added May 2026 — feeds the UK Google Ads campaign targeting
    // British investors with Dubai property. High organic-search
    // potential for "UK tax Dubai rental" type queries.
    slug: "uk-tax-on-dubai-property",
    title: "UK tax on Dubai property: what British landlords need to know",
    blurb:
      "Income tax on Dubai rental via SA106, UK CGT on sale, SDLT surcharge implications, and personal-vs-corporate structuring. Plain-language orientation for UK residents owning Dubai property.",
    readMins: 10,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-10">
          <div className="max-w-3xl">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Resources
            </p>
            <h1
              className="text-[44px] lg:text-[56px] leading-[1.05] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Guides for serious property investors.
            </h1>
            <p
              className="mt-5 text-[17px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Not a blog. No opinion pieces, listicles, or &ldquo;10 tips&rdquo; content. Only practical, specific guides written for a financially literate landlord.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 pb-20">
          <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/resources/${a.slug}`}
                  className="block py-7 group"
                >
                  <h2
                    className="text-[24px] lg:text-[26px] leading-[1.2] text-[var(--color-navy)] group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {a.title}
                  </h2>
                  <p
                    className="mt-2 text-[15px] leading-[1.6] text-[var(--color-ink)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {a.blurb}
                  </p>
                  <div
                    className="mt-3 text-[12.5px] text-[var(--color-muted)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {a.readMins} min read · Read guide →
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LeadMagnetsSection />
    </>
  );
}
