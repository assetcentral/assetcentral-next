"use client";

import { useMemo, useState } from "react";
import { annuityPayment, fmtMoneyFull, fmtPct, irr } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { SaveResultForm } from "./SaveResultForm";

export function IRRCalculator() {
  const [price, setPrice] = useState(500_000);
  const [depositPct, setDepositPct] = useState(35);
  const [mortRate, setMortRate] = useState(4.2);
  const [mortYears, setMortYears] = useState(25);
  const [annualRent, setAnnualRent] = useState(28_000);
  const [growthPct, setGrowthPct] = useState(2);
  const [costsPct, setCostsPct] = useState(20);
  const [holdYears, setHoldYears] = useState(10);
  const [exitGrowthPct, setExitGrowthPct] = useState(3);

  const result = useMemo(() => {
    if (
      [price, depositPct, mortRate, mortYears, annualRent, growthPct, costsPct, holdYears, exitGrowthPct].some(
        (v) => !isFinite(v),
      )
    )
      return null;

    const deposit = (price * depositPct) / 100;
    const loan = price - deposit;
    const monthlyPay = annuityPayment(loan, mortRate / 100, mortYears);
    const annualPay = monthlyPay * 12;

    const cashflows: number[] = [];
    cashflows.push(-deposit);

    let principal = loan;
    let rent = annualRent;
    for (let y = 1; y <= holdYears; y++) {
      const grossRent = rent;
      const operatingCosts = grossRent * (costsPct / 100);
      const interestPaid = y === 1 ? monthlyPay * 12 * 0.6 : annualPay * 0.4; // rough split — actual amortisation tracked below
      // Proper amortisation: simulate 12 months for this year
      let interestYear = 0;
      let principalYear = 0;
      for (let m = 0; m < 12; m++) {
        if (principal <= 0) break;
        const interest = principal * (mortRate / 100 / 12);
        const principalPaid = Math.max(0, monthlyPay - interest);
        interestYear += interest;
        principalYear += Math.min(principalPaid, principal);
        principal = Math.max(0, principal - principalPaid);
      }
      void interestPaid; // silence "unused"

      const netBeforeDebt = grossRent - operatingCosts;
      const cashFromOps = netBeforeDebt - annualPay;
      cashflows.push(cashFromOps);

      rent = rent * (1 + growthPct / 100);
    }

    // Exit value & loan balance at exit
    const exitValue = price * Math.pow(1 + exitGrowthPct / 100, holdYears);
    const exitProceeds = exitValue - principal; // pay off remaining loan
    // Add exit proceeds onto final-year cashflow
    cashflows[cashflows.length - 1] += exitProceeds;

    const yr1Net = annualRent * (1 - costsPct / 100) - annualPay;
    const grossYield = annualRent / price;
    const netYieldYr1 = (annualRent * (1 - costsPct / 100)) / price;
    const cashOnCashYr1 = deposit > 0 ? yr1Net / deposit : null;
    const i = irr(cashflows);

    return {
      deposit,
      loan,
      monthlyPay,
      annualPay,
      cashflows,
      exitValue,
      exitProceeds,
      yr1Net,
      grossYield,
      netYieldYr1,
      cashOnCashYr1,
      irr: i,
    };
  }, [price, depositPct, mortRate, mortYears, annualRent, growthPct, costsPct, holdYears, exitGrowthPct]);

  const summary = [
    `IRR Calculator result`,
    `Inputs: price €${price.toLocaleString()}, deposit ${depositPct}%, mortgage ${mortRate}% over ${mortYears} yrs, annual rent €${annualRent.toLocaleString()}, rent growth ${growthPct}%, costs ${costsPct}% of rent, hold ${holdYears} yrs, capital growth ${exitGrowthPct}%`,
    `Outputs: IRR ${fmtPct(result?.irr ?? null, 1)}, gross yield ${fmtPct(result?.grossYield ?? null)}, net yield ${fmtPct(result?.netYieldYr1 ?? null)}, cash-on-cash ${fmtPct(result?.cashOnCashYr1 ?? null)}, year-1 cashflow ${fmtMoneyFull(result?.yr1Net ?? null)}, deposit ${fmtMoneyFull(result?.deposit ?? null)}, loan ${fmtMoneyFull(result?.loan ?? null)}, monthly payment ${fmtMoneyFull(result?.monthlyPay ?? null)}, exit value ${fmtMoneyFull(result?.exitValue ?? null)}`,
  ].join("\n");

  return (
    <>
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5 lg:gap-7 items-start">
      <CalcCard title="Inputs">
        <div className="grid sm:grid-cols-2 gap-4">
          <NumberField label="Purchase price" prefix="€" value={price} onChange={setPrice} step={5000} min={0} />
          <NumberField label="Deposit" suffix="%" value={depositPct} onChange={setDepositPct} step={1} min={0} max={100} />
          <NumberField label="Mortgage rate" suffix="%" value={mortRate} onChange={setMortRate} step={0.1} min={0} />
          <NumberField label="Mortgage term" suffix="yrs" value={mortYears} onChange={setMortYears} step={1} min={1} max={40} />
          <NumberField label="Annual gross rent" prefix="€" value={annualRent} onChange={setAnnualRent} step={500} min={0} />
          <NumberField label="Rent growth p.a." suffix="%" value={growthPct} onChange={setGrowthPct} step={0.5} />
          <NumberField label="Operating costs" suffix="% of rent" value={costsPct} onChange={setCostsPct} step={1} min={0} max={100} hint="Mgmt, voids, repairs" />
          <NumberField label="Hold period" suffix="yrs" value={holdYears} onChange={setHoldYears} step={1} min={1} max={40} />
          <NumberField label="Capital growth p.a." suffix="%" value={exitGrowthPct} onChange={setExitGrowthPct} step={0.5} />
        </div>
      </CalcCard>

      <CalcCard title="Results">
        <div className="space-y-6">
          <Stat
            label="IRR (levered)"
            value={fmtPct(result?.irr ?? null, 1)}
            tone={result?.irr != null && result.irr > 0.08 ? "positive" : "neutral"}
            big
          />

          <div className="grid grid-cols-2 gap-5">
            <Stat label="Gross yield" value={fmtPct(result?.grossYield ?? null)} />
            <Stat label="Net yield (yr 1)" value={fmtPct(result?.netYieldYr1 ?? null)} />
            <Stat label="Cash-on-cash (yr 1)" value={fmtPct(result?.cashOnCashYr1 ?? null)} />
            <Stat label="Year-1 cashflow" value={fmtMoneyFull(result?.yr1Net ?? null)} tone={result && result.yr1Net < 0 ? "negative" : undefined} />
          </div>

          <div className="pt-4 border-t border-[var(--color-border)] grid grid-cols-2 gap-5">
            <Stat label="Deposit" value={fmtMoneyFull(result?.deposit ?? null)} />
            <Stat label="Loan" value={fmtMoneyFull(result?.loan ?? null)} />
            <Stat label="Monthly payment" value={fmtMoneyFull(result?.monthlyPay ?? null)} />
            <Stat label="Exit value" value={fmtMoneyFull(result?.exitValue ?? null)} />
          </div>
        </div>
      </CalcCard>
    </div>
    <SaveResultForm calc="irr" calcName="IRR" summary={summary} />
    </>
  );
}
