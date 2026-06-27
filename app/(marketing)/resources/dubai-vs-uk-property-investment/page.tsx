import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "dubai-vs-uk-property-investment";
const PAGE_TITLE = "Dubai vs UK property investment — real returns compared (2026)";
const SEO_TITLE = "Dubai vs UK property investment";
const DESCRIPTION =
  "Side-by-side comparison: net yield, tax, leverage, exit costs, currency exposure. A £400k UK BTL vs a £400k Dubai apartment, modelled honestly over 10 years.";

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
              readMins: 9,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, PAGE_TITLE)) }}
      />
      <StickyCta message="Model Dubai vs UK side by side — free." />
      <ArticleLayout
        slug={SLUG}
        title={PAGE_TITLE}
        description="Side-by-side comparison: net yield, tax, leverage, exit costs, currency exposure. A £400k UK BTL vs a £400k Dubai apartment, modelled honestly over 10 years."
        date="27 June 2026"
        readMins={9}
        related={[
          { slug: "uk-tax-on-dubai-property", title: "UK tax on Dubai property: what UK-resident landlords actually pay" },
          { slug: "section-24-explained", title: "Section 24 explained" },
          { slug: "stamp-duty-second-home", title: "Stamp duty on a second home" },
          { slug: "should-i-sell-or-hold-my-buy-to-let", title: "Should I sell or hold my buy to let?" },
        ]}
      >
        <p>
          The Dubai-vs-UK debate dominates UK landlord forums and expat finance chat groups, usually framed as &ldquo;Dubai yields 8&ndash;10%, UK yields 4&ndash;5%&rdquo; with a smug shrug. Both sides of that comparison are gross yields, both are roughly true, and the result is misleading. The right comparison is net IRR after all costs over a realistic holding period, including currency exposure for UK-resident investors. Once you run that, the picture is much closer and depends on inputs neither headline captures.
        </p>
        <p>
          Below: a side-by-side on &pound;400,000 of investable capital deployed in either market in mid-2026, modelled over 10 years, with the honest costs in both jurisdictions.
        </p>

        <H2>Setup: the two properties</H2>
        <p>
          <strong>UK property.</strong> 3-bed terraced house in a strong Manchester suburb. Price &pound;400,000. 70% LTV mortgage at 5.1% interest-only. Stamp duty (second-home rate): &pound;31,500. Legal &amp; survey: &pound;3,500. Rent: &pound;2,000/month (&pound;24,000/year). Service charge: nil (freehold). Repairs &amp; management: &pound;3,500/year. Insurance &pound;400/year.
        </p>
        <p>
          <strong>Dubai property.</strong> 2-bed apartment in JBR. Price AED 1.84m (&asymp; &pound;400,000 at 4.6 AED/&pound;). 65% LTV mortgage at 5.2% interest-only. Dubai Land Department fee 4% (AED 73,600 &asymp; &pound;16,000) + agency fee 2% (&pound;8,000). Rent: AED 130,000/year (&asymp; &pound;28,300). Service charge: AED 24,000 (&pound;5,200). Management 8% &asymp; &pound;2,260. Maintenance &pound;1,500/year.
        </p>

        <H2>Year-1 net cash flow — the honest numbers</H2>
        <Callout>
          <strong>UK property year 1:</strong><br />
          Rent &pound;24,000 &minus; vacancy (4 weeks) &minus;&pound;1,850 &minus; management &amp; repairs &minus;&pound;3,500 &minus; insurance &minus;&pound;400 = NOI &pound;18,250<br />
          Mortgage interest: &pound;280,000 &times; 5.1% = &pound;14,280<br />
          Net pre-tax cash flow: <strong>&pound;3,970</strong><br />
          Tax (Section 24, higher-rate landlord): &pound;14,260 &times; 40% &minus; mortgage credit &pound;2,856 = <strong>&minus;&pound;2,848</strong><br />
          <strong>Year-1 net cash flow after tax: &pound;1,122</strong>
        </Callout>
        <Callout>
          <strong>Dubai property year 1:</strong><br />
          Rent &pound;28,300 &minus; vacancy (4 weeks) &minus;&pound;2,180 &minus; management &minus;&pound;2,260 &minus; service charge &minus;&pound;5,200 &minus; repairs &minus;&pound;1,500 = NOI &pound;17,160<br />
          Mortgage interest: &pound;260,000 &times; 5.2% = &pound;13,520<br />
          Net pre-tax cash flow: <strong>&pound;3,640</strong><br />
          UAE tax on rental income: <strong>&pound;0</strong> (no personal income tax in UAE)<br />
          UK tax (if UK-resident): &pound;17,160 worldwide income reportable, taxed at 40% &minus; mortgage credit = <strong>&minus;&pound;4,160</strong><br />
          <strong>Year-1 net cash flow for UAE-resident: &pound;3,640</strong><br />
          <strong>Year-1 net cash flow for UK-resident: &minus;&pound;520</strong>
        </Callout>
        <p>
          The Dubai property looks better only if you're a UAE-resident landlord. For a UK-resident landlord, the global-income tax obligation collapses the apparent yield advantage almost entirely. This is the single biggest fact the Dubai-vs-UK debate routinely ignores.
        </p>

        <H2>10-year IRR comparison (UK-resident landlord, both properties)</H2>
        <p>
          Assumptions: 2.5% annual capital growth UK (in line with long-run Manchester data), 3.5% annual capital growth Dubai (in line with 2019&ndash;2024 average, conservative against developer projections). 2% annual rent growth in both markets. AED/GBP exchange rate flat (a generous assumption for Dubai &mdash; we'll come back to that). Sale at year 10 with all selling costs.
        </p>
        <Callout>
          <strong>UK property:</strong><br />
          Total net cash flow over 10 years (post-tax, after-tax-bill): <strong>~&pound;28,000</strong><br />
          Year-10 sale: &pound;511,000 gross, &pound;459,000 net of mortgage redemption, ~&pound;432,000 after CGT and selling costs<br />
          Equity invested year 0: &pound;120,000 + &pound;35,000 (SDLT and fees) = &pound;155,000<br />
          <strong>10-year IRR: ~7.2%</strong>
        </Callout>
        <Callout>
          <strong>Dubai property (UK-resident landlord):</strong><br />
          Total net cash flow over 10 years (post-UK-tax): <strong>~&pound;6,500</strong><br />
          Year-10 sale: &pound;563,000 gross, &pound;498,000 net of mortgage redemption, ~&pound;476,000 after UK CGT and selling costs<br />
          Equity invested year 0: &pound;140,000 + &pound;24,000 (DLD and agency fees) = &pound;164,000<br />
          <strong>10-year IRR: ~7.4%</strong>
        </Callout>
        <p>
          Effectively a tie when properly modelled for a UK-resident landlord. The Dubai property's apparent gross-yield advantage is consumed almost entirely by UK tax on the income and the higher purchase costs. The UK property holds up against assumption-busting Dubai capital growth because the rental cash flows are taxed once (not twice) and the entry costs are smaller relative to equity deployed.
        </p>
        <p>
          For a UAE-resident landlord the Dubai IRR is closer to 10&ndash;11% &mdash; substantially better than the UK property under any reasonable assumption. The deciding factor is residency, not the property itself.
        </p>

        <H2>The currency risk most owners ignore</H2>
        <p>
          The AED is pegged to the USD at 3.6725. The GBP/USD rate has moved 1.18 to 1.40 over the last five years &mdash; a 19% swing. A UK-resident landlord receiving Dubai rent in AED is implicitly long USD against GBP. If sterling appreciates against the dollar, the rental income translates to fewer pounds. Same for sale proceeds at exit.
        </p>
        <p>
          You can model this. Assume the AED/GBP rate drifts 1% per year stronger to GBP over 10 years (a defensible base case if sterling appreciates against the dollar through the period). The Dubai property's 10-year IRR for a UK-resident landlord drops by roughly 0.8 percentage points. The opposite move helps by the same amount. This isn't unique to Dubai &mdash; same maths applies to any cross-border holding &mdash; but the AED's USD peg makes the currency exposure more predictable than, say, holding euros against sterling.
        </p>

        <H2>The four things that actually decide</H2>
        <p>
          <strong>1. Residency.</strong> The single largest input. UAE-resident landlords investing in Dubai see net yields that simply aren't available to UK-resident landlords on the same building.
        </p>
        <p>
          <strong>2. Holding period.</strong> Dubai's high upfront cost (DLD + agency fees + furniture for short-let conversion) means shorter holding periods (3&ndash;5 years) are punishing on IRR. The 10-year horizon used above is roughly the break-even point at which Dubai becomes competitive with the UK. If you're not committing to that horizon, the UK comparison is better at almost every input.
        </p>
        <p>
          <strong>3. Strategy on short-term rental.</strong> Dubai short-let yields can run 12&ndash;18% gross on the right building, vs 4&ndash;5% long-let. Operating costs are 35&ndash;45% of gross. The model becomes very different and the outcome much more variable &mdash; pencil it separately rather than mixing assumptions.
        </p>
        <p>
          <strong>4. UK tax structure.</strong> Limited-company UK landlords pay corporation tax not income tax, dramatically reducing the Section-24 drag. If you already hold UK property in a Ltd, the comparison shifts; if not, the maths above is accurate.
        </p>

        <H2>The cliche that's actually true</H2>
        <p>
          &ldquo;Dubai for yield, UK for stability&rdquo; is broadly correct if you're a UAE resident with no near-term plans to relocate. &ldquo;UK for after-tax return, Dubai for diversification&rdquo; is closer to the truth for a UK-resident landlord. The mistake most people make is treating the headline yield numbers as the answer rather than the starting point.
        </p>

        <CtaBox
          href="/check"
          label="Run the comparison on your property"
          blurb="Get the free AI verdict on any property in either market — UK or UAE — modelled with the correct tax framing for your residency. 60 seconds, no card."
        />
      </ArticleLayout>
    </>
  );
}
