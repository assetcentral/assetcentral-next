import { CURRENCY_SYMBOLS, type CurrencyCode } from "./currency";

export type CountryCode = "AE" | "GB" | "FR" | "ES" | "PT" | "GR" | "DE" | "CH";
export type Residency = "resident" | "non-resident";

export type CountryRule = {
  code: CountryCode;
  name: string;
  flag: string;
  /** Currency the mortgage is denominated in (and prices shown in). */
  currency: CurrencyCode;
  /** LTV caps as decimals (0–1). */
  maxLtv: { resident: number; nonResident: number };
  /** Max loan term in years. */
  maxTerm: number;
  /** Max age at maturity (informational). */
  maxAgeAtMaturity: number;
  /** Typical headline rate (annual decimal). Used as the default rate field. */
  typicalRate: number;
  /**
   * Transfer tax / stamp duty / registration tax due at completion.
   * `isAdditionalProperty` triggers second-home surcharges where they apply.
   */
  computeTransferTax: (price: number, isAdditionalProperty: boolean) => number;
  /** Other typical completion costs (notary, legal, agent on buyer side, registration) as % of price. */
  otherFeesPct: number;
  /** Plain-English rules + things to know. */
  notes: string[];
};

/* ---------- Transfer-tax helpers ---------- */

/**
 * UK SDLT — additional residential property (buy-to-let / second home).
 * Approximation of HMRC bands current as of 2026. Bands compound progressively.
 */
function ukSdlt(price: number, isAdditionalProperty: boolean): number {
  // Standard residential bands.
  const standardBands: { upto: number; rate: number }[] = [
    { upto: 250_000, rate: 0.0 },
    { upto: 925_000, rate: 0.05 },
    { upto: 1_500_000, rate: 0.1 },
    { upto: Infinity, rate: 0.12 },
  ];
  // Additional-property surcharge applied on top of every band (current model).
  const surcharge = isAdditionalProperty ? 0.05 : 0;
  let remaining = price;
  let tax = 0;
  let lower = 0;
  for (const b of standardBands) {
    const slice = Math.max(0, Math.min(remaining, b.upto - lower));
    if (slice <= 0) {
      lower = b.upto;
      continue;
    }
    const rate = b.rate + (b.rate > 0 || isAdditionalProperty ? surcharge : surcharge);
    tax += slice * rate;
    remaining -= slice;
    lower = b.upto;
    if (remaining <= 0) break;
  }
  return Math.round(tax);
}

/** Portugal IMT — second/investment property, simplified bands. */
function ptImt(price: number): number {
  const bands: { upto: number; rate: number; minus: number }[] = [
    { upto: 101_917, rate: 0.01, minus: 0 },
    { upto: 139_412, rate: 0.02, minus: 1_019 },
    { upto: 190_086, rate: 0.05, minus: 5_201 },
    { upto: 316_772, rate: 0.07, minus: 9_004 },
    { upto: 633_453, rate: 0.08, minus: 12_171 },
    { upto: 1_102_920, rate: 0.06, minus: 0 },
    { upto: Infinity, rate: 0.075, minus: 0 },
  ];
  for (const b of bands) {
    if (price <= b.upto) {
      const tax = price * b.rate - b.minus;
      return Math.max(0, Math.round(tax));
    }
  }
  return Math.round(price * 0.075);
}

/* ---------- Country rules ---------- */

export const COUNTRY_RULES: Record<CountryCode, CountryRule> = {
  AE: {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED",
    maxLtv: { resident: 0.8, nonResident: 0.5 },
    maxTerm: 25,
    maxAgeAtMaturity: 65,
    typicalRate: 0.044,
    computeTransferTax: (price) =>
      // Dubai Land Department transfer fee 4% + mortgage registration 0.25% + admin
      Math.round(price * 0.0425),
    otherFeesPct: 0.025, // agent (2%) + trustee + legal
    notes: [
      "Resident max LTV 80% on properties ≤ AED 5m; 70% above. Non-resident max LTV 50% (40% above AED 5m).",
      "Max term 25 years. Max borrower age 65 at maturity (banks differ).",
      "Dubai Land Department transfer fee 4% of property price, plus 0.25% mortgage registration fee.",
      "Typical agent commission 2% (buyer-side, paid at completion).",
      "Variable-rate (EIBOR-linked) mortgages dominate; fixed introductory periods of 1–5 years are common.",
    ],
  },
  GB: {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    maxLtv: { resident: 0.85, nonResident: 0.7 },
    maxTerm: 35,
    maxAgeAtMaturity: 75,
    typicalRate: 0.045,
    computeTransferTax: ukSdlt,
    otherFeesPct: 0.015, // legal + survey + lender arrangement averaged
    notes: [
      "Fix-then-revert is the default UK structure: 2-yr or 5-yr fixed initial period, then the loan reverts to the lender's Standard Variable Rate (SVR) for the rest of the term. Use the 'Fix + revert' option above and expect a payment shock at the end of the fix.",
      "Buy-to-let max LTV typically 75% (some lenders 80%). Non-resident BTL often capped at 70%.",
      "Stamp Duty Land Tax (SDLT) is progressive. Additional residential property carries a 5% surcharge across all bands.",
      "Lenders apply rental stress tests (typically 125–145% of mortgage interest at SVR + 1pt). Use the 'Variable' option above to model the stressed rate.",
      "Max term 35–40 years on residential, 25–30 on BTL. Max borrower age at maturity usually 75.",
      "Solicitor + survey + lender fees average ~1.5% of price for a buy-to-let purchase.",
    ],
  },
  FR: {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    currency: "EUR",
    maxLtv: { resident: 0.85, nonResident: 0.7 },
    maxTerm: 25,
    maxAgeAtMaturity: 75,
    typicalRate: 0.038,
    computeTransferTax: (price) => Math.round(price * 0.07),
    otherFeesPct: 0.01, // additional banking + agent (varies)
    notes: [
      "HCSF rule: debt-service-to-income capped at 35% (rare exceptions). Most banks enforce strictly.",
      "Frais de notaire ~7–8% on existing-build, ~2–3% on new-build (VAT instead of notaire fees on new).",
      "Resident max LTV up to 100% in theory; non-residents typically 70–80% with French income proof.",
      "Mortgage life insurance (assurance emprunteur) often required — typically 0.2–0.4% of loan p.a.",
      "Predominantly fixed-rate mortgages; long-term fixed (20–25 years) common.",
    ],
  },
  ES: {
    code: "ES",
    name: "Spain",
    flag: "🇪🇸",
    currency: "EUR",
    maxLtv: { resident: 0.8, nonResident: 0.7 },
    maxTerm: 30,
    maxAgeAtMaturity: 75,
    typicalRate: 0.038,
    computeTransferTax: (price) => Math.round(price * 0.08), // ITP averages 6–10% by region
    otherFeesPct: 0.025, // notary + registration + AJD + legal
    notes: [
      "ITP (transfer tax on resale) ranges 6–10% by autonomous community; new-builds attract 10% VAT + 1.5% AJD instead.",
      "Resident max LTV typically 80% of purchase or appraised value (whichever is lower). Non-resident 60–70%.",
      "Mortgage life insurance often a soft condition. Home insurance is required.",
      "Notary, registry, and AJD stamp duty add ~2–3% to completion costs.",
      "Fixed-rate mortgages have become more competitive than Euribor-linked in recent years.",
    ],
  },
  PT: {
    code: "PT",
    name: "Portugal",
    flag: "🇵🇹",
    currency: "EUR",
    maxLtv: { resident: 0.9, nonResident: 0.7 },
    maxTerm: 35,
    maxAgeAtMaturity: 75,
    typicalRate: 0.038,
    computeTransferTax: ptImt,
    otherFeesPct: 0.015, // notary + registry + stamp duty (0.8%) + legal
    notes: [
      "IMT (transfer tax) is progressive — see calculator output. Permanent home rates lower than secondary.",
      "Imposto do Selo (stamp duty) 0.8% on price plus 0.6% on mortgage amount.",
      "Resident LTV up to 90% (own residence) or 80% (other); non-resident usually capped at 70%.",
      "Max term 35 years, but tighter age-based caps for older borrowers.",
      "Mortgages traditionally Euribor-linked; banks now offer mixed fixed (3–10 yrs) → variable products.",
    ],
  },
  GR: {
    code: "GR",
    name: "Greece",
    flag: "🇬🇷",
    currency: "EUR",
    maxLtv: { resident: 0.8, nonResident: 0.6 },
    maxTerm: 30,
    maxAgeAtMaturity: 75,
    typicalRate: 0.041,
    computeTransferTax: (price) => Math.round(price * 0.0309),
    otherFeesPct: 0.025, // notary + lawyer + registration + agent
    notes: [
      "Transfer tax 3.09% (resale). New-builds (post-2006 licence) attract 24% VAT instead — verify pre-purchase.",
      "Resident LTV up to 80%; non-resident typically 60% maximum, often with locally-banked income.",
      "Mandatory lawyer for purchase contracts; engineer survey strongly advised.",
      "ENFIA (annual property tax) applies; not in this calculator's transaction costs but plan for it.",
      "Greek banks generally lend in EUR only. Foreign-currency mortgages on Greek property are rare and tightly regulated.",
    ],
  },
  DE: {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    maxLtv: { resident: 0.8, nonResident: 0.6 },
    maxTerm: 35,
    maxAgeAtMaturity: 75,
    typicalRate: 0.04,
    computeTransferTax: (price) => Math.round(price * 0.055),
    otherFeesPct: 0.025, // notary + land registry + agent (geteilt)
    notes: [
      "Grunderwerbsteuer (transfer tax) varies 3.5–6.5% by Bundesland — this calculator uses 5.5% as a mid-point.",
      "Resident LTV up to 80% (sometimes higher with strong income); non-resident usually 60%.",
      "Notary + land registry ~1.5–2%, buyer's share of agent commission ~1.78–3.57% by region.",
      "Fixed-rate periods (Zinsbindung) of 10, 15, 20, even 30 years are standard. After the fixed period the loan often refinances.",
      "Tilgung (amortisation rate) typically 2–3% p.a. of original loan — separate from the interest rate. This calculator uses straight repayment amortisation.",
    ],
  },
  CH: {
    code: "CH",
    name: "Switzerland",
    flag: "🇨🇭",
    currency: "CHF",
    maxLtv: { resident: 0.8, nonResident: 0.5 },
    maxTerm: 25,
    maxAgeAtMaturity: 75,
    typicalRate: 0.022,
    computeTransferTax: (price) => Math.round(price * 0.025),
    otherFeesPct: 0.01, // notary + registry — varies by canton
    notes: [
      "Mandatory amortisation: any loan above 66.6% LTV must be amortised down to 66.6% within 15 years.",
      "Resident max LTV 80% (with at least 10% of price from non-pension equity). Non-resident max LTV 50–60%, subject to Lex Koller restrictions on holiday homes.",
      "Transfer tax + notary + registry vary significantly by canton — assume 2.5–4% combined.",
      "Affordability rule: imputed mortgage payment + maintenance must not exceed 33% of gross income (calculated at a stress rate of ~5%, not the actual rate).",
      "Long-term fixed mortgages (10–15 yrs) are competitively priced vs SARON-linked products.",
    ],
  },
};

export const COUNTRIES = Object.values(COUNTRY_RULES);

export function getRule(code: CountryCode): CountryRule {
  return COUNTRY_RULES[code];
}

export function currencySymbol(code: CurrencyCode): string {
  return CURRENCY_SYMBOLS[code];
}

/* ---------- Math ---------- */

export type LoanType = "repayment" | "interest-only";

export function monthlyPayment(
  loanAmount: number,
  annualRate: number,
  years: number,
  type: LoanType,
): number {
  if (loanAmount <= 0 || years <= 0) return 0;
  if (type === "interest-only") {
    return (loanAmount * annualRate) / 12;
  }
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return loanAmount / n;
  return (loanAmount * r) / (1 - Math.pow(1 + r, -n));
}

export function totalInterestPaid(
  loanAmount: number,
  annualRate: number,
  years: number,
  type: LoanType,
): number {
  if (loanAmount <= 0 || years <= 0) return 0;
  if (type === "interest-only") {
    return loanAmount * annualRate * years;
  }
  return monthlyPayment(loanAmount, annualRate, years, type) * years * 12 - loanAmount;
}

/**
 * Multi-phase amortisation. A phase has an annual rate and a length in months.
 * Within each phase the payment is recomputed to amortise the *remaining*
 * principal over the *remaining total* term. Mirrors how UK lenders behave
 * when a fix ends and the loan reverts to SVR.
 */
export type RatePhase = { annualRate: number; months: number };

export type AmortisationResult = {
  /** Monthly payment within each phase (length matches `phases` input). */
  paymentByPhase: number[];
  /** Principal remaining at the START of each phase. */
  principalByPhase: number[];
  /** Cumulative interest paid by the END of each phase. */
  interestByPhase: number[];
  /** Total interest paid across the whole schedule. */
  totalInterest: number;
  /** Final principal after the schedule completes (≈ 0 for repayment, ≈ loan for interest-only). */
  finalPrincipal: number;
  /** Total months in the schedule. */
  totalMonths: number;
};

export function amortiseSchedule(
  loanAmount: number,
  phases: RatePhase[],
  type: LoanType,
): AmortisationResult {
  const totalMonths = phases.reduce((acc, p) => acc + p.months, 0);
  const paymentByPhase: number[] = [];
  const principalByPhase: number[] = [];
  const interestByPhase: number[] = [];

  if (loanAmount <= 0 || totalMonths <= 0) {
    return {
      paymentByPhase: phases.map(() => 0),
      principalByPhase: phases.map(() => 0),
      interestByPhase: phases.map(() => 0),
      totalInterest: 0,
      finalPrincipal: 0,
      totalMonths,
    };
  }

  let principal = loanAmount;
  let cumulativeInterest = 0;
  let monthsRemainingTotal = totalMonths;

  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i];
    principalByPhase.push(principal);

    let payment = 0;
    if (type === "interest-only") {
      payment = (principal * phase.annualRate) / 12;
    } else {
      const r = phase.annualRate / 12;
      const n = monthsRemainingTotal;
      if (r === 0) payment = principal / n;
      else payment = (principal * r) / (1 - Math.pow(1 + r, -n));
    }
    paymentByPhase.push(payment);

    // Simulate this phase month-by-month so principal and interest accrue correctly.
    for (let m = 0; m < phase.months && principal > 0; m++) {
      const interest = (principal * phase.annualRate) / 12;
      const principalPayment = type === "interest-only" ? 0 : payment - interest;
      cumulativeInterest += interest;
      principal = Math.max(0, principal - Math.max(0, principalPayment));
    }
    monthsRemainingTotal -= phase.months;
    interestByPhase.push(cumulativeInterest);
  }

  return {
    paymentByPhase,
    principalByPhase,
    interestByPhase,
    totalInterest: cumulativeInterest,
    finalPrincipal: principal,
    totalMonths,
  };
}

/** Format a price in the country's currency with thousands separators. */
export function formatLocalMoney(amount: number | null, code: CurrencyCode): string {
  if (amount === null || !isFinite(amount) || isNaN(amount)) return "—";
  const sym = CURRENCY_SYMBOLS[code];
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "−" : "";
  return `${sign}${sym}${Math.round(abs).toLocaleString("en-GB")}`;
}
