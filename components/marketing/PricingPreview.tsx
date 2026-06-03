"use client";

import Link from "next/link";
import { useCurrency } from "./CurrencyProvider";
import {
  annualDiscountPct,
  billingFor,
  BILLING_CURRENCY_LABEL,
  formatPrice,
  PLAN_PRICES,
} from "@/lib/pricing";

export function PricingPreview() {
  const { code } = useCurrency();
  const bill = billingFor(code);
  const pro = PLAN_PRICES.pro[bill];
  const team = PLAN_PRICES.team[bill];

  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pricing
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The full team for €49 a month.
          </h2>
          <p
            className="mt-3 text-[14px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Showing prices in {BILLING_CURRENCY_LABEL[bill]}.{" "}
            <Link href="/pricing" className="text-[var(--color-accent)] font-medium hover:underline">
              Switch currency →
            </Link>
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          <PlanCard
            name="Free"
            price={formatPrice(0, bill)}
            cadence="forever"
            blurb="Add up to 3 properties, see basic yield and understand what your AI Agent Team can unlock."
            cta={{ label: "Add your first property", href: "/signup" }}
          />
          <PlanCard
            name="Pro"
            price={formatPrice(pro.monthly, bill)}
            cadence="per month"
            annualDiscount={annualDiscountPct(pro)}
            blurb="Full AC Agent Team. Up to 50 properties. €49/month."
            cta={{ label: "Start 7-day free trial", href: "/signup?plan=pro_monthly" }}
            altCta={{ label: "Subscribe now", href: "/signup?plan=pro_monthly&intent=direct" }}
            popular
          />
          <PlanCard
            name="Team"
            price={formatPrice(team.monthly, bill)}
            cadence="per month"
            annualDiscount={annualDiscountPct(team)}
            blurb="Everything in Pro, plus up to 5 seats and up to 50 properties."
            cta={{ label: "Start 7-day free trial", href: "/signup?plan=team_monthly" }}
            altCta={{ label: "Subscribe now", href: "/signup?plan=team_monthly&intent=direct" }}
          />
        </div>

        <p
          className="mt-8 text-[14px] text-[var(--color-muted)] text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          7-day free trial on Pro and Team. No credit card required. Free covers up to 3 properties.{" "}
          <Link
            href="/pricing"
            className="text-[var(--color-accent)] font-medium hover:underline"
          >
            See full pricing →
          </Link>
        </p>
        <p
          className="mt-2 text-[14px] text-[var(--color-muted)] text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          More than 50 properties?{" "}
          <a
            href="mailto:hello@assetcentral.ai?subject=Enterprise%20enquiry"
            className="text-[var(--color-accent)] font-medium hover:underline"
          >
            Talk to us about Enterprise →
          </a>
        </p>
      </div>
    </section>
  );
}

type Plan = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  cta: { label: string; href: string };
  /** Optional secondary "skip the trial" link rendered beneath the
   *  primary CTA as a quiet text link. Lets high-intent buyers go
   *  straight to Checkout without crowding the card with two big
   *  buttons. */
  altCta?: { label: string; href: string };
  popular?: boolean;
  /** Percentage discount when subscribing annually instead of monthly.
   *  Rendered as a small green "Save XX% with annual" chip directly
   *  under the price. Only paid plans pass this — Free has no annual. */
  annualDiscount?: number;
};

function PlanCard({ name, price, cadence, blurb, cta, altCta, popular, annualDiscount }: Plan) {
  return (
    <article
      className={`relative rounded-2xl bg-white p-7 lg:p-8 flex flex-col ${
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
      <h3
        className="text-[22px] font-semibold text-[var(--color-navy)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {name}
      </h3>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="num text-[36px] lg:text-[40px] font-semibold text-[var(--color-ink)] leading-none">
          {price}
        </span>
        <span
          className="text-[13.5px] text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {cadence}
        </span>
      </div>
      {annualDiscount !== undefined && annualDiscount > 0 && (
        // Small inline chip immediately under the monthly headline price.
        // Keeps the monthly amount as the dominant reading — the chip is
        // information, not a competing price. Buyers who want to lock in
        // the discount click into /pricing and pick the annual toggle.
        <div className="mt-2">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11.5px] font-semibold text-emerald-800"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Save {annualDiscount}% with annual billing
          </span>
        </div>
      )}
      <p
        className="mt-4 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {blurb}
      </p>

      {/* CTA hierarchy:
          - When altCta exists (paid plans) the direct-subscribe is the
            visual PRIMARY: filled navy button. Trial is the secondary
            outlined button below it. Surfaces what the business wants
            to convert toward (paid customers) while keeping the trial
            available for prospects who need the safety net.
          - When altCta is absent (Free / Enterprise) the cta stays as
            the primary using the same filled-vs-outlined logic as
            before. */}
      {altCta ? (
        <>
          <Link
            href={altCta.href}
            className="mt-6 flex w-full items-center justify-center min-h-[48px] px-4 rounded-md text-[14.5px] font-semibold bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {altCta.label} →
          </Link>
          <p
            className="mt-1.5 text-center text-[11px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Charged today via Stripe · cancel anytime
          </p>
          <Link
            href={cta.href}
            className="mt-2.5 flex w-full items-center justify-center min-h-[44px] px-4 rounded-md text-[13.5px] font-medium text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-navy)] hover:text-[var(--color-navy)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {cta.label} →
          </Link>
        </>
      ) : (
        <Link
          href={cta.href}
          className={`mt-6 flex w-full items-center justify-center min-h-[48px] px-4 rounded-md text-[14.5px] font-medium transition-colors ${
            popular
              ? "bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)]"
              : "border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-navy)]"
          }`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {cta.label} →
        </Link>
      )}
    </article>
  );
}
