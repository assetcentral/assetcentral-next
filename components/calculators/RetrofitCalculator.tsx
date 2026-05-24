"use client";

import { useMemo, useState } from "react";
import { fmtMoneyFull, fmtPct, npv } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { SaveResultForm } from "./SaveResultForm";

export function RetrofitCalculator() {
  const [propertyValue, setPropertyValue] = useState(350_000);
  const [upgradeCost, setUpgradeCost] = useState(28_000);
  const [monthlyRentUplift, setMonthlyRentUplift] = useState(180);
  const [valuationUplift, setValuationUplift] = useState(20_000);
  const [holdYears, setHoldYears] = useState(8);
  const [discountRate, setDiscountRate] = useState(6);
  const [voidsLostMonths, setVoidsLostMonths] = useState(2);
  const [voidsLostRent, setVoidsLostRent] = useState(1400);

  const r = useMemo(() => {
    const annualUplift = monthlyRentUplift * 12;
    const lostDuringRefurb = -voidsLostMonths * voidsLostRent;
    const yearlyCashflow = annualUplift;

    // Cashflows: yr0 = -cost + lost rent; yrs 1..N = annual uplift; yrN += valuationUplift
    const cfs: number[] = [];
    cfs.push(-upgradeCost + lostDuringRefurb);
    for (let y = 1; y <= holdYears; y++) cfs.push(yearlyCashflow);
    cfs[cfs.length - 1] += valuationUplift;

    const projectNpv = npv(discountRate / 100, cfs);

    // Simple payback (ignoring time value)
    const paybackYears = annualUplift > 0 ? (upgradeCost + voidsLostMonths * voidsLostRent) / annualUplift : null;

    const upliftPctOfCost = upgradeCost > 0 ? annualUplift / upgradeCost : null;
    const upliftPctOfValue = propertyValue > 0 ? annualUplift / propertyValue : null;

    const totalUpliftOverHold = annualUplift * holdYears + valuationUplift - upgradeCost + lostDuringRefurb;

    return {
      annualUplift,
      lostDuringRefurb,
      projectNpv,
      paybackYears,
      upliftPctOfCost,
      upliftPctOfValue,
      totalUpliftOverHold,
    };
  }, [
    propertyValue,
    upgradeCost,
    monthlyRentUplift,
    valuationUplift,
    holdYears,
    discountRate,
    voidsLostMonths,
    voidsLostRent,
  ]);

  const summary = [
    "Retrofit Cost Calculator result",
    `Inputs: property value €${propertyValue.toLocaleString()}, upgrade cost €${upgradeCost.toLocaleString()}, monthly rent uplift €${monthlyRentUplift}, valuation uplift €${valuationUplift.toLocaleString()}, hold ${holdYears} yrs, discount rate ${discountRate}%, void during refurb ${voidsLostMonths} mo, current monthly rent €${voidsLostRent}`,
    `Outputs: project NPV ${fmtMoneyFull(r.projectNpv)}, payback ${r.paybackYears && isFinite(r.paybackYears) ? r.paybackYears.toFixed(1) + " yrs" : "—"}, annual yield on cost ${fmtPct(r.upliftPctOfCost)}, annual rent uplift ${fmtMoneyFull(r.annualUplift)}, total net over hold ${fmtMoneyFull(r.totalUpliftOverHold)}`,
  ].join("\n");

  return (
    <>
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5 lg:gap-7 items-start">
      <CalcCard title="Inputs">
        <div className="grid sm:grid-cols-2 gap-4">
          <NumberField label="Property value" prefix="€" value={propertyValue} onChange={setPropertyValue} step={5000} min={0} />
          <NumberField label="Upgrade cost" prefix="€" value={upgradeCost} onChange={setUpgradeCost} step={500} min={0} hint="All-in, including VAT" />
          <NumberField label="Monthly rent uplift" prefix="€" value={monthlyRentUplift} onChange={setMonthlyRentUplift} step={10} min={0} />
          <NumberField label="Valuation uplift" prefix="€" value={valuationUplift} onChange={setValuationUplift} step={500} min={0} hint="At sale" />
          <NumberField label="Hold period" suffix="yrs" value={holdYears} onChange={setHoldYears} step={1} min={1} max={30} />
          <NumberField label="Discount rate" suffix="%" value={discountRate} onChange={setDiscountRate} step={0.5} min={0} hint="Your hurdle rate" />
          <NumberField label="Void during refurb" suffix="months" value={voidsLostMonths} onChange={setVoidsLostMonths} step={0.5} min={0} max={12} />
          <NumberField label="Current monthly rent" prefix="€" value={voidsLostRent} onChange={setVoidsLostRent} step={50} min={0} hint="For void calc" />
        </div>
      </CalcCard>

      <CalcCard title="Results">
        <div className="space-y-6">
          <Stat
            label="Project NPV"
            value={fmtMoneyFull(r.projectNpv)}
            tone={r.projectNpv >= 0 ? "positive" : "negative"}
            big
          />
          <div className="grid grid-cols-2 gap-5">
            <Stat
              label="Payback (simple)"
              value={r.paybackYears && isFinite(r.paybackYears) ? `${r.paybackYears.toFixed(1)} yrs` : "—"}
            />
            <Stat
              label="Annual yield on cost"
              value={fmtPct(r.upliftPctOfCost)}
              tone={r.upliftPctOfCost && r.upliftPctOfCost > 0.08 ? "positive" : "neutral"}
            />
            <Stat label="Annual rent uplift" value={fmtMoneyFull(r.annualUplift)} />
            <Stat
              label="Total net (hold period)"
              value={fmtMoneyFull(r.totalUpliftOverHold)}
              tone={r.totalUpliftOverHold >= 0 ? "positive" : "negative"}
            />
          </div>
          <div
            className="pt-4 border-t border-[var(--color-border)] text-[13px] leading-[1.55] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            NPV bakes in your discount rate — a positive figure means the project beats your hurdle. Payback ignores time value; useful for sanity checks but not for ranking projects.
          </div>
        </div>
      </CalcCard>
    </div>
    <SaveResultForm calc="retrofit" calcName="Retrofit" summary={summary} />
    </>
  );
}
