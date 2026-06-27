// Manage — third pillar. Owns the SEO and ad-funnel for "should I
// sell or hold my property" / "refinance my portfolio" / "property
// portfolio scenarios" intent. Sister pages: /model, /monitor.

import type { Metadata } from "next";
import Link from "next/link";

import {
  ActionPrioritySection,
  ManagementWorkflowSection,
  CeoBriefingSection,
  MissingDocumentsSection,
  BeforeAfterSection,
} from "@/components/marketing/mmm/manage-visuals";
import { PillarFaq } from "@/components/marketing/PillarFaq";

const TITLE = "Manage Property Portfolio Actions | AssetCentral";
const DESCRIPTION =
  "Map every debt maturity, model capital runway under stress, generate lender-ready refinance packs on demand. The capital-flexibility architecture funds use — for portfolios of 2 to 50 properties. €49/month.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/manage" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
};

const DECISIONS = [
  {
    label: "Sell or hold",
    body:
      "Modelled IRR for continued ownership vs. exit at today's market price. Includes capital-gain tax exposure by jurisdiction.",
  },
  {
    label: "Refinance or wait",
    body:
      "Rate-reset impact, capital-release scenarios, product-switch comparison. Pulls live rates from the mortgage scanner.",
  },
  {
    label: "Switch to short-term",
    body:
      "Annualised income under short-term let vs. long-term, factoring local rules, voids, ops cost, and seasonality.",
  },
  {
    label: "Retrofit / improve",
    body:
      "Cost-of-works vs. uplift in rent or sale price. Includes EPC compliance and tax-deductibility by jurisdiction.",
  },
  {
    label: "Ownership structure",
    body:
      "Personal vs. corporate vs. JV — modelled for total return after tax and admin. Catches the cost of the wrong wrapper.",
  },
  {
    label: "Expand or consolidate",
    body:
      "How a candidate property fits the existing portfolio's risk, currency, and yield profile. Avoid concentration drift.",
  },
] as const;

const DELIVERABLES = [
  {
    label: "Board report",
    body:
      "Portfolio-wide one-pager: headline metrics, top moves, risks. PDF + Word.",
  },
  {
    label: "Refinancing pack",
    body:
      "Lender-ready document: current product, rate-reset timeline, target structure, comparable rates.",
  },
  {
    label: "Investor pitch",
    body:
      "Landscape presentation if you're raising co-investment or pitching the portfolio to a buyer.",
  },
  {
    label: "Single-asset deep-dive",
    body:
      "Per-property report covering yield, cashflow, hold-vs-sell IRR, refinance opportunity.",
  },
] as const;

const NAVY = "#1a1a2e";

export default function ManagePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pillar III · Capital Flexibility
          </p>
          <h1
            className="text-[44px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Never get cornered by your own debt stack.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Every loan tracked to maturity. Refinance windows counted down against live market rates. Capital runway stress-tested at -20% rent, six months of voids, a service-charge special call. You move on capital decisions with twelve months of foresight — not ninety days of panic.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup?plan=pro_monthly&intent=direct"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Map your capital runway →
            </Link>
            <Link
              href="/demo/60"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch the explainer
            </Link>
          </div>
          <p
            className="mt-4 text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            From €19/month. 7-day free trial on every tier, no card required.
          </p>
        </div>
      </section>

      {/* ── Definition intro (200 words) — owns "What is property
           portfolio management?" type informational queries. ── */}
      <section
        aria-label="What is property portfolio management?"
        className="bg-white border-t border-[var(--color-border)]"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-12 lg:py-16">
          <h2
            className="text-[22px] lg:text-[26px] leading-[1.2] text-[var(--color-navy)] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What is property portfolio management?
          </h2>
          <p
            className="mt-4 text-[15.5px] lg:text-[16.5px] leading-[1.7] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Property portfolio management is the operational layer that turns
            insight into action across a group of properties. It's the work
            that protects returns once the underwriting is done and the
            monitoring is in place: chasing the operator who's a month late
            on a statement, rebalancing the cashflow forecast when a rate
            resets, generating a lender-ready refinance pack on demand,
            auditing the short-term-rental performance against the contract,
            re-pricing a long-let against the local market median. The
            unglamorous monthly work is what erodes net yield when nobody
            owns it &mdash; and for most private landlords nobody does,
            because hiring a full-time portfolio manager costs more than the
            yield uplift would justify. Modern portfolio management
            substitutes a five-agent AI team for that headcount: your CIO
            handles the modelling decisions, the CFO owns the financial
            health, the CEO ranks the weekly priorities, the COO drives the
            operator and lease workflow, and your Personal Assistant
            captures and files everything that arrives. Management is the
            fifth and final stage in the AssetCentral framework, where the
            work that's measured in the previous stages actually gets done.
          </p>
        </div>
      </section>

      {/* ── Why management matters ──────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Funds survive downturns because they know every maturity date.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The reason institutional capital weathers a cycle is not superior judgement. It is that every fund knows — to the month — when every loan matures, what the refinance pipeline looks like at current rates, where the next call on capital lands, and how many months of runway the operating cash flow buys at zero occupancy. Private investors usually learn these dates ninety days before a rate reset they didn&rsquo;t model. Capital flexibility is a system, not a talent.
          </p>
        </div>
      </section>

      {/* ── Decisions you can run ───────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Decisions you can run
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Six scenarios. Live data. Ranked output.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DECISIONS.map((d) => (
              <div
                key={d.label}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div
                  className="text-[17px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {d.label}
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--color-ink)]">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What lands in your inbox
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Reports the agents write, ready to share.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Each scenario produces a document you can forward to a
            lender, accountant, tenant, or partner. PDF and Word, with
            optional co-branding for partners.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {DELIVERABLES.map((d) => (
              <div
                key={d.label}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div
                  className="text-[18px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {d.label}
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink)]">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── New: concrete demo sections (action board, workflow, CEO
              briefing, missing-docs, before/after) ───────────────────── */}
      <ActionPrioritySection />
      <ManagementWorkflowSection />
      <CeoBriefingSection />
      <MissingDocumentsSection />
      <BeforeAfterSection />

      {/* ── FAQ + JSON-LD FAQPage schema ───────────────────────────── */}
      <PillarFaq
        faqs={[
          {
            q: "What does the AI team actually do day-to-day on a portfolio?",
            a: "Your Personal Assistant captures every new input (forwarded emails, photographed invoices, voice notes). Your CFO normalises the data into clean asset records. Your CIO re-models any property where inputs have changed. Your CEO compiles a ranked weekly priority list — \"the next 5 things worth your attention\". Your COO drives the operator and lease workflow (chasing late statements, flagging rent-review windows, generating refinance packs). You make the strategic calls; they handle the work in between.",
          },
          {
            q: "How is this different from hiring a property manager?",
            a: "A property manager (typical fee: 8–12% of rent, more for short-let) handles tenant-facing work on individual properties. Portfolio management is one level up — it's about decisions across the whole portfolio: when to refinance, which property to sell, where to buy next, what's drifting from the original investment thesis. Hiring a portfolio analyst for that work costs €60–120k/year. The AI team does it for €49/month and is on every Saturday morning if you are.",
          },
          {
            q: "Can the AI team generate documents for my lender or accountant?",
            a: "Yes. Three production-ready report types: Refinancing pack (rent roll, valuation evidence, DSCR calculation, comparable transactions — branded PDF ready to send to a lender), Investor presentation (portfolio summary, performance vs benchmark, growth narrative), and Tax pack (per-property cashflow with country-specific tax framing, ready for your accountant). All exported as PDF and Word in a single click.",
          },
          {
            q: "What happens if I disagree with a recommendation?",
            a: "The AI team makes recommendations, not commitments — every ranked action has a \"dismiss\" or \"defer\" option, with the reason captured so the team learns your preferences over time. A recommendation to refinance, for instance, can be deferred by 90 days if you want to wait for a specific rate band. The system re-evaluates at the deferred date rather than nagging weekly. You stay in control of every decision.",
          },
          {
            q: "Does the COO actually contact my agents and operators?",
            a: "It can. With your permission, the COO sends scheduled status requests to operators (\"Aug statement is 14 days overdue — please confirm timing\"), forwards lease renewals to your tenant's email with a personalised cover note, and chases service-charge invoices that haven't arrived within the expected window. All correspondence is logged against the asset and visible in your inbox, so you see exactly what's been sent on your behalf.",
          },
        ]}
      />

      {/* ── Back-to-pillars nav ─────────────────────────────────────── */}
      <section style={{ backgroundColor: NAVY }} className="text-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-white/55 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The framework
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Manage closes the loop. Model and Monitor make it possible.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-white/75 max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            You can&rsquo;t manage what you haven&rsquo;t modelled. You
            can&rsquo;t catch the moment to act without monitoring. The
            three pillars run as a cycle — every model produces things
            to monitor, every monitor surfaces things to manage.
          </p>
          <div
            className="mt-7 flex flex-wrap gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/model"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[14.5px] font-medium hover:bg-white/90 transition-colors"
            >
              How Model works →
            </Link>
            <Link
              href="/monitor"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-white/20 text-white text-[14.5px] font-medium hover:bg-white/5 transition-colors"
            >
              How Monitor works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-24 text-center">
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Run the scenario you&rsquo;ve been putting off.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free for up to 3 properties. The scenario engine runs as
            soon as one property is modelled.
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
          </div>
        </div>
      </section>
    </>
  );
}
