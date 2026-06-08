"use client";

// Broker partner application form — posts to the AssetCentral app's public
// /api/partner/apply endpoint, which:
//   1. Inserts the row into public.partner_applications (service-role)
//   2. Emails the applicant a welcome with the qualifying questions
//   3. Emails partners@assetcentral.ai a triage alert
//
// Replaces the previous Netlify Forms submission (which only emailed the
// admin and never reached the database).
//
// CORS: the API route on app.assetcentral.ai whitelists assetcentral.ai
// as an allowed origin. The OPTIONS preflight is handled there.
//
// Honeypot: the hidden `_gotcha` field is checked server-side — bots that
// fill every visible input get a 200 with no DB write.
//
// Statically rendered host page: this is a client island. The page stays
// in static export; only this island hydrates.

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#4f6ef7";

// Hard-code the API endpoint rather than an env var. The marketing site is
// statically exported, so a missing NEXT_PUBLIC_APP_URL at build time would
// silently break submissions. The app domain is stable.
const APPLY_ENDPOINT = "https://app.assetcentral.ai/api/partner/apply";

interface BrokerApplyFormProps {
  /** Used by the API to record which landing page produced the application
   *  (so admin triage shows the source). E.g. "/partners/dubai-brokers". */
  sourcePage: string;
  /** Where to redirect on successful submit. The /thanks page fires the
   *  Google Ads conversion pixel. */
  thanksPath: string;
}

interface FormState {
  first_name: string;
  last_name: string;
  agency: string;
  email: string;
  phone: string;
  client_count: string;
  client_profile: string;
  partner_type: string;
  message: string;
}

const EMPTY: FormState = {
  first_name: "",
  last_name: "",
  agency: "",
  email: "",
  phone: "",
  client_count: "",
  client_profile: "",
  partner_type: "",
  message: "",
};

export function BrokerApplyForm({ sourcePage, thanksPath }: BrokerApplyFormProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [values, setValues] = useState<FormState>(EMPTY);
  // Honeypot — bots tend to fill every input. We mirror this server-side
  // and silently 200 if non-empty; here we just keep the value in state.
  const [gotcha, setGotcha] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(APPLY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source_page: sourcePage,
          _gotcha: gotcha,
        }),
      });

      if (!res.ok) {
        // Try to read a structured error; fall back to a generic one.
        let msg = "Something went wrong. Please try again.";
        try {
          const body = (await res.json()) as { error?: string };
          if (body?.error) msg = body.error;
        } catch {
          // ignore parse failure
        }
        setError(msg);
        setSubmitting(false);
        return;
      }

      // Success — route to thanks. Use startTransition so the redirect
      // doesn't block the loading-state UI while Next.js navigates.
      startTransition(() => {
        router.push(thanksPath);
      });
    } catch (err) {
      console.error("[broker-apply-form] submit failed", err);
      setError(
        "Couldn’t reach our servers. Check your connection and try again, or email partners@assetcentral.ai.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mt-10 rounded-2xl bg-white text-gray-900 p-6 sm:p-8 shadow-2xl"
    >
      {/* Honeypot — visually hidden, real users never see or fill this. */}
      <p
        aria-hidden
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label>
          Don&rsquo;t fill this out:{" "}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={gotcha}
            onChange={(e) => setGotcha(e.target.value)}
          />
        </label>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="First name"
          name="first_name"
          required
          value={values.first_name}
          onChange={(v) => update("first_name", v)}
        />
        <Field
          label="Last name"
          name="last_name"
          required
          value={values.last_name}
          onChange={(v) => update("last_name", v)}
        />
        <Field
          label="Agency name"
          name="agency"
          colSpan="full"
          value={values.agency}
          onChange={(v) => update("agency", v)}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={(v) => update("email", v)}
        />
        <Field
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(v) => update("phone", v)}
        />
        <Field
          label="Number of investor clients (approx.)"
          name="client_count"
          colSpan="full"
          value={values.client_count}
          onChange={(v) => update("client_count", v)}
        />
        <Field
          label="Typical client profile"
          name="client_profile"
          placeholder="e.g. Dubai Marina owners, expat investors, off-plan portfolios..."
          colSpan="full"
          value={values.client_profile}
          onChange={(v) => update("client_profile", v)}
        />
        <div className="sm:col-span-2">
          <label
            htmlFor="partner_type"
            className="block text-[13px] text-gray-700 mb-1.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Interested in <span className="text-[#dc2626]"> *</span>
          </label>
          <select
            id="partner_type"
            name="partner_type"
            required
            value={values.partner_type}
            onChange={(e) => update("partner_type", e.target.value)}
            className="w-full min-h-[44px] rounded-md border border-gray-300 px-3 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/40 focus:border-[#4f6ef7]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <option value="" disabled>
              Choose a partner model
            </option>
            <option value="referral">Referral Partner</option>
            <option value="agency">Agency Partner</option>
            <option value="portfolio_review">Portfolio Review Partner</option>
            <option value="strategic">Strategic Partner</option>
            <option value="not_sure">Not sure yet — open to a conversation</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-[13px] text-gray-700 mb-1.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Anything else? (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Anything we should know about you or your clients."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/40 focus:border-[#4f6ef7]"
            style={{ fontFamily: "var(--font-sans)" }}
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-md border border-[#dc2626]/30 bg-[#dc2626]/5 px-4 py-3 text-[13.5px] text-[#7f1d1d]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <p
          className="text-[12px] text-gray-500"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Subject to partner terms. We&rsquo;ll reply within 2 business days.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center min-h-[52px] rounded-md text-white px-8 text-[15px] font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: ACCENT, fontFamily: "var(--font-sans)" }}
        >
          {submitting ? "Submitting…" : "Apply to become a partner"}
        </button>
      </div>
    </form>
  );
}

// ── Field helper ────────────────────────────────────────────────────────

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  colSpan,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  colSpan?: "full";
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className={colSpan === "full" ? "sm:col-span-2" : ""}>
      <label
        htmlFor={name}
        className="block text-[13px] text-gray-700 mb-1.5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
        {required && <span className="text-[#dc2626]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[44px] rounded-md border border-gray-300 px-3 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/40 focus:border-[#4f6ef7]"
        style={{ fontFamily: "var(--font-sans)" }}
      />
    </div>
  );
}
