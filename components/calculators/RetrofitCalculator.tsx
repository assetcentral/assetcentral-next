"use client";

import { useMemo, useState } from "react";
import { fmtMoneyFull, fmtPct, npv } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { CalculatorVerdictCard, type VerdictTone } from "./CalculatorVerdictCard";
import { SaveResultForm } from "./SaveResultForm";
import { StressTestTable } from "./StressTestTable";

function computeRetrofitNpv(args: {
  upgradeCost: number;
  monthlyRentUplift: number;
  valuationUplift: number;
  holdYears: number;
  discountRate: number;
  voidsLostMonths: number;
  voidsLostRent: number;
}): number {
  const annualUplift = args.monthlyRentUplift * 12;
  const cfs: number[] = [-args.upgradeCost - args.voidsLostMonths * args.voidsLostRent];
  for (let y = 1; y <= args.holdYears; y++) cfs.push(annualUplift);
  cfs[cfs.length - 1] += args.valuationUplift;
  return npv(args.discountRate / 100, cfs);
}

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
    <CalculatorVerdictCard
      tone={
        (r.projectNpv > 10000
          ? "strong"
          : r.projectNpv > 0
            ? "borderline"
            : "risky") as VerdictTone
      }
      label={
        r.projectNpv > 10000
          ? "Worth doing"
          : r.projectNpv > 0
            ? "Marginal"
            : "Skip"
      }
      keyMetric={{
        label: "Project NPV at your hurdle",
        value: fmtMoneyFull(r.projectNpv),
      }}
      summary={
        r.projectNpv > 10000
          ? `The project clears your ${discountRate}% hurdle by ${fmtMoneyFull(r.projectNpv)}. ${r.paybackYears && isFinite(r.paybackYears) ? r.paybackYears.toFixed(1) + "-year payback" : "Long payback"}, ${fmtPct(r.upliftPctOfCost)} annual yield on the works.`
          : r.projectNpv > 0
            ? `NPV is positive (${fmtMoneyFull(r.projectNpv)}) but only just — the project clears your hurdle with little margin. Easy for cost overruns or void extensions to flip it negative.`
            : `NPV is negative (${fmtMoneyFull(r.projectNpv)}) at your ${discountRate}% hurdle. Your capital does better elsewhere — bonds, equities or a different property.`
      }
      redFlag={
        voidsLostMonths < 2
          ? `Void during refurb assumed at ${voidsLostMonths} months. Most retrofits over-run — 3-month voids are common and add ${fmtMoneyFull(voidsLostRent)} of lost rent. Re-run at 3 months before committing.`
          : monthlyRentUplift > propertyValue * 0.0005
            ? `Rent uplift of ${fmtMoneyFull(monthlyRentUplift)}/mo on a €${(propertyValue / 1000).toFixed(0)}k property is aggressive. Verify against actual let comps in your area before betting.`
            : `Upgrade cost of ${fmtMoneyFull(upgradeCost)} is the most-underestimated input in retrofits. Add a 20% contingency; if NPV still works, the project is robust.`
      }
      nextMove={
        r.projectNpv < 0
          ? `Phase the works — defer cosmetic upgrades and only do what's needed for tenancy. Most "wishlist" retrofits don't earn their NPV.`
          : `Get a fixed-price quote rather than a day-rate quote. The single biggest NPV killer here is the 20-40% cost overrun on a renovation that started without one.`
      }
      freeSavePrefill={{
        price: Math.round(propertyValue),
        rent: Math.round(voidsLostRent),
        currency: "EUR",
        address: "Property under retrofit consideration",
      }}
    />
    <StressTestTable
      metricLabel="Project NPV under stress"
      rows={[
        {
          label: "Upgrade cost +20%",
          base: fmtMoneyFull(r.projectNpv),
          stressed: fmtMoneyFull(
            computeRetrofitNpv({
              upgradeCost: upgradeCost * 1.2,
              monthlyRentUplift,
              valuationUplift,
              holdYears,
              discountRate,
              voidsLostMonths,
              voidsLostRent,
            }),
          ),
        },
        {
          label: "Rent uplift −20%",
          base: fmtMoneyFull(r.projectNpv),
          stressed: fmtMoneyFull(
            computeRetrofitNpv({
              upgradeCost,
              monthlyRentUplift: monthlyRentUplift * 0.8,
              valuationUplift,
              holdYears,
              discountRate,
              voidsLostMonths,
              voidsLostRent,
            }),
          ),
        },
        {
          label: "Void +1 month",
          base: fmtMoneyFull(r.projectNpv),
          stressed: fmtMoneyFull(
            computeRetrofitNpv({
              upgradeCost,
              monthlyRentUplift,
              valuationUplift,
              holdYears,
              discountRate,
              voidsLostMonths: voidsLostMonths + 1,
              voidsLostRent,
            }),
          ),
        },
      ]}
      caption="Retrofits are sensitive to cost overruns and void extensions — the three rows above are the most common ways NPV gets eaten."
    />
    <SaveResultForm calc="retrofit" calcName="Retrofit" summary={summary} />
    </>
  );
}
