// /check — the B2C free AI property check funnel.
//
// Phase 2 of the "Don't Buy Blind" repositioning. The homepage hero,
// persona router, FreeAIResultSection, FreeVsProSection and FinalCta
// all point here. Standalone page (no navbar collapse / no calculator
// chrome — this is the conversion experience, not a tool page).

import type { Metadata } from "next";
import { PropertyCheckClient } from "./PropertyCheckClient";

const TITLE = "Don't Buy Blind — Free AI Property Check | AssetCentral";
const DESCRIPTION =
  "Run any property through AssetCentral before you commit. Free check covers monthly mortgage, rental yield, cash flow, one red flag and one improvement. 60 seconds. No card.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/check" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
};

export default function CheckPage() {
  return (
    <main className="bg-[color:var(--color-surface)]">
      {/* ── Page header ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-12 lg:pt-16 pb-8">
          <p
            className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)] font-semibold mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            DON&rsquo;T BUY BLIND · FREE AI CHECK
          </p>
          <h1
            className="text-[36px] md:text-[44px] lg:text-[52px] leading-[1.05] text-[color:var(--color-navy)] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Run the numbers before you make the offer.
          </h1>
          <p
            className="mt-4 text-[16px] lg:text-[18px] leading-[1.55] text-[color:var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Enter the property basics. We&rsquo;ll calculate the monthly
            mortgage, the rental yield, the real cash flow, and tell you
            whether it&rsquo;s an attractive deal, borderline, or risky — with
            the single biggest red flag and one thing that would tip it
            positive. 60 seconds. No card.
          </p>
        </div>
      </section>

      {/* ── The flow ────────────────────────────────────────── */}
      <PropertyCheckClient />
    </main>
  );
}
