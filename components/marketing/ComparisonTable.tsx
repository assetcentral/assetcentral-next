"use client";

import { useCurrency } from "./CurrencyProvider";
import { billingFor, formatPrice, PLAN_PRICES } from "@/lib/pricing";

// Plan-comparison rows. 2026-06 pricing rework moved the platform from a
// feature-gated model (Free vs Paid drove which agents and surfaces a
// user could see) to a SCOPE-gated model: every tier gets every feature;
// the difference is how many properties, how many seats, and how many
// voice minutes you get. Source of truth lives in
// assetcentral-app/lib/billing/limits.ts.
//
// The retired "Free" column has been replaced by Individual €19/mo. All
// four columns now mark every capability as included; tier-specific
// scope shows up in the cap rows (properties, seats, voice minutes,
// workspaces, SSO/DPA, support level).
const rows = [
  { group: "AC Agent Team", label: "Personal Assistant", values: [true, true, true, true] },
  { group: "AC Agent Team", label: "Chief Financial Officer", values: [true, true, true, true] },
  { group: "AC Agent Team", label: "Chief Investment Officer", values: [true, true, true, true] },
  { group: "AC Agent Team", label: "Chief Operations Officer", values: [true, true, true, true] },
  { group: "AC Agent Team", label: "Your CEO — ranked actions, Decision Room", values: [true, true, true, true] },
  { group: "Portfolio", label: "Properties tracked", values: ["Up to 3", "Up to 50", "Up to 50", "Unlimited"] },
  { group: "Portfolio", label: "Calculators (IRR, Short-term Rental, Retrofit, Ownership)", values: [true, true, true, true] },
  { group: "Portfolio", label: "Multi-currency (AED, EUR, GBP, USD…)", values: [true, true, true, true] },
  { group: "Intelligence", label: "Real net yield + benchmarks", values: [true, true, true, true] },
  { group: "Intelligence", label: "Sell vs hold analyser", values: [true, true, true, true] },
  { group: "Intelligence", label: "Acquisition simulator", values: [true, true, true, true] },
  { group: "Alerts", label: "22 alert types (email + WhatsApp)", values: [true, true, true, true] },
  { group: "Documents", label: "Document vault + AI extraction", values: [true, true, true, true] },
  { group: "Documents", label: "Data ingestion (WhatsApp / email / file)", values: [true, true, true, true] },
  { group: "Reports", label: "Refinancing pack, investor pack, tax report", values: [true, true, true, true] },
  { group: "Voice", label: "Voice line to your AI team (per month)", values: ["30 min", "120 min", "Unlimited", "Unlimited"] },
  { group: "Team seats", label: "Users included", values: ["1 user", "1 user", "2–5 users", "Unlimited"] },
  { group: "Team seats", label: "Additional seats (accountant / advisor)", values: [false, false, "Up to 4", "Unlimited"] },
  { group: "Team seats", label: "Multiple portfolio workspaces", values: [false, false, true, true] },
  { group: "Team seats", label: "SSO + audit logging", values: [false, false, false, true] },
  { group: "Team seats", label: "Custom DPA + data residency", values: [false, false, false, true] },
  { group: "Support", label: "Email support", values: [true, true, true, true] },
  { group: "Support", label: "Priority support", values: [false, false, true, true] },
  { group: "Support", label: "Dedicated account manager", values: [false, false, false, true] },
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
  const teamMonthly = formatPrice(PLAN_PRICES.team[bill].monthly, bill);

  const tiers = [
    { name: "Individual", price: `${individualMonthly}/mo` },
    { name: "Pro", price: `${proMonthly}/mo`, popular: true },
    { name: "Team", price: `${teamMonthly}/mo` },
    { name: "Enterprise", price: "Custom" },
  ];

  let lastGroup = "";
  return (
    <section className="bg-white border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <h2
          className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)] mb-10"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Compare plans
        </h2>
        <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
          <table
            className="min-w-[640px] w-full text-left border-collapse"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <thead>
              <tr>
                <th className="py-3 pr-6 text-[12px] uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Feature
                </th>
                {tiers.map((t) => (
                  <th key={t.name} className="py-3 px-4 text-center min-w-[120px]">
                    <div
                      className={`text-[15px] font-semibold ${
                        t.popular ? "text-[var(--color-navy)]" : "text-[var(--color-ink)]"
                      }`}
                    >
                      {t.name}
                    </div>
                    <div className="text-[12px] text-[var(--color-muted)]">{t.price}</div>
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
      </div>
    </section>
  );
}
