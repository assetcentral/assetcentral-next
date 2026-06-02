"use client";

import { useMemo, useState } from "react";
import { fmtMoneyFull, fmtPct } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { SaveResultForm } from "./SaveResultForm";

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
    <SaveResultForm calc="str-yield" calcName="Short-term rental yield" summary={summary} />
    </>
  );
}
