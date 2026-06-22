"use client";

// CallMeBackForm — anonymous phone callback request.
//
// Flow:
//   1. Visitor picks country code + types their phone, clicks "Call me".
//   2. Form POSTs phone (E.164) to /api/marketing/queue-trial-call →
//      app sends SMS verification code via Twilio Verify.
//   3. UI swaps to a 6-digit code entry. Visitor types the code, clicks
//      "Verify". Form POSTs phone+code to /api/marketing/verify-trial-call.
//   4. On approved: app creates a stub user, queues a voice_call_jobs
//      row with playbook_slug='trial_demo_kickoff'. UI swaps to
//      "We're calling you now" state.
//
// Statically exportable client island — fetches use absolute URLs to
// the AssetCentral app (CORS opens to assetcentral.ai there).
//
// Why no third-party phone-input library: ~50KB of country flags and
// AsYouType formatters wouldn't pay back on a CTA component. We ship
// a small curated list of dial-codes covering >90% of our visitor
// regions plus a free-form "+" entry for the long tail.

import { useState, useRef, useEffect } from "react";

const ACCENT = "#4f6ef7";

const QUEUE_ENDPOINT = "https://app.assetcentral.ai/api/marketing/queue-trial-call";
const VERIFY_ENDPOINT = "https://app.assetcentral.ai/api/marketing/verify-trial-call";

// Sorted roughly by AssetCentral visitor concentration. The full
// E.164 dial codes are all permitted by the API's regex; this list
// is just the dropdown convenience.
const COUNTRY_DIAL = [
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+1", flag: "🇺🇸", label: "US / Canada" },
  { code: "+33", flag: "🇫🇷", label: "France" },
  { code: "+49", flag: "🇩🇪", label: "Germany" },
  { code: "+34", flag: "🇪🇸", label: "Spain" },
  { code: "+39", flag: "🇮🇹", label: "Italy" },
  { code: "+31", flag: "🇳🇱", label: "Netherlands" },
  { code: "+41", flag: "🇨🇭", label: "Switzerland" },
  { code: "+353", flag: "🇮🇪", label: "Ireland" },
  { code: "+61", flag: "🇦🇺", label: "Australia" },
  { code: "+65", flag: "🇸🇬", label: "Singapore" },
  { code: "+91", flag: "🇮🇳", label: "India" },
  { code: "+966", flag: "🇸🇦", label: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", label: "Qatar" },
  { code: "+27", flag: "🇿🇦", label: "South Africa" },
];

type Stage = "phone" | "code" | "calling" | "error";

// Default countdown if the API doesn't return one — matches the
// estimated_dial_seconds the verify endpoint sends after kicking off
// an inline SIP dial.
const DEFAULT_COUNTDOWN_SECONDS = 10;

interface CallMeBackFormProps {
  /** Where the form is mounted — sent to the API as the trigger source
   *  so we can A/B test homepage embed vs /try later.
   *
   *  - `hero`    — max-w-md, roomy padding. Standalone hero card.
   *  - `page`    — max-w-lg, used on the dedicated /try page.
   *  - `compact` — max-w-xs, tight padding, single-line eyebrow.
   *                Used in the homepage team section where it sits
   *                under the 5 portraits and must not dominate. */
  variant?: "hero" | "page" | "compact";
}

export function CallMeBackForm({ variant = "hero" }: CallMeBackFormProps) {
  const [stage, setStage] = useState<Stage>("phone");
  const [dialCode, setDialCode] = useState("+44");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_COUNTDOWN_SECONDS);
  const codeInputRef = useRef<HTMLInputElement | null>(null);

  // When we move into code stage, auto-focus the code input so the
  // visitor can start typing the SMS code immediately.
  useEffect(() => {
    if (stage === "code" && codeInputRef.current) {
      codeInputRef.current.focus();
    }
  }, [stage]);

  // Countdown timer for the calling stage. Ticks once per second from
  // whatever the verify endpoint reported (default 10s) down to 0,
  // then stays at 0 — the post-zero copy ("your phone is ringing")
  // replaces the number. Cleanup on unmount or stage change so a
  // stale interval doesn't keep firing after a reset.
  useEffect(() => {
    if (stage !== "calling") return;
    if (secondsLeft <= 0) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [stage, secondsLeft]);

  // E.164: + then 1-9 followed by 6–14 more digits.
  const fullPhone = `${dialCode}${phoneLocal.replace(/\D/g, "")}`;
  const phoneValid = /^\+[1-9]\d{6,14}$/.test(fullPhone);
  const codeValid = /^\d{6}$/.test(code);

  async function submitPhone(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneValid || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch(QUEUE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
      if (!res.ok) {
        setErrorMsg(data.message ?? "Could not send the code. Try again.");
        setSubmitting(false);
        return;
      }
      setStage("code");
    } catch {
      setErrorMsg("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    if (!codeValid || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch(VERIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, code }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
        estimated_dial_seconds?: number;
      };
      if (!res.ok) {
        setErrorMsg(data.message ?? "That code didn't work. Try again.");
        setSubmitting(false);
        return;
      }
      // Seed the countdown from the API's estimate so the form stays in
      // sync with whatever the backend actually scheduled. Clamp to
      // [3, 60] so a corrupt value can't render gibberish.
      const eta = Number(data.estimated_dial_seconds);
      setSecondsLeft(
        Number.isFinite(eta) ? Math.max(3, Math.min(60, Math.round(eta))) : DEFAULT_COUNTDOWN_SECONDS,
      );
      setStage("calling");
    } catch {
      setErrorMsg("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStage("phone");
    setPhoneLocal("");
    setCode("");
    setErrorMsg(null);
    setSecondsLeft(DEFAULT_COUNTDOWN_SECONDS);
  }

  // ── UI ──────────────────────────────────────────────────────────────────
  const wrapClass =
    variant === "compact"
      ? "w-full max-w-xs"
      : variant === "hero"
        ? "w-full max-w-md mx-auto"
        : "w-full max-w-lg mx-auto";
  const compact = variant === "compact";
  const cardPad = compact ? "p-3.5" : "p-5 sm:p-7";
  const inputPad = compact ? "py-2" : "py-3";
  const btnPad = compact ? "py-2.5" : "py-3";

  if (stage === "calling") {
    const ringing = secondsLeft <= 0;
    return (
      <div className={wrapClass}>
        <div className="rounded-2xl border border-blue-400/40 bg-blue-500/10 p-6 sm:p-8 text-center">
          {/* Big animated counter — drops to a ringing pulse at 0. */}
          {!ringing ? (
            <>
              <p className="text-xs uppercase tracking-[0.2em] text-blue-200/80 font-semibold">
                Calling you in
              </p>
              <div
                key={secondsLeft}
                className="mt-2 text-6xl sm:text-7xl font-bold text-white tabular-nums callmeback-tick"
                style={{ lineHeight: 1 }}
              >
                {secondsLeft}
              </div>
              <p className="mt-1 text-sm text-blue-100/80">
                {secondsLeft === 1 ? "second" : "seconds"}
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/30">
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-blue-400" />
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Your phone should be ringing now
              </h3>
            </>
          )}
          <p className="mt-4 text-sm text-blue-100/80">
            {ringing ? (
              <>
                Answer the call to <span className="font-mono">{fullPhone}</span> —
                your AI team is on the line.
              </>
            ) : (
              <>
                Dialling <span className="font-mono">{fullPhone}</span>. Have your
                phone handy.
              </>
            )}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 text-xs text-blue-200 underline hover:text-white"
          >
            Wrong number? Start over
          </button>
          {/* Local keyframe so the digit "pops" each tick — cheap scale +
              fade-in keyed off the changing element. */}
          <style>{`
            @keyframes callmeback-tick-pop {
              0%   { transform: scale(0.85); opacity: 0; }
              60%  { transform: scale(1.06); opacity: 1; }
              100% { transform: scale(1);    opacity: 1; }
            }
            .callmeback-tick {
              animation: callmeback-tick-pop 360ms cubic-bezier(.2,.7,.2,1);
              will-change: transform, opacity;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapClass}>
      <div className={`rounded-xl border border-white/10 bg-[color:var(--color-navy)] ${cardPad}`}>
        {stage === "phone" && (
          <form onSubmit={submitPhone} noValidate>
            <label className={`block text-[11px] uppercase tracking-wider font-semibold text-blue-200 ${compact ? "mb-2" : "mb-2"}`}>
              {compact ? "Get a free call — no signup" : "Get a call from your AI team"}
            </label>
            {!compact && (
              <p className="text-sm text-white/80 mb-4">
                Two minutes. Free. No signup. We&apos;ll text you a code — your call
                arrives within 10 seconds of verifying.
              </p>
            )}
            <div className="flex gap-2">
              <select
                aria-label="Country dial code"
                value={dialCode}
                onChange={(e) => setDialCode(e.target.value)}
                className={`rounded-lg bg-slate-900/60 border border-white/15 text-white px-2 ${inputPad} text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${compact ? "w-[88px]" : "w-[120px]"}`}
              >
                {COUNTRY_DIAL.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="7700 900123"
                value={phoneLocal}
                onChange={(e) => setPhoneLocal(e.target.value)}
                className={`flex-1 min-w-0 rounded-lg bg-slate-900/60 border border-white/15 text-white px-3 ${inputPad} text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
            </div>
            {errorMsg && (
              <p className="mt-2 text-xs text-red-300" role="alert">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={!phoneValid || submitting}
              style={{ backgroundColor: phoneValid && !submitting ? ACCENT : "rgba(79,110,247,0.4)" }}
              className={`mt-3 w-full rounded-lg text-white font-semibold ${btnPad} text-sm transition disabled:cursor-not-allowed hover:brightness-110`}
            >
              {submitting ? "Sending code…" : compact ? "Call me" : "Text me a code"}
            </button>
            {!compact && (
              <p className="mt-3 text-[11px] text-white/50 text-center">
                Standard SMS rates may apply. By continuing you agree to receive a
                one-off verification text + one demo call.
              </p>
            )}
          </form>
        )}

        {stage === "code" && (
          <form onSubmit={submitCode} noValidate>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-blue-200 mb-2">
              Enter the code we texted
            </label>
            {!compact && (
              <p className="text-sm text-white/80 mb-4">
                We sent a 6-digit code to <span className="font-mono">{fullPhone}</span>.
              </p>
            )}
            <input
              ref={codeInputRef}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              pattern="\d{6}"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className={`w-full text-center tracking-[0.4em] font-mono ${compact ? "text-lg py-2.5" : "text-2xl py-4"} rounded-lg bg-slate-900/60 border border-white/15 text-white px-3 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errorMsg && (
              <p className="mt-2 text-xs text-red-300" role="alert">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={!codeValid || submitting}
              style={{ backgroundColor: codeValid && !submitting ? ACCENT : "rgba(79,110,247,0.4)" }}
              className={`mt-3 w-full rounded-lg text-white font-semibold ${btnPad} text-sm transition disabled:cursor-not-allowed hover:brightness-110`}
            >
              {submitting ? "Verifying…" : compact ? "Verify" : "Verify and call me"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="mt-2 w-full text-[11px] text-white/60 underline hover:text-white"
            >
              Use a different number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
