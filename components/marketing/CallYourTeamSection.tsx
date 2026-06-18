"use client";

// "Talk to your team. Anytime." — the conversational hook section.
// Sits between the team hero (5 portraits = the team faces) and the
// daily briefing (what they did before you logged in). Its job is to
// make a visitor feel what it would be like to actually call the
// team: five experts on one call, each chiming in where they own
// the question.
//
// Visual structure:
//   LEFT  — boardroom mockup: 5 portraits in a row, the active
//           speaker getting a coloured ring + subtle pulse halo +
//           tiny scale-up. The active speaker cycles on a fixed
//           cadence (2.4s per turn) so the boardroom always feels
//           alive without being noisy.
//   RIGHT — static transcript showing the example dialogue. Each
//           turn carries the speaker's accent dot so the eye maps
//           the turn to the portrait that's "speaking" on the left.
//
// The dialogue is illustrative — no real voice runs yet. Voice
// screen ships in Phase 4 of the AI Property Family Office roadmap.
// This section pre-positions the family-office framing before the
// underlying capability is shipped.
//
// Respects prefers-reduced-motion: under that flag we drop the
// pulse + scale and just use a static ring on the active portrait.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type AgentKey = "cio" | "cfo" | "ceo" | "coo" | "pa";

interface AgentEntry {
  key: AgentKey;
  acronym: string;
  fullTitle: string;
  avatarSrc: string;
  ringClass: string;
  haloClass: string;
  dotClass: string;
}

const AGENTS: ReadonlyArray<AgentEntry> = [
  {
    key: "cio",
    acronym: "CIO",
    fullTitle: "Chief Investment Officer",
    avatarSrc: "/team/cio.webp",
    ringClass: "ring-[color:var(--color-cio-mid)]",
    haloClass: "bg-[color:var(--color-cio-mid)]",
    dotClass: "bg-[color:var(--color-cio-mid)]",
  },
  {
    key: "cfo",
    acronym: "CFO",
    fullTitle: "Chief Financial Officer",
    avatarSrc: "/team/cfo.webp",
    ringClass: "ring-[color:var(--color-cfo-mid)]",
    haloClass: "bg-[color:var(--color-cfo-mid)]",
    dotClass: "bg-[color:var(--color-cfo-mid)]",
  },
  {
    key: "ceo",
    acronym: "CEO",
    fullTitle: "Chief Executive Officer",
    avatarSrc: "/team/ceo.webp",
    ringClass: "ring-[color:var(--color-ceo-mid)]",
    haloClass: "bg-[color:var(--color-ceo-mid)]",
    dotClass: "bg-[color:var(--color-ceo-mid)]",
  },
  {
    key: "coo",
    acronym: "COO",
    fullTitle: "Chief Operations Officer",
    avatarSrc: "/team/coo.webp",
    ringClass: "ring-[color:var(--color-coo-mid)]",
    haloClass: "bg-[color:var(--color-coo-mid)]",
    dotClass: "bg-[color:var(--color-coo-mid)]",
  },
  {
    key: "pa",
    acronym: "PA",
    fullTitle: "Personal Assistant",
    avatarSrc: "/team/pa.webp",
    ringClass: "ring-[color:var(--color-pa-mid)]",
    haloClass: "bg-[color:var(--color-pa-mid)]",
    dotClass: "bg-[color:var(--color-pa-mid)]",
  },
];

interface TranscriptTurn {
  speaker: "user" | AgentKey;
  text: string;
}

// One illustrative call. Order = order the active-speaker cycle
// follows on the boardroom. User → CFO → CIO → CEO is the rhythm.
const TRANSCRIPT: ReadonlyArray<TranscriptTurn> = [
  {
    speaker: "user",
    text: "Can I afford another property in Dubai?",
  },
  {
    speaker: "cfo",
    text:
      "Based on your cashflow and current rates, your usable headroom is around €620k at 65% LTV — borrowing against the London flat's equity.",
  },
  {
    speaker: "cio",
    text:
      "Marina remains stronger for liquidity. JVC offers a higher net yield but a longer hold to your exit window.",
  },
  {
    speaker: "ceo",
    text:
      "My recommendation: review your refi window on the London flat first. Then we model both Dubai options side by side.",
  },
];

// Agents that actually speak in the example dialogue. The cycle skips
// COO and PA on this loop so the boardroom matches what the user is
// reading on the right.
const SPEAKING_CYCLE: ReadonlyArray<AgentKey> = ["cfo", "cio", "ceo"];

/** How long each agent holds the active state (ms). Slow enough to
 *  read, fast enough to feel alive. */
const TURN_MS = 2400;

export function CallYourTeamSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion: drop the pulse + scale, keep a
  // static ring on whichever agent is "currently speaking" in the
  // transcript. The cycle keeps advancing on the same cadence so
  // a screen reader user still tracks the conversation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SPEAKING_CYCLE.length);
    }, TURN_MS);
    return () => window.clearInterval(id);
  }, []);

  const activeAgent = SPEAKING_CYCLE[activeIdx];

  return (
    <section
      id="call-your-team"
      aria-label="Talk to your team — anytime"
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How it feels
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-[44px] font-semibold text-[color:var(--color-navy)] leading-[1.1] tracking-tight">
            Talk to your team. Anytime.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[color:var(--color-muted)] leading-relaxed">
            Five experts on one call. They already know your portfolio — and they&rsquo;re already briefed on today&rsquo;s market.
          </p>
        </div>

        {/* Two-column: boardroom left, transcript right. Stacks on small
            screens — boardroom first so the visual reads before the words. */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* BOARDROOM */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 lg:p-8">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted)] font-semibold mb-5">
                Your AI team — on one call
              </p>
              <ul className="flex items-end justify-between gap-2">
                {AGENTS.map((agent) => {
                  const isActive = activeAgent === agent.key;
                  const isDim = !isActive;
                  return (
                    <li
                      key={agent.key}
                      className="flex flex-col items-center flex-1 min-w-0 text-center"
                    >
                      <div className="relative h-16 w-16 md:h-20 md:w-20">
                        {/* Pulse halo (motion-safe only). Sits behind the
                            portrait, expands + fades on a 1.4s loop while
                            this agent is active. */}
                        {isActive && !reducedMotion && (
                          <span
                            className={`absolute inset-0 rounded-full ${agent.haloClass} opacity-30 animate-[ctyt-pulse_1.4s_ease-out_infinite]`}
                            aria-hidden
                          />
                        )}
                        <div
                          className={`relative h-full w-full rounded-full overflow-hidden bg-white ring-2 transition-all duration-300 ${
                            isActive
                              ? `${agent.ringClass} ring-offset-2 ring-offset-[color:var(--color-surface)] ${reducedMotion ? "" : "scale-[1.06]"}`
                              : "ring-transparent"
                          } ${isDim ? "opacity-60" : ""}`}
                        >
                          <Image
                            src={agent.avatarSrc}
                            alt={`Portrait of ${agent.fullTitle}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div
                        className={`mt-3 text-[10px] uppercase tracking-[0.1em] font-bold ${
                          isActive
                            ? "text-[color:var(--color-navy)]"
                            : "text-[color:var(--color-muted)]"
                        }`}
                      >
                        {agent.acronym}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p
                aria-live="polite"
                className="mt-5 text-center text-xs text-[color:var(--color-muted)] font-medium"
              >
                {AGENTS.find((a) => a.key === activeAgent)?.fullTitle} speaking…
              </p>
            </div>
          </div>

          {/* TRANSCRIPT */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-6 lg:p-8 shadow-sm">
              <ul className="space-y-5">
                {TRANSCRIPT.map((turn, i) => {
                  const isUser = turn.speaker === "user";
                  const agent = !isUser
                    ? AGENTS.find((a) => a.key === turn.speaker)
                    : null;
                  const speakerLabel = isUser ? "You" : agent?.acronym ?? "";
                  return (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="shrink-0 w-12 flex flex-col items-start">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] font-bold ${
                            isUser
                              ? "text-[color:var(--color-ink)]"
                              : "text-[color:var(--color-navy)]"
                          }`}
                        >
                          {!isUser && agent && (
                            <span
                              className={`inline-block h-1.5 w-1.5 rounded-full ${agent.dotClass}`}
                              aria-hidden
                            />
                          )}
                          {speakerLabel}
                        </span>
                      </div>
                      <p
                        className={`flex-1 text-sm md:text-[15px] leading-relaxed ${
                          isUser
                            ? "text-[color:var(--color-ink)]"
                            : "text-[color:var(--color-ink)]"
                        }`}
                      >
                        {turn.text}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 pt-5 border-t border-[color:var(--color-border)] text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted)] font-semibold">
                Illustrative call · Your team would draw on your real portfolio data
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-start">
          <Link
            href="/signup?plan=pro_monthly&intent=call-team"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-navy)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-pa-mid)]"
            />
            Call My Team
          </Link>
          <p className="text-sm text-[color:var(--color-muted)] leading-relaxed self-center max-w-xl">
            Voice and text. Your CIO, CFO, CEO, COO and Personal Assistant — one call, every decision.
          </p>
        </div>
      </div>

      {/* Local keyframe — kept inside the component so it ships with
          it when this section is removed. Tailwind v4's @theme doesn't
          ship custom keyframes by default. */}
      <style>{`
        @keyframes ctyt-pulse {
          0%   { transform: scale(1);   opacity: 0.30; }
          70%  { transform: scale(1.6); opacity: 0;    }
          100% { transform: scale(1.6); opacity: 0;    }
        }
      `}</style>
    </section>
  );
}
