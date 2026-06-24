import type { Metadata } from "next";
import { CalculatorShell } from "@/components/marketing/CalculatorShell";
import { SellOrHoldCalculator } from "@/components/calculators/SellOrHoldCalculator";

export const metadata: Metadata = {
  title: "Sell or Hold Property Calculator",
  description:
    "Free sell-or-hold checker. Compare the wealth you'd have at the end of your horizon if you keep the property versus sell now and reinvest the equity.",
  alternates: { canonical: "/calculators/sell-or-hold" },
};

export default function Page() {
  return (
    <CalculatorShell
      slug="sell-or-hold"
      title="Sell or Hold Checker"
      subtitle="Should you keep this property or sell? Compares ending wealth from holding (equity at horizon + cash flow over the period) against selling now and reinvesting the equity at your alternative return."
      interpret={[
        "Hold advantage in your favour means keeping the property beats selling and reinvesting. Negative means the freed-up equity earns more elsewhere.",
        "Within 5% either way is borderline — model uncertainty alone covers that range, so treat it as a coin toss.",
        "Cash-on-equity is the income return on the equity stuck in the property. A useful sanity check against alternative income-producing investments.",
        "Capital growth assumption is the single most-leveraged input. Stress-test it both ways before betting on the outcome.",
      ]}
      doesNotInclude="Capital gains tax on disposal, refinance options that would change the equity equation, transaction-cost variation by country. Pro adds tax-adjusted scenarios."
    >
      <SellOrHoldCalculator />
    </CalculatorShell>
  );
}
