import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | AssetCentral",
  description:
    "How AssetCentral collects, stores, and uses your personal data. Plain-English privacy policy, EU-compliant.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="19 May 2026">
      <p>
        AssetCentral (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by
        <strong> LOMOND CONSULTING FZE</strong>, P.O. Box 38984, 8th Floor, RAKFTZ
        Business Centre 4, Ras Al Khaimah, United Arab Emirates (TRN: 100044129300003).
        We operate the portfolio management service at{" "}
        <strong>assetcentral.ai</strong>. This policy explains what data we collect,
        why, where it lives, and what you can do about it. It is written to be
        understood without a lawyer.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>1. The data we hold about you</h2>
      <p>
        We hold the following categories of personal data:
      </p>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>
          <strong>Account data</strong> — name, email, hashed password, country of residence,
          base reporting currency, billing details.
        </li>
        <li>
          <strong>Portfolio data</strong> — properties you add, financial figures, loans,
          tenancies, documents you upload, and any documents you forward to us by email,
          WhatsApp, or file upload. This data is yours.
        </li>
        <li>
          <strong>Usage data</strong> — pages visited, features used, errors encountered. We
          use Plausible Analytics, a privacy-first product that does not use cookies or
          collect personal data.
        </li>
      </ul>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>2. Why we hold it</h2>
      <p>
        Account and portfolio data are required to operate the service. Usage data helps us
        improve the product and detect security issues. We do not sell, share, or rent
        personal data to anyone for marketing purposes. We do not run advertising on the
        service.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>3. AI document processing</h2>
      <p>
        When you forward a document (statement, invoice, contract) to AssetCentral, we send
        the contents to a large-language-model provider to extract structured data
        (amounts, dates, parties). The provider is contractually prohibited from training on
        your data. Extracted fields are stored against your portfolio; the original
        document remains in your private document vault and can be deleted at any time.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>4. Where your data lives</h2>
      <p>
        Application and database servers run in EU and UAE regions. Document storage is
        in the same regions. Backups are encrypted at rest and retained for 30 days. All
        traffic to and from AssetCentral is encrypted in transit (TLS 1.2+).
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>5. Your rights</h2>
      <p>
        You have the right to access, correct, delete, export, or restrict processing
        of your personal data. EU/EEA and UK residents have these rights under the
        GDPR; UAE residents have equivalent rights under the UAE Federal Decree-Law No.
        45 of 2021 (Personal Data Protection Law). Most are self-service inside the
        product. For anything else, email{" "}
        <a href="mailto:privacy@assetcentral.ai" className="text-[var(--color-accent)] underline">
          privacy@assetcentral.ai
        </a>
        . We respond within 30 days.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>6. Data retention</h2>
      <p>
        Active accounts: data is kept while you use the service. After cancellation, data
        is retained for 90 days so you can reactivate, then deleted. Billing records are
        retained for the period required by tax law (typically 6–10 years).
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>7. Sub-processors</h2>
      <p>
        We use a small number of vetted sub-processors to operate AssetCentral, including a
        hosting provider, a database provider, an email-sending provider, a payments
        processor, and an LLM provider. A current list is available on request.
      </p>

      <h2 className="text-[22px] text-[var(--color-navy)] mt-10 mb-2 font-semibold" style={{ fontFamily: "var(--font-display)" }}>8. Data controller and contact</h2>
      <p>
        The data controller is LOMOND CONSULTING FZE, P.O. Box 38984, 8th Floor,
        RAKFTZ Business Centre 4, Ras Al Khaimah, United Arab Emirates. For privacy
        questions, complaints, or data-protection requests:{" "}
        <a href="mailto:privacy@assetcentral.ai" className="text-[var(--color-accent)] underline">
          privacy@assetcentral.ai
        </a>
        .
      </p>
    </LegalLayout>
  );
}
