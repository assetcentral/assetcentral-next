import type { Metadata } from "next";
import { CalculatorShell } from "@/components/marketing/CalculatorShell";
import { STRYieldCalculator } from "@/components/calculators/STRYieldCalculator";

export const metadata: Metadata = {
  title: "Short-Term Rental Yield Calculator | Airbnb vs Long-Let | AssetCentral",
  description:
    "Free short-term rental yield calculator. Compare short-term rental income (after agency commission, cleaning, and fixed costs) against a long-let benchmark for the same property.",
  alternates: { canonical: "/calculators/str-yield" },
};

export default function Page() {
  return (
    <CalculatorShell
      slug="str-yield"
      title="Short-Term Rental Yield Calculator"
      subtitle="Compare a short-term rental against a long-let, after agency commission, cleaning, and fixed costs. Find out whether short-term rental is actually worth the operational overhead."
      interpret={[
        "Short-term rental usually wins on gross revenue. It often loses on net once commission, cleaning, and seasonal voids are honest.",
        "A 25% agency commission is standard in Dubai and parts of southern Europe. Below 18% is rare; above 30% deserves questions.",
        "Cleaning costs scale with stay count, not nights booked. Shorter average stays mean more cleans per night.",
        "If your short-term rental net yield is within 1 percentage point of the long-let, the long-let is almost always the better choice — less risk, less work.",
      ]}
      doesNotInclude="Short-term rental voids vary wildly by location, season, and listing quality. This calculator uses a flat occupancy %. For dynamic occupancy modelling against your listing's actual booking history, see AssetCentral's portfolio workspace."
    >
      <STRYieldCalculator />
    </CalculatorShell>
  );
}
