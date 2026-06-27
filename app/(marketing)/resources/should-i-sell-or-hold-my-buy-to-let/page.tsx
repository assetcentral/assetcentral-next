import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "should-i-sell-or-hold-my-buy-to-let";
const PAGE_TITLE = "Should I sell or hold my buy to let? The framework, with worked examples";
const SEO_TITLE = "Should I sell or hold my buy to let?";
const DESCRIPTION =
  "Sell-or-hold is an NPV comparison, not a gut call. The framework, two worked UK examples (Manchester semi, London flat), and the three questions that actually decide.";

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
              readMins: 8,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, PAGE_TITLE)) }}
      />
      <StickyCta message="Run the sell-vs-hold model on your property — free." />
      <ArticleLayout
        slug={SLUG}
        title={PAGE_TITLE}
        description="Sell-or-hold is an NPV comparison, not a gut feel. Here's the framework, worked through two UK examples, with the three questions that actually decide."
        date="27 June 2026"
        readMins={8}
        related={[
          { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
          { slug: "stamp-duty-second-home", title: "Stamp duty on a second home — what you'll pay in 2026" },
          { slug: "section-24-explained", title: "Section 24 explained: what UK landlords lost and what to do about it" },
          { slug: "dubai-vs-uk-property-investment", title: "Dubai vs UK property investment — real returns compared" },
        ]}
      >
        <p>
          Most landlords ask &ldquo;should I sell or hold?&rdquo; the same way they ask &ldquo;should I sell or hold my pension?&rdquo; &mdash; by feel, with a side of opinion from the last person they spoke to. That's the wrong frame. Sell-or-hold is an NPV comparison: the net present value of every future cash flow you'd get from holding, against the net present value of selling now and putting the equity to work elsewhere. Whichever number is bigger wins. Everything else is preference.
        </p>
        <p>
          The trouble is that &ldquo;every future cash flow&rdquo; is a long list. Rent, mortgage interest, service charge, void costs, repairs, capital growth, and the disposal costs you'd pay at the end of the holding period if you eventually sold anyway. Most owners don't run the maths because the maths is tedious. Then they make a decision that misses the right answer by 20&ndash;40%. Below is the framework, with two worked examples on properties most UK landlords would recognise.
        </p>

        <H2>The framework in one paragraph</H2>
        <p>
          Project the property forward for a fixed holding period (most owners use 5 or 10 years). For each year, calculate the net cash flow after every cost. At the end of the period, add the expected sale proceeds net of CGT and disposal costs. Discount every cash flow back to today's pounds at your alternative rate of return &mdash; the return you'd earn putting the equity somewhere else (typically 4&ndash;7% depending on risk appetite). Sum the discounted flows. That's the NPV of holding.
        </p>
        <p>
          The NPV of selling is simpler: today's net sale proceeds, full stop. There's no future to project because you've taken the money. Compare the two numbers; act on the bigger one.
        </p>

        <H2>Example 1: Manchester semi, modest leverage</H2>
        <p>
          A 4-bed semi in Withington bought for &pound;320,000 in 2019 with a 65% LTV mortgage. Current value: &pound;415,000. Mortgage balance: &pound;192,000 (so &pound;223,000 in equity). Rent: &pound;1,750/month. Reverts to variable next year at an assumed 5.4%. Service charge nil (freehold), but plan for &pound;3,800/year in repairs and management. Tenant in place.
        </p>
        <Callout>
          <strong>NPV of selling today (after costs):</strong><br />
          Sale price &pound;415,000<br />
          &minus; Estate agent (1.2%) &minus;&pound;5,000<br />
          &minus; Legal &minus;&pound;1,500<br />
          &minus; Mortgage redemption &minus;&pound;192,000<br />
          &minus; CGT on &pound;90,000 gain (28% above allowance, simplified) &minus;&pound;24,500<br />
          <strong>= &pound;192,000 in your pocket today</strong>
        </Callout>
        <Callout>
          <strong>NPV of holding for 5 years (discounted at 6%):</strong><br />
          Annual net cash flow: rent &pound;21,000 &minus; mortgage interest &pound;10,400 &minus; repairs &pound;3,800 &minus; tax on rental profit (~&pound;1,300 after Section 24) = <strong>&pound;5,500/year</strong><br />
          5-year PV of cash flows (at 6%): <strong>&pound;23,200</strong><br />
          Year-5 sale (assume 3%/yr capital growth, &pound;415k &rarr; &pound;481k, less costs and CGT): <strong>~&pound;215,000 net, PV &pound;161,000</strong><br />
          <strong>= &pound;184,000 in today's pounds</strong>
        </Callout>
        <p>
          Result: <strong>selling wins by &pound;8,000</strong>, but only just. At a 5% discount rate (less ambitious alternative), holding wins. The decision turns entirely on what you'd do with the equity after selling. If you'd put it in a global tracker at a real return of 5%, hold. If you'd put it in a higher-yielding next property at 7%+, sell.
        </p>

        <H2>Example 2: London flat, high leverage, leasehold</H2>
        <p>
          A 2-bed flat in Hackney bought for &pound;520,000 in 2017 with a 75% LTV mortgage. Current value: &pound;560,000 (almost flat). Mortgage balance: &pound;320,000. Equity: &pound;240,000. Rent: &pound;2,200/month. Service charge: &pound;3,600/year. Lease 88 years remaining (no immediate problem, but a creeping drag on resale).
        </p>
        <Callout>
          <strong>NPV of selling today (after costs):</strong><br />
          Sale price &pound;560,000<br />
          &minus; Estate agent &amp; legal &minus;&pound;8,500<br />
          &minus; Mortgage redemption &minus;&pound;320,000<br />
          &minus; CGT on &pound;40,000 gain &minus;&pound;10,000<br />
          <strong>= &pound;221,500 in your pocket today</strong>
        </Callout>
        <Callout>
          <strong>NPV of holding for 5 years (discounted at 6%):</strong><br />
          Annual net cash flow: rent &pound;26,400 &minus; mortgage interest &pound;16,000 &minus; service charge &pound;3,600 &minus; repairs &pound;1,500 &minus; tax (~&pound;2,000) = <strong>&pound;3,300/year</strong><br />
          5-year PV of cash flows: <strong>&pound;13,900</strong><br />
          Year-5 sale (assume 1%/yr capital growth, &pound;560k &rarr; &pound;588k, less costs and CGT, plus an &pound;8k lease premium discount): <strong>~&pound;205,000 net, PV &pound;153,000</strong><br />
          <strong>= &pound;167,000 in today's pounds</strong>
        </Callout>
        <p>
          Result: <strong>selling wins by &pound;54,500</strong> &mdash; not close. The flat is producing thin cash flow, the capital growth assumption is generous given the post-2017 London market, and the leasehold creates an extending drag. The 75% LTV that looked clever in 2017 is now amplifying the cost rather than the return. Sell.
        </p>

        <H2>The three questions that actually decide</H2>
        <p>
          Across hundreds of sell-or-hold runs, the same three questions determine the answer 90% of the time. Get these right and the NPV math falls out.
        </p>
        <p>
          <strong>1. What's your alternative rate of return?</strong> If the equity you'd unlock would sit in a current account at 1%, holding wins almost any contest, because almost any rental property earns more than that. If you have a specific next deal at 8%+ net return, selling looks much better. The discount rate is the most consequential single input in the whole framework, and most owners pick it by feel.
        </p>
        <p>
          <strong>2. What capital growth do you actually believe?</strong> Estate agents are paid to be optimistic. The last decade's London growth was an exception, not a baseline. For most UK markets, 1.5&ndash;3% real growth is the honest planning number. Plug that into your model rather than the headline rate the agent shows you and a lot of &ldquo;obvious holds&rdquo; flip to sells.
        </p>
        <p>
          <strong>3. What's the actual mortgage cost going forward?</strong> A property that earned 4% net yield on a 2% mortgage is a different proposition once the mortgage resets to 5.5%. Many of the sell-or-hold questions hitting our inbox in 2026 are really &ldquo;the rate reverted last quarter, my cashflow flipped negative, what now?&rdquo; questions. Re-model with the actual forward mortgage rate before deciding.
        </p>

        <H2>Things that aren't in the NPV but should still influence the call</H2>
        <p>
          NPV gives you the financial answer. There are three non-financial considerations worth weighting separately.
        </p>
        <p>
          <strong>Tenant in situ.</strong> A sitting tenant at below-market rent reduces saleable value (most agents discount 10&ndash;15%). It also reduces voids if you hold. Whether this nets in your favour depends on the rent gap and the local sales market.
        </p>
        <p>
          <strong>Concentration risk.</strong> If 60% of your portfolio value sits in one property, the NPV maths might say hold but the diversification maths says sell. Both can be right; the call depends on whether you've got other levers to reduce concentration.
        </p>
        <p>
          <strong>Time and attention.</strong> Some properties cost you more weekends than the cash flow justifies. The NPV doesn't capture that. If the leasehold management company is hostile, the tenant is high-maintenance, or the building has a known structural issue creeping toward you &mdash; sometimes selling for slightly less than NPV-optimum is the right call.
        </p>

        <CtaBox
          href="/check"
          label="Run the sell-vs-hold model"
          blurb="Get the NPV comparison on your property in 60 seconds — Attractive, Borderline or Risky verdict, the key number, and one suggested next move. Free. No card required."
        />
      </ArticleLayout>
    </>
  );
}
