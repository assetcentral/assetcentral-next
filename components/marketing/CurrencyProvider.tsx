"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  COUNTRY_CURRENCY,
  CURRENCY_SYMBOLS,
  type CurrencyCode,
  formatMoney,
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

export function Money({ eur, short = false }: { eur: number; short?: boolean }) {
  const { format } = useCurrency();
  return <>{format(eur, { short })}</>;
}
