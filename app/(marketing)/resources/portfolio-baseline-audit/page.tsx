import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "portfolio-baseline-audit";
const TITLE = "Know what you actually own — the portfolio baseline audit";
const DESCRIPTION =
  "Most owners think they know their yield. Run this six-data-point audit and you will usually find it differs by 80–200 basis points from the figure in your head. Here is how to do it.";

export const metadata: Metadata = {
  title: `${TITLE} | AssetCentral`,
  description:
    "A six-data-point baseline audit for property portfolios. The numbers to gather, the three things every audit reveals, and how to skip the spreadsheet entirely.",
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
              readMins: 9,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, TITLE)) }}
      />
      <StickyCta message="Forward your docs. We build the audit for you. Free for 14 days." />
      <ArticleLayout
        slug={SLUG}
        title="Know what you actually own — the portfolio baseline audit"
        description="Most owners think they know their yield. Run this six-data-point audit and you will usually find it differs by 80–200 basis points from the figure in your head. Here is how to do it."
        date="23 May 2026"
        readMins={9}
        related={[
          { slug: "lift-yield-90-days", title: "Lift portfolio yield in 90 days — the four levers" },
          { slug: "yield-protection", title: "Keep yield from sliding back — the 11 things quietly eroding your portfolio" },
          { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
          { slug: "mortgage-rules-by-country", title: "Mortgage rules by country: how the UAE, UK, France, Spain, Portugal, Greece, Germany, and Switzerland differ" },
        ]}
      >
        <p>
          Ask an owner with five properties what their portfolio yield is and you will get a confident number. Five percent. Six. Sometimes seven. Ask them to show you the calculation that produced the number and the answer becomes vaguer. It&rsquo;s usually the rent across the portfolio divided by what they paid, minus something for costs they remember to mention.
        </p>
        <p>
          That figure — the one in the owner&rsquo;s head — is almost always wrong. Not because owners are careless, but because the way human memory weights property numbers is systematically optimistic. Last year&rsquo;s low service charge gets remembered as the recurring figure. The fixed-rate mortgage from three years ago gets remembered even though it reverted last quarter. The two months of void in 2024 gets discounted as an unusual event. The result is a mental yield that is typically 80–200 basis points above the actual yield on the spreadsheet.
        </p>
        <p>
          Knowing your real number is the foundation under every other yield decision. Lifting yield requires a baseline. Protecting yield requires a baseline. Comparing winners and losers requires a baseline. The audit below is the cheapest, fastest way to get to that baseline.
        </p>

        <H2>Why the mental number is wrong</H2>
        <p>
          Three patterns recur, and each owner does at least one of them. Most do all three.
        </p>
        <p>
          <strong>Anchoring to the original purchase.</strong> Yields are often quoted against the purchase price even when the property has appreciated 40%. A Dubai apartment bought in 2019 at AED 1.2m and now worth AED 1.7m is generating &ldquo;7%&rdquo; only if you measure against the 2019 price. Against current value, it&rsquo;s 5%. The 5% number is the one that matters for hold-vs-sell decisions; the 7% number is the one that&rsquo;s comforting.
        </p>
        <p>
          <strong>Mental accounting of one-offs.</strong> &ldquo;That void in October was unusual.&rdquo; &ldquo;The boiler replacement was a one-off.&rdquo; &ldquo;The agent change cost was just to get the right tenant.&rdquo; Stacked across five years, &ldquo;unusual&rdquo; events are 15–25% of true running costs. They&rsquo;re only unusual one at a time.
        </p>
        <p>
          <strong>Last-good-year bias.</strong> The peak year of yield is the one that&rsquo;s remembered. Mortgage costs were lower, the tenant paid on time, no major repairs hit. Owners average their mental yield closer to the best year than to the actual five-year average.
        </p>
        <p>
          The cure for all three is the same: write the numbers down for each property, then add them up.
        </p>

        <H2>The six data points</H2>
        <p>
          For each property, you need exactly six things. No more. Once these are in one place, every other metric (gross yield, net yield, cap rate, cash-on-cash, IRR) computes from them.
        </p>
        <p>
          <strong>1. Purchase price + total capex since acquisition.</strong> Not the asking price, not the marketed price — the actual price you paid, plus stamp duty, transfer fees, legal fees, and every major refurbishment since. This is the denominator most owners get wrong by ignoring the capex side.
        </p>
        <p>
          <strong>2. Current market value.</strong> Two numbers actually: a conservative estimate (recent comparable sales, not asking prices) and an aggressive estimate (best comparable in the last six months). The honest valuation is between these. For Dubai, the DLD transactions search shows actual recorded prices for the last 90 days in any building. For the UK, Land Registry sold-prices data does the same.
        </p>
        <p>
          <strong>3. Current debt + rate + reset date.</strong> The outstanding balance, the current interest rate, and the date that rate either resets or expires. A 2019 fixed at 2.4% that reverts in seven months has a very different economic value to a 2024 fixed at 4.8% that runs another 3 years.
        </p>
        <p>
          <strong>4. Current rent + lease end + tenant status.</strong> Monthly rent (gross), the date the current lease ends, and whether the tenant is on a fixed-term or has lapsed into periodic. If the property is short-let, replace this with last-12-months gross revenue + occupancy %.
        </p>
        <p>
          <strong>5. Annual running costs.</strong> Service charge, insurance, agent fees, property tax / council tax, maintenance reserve. Pull the last 12 months from your bank statements rather than estimating. Most owners under-estimate this number by 20–30% from memory.
        </p>
        <p>
          <strong>6. Vacancy in the last 12 months.</strong> Days vacant between tenancies. For Dubai this is often 2–4 weeks between Marina tenants, 4–8 weeks for JVC, longer for off-plan first-tenancies. For short-term-rental properties, this is 100% minus occupancy.
        </p>
        <Callout>
          That&rsquo;s six numbers per property. For a five-property portfolio, that&rsquo;s 30 data points — half a Saturday morning&rsquo;s work to assemble. Once it&rsquo;s done, every yield calculation falls out of it.
        </Callout>

        <H2>Building the picture</H2>
        <p>
          With the six data points captured, the picture builds in three layers.
        </p>
        <p>
          <strong>Layer 1: gross numbers.</strong> Annual rent per property, total annual rent, gross yield against current value. This is the headline number. It&rsquo;s also the only one most owners compute. It&rsquo;s the least useful of the three.
        </p>
        <p>
          <strong>Layer 2: net numbers.</strong> Annual rent minus running costs minus average vacancy minus interest. This is the cash the property actually produces. For most portfolios, the net figure is 50–65% of gross. The first time most owners see this number cleanly, it&rsquo;s lower than they expected.
        </p>
        <p>
          <strong>Layer 3: returns on equity.</strong> Net cash divided by equity invested (purchase price + capex minus current debt outstanding). This is the return that&rsquo;s actually competing with other places you could put the money. For leveraged portfolios this is usually higher than the net yield against value; for cash purchases the two are identical. <a href="/calculators/irr" className="underline hover:text-[var(--color-accent)]">The IRR calculator</a> handles this directly.
        </p>
        <p>
          An owner with five properties, three currencies, and two countries needs the layers visible side-by-side. The discipline isn&rsquo;t hard. Doing it once is straightforward. Doing it consistently — once a quarter, every quarter — is what most owners fall off.
        </p>

        <H2>What the audit reveals — every time</H2>
        <p>
          We&rsquo;ve never seen a portfolio audit run on multi-property portfolios that didn&rsquo;t produce at least one of the following three findings. Most produce all three.
        </p>
        <p>
          <strong>Finding 1: one property is materially worse than the others.</strong> Almost universal. The portfolio average hides a single property carrying disproportionate cost or void or sub-market rent. The audit makes it visible. The decision then becomes whether to fix it (Levers 1–4 from <a href="/resources/lift-yield-90-days" className="underline hover:text-[var(--color-accent)]">the 90-day yield lift</a>) or to sell it and trade up.
        </p>
        <p>
          <strong>Finding 2: total leverage is higher than expected.</strong> Multi-property owners frequently aggregate debt mentally to whichever number sounds reasonable. The audit produces the actual loan-to-portfolio-value, which often surprises. Concentrations on a single lender or a single reset date also surface here.
        </p>
        <p>
          <strong>Finding 3: at least one rate reset is closer than thought.</strong> Property finance is one of the few household-finance topics where the calendar genuinely matters and most people are surprised by the dates. A reset 14 weeks out should be triggering a refinance enquiry now; one 30 weeks out should be triggering a shop-around. The audit puts the dates in one column and the urgency becomes visible.
        </p>

        <H2>The two ways to do this</H2>
        <p>
          <strong>The spreadsheet path.</strong> A clean Google Sheet with six columns and one row per property does the job. It takes about 30 minutes per property to compile from scratch, mostly because the source documents — mortgage statements, service-charge invoices, lease agreements — live in different inboxes and folders. The friction isn&rsquo;t the math; it&rsquo;s the document hunt.
        </p>
        <p>
          The spreadsheet path works exactly twice. The first run, when you build it. The second run, twelve months later, when you compare. After that, most owners stop updating it because the document hunt is the same every quarter and the maintenance is invisible.
        </p>
        <p>
          <strong>The forward-the-docs path.</strong> AssetCentral was built specifically to remove the document-hunt friction. You forward leases, mortgage statements, service-charge invoices, insurance schedules — and our AI files them against the right property, extracts the numbers, and builds the audit automatically. New invoices update the picture; new mortgage statements update the debt schedule; new leases update the lease end date.
        </p>
        <p>
          The discipline of having a baseline doesn&rsquo;t change. What changes is whether the discipline is maintained. The spreadsheet rusts. The auto-filed audit doesn&rsquo;t.
        </p>

        <H2>What &ldquo;done&rdquo; looks like</H2>
        <p>
          The audit is complete when you can answer five questions in one minute, without looking anything up.
        </p>
        <Callout>
          1. What&rsquo;s the portfolio gross yield right now?<br />
          2. What&rsquo;s the portfolio net yield right now?<br />
          3. Which property has the lowest net yield, and by how much?<br />
          4. When is the next mortgage rate reset across the portfolio?<br />
          5. When is the next lease end across the portfolio?
        </Callout>
        <p>
          Once those five answers are at the front of your mind, every other portfolio decision becomes faster and better. Decisions about which lever to pull on which property; decisions about whether to acquire or hold; decisions about which property to sell first if you need to free capital. The audit isn&rsquo;t the destination — it&rsquo;s the only reliable starting point for everything else.
        </p>

        <CtaBox
          href="https://app.assetcentral.ai/signup?plan=pro_monthly&intent=direct"
          label="Subscribe now"
          blurb="AssetCentral builds your portfolio audit by ingesting the documents you already have. Forward them — leases, statements, invoices — and the baseline appears. Free for 14 days, no credit card needed."
        />

        <InlineNewsletter />
      </ArticleLayout>
    </>
  );
}
