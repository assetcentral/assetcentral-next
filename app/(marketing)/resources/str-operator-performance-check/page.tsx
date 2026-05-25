import type { Metadata } from "next";
import { ArticleLayout, Callout, CtaBox, H2 } from "@/components/marketing/ArticleLayout";
import { InlineNewsletter } from "@/components/marketing/InlineNewsletter";
import { StickyCta } from "@/components/marketing/StickyCta";
import { articleBreadcrumb, articleSchema } from "@/lib/schema";

const SLUG = "str-operator-performance-check";
const TITLE = "Is your STR operator earning their 25%?";
const DESCRIPTION =
  "How short-term rental operators charge, what you should expect for the commission, how to read their statement, and three questions to ask before renewing.";

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
              datePublished: "2026-05-19",
              readMins: 6,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumb(SLUG, TITLE)) }}
      />
      <StickyCta message="Verify operator statements automatically. Free for 14 days." />
    <ArticleLayout
      slug={SLUG}
      title="Is your STR operator earning their 25%?"
      description="How short-term rental operators charge, what you should actually get for the commission, and three questions to ask before the next renewal."
      date="19 May 2026"
      readMins={6}
      related={[
        { slug: "mortgage-types-explained", title: "Mortgage types explained: fixed, variable, fix-then-revert, repayment, interest-only" },
        { slug: "mortgage-rules-by-country", title: "Mortgage rules by country: how the UAE, UK, France, Spain, Portugal, Greece, Germany, and Switzerland differ" },
        { slug: "net-yield-vs-gross-yield", title: "Gross yield vs net yield — and why it matters more than you think" },
        { slug: "off-plan-handover-options", title: "Off-plan handover and you can't complete: four options" },
      ]}
    >
      <p>
        25% is the headline number. It is what STR operators across Dubai, Lisbon, Athens, and parts of southern Spain charge to manage your short-term rental: listing, guest comms, cleaning coordination, dynamic pricing, channel management. Some charge less (18–22% in competitive markets); some charge more (30%+ in luxury segments). In all cases the question is the same: are you getting your money&rsquo;s worth?
      </p>
      <p>
        Most owners cannot answer this. They see what hits their bank account, divide by what they thought the apartment could earn, and conclude things are roughly fine. They are not always wrong. They are not always right either. Here is how to actually check.
      </p>

      <H2>What you are paying for, in plain English</H2>
      <p>
        A serious STR operator does five things:
      </p>
      <ul className="list-disc pl-6 space-y-1.5">
        <li><strong>Listing and channel management.</strong> Your apartment appears on Airbnb, Booking.com, VRBO, and sometimes direct-booking sites. They manage the calendar across all of them so you don&rsquo;t double-book.</li>
        <li><strong>Dynamic pricing.</strong> Daily-rate adjustments based on demand. A competent operator&rsquo;s pricing should beat a fixed manual rate by 8–15% on annual revenue.</li>
        <li><strong>Guest communication.</strong> 24-hour inquiry response, check-in coordination, complaint handling.</li>
        <li><strong>Cleaning and turnover.</strong> Booking cleaners between stays, restocking consumables, dealing with damage.</li>
        <li><strong>Reporting.</strong> Monthly statement showing bookings, revenue, deductions, and payout to you.</li>
      </ul>
      <p>
        For 25% of gross revenue, all five should be present and the dynamic pricing should be active — not a fixed rate. That last one matters a lot. An operator charging 25% but pricing manually is essentially being paid for cleaning coordination and inbox-watching, which is not 25% of value.
      </p>

      <H2>How to read the monthly statement</H2>
      <p>
        Most STR operator statements look like this:
      </p>
      <Callout>
        Property: Dubai Marina Apt 2 — March 2026<br />
        Nights booked: 22 of 31 (71% occupancy)<br />
        Gross revenue: AED 12,800<br />
        Operator commission (25%): −AED 3,200<br />
        Cleaning (5 stays × AED 180): −AED 900<br />
        Net to owner: AED 8,700
      </Callout>
      <p>
        Three things to check on every statement.
      </p>
      <p>
        <strong>Occupancy vs the local market.</strong> 71% is high for some markets, low for others. Check AirDNA or the operator&rsquo;s own dashboard: what was the market occupancy for comparable units in that month? If you are 8+ points below market, the listing has a problem — bad photos, wrong description, mispriced, or weak review history.
      </p>
      <p>
        <strong>Average daily rate (ADR).</strong> Gross revenue divided by nights booked. In the example above, AED 582 per night. Is that consistent with similar-sized, similar-location units in March (a peak month in Dubai)? If your ADR is 10%+ below comparable units, the dynamic pricing isn&rsquo;t working.
      </p>
      <p>
        <strong>Effective commission rate.</strong> Add operator commission and cleaning, divide by gross revenue. In the example, (3,200 + 900) ÷ 12,800 = 32%. That is the real cost of the agency relationship. Some operators present a low headline commission and then load up the cleaning fee. Check both lines.
      </p>

      <InlineNewsletter />

      <H2>The three questions to ask</H2>
      <p>
        Ask these on a call before your contract renews:
      </p>
      <ol className="list-decimal pl-6 space-y-1.5">
        <li>&ldquo;What occupancy and ADR did similar units in this building or neighbourhood do this year? Can you send me your benchmarking data?&rdquo; A serious operator has this and will share it.</li>
        <li>&ldquo;What pricing tool are you using, and can I see how my rates changed week by week last month?&rdquo; If they hesitate, the dynamic pricing is not real.</li>
        <li>&ldquo;What is your average response time to guest inquiries, measured by your channel?&rdquo; Airbnb and Booking.com both track this. A good operator responds in under 1 hour. Operators with longer response times rank lower in search and lose bookings.</li>
      </ol>

      <H2>When to consider switching, or self-managing parts</H2>
      <p>
        Two clear signals that something needs to change:
      </p>
      <p>
        <strong>Occupancy is persistently 10+ points below market</strong> and the operator can&rsquo;t explain why. The listing is mispositioned or the pricing is wrong. Either fix it within 60 days or change operator.
      </p>
      <p>
        <strong>You are paying 25%+ effective commission for a 1-bedroom apartment doing AED 100k+ gross annually.</strong> That is AED 25k a year going to the operator. For that money you can hire a virtual assistant for guest comms, set up Airbnb&rsquo;s own pricing tool, and pay cleaners directly. Self-management of a single high-revenue unit is a 5–8 hours per month commitment that can save AED 15k+ annually.
      </p>
      <p>
        Self-managing a portfolio of three or more STR units is a part-time job. Most owners either accept the agency cost or eventually stop doing STR. The middle path — self-manage the highest-revenue unit, agency the rest — is rarely considered but often optimal.
      </p>

      <H2>The honest version</H2>
      <p>
        Good STR operators are worth 25%. They run the listing professionally, price dynamically, handle the messy operational work, and deliver more net revenue to you than you would get self-managing. Bad ones charge 25% to forward emails and outsource cleaning. The only way to tell which one you have is to check.
      </p>

      <CtaBox
        href="/calculators/str-yield"
        label="Use the STR yield calculator"
        blurb="Want to model whether self-managing a specific unit beats the agency? Run the STR Yield calculator with your real numbers."
      />

      <InlineNewsletter />
    </ArticleLayout>
    </>
  );
}
