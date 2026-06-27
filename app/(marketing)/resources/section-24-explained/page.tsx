import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "section-24-explained";
const PAGE_TITLE = "Section 24 explained: what UK landlords lost and what to do about it";
const SEO_TITLE = "Section 24 explained";
const DESCRIPTION =
  "Section 24 reframed UK buy-to-let economics for higher-rate landlords. What it actually changed, a worked example showing the £4,800/year hit, and the four legitimate responses.";

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
              readMins: 7,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, PAGE_TITLE)) }}
      />
      <StickyCta message="Check your post-Section-24 cashflow — free." />
      <ArticleLayout
        slug={SLUG}
        title={PAGE_TITLE}
        description="Section 24 reframed UK buy-to-let economics for higher-rate landlords. What it actually changed, a worked example showing the £4,800/year hit, and the four legitimate responses."
        date="27 June 2026"
        readMins={7}
        related={[
          { slug: "stamp-duty-second-home", title: "Stamp duty on a second home — what you'll pay in 2026" },
          { slug: "should-i-sell-or-hold-my-buy-to-let", title: "Should I sell or hold my buy to let?" },
          { slug: "what-is-dscr", title: "What is DSCR? Debt service coverage ratio for property investors" },
          { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
        ]}
      >
        <p>
          Section 24 is the most consequential change to UK landlord taxation of the last twenty years, and most landlords still don't quite know how it works. It was introduced in the Finance (No. 2) Act 2015, phased in between 2017 and 2020, and fully in force since the 2020/21 tax year. It hits higher-rate and additional-rate taxpayers hardest, and it didn't change the tax rate &mdash; it changed what counts as deductible, which is much more damaging.
        </p>
        <p>
          Pre-Section-24, mortgage interest was a deductible expense, just like service charges or repairs. Post-Section-24, mortgage interest is no longer deductible at all for individual landlords (limited companies are unaffected). Instead, you get a 20% basic-rate tax credit on the interest paid. For basic-rate taxpayers that's roughly neutral. For higher-rate (40%) and additional-rate (45%) taxpayers, it's a real cash hit that grows in proportion to leverage.
        </p>

        <H2>What changed, mechanically</H2>
        <p>
          The change is best seen in the order of operations on a tax return.
        </p>
        <p>
          <strong>Pre-Section-24 calculation:</strong>
        </p>
        <Callout>
          Rental profit = Rent &minus; (mortgage interest + all other expenses)<br />
          Tax = Rental profit &times; your marginal rate
        </Callout>
        <p>
          <strong>Post-Section-24 calculation:</strong>
        </p>
        <Callout>
          Rental profit = Rent &minus; (all other expenses) &mdash; <strong>mortgage interest NOT subtracted</strong><br />
          Tax = (Rental profit &times; your marginal rate) &minus; (mortgage interest &times; 20%)
        </Callout>
        <p>
          The difference is small for basic-rate taxpayers (the 20% relief approximately matches what they used to deduct). It's substantial for everyone above basic rate, because mortgage interest now effectively sits inside taxable rental profit even though no cash from it lands in your bank account.
        </p>

        <H2>The worked example: &pound;4,800/year hit on a typical higher-rate-taxpayer BTL</H2>
        <p>
          A landlord with a day job at &pound;75,000/year (clearly into higher-rate territory) owns a Manchester flat: &pound;220,000 purchase, 75% LTV mortgage at 5.2% interest-only. Rent &pound;1,250/month. Repairs and management &pound;2,400/year. Insurance &pound;300/year. No service charge.
        </p>
        <Callout>
          Annual rent: &pound;15,000<br />
          Annual mortgage interest: &pound;165,000 &times; 5.2% = &pound;8,580<br />
          Other expenses: &pound;2,700<br /><br />
          <strong>Pre-Section-24:</strong><br />
          Rental profit: &pound;15,000 &minus; &pound;8,580 &minus; &pound;2,700 = &pound;3,720<br />
          Tax at 40%: &pound;1,488<br /><br />
          <strong>Post-Section-24:</strong><br />
          Rental profit: &pound;15,000 &minus; &pound;2,700 = &pound;12,300<br />
          Tax at 40%: &pound;4,920<br />
          Less 20% mortgage-interest credit: &minus;&pound;1,716<br />
          Net tax: <strong>&pound;3,204</strong><br /><br />
          <strong>Section-24 cost on this property: &pound;3,204 &minus; &pound;1,488 = &pound;1,716/year (~&pound;143/month)</strong>
        </Callout>
        <p>
          That single property loses &pound;1,716/year purely from the rule change. Now scale: if our landlord owns three similar properties, the annual Section-24 cost is over &pound;5,000. On a higher-leverage portfolio (say five properties at 75% LTV averaging &pound;180,000 each), the annual hit can exceed &pound;10,000.
        </p>

        <H2>The cliff-edge problem: how Section 24 can push you into a higher tax band</H2>
        <p>
          The most dangerous Section 24 effect isn't the headline calculation &mdash; it's the way the rental profit (now calculated without subtracting mortgage interest) is added to your total income for tax-band purposes. A landlord earning &pound;48,000 from a day job who used to declare a small &pound;3,720 rental profit was comfortably basic-rate. Post-Section-24 they declare &pound;12,300 of rental profit, pushing &pound;9,000 of income into the 40% band.
        </p>
        <p>
          The downstream effects can be worse than the direct tax cost: loss of child benefit (the &pound;50,000 high-income charge), loss of personal allowance taper (above &pound;100,000), reduced pension annual allowance. Some landlords have found themselves paying effective marginal rates above 60% on rental income post-Section-24.
        </p>

        <H2>Four legitimate responses</H2>
        <p>
          There's no clever loophole that makes Section 24 disappear. There are four genuine structural responses, each with trade-offs.
        </p>
        <p>
          <strong>1. Transfer to a limited company.</strong> Limited companies pay corporation tax (currently 19&ndash;25% depending on profits) on rental income with mortgage interest fully deductible &mdash; pre-Section-24 treatment. For higher-rate landlords this is often dramatically better, especially on highly leveraged portfolios. The catch: transferring properties into a Ltd triggers SDLT (the company is a different legal entity buying from you) and CGT (you're disposing at market value). For a single &pound;300,000 property the round-trip costs can easily exceed &pound;20,000. Worth doing on portfolios above 3&ndash;4 properties; rarely worth doing for one. Take specialist advice before acting.
        </p>
        <p>
          <strong>2. Reduce leverage.</strong> The Section-24 cost scales with mortgage interest. Paying down debt &mdash; whether by capital injection, downsizing, or selling one property to clear another's mortgage &mdash; cuts the Section-24 cost in proportion. The implicit return on cash used this way often beats what the same cash would earn invested elsewhere, particularly for highly leveraged higher-rate landlords.
        </p>
        <p>
          <strong>3. Switch to assets where the rules don't apply.</strong> Furnished holiday lets used to be exempt from Section 24, but the FHL regime was abolished in 2025, so this loophole is gone. What still works: commercial property (different tax framework), investing through a Ltd as above, or moving capital into property funds (REITs) where the structure handles the tax internally.
        </p>
        <p>
          <strong>4. Recalibrate the portfolio.</strong> Some properties simply don't pay after Section 24. The worked-example flat above might still produce a small post-tax profit, but the marginal property in the portfolio &mdash; the lowest-yielding, highest-leveraged one &mdash; often goes net-negative on a fully-loaded basis. Selling it and redeploying the equity into a lower-LTV asset (or paying down another mortgage) can leave the same total portfolio yield with much less Section-24 drag.
        </p>

        <H2>What this looks like on the model</H2>
        <p>
          Any modern property model needs to apply Section 24 as a default for UK-resident individual landlords, with limited-company structures available as an explicit toggle. The 20% credit must be applied after the marginal-rate calculation. Many spreadsheet templates still floating around the landlord forums apply pre-Section-24 logic by default &mdash; resulting in projected returns that are 15&ndash;25% too high for higher-rate taxpayers. If you're running the numbers on a UK BTL and the projection looks suspiciously generous, this is the first thing to check.
        </p>

        <CtaBox
          href="/check"
          label="Run a free AI property check"
          blurb="Get the post-Section-24 verdict on any UK property in 60 seconds — Attractive, Borderline or Risky. Free. No card required."
        />
      </ArticleLayout>
    </>
  );
}
