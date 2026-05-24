"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { convertFromEur, CURRENCY_SYMBOLS } from "@/lib/currency";
import { useCurrency } from "./CurrencyProvider";

type Props = {
  /** Plain numeric value to animate to. Ignored when `eur` is provided. */
  to?: number;
  /** Base-EUR amount. When provided, the component animates to the visitor's
   *  local currency equivalent and renders the currency symbol itself. */
  eur?: number;
  /** Use short money format (e.g. €3.84m, £42k) when `eur` is provided. */
  short?: boolean;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  format?: (n: number) => string;
  className?: string;
  style?: React.CSSProperties;
};

export function CountUp({
  to,
  eur,
  short = false,
  duration = 1.2,
  prefix = "",
  suffix = "",
  decimals = 0,
  format,
  className = "",
  style,
}: Props) {
  const currency = useCurrency();
  const isMoney = typeof eur === "number";
  const target = isMoney ? convertFromEur(eur!, currency.code) : (to ?? 0);

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const mv = useMotionValue(0);

  const text = useTransform(mv, (latest) => {
    if (isMoney) {
      return formatLocalMoney(latest, currency.code, short);
    }
    const n = decimals > 0 ? Number(latest.toFixed(decimals)) : Math.round(latest);
    if (format) return format(n);
    return `${prefix}${n.toLocaleString()}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, target, duration, mv]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const unsub = text.on("change", (v) => {
      node.textContent = String(v);
    });
    node.textContent = String(text.get());
    return () => unsub();
  }, [text]);

  return <span ref={ref} className={className} style={style} />;
}

function formatLocalMoney(
  local: number,
  code: keyof typeof CURRENCY_SYMBOLS,
  short: boolean,
): string {
  const abs = Math.abs(local);
  const sign = local < 0 ? "−" : "";
  const sym = CURRENCY_SYMBOLS[code];
  if (short) {
    if (abs >= 1_000_000) return `${sign}${sym}${(abs / 1_000_000).toFixed(2)}m`;
    if (abs >= 100_000) return `${sign}${sym}${(abs / 1_000).toFixed(0)}k`;
    if (abs >= 10_000) return `${sign}${sym}${(abs / 1_000).toFixed(1)}k`;
  }
  return `${sign}${sym}${Math.round(abs).toLocaleString("en-GB")}`;
}
