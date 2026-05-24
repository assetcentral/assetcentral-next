import type { Metadata } from "next";
import { CalculatorShell } from "@/components/marketing/CalculatorShell";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";

export const metadata: Metadata = {
  title:
    "Mortgage Calculator by Country | Fixed, Variable & Fix-then-Revert | AssetCentral",
  description:
    "Free residential mortgage calculator with country-specific rules. Fixed-rate, variable-rate (with stress test), and UK-style fix-then-revert structures. Monthly payment, total interest, stamp duty / transfer tax, LTV limits — for the UAE, UK, France, Spain, Portugal, Greece, Germany, and Switzerland.",
  alternates: { canonical: "/calculators/mortgage" },
};

export default function Page() {
  return (
    <CalculatorShell
      slug="mortgage"
      title="Mortgage Calculator by Country"
      subtitle="Residential mortgage payment, total interest, and transaction costs — with country-specific LTV limits, stamp-duty / transfer-tax rules, and three rate structures: fixed for the whole term, fixed period then revert (UK standard), or variable with built-in stress test."
      interpret={[
        "Monthly payment is the headline number. Compare it to your rental income (for a buy-to-let) or your monthly budget (for a primary residence). If it eats more than 35% of net income, banks in most of Europe won't approve.",
        "Fix-then-revert (UK default): the loan amortises over the full term, but at the end of the fix period the lender re-amortises the remaining principal at the reversion rate. A payment jump of more than 25% is flagged — plan to remortgage 3–6 months before the fix ends.",
        "Variable + stress test: lenders in most regulated markets approve loans against a stressed rate, not the headline rate. The stress add (default +2 pts) shows what your monthly payment would be if rates moved against you.",
        "Effective LTV must stay within the country's typical maximum, especially for non-residents. If the calculator warns you, expect either a larger deposit requirement or a specialist (more expensive) lender.",
        "Cash needed at completion is the total upfront cost — deposit + transfer tax / stamp duty + notary / legal / agent fees. In most European countries, transaction costs add 7–15% on top of the deposit.",
      ]}
      doesNotInclude="Lender-specific stress test thresholds, early-redemption charges, mortgage life insurance, currency-conversion costs, recurring property taxes (council tax, ENFIA, IBI, IMI, taxe foncière, etc.), and first-time-buyer schemes. The reversion-rate calculation uses a flat rate for years 3+; in practice you would typically remortgage before then to avoid the SVR. Country rules are simplifications — confirm with a local broker or notary before committing."
    >
      <MortgageCalculator />
    </CalculatorShell>
  );
}
