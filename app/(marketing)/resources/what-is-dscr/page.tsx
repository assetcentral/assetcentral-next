import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "what-is-dscr";
const PAGE_TITLE = "What is DSCR? Debt service coverage ratio for property investors";
const SEO_TITLE = "What is DSCR?";
const DESCRIPTION =
  "DSCR is the single number lenders care most about. The formula, the numbers UK and UAE lenders actually require, three worked examples, and the four ways to fix a property that falls short.";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `/resources/${SLUG}` },
  openGraph: { title: PAGE_TITLE, description: DESCRIPTION, type: "article" },
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
              title: PAGE_TITLE,
              description: DESCRIPTION,
              datePublished: "2026-06-27",
              readMins: 6,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, PAGE_TITLE)) }}
      />
      <StickyCta message="Check your DSCR against lender thresholds — free." />
      <ArticleLayout
        slug={SLUG}
        title={PAGE_TITLE}
        description="DSCR is the single number lenders care most about. The formula, the numbers lenders actually require, three worked examples, and four ways to fix a property that falls short."
        date="27 June 2026"
        readMins={6}
        related={[
          { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
          { slug: "mortgage-types-explained", title: "Mortgage types explained: fixed, variable, fix-then-revert, repayment, interest-only" },
          { slug: "mortgage-rules-by-country", title: "Mortgage rules by country" },
          { slug: "should-i-sell-or-hold-my-buy-to-let", title: "Should I sell or hold my buy to let?" },
        ]}
      >
        <p>
          DSCR &mdash; debt service coverage ratio &mdash; is the single number a buy-to-let lender cares most about. It's the ratio of a property's net operating income to its annual debt service (interest plus, in repayment mortgages, principal). At its core it answers one question: does the property generate enough cash to cover its loan payments, with margin to spare?
        </p>
        <p>
          A DSCR of 1.0 means the property earns exactly what it owes. 1.25 means it earns 25% more than it owes. 0.8 means it falls short by 20% and the owner is topping up from their own pocket every month. Lenders won't approve a mortgage that produces a DSCR much below 1.25, and they'll re-test the ratio at a stressed rate that's usually 2&ndash;3 percentage points above today's product. Get the maths wrong and the deal doesn't close.
        </p>

        <H2>The formula</H2>
        <Callout>
          <strong>DSCR = Net Operating Income &divide; Annual Debt Service</strong><br /><br />
          Net operating income = annual rent &minus; vacancy &minus; management fees &minus; service charge &minus; repairs &minus; insurance<br />
          (notably: does NOT subtract mortgage interest, depreciation or tax)<br /><br />
          Annual debt service = annual mortgage interest (for interest-only)<br />
          or = annual mortgage principal + interest (for repayment)
        </Callout>
        <p>
          The exclusion of mortgage interest from net operating income is the trip-wire that catches most first-time property buyers. NOI is what the asset earns from operations, before the question of how it's financed. Debt service is the financing cost. You're comparing the two to see whether the asset can pay for the debt.
        </p>

        <H2>What DSCR lenders actually require</H2>
        <p>
          Thresholds vary by country, lender, and loan type. The numbers below are typical for buy-to-let lending in 2026.
        </p>
        <p>
          <strong>UK BTL (interest-only, typical).</strong> 125% &ndash; 145% at a stressed rate of pay-rate + 2% (limited company structures often go to 125% at +1%, individual borrowers to 145% at +2%). Higher-rate taxpayers face stricter tests because the lender adjusts for Section 24's impact on after-tax cash flow.
        </p>
        <p>
          <strong>UK BTL (repayment).</strong> 125% &ndash; 130% at the pay rate, no stress (because principal payments build equity). Rarely used for pure investment because cash flow is much weaker.
        </p>
        <p>
          <strong>UAE residential mortgage (expat).</strong> Banks rarely use the DSCR label directly &mdash; they apply a debt burden ratio capped at 50% of declared income across all debt. But effectively they're asking the same question. For a non-resident landlord financing an investment property, expect 60&ndash;65% LTV maximum and lender appetite proportional to your declared rental income (the bank wants to see it's adequate, before factoring in your salary).
        </p>
        <p>
          <strong>US DSCR loan (no-doc).</strong> 1.20 minimum at pay rate, 1.10 acceptable for strong borrowers. Stress test less common because the loan is property-only (no personal income verification). LTV usually 75&ndash;80%.
        </p>

        <H2>Three worked examples</H2>
        <p>
          <strong>Example 1: London flat, healthy DSCR.</strong> A 2-bed in Camden bought for &pound;550,000 with 65% LTV mortgage at 4.8% interest-only. Rent &pound;2,400/month. Service charge &pound;3,200/yr. Repairs &amp; management 12% of rent.
        </p>
        <Callout>
          NOI: &pound;28,800 (rent) &minus; &pound;2,016 (5% vacancy) &minus; &pound;3,456 (management) &minus; &pound;3,200 (service charge) &minus; &pound;1,500 (repairs) = <strong>&pound;18,628</strong><br />
          Annual debt service: &pound;357,500 &times; 4.8% = <strong>&pound;17,160</strong><br />
          DSCR: 18,628 / 17,160 = <strong>1.09</strong>
        </Callout>
        <p>
          At pay rate this just covers debt, but it fails almost every lender's threshold. The owner is essentially break-even on operations. At a stressed rate of 6.8%, DSCR drops to 0.77 &mdash; the property loses money on a stress basis. A 2026 refinance would likely require a significant capital injection or a yield improvement plan.
        </p>
        <p>
          <strong>Example 2: Manchester semi, comfortable DSCR.</strong> A 4-bed in Whalley Range bought for &pound;310,000 with 70% LTV at 5.1% interest-only. Rent &pound;1,950/month. No service charge (freehold). Repairs/management 11%.
        </p>
        <Callout>
          NOI: &pound;23,400 &minus; &pound;1,170 (5% vacancy) &minus; &pound;2,574 (management) &minus; &pound;2,800 (repairs/insurance) = <strong>&pound;16,856</strong><br />
          Annual debt service: &pound;217,000 &times; 5.1% = <strong>&pound;11,067</strong><br />
          DSCR: 16,856 / 11,067 = <strong>1.52</strong>
        </Callout>
        <p>
          Comfortable on pay rate. At stress (+2%): DSCR drops to 1.08 &mdash; tight but passable for a 125% threshold limited-company lender. This is what a healthy UK BTL looks like in 2026.
        </p>
        <p>
          <strong>Example 3: Dubai apartment, strong DSCR.</strong> A 2-bed in JLT bought for AED 1.5m with 70% LTV at 5.2% interest-only. Rent AED 110,000/yr. Service charge AED 18,000. Management 8%.
        </p>
        <Callout>
          NOI: AED 110,000 &minus; AED 5,500 (5% vacancy) &minus; AED 8,360 (management) &minus; AED 18,000 (service) &minus; AED 3,000 (repairs) = <strong>AED 75,140</strong><br />
          Annual debt service: AED 1,050,000 &times; 5.2% = <strong>AED 54,600</strong><br />
          DSCR: 75,140 / 54,600 = <strong>1.38</strong>
        </Callout>
        <p>
          Solid. UAE banks typically don't require DSCR explicitly but this number tells you the property would pass a 1.25 threshold with room. Worth knowing because re-financing into a sterling product later would expose this asset to UK-style stress testing.
        </p>

        <H2>Four ways to fix a property that falls short</H2>
        <p>
          If your DSCR is below 1.25, you have four levers. They're in order of typical impact.
        </p>
        <p>
          <strong>1. Reduce the loan.</strong> Smaller mortgage means smaller debt service means higher DSCR. A &pound;30,000 capital reduction on a 5% mortgage cuts annual interest by &pound;1,500, which can move DSCR from 1.10 to 1.25 on a typical mid-market BTL. Owners often have this cash earning 4&ndash;5% in a savings account; using it for a capital reduction can be the highest-leverage move available.
        </p>
        <p>
          <strong>2. Raise the rent.</strong> Most underperforming BTLs are 8&ndash;15% below market rent because they've not had a review in years. A &pound;200/month rent increase on the London flat above lifts NOI by &pound;2,400 and pushes DSCR from 1.09 to 1.23 &mdash; same property, no capital deployed. Run a market-rent check before assuming the rent is fixed.
        </p>
        <p>
          <strong>3. Reduce management costs.</strong> Self-managing instead of using an agent saves 8&ndash;12% of rent. For a property generating &pound;25k/yr, that's &pound;2,000&ndash;3,000 straight to NOI. The trade-off is time and risk of poor tenant selection; worth doing only if you have local knowledge.
        </p>
        <p>
          <strong>4. Switch to a longer mortgage term or interest-only.</strong> If you're on a repayment mortgage and DSCR fails, switching to interest-only cuts the debt service by the principal portion. Available on most UK BTL products, mainstream on US DSCR loans. Reduces equity build-up but solves the cash-coverage problem.
        </p>

        <CtaBox
          href="/calculators/mortgage"
          label="Run a DSCR check"
          blurb="Calculate your DSCR against typical lender thresholds — UK, UAE, US, Ireland — and see the four fixes ranked by impact. Free. No card required."
        />
      </ArticleLayout>
    </>
  );
}
