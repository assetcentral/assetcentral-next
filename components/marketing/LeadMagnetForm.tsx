"use client";

import { useState } from "react";

const FORM_NAME = "lead";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k] ?? ""))
    .join("&");
}

type Props = {
  /** Slug of the magnet (e.g. "portfolio-health-checklist"). */
  magnet: string;
  /** Display name of the magnet. */
  magnetName: string;
  /** Path to the gated download (e.g. "/downloads/portfolio-health-checklist.pdf"). */
  downloadPath: string;
};

export function LeadMagnetForm({ magnet, magnetName, downloadPath }: Props) {
  const [email, setEmail] = useState("");
  const [portfolioSize, setPortfolioSize] = useState("");
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
          portfolio_size: portfolioSize,
          lead_magnet: magnet,
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
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 lg:p-8"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div
          className="text-[22px] font-semibold text-[var(--color-positive)] leading-tight mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your copy is ready.
        </div>
        <p className="text-[14.5px] text-[var(--color-ink)] leading-[1.55] mb-5">
          Click below to download the PDF. We&rsquo;ve also added you to the monthly
          newsletter for landlords managing 2–50 properties. Unsubscribe in one click anytime.
        </p>
        <a
          href={downloadPath}
          download
          className="plausible-event-name=lead_magnet_download inline-flex items-center justify-center min-h-[48px] rounded-md bg-[var(--color-navy)] text-white px-5 text-[14.5px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
        >
          Download {magnetName} (PDF) →
        </a>
      </div>
    );
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--color-border)] bg-white p-6 lg:p-8 space-y-3"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div
        className="text-[20px] font-semibold text-[var(--color-navy)] leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Get your free copy
      </div>
      <p className="text-[14px] text-[var(--color-ink)] leading-[1.55]">
        Enter your email and we&rsquo;ll deliver the PDF to your inbox. You&rsquo;ll also get
        our monthly newsletter for serious property investors.
      </p>

      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="lead_magnet" value={magnet} />
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

      <label className="block">
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

      <label className="block">
        <span className="sr-only">Portfolio size</span>
        <select
          name="portfolio_size"
          required
          value={portfolioSize}
          onChange={(e) => setPortfolioSize(e.target.value)}
          className="w-full rounded-md border border-[var(--color-border)] bg-white px-3 min-h-[48px] text-[14.5px] text-[var(--color-ink)] focus:border-[var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]/10"
        >
          <option value="">Portfolio size…</option>
          <option value="1">Just my home</option>
          <option value="2-5">2–5 properties</option>
          <option value="6-15">6–15 properties</option>
          <option value="16-50">16–50 properties</option>
          <option value="50+">50+ properties</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`plausible-event-name=lead_magnet_submit plausible-event-magnet=${magnet} flex w-full items-center justify-center min-h-[48px] rounded-md bg-[var(--color-navy)] text-white px-5 text-[14.5px] font-semibold hover:bg-[var(--color-navy-light)] transition-colors disabled:opacity-60`}
      >
        {status === "submitting" ? "Sending…" : `Get the ${magnetName.toLowerCase()}`}
      </button>

      {status === "error" && (
        <p className="text-[13px] text-[var(--color-negative)]">
          Couldn&rsquo;t send. Try again, or email{" "}
          <a href="mailto:hello@assetcentral.ai" className="underline">
            hello@assetcentral.ai
          </a>
          .
        </p>
      )}

      <p className="text-[12px] text-[var(--color-muted)]">
        See our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        . Unsubscribe in one click anytime.
      </p>
    </form>
  );
}
