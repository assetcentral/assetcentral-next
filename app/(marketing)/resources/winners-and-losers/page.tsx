import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "winners-and-losers";
const TITLE = "Spot winners, prune losers, buy the next one well";
const DESCRIPTION =
  "A three-factor portfolio ranking framework, the trade-up maths, acquisition screening against your yield baseline, and the sector traps to avoid.";

export const metadata: Metadata = {
  title: TITLE,
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
      <StickyCta message="Rank your portfolio in 5 minutes. See which property is dragging the average. Free for 14 days." />
      <ArticleLayout
        slug={SLUG}
        title="Spot winners, prune losers, buy the next one well"
        description="Every portfolio has a quiet loser. Identifying it changes the conversation from 'should I buy another?' to 'should I sell the bottom one and trade up?' Here is the framework."
        date="23 May 2026"
        readMins={10}
        related={[
          { slug: "portfolio-baseline-audit", title: "Know what you actually own — the portfolio baseline audit" },
          { slug: "lift-yield-90-days", title: "Lift portfolio yield in 90 days — the four levers" },
          { slug: "yield-protection", title: "Keep yield from sliding back — the 11 things quietly eroding your portfolio" },
          { slug: "off-plan-handover-options", title: "Off-plan handover and you can't complete: four options" },
        ]}
      >
        <p>
          The most common question a multi-property owner asks themselves is the wrong one. &ldquo;Should I buy another?&rdquo; assumes the current portfolio is right and the only question is what to add on top. For most portfolios, this is backwards. The right question is &ldquo;which of my existing properties is dragging the average, and what would I replace it with?&rdquo;
        </p>
        <p>
          Every portfolio has a quiet loser. Not a disaster — those get sold quickly. A quiet loser is the property generating perfectly acceptable rent, behind a perfectly acceptable tenant, on a perfectly acceptable lease. It just happens to be doing all of that at 80–150 basis points below the rest of the portfolio. It looks fine on its own. It looks worse when ranked alongside the others. And it&rsquo;s costing the portfolio compounding return for as long as it sits there.
        </p>
        <p>
          The discipline of regularly ranking what you own — and being willing to prune the bottom — is the move that separates good multi-property owners from very good ones. Below is the framework, the trade-up maths, and the acquisition test for any new property you&rsquo;re considering buying next.
        </p>

        <H2>The three-factor ranking</H2>
        <p>
          Rank each property on three axes. Each scored 1 to 5. Total out of 15.
        </p>
        <p>
          <strong>Factor 1: trailing-3-year net yield.</strong> Net yield, average of the last three years, against current value (not purchase price). Score 5 if it&rsquo;s in the top 20% of your portfolio; 1 if bottom 20%.
        </p>
        <p>
          <strong>Factor 2: capital appreciation rate.</strong> Annualised price appreciation since acquisition, against current value. Score 5 if top 20%; 1 if bottom 20%. Properties bought less than 24 months ago need annualisation; properties in declining markets can score 0 or be excluded.
        </p>
        <p>
          <strong>Factor 3: management hours per month.</strong> Realistic hours of your attention this property consumes — tenant issues, maintenance coordination, agent calls, document filing, paperwork. Score 5 if it&rsquo;s the lowest-touch property in your portfolio; 1 if it consumes 8+ hours/month.
        </p>
        <p>
          Sum the three scores. Anything under 9 is a candidate for sale. The first time most owners run this, they discover one property scoring 6 or below — and the conversation about &ldquo;should I buy another?&rdquo; becomes meaningfully different.
        </p>
        <Callout>
          Why three factors and not five? Because the right three are the ones that survive the &ldquo;would you wake up at 3am for this?&rdquo; test. Income, growth, and time. Everything else (location prestige, sentimental value, tax treatment) is a tiebreaker, not a ranking criterion.
        </Callout>

        <H2>The trade-up maths</H2>
        <p>
          Once a bottom-scorer is identified, the question is whether to sell it. The instinct is usually to hold — the property is generating something, transaction costs are real, and finding a replacement is work. The maths often disagrees with the instinct.
        </p>
        <p>
          Worked example. Dubai Marina 2-bed, owned for six years, scored 7 on the ranking. Net yield 3.2%, capital appreciation 2.1% annualised, management hours 6/mo. Equity in the property: AED 1.1m (purchase AED 1.6m, current value AED 1.7m, debt AED 600k).
        </p>
        <p>
          Total return on equity right now: net rent of AED 33k + capital appreciation of AED 36k = AED 69k against AED 1.1m of equity = 6.3% all-in return.
        </p>
        <p>
          Hypothetical replacement. A JVC 2-bed, comparable rent expectations of 6.5% net yield, comparable capital appreciation around 4%, lighter management because newer and single-let. Same AED 1.1m of equity deployed, debt rebuilt at current rates.
        </p>
        <p>
          Total return on equity for the replacement: 6.5% rent yield + 4% appreciation = 10.5% all-in return on AED 1.1m = AED 115k/year.
        </p>
        <p>
          Difference: AED 46k/year of returns the owner is foregoing by holding the Marina property. Over a 7-year remaining hold, that&rsquo;s AED 322k before compounding. Transaction costs to swap: roughly AED 80k (DLD fee, agent fee, legal). The trade pays back in under 2 years.
        </p>
        <Callout>
          The mistake most owners make isn&rsquo;t holding a property too long. It&rsquo;s holding a property that isn&rsquo;t broken but isn&rsquo;t earning either, while writing the deficit off as &ldquo;part of the diversification.&rdquo; Diversification is a benefit; underperformance isn&rsquo;t.
        </Callout>

        <H2>Acquisition screening — the only test that matters</H2>
        <p>
          For any property you&rsquo;re considering buying, the screening question is single and unforgiving: <em>does this property, modelled honestly, lift my portfolio&rsquo;s weighted-average yield, or drag it down?</em>
        </p>
        <p>
          This sounds obvious but it&rsquo;s the test almost no buyer runs. Most acquisition decisions are made on the property in isolation — does it look like a good deal at 6.5% net? — without checking whether 6.5% net is above or below the portfolio average. A 6.5% net property added to a 5.8% portfolio is a winner. The same 6.5% net property added to a 7.2% portfolio is a loser that quietly pulls the average down.
        </p>
        <p>
          The mechanics:
        </p>
        <p>
          <strong>1. Calculate current portfolio weighted-average net yield.</strong> Sum of net rents across all properties, divided by sum of equity invested. This is the number to beat.
        </p>
        <p>
          <strong>2. Model the new property with honest assumptions.</strong> Realistic occupancy (not best-case). Realistic costs (not vendor brochure). Realistic rent (not asking-price comparable). <a href="/calculators/irr" className="underline hover:text-[var(--color-accent)]">The IRR calculator</a> handles the full model including capex and exit value.
        </p>
        <p>
          <strong>3. Compute combined portfolio yield with the new property included.</strong> Does the weighted average go up or down? If down, the property fails the test regardless of how attractive it looks on its own.
        </p>
        <p>
          The screening question creates a forcing function. Mediocre opportunities stop looking attractive when measured against the bar you&rsquo;ve already cleared. Exceptional opportunities (and they exist) jump out clearly.
        </p>

        <H2>Sector-specific traps</H2>
        <p>
          Four categories of property look better at the buy than they turn out to be. Worth knowing the patterns before adding any of them.
        </p>
        <p>
          <strong>Off-plan.</strong> The headline yield assumes the property completes, completes on time, and rents at the marketing-brochure rate. All three frequently fail. Construction delays push the first rent cheque 12–18 months later than modelled. Handover-stage units in markets like Dubai have produced 30% of their original modelled IRR by year 5 because the development glut at completion suppressed initial rents. The acquisition test for off-plan is to model the worst-case scenarios (24-month delay, 20% rent shortfall) and check whether the deal still passes. <a href="/resources/off-plan-handover-options" className="underline hover:text-[var(--color-accent)]">See our off-plan handover guide</a> for the decision tree when stage payments are due.
        </p>
        <p>
          <strong>Holiday lets / short-term rentals.</strong> Operator-dependent, regulation-dependent. The yield numbers from a successful short-term rental are seductive; the failure mode is severe (underperformance, regulatory clampdown, operator going bust). Acquisition test: model the long-term-let scenario as the floor, then add the short-term rental as upside. If the property fails on long-term-let economics, the short-term premium is gambling.
        </p>
        <p>
          <strong>HMOs and selective licensing.</strong> Higher gross yields, materially higher operational complexity, regulatory tightening across most UK markets. The acquisition test is the management-hours-per-month axis on the three-factor ranking. An HMO consuming 12 hours/month is taking 50% more of your attention than three single lets — your effective hourly rate matters.
        </p>
        <p>
          <strong>Commercial conversions and PRS forward funds.</strong> Marketed on developer-supplied yield projections that almost never include real letting costs, real voids, or real letting cycles. Acquisition test: insist on actual tenant-by-tenant numbers from a comparable scheme that&rsquo;s been operating 3+ years. Anything else is buying a forecast, not a property.
        </p>

        <H2>The IRR hurdle</H2>
        <p>
          For every property — existing or proposed — set a personal IRR hurdle. The number depends on what else you could do with the same equity (UAE bank deposits at 4.5%, S&P 500 at 8–10% long-term, your own business at 15–25%). Most multi-property owners we work with set their hurdle between 10% and 15% net of tax for residential property, given the illiquidity and operational drag.
        </p>
        <p>
          Anything below the hurdle is a candidate for sale. Anything above is worth keeping or buying. The hurdle isn&rsquo;t set in stone; it shifts with macroeconomic conditions and personal circumstances. The discipline isn&rsquo;t in setting the perfect number; it&rsquo;s in actually having a number and applying it consistently.
        </p>
        <p>
          <a href="/calculators/irr" className="underline hover:text-[var(--color-accent)]">Run each property through the IRR calculator</a> with its actual numbers. A common surprise: properties owned for 8+ years with limited capital appreciation can be clearing only a 4–6% IRR — well below most owners&rsquo; hurdle — even when the rent cheques arrive reliably every month.
        </p>

        <H2>The annual review that actually moves the portfolio</H2>
        <p>
          Once a year — same week every year, treated like a tax deadline — run the framework end-to-end:
        </p>
        <Callout>
          1. Rank every property on the three-factor scorecard<br />
          2. Identify the lowest scorer<br />
          3. Compute its all-in return on equity<br />
          4. Identify a hypothetical replacement and its all-in return<br />
          5. Decide: hold, fix, or sell-and-trade-up
        </Callout>
        <p>
          The decision is rarely automatic. Selling a property is work, capital gains taxes can be material, and the perfect replacement isn&rsquo;t always available the week you want it. But running the framework changes what gets considered. The conversation shifts from &ldquo;what else should I add?&rdquo; to &ldquo;is what I have still the right composition?&rdquo;
        </p>
        <p>
          Over a 5-to-10-year period, portfolios that get reviewed this way tend to consolidate into fewer, better assets. Three excellent properties usually beat five mediocre ones — less management drag, better yield, lower transaction friction at exit. The portfolios that don&rsquo;t get reviewed tend to accumulate. Properties join the portfolio at acquisition and never leave it, regardless of how the relative numbers shift over time.
        </p>

        <CtaBox
          href="https://app.assetcentral.ai/signup?plan=pro_monthly&intent=direct"
          label="Subscribe now"
          blurb="AssetCentral ranks every property in your portfolio on the three-factor scorecard, models acquisition scenarios against your existing baseline, and tracks each property's IRR against your personal hurdle. Free for 14 days, no credit card needed."
        />

        <InlineNewsletter />
      </ArticleLayout>
    </>
  );
}
