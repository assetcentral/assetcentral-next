import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "uk-tax-on-dubai-property";
const TITLE =
  "UK tax on Dubai property: what British landlords need to know";
const DESCRIPTION =
  "Income tax on Dubai rental, CGT on sale, SDLT surcharge implications, and personal-vs-corporate structuring. Plain-language orientation for UK residents owning Dubai property. Not tax advice.";

export const metadata: Metadata = {
  title: `${TITLE} | AssetCentral`,
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
              datePublished: "2026-05-24",
              readMins: 10,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, TITLE)) }}
      />
      <StickyCta
        message="Track your UK and Dubai portfolio in one place. Free for 14 days."
        href="/signup?utm_source=resource&utm_campaign=uk_tax_dubai"
        label="Start free trial"
      />

      <ArticleLayout
        slug={SLUG}
        title={TITLE}
        description="UK residents owning Dubai property pay UK tax on the rental income and (usually) UK CGT on any gain. The Dubai end of the equation is mostly silent — the work is on the UK return. Here&rsquo;s the orientation."
        date="24 May 2026"
        readMins={10}
        related={[
          { slug: "mortgage-rules-by-country", title: "Mortgage rules by country: how the UAE, UK, France, Spain, Portugal, Greece, Germany, and Switzerland differ" },
          { slug: "off-plan-handover-options", title: "Off-plan handover and you can't complete: four options" },
          { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
          { slug: "winners-and-losers", title: "Spot winners, prune losers, buy the next one well" },
        ]}
      >
        <Callout>
          <strong>This article is orientation, not tax advice.</strong> Tax law
          changes every year (often mid-year), and the specifics of your
          situation — residency status, domicile, ownership structure,
          financing — affect every line in your return. Use this to know what
          questions to ask, then take the specifics to a qualified UK tax
          adviser before you file. We list HMRC reference points throughout
          so you (or your adviser) can verify the current position.
        </Callout>

        <p>
          A large share of Dubai&rsquo;s residential market is owned by UK
          residents. Some are British expats who moved back. Many never lived
          there — they bought off-plan because their UK pound went a long way,
          the yields looked strong, and the no-tax positioning was a relief
          after years of UK BTL squeeze. Then they file their first UK Self
          Assessment with foreign property on it and discover the picture is
          more complicated than &ldquo;zero tax in Dubai means zero tax full
          stop.&rdquo;
        </p>
        <p>
          The short version: <strong>if you&rsquo;re UK tax-resident, the UAE&rsquo;s
          zero income tax is irrelevant to your UK return</strong>. HMRC taxes you
          on worldwide income. Dubai rental gets added to your UK income and
          taxed at your marginal rate. A UK CGT bill is waiting for you when
          you sell. The UK-UAE double-tax treaty exists but doesn&rsquo;t help
          much here because there&rsquo;s nothing to credit against.
        </p>

        <H2>The principle: UK residents pay UK tax on worldwide income</H2>
        <p>
          UK residency is determined by the{" "}
          <a
            href="https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Statutory Residence Test (SRT)
          </a>
          . If you pass it — broadly, if the UK is where you spend most of
          your time, have your home, and earn your main income — you&rsquo;re
          a UK tax resident and HMRC has the right to tax your worldwide
          income.
        </p>
        <p>
          A 0% tax jurisdiction like the UAE doesn&rsquo;t change that. The
          UAE not taxing you means the UAE not taxing you. The UK still does.
          What changes is whether you get <em>credit</em> against your UK bill
          for tax paid elsewhere. Where the source country has charged you
          (say Greece&rsquo;s 15–45% on rental), the UK-Greece treaty lets
          you offset the foreign tax against your UK liability so you&rsquo;re
          not double-taxed. Where the source country has charged you zero
          (UAE), there&rsquo;s nothing to credit. You pay the full UK rate.
        </p>

        <H2>Income tax on Dubai rental — the SA106 path</H2>
        <p>
          Dubai rental income gets reported on the foreign pages of your Self
          Assessment return — specifically{" "}
          <a
            href="https://www.gov.uk/government/publications/self-assessment-foreign-sa106"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            form SA106
          </a>
          . You declare the gross rent (converted to GBP at the appropriate
          rate — HMRC accepts either the spot rate on the day or the average
          for the year, applied consistently), deduct allowable expenses, and
          add the net to your other UK income.
        </p>
        <p>
          What you can deduct against Dubai rental income on a UK return is
          similar to UK BTL deductions but with a few quirks:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>Operating expenses</strong> — service charges (the big one
            in Dubai — often 10–15% of rent), property management commission,
            repairs, insurance, marketing.
          </li>
          <li>
            <strong>Mortgage interest</strong> — for residential let property
            held individually, UK rules restrict relief on finance costs to a
            20% basic-rate credit (same treatment as UK BTL post-2020). If
            your Dubai mortgage is EIBOR-linked or in AED, you report the GBP
            equivalent of the interest paid.
          </li>
          <li>
            <strong>Capital allowances</strong> — generally not available on
            residential property (UK rule applies regardless of where the
            property sits). Furnished holiday let (FHL) was an exception
            historically but the FHL regime was abolished from 6 April 2025.
          </li>
          <li>
            <strong>Replacement of domestic items</strong> — like-for-like
            replacement of furniture, appliances, soft furnishings is
            deductible (under the replacement-of-domestic-items relief that
            replaced the older wear-and-tear allowance).
          </li>
          <li>
            <strong>Travel to inspect / manage the property</strong> — narrowly
            deductible. HMRC scrutinises this for overseas property because a
            two-week &ldquo;inspection trip&rdquo; can be mostly holiday. Keep
            a clean log of the days spent on property business.
          </li>
        </ul>
        <p>
          Net Dubai rental income then stacks on top of your other UK income
          and is taxed at your marginal rate — basic rate (20%), higher rate
          (40%), or additional rate (45%). A higher-rate taxpayer&rsquo;s
          headline yield needs to be discounted by 40% before they compare it
          to a UK basic-rate property. The Dubai 7% gross can look very
          different after the UK tax line.
        </p>

        <Callout>
          <strong>Common mistake:</strong> reporting Dubai rental income only
          when remitted to the UK. The UK taxes worldwide income on the
          arising basis for most residents — you owe UK tax on the rent when
          it&rsquo;s <em>earned</em>, not when you transfer it back. The
          remittance basis exists but applies only to non-domiciled residents
          and was significantly restricted from April 2025; most UK-domiciled
          landlords with Dubai property cannot use it.
        </Callout>

        <InlineNewsletter />

        <H2>Capital Gains Tax when you sell</H2>
        <p>
          When you sell Dubai property at a gain, UK CGT applies. The UAE
          doesn&rsquo;t charge any tax on the disposal, so again there&rsquo;s
          nothing to credit and you pay the full UK rate. As of the 2025/26
          tax year, UK CGT on residential property gains is 18% (basic-rate
          band) and 24% (higher-rate band) — verify the current rate, it&rsquo;s
          changed twice in the last three years.
        </p>
        <p>
          The gain is the GBP-equivalent of the disposal proceeds minus the
          GBP-equivalent of the acquisition cost plus any allowable
          improvements. Critically: you compute the GBP gain using the FX
          rates that applied on the day you bought and the day you sold —
          which means a rising AED (or weakening GBP) between purchase and
          sale will inflate your GBP gain even if the AED price was unchanged.
          This catches a lot of British investors out.
        </p>
        <p>
          You also need to report the disposal within 60 days via the{" "}
          <a
            href="https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-sold-a-property-in-the-uk-on-or-after-6-april-2020"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            online CGT property service
          </a>{" "}
          — yes, that path applies to overseas property too if you&rsquo;re UK
          tax resident. Annual exempt amount (currently £3,000 from 2024/25)
          can be deducted before the rate applies. Losses from other UK or
          overseas disposals can be offset under standard rules.
        </p>

        <H2>SDLT — does buying Dubai property trigger UK stamp duty?</H2>
        <p>
          No. SDLT is a tax on UK land transactions, so buying in Dubai
          doesn&rsquo;t cause an SDLT event in itself. But there&rsquo;s an
          indirect consequence worth knowing:
        </p>
        <p>
          The 5% additional dwellings surcharge that applies to a buyer who
          already owns another residential property{" "}
          <strong>counts your overseas property too</strong>. If you own a
          Dubai apartment and then buy a UK BTL, the UK BTL acquisition
          attracts the additional dwellings surcharge — your Dubai property is
          treated as your &ldquo;other&rdquo; dwelling for surcharge purposes.
        </p>
        <p>
          This often surprises people who think of their Dubai unit as
          ringfenced. It isn&rsquo;t — HMRC counts dwellings globally for the
          surcharge test, even though SDLT itself only applies to UK
          transactions.
        </p>

        <H2>Personal ownership vs UK Ltd vs offshore structuring</H2>
        <p>
          The default is personal ownership. It&rsquo;s simple — Dubai
          property in your name, UK tax filed via SA100 + SA106, no extra
          corporate structure. For one or two units, this is usually the right
          answer.
        </p>
        <p>
          Three alternatives investors explore — and where each starts paying
          back:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>UK Ltd company</strong> — rental income taxed at UK
            corporation tax (currently 25% main rate, marginal relief in the
            £50k–£250k band) rather than your personal marginal rate. Better
            for higher-rate taxpayers (45% personal vs 25% corp), worse for
            extracting profit (dividend tax on top). Mortgage interest is
            fully deductible inside a company. Makes sense from roughly 4+
            properties or where the investor is genuinely reinvesting profit
            rather than drawing it.
          </li>
          <li>
            <strong>UAE entity (FZE / mainland LLC)</strong> — the UAE
            introduced 9% corporate tax in June 2023 with a SAR 375k
            exemption. For most small residential portfolios this is below the
            threshold — a UAE entity may pay 0% UAE corporate tax. But
            <em> you&rsquo;re still UK tax resident</em>, so the UAE entity&rsquo;s
            profits get attributed to you under UK Controlled Foreign Company
            (CFC) rules and taxed in the UK anyway. The structure adds
            complexity without saving UK tax — generally not worth it for
            personal residential landlords.
          </li>
          <li>
            <strong>Offshore structure (BVI / Jersey / Guernsey)</strong> —
            occasionally proposed by brokers selling Dubai off-plan. Almost
            always wrong for UK-resident individuals — UK anti-avoidance rules
            (transfer-of-assets-abroad legislation) attribute the offshore
            entity&rsquo;s income to you regardless. The structure adds
            opacity that HMRC dislikes, no tax saving, and material setup +
            maintenance costs.
          </li>
        </ul>
        <Callout>
          <strong>The honest answer:</strong> for most UK residents owning
          1–3 Dubai properties, personal ownership is the right structure.
          Layered offshore structures are usually marketing dressed as
          planning. Talk to a UK tax adviser before you set up anything more
          complex than &ldquo;the deed&rsquo;s in my name.&rdquo;
        </Callout>

        <H2>The UK-UAE Double Tax Treaty</H2>
        <p>
          The UK and UAE signed a comprehensive double-tax treaty in April
          2016 (effective in the UK from January 2017). The treaty exists,
          but for the typical UK-resident landlord with Dubai rental, it
          doesn&rsquo;t reduce your bill — there&rsquo;s no UAE tax to credit
          against your UK liability.
        </p>
        <p>
          Where the treaty does matter: it confirms your residency status for
          tax purposes, gives you tie-breaker rules if you spend significant
          time in both countries, and provides relief if you become tax
          resident in the UAE (the rare case where someone genuinely moves to
          Dubai and is no longer UK tax resident — the SRT test is strict).
        </p>

        <H2>Reporting timeline — when things are due</H2>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>Self Assessment registration</strong> — by 5 October
            following the tax year you started receiving foreign rental income
            (UK tax year runs 6 April to 5 April).
          </li>
          <li>
            <strong>SA100 + SA106 filing</strong> — by 31 January after the
            tax year ends (online).
          </li>
          <li>
            <strong>Tax payment</strong> — also 31 January for the prior tax
            year, plus a payment on account for the current year if the bill
            is over £1,000.
          </li>
          <li>
            <strong>CGT on disposal</strong> — within 60 days of completion,
            via the online property service. Final reconciliation on your
            next Self Assessment.
          </li>
        </ul>

        <H2>What this means for your decisions</H2>
        <p>
          Three practical takeaways:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>Build the UK tax line into your yield maths from day one.</strong>
            Don&rsquo;t look at Dubai rental as &ldquo;the gross yield is 7%.&rdquo;
            For a higher-rate taxpayer, the after-UK-tax net is often 3–4%
            once you account for service charges, mortgage finance, agency,
            and UK income tax. Whether that&rsquo;s still attractive vs
            alternative uses of capital is the actual investment question.
          </li>
          <li>
            <strong>Keep clean records in both currencies.</strong> AED for the
            Dubai accounts, GBP-equivalent for the UK return. You&rsquo;ll
            need both at filing time and many landlords reconstruct them after
            the fact from incomplete records.
          </li>
          <li>
            <strong>FX exposure is a real economic factor, not just a
            paperwork issue.</strong> A 15% AED strengthening against GBP between
            purchase and sale meaningfully changes your UK CGT bill on
            disposal — independent of the AED-denominated capital growth.
          </li>
        </ul>

        <CtaBox
          href="/calculators/off-plan"
          label="Open the off-plan calculator"
          blurb="Model the assign-now-vs-hold decision in AED, see walk-away cash, three market scenarios, and the break-even handover value — all with live DLD comps. Free with a 14-day AssetCentral trial; no card required."
        />

        <p
          className="text-[12px] text-[var(--color-muted)] italic mt-8 leading-[1.5]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Reminder: this is general orientation, not personal tax advice.
          Tax law changes annually. UK rates, allowances and reliefs cited
          here reflect the 2025/26 position as at May 2026 — verify against
          HMRC&rsquo;s current guidance and your own circumstances before
          relying on any figure. Take specifics to a qualified UK tax
          adviser, particularly for CFC / domicile / structuring questions.
        </p>

        <InlineNewsletter />
      </ArticleLayout>
    </>
  );
}
