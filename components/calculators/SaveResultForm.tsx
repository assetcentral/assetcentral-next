"use client";

import { useState } from "react";

const FORM_NAME = "lead";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k] ?? ""))
    .join("&");
}

type Props = {
  /** Calculator slug (e.g. "irr"). Used to segment leads. */
  calc: string;
  /** Human-readable name for the calculator (e.g. "IRR Calculator"). */
  calcName: string;
  /** Plain-text summary of the user's current inputs + results. */
  summary: string;
};

export function SaveResultForm({ calc, calcName, summary }: Props) {
  const [email, setEmail] = useState("");
  const [bot, setBot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": FORM_NAME,
          email,
          portfolio_size: "calculator-save",
          lead_magnet: `calculator-${calc}`,
          result_summary: summary,
          "bot-field": bot,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div
          className="text-[18px] font-semibold text-[var(--color-positive)] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Saved. Check your inbox.
        </div>
        <p className="mt-1 text-[14.5px] text-[var(--color-ink)] leading-[1.55]">
          We&rsquo;ll email you a copy of this {calcName.toLowerCase()} result, plus our monthly newsletter for owners managing 2–50 properties. Unsubscribe in one click anytime.
        </p>
      </div>
    );
  }

  return (
    <div
      className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-7"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className="text-[18px] font-semibold text-[var(--color-navy)] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Save this result via email
          </div>
          <p className="mt-1 text-[14px] text-[var(--color-ink)] leading-[1.55]">
            We&rsquo;ll send your {calcName.toLowerCase()} inputs + outputs to your inbox, and add you to the monthly newsletter for serious property investors.
          </p>
        </div>
      </div>

      <form
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        className="mt-5 flex flex-col sm:flex-row gap-2"
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <input type="hidden" name="portfolio_size" value="calculator-save" />
        <input type="hidden" name="lead_magnet" value={`calculator-${calc}`} />
        <input type="hidden" name="result_summary" value={summary} />
        <p className="hidden">
          <label>
            Bot trap:{" "}
            <input
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
              value={bot}
              onChange={(e) => setBot(e.target.value)}
            />
          </label>
        </p>
        <label className="flex-1">
          <span className="sr-only">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-[var(--color-border)] bg-white px-4 min-h-[48px] text-[14.5px] text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]/10"
          />
        </label>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="plausible-event-name=save_result_submit inline-flex items-center justify-center min-h-[48px] rounded-md bg-[var(--color-navy)] text-white px-5 text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Saving…" : "Email me this result"}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-3 text-[12.5px] text-[var(--color-negative)]">
          Couldn&rsquo;t send. Try again, or email{" "}
          <a href="mailto:hello@assetcentral.ai" className="underline">
            hello@assetcentral.ai
          </a>
          .
        </p>
      )}

      <p className="mt-3 text-[12px] text-[var(--color-muted)]">
        We&rsquo;ll only use your email for the result + newsletter. See our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        .
      </p>
    </div>
  );
}
