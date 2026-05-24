import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "net-yield-vs-gross-yield";
const TITLE = "Gross yield vs net yield — and why it matters more than you think";
const DESCRIPTION =
  "A 7% gross yield can turn into a 3.8% net yield once costs are honest. Here is exactly how, with a worked Dubai apartment example.";

export const metadata: Metadata = {
  title: `${TITLE} | AssetCentral`,
  description:
    "Why gross yield is misleading, how to calculate real net yield step by step, and a worked Dubai example showing 7% gross becomes 3.8% net.",
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
              readMins: 7,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, TITLE)) }}
      />
      <StickyCta message="See your real net yield in 5 minutes. Free for 14 days." />
    <ArticleLayout
      slug={SLUG}
      title="Gross yield vs net yield — and why it matters more than you think"
      description="A 7% gross yield can turn into a 3.8% net yield once costs are honest. Here is exactly how, with a worked Dubai apartment example."
      date="19 May 2026"
      readMins={7}
      related={[
        { slug: "mortgage-types-explained", title: "Mortgage types explained: fixed, variable, fix-then-revert, repayment, interest-only" },
        { slug: "mortgage-rules-by-country", title: "Mortgage rules by country: how the UAE, UK, France, Spain, Portugal, Greece, Germany, and Switzerland differ" },
        { slug: "str-operator-performance-check", title: "Is your STR operator earning their 25%?" },
        { slug: "off-plan-handover-options", title: "Off-plan handover and you can't complete: four options" },
      ]}
    >
      <p>
        Ask a landlord what their property earns and you will usually get a gross-yield answer. &ldquo;The Dubai apartment is yielding 7%.&rdquo; &ldquo;The Athens place gives me 5%.&rdquo; These numbers are the rent divided by the property&rsquo;s value, and they are what every property listing site, agent, and developer leads with. They are also almost completely useless for making investment decisions.
      </p>
      <p>
        Net yield — what the property actually earns after everything that has to be paid — is usually 30% to 50% lower than gross. The gap is where most landlords lose money without realising it.
      </p>

      <H2>What gross yield includes — and what it ignores</H2>
      <p>
        Gross yield is the simplest possible calculation. Take the annual rent, divide by the property&rsquo;s value, multiply by 100.
      </p>
      <p>
        For a Dubai Marina apartment bought for AED 1.6 million and rented at AED 9,500 per month, gross yield is:
      </p>
      <Callout>
        AED 9,500 × 12 = AED 114,000 annual rent<br />
        AED 114,000 ÷ AED 1,600,000 = 7.1% gross yield
      </Callout>
      <p>
        That 7% looks healthy. It is also fiction. The property does not earn AED 114,000 a year. It generates AED 114,000 in rent, then pays the following things out, in roughly this order.
      </p>

      <H2>The five costs that turn 7% into something else</H2>
      <p>
        <strong>Vacancy.</strong> Even a desirable Dubai apartment sits empty during tenancy transitions. Industry data suggests 4–6 weeks per year is realistic in a competitive submarket. At 5 weeks vacant, you lose roughly AED 11,000 in rent — about 10% of gross.
      </p>
      <p>
        <strong>Management and agency fees.</strong> A long-term property manager typically charges 5% of collected rent plus tenant-find fees that average to another 2% annualised. An STR operator charges 20–30%. For a long-let, AED 7,000 is a reasonable annual figure.
      </p>
      <p>
        <strong>Service charge.</strong> The building&rsquo;s annual maintenance bill. Dubai Marina towers typically charge AED 16–22 per square foot. A 900 sqft apartment runs roughly AED 16,000 per year. This is not optional, and it is not deductible from gross yield.
      </p>
      <p>
        <strong>Repairs and replacements.</strong> Air-conditioning servicing, kitchen appliances that fail, occasional plumbing. Plan for AED 4,000 per year as a baseline. More for older buildings.
      </p>
      <p>
        <strong>Mortgage interest.</strong> If the property is leveraged, the interest portion of your monthly payment is a real cost. (The principal portion is not a yield cost — it is equity building — but it does affect cashflow.) On a 65% LTV mortgage at 4.5%, year-one interest is roughly AED 47,000.
      </p>

      <H2>The worked example, with the real number at the end</H2>
      <Callout>
        Gross rent (12 × AED 9,500) — AED 114,000<br />
        Less vacancy (5 weeks) — −AED 11,000<br />
        Less management (5% + tenant-find) — −AED 7,000<br />
        Less service charge — −AED 16,000<br />
        Less repairs — −AED 4,000<br />
        Less mortgage interest (yr 1) — −AED 47,000<br />
        Less Dubai income tax (rent is technically taxable; assume 0 here) — −AED 0<br />
        <br />
        Net cashflow — <strong>AED 29,000</strong><br />
        Net yield on full price — <strong>1.8%</strong><br />
        Net yield on equity (your deposit + costs ≈ AED 600,000) — <strong>4.8%</strong>
      </Callout>
      <p>
        Two numbers come out of this — net yield on full property value, and net yield on the equity you actually have invested (sometimes called cash-on-cash). Both are legitimate. Most institutional investors look at both. Most private landlords look at neither.
      </p>

      <InlineNewsletter />

      <H2>Why the gap matters</H2>
      <p>
        A landlord who genuinely believes their portfolio is yielding 7% is making decisions on the wrong number. They may turn down a refinancing offer that improves cash-on-cash from 4.8% to 6.5%. They may accept a 25% STR commission they would push back on if they could see what was left after it. They may keep an Athens apartment with negative monthly cashflow because the gross number looks reasonable on paper.
      </p>
      <p>
        The difference between gross and net is also the difference between a comparable property in two different markets. A 5% gross yield in a low-service-charge French market can produce a higher net yield than a 7% gross yield in Dubai. Comparing gross-to-gross misses the point.
      </p>

      <H2>The simple rule</H2>
      <p>
        When you hear a yield number, ask which version. If the answer is &ldquo;gross&rdquo;, mentally take 30–50% off the top before deciding what to do with it. If the answer is &ldquo;net&rdquo;, ask what costs were included. Most importantly: do the calculation on your own properties at least once a year. The first time most landlords do it, the result is uncomfortable. That discomfort is the whole point.
      </p>

      <CtaBox
        href="/calculators/irr"
        label="Use the IRR calculator"
        blurb="Want to see your real net yield for a specific property? Run it through the IRR calculator — it includes all the costs above and computes net yield, cash-on-cash, and IRR over your hold period."
      />

      <InlineNewsletter />
    </ArticleLayout>
    </>
  );
}
