import type { Metadata } from "next";
import { CalculatorShell } from "@/components/marketing/CalculatorShell";
import { IRRCalculator } from "@/components/calculators/IRRCalculator";

export const metadata: Metadata = {
  title: "Property IRR Calculator",
  // ~155 chars.
  description:
    "Free IRR calculator for property investors. Model gross yield, net yield, cash-on-cash and IRR — including mortgage amortisation and exit proceeds.",
  alternates: { canonical: "/calculators/irr" },
};

export default function Page() {
  return (
    <CalculatorShell
      slug="irr"
      title="IRR Calculator for Property Investors"
      subtitle="Model the full return on a single property purchase — gross yield, cash-on-cash, and IRR over your hold period, including mortgage amortisation and exit proceeds."
      interpret={[
        "IRR is the annualised return on the cash you actually put in. Above 10% is strong for residential; below 4% suggests the leverage isn't helping you.",
        "Gross yield ignores costs and mortgage — useful as a screening number, not a decision number.",
        "Cash-on-cash in year 1 shows whether the property pays its own way before exit gains.",
        "Capital growth assumption matters more than rent growth — a 1% shift compounds significantly over a 10-year hold.",
      ]}
      doesNotInclude="Taxes (income, capital gains, stamp duty) and country-specific deductions vary too much for a general calculator. For tax-aware after-tax IRR by jurisdiction, see AssetCentral's portfolio workspace."
    >
      <IRRCalculator />
    </CalculatorShell>
  );
}
