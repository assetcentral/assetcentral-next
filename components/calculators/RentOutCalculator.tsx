"use client";

// Rent-out checker — Level 1 free tool. Finds the rent needed to
// cover monthly costs and the rent needed to hit a target margin.

import { useMemo, useState } from "react";
import { annuityPayment, fmtMoneyFull, fmtPct } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { SaveResultForm } from "./SaveResultForm";

export function RentOutCalculator() {
  const [mortgageBalance, setMortgageBalance] = useState(200_000);
  const [mortgageRatePct, setMortgageRatePct] = useState(5.0);
  const [mortgageYears, setMortgageYears] = useState(25);
  const [serviceChargeMonthly, setServiceChargeMonthly] = useState(180);
  const [maintenancePctOfRent, setMaintenancePctOfRent] = useState(10);
  const [insuranceMonthly, setInsuranceMonthly] = useState(35);
  const [managementPctOfRent, setManagementPctOfRent] = useState(10);
  const [vacancyMonthsPerYear, setVacancyMonthsPerYear] = useState(0.5);
  const [targetMarginPct, setTargetMarginPct] = useState(15);

  const r = useMemo(() => {
    const mortgagePayment = mortgageBalance > 0
      ? annuityPayment(mortgageBalance, mortgageRatePct / 100, mortgageYears)
      : 0;
    const fixedCosts = mortgagePayment + serviceChargeMonthly + insuranceMonthly;
    const variablePct =
      (maintenancePctOfRent + managementPctOfRent) / 100 +
      vacancyMonthsPerYear / 12;
    // breakEvenRent solves: rent * (1 - variablePct) = fixedCosts
    const breakEvenRent =
      1 - variablePct > 0 ? fixedCosts / (1 - variablePct) : null;
    // targetRent solves: rent * (1 - variablePct) = fixedCosts + targetMargin * rent
    // => rent * (1 - variablePct - targetMarginPct/100) = fixedCosts
    const targetDenominator = 1 - variablePct - targetMarginPct / 100;
    const targetRent = targetDenominator > 0 ? fixedCosts / targetDenominator : null;
    const sample = targetRent ?? breakEvenRent ?? 0;
    const effectiveRent = sample * (1 - vacancyMonthsPerYear / 12);
    const sampleNet = effectiveRent
      - mortgagePayment
      - serviceChargeMonthly
      - insuranceMonthly
      - sample * (maintenancePctOfRent / 100)
      - sample * (managementPctOfRent / 100);
    const sampleMarginPct = sample > 0 ? sampleNet / sample : null;

    return {
      mortgagePayment,
      fixedCosts,
      variablePct,
      breakEvenRent,
      targetRent,
      sampleNet,
      sampleMarginPct,
    };
  }, [
    mortgageBalance,
    mortgageRatePct,
    mortgageYears,
    serviceChargeMonthly,
    maintenancePctOfRent,
    insuranceMonthly,
    managementPctOfRent,
    vacancyMonthsPerYear,
    targetMarginPct,
  ]);

  const summary = [
    "Rent-out checker result",
    `Inputs: mortgage €${mortgageBalance.toLocaleString()} at ${mortgageRatePct}% over ${mortgageYears} yrs, service charge €${serviceChargeMonthly}/mo, insurance €${insuranceMonthly}/mo, maintenance ${maintenancePctOfRent}%, management ${managementPctOfRent}%, vacancy ${vacancyMonthsPerYear} mo/yr, target margin ${targetMarginPct}%`,
    `Outputs: mortgage payment ${fmtMoneyFull(r.mortgagePayment)}, fixed costs ${fmtMoneyFull(r.fixedCosts)}/mo, break-even rent ${fmtMoneyFull(r.breakEvenRent)}/mo, target rent ${fmtMoneyFull(r.targetRent)}/mo, sample monthly net at target rent ${fmtMoneyFull(r.sampleNet)}`,
  ].join("\n");

  return (
    <>
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5 lg:gap-7 items-start">
        <CalcCard title="Inputs">
          <div className="grid sm:grid-cols-2 gap-4">
            <NumberField label="Mortgage balance" prefix="€" value={mortgageBalance} onChange={setMortgageBalance} step={5000} min={0} />
            <NumberField label="Mortgage rate" suffix="%" value={mortgageRatePct} onChange={setMortgageRatePct} step={0.1} min={0} />
            <NumberField label="Mortgage term" suffix="yrs" value={mortgageYears} onChange={setMortgageYears} step={1} min={1} max={40} />
            <NumberField label="Service charge" prefix="€" value={serviceChargeMonthly} onChange={setServiceChargeMonthly} step={10} min={0} hint="Per month" />
            <NumberField label="Insurance" prefix="€" value={insuranceMonthly} onChange={setInsuranceMonthly} step={5} min={0} hint="Per month" />
            <NumberField label="Maintenance allowance" suffix="%" value={maintenancePctOfRent} onChange={setMaintenancePctOfRent} step={1} min={0} max={50} hint="Of rent" />
            <NumberField label="Management fee" suffix="%" value={managementPctOfRent} onChange={setManagementPctOfRent} step={1} min={0} max={30} hint="Of rent" />
            <NumberField label="Vacancy" suffix="mo/yr" value={vacancyMonthsPerYear} onChange={setVacancyMonthsPerYear} step={0.5} min={0} max={12} />
            <NumberField label="Target margin" suffix="%" value={targetMarginPct} onChange={setTargetMarginPct} step={1} min={0} max={50} hint="On rent collected" />
          </div>
        </CalcCard>

        <CalcCard title="Results">
          <div className="space-y-6">
            <Stat label="Break-even rent" value={fmtMoneyFull(r.breakEvenRent)} tone="neutral" big />
            <div className="grid grid-cols-2 gap-5">
              <Stat
                label="Rent to hit target margin"
                value={fmtMoneyFull(r.targetRent)}
                tone="positive"
              />
              <Stat label="Mortgage payment" value={fmtMoneyFull(r.mortgagePayment)} />
              <Stat label="Fixed costs (mo)" value={fmtMoneyFull(r.fixedCosts)} />
              <Stat label="Variable costs % rent" value={fmtPct(r.variablePct)} />
              <Stat
                label="Monthly net at target"
                value={fmtMoneyFull(r.sampleNet)}
                tone={r.sampleNet > 0 ? "positive" : "negative"}
              />
              <Stat label="Effective margin" value={fmtPct(r.sampleMarginPct)} />
            </div>
            <div
              className="pt-4 border-t border-[var(--color-border)] text-[13px] leading-[1.55] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Break-even is what you must charge just to cover the bills. Target rent is what you need to hit the margin you set. Pro adds tax-adjusted scenarios and rent-vs-benchmark intelligence.
            </div>
          </div>
        </CalcCard>
      </div>
      <SaveResultForm calc="rent-out" calcName="Rent-out" summary={summary} />
    </>
  );
}
