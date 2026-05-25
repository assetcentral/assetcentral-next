"use client";

// "What is AssetCentral?" — 120-second master explainer (v2).
//
// 12 scenes following the brief:
//   1. Funds vs private owners (split screen)
//   2. The gap closes into one workspace
//   3. Investor types as elegant cards (Dubai / Athens / Dublin / London)
//   4. Scattered information montage
//   5. Data tiles floating into the dashboard
//   6. Owner staring at laptop, questions overlay
//   7. Question sequence
//   8. AssetCentral product reveal
//   9. AI scans + structures real data
//  10. Full intelligent workspace
//  11. Before / after returns
//  12. Closing brand frame
//
// Same architecture as v1 ExplainerVideo: AnimatePresence cross-fades
// keyed on step, audio source-of-truth for elapsed time, subtitle strip
// pinned to the bottom-safe zone for LinkedIn / TikTok autoplay.

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const NAVY = "#0a0e27"; // slightly deeper than v1's #1a1a2e for premium contrast
const ACCENT = "#4f6ef7";
const POSITIVE = "#16a34a";
const WARNING = "#d97706";
const NEGATIVE = "#dc2626";

type Shot = { id: number; duration: number };
type Subtitle = { from: number; to: number; text: string };

// Per-shot duration in ms. Sums to 120,000 (120s) per the brief.
// Scene 0 is a logo/headline intro — silent so the audio (which has 5s
// of leading silence baked in) starts speaking exactly as Scene 1 begins.
export const SHOTS_120: Shot[] = [
  { id:  0, duration:  5000 }, // Logo + headline intro (silent)
  { id:  1, duration:  7000 }, // Funds vs private owner
  { id:  2, duration:  5000 }, // The gap closes
  { id:  3, duration:  9000 }, // Investor cards
  { id:  4, duration: 13000 }, // Scattered information
  { id:  5, duration: 11000 }, // Data tiles flow in
  { id:  6, duration: 13000 }, // Owner + questions overlay
  { id:  7, duration: 10000 }, // Question sequence
  { id:  8, duration:  8000 }, // AssetCentral reveal
  { id:  9, duration: 10000 }, // AI scans + structures
  { id: 10, duration: 10000 }, // Full workspace
  { id: 11, duration: 10000 }, // Before / after
  { id: 12, duration:  9000 }, // Closing brand frame
];

// Tight 60-second cut for the website hero. Skips the lighter scenes
// (gap-closes, investor cards, questions overlay) and leans into the
// strongest beats: chaos → consolidation → AI structure → workspace →
// before/after → closing. Audio has 4s of leading silence.
export const SHOTS_60: Shot[] = [
  { id:  0, duration:  4000 }, // Logo intro (silent)
  { id:  1, duration:  6000 }, // Funds vs private owner
  { id:  4, duration:  7000 }, // Scattered information
  { id:  5, duration:  5000 }, // Data tiles flow in
  { id:  7, duration:  6000 }, // Dashboard cards (questions answered)
  { id:  8, duration:  4000 }, // Brand reveal
  { id:  9, duration:  6000 }, // AI scans + structures
  { id: 10, duration:  8000 }, // Full workspace
  { id: 11, duration:  8000 }, // Before / after
  { id: 12, duration:  6000 }, // Closing brand frame
];

// Subtitle cues — pacing tuned to feel comfortable to read while the
// audio plays. Phrases break at natural pauses, never mid-clause.
// Audio file has 5,000 ms of silence at the start to give the logo intro
// room; all spoken cues sit at +5s relative to the first speech.
export const SUBTITLES_120: Subtitle[] = [
  // Scene 0 (0-5000) is silent — no subtitle
  { from:   5000, to:   8500, text: "A professional fund has an asset manager." },
  { from:   8500, to:  12000, text: "A private property owner has spreadsheets." },
  { from:  12000, to:  17000, text: "That gap is exactly why AssetCentral exists." },
  { from:  17000, to:  21500, text: "Most property investors are not short of assets." },
  { from:  21500, to:  26000, text: "They are short of usable data, time, and sometimes liquidity." },
  { from:  26000, to:  32500, text: "The information that drives better returns is scattered." },
  { from:  32500, to:  39000, text: "Hidden. Inaccessible. Or simply unknown to the owner." },
  { from:  39000, to:  45000, text: "Rent. Mortgage. Service charges. Operator reports. Loan docs." },
  { from:  45000, to:  50000, text: "Across emails, PDFs, bank accounts, portals and spreadsheets." },
  { from:  50000, to:  57000, text: "Owners are left answering serious financial questions" },
  { from:  57000, to:  63000, text: "without a clear view." },
  { from:  63000, to:  65500, text: "What's my real net yield?" },
  { from:  65500, to:  67500, text: "Which property is generating cash?" },
  { from:  67500, to:  69500, text: "Which one is quietly losing money?" },
  { from:  69500, to:  71500, text: "Is my operator reporting correctly?" },
  { from:  71500, to:  73000, text: "When does my loan mature?" },
  { from:  73000, to:  81000, text: "AssetCentral is the AI-powered return platform for property owners." },
  { from:  81000, to:  87000, text: "It finds, structures and interprets real property data" },
  { from:  87000, to:  91000, text: "that owners couldn't easily access before." },
  { from:  91000, to:  98500, text: "Income, costs, debt, documents, operator reports, market evidence." },
  { from:  98500, to: 106000, text: "Cashflow, risks and upcoming decisions — in one intelligent workspace." },
  { from: 106000, to: 111000, text: "Not just visibility." },
  { from: 111000, to: 116000, text: "Faster, better decisions. Better returns." },
  { from: 116000, to: 119000, text: "Real data. Better decisions. Better returns." },
  { from: 119000, to: 124000, text: "AssetCentral.ai" },
];

// 60-second subtitle cues — audio has 4s leading silence; first spoken
// cue at 4s. Times calculated against natural speech pace of the brief's
// 60s script (~150 words at ~2.8 wps = 53s spoken + 4s silence + small
// pauses ≈ 60s).
export const SUBTITLES_60: Subtitle[] = [
  // 0–4s silent (logo intro)
  { from:  4000, to:  6500,  text: "A professional fund has an asset manager." },
  { from:  6500, to:  9500,  text: "A private property owner has spreadsheets." },
  { from:  9500, to: 12500,  text: "That gap is why AssetCentral exists." },
  { from: 12500, to: 16000,  text: "Most investors aren't short of assets." },
  { from: 16000, to: 19500,  text: "They're short of usable data, time, and liquidity." },
  { from: 19500, to: 25000,  text: "Information scattered across emails, PDFs, portals." },
  { from: 25000, to: 30000,  text: "Rent. Mortgage. Operator reports. Market data. Capex." },
  { from: 30000, to: 33000,  text: "Owners struggle to answer the questions that matter." },
  { from: 33000, to: 35000,  text: "What's my real net yield?" },
  { from: 35000, to: 37000,  text: "Which property is generating cash?" },
  { from: 37000, to: 39000,  text: "Should I hold, refinance, sell, or invest more?" },
  { from: 39000, to: 44000,  text: "AssetCentral is the AI-powered return platform for property owners." },
  { from: 44000, to: 49000,  text: "It finds, structures and interprets real property data." },
  { from: 49000, to: 53000,  text: "Scattered information becomes faster, better decisions." },
  { from: 53000, to: 57000,  text: "Real data. Better decisions. Better returns." },
  { from: 57000, to: 60000,  text: "AssetCentral.ai" },
];

/** Props on the explainer let us reuse the same scene library across
 *  multiple durations / scripts. Defaults to the 120s "long" cut. */
export function ExplainerVideoV2({
  shots = SHOTS_120,
  subtitles = SUBTITLES_120,
  audioSrc = "/demo-vo-v2.wav",
  totalMs = 120000,
  variantLabel,
}: {
  shots?: Shot[];
  subtitles?: Subtitle[];
  audioSrc?: string;
  totalMs?: number;
  /** Optional small-text label under the play button, e.g. "60 seconds" */
  variantLabel?: string;
} = {}) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isRecordMode, setIsRecordMode] = useState(false);
  const [showSubs, setShowSubs] = useState(true);
  const [withSound, setWithSound] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsRecordMode(params.has("record"));
      if (params.get("subs") === "0" || params.has("nosubs")) setShowSubs(false);
      if (params.get("sound") === "0" || params.has("nosound")) setWithSound(false);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (step >= shots.length) return;
    timerRef.current = setTimeout(() => setStep((s) => s + 1), shots[step].duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [step, playing]);

  useEffect(() => {
    if (!playing) return;
    startRef.current = Date.now() - elapsedMs;
    intervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      const t = withSound && audio && !audio.paused
        ? Math.round(audio.currentTime * 1000)
        : Date.now() - startRef.current;
      setElapsedMs(t);
      if (t >= totalMs && intervalRef.current) clearInterval(intervalRef.current);
    }, 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, step === 0 ? 0 : null, withSound]);

  const startPlayback = () => {
    setStep(0);
    setElapsedMs(0);
    setPlaying(true);
    if (withSound && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const replay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setElapsedMs(0);
    setStep(0);
    setPlaying(false);
    setTimeout(() => startPlayback(), 30);
  };

  const activeSubtitle = useMemo(
    () => subtitles.find((s) => elapsedMs >= s.from && elapsedMs < s.to),
    [elapsedMs],
  );

  return (
    <div
      style={{ backgroundColor: NAVY }}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
    >
      {/* Voiceover audio. Currently a Hazel placeholder — swap with the
          ElevenLabs (Charlotte / Brian) generated MP3 by overwriting
          /public/demo-vo-v2.wav (or update src to .mp3 if you re-export). */}
      {withSound && (
        <audio ref={audioRef} src={audioSrc} preload="auto" aria-hidden />
      )}

      {/* Premium ambient gradient + grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(79,110,247,0.08) 0%, transparent 50%), " +
            "radial-gradient(circle at 70% 80%, rgba(79,110,247,0.05) 0%, transparent 50%)",
        }}
      />
      <div
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-50"
      />

      {/* 16:9 canvas */}
      <div
        className="relative aspect-video w-full max-w-[1920px] overflow-hidden"
        style={{ maxHeight: "100vh" }}
      >
        {/* mode="wait" — the previous scene fully exits before the next enters,
            so text never overlaps text during transitions. Shorter durations
            keep the rhythm tight. */}
        <AnimatePresence mode="wait">
          {step < shots.length && (
            <motion.div
              key={shots[step].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Scene id={shots[step].id} />
            </motion.div>
          )}
        </AnimatePresence>

        {step >= shots.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Scene id={12} />
          </motion.div>
        )}

        {/* Subtitle overlay */}
        {showSubs && (
          <div className="pointer-events-none absolute left-0 right-0 bottom-[8%] flex justify-center px-[6%] z-40">
            <AnimatePresence mode="wait">
              {activeSubtitle && (
                <motion.div
                  key={activeSubtitle.from}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-[80%] rounded-md bg-black/55 backdrop-blur-sm px-4 py-2 text-center"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  <span
                    className="text-white text-[clamp(14px,1.6vw,28px)] leading-snug"
                    style={{
                      textShadow:
                        "0 1px 2px rgba(0,0,0,0.6), 0 0 4px rgba(0,0,0,0.4)",
                    }}
                  >
                    {activeSubtitle.text}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Click-to-start overlay */}
      {!playing && (
        <button
          onClick={startPlayback}
          className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer group"
          style={{ backgroundColor: "rgba(10,14,39,0.92)" }}
        >
          <div className="flex flex-col items-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ backgroundColor: ACCENT }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div
              className="text-white text-[20px]"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              What is AssetCentral?
            </div>
            <div
              className="text-white/50 text-[12px]"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {variantLabel
                ? variantLabel
                : (withSound ? `${Math.round(totalMs / 1000)} seconds · British voiceover · placeholder` : `${Math.round(totalMs / 1000)} seconds · silent`)}
            </div>
          </div>
        </button>
      )}

      {/* Recording controls */}
      {!isRecordMode && playing && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
          <div
            className="rounded-full bg-white/10 px-4 py-2 text-[12px] text-white/80 backdrop-blur-md"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {String(Math.floor(elapsedMs / 1000)).padStart(3, "0")}.
            {String(Math.floor(elapsedMs % 1000)).padStart(3, "0")} / {(totalMs / 1000).toFixed(3)}
          </div>
          <button
            onClick={replay}
            className="rounded-full bg-white/10 px-4 py-2 text-[12px] text-white hover:bg-white/20 backdrop-blur-md"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            ↻ Replay
          </button>
          <a
            href="/demo/v2?record=1"
            className="rounded-full bg-white/10 px-4 py-2 text-[12px] text-white hover:bg-white/20 backdrop-blur-md"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            Hide controls →
          </a>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Shared bits
// ===========================================================================

/** Inline number-ticker for the demo. No external context, no useInView —
 *  starts on mount + optional delay. Renders into a span whose textContent
 *  is updated by framer-motion. */
function CountUp({
  from,
  to,
  suffix = "",
  duration = 1.2,
  startDelay = 0,
  accent = false,
}: {
  from: number;
  to: number;
  suffix?: string;
  duration?: number;
  startDelay?: number;
  accent?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(from);
  const text = useTransform(mv, (latest) => `${Math.round(latest).toLocaleString("en-GB")}${suffix}`);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] });
      return () => controls.stop();
    }, startDelay * 1000);
    return () => clearTimeout(timeout);
  }, [mv, to, duration, startDelay]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const unsub = text.on("change", (v) => {
      node.textContent = String(v);
    });
    node.textContent = String(text.get());
    return () => unsub();
  }, [text]);

  return (
    <span
      ref={ref}
      className="tabular-nums"
      style={{
        fontFamily: "var(--font-mono, monospace)",
        color: accent ? "#7d96ff" : "inherit",
        fontSize: "15px",
        fontWeight: 600,
      }}
    />
  );
}

/** Monospace city code badge. Replaces emoji flags — renders consistently
 *  across OSes (Windows doesn't ship full-colour flag emoji) and reads
 *  more "financial terminal" than "messaging app". */
function LocationBadge({ code, accent = false }: { code: string; accent?: boolean }) {
  return (
    <span
      className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-semibold tabular-nums tracking-wider"
      style={{
        fontFamily: "var(--font-mono, monospace)",
        border: `1px solid ${accent ? "rgba(79,110,247,0.45)" : "rgba(255,255,255,0.18)"}`,
        backgroundColor: accent ? "rgba(79,110,247,0.12)" : "rgba(255,255,255,0.04)",
        color: accent ? "#7d96ff" : "rgba(255,255,255,0.75)",
      }}
    >
      {code}
    </span>
  );
}

// ===========================================================================
// Scene router
// ===========================================================================

function Scene({ id }: { id: number }) {
  switch (id) {
    case 0:  return <Scene0 />;
    case 1:  return <Scene1 />;
    case 2:  return <Scene2 />;
    case 3:  return <Scene3 />;
    case 4:  return <Scene4 />;
    case 5:  return <Scene5 />;
    case 6:  return <Scene6 />;
    case 7:  return <Scene7 />;
    case 8:  return <Scene8 />;
    case 9:  return <Scene9 />;
    case 10: return <Scene10 />;
    case 11: return <Scene11 />;
    case 12: return <Scene12 />;
    default: return null;
  }
}

// ===========================================================================
// Scenes
// ===========================================================================

// ── Scene 0: Logo + headline intro (silent) ─────────────────────────────────
function Scene0() {
  return (
    <div className="text-center">
      {/* Tiny eyebrow line above the logo, for slow-burn premium feel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-5"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        AssetCentral
      </motion.div>

      {/* Big serif headline */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[5.5vw] text-white leading-[1.05] tracking-tight"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        What is AssetCentral?
      </motion.div>

      {/* Accent line that draws from left */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
        className="h-[2px] mt-6 mx-auto"
        style={{ backgroundColor: ACCENT, width: "20%", transformOrigin: "left" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.4 }}
        className="mt-5 text-[1.6vw] text-white/70 max-w-[55vw] mx-auto"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        The AI-powered return platform for property owners.
      </motion.div>
    </div>
  );
}

// ── Scene 1: Professional fund vs private owner ─────────────────────────────
function Scene1() {
  return (
    // pt-[8%] / pb-[18%] keeps the panels above the subtitle zone (which
    // sits at bottom-[8%]) — without the asymmetric padding the right
    // panel's document chips collide with the subtitle pill.
    <div className="w-full h-full grid grid-cols-2 gap-6 px-[6%] pt-[8%] pb-[18%]">
      {/* Left — Institutional fund */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 flex flex-col"
      >
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          Institutional fund
        </div>
        <div className="text-[18px] text-white mb-4" style={{ fontFamily: "var(--font-display, serif)" }}>
          Asset Management Dashboard
        </div>
        <div className="space-y-3 flex-1">
          {["Bloomberg feed", "RICS valuations", "Fund-level cashflow"].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.25, duration: 0.4 }}
              className="flex items-center gap-2 text-[13px] text-white/75"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: POSITIVE }} />
              {src}
            </motion.div>
          ))}
        </div>
        {/* Mini chart */}
        <svg viewBox="0 0 200 40" className="w-full h-10 mt-4">
          <polyline points="0,30 20,28 40,22 60,24 80,18 100,16 120,12 140,14 160,9 180,8 200,5"
            fill="none" stroke={ACCENT} strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Right — Private owner */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 flex flex-col"
      >
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          Private property owner
        </div>
        <div className="text-[18px] text-white mb-4" style={{ fontFamily: "var(--font-display, serif)" }}>
          Spreadsheets &amp; emails
        </div>
        <div className="grid grid-cols-3 gap-1.5 mb-4" style={{ fontFamily: "var(--font-mono, monospace)" }}>
          {/* 3×3 grid of pseudo-spreadsheet cells — feels "spreadsheet"
              without overwhelming the panel. The intentional irregularity
              (varying opacities) sells the chaos without being noisy. */}
          {[0.45, 0.6, 0.35, 0.7, 0.4, 0.55, 0.5, 0.65, 0.4].map((opacity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
              className="h-3.5 rounded bg-white/15"
            />
          ))}
        </div>
        <div className="flex-1 flex items-end gap-2 flex-wrap">
          {["📄 lease.pdf", "📊 portfolio.xlsx", "📑 mortgage.pdf"].map((doc, i) => (
            <motion.div
              key={doc}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.15, duration: 0.4 }}
              className="text-[10.5px] px-2 py-1 rounded bg-white/10 text-white/70"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {doc}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ── Scene 2: The gap closes ─────────────────────────────────────────────────
function Scene2() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Light streaks converging into the centre */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 300;
        const y = Math.sin(angle) * 300;
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: ACCENT }}
            initial={{ x, y, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }}
          />
        );
      })}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          AssetCentral
        </div>
        <div className="text-[4vw] text-white leading-tight max-w-[80vw]" style={{ fontFamily: "var(--font-display, serif)" }}>
          Closes the gap.
        </div>
      </motion.div>
    </div>
  );
}

// ── Scene 3: Investor property cards ───────────────────────────────────────
function Scene3() {
  const properties = [
    { code: "DXB", city: "Dubai",  type: "Marina apartment",  note: "Long-let" },
    { code: "ATH", city: "Athens", type: "Plaka penthouse",   note: "Short-term let" },
    { code: "DUB", city: "Dublin", type: "Ballsbridge flat",  note: "Long-let" },
    { code: "LDN", city: "London", type: "Notting Hill flat", note: "Pied-à-terre" },
  ];
  return (
    <div className="w-full px-[8%]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 text-[10px] uppercase tracking-[0.25em] text-white/50"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Your portfolio
      </motion.div>
      <div className="grid grid-cols-4 gap-4">
        {properties.map((p, i) => (
          <motion.div
            key={p.city}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur p-5"
          >
            <div className="mb-3">
              <LocationBadge code={p.code} />
            </div>
            <div className="text-[12px] uppercase tracking-wide text-white/50 mb-1" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              {p.city}
            </div>
            <div className="text-[15px] text-white leading-tight mb-2" style={{ fontFamily: "var(--font-display, serif)" }}>
              {p.type}
            </div>
            <div className="inline-block text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              {p.note}
            </div>
            {/* Data-gap overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.2 }}
              className="mt-4 flex items-center gap-2 text-[10px]"
              style={{ color: WARNING, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: WARNING }} />
              Net yield: unknown
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Scene 4: Scattered information montage ──────────────────────────────────
// Heavily email-weighted (4 of 7 sources) + PDFs + portals + one mobile
// message — matches how real owners actually receive their data. Stagger
// slowed to 0.4s/card so each item registers individually.
function Scene4() {
  const items = [
    { type: "email", subject: "Re: Rent due July",      from: "tenant@gmail.com",        x: -36, y: -24, rot: -4, w: 250 },
    { type: "pdf",   subject: "rent-jul-2026.pdf",      from: "Statement · 2 pages",     x:  32, y: -26, rot: 5,  w: 220 },
    { type: "email", subject: "Service charge notice",  from: "ownersassoc@marina.ae",   x: -30, y:   2, rot: 2,  w: 250 },
    { type: "pdf",   subject: "mortgage-statement.pdf", from: "HSBC · July 2026",        x:  34, y:  -2, rot: -3, w: 230 },
    { type: "email", subject: "Booking.com payout",     from: "noreply@booking.com",     x:  -8, y:  22, rot: 3,  w: 250 },
    { type: "email", subject: "Insurance renewal",      from: "policies@axa.com",        x:  26, y:  26, rot: 6,  w: 240 },
    { type: "msg",   subject: "Tenant: heater broken",  from: "+971 50… · WhatsApp",     x: -36, y:  28, rot: -7, w: 230 },
  ];
  return (
    <div className="relative w-full h-full">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-md bg-white/[0.06] backdrop-blur border border-white/10 px-3 py-2.5"
          style={{
            transform: `translate(${it.x * 7}px, ${it.y * 5}px) rotate(${it.rot}deg)`,
            width: it.w,
            fontFamily: "var(--font-sans, sans-serif)",
          }}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: i * 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-1.5 text-[9.5px] text-white/40 uppercase tracking-wide">
            <span
              className="inline-block px-1 py-0 rounded"
              style={{
                color: it.type === "email" ? "#7d96ff" : it.type === "pdf" ? "#f59e0b" : "#10b981",
                backgroundColor: (it.type === "email" ? "#7d96ff" : it.type === "pdf" ? "#f59e0b" : "#10b981") + "20",
              }}
            >
              {it.type === "email" ? "✉ Email" : it.type === "pdf" ? "▤ PDF" : "✱ Msg"}
            </span>
          </div>
          <div className="text-[12.5px] text-white/90 mt-1 truncate font-medium">{it.subject}</div>
          <div className="text-[10.5px] text-white/45 mt-0.5 truncate">{it.from}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Scene 5: Data tiles flow into central dashboard ────────────────────────
function Scene5() {
  // Six representative tiles instead of ten. Each is a "category" of
  // scattered info that gets pulled into the workspace.
  const tiles = [
    "Rent statements",
    "Mortgage payments",
    "Service charges",
    "Operator reports",
    "Loan documents",
    "Market pricing",
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Centre target. After the tiles arrive, the inner content keeps
          updating — bars subtly cycle and a numeric counter ticks up —
          so the scene doesn't go static during the long 9-second hold. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur"
        style={{ width: 360, height: 220 }}
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                AssetCentral
              </div>
              <div className="text-[16px] text-white mt-1" style={{ fontFamily: "var(--font-display, serif)" }}>
                Portfolio workspace
              </div>
            </div>
            <motion.span
              className="inline-flex items-center gap-1.5 text-[9.5px] px-1.5 py-0.5 rounded text-white/60 bg-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <motion.span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: POSITIVE }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              syncing
            </motion.span>
          </div>
          <div className="mt-4 space-y-1.5">
            {/* Bars breathe between two widths on a long ease — restrained
                continuous motion that suggests "live data" without distracting. */}
            {[
              ["60%", "75%"],
              ["85%", "70%"],
              ["70%", "85%"],
              ["50%", "65%"],
            ].map((widths, i) => (
              <motion.div
                key={i}
                initial={{ width: "0%" }}
                animate={{ width: widths }}
                transition={{
                  delay: 1.5 + i * 0.15,
                  duration: 3.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="h-2 rounded bg-white/15"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tiles arriving from radial positions */}
      {tiles.map((tile, i) => {
        const angle = (i / tiles.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 380;
        const startX = Math.cos(angle) * radius;
        const startY = Math.sin(angle) * radius;
        return (
          <motion.div
            key={tile}
            className="absolute rounded-md bg-white/10 backdrop-blur border border-white/15 px-3 py-1.5 text-[11px] text-white"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            initial={{ x: startX, y: startY, opacity: 0, scale: 0.7 }}
            animate={{
              x: [startX, startX * 0.4, 0],
              y: [startY, startY * 0.4, 0],
              opacity: [0, 1, 0.3],
              scale: [0.7, 1, 0.5],
            }}
            transition={{
              duration: 1.4,
              delay: 0.2 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.6, 1],
            }}
          >
            {tile}
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Scene 6: Owner + questions overlay ──────────────────────────────────────
function Scene6() {
  const questions = [
    { text: "What's my real net yield?",            x: -32, y: -25, delay: 0.6 },
    { text: "Which property is losing money?",      x:  30, y: -22, delay: 1.1 },
    { text: "Is the operator reporting correctly?", x: -28, y:  18, delay: 1.6 },
    { text: "When does my loan mature?",            x:  32, y:  22, delay: 2.1 },
    { text: "Should I hold, sell or refinance?",    x:   0, y:  32, delay: 2.6 },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central laptop / workspace silhouette */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur p-8 text-center"
      >
        <div className="w-32 h-20 mx-auto mb-4 rounded border border-white/20 bg-white/[0.03]" />
        <div className="text-[12px] text-white/50" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          Late evening · portfolio review
        </div>
      </motion.div>

      {/* Floating questions */}
      {questions.map((q, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-lg border px-4 py-2.5"
          style={{
            transform: `translate(${q.x * 8}px, ${q.y * 6}px) translate(-50%, -50%)`,
            borderColor: "rgba(217,119,6,0.35)",
            backgroundColor: "rgba(217,119,6,0.08)",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: q.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[12.5px]" style={{ color: WARNING }}>?</span>
          <span className="text-[12.5px] text-white/90 ml-2">{q.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Scene 7: Question sequence with answering dashboard cards ───────────────
function Scene7() {
  const cards = [
    { label: "Real net yield",       value: "5.8%",      tone: POSITIVE, delay: 0.3 },
    { label: "Cashflow this month",  value: "+€3,240",   tone: POSITIVE, delay: 1.0 },
    { label: "Operator fee",         value: "+2pp",      tone: WARNING,  delay: 1.7 },
    { label: "Loan maturity",        value: "47 days",   tone: NEGATIVE, delay: 2.4 },
    { label: "Sell vs hold",         value: "Trade up",  tone: POSITIVE, delay: 3.1 },
  ];
  return (
    <div className="w-full px-[8%]">
      <div className="grid grid-cols-5 gap-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              // Continuous "scan" — one card at a time gets a subtle accent
              // ring over the 10s scene. Stagger means the highlight walks
              // across the row so the eye keeps moving.
              boxShadow: [
                "0 0 0 1px transparent",
                "0 0 0 1px transparent",
                `0 0 0 1px ${c.tone}80`,
                "0 0 0 1px transparent",
              ],
            }}
            transition={{
              opacity: { delay: c.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              y:       { delay: c.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              boxShadow: {
                duration: 7,
                delay: 4 + i * 0.9,
                times: [0, 0.4, 0.5, 0.6],
                repeat: Infinity,
              },
            }}
            className="rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur p-4"
          >
            <div
              className="text-[9.5px] uppercase tracking-wide text-white/50 mb-2"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {c.label}
            </div>
            <div
              className="text-[18px] font-medium"
              style={{ color: c.tone, fontFamily: "var(--font-mono, monospace)" }}
            >
              {c.value}
            </div>
            <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ backgroundColor: c.tone + "30" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: c.tone }}
                initial={{ width: 0 }}
                animate={{ width: ["70%", "82%", "70%"] }}
                transition={{
                  width: { delay: c.delay + 0.3, duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Scene 8: AssetCentral brand reveal ──────────────────────────────────────
function Scene8() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-[7vw] text-white leading-none tracking-tight"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        AssetCentral
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="h-[2px] mt-4 mx-auto"
        style={{ backgroundColor: ACCENT, width: "32%", transformOrigin: "left" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-6 text-[1.8vw] text-white/70 max-w-[60vw] mx-auto"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        The AI-powered return platform for property owners.
      </motion.div>
    </div>
  );
}

// ── Scene 9: AI scans + structures real data ────────────────────────────────
function Scene9() {
  return (
    <div className="relative w-full h-full px-[8%] flex items-center gap-6">
      {/* Source documents (left) */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {["Operator statement", "Mortgage schedule", "DLD transaction", "Lease agreement"].map((doc, i) => (
          <motion.div
            key={doc}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            className="rounded border border-white/10 bg-white/[0.05] p-3"
          >
            <div className="text-[9.5px] uppercase text-white/40 tracking-wide" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              {doc}
            </div>
            {/* Doc-line shimmer */}
            <div className="mt-2 space-y-1">
              {[80, 60, 75].map((w, j) => (
                <motion.div
                  key={j}
                  className="h-1.5 rounded bg-white/15"
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ delay: 0.6 + i * 0.15 + j * 0.1, duration: 0.4 }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI scanning bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-24 h-2/3 relative"
      >
        <div className="absolute inset-y-0 left-1/2 w-px" style={{ backgroundColor: ACCENT + "30" }} />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{ backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}` }}
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%", "100%"] }}
          transition={{ duration: 4, repeat: 1, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Structured output (right) */}
      <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] p-5">
        <div className="text-[10px] uppercase tracking-wide text-white/40 mb-3" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          Structured insight
        </div>
        {[
          { label: "Net yield", value: "5.8%", tone: POSITIVE },
          { label: "Operator fee", value: "27% (+2pp)", tone: WARNING },
          { label: "Next reset", value: "47 days", tone: NEGATIVE },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + i * 0.3, duration: 0.4 }}
            className="flex justify-between items-center py-2 border-b border-white/5 last:border-b-0"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            <span className="text-[12px] text-white/60">{row.label}</span>
            <span className="text-[13px]" style={{ color: row.tone }}>{row.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Scene 10: Full intelligent workspace ────────────────────────────────────
function Scene10() {
  const properties = [
    { code: "DXB", name: "Marina Apt 1",     yield: "6.1%", tone: POSITIVE, alert: false },
    { code: "DXB", name: "Marina Apt 2",     yield: "5.4%", tone: POSITIVE, alert: true  },
    { code: "DXB", name: "JVC Studio",       yield: "7.2%", tone: POSITIVE, alert: false },
    { code: "LDN", name: "London Flat",      yield: "4.1%", tone: WARNING,  alert: false },
    { code: "ATH", name: "Athens Penthouse", yield: "5.8%", tone: POSITIVE, alert: false },
    { code: "DUB", name: "Dublin Flat",      yield: "5.4%", tone: POSITIVE, alert: false },
    { code: "PAR", name: "Paris 2-bed",      yield: "3.9%", tone: WARNING,  alert: false },
    { code: "MAD", name: "Madrid Apt",       yield: "6.5%", tone: POSITIVE, alert: false },
  ];
  return (
    <div className="w-full px-[6%]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-baseline justify-between mb-5"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Portfolio</div>
          <div className="text-[26px] mt-1 text-white" style={{ fontFamily: "var(--font-display, serif)" }}>
            €4.2M · 5.8% net yield
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/70">8 properties</span>
          <span className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: WARNING + "30", color: WARNING }}>
            2 alerts
          </span>
          {/* "Live updating" status pulse — gives the header continuous
              motion so the scene doesn't go static after the cards enter. */}
          <motion.span
            className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded text-white/70 bg-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: POSITIVE }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Live
          </motion.span>
        </div>
      </motion.div>
      <div className="relative grid grid-cols-4 gap-3">
        {properties.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              // Secondary motion — each card gets one slow "highlight sweep"
              // across the 15s scene. Staggering the times so the eye moves
              // across the grid rather than all cards pulsing in unison.
              boxShadow: [
                "0 0 0 1px transparent",
                "0 0 0 1px transparent",
                `0 0 24px 0 ${p.tone}40`,
                "0 0 0 1px transparent",
              ],
            }}
            transition={{
              opacity: { delay: 0.15 + i * 0.06, duration: 0.4 },
              y:       { delay: 0.15 + i * 0.06, duration: 0.4 },
              boxShadow: {
                duration: 12,
                delay: 2 + i * 1.2,
                times: [0, 0.4, 0.5, 0.6],
                repeat: Infinity,
                repeatDelay: 0,
              },
            }}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5"
          >
            <div className="flex items-center gap-2 mb-2">
              <LocationBadge code={p.code} />
              <span className="text-[11.5px] text-white truncate" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                {p.name}
              </span>
              {p.alert && (
                <motion.span
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: NEGATIVE }}
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              )}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[16px] font-medium" style={{ color: p.tone, fontFamily: "var(--font-mono, monospace)" }}>
                {p.yield}
              </span>
              <span className="text-[9.5px] text-white/40">net</span>
            </div>
            <svg viewBox="0 0 100 18" className="w-full h-3 mt-2">
              <polyline
                points="0,14 15,10 30,12 45,7 60,9 75,5 90,6 100,4"
                fill="none"
                stroke={p.tone}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Scene 11: Before / after — not just visibility, better returns ──────────
function Scene11() {
  return (
    <div className="w-full px-[8%] grid grid-cols-2 gap-8">
      {/* Before */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col"
      >
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          Before
        </div>
        <div className="text-[20px] text-white/70 mb-5" style={{ fontFamily: "var(--font-display, serif)" }}>
          Visibility
        </div>
        <div className="space-y-2 flex-1">
          {["Scattered documents", "Vague net yield estimate", "Reactive on resets", "Operator unchecked"].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="text-[12.5px] text-white/60 flex items-center gap-2"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <span className="w-1 h-1 rounded-full bg-white/30" />
              {t}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* After */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-xl border-2 p-6 flex flex-col relative overflow-hidden"
        style={{ borderColor: ACCENT, backgroundColor: ACCENT + "08" }}
      >
        <div className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}>
          With AssetCentral
        </div>
        <div className="text-[20px] text-white mb-5" style={{ fontFamily: "var(--font-display, serif)" }}>
          Better returns
        </div>
        <div className="space-y-2 flex-1">
          {[
            { t: "Real net yield, per property", val: "+120bps" },
            { t: "Resets caught 90 days out",    val: "Avoided" },
            { t: "Operator fee verified",        val: "−AED 4k/yr" },
            { t: "Sell vs hold modelled",        val: "+10.5% IRR" },
          ].map((row, i) => (
            <motion.div
              key={row.t}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.18 }}
              className="flex justify-between items-center text-[12.5px]"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <span className="text-white/80 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: POSITIVE }} />
                {row.t}
              </span>
              <span style={{ color: POSITIVE, fontFamily: "var(--font-mono, monospace)" }}>{row.val}</span>
            </motion.div>
          ))}
        </div>

        {/* Lift indicator at the bottom — small inline "↑ portfolio return"
            counter that ticks up across the remaining scene time so the
            After card stays alive after the row reveals finish. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <span className="text-[11px] uppercase tracking-wide" style={{ color: ACCENT }}>
            Portfolio return lift
          </span>
          <span className="flex items-baseline gap-1.5">
            <CountUp from={0} to={180} suffix=" bps" startDelay={1.8} duration={5} accent />
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ color: POSITIVE }}
              className="text-[14px]"
            >
              ↑
            </motion.span>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Scene 12: Closing brand frame ──────────────────────────────────────────
function Scene12() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-[3vw] text-white/85 leading-tight"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Real data.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-[3vw] text-white/85 leading-tight"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Better decisions.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="text-[3.4vw] leading-tight"
        style={{ color: ACCENT, fontFamily: "var(--font-display, serif)" }}
      >
        Better returns.
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="h-px mt-8 mx-auto"
        style={{ backgroundColor: "rgba(255,255,255,0.25)", width: "20%", transformOrigin: "left" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="mt-5 text-[2vw] text-white"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        AssetCentral.ai
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.4 }}
        className="mt-2 text-[1.1vw] text-white/50"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        The AI-powered return platform for property owners.
      </motion.div>
    </div>
  );
}
