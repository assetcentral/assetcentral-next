"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  COUNTRY_CURRENCY,
  CURRENCY_SYMBOLS,
  type CurrencyCode,
  formatAmount,
  formatMoney,
  isCodePrefix,
  isCurrencyCode,
} from "@/lib/currency";

type Ctx = {
  code: CurrencyCode;
  symbol: string;
  format: (eur: number, opts?: { short?: boolean }) => string;
  ready: boolean;
};

const CurrencyContext = createContext<Ctx>({
  code: "EUR",
  symbol: CURRENCY_SYMBOLS.EUR,
  format: (eur, opts) => formatMoney(eur, "EUR", opts?.short ? "short" : "full"),
  ready: false,
});

const STORAGE_KEY = "ac_currency_v1";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState<CurrencyCode>("EUR");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Use a cached choice for the rest of the browser session.
    try {
      const cached = sessionStorage.getItem(STORAGE_KEY);
      if (cached && isCurrencyCode(cached)) {
        setCode(cached);
        setReady(true);
        return;
      }
    } catch {
      /* sessionStorage may be unavailable (private mode, etc.) */
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        let chosen: CurrencyCode = "EUR";

        if (isCurrencyCode(d.currency)) {
          chosen = d.currency as CurrencyCode;
        } else if (typeof d.country_code === "string") {
          const mapped = COUNTRY_CURRENCY[d.country_code as keyof typeof COUNTRY_CURRENCY];
          if (mapped) chosen = mapped;
        }
        try {
          sessionStorage.setItem(STORAGE_KEY, chosen);
        } catch {}
        setCode(chosen);
      })
      .catch(() => {
        /* network blocked, ad blocker, offline — silently keep EUR */
      })
      .finally(() => {
        clearTimeout(timeout);
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      code,
      symbol: CURRENCY_SYMBOLS[code],
      format: (eur, opts) => formatMoney(eur, code, opts?.short ? "short" : "full"),
      ready,
    }),
    [code, ready],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

/** Render a EUR base amount converted to the visitor's currency.
 *
 *  Structural output (not a plain string) so the ISO-code prefix (AED,
 *  CHF) can be styled in sans-serif while the digit portion inherits
 *  whatever `.num` / mono treatment its container applies. Single-glyph
 *  symbols (€, $, £) sit directly against the digits with no prefix
 *  span — the visual weight matches the digits and they don't need the
 *  override.
 *
 *  Negative amounts render the minus sign in front of the symbol so
 *  "−€1,200" / "−AED 4,800" reads naturally regardless of prefix type. */
export function Money({ eur, short = false }: { eur: number; short?: boolean }) {
  const { code } = useCurrency();
  const symbol = CURRENCY_SYMBOLS[code];
  const isCode = isCodePrefix(code);
  const negative = eur < 0;
  const amount = formatAmount(eur, code, short ? "short" : "full");
  return (
    <>
      {negative && "−"}
      {isCode ? <span className="money-prefix">{symbol}</span> : symbol}
      {amount}
    </>
  );
}
