"use client";

// Free client portfolio review form — submitted from
// /free-client-portfolio-review (secondary landing for the Dubai brokers
// Google Ads campaign). Posts the same /api/partner/apply endpoint as the
// main BrokerApplyForm so every broker-program lead lands in the same
// admin triage queue, with partner_type='portfolio_review' so the founder
// can distinguish which page they came from.
//
// Mapping from form fields → partner_applications:
//
//   broker_name              first_name + last_name (split on first space)
//   agency                   agency
//   email                    email
//   phone                    phone
//   partner_type             'portfolio_review' (hard-coded)
//   client_property_count    client_count
//   client_name + area       client_profile (concatenated short summary)
//   documents + message      message (concatenated long-form)
//   source_page              '/free-client-portfolio-review'
//
// Replaces the previous raw <form data-netlify="true"> which only emailed
// the founder and never reached the database — the source of "form email
// received but new partner missing".

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#4f6ef7";

const APPLY_ENDPOINT = "https://app.assetcentral.ai/api/partner/apply";

const DOCUMENT_OPTIONS = [
  "Tenancy contract(s)",
  "Mortgage statement",
  "Service charge invoices",
  "Rent receipts",
  "Operator reports",
  "None — manual entry",
];

interface Props {
  /** Where to redirect on successful submit. Same path the original form
   *  used so the existing thanks page + Google Ads conversion pixel
   *  continue to work. */
  thanksPath: string;
}

interface FormState {
  broker_name: string;
  agency: string;
  email: string;
  phone: string;
  client_name: string;
  client_property_count: string;
  client_area: string;
  message: string;
}

const EMPTY: FormState = {
  broker_name: "",
  agency: "",
  email: "",
  phone: "",
  client_name: "",
  client_property_count: "",
  client_area: "",
  message: "",
};

/** Split a "First Middle Last" into a first/last pair. We grab the first
 *  whitespace-delimited token as first_name and everything after as
 *  last_name. Single-name submissions get last_name="—" so the DB's NOT
 *  NULL constraint doesn't reject the row. */
function splitName(full: string): { first: string; last: string } {
  const trimmed = full.trim().replace(/\s+/g, " ");
  if (!trimmed) return { first: "", last: "" };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { first: trimmed, last: "—" };
  return {
    first: trimmed.slice(0, idx),
    last: trimmed.slice(idx + 1),
  };
}

function buildClientProfile(
  clientName: string,
  area: string,
  propertyCount: string,
): string {
  const pieces: string[] = [];
  if (clientName.trim()) pieces.push(clientName.trim());
  if (propertyCount.trim()) pieces.push(propertyCount.trim());
  if (area.trim()) pieces.push(area.trim());
  return pieces.join(" · ");
}

function buildMessage(documents: string[], freeText: string): string {
  const parts: string[] = [];
  if (documents.length > 0) {
    parts.push(`Documents available:\n- ${documents.join("\n- ")}`);
  }
  if (freeText.trim()) {
    parts.push(freeText.trim());
  }
  return parts.join("\n\n");
}

export function FreePortfolioReviewForm({ thanksPath }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [values, setValues] = useState<FormState>(EMPTY);
  const [documents, setDocuments] = useState<string[]>([]);
  const [gotcha, setGotcha] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleDocument(label: string) {
    setDocuments((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const { first, last } = splitName(values.broker_name);
      const res = await fetch(APPLY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: first,
          last_name: last,
          agency: values.agency,
          email: values.email,
          phone: values.phone,
          partner_type: "portfolio_review",
          client_count: values.client_property_count,
          client_profile: buildClientProfile(
            values.client_name,
            values.client_area,
            values.client_property_count,
          ),
          message: buildMessage(documents, values.message),
          source_page: "/free-client-portfolio-review",
          _gotcha: gotcha,
        }),
      });

      if (!res.ok) {
        let msg = "Something went wrong. Please try again.";
        try {
          const body = (await res.json()) as { error?: string };
          if (body?.error) msg = body.error;
        } catch {
          /* swallow */
        }
        setError(msg);
        setSubmitting(false);
        return;
      }

      startTransition(() => {
        router.push(thanksPath);
      });
    } catch (err) {
      console.error("[free-portfolio-review] submit failed", err);
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
      {/* Honeypot */}
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
          label="Your name"
          name="broker_name"
          required
          value={values.broker_name}
          onChange={(v) => update("broker_name", v)}
        />
        <Field
          label="Agency"
          name="agency"
          required
          value={values.agency}
          onChange={(v) => update("agency", v)}
        />
        <Field
          label="Your email"
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
          label="Client name (optional)"
          name="client_name"
          placeholder="You can use initials or 'Client A' if you prefer"
          colSpan="full"
          value={values.client_name}
          onChange={(v) => update("client_name", v)}
        />
        <Field
          label="Client property count"
          name="client_property_count"
          placeholder="e.g. 3 properties"
          value={values.client_property_count}
          onChange={(v) => update("client_property_count", v)}
        />
        <Field
          label="Primary area"
          name="client_area"
          placeholder="e.g. Dubai Marina, Business Bay..."
          value={values.client_area}
          onChange={(v) => update("client_area", v)}
        />
        <div className="sm:col-span-2">
          <label
            className="block text-[13px] text-gray-700 mb-1.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What documents can you share?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DOCUMENT_OPTIONS.map((label) => (
              <label
                key={label}
                className="inline-flex items-start gap-2 rounded-md border border-gray-300 p-3 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-50"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <input
                  type="checkbox"
                  checked={documents.includes(label)}
                  onChange={() => toggleDocument(label)}
                  className="mt-0.5 accent-[#4f6ef7]"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
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
            placeholder="What's the client trying to decide? Anything specific you'd like the review to focus on?"
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
          One free review per agency. Subject to partner terms.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center min-h-[52px] rounded-md text-white px-8 text-[15px] font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: ACCENT, fontFamily: "var(--font-sans)" }}
        >
          {submitting ? "Submitting…" : "Submit client portfolio"}
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
