import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "lift-yield-90-days";
const TITLE = "Lift portfolio yield in 90 days — the four levers";
const DESCRIPTION =
  "Four levers move yield. Most owners pull only one. Here is how to pull all four — cost, rent, use, improvements — in the right order, in 90 days, with worked Dubai numbers.";

export const metadata: Metadata = {
  title: `${TITLE} | AssetCentral`,
  description:
    "The four levers that lift rental yield (cost, rent, use, capex), the order to pull them, and a 90-day sequence with worked examples for a Dubai portfolio.",
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
              datePublished: "2026-05-23",
              readMins: 10,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, TITLE)) }}
      />
      <StickyCta message="Model all four levers on one property in 5 minutes. Free for 14 days." />
      <ArticleLayout
        slug={SLUG}
        title="Lift portfolio yield in 90 days — the four levers"
        description="Four levers move yield. Most owners pull only one. Here is how to pull all four — cost, rent, use, improvements — in the right order, in 90 days, with worked Dubai numbers."
        date="23 May 2026"
        readMins={10}
        related={[
          { slug: "yield-protection", title: "Keep yield from sliding back — the 11 things quietly eroding your portfolio" },
          { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
          { slug: "str-operator-performance-check", title: "Is your short-term rental operator earning their 25%?" },
          { slug: "mortgage-types-explained", title: "Mortgage types explained: fixed, variable, fix-then-revert, repayment, interest-only" },
        ]}
      >
        <p>
          Most owners trying to improve yield reach for one lever. The lender. Or the agent. Or the rent. The result is usually a 30–60 basis point gain in one part of the P&L, while two or three other levers continue to drag the average down. A portfolio yield isn&rsquo;t set by your best move; it&rsquo;s set by the weakest line on the spreadsheet.
        </p>
        <p>
          Four levers actually move rental yield. Pulled one at a time, they each add modestly. Pulled in sequence over 90 days, they routinely add 150–250 basis points to net yield — and the order they&rsquo;re pulled in matters more than how hard you pull on any one of them.
        </p>
        <p>
          The right order goes from lowest-risk to highest-risk: cost first, then rent, then use, then capex. Most owners pull them in reverse, which is why most yield-improvement attempts feel like work for very little reward.
        </p>

        <H2>Lever 1 — Cost (no risk, biggest underweight)</H2>
        <p>
          The first lever to pull is the one nobody likes. It&rsquo;s unglamorous, it doesn&rsquo;t involve any new property, and it requires reading invoices. It is also where most multi-property owners have the largest amount of unclaimed yield sitting in plain sight.
        </p>
        <p>
          The five cost lines to audit, in order of typical opportunity size:
        </p>
        <p>
          <strong>Mortgage rate.</strong> If you&rsquo;re on a standard variable or a reverted rate, this is almost certainly your single largest yield leak. A UK owner paying 7.5% SVR when 4.8% five-year fixed deals are available is losing roughly 270bps of yield on the leveraged portion of the property. The same maths applies in the UAE where EIBOR + 2% spreads have widened since 2024. <a href="/calculators/mortgage" className="underline hover:text-[var(--color-accent)]">Use the mortgage calculator</a> to model the refinance before you call the broker.
        </p>
        <p>
          <strong>Service charge.</strong> Dubai service charges across the major towers rose 4–9% annually between 2023 and 2025. Most owners pay the invoice without comparing to last year. A Marina 2-bed paying AED 28/sqft when the building average is AED 22/sqft is sitting on a recoverable 25–30% saving — usually achievable by formally challenging the OA budget at the next AGM.
        </p>
        <p>
          <strong>Insurance.</strong> Auto-renewal is the enemy of yield. Three-year-old policies are typically 15–30% above market because insurers price loyalty correctly — most customers never shop. Buildings insurance, landlord insurance, and contents on furnished lets should all be re-quoted every 24 months minimum.
        </p>
        <p>
          <strong>Agent fees.</strong> Letting and management fees are negotiable, especially for owners with 3+ properties. The standard 12% management + 8% finder&rsquo;s fee in Dubai often becomes 8% + 5% for portfolio clients who simply ask. Same pattern in the UK where 12% becomes 9% on a multi-property contract.
        </p>
        <p>
          <strong>Tax inefficiency.</strong> SPV ownership, leverage structure, expense classification — these are accountant questions but they often reveal 200–400 EUR per property per year in misclassified or unclaimed expenses. Worth one annual sit-down with someone who handles cross-border property tax.
        </p>
        <Callout>
          Typical Dubai 2-bed paying AED 9,000/mo: a refinanced mortgage, audited service charge, and re-quoted insurance together commonly recover AED 8,000–14,000 per year. On AED 108,000 of gross rent, that&rsquo;s 80–130bps of net yield uplift before touching anything visible to the tenant.
        </Callout>
        <p>
          The whole exercise is one weekend per property. The payback is immediate and compounds for the rest of the hold period.
        </p>

        <H2>Lever 2 — Rent (still low risk, often ignored)</H2>
        <p>
          The second lever is also low-risk, but it requires having a conversation owners avoid. Tenants who&rsquo;ve renewed three times at the same rent are paying 12–18% below market, on average. The reason isn&rsquo;t generosity; it&rsquo;s reluctance to disturb a settled situation.
        </p>
        <p>
          The work is unglamorous but mechanical. For each property:
        </p>
        <p>
          <strong>1. Establish the market rent.</strong> Look up 5–10 comparable lettings in the same building or street, completed (not asking) in the last six months. Property Finder and Bayut both publish historic transacted rents in Dubai; the DLD rental index is the formal benchmark. The UK uses Zoopla and Rightmove sold/let data. The number you want is the median rent for the comp set — not the asking-price ceiling.
        </p>
        <p>
          <strong>2. Compare to your current rent.</strong> If the gap is below 5%, leave it. If between 5–15%, schedule a renewal conversation 60 days before lease end. Above 15%, you almost certainly have grounds for a meaningful uplift even respecting any rent-cap legislation (Dubai RERA caps escalation but tracks market; UK Section 13 notices allow market alignment with proper notice).
        </p>
        <p>
          <strong>3. Time the conversation.</strong> The worst time to raise rent is mid-tenancy. The best time is the renewal moment, framed as &ldquo;tracking the building average&rdquo; rather than &ldquo;asking for more&rdquo;. Carrying the market data into that conversation transforms it from a confrontation to a calibration.
        </p>
        <p>
          A 12% rent uplift on a Dubai 2-bed at AED 110,000 is AED 13,200 of additional annual revenue. On a property valued at AED 1.6m, that&rsquo;s 82bps of gross yield, with effectively zero cost to capture.
        </p>

        <H2>Lever 3 — Use (medium risk, biggest swings)</H2>
        <p>
          The third lever changes the property&rsquo;s use case. Long-term let to short-term let. Short-term let to mid-stay corporate. Empty pied-à-terre to seasonal Airbnb. The returns can be dramatic; so can the operational complexity and downside risk.
        </p>
        <p>
          A Dubai Marina 1-bed renting at AED 80,000 long-term can typically gross AED 120,000–160,000 on short-stay. After 25% operator fees, cleaning, platform commissions, and a realistic 70% occupancy assumption, net is usually AED 75,000–95,000 — frequently lower than the simple long-term number. Whether this lever is worth pulling depends entirely on three variables.
        </p>
        <p>
          <strong>1. Realistic occupancy.</strong> Operators quote 85–90%. Properties in their first year average 60–70%. Mature listings in prime locations sustain 75–80%. The difference between 65% and 85% is the difference between this lever lifting yield and torching it.
        </p>
        <p>
          <strong>2. Operator quality.</strong> A bad short-term rental operator destroys properties — physically and financially. The right operator question isn&rsquo;t &ldquo;what occupancy will you achieve?&rdquo; but &ldquo;what was your portfolio-average occupancy over the last 12 months, audited?&rdquo; <a href="/resources/str-operator-performance-check" className="underline hover:text-[var(--color-accent)]">See our short-term rental operator performance checklist</a> for the six questions to ask.
        </p>
        <p>
          <strong>3. Regulation.</strong> DTCM licensing tightened in 2024 and continues evolving. UK local-authority short-stay caps are spreading. Spanish municipalities can ban short-term rentals entirely. Pulling this lever requires assessing whether the regulation is stable for the duration of your hold.
        </p>
        <p>
          Run the numbers properly before switching, using both your long-term baseline and a stress-tested short-term rental scenario. <a href="/calculators/str-yield" className="underline hover:text-[var(--color-accent)]">The short-term rental yield calculator</a> models both side-by-side with the right cost assumptions baked in.
        </p>
        <Callout>
          Rule of thumb: switching to short-term rental pays off only when the realistic-net-of-everything short-term rental number beats the long-term net by 25% or more. Anything less doesn&rsquo;t compensate for the additional operational risk.
        </Callout>

        <H2>Lever 4 — Improvements (capital risk, longest payback)</H2>
        <p>
          The fourth lever is capital expenditure: refurbishments, conversions, EPC upgrades. Pulled correctly, it justifies a step-change in rent. Pulled incorrectly, it ties up cash for 5–10 years of payback.
        </p>
        <p>
          The discipline here is brutal. A capex decision is a separate investment, not a maintenance decision. Each project needs to clear an IRR hurdle on its own — typically 15%+ net of tax, given the illiquidity. The question isn&rsquo;t &ldquo;will this improvement increase rent?&rdquo; (almost always yes). The question is &ldquo;will it increase rent by enough to pay back inside the relevant hold period?&rdquo;
        </p>
        <p>
          The four highest-IRR capex categories for owners, in approximate order:
        </p>
        <p>
          <strong>1. EPC / efficiency upgrades.</strong> Often the highest-IRR work in 2026 because the regulatory backstop (UK MEES, French passoires thermiques rules) means the property becomes unlettable without it. The IRR includes the avoided cost of having no rental income at all, which is rarely modelled but always real.
        </p>
        <p>
          <strong>2. Kitchen and bathroom refits.</strong> Standard 5–10% rent uplift in middle-market properties; 15–25% in prime. Three-year payback is achievable on most well-priced refurbs of dated mid-market apartments.
        </p>
        <p>
          <strong>3. Layout reconfigurations.</strong> Adding a small second bedroom to a 1-bed (creative use of unused dining space) can raise rent by 25–35% in family-letting markets. Highest-IRR move when the layout permits it.
        </p>
        <p>
          <strong>4. Furnishings upgrade for short-term rental.</strong> Where you&rsquo;ve already decided to pull Lever 3, professional staging and high-end furnishings can lift ADR by 30–50%. Payback is typically 18 months on a well-located short-stay unit.
        </p>
        <p>
          <a href="/calculators/retrofit" className="underline hover:text-[var(--color-accent)]">Use the retrofit calculator</a> to model each project against payback period and IRR before committing capital.
        </p>

        <H2>The 90-day sequence</H2>
        <p>
          The discipline is to pull these levers in the right order, not all at once. Doing them sequentially lets you measure the effect of each before committing to the next. It also keeps the operational risk low — if Lever 1 alone solves your yield problem, you don&rsquo;t need to take on the risk of Levers 3 or 4.
        </p>
        <Callout>
          <strong>Days 1–30: Lever 1 (Cost)</strong> — refinance mortgages, challenge service charges, re-quote insurance, renegotiate agent fees.<br />
          <strong>Days 30–60: Lever 2 (Rent)</strong> — pull comparable market data, schedule renewal conversations, prepare data-led rent reviews.<br />
          <strong>Days 60–90: Lever 3 (Use)</strong> — for any property where Levers 1+2 didn&rsquo;t reach target, model the short-term rental or mid-stay alternative and decide.<br />
          <strong>Months 3–12: Lever 4 (Improvements)</strong> — for the underperformers that survived the first three levers, scope and commission the capex.
        </Callout>
        <p>
          By the end of the 90 days, most owners discover that the first two levers alone took them past their original yield target — at which point the riskier levers become optional rather than necessary. The portfolios that genuinely needed all four levers were almost always portfolios where the baseline was substantially worse than the owner believed at the start.
        </p>

        <H2>Why most attempts fail</H2>
        <p>
          The single biggest reason yield-improvement programmes stall is that owners try to do them in their head, one property at a time, over many months. The mortgage refinance gets started in March, the agent re-negotiation in July, the rent review in October. Each move happens, but the cumulative effect is invisible because there&rsquo;s no portfolio-level view of the numbers before and after.
        </p>
        <p>
          The defensible approach is to record the baseline yield for each property before any lever is pulled, run all four levers through the sequence above on a 90-day calendar, and re-measure at day 91. Anything else turns into vague satisfaction that &ldquo;things are better&rdquo; without a number attached.
        </p>

        <CtaBox
          href="https://app.assetcentral.ai/signup?plan=pro_monthly&intent=direct"
          label="Subscribe now"
          blurb="AssetCentral records your baseline yield property-by-property, runs each lever through the calculators above, and tracks the day-91 outcome. Free for 14 days, no credit card needed."
        />

        <InlineNewsletter />
      </ArticleLayout>
    </>
  );
}
