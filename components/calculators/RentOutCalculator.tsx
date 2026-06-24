"use client";

// Rent-out checker — Level 1 free tool. Finds the rent needed to
// cover monthly costs and the rent needed to hit a target margin.

import { useMemo, useState } from "react";
import { annuityPayment, fmtMoneyFull, fmtPct } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { CalculatorVerdictCard, type VerdictTone } from "./CalculatorVerdictCard";
import { SaveResultForm } from "./SaveResultForm";
import { StressTestTable } from "./StressTestTable";

// Recompute target rent given overridden inputs. Used by stress
// rows below — solves the same equation as the main hook.
function computeTargetRent(args: {
  mortgageBalance: number;
  mortgageRatePct: number;
  mortgageYears: number;
  serviceChargeMonthly: number;
  maintenancePctOfRent: number;
  insuranceMonthly: number;
  managementPctOfRent: number;
  vacancyMonthsPerYear: number;
  targetMarginPct: number;
}): number | null {
  const mortgagePayment =
    args.mortgageBalance > 0
      ? annuityPayment(args.mortgageBalance, args.mortgageRatePct / 100, args.mortgageYears)
      : 0;
  const fixedCosts = mortgagePayment + args.serviceChargeMonthly + args.insuranceMonthly;
  const variablePct =
    (args.maintenancePctOfRent + args.managementPctOfRent) / 100 +
    args.vacancyMonthsPerYear / 12;
  const denom = 1 - variablePct - args.targetMarginPct / 100;
  return denom > 0 ? fixedCosts / denom : null;
}

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
      <CalculatorVerdictCard
        tone={
          (r.targetRent === null
            ? "risky"
            : targetMarginPct > 25
              ? "borderline"
              : "strong") as VerdictTone
        }
        label={
          r.targetRent === null
            ? "Margin not reachable"
            : targetMarginPct > 25
              ? "Aggressive target"
              : "Workable"
        }
        keyMetric={{
          label: "Rent to hit your target",
          value: fmtMoneyFull(r.targetRent),
        }}
        summary={
          r.targetRent === null
            ? `A ${targetMarginPct}% margin isn't reachable at these cost assumptions — the variable costs alone (maintenance + management + vacancy) eat ${fmtPct(r.variablePct)} of every euro of rent. Either trim costs or accept a lower margin.`
            : `To clear your ${targetMarginPct}% margin after every cost — including ${maintenancePctOfRent}% maintenance, ${managementPctOfRent}% management and ${vacancyMonthsPerYear} months of vacancy — you need to charge ${fmtMoneyFull(r.targetRent)}/month. Anything below ${fmtMoneyFull(r.breakEvenRent)} loses money outright.`
        }
        redFlag={
          vacancyMonthsPerYear > 1
            ? `${vacancyMonthsPerYear} months of vacancy per year is a heavy assumption — every extra half-month adds about ${fmtMoneyFull((r.targetRent ?? 0) * 0.04)} to the rent you need.`
            : managementPctOfRent + maintenancePctOfRent > 25
              ? `Combined maintenance + management at ${managementPctOfRent + maintenancePctOfRent}% of rent is high — this is the lever a Pro plan would help you compress with operator benchmarking.`
              : `Insurance, service charge and ground rent are fixed costs — they don't scale with rent, so any rent below ${fmtMoneyFull(r.breakEvenRent)} produces a monthly loss.`
        }
        nextMove={
          r.targetRent === null
            ? `Drop your target margin to 10% and re-run — see whether that's even reachable at these cost levels before deciding to rent the property out.`
            : `Benchmark your target rent against the local market on /check — if it's above what comparable units achieve, the property doesn't work as a long-let at your margin.`
        }
        freeSavePrefill={{
          price: Math.round(mortgageBalance * 1.5),
          rent: Math.round(r.targetRent ?? r.breakEvenRent ?? 0),
          currency: "EUR",
          address: "Property — rent-out check",
        }}
      />
      <StressTestTable
        metricLabel="Rent needed to hit your target margin"
        rows={[
          {
            label: "Mortgage rate +200bps",
            base: fmtMoneyFull(r.targetRent),
            stressed: fmtMoneyFull(
              computeTargetRent({
                mortgageBalance,
                mortgageRatePct: mortgageRatePct + 2,
                mortgageYears,
                serviceChargeMonthly,
                maintenancePctOfRent,
                insuranceMonthly,
                managementPctOfRent,
                vacancyMonthsPerYear,
                targetMarginPct,
              }),
            ),
          },
          {
            label: "Vacancy +1 month/yr",
            base: fmtMoneyFull(r.targetRent),
            stressed: fmtMoneyFull(
              computeTargetRent({
                mortgageBalance,
                mortgageRatePct,
                mortgageYears,
                serviceChargeMonthly,
                maintenancePctOfRent,
                insuranceMonthly,
                managementPctOfRent,
                vacancyMonthsPerYear: vacancyMonthsPerYear + 1,
                targetMarginPct,
              }),
            ),
          },
          {
            label: "Service charge +25%",
            base: fmtMoneyFull(r.targetRent),
            stressed: fmtMoneyFull(
              computeTargetRent({
                mortgageBalance,
                mortgageRatePct,
                mortgageYears,
                serviceChargeMonthly: serviceChargeMonthly * 1.25,
                maintenancePctOfRent,
                insuranceMonthly,
                managementPctOfRent,
                vacancyMonthsPerYear,
                targetMarginPct,
              }),
            ),
          },
        ]}
        caption="Each row shows how much rent you'd need to charge if one assumption moves against you. If the stressed rent is above local market rates, the property doesn't work as a long-let."
      />
      <SaveResultForm calc="rent-out" calcName="Rent-out" summary={summary} />
    </>
  );
}
