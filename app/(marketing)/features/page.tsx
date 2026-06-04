import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import {
  AcquisitionMini,
  AlertsMini,
  CashflowMini,
  IngestionMini,
  LoanMini,
  OperatorMini,
  PortfolioMini,
  RefinanceMini,
  ScoreMini,
  SellHoldMini,
  YieldOptMini,
} from "@/components/marketing/FeatureMinis";

export const metadata: Metadata = {
  title: "Features",
  // Was 197 chars; trimmed to ~155.
  description:
    "What your AC Agent Team does — real net yield, loan tracker, cashflow calendar, data ingestion, sell-vs-hold, acquisition simulator and decision reports.",
  alternates: { canonical: "/features" },
};

type FeatureBlock = {
  number: string;
  jobName: string;
  jobHeadline: string;
  intro: string;
  blocks: {
    title: string;
    bullets: string[];
    mockup: React.ReactNode;
    flip?: boolean;
  }[];
};

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <div className="max-w-3xl">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Features
            </p>
            <h1
              className="text-[44px] lg:text-[56px] leading-[1.05] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your AC Agent Team. Every property. Every month.
            </h1>
            <p
              className="mt-5 text-[17px] lg:text-[19px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Five agents — Your CEO, Finance Manager, Market Analyst, Operations Manager and Portfolio Personal Assistant — do the things a professional team does inside a property fund, but for private owners and investors with 2 to 50 properties across one or more countries.
            </p>
          </div>
        </div>
      </section>

      {features.map((f, i) => (
        <JobSection key={f.number} feature={f} alt={i % 2 === 1} />
      ))}

      {/* Comparison table */}
      <ComparisonTable />

      {/* End CTA */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-20 text-center">
          <h2
            className="text-[32px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Add your first property in 5 minutes.
          </h2>
          <p
            className="mt-4 text-[16.5px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            See your real yield. Let your CEO rank the actions that could improve returns. Free for up to 3 properties — 7-day trial on Pro.
          </p>
          <div className="mt-7">
            <Link
              href="/signup?plan=pro_monthly&intent=direct"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Subscribe now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function JobSection({ feature, alt }: { feature: FeatureBlock; alt: boolean }) {
  return (
    <section className={alt ? "bg-[var(--color-surface)]" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="num text-[var(--color-accent)] text-[22px] font-semibold">
              {feature.number}
            </span>
            <span
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {feature.jobName}
            </span>
          </div>
          <h2
            className="text-[32px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {feature.jobHeadline}
          </h2>
          <p
            className="mt-3 text-[16px] italic text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {feature.intro}
          </p>
        </div>

        <div className="mt-14 space-y-16">
          {feature.blocks.map((b, i) => (
            <div
              key={b.title}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
                (b.flip ?? i % 2 === 1) ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <h3
                  className="text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-navy)] mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {b.title}
                </h3>
                <ul className="space-y-2.5">
                  {b.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span
                        aria-hidden
                        className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-navy)] flex-shrink-0"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>{b.mockup}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Mini mockups: see components/marketing/FeatureMinis.tsx -------- */


/* -------- Content -------- */

const features: FeatureBlock[] = [
  {
    number: "01",
    jobName: "The Set-Up",
    jobHeadline: "See what's going on",
    intro: "Before you can improve your portfolio, you need to see it clearly. Most owners don't.",
    blocks: [
      {
        title: "Your whole portfolio. One number that actually means something.",
        bullets: [
          "Real net yield per asset — after vacancy, costs, mortgage, fees, tax",
          "Multi-currency conversion to your base currency, daily FX",
          "Colour-coded performance signals at a glance",
        ],
        mockup: <PortfolioMini />,
      },
      {
        title: "Know what's coming before your bank reminds you.",
        bullets: [
          "Rate reversion alerts 90 days out",
          "Full payment history per loan, per currency",
          "Automatic cashflow impact when a rate changes",
        ],
        mockup: <LoanMini />,
        flip: true,
      },
      {
        title: "No cashflow surprises. Ever.",
        bullets: [
          "Stage payments, mortgages, capex, rent — one calendar",
          "12 months ahead, every currency converted",
          "Alert when any month is projected to go negative",
        ],
        mockup: <CashflowMini />,
      },
    ],
  },
  {
    number: "02",
    jobName: "The Uplift",
    jobHeadline: "Improve what you earn",
    intro: "Your portfolio is probably earning less than it should. AssetCentral finds the gap and quantifies it.",
    blocks: [
      {
        title: "Your rent, benchmarked against what the market is actually paying.",
        bullets: [
          "Area median rent from market data",
          "Monthly upside calculated in your currency",
          "Rent review date tracked per tenancy",
        ],
        mockup: <YieldOptMini />,
      },
      {
        title: "Is your short-term rental operator earning their 25%?",
        bullets: [
          "Verifies statements against expected bookings and rates",
          "Flags under-performance vs market occupancy",
          "Models self-management vs agency cost",
        ],
        mockup: <OperatorMini />,
        flip: true,
      },
      {
        title: "The bank wants a pack. We build it in minutes.",
        bullets: [
          "Rent roll, valuation evidence, DSCR calculation",
          "Comparable transactions assembled from your portfolio data",
          "Branded PDF, ready to send",
        ],
        mockup: <RefinanceMini />,
      },
    ],
  },
  {
    number: "03",
    jobName: "The Workhorse",
    jobHeadline: "Checks you don't have time to do",
    intro: "The unglamorous work that protects your returns. AssetCentral does it so you don't have to.",
    blocks: [
      {
        title: "Forward it. We read it.",
        bullets: [
          "Email statements, WhatsApp documents, photographed invoices",
          "AI extracts key dates and amounts",
          "Everything filed against the right asset automatically",
        ],
        mockup: <IngestionMini />,
      },
      {
        title: "Nothing slips through. Ever.",
        bullets: [
          "22 distinct alert types covering loans, cashflow, yield, documents",
          "Email daily digest or WhatsApp for critical alerts",
          "Snooze, dismiss, or convert to a task",
        ],
        mockup: <AlertsMini />,
        flip: true,
      },
    ],
  },
  {
    number: "04",
    jobName: "The Winners",
    jobHeadline: "Better decisions, better timing",
    intro: "Real estate returns are made at the margin — by people with better information and faster execution.",
    blocks: [
      {
        title: "A portfolio score. And the reasoning behind it.",
        bullets: [
          "Yield vs benchmark, leverage levels, cashflow resilience",
          "Upcoming risk events combined into a single score",
          "Plain-English action bullets, not just a number",
        ],
        mockup: <ScoreMini />,
      },
      {
        title: "At what price does selling outperform holding? We model it for every asset.",
        bullets: [
          "Capital gain vs cumulative yield NPV",
          "Off-plan value acceleration curve near handover",
          "Optimal exit window recommendation",
        ],
        mockup: <SellHoldMini />,
        flip: true,
      },
      {
        title: "See the portfolio-wide impact before you commit.",
        bullets: [
          "Simulate any new property",
          "Compare base / bull / bear scenarios",
          "Blended yield before vs after acquisition",
        ],
        mockup: <AcquisitionMini />,
      },
    ],
  },
];

/* -------- Comparison table moved to components/marketing/ComparisonTable.tsx -------- */
