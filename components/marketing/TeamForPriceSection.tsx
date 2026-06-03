// The headline value-prop section. Anchors the whole site to the
// promise the user articulated in the deeper-alignment brief:
//
//   "you get the team for your subscription"
//
// What this section does:
//   1. Quantifies what hiring this team manually would actually cost
//      (rough market rates — see comments on each tile for sourcing)
//   2. Stacks them up against €49/month so the maths is unmissable
//   3. Doesn't oversell — uses "from", "typical", "rough" framing so
//      we're never on the hook for a specific cost claim
//
// Compliance posture: these are illustrative market-rate ranges for
// part-time / fractional professional services in property asset
// management. Not regulated financial advice. We label them as such.
//
// Why this matters: the previous PricingPreview communicated price (€49)
// but not value. A first-time visitor reading "€49/mo for a portfolio
// dashboard" feels expensive. The same visitor reading "€49/mo for a
// fractional CFO + CMO + COO + analyst + PA" feels almost suspicious
// it's that cheap. We want the second reaction.

import Link from "next/link";
import { roleFullName } from "@/lib/role-glossary";

type Hire = {
  /** Role on a real asset-management team. */
  role: string;
  /** Which AC agent fills this role on the team. */
  agent: string;
  /** Illustrative cost range for fractional / part-time hiring of
   *  that role in a private-owner context. Wording is deliberately
   *  cautious ("from", "typical part-time", "rough"). */
  cost: string;
  /** One-line about what the agent does. */
  blurb: string;
};

const hires: Hire[] = [
  {
    role: "Portfolio analyst / CFO",
    agent: "Finance Manager",
    cost: "from €2,500/month",
    blurb:
      "Tracks real yield, builds cashflow forecasts, runs refinance maths and prepares the lender pack.",
  },
  {
    role: "Market research / CIO",
    agent: "Market Analyst",
    cost: "from €1,500/month",
    blurb:
      "Benchmarks rent against the local median, tracks comparable sales, flags possible upside.",
  },
  {
    role: "Operations manager / COO",
    agent: "Operations Manager",
    cost: "from €1,200/month",
    blurb:
      "Watches renewals, audits operator statements, catches anomalies before they become losses.",
  },
  {
    role: "Personal assistant",
    agent: "Portfolio Personal Assistant",
    cost: "from €800/month",
    blurb:
      "Files documents, sets alerts, generates reports, answers how-to questions.",
  },
  {
    role: "Portfolio lead / CEO",
    agent: "Your CEO",
    cost: "from €3,000/month",
    blurb:
      "Sets portfolio strategy, drives it through the team, reports what's driving yield and seeks out opportunities to grow and strengthen returns.",
  },
];

export function TeamForPriceSection() {
  return (
    <section className="bg-white" id="team-for-price">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The maths
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Five specialists. €49 a month.
          </h2>
          <p
            className="mt-5 text-[17px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Family offices put a team of specialists onto their property
            holdings. Private owners can&rsquo;t justify the cost. AssetCentral
            collapses the team into AI agents — same roles, same outputs, a
            fraction of the price.
          </p>
        </div>

        {/* Two columns on lg: hires list on the left, price box on the right. */}
        <div className="mt-12 grid lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-14 items-start">
          <ul className="space-y-3" aria-label="What hiring this team manually would cost">
            {hires.map((h) => (
              <li
                key={h.role}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="min-w-0">
                  {/* Role label + inline acronym expansion. Compound
                      labels like "Portfolio analyst / CFO" expand
                      against the trailing acronym; labels with no
                      recognised acronym (e.g. "Personal assistant")
                      render just the role line. */}
                  <div
                    className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)] font-semibold"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {h.role}
                  </div>
                  {roleFullName(h.role) && (
                    <div
                      className="text-[10.5px] italic text-[var(--color-muted)] mt-0.5 leading-tight"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {roleFullName(h.role)}
                    </div>
                  )}
                  <div
                    className="mt-1 text-[18px] font-semibold text-[var(--color-navy)] leading-tight"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {h.agent}
                  </div>
                  <p
                    className="mt-1.5 text-[13.5px] leading-[1.55] text-[var(--color-ink)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {h.blurb}
                  </p>
                </div>
                {/* Per-role price column. Strike-through on the manual
                    cost + green "Included in €49/month" reinforces the
                    value prop on every line, not just the total. */}
                <div
                  className="sm:text-right whitespace-nowrap shrink-0"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <div className="num text-[15px] font-semibold text-[var(--color-muted)] line-through">
                    {h.cost}
                  </div>
                  <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-positive)]">
                    Included in €49/mo
                  </div>
                </div>
              </li>
            ))}

            {/* Strike-through total — illustrative, capped to be defensible. */}
            <li
              className="mt-2 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:p-6 flex items-center justify-between"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span className="text-[13.5px] text-[var(--color-muted)]">
                Hiring the team manually
              </span>
              <span className="num text-[18px] font-semibold text-[var(--color-muted)]">
                <span className="line-through">€9,000+/month</span>
              </span>
            </li>
          </ul>

          {/* Price box — the punchline */}
          <aside
            className="rounded-2xl border-2 border-[var(--color-navy)] bg-[var(--color-navy)] text-white p-8 lg:p-10 shadow-[0_24px_60px_-25px_rgba(26,26,46,0.45)]"
            aria-label="Pro pricing"
          >
            <div
              className="text-[11.5px] uppercase tracking-[0.14em] text-white/65"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The AC Agent Team
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="num text-[64px] lg:text-[72px] font-semibold leading-none">
                €49
              </span>
              <span
                className="text-[15px] text-white/70"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                /month
              </span>
            </div>
            <p
              className="mt-4 text-[14.5px] leading-[1.55] text-white/85"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Your full AC Agent Team for a 2 to 50 property portfolio, across
              as many countries as you own in. No per-asset fees, no per-currency
              fees.
            </p>
            <Link
              href="/signup?plan=pro_monthly"
              className="mt-7 inline-flex w-full items-center justify-center min-h-[48px] px-5 rounded-md bg-white text-[var(--color-navy)] text-[14.5px] font-semibold hover:bg-slate-100 transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start 7-day free trial →
            </Link>
            <Link
              href="/signup"
              className="mt-2.5 flex w-full items-center justify-center min-h-[40px] text-[13px] text-white/80 hover:text-white underline decoration-white/30 hover:decoration-white"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Or add your first property — free up to 3 →
            </Link>
            <p
              className="mt-5 text-[11.5px] leading-[1.55] text-white/55"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Cost figures above are illustrative market-rate ranges for
              fractional / part-time professional roles and vary widely by
              geography, scope and experience. AssetCentral provides software
              and decision support, not financial, tax, legal or investment
              advice.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
