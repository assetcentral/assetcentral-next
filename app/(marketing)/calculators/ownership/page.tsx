import type { Metadata } from "next";
import { CalculatorShell } from "@/components/marketing/CalculatorShell";
import { OwnershipCalculator } from "@/components/calculators/OwnershipCalculator";

export const metadata: Metadata = {
  title: "Mortgage vs Outright Ownership Calculator",
  // ~140 chars.
  description:
    "Compare outright and mortgaged ownership of the same property. Side-by-side IRR, cash-on-cash, year-1 cashflow and exit proceeds.",
  alternates: { canonical: "/calculators/ownership" },
};

export default function Page() {
  return (
    <CalculatorShell
      slug="ownership"
      title="Outright vs Mortgaged Ownership Comparator"
      subtitle="Same property, two financing structures. Compare IRR, year-1 cashflow, and exit proceeds — to see whether leverage is helping you or just amplifying your bet."
      interpret={[
        "Scenario A defaults to outright (0% LTV). Scenario B defaults to 65% LTV. Move either to model the structure you're considering.",
        "Higher LTV usually produces higher IRR — but only if capital growth is positive and the property covers its mortgage. If either fails, leverage works against you.",
        "Compare year-1 cashflow as well as IRR. An IRR built on exit gain is more fragile than one paid in annual rent.",
        "Same operating costs and rent growth apply to both scenarios — the difference is purely the financing.",
      ]}
      doesNotInclude="Stamp duty, transaction fees, mortgage arrangement fees, and any prepayment penalties on early repayment. These vary too much to model generically. For tax-aware after-tax IRR by jurisdiction, see AssetCentral's portfolio workspace."
    >
      <OwnershipCalculator />
    </CalculatorShell>
  );
}
