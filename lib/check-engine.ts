// Property check engine — pure math + deterministic verdict logic for
// the /check funnel.
//
// Phase 2 ships a deterministic engine (no LLM call) because the
// arithmetic carries the verdict on its own — cash-flow sign and DSCR
// are how a credit committee actually scores a buy-to-let. Phase 2.5
// (planned) will layer an Anthropic Haiku call on top to generate the
// natural-language summary in the verdict, so the on-screen copy can
// feel custom while keeping the numbers honest. The shape of `Verdict`
// already mirrors what the model will return — adding the LLM later
// is a swap, not a rewrite.
//
// All inputs are in the user's currency (GBP defaults on the page,
// but the engine is currency-agnostic — strings are formatted in the
// UI). All money fields are numbers. Term is years.

export interface CheckInputs {
  /** Purchase price (currency units, e.g. 285000). */
  price: number;
  /** Deposit (currency units). */
  deposit: number;
  /** Annual interest rate in percent (e.g. 5.4). */
  ratePct: number;
  /** Term in years (e.g. 25). */
  termYrs: number;
  /** Expected monthly rent (currency units). */
  monthlyRent: number;
  /** Monthly service charge + ground rent + insurance combined. */
  monthlyServiceCharge: number;
  /** Monthly maintenance reserve. */
  monthlyMaintenance: number;
  /** Letting / management fee as a percent of rent (e.g. 10). */
  managementPct: number;
  /** Expected vacancy months per year (e.g. 0.5). */
  vacancyMonths: number;
}

export type VerdictTone = "attractive" | "borderline" | "risky";

export interface Verdict {
  /** Three-bucket verdict driving the colour + label. */
  tone: VerdictTone;
  /** Short headline ("Attractive", "Borderline", "Risky"). */
  label: string;
  /** One- or two-sentence narrative. Deterministic in v1. */
  summary: string;
  /** Single biggest red flag. */
  redFlag: { title: string; body: string };
  /** Single highest-leverage improvement. */
  improvement: { title: string; body: string };
}

export interface CheckResult {
  /** Monthly mortgage payment. */
  monthlyMortgage: number;
  /** Annual rent collected (after vacancy). */
  effectiveAnnualRent: number;
  /** Annual operating costs (service + maintenance + management). */
  annualOpex: number;
  /** Annual mortgage payments. */
  annualDebtService: number;
  /** Net monthly cash flow after debt service. */
  monthlyCashFlow: number;
  /** Gross yield (rent / price), as a percent. */
  grossYieldPct: number;
  /** Net yield before debt (NOI / price), as a percent. */
  netYieldPct: number;
  /** DSCR = NOI / annual debt service. */
  dscr: number;
  /** Verdict bundle. */
  verdict: Verdict;
}

// ── Pure math ────────────────────────────────────────────────────────

/** Standard fixed-rate amortising payment. */
export function monthlyMortgage(
  loan: number,
  annualRatePct: number,
  termYrs: number,
): number {
  if (loan <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = termYrs * 12;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

/** Round to nearest currency unit. */
const r = (n: number): number => Math.round(n);

// ── Verdict logic ────────────────────────────────────────────────────

/** Compute everything in one call. Pure function — no side effects. */
export function runCheck(inputs: CheckInputs): CheckResult {
  const loan = Math.max(0, inputs.price - inputs.deposit);
  const pm = monthlyMortgage(loan, inputs.ratePct, inputs.termYrs);
  const effectiveAnnualRent =
    inputs.monthlyRent * Math.max(0, 12 - inputs.vacancyMonths);
  const annualManagement =
    effectiveAnnualRent * (inputs.managementPct / 100);
  const annualOpex =
    (inputs.monthlyServiceCharge + inputs.monthlyMaintenance) * 12 +
    annualManagement;
  const annualDebtService = pm * 12;
  const noi = effectiveAnnualRent - annualOpex;
  const monthlyCashFlow = (noi - annualDebtService) / 12;
  const grossYieldPct =
    inputs.price > 0 ? (inputs.monthlyRent * 12) / inputs.price * 100 : 0;
  const netYieldPct = inputs.price > 0 ? (noi / inputs.price) * 100 : 0;
  const dscr = annualDebtService > 0 ? noi / annualDebtService : Infinity;

  const verdict = buildVerdict(inputs, {
    monthlyMortgage: pm,
    monthlyCashFlow,
    annualDebtService,
    annualOpex,
    effectiveAnnualRent,
    noi,
    grossYieldPct,
    netYieldPct,
    dscr,
  });

  return {
    monthlyMortgage: r(pm),
    effectiveAnnualRent: r(effectiveAnnualRent),
    annualOpex: r(annualOpex),
    annualDebtService: r(annualDebtService),
    monthlyCashFlow: r(monthlyCashFlow),
    grossYieldPct: Math.round(grossYieldPct * 10) / 10,
    netYieldPct: Math.round(netYieldPct * 10) / 10,
    dscr: Math.round(dscr * 100) / 100,
    verdict,
  };
}

interface VerdictBag {
  monthlyMortgage: number;
  monthlyCashFlow: number;
  annualDebtService: number;
  annualOpex: number;
  effectiveAnnualRent: number;
  noi: number;
  grossYieldPct: number;
  netYieldPct: number;
  dscr: number;
}

function buildVerdict(inputs: CheckInputs, m: VerdictBag): Verdict {
  // ── Tone ──────────────────────────────────────────────────────────
  let tone: VerdictTone;
  let label: string;
  if (m.monthlyCashFlow >= 150 && m.dscr >= 1.25) {
    tone = "attractive";
    label = "Attractive";
  } else if (m.monthlyCashFlow >= -200 && m.dscr >= 1.0) {
    tone = "borderline";
    label = "Borderline";
  } else {
    tone = "risky";
    label = "Risky";
  }

  // ── Summary (one-line, customised) ────────────────────────────────
  const cfWord =
    m.monthlyCashFlow >= 0
      ? `positive at +${fmt(m.monthlyCashFlow)}/mo`
      : `negative at ${fmt(m.monthlyCashFlow)}/mo`;
  let summary: string;
  if (tone === "attractive") {
    summary = `Net yield of ${m.netYieldPct.toFixed(
      1,
    )}% covers the debt comfortably (DSCR ${m.dscr.toFixed(
      2,
    )}). Cash flow is ${cfWord}.`;
  } else if (tone === "borderline") {
    summary = `The rent doesn't fully cover the mortgage and running costs at today's rate. Cash flow is ${cfWord}. Workable if you negotiate the price down or rent runs ahead of plan — risky if either moves against you.`;
  } else {
    summary = `Cash flow is ${cfWord} before any shock. The deal needs either a meaningfully lower purchase price, materially higher rent, or both — otherwise you'll be subsidising it from your own pocket.`;
  }

  // ── Red flag ─────────────────────────────────────────────────────
  // Stress-test +200bps to find the worst single vulnerability.
  const stressedMortgage = monthlyMortgage(
    Math.max(0, inputs.price - inputs.deposit),
    inputs.ratePct + 2,
    inputs.termYrs,
  );
  const stressedCashFlow =
    (m.effectiveAnnualRent - m.annualOpex - stressedMortgage * 12) / 12;
  const stressedAnnualGap = (stressedCashFlow - m.monthlyCashFlow) * 12;

  let redFlag: Verdict["redFlag"];
  if (stressedCashFlow < -300) {
    redFlag = {
      title: "Rate-shock vulnerability",
      body: `At +200bps rate shock, monthly cash flow falls to ${fmt(
        stressedCashFlow,
      )} — ${fmt(Math.abs(stressedAnnualGap))} more a year out of pocket.`,
    };
  } else {
    const sixMonthVoidImpact =
      (inputs.monthlyRent * 6) * (1 - inputs.managementPct / 100);
    const voidedCashFlow = m.monthlyCashFlow - sixMonthVoidImpact / 12;
    if (voidedCashFlow < -200) {
      redFlag = {
        title: "Vacancy exposure",
        body: `A six-month void would take annual cash flow ${fmt(
          sixMonthVoidImpact,
        )} lower — and most tenancies in this segment turn over inside 24 months.`,
      };
    } else if (m.annualOpex / Math.max(1, m.effectiveAnnualRent) > 0.3) {
      redFlag = {
        title: "Operating costs eat too much rent",
        body: `Service charges, maintenance and management absorb ${Math.round(
          (m.annualOpex / Math.max(1, m.effectiveAnnualRent)) * 100,
        )}% of rent. Anything above 30% leaves no margin for the next surprise bill.`,
      };
    } else if (m.netYieldPct < 4) {
      redFlag = {
        title: "Thin net yield",
        body: `Net yield of ${m.netYieldPct.toFixed(
          1,
        )}% leaves almost nothing after debt. The deal works only if capital growth carries it.`,
      };
    } else {
      redFlag = {
        title: "DSCR sits tight against the lender's covenant",
        body: `DSCR of ${m.dscr.toFixed(
          2,
        )} is above breakeven but inside most lenders' 1.25 stress threshold — a single hiccup pushes it below covenant.`,
      };
    }
  }

  // ── Improvement (one thing that tips the deal) ───────────────────
  // Find smaller of: price reduction needed OR rent uplift needed to
  // hit +£100/mo cash flow.
  const targetMonthlyCF = 100;
  const cfGap = targetMonthlyCF - m.monthlyCashFlow; // currency/month
  // Rent uplift required (after management cut + vacancy):
  const rentUpliftMonthly =
    cfGap /
    (((12 - inputs.vacancyMonths) / 12) *
      (1 - inputs.managementPct / 100));
  const rentUpliftPct =
    inputs.monthlyRent > 0
      ? (rentUpliftMonthly / inputs.monthlyRent) * 100
      : Infinity;
  const rentTarget = inputs.monthlyRent + rentUpliftMonthly;

  // Price reduction needed: roughly, reducing purchase price by ΔP
  // saves monthlyMortgage' on a fixed term/rate. Solve numerically.
  const priceReductionForCF = solvePriceReduction(
    inputs,
    targetMonthlyCF,
    m.annualOpex,
    m.effectiveAnnualRent,
  );
  const priceReductionPct =
    inputs.price > 0 ? (priceReductionForCF / inputs.price) * 100 : Infinity;
  const priceTarget = inputs.price - priceReductionForCF;

  let improvement: Verdict["improvement"];
  if (tone === "attractive") {
    improvement = {
      title: "Lock in the rate now",
      body: `Numbers are positive at today's rate. The biggest risk is the next rate move — a 5-year fix at or below ${(
        inputs.ratePct
      ).toFixed(2)}% protects the cash flow.`,
    };
  } else if (priceReductionPct >= 0 && (rentUpliftPct < 0 || priceReductionPct < rentUpliftPct)) {
    improvement = {
      title: "Negotiate the price down",
      body: `Negotiate to ${fmt(priceTarget)} (−${priceReductionPct.toFixed(
        1,
      )}%) and the deal turns cash-flow positive (+${fmt(targetMonthlyCF)}/mo).`,
    };
  } else if (Number.isFinite(rentUpliftPct) && rentUpliftPct >= 0) {
    improvement = {
      title: "Push rent harder",
      body: `Raise rent to ${fmt(rentTarget)}/mo (+${rentUpliftPct.toFixed(
        1,
      )}%) and the deal turns cash-flow positive (+${fmt(
        targetMonthlyCF,
      )}/mo). Benchmark against local comparables before assuming.`,
    };
  } else {
    improvement = {
      title: "Both levers, together",
      body: `Neither price alone nor rent alone gets the deal over the line — model both: a 5% price cut plus a 5% rent uplift would change the cash-flow profile.`,
    };
  }

  return { tone, label, summary, redFlag, improvement };
}

function solvePriceReduction(
  inputs: CheckInputs,
  targetMonthlyCF: number,
  annualOpex: number,
  effectiveAnnualRent: number,
): number {
  // Solve for ΔP such that resulting cash flow = target. Binary
  // search in [0, price * 0.5] — rarely deeper than 50% off.
  const targetAnnualCashFlow = targetMonthlyCF * 12;
  let lo = 0;
  let hi = inputs.price * 0.5;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    const loan = Math.max(0, inputs.price - mid - inputs.deposit);
    const pm = monthlyMortgage(loan, inputs.ratePct, inputs.termYrs);
    const annualCashFlow = effectiveAnnualRent - annualOpex - pm * 12;
    if (annualCashFlow >= targetAnnualCashFlow) {
      hi = mid;
    } else {
      lo = mid;
    }
  }
  return Math.round(hi);
}

// ── Formatting ──────────────────────────────────────────────────────

/** Format a currency value. Engine is currency-agnostic; this is the
 *  default GBP formatter used in the on-screen verdict copy. The
 *  client component formats display numbers with the user's selected
 *  currency separately. */
function fmt(n: number): string {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(Math.round(n));
  return `${sign}£${abs.toLocaleString("en-GB")}`;
}
