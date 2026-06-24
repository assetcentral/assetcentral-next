"use client";

// Sell-or-hold checker — Level 1 free tool. Compares the return on
// equity from holding (cash flow + capital growth) against the return
// from selling and putting the equity to work elsewhere (alt return).
// Outputs a plain-English hold-vs-sell signal.

import { useMemo, useState } from "react";
import { fmtMoneyFull, fmtPct } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { SaveResultForm } from "./SaveResultForm";

export function SellOrHoldCalculator() {
  const [currentValue, setCurrentValue] = useState(350_000);
  const [outstandingMortgage, setOutstandingMortgage] = useState(180_000);
  const [monthlyNetCashflow, setMonthlyNetCashflow] = useState(420);
  const [expectedCapitalGrowthPct, setExpectedCapitalGrowthPct] = useState(3);
  const [sellingCostsPct, setSellingCostsPct] = useState(3);
  const [altReturnPct, setAltReturnPct] = useState(6);
  const [horizonYears, setHorizonYears] = useState(5);

  const r = useMemo(() => {
    const equityToday = currentValue - outstandingMortgage;
    const sellingCosts = currentValue * (sellingCostsPct / 100);
    const netEquityIfSold = Math.max(0, equityToday - sellingCosts);

    const annualCashflow = monthlyNetCashflow * 12;
    const cashflowOverHorizon = annualCashflow * horizonYears;

    // Naive growth — value compounds, mortgage stays flat (close enough for
    // a Level-1 sense check; refinancing / amortisation is a Pro feature).
    const valueAtHorizon = currentValue * (1 + expectedCapitalGrowthPct / 100) ** horizonYears;
    const equityAtHorizon = Math.max(0, valueAtHorizon - outstandingMortgage);
    const sellingCostsAtHorizon = valueAtHorizon * (sellingCostsPct / 100);
    const netEquityAtHorizon = Math.max(0, equityAtHorizon - sellingCostsAtHorizon);

    const holdEndingWealth = netEquityAtHorizon + cashflowOverHorizon;
    const sellEndingWealth = netEquityIfSold * (1 + altReturnPct / 100) ** horizonYears;

    const cashOnEquityPct = equityToday > 0 ? annualCashflow / equityToday : null;
    const holdAdvantage = holdEndingWealth - sellEndingWealth;

    const signal: "hold" | "sell" | "borderline" =
      Math.abs(holdAdvantage) / Math.max(1, sellEndingWealth) < 0.05
        ? "borderline"
        : holdAdvantage > 0
          ? "hold"
          : "sell";

    return {
      equityToday,
      netEquityIfSold,
      annualCashflow,
      cashOnEquityPct,
      holdEndingWealth,
      sellEndingWealth,
      holdAdvantage,
      signal,
    };
  }, [
    currentValue,
    outstandingMortgage,
    monthlyNetCashflow,
    expectedCapitalGrowthPct,
    sellingCostsPct,
    altReturnPct,
    horizonYears,
  ]);

  const signalLabel =
    r.signal === "hold" ? "Hold" : r.signal === "sell" ? "Sell" : "Borderline";
  const signalTone =
    r.signal === "hold" ? "positive" : r.signal === "sell" ? "negative" : "neutral";

  const summary = [
    "Sell-or-hold checker result",
    `Inputs: value €${currentValue.toLocaleString()}, mortgage €${outstandingMortgage.toLocaleString()}, monthly net cashflow €${monthlyNetCashflow}, expected growth ${expectedCapitalGrowthPct}%/yr, alt return ${altReturnPct}%/yr, horizon ${horizonYears} yrs, selling costs ${sellingCostsPct}%`,
    `Outputs: equity today ${fmtMoneyFull(r.equityToday)}, net equity if sold ${fmtMoneyFull(r.netEquityIfSold)}, cash-on-equity ${fmtPct(r.cashOnEquityPct)}, hold ending wealth ${fmtMoneyFull(r.holdEndingWealth)}, sell ending wealth ${fmtMoneyFull(r.sellEndingWealth)}, signal: ${signalLabel}`,
  ].join("\n");

  return (
    <>
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5 lg:gap-7 items-start">
        <CalcCard title="Inputs">
          <div className="grid sm:grid-cols-2 gap-4">
            <NumberField label="Current value" prefix="€" value={currentValue} onChange={setCurrentValue} step={5000} min={0} />
            <NumberField label="Outstanding mortgage" prefix="€" value={outstandingMortgage} onChange={setOutstandingMortgage} step={5000} min={0} />
            <NumberField label="Monthly net cash flow" prefix="€" value={monthlyNetCashflow} onChange={setMonthlyNetCashflow} step={50} hint="After all costs" />
            <NumberField label="Expected capital growth" suffix="%/yr" value={expectedCapitalGrowthPct} onChange={setExpectedCapitalGrowthPct} step={0.5} />
            <NumberField label="Selling costs" suffix="%" value={sellingCostsPct} onChange={setSellingCostsPct} step={0.5} min={0} max={10} hint="Agent + legal + tax" />
            <NumberField label="Alternative return" suffix="%/yr" value={altReturnPct} onChange={setAltReturnPct} step={0.5} hint="What freed equity earns elsewhere" />
            <NumberField label="Horizon" suffix="yrs" value={horizonYears} onChange={setHorizonYears} step={1} min={1} max={30} />
          </div>
        </CalcCard>

        <CalcCard title="Results">
          <div className="space-y-6">
            <Stat label="Signal" value={signalLabel} tone={signalTone} big />
            <div className="grid grid-cols-2 gap-5">
              <Stat label="Equity today" value={fmtMoneyFull(r.equityToday)} />
              <Stat label="Net if sold today" value={fmtMoneyFull(r.netEquityIfSold)} />
              <Stat label="Cash-on-equity" value={fmtPct(r.cashOnEquityPct)} tone={r.cashOnEquityPct && r.cashOnEquityPct > 0.05 ? "positive" : "neutral"} />
              <Stat
                label="Hold advantage"
                value={fmtMoneyFull(r.holdAdvantage)}
                tone={r.holdAdvantage > 0 ? "positive" : r.holdAdvantage < 0 ? "negative" : "neutral"}
              />
              <Stat label="Hold ending wealth" value={fmtMoneyFull(r.holdEndingWealth)} />
              <Stat label="Sell ending wealth" value={fmtMoneyFull(r.sellEndingWealth)} />
            </div>
            <div
              className="pt-4 border-t border-[var(--color-border)] text-[13px] leading-[1.55] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The signal compares total wealth at the horizon if you hold (equity + cash flow) vs sell now and reinvest the equity at your alternative return. Within 5% is borderline. Pro adds tax-adjusted, refinance and disposal scenarios.
            </div>
          </div>
        </CalcCard>
      </div>
      <SaveResultForm calc="sell-or-hold" calcName="Sell or hold" summary={summary} />
    </>
  );
}
