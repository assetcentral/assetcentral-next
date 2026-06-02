"use client";

import { useCallback, useMemo, useState } from "react";
import {
  amortiseSchedule,
  type CountryCode,
  formatLocalMoney,
  getRule,
  type LoanType,
  type Residency,
} from "@/lib/mortgage-rules";
import { displayNameForCode } from "@/lib/countries-catalogue";
import { fmtPct } from "@/lib/calc-math";
import { CalcCard, NumberField, Stat } from "./CalcUI";
import { CountryPickerWithCoverage } from "./CountryPickerWithCoverage";
import { SaveResultForm } from "./SaveResultForm";

type RateStructure = "fixed" | "fix-revert" | "variable";

// Sensible price defaults per country (rough mid-market for an investor unit).
const DEFAULT_PRICE: Record<CountryCode, number> = {
  AE: 2_000_000, // AED
  GB: 350_000, // GBP
  FR: 380_000, // EUR
  ES: 280_000, // EUR
  PT: 320_000, // EUR
  GR: 220_000, // EUR
  DE: 420_000, // EUR
  CH: 1_200_000, // CHF
};

/** Convert a decimal fraction (0.044) to a clean percentage (4.4) without IEEE-754 dust. */
const asPct = (decimal: number) => Math.round(decimal * 10000) / 100;

// Static fallback for basic-coverage countries. The picker's amber
// notice says "United Kingdom rules as the stand-in" so the fallback
// has to match. UK chosen because (a) progressive SDLT bands are the
// most universally recognisable transfer-tax model, (b) English-property-
// market norms are widely understood, (c) GBP is one of our supported
// billing currencies.
const BASIC_COVERAGE_FALLBACK: CountryCode = "GB";

export function MortgageCalculator() {
  const [country, setCountry] = useState<CountryCode>("GB");
  const [displayCountry, setDisplayCountry] = useState<string>(
    displayNameForCode("GB"),
  );
  const [residency, setResidency] = useState<Residency>("non-resident");
  const [isAdditionalProperty, setIsAdditionalProperty] = useState(true);

  const rule = getRule(country);

  const [price, setPrice] = useState<number>(DEFAULT_PRICE[country]);
  const [depositPct, setDepositPct] = useState<number>(
    Math.round((1 - rule.maxLtv.nonResident) * 100),
  );
  const [years, setYears] = useState<number>(Math.min(25, rule.maxTerm));
  const [loanType, setLoanType] = useState<LoanType>("repayment");

  // Rate inputs (in %, not decimals)
  const [rateStructure, setRateStructure] = useState<RateStructure>("fix-revert");
  const [initialRate, setInitialRate] = useState<number>(asPct(rule.typicalRate));
  const [fixYears, setFixYears] = useState<number>(2);
  // Reversion default: typical rate + 2pts (rough SVR proxy)
  const [revertRate, setRevertRate] = useState<number>(asPct(rule.typicalRate) + 2);
  const [stressAdd, setStressAdd] = useState<number>(2);

  function changeCountry(code: CountryCode) {
    const r = getRule(code);
    setCountry(code);
    setPrice(DEFAULT_PRICE[code]);
    setDepositPct(
      Math.round((1 - (residency === "resident" ? r.maxLtv.resident : r.maxLtv.nonResident)) * 100),
    );
    setInitialRate(asPct(r.typicalRate));
    setRevertRate(asPct(r.typicalRate) + 2);
    setYears(Math.min(years, r.maxTerm));
  }

  // Fires from CountryPickerWithCoverage on every resolution change.
  // useCallback so the picker's useEffect doesn't refire on every parent
  // re-render (the picker depends on this callback's identity in its
  // dep list). When the resolved code differs from the current one we
  // run changeCountry to reset price/rate/term defaults for the new
  // rule. For basic-coverage picks the resolved code is the static
  // fallback (GB) — we still call changeCountry so the inputs reset to
  // GB defaults, which is what the user expects given the notice. */
  const handleCountryResolve = useCallback(
    (resolved: { code: CountryCode; isBasicCoverage: boolean }) => {
      if (resolved.code !== country) {
        changeCountry(resolved.code);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [country],
  );

  const result = useMemo(() => {
    if (![price, depositPct, years, initialRate].every((v) => isFinite(v))) return null;
    const deposit = (price * depositPct) / 100;
    const loan = Math.max(0, price - deposit);

    // Build phase schedule based on rate structure
    const initialAnnual = initialRate / 100;
    const revertAnnual = revertRate / 100;
    const totalMonths = years * 12;

    let phases: { annualRate: number; months: number }[];
    if (rateStructure === "fix-revert") {
      const fixMonths = Math.min(fixYears, years) * 12;
      const revertMonths = Math.max(0, totalMonths - fixMonths);
      phases = revertMonths > 0
        ? [
            { annualRate: initialAnnual, months: fixMonths },
            { annualRate: revertAnnual, months: revertMonths },
          ]
        : [{ annualRate: initialAnnual, months: fixMonths }];
    } else {
      // "fixed" and "variable" both amortise as a single phase at `initialRate`
      phases = [{ annualRate: initialAnnual, months: totalMonths }];
    }

    const baseAm = amortiseSchedule(loan, phases, loanType);

    // Stress test for "variable": same loan amortised at initialRate + stressAdd
    let stressAm: typeof baseAm | null = null;
    if (rateStructure === "variable") {
      const stressedRate = (initialRate + stressAdd) / 100;
      stressAm = amortiseSchedule(
        loan,
        [{ annualRate: stressedRate, months: totalMonths }],
        loanType,
      );
    }

    const transferTax = rule.computeTransferTax(price, isAdditionalProperty);
    const otherFees = price * rule.otherFeesPct;
    const cashAtCompletion = deposit + transferTax + otherFees;
    const ltv = price > 0 ? loan / price : 0;
    const maxLtv =
      residency === "resident" ? rule.maxLtv.resident : rule.maxLtv.nonResident;

    const warnings: string[] = [];
    if (ltv > maxLtv + 0.001) {
      warnings.push(
        `LTV ${(ltv * 100).toFixed(0)}% exceeds the typical max ${(maxLtv * 100).toFixed(0)}% for a ${residency.replace("-", " ")} buyer in ${rule.name}. Expect a larger deposit requirement or a specialist lender.`,
      );
    }
    if (years > rule.maxTerm) {
      warnings.push(
        `Term ${years} yrs exceeds the typical max ${rule.maxTerm} yrs in ${rule.name}.`,
      );
    }
    if (loanType === "interest-only" && country !== "GB") {
      warnings.push(
        `Interest-only mortgages are uncommon for residential purchases outside the UK BTL market. Most ${rule.name} lenders default to capital + interest.`,
      );
    }
    if (rateStructure === "fix-revert" && fixYears >= years) {
      warnings.push(
        `Fix period (${fixYears} yrs) ≥ total term (${years} yrs) — there's no reversion phase. The "Fixed for whole term" structure is equivalent here.`,
      );
    }
    if (rateStructure === "fix-revert" && baseAm.paymentByPhase.length === 2) {
      const m1 = baseAm.paymentByPhase[0];
      const m2 = baseAm.paymentByPhase[1];
      const shockPct = m1 > 0 ? (m2 - m1) / m1 : 0;
      if (shockPct > 0.25) {
        warnings.push(
          `Payment shock at reversion: monthly payment jumps ${(shockPct * 100).toFixed(0)}% (from ${formatLocalMoney(m1, rule.currency)} to ${formatLocalMoney(m2, rule.currency)}). Plan a remortgage 3–6 months before the fix ends.`,
        );
      }
    }

    return {
      deposit,
      loan,
      ltv,
      transferTax,
      otherFees,
      cashAtCompletion,
      baseAm,
      stressAm,
      warnings,
      maxLtv,
    };
  }, [
    price,
    depositPct,
    years,
    initialRate,
    fixYears,
    revertRate,
    stressAdd,
    rateStructure,
    loanType,
    country,
    residency,
    isAdditionalProperty,
    rule,
  ]);

  // The headline monthly payment changes by structure.
  const headlinePayment = result?.baseAm.paymentByPhase[0] ?? null;
  const reversionPayment =
    rateStructure === "fix-revert" && result?.baseAm.paymentByPhase[1] != null
      ? result.baseAm.paymentByPhase[1]
      : null;
  const stressedPayment =
    rateStructure === "variable" && result?.stressAm?.paymentByPhase[0] != null
      ? result.stressAm.paymentByPhase[0]
      : null;
  const totalRepaid = result
    ? result.baseAm.totalInterest + result.loan
    : null;

  const summary = useMemo(() => {
    if (!result) return "";
    const lines = [
      "Mortgage Calculator result",
      `Country: ${rule.name} (${rule.code}) · ${residency} · ${
        isAdditionalProperty ? "additional/investment property" : "primary residence"
      }`,
      `Inputs: price ${formatLocalMoney(price, rule.currency)}, deposit ${depositPct}% (${formatLocalMoney(
        result.deposit,
        rule.currency,
      )}), term ${years} yrs, ${loanType}`,
    ];
    if (rateStructure === "fixed") {
      lines.push(
        `Rate structure: Fixed ${initialRate}% for full ${years}-year term`,
        `Monthly payment ${formatLocalMoney(headlinePayment, rule.currency)} · total interest ${formatLocalMoney(
          result.baseAm.totalInterest,
          rule.currency,
        )}`,
      );
    } else if (rateStructure === "fix-revert") {
      lines.push(
        `Rate structure: ${initialRate}% fixed for ${fixYears} yrs, then ${revertRate}% for the remaining ${Math.max(0, years - fixYears)} yrs`,
        `Monthly during fix: ${formatLocalMoney(headlinePayment, rule.currency)}`,
        `Monthly after revert: ${formatLocalMoney(reversionPayment, rule.currency)}`,
        `Total interest over full term: ${formatLocalMoney(result.baseAm.totalInterest, rule.currency)}`,
      );
    } else {
      lines.push(
        `Rate structure: Variable, current ${initialRate}% · stress +${stressAdd}pts → ${(initialRate + stressAdd).toFixed(2)}%`,
        `Monthly at current rate: ${formatLocalMoney(headlinePayment, rule.currency)}`,
        `Monthly at stressed rate: ${formatLocalMoney(stressedPayment, rule.currency)}`,
        `Total interest at current rate (informational): ${formatLocalMoney(result.baseAm.totalInterest, rule.currency)}`,
      );
    }
    lines.push(
      `Loan ${formatLocalMoney(result.loan, rule.currency)} (LTV ${(result.ltv * 100).toFixed(0)}%)`,
      `At completion: transfer tax ${formatLocalMoney(result.transferTax, rule.currency)} · other fees ${formatLocalMoney(result.otherFees, rule.currency)} · total cash needed ${formatLocalMoney(result.cashAtCompletion, rule.currency)}`,
    );
    if (result.warnings.length) lines.push(`Warnings: ${result.warnings.join(" | ")}`);
    return lines.join("\n");
  }, [
    result,
    rule,
    price,
    depositPct,
    years,
    loanType,
    rateStructure,
    initialRate,
    fixYears,
    revertRate,
    stressAdd,
    residency,
    isAdditionalProperty,
    headlinePayment,
    reversionPayment,
    stressedPayment,
  ]);

  const maxLtvForResidency = result?.maxLtv ?? rule.maxLtv.nonResident;

  return (
    <>
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-5 lg:gap-7 items-start">
        {/* Inputs */}
        <CalcCard title="Inputs">
          <div className="space-y-4">
            {/* Country picker — two-optgroup pattern (Detailed coverage +
                Other countries) matching the in-app calculator pickers.
                Detailed-coverage countries get the calculator's full
                mortgage rule set; other countries render results against
                a generic UK model with an amber illustrative-results
                notice from the picker itself. */}
            <CountryPickerWithCoverage
              value={displayCountry}
              onChange={setDisplayCountry}
              onResolve={handleCountryResolve}
              fallbackCode={BASIC_COVERAGE_FALLBACK}
              label="Country"
            />

            <div className="grid sm:grid-cols-2 gap-3">
              <SegmentedControl<Residency>
                label="Borrower"
                value={residency}
                onChange={setResidency}
                options={[
                  { value: "resident", label: "Resident" },
                  { value: "non-resident", label: "Non-resident" },
                ]}
              />
              <SegmentedControl<boolean>
                label="Property"
                value={isAdditionalProperty}
                onChange={setIsAdditionalProperty}
                options={[
                  { value: false, label: "Primary" },
                  { value: true, label: "Investment" },
                ]}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <NumberField
                label="Property price"
                prefix={rule.currency}
                value={price}
                onChange={setPrice}
                step={5_000}
                min={0}
              />
              <NumberField
                label="Deposit"
                suffix="%"
                value={depositPct}
                onChange={setDepositPct}
                step={1}
                min={0}
                max={100}
                hint={`Local max LTV ${(maxLtvForResidency * 100).toFixed(0)}% (deposit ≥ ${(
                  (1 - maxLtvForResidency) * 100
                ).toFixed(0)}%)`}
              />
              <NumberField
                label="Term"
                suffix="yrs"
                value={years}
                onChange={setYears}
                step={1}
                min={1}
                max={rule.maxTerm}
                hint={`Max ${rule.maxTerm} yrs`}
              />
              <SegmentedControl<LoanType>
                label="Loan type"
                value={loanType}
                onChange={setLoanType}
                options={[
                  { value: "repayment", label: "Repayment" },
                  { value: "interest-only", label: "Interest-only" },
                ]}
              />
            </div>

            {/* Rate structure */}
            <div className="pt-2 border-t border-[var(--color-border)]">
              <SegmentedControl<RateStructure>
                label="Rate structure"
                value={rateStructure}
                onChange={setRateStructure}
                options={[
                  { value: "fixed", label: "Fixed" },
                  { value: "fix-revert", label: "Fix + revert" },
                  { value: "variable", label: "Variable" },
                ]}
              />

              {rateStructure === "fixed" && (
                <div className="mt-3">
                  <NumberField
                    label="Fixed rate (whole term)"
                    suffix="%"
                    value={initialRate}
                    onChange={setInitialRate}
                    step={0.1}
                    min={0}
                    hint={`Typical ${(rule.typicalRate * 100).toFixed(1)}%`}
                  />
                </div>
              )}

              {rateStructure === "fix-revert" && (
                <div className="mt-3 grid sm:grid-cols-3 gap-3">
                  <NumberField
                    label="Initial rate"
                    suffix="%"
                    value={initialRate}
                    onChange={setInitialRate}
                    step={0.1}
                    min={0}
                  />
                  <NumberField
                    label="Fix period"
                    suffix="yrs"
                    value={fixYears}
                    onChange={setFixYears}
                    step={1}
                    min={1}
                    max={years}
                    hint="2 or 5 yrs common in UK"
                  />
                  <NumberField
                    label="Reversion rate"
                    suffix="%"
                    value={revertRate}
                    onChange={setRevertRate}
                    step={0.1}
                    min={0}
                    hint="Typically SVR + buffer"
                  />
                </div>
              )}

              {rateStructure === "variable" && (
                <div className="mt-3 grid sm:grid-cols-2 gap-3">
                  <NumberField
                    label="Current rate"
                    suffix="%"
                    value={initialRate}
                    onChange={setInitialRate}
                    step={0.1}
                    min={0}
                  />
                  <NumberField
                    label="Stress test add"
                    suffix="pts"
                    value={stressAdd}
                    onChange={setStressAdd}
                    step={0.5}
                    min={0}
                    hint="UK lenders stress at ~SVR + 1pt"
                  />
                </div>
              )}
            </div>
          </div>
        </CalcCard>

        {/* Results */}
        <CalcCard title="Results">
          <div className="space-y-6">
            {/* Headline payment(s) */}
            {rateStructure === "fixed" && (
              <Stat
                label="Monthly payment"
                value={formatLocalMoney(headlinePayment, rule.currency)}
                big
              />
            )}
            {rateStructure === "fix-revert" && (
              <div className="space-y-4">
                <Stat
                  label={`Monthly · during ${fixYears}-yr fix`}
                  value={formatLocalMoney(headlinePayment, rule.currency)}
                  big
                />
                <Stat
                  label={`Monthly · after revert (year ${fixYears + 1}+)`}
                  value={formatLocalMoney(reversionPayment, rule.currency)}
                  tone={
                    headlinePayment && reversionPayment && reversionPayment > headlinePayment * 1.25
                      ? "negative"
                      : "warning"
                  }
                />
              </div>
            )}
            {rateStructure === "variable" && (
              <div className="space-y-4">
                <Stat
                  label="Monthly · at current rate"
                  value={formatLocalMoney(headlinePayment, rule.currency)}
                  big
                />
                <Stat
                  label={`Monthly · stressed (+${stressAdd}pts → ${(initialRate + stressAdd).toFixed(2)}%)`}
                  value={formatLocalMoney(stressedPayment, rule.currency)}
                  tone="warning"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-5">
              <Stat label="Loan amount" value={formatLocalMoney(result?.loan ?? null, rule.currency)} />
              <Stat
                label="Effective LTV"
                value={fmtPct(result?.ltv ?? null, 0)}
                tone={
                  result && result.ltv > maxLtvForResidency + 0.001 ? "negative" : "neutral"
                }
              />
              <Stat
                label="Total interest"
                value={formatLocalMoney(result?.baseAm.totalInterest ?? null, rule.currency)}
              />
              <Stat
                label="Total repaid"
                value={formatLocalMoney(totalRepaid, rule.currency)}
              />
            </div>

            <div className="pt-4 border-t border-[var(--color-border)]">
              <div
                className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Cash needed at completion
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Stat label="Deposit" value={formatLocalMoney(result?.deposit ?? null, rule.currency)} />
                <Stat
                  label="Transfer tax / stamp duty"
                  value={formatLocalMoney(result?.transferTax ?? null, rule.currency)}
                />
                <Stat
                  label="Other fees"
                  value={formatLocalMoney(result?.otherFees ?? null, rule.currency)}
                />
                <Stat
                  label="Total cash needed"
                  value={formatLocalMoney(result?.cashAtCompletion ?? null, rule.currency)}
                  tone="warning"
                />
              </div>
            </div>

            {result?.warnings.length ? (
              <div
                className="rounded-md border-l-4 border-[var(--color-warning)] bg-amber-50 px-4 py-3 text-[13px] leading-[1.55] text-amber-900 space-y-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {result.warnings.map((w) => (
                  <p key={w}>
                    <strong>Heads up:</strong> {w}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </CalcCard>
      </div>

      {/* Country rules */}
      <div className="mt-5 lg:mt-7">
        <CalcCard title={`${rule.flag}  ${rule.name} — mortgage rules`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <Stat label="Max LTV · resident" value={`${(rule.maxLtv.resident * 100).toFixed(0)}%`} />
            <Stat
              label="Max LTV · non-resident"
              value={`${(rule.maxLtv.nonResident * 100).toFixed(0)}%`}
            />
            <Stat label="Max term" value={`${rule.maxTerm} yrs`} />
            <Stat label="Typical headline rate" value={`${(rule.typicalRate * 100).toFixed(1)}%`} />
          </div>
          <ul
            className="space-y-2.5 text-[14px] leading-[1.55] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {rule.notes.map((n) => (
              <li key={n} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-navy)] flex-shrink-0"
                />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </CalcCard>
      </div>

      <SaveResultForm calc="mortgage" calcName="Mortgage" summary={summary} />
    </>
  );
}

/* ---------- Local UI helper: segmented control ---------- */

function SegmentedControl<T extends string | boolean>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <div className="text-[13px] font-medium text-[var(--color-ink)] mb-1.5">{label}</div>
      <div
        role="radiogroup"
        className="inline-flex w-full rounded-md border border-[var(--color-border)] bg-white p-1 gap-1"
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={`flex-1 min-h-[40px] px-3 rounded text-[13.5px] ${
                active
                  ? "bg-[var(--color-navy)] text-white"
                  : "text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
