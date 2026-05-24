import type { Metadata } from "next";
import { CalculatorShell } from "@/components/marketing/CalculatorShell";
import { RetrofitCalculator } from "@/components/calculators/RetrofitCalculator";

export const metadata: Metadata = {
  title: "Property Retrofit Cost Calculator | Upgrade ROI | AssetCentral",
  description:
    "Free retrofit ROI calculator. Compare upgrade costs against rent uplift, valuation uplift, and your discount rate. Includes void cost during refurbishment.",
  alternates: { canonical: "/calculators/retrofit" },
};

export default function Page() {
  return (
    <CalculatorShell
      slug="retrofit"
      title="Retrofit Cost Calculator"
      subtitle="Estimate whether an upgrade is worth it. Compares all-in cost against rent uplift, valuation uplift at sale, and void during refurbishment — discounted to today."
      interpret={[
        "Positive NPV means the project beats your hurdle rate. Negative NPV means your capital does better elsewhere.",
        "Payback under 5 years is generally considered strong for residential. 5–8 years is reasonable. Over 10 years, look hard.",
        "Annual yield on cost is the rent uplift expressed as a return on the money you spent. Compare it to your alternative uses of capital.",
        "Void cost during refurb is the single most-underestimated input. Two extra months of void can flip a project from positive to negative NPV.",
      ]}
      doesNotInclude="Tax-deductible status of the upgrade (varies by country), insurance/inspection changes, and any rebates or grants. Worth checking with your accountant for your specific situation."
    >
      <RetrofitCalculator />
    </CalculatorShell>
  );
}
