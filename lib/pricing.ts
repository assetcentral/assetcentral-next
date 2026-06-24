import { CURRENCY_SYMBOLS } from "./currency";

/** Currencies in which subscriptions are billed. */
export const BILLING_CURRENCIES = ["EUR", "USD", "GBP", "AED"] as const;
export type BillingCurrency = (typeof BILLING_CURRENCIES)[number];

export function isBillingCurrency(v: unknown): v is BillingCurrency {
  return typeof v === "string" && (BILLING_CURRENCIES as readonly string[]).includes(v);
}

/** Pretty per-currency labels for pricing UI. */
export const BILLING_CURRENCY_LABEL: Record<BillingCurrency, string> = {
  EUR: "EUR · €",
  USD: "USD · $",
  GBP: "GBP · £",
  AED: "AED · د.إ",
};

// PlanId — Free reinstated alongside Individual / Pro / Team /
// Enterprise as of the "Don't Buy Blind" repositioning. The 2026-06
// retirement note (Individual replaces Free) no longer applies — the
// B2C funnel landing on /check needs a no-card entry point above
// Individual so visitors who run the AI verdict can save the result
// and come back without paying anything.
//
// Tier ladder now reads:
//   Free        — 1 saved property + unlimited /check runs
//   Individual  — €19/mo, 1-3 properties
//   Pro         — €49/mo, up to 50 properties (popular)
//   Team        — €199/mo, 2-5 users
//   Enterprise  — custom
//
// PLAN_PRICES still excludes "free" because there's nothing to charge.
// The tier exists for UI/feature-gating only.
export type PlanId =
  | "free"
  | "individual"
  | "pro"
  | "team"
  | "enterprise";

type Price = { monthly: number; annual: number };

/**
 * Per-market subscription pricing. Not derived from FX — these are the actual
 * prices we bill in each currency. Annual = 10 months of the monthly rate
 * (the "save 2 months" convention).
 *
 * Individual is the entry tier replacing Free. Priced for the 1-3 property
 * private owner who's just getting started — low enough to be impulse-
 * acceptable, high enough to signal "this is a serious tool, not freeware."
 */
export const PLAN_PRICES: Record<
  Exclude<PlanId, "free" | "enterprise">,
  Record<BillingCurrency, Price>
> = {
  individual: {
    EUR: { monthly: 19, annual: 190 },
    USD: { monthly: 25, annual: 250 },
    GBP: { monthly: 17, annual: 170 },
    AED: { monthly: 99, annual: 990 },
  },
  pro: {
    EUR: { monthly: 49, annual: 490 },
    USD: { monthly: 59, annual: 590 },
    GBP: { monthly: 39, annual: 390 },
    AED: { monthly: 249, annual: 2490 },
  },
  team: {
    EUR: { monthly: 199, annual: 1990 },
    USD: { monthly: 240, annual: 2400 },
    GBP: { monthly: 189, annual: 1890 },
    AED: { monthly: 990, annual: 9900 },
  },
};

/** Pick the best billing currency for a detected display currency. */
export function billingFor(displayCode: string): BillingCurrency {
  if (isBillingCurrency(displayCode)) return displayCode;
  // CHF and unsupported codes → default to EUR (closest market).
  return "EUR";
}

export function formatPrice(amount: number, code: BillingCurrency): string {
  const symbol = CURRENCY_SYMBOLS[code];
  return `${symbol}${amount.toLocaleString("en-GB")}`;
}

/** Annual monthly-equivalent: annual price divided by 12, rounded. */
export function annualMonthlyEquiv(annual: number): number {
  return Math.round(annual / 12);
}

/** Savings (months equivalent of monthly cost) vs paying monthly for a year. */
export function annualSavings(price: Price, code: BillingCurrency): string {
  const monthlyYear = price.monthly * 12;
  const save = monthlyYear - price.annual;
  return formatPrice(save, code);
}

/** Percentage discount when subscribing annually vs paying monthly for a year.
 *  Used in the "Save X% with annual" badge that appears next to the monthly
 *  headline price. The number is consistent across currencies (we use the
 *  "save 2 months" convention so the ratio is the same everywhere) but we
 *  derive it from the actual prices so any currency-specific override would
 *  still produce the right percentage. */
export function annualDiscountPct(price: Price): number {
  const monthlyYear = price.monthly * 12;
  if (monthlyYear === 0) return 0;
  return Math.round(((monthlyYear - price.annual) / monthlyYear) * 100);
}
