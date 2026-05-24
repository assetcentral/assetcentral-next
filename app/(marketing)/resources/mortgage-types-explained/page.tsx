import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "mortgage-types-explained";
const TITLE =
  "Mortgage types explained: fixed, variable, fix-then-revert, repayment, interest-only";
const DESCRIPTION =
  "The five mortgage structures private property investors actually need to understand — what each one costs over the life of the loan, who they suit, and where they fail. Includes worked examples.";

export const metadata: Metadata = {
  title: `${TITLE} | AssetCentral`,
  description: DESCRIPTION,
  alternates: { canonical: `/resources/${SLUG}` },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
};

export default function Article() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              slug: SLUG,
              title: TITLE,
              description: DESCRIPTION,
              datePublished: "2026-05-21",
              readMins: 9,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, TITLE)) }}
      />
      <StickyCta message="Model any mortgage structure in 30 seconds. Free calculator." href="/calculators/mortgage" label="Try the calculator" />

      <ArticleLayout
        slug={SLUG}
        title={TITLE}
        description="There are five mortgage structures private property investors actually need to understand. Each one shifts a different risk between you and the lender. This guide is what to choose, when, and why."
        date="21 May 2026"
        readMins={9}
        related={[
          { slug: "mortgage-rules-by-country", title: "Mortgage rules by country: how the UAE, UK, France, Spain, Portugal, Greece, Germany, and Switzerland differ" },
          { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
          { slug: "off-plan-handover-options", title: "Off-plan handover and you can't complete: four options" },
        ]}
      >
        <p>
          A mortgage is a contract that bundles two separate decisions: how you repay
          the principal, and how the interest rate behaves over time. Most landlords
          treat &ldquo;the mortgage&rdquo; as a single product to compare on rate alone,
          which is why so many end up locked into structures that don&rsquo;t suit them.
          This guide separates those two decisions and walks through the five structures
          that cover ~95% of residential property purchases worldwide.
        </p>

        <p>
          We&rsquo;ll cover each structure with: who it suits, who should avoid it, the
          numbers it produces, and the failure modes. Where useful you can run the
          comparison yourself in the{" "}
          <a href="/calculators/mortgage" className="text-[var(--color-accent)] underline">
            mortgage calculator
          </a>{" "}
          — every example below is reproducible there in under a minute.
        </p>

        <H2>The two questions, separated</H2>

        <p>
          <strong>Question 1 — how do you repay the principal?</strong> Two answers in
          practice: capital + interest (&ldquo;repayment&rdquo;) or interest only. With
          a repayment mortgage, every monthly payment includes a sliver of principal so
          that by the end of the term the loan is at zero. With interest-only, you pay
          only the interest each month and still owe the full principal at maturity.
        </p>

        <p>
          <strong>Question 2 — how does the interest rate behave?</strong> Three main
          answers: fixed for the whole term, fixed for an initial period then reverts
          to variable, or variable from day one. There are sub-flavours of each
          (tracker, discount, capped, offset) but those three cover the main shapes.
        </p>

        <p>
          Each combination is a real product. UK buy-to-let mortgages are typically
          &ldquo;interest-only + fix-then-revert.&rdquo; French residential mortgages
          are typically &ldquo;repayment + fixed for the whole term.&rdquo; UAE
          mortgages are typically &ldquo;repayment + variable.&rdquo; The combination
          determines what you owe, when, and what risks you&rsquo;ve absorbed.
        </p>

        <H2>Repayment mortgages: principal is paid down over time</H2>

        <p>
          The default in most of Europe. You pay a fixed monthly amount that covers the
          interest accrued in that month plus a chunk of principal. The split changes
          over time — early payments are nearly all interest; by year 20 of a 25-year
          term, you&rsquo;re paying mostly principal.
        </p>

        <p>
          <strong>Who it suits:</strong> anyone who wants to own the property outright at
          some point. Owner-occupiers, long-hold investors, anyone whose plan requires
          a debt-free asset by retirement or by sale.
        </p>

        <p>
          <strong>Who should think twice:</strong> investors whose strategy depends on
          recycling capital. If you plan to refinance to release equity every 5 years,
          you&rsquo;re paying down principal that you intend to re-borrow — burning
          transaction costs each cycle.
        </p>

        <Callout>
          Worked example. €300k loan, 25 yrs, 4% fixed. Monthly payment €1,584. Total
          interest over the term: €175k. After 5 years you&rsquo;ve repaid €33k of
          principal (~11%). After 15 years you&rsquo;ve repaid €131k (~44%). The
          principal-payment curve accelerates over time — early years feel slow.
        </Callout>

        <H2>Interest-only mortgages: principal stays put</H2>

        <p>
          The default in the UK buy-to-let market and the standard for some commercial
          real estate. You pay only the interest each month; at maturity you owe the
          original principal. Repayment of the principal is your problem to solve at
          the end — typically through sale, refinance, or another source.
        </p>

        <p>
          <strong>Who it suits:</strong> investors planning to sell the asset at maturity
          (banking on capital growth), investors who want maximum monthly cashflow
          today, anyone using leverage to amplify yield-on-equity rather than build
          equity through amortisation.
        </p>

        <p>
          <strong>Who should avoid:</strong> owner-occupiers in most markets — many
          residential regulators have effectively banned interest-only for primary
          homes because of the maturity-cliff risk. Anyone without a credible
          repayment plan at maturity.
        </p>

        <Callout>
          Worked example. £200k loan, 25 yrs, 5% interest-only. Monthly payment £833.
          Same loan as repayment: £1,169 monthly. The interest-only saves £336/month
          (£100,800 over the term) but at maturity you still owe £200k. If the property
          hasn&rsquo;t appreciated, you&rsquo;re back where you started — minus 25 years
          of interest paid.
        </Callout>

        <InlineNewsletter />

        <H2>Fixed-rate mortgages (whole term)</H2>

        <p>
          The interest rate is locked for the entire term. Common in France, Germany
          (via long Zinsbindung periods), the US 30-year FRM, and some Spanish and
          Portuguese products. The lender bears the interest-rate risk; you pay a
          premium for that certainty.
        </p>

        <p>
          <strong>Who it suits:</strong> anyone who values payment predictability over
          potential savings. People who would lose sleep if their mortgage payment
          could rise. Households where mortgage payment certainty is the difference
          between solvency and stress.
        </p>

        <p>
          <strong>Who should think twice:</strong> investors who plan to sell or refinance
          within 5–7 years — long fixes typically carry early-redemption charges
          (sometimes very large, especially in France). The premium for full-term
          certainty is wasted if you exit early.
        </p>

        <H2>Fix-then-revert: the UK default</H2>

        <p>
          The dominant structure in the UK. You agree a low rate for an initial
          fix period — typically 2, 3, 5, or 10 years — after which the loan reverts
          to the lender&rsquo;s Standard Variable Rate (SVR). The SVR is usually 2–4
          percentage points higher than the headline fixed rate.
        </p>

        <p>
          The implicit deal: the bank gives you a teaser rate to win your business,
          knowing that when the fix ends you&rsquo;ll either pay the high SVR or
          remortgage. In practice almost every active landlord remortgages 2–3 months
          before the fix ends, which is why the UK has a thriving mortgage-broker industry.
        </p>

        <p>
          <strong>Who it suits:</strong> investors with a clear remortgage discipline.
          Anyone aware that the headline 2-year rate is a marketing number, not the
          rate you&rsquo;ll actually pay over the loan&rsquo;s life.
        </p>

        <p>
          <strong>Who should avoid:</strong> investors who don&rsquo;t want the hassle of
          remortgaging every few years. The 25-year version costs more upfront but
          removes the cliff. Anyone who&rsquo;ll be unable to remortgage at the cliff
          (changed circumstances, lower income, age) — you&rsquo;ll be stuck on SVR.
        </p>

        <Callout>
          Worked example (UK BTL). £245k loan, 25 yrs, interest-only. 2-yr fix at
          4.5% → £919/mo. Reversion to SVR at 6.5% → £1,327/mo. That&rsquo;s a 44%
          payment jump at the cliff. If you remortgage onto another 2-yr fix at 4.5%,
          you avoid the jump but pay fees and broker time every two years.
        </Callout>

        <H2>Variable, tracker, and SVR — interest-rate exposure from day one</H2>

        <p>
          The interest rate moves with a reference. Three sub-flavours:
        </p>

        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>Tracker</strong> — explicitly tied to a benchmark (Bank of England
            base rate + X bps, Euribor + X bps, EIBOR + X bps in the UAE). Moves
            mechanically when the benchmark moves.
          </li>
          <li>
            <strong>SVR</strong> (Standard Variable Rate) — the lender&rsquo;s discretionary
            rate. They can move it whenever they want, though competition keeps it
            roughly aligned with the market.
          </li>
          <li>
            <strong>Discount</strong> — a temporary discount from SVR (e.g. SVR minus
            1.5% for 3 years). The discount is fixed; the underlying SVR moves.
          </li>
        </ul>

        <p>
          <strong>Who it suits:</strong> investors who can absorb payment movement —
          either through liquid reserves or rental income with a strong buffer.
          Borrowers who expect rates to fall (and who are willing to be wrong about it).
        </p>

        <p>
          <strong>Who should avoid:</strong> anyone who&rsquo;s already at the edge of
          their affordability calculation. If a 2-percentage-point rate rise would make
          you sell at a loss, you should be on a fix.
        </p>

        <Callout>
          Stress test your variable. UK regulators require lenders to approve
          variable-rate mortgages against a stressed rate (often SVR + 1pt). You should
          do the same with your own underwriting. Run the{" "}
          <a href="/calculators/mortgage" className="text-[var(--color-accent)] underline">
            mortgage calculator
          </a>{" "}
          on the &ldquo;Variable&rdquo; structure with a +2pt stress add — if the
          stressed monthly payment doesn&rsquo;t leave at least 20% buffer over your
          income, the variable rate is too risky for you.
        </Callout>

        <H2>Offset mortgages and other niches</H2>

        <p>
          An <strong>offset mortgage</strong> nets your savings against your loan
          balance for interest calculation purposes. £200k loan + £40k in linked
          savings = interest charged on £160k. You forfeit the interest your savings
          could have earned in exchange for a deeper mortgage interest reduction (which
          is usually tax-efficient).
        </p>

        <p>
          Common in the UK with high-income professionals. Common in the Netherlands
          via the historical &ldquo;spaarhypotheek&rdquo; structure (though new ones
          are now rare). Rare elsewhere.
        </p>

        <p>
          <strong>Capped mortgages</strong> are variables with an upper bound — you get
          the upside of falling rates with a ceiling on the downside. The premium is
          usually too high to justify unless you have very specific risk constraints.
        </p>

        <H2>Decision framework: which structure suits which situation</H2>

        <p>
          Real decision-making is multi-axis. Here&rsquo;s the framework I use when
          modelling for clients:
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Hold period.</strong> &lt;3 years: short fix or variable. 3–7 years:
            5-year fix (UK style). &gt;7 years: long fix or full-term fix where available.
          </li>
          <li>
            <strong>Exit plan.</strong> Selling the asset at exit → interest-only is
            often optimal. Holding past mortgage maturity → repayment.
          </li>
          <li>
            <strong>Cashflow margin.</strong> If your rental cover ratio is below 130%
            at current rates, you need a fix. If it&rsquo;s above 180%, you can absorb
            variable-rate movement.
          </li>
          <li>
            <strong>Income stability.</strong> Salaried with stable income → variable is
            survivable. Self-employed, commission-based, retired → fix.
          </li>
          <li>
            <strong>Tax position.</strong> In some jurisdictions (e.g. France
            historical-build, UK personal-name BTL pre-2017) the structure interacts
            with tax efficiency. Worth a specific accountant conversation before
            committing.
          </li>
        </ol>

        <H2>Country-specific defaults — and why</H2>

        <p>
          A quick map of what&rsquo;s normal where:
        </p>

        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>🇬🇧 UK</strong> — BTL: interest-only + 2 or 5-year fix-then-revert.
            Residential: repayment + 2 or 5-year fix-then-revert.
          </li>
          <li>
            <strong>🇫🇷 France</strong> — repayment + long fixed (20–25 years).
            Interest-only banned for most residential purposes.
          </li>
          <li>
            <strong>🇪🇸 Spain</strong> — was Euribor-tracker historically, now competitive
            fixed-rate products dominate. Always repayment.
          </li>
          <li>
            <strong>🇵🇹 Portugal</strong> — mixed: Euribor-linked or short fix (3–10 yrs)
            then revert. Always repayment.
          </li>
          <li>
            <strong>🇩🇪 Germany</strong> — repayment + long Zinsbindung (10–20 yrs) then
            refinance. Negotiated Tilgung (amortisation rate) is separate from the
            interest rate.
          </li>
          <li>
            <strong>🇨🇭 Switzerland</strong> — interest-only allowed up to 66.6% LTV (any
            amount above must amortise). Mix of long fixes and SARON-linked products.
          </li>
          <li>
            <strong>🇦🇪 UAE</strong> — repayment + variable (EIBOR-linked) with an
            initial fix period of 1–5 years. Interest-only available for high-LTV
            commercial / off-plan products only.
          </li>
          <li>
            <strong>🇬🇷 Greece</strong> — repayment + Euribor-tracker or short fix.
            Lending market still recovering from the 2010s crisis — choice is narrower.
          </li>
        </ul>

        <p>
          Full country rules — LTV caps, transfer taxes, typical rates, age limits —
          are in the{" "}
          <a href="/resources/mortgage-rules-by-country" className="text-[var(--color-accent)] underline">
            mortgage rules by country guide
          </a>
          .
        </p>

        <H2>The honest summary</H2>

        <p>
          There is no &ldquo;best&rdquo; mortgage structure. There is only the structure
          that best matches your hold period, exit plan, cashflow margin, income
          stability, and tax position. The cheapest-looking product on a comparison
          site is often the wrong one for you — and the most expensive on paper can
          be the right one if it removes a risk that would otherwise force a sale.
        </p>

        <p>
          Spend 15 minutes modelling 3–4 structures against your numbers. The exercise
          itself usually answers the question.
        </p>

        <CtaBox
          href="/calculators/mortgage"
          label="Use the mortgage calculator"
          blurb="All five structures, eight countries' rules, and an automatic payment-shock warning if your fix-then-revert jumps more than 25% at reversion."
        />

        <InlineNewsletter />
      </ArticleLayout>
    </>
  );
}
