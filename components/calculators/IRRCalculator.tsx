"use client";

import { useMemo, useState } from "react";
import { annuityPayment, fmtMoneyFull, fmtPct, irr } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { CalculatorVerdictCard, type VerdictTone } from "./CalculatorVerdictCard";
import { SaveResultForm } from "./SaveResultForm";
import { StressTestTable } from "./StressTestTable";

// Re-runs the IRR engine with overridden inputs — used by the stress
// test to compute what-if scenarios without duplicating the math.
function computeIrr(args: {
  price: number;
  depositPct: number;
  mortRate: number;
  mortYears: number;
  annualRent: number;
  growthPct: number;
  costsPct: number;
  holdYears: number;
  exitGrowthPct: number;
}): number | null {
  const deposit = (args.price * args.depositPct) / 100;
  const loan = args.price - deposit;
  const monthlyPay = annuityPayment(loan, args.mortRate / 100, args.mortYears);
  const annualPay = monthlyPay * 12;
  let principal = loan;
  let rent = args.annualRent;
  const cashflows: number[] = [-deposit];
  for (let y = 1; y <= args.holdYears; y++) {
    const net = rent * (1 - args.costsPct / 100);
    for (let m = 0; m < 12; m++) {
      if (principal <= 0) break;
      const interest = principal * (args.mortRate / 100 / 12);
      const principalPaid = Math.max(0, monthlyPay - interest);
      principal = Math.max(0, principal - principalPaid);
    }
    cashflows.push(net - annualPay);
    rent *= 1 + args.growthPct / 100;
  }
  const exit = args.price * Math.pow(1 + args.exitGrowthPct / 100, args.holdYears);
  cashflows[cashflows.length - 1] += exit - principal;
  return irr(cashflows);
}

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
    {result && (
      <>
        <CalculatorVerdictCard
          tone={
            (result.irr === null || result.irr < 0.05
              ? "risky"
              : result.irr < 0.08
                ? "borderline"
                : "strong") as VerdictTone
          }
          label={
            result.irr === null
              ? "Numbers don't compute"
              : result.irr < 0.05
                ? "Weak"
                : result.irr < 0.08
                  ? "Borderline"
                  : "Strong"
          }
          keyMetric={{
            label: "Levered IRR over hold",
            value: fmtPct(result.irr ?? null, 1),
          }}
          summary={
            result.irr === null
              ? `These inputs don't produce a sensible IRR — usually means the cash flow is negative every year and the exit doesn't recover the deposit. Either drop the price assumption or accept that this property is a capital-growth bet, not an income bet.`
              : result.irr < 0.05
                ? `${fmtPct(result.irr, 1)} over ${holdYears} years lags inflation in most markets and undershoots what dividend equities or even cash deposits offer today. The year-1 cashflow of ${fmtMoneyFull(result.yr1Net)} confirms this is a capital-growth bet — if growth disappoints, you lose.`
                : result.irr < 0.08
                  ? `${fmtPct(result.irr, 1)} is reasonable but not great — it beats inflation and ties up your capital for ${holdYears} years to do so. The year-1 cashflow of ${fmtMoneyFull(result.yr1Net)} gives you some income while you wait for the exit to crystallise.`
                  : `${fmtPct(result.irr, 1)} over ${holdYears} years comfortably beats the 7-8% threshold most private investors use as a "go" line. The combination of ${fmtPct(result.cashOnCashYr1 ?? null)} year-1 cash-on-cash and ${exitGrowthPct}%/yr capital growth is doing the work.`
          }
          redFlag={
            exitGrowthPct > 4
              ? `${exitGrowthPct}%/yr capital growth is a bold assumption — drop it to 2% and the IRR halves. This deal is leaning on the exit, not the income.`
              : costsPct < 15
                ? `${costsPct}% operating cost is optimistic — most long-let portfolios run 18-22% once management, voids, repairs and insurance are honest. Stress-test at 25%.`
                : result.yr1Net < 0
                  ? `Year-1 cashflow is negative (${fmtMoneyFull(result.yr1Net)}/yr). You're funding the property every month until rent growth catches up — make sure you have the reserve to do so.`
                  : `Mortgage rate locked at ${mortRate}% for ${mortYears} years. If your fix expires before exit and rates step up 200bps, the yr-1 cashflow falls by ${fmtMoneyFull((annualRent * (1 - costsPct / 100)) - annuityPayment(price * (1 - depositPct / 100), (mortRate + 2) / 100, mortYears) * 12 - result.yr1Net)}.`
          }
          nextMove={
            result.irr === null || result.irr < 0.05
              ? `Negotiate the price down 10% and re-run — every euro off the price drops straight into your IRR.`
              : result.irr < 0.08
                ? `Stress-test the exit price assumption. If the IRR holds at 0% capital growth, the deal stands on income alone — that's the strong version of this bet.`
                : `Run the same property through a different LTV (try 80% in the Ownership Comparator). Leverage amplifies IRR when capital growth is positive — this is where the real number is.`
          }
          freeSavePrefill={{
            price: Math.round(price),
            rent: Math.round(annualRent / 12),
            currency: "EUR",
            address: "Property from IRR calculator",
          }}
        />
        <StressTestTable
          metricLabel="Levered IRR under stress"
          rows={[
            {
              label: "Mortgage rate +200bps",
              base: fmtPct(result.irr, 1),
              stressed: fmtPct(
                computeIrr({
                  price,
                  depositPct,
                  mortRate: mortRate + 2,
                  mortYears,
                  annualRent,
                  growthPct,
                  costsPct,
                  holdYears,
                  exitGrowthPct,
                }),
                1,
              ),
            },
            {
              label: "Rent growth −1%/yr",
              base: fmtPct(result.irr, 1),
              stressed: fmtPct(
                computeIrr({
                  price,
                  depositPct,
                  mortRate,
                  mortYears,
                  annualRent,
                  growthPct: growthPct - 1,
                  costsPct,
                  holdYears,
                  exitGrowthPct,
                }),
                1,
              ),
            },
            {
              label: "Capital growth −2%/yr",
              base: fmtPct(result.irr, 1),
              stressed: fmtPct(
                computeIrr({
                  price,
                  depositPct,
                  mortRate,
                  mortYears,
                  annualRent,
                  growthPct,
                  costsPct,
                  holdYears,
                  exitGrowthPct: Math.max(0, exitGrowthPct - 2),
                }),
                1,
              ),
            },
          ]}
          caption="Each row holds everything else constant and shifts one assumption. The full sensitivity grid (every combination, year by year) lives in Individual."
        />
      </>
    )}
    <SaveResultForm calc="irr" calcName="IRR" summary={summary} />
    </>
  );
}
