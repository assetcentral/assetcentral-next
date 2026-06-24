// Brand campaign + FAQ — the slogan strip and the few short answers
// that prospects ask before they trust the free check.

import Link from "next/link";

const SLOGANS: string[] = [
  "Before you buy, run the numbers first.",
  "Before you sell, run the numbers first.",
  "Before you refinance, run the numbers first.",
  "Before you renovate, run the numbers first.",
  "Before you rent it out, run the numbers first.",
];

interface Faq {
  q: string;
  a: string;
}

const FAQS: Faq[] = [
  {
    q: "Is it really free?",
    a: "Yes. Eight Level-1 tools + the AI property check are free, with no card required. You only see an email field when you choose to save or send the report. Paid plans start at €19/mo and unlock the full property decision report, 10-year forecast, scenarios and saved properties.",
  },
  {
    q: "What's the difference between a mortgage calculator and AssetCentral?",
    a: "A mortgage calculator tells you the payment. AssetCentral tells you whether the property makes sense — yield, cash flow, the single biggest red flag and the one change that would improve the deal. Property decisions are too expensive to guess.",
  },
  {
    q: "Do I need an account to use the tools?",
    a: "No. Every Level-1 tool runs in the browser without an account. You only create one when you want to save a property, generate a PDF report, or unlock the deeper paid analysis (scenarios, sell-vs-hold, refinance modelling, portfolio dashboard).",
  },
  {
    q: "Who is AssetCentral built for?",
    a: "Anyone making a property decision. Buyers and owners use the free tools. Owners of 2-50 properties use Pro for the full agent team, monitoring and lender-ready packs. Brokers, mortgage advisors and accountants use AssetCentral with clients (see partner options).",
  },
  {
    q: "How accurate are the AI verdicts?",
    a: "The numbers are deterministic — same arithmetic a credit committee runs (cash flow, DSCR, yield). The verdict + red flag + next move are guidance, not financial advice. For a property you're seriously considering, run the full Pro report — 10-year forecast, scenarios and tax-adjusted analysis.",
  },
];

export function BrandCampaignSection() {
  return (
    <section
      aria-label="Property decisions are too expensive to guess"
      className="bg-[color:var(--color-navy)] text-white"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
        {/* ── Slogan strip ───────────────────────────────────────── */}
        <div className="text-center">
          <p
            className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)] font-semibold mb-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Run the numbers first
          </p>
          <h2
            className="text-[34px] lg:text-[48px] leading-[1.15] tracking-tight max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Property decisions are too expensive to guess.
          </h2>
        </div>

        <ul
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 max-w-3xl mx-auto text-[15px] lg:text-[16px] text-white/85"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {SLOGANS.map((s) => (
            <li key={s} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent)] flex-shrink-0"
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>

        <p
          className="mt-10 text-center text-[15px] lg:text-[16px] text-white/65 max-w-2xl mx-auto italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          &ldquo;A mortgage calculator tells you the payment. AssetCentral
          tells you whether the property makes sense.&rdquo;
        </p>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <div
          className="mt-16 lg:mt-20 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <h3
            className="text-[22px] lg:text-[28px] text-white text-center mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Common questions
          </h3>
          <dl className="divide-y divide-white/15 border-y border-white/15">
            {FAQS.map((f) => (
              <FaqRow key={f.q} faq={f} />
            ))}
          </dl>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/check"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-white text-[color:var(--color-navy)] text-[14.5px] font-semibold transition hover:bg-white/90"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Check a property for free →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FaqRow({ faq }: { faq: Faq }) {
  return (
    <details className="group py-5">
      <summary
        className="flex items-baseline justify-between gap-4 cursor-pointer list-none text-[15.5px] lg:text-[16.5px] font-semibold text-white"
      >
        <span>{faq.q}</span>
        <span
          aria-hidden
          className="text-[color:var(--color-accent)] text-[20px] leading-none transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="mt-3 text-[14.5px] leading-[1.6] text-white/75">
        {faq.a}
      </p>
    </details>
  );
}
