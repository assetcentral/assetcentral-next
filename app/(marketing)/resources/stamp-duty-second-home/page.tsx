import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "stamp-duty-second-home";
const PAGE_TITLE = "Stamp duty on a second home — what you'll pay in 2026";
const SEO_TITLE = "Stamp duty on a second home";
const DESCRIPTION =
  "Second-home SDLT in 2026: the 5% surcharge, three worked examples (£250k, £500k, £900k), refund rules if you sell your main home, and how it differs in Scotland, Wales and Northern Ireland.";

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
      <StickyCta message="Add stamp duty to your decision — free property check." />
      <ArticleLayout
        slug={SLUG}
        title={PAGE_TITLE}
        description="Second-home stamp duty in 2026: the surcharge, three worked examples, refund rules if you sell your main home, and how it differs across the UK."
        date="27 June 2026"
        readMins={7}
        related={[
          { slug: "section-24-explained", title: "Section 24 explained: what UK landlords lost and what to do about it" },
          { slug: "should-i-sell-or-hold-my-buy-to-let", title: "Should I sell or hold my buy to let?" },
          { slug: "mortgage-types-explained", title: "Mortgage types explained" },
          { slug: "what-is-dscr", title: "What is DSCR? Debt service coverage ratio for property investors" },
        ]}
      >
        <p>
          Buying a second home or buy-to-let in England or Northern Ireland in 2026 means paying the standard SDLT band <em>plus</em> a 5% surcharge on the entire purchase price (raised from 3% in the October 2024 Budget). The surcharge dominates the calculation, especially at the lower end. On a &pound;200,000 buy-to-let, the surcharge alone is &pound;10,000 &mdash; more than the standard SDLT on the same property.
        </p>
        <p>
          Most second-home buyers underestimate how much they'll pay, particularly first-time landlords who think they'll be paying the same SDLT they paid on their main home. They won't. The numbers below are the 2026 rates as they stand, with worked examples at three price points and the rules for the situations where things get more complicated.
        </p>

        <H2>The 2026 second-home SDLT bands (England &amp; Northern Ireland)</H2>
        <Callout>
          &pound;0 &ndash; &pound;125,000: <strong>5%</strong> (standard 0% + 5% surcharge)<br />
          &pound;125,001 &ndash; &pound;250,000: <strong>7%</strong> (standard 2% + 5% surcharge)<br />
          &pound;250,001 &ndash; &pound;925,000: <strong>10%</strong> (standard 5% + 5% surcharge)<br />
          &pound;925,001 &ndash; &pound;1.5m: <strong>15%</strong> (standard 10% + 5% surcharge)<br />
          Above &pound;1.5m: <strong>17%</strong> (standard 12% + 5% surcharge)
        </Callout>
        <p>
          The surcharge applies to anyone buying an additional residential property worth &pound;40,000 or more, where they already own (or part-own) another residential property anywhere in the world. Joint purchases are caught if any party qualifies. Limited company purchases are always caught regardless of whether the company already owns property &mdash; the surcharge applies on the first acquisition.
        </p>

        <H2>Three worked examples</H2>
        <p>
          <strong>Example 1: &pound;250,000 buy-to-let in Manchester</strong>
        </p>
        <Callout>
          First &pound;125,000 at 5% = &pound;6,250<br />
          Next &pound;125,000 at 7% = &pound;8,750<br />
          <strong>Total SDLT: &pound;15,000 (6.0% of purchase price)</strong>
        </Callout>
        <p>
          By comparison, an owner-occupier buying the same property would pay &pound;2,500 (the standard residential SDLT). The surcharge is responsible for &pound;12,500 of the difference. On a 25% deposit (&pound;62,500), the SDLT is a quarter of the deposit before any legal or arrangement fees. That changes the maths on a typical buy-to-let materially &mdash; many breakeven year-1 IRR calculations are wrong because they assume residential SDLT.
        </p>
        <p>
          <strong>Example 2: &pound;500,000 family home in London (second home)</strong>
        </p>
        <Callout>
          First &pound;125,000 at 5% = &pound;6,250<br />
          Next &pound;125,000 at 7% = &pound;8,750<br />
          Next &pound;250,000 at 10% = &pound;25,000<br />
          <strong>Total SDLT: &pound;40,000 (8.0% of purchase price)</strong>
        </Callout>
        <p>
          Owner-occupier comparison: &pound;15,000. The surcharge here is &pound;25,000, which is the difference. At this price point the surcharge alone exceeds annual rental income on most properties.
        </p>
        <p>
          <strong>Example 3: &pound;900,000 London flat (buy-to-let)</strong>
        </p>
        <Callout>
          First &pound;125,000 at 5% = &pound;6,250<br />
          Next &pound;125,000 at 7% = &pound;8,750<br />
          Next &pound;650,000 at 10% = &pound;65,000<br />
          <strong>Total SDLT: &pound;80,000 (8.9% of purchase price)</strong>
        </Callout>
        <p>
          Owner-occupier comparison: &pound;35,000. The surcharge of &pound;45,000 is more than a typical year's net rental income on a property of this size. Buy-to-let viability above &pound;700k in London is materially harder than the published yield numbers suggest, once SDLT is amortised over a realistic holding period.
        </p>

        <H2>The refund rule: selling your main home within 36 months</H2>
        <p>
          If you buy a new home before selling your current one, the new purchase is treated as a second home and the surcharge applies. But you can reclaim the surcharge if you sell your previous main residence within 36 months of the new completion.
        </p>
        <p>
          A common scenario: you complete on a new house in October 2026 while your current home is still under offer. You pay the second-home rate at completion. Your current home sells in March 2027. You file a refund claim within 12 months of selling the old home (or 12 months from the SDLT return filing date, whichever is later) and reclaim the surcharge.
        </p>
        <p>
          The refund is real money and worth claiming actively. HMRC won't chase you for it. Best to set a calendar reminder at completion for the date the previous home sells, and apply through the online form within weeks rather than at the deadline.
        </p>

        <H2>Scotland, Wales, Northern Ireland: different rules</H2>
        <p>
          <strong>Scotland (LBTT &mdash; Land and Buildings Transaction Tax).</strong> Standard residential bands plus an Additional Dwelling Supplement of 8% on second homes/BTLs (raised from 6% in December 2024). On a &pound;250,000 property: &pound;3,350 standard LBTT + &pound;20,000 ADS = &pound;23,350 total. Scotland's ADS is significantly higher than England's SDLT surcharge at most price points.
        </p>
        <p>
          <strong>Wales (LTT &mdash; Land Transaction Tax).</strong> Standard residential bands plus a higher-rate band that adds 4&ndash;6% depending on the price tier. On a &pound;250,000 property: roughly &pound;15,000 total (similar to England). Worth checking the exact band &mdash; the structure is differently shaped.
        </p>
        <p>
          <strong>Northern Ireland.</strong> Uses England's SDLT system unchanged.
        </p>

        <H2>How SDLT affects investment-decision modelling</H2>
        <p>
          Most yield calculators show you the year-1 yield on a property assuming the purchase price is the deployment of capital. That understates the real deployment by the SDLT, legal fees, and any furniture/refurbishment costs. A &pound;250,000 BTL with &pound;15,000 SDLT and &pound;3,000 legal costs is really a &pound;268,000 deployment &mdash; and the yield against that figure is 6.7% lower than the headline number suggests.
        </p>
        <p>
          The right way to model this is to amortise the upfront costs over a realistic holding period and treat them as a year-1 capital outflow in the IRR calculation. AssetCentral's free property check applies the second-home SDLT rate by default when the user indicates they already own a property, so the verdict you see is on the post-SDLT economics rather than the headline.
        </p>

        <CtaBox
          href="/check"
          label="Get the post-SDLT verdict"
          blurb="The free AI property check applies the second-home surcharge by default. See your real return after stamp duty in 60 seconds. No card required."
        />
      </ArticleLayout>
    </>
  );
}
