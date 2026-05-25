import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "yield-protection";
const TITLE = "Keep yield from sliding back — the 11 things quietly eroding your portfolio";
const DESCRIPTION =
  "Lifting yield is the easy part. The hard part is keeping it there. The 11 yield killers most owners miss, grouped by category, with the alerts that catch each one.";

export const metadata: Metadata = {
  title: `${TITLE} | AssetCentral`,
  description:
    "The 11 things that quietly erode portfolio yield over a 24-month period, grouped by cost / revenue / capex / tax drift, with worked examples and a defence checklist.",
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
              readMins: 8,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, TITLE)) }}
      />
      <StickyCta message="Get the alerts that catch all 11. Free for 14 days." />
      <ArticleLayout
        slug={SLUG}
        title="Keep yield from sliding back — the 11 things quietly eroding your portfolio"
        description="Lifting yield is the easy part. The hard part is keeping it there. The 11 yield killers most owners miss, grouped by category, with the alerts that catch each one."
        date="23 May 2026"
        readMins={8}
        related={[
          { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
          { slug: "str-operator-performance-check", title: "Is your STR operator earning their 25%?" },
          { slug: "mortgage-types-explained", title: "Mortgage types explained: fixed, variable, fix-then-revert, repayment, interest-only" },
          { slug: "off-plan-handover-options", title: "Off-plan handover and you can't complete: four options" },
        ]}
      >
        <p>
          Most owner conversations focus on lifting yield. Refinance the mortgage, push the rent, switch to short-stay, refit the kitchen. These moves matter, and they work. But the harder problem — the one nobody writes guides about — is keeping the yield up once you have it.
        </p>
        <p>
          Yield is a moving baseline. Every quarter, something quietly shifts against you. Service-charge invoices arrive a little higher than last year. A fixed-rate period ends and the lender drops you onto a 200bps-worse variable. A tenant gives notice and the flat sits empty for six weeks instead of two. The Dubai service charge index reposts and your tower is up 9%. None of these is a crisis on its own. Compounded across a portfolio over 24 months, they routinely shave 100–200 basis points off net yield without anyone noticing.
        </p>
        <p>
          Defending yield is a different discipline from improving it. It needs trigger-based monitoring, not calendar-based reviews. Here are the eleven things to watch for, grouped by the type of drift they cause.
        </p>

        <H2>Cost drift — four ways your outgoings creep up</H2>
        <p>
          <strong>1. Service-charge creep.</strong> The biggest line item most multi-property owners ignore. Dubai service charges across the major towers have risen 4–9% year on year since 2023, well above general inflation. The annual invoice arrives, gets paid through standing order or via the property manager, and the comparison to last year never happens. Owners discover the drift only when they sell and the buyer's broker asks about service charge as a percentage of rent.
        </p>
        <p>
          The defence: every annual service-charge bill should be compared against last year's same building. Anything over 5% needs an explanation from the OA or the developer.
        </p>
        <p>
          <strong>2. Insurance auto-renewal.</strong> Buildings insurance, contents insurance, and landlord liability all auto-renew by default. Insurers know that fewer than 10% of customers shop the renewal, so they price accordingly. A three-year-old policy is usually 15–30% above market. Properties bought through an agent often inherit the agent's preferred insurer, which is almost always the most expensive option.
        </p>
        <p>
          The defence: shop every policy every two years, even if just to use the quote as a renegotiation tool with the incumbent.
        </p>
        <p>
          <strong>3. Mortgage rate reset.</strong> The most painful yield killer because it's the largest single line on most owner P&Ls. A UK fix-then-revert mortgage moves to the lender's standard variable rate the day after the fixed period ends — often 3–4% above what was just paid. Same pattern in the UAE: most three-year fixed deals revert to EIBOR + 2%. A 5-year-old portfolio with three properties resetting in different quarters can lose 250–400bps of net yield in a single year without any single moment that screamed &ldquo;act now&rdquo;.
        </p>
        <p>
          The defence: every fixed-rate property needs a 90-day-out alert before the reset date. Refinance options take 6–8 weeks to arrange; finding out two weeks before reset is too late.
        </p>
        <p>
          <strong>4. Tax and fee drift.</strong> Council tax bands in the UK get re-evaluated. The DLD index used to size Dubai DEWA deposits shifts. Spanish IBI rates move with municipal budgets. France's taxe foncière compounds at around 3% per year. None is dramatic in isolation. All of them together quietly add a percentage point to costs over five years.
        </p>
        <p>
          The defence: log the previous year's tax bill for each property and flag anything that arrives more than 5% higher.
        </p>

        <H2>Revenue drift — three ways your income slips</H2>
        <p>
          <strong>5. Stagnant rent.</strong> The single biggest revenue killer in long-term portfolios. A tenant who renews three times in a row at the same rent is a tenant whose rent has fallen 12–18% in real terms. Owners avoid the conversation because they like the tenant, or because they aren't sure what the market will bear, or because they don't want a void. All defensible reasons. None of them changes the maths.
        </p>
        <p>
          The defence: at every renewal, look up comparable lettings in the same building or street. If your rent is more than 8% below market, you owe yourself the conversation.
        </p>
        <Callout>
          A Dubai Marina 2-bed bought in 2020 at AED 110,000/year rent, held flat through five renewals while the building average rose to AED 150,000, has lost roughly AED 200,000 of cumulative rent. That number doesn&rsquo;t show up anywhere — it&rsquo;s just absent.
        </Callout>
        <p>
          <strong>6. Lease lapsing into periodic.</strong> A fixed-term tenancy that runs past its end without renewal converts to a periodic / month-to-month / statutory periodic tenancy. The legal protections shift, the notice period typically shortens, and crucially — most owners forget to take the rent-review conversation. The flat continues at the old rent for another year because nobody flagged that the moment had passed.
        </p>
        <p>
          The defence: every lease needs a 60-day-out alert before its end date. That's the window where renewal terms get negotiated.
        </p>
        <p>
          <strong>7. Voids that nobody manages.</strong> A 14-day void between tenants is normal. A 45-day void means the marketing went out late, the asking rent was wrong, or the agent stopped trying. For a Dubai 2-bed at AED 12,000/month, the difference between a 14-day and a 45-day void is AED 12,400 of lost rent — about 9% of annual income for that property.
        </p>
        <p>
          The defence: an alert at day 21 vacant, and a second at day 35. Pressure on the agent or the listing strategy needs to happen at those triggers, not after the second monthly statement arrives with another zero on it.
        </p>

        <H2>Capex drift — two ways deferred work compounds</H2>
        <p>
          <strong>8. Deferred maintenance.</strong> A boiler that needs replacing this year, deferred, becomes a boiler emergency in two years — at 1.5× the cost, with a tenant living through it. A roof inspection deferred becomes a roof leak. The cost of deferred maintenance compounds because emergency works carry premium rates and because secondary damage (water ingress, mould, electrical) adds to the original bill.
        </p>
        <p>
          The defence: each property needs a capex calendar. EICR every 5 years, gas safety every year, boiler service annually. Skipping any of these to save 200 EUR this year costs 2,000 EUR within 18 months in roughly 30% of cases.
        </p>
        <p>
          <strong>9. EPC and efficiency penalties.</strong> Coming for every European market. UK MEES already requires EPC E for new tenancies and is moving to C by 2030. France has banned letting G-rated &ldquo;passoires thermiques&rdquo; since 2025 and adds F-rated to the ban in 2028. The cost of these retrofits is rising as demand for tradespeople rises with deadlines. The cost of not doing them is losing the right to let the property.
        </p>
        <p>
          The defence: every property's current EPC rating belongs on its profile, with the legal deadline for upgrade flagged 18 months out. <a href="/calculators/retrofit" className="underline hover:text-[var(--color-accent)]">Run the retrofit calculator</a> to see whether the upgrade pays back inside your hold period.
        </p>

        <H2>Tax and regulatory drift — two structural risks</H2>
        <p>
          <strong>10. Non-resident tax rules.</strong> France, Spain, and Portugal have all tightened non-resident rental taxation in the last 36 months. The UK's Section 24 changes hit higher-rate-tax owners through the late 2010s and continue to bite. Switzerland's wealth tax catches owners who haven't realised they're tax-resident through extended stays. Owners with cross-border portfolios discover most of these changes by accident, usually when their accountant brings them up months after they took effect.
        </p>
        <p>
          The defence: at least one annual review with someone who handles cross-border property tax. Self-assessment software won't catch the regime changes that matter.
        </p>
        <p>
          <strong>11. Regulatory tightening on short-stay.</strong> Dubai's DTCM licensing rules tightened in 2024 and continue to evolve. UK HMO and selective licensing schemes expand every year — many cities now require landlord registration. Spain's Decreto de Vivienda gives municipalities power to cap short-stays. Each of these has the same shape: a property that was compliant last year quietly becomes non-compliant this year.
        </p>
        <p>
          The defence: every property in a regulated category (short-stay, HMO, holiday let) needs the local regulation reviewed at least annually. Most regulators don&rsquo;t notify existing owners when rules change.
        </p>

        <H2>The right cadence — triggers, not calendars</H2>
        <p>
          The classic advice is &ldquo;do an annual portfolio review&rdquo;. That advice is half-right. An annual review catches the categories where drift is gradual — tax, EPC, insurance. But for the larger yield killers (rate reset, lease end, extended void) the annual cadence is far too slow. By the time the next annual review comes around, the rate has already reset, the lease has already lapsed, the void has already been priced into the year&rsquo;s numbers.
        </p>
        <p>
          The right approach is a small set of trigger-based alerts running continuously, with an annual review on top for the slow categories. Eleven yield killers translate to roughly eight alert types:
        </p>
        <Callout>
          • 90 days before any fixed-rate mortgage reset<br />
          • 60 days before any lease end<br />
          • 21 and 35 days into any tenant void<br />
          • Service-charge invoice arrives &gt; 5% above last year<br />
          • Insurance renewal date approaching<br />
          • Tax bill arrives &gt; 5% above last year<br />
          • EPC deadline &lt; 18 months out<br />
          • Annual capex calendar (boiler, EICR, gas safety)
        </Callout>
        <p>
          A defensive owner doesn&rsquo;t need to think about yield every day. They need a system that pings them at the eight moments per portfolio per year when yield can slip — and then they need to act on the ping.
        </p>

        <H2>What &ldquo;defence&rdquo; actually looks like</H2>
        <p>
          The most disciplined multi-property owners we work with all share one habit. Each property has a single owner-facing record that contains, at minimum: the current rent, the current mortgage rate and reset date, the current service charge, the EPC rating, the last insurance renewal date, the last capex log. Everything is in one place. When an invoice arrives that doesn&rsquo;t match the record, the discrepancy is obvious. When a mortgage reset is 90 days out, the file flags it.
        </p>
        <p>
          That single-record-per-property discipline is what AssetCentral automates. The eight alert types above run continuously, the documents are filed automatically when they arrive in the inbox, and the comparison against last year happens without anyone having to remember to do it.
        </p>
        <p>
          The point isn&rsquo;t that defending yield is impossible by hand. Plenty of owners do it with a Notion page and a calendar full of reminders. The point is that the alternative is silent erosion. A portfolio that loses 100bps of yield a year because nobody noticed the small things is losing 30,000 EUR on a million-EUR portfolio. Compounded over the hold period, that&rsquo;s the difference between a good real-estate decade and a mediocre one.
        </p>

        <CtaBox
          href="https://app.assetcentral.ai/signup"
          label="Start free trial"
          blurb="Get the eight yield-protection alerts running on your portfolio. AssetCentral watches the rate resets, voids, service-charge invoices, and EPC deadlines so you don't have to remember to. Free for 14 days, no credit card needed."
        />

        <InlineNewsletter />
      </ArticleLayout>
    </>
  );
}
