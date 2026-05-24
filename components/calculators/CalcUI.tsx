"use client";

import { useId } from "react";

export function CalcCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--color-border)] bg-white ${className}`}
    >
      {title && (
        <div
          className="px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] text-[12px] uppercase tracking-[0.12em] text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.10em" }}
        >
          {title}
        </div>
      )}
      <div className="p-5 lg:p-6">{children}</div>
    </div>
  );
}

/**
 * Format a number for display in the input field.
 * Integers get thousands separators; non-integers keep their decimals as-typed.
 * NaN/empty render as "".
 */
function formatForDisplay(value: number): string {
  if (!Number.isFinite(value)) return "";
  // For non-integer values, render plainly so the user can type "4.5" and see "4.5".
  if (!Number.isInteger(value)) return String(value);
  // Integers with absolute value >= 1000 get commas.
  if (Math.abs(value) >= 1000) return value.toLocaleString("en-GB");
  return String(value);
}

/**
 * Parse a user-entered string back to a number. Strips commas and whitespace,
 * preserves a single decimal point and an optional leading minus.
 */
function parseUserInput(raw: string): number {
  const cleaned = raw.replace(/[\s,]/g, "").trim();
  if (cleaned === "" || cleaned === "-" || cleaned === "." || cleaned === "-.") return NaN;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

export function NumberField({
  label,
  hint,
  value,
  onChange,
  suffix,
  prefix,
  step = 1,
  min,
  max,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  prefix?: string;
  step?: number;
  min?: number;
  max?: number;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="block" style={{ fontFamily: "var(--font-sans)" }}>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[13px] font-medium text-[var(--color-ink)]">{label}</span>
        {hint && <span className="text-[11.5px] text-[var(--color-muted)]">{hint}</span>}
      </div>
      <div className="flex items-stretch min-h-[44px] rounded-md border border-[var(--color-border)] bg-white focus-within:border-[var(--color-navy)] focus-within:ring-2 focus-within:ring-[var(--color-navy)]/10 transition">
        {prefix && (
          <span className="inline-flex items-center px-3 text-[13.5px] text-[var(--color-muted)] border-r border-[var(--color-border)] bg-[var(--color-surface)]">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={formatForDisplay(value)}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            onChange(parseUserInput(e.target.value));
          }}
          className="num flex-1 px-3 py-2 text-[14.5px] text-[var(--color-ink)] bg-transparent outline-none"
        />
        {suffix && (
          <span className="inline-flex items-center px-3 text-[13.5px] text-[var(--color-muted)] border-l border-[var(--color-border)] bg-[var(--color-surface)]">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

export function Stat({
  label,
  value,
  tone,
  big,
}: {
  label: string;
  value: string;
  tone?: "positive" | "warning" | "negative" | "neutral";
  big?: boolean;
}) {
  const valueColor =
    tone === "positive"
      ? "text-[var(--color-positive)]"
      : tone === "warning"
        ? "text-[var(--color-warning)]"
        : tone === "negative"
          ? "text-[var(--color-negative)]"
          : "text-[var(--color-ink)]";
  return (
    <div>
      <div
        className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </div>
      <div
        className={`num font-semibold leading-tight ${valueColor} ${big ? "text-[32px] lg:text-[40px]" : "text-[20px]"}`}
      >
        {value}
      </div>
    </div>
  );
}
