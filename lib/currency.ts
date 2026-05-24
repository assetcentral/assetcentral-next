export const CURRENCY_CODES = ["EUR", "USD", "GBP", "AED", "CHF"] as const;
export type CurrencyCode = (typeof CURRENCY_CODES)[number];

// Approximate FX vs EUR. Marketing-display only — not for transactions.
// 1 EUR = N units of target currency.
export const FX_VS_EUR: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  AED: 3.97,
  CHF: 0.95,
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  AED: "AED ",
  CHF: "CHF ",
};

// Country code → preferred display currency. Covers our likely audience.
// Anything not listed falls back to EUR.
export const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  // Eurozone
  AT: "EUR", BE: "EUR", CY: "EUR", DE: "EUR", EE: "EUR", ES: "EUR",
  FI: "EUR", FR: "EUR", GR: "EUR", HR: "EUR", IE: "EUR", IT: "EUR",
  LT: "EUR", LU: "EUR", LV: "EUR", MT: "EUR", NL: "EUR", PT: "EUR",
  SI: "EUR", SK: "EUR", MC: "EUR", AD: "EUR", SM: "EUR", VA: "EUR",
  // USD-area
  US: "USD", EC: "USD", PR: "USD",
  // Sterling-area
  GB: "GBP", UK: "GBP", JE: "GBP", IM: "GBP", GG: "GBP",
  // Gulf — AED is the most familiar for our Dubai-heavy ICP
  AE: "AED",
  // Switzerland & Liechtenstein
  CH: "CHF", LI: "CHF",
};

export function isCurrencyCode(v: unknown): v is CurrencyCode {
  return typeof v === "string" && (CURRENCY_CODES as readonly string[]).includes(v);
}

export function convertFromEur(eurAmount: number, target: CurrencyCode): number {
  return eurAmount * FX_VS_EUR[target];
}

type FormatStyle = "full" | "short";

export function formatMoney(
  eurAmount: number,
  target: CurrencyCode,
  style: FormatStyle = "full",
): string {
  const local = convertFromEur(eurAmount, target);
  const abs = Math.abs(local);
  const sign = local < 0 ? "−" : "";
  const symbol = CURRENCY_SYMBOLS[target];

  if (style === "short") {
    if (abs >= 1_000_000) return `${sign}${symbol}${(abs / 1_000_000).toFixed(2)}m`;
    if (abs >= 100_000) return `${sign}${symbol}${(abs / 1_000).toFixed(0)}k`;
    if (abs >= 10_000) return `${sign}${symbol}${(abs / 1_000).toFixed(1)}k`;
  }
  return `${sign}${symbol}${Math.round(abs).toLocaleString("en-GB")}`;
}
