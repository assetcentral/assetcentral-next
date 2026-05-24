import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "mortgage-rules-by-country";
const TITLE =
  "Mortgage rules by country: how the UAE, UK, France, Spain, Portugal, Greece, Germany, and Switzerland differ";
const DESCRIPTION =
  "LTV caps, term limits, transfer taxes, stress tests, and the rules non-residents actually run into. A reference for landlords buying across borders.";

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
              datePublished: "2026-05-21",
              readMins: 11,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, TITLE)) }}
      />
      <StickyCta message="Run any country in 30 seconds. Free mortgage calculator." href="/calculators/mortgage" label="Try the calculator" />

      <ArticleLayout
        slug={SLUG}
        title={TITLE}
        description="The same property, in eight different countries, requires eight different conversations with eight different lenders. Here&rsquo;s what changes."
        date="21 May 2026"
        readMins={11}
        related={[
          { slug: "mortgage-types-explained", title: "Mortgage types explained: fixed, variable, fix-then-revert, repayment, interest-only" },
          { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
          { slug: "off-plan-handover-options", title: "Off-plan handover and you can't complete: four options" },
        ]}
      >
        <p>
          Mortgage rules aren&rsquo;t harmonised. A 75% LTV that&rsquo;s standard in the
          UK is the maximum non-resident loan you&rsquo;ll get in Switzerland. A 25-year
          term that&rsquo;s typical in France becomes a 30-year baseline in Portugal.
          The stamp duty that wipes out 7% of your purchase budget in France barely
          exists in Greece. If you&rsquo;re shopping across borders, the rules are
          where the surprises live.
        </p>

        <p>
          This guide walks through the eight countries the{" "}
          <a href="/calculators/mortgage" className="text-[var(--color-accent)] underline">
            mortgage calculator
          </a>{" "}
          covers — the same eight that account for most of our users&rsquo;
          cross-border portfolios. For each country: the four levers that actually
          determine what you pay (LTV cap, term, rate, transaction costs), plus the
          non-obvious rules that catch first-time buyers in that market.
        </p>

        <H2>The four levers, applied everywhere</H2>

        <p>
          Before going country by country, the framework. Every mortgage decision in
          every country comes down to four numbers:
        </p>

        <ol className="list-decimal pl-6 space-y-1.5">
          <li>
            <strong>Maximum LTV.</strong> What percentage of the property the lender
            will fund. The bigger this is, the smaller the deposit you need — but the
            higher the monthly payment.
          </li>
          <li>
            <strong>Maximum term.</strong> How many years the loan can be amortised
            over. Longer term = lower monthly = more total interest.
          </li>
          <li>
            <strong>Interest rate (and structure).</strong> Whether fixed for the whole
            term, fixed for a period then variable, or variable from day one. See the{" "}
            <a href="/resources/mortgage-types-explained" className="text-[var(--color-accent)] underline">
              mortgage types guide
            </a>{" "}
            for the structure trade-offs.
          </li>
          <li>
            <strong>Transaction costs.</strong> Transfer tax, stamp duty, notary, agent,
            lender fees. Range from ~3% in Greece to ~12% in France. This is the
            sleeper cost most landlords underestimate by half.
          </li>
        </ol>

        <p>
          We&rsquo;ll hit all four on every country below. Numbers are current as of
          mid-2026; rules change so verify with a local broker before committing.
        </p>

        <H2>🇦🇪 United Arab Emirates</H2>

        <p>
          <strong>LTV.</strong> Residents: up to 80% on properties at or below AED 5m,
          70% above. Non-residents: 50% (40% above AED 5m). These are Central Bank caps;
          banks can&rsquo;t lend higher.
        </p>

        <p>
          <strong>Term.</strong> Max 25 years. Max borrower age 65 at maturity for most
          banks (some go to 70).
        </p>

        <p>
          <strong>Rate structure.</strong> Variable (EIBOR-linked) is the default. Most
          products bundle a 1–5 year fixed introductory period before reverting to
          EIBOR + margin. True full-term fixed mortgages are rare.
        </p>

        <p>
          <strong>Transaction costs.</strong> Dubai Land Department transfer fee: 4% of
          the price. Mortgage registration: 0.25% of the loan amount + ~AED 290 admin.
          Agent commission (buyer-side): 2%. Trustee fee: AED 4,000 fixed. Total
          completion costs typically 6–7% of price.
        </p>

        <Callout>
          Non-resident gotcha. The 50% LTV cap means a non-resident buying a
          AED 2m apartment needs AED 1m deposit + ~AED 130k transaction costs. The
          calculator&rsquo;s default load reflects this — AED 2m price, 50% deposit,
          AED 85k+ transfer/agent costs.
        </Callout>

        <H2>🇬🇧 United Kingdom</H2>

        <p>
          <strong>LTV.</strong> Residential: 90–95% for first-time buyers; 85% standard.
          Buy-to-let: 75% typical, some lenders to 80%. Non-resident BTL: usually capped
          at 70%, sometimes 65%.
        </p>

        <p>
          <strong>Term.</strong> Residential up to 40 years. BTL up to 25–30. Max
          borrower age at maturity usually 75 (lender-specific).
        </p>

        <p>
          <strong>Rate structure.</strong> Fix-then-revert is the dominant model:
          2-year, 5-year, or 10-year fix, then reverts to the lender&rsquo;s Standard
          Variable Rate (SVR) which is typically 2–4 percentage points higher than the
          headline fixed rate. Active landlords remortgage 2–3 months before the fix
          ends.
        </p>

        <p>
          <strong>Stress tests.</strong> BTL lenders require rental cover at a stressed
          rate (typically 125–145% of mortgage interest at SVR + 1pt, depending on tax
          status and property type). If the rent doesn&rsquo;t cover the stressed
          payment, you don&rsquo;t get the loan — irrespective of the actual current
          rate.
        </p>

        <p>
          <strong>Transaction costs.</strong> Stamp Duty Land Tax (SDLT) is progressive
          and brutal on additional properties — a 5% surcharge applies across all bands.
          On a £350k investment property the SDLT alone is ~£23k. Plus solicitor
          (£1,500–3,000), survey (£600–1,200), lender arrangement fee (often £999–1,999).
          Total: ~7–9% of price on a BTL.
        </p>

        <H2>🇫🇷 France</H2>

        <p>
          <strong>LTV.</strong> Residents: up to 100% in theory; in practice 85% is the
          comfortable maximum without dipping into specialist lenders.
          Non-residents: 70–80% with French income proof, lower without.
        </p>

        <p>
          <strong>Term.</strong> Max 25 years. Max borrower age at maturity 75. The
          High Council for Financial Stability (HCSF) caps debt-service-to-income at
          35% — enforced strictly. If your existing debts + the new mortgage payment
          exceed 35% of net income, the loan is refused regardless of LTV headroom.
        </p>

        <p>
          <strong>Rate structure.</strong> Long fixed-rate mortgages dominate — 20-year
          and 25-year fixes are normal pricing. The certainty premium is small. Early
          redemption charges (IRA — Indemnité de Remboursement Anticipé) apply if
          you sell or refinance early; capped at 3% of remaining principal or 6 months&rsquo;
          interest.
        </p>

        <p>
          <strong>Transaction costs.</strong> &ldquo;Frais de notaire&rdquo; are
          ~7–8% of price on existing-build (predominantly transfer taxes, not the
          notary&rsquo;s fee). On new-build (VEFA) the figure drops to ~2–3% but
          you pay 20% VAT on the price instead.
        </p>

        <p>
          <strong>Mortgage life insurance.</strong> Assurance emprunteur is effectively
          mandatory and adds 0.2–0.4% per year on top of the headline rate. Comparing
          a French fixed rate to a UK fixed rate without including this is misleading.
        </p>

        <H2>🇪🇸 Spain</H2>

        <p>
          <strong>LTV.</strong> Residents: 80% of purchase or appraised value, whichever
          is lower. Non-residents: 60–70% maximum, depending on lender and proof of
          income.
        </p>

        <p>
          <strong>Term.</strong> Up to 30 years. Max borrower age at maturity 75.
        </p>

        <p>
          <strong>Rate structure.</strong> Historically Euribor + margin was the standard;
          competitive fixed-rate products (20–30 year) now win most new business.
          Discount-then-fixed structures are common.
        </p>

        <p>
          <strong>Transaction costs.</strong> ITP (Impuesto de Transmisiones
          Patrimoniales) on resale ranges 6–10% by autonomous community — Madrid 6%,
          Catalonia 10%, Andalusia 7%. New-build attracts 10% VAT + 1.5% AJD stamp duty
          instead. Plus notary, registry, legal, gestoría — another ~2%. Total: 9–13% of
          price.
        </p>

        <Callout>
          The region-specific tax. ITP varies more between Spanish regions than
          between European countries. A buyer comparing two similarly-priced
          apartments in Barcelona vs Madrid pays ~4% more in tax in Barcelona.
          Worth knowing before you fall in love with a city.
        </Callout>

        <InlineNewsletter />

        <H2>🇵🇹 Portugal</H2>

        <p>
          <strong>LTV.</strong> Residents: up to 90% for own residence, 80% for other.
          Non-residents: 70% typical, occasionally 80%.
        </p>

        <p>
          <strong>Term.</strong> Up to 35 years, but tighter for older borrowers (often
          75 minus your current age, so a 50-year-old maxes at 25 years).
        </p>

        <p>
          <strong>Rate structure.</strong> Traditionally Euribor-linked. Banks now offer
          mixed products: 3, 5, 7, or 10-year fixes then revert to variable. Long
          full-term fixes are uncommon.
        </p>

        <p>
          <strong>Transaction costs.</strong> IMT (Imposto Municipal sobre as Transmissões)
          is progressive. For permanent home: 0% under €92k, then bands at 2% / 5% /
          7% / 8% / 6% / 7.5%. For secondary/investment: bands start at 1% (lower
          floor) but escalate similarly. Plus Imposto do Selo (stamp duty) at 0.8% on
          the price + 0.6% on the mortgage. Notary, registry, legal: ~1%. Total: 6–9%.
        </p>

        <H2>🇬🇷 Greece</H2>

        <p>
          <strong>LTV.</strong> Residents: 80% maximum. Non-residents: 60% in practice,
          often with a requirement to bank locally.
        </p>

        <p>
          <strong>Term.</strong> Up to 30 years. Lending market still narrower than
          pre-2010s — fewer products, more conservative underwriting.
        </p>

        <p>
          <strong>Rate structure.</strong> Predominantly Euribor + margin (variable).
          Short fixes available. Long fixes rare.
        </p>

        <p>
          <strong>Transaction costs.</strong> Transfer tax 3.09% on resale — the lowest
          of any country on this list. New-builds (post-2006 licence) attract 24% VAT
          instead, which essentially makes them only feasible to buy if you can recover
          the VAT (commercial activity). Plus notary (~1.5–2%), legal (~1%), agent
          commission (~2% buyer-side), and registration fees. Total: 7–9% for resale.
        </p>

        <p>
          <strong>Mandatory lawyer + engineer.</strong> Greek purchase contracts require
          a lawyer; an engineering survey is technically optional but strongly advised
          (illegal additions and planning anomalies are common). Budget €2,000–4,000
          for both combined.
        </p>

        <H2>🇩🇪 Germany</H2>

        <p>
          <strong>LTV.</strong> Residents: up to 80% (occasionally 90% with very strong
          income). Non-residents: typically 60%, sometimes 70% with German income.
        </p>

        <p>
          <strong>Term.</strong> Up to 35 years.
        </p>

        <p>
          <strong>Rate structure.</strong> Long Zinsbindung (fixed-rate period) is the
          German default — 10, 15, 20, even 30 years. The Tilgung (annual amortisation
          rate, separate from the interest rate) is negotiated upfront — typically 2–3%
          of the original loan, meaning the loan amortises slowly. Most borrowers
          remortgage at the end of the Zinsbindung period.
        </p>

        <p>
          <strong>Transaction costs.</strong> Grunderwerbsteuer (transfer tax) varies
          by Bundesland: 3.5% (Bayern, Sachsen) up to 6.5% (NRW, Schleswig-Holstein,
          Saarland). Notary + Grundbuch (land registry): 1.5–2%. Buyer-side agent
          commission: 1.78–3.57% by region (Provisionsteilung — shared with seller
          since 2020). Total: 7–12%.
        </p>

        <H2>🇨🇭 Switzerland</H2>

        <p>
          <strong>LTV.</strong> Residents: 80% maximum, with at least 10% of the
          purchase price from non-pension equity (the other 10% can come from pillar 2
          pension). Non-residents: 50–60%, subject to Lex Koller restrictions on
          foreign ownership of holiday homes.
        </p>

        <p>
          <strong>Mandatory amortisation.</strong> Any loan above 66.6% LTV must be
          amortised down to 66.6% within 15 years. So a borrower at 80% LTV has to make
          additional principal payments (above the standard amortisation) over the
          first 15 years.
        </p>

        <p>
          <strong>Affordability stress test.</strong> Imputed mortgage payment +
          maintenance must not exceed 33% of gross income — at a stress rate of ~5%,
          not the actual market rate. Swiss banks reject mortgages routinely on
          affordability grounds even when LTV is fine.
        </p>

        <p>
          <strong>Rate structure.</strong> Long-term fixed (10, 15-year) competitively
          priced vs SARON-linked products. Mix of fixed + flex tranches common — split
          a CHF 1m loan into 60% fixed for 10 yrs, 40% on SARON, for example.
        </p>

        <p>
          <strong>Transaction costs.</strong> Vary significantly by canton. Transfer tax
          + notary + registry: 2.5–4% combined. Geneva and Vaud at the high end;
          Zurich and Schwyz lower.
        </p>

        <H2>Cross-border patterns: what changes when you cross a border</H2>

        <p>
          A few generalisations that hold up across these eight markets:
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Non-resident LTV is always lower.</strong> Expect a 10–25 percentage
            point haircut on max LTV when you&rsquo;re not a tax resident. Plan for it
            in your deposit calculation.
          </li>
          <li>
            <strong>Transaction costs are bigger than you think.</strong> The minimum is
            ~5% (Greece resale), the maximum is ~13% (Spanish region + new-build VAT
            combinations). Most landlords underestimate by 30–50% on first cross-border
            purchases.
          </li>
          <li>
            <strong>Stress tests bite differently.</strong> UK BTL applies a rental cover
            ratio. France applies a household DTI cap. Switzerland applies an income
            cap at a stressed rate. Knowing which stress test your lender will apply is
            often more important than the headline rate.
          </li>
          <li>
            <strong>Currency exposure matters.</strong> Borrowing in EUR to buy a Greek
            property when your income is in AED creates a currency-mismatch risk that
            doesn&rsquo;t show up on the mortgage application. Multi-currency portfolios
            need a deliberate position on this.
          </li>
          <li>
            <strong>Local equivalents are not always actually local.</strong> Some
            international banks (HSBC, BNP Paribas, Banco Santander) offer mortgages in
            multiple countries to existing private-banking clients, sometimes
            cross-collateralised. This can occasionally beat the local market — worth
            asking if you already have a relationship.
          </li>
        </ol>

        <H2>What to bring to your first conversation with a lender</H2>

        <p>
          Whatever the country, the documents are remarkably similar:
        </p>

        <ul className="list-disc pl-6 space-y-1.5">
          <li>Passport + visa / residency status proof</li>
          <li>Last 6 months bank statements (all accounts, all currencies)</li>
          <li>Last 2 tax returns + 3 months payslips (or 2 years of accounts if self-employed)</li>
          <li>Property details: address, agreed price, type, square metres, any agreed conditions</li>
          <li>Source of funds declaration for the deposit (AML)</li>
          <li>Global asset declaration (mortgages, investments, other property) — increasingly required cross-border</li>
        </ul>

        <p>
          Allow 6–8 weeks from first contact to mortgage offer; another 4–6 weeks to
          drawdown. Cross-border applications take longer — the lender will request
          translations and notarisations you didn&rsquo;t expect.
        </p>

        <CtaBox
          href="/calculators/mortgage"
          label="Run your country in the calculator"
          blurb="All eight countries above are pre-loaded with their LTV caps, transfer taxes, and rate structure. Switch country, set price + deposit, and the calculator shows your monthly payment, cash needed at completion, and warnings if you&rsquo;re exceeding local rules."
        />

        <InlineNewsletter />
      </ArticleLayout>
    </>
  );
}
