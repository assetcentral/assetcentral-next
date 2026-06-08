// /partners/apply on the marketing site — the public apply form.
//
// Direct-form pattern (same as /partners/dubai-brokers and
// /free-client-portfolio-review): the form is a client island that POSTs
// to app.assetcentral.ai/api/partner/apply. The submission inserts a
// partner_applications row + fires the welcome + admin alert emails.
//
// No user signup required. At approval time the admin action provisions
// the auth user automatically (or re-uses an existing one if an
// AssetCentral customer already has an account). This removes the
// previous detour where the page sent applicants through /signup first,
// which dumped them into the product dashboard rather than the apply
// form.
//
// Existing AssetCentral customers can still apply from inside the app at
// /dashboard/partner/apply if they prefer — small footnote at the bottom.

import type { Metadata } from "next";
import Link from "next/link";
import { BrokerApplyForm } from "@/components/marketing/BrokerApplyForm";

const TITLE = "Apply to the AssetCentral partner program";
const DESCRIPTION =
  "Earn upfront + recurring commissions by introducing AssetCentral to property owners. Apply in 2 minutes — reviewed within 2 business days.";

const APP_BASE = "https://app.assetcentral.ai";
const IN_APP_APPLY_URL = `${APP_BASE}/dashboard/partner/apply`;

export const metadata: Metadata = {
  title: `${TITLE} | AssetCentral.ai`,
  description: DESCRIPTION,
  alternates: { canonical: "/partners/apply" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    // images inherited from the global app/opengraph-image.tsx
  },
};

const NAVY = "#1a1a2e";

export default function PartnersApplyPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 lg:pt-24 pb-10">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Partner program · Application
          </p>
          <h1
            className="text-[40px] lg:text-[56px] leading-[1.04] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Apply in 2 minutes.
          </h1>
          <p
            className="mt-5 text-[18px] leading-[1.55] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            We review applications within 2 business days. Once approved we
            email you a welcome pack with your unique referral code, three
            ready-to-send client emails, and an introduction to the partner
            portal where you can track every referral and commission in real
            time.
          </p>
        </div>
      </section>

      {/* ── The form ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: NAVY }} className="text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-14 lg:py-20">
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.1] tracking-tight text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tell us about you.
          </h2>
          <p
            className="mt-4 text-[16px] lg:text-[18px] leading-[1.6] text-white/75 text-center max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Two minutes. No account needed — we&rsquo;ll provision one for you
            when we approve.
          </p>
          <BrokerApplyForm
            sourcePage="/partners/apply"
            thanksPath="/partners/apply/thanks"
          />
        </div>
      </section>

      {/* ── What you'll be asked ─────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-12 lg:py-16">
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What happens next.
          </h2>
          <ol
            className="mt-6 space-y-3 text-[15px] leading-[1.65] text-[var(--color-ink)] list-decimal list-outside ml-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <li>
              <strong>You get an immediate confirmation email</strong> with
              two qualifying questions so we can move faster on approval.
            </li>
            <li>
              <strong>We review within 2 business days</strong> — usually
              same-day if you reply with the answers.
            </li>
            <li>
              <strong>Approval triggers a welcome pack</strong> — your unique
              6-character referral code, three ready-to-send client email
              templates with your code already filled in, two WhatsApp
              variants, and your partner portal login.
            </li>
            <li>
              <strong>You start earning</strong> — €100 per Pro client,
              €400 per Team client. Annual signups pay upfront the day the
              client converts; monthly signups accrue as 20% recurring
              across the 12-month window. First monthly payout on the 15th.
            </li>
          </ol>
        </div>
      </section>

      {/* ── Existing-customer escape hatch + read-the-terms footer ─── */}
      <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-10 lg:py-12 text-center space-y-3">
          <p
            className="text-[14px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Already an AssetCentral customer? You can also apply from inside
            the app at{" "}
            <Link
              href={IN_APP_APPLY_URL}
              className="font-mono text-[13px] text-[var(--color-accent)] hover:underline"
            >
              /dashboard/partner/apply
            </Link>{" "}
            — same form, your account already linked.
          </p>
          <p
            className="text-[14px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Want to read the commission structure first?{" "}
            <Link href="/partners" className="text-[var(--color-accent)] hover:underline">
              Back to the partner program page →
            </Link>
          </p>
          <p
            className="text-[12px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Questions before applying?{" "}
            <a href="mailto:partners@assetcentral.ai" className="underline hover:text-[var(--color-ink)]">
              partners@assetcentral.ai
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
