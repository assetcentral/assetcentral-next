"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "ok" | "error";

const FORM_NAME = "lead";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k] ?? ""))
    .join("&");
}

export function LeadCapture() {
  const [email, setEmail] = useState("");
  const [portfolioSize, setPortfolioSize] = useState("");
  const [bot, setBot] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");

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
          "bot-field": bot,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      setEmail("");
      setPortfolioSize("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 py-20 lg:py-24">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 lg:p-12">
          <div className="max-w-2xl">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Newsletter
            </p>
            <h2
              className="text-[30px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Not ready to start a trial? Get the newsletter.
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.55] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              One practical guide a month — written for landlords managing 2 to 50 properties. Quarterly portfolio benchmarks. No fluff, no upsells. Unsubscribe in one click.
            </p>
          </div>

          {status === "ok" ? (
            <div
              className="mt-8 rounded-lg bg-white border border-emerald-200 px-5 py-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div
                className="text-[18px] font-semibold text-[var(--color-positive)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                You&rsquo;re on the list.
              </div>
              <p className="mt-1 text-[14.5px] text-[var(--color-ink)]">
                We&rsquo;ll send the next monthly guide to your inbox. Confirm by clicking the link in the email we just sent.
              </p>
            </div>
          ) : (
            <form
              name={FORM_NAME}
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={onSubmit}
              className="mt-8 grid sm:grid-cols-[1.5fr_1fr_auto] gap-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {/* Netlify needs the form name in a hidden input for JS submissions */}
              <input type="hidden" name="form-name" value={FORM_NAME} />
              {/* Honeypot — bots fill it, humans don't. CSS hides it. */}
              <p className="hidden">
                <label>
                  Don&rsquo;t fill this out if you&rsquo;re human:{" "}
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
                  className="w-full rounded-md border border-[var(--color-border)] bg-white px-4 py-3 text-[14.5px] text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]/10"
                />
              </label>

              <label className="block">
                <span className="sr-only">Portfolio size</span>
                <select
                  name="portfolio_size"
                  required
                  value={portfolioSize}
                  onChange={(e) => setPortfolioSize(e.target.value)}
                  className="w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-3 text-[14.5px] text-[var(--color-ink)] focus:border-[var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]/10"
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
                className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-[var(--color-navy)] text-white px-5 text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Get the newsletter"}
              </button>

              {status === "error" && (
                <p className="sm:col-span-3 text-[13px] text-[var(--color-negative)]">
                  Something went wrong. Try again, or email{" "}
                  <a
                    href="mailto:hello@assetcentral.ai"
                    className="underline"
                  >
                    hello@assetcentral.ai
                  </a>
                  .
                </p>
              )}

              <p className="sm:col-span-3 text-[12.5px] text-[var(--color-muted)]">
                We&rsquo;ll only use your email for the newsletter. See our{" "}
                <a href="/privacy" className="underline">
                  privacy policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
