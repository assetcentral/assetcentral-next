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
// Scene 0 now bumped to 8s so the positioning hero (3-beat reveal +
// PA closer) plays fully. Scene 5 trimmed from 11→8s to keep total 120s.
// NOTE: the /demo-vo-v2.wav audio file still has 5s leading silence —
// it will be out of sync by ~3s until regenerated with the new opening.
export const SHOTS_120: Shot[] = [
  { id:  0, duration:  8000 }, // Positioning hero
  { id:  1, duration:  7000 }, // Funds vs private owner
  { id:  2, duration:  5000 }, // The gap closes
  { id:  3, duration:  9000 }, // Investor cards
  { id:  4, duration: 13000 }, // Scattered information
  { id:  5, duration:  8000 }, // Data tiles flow in
  { id:  6, duration: 13000 }, // Owner + questions overlay
  { id:  7, duration: 10000 }, // Question sequence
  { id:  8, duration:  8000 }, // AssetCentral reveal
  { id:  9, duration: 10000 }, // AI scans + structures
  { id: 10, duration: 10000 }, // Full workspace
  { id: 11, duration: 10000 }, // Before / after
  { id: 12, duration:  9000 }, // Closing brand frame
];

// 91-second website hero cut. Tuned to the ElevenLabs Kristen read
// (~89s expected with new welcome line) + a ~2s silent outro.
//
// Opens with a 5s "Welcome to AssetCentral.ai" beat, then Scene 0
// (positioning hero) lands the value prop, then the rest of the
// problem → solution arc.
export const SHOTS_60: Shot[] = [
  { id: 13, duration:  5000 }, // Welcome ("Welcome to AssetCentral.ai")
  { id:  0, duration: 10000 }, // Positioning hero
  { id:  1, duration:  8000 }, // Funds vs private owner
  { id:  4, duration: 11000 }, // Scattered information
  { id:  5, duration:  9000 }, // Data tiles flow in
  { id:  7, duration:  9000 }, // Dashboard cards (questions answered)
  { id:  8, duration:  5000 }, // Brand reveal
  { id:  9, duration:  9000 }, // AI scans + structures
  { id: 10, duration: 10000 }, // Full workspace
  { id: 11, duration:  8000 }, // Before / after
  { id: 12, duration:  7000 }, // Closing brand frame (silent outro)
];

// 93-second walkthrough cut for /demo/get-started. Tuned to the Kristen
// VO (see /public/demo-vo-get-started-script.md). 5s silent intro, then
// the four input methods, then three "output" beats, then closing CTA.
//
// Reuses Scene 7 (dashboard cards) + Scene 9 (AI scans) for two of the
// three output beats — those scenes already nail those moments and
// keeping them shared means improvements to the originals propagate.
export const SHOTS_GET_STARTED: Shot[] = [
  { id: 20, duration:  5000 }, // Welcome — "Setting up your first property"
  { id: 21, duration:  9000 }, // Way 1 — Type the address
  { id: 22, duration: 10000 }, // Way 2 — Upload a document
  { id: 23, duration: 10000 }, // Way 3 — Forward an email
  { id: 24, duration: 10000 }, // Way 4 — Snap on WhatsApp
  { id:  7, duration: 11000 }, // Output 1 — Dashboard cards
  { id: 25, duration: 10000 }, // Output 2 — Alerts
  { id:  9, duration: 11000 }, // Output 3 — AI scans / insight
  { id: 26, duration:  7000 }, // Closing CTA
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

// Verbatim subtitle cues for the ElevenLabs Kristen read (84.3s spoken).
// Pacing roughly 1.29× longer than Adam's, so phrase start-times are
// re-estimated against Kristen's slower delivery. Final brand-frame cue
// lingers a moment past the audio end during the ~2s silent outro.
export const SUBTITLES_60: Subtitle[] = [
  // Scene 0 — positioning hero
  { from:     0, to:  6000,  text: "AI just changed what's possible for private property owners." },
  { from:  6500, to: 10000,  text: "Real data. Better decisions. Better returns." },
  { from: 10500, to: 14000,  text: "Your own Real Estate PA." },

  // Scene 1 — funds vs owner
  { from: 15000, to: 19500,  text: "A professional fund has an asset manager." },
  { from: 20000, to: 24500,  text: "A private property owner usually has spreadsheets." },
  { from: 25500, to: 29000,  text: "That gap is why AssetCentral exists." },

  // Scene 4 — scattered info (one long sentence, split across two cues)
  { from: 30000, to: 35000,  text: "The information that drives better returns is scattered" },
  { from: 35000, to: 41000,  text: "across emails, PDFs, bank accounts, portals and spreadsheets." },

  // Scene 5 — tiles flow (data-source list)
  { from: 42500, to: 47000,  text: "Rent statements. Mortgage payments. Service charges." },
  { from: 47000, to: 49500,  text: "Operator reports. Market data." },

  // Scene 7 — dashboard / questions answered
  { from: 51000, to: 56000,  text: "So owners struggle to answer the questions that matter." },
  { from: 57000, to: 59500,  text: "What is my real net yield?" },
  { from: 60000, to: 63000,  text: "Which property is generating cash?" },
  { from: 63500, to: 68000,  text: "Should I hold, refinance, sell, or invest more?" },

  // Scene 9 — AI scans (long sentence, split across two cues)
  { from: 69000, to: 73500,  text: "AssetCentral finds, structures and interprets real property data" },
  { from: 73500, to: 78000,  text: "that owners couldn't easily access before." },

  // Scene 10 — workspace
  { from: 78500, to: 81500,  text: "Scattered information becomes faster, better decisions." },

  // Scene 11 + 12 — closing
  { from: 82000, to: 84500,  text: "Real data. Better decisions. Better returns." },
  { from: 84500, to: 86000,  text: "AssetCentral.ai" },
];

/** Props on the explainer let us reuse the same scene library across
 *  multiple durations / scripts. Defaults to the 120s "long" cut. */
export function ExplainerVideoV2({
  shots = SHOTS_120,
  subtitles = SUBTITLES_120,
  audioSrc = "/demo-vo-v2.wav",
  totalMs = 120000,
  variantLabel,
  embedded = false,
  silent = false,
}: {
  shots?: Shot[];
  subtitles?: Subtitle[];
  audioSrc?: string;
  totalMs?: number;
  /** Optional small-text label under the play button, e.g. "60 seconds" */
  variantLabel?: string;
  /** When true, render inside a contained 16:9 frame for embedding in a
   *  marketing page. Default false renders full-bleed for screen recording. */
  embedded?: boolean;
  /** When true, the variant has NO voice-over by design (visuals only).
   *  Suppresses the audio element + the sound toggle in controls so
   *  users don't think the audio is broken. Used by the get-started
   *  walkthrough which is fully self-explanatory visually. */
  silent?: boolean;
} = {}) {
  const [playing, setPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isRecordMode, setIsRecordMode] = useState(false);
  const [showSubs, setShowSubs] = useState(true);
  // `silent` variants permanently disable sound — toggle / URL params
  // don't override. For variants that have a VO, `withSound` defaults
  // on and can be muted via the toggle or ?sound=0 / ?nosound.
  const [withSound, setWithSound] = useState(!silent);
  const [elapsedMs, setElapsedMs] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Pause state mirrored as ref so the elapsed-ticker interval callback
  // reads the current value without depending on stale closures
  const isPausedRef = useRef(false);
  const totalPausedMsRef = useRef(0);
  const pauseStartedAtRef = useRef(0);

  // Cumulative scene end-times. Used to derive `step` (current scene
  // index) from elapsedMs — eliminates the old setTimeout chain so pause
  // and resume "just work" by stopping or resuming the elapsed ticker.
  const cumulativeEnds = useMemo(() => {
    const ends: number[] = [];
    let acc = 0;
    for (const shot of shots) {
      acc += shot.duration;
      ends.push(acc);
    }
    return ends;
  }, [shots]);

  // Current scene index derived from elapsedMs. When elapsedMs is past
  // the last scene, step === shots.length → the end-state "closing brand
  // frame" renders.
  const step = useMemo(() => {
    for (let i = 0; i < cumulativeEnds.length; i++) {
      if (elapsedMs < cumulativeEnds[i]) return i;
    }
    return cumulativeEnds.length;
  }, [elapsedMs, cumulativeEnds]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsRecordMode(params.has("record"));
      if (params.get("subs") === "0" || params.has("nosubs")) setShowSubs(false);
      // Sound URL params are ignored for `silent` variants — no VO exists
      // to mute. For VO variants, ?sound=0 / ?nosound force-mute.
      if (!silent && (params.get("sound") === "0" || params.has("nosound"))) {
        setWithSound(false);
      }
    }
  }, []);

  // Single elapsed-ticker — audio.currentTime is the source of truth
  // when audio is playing; otherwise wall-clock with pause compensation.
  useEffect(() => {
    if (!playing) return;
    startRef.current = Date.now() - elapsedMs - totalPausedMsRef.current;
    intervalRef.current = setInterval(() => {
      if (isPausedRef.current) return; // freeze elapsed while paused
      const audio = audioRef.current;
      const t = withSound && audio
        ? Math.round(audio.currentTime * 1000)
        : Date.now() - startRef.current - totalPausedMsRef.current;
      setElapsedMs(t);
      if (t >= totalMs && intervalRef.current) clearInterval(intervalRef.current);
    }, 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, withSound]);

  const startPlayback = () => {
    // Mobile: request fullscreen + landscape orientation so the 16:9
    // canvas fills the screen instead of being shrunk into a postage
    // stamp at the top of the page. Browser support is patchy — fallback
    // gracefully if any of these APIs throw.
    if (typeof window !== "undefined") {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile && frameRef.current) {
        const el = frameRef.current as HTMLElement & {
          webkitRequestFullscreen?: () => void;
        };
        try {
          if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => {});
          } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
          }
        } catch { /* ignore */ }
        // Lock to landscape if the browser supports it (Android Chrome
        // does; iOS Safari ignores — user rotates manually).
        try {
          const orient = (window.screen?.orientation ?? null) as
            (ScreenOrientation & { lock?: (o: string) => Promise<void> }) | null;
          if (orient && typeof orient.lock === "function") {
            orient.lock("landscape").catch(() => {});
          }
        } catch { /* ignore */ }
      }
    }
    setElapsedMs(0);
    setPlaying(true);
    setIsPaused(false);
    isPausedRef.current = false;
    totalPausedMsRef.current = 0;
    if (withSound && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // Pause or resume — toggles audio + freezes/resumes the elapsed ticker.
  const togglePause = () => {
    if (!playing) return;
    if (isPausedRef.current) {
      // Resume
      if (audioRef.current) audioRef.current.play().catch(() => {});
      totalPausedMsRef.current += Date.now() - pauseStartedAtRef.current;
      isPausedRef.current = false;
      setIsPaused(false);
    } else {
      // Pause
      if (audioRef.current) audioRef.current.pause();
      pauseStartedAtRef.current = Date.now();
      isPausedRef.current = true;
      setIsPaused(true);
    }
  };

  // Stop — end the session entirely. Returns to the click-to-play overlay.
  const stopPlayback = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setElapsedMs(0);
    setIsPaused(false);
    isPausedRef.current = false;
    totalPausedMsRef.current = 0;
    setPlaying(false);
    // Exit fullscreen if we're in it
    if (typeof document !== "undefined" && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // When the user exits fullscreen (system gesture, escape key, or back
  // button), reset orientation lock so the page can rotate freely again.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleExit = () => {
      if (!document.fullscreenElement) {
        try {
          const orient = (window.screen?.orientation ?? null) as
            (ScreenOrientation & { unlock?: () => void }) | null;
          if (orient && typeof orient.unlock === "function") {
            orient.unlock();
          }
        } catch { /* ignore */ }
      }
    };
    document.addEventListener("fullscreenchange", handleExit);
    return () => document.removeEventListener("fullscreenchange", handleExit);
  }, []);

  const replay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setElapsedMs(0);
    setIsPaused(false);
    isPausedRef.current = false;
    totalPausedMsRef.current = 0;
    setPlaying(false);
    setTimeout(() => startPlayback(), 30);
  };

  const activeSubtitle = useMemo(
    () => subtitles.find((s) => elapsedMs >= s.from && elapsedMs < s.to),
    [elapsedMs],
  );

  // Scenes are designed in a fixed 1920×1080 logical coordinate system.
  // The frame can render at any width × height (embedded mobile through
  // landscape-fullscreen). We use ResizeObserver to compute a scale that
  // fits 16:9 inside the actual frame dimensions — preserving aspect
  // ratio and centring the canvas, with the leftover space letterboxed
  // by the navy frame background. Means content stays legible at every
  // viewport, especially when the user enters fullscreen on mobile.
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!frameRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        const widthScale = width / 1920;
        const heightScale = height / 1080;
        // Take the smaller scale so the entire 16:9 canvas fits within
        // the available area without cropping. Excess becomes letterbox.
        setScale(Math.min(widthScale, heightScale));
      }
    });
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  // The frame is the actual 16:9 content area — identical in both embedded
  // and full-bleed modes. Outer wrapper differs (containing div for embedded,
  // fixed-inset overlay for full-bleed recording).
  const frame = (
    <div
      ref={frameRef}
      style={{ backgroundColor: NAVY }}
      className={
        // explainer-frame class lets :fullscreen CSS rules below kick in
        // when the browser puts this element into native fullscreen
        embedded
          ? "explainer-frame relative w-full aspect-video overflow-hidden rounded-xl sm:rounded-xl"
          : "explainer-frame relative w-full aspect-video overflow-hidden"
      }
    >
      {/* In fullscreen, drop the aspect-video constraint so the frame
          fills 100vw × 100vh. The inner scaled canvas centres + letterboxes
          within. Inline <style> co-located with the component for clarity. */}
      <style>{`
        .explainer-frame:fullscreen {
          width: 100vw;
          height: 100vh;
          aspect-ratio: auto;
          border-radius: 0 !important;
          background: ${NAVY};
        }
        .explainer-frame:-webkit-full-screen {
          width: 100vw;
          height: 100vh;
          aspect-ratio: auto;
          border-radius: 0 !important;
          background: ${NAVY};
        }
      `}</style>

      {/* Voiceover audio */}
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

      {/* Scaled scene canvas — laid out in fixed 1920×1080 logical pixels,
          centred in the frame with transform: translate+scale. Centring
          means letterboxing is symmetric when the frame isn't perfectly
          16:9 (e.g. fullscreen on a portrait phone). */}
      <div
        className="absolute"
        style={{
          width: "1920px",
          height: "1080px",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
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

        {/* Subtitle overlay — also scaled with the scene canvas so it
            sits at consistent 8% from bottom relative to the visual frame */}
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
                    className="text-white leading-snug"
                    style={{
                      fontSize: "26px",
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
              className="text-white text-[22px]"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              What is AssetCentral.ai?
            </div>
            {/* Mobile-only fullscreen hint — tells the user the tap will
                expand the video to fill their screen. Hidden on desktop
                where the embedded size is already comfortable. */}
            <div
              className="text-white/55 text-[12px] sm:hidden flex items-center gap-1.5"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <span aria-hidden>⛶</span>
              Tap to play fullscreen
            </div>
            {/* Sub-line only renders when a non-empty variantLabel is provided.
                Pass variantLabel="" from a page to suppress it entirely. */}
            {variantLabel && variantLabel.length > 0 && (
              <div
                className="text-white/50 text-[12px]"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {variantLabel}
              </div>
            )}
          </div>
        </button>
      )}

      {/* Playback controls — shown whenever the explainer is running,
          unless we're in screen-recording mode (?record=1). Positioned
          outside the scaled canvas so they stay full-size at all viewport
          widths (including mobile fullscreen). */}
      {!isRecordMode && playing && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(92%,560px)]">
          <div
            className="flex items-center gap-2 sm:gap-3 rounded-full bg-black/55 backdrop-blur-md px-3 py-2 border border-white/10"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            {/* Play / pause toggle */}
            <button
              type="button"
              onClick={togglePause}
              aria-label={isPaused ? "Resume" : "Pause"}
              className="shrink-0 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
            >
              {isPaused ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden>
                  <rect x="6"  y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              )}
            </button>

            {/* Progress bar (visual only — no scrubbing for now) */}
            <div className="flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden min-w-0">
              <div
                className="h-full rounded-full transition-[width] duration-100"
                style={{
                  width: `${Math.min(100, (elapsedMs / totalMs) * 100)}%`,
                  backgroundColor: ACCENT,
                }}
              />
            </div>

            {/* Time display */}
            <div
              className="text-[11px] text-white/70 tabular-nums shrink-0 whitespace-nowrap"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              {fmtTime(elapsedMs)} / {fmtTime(totalMs)}
            </div>

            {/* Replay */}
            <button
              type="button"
              onClick={replay}
              aria-label="Replay from start"
              className="shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>

            {/* Stop / close */}
            <button
              type="button"
              onClick={stopPlayback}
              aria-label="Stop and exit"
              className="shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return frame;
  }

  return (
    <div
      style={{ backgroundColor: NAVY }}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-[1920px]" style={{ maxHeight: "100vh" }}>
        {frame}
      </div>
    </div>
  );
}

// ===========================================================================
// Shared bits
// ===========================================================================

/** MM:SS formatter for the control-bar time display. */
function fmtTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

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
    case 13: return <SceneWelcome />;
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
    // Get-started video scenes
    case 20: return <SceneGetStartedWelcome />;
    case 21: return <SceneTypeAddress />;
    case 22: return <SceneUploadDoc />;
    case 23: return <SceneEmailForward />;
    case 24: return <SceneWhatsAppSnap />;
    case 25: return <SceneAlertsOutput />;
    case 26: return <SceneGetStartedClose />;
    default: return null;
  }
}

// ===========================================================================
// Scenes
// ===========================================================================

// ── Scene Welcome (id 13): opens the video with a friendly brand greeting ──
// Plays for ~5s before Scene 0's positioning hero. The "AssetCentral.ai" is
// the focal point; the tagline below sets context.
function SceneWelcome() {
  return (
    <div className="text-center px-[6%]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[12px] uppercase tracking-[0.3em] text-white/45 mb-5"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Welcome to
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-[6vw] text-white leading-[1.0] tracking-tight"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        AssetCentral
        <span style={{ color: ACCENT }}>.ai</span>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1.5px] mt-6 mx-auto"
        style={{ backgroundColor: ACCENT, width: "18%", transformOrigin: "center", opacity: 0.6 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.0 }}
        className="mt-6 text-[1.7vw] text-white/75 max-w-[55vw] mx-auto"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        The AI-powered returns platform for property owners.
      </motion.div>
    </div>
  );
}

// ── Scene 0: Positioning hero — leads with the value prop ───────────────────
// Three-beat reveal tuned to the VO timing (≈8s):
//   0.3s   eyebrow "AssetCentral" fades in
//   0.5s   "A.I. just changed what's possible for property owners." builds
//   3.0s   "Real data." appears
//   3.6s   "Better decisions." appears
//   4.2s   "Better returns." appears (accent)
//   6.0s   accent underline draws
//   6.4s   "Your own Real Estate PA." appears
function Scene0() {
  return (
    <div className="text-center px-[6%]">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        AssetCentral
      </motion.div>

      {/* Opening hook — AI as the unlock */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-[3vw] text-white leading-[1.15] tracking-tight max-w-[70vw] mx-auto"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        AI just changed what&rsquo;s possible
        <br />
        for private property owners.
      </motion.div>

      {/* Three principles, staggered */}
      <div className="mt-9 space-y-1.5">
        {[
          { text: "Real data.",        delay: 3.0, accent: false },
          { text: "Better decisions.", delay: 3.6, accent: false },
          { text: "Better returns.",   delay: 4.2, accent: true  },
        ].map((line) => (
          <motion.div
            key={line.text}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.6vw] leading-tight"
            style={{
              fontFamily: "var(--font-display, serif)",
              color: line.accent ? ACCENT : "rgba(255,255,255,0.92)",
            }}
          >
            {line.text}
          </motion.div>
        ))}
      </div>

      {/* Accent rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 6.0, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1.5px] mt-7 mx-auto"
        style={{ backgroundColor: ACCENT, width: "14%", transformOrigin: "center", opacity: 0.6 }}
      />

      {/* The PA closer */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 6.4 }}
        className="mt-5 text-[1.5vw] text-white/75"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Your own Real Estate PA.
      </motion.div>
    </div>
  );
}

// ── Scene 1: Professional fund vs private owner ─────────────────────────────
function Scene1() {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-6 px-[6%] pt-[8%] pb-[18%]">
      {/* Left — Institutional fund (rich) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 flex flex-col gap-3"
      >
        <div className="flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
            Institutional fund
          </div>
          <span className="inline-flex items-center gap-1 text-[9.5px] text-white/60 bg-white/5 px-1.5 py-0.5 rounded" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
            <motion.span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: POSITIVE }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Live
          </span>
        </div>

        {/* Portfolio header */}
        <div>
          <div className="text-[20px] text-white leading-tight" style={{ fontFamily: "var(--font-display, serif)" }}>
            €2.4B · 327 assets
          </div>
          <div className="text-[10.5px] text-white/45 mt-0.5" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
            Mixed-use European portfolio
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Net yield", value: "6.2%", tone: POSITIVE },
            { label: "IRR (5y)",  value: "9.8%", tone: POSITIVE },
            { label: "Occupancy", value: "94%",  tone: POSITIVE },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              className="rounded-md bg-white/[0.04] border border-white/10 px-2 py-1.5"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              <div className="text-[8.5px] uppercase tracking-wide text-white/40">{k.label}</div>
              <div className="text-[12.5px] mt-0.5" style={{ color: k.tone }}>{k.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Data sources */}
        <div className="space-y-1.5 flex-1">
          {[
            "Bloomberg terminal",
            "RICS valuations",
            "Yardi · MRI feeds",
            "Loan covenants live",
            "Tenant credit watch",
          ].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
              className="flex items-center gap-2 text-[11.5px] text-white/70"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: POSITIVE }} />
              {src}
            </motion.div>
          ))}
        </div>

        {/* Trailing return chart — proper styled SVG with gradient area
            fill, horizontal grid lines, data dots, and a dashed benchmark
            line below for visual richness. */}
        <div>
          <div className="flex items-baseline justify-between mb-1.5" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
            <span className="text-[9.5px] uppercase tracking-wide text-white/40">
              Trailing 24mo return
            </span>
            <span className="flex items-baseline gap-2">
              <span className="text-[9px] text-white/35" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                MSCI EU: +11.4%
              </span>
              <span className="text-[12px]" style={{ color: POSITIVE, fontFamily: "var(--font-mono, monospace)" }}>
                +18.6%
              </span>
            </span>
          </div>
          <svg viewBox="0 0 220 60" className="w-full h-14" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fund-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.35" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {[12, 24, 36, 48].map((y) => (
              <line key={y} x1="0" x2="220" y1={y} y2={y}
                stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            ))}
            {/* Y-axis tick labels */}
            <text x="2" y="14" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">20%</text>
            <text x="2" y="38" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">10%</text>
            <text x="2" y="58" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">0%</text>

            {/* Benchmark dashed line */}
            <polyline
              points="0,42 22,41 44,39 66,40 88,37 110,36 132,33 154,32 176,30 198,29 220,27"
              fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"
              strokeDasharray="3,2" strokeLinejoin="round" strokeLinecap="round" />

            {/* Area fill under the fund line */}
            <path
              d="M 0,46 L 22,43 L 44,36 L 66,38 L 88,30 L 110,26 L 132,21 L 154,24 L 176,17 L 198,14 L 220,9 L 220,60 L 0,60 Z"
              fill="url(#fund-area)" />

            {/* Fund return line */}
            <polyline
              points="0,46 22,43 44,36 66,38 88,30 110,26 132,21 154,24 176,17 198,14 220,9"
              fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />

            {/* Data points */}
            {[
              [0,46], [22,43], [44,36], [66,38], [88,30],
              [110,26], [132,21], [154,24], [176,17], [198,14], [220,9],
            ].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r="1.4" fill={ACCENT} />
            ))}

            {/* Latest-value dot — accent ring */}
            <circle cx="220" cy="9" r="2.4" fill={ACCENT} />
            <circle cx="220" cy="9" r="4.2" fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.4" />
          </svg>

          {/* Legend strip */}
          <div className="flex items-center gap-3 mt-1 text-[8.5px] text-white/40" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-0.5 rounded" style={{ backgroundColor: ACCENT }} />
              Fund
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-px border-t border-dashed border-white/30" />
              MSCI Europe
            </span>
          </div>
        </div>
      </motion.div>

      {/* Right — Private owner (rich) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 flex flex-col gap-3"
      >
        <div className="flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
            Private property owner
          </div>
          <span className="inline-flex items-center gap-1 text-[9.5px] px-1.5 py-0.5 rounded" style={{
            color: WARNING,
            backgroundColor: WARNING + "20",
            fontFamily: "var(--font-sans, sans-serif)",
          }}>
            <motion.span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: WARNING }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Stale · 14 days
          </span>
        </div>

        <div>
          <div className="text-[20px] text-white leading-tight" style={{ fontFamily: "var(--font-display, serif)" }}>
            portfolio.xlsx
          </div>
          <div className="text-[10.5px] text-white/45 mt-0.5" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
            Last edited manually · 8 sheets · 12 currencies
          </div>
        </div>

        {/* Mock spreadsheet */}
        <div className="rounded-md bg-white/[0.04] border border-white/10 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-px text-[9px] text-white/50 bg-white/[0.06] px-2 py-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-mono, monospace)" }}>
            <div>Asset</div><div>Rent</div><div>Debt</div><div>Net yield</div>
          </div>
          {[
            ["Marina Apt 1", "9,500",  "950k",  "6.1%"],
            ["Marina Apt 2", "11,200", "1.1m",  "?"],
            ["JVC Studio",   "5,200",  "420k",  "?"],
            ["London Flat",  "2,400",  "280k",  "?"],
            ["Athens Flat",  "1,200",  "95k",   "?"],
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }}
              className="grid grid-cols-4 gap-px text-[10.5px] px-2 py-1 border-t border-white/[0.04]"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              <div className="text-white/85 truncate">{row[0]}</div>
              <div className="text-white/65">{row[1]}</div>
              <div className="text-white/65">{row[2]}</div>
              <div style={{ color: row[3] === "?" ? NEGATIVE : "rgba(255,255,255,0.7)" }}>{row[3]}</div>
            </motion.div>
          ))}
        </div>

        {/* Document chips */}
        <div className="flex flex-wrap gap-1.5">
          {[
            "📄 lease-marina.pdf",
            "📊 portfolio.xlsx",
            "📑 mortgage-hsbc.pdf",
            "✉️ rent-jul-2026.eml",
            "📱 WhatsApp threads",
          ].map((doc, i) => (
            <motion.div
              key={doc}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
              className="text-[9.5px] px-2 py-0.5 rounded bg-white/10 text-white/65"
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
// 14 source cards covering the real surfaces an owner actually receives data
// from: emails (4), WhatsApp messages (3), PDF documents (2), file uploads
// (2), and API connections (3). Densest scene in the video by design — sells
// the "everything everywhere" feeling.
type SrcType = "email" | "msg" | "pdf" | "upload" | "api";
const SRC_COLORS: Record<SrcType, string> = {
  email:  "#7d96ff",
  msg:    "#10b981",  // WhatsApp/iMessage green
  pdf:    "#f59e0b",
  upload: "#a78bfa",  // file-upload purple
  api:    "#06b6d4",  // API cyan
};
const SRC_LABELS: Record<SrcType, string> = {
  email:  "✉ Email",
  msg:    "✱ WhatsApp",
  pdf:    "▤ PDF",
  upload: "↑ Upload",
  api:    "⇄ API",
};

function Scene4() {
  // 14 cards arranged in a deterministic 3-row grid so nothing overlaps.
  // x/y are pixel offsets from canvas centre; rot is degrees.
  // Layout: top row 5 cards (y=-200), middle 4 cards (y=-20),
  // bottom row 5 cards (y=160). Slight rotation jitter for "scattered" feel.
  const items: { type: SrcType; subject: string; from: string; date: string; x: number; y: number; rot: number }[] = [
    // TOP ROW (y ≈ -200) — 5 cards: 2 emails, 1 WhatsApp, 1 PDF, 1 API
    { type: "email",  subject: "Re: Rent due July",            from: "tenant@gmail.com",        date: "2h ago",  x: -680, y: -210, rot: -4 },
    { type: "msg",    subject: "Tenant: heater broken",        from: "+971 50… · WhatsApp",     date: "2h ago",  x: -340, y: -195, rot:  3 },
    { type: "pdf",    subject: "mortgage-statement.pdf",       from: "HSBC · July 2026",        date: "5d ago",  x:    0, y: -210, rot: -2 },
    { type: "api",    subject: "HSBC · transactions feed",     from: "Open Banking · live",     date: "Live",    x:  340, y: -200, rot:  4 },
    { type: "email",  subject: "Service charge invoice",       from: "ownersassoc@marina.ae",   date: "3d ago",  x:  680, y: -195, rot: -3 },

    // MIDDLE ROW (y ≈ -20) — 4 cards: 1 WhatsApp, 1 upload, 1 API, 1 email
    { type: "upload", subject: "lease-marina-12mo.pdf",        from: "Uploaded · 1.2 MB",       date: "Today",   x: -510, y:  -25, rot:  2 },
    { type: "msg",    subject: "Contractor on site Tue 9am",   from: "+44 7… · WhatsApp",       date: "4h ago",  x: -170, y:  -15, rot: -3 },
    { type: "api",    subject: "Property Finder · rent comps", from: "API · 14 sources",        date: "Live",    x:  170, y:  -20, rot:  3 },
    { type: "email",  subject: "Booking.com · payout",         from: "noreply@booking.com",     date: "1w ago",  x:  510, y:  -15, rot: -2 },

    // BOTTOM ROW (y ≈ 160) — 5 cards: 1 WhatsApp, 1 PDF, 1 upload, 1 API, 1 email
    { type: "msg",    subject: "Cleaner pay query",            from: "+971 55… · WhatsApp",     date: "1d ago",  x: -680, y:  170, rot:  3 },
    { type: "pdf",    subject: "DLD-transaction.pdf",          from: "Dubai Land Dept",         date: "3w ago",  x: -340, y:  155, rot: -4 },
    { type: "upload", subject: "service-charge-q3.xlsx",       from: "Uploaded · 84 KB",        date: "Today",   x:    0, y:  170, rot:  2 },
    { type: "api",    subject: "EIBOR · 3-month rate",         from: "Central bank feed",       date: "Live",    x:  340, y:  160, rot: -3 },
    { type: "email",  subject: "Operator monthly · April",     from: "ops@stayone.ae",          date: "2w ago",  x:  680, y:  170, rot:  4 },
  ];
  const CARD_WIDTH = 230;

  return (
    <div className="relative w-full h-full">
      {/* Inbox counter header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-[5%] left-1/2 -translate-x-1/2 flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur z-10"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: NEGATIVE }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="text-[10.5px] uppercase tracking-wide text-white/70">Inbox</span>
        <span className="text-[10.5px]" style={{ color: NEGATIVE, fontFamily: "var(--font-mono, monospace)" }}>
          47 unread · 18 needs action · 5 APIs live
        </span>
      </motion.div>

      {items.map((it, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-md bg-white/[0.06] backdrop-blur border border-white/10 px-2.5 py-1.5"
          style={{
            width: CARD_WIDTH,
            marginLeft: -CARD_WIDTH / 2,
            fontFamily: "var(--font-sans, sans-serif)",
          }}
          initial={{ opacity: 0, scale: 0.85, x: it.x, y: it.y + 12, rotate: it.rot }}
          animate={{ opacity: 1, scale: 1,    x: it.x, y: it.y,      rotate: it.rot }}
          transition={{
            delay: 0.4 + i * 0.22,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="flex items-center justify-between gap-2 text-[9px] uppercase tracking-wide">
            <span
              className="inline-flex items-center gap-1 px-1 py-0 rounded"
              style={{
                color: SRC_COLORS[it.type],
                backgroundColor: SRC_COLORS[it.type] + "22",
              }}
            >
              {it.type === "api" && (
                <motion.span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: SRC_COLORS.api }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              )}
              {SRC_LABELS[it.type]}
            </span>
            <span className="text-white/30 text-[9px]">{it.date}</span>
          </div>
          <div className="text-[11.5px] text-white/90 mt-1 truncate font-medium">{it.subject}</div>
          <div className="text-[10px] text-white/45 mt-0.5 truncate">{it.from}</div>
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
      {/* Centre target — denser content. Three KPI tiles, a breathing
          source-counter, and a "Live" status pulse so the eye keeps
          finding new detail during the 7s hold. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur"
        style={{ width: 420, height: 270 }}
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                AssetCentral
              </div>
              <div className="text-[18px] text-white mt-0.5" style={{ fontFamily: "var(--font-display, serif)" }}>
                Portfolio workspace
              </div>
            </div>
            <motion.span
              className="inline-flex items-center gap-1.5 text-[9.5px] px-2 py-0.5 rounded text-white/70 bg-white/5"
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
              12 sources · live
            </motion.span>
          </div>

          {/* KPI tile row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Portfolio",   value: "€4.2M", tone: "white" },
              { label: "Net yield",   value: "5.8%",  tone: POSITIVE },
              { label: "Cashflow",    value: "+€3.2k",tone: POSITIVE },
            ].map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.15, duration: 0.4 }}
                className="rounded-md bg-white/[0.05] border border-white/10 px-2.5 py-1.5"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                <div className="text-[8.5px] uppercase tracking-wide text-white/40">{k.label}</div>
                <div className="text-[13.5px] mt-0.5" style={{ color: k.tone === "white" ? "#fff" : k.tone }}>
                  {k.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live-feed bars */}
          <div className="mt-3 space-y-1.5">
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
                  delay: 2.2 + i * 0.12,
                  duration: 3.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="h-1.5 rounded bg-white/15"
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
    { label: "Real net yield",       value: "5.8%",     delta: "+12 bps",   asset: "Portfolio · TTM",    sub: "vs vendor-quoted 7.1%", tone: POSITIVE, delay: 0.3 },
    { label: "Cashflow this month",  value: "+€3,240",  delta: "+€420 mom", asset: "All assets · July",  sub: "after debt service",     tone: POSITIVE, delay: 0.9 },
    { label: "Operator fee check",   value: "+2pp",     delta: "vs contract", asset: "JVC Studio · STR",  sub: "AED 4k/yr exposure",     tone: WARNING,  delay: 1.5 },
    { label: "Loan maturity",        value: "47 days",  delta: "fixed reverts", asset: "Marina Apt 2",     sub: "EIBOR +2.1% if no refi", tone: NEGATIVE, delay: 2.1 },
    { label: "Sell vs hold",         value: "Trade up", delta: "+10.5% IRR", asset: "London Flat",        sub: "vs hold-to-2030",        tone: POSITIVE, delay: 2.7 },
  ];
  return (
    <div className="w-full px-[6%]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        The questions, answered
      </motion.div>
      <div className="grid grid-cols-5 gap-2.5">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
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
                duration: 5,
                delay: 4 + i * 0.7,
                times: [0, 0.4, 0.5, 0.6],
                repeat: Infinity,
              },
            }}
            className="rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur p-3"
          >
            <div className="flex items-baseline justify-between mb-1.5" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              <span className="text-[9px] uppercase tracking-wide text-white/50">
                {c.label}
              </span>
              <span className="text-[8.5px]" style={{ color: c.tone }}>
                {c.delta}
              </span>
            </div>
            <div
              className="text-[18px] font-medium leading-tight"
              style={{ color: c.tone, fontFamily: "var(--font-mono, monospace)" }}
            >
              {c.value}
            </div>
            <div className="mt-1.5 text-[9.5px] text-white/70 truncate" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              {c.asset}
            </div>
            <div className="text-[9px] text-white/40 truncate" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              {c.sub}
            </div>
            <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: c.tone + "30" }}>
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
  const docs = [
    { name: "Operator statement", source: "StayOne · April",       lines: [78, 62, 70] },
    { name: "Mortgage schedule",  source: "HSBC · 2026 reset",     lines: [82, 55, 68] },
    { name: "DLD transaction",    source: "Dubai Land Dept",       lines: [70, 75, 60] },
    { name: "Lease agreement",    source: "Marina · 12-mo unfurn", lines: [85, 68, 72] },
    { name: "Service charge bill",source: "OA · Q3 2026",          lines: [76, 60, 80] },
    { name: "Tax return draft",   source: "Accountant · 2026",     lines: [80, 70, 65] },
  ];
  const insights = [
    { label: "Net yield",      value: "5.8%",         conf: 0.96, tone: POSITIVE },
    { label: "Operator fee",   value: "27% (+2pp)",   conf: 0.99, tone: WARNING  },
    { label: "Next reset",     value: "47 days",      conf: 1.00, tone: NEGATIVE },
    { label: "Service charge", value: "+9% YoY",      conf: 0.93, tone: WARNING  },
    { label: "Vacancy",        value: "14 days · normal", conf: 0.91, tone: POSITIVE },
  ];
  return (
    <div className="relative w-full h-full px-[6%] flex flex-col">
      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-3"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        <div className="text-[11px] uppercase tracking-[0.25em] text-white/55">
          AI document extraction
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: ACCENT }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-white/60">8,412 docs processed · live</span>
        </div>
      </motion.div>

      {/* Source documents (left) → scan bar (center) → structured output (right) */}
      <div className="flex-1 flex items-center gap-5">
        {/* Source documents */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          {docs.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="rounded border border-white/10 bg-white/[0.05] p-2.5"
            >
              <div className="text-[9.5px] uppercase text-white/45 tracking-wide truncate" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                {doc.name}
              </div>
              <div className="text-[8.5px] text-white/35 truncate mt-0.5" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                {doc.source}
              </div>
              <div className="mt-1.5 space-y-1">
                {doc.lines.map((w, j) => (
                  <motion.div
                    key={j}
                    className="h-1 rounded bg-white/15"
                    initial={{ width: 0 }}
                    animate={{ width: `${w}%` }}
                    transition={{ delay: 0.5 + i * 0.1 + j * 0.06, duration: 0.4 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scan bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-16 self-stretch relative"
        >
          <div className="absolute inset-y-0 left-1/2 w-px" style={{ backgroundColor: ACCENT + "30" }} />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{ backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}` }}
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%", "100%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Structured output */}
        <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[9.5px] uppercase tracking-wide text-white/45" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              Structured insights
            </span>
            <span className="text-[9.5px] text-white/40" style={{ fontFamily: "var(--font-mono, monospace)" }}>
              avg conf 96%
            </span>
          </div>
          {insights.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.22, duration: 0.4 }}
              className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-b-0 gap-2"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              <span className="text-[11px] text-white/65 truncate">{row.label}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[8.5px] text-white/30">
                  {Math.round(row.conf * 100)}%
                </span>
                <span className="text-[12px]" style={{ color: row.tone }}>{row.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
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
    <div className="w-full px-[6%] grid grid-cols-2 gap-6">
      {/* Before */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col"
      >
        <div className="flex items-baseline justify-between mb-2" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            Before · Reactive
          </div>
          <span
            className="text-[9.5px] px-1.5 py-0.5 rounded"
            style={{
              color: WARNING,
              backgroundColor: WARNING + "20",
            }}
          >
            Spreadsheets only
          </span>
        </div>
        <div className="text-[20px] text-white/75 mb-4" style={{ fontFamily: "var(--font-display, serif)" }}>
          Visibility
        </div>
        <div className="space-y-2 flex-1" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          {[
            { label: "Scattered documents",      cost: "8h/mo lost" },
            { label: "Vague net yield estimate", cost: "off by 80–200bps" },
            { label: "Reactive on rate resets",  cost: "+270bps if missed" },
            { label: "Operator unchecked",       cost: "AED 4k/yr at risk" },
            { label: "No portfolio comparison",  cost: "wrong sell/hold call" },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className="flex items-center justify-between gap-2 text-[12px]"
            >
              <span className="text-white/65 flex items-center gap-2 truncate">
                <span className="w-1 h-1 rounded-full bg-white/30" />
                {row.label}
              </span>
              <span className="text-[10.5px] text-white/40 shrink-0">{row.cost}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <span className="text-[11px] uppercase tracking-wide text-white/45">
            Realised cost
          </span>
          <span className="text-[14px]" style={{ color: NEGATIVE, fontFamily: "var(--font-mono, monospace)" }}>
            −€18,400/yr
          </span>
        </motion.div>
      </motion.div>

      {/* After */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-xl border-2 p-5 flex flex-col relative overflow-hidden"
        style={{ borderColor: ACCENT, backgroundColor: ACCENT + "08" }}
      >
        <div className="flex items-baseline justify-between mb-2" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
            After · Proactive
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-[9.5px] px-1.5 py-0.5 rounded"
            style={{ color: ACCENT, backgroundColor: ACCENT + "18" }}
          >
            <motion.span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: POSITIVE }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            AssetCentral · live
          </span>
        </div>
        <div className="text-[20px] text-white mb-4" style={{ fontFamily: "var(--font-display, serif)" }}>
          Better returns
        </div>
        <div className="space-y-2 flex-1" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
          {[
            { t: "Real net yield, per property", val: "+120bps", note: "trailing 12mo" },
            { t: "Rate resets caught 90 days out", val: "Avoided", note: "no SVR exposure" },
            { t: "Operator fees verified monthly", val: "−AED 4k/yr", note: "recovered" },
            { t: "Sell vs hold modelled",          val: "+10.5% IRR", note: "trade-up" },
            { t: "Portfolio comparison ranking",   val: "Top quartile", note: "by net yield" },
          ].map((row, i) => (
            <motion.div
              key={row.t}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.14 }}
              className="flex justify-between items-center gap-2 text-[12px]"
            >
              <span className="text-white/85 flex items-center gap-2 truncate">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: POSITIVE }} />
                {row.t}
              </span>
              <span className="flex items-baseline gap-1.5 shrink-0">
                <span className="text-[10.5px] text-white/40">{row.note}</span>
                <span style={{ color: POSITIVE, fontFamily: "var(--font-mono, monospace)" }}>{row.val}</span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Lift indicator at the bottom — counter ticks up + arrow bounces */}
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

// ===========================================================================
// "Get started" scenes (IDs 20–26) — used by SHOTS_GET_STARTED at /demo/get-started
// ===========================================================================
//
// Goal: walk a new visitor through (a) the four ways to get property data IN,
// then (b) what they get OUT. Reuses Scene 7 (dashboard cards) and Scene 9
// (AI scans) for two of the three "output" beats because those scenes already
// nail those moments.

// ── Scene 20: Welcome / intro for the get-started video ─────────────────────
function SceneGetStartedWelcome() {
  return (
    <div className="text-center px-[6%]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[12px] uppercase tracking-[0.3em] text-white/45 mb-5"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Get started
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-[4.5vw] text-white leading-[1.05] tracking-tight"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Setting up your first property
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1.5px] mt-6 mx-auto"
        style={{ backgroundColor: ACCENT, width: "18%", transformOrigin: "center", opacity: 0.6 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.0 }}
        className="mt-6 text-[1.7vw] text-white/75 max-w-[55vw] mx-auto"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Four ways to get going.
      </motion.div>
    </div>
  );
}

// ── Scene 21: Way 1 — Type the address ──────────────────────────────────────
function SceneTypeAddress() {
  const TYPED = "12 Marina Mansions, Dubai Marina";
  return (
    <div className="absolute inset-0 pt-[6%] pb-[6%] px-[8%] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[14px] uppercase tracking-[0.3em] text-white/45 mb-3"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Way 1 — Type the address
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-8 max-w-[70vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Just type it in. We do the rest.
      </motion.div>
      <div className="flex gap-[2.5vw] flex-1">
        <div className="flex-1 flex flex-col gap-[1.5vw]">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[11px] uppercase tracking-wider text-white/50"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            Property address
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-md border border-white/15 bg-white/[0.04] px-[1.2vw] py-[1vw] flex items-center"
          >
            <span className="text-[1.6vw] text-white/35 mr-2">⌖</span>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 2.2, delay: 0.7, ease: "linear" }}
              className="text-[1.6vw] text-white overflow-hidden whitespace-nowrap inline-block"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {TYPED}
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[2px] h-[1.6vw] bg-white/80 ml-1"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 3.2 }}
            className="rounded-md border border-white/10 bg-white/[0.02] px-[1.2vw] py-[0.8vw]"
          >
            <div className="text-[1.2vw] text-white/85" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              12 Marina Mansions
            </div>
            <div className="text-[0.95vw] text-white/45" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              Dubai Marina · UAE
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 4.0 }}
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-[1.5vw]"
        >
          <div className="text-[11px] uppercase tracking-wider text-white/45 mb-2">
            Auto-populated
          </div>
          <div className="text-[1.3vw] text-white mb-3" style={{ fontFamily: "var(--font-display, serif)" }}>
            Market evidence
          </div>
          {[
            { label: "Median rent (2-bed)",     value: "AED 145,000 / yr", delay: 4.4 },
            { label: "Comparable sales (12 mo)", value: "AED 1.8 – 2.2 m", delay: 4.7 },
            { label: "Net yield (estimate)",     value: "5.8%",            delay: 5.0, accent: true },
            { label: "DLD ownership",            value: "Verified",        delay: 5.3 },
          ].map((r) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: r.delay }}
              className="flex items-center justify-between py-[0.45vw] border-b border-white/[0.06]"
            >
              <span className="text-[1.05vw] text-white/55" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                {r.label}
              </span>
              <span
                className="text-[1.2vw] tabular-nums"
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  color: r.accent ? POSITIVE : "rgba(255,255,255,0.92)",
                }}
              >
                {r.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Scene 22: Way 2 — Upload a document ─────────────────────────────────────
function SceneUploadDoc() {
  return (
    <div className="absolute inset-0 pt-[6%] pb-[6%] px-[8%] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[14px] uppercase tracking-[0.3em] text-white/45 mb-3"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Way 2 — Upload a document
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-8 max-w-[70vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Drag in a lease, a mortgage, an invoice. AI reads it.
      </motion.div>
      <div className="flex gap-[2.5vw] flex-1">
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.02] w-full h-full flex items-center justify-center relative overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -120, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-md bg-white shadow-2xl flex flex-col items-stretch"
              style={{ width: "10vw", height: "13vw" }}
            >
              <div className="px-[0.6vw] py-[0.5vw] text-[0.85vw] font-semibold text-red-600" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                PDF
              </div>
              <div className="border-t border-gray-200 p-[0.6vw] space-y-[0.3vw]">
                <div className="h-[0.4vw] bg-gray-200 rounded w-[80%]" />
                <div className="h-[0.4vw] bg-gray-200 rounded w-[65%]" />
                <div className="h-[0.4vw] bg-gray-200 rounded w-[90%]" />
                <div className="h-[0.4vw] bg-gray-200 rounded w-[55%]" />
                <div className="h-[0.4vw] bg-gray-200 rounded w-[75%]" />
                <div className="h-[0.4vw] bg-gray-200 rounded w-[40%]" />
              </div>
              <div className="mt-auto px-[0.6vw] py-[0.4vw] text-[0.7vw] text-gray-500" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                tenancy-agreement.pdf
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute bottom-[1.5vw] left-1/2 -translate-x-1/2 text-[1.1vw] text-white/45"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Drop file here or click to browse
            </motion.div>
          </motion.div>
        </div>
        <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-[1.5vw]">
          <div className="text-[11px] uppercase tracking-wider text-white/45 mb-1">
            AI extracted
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            className="text-[1.3vw] text-white mb-3"
            style={{ fontFamily: "var(--font-display, serif)" }}
          >
            Tenancy agreement
          </motion.div>
          {[
            { label: "Tenant",          value: "S. Reynolds",          delay: 2.9 },
            { label: "Term",            value: "12 months",            delay: 3.2 },
            { label: "Annual rent",     value: "AED 142,000",          delay: 3.5, accent: true },
            { label: "Start date",      value: "01 Jun 2026",          delay: 3.8 },
            { label: "End date",        value: "31 May 2027",          delay: 4.1 },
            { label: "Deposit held",    value: "AED 11,833 (1 month)", delay: 4.4 },
            { label: "Renewal notice",  value: "90 days",              delay: 4.7, accent: true },
          ].map((r) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: r.delay }}
              className="flex items-center justify-between py-[0.4vw] border-b border-white/[0.06]"
            >
              <span className="text-[1.05vw] text-white/55" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                {r.label}
              </span>
              <span
                className="text-[1.15vw] tabular-nums"
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  color: r.accent ? ACCENT : "rgba(255,255,255,0.92)",
                }}
              >
                {r.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Scene 23: Way 3 — Forward an email ──────────────────────────────────────
function SceneEmailForward() {
  return (
    <div className="absolute inset-0 pt-[6%] pb-[6%] px-[8%] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[14px] uppercase tracking-[0.3em] text-white/45 mb-3"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Way 3 — Forward an email
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-8 max-w-[70vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Each property gets its own inbox.
      </motion.div>
      <div className="flex gap-[2.5vw] flex-1 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-1 rounded-lg bg-white shadow-2xl flex flex-col"
        >
          <div className="px-[1.2vw] py-[0.8vw] border-b border-gray-200 flex items-center gap-2">
            <div className="w-[0.8vw] h-[0.8vw] rounded-full bg-red-400" />
            <div className="w-[0.8vw] h-[0.8vw] rounded-full bg-amber-400" />
            <div className="w-[0.8vw] h-[0.8vw] rounded-full bg-emerald-400" />
            <span className="ml-2 text-[0.9vw] text-gray-500" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              Fwd: Q2 rent statement
            </span>
          </div>
          <div className="px-[1.2vw] py-[1vw] space-y-[0.6vw]">
            <div className="flex gap-[1vw] items-center">
              <span className="text-[0.95vw] text-gray-500 w-[3vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>To</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="text-[1.1vw] text-gray-900 font-mono"
              >
                marina-mansions@in.assetcentral.ai
              </motion.span>
            </div>
            <div className="flex gap-[1vw] items-center">
              <span className="text-[0.95vw] text-gray-500 w-[3vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>From</span>
              <span className="text-[1.05vw] text-gray-700" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                operator@marinarentals.ae
              </span>
            </div>
            <div className="flex gap-[1vw] items-center">
              <span className="text-[0.95vw] text-gray-500 w-[3vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>Subject</span>
              <span className="text-[1.05vw] text-gray-700" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                Q2 2026 rent statement + invoices
              </span>
            </div>
            <div className="mt-[1vw] border border-gray-200 rounded p-[0.7vw] flex items-center gap-2">
              <span className="text-red-500 font-semibold text-[0.95vw]">PDF</span>
              <span className="text-[0.95vw] text-gray-700" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                Q2-statement-2026.pdf
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-[1.5vw] flex flex-col"
        >
          <div className="text-[11px] uppercase tracking-wider text-white/45 mb-2">
            Auto-filed
          </div>
          <div className="text-[1.3vw] text-white mb-4" style={{ fontFamily: "var(--font-display, serif)" }}>
            12 Marina Mansions
          </div>
          {[
            { icon: "↪", label: "Forwarded from operator",     delay: 2.2 },
            { icon: "◳", label: "Parsed Q2 rent total",        delay: 2.8 },
            { icon: "+", label: "Posted AED 35,500 income",    delay: 3.4, accent: true },
            { icon: "□", label: "Filed under Documents",       delay: 4.0 },
            { icon: "✓", label: "Linked to Marina Mansions",   delay: 4.6, accent: true },
          ].map((r) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: r.delay }}
              className="flex items-center gap-[0.8vw] py-[0.45vw]"
            >
              <span
                className="text-[1.3vw] inline-flex items-center justify-center w-[1.6vw] h-[1.6vw] rounded"
                style={{
                  backgroundColor: r.accent ? `${ACCENT}33` : "rgba(255,255,255,0.08)",
                  color: r.accent ? ACCENT : "rgba(255,255,255,0.7)",
                }}
              >
                {r.icon}
              </span>
              <span className="text-[1.15vw] text-white/85" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                {r.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Scene 24: Way 4 — Snap on WhatsApp ──────────────────────────────────────
function SceneWhatsAppSnap() {
  return (
    <div className="absolute inset-0 pt-[6%] pb-[6%] px-[8%] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[14px] uppercase tracking-[0.3em] text-white/45 mb-3"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Way 4 — Snap on WhatsApp
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-8 max-w-[70vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        On the go? Snap a photo. Done.
      </motion.div>
      <div className="flex gap-[2.5vw] flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          style={{
            width: "18vw",
            height: "32vw",
            borderRadius: "2vw",
            border: "0.4vw solid rgba(255,255,255,0.18)",
            backgroundColor: "#0f172a",
            padding: "0.5vw",
          }}
        >
          <div className="w-full h-full rounded-[1.4vw] bg-[#075e54] flex flex-col overflow-hidden">
            <div className="bg-[#128c7e] px-[0.8vw] py-[0.6vw] flex items-center gap-2">
              <div className="w-[1.6vw] h-[1.6vw] rounded-full bg-white/30" />
              <div className="text-[0.95vw] text-white" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                AssetCentral
              </div>
            </div>
            <div className="flex-1 bg-[#ece5dd] p-[0.8vw] flex flex-col gap-[0.5vw]">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="self-end max-w-[80%] rounded-lg bg-[#dcf8c6] p-[0.4vw]"
              >
                <div
                  className="rounded bg-gradient-to-br from-amber-100 to-amber-200 relative"
                  style={{ width: "9vw", height: "11vw" }}
                >
                  <div className="absolute inset-[0.6vw] flex flex-col gap-[0.35vw]">
                    <div className="h-[0.4vw] bg-amber-700/30 rounded w-[80%]" />
                    <div className="h-[0.3vw] bg-amber-700/20 rounded w-[50%]" />
                    <div className="mt-auto h-[0.5vw] bg-amber-800/30 rounded w-[60%]" />
                    <div className="h-[0.7vw] bg-amber-800/60 rounded w-[40%]" />
                  </div>
                </div>
                <div className="mt-[0.3vw] text-[0.7vw] text-gray-700" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                  AC service invoice
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 3.2 }}
                className="self-start max-w-[85%] rounded-lg bg-white px-[0.6vw] py-[0.4vw]"
              >
                <div className="text-[0.78vw] text-gray-900" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                  ✓ Filed under <span className="font-semibold">Marina Mansions</span>
                </div>
                <div className="text-[0.7vw] text-gray-500 mt-[0.15vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                  Expense · AED 850 · 14 Apr
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 3.6 }}
          className="rounded-lg border border-white/10 bg-white/[0.03] p-[1.5vw]"
          style={{ width: "26vw" }}
        >
          <div className="text-[11px] uppercase tracking-wider text-white/45 mb-2">
            AI extracted
          </div>
          <div className="text-[1.3vw] text-white mb-3" style={{ fontFamily: "var(--font-display, serif)" }}>
            AC service invoice
          </div>
          {[
            { label: "Vendor",        value: "Cool Air Co.",     delay: 4.0 },
            { label: "Amount",        value: "AED 850",          delay: 4.3, accent: true },
            { label: "Date",          value: "14 Apr 2026",      delay: 4.6 },
            { label: "Category",      value: "Maintenance",      delay: 4.9 },
            { label: "Property",      value: "Marina Mansions",  delay: 5.2, accent: true },
          ].map((r) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: r.delay }}
              className="flex items-center justify-between py-[0.4vw] border-b border-white/[0.06]"
            >
              <span className="text-[1.05vw] text-white/55" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                {r.label}
              </span>
              <span
                className="text-[1.15vw] tabular-nums"
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  color: r.accent ? ACCENT : "rgba(255,255,255,0.92)",
                }}
              >
                {r.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Scene 25: Output — Alerts ────────────────────────────────────────────────
function SceneAlertsOutput() {
  const ALERTS = [
    { sev: "warning", days: 90, title: "Mortgage rate reset",           detail: "12 Marina Mansions · 4.2% → 5.8% expected",       delay: 0.6 },
    { sev: "negative", days: 14, title: "Void risk — lease ending",      detail: "8 Tower Heights · Tenant gave 60-day notice",      delay: 1.0 },
    { sev: "warning", days: 21, title: "Service-charge invoice due",    detail: "Marina Mansions · AED 12,400 · auto-pay set",      delay: 1.4 },
    { sev: "negative", days: 7,  title: "Covenant breach risk",          detail: "Portfolio loan · DSCR 1.18 vs 1.20 covenant",     delay: 1.8 },
    { sev: "positive", days: 30, title: "Operator under target",         detail: "STR · Q2 net yield 4.1% vs 5.5% modelled",       delay: 2.2 },
    { sev: "warning", days: 45, title: "Lease renewal — decision needed",detail: "Park View Tower · Tenant requesting -8% on rent", delay: 2.6 },
  ] as const;

  return (
    <div className="absolute inset-0 pt-[6%] pb-[6%] px-[8%] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[14px] uppercase tracking-[0.3em] text-white/45 mb-3"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Output — Alerts
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-6 max-w-[70vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Surfaced before they cost you.
      </motion.div>
      <div className="flex-1 grid grid-cols-2 gap-[1.2vw]">
        {ALERTS.map((a) => {
          const colour =
            a.sev === "negative" ? NEGATIVE :
            a.sev === "warning"  ? WARNING  :
            POSITIVE;
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: a.delay }}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-[1vw] flex items-start gap-[1vw]"
            >
              <div
                className="w-[0.5vw] self-stretch rounded-full shrink-0"
                style={{ backgroundColor: colour }}
              />
              <div className="flex-1">
                <div className="text-[1.15vw] text-white" style={{ fontFamily: "var(--font-display, serif)" }}>
                  {a.title}
                </div>
                <div className="text-[0.95vw] text-white/55 mt-[0.2vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                  {a.detail}
                </div>
              </div>
              <div
                className="text-right shrink-0"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                <div className="text-[1.2vw] tabular-nums" style={{ color: colour }}>
                  {a.days}d
                </div>
                <div className="text-[0.75vw] text-white/45 uppercase tracking-wider">to act</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Scene 26: Closing CTA for the get-started video ─────────────────────────
function SceneGetStartedClose() {
  return (
    <div className="text-center px-[6%]">
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
        Start with your first property.
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.4 }}
        className="mt-2 text-[1.1vw] text-white/50"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Free to try · No card required · Cancel anytime
      </motion.div>
    </div>
  );
}
