"use client";

// Mortgage → investment funnel.
//
// Slots in beneath the mortgage calculator's result panel. The
// mortgage calculator already returns the monthly payment for any
// country; this panel asks the follow-up question every prospect
// actually has — "if I rent this out, does it make money?" — and
// runs the same check-engine verdict the /check funnel uses.
//
// Inputs:
//   • Yes/No toggle on whether this is an investment property.
//     Default No so the calculator stays a calculator for owner-
//     occupiers. Choosing Yes reveals the rent + costs block.
//
// Outputs:
//   • Live cash flow + yield + AssetCentral verdict card.
//   • CTA to /check for the full email-able report (deep-linked
//     with the inputs pre-filled).

import { useMemo, useState } from "react";
import Link from "next/link";
import { runCheck } from "@/lib/check-engine";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { CalculatorVerdictCard, type VerdictTone } from "./CalculatorVerdictCard";

interface Props {
  /** Purchase price in local currency. Passed from the mortgage
   *  calculator's `price` state. */
  price: number;
  /** Deposit absolute amount. Mortgage calculator stores deposit as
   *  a percentage; the parent converts to absolute before passing in. */
  deposit: number;
  /** Annual rate in percent (e.g. 4.4). */
  ratePct: number;
  /** Term in years. */
  termYrs: number;
  /** Currency symbol for input prefixes (e.g. "£", "€", "AED"). */
  currencyPrefix: string;
  /** Three-letter currency code for the /check deep link. */
  currencyCode: string;
}

const TONE_TO_VERDICT: Record<"attractive" | "borderline" | "risky", VerdictTone> = {
  attractive: "strong",
  borderline: "borderline",
  risky: "risky",
};

export function MortgageInvestmentPanel({
  price,
  deposit,
  ratePct,
  termYrs,
  currencyPrefix,
  currencyCode,
}: Props) {
  const [isInvestment, setIsInvestment] = useState<"unset" | "yes" | "no">("unset");
  // Investment-specific inputs — sensible defaults the user can adjust.
  // Scaled to a reasonable proportion of the price so the defaults feel
  // right for both £350k UK and AED 2M Dubai parameters.
  const defaultMonthlyRent = Math.max(500, Math.round((price * 0.06) / 12));
  const [monthlyRent, setMonthlyRent] = useState(defaultMonthlyRent);
  const [monthlyServiceCharge, setMonthlyServiceCharge] = useState(
    Math.max(50, Math.round(price * 0.004 / 12)),
  );
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(
    Math.max(40, Math.round(price * 0.003 / 12)),
  );
  const [managementPct, setManagementPct] = useState(10);
  const [vacancyMonths, setVacancyMonths] = useState(0.5);

  const result = useMemo(() => {
    if (isInvestment !== "yes") return null;
    if (![price, deposit, ratePct, termYrs, monthlyRent].every((v) => isFinite(v))) return null;
    return runCheck({
      price,
      deposit,
      ratePct,
      termYrs,
      monthlyRent,
      monthlyServiceCharge,
      monthlyMaintenance,
      managementPct,
      vacancyMonths,
    });
  }, [
    isInvestment,
    price,
    deposit,
    ratePct,
    termYrs,
    monthlyRent,
    monthlyServiceCharge,
    monthlyMaintenance,
    managementPct,
    vacancyMonths,
  ]);

  const fmtMoney = (n: number) =>
    `${currencyPrefix}${Math.abs(Math.round(n)).toLocaleString("en-GB")}${n < 0 ? "" : ""}`;
  const fmtSignedMoney = (n: number) =>
    `${n < 0 ? "−" : ""}${currencyPrefix}${Math.abs(Math.round(n)).toLocaleString("en-GB")}`;
  const fmtPct = (n: number) => `${n.toFixed(1)}%`;

  // /check deep link with the mortgage inputs the user has already set
  // + the investment-specific inputs they tuned here. Saves the user
  // from re-entering anything when they want the email-able report.
  const checkLink = `/check?${new URLSearchParams({
    price: String(Math.round(price)),
    deposit: String(Math.round(deposit)),
    rate: String(ratePct),
    term: String(termYrs),
    rent: String(Math.round(monthlyRent)),
    serviceCharge: String(Math.round(monthlyServiceCharge)),
    maintenance: String(Math.round(monthlyMaintenance)),
    managementPct: String(managementPct),
    vacancyMonths: String(vacancyMonths),
    currency: currencyCode,
  }).toString()}`;

  return (
    <section
      aria-label="Investment-property check"
      className="mt-10 rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:p-7"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-3xl">
        <p className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] font-semibold mb-3">
          ONE MORE QUESTION
        </p>
        <h2
          className="text-[24px] lg:text-[30px] leading-[1.15] text-[color:var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Is this an investment property?
        </h2>
        <p className="mt-2 text-[14.5px] leading-[1.55] text-[color:var(--color-ink)]">
          A mortgage calculator tells you the payment. AssetCentral tells you
          whether the property actually makes money — yield, cash flow and a
          plain-English verdict.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setIsInvestment("yes")}
          className={`min-h-[44px] px-5 rounded-md text-[14px] font-semibold transition ${
            isInvestment === "yes"
              ? "bg-[color:var(--color-navy)] text-white"
              : "bg-white border border-[var(--color-border)] text-[color:var(--color-navy)] hover:border-[color:var(--color-navy)]"
          }`}
        >
          Yes — run the investment check
        </button>
        <button
          type="button"
          onClick={() => setIsInvestment("no")}
          className={`min-h-[44px] px-5 rounded-md text-[14px] font-semibold transition ${
            isInvestment === "no"
              ? "bg-[color:var(--color-navy)] text-white"
              : "bg-white border border-[var(--color-border)] text-[color:var(--color-navy)] hover:border-[color:var(--color-navy)]"
          }`}
        >
          No — owner-occupier
        </button>
      </div>

      {isInvestment === "no" && (
        <p className="mt-4 text-[13.5px] text-[color:var(--color-muted)] italic">
          That&rsquo;s fine — the mortgage payment is the headline number for
          an owner-occupier. If you change your mind later or buy another
          property, the investment check lives at{" "}
          <Link
            href="/check"
            className="text-[color:var(--color-accent)] font-semibold underline"
          >
            /check
          </Link>
          .
        </p>
      )}

      {isInvestment === "yes" && (
        <>
          <div className="mt-6 grid lg:grid-cols-[1.1fr_1fr] gap-5 lg:gap-7 items-start">
            <CalcCard title="Rent + running costs">
              <div className="grid sm:grid-cols-2 gap-4">
                <NumberField
                  label="Expected monthly rent"
                  prefix={currencyPrefix}
                  value={monthlyRent}
                  onChange={setMonthlyRent}
                  step={50}
                  min={0}
                />
                <NumberField
                  label="Service charge + ground rent"
                  prefix={currencyPrefix}
                  value={monthlyServiceCharge}
                  onChange={setMonthlyServiceCharge}
                  step={10}
                  min={0}
                  hint="Per month"
                />
                <NumberField
                  label="Maintenance reserve"
                  prefix={currencyPrefix}
                  value={monthlyMaintenance}
                  onChange={setMonthlyMaintenance}
                  step={10}
                  min={0}
                  hint="Per month"
                />
                <NumberField
                  label="Letting / management"
                  suffix="%"
                  value={managementPct}
                  onChange={setManagementPct}
                  step={1}
                  min={0}
                  max={30}
                  hint="Of rent collected"
                />
                <NumberField
                  label="Vacancy"
                  suffix="mo/yr"
                  value={vacancyMonths}
                  onChange={setVacancyMonths}
                  step={0.5}
                  min={0}
                  max={12}
                />
              </div>
            </CalcCard>

            <CalcCard title="Investment results">
              {result ? (
                <div className="space-y-6">
                  <Stat
                    label="Monthly net cash flow"
                    value={fmtSignedMoney(result.monthlyCashFlow)}
                    tone={
                      result.monthlyCashFlow > 0
                        ? "positive"
                        : result.monthlyCashFlow < 0
                          ? "negative"
                          : "neutral"
                    }
                    big
                  />
                  <div className="grid grid-cols-2 gap-5">
                    <Stat
                      label="Mortgage payment"
                      value={fmtMoney(result.monthlyMortgage)}
                    />
                    <Stat
                      label="Gross yield"
                      value={fmtPct(result.grossYieldPct)}
                    />
                    <Stat
                      label="Net yield"
                      value={fmtPct(result.netYieldPct)}
                      tone={result.netYieldPct >= 5 ? "positive" : "neutral"}
                    />
                    <Stat
                      label="DSCR"
                      value={result.dscr.toFixed(2)}
                      tone={
                        result.dscr >= 1.25
                          ? "positive"
                          : result.dscr >= 1
                            ? "warning"
                            : "negative"
                      }
                    />
                  </div>
                </div>
              ) : (
                <p className="text-[14px] text-[color:var(--color-muted)]">
                  Set the inputs to see the verdict.
                </p>
              )}
            </CalcCard>
          </div>

          {result && (
            <CalculatorVerdictCard
              tone={TONE_TO_VERDICT[result.verdict.tone]}
              label={result.verdict.label}
              keyMetric={{
                label: "Monthly net cash flow",
                value: fmtSignedMoney(result.monthlyCashFlow),
              }}
              summary={result.verdict.summary}
              redFlag={result.verdict.redFlag.body}
              nextMove={result.verdict.improvement.body}
              upgradeHref={checkLink}
              upgradeLabel="Get the full free AI check + email the report"
            />
          )}
        </>
      )}
    </section>
  );
}
