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
  const starter = PLAN_PRICES.individual[bill];
  const pro = PLAN_PRICES.pro[bill];

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
            Run the numbers first for free.
            <br />
            Upgrade when the decision gets serious.
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
            tagline="Run the first numbers"
            price={formatPrice(0, bill)}
            cadence="forever"
            blurb="Every Level 1 calculator + the free AI property check. 1 saved property. No card. Build the habit before you buy."
            cta={{ label: "Run a free check", href: "/check" }}
          />
          <PlanCard
            name="Starter"
            tagline="Unlock the full property report"
            price={formatPrice(starter.monthly, bill)}
            cadence="per month"
            annualDiscount={annualDiscountPct(starter)}
            blurb="For a serious decision on one or several properties. Full report, 10-year forecast, scenarios, PDF export, saved properties + comparison."
            cta={{ label: "Try free for 7 days", href: "/signup?plan=individual_monthly" }}
            altCta={{ label: "Subscribe now", href: "/signup?plan=individual_monthly&intent=direct" }}
            popular
          />
          <PlanCard
            name="Pro"
            tagline="Model, monitor and manage your portfolio"
            price={formatPrice(pro.monthly, bill)}
            cadence="per month"
            annualDiscount={annualDiscountPct(pro)}
            blurb="For owners and investors with 2–50 properties. Portfolio dashboard, the 5-agent AI team, alerts, document vault, decision memos."
            cta={{ label: "Try free for 7 days", href: "/signup?plan=pro_monthly" }}
            altCta={{ label: "Subscribe now", href: "/signup?plan=pro_monthly&intent=direct" }}
          />
        </div>

        <p
          className="mt-8 text-[14px] text-[var(--color-muted)] text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          7-day Starter and Pro trials — no credit card required to start.{" "}
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
          Brokers, family offices, advisor firms or 50+ properties?{" "}
          <Link
            href="/pricing"
            className="text-[var(--color-accent)] font-medium hover:underline"
          >
            See Team &amp; Enterprise →
          </Link>
        </p>
      </div>
    </section>
  );
}

type Plan = {
  name: string;
  /** Short tagline shown beneath the plan name — the new tier-spec
   *  framing: "Run the first numbers" / "Unlock the full property
   *  report" / "Model, monitor and manage your portfolio". */
  tagline?: string;
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

function PlanCard({ name, tagline, price, cadence, blurb, cta, altCta, popular, annualDiscount }: Plan) {
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
      {/* Fixed-height header zone — locks the position of the Subscribe
          button below so all three Subscribe buttons align horizontally
          across cards regardless of which has a discount chip / longer
          plan name. min-h bumped from 110 → 138 to accommodate the new
          tagline line ("Run the first numbers" / "Unlock the full
          report" / "Model, monitor and manage your portfolio") that
          sits between the plan name and the price. */}
      <div className="min-h-[138px]">
        <h3
          className="text-[22px] font-semibold text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {name}
        </h3>
        {tagline && (
          <p
            className="mt-1 text-[13px] uppercase tracking-[0.08em] text-[var(--color-accent)] font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {tagline}
          </p>
        )}
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
          // information, not a competing price.
          <div className="mt-2">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11.5px] font-semibold text-emerald-800"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Save {annualDiscount}% with annual billing
            </span>
          </div>
        )}
      </div>

      {/* CTA hierarchy:
          - When altCta exists (paid plans) the direct-subscribe is the
            visual PRIMARY: filled navy button. Trial is the secondary
            outlined button below it. CTAs sit DIRECTLY UNDER THE PRICE
            so the buyer's eye goes price → action without scrolling past
            the description block first — the previous layout buried both
            buttons at the bottom of the card and was suppressing intent.
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

      {/* Blurb moved BELOW the CTAs as part of the 2026-06 reorder so
          the principal subscribe action sits directly under the price.
          Readers who want detail still see it; readers who already know
          what they want hit the button without scrolling past the
          marketing copy. */}
      <p
        className="mt-6 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {blurb}
      </p>
    </article>
  );
}
