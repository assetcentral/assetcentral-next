import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "off-plan-handover-options";
const TITLE = "Off-plan handover and you can't complete: four options";
const DESCRIPTION =
  "Stage payment is due. The cash isn't there. Here are the four realistic moves — completion finance, refinance, secondary-market sale, developer negotiation — and how to model each.";

export const metadata: Metadata = {
  title: `${TITLE} | AssetCentral`,
  description:
    "What to do when your off-plan property is approaching handover and you're not sure you can complete. Four options — completion finance, refinance, secondary-market sale, developer negotiation — plus how the rolling-return calculator quantifies the choice.",
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
              datePublished: "2026-05-19",
              readMins: 8,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, TITLE)) }}
      />
      <StickyCta message="Model all four options in AssetCentral. Free for 14 days." />
    <ArticleLayout
      slug={SLUG}
      title="Off-plan handover and you can't complete: four options"
      description="Stage payment is due. The cash isn't there. Here are the four realistic moves — completion finance, refinance, secondary-market sale, developer negotiation — and how to model each."
      date="19 May 2026"
      readMins={8}
      related={[
        { slug: "mortgage-types-explained", title: "Mortgage types explained: fixed, variable, fix-then-revert, repayment, interest-only" },
        { slug: "mortgage-rules-by-country", title: "Mortgage rules by country: how the UAE, UK, France, Spain, Portugal, Greece, Germany, and Switzerland differ" },
        { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
        { slug: "str-operator-performance-check", title: "Is your STR operator earning their 25%?" },
      ]}
    >
      <p>
        This article is for a specific problem. You bought one or more off-plan apartments — probably in Dubai, possibly in Lisbon or Athens — and the handover dates are 6 to 12 months away. The final stage payment is large, often 60–70% of the purchase price. You assumed you would either find the cash, sell the unit pre-handover, or finance it. Now the market has moved, the cash flow you assumed has not arrived, and the developer&rsquo;s NOC desk is sending escalation reminders.
      </p>
      <p>
        This is more common than the market admits. It is also entirely manageable, but only if you start working on it 6 months before handover, not 6 weeks. Here are the four options, what each one requires, and when each is the right move.
      </p>

      <Callout>
        If you want to skip ahead and put numbers on the comparison, the <a href="/calculators/off-plan" className="underline">off-plan rolling-return calculator</a> models the sell-now-vs-hold decision directly: walk-away cash gain or loss under both paths, three scenarios for what happens if the market goes flat or corrects 10%, and the handover value the market needs to deliver for holding to break even. The four options below tell you what your moves are; the calculator tells you which one your numbers actually support.
      </Callout>

      <H2>Option 1: Complete with your own funds</H2>
      <p>
        The simplest path. You release cash from elsewhere — savings, sale of liquid assets, a loan against another property — and you complete on schedule.
      </p>
      <p>
        When this works: the property has positive cash flow after completion, you have non-property capital that is currently earning less than the cost of completing, and you would buy this property today at the contract price if it were on the market.
      </p>
      <p>
        When it doesn&rsquo;t: you would have to liquidate something productive to do it. Selling shares that are doing 8% to complete a property that will yield 4% net is a losing trade even if you can afford it.
      </p>

      <H2>Option 2: Refinance — secure handover finance</H2>
      <p>
        Banks in Dubai, Portugal, and Greece all offer mortgage products for off-plan handover. You arrange the loan before handover, the bank pays the developer the final stage payment, and you start paying a mortgage.
      </p>
      <p>
        This takes longer than people expect. A handover-finance application typically takes 8–12 weeks from first conversation to drawdown. The bank will need:
      </p>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>The signed Sale and Purchase Agreement and proof of all stage payments paid to date</li>
        <li>A valuation done by a panel valuer (paid by you, AED 3,500–5,000 in Dubai)</li>
        <li>3–6 months of bank statements, employment proof, and a global asset declaration</li>
        <li>A No Objection Certificate from the developer, issued only when stage payments are current</li>
      </ul>
      <p>
        The valuation is the variable. Off-plan units in cooling markets sometimes value below contract price, in which case the bank lends only against the lower of the two — and you have to find the difference in cash anyway. Worth getting a non-binding desktop valuation from a panel valuer 4 months out so you know what you are dealing with.
      </p>
      <Callout>
        Practical note: in Dubai, mortgage rates for handover finance are typically 30–60 basis points higher than rates on completed properties. Build that into your cashflow projection. A 4.4% rate on a completed unit may be 4.9% for handover finance.
      </Callout>

      <InlineNewsletter />

      <H2>Option 3: Sell on the secondary market pre-handover</H2>
      <p>
        You assign your contract to another buyer before handover. They take over the remaining payments and the unit. You receive whatever premium the market is paying — or absorb whatever discount.
      </p>
      <p>
        This is the move when you genuinely cannot complete and cannot refinance. The trade is liquidity for value. In a strong market, off-plan values often exceed contract price near handover; in a weak market, they can be 10–20% below. Either way, you exit cleanly.
      </p>
      <p>
        The mechanical steps in Dubai: list with an agent specialising in off-plan resales, get developer NOC, transfer at the Dubai Land Department. Allow 8–12 weeks from listing to transfer. Agency fees on the seller side are typically 2% of sale price.
      </p>
      <p>
        Worth tracking weekly: comparable unit sales in your specific tower or development. The value acceleration curve near handover is real but it is not linear. Most appreciation happens in the final 90 days. Selling 6 months out often gets you a worse price than waiting; selling 60 days out usually maximises value but compresses the timeline.
      </p>

      <H2>Option 4: Negotiate with the developer</H2>
      <p>
        Less attractive but always available. Developers prefer late completion to defaulted contracts — the latter trigger marketing problems for the rest of the tower. In a soft market, many developers will extend the final stage payment by 6–12 months, sometimes with a small penalty (typically 1–2%), or restructure the payment schedule entirely.
      </p>
      <p>
        This is a phone call, not a form. Ask for the in-house finance team or the senior sales manager who handled the original sale. Lead with: &ldquo;I want to complete on this unit, but the timing of the final payment is difficult given current market conditions. What options do you have?&rdquo; Most developers will offer something. Some will not.
      </p>
      <p>
        Get any agreement in writing on developer letterhead. A verbal commitment from a sales manager who leaves the company in three months is worth nothing.
      </p>

      <H2>Modelling the choice with the rolling-return calculator</H2>
      <p>
        The four options above are the strategic moves. The decision between them — most often Option 1 (or Option 2, which is just Option 1 with the bank&rsquo;s cash) versus Option 3 — comes down to numbers: how much cash you actually walk away with under each path, and how sensitive that number is to the market between now and handover.
      </p>
      <p>
        The <a href="/calculators/off-plan" className="underline">off-plan rolling-return calculator</a> takes the unit, the payment plan, today&rsquo;s observed market value, and your growth assumptions, and surfaces three things side-by-side for the sell-vs-hold decision:
      </p>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>
          <strong>Walk-away cash gain or loss if you sell today.</strong> Full market value, minus exit friction (typically 4% in Dubai), minus what you still owe the developer, minus the cash you&rsquo;ve already put in. The number you would actually realise from a clean pre-handover assignment.
        </li>
        <li>
          <strong>Walk-away cash gain or loss if you hold to handover.</strong> Projected handover value, minus exit friction, minus the cash you&rsquo;ll have put in by then (existing payments plus remaining stage payments).
        </li>
        <li>
          <strong>The delta between them, in plain currency.</strong> &ldquo;Holding gives you X more cash&rdquo; or &ldquo;Selling now gives you X more cash&rdquo; — the one number that answers which option wins under your assumptions.
        </li>
      </ul>
      <p>
        It then stress-tests the hold path against three handover-value scenarios: your stated growth assumption (the optimistic case), a flat market (handover value equal to today&rsquo;s value), and a 10% correction from today. The downside view is the important one. The optimistic case is usually obvious; the question worth answering is whether holding into a flat or correcting market produces a worse loss than crystallising the smaller loss today. Many investors discover their bearish-scenario loss is several times the loss they&rsquo;d take by selling at today&rsquo;s value.
      </p>
      <p>
        The calculator also computes the <em>break-even handover value</em> — the price the market needs to deliver at handover for holding to break even with selling today, after the remaining payments and the cost of money tied up between now and then. If today&rsquo;s value is already at or above break-even under normal growth, holding is the right call on the numbers. If the market would need to rise 30% in 12 months to reach break-even, you have an answer to Option 3 as well.
      </p>
      <Callout>
        The calculator pulls comparable transactions from the Dubai Land Department directly, so the &ldquo;today&rsquo;s market value&rdquo; input — the anchor for the whole comparison — is grounded in real recent sales for your area and bedroom count, not a guess. The same comps are available per-tower and per-subzone, so you can pick the right comparator for the specific unit rather than averaging across an entire neighbourhood.
      </Callout>
      <p>
        For Option 2 (refinance) the calculator helps in a different way: the break-even handover value sets your minimum-acceptable bank valuation. If the panel valuer comes in below it, the refinance is borrowing against a loss; if they come in above, the refinance maths is easy and the conversation with the bank is simpler.
      </p>

      <H2>How to decide</H2>
      <p>
        The right answer depends on three things: the unit&rsquo;s expected value at handover, your alternative uses of capital, and how much time you have. Running the calculator against your unit makes the framework concrete rather than hand-wavy:
      </p>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>
          <strong>Strong market, plenty of time, positive cashflow after completion</strong> — Option 1 if you have liquid cash, Option 2 otherwise. The calculator&rsquo;s hold-to-handover cash gain should be solidly positive even in the flat-market scenario, not just the optimistic one.
        </li>
        <li>
          <strong>Strong market, tight timeline</strong> — Option 2, started 12 weeks before handover. Use the calculator&rsquo;s break-even handover value to set your minimum-acceptable bank valuation; if the market is already above it, the refinance maths is easy.
        </li>
        <li>
          <strong>Soft market, holding looks underwater</strong> — Option 3, accepting that you may exit at a loss to limit further exposure. The calculator&rsquo;s bearish scenario quantifies what you&rsquo;re avoiding by exiting now: if the −10% scenario shows a six-figure loss versus a five-figure loss today, the small-loss-now decision is rational, not defeatist.
        </li>
        <li>
          <strong>Genuinely stuck on timing only</strong> — Option 4 to buy time, then revisit with fresh comps. The calculator&rsquo;s &ldquo;current month&rdquo; field rolls forward as time passes, so re-running it in six weeks against updated DLD comps will tell you whether the wait improved or worsened the picture.
        </li>
      </ul>

      <H2>The one thing that always fails</H2>
      <p>
        Hoping the market recovers in the 60 days before handover. It might. It usually doesn&rsquo;t. The landlords who get into trouble are the ones who waited because they didn&rsquo;t want to crystallise the decision. Run all four options in writing — even if you don&rsquo;t want to. The exercise of writing them down forces clarity.
      </p>

      <CtaBox
        href="/calculators/off-plan"
        label="Open the off-plan calculator"
        blurb="Put real numbers on the decision. The calculator surfaces walk-away cash gain or loss for both paths, three scenarios for what happens if the market goes flat or corrects 10%, the break-even handover value, and live DLD market comps for the input that matters most — today's market value. Free 14-day trial, no card required."
      />

      <InlineNewsletter />
    </ArticleLayout>
    </>
  );
}
