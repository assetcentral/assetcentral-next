"use client";

// Refinance checker — Level 1 free tool. Compares the current loan
// against a refinance proposal: monthly saving, cash flow change,
// payback period for arrangement fees.

import { useMemo, useState } from "react";
import { annuityPayment, fmtMoneyFull } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { CalculatorVerdictCard, type VerdictTone } from "./CalculatorVerdictCard";
import { SaveResultForm } from "./SaveResultForm";
import { StressTestTable } from "./StressTestTable";

// Compute the 5-year net saving with overridden inputs. Used by the
// stress test rows beneath the verdict.
function computeFiveYearNet(args: {
  currentBalance: number;
  currentRatePct: number;
  currentRemainingYears: number;
  newRatePct: number;
  newTermYears: number;
  arrangementFee: number;
  exitFee: number;
}): number {
  const currentPayment =
    args.currentBalance > 0 && args.currentRemainingYears > 0
      ? annuityPayment(args.currentBalance, args.currentRatePct / 100, args.currentRemainingYears)
      : 0;
  const newPayment =
    args.currentBalance > 0 && args.newTermYears > 0
      ? annuityPayment(args.currentBalance, args.newRatePct / 100, args.newTermYears)
      : 0;
  const monthlySaving = currentPayment - newPayment;
  return monthlySaving * 60 - (args.arrangementFee + args.exitFee);
}

export function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(180_000);
  const [currentRatePct, setCurrentRatePct] = useState(5.5);
  const [currentRemainingYears, setCurrentRemainingYears] = useState(22);
  const [newRatePct, setNewRatePct] = useState(4.2);
  const [newTermYears, setNewTermYears] = useState(25);
  const [arrangementFee, setArrangementFee] = useState(2400);
  const [exitFee, setExitFee] = useState(1500);

  const r = useMemo(() => {
    const currentPayment =
      currentBalance > 0 && currentRemainingYears > 0
        ? annuityPayment(currentBalance, currentRatePct / 100, currentRemainingYears)
        : 0;
    const newPayment =
      currentBalance > 0 && newTermYears > 0
        ? annuityPayment(currentBalance, newRatePct / 100, newTermYears)
        : 0;
    const monthlySaving = currentPayment - newPayment;
    const totalFees = arrangementFee + exitFee;
    const paybackMonths = monthlySaving > 0 ? totalFees / monthlySaving : null;
    const fiveYearSaving = monthlySaving * 60 - totalFees;
    const tenYearSaving = monthlySaving * 120 - totalFees;
    return {
      currentPayment,
      newPayment,
      monthlySaving,
      totalFees,
      paybackMonths,
      fiveYearSaving,
      tenYearSaving,
    };
  }, [currentBalance, currentRatePct, currentRemainingYears, newRatePct, newTermYears, arrangementFee, exitFee]);

  const verdict: "worth_it" | "borderline" | "skip" =
    r.paybackMonths !== null && r.paybackMonths < 24 && r.fiveYearSaving > 0
      ? "worth_it"
      : r.paybackMonths !== null && r.paybackMonths < 60 && r.tenYearSaving > 0
        ? "borderline"
        : "skip";
  const verdictLabel =
    verdict === "worth_it" ? "Worth it" : verdict === "borderline" ? "Borderline" : "Skip";
  const verdictTone =
    verdict === "worth_it" ? "positive" : verdict === "borderline" ? "warning" : "negative";

  const summary = [
    "Refinance checker result",
    `Inputs: current loan €${currentBalance.toLocaleString()} at ${currentRatePct}% / ${currentRemainingYears} yrs remaining, new offer ${newRatePct}% / ${newTermYears} yrs, arrangement fee €${arrangementFee}, exit fee €${exitFee}`,
    `Outputs: current payment ${fmtMoneyFull(r.currentPayment)}, new payment ${fmtMoneyFull(r.newPayment)}, monthly saving ${fmtMoneyFull(r.monthlySaving)}, total fees ${fmtMoneyFull(r.totalFees)}, fee payback ${r.paybackMonths && isFinite(r.paybackMonths) ? r.paybackMonths.toFixed(1) + " mo" : "—"}, 5-yr net ${fmtMoneyFull(r.fiveYearSaving)}, 10-yr net ${fmtMoneyFull(r.tenYearSaving)}, signal: ${verdictLabel}`,
  ].join("\n");

  return (
    <>
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5 lg:gap-7 items-start">
        <CalcCard title="Inputs">
          <div className="grid sm:grid-cols-2 gap-4">
            <NumberField label="Current balance" prefix="€" value={currentBalance} onChange={setCurrentBalance} step={5000} min={0} />
            <NumberField label="Current rate" suffix="%" value={currentRatePct} onChange={setCurrentRatePct} step={0.1} min={0} />
            <NumberField label="Years remaining" suffix="yrs" value={currentRemainingYears} onChange={setCurrentRemainingYears} step={1} min={1} max={40} />
            <NumberField label="New rate" suffix="%" value={newRatePct} onChange={setNewRatePct} step={0.1} min={0} />
            <NumberField label="New term" suffix="yrs" value={newTermYears} onChange={setNewTermYears} step={1} min={1} max={40} />
            <NumberField label="Arrangement fee" prefix="€" value={arrangementFee} onChange={setArrangementFee} step={100} min={0} />
            <NumberField label="Exit fee on old loan" prefix="€" value={exitFee} onChange={setExitFee} step={100} min={0} hint="Early repayment charge" />
          </div>
        </CalcCard>

        <CalcCard title="Results">
          <div className="space-y-6">
            <Stat label="Signal" value={verdictLabel} tone={verdictTone} big />
            <div className="grid grid-cols-2 gap-5">
              <Stat label="Current payment" value={fmtMoneyFull(r.currentPayment)} />
              <Stat label="New payment" value={fmtMoneyFull(r.newPayment)} />
              <Stat
                label="Monthly saving"
                value={fmtMoneyFull(r.monthlySaving)}
                tone={r.monthlySaving > 0 ? "positive" : r.monthlySaving < 0 ? "negative" : "neutral"}
              />
              <Stat label="Total fees" value={fmtMoneyFull(r.totalFees)} />
              <Stat
                label="Fee payback"
                value={r.paybackMonths && isFinite(r.paybackMonths) ? `${r.paybackMonths.toFixed(1)} mo` : "—"}
              />
              <Stat
                label="5-year net"
                value={fmtMoneyFull(r.fiveYearSaving)}
                tone={r.fiveYearSaving > 0 ? "positive" : "negative"}
              />
              <Stat
                label="10-year net"
                value={fmtMoneyFull(r.tenYearSaving)}
                tone={r.tenYearSaving > 0 ? "positive" : "negative"}
              />
            </div>
            <div
              className="pt-4 border-t border-[var(--color-border)] text-[13px] leading-[1.55] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Worth it: fees pay back in under 2 years and the 5-year net is positive. Skip: fees out-run the saving over 10 years. Pro adds rate-shock scenarios, multi-product comparison and lender-ready packs.
            </div>
          </div>
        </CalcCard>
      </div>
      <CalculatorVerdictCard
        tone={
          (verdict === "worth_it"
            ? "strong"
            : verdict === "borderline"
              ? "borderline"
              : "risky") as VerdictTone
        }
        label={verdictLabel}
        keyMetric={{
          label: "Monthly saving",
          value: fmtMoneyFull(r.monthlySaving),
        }}
        summary={
          verdict === "worth_it"
            ? `New rate cuts your monthly payment by ${fmtMoneyFull(r.monthlySaving)} and the ${fmtMoneyFull(r.totalFees)} of fees pay back in ${r.paybackMonths && isFinite(r.paybackMonths) ? r.paybackMonths.toFixed(0) : "—"} months. Over 5 years you keep ${fmtMoneyFull(r.fiveYearSaving)} net.`
            : verdict === "borderline"
              ? `The new rate saves ${fmtMoneyFull(r.monthlySaving)}/month but the fees take ${r.paybackMonths && isFinite(r.paybackMonths) ? r.paybackMonths.toFixed(0) : "—"} months to claw back. Only worth it if you're certain to hold the loan past the 5-year mark.`
              : `Either the rate isn't low enough, or fees of ${fmtMoneyFull(r.totalFees)} out-run the saving on any reasonable horizon. ${r.monthlySaving > 0 ? `You'd save ${fmtMoneyFull(r.monthlySaving)}/month, but` : "The new payment is higher, and"} the 10-year net is ${fmtMoneyFull(r.tenYearSaving)}.`
        }
        redFlag={
          newTermYears > currentRemainingYears + 2
            ? `Your new term (${newTermYears} yrs) extends ${newTermYears - currentRemainingYears} years beyond your current remaining term. Lower monthly payment, but you'll pay more total interest.`
            : exitFee > 0 && exitFee > r.monthlySaving * 12
              ? `The exit fee on your current loan (${fmtMoneyFull(exitFee)}) is over a year's worth of savings — most of the benefit goes back to the old lender.`
              : `Arrangement + exit fees together total ${fmtMoneyFull(r.totalFees)}. Verify both numbers from a written offer before committing — broker quotes often understate.`
        }
        nextMove={
          verdict === "skip"
            ? `Wait for rates to drop another 0.5% before re-running this — at today's spread the move doesn't pay.`
            : verdict === "borderline"
              ? `Ask the new lender to waive the arrangement fee — even half off would tip this firmly into worth-it territory.`
              : `Lock the rate now if it's a tracker — the saving is real but rate volatility can erase the 5-year net quickly.`
        }
        freeSavePrefill={{
          price: Math.round(currentBalance * 1.4),
          rent: Math.round(r.newPayment * 1.6),
          currency: "EUR",
          address: "Property under refinance consideration",
        }}
      />
      <StressTestTable
        metricLabel="5-year net saving under stress"
        rows={[
          {
            label: "New rate +0.5%",
            base: fmtMoneyFull(r.fiveYearSaving),
            stressed: fmtMoneyFull(
              computeFiveYearNet({
                currentBalance,
                currentRatePct,
                currentRemainingYears,
                newRatePct: newRatePct + 0.5,
                newTermYears,
                arrangementFee,
                exitFee,
              }),
            ),
          },
          {
            label: "Arrangement fee +50%",
            base: fmtMoneyFull(r.fiveYearSaving),
            stressed: fmtMoneyFull(
              computeFiveYearNet({
                currentBalance,
                currentRatePct,
                currentRemainingYears,
                newRatePct,
                newTermYears,
                arrangementFee: arrangementFee * 1.5,
                exitFee,
              }),
            ),
          },
          {
            label: "Term extended +5 yrs",
            base: fmtMoneyFull(r.fiveYearSaving),
            stressed: fmtMoneyFull(
              computeFiveYearNet({
                currentBalance,
                currentRatePct,
                currentRemainingYears,
                newRatePct,
                newTermYears: newTermYears + 5,
                arrangementFee,
                exitFee,
              }),
              ),
            tone: "positive",
          },
        ]}
        caption="The term-extension row looks better in year 5 — but you pay more total interest. Individual models the full life of the loan."
      />
      <SaveResultForm calc="refinance" calcName="Refinance" summary={summary} />
    </>
  );
}
