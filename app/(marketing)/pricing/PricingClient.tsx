"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCurrency } from "@/components/marketing/CurrencyProvider";
import {
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
              Simple pricing. No per-asset fees. 14-day free trial on Pro and Team — no credit card required to start.
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
            {billing === "annual" && (
              <span
                className="text-[12px] font-medium px-2 py-1 rounded bg-emerald-100 text-emerald-700"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Save 2 months
              </span>
            )}

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
                sub="Forever"
              />
              <Blurb>Calculators only. No account required.</Blurb>
              <FeatureList
                items={[
                  { label: "All calculators, free", on: true },
                  { label: "Save calculator results (with account)", on: true },
                  { label: "Portfolio workspace", on: false },
                  { label: "Alerts", on: false },
                  { label: "Reports", on: false },
                ]}
              />
              <CTA href="/calculators" variant="ghost">
                Use free calculators
              </CTA>
            </PlanCardLayout>

            {/* Pro */}
            <PlanCardLayout name="Pro" popular>
              <PriceBlock
                price={formatPrice(billing === "monthly" ? proPrice.monthly : annualMonthlyEquiv(proPrice.annual), bill)}
                sub={
                  billing === "monthly"
                    ? "per month"
                    : `per month, billed ${formatPrice(proPrice.annual, bill)}/year — save ${annualSavings(proPrice, bill)}`
                }
              />
              <Blurb>Full portfolio. One user. Up to 20 assets.</Blurb>
              <FeatureList
                items={[
                  { label: "Everything in Free, plus:", on: true },
                  { label: "Portfolio workspace (up to 20 assets)", on: true },
                  { label: "Yield, cashflow & debt views", on: true },
                  { label: "Intelligence & alerts", on: true },
                  { label: "All report types", on: true },
                  { label: "Document vault with AI extraction", on: true },
                  { label: "Multi-currency", on: true },
                  { label: "Team members", on: false },
                ]}
              />
              {/* Two equal-weight CTAs — trial as visual primary (filled),
                  direct-subscribe as outlined secondary so it's visible
                  without competing for attention. The plan key carries
                  the cadence (pro_monthly / pro_annual) so the in-app
                  signup page can validate it against STRIPE_PRICE_*; the
                  intent flag tells signup to promote the direct-subscribe
                  button to primary. */}
              <DualCTA
                trialHref={`/signup?plan=pro_${billing}`}
                directHref={`/signup?plan=pro_${billing}&intent=direct`}
                directLabel={`Subscribe now — skip trial`}
              />
            </PlanCardLayout>

            {/* Team */}
            <PlanCardLayout name="Team">
              <PriceBlock
                price={formatPrice(billing === "monthly" ? teamPrice.monthly : annualMonthlyEquiv(teamPrice.annual), bill)}
                sub={
                  billing === "monthly"
                    ? "per month"
                    : `per month, billed ${formatPrice(teamPrice.annual, bill)}/year — save ${annualSavings(teamPrice, bill)}`
                }
              />
              <Blurb>Everything in Pro, plus up to 5 seats and 50 assets.</Blurb>
              <FeatureList
                items={[
                  { label: "Everything in Pro, plus:", on: true },
                  { label: "Up to 50 assets", on: true },
                  { label: "Up to 5 team members", on: true },
                  { label: "Role-based access (admin, analyst, viewer)", on: true },
                  { label: "Multiple portfolio workspaces", on: true },
                  { label: "Priority support", on: true },
                ]}
              />
              <DualCTA
                trialHref={`/signup?plan=team_${billing}`}
                directHref={`/signup?plan=team_${billing}&intent=direct`}
                directLabel={`Subscribe now — skip trial`}
                trialVariant="ghost"
              />
            </PlanCardLayout>

            {/* Enterprise */}
            <PlanCardLayout name="Enterprise">
              <PriceBlock price="Custom" sub="Talk to us" />
              <Blurb>More than 50 assets, multiple teams, or specific compliance needs.</Blurb>
              <FeatureList
                items={[
                  { label: "Everything in Team, plus:", on: true },
                  { label: "Unlimited assets", on: true },
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
            All plans include a 14-day free trial. No credit card required to start. VAT applied per local regulations.
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

function PriceBlock({ price, sub }: { price: string; sub: string }) {
  return (
    <>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="num text-[36px] lg:text-[40px] font-semibold text-[var(--color-ink)] leading-none">
          {price}
        </span>
      </div>
      <p
        className="mt-1 text-[12.5px] text-[var(--color-muted)] min-h-[36px]"
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
    <div className="mt-6 space-y-2.5">
      <CTA href={trialHref} variant={trialVariant}>
        Start 14-day free trial
      </CTA>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-[var(--color-border)]" />
        </div>
        <div className="relative flex justify-center">
          <span
            className="px-2 bg-white text-[11px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            or
          </span>
        </div>
      </div>

      <Link
        href={directHref}
        className="flex w-full items-center justify-center min-h-[40px] px-3 rounded-md text-[13.5px] font-medium text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-navy)] hover:bg-[var(--color-surface)] transition-colors"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {directLabel} →
      </Link>
    </div>
  );
}
