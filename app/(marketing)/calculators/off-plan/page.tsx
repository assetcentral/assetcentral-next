import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Title + description tuned for the audience the May-2026 Google Ads
  // campaign targets: UK residents (especially British investors who
  // own or are considering Dubai off-plan property). "Dubai off-plan"
  // and "UK investor" are both in the meta description so paid + organic
  // search results match the campaign keywords directly.
  title: "Dubai Off-Plan Calculator — assign now or hold? | AssetCentral",
  description:
    "Should you assign your Dubai off-plan unit now or hold to handover? A rolling month-by-month model with cost of money, payment plan, three scenarios and live DLD market comps. Used by UK and GCC investors weighing the exit decision. Free with a 7-day trial.",
  alternates: { canonical: "/calculators/off-plan" },
};

export default function OffPlanLandingPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 lg:pt-24 pb-10">
          <div className="flex items-center gap-2 mb-5">
            <Link
              href="/calculators"
              className="text-[13px] text-[var(--color-muted)] hover:text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              ← All calculators
            </Link>
            <span className="text-[var(--color-muted)]">·</span>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <LockIcon /> Free 7-day trial
            </span>
          </div>
          <h1
            className="text-[44px] lg:text-[56px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Off-Plan Rolling-Return Calculator
          </h1>
          <p
            className="mt-5 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-ink)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <strong>Should you assign now, or hold to handover?</strong> A
            month-by-month model of value, cash deployed and cost of money,
            built so the answer is unambiguous — with the data, charts and
            comp lookups behind it.
          </p>
          <p
            className="mt-4 text-[15px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Designed for Dubai off-plan but works for any market. Same model
            used by analysts at family offices to validate assignment quotes
            against the underlying economics — now usable without a
            spreadsheet open.
          </p>
          {/* Audience callout — speaks directly to the UK-resident
              British investor who owns or is considering Dubai off-plan.
              This is the persona the May 2026 Google Ads campaign
              targets (UK + Dubai geos). Visible above the fold so paid
              traffic gets message-match within the first scroll. */}
          <div
            className="mt-6 inline-flex items-start gap-3 max-w-3xl rounded-lg border border-[var(--color-border)] bg-white px-4 py-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span aria-hidden className="text-[18px] leading-none mt-0.5">🇬🇧🇦🇪</span>
            <p className="text-[14px] leading-[1.55] text-[var(--color-ink)]">
              <strong>Used by British investors holding Dubai off-plan.</strong>{" "}
              Models the decision in AED, shows walk-away cash in your own
              currency, and runs the same scenario stress-tests an asset
              manager would on a UK BTL — for property you can&rsquo;t walk
              past on the way to work.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/signup?plan=pro_monthly"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start free 7-day trial →
            </Link>
            <span
              className="text-[13px] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              No credit card required · Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* ── Headline-decision panel ─────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                The decision
              </p>
              <h2
                className="text-[28px] lg:text-[34px] leading-[1.15] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                One number tells you whether to hold.
              </h2>
              <p
                className="mt-4 text-[15.5px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                The model computes the{" "}
                <strong>incremental value of holding to handover</strong> —
                the net handover proceeds, minus today&rsquo;s sell-now
                proceeds, minus remaining developer payments, minus the cost
                of money over the rest of the project. Positive means hold
                wins. Negative means assign now.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-navy)] bg-white p-6 lg:p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
              <p
                className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)] font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Incremental value of holding
              </p>
              <p
                className="num mt-2 text-[44px] font-semibold text-emerald-700 leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                +AED 54,045
              </p>
              <p
                className="mt-3 text-[13px] leading-[1.55] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Holding to handover is AED 54,045 better than assigning today,
                after remaining payments + future cost of money. Break-even
                handover value: AED 1,230,000 (a 23% premium to launch).
              </p>
              <p
                className="mt-3 text-[11px] italic text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Illustrative numbers from the calculator&rsquo;s default
                Dubai scenario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature grid ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)] mb-10 max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What&rsquo;s inside
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Feature
              title="Rolling launch-to-handover view"
              body="Peg the model to your acquisition date; the rolling current month advances automatically as time passes. Use today's view to decide, or set a future month to model 'what about next quarter?'."
            />
            <Feature
              title="Month-by-month growth"
              body="Default to a single annual rate, or layer growth periods on the forward view. Model bearish windows, recovery, accelerated demand — every month gets its own rate if you want it."
            />
            <Feature
              title="Cost of money built in"
              body="Equity opportunity cost AND borrowed-portion interest accrue monthly on the cash you've deployed. Economic profit always net of what your money could have earned elsewhere."
            />
            <Feature
              title="Editable payment plan"
              body="Edit each milestone by month OR by calendar date — two-way bound. Match your developer's SPA exactly; defaults to the canonical Dubai 20/10×5/30 plan."
            />
            <Feature
              title="Scenario snapshots"
              body="Lock today's assumptions as your day-one baseline. As the market moves and you revise growth, see exactly how today's projection differs from the original."
            />
            <Feature
              title="Live value-path chart"
              body="Current projection (solid) vs original snapshot (dashed) vs cumulative cash paid, with NOW and HANDOVER markers. Your observed-resale quote appears as a single dot at the current month for instant divergence checks."
            />
            <Feature
              title="Live market comps via DLD"
              body="Run the Transaction Radar against your area + bedrooms + project name; the calculator pulls comparable transactions from Dubai Land Department and pushes the median straight back into your current-value field."
            />
            <Feature
              title="Branded PDF export"
              body="Decision summary + assumptions + sell-now / hold-to-handover ladders + payment plan + monthly timeline + sources. Use it as the underwriting brief for a broker or family-office conversation."
            />
            <Feature
              title="Today vs original comparison"
              body="When a snapshot exists, the PDF gains a comparison page: original vs current handover value, delta in pp, economic-profit delta, plus the forward growth periods you've added."
            />
          </div>
        </div>
      </section>

      {/* ── Methodology ─────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Methodology
          </p>
          <h2
            className="text-[28px] lg:text-[34px] leading-[1.15] text-[var(--color-navy)] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built on the same model brokers walk in with.
          </h2>
          <div
            className="space-y-4 text-[15px] leading-[1.7] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <p>
              <strong>Value curve.</strong>{" "}
              <span className="num">price × (1 + annual growth)<sup>m/12</sup> × (1 + de-risk × m/handover)</span>{" "}
              — compounded market growth plus a linear construction-risk
              premium that unwinds from 0 at launch to the full de-risk
              amount at handover. Growth can be overridden per month via
              forward-growth periods.
            </p>
            <p>
              <strong>Cash paid to date.</strong> Sum of every developer
              milestone that&rsquo;s landed up to the current month, plus
              upfront launch fees (DLD registration · admin · agency).
              Verified against the reference spreadsheet to the cent.
            </p>
            <p>
              <strong>Sell-now economics.</strong> Your full market value
              minus exit friction minus the outstanding developer balance —
              the buyer takes on that obligation as part of the assignment,
              so you receive the value less the balance, not the gross.
              Economic profit subtracts cost of money to date.
            </p>
            <p>
              <strong>Hold-to-handover.</strong> Projected handover value
              less remaining payments and the full cost of money from
              launch. The difference between hold and sell-now —{" "}
              <em>incremental value of holding</em> — is the answer.
            </p>
            <p>
              <strong>Cost of money.</strong> Accrues monthly on prior-month
              equity AND borrowed-portion deployments. Equity uses your
              opportunity-cost rate (what your cash could earn elsewhere);
              borrowed cash uses your borrowing rate.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <div className="rounded-2xl bg-[var(--color-navy)] text-white p-10 lg:p-14 text-center">
            <h2
              className="text-[28px] lg:text-[36px] leading-[1.15] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              See your own scenario in under 5 minutes.
            </h2>
            <p
              className="text-[15.5px] leading-[1.55] text-white/85 mb-7 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start a free 7-day trial — full access to the off-plan
              calculator, the rest of the calculator suite, and the
              portfolio workspace. No credit card.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup?plan=pro_monthly"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-[var(--color-navy)] text-[15px] font-semibold hover:bg-white/90 transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Start free 7-day trial →
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-white/30 text-white text-[14.5px] font-medium hover:bg-white/10 transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                See the free calculators
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-white p-6">
      <h3
        className="text-[16px] font-semibold text-[var(--color-navy)] mb-2"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {title}
      </h3>
      <p
        className="text-[13.5px] leading-[1.6] text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {body}
      </p>
    </article>
  );
}

function LockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
