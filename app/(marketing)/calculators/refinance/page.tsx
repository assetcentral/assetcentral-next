import type { Metadata } from "next";
import { CalculatorShell } from "@/components/marketing/CalculatorShell";
import { RefinanceCalculator } from "@/components/calculators/RefinanceCalculator";

export const metadata: Metadata = {
  title: "Mortgage Refinance Calculator",
  description:
    "Free refinance checker. Compare your current loan against a new offer — monthly saving, payback period for fees, net saving over 5 and 10 years.",
  alternates: { canonical: "/calculators/refinance" },
};

export default function Page() {
  return (
    <CalculatorShell
      slug="refinance"
      title="Refinance Checker"
      subtitle="Would a new mortgage improve your return? Compares your current payment against a refinance proposal, then nets off the arrangement fee, exit fee and any term change."
      interpret={[
        "Worth-it: arrangement + exit fees pay back in under 2 years AND the 5-year net is positive.",
        "Borderline: fees pay back inside 5 years and the 10-year picture is still positive — useful if you're certain you'll hold that long.",
        "Skip: fees out-run the saving over a 10-year horizon, or the new term extends so far that you pay more total interest despite the lower rate.",
        "Term extension is a hidden trap. Lower monthly payment + longer term often means more total interest, even at a lower rate.",
      ]}
      doesNotInclude="Valuation fee, legal fee, broker fee, early-repayment-charge variation by lender, rate-shock on the new product. Pro adds rate-shock scenarios + multi-product comparison."
    >
      <RefinanceCalculator />
    </CalculatorShell>
  );
}
