"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  convertFromEur,
  CURRENCY_SYMBOLS,
  formatAbs,
  isCodePrefix,
} from "@/lib/currency";
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

  // The animated text — for money mode, this is JUST the digit portion
  // (no symbol). The symbol is rendered as a static sibling span so the
  // ISO-code prefix (AED, CHF) can be styled in sans-serif via the
  // .money-prefix class instead of inheriting the parent's `.num`
  // monospace, which made "AED" read like code and pushed an oversized
  // space between code and digits.
  const text = useTransform(mv, (latest) => {
    if (isMoney) {
      const sign = latest < 0 ? "−" : "";
      return `${sign}${formatAbs(Math.abs(latest), short ? "short" : "full")}`;
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

  if (isMoney) {
    const symbol = CURRENCY_SYMBOLS[currency.code];
    const isCode = isCodePrefix(currency.code);
    return (
      <>
        {isCode ? <span className="money-prefix">{symbol}</span> : symbol}
        <span ref={ref} className={className} style={style} />
      </>
    );
  }
  return <span ref={ref} className={className} style={style} />;
}
