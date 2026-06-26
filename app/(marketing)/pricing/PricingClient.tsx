"use client";

import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "@/components/marketing/CurrencyProvider";
import { TeamGalleryStrip } from "@/components/marketing/TeamGalleryStrip";
import {
  annualDiscountPct,
  annualMonthlyEquiv,
  annualSavings,
  BILLING_CURRENCIES,
  BILLING_CURRENCY_LABEL,
  billingFor,
  type BillingCurrency,
  formatPrice,
  PLAN_PRICES,
} from "@/lib/pricing";
import { PRICING_FAQS } from "@/lib/pricing-faqs";

type Billing = "monthly" | "annual";

const faqs = PRICING_FAQS;

export function PricingClient() {
  const display = useCurrency();
  const [billing, setBilling] = useState<Billing>("annual");
  // Derive the billing currency from the IP-geo lookup, with the user
  // dropdown as an explicit override. Avoids the setState-in-useEffect
  // pattern (react-hooks/set-state-in-effect rule) — Vercel's ESLint
  // preset rejects that even for "sync external state on mount" cases.
  // When `billOverride` is null, bill follows display.code; when the
  // user picks from the selector we set billOverride and that wins.
  const [billOverride, setBillOverride] = useState<BillingCurrency | null>(null);
  const bill: BillingCurrency = billOverride ?? billingFor(display.code);

  // Marketing label "Individual" maps to the app's `individual` tier — only
  // the presentation differs. App-side billing keeps the existing tier
  // value so signups, Stripe price IDs and feature flags are unchanged.
  const starterPrice = PLAN_PRICES.individual[bill];
  const proPrice = PLAN_PRICES.pro[bill];
  const teamPrice = PLAN_PRICES.team[bill];

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-10">
          <div className="max-w-3xl">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Pricing
            </p>
            <h1
              className="text-[44px] lg:text-[56px] leading-[1.05] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Run the numbers first for free.
              <br />
              Upgrade when the decision gets serious.
            </h1>
            <p
              className="mt-5 text-[17px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Free covers the Level 1 calculators and the AI property check — for
              casual visitors and early-stage buyers. Individual unlocks the full
              property decision report on a 7-day trial. Pro adds the portfolio
              dashboard and 5-agent AI team for owners of 2&ndash;50 properties.
              Team and Enterprise sit below for brokers, family offices and
              larger portfolios.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div
              className="inline-flex rounded-md border border-[var(--color-border)] bg-white p-1"
              role="tablist"
            >
              <button
                onClick={() => setBilling("monthly")}
                className={`px-4 py-1.5 text-[13.5px] rounded ${
                  billing === "monthly"
                    ? "bg-[var(--color-navy)] text-white"
                    : "text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-4 py-1.5 text-[13.5px] rounded ${
                  billing === "annual"
                    ? "bg-[var(--color-navy)] text-white"
                    : "text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Annual
              </button>
            </div>
            {/* Discount badge — visible regardless of which toggle is
                active so monthly-toggle viewers see what they're missing.
                Uses Pro's discount % as the headline figure (all plans
                use the same 2-months-free convention so the % is the
                same across Pro/Team). */}
            <span
              className="text-[12px] font-semibold px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {billing === "annual"
                ? `Save ${annualDiscountPct(proPrice)}% — 2 months free`
                : `Save ${annualDiscountPct(proPrice)}% with annual billing`}
            </span>

            {/* ml-auto on sm+ pushes the currency selector to the right
                edge of the row. On mobile we drop it so the selector
                wraps below the toggle and left-aligns naturally — the
                right-aligned single-item line looked broken at 375px. */}
            <div className="sm:ml-auto flex items-center gap-2">
              <label
                htmlFor="billing-currency"
                className="text-[12.5px] text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Bill me in
              </label>
              <select
                id="billing-currency"
                value={bill}
                onChange={(e) => setBillOverride(e.target.value as BillingCurrency)}
                className="rounded-md border border-[var(--color-border)] bg-white px-3 py-1.5 text-[13.5px] text-[var(--color-ink)] focus:border-[var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]/10"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {BILLING_CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {BILLING_CURRENCY_LABEL[c]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The three tiers
            </p>
            <h2
              className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Free. Individual. Pro.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Free — re-instated as the no-card on-ramp for the
                "Don't Buy Blind" funnel. 1 saved property + unlimited
                /check runs + AI verdict + email. Once you own a second
                property you need Individual. */}
            <PlanCardLayout name="Free">
              <PriceBlock
                price={formatPrice(0, bill)}
                sub="forever"
              />
              {/* Free now leads with a direct "Sign up free" CTA — the
                  prior single "Run a free check" link meant visitors on
                  /pricing could only reach the Free signup by detouring
                  through /check first. Now: dark primary = sign up,
                  small secondary = run a check first (the original
                  funnel path is preserved, just demoted from primary). */}
              <div className="mt-6 space-y-3">
                <Link
                  href="/signup?plan=free"
                  className="flex w-full items-center justify-center min-h-[48px] px-4 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Sign up free →
                </Link>
                <Link
                  href="/check"
                  className="flex w-full items-center justify-center min-h-[40px] px-4 text-[13px] font-medium text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Or run a free check first →
                </Link>
              </div>
              <Blurb>For anyone thinking about a property. No card, no commitment, no expiry.</Blurb>
              <FeatureList
                items={[
                  { label: "8 free Level 1 calculators (mortgage, BTL, yield, sell-or-hold, retrofit, refinance, rent-out, short-vs-long)", on: true },
                  { label: "Free AI property check — verdict + red flag + next move", on: true },
                  { label: "3-row stress test on every calculator (rate, rent, vacancy)", on: true },
                  { label: "1 saved property — come back and re-run as rates / rent move", on: true },
                  { label: "Email the result to yourself or your broker", on: true },
                  { label: "Unlimited runs, no card, ever", on: true },
                  { label: "Full property decision report + 10-year forecast", on: false },
                  { label: "Portfolio dashboard + 5-agent AI team", on: false },
                ]}
              />
            </PlanCardLayout>

            {/* Individual — marketing label for the app's `individual` tier.
                Positioned as "unlock the full property report" — the
                natural step up from the free /check for anyone seriously
                evaluating one or several properties. 7-day no-card trial
                is the default CTA so the credit-card-required intent flag
                is hidden behind a secondary link. */}
            <PlanCardLayout name="Individual" popular>
              <p
                className="mt-1 text-[12px] uppercase tracking-[0.08em] text-[var(--color-accent)] font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Unlock the full property report
              </p>
              <PriceBlock
                price={formatPrice(
                  billing === "annual"
                    ? annualMonthlyEquiv(starterPrice.annual)
                    : starterPrice.monthly,
                  bill,
                )}
                sub={
                  billing === "monthly"
                    ? "per month after 7-day trial"
                    : `per month billed annually (${formatPrice(starterPrice.annual, bill)}/year, save ${annualSavings(starterPrice, bill)})`
                }
                // Per-card "Save X% with annual" nudge is only useful while
                // the user is on the monthly toggle. Once they've flipped
                // to annual the top-of-page chip already confirms the win.
                annualDiscount={billing === "monthly" ? annualDiscountPct(starterPrice) : undefined}
              />
              <DualCTA
                trialHref={`/signup?plan=individual_${billing}`}
                directHref={`/signup?plan=individual_${billing}&intent=direct`}
                directLabel={`Subscribe now`}
              />
              <Blurb>For a serious decision on one or several properties. Up to 3 saved, single user. 7-day trial, no card.</Blurb>
              <FeatureList
                items={[
                  { label: "Everything in Free, plus:", on: true },
                  { label: "Full property decision report — 10-page PDF + Word", on: true },
                  { label: "10-year cash-flow forecast with debt amortisation", on: true },
                  { label: "Scenario analysis — rate, rent growth, capital growth", on: true },
                  { label: "Sell-vs-hold analyser + refinance modelling", on: true },
                  { label: "Side-by-side property comparison (up to 3 at once)", on: true },
                  { label: "Tax-adjusted analysis per country", on: true },
                  { label: "Multi-currency tracking (EUR · GBP · USD · AED)", on: true },
                  { label: "Up to 3 saved properties · email + WhatsApp support", on: true },
                  { label: "Portfolio dashboard + 5-agent AI team", on: false },
                ]}
              />
            </PlanCardLayout>

            {/* Pro — headline always shows the monthly amount so the
                visitor reads "€49/month" as the price first, regardless
                of toggle. Sub line clarifies the billing cadence: when
                annual is picked we show the effective monthly cost
                (annual ÷ 12) and the explicit annual total + savings.
                Card order (2026-06): price → CTAs → blurb → features.
                Subscribe now sits directly under the price so high-intent
                visitors hit the button without scrolling past the
                feature list. */}
            {/* Pro — for portfolio owners (2-50 properties). Trial CTA
                drops the "popular" badge (which now lives on Individual)
                but keeps the same DualCTA pattern. */}
            <PlanCardLayout name="Pro">
              <p
                className="mt-1 text-[12px] uppercase tracking-[0.08em] text-[var(--color-accent)] font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Model, monitor and manage your portfolio
              </p>
              <PriceBlock
                price={formatPrice(
                  billing === "annual"
                    ? annualMonthlyEquiv(proPrice.annual)
                    : proPrice.monthly,
                  bill,
                )}
                sub={
                  billing === "monthly"
                    ? "per month after 7-day trial"
                    : `per month billed annually (${formatPrice(proPrice.annual, bill)}/year, save ${annualSavings(proPrice, bill)})`
                }
                annualDiscount={billing === "monthly" ? annualDiscountPct(proPrice) : undefined}
              />
              <DualCTA
                trialHref={`/signup?plan=pro_${billing}`}
                directHref={`/signup?plan=pro_${billing}&intent=direct`}
                directLabel={`Subscribe now`}
                trialVariant="ghost"
              />
              <Blurb>Owners and investors with 2&ndash;50 properties. Portfolio command centre with the AI team built in. 7-day trial, no card.</Blurb>
              <FeatureList
                items={[
                  { label: "Everything in Individual, plus:", on: true },
                  { label: "Up to 50 properties + per-asset deep-dives", on: true },
                  { label: "Portfolio dashboard with real-time net-yield monitoring", on: true },
                  { label: "5-agent AI team — CIO, CFO, COO, CEO, PA", on: true },
                  { label: "22 monitoring alert types (email + WhatsApp)", on: true },
                  { label: "Document vault — upload statements, AI extracts the figures", on: true },
                  { label: "Data ingestion: WhatsApp · email · file → structured data", on: true },
                  { label: "Voice line — phone in and talk to your AI team", on: true },
                  { label: "Lender-ready packs: Refinancing · Investor · Tax", on: true },
                  { label: "Daily briefing — what changed, what to act on", on: true },
                  { label: "Team members + multi-workspace", on: false },
                ]}
              />
            </PlanCardLayout>
          </div>

          <p
            className="mt-8 text-center text-[14px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            7-day Individual and Pro trials — no credit card required to start. Cancel anytime. VAT applied per local regulations.
          </p>

          {/* Team + Enterprise — kept off the 3-tier ladder so the freemium
              → trial → portfolio ladder reads cleanly for the dominant
              B2C visitor. Brokers, family offices and 50+ property buyers
              self-select into this strip. */}
          <div className="mt-12 grid lg:grid-cols-2 gap-5">
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-7">
              <p
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)] font-semibold mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Team — {formatPrice(
                  billing === "annual"
                    ? annualMonthlyEquiv(teamPrice.annual)
                    : teamPrice.monthly,
                  bill,
                )}/mo{billing === "annual" ? " (billed annually)" : ""}
              </p>
              <h3
                className="text-[20px] lg:text-[22px] text-[var(--color-navy)] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                For brokers, family offices and advisory firms.
              </h3>
              <p
                className="mt-2 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Everything in Pro + 2&ndash;5 team members, role-based access,
                multiple portfolio workspaces and partner co-branding on
                reports.
              </p>
              <Link
                href={`/signup?plan=team_${billing}`}
                className="mt-4 inline-flex items-center justify-center min-h-[44px] px-5 rounded-md border border-[var(--color-navy)] text-[var(--color-navy)] text-[14px] font-semibold transition hover:bg-[var(--color-navy)] hover:text-white"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Start 7-day Team trial →
              </Link>
            </article>

            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-7">
              <p
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)] font-semibold mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Enterprise — Custom
              </p>
              <h3
                className="text-[20px] lg:text-[22px] text-[var(--color-navy)] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                50+ properties, multiple teams or compliance needs.
              </h3>
              <p
                className="mt-2 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Everything in Team + unlimited properties and seats, SSO and
                audit logging, custom DPA, dedicated onboarding and a named
                account manager.
              </p>
              <a
                href="mailto:hello@assetcentral.ai?subject=Enterprise%20enquiry"
                className="mt-4 inline-flex items-center justify-center min-h-[44px] px-5 rounded-md border border-[var(--color-navy)] text-[var(--color-navy)] text-[14px] font-semibold transition hover:bg-[var(--color-navy)] hover:text-white"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Contact sales →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ── Team faces — the Pro tier sells the 5-agent team, so the
           team strip sits directly under the tier cards and above the
           FAQ. Visitors comparing Individual vs Pro see the faces that
           come with the Pro tier without having to click Features. ── */}
      <TeamGalleryStrip
        eyebrow="What Pro unlocks"
        heading="Five AI agents — the team built into Pro."
        body="Individual unlocks the full property decision report. Pro adds these five — modelling, monitoring and managing your portfolio month after month."
        background="white"
      />

      {/* FAQ */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-20 lg:py-24">
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)] mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Frequently asked
          </h2>
          <dl className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt
                  className="text-[16.5px] font-semibold text-[var(--color-navy)] mb-1.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {f.q}
                </dt>
                <dd
                  className="text-[15px] leading-[1.55] text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

/* ------- Sub-components for the plan cards ------- */

function PlanCardLayout({
  name,
  popular,
  children,
}: {
  name: string;
  popular?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article
      // mt-3 is applied to ALL cards (not just the popular one) so the
      // Subscribe buttons line up horizontally across the row. Previously
      // mt-3 was popular-only — to give the absolute -top-3 badge room
      // — but it pushed the Pro card's content 12px below Individual /
      // Team, breaking horizontal alignment of every internal element
      // (price, CTA, blurb). Applying mt-3 to all four cards keeps the
      // badge breathing room AND aligns the row. The border-2 on popular
      // adds 1px on each side; we compensate by leaving the other cards
      // at 1px and accepting the sub-pixel offset (invisible in practice).
      className={`relative rounded-2xl bg-white p-7 lg:p-8 mt-3 flex flex-col ${
        popular
          ? "border-2 border-[var(--color-navy)] shadow-[0_24px_60px_-25px_rgba(26,26,46,0.35)]"
          : "border border-[var(--color-border)]"
      }`}
    >
      {popular && (
        <span
          className="absolute -top-3 left-7 px-2.5 py-1 rounded-md bg-[var(--color-navy)] text-white text-[11px] font-semibold tracking-wide"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Most popular
        </span>
      )}
      <h2
        className="text-[22px] font-semibold text-[var(--color-navy)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {name}
      </h2>
      {children}
    </article>
  );
}

function PriceBlock({
  price,
  sub,
  annualDiscount,
}: {
  price: string;
  sub: string;
  /** Optional annual-billing discount percentage. When provided we
   *  render a small green chip directly under the headline price so
   *  the visitor sees the saving without needing to flip the toggle.
   *  Only paid plans pass this — Free and Enterprise omit. */
  annualDiscount?: number;
}) {
  // Fixed-height block so the CTA that comes after it sits at the same
  // vertical position across every card in the row. min-h covers:
  //   mt-3 (12) + price line (40) + mt-2 (8) + chip slot (24)
  //   + mt-2 (8) + sub min-h (52) ≈ 144px
  // The chip slot is reserved (h-[24px]) even on Enterprise / no-discount
  // cards so the sub-line below doesn't shift up and pull the CTA with
  // it. min-h on `sub` bumped from 36 → 52 to fit the 3-line annual copy
  // ("per month billed annually — effective €X/mo (€Y/year, save €Z)")
  // without wrapping past the CTA's anchor point.
  return (
    <div className="min-h-[144px]">
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="num text-[36px] lg:text-[40px] font-semibold text-[var(--color-ink)] leading-none">
          {price}
        </span>
      </div>
      <div className="mt-2 h-[24px]">
        {annualDiscount !== undefined && annualDiscount > 0 && (
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Save {annualDiscount}% with annual
          </span>
        )}
      </div>
      <p
        className="mt-2 text-[12.5px] text-[var(--color-muted)] min-h-[52px]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {sub}
      </p>
    </div>
  );
}

function Blurb({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-3 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </p>
  );
}

function FeatureList({
  items,
}: {
  items: { label: string; on: boolean }[];
}) {
  return (
    <ul
      className="mt-5 space-y-2 text-[13.5px] flex-1"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {items.map((f) => (
        <li key={f.label} className="flex gap-2.5 items-start">
          <span
            aria-hidden
            className={`mt-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full ${
              f.on ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
            } text-[10px]`}
          >
            {f.on ? "✓" : "—"}
          </span>
          <span
            className={
              f.on ? "text-[var(--color-ink)]" : "text-[var(--color-muted)] line-through"
            }
          >
            {f.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CTA({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "ghost";
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`mt-6 flex w-full items-center justify-center min-h-[48px] px-4 rounded-md text-[14.5px] font-medium transition-colors ${
        variant === "primary"
          ? "bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)]"
          : "border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-navy)]"
      }`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children} →
    </Link>
  );
}

/**
 * Two stacked CTAs for paid plans — trial as the visual primary, direct
 * subscribe as outlined secondary. Designed so buyers who already know
 * what they want see the no-trial path without having to hunt for it.
 *
 * The "or" divider matches the in-app /signup form's CTA stack — same
 * pattern, same expectation. When the user lands on signup with the
 * `intent=direct` query string, the signup page promotes the direct CTA
 * to primary so the flow visually continues.
 */
function DualCTA({
  trialHref,
  directHref,
  directLabel,
  trialVariant = "primary",
}: {
  trialHref: string;
  directHref: string;
  directLabel: string;
  /** When the plan card itself isn't "popular" (e.g. Team), the trial
   *  CTA inherits the ghost styling so it doesn't compete with the
   *  recommended-card filled button. */
  trialVariant?: "primary" | "ghost";
}) {
  return (
    <div className="mt-6 space-y-3">
      {/* Direct-subscribe is the visual PRIMARY now — filled navy
          button at full prominence. The business prefers to convert
          buyers straight to paid where they're ready, and previously
          the trial was muting the direct path. Charged immediately at
          Checkout (the signup page sees `intent=direct` and routes
          through Stripe with no trial_end set). */}
      <Link
        href={directHref}
        className="flex w-full items-center justify-center min-h-[48px] px-4 rounded-md text-[14.5px] font-semibold bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] transition-colors"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {directLabel} →
      </Link>
      <p
        className="text-center text-[11.5px] text-[var(--color-muted)] leading-[1.45]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Charged today via Stripe · cancel anytime
      </p>

      <div className="relative pt-2">
        <div className="absolute inset-0 flex items-center pt-2" aria-hidden>
          <div className="w-full border-t border-[var(--color-border)]" />
        </div>
        <div className="relative flex justify-center pt-2">
          <span
            className="px-2 bg-white text-[11px] text-[var(--color-muted)] font-semibold tracking-wide uppercase"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            or try first
          </span>
        </div>
      </div>

      {/* Trial path — drops to the outlined secondary so buyers still
          see it but it doesn't lead. `trialVariant` is now ignored —
          the trial is always ghost-styled here. Kept the prop for
          backwards-compatible call sites; consider removing in a
          follow-up. */}
      <Link
        href={trialHref}
        className="flex w-full items-center justify-center min-h-[44px] px-4 rounded-md text-[13.5px] font-medium text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-navy)] hover:text-[var(--color-navy)] transition-colors"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Start 7-day free trial →
      </Link>
    </div>
  );
}
