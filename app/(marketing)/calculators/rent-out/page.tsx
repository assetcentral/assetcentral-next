import type { Metadata } from "next";
import { CalculatorShell } from "@/components/marketing/CalculatorShell";
import { RentOutCalculator } from "@/components/calculators/RentOutCalculator";

export const metadata: Metadata = {
  title: "Rent-Out Cost Calculator",
  description:
    "Free rent-out checker. Find the rent you need to cover mortgage, service charge, maintenance and management — and the rent you need to hit your target margin.",
  alternates: { canonical: "/calculators/rent-out" },
};

export default function Page() {
  return (
    <CalculatorShell
      slug="rent-out"
      title="Rent-Out Checker"
      subtitle="What rent do you actually need to charge? Solves for the rent that covers every monthly cost, plus the rent that hits your target margin after maintenance, management and vacancy."
      interpret={[
        "Break-even rent is the floor. Below this, you're funding the property out of pocket every month.",
        "Target rent backs out the rent needed to hit the margin you set after all variable costs. Use it to sanity-check what an agent is quoting.",
        "Maintenance % is per-rent rather than absolute because it tracks rent over time. 10% is a reasonable default for a long-let in good condition.",
        "Vacancy of 0.5 months/year is typical for well-priced long lets. Mis-priced or sticky markets often run 1–2 months.",
      ]}
      doesNotInclude="Income tax, ground rent, agent setup fees, void marketing cost, condition-based capex. Pro adds tax-adjusted analysis and operator benchmarking."
    >
      <RentOutCalculator />
    </CalculatorShell>
  );
}
