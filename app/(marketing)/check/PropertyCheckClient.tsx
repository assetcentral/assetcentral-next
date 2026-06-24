"use client";

// PropertyCheckClient — the multi-step free AI property check.
//
// Progressive disclosure on a single page (not a real wizard):
//   Step 1  property basics (price, deposit, rate, term) — always
//           shown.
//   Step 2  shows the calculated monthly mortgage, asks "is this
//           an investment property?" — reveals once Step 1 is valid.
//   Step 3  rent + costs — reveals if user picks "yes" in Step 2.
//   Step 4  verdict card — reveals once Step 3 is valid AND user
//           clicks "Get my AI verdict". Tone-coloured.
//   Step 5  email capture — reveals after the verdict. Posts to the
//           Netlify Function at /.netlify/functions/check-save.
//   Step 6  Pro upgrade card — always visible once verdict shows.
//
// All calculations are client-side via lib/check-engine.ts — pure
// math, no network round-trip needed for the verdict itself. Phase
// 2.5 will swap deterministic verdict copy for an Anthropic Haiku
// generation; the engine already returns the shape the model will
// produce so the swap is local.

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { runCheck, type CheckInputs, type CheckResult } from "@/lib/check-engine";

type IsInvestment = "yes" | "no" | null;

/** Default values shown as placeholders in the form. Use a recognisable
 *  UK city flat — Manchester 2-bed at £285k — matching the example on
 *  the homepage so the user lands somewhere familiar. */
const DEFAULTS: CheckInputs = {
  price: 285000,
  deposit: 71250, // 25%
  ratePct: 5.4,
  termYrs: 25,
  monthlyRent: 1450,
  monthlyServiceCharge: 195,
  monthlyMaintenance: 90,
  managementPct: 10,
  vacancyMonths: 0.5,
};

const NAVY = "#1a1a2e";

// ── Helpers ─────────────────────────────────────────────────────────

function fmtMoney(n: number, currency = "£"): string {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(Math.round(n));
  return `${sign}${currency}${abs.toLocaleString("en-GB")}`;
}

function clampNum(s: string, min = 0): number {
  const n = Number(s.replace(/[^0-9.\-]/g, ""));
  if (!Number.isFinite(n) || n < min) return min;
  return n;
}

/** Tone → colour token. Drives the verdict card chrome. */
const TONE_COLORS = {
  attractive: {
    bg: "rgba(22, 163, 74, 0.08)",
    border: "var(--color-positive)",
    text: "var(--color-positive)",
  },
  borderline: {
    bg: "rgba(217, 119, 6, 0.08)",
    border: "var(--color-warning)",
    text: "var(--color-warning)",
  },
  risky: {
    bg: "rgba(220, 38, 38, 0.08)",
    border: "var(--color-negative)",
    text: "var(--color-negative)",
  },
} as const;

// ── Component ───────────────────────────────────────────────────────

export function PropertyCheckClient() {
  const [inputs, setInputs] = useState<CheckInputs>(DEFAULTS);
  const [isInvestment, setIsInvestment] = useState<IsInvestment>(null);
  const [verdictRevealed, setVerdictRevealed] = useState(false);
  const verdictRef = useRef<HTMLDivElement | null>(null);

  // Recompute on every keystroke — pure function, no perf concern.
  const result: CheckResult = useMemo(() => runCheck(inputs), [inputs]);

  // Validity gates
  const basicsValid =
    inputs.price > 0 &&
    inputs.deposit >= 0 &&
    inputs.deposit < inputs.price &&
    inputs.ratePct > 0 &&
    inputs.termYrs > 0;
  const investmentInputsValid =
    isInvestment === "yes" &&
    inputs.monthlyRent > 0;

  const update =
    (key: keyof CheckInputs) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({ ...prev, [key]: clampNum(e.target.value) }));
      // Any change resets the verdict — keeps the screen honest.
      if (verdictRevealed) setVerdictRevealed(false);
    };

  const handleGetVerdict = () => {
    setVerdictRevealed(true);
    // Smooth-scroll to the verdict card on the next paint.
    requestAnimationFrame(() => {
      verdictRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 py-10 lg:py-14 space-y-6">
      {/* ── Step 1: Property basics ─────────────────────────── */}
      <FormCard
        step="1"
        title="The property basics"
        body="Purchase price, deposit, mortgage rate and term. We'll work out the monthly payment as you type."
      >
        <FieldGrid>
          <Field label="Purchase price" prefix="£">
            <input
              type="number"
              inputMode="decimal"
              defaultValue={DEFAULTS.price}
              onChange={update("price")}
              className={INPUT}
            />
          </Field>
          <Field label="Deposit" prefix="£" hint={`${Math.round((inputs.deposit / Math.max(1, inputs.price)) * 100)}% LTV`}>
            <input
              type="number"
              inputMode="decimal"
              defaultValue={DEFAULTS.deposit}
              onChange={update("deposit")}
              className={INPUT}
            />
          </Field>
          <Field label="Mortgage rate" suffix="%">
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              defaultValue={DEFAULTS.ratePct}
              onChange={update("ratePct")}
              className={INPUT}
            />
          </Field>
          <Field label="Term" suffix="years">
            <input
              type="number"
              inputMode="decimal"
              defaultValue={DEFAULTS.termYrs}
              onChange={update("termYrs")}
              className={INPUT}
            />
          </Field>
        </FieldGrid>

        {/* Live monthly mortgage callout */}
        {basicsValid ? (
          <div
            className="mt-5 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] p-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[12px] uppercase tracking-[0.1em] text-[color:var(--color-muted)] font-semibold">
                Monthly mortgage payment
              </p>
              <p
                className="text-[24px] lg:text-[28px] tabular-nums font-bold"
                style={{ color: NAVY }}
              >
                {fmtMoney(result.monthlyMortgage)}
              </p>
            </div>
            <p className="mt-1 text-[12.5px] text-[color:var(--color-muted)]">
              {fmtMoney(inputs.price - inputs.deposit)} loan at{" "}
              {inputs.ratePct}% over {inputs.termYrs} years.
            </p>
          </div>
        ) : null}
      </FormCard>

      {/* ── Step 2: Investment? ─────────────────────────────── */}
      {basicsValid ? (
        <FormCard
          step="2"
          title="Is this an investment property?"
          body="If you're renting it out, we'll check yield, cash flow and the AI verdict next. If it's for you to live in, the mortgage number above is the headline."
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                setIsInvestment("yes");
                if (verdictRevealed) setVerdictRevealed(false);
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3.5 text-[15px] font-semibold transition border ${
                isInvestment === "yes"
                  ? "bg-[color:var(--color-navy)] text-white border-[color:var(--color-navy)]"
                  : "bg-white text-[color:var(--color-navy)] border-[color:var(--color-border)] hover:border-[color:var(--color-navy)]"
              }`}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Yes — it&rsquo;s a rental / investment
            </button>
            <button
              type="button"
              onClick={() => {
                setIsInvestment("no");
                if (verdictRevealed) setVerdictRevealed(false);
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3.5 text-[15px] font-semibold transition border ${
                isInvestment === "no"
                  ? "bg-[color:var(--color-navy)] text-white border-[color:var(--color-navy)]"
                  : "bg-white text-[color:var(--color-navy)] border-[color:var(--color-border)] hover:border-[color:var(--color-navy)]"
              }`}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              No — I&rsquo;ll live in it
            </button>
          </div>
          {isInvestment === "no" ? (
            <p
              className="mt-5 text-[14px] text-[color:var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              No further checks needed for a personal-use purchase — the
              monthly payment above is your decision number. If you want the
              full underwrite (stamp duty by country, fixed-rate reset risk,
              cash needed at completion), the deeper mortgage calculator is{" "}
              <Link
                href="/calculators/mortgage"
                className="font-semibold text-[color:var(--color-accent)] hover:underline"
              >
                over here
              </Link>
              .
            </p>
          ) : null}
        </FormCard>
      ) : null}

      {/* ── Step 3: Rent + costs ────────────────────────────── */}
      {basicsValid && isInvestment === "yes" ? (
        <FormCard
          step="3"
          title="The rent and the running costs"
          body="Expected rent and the typical monthly outgoings. Defaults shown are reasonable starting points — adjust to your property."
        >
          <FieldGrid>
            <Field label="Expected monthly rent" prefix="£">
              <input
                type="number"
                inputMode="decimal"
                defaultValue={DEFAULTS.monthlyRent}
                onChange={update("monthlyRent")}
                className={INPUT}
              />
            </Field>
            <Field label="Service charge + insurance" prefix="£" hint="per month">
              <input
                type="number"
                inputMode="decimal"
                defaultValue={DEFAULTS.monthlyServiceCharge}
                onChange={update("monthlyServiceCharge")}
                className={INPUT}
              />
            </Field>
            <Field label="Maintenance reserve" prefix="£" hint="per month">
              <input
                type="number"
                inputMode="decimal"
                defaultValue={DEFAULTS.monthlyMaintenance}
                onChange={update("monthlyMaintenance")}
                className={INPUT}
              />
            </Field>
            <Field label="Letting + management fee" suffix="% of rent">
              <input
                type="number"
                step="0.5"
                inputMode="decimal"
                defaultValue={DEFAULTS.managementPct}
                onChange={update("managementPct")}
                className={INPUT}
              />
            </Field>
            <Field label="Expected vacancy" suffix="months / year">
              <input
                type="number"
                step="0.5"
                inputMode="decimal"
                defaultValue={DEFAULTS.vacancyMonths}
                onChange={update("vacancyMonths")}
                className={INPUT}
              />
            </Field>
          </FieldGrid>

          {/* Live cash-flow + yield mini-grid */}
          {investmentInputsValid ? (
            <div
              className="mt-5 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] p-4 grid grid-cols-3 gap-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <Stat label="Gross yield" value={`${result.grossYieldPct.toFixed(1)}%`} />
              <Stat label="Net yield" value={`${result.netYieldPct.toFixed(1)}%`} />
              <Stat
                label="Monthly cash flow"
                value={fmtMoney(result.monthlyCashFlow)}
                tone={result.monthlyCashFlow >= 0 ? "positive" : "negative"}
              />
            </div>
          ) : null}

          {investmentInputsValid && !verdictRevealed ? (
            <button
              type="button"
              onClick={handleGetVerdict}
              className="mt-5 inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-md bg-[color:var(--color-navy)] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get my AI verdict
              <span aria-hidden>→</span>
            </button>
          ) : null}
        </FormCard>
      ) : null}

      {/* ── Step 4: Verdict + Step 5: Email + Step 6: Pro upgrade */}
      {verdictRevealed && investmentInputsValid ? (
        <div ref={verdictRef}>
          <VerdictCard result={result} />
          <EmailCaptureCard inputs={inputs} result={result} />
          <ProUpgradeCard />
        </div>
      ) : null}
    </div>
  );
}

// ── Reusable presentational pieces ──────────────────────────────────

const INPUT =
  "block w-full rounded-md border border-[color:var(--color-border)] bg-white px-3 py-2.5 text-[15px] text-[color:var(--color-ink)] tabular-nums focus:border-[color:var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-navy)]/15";

function FormCard({
  step,
  title,
  body,
  children,
}: {
  step: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-2xl border border-[color:var(--color-border)] bg-white p-6 lg:p-7"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <header className="flex items-start gap-4">
        <span
          aria-hidden
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-navy)] text-white text-[14px] font-bold shrink-0"
        >
          {step}
        </span>
        <div>
          <h2
            className="text-[20px] lg:text-[24px] text-[color:var(--color-navy)] font-semibold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-[color:var(--color-muted)]">
            {body}
          </p>
        </div>
      </header>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">{children}</div>
  );
}

function Field({
  label,
  prefix,
  suffix,
  hint,
  children,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12.5px] uppercase tracking-[0.08em] font-semibold text-[color:var(--color-muted)]">
          {label}
        </span>
        {hint ? (
          <span className="text-[11.5px] text-[color:var(--color-muted)]">
            {hint}
          </span>
        ) : null}
      </span>
      <span className="relative block">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-[color:var(--color-muted)]">
            {prefix}
          </span>
        ) : null}
        <span className={prefix ? "block [&_input]:pl-7" : "block"}>{children}</span>
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12.5px] text-[color:var(--color-muted)]">
            {suffix}
          </span>
        ) : null}
      </span>
    </label>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "positive" | "negative";
}) {
  const color =
    tone === "positive"
      ? "var(--color-positive)"
      : tone === "negative"
        ? "var(--color-negative)"
        : NAVY;
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-muted)] font-semibold">
        {label}
      </p>
      <p className="mt-1 text-[18px] lg:text-[20px] tabular-nums font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

// ── Verdict card ────────────────────────────────────────────────────

function VerdictCard({ result }: { result: CheckResult }) {
  const tone = TONE_COLORS[result.verdict.tone];
  return (
    <section
      className="rounded-2xl border-2 bg-white p-6 lg:p-7"
      style={{ borderColor: tone.border, fontFamily: "var(--font-sans)" }}
    >
      <header className="flex items-start gap-4">
        <span
          aria-hidden
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-navy)] text-white text-[14px] font-bold shrink-0"
        >
          4
        </span>
        <div className="flex-1 min-w-0">
          <p
            className="text-[11.5px] uppercase tracking-[0.12em] font-bold mb-1"
            style={{ color: tone.text }}
          >
            AssetCentral AI · verdict
          </p>
          <div className="flex items-baseline gap-3">
            <h2
              className="text-[32px] lg:text-[40px] leading-tight font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-navy)",
              }}
            >
              {result.verdict.label}
            </h2>
            <span
              aria-hidden
              className="inline-flex h-3.5 w-3.5 rounded-full shrink-0"
              style={{ backgroundColor: tone.border }}
            />
          </div>
          <p className="mt-3 text-[15px] leading-[1.55] text-[color:var(--color-ink)]">
            {result.verdict.summary}
          </p>
        </div>
      </header>

      {/* ── Key numbers strip ──────────────────────────────── */}
      <div
        className="mt-6 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] p-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        <Stat label="Monthly mortgage" value={fmtMoney(result.monthlyMortgage)} />
        <Stat label="Net yield" value={`${result.netYieldPct.toFixed(1)}%`} />
        <Stat
          label="Monthly cash flow"
          value={fmtMoney(result.monthlyCashFlow)}
          tone={result.monthlyCashFlow >= 0 ? "positive" : "negative"}
        />
        <Stat label="DSCR" value={`${result.dscr.toFixed(2)}x`} />
      </div>

      {/* ── Red flag + improvement ─────────────────────────── */}
      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white border border-[color:var(--color-border)] p-4">
          <p
            className="text-[10.5px] uppercase tracking-[0.1em] font-bold mb-1.5"
            style={{ color: "var(--color-negative)" }}
          >
            Red flag · {result.verdict.redFlag.title}
          </p>
          <p className="text-[14px] leading-[1.5] text-[color:var(--color-ink)]">
            {result.verdict.redFlag.body}
          </p>
        </div>
        <div
          className="rounded-xl bg-white border-2 p-4"
          style={{ borderColor: "var(--color-positive)" }}
        >
          <p
            className="text-[10.5px] uppercase tracking-[0.1em] font-bold mb-1.5"
            style={{ color: "var(--color-positive)" }}
          >
            One thing to fix · {result.verdict.improvement.title}
          </p>
          <p className="text-[14px] leading-[1.5] text-[color:var(--color-ink)]">
            {result.verdict.improvement.body}
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Email capture card ──────────────────────────────────────────────

function EmailCaptureCard({
  inputs,
  result,
}: {
  inputs: CheckInputs;
  result: CheckResult;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Enter a valid email address.");
      return;
    }
    setErrorMsg(null);
    setStatus("saving");
    try {
      const res = await fetch("/.netlify/functions/check-save", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, inputs, result }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("saved");
    } catch (err) {
      // Soft-fail — the user still has the verdict on screen. Capture the
      // failure mode for ops, but don't block the flow.
      console.error("[check-save] failed", err);
      setStatus("error");
      setErrorMsg("Couldn't send the email right now. Try again in a moment.");
    }
  };

  if (status === "saved") {
    return (
      <section
        className="mt-6 rounded-2xl border border-[color:var(--color-positive)] bg-[color:rgba(22,163,74,0.05)] p-6 lg:p-7"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <p
          className="text-[11.5px] uppercase tracking-[0.12em] font-bold mb-1"
          style={{ color: "var(--color-positive)" }}
        >
          Email sent
        </p>
        <h2
          className="text-[22px] text-[color:var(--color-navy)] font-semibold leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Check your inbox for the full result.
        </h2>
        <p className="mt-2 text-[14.5px] text-[color:var(--color-ink)]">
          The verdict, the red flag and the improvement are on their way. If
          you don&rsquo;t see it in a minute, check spam — and add{" "}
          <strong>hello@assetcentral.ai</strong> to your contacts.
        </p>
      </section>
    );
  }

  return (
    <section
      className="mt-6 rounded-2xl border border-[color:var(--color-border)] bg-white p-6 lg:p-7"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <header className="flex items-start gap-4">
        <span
          aria-hidden
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-navy)] text-white text-[14px] font-bold shrink-0"
        >
          5
        </span>
        <div className="flex-1 min-w-0">
          <h2
            className="text-[20px] lg:text-[22px] text-[color:var(--color-navy)] font-semibold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Email me a copy
          </h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-[color:var(--color-muted)]">
            Send the verdict, the red flag, and the one improvement to your
            inbox — useful to share with a partner, broker or advisor.
          </p>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col sm:flex-row gap-3"
      >
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${INPUT} sm:flex-1`}
        />
        <button
          type="submit"
          disabled={status === "saving"}
          className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-navy)] px-5 py-3 text-[14.5px] font-semibold text-white transition hover:bg-[color:var(--color-navy-light)] disabled:opacity-60"
        >
          {status === "saving" ? "Sending…" : "Email me the result"}
        </button>
      </form>
      {errorMsg ? (
        <p
          className="mt-3 text-[13px]"
          style={{ color: "var(--color-negative)" }}
        >
          {errorMsg}
        </p>
      ) : null}
      <p className="mt-3 text-[12.5px] text-[color:var(--color-muted)]">
        We&rsquo;ll send the result once. No spam, no list rental.
      </p>
    </section>
  );
}

// ── Pro upgrade card ────────────────────────────────────────────────

function ProUpgradeCard() {
  return (
    <section
      className="mt-6 rounded-2xl bg-[color:var(--color-navy)] text-white p-6 lg:p-7"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <p
        className="text-[11.5px] uppercase tracking-[0.12em] font-bold mb-2"
        style={{ color: "var(--color-accent)" }}
      >
        Going deeper · AssetCentral Pro
      </p>
      <h2
        className="text-[22px] lg:text-[28px] leading-tight font-semibold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Save this property and run the rest of the decision.
      </h2>
      <p className="mt-3 text-[14.5px] leading-[1.55] text-white/80">
        Pro adds the 10-year cash-flow forecast, rate-shock + lease-rollover
        stress tests, hold-vs-sell and refinance scenarios, lender-ready credit
        packs, and the full 5-agent AI team — from €49/month.
      </p>
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <Link
          href="/signup?plan=pro_monthly&intent=direct"
          className="inline-flex items-center justify-center rounded-md bg-white text-[color:var(--color-navy)] px-5 py-3 text-[14.5px] font-semibold transition hover:bg-white/90"
        >
          Start a 7-day Pro trial
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-md border border-white/25 text-white px-5 py-3 text-[14.5px] font-semibold transition hover:bg-white/5"
        >
          See pricing
        </Link>
      </div>
    </section>
  );
}
