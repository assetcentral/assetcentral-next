import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service | AssetCentral",
  description:
    "AssetCentral terms of service. Plain-English terms covering accounts, subscriptions, data, and liability. Governed by the laws of the United Arab Emirates.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="19 May 2026">
      <div className="rounded-lg border-l-4 border-[var(--color-warning)] bg-amber-50 px-5 py-4 text-[14.5px] leading-[1.55] text-amber-900">
        <strong>Important — not financial, tax, legal, or investment advice.</strong>{" "}
        AssetCentral is a software service for tracking and analysing property
        portfolios. Calculators, dashboards, recommendations, reports, sell-vs-hold
        models, refinancing packs, and any other output produced by the Service are
        informational only. They are not financial advice, tax advice, legal advice,
        accounting advice, mortgage advice, or investment advice; they are not a
        recommendation to buy, sell, refinance, or hold any property; and they are
        not regulated financial services. Always consult a qualified, licensed
        adviser in your jurisdiction before making any property, tax, or financing
        decision. You are solely responsible for your decisions and their outcomes.
      </div>

      <p>
        These terms (&ldquo;Terms&rdquo;) govern your use of AssetCentral (the
        &ldquo;Service&rdquo;) operated by <strong>LOMOND CONSULTING FZE</strong>
        {" "}(&ldquo;we&rdquo;, &ldquo;us&rdquo;). By creating an account or otherwise
        using the Service, you agree to these Terms.
      </p>

      <p>
        <strong>Operator details.</strong>
        <br />
        LOMOND CONSULTING FZE
        <br />
        P.O. Box 38984, 8th Floor, RAKFTZ Business Centre 4
        <br />
        Ras Al Khaimah, United Arab Emirates
        <br />
        TRN: 100044129300003
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>1. The Service</h2>
      <p>
        AssetCentral is a software service for tracking and analysing a private
        property portfolio. Outputs are informational — see the disclaimer at the
        top of this page. We make no guarantees about specific yields, valuations,
        market movements, financing outcomes, or any other future event. Numbers
        produced by the Service rely on the inputs you (or third parties) provide;
        they are estimates and assumptions, not certified valuations or audited
        accounts.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>2. Accounts</h2>
      <p>
        You must be 18+ to create an account. You are responsible for keeping your
        login credentials secure and for activity on your account. Notify us
        promptly if you believe your account has been compromised.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>3. Subscriptions and billing</h2>
      <p>
        Paid plans (Pro, Team, Enterprise) renew automatically until cancelled. You
        can cancel at any time from your billing settings; cancellation takes effect
        at the end of the current billing period. We do not pro-rate refunds for
        partial periods, but no further charges will be made.
      </p>
      <p>
        Subscriptions are billed in the currency you select at checkout (EUR, USD,
        GBP, or AED). Prices are market-specific and are not pure FX conversions —
        the price you see in your selected currency is the price you pay. UAE
        customers are billed inclusive of 5% VAT. Other locations are billed in
        accordance with applicable tax rules. The 14-day free trial converts to a
        paid subscription only if you add payment details before it ends.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>4. Acceptable use</h2>
      <p>
        Don&rsquo;t attempt to reverse-engineer or disrupt the Service. Don&rsquo;t
        upload material that infringes third-party rights, contains malware, or is
        unrelated to property portfolio management. Don&rsquo;t use AssetCentral to
        provide regulated financial, tax, legal, or investment advice to third
        parties.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>5. Your data</h2>
      <p>
        You own the data you put into AssetCentral. You grant us a limited licence
        to store, process, and display it for the sole purpose of operating the
        Service for you. We do not use your data to train models. See our{" "}
        <a href="/privacy" className="text-[var(--color-accent)] underline">
          Privacy Policy
        </a>{" "}
        for details.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>6. Availability</h2>
      <p>
        We aim for high availability but do not guarantee uninterrupted access.
        Scheduled maintenance will be announced in advance where practical. We are
        not liable for third-party outages (hosting, payments, AI providers, etc.).
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, our total liability arising from
        your use of the Service is limited to the amount you have paid us in the 12
        months preceding the claim. We are not liable for indirect or consequential
        losses, including loss of profits, missed opportunities, tax penalties,
        property valuation movements, or any consequence of acting (or failing to
        act) on information produced by the Service.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>8. Changes to the Service or these Terms</h2>
      <p>
        We may update features, pricing, or these Terms. Material changes will be
        notified by email at least 30 days in advance. Continued use after the
        effective date constitutes acceptance.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>9. Termination</h2>
      <p>
        You can delete your account at any time. We may suspend or terminate
        accounts that breach these Terms, with notice where practical.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>10. Governing law and jurisdiction</h2>
      <p>
        These Terms are governed by the laws of the <strong>United Arab Emirates</strong>,
        and specifically the laws applicable in the Emirate of Ras Al Khaimah and
        the Ras Al Khaimah Free Trade Zone. Any dispute arising out of or in
        connection with these Terms or your use of the Service is subject to the
        exclusive jurisdiction of the competent courts of the UAE, save where
        applicable mandatory consumer law in your country of residence gives you
        non-waivable rights to bring proceedings locally.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>11. Contact</h2>
      <p>
        Questions:{" "}
        <a href="mailto:hello@assetcentral.ai" className="text-[var(--color-accent)] underline">
          hello@assetcentral.ai
        </a>
        .
      </p>
    </LegalLayout>
  );
}
