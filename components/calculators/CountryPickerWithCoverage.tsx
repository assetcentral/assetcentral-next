// Two-optgroup country picker for the marketing calculator surfaces.
// Mirrors the app's CountryPickerWithCoverage so the marketing site and
// the in-app calculators present countries the same way:
//
//   Detailed coverage   — the markets we model in full (mortgage rules,
//                          LTV caps, transfer-tax brackets)
//   Other countries     — the rest of the ISO list; calculator falls
//                          back to a generic model with a clear notice
//
// Both groups alphabetical. Full-coverage entries show their flag for
// faster recognition; basic-coverage entries skip the flag to keep the
// long alphabetical list visually quiet.
//
// Parent contract: pass the current display name, get the resolved
// CountryCode + coverage flag back via the onResolve callback so the
// calculator can render results against the right rule and decide
// whether to show the fallback notice.

"use client";

import { useEffect } from "react";
import {
  FULL_COVERAGE_COUNTRIES,
  BASIC_COVERAGE_COUNTRIES,
  resolveCountryForCalculator,
} from "@/lib/countries-catalogue";
import type { CountryCode } from "@/lib/mortgage-rules";

interface Props {
  /** Current display name. Use displayNameForCode(code) from the
   *  catalogue to seed this from the calculator's existing default. */
  value: string;
  onChange: (displayName: string) => void;
  /** Resolved CountryCode + coverage status, fired whenever the
   *  resolution changes (initial render + every user pick). Lets the
   *  parent calculator drive its rule lookup without re-implementing
   *  the resolution logic. */
  onResolve?: (resolved: { code: CountryCode; isBasicCoverage: boolean }) => void;
  /** Fallback CountryCode for basic-coverage picks. Typically the
   *  calculator's previously-selected covered country, or "GB" as the
   *  global English-property-market default. */
  fallbackCode: CountryCode;
  /** Label rendered above the select. */
  label?: string;
  className?: string;
}

export function CountryPickerWithCoverage({
  value,
  onChange,
  onResolve,
  fallbackCode,
  label = "Country",
  className,
}: Props) {
  const resolved = resolveCountryForCalculator(value, fallbackCode);

  // Notify parent of resolution on every change. useEffect (not inline)
  // so the parent's setState during render is avoided — React 18+ flags
  // that as a "Cannot update a component while rendering a different
  // component" warning otherwise.
  useEffect(() => {
    onResolve?.({ code: resolved.code, isBasicCoverage: resolved.isBasicCoverage });
  }, [resolved.code, resolved.isBasicCoverage, onResolve]);

  return (
    <div className={className}>
      <span
        className="block text-[11px] uppercase tracking-[0.08em] text-[var(--color-muted)] mb-1"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--color-border)] bg-white px-3 min-h-[48px] text-[14.5px] text-[var(--color-ink)] focus:border-[var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]/10"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <optgroup label="Detailed coverage">
          {FULL_COVERAGE_COUNTRIES.map((c) => (
            <option key={c.iso2} value={c.name}>
              {c.flag ? `${c.flag} ` : ""}
              {c.name} ({c.currency})
            </option>
          ))}
        </optgroup>
        <optgroup label="Other countries — illustrative results">
          {BASIC_COVERAGE_COUNTRIES.map((c) => (
            <option key={c.iso2} value={c.name}>
              {c.name}
            </option>
          ))}
        </optgroup>
      </select>
      {resolved.isBasicCoverage && (
        // Amber notice — same posture as the app picker: tell the user
        // the result is illustrative, name the fallback model, and
        // suggest reviewing with a local lender before acting.
        <p
          className="mt-2 text-[12.5px] leading-[1.55] text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          We don&rsquo;t have specific mortgage rules for <strong>{value}</strong> yet —
          results below use a generic model (United Kingdom rules as the
          stand-in). Use as a rough guide and review with a local lender
          before acting on the numbers.
        </p>
      )}
    </div>
  );
}
