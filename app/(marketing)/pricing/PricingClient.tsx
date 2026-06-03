"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCurrency } from "@/components/marketing/CurrencyProvider";
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
  const [bill, setBill] = useState<BillingCurrency>("EUR");

  // After the IP geo lookup resolves, default to the closest billing currency.
  useEffect(() => {
    setBill(billingFor(display.code));
  }, [display.code]);

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
              Start free. Upgrade when you&rsquo;re ready.
            </h1>
            <p
              className="mt-5 text-[17px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Free covers up to 3 properties with your Portfolio Personal Assistant. Pro unlocks the full AC Agent Team — Your CEO, Finance Manager, Market Analyst, Operations Manager — for €49 a month. 7-day free trial on Pro and Team, no credit card required to start.
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
                onChange={(e) => setBill(e.target.value as BillingCurrency)}
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

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Free */}
            <PlanCardLayout name="Free">
              <PriceBlock
                price={formatPrice(0, bill)}
                sub="Forever — up to 3 properties"
              />
              <Blurb>Add up to 3 properties, see basic yield and understand what your AI Agent Team can unlock.</Blurb>
              <FeatureList
                items={[
                  { label: "Up to 3 properties", on: true },
                  { label: "Portfolio Personal Assistant", on: true },
                  { label: "Yield + cashflow dashboard", on: true },
                  { label: "All calculators, free", on: true },
                  { label: "Your CEO + Finance / Market / Ops", on: false },
                  { label: "Decision Room + ranked actions", on: false },
                ]}
              />
              <CTA href="/signup" variant="ghost">
                Add your first property
              </CTA>
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
            <PlanCardLayout name="Pro" popular>
              <PriceBlock
                price={formatPrice(proPrice.monthly, bill)}
                sub={
                  billing === "monthly"
                    ? "per month"
                    : `per month billed annually — effective ${formatPrice(annualMonthlyEquiv(proPrice.annual), bill)}/mo (${formatPrice(proPrice.annual, bill)}/year, save ${annualSavings(proPrice, bill)})`
                }
                annualDiscount={annualDiscountPct(proPrice)}
              />
              {/* CTAs FIRST — Subscribe now (primary, filled navy) sits
                  immediately under the price so the principal action is
                  the next thing the visitor sees. Trial drops below as
                  the outlined secondary. The plan key carries the cadence
                  (pro_monthly / pro_annual) so the in-app signup page can
                  validate it against STRIPE_PRICE_*; the intent flag
                  tells signup to skip the trial and go straight to
                  Checkout. */}
              <DualCTA
                trialHref={`/signup?plan=pro_${billing}`}
                directHref={`/signup?plan=pro_${billing}&intent=direct`}
                directLabel={`Subscribe now`}
              />
              <Blurb>Full AC Agent Team. Up to 50 properties. €49/month.</Blurb>
              <FeatureList
                items={[
                  { label: "Everything in Free, plus:", on: true },
                  { label: "Your CEO — ranked actions + decision support", on: true },
                  { label: "Finance Manager — yield, cashflow, debt", on: true },
                  { label: "Market Analyst — rent + market evidence", on: true },
                  { label: "Operations Manager — alerts + checks", on: true },
                  { label: "Up to 50 properties", on: true },
                  { label: "Document vault + AI extraction", on: true },
                  { label: "Multi-currency + all report types", on: true },
                  { label: "Team members", on: false },
                ]}
              />
            </PlanCardLayout>

            {/* Team */}
            <PlanCardLayout name="Team">
              <PriceBlock
                price={formatPrice(teamPrice.monthly, bill)}
                sub={
                  billing === "monthly"
                    ? "per month"
                    : `per month billed annually — effective ${formatPrice(annualMonthlyEquiv(teamPrice.annual), bill)}/mo (${formatPrice(teamPrice.annual, bill)}/year, save ${annualSavings(teamPrice, bill)})`
                }
                annualDiscount={annualDiscountPct(teamPrice)}
              />
              <DualCTA
                trialHref={`/signup?plan=team_${billing}`}
                directHref={`/signup?plan=team_${billing}&intent=direct`}
                directLabel={`Subscribe now`}
                trialVariant="ghost"
              />
              <Blurb>Everything in Pro, plus up to 5 seats and 50 properties.</Blurb>
              <FeatureList
                items={[
                  { label: "Everything in Pro, plus:", on: true },
                  { label: "Up to 50 properties", on: true },
                  { label: "Up to 5 team members", on: true },
                  { label: "Role-based access (admin, analyst, viewer)", on: true },
                  { label: "Multiple portfolio workspaces", on: true },
                  { label: "Priority support", on: true },
                ]}
              />
            </PlanCardLayout>

            {/* Enterprise */}
            <PlanCardLayout name="Enterprise">
              <PriceBlock price="Custom" sub="Talk to us" />
              <Blurb>More than 50 properties, multiple teams, or specific compliance needs.</Blurb>
              <FeatureList
                items={[
                  { label: "Everything in Team, plus:", on: true },
                  { label: "Unlimited properties", on: true },
                  { label: "Unlimited team members", on: true },
                  { label: "SSO and audit logging", on: true },
                  { label: "Custom DPA and data residency", on: true },
                  { label: "Dedicated onboarding", on: true },
                  { label: "Account manager", on: true },
                ]}
              />
              <CTA
                href="mailto:hello@assetcentral.ai?subject=Enterprise%20enquiry"
                variant="ghost"
              >
                Contact sales
              </CTA>
            </PlanCardLayout>
          </div>

          <p
            className="mt-8 text-center text-[14px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free is forever (up to 3 properties). Pro and Team include a 7-day free trial — no credit card required to start. VAT applied per local regulations.
          </p>
        </div>
      </section>

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
      // mt-3 on the popular card so the absolute-positioned "-top-3"
      // badge has room to render without overflowing the parent grid's
      // top edge on cold scroll (especially when the grid is the very
      // first thing in viewport on mobile).
      className={`relative rounded-2xl bg-white p-7 lg:p-8 flex flex-col ${
        popular
          ? "mt-3 border-2 border-[var(--color-navy)] shadow-[0_24px_60px_-25px_rgba(26,26,46,0.35)]"
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
  return (
    <>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="num text-[36px] lg:text-[40px] font-semibold text-[var(--color-ink)] leading-none">
          {price}
        </span>
      </div>
      {annualDiscount !== undefined && annualDiscount > 0 && (
        <div className="mt-2">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Save {annualDiscount}% with annual
          </span>
        </div>
      )}
      <p
        className="mt-2 text-[12.5px] text-[var(--color-muted)] min-h-[36px]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {sub}
      </p>
    </>
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
