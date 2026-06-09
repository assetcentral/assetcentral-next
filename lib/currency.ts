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

// Visible currency mark. Single glyphs (€, $, £) sit directly against
// the number. Multi-letter ISO codes (AED, CHF) get a separator inserted
// at render time and are styled in the surrounding sans-serif font, so
// they don't read like code when placed inside a `.num` (mono) wrapper.
export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  AED: "AED",
  CHF: "CHF",
};

/** True when the "symbol" is actually a multi-letter ISO code (AED,
 *  CHF) rather than a single glyph. Used by the renderer to insert a
 *  non-breaking space between the code and the digits, and to style
 *  the code as sans-serif inside a `.num`-wrapped value. */
export function isCodePrefix(code: CurrencyCode): boolean {
  return CURRENCY_SYMBOLS[code].length > 1;
}

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

/** Numeric portion of a converted amount — no symbol, no sign. The
 *  symbol is rendered separately so it can be styled in the surrounding
 *  sans-serif font even when the amount sits inside a `.num` mono span. */
export function formatAmount(
  eurAmount: number,
  target: CurrencyCode,
  style: FormatStyle = "full",
): string {
  const local = convertFromEur(eurAmount, target);
  return formatAbs(Math.abs(local), style);
}

/** Format a positive number into the short or full digit string used by
 *  CountUp's animation tick. Pulled out of formatMoney so CountUp can
 *  call it directly on the in-flight animated value without rebuilding
 *  the sign-handling logic. */
export function formatAbs(abs: number, style: FormatStyle): string {
  if (style === "short") {
    if (abs >= 1_000_000) return `${(abs / 1_000_000).toFixed(2)}m`;
    if (abs >= 100_000) return `${(abs / 1_000).toFixed(0)}k`;
    if (abs >= 10_000) return `${(abs / 1_000).toFixed(1)}k`;
  }
  return Math.round(abs).toLocaleString("en-GB");
}

export function formatMoney(
  eurAmount: number,
  target: CurrencyCode,
  style: FormatStyle = "full",
): string {
  const local = convertFromEur(eurAmount, target);
  const abs = Math.abs(local);
  const sign = local < 0 ? "−" : "";
  const symbol = CURRENCY_SYMBOLS[target];
  // Multi-letter codes get a non-breaking space between code and digits;
  // single glyphs sit directly against the digits.
  const sep = isCodePrefix(target) ? " " : "";
  return `${sign}${symbol}${sep}${formatAbs(abs, style)}`;
}
