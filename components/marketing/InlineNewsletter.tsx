"use client";

import { useState } from "react";

const FORM_NAME = "lead";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k] ?? ""))
    .join("&");
}

export function InlineNewsletter({
  variant = "card",
}: {
  /** "card" for resource articles, "inline" for tighter contexts. */
  variant?: "card" | "inline";
}) {
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
          portfolio_size: "newsletter-inline",
          "bot-field": bot,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const containerClass =
    variant === "card"
      ? "my-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-7"
      : "my-6";

  if (status === "ok") {
    return (
      <div
        className={containerClass}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="text-[15.5px] font-semibold text-[var(--color-positive)]">
          Thanks — you&rsquo;re on the list.
        </div>
        <p className="mt-1 text-[14px] text-[var(--color-ink)]">
          Confirm via the email we just sent.
        </p>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div
        className="text-[16px] font-semibold text-[var(--color-navy)] mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Get one practical guide a month
      </div>
      <p
        className="text-[14px] text-[var(--color-ink)] leading-[1.55] mb-4"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Written for landlords managing 2–50 properties. No fluff, no upsells. Unsubscribe in one click.
      </p>
      <form
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row gap-2"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <input type="hidden" name="portfolio_size" value="newsletter-inline" />
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
          className="plausible-event-name=newsletter+inline inline-flex items-center justify-center min-h-[48px] rounded-md bg-[var(--color-navy)] text-white px-5 text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Subscribe"}
        </button>
        {status === "error" && (
          <p className="text-[12.5px] text-[var(--color-negative)] sm:basis-full">
            Couldn&rsquo;t send. Try again or email{" "}
            <a href="mailto:hello@assetcentral.ai" className="underline">
              hello@assetcentral.ai
            </a>
            .
          </p>
        )}
      </form>
    </div>
  );
}
