"use client";

import { useMemo, useState } from "react";
import { fmtMoneyFull, fmtPct } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { CalculatorVerdictCard, type VerdictTone } from "./CalculatorVerdictCard";
import { SaveResultForm } from "./SaveResultForm";
import { StressTestTable } from "./StressTestTable";

// Compute the STR-vs-long-let delta with overridden inputs. Used by
// the stress test to show how the recommendation moves under
// occupancy / ADR / commission shocks.
function computeStrDelta(args: {
  adr: number;
  occ: number;
  commission: number;
  cleaningPerStay: number;
  avgStayNights: number;
  fixedCostsYr: number;
  longLetMonthly: number;
  longLetMgmt: number;
  longLetCostsYr: number;
}): number {
  const days = 365;
  const nightsBooked = days * (args.occ / 100);
  const stays = nightsBooked / Math.max(1, args.avgStayNights);
  const gross = nightsBooked * args.adr;
  const netStr =
    gross - gross * (args.commission / 100) - stays * args.cleaningPerStay - args.fixedCostsYr;
  const longGross = args.longLetMonthly * 12;
  const netLong = longGross - longGross * (args.longLetMgmt / 100) - args.longLetCostsYr;
  return netStr - netLong;
}

export function STRYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState(400_000);
  const [adr, setAdr] = useState(180);
  const [occ, setOcc] = useState(65);
  const [commission, setCommission] = useState(25);
  const [cleaningPerStay, setCleaningPerStay] = useState(45);
  const [avgStayNights, setAvgStayNights] = useState(3);
  const [fixedCostsYr, setFixedCostsYr] = useState(4800);

  // Long-let comparison
  const [longLetMonthly, setLongLetMonthly] = useState(1450);
  const [longLetMgmt, setLongLetMgmt] = useState(8);
  const [longLetCostsYr, setLongLetCostsYr] = useState(2400);

  const r = useMemo(() => {
    const days = 365;
    const nightsBooked = days * (occ / 100);
    const stays = nightsBooked / Math.max(1, avgStayNights);
    const gross = nightsBooked * adr;
    const commissionAmt = gross * (commission / 100);
    const cleaningAmt = stays * cleaningPerStay;
    const netStr = gross - commissionAmt - cleaningAmt - fixedCostsYr;
    const strYield = propertyValue > 0 ? netStr / propertyValue : null;

    const longGross = longLetMonthly * 12;
    const longMgmt = longGross * (longLetMgmt / 100);
    const netLong = longGross - longMgmt - longLetCostsYr;
    const longYield = propertyValue > 0 ? netLong / propertyValue : null;

    const delta = netStr - netLong;

    return {
      nightsBooked,
      stays,
      gross,
      commissionAmt,
      cleaningAmt,
      netStr,
      strYield,
      longGross,
      longMgmt,
      netLong,
      longYield,
      delta,
    };
  }, [
    propertyValue,
    adr,
    occ,
    commission,
    cleaningPerStay,
    avgStayNights,
    fixedCostsYr,
    longLetMonthly,
    longLetMgmt,
    longLetCostsYr,
  ]);

  const summary = [
    "Short-term rental yield calculator result",
    `Short-term rental inputs: property €${propertyValue.toLocaleString()}, ADR €${adr}, occupancy ${occ}%, commission ${commission}%, cleaning €${cleaningPerStay}/stay, avg stay ${avgStayNights} nights, fixed costs €${fixedCostsYr.toLocaleString()}/yr`,
    `Long-let inputs: monthly rent €${longLetMonthly}, mgmt fee ${longLetMgmt}%, other costs €${longLetCostsYr}/yr`,
    `Short-term rental outputs: net yield ${fmtPct(r.strYield)}, gross revenue ${fmtMoneyFull(r.gross)}, net to owner ${fmtMoneyFull(r.netStr)}, ${Math.round(r.nightsBooked)} nights booked over ${Math.round(r.stays)} stays`,
    `Long-let outputs: net yield ${fmtPct(r.longYield)}, gross ${fmtMoneyFull(r.longGross)}, net ${fmtMoneyFull(r.netLong)}`,
    `Short-term vs long-let (annual): ${fmtMoneyFull(r.delta)}`,
  ].join("\n");

  return (
    <>
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-5 lg:gap-7">
        <CalcCard title="Short-term rental">
          <div className="grid sm:grid-cols-2 gap-4">
            <NumberField label="Property value" prefix="€" value={propertyValue} onChange={setPropertyValue} step={5000} min={0} />
            <NumberField label="ADR (avg daily rate)" prefix="€" value={adr} onChange={setAdr} step={5} min={0} />
            <NumberField label="Occupancy" suffix="%" value={occ} onChange={setOcc} step={1} min={0} max={100} />
            <NumberField label="Operator commission" suffix="%" value={commission} onChange={setCommission} step={1} min={0} max={50} />
            <NumberField label="Cleaning per stay" prefix="€" value={cleaningPerStay} onChange={setCleaningPerStay} step={5} min={0} />
            <NumberField label="Avg stay length" suffix="nights" value={avgStayNights} onChange={setAvgStayNights} step={0.5} min={1} />
            <NumberField label="Fixed costs / year" prefix="€" value={fixedCostsYr} onChange={setFixedCostsYr} step={100} min={0} hint="Utilities, insurance, etc." />
          </div>
        </CalcCard>

        <CalcCard title="Long-let benchmark">
          <div className="grid sm:grid-cols-2 gap-4">
            <NumberField label="Monthly rent" prefix="€" value={longLetMonthly} onChange={setLongLetMonthly} step={50} min={0} />
            <NumberField label="Management fee" suffix="%" value={longLetMgmt} onChange={setLongLetMgmt} step={0.5} min={0} max={30} />
            <NumberField label="Other costs / year" prefix="€" value={longLetCostsYr} onChange={setLongLetCostsYr} step={100} min={0} />
          </div>
          <div
            className="mt-5 text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Same property, hypothetically rented long-term. Assumes 100% occupancy (no voids modelled — adjust monthly rent down if your area sees vacancy).
          </div>
        </CalcCard>
      </div>

      <CalcCard title="Results">
        <div className="grid lg:grid-cols-3 gap-6">
          <div>
            <Stat label="Short-term net yield" value={fmtPct(r.strYield)} tone="positive" big />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Stat label="Nights booked" value={Math.round(r.nightsBooked).toString()} />
              <Stat label="Stays / year" value={Math.round(r.stays).toString()} />
              <Stat label="Gross revenue" value={fmtMoneyFull(r.gross)} />
              <Stat label="Net to owner" value={fmtMoneyFull(r.netStr)} />
            </div>
          </div>
          <div>
            <Stat label="Long-let net yield" value={fmtPct(r.longYield)} big />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Stat label="Gross annual rent" value={fmtMoneyFull(r.longGross)} />
              <Stat label="Net to owner" value={fmtMoneyFull(r.netLong)} />
            </div>
          </div>
          <div>
            <Stat
              label="Short-term vs long-let (yr)"
              value={fmtMoneyFull(r.delta)}
              tone={r.delta >= 0 ? "positive" : "negative"}
              big
            />
            <p
              className="mt-3 text-[13px] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {r.delta >= 0
                ? "Short-term rental produces more net income — but at higher operational complexity."
                : "Long-let beats short-term rental after fees and cleaning. Worth questioning whether the agency commission is justified."}
            </p>
          </div>
        </div>
      </CalcCard>
    </div>
    <CalculatorVerdictCard
      tone={
        (r.delta > 5000
          ? "strong"
          : r.delta > 0
            ? "borderline"
            : "weak") as VerdictTone
      }
      label={
        r.delta > 5000
          ? "Short-let wins"
          : r.delta > 0
            ? "Marginal short-let"
            : "Long-let wins"
      }
      keyMetric={{
        label: "Short-let vs long-let (annual)",
        value: fmtMoneyFull(r.delta),
      }}
      summary={
        r.delta > 5000
          ? `Short-term lettings produce ${fmtMoneyFull(r.delta)} more per year than a long-let after ${commission}% commission, cleaning and fixed costs. Net yield is ${fmtPct(r.strYield)} vs ${fmtPct(r.longYield)} long-let.`
          : r.delta > 0
            ? `Short-let beats long-let by ${fmtMoneyFull(r.delta)}/yr — but at much higher operational complexity. The premium probably doesn't justify the work; consider whether a hands-off long-let at ${fmtPct(r.longYield)} is the better life choice.`
            : `Long-let actually beats short-let by ${fmtMoneyFull(-r.delta)}/yr at this occupancy and commission level. The agency commission of ${commission}% is eating most of the gross — worth questioning whether the operator is the right partner.`
      }
      redFlag={
        occ > 70
          ? `${occ}% occupancy assumed — that's an above-average year-round number. Drop to 60% and the short-let case can flip.`
          : commission > 25
            ? `${commission}% operator commission is on the high end. Two operators in most markets do the same job for 18-20%; that delta is real money.`
            : `Fixed costs of ${fmtMoneyFull(fixedCostsYr)}/yr stay constant whether you book 200 nights or 20. The short-let case depends entirely on staying above break-even occupancy.`
      }
      nextMove={
        r.delta > 0
          ? `Cross-check the ADR assumption against AirDNA or similar for your specific submarket — short-let revenue is the most volatile number in this calculation.`
          : `Renegotiate the operator commission OR move to a long-let with a regulated tenancy. The work-vs-return ratio of short-let only makes sense when the delta is meaningful.`
      }
      freeSavePrefill={{
        price: Math.round(propertyValue),
        rent: Math.round((adr * 365 * (occ / 100)) / 12),
        currency: "EUR",
        address: "Short-let property",
      }}
    />
    <StressTestTable
      metricLabel="Short-let vs long-let delta under stress"
      rows={[
        {
          label: "Occupancy −10pp",
          base: fmtMoneyFull(r.delta),
          stressed: fmtMoneyFull(
            computeStrDelta({
              adr,
              occ: Math.max(0, occ - 10),
              commission,
              cleaningPerStay,
              avgStayNights,
              fixedCostsYr,
              longLetMonthly,
              longLetMgmt,
              longLetCostsYr,
            }),
          ),
        },
        {
          label: "ADR −10%",
          base: fmtMoneyFull(r.delta),
          stressed: fmtMoneyFull(
            computeStrDelta({
              adr: adr * 0.9,
              occ,
              commission,
              cleaningPerStay,
              avgStayNights,
              fixedCostsYr,
              longLetMonthly,
              longLetMgmt,
              longLetCostsYr,
            }),
          ),
        },
        {
          label: "Operator commission +5pp",
          base: fmtMoneyFull(r.delta),
          stressed: fmtMoneyFull(
            computeStrDelta({
              adr,
              occ,
              commission: commission + 5,
              cleaningPerStay,
              avgStayNights,
              fixedCostsYr,
              longLetMonthly,
              longLetMgmt,
              longLetCostsYr,
            }),
          ),
        },
      ]}
      caption="Each row holds everything else constant. Short-let revenue is volatile — Starter models the full distribution over the hold period, not just three shocks."
    />
    <SaveResultForm calc="str-yield" calcName="Short-term rental yield" summary={summary} />
    </>
  );
}
