"use client";

import { useMemo, useState } from "react";
import { annuityPayment, fmtMoneyFull, fmtPct, irr } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { CalculatorVerdictCard, type VerdictTone } from "./CalculatorVerdictCard";
import { SaveResultForm } from "./SaveResultForm";
import { StressTestTable } from "./StressTestTable";

type Scenario = {
  ltv: number;
  deposit: number;
  loan: number;
  monthlyPay: number;
  annualPay: number;
  cfs: number[];
  exit: number;
  exitProceeds: number;
  yr1Net: number;
  cashOnCashYr1: number | null;
  irr: number | null;
  totalCashIn: number;
  totalCashOut: number;
};

export function OwnershipCalculator() {
  const [price, setPrice] = useState(500_000);
  const [annualRent, setAnnualRent] = useState(28_000);
  const [costsPct, setCostsPct] = useState(20);
  const [holdYears, setHoldYears] = useState(10);
  const [capitalGrowthPct, setCapitalGrowthPct] = useState(3);
  const [rentGrowthPct, setRentGrowthPct] = useState(2);
  const [mortRate, setMortRate] = useState(4.2);
  const [mortYears, setMortYears] = useState(25);
  const [ltvA, setLtvA] = useState(0);
  const [ltvB, setLtvB] = useState(65);

  const buildScenario = (ltv: number): Scenario => {
    const loan = (price * ltv) / 100;
    const deposit = price - loan;
    const monthlyPay = loan > 0 ? annuityPayment(loan, mortRate / 100, mortYears) : 0;
    const annualPay = monthlyPay * 12;

    let principal = loan;
    let rent = annualRent;
    const cfs: number[] = [];
    cfs.push(-deposit);
    for (let y = 1; y <= holdYears; y++) {
      const net = rent * (1 - costsPct / 100);
      for (let m = 0; m < 12; m++) {
        if (principal <= 0) break;
        const interest = principal * (mortRate / 100 / 12);
        const principalPaid = Math.max(0, monthlyPay - interest);
        principal = Math.max(0, principal - principalPaid);
      }
      cfs.push(net - annualPay);
      rent *= 1 + rentGrowthPct / 100;
    }
    const exit = price * Math.pow(1 + capitalGrowthPct / 100, holdYears);
    const exitProceeds = exit - principal;
    cfs[cfs.length - 1] += exitProceeds;

    const yr1Net = annualRent * (1 - costsPct / 100) - annualPay;
    const cashOnCashYr1 = deposit > 0 ? yr1Net / deposit : null;
    const projectIrr = irr(cfs);
    const totalCashOut = cfs.reduce((acc, cf, t) => (t === 0 ? acc : acc + cf), 0);

    return {
      ltv,
      deposit,
      loan,
      monthlyPay,
      annualPay,
      cfs,
      exit,
      exitProceeds,
      yr1Net,
      cashOnCashYr1,
      irr: projectIrr,
      totalCashIn: deposit,
      totalCashOut,
    };
  };

  const a = useMemo(() => buildScenario(ltvA), [
    price, annualRent, costsPct, holdYears, capitalGrowthPct, rentGrowthPct, mortRate, mortYears, ltvA,
  ]);
  const b = useMemo(() => buildScenario(ltvB), [
    price, annualRent, costsPct, holdYears, capitalGrowthPct, rentGrowthPct, mortRate, mortYears, ltvB,
  ]);

  const summary = [
    "Ownership Comparator result",
    `Property: price €${price.toLocaleString()}, annual rent €${annualRent.toLocaleString()}, operating costs ${costsPct}%, hold ${holdYears} yrs, capital growth ${capitalGrowthPct}%, rent growth ${rentGrowthPct}%, mortgage ${mortRate}% over ${mortYears} yrs`,
    `Scenario A (LTV ${ltvA}%): IRR ${fmtPct(a.irr, 1)}, deposit ${fmtMoneyFull(a.deposit)}, monthly payment ${fmtMoneyFull(a.monthlyPay)}, yr-1 cashflow ${fmtMoneyFull(a.yr1Net)}, cash-on-cash ${fmtPct(a.cashOnCashYr1)}, exit value ${fmtMoneyFull(a.exit)}`,
    `Scenario B (LTV ${ltvB}%): IRR ${fmtPct(b.irr, 1)}, deposit ${fmtMoneyFull(b.deposit)}, monthly payment ${fmtMoneyFull(b.monthlyPay)}, yr-1 cashflow ${fmtMoneyFull(b.yr1Net)}, cash-on-cash ${fmtPct(b.cashOnCashYr1)}, exit value ${fmtMoneyFull(b.exit)}`,
    `Delta (B − A): IRR ${fmtPct((b.irr ?? 0) - (a.irr ?? 0), 1)}, year-1 cashflow ${fmtMoneyFull(b.yr1Net - a.yr1Net)}, cash invested A vs B ${fmtMoneyFull(a.totalCashIn - b.totalCashIn)}`,
  ].join("\n");

  return (
    <>
    <div className="space-y-6">
      <CalcCard title="Property assumptions">
        <div className="grid sm:grid-cols-3 gap-4">
          <NumberField label="Purchase price" prefix="€" value={price} onChange={setPrice} step={5000} min={0} />
          <NumberField label="Annual gross rent" prefix="€" value={annualRent} onChange={setAnnualRent} step={500} min={0} />
          <NumberField label="Operating costs" suffix="%" value={costsPct} onChange={setCostsPct} step={1} min={0} max={100} />
          <NumberField label="Hold period" suffix="yrs" value={holdYears} onChange={setHoldYears} step={1} min={1} max={40} />
          <NumberField label="Capital growth p.a." suffix="%" value={capitalGrowthPct} onChange={setCapitalGrowthPct} step={0.5} />
          <NumberField label="Rent growth p.a." suffix="%" value={rentGrowthPct} onChange={setRentGrowthPct} step={0.5} />
          <NumberField label="Mortgage rate" suffix="%" value={mortRate} onChange={setMortRate} step={0.1} min={0} />
          <NumberField label="Mortgage term" suffix="yrs" value={mortYears} onChange={setMortYears} step={1} min={1} max={40} />
        </div>
      </CalcCard>

      <div className="grid lg:grid-cols-2 gap-5 lg:gap-7">
        <ScenarioCard label="Scenario A" ltv={ltvA} setLtv={setLtvA} data={a} />
        <ScenarioCard label="Scenario B" ltv={ltvB} setLtv={setLtvB} data={b} highlight />
      </div>

      <CalcCard title="Which one wins?">
        <div className="grid sm:grid-cols-3 gap-5">
          <Stat
            label="Cash invested · A − B"
            value={fmtMoneyFull(a.totalCashIn - b.totalCashIn)}
          />
          <Stat
            label="IRR · B − A"
            value={fmtPct((b.irr ?? 0) - (a.irr ?? 0), 1)}
            tone={(b.irr ?? 0) >= (a.irr ?? 0) ? "positive" : "negative"}
          />
          <Stat
            label="Year-1 cashflow · B − A"
            value={fmtMoneyFull(b.yr1Net - a.yr1Net)}
            tone={b.yr1Net >= a.yr1Net ? "positive" : "negative"}
          />
        </div>
        <p
          className="mt-5 text-[13.5px] leading-[1.6] text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Leverage amplifies returns when capital growth is positive and the property pays its mortgage. It also amplifies losses if either fails. Compare IRR but also year-1 cashflow — a strong IRR that depends on the exit is a different bet than one that pays you every year.
        </p>
      </CalcCard>
    </div>
    {(() => {
      const irrDelta = (b.irr ?? 0) - (a.irr ?? 0);
      // The verdict is about which LTV scenario wins. B is the
      // mortgaged scenario; if its IRR beats A's, leverage is
      // working. If A wins, the unlevered case is better — usually a
      // sign that the cashflow can't carry the debt.
      const winner: "B" | "A" | "tie" =
        Math.abs(irrDelta) < 0.005 ? "tie" : irrDelta > 0 ? "B" : "A";
      // Helper — rebuild a scenario with overridden inputs so the
      // stress test rows can re-compute IRR cheaply.
      const recompute = (overrides: Partial<{
        capitalGrowthPct: number;
        rentGrowthPct: number;
        mortRate: number;
      }>) => {
        const cg = overrides.capitalGrowthPct ?? capitalGrowthPct;
        const rg = overrides.rentGrowthPct ?? rentGrowthPct;
        const mr = overrides.mortRate ?? mortRate;
        const ltv = ltvB;
        const loan = (price * ltv) / 100;
        const deposit = price - loan;
        const monthlyPay = loan > 0 ? annuityPayment(loan, mr / 100, mortYears) : 0;
        const annualPay = monthlyPay * 12;
        let principal = loan;
        let rent = annualRent;
        const cfs: number[] = [-deposit];
        for (let y = 1; y <= holdYears; y++) {
          const net = rent * (1 - costsPct / 100);
          for (let m = 0; m < 12; m++) {
            if (principal <= 0) break;
            const interest = principal * (mr / 100 / 12);
            const principalPaid = Math.max(0, monthlyPay - interest);
            principal = Math.max(0, principal - principalPaid);
          }
          cfs.push(net - annualPay);
          rent *= 1 + rg / 100;
        }
        const exit = price * Math.pow(1 + cg / 100, holdYears);
        cfs[cfs.length - 1] += exit - principal;
        return irr(cfs);
      };
      return (
        <>
          <CalculatorVerdictCard
            tone={
              (winner === "B" && irrDelta > 0.03
                ? "strong"
                : winner === "tie"
                  ? "borderline"
                  : winner === "A"
                    ? "warning"
                    : "borderline") as VerdictTone
            }
            label={
              winner === "B"
                ? `Leverage at ${ltvB}% wins`
                : winner === "A"
                  ? `Cash at ${ltvA}% wins`
                  : "Tied"
            }
            keyMetric={{
              label: `IRR delta (${ltvB}% − ${ltvA}%)`,
              value: fmtPct(irrDelta, 1),
            }}
            summary={
              winner === "B"
                ? `Buying with a ${ltvB}% mortgage delivers ${fmtPct(irrDelta, 1)} more IRR than ${ltvA}%. You tie up ${fmtMoneyFull(b.deposit)} instead of ${fmtMoneyFull(a.deposit)} — the freed equity can buy more property.`
                : winner === "A"
                  ? `The unlevered scenario at ${ltvA}% LTV actually wins by ${fmtPct(-irrDelta, 1)}. Usually means the cashflow can't carry the debt at ${mortRate}% — every euro borrowed costs more than it earns at the margin.`
                  : `The two LTV scenarios land within 0.5% of each other. Pick on softer factors: cash you want to keep liquid, debt tolerance, refinance flexibility.`
            }
            redFlag={
              winner === "B" && b.yr1Net < 0
                ? `${ltvB}% LTV wins on IRR but year-1 cashflow is negative (${fmtMoneyFull(b.yr1Net)}). The IRR is leaning on the exit — if capital growth disappoints, this is a losing bet.`
                : capitalGrowthPct > 4
                  ? `Capital growth of ${capitalGrowthPct}%/yr is bullish. At 1% the leverage advantage shrinks substantially — see the stress test below.`
                  : `Mortgage rate locked at ${mortRate}%. If rates step up before refinance, the leverage case erodes fast.`
            }
            nextMove={
              winner === "B"
                ? `Stress the capital-growth assumption to 0%. If ${ltvB}% LTV still wins on income alone, the leverage case is robust.`
                : `Drop the rate by 1% (refinance) and re-run. Cheap debt is what makes leverage work — without it, equities probably beat property at this LTV.`
            }
            freeSavePrefill={{
              price: Math.round(price),
              rent: Math.round(annualRent / 12),
              currency: "EUR",
              address: "Property — ownership comparison",
            }}
          />
          <StressTestTable
            metricLabel={`IRR at ${ltvB}% LTV under stress`}
            rows={[
              {
                label: "Capital growth −2%/yr",
                base: fmtPct(b.irr, 1),
                stressed: fmtPct(
                  recompute({ capitalGrowthPct: Math.max(0, capitalGrowthPct - 2) }),
                  1,
                ),
              },
              {
                label: "Mortgage rate +200bps",
                base: fmtPct(b.irr, 1),
                stressed: fmtPct(recompute({ mortRate: mortRate + 2 }), 1),
              },
              {
                label: "Rent growth −1%/yr",
                base: fmtPct(b.irr, 1),
                stressed: fmtPct(
                  recompute({ rentGrowthPct: rentGrowthPct - 1 }),
                  1,
                ),
              },
            ]}
            caption="Leverage amplifies both wins and losses — the same property at a different LTV reacts very differently to these shocks. Starter models the full grid."
          />
        </>
      );
    })()}
    <SaveResultForm calc="ownership" calcName="Ownership Comparator" summary={summary} />
    </>
  );
}

function ScenarioCard({
  label,
  ltv,
  setLtv,
  data,
  highlight,
}: {
  label: string;
  ltv: number;
  setLtv: (v: number) => void;
  data: Scenario;
  highlight?: boolean;
}) {
  return (
    <CalcCard
      title={label}
      className={highlight ? "ring-1 ring-[var(--color-navy)]" : ""}
    >
      <div className="mb-5">
        <NumberField label="LTV" suffix="%" value={ltv} onChange={setLtv} step={5} min={0} max={95} />
      </div>
      <div className="space-y-5">
        <Stat
          label="IRR (levered)"
          value={fmtPct(data.irr, 1)}
          tone={data.irr && data.irr > 0.08 ? "positive" : "neutral"}
          big
        />
        <div className="grid grid-cols-2 gap-5">
          <Stat label="Deposit" value={fmtMoneyFull(data.deposit)} />
          <Stat label="Loan" value={fmtMoneyFull(data.loan)} />
          <Stat label="Monthly pmt" value={fmtMoneyFull(data.monthlyPay)} />
          <Stat label="Cash-on-cash (yr1)" value={fmtPct(data.cashOnCashYr1)} />
          <Stat
            label="Yr-1 cashflow"
            value={fmtMoneyFull(data.yr1Net)}
            tone={data.yr1Net < 0 ? "negative" : undefined}
          />
          <Stat label="Exit value" value={fmtMoneyFull(data.exit)} />
        </div>
      </div>
    </CalcCard>
  );
}
