"use client";

import Link from "next/link";
import { useCurrency } from "./CurrencyProvider";
import { billingFor, formatPrice, PLAN_PRICES } from "@/lib/pricing";

// 2026-06 "Run the numbers first" repositioning. Three-tier ladder
// matches the new freemium/trial model:
//   • Free      — Run the first numbers (calculators + 1 saved property)
//   • Individual   — Unlock the full property report (7-day trial, no card)
//   • Pro       — Model, monitor and manage your portfolio
//
// Team and Enterprise still exist for brokers, family offices and 50+
// property portfolios — but they're surfaced as a footer strip rather
// than as competing columns, so the 3-tier ladder reads cleanly for
// the dominant B2C visitor.
//
// Source of truth for the underlying capability split lives in
// assetcentral-app/lib/billing/limits.ts. The marketing label
// "Individual" maps to the app's `individual` tier — only the
// presentation differs.
const rows = [
  { group: "What you can do", label: "Run the eight Level 1 calculators", values: [true, true, true] },
  { group: "What you can do", label: "Free AI property check (verdict + red flag + next move)", values: [true, true, true] },
  { group: "What you can do", label: "Email the check result", values: [true, true, true] },
  { group: "What you can do", label: "Full property decision report", values: [false, true, true] },
  { group: "What you can do", label: "10-year cash-flow forecast", values: [false, true, true] },
  { group: "What you can do", label: "Scenario analysis (rate-shock, rent-growth, capital-growth)", values: [false, true, true] },
  { group: "What you can do", label: "Sell vs hold analyser", values: [false, true, true] },
  { group: "What you can do", label: "Refinance scenarios", values: [false, true, true] },
  { group: "What you can do", label: "Property comparison", values: [false, true, true] },
  { group: "What you can do", label: "PDF + Word export", values: [false, true, true] },
  { group: "Properties", label: "Saved properties", values: ["1", "Up to 3", "Up to 50"] },
  { group: "Properties", label: "Multi-currency tracking", values: [false, true, true] },
  { group: "Portfolio (Pro only)", label: "Portfolio dashboard", values: [false, false, true] },
  { group: "Portfolio (Pro only)", label: "5-agent AI team (CIO · CFO · COO · PA · CEO)", values: [false, false, true] },
  { group: "Portfolio (Pro only)", label: "Monitoring alerts (22 alert types)", values: [false, false, true] },
  { group: "Portfolio (Pro only)", label: "Document vault + AI extraction", values: [false, false, true] },
  { group: "Portfolio (Pro only)", label: "Voice line to your AI team", values: [false, false, true] },
  { group: "Portfolio (Pro only)", label: "Lender-ready packs (Refinancing / Investor / Tax)", values: [false, false, true] },
  { group: "Support", label: "Email support", values: [true, true, true] },
  { group: "Support", label: "Priority support", values: [false, false, true] },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="text-[var(--color-positive)]" aria-label="included">
        ✓
      </span>
    );
  if (v === false)
    return (
      <span className="text-[var(--color-border)]" aria-label="not included">
        —
      </span>
    );
  return <span className="text-[12.5px] text-[var(--color-ink)]">{v}</span>;
}

export function ComparisonTable() {
  const { code } = useCurrency();
  const bill = billingFor(code);
  const individualMonthly = formatPrice(PLAN_PRICES.individual[bill].monthly, bill);
  const proMonthly = formatPrice(PLAN_PRICES.pro[bill].monthly, bill);

  const tiers = [
    { name: "Free", price: formatPrice(0, bill), sub: "Run the first numbers" },
    { name: "Individual", price: `${individualMonthly}/mo`, sub: "Unlock the full report", popular: true },
    { name: "Pro", price: `${proMonthly}/mo`, sub: "Portfolio command centre" },
  ];

  let lastGroup = "";
  return (
    <section className="bg-white border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <h2
          className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)] mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Compare Free, Individual and Pro
        </h2>
        <p
          className="text-[14px] text-[var(--color-muted)] mb-10 max-w-2xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Free is the on-ramp. Individual unlocks the full decision report.
          Pro adds the portfolio dashboard, AI agents and monitoring for
          owners of 2&ndash;50 properties.
        </p>
        <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
          <table
            className="min-w-[560px] w-full text-left border-collapse"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <thead>
              <tr>
                <th className="py-3 pr-6 text-[12px] uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Feature
                </th>
                {tiers.map((t) => (
                  <th key={t.name} className="py-3 px-4 text-center min-w-[140px]">
                    <div
                      className={`text-[15px] font-semibold ${
                        t.popular ? "text-[var(--color-navy)]" : "text-[var(--color-ink)]"
                      }`}
                    >
                      {t.name}
                    </div>
                    <div className="text-[12px] text-[var(--color-muted)]">{t.price}</div>
                    <div className="text-[11px] text-[var(--color-muted)] italic mt-0.5">
                      {t.sub}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const groupChanged = r.group !== lastGroup;
                lastGroup = r.group;
                return (
                  <tr key={r.label} className="border-t border-[var(--color-border)]">
                    <td className="py-3 pr-6 text-[13.5px] text-[var(--color-ink)]">
                      {groupChanged && (
                        <div className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1">
                          {r.group}
                        </div>
                      )}
                      {r.label}
                    </td>
                    {r.values.map((v, i) => (
                      <td key={i} className="py-3 px-4 text-center text-[14px]">
                        <Cell v={v} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Team + Enterprise footer — kept off the main three-column grid
            so the freemium → trial → portfolio ladder reads cleanly for
            the dominant B2C visitor. Brokers / family offices / 50+
            property buyers self-select into this strip. */}
        <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-7 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-center">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)] font-semibold mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Team &amp; Enterprise
            </p>
            <h3
              className="text-[20px] lg:text-[24px] text-[var(--color-navy)] font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Brokers, family offices, advisor firms or 50+ properties.
            </h3>
            <p
              className="mt-2 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Team adds 2&ndash;5 users with role-based access, multiple
              portfolio workspaces and partner co-branding. Enterprise lifts
              the cap to unlimited properties + SSO + DPA + a dedicated
              account manager.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-semibold transition hover:bg-[var(--color-navy-light)] justify-self-start lg:justify-self-end"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            See Team &amp; Enterprise →
          </Link>
        </div>
      </div>
    </section>
  );
}
