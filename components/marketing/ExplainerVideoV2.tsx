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
import { useEffect, useId, useMemo, useRef, useState } from "react";

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

// 88-second website hero cut. Tuned to the 2026-06 ElevenLabs Kristen
// re-record at /public/demo-vo-60.mp3 (1:28 actual duration). Runtime
// grew from the previous 74s cut because Kristen reads the new
// family-office line and the five-agent enumeration more slowly than
// the earlier shorter script.
//
// 2026-06 reorder: the five-agent team reveal (Scene 8, "led by Your
// CEO") was moved up to position 3 — right after the asset-manager
// vs spreadsheets/family-office contrast lands — so the visitor
// understands what AssetCentral actually IS before the problem-arc
// (scattered data → unanswered questions) plays out.
//
// Arc:
//   0  Positioning hero          → "AI just changed what's possible…"
//   1  Pro vs private contrast   → "…asset managers. …spreadsheets — or, at most, a family office."
//   8  Five-agent team reveal    → "…five AI agents — led by Your CEO, with a Chief Financial Officer, Chief Investment Officer, Chief Operations Officer and Personal Assistant."
//   4  Scattered information
//   5  Data sources
//   7  Owner's unanswered questions
//   9  Agent team structures the data
//  10  Workspace
//  11  Before / after
//  12  Closing strap + URL
export const SHOTS_60: Shot[] = [
  { id:  0, duration: 15500 }, // Positioning hero (3 beats + agent-team closer)
  { id:  1, duration: 10500 }, // Pro vs private (asset manager / family office vs spreadsheets)
  { id:  8, duration: 12000 }, // Five-agent team reveal — led by Your CEO
  { id:  4, duration:  7000 }, // Scattered information
  { id:  5, duration:  6000 }, // Data tiles flow in
  { id:  7, duration: 11000 }, // Dashboard cards (questions answered)
  { id:  9, duration:  7000 }, // AI scans + structures
  { id: 10, duration:  6000 }, // Full workspace
  { id: 11, duration:  6000 }, // Before / after
  { id: 12, duration:  7000 }, // Closing brand frame (incl. ~2s silent outro)
];

// 90-second beginner tutorial — "How to Use AssetCentral in 60 Seconds".
// Step-labeled walkthrough: welcome → add property → upload/manual →
// AI structures → dashboard → tools → scenarios → CEO ranks actions →
// export → closing. Voiced by Kristen (ElevenLabs) at
// /public/demo-vo-get-started.mp3 (1:30 actual = 90,000 ms).
//
// Timing tuned for comfortable reading: each scene gets 7–12s so a
// first-time viewer has time to read the step label + see the action
// without feeling rushed.
export const SHOTS_GET_STARTED: Shot[] = [
  // Timings aligned to the 2026-06 Kristen re-record. Each scene starts
  // ~500ms BEFORE Kristen says its matching sentence so the visual is
  // on-screen before the voice talks about it, rather than the voice
  // rushing ahead of the visual.
  //
  // Sentence start estimates (audio internal time):
  //   Welcome     0:00.5   Step 5     0:42.5
  //   Step 1      0:08.0   Step 6     0:51.0
  //   Step 2      0:15.0   Step 7     0:59.0
  //   Step 3      0:27.0   Step 8     1:08.0
  //   Step 4      0:34.5   Closing    1:16.5   (→ end at 1:29.0)
  //
  // Scene boundaries = (next sentence start) − 0.5s. Closing scene
  // absorbs the ~3s tail of silence at the end of the audio file.
  { id: 30, duration:  8000 }, // Welcome      (0.0  →  8.0)
  { id: 31, duration:  7000 }, // Step 1       (8.0  → 15.0)
  { id: 32, duration: 12000 }, // Step 2       (15.0 → 27.0)
  { id: 33, duration:  8000 }, // Step 3       (27.0 → 35.0)
  { id: 34, duration:  9000 }, // Step 4       (35.0 → 44.0)
  { id: 35, duration:  8500 }, // Step 5       (44.0 → 52.5)
  { id: 36, duration:  8000 }, // Step 6       (52.5 → 60.5)
  { id: 37, duration:  9000 }, // Step 7       (60.5 → 69.5)
  { id: 38, duration:  8000 }, // Step 8       (69.5 → 77.5)
  { id: 39, duration: 12500 }, // Closing      (77.5 → 90.0)
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
  { from:  26000, to:  32500, text: "The information that drives portfolio yield is scattered." },
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
  { from:  73000, to:  81000, text: "AssetCentral is the AI agent team for private property owners." },
  { from:  81000, to:  87000, text: "It finds, structures and interprets real property data" },
  { from:  87000, to:  91000, text: "that owners couldn't easily access before." },
  { from:  91000, to:  98500, text: "Income, costs, debt, documents, operator reports, market evidence." },
  { from:  98500, to: 106000, text: "Cashflow, risks and upcoming decisions — in one intelligent workspace." },
  { from: 106000, to: 111000, text: "Not just visibility." },
  { from: 111000, to: 116000, text: "Faster, better decisions. Higher yield." },
  { from: 116000, to: 119000, text: "Real data. Better decisions. Higher yield." },
  { from: 119000, to: 124000, text: "AssetCentral.ai" },
];

// Verbatim subtitle cues for the 2026-06 ElevenLabs Kristen re-record
// at /public/demo-vo-60.mp3 (1:14 actual = 74,000 ms). Total content
// runs to ~66s and the final brand-frame cue lingers into the ~8s
// silent outro built into Scene 12.
//
// Currently both demo/60 mount points pass subtitles={[]} (the audio
// carries the message and a captions strip felt redundant), so this
// array is held in sync for any future re-enable rather than rendered
// at runtime.
export const SUBTITLES_60: Subtitle[] = [
  // Scene 0 — positioning hero (0 → 13s)
  { from:     0, to:  5000,  text: "AI just changed what's possible for private property owners." },
  { from:  5000, to:  9000,  text: "Real data. Better decisions. Higher yield." },
  { from:  9000, to: 13000,  text: "Your own AI agent team for property yield." },

  // Scene 1 — pro vs private contrast (13 → 22s)
  { from: 13000, to: 17000,  text: "Professional property owners have asset managers." },
  { from: 17000, to: 22000,  text: "Private owners have spreadsheets — or, at most, a family office." },

  // Scene 8 — five-agent team reveal, led by Your CEO (22 → 32s)
  { from: 22000, to: 27000,  text: "AssetCentral collapses that team into five AI agents — led by Your CEO," },
  { from: 27000, to: 32000,  text: "with a Chief Financial Officer, Chief Investment Officer, Chief Operations Officer, and Personal Assistant." },

  // Scene 4 — scattered info (32 → 38s)
  { from: 32000, to: 38000,  text: "The information that drives portfolio yield is scattered across emails, PDFs, bank accounts, portals and spreadsheets." },

  // Scene 5 — data sources (38 → 43s)
  { from: 38000, to: 43000,  text: "Rent statements. Mortgage payments. Service charges. Operator reports. Market data." },

  // Scene 7 — owner's unanswered questions (43 → 52s)
  { from: 43000, to: 46000,  text: "So owners struggle to answer the questions that matter." },
  { from: 46000, to: 48000,  text: "What is my real net yield?" },
  { from: 48000, to: 50000,  text: "Which property is generating cash?" },
  { from: 50000, to: 52000,  text: "Should I hold, refinance, sell, or invest more?" },

  // Scene 9 — agent team structures the data (52 → 58s)
  { from: 52000, to: 58000,  text: "Your agent team finds, structures and interprets real property data that owners couldn't easily access before." },

  // Scene 10 — workspace (58 → 63s)
  { from: 58000, to: 63000,  text: "Scattered information becomes faster, better decisions." },

  // Scene 11 + 12 — closing (68 → 74s, then silent outro)
  { from: 68000, to: 72000,  text: "Real data. Better decisions. Higher yield." },
  { from: 72000, to: 74000,  text: "AssetCentral.ai" },
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
  autoplay = false,
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
  /** When true, the video starts playing on mount instead of showing the
   *  click-to-play overlay. Only honoured for `silent` variants — browsers
   *  block autoplay-with-sound without a user gesture, so the audio
   *  variants always require a click. */
  autoplay?: boolean;
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
  // Fullscreen state mirrors document.fullscreenElement. Kept as React
  // state (not just ref) so the toggle button icon re-renders when the
  // user presses Escape / browser-exits fullscreen.
  const [isFullscreen, setIsFullscreen] = useState(false);
  // iOS Safari rejects requestFullscreen() on non-video elements. When
  // we detect that path, we fall back to a CSS-only "pseudo-fullscreen"
  // that fixes the frame to the viewport via the `pseudo-fs` class.
  const [pseudoFs, setPseudoFs] = useState(false);
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

  // Auto-start on mount when `autoplay` is set. Only fires for silent
  // variants — browsers reject autoplay-with-sound without a user gesture
  // and we want the silent walkthrough to be the only path that auto-
  // starts (the /demo/get-started use case).
  useEffect(() => {
    if (autoplay && silent && !playing) {
      // Small delay so the rest of the page paints first, then the
      // video kicks in — feels more natural than instantly starting.
      const t = setTimeout(() => startPlayback(), 350);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, silent]);

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

  // Toggle native browser fullscreen on the explainer frame. Used by the
  // control-bar button (desktop + mobile). On mobile, startPlayback already
  // requests fullscreen automatically — this lets the user re-enter if
  // they've exited, or escape on demand. iOS Safari uses the webkit-prefixed
  // API; we feature-detect and fall through safely if neither is available.
  const toggleFullscreen = () => {
    if (typeof document === "undefined" || !frameRef.current) return;
    const docAny = document as Document & {
      webkitFullscreenElement?: Element;
      webkitExitFullscreen?: () => Promise<void>;
    };
    const elAny = frameRef.current as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };
    const inFs = !!(document.fullscreenElement || docAny.webkitFullscreenElement);

    // Exit path: handle real fullscreen OR our CSS pseudo-fullscreen.
    if (inFs) {
      try {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        else if (docAny.webkitExitFullscreen) docAny.webkitExitFullscreen();
      } catch { /* ignore */ }
      return;
    }
    if (pseudoFs) {
      setPseudoFs(false);
      setIsFullscreen(false);
      return;
    }

    // Enter path: try the real API first; if neither standard nor webkit
    // exists on the div (iOS Safari), fall back to CSS pseudo-fullscreen.
    const hasNative = typeof elAny.requestFullscreen === "function" || typeof elAny.webkitRequestFullscreen === "function";
    if (hasNative) {
      try {
        if (elAny.requestFullscreen) {
          elAny.requestFullscreen().catch(() => {
            // Promise rejected — likely Safari with permission issue.
            // Fall through to pseudo-fullscreen as a fallback.
            setPseudoFs(true);
            setIsFullscreen(true);
          });
        } else if (elAny.webkitRequestFullscreen) {
          elAny.webkitRequestFullscreen();
        }
      } catch {
        setPseudoFs(true);
        setIsFullscreen(true);
      }
    } else {
      // No fullscreen API available — pseudo-fullscreen path
      setPseudoFs(true);
      setIsFullscreen(true);
    }
  };

  // Lock body scroll while in pseudo-fullscreen so the page behind the
  // overlay can't be scrolled by accident on touch devices.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (pseudoFs) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [pseudoFs]);

  // Pseudo-fullscreen exit on Escape key (mirrors real fullscreen behaviour).
  useEffect(() => {
    if (typeof window === "undefined" || !pseudoFs) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPseudoFs(false);
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pseudoFs]);

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
  // button), reset orientation lock so the page can rotate freely again
  // AND sync the isFullscreen state so the toggle-button icon updates.
  // Covers Webkit's prefixed event too — iOS Safari only fires that one.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleChange = () => {
      const docAny = document as Document & { webkitFullscreenElement?: Element };
      const inFs = !!(document.fullscreenElement || docAny.webkitFullscreenElement);
      setIsFullscreen(inFs);
      if (!inFs) {
        try {
          const orient = (window.screen?.orientation ?? null) as
            (ScreenOrientation & { unlock?: () => void }) | null;
          if (orient && typeof orient.unlock === "function") {
            orient.unlock();
          }
        } catch { /* ignore */ }
      }
    };
    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
    };
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
    const recompute = () => {
      const el = frameRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        const widthScale = r.width / 1920;
        const heightScale = r.height / 1080;
        // Take the smaller scale so the entire 16:9 canvas fits within
        // the available area without cropping. Excess becomes letterbox.
        setScale(Math.min(widthScale, heightScale));
      }
    };
    // Primary: ResizeObserver catches every size change (including
    // entering/exiting fullscreen + URL-bar show/hide on iOS).
    const observer = new ResizeObserver(recompute);
    observer.observe(frameRef.current);
    // Secondary: orientationchange fires before viewport units fully
    // settle on iOS Safari, so we re-measure at 50/200/500ms after the
    // event. Belt-and-braces with the observer; cheap and resolves the
    // "video still portrait-sized after rotating to landscape" bug.
    const onRotate = () => {
      [50, 200, 500].forEach((ms) => setTimeout(recompute, ms));
    };
    window.addEventListener("orientationchange", onRotate);
    window.addEventListener("resize", onRotate);
    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", onRotate);
      window.removeEventListener("resize", onRotate);
    };
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
        // when the browser puts this element into native fullscreen.
        // The pseudo-fs class is a JS-toggled fallback for iOS Safari
        // (which rejects requestFullscreen on non-video elements).
        (embedded
          ? "explainer-frame relative w-full aspect-video overflow-hidden rounded-xl sm:rounded-xl"
          : "explainer-frame relative w-full aspect-video overflow-hidden") +
        (pseudoFs ? " pseudo-fs" : "")
      }
    >
      {/* Fullscreen sizing. dvw/dvh (dynamic viewport) tracks the
          visible area as iOS Safari shows/hides the URL bar — without
          this, content jumps when the chrome animates. vh/vw fallback
          fires first for older browsers, then dvh/dvw overrides if
          supported. */}
      <style>{`
        .explainer-frame:fullscreen,
        .explainer-frame:-webkit-full-screen {
          width: 100vw;
          height: 100vh;
          width: 100dvw;
          height: 100dvh;
          aspect-ratio: auto;
          border-radius: 0 !important;
          background: ${NAVY};
        }
        /* CSS pseudo-fullscreen — used on iOS Safari and any other
           browser that rejects requestFullscreen on a div. position:fixed
           inset:0 pins the frame to the visible viewport edges, so it
           automatically resizes on orientation change. */
        .explainer-frame.pseudo-fs {
          position: fixed !important;
          inset: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          width: 100dvw !important;
          height: 100dvh !important;
          aspect-ratio: auto !important;
          border-radius: 0 !important;
          z-index: 9999;
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

      {/* Click-to-start overlay — fully opaque so the scaled canvas
          underneath isn't visible at all pre-play. At <md the canvas
          renders at ~0.195 scale and table text in scenes becomes
          ~2px tall — a blurry smudge if the overlay let any peek
          through. Fully opaque = clean poster appearance, then
          playback auto-fullscreens (see startPlayback) so the canvas
          renders at a readable scale. */}
      {!playing && (
        <button
          onClick={startPlayback}
          className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer group"
          style={{ backgroundColor: NAVY }}
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
        <div
          className="absolute left-1/2 -translate-x-1/2 z-50 w-[min(92%,560px)]"
          // Sits clear of the iPhone home-indicator gesture area in landscape
          // fullscreen — env(safe-area-inset-bottom) is ~21px in iOS landscape
          // with notch, 0 elsewhere. max() ensures we still have ≥12px padding
          // on devices without the inset (desktop, Android, older iPhones).
          style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
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

            {/* Fullscreen toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
            >
              {isFullscreen ? (
                // Collapse / exit icon — four arrows pointing inward
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 3v4H5" />
                  <path d="M3 9h4V5" />
                  <path d="M15 3v4h4" />
                  <path d="M21 9h-4V5" />
                  <path d="M9 21v-4H5" />
                  <path d="M3 15h4v4" />
                  <path d="M15 21v-4h4" />
                  <path d="M21 15h-4v4" />
                </svg>
              ) : (
                // Expand / enter icon — four arrows pointing outward
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 9V3h6" />
                  <path d="M21 9V3h-6" />
                  <path d="M3 15v6h6" />
                  <path d="M21 15v6h-6" />
                </svg>
              )}
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
    // Earlier get-started timeline (kept in file but no longer wired into
    // SHOTS_GET_STARTED — replaced by the 30–39 tutorial below).
    case 20: return <SceneGetStartedWelcome />;
    case 21: return <SceneTypeAddress />;
    case 22: return <SceneUploadDoc />;
    case 23: return <SceneEmailForward />;
    case 24: return <SceneWhatsAppSnap />;
    case 25: return <SceneAlertsOutput />;
    case 26: return <SceneGetStartedClose />;
    // "How to Use AssetCentral in 60 Seconds" — current /demo/get-started
    case 30: return <SceneTutorialWelcome />;
    case 31: return <SceneStep1AddProperty />;
    case 32: return <SceneStep2UploadOrManual />;
    case 33: return <SceneStep3AIStructures />;
    case 34: return <SceneStep4Dashboard />;
    case 35: return <SceneStep5Tools />;
    case 36: return <SceneStep6Scenarios />;
    case 37: return <SceneStep7AIInsights />;
    case 38: return <SceneStep8Export />;
    case 39: return <SceneTutorialClose />;
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
        The AI agent team for property yield.
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
//   4.2s   "Higher yield." appears (accent)
//   6.0s   accent underline draws
//   6.4s   "Your own AI agent team for property yield." appears
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
          { text: "Higher yield.",     delay: 4.2, accent: true  },
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

      {/* The agent-team closer */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 6.4 }}
        className="mt-5 text-[1.5vw] text-white/75"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Your own AI agent team for property yield.
      </motion.div>
    </div>
  );
}

// ── Scene 1: Professional fund vs private owner ─────────────────────────────
function Scene1() {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-6 px-[6%] pt-[8%] pb-[18%]">
      {/* Left — Asset manager / family office (rich, team-backed).
          Relabelled 2026-06 to support the new VO line: "Professional
          property owners have asset managers. Private owners have
          spreadsheets — or, at most, a family office." The card now
          surfaces a five-role team chip-row at the bottom so the
          family-office team is visible — paying the contrast off
          before Scene 8 says "AssetCentral collapses that team into
          five AI agents." */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 flex flex-col gap-3"
      >
        <div className="flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
            Asset manager · Family office
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

        {/* Portfolio header — scaled to family-office tier rather
            than the previous €2.4B institutional-fund scale, so the
            "Asset manager · Family office" label reads truthfully. */}
        <div>
          <div className="text-[20px] text-white leading-tight" style={{ fontFamily: "var(--font-display, serif)" }}>
            €85M · 24 assets
          </div>
          <div className="text-[10.5px] text-white/45 mt-0.5" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
            Multi-generational property book
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

        {/* Team manifest — replaces the previous data-feeds list
            (Bloomberg / RICS / Yardi …) which read as institutional
            scale. The new row shows the five-role team a family
            office puts on a portfolio, so the visual contrast with
            the right-hand spreadsheet card lands as "team vs no
            team" and sets up Scene 8's promise: "AssetCentral
            collapses that team into five AI agents." */}
        <div className="space-y-1.5 flex-1">
          <div
            className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            Team
          </div>
          {[
            { role: "CEO", note: "Strategy · ranked actions" },
            { role: "CFO", note: "Finance · debt · tax"       },
            { role: "CIO", note: "Market · comps · evidence"  },
            { role: "COO", note: "Operations · leases · capex" },
            { role: "PA",  note: "Records · comms · inbox"    },
          ].map((row, i) => (
            <motion.div
              key={row.role}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
              className="flex items-center gap-2 text-[11px] text-white/70"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <span
                className="inline-flex items-center justify-center rounded text-[8.5px] font-semibold px-1.5 py-[1px] tracking-wide"
                style={{ backgroundColor: ACCENT + "22", color: ACCENT }}
              >
                {row.role}
              </span>
              <span className="text-white/60">{row.note}</span>
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
    { label: "Operator fee check",   value: "+2pp",     delta: "vs contract", asset: "JVC Studio · Short-term",  sub: "AED 4k/yr exposure",     tone: WARNING,  delay: 1.5 },
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
// Scene 8 — the five-agent team reveal, *led by Your CEO*.
//
// Was a 3s brand-reveal placeholder; rebuilt 2026-06 to be the early
// payoff of the new VO arc: after Scene 1 contrasts professional
// owners (asset manager / family office) against private owners
// (spreadsheets), this scene shows what AssetCentral actually
// provides — the same five-role team, with Your CEO at the top
// running strategy and four specialists reporting in. Sits at
// position 3 in SHOTS_60 (was previously position 6).
//
// Layout: Your CEO is the hero card on top — full-width row of its
// own, accent-filled, larger — and the four specialists sit in a
// 4-column row beneath, outline-styled to read as "reporting to".
function Scene8() {
  const specialists = [
    { name: "Chief Financial Officer",    role: "CFO", note: "Yield · cashflow · debt"      },
    { name: "Chief Investment Officer",     role: "CIO", note: "Comps · demand · evidence"    },
    { name: "Chief Operations Officer", role: "COO", note: "Voids · capex · leases"       },
    { name: "Personal Assistant",       role: "PA",  note: "Inbox · docs · structure"     },
  ];
  return (
    <div className="w-full px-[6%]">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-[1.6vw]"
      >
        <div
          className="text-[10.5px] uppercase tracking-[0.3em] text-white/45 mb-2"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          Your AssetCentral team
        </div>
        <div
          className="text-[2.6vw] text-white leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-display, serif)" }}
        >
          Five AI agents. Led by{" "}
          <span style={{ color: ACCENT }}>Your&nbsp;CEO</span>.
        </div>
      </motion.div>

      {/* Hero card — Your CEO. Accent-filled, larger than the
          specialist row below to read as "the lead". */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto rounded-xl flex items-center gap-[1.2vw] px-[1.4vw] py-[1.1vw] max-w-[44vw] mb-[1.2vw]"
        style={{
          backgroundColor: ACCENT,
          boxShadow: `0 24px 60px -25px ${ACCENT}`,
        }}
      >
        <div
          className="rounded-full flex items-center justify-center w-[3vw] h-[3vw] shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
        >
          <span
            className="text-[1.05vw] font-semibold tracking-wider text-white"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            CEO
          </span>
        </div>
        <div className="text-left">
          <div
            className="text-[1.6vw] text-white leading-tight"
            style={{ fontFamily: "var(--font-display, serif)" }}
          >
            Your CEO
          </div>
          <div
            className="text-[1vw] text-white/85 mt-[0.2vw]"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            Strategy · ranked actions · portfolio direction
          </div>
        </div>
      </motion.div>

      {/* Specialists — 4-column row, outline-styled */}
      <div className="grid grid-cols-4 gap-[0.9vw] max-w-[58vw] mx-auto">
        {specialists.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 + i * 0.12, duration: 0.4 }}
            className="rounded-xl border border-white/12 bg-white/[0.04] px-[0.9vw] py-[0.9vw] text-center"
          >
            <div
              className="mx-auto rounded-full flex items-center justify-center w-[2vw] h-[2vw] mb-[0.4vw]"
              style={{ backgroundColor: ACCENT + "25" }}
            >
              <span
                className="text-[0.78vw] font-semibold tracking-wider"
                style={{ color: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {a.role}
              </span>
            </div>
            <div
              className="text-[1vw] text-white leading-tight mb-[0.25vw]"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              {a.name}
            </div>
            <div
              className="text-[0.78vw] text-white/55 leading-snug"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {a.note}
            </div>
          </motion.div>
        ))}
      </div>
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
          In control
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
        Higher yield.
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
      {/* Tagline subhead removed in 2026-06: Scene 8 now shows the
          five agents explicitly, so repeating "The AI agent team
          for property yield." here read as duplication and made the
          ending feel repetitive. */}
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
    { sev: "positive", days: 30, title: "Operator under target",         detail: "Short-term rental · Q2 net yield 4.1% vs 5.5% modelled",       delay: 2.2 },
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
        Higher yield.
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
        Add your first property.
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.4 }}
        className="mt-2 text-[1.1vw] text-white/50"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Free for up to 3 properties · No card required · Cancel anytime
      </motion.div>
    </div>
  );
}

// ===========================================================================
// "How to Use AssetCentral in 60 Seconds" tutorial scenes (IDs 30–39)
// ===========================================================================
//
// Step-labeled beginner tutorial: walks a first-time visitor through what to
// click first, how to add a property, how the AI structures data, what the
// outputs look like, and how to export a report. Replaces the earlier
// /demo/get-started timeline (scenes 20–26 remain in file for now but are
// no longer wired into SHOTS_GET_STARTED).
//
// Visual language: each scene is a single focused product-UI mockup with a
// "STEP N" eyebrow + clear primary action. Calm, beginner-friendly.

// ── Shared step badge used by all tutorial scenes ───────────────────────────
// Step header — much more prominent than the original tiny eyebrow line.
// Reads as a real section header: numbered badge + bold "STEP N" label +
// the action verb. Used at the top of every tutorial scene.
function StepBadge({ n, label }: { n: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-[1vw] mb-[1.2vw]"
      style={{ fontFamily: "var(--font-sans, sans-serif)" }}
    >
      {/* Numbered badge — much bigger, with a soft glow */}
      <span
        className="inline-flex items-center justify-center w-[3.4vw] h-[3.4vw] rounded-full text-[2vw] font-bold shrink-0"
        style={{
          backgroundColor: ACCENT,
          color: "white",
          boxShadow: `0 0 0 0.4vw ${ACCENT}25, 0 0.4vw 1.2vw rgba(79,110,247,0.35)`,
        }}
      >
        {n}
      </span>
      {/* "STEP N" pill + action label on two lines for visual hierarchy */}
      <div className="flex flex-col">
        <span
          className="text-[1.1vw] uppercase tracking-[0.28em] font-bold leading-tight"
          style={{ color: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
        >
          Step {n} of 8
        </span>
        <span
          className="text-[1.8vw] uppercase tracking-[0.05em] font-semibold leading-tight mt-[0.15vw]"
          style={{ color: "white", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

// ── Animated cursor — fades in, glides to target, clicks ────────────────────
function Cursor({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-15vw", y: "-10vw" }}
      animate={{ opacity: [0, 1, 1, 1], x: 0, y: 0, scale: [1, 1, 0.9, 1] }}
      transition={{
        duration: 1.6,
        delay,
        times: [0, 0.1, 0.8, 1],
        ease: [0.16, 1, 0.3, 1],
      }}
      className="absolute pointer-events-none z-20"
      style={{ left: x, top: y }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 2 L4 18 L9 14 L11.5 21 L14.5 20 L12 13 L18 13 Z"
          fill="white"
          stroke="black"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

// ── Scene 30: Welcome ───────────────────────────────────────────────────────
function SceneTutorialWelcome() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[6%]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[12px] uppercase tracking-[0.3em] text-white/45 mb-5"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        How to use AssetCentral in 60 seconds
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-[4.5vw] text-white leading-[1.05] tracking-tight"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Welcome to AssetCentral
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1.5px] mt-6"
        style={{ backgroundColor: ACCENT, width: "18%", opacity: 0.6 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.0 }}
        className="mt-6 text-[2.2vw] text-white/80"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Your AI agent team for property yield.
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.0 }}
        className="mt-8 text-[1.75vw] text-white/45"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Add a property. See the numbers. Decide with confidence.
      </motion.div>
    </div>
  );
}

// ── Scene 31: Step 1 — Add your property ────────────────────────────────────
// Full SaaS product chrome: brand logo + user card at the top of a sectioned
// sidebar (Overview / Tools / Account), then a main panel with a real top bar,
// breadcrumb, KPI strip, and an empty-state "Add your first property" CTA
// with a contextual tip about the 4 input channels. Designed to look like
// the actual product, not a placeholder.

// Small inline icons used by the sidebar. Kept as tiny SVGs so they sit at
// any scale without external assets.
function MenuIcon({ kind }: { kind: string }) {
  const stroke = "currentColor";
  const sw = "1.6";
  const common = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "dashboard":
      return (<svg {...common}><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>);
    case "properties":
      return (<svg {...common}><path d="M3 21 L3 10 L12 3 L21 10 L21 21 Z" /><path d="M9 21 L9 14 L15 14 L15 21" /></svg>);
    case "cashflow":
      return (<svg {...common}><path d="M4 17 L9 12 L13 16 L20 8" /><path d="M14 8 L20 8 L20 14" /></svg>);
    case "documents":
      return (<svg {...common}><path d="M7 3 L17 3 L21 7 L21 21 L7 21 Z" /><path d="M17 3 L17 7 L21 7" /><path d="M10 12 L18 12 M10 16 L18 16" /></svg>);
    case "reports":
      return (<svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 14 L7 17 M12 9 L12 17 M17 11 L17 17" /></svg>);
    case "alerts":
      return (<svg {...common}><path d="M6 16 L6 11 A6 6 0 0 1 18 11 L18 16 L20 18 L4 18 Z" /><path d="M10 21 A2 2 0 0 0 14 21" /></svg>);
    case "irr":
      return (<svg {...common}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8 L16 8 M8 12 L12 12 M8 16 L14 16" /></svg>);
    case "rent":
      return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9 9 L15 15 M9 15 L15 9" /></svg>);
    case "holdsell":
      return (<svg {...common}><path d="M6 12 L10 16 L18 8" /><circle cx="12" cy="12" r="9" /></svg>);
    case "refi":
      return (<svg {...common}><path d="M4 8 L20 8 M16 4 L20 8 L16 12" /><path d="M20 16 L4 16 M8 12 L4 16 L8 20" /></svg>);
    case "market":
      return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12 L21 12 M12 3 A12 12 0 0 1 12 21 A12 12 0 0 1 12 3" /></svg>);
    case "settings":
      return (<svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 2 L13 5 L16 4 L17 7 L20 8 L19 11 L22 12 L19 13 L20 16 L17 17 L16 20 L13 19 L12 22 L11 19 L8 20 L7 17 L4 16 L5 13 L2 12 L5 11 L4 8 L7 7 L8 4 L11 5 Z" /></svg>);
    case "team":
      return (<svg {...common}><circle cx="9" cy="9" r="3" /><circle cx="17" cy="11" r="2.5" /><path d="M3 19 C3 16 6 14 9 14 C12 14 15 16 15 19" /><path d="M14 19 C14 17 16 16 17 16 C19 16 21 17 21 19" /></svg>);
    default:
      return null;
  }
}

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  badge?: string;
  active?: boolean;
}

function SidebarSection({ heading, items, delay }: { heading: string; items: MenuItem[]; delay: number }) {
  return (
    <div className="mb-[1vw]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay }}
        className="text-[1.2vw] uppercase tracking-[0.18em] text-gray-400 px-[0.7vw] mb-[0.4vw]"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        {heading}
      </motion.div>
      {items.map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: delay + 0.1 + i * 0.04 }}
          className="flex items-center gap-[0.5vw] px-[0.7vw] py-[0.4vw] rounded-md mb-[0.15vw] mx-[0.3vw]"
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            backgroundColor: item.active ? "rgba(79,110,247,0.10)" : "transparent",
            color: item.active ? ACCENT : "#4b5563",
            fontWeight: item.active ? 600 : 400,
          }}
        >
          <span className="w-[0.9vw] h-[0.9vw] shrink-0 inline-flex items-center justify-center">
            <MenuIcon kind={item.icon} />
          </span>
          <span className="text-[1.45vw] flex-1">{item.label}</span>
          {item.badge && (
            <span
              className="text-[1.2vw] px-[0.35vw] py-[0.1vw] rounded-full tabular-nums"
              style={{
                backgroundColor: item.active ? ACCENT : "#e5e7eb",
                color: item.active ? "white" : "#6b7280",
              }}
            >
              {item.badge}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function SceneStep1AddProperty() {
  // Five-agent AgentTeamHome cards — these mirror the live app sidebar
  // (CEO / CFO / CIO / COO / PA), with a status line under each agent.
  const AGENTS = [
    { role: "CEO", name: "Your CEO",                 status: "Watching for opportunities",   delay: 0.45 },
    { role: "CFO", name: "Chief Financial Officer",          status: "Tracking your debt schedule",  delay: 0.55 },
    { role: "CIO", name: "Chief Investment Officer",           status: "Scanning market comps",        delay: 0.65 },
    { role: "COO", name: "Chief Operations Officer",       status: "Monitoring leases",            delay: 0.75 },
    { role: "PA",  name: "Personal Assistant", status: "Inbox empty — ready for docs", delay: 0.85 },
  ];

  // Google Places autocomplete suggestions — the top one highlighted to
  // mimic a hovered/selected pick.
  const SUGGESTIONS = [
    { line1: "12 Marina Mansions",     line2: "Dubai Marina · Dubai · UAE",         active: true  },
    { line1: "12 Marina Promenade",    line2: "Dubai Marina · Dubai · UAE",         active: false },
    { line1: "12 Marina View Tower B", line2: "Dubai Marina · Dubai · UAE",         active: false },
  ];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={1} label="Add your property" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[2.6vw] text-white leading-tight mb-[1.2vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Meet your agent team. Add the first property.
      </motion.div>

      {/* Side-by-side product frame: AgentTeamHome (left) + Add Property form (right) */}
      <div className="flex-1 rounded-xl bg-white shadow-2xl overflow-hidden flex min-h-0">
        {/* ── LEFT 40% — AgentTeamHome sidebar ───────────────────────── */}
        <div
          className="w-[40%] border-r border-gray-200 flex flex-col"
          style={{ backgroundColor: "#f8f9fb" }}
        >
          {/* Brand strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="px-[1.2vw] py-[1vw] border-b border-gray-200 flex items-center gap-[0.6vw]"
          >
            <div
              className="w-[1.8vw] h-[1.8vw] rounded-md flex items-center justify-center text-white text-[1.2vw] font-semibold"
              style={{ backgroundColor: NAVY, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              AC
            </div>
            <div
              className="text-[1.6vw] text-gray-900 leading-none"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              AssetCentral<span style={{ color: ACCENT }}>.ai</span>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="px-[1.2vw] pt-[1vw] pb-[0.6vw]"
          >
            <div
              className="text-[1.05vw] uppercase tracking-[0.18em] text-gray-400"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Your agent team
            </div>
            <div
              className="text-[1.85vw] text-gray-900 leading-tight mt-[0.1vw]"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              Welcome, S. Reynolds
            </div>
          </motion.div>

          {/* Agent cards */}
          <div className="flex-1 px-[0.9vw] pb-[0.6vw] flex flex-col gap-[0.5vw] overflow-hidden">
            {AGENTS.map((a) => (
              <motion.div
                key={a.role}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: a.delay }}
                className="rounded-lg bg-white border border-gray-200 px-[0.7vw] py-[0.55vw] flex items-center gap-[0.6vw]"
              >
                {/* Role chip */}
                <div
                  className="shrink-0 w-[2.3vw] h-[2.3vw] rounded-md flex items-center justify-center"
                  style={{
                    backgroundColor: `${ACCENT}15`,
                    color: ACCENT,
                    fontFamily: "var(--font-sans, sans-serif)",
                  }}
                >
                  <span className="text-[0.95vw] font-semibold tracking-wider">{a.role}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[1.25vw] text-gray-900 leading-tight truncate"
                    style={{ fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
                  >
                    {a.name}
                  </div>
                  <div
                    className="text-[1vw] text-gray-500 leading-tight mt-[0.1vw] truncate"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {a.status}
                  </div>
                </div>
                {/* Heartbeat dot */}
                <motion.span
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="shrink-0 inline-block w-[0.4vw] h-[0.4vw] rounded-full"
                  style={{ backgroundColor: POSITIVE }}
                />
              </motion.div>
            ))}
          </div>

          {/* Free-plan pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="px-[1.2vw] py-[0.7vw] border-t border-gray-200 flex items-center justify-between"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            <div className="flex items-center gap-[0.4vw]">
              <span
                className="inline-block w-[0.4vw] h-[0.4vw] rounded-full"
                style={{ backgroundColor: POSITIVE }}
              />
              <span className="text-[1.05vw] text-gray-500">Free for up to 3 properties</span>
            </div>
            <span
              className="text-[0.95vw] uppercase tracking-wider px-[0.4vw] py-[0.1vw] rounded-full"
              style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
            >
              Upgrade
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT 60% — multi-step Add Property form ───────────────── */}
        <div className="flex-1 flex flex-col">
          {/* Form top bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="px-[1.5vw] py-[0.8vw] border-b border-gray-200 flex items-center justify-between"
          >
            <div
              className="flex items-center gap-[0.5vw]"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <span className="text-[1.2vw] text-gray-400">Dashboard</span>
              <span className="text-[1.2vw] text-gray-300">/</span>
              <span className="text-[1.2vw] text-gray-400">Properties</span>
              <span className="text-[1.2vw] text-gray-300">/</span>
              <span className="text-[1.3vw] text-gray-900 font-semibold">Add property</span>
            </div>
            <span
              className="text-[1.05vw] text-gray-400"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Save &amp; close
            </span>
          </motion.div>

          {/* Form body */}
          <div className="flex-1 px-[1.8vw] py-[1.4vw] flex flex-col">
            {/* Step header + 5-segment progress */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-[1vw]"
            >
              <div
                className="text-[1.05vw] uppercase tracking-[0.22em]"
                style={{ color: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
              >
                Step 2 of 5
              </div>
              <div
                className="text-[2.05vw] text-gray-900 leading-tight mt-[0.1vw]"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                Property identity
              </div>
              {/* 5-segment progress bar */}
              <div className="mt-[0.7vw] flex items-center gap-[0.4vw]">
                {[1, 2, 3, 4, 5].map((seg) => {
                  const filled = seg <= 2;
                  return (
                    <motion.div
                      key={seg}
                      initial={{ scaleX: 0.85, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + seg * 0.06 }}
                      className="flex-1 h-[0.4vw] rounded-full"
                      style={{
                        backgroundColor: filled ? ACCENT : "transparent",
                        border: filled ? "none" : "1px solid #d1d5db",
                        transformOrigin: "left",
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>

            {/* Address field with Google Places autocomplete — the focal point */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-[0.9vw] relative"
            >
              <div
                className="text-[1vw] uppercase tracking-wider text-gray-500 mb-[0.3vw]"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                Property address
              </div>
              <div
                className="rounded-md border-2 px-[0.8vw] py-[0.55vw] flex items-center gap-[0.5vw] bg-white"
                style={{ borderColor: ACCENT, boxShadow: `0 0 0 0.3vw ${ACCENT}1f` }}
              >
                {/* Pin icon */}
                <svg width="1.3vw" height="1.3vw" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 22 C12 22 4 14 4 9 A8 8 0 0 1 20 9 C20 14 12 22 12 22 Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span
                  className="text-[1.5vw] text-gray-900 flex-1"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  12 Marina Mansions, Dubai
                </span>
                {/* Blinking caret */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  className="inline-block w-[2px] h-[1.5vw]"
                  style={{ backgroundColor: ACCENT }}
                />
              </div>

              {/* Autocomplete dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 1.05 }}
                className="absolute left-0 right-0 top-[100%] mt-[0.35vw] rounded-md bg-white shadow-2xl border border-gray-200 overflow-hidden z-10"
              >
                {SUGGESTIONS.map((s, i) => (
                  <motion.div
                    key={s.line1}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 1.15 + i * 0.08 }}
                    className="px-[0.8vw] py-[0.55vw] flex items-center gap-[0.55vw]"
                    style={{
                      backgroundColor: s.active ? `${ACCENT}10` : "transparent",
                      borderTop: i > 0 ? "1px solid #f1f3f7" : "none",
                    }}
                  >
                    <svg width="1.1vw" height="1.1vw" viewBox="0 0 24 24" fill="none" stroke={s.active ? ACCENT : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 22 C12 22 4 14 4 9 A8 8 0 0 1 20 9 C20 14 12 22 12 22 Z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[1.3vw] leading-tight truncate"
                        style={{
                          color: s.active ? NAVY : "#374151",
                          fontFamily: "var(--font-sans, sans-serif)",
                          fontWeight: s.active ? 600 : 400,
                        }}
                      >
                        {s.line1}
                      </div>
                      <div
                        className="text-[1vw] text-gray-500 truncate"
                        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        {s.line2}
                      </div>
                    </div>
                    {/* Google attribution-style tag on top result */}
                    {s.active && (
                      <span
                        className="text-[0.85vw] uppercase tracking-wider px-[0.35vw] py-[0.08vw] rounded-full"
                        style={{ backgroundColor: `${ACCENT}1a`, color: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        ↵ Enter
                      </span>
                    )}
                  </motion.div>
                ))}
                <div
                  className="px-[0.8vw] py-[0.3vw] text-[0.85vw] text-gray-400 border-t border-gray-100 text-right"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  Powered by Google
                </div>
              </motion.div>
            </motion.div>

            {/* Lower fields — Country / City / Postcode in a 3-col row */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="grid grid-cols-3 gap-[0.8vw] mb-[0.9vw] mt-[5vw]"
            >
              {[
                { label: "Country",  value: "United Arab Emirates", flag: "🇦🇪", strong: true  },
                { label: "City",     value: "Dubai",                flag: null, strong: true  },
                { label: "Postcode", value: "—",                    flag: null, strong: false },
              ].map((f) => (
                <div key={f.label}>
                  <div
                    className="text-[1vw] uppercase tracking-wider text-gray-500 mb-[0.3vw]"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {f.label}
                  </div>
                  <div
                    className="rounded-md border border-gray-200 bg-white px-[0.7vw] py-[0.55vw] flex items-center gap-[0.4vw]"
                  >
                    {f.flag && (
                      <span className="text-[1.4vw] leading-none">{f.flag}</span>
                    )}
                    <span
                      className="text-[1.35vw] truncate"
                      style={{
                        color: f.strong ? "#111827" : "#9ca3af",
                        fontFamily: "var(--font-sans, sans-serif)",
                      }}
                    >
                      {f.value}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Continue button — bottom-right of the form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.85 }}
              className="mt-auto flex items-center justify-between pt-[0.8vw] border-t border-gray-100"
            >
              <span
                className="text-[1.1vw] text-gray-400"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                ← Back
              </span>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="rounded-md px-[1.4vw] py-[0.65vw] inline-flex items-center gap-[0.5vw] shadow-lg relative"
                style={{ backgroundColor: ACCENT, color: "white", fontFamily: "var(--font-sans, sans-serif)" }}
              >
                <span className="text-[1.4vw] font-semibold">Continue</span>
                <span className="text-[1.4vw] leading-none">→</span>
                <motion.span
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.8, delay: 2.4, repeat: Infinity }}
                  className="absolute inset-0 rounded-md"
                  style={{ border: `0.15vw solid ${ACCENT}` }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scene 32: Step 2 — Four ways to add data ────────────────────────────────
// AI-era input options: not just upload / manual, but also forward an email
// or send via WhatsApp. Card layout is 2×2 so all four affordances are
// visible at once — viewer instantly grasps that AssetCentral meets them
// wherever their data already lives.
function SceneStep2UploadOrManual() {
  // Rebuilt 2026-06 to match the live SpreadsheetImporter on /dashboard/import:
  // a drag-drop zone showing a freshly-dropped portfolio.xlsx file, with the
  // three "other channels" reduced to a small reassurance strip below so the
  // audio's "manually, forward an email, or snap a photo on WhatsApp" line
  // still pays off visually.
  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={2} label="Add your data" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-[1vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Upload your portfolio. Your PA handles the rest.
      </motion.div>

      {/* ── Main panel: SpreadsheetImporter mockup (80% of remaining height) ── */}
      <div className="flex-[4] rounded-xl bg-white shadow-2xl overflow-hidden flex flex-col min-h-0">
        {/* Importer toolbar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="px-[1.4vw] py-[0.7vw] border-b border-gray-200 flex items-center justify-between"
          style={{ backgroundColor: "#f8f9fb", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <div className="flex items-center gap-[0.5vw] text-[1.15vw]">
            <span className="text-gray-400">Dashboard</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">Import portfolio</span>
          </div>
          {/* 3-phase progress */}
          <div className="flex items-center gap-[0.5vw] text-[1vw] uppercase tracking-wider" style={{ color: "#6b7280" }}>
            {[
              { label: "Upload",  active: true  },
              { label: "Preview", active: false },
              { label: "Result",  active: false },
            ].map((p, i) => (
              <div key={p.label} className="flex items-center gap-[0.5vw]">
                <span
                  className="inline-flex items-center justify-center w-[1.4vw] h-[1.4vw] rounded-full text-[0.9vw]"
                  style={{
                    backgroundColor: p.active ? ACCENT : "transparent",
                    color: p.active ? "white" : "#9ca3af",
                    border: p.active ? "none" : "1px solid #d1d5db",
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ color: p.active ? "#111827" : "#9ca3af", fontWeight: p.active ? 600 : 400 }}>
                  {p.label}
                </span>
                {i < 2 && <span className="text-gray-300 ml-[0.3vw]">→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Drop zone — large dashed-border card */}
        <div className="flex-1 p-[1.4vw] flex flex-col min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 rounded-xl relative flex flex-col items-center justify-center px-[1.2vw] py-[1vw] overflow-hidden"
            style={{
              border: `2px dashed ${ACCENT}66`,
              backgroundColor: `${ACCENT}06`,
            }}
          >
            {/* Background hint of spreadsheet grid */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
              <div className="w-full h-full grid grid-cols-6 grid-rows-8">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-gray-400" />
                ))}
              </div>
            </div>

            {/* Upload icon — accent tinted */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-[4.5vw] h-[4.5vw] rounded-2xl flex items-center justify-center mb-[0.9vw] relative z-10"
              style={{ backgroundColor: `${ACCENT}1f` }}
            >
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 16 L3 19 A2 2 0 0 0 5 21 L19 21 A2 2 0 0 0 21 19 L21 16" />
                <path d="M12 3 L12 16 M6 9 L12 3 L18 9" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-[1.55vw] text-gray-900 text-center relative z-10"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              Drop a spreadsheet to import your portfolio
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-[1.1vw] text-gray-500 mt-[0.25vw] text-center relative z-10"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              .xlsx · .csv · .xls — up to 500 rows · we figure out the columns
            </motion.div>

            {/* Just-dropped file chip — animated in */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mt-[1vw] inline-flex items-center gap-[0.6vw] rounded-lg bg-white px-[0.9vw] py-[0.6vw] shadow-lg"
              style={{ border: `1px solid ${POSITIVE}55` }}
            >
              {/* XLSX icon */}
              <div
                className="w-[2vw] h-[2.4vw] rounded-md flex items-center justify-center text-white text-[0.9vw]"
                style={{ backgroundColor: POSITIVE, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
              >
                XLS
              </div>
              <div className="text-left">
                <div
                  className="text-[1.3vw] text-gray-900 leading-tight"
                  style={{ fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
                >
                  portfolio.xlsx
                </div>
                <div
                  className="text-[0.95vw] text-gray-500 flex items-center gap-[0.35vw]"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  <span>8 properties</span>
                  <span className="text-gray-300">·</span>
                  <span style={{ color: POSITIVE, fontWeight: 600 }}>ready to preview</span>
                </div>
              </div>
              <svg width="1.2vw" height="1.2vw" viewBox="0 0 24 24" fill="none" stroke={POSITIVE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12 L10 17 L19 8" />
              </svg>
            </motion.div>

            {/* Primary continue button — bottom-right of drop zone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.45 }}
              className="absolute right-[1vw] bottom-[1vw] rounded-md px-[1.1vw] py-[0.55vw] inline-flex items-center gap-[0.45vw] shadow-lg z-10"
              style={{ backgroundColor: ACCENT, color: "white", fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <span className="text-[1.2vw] font-semibold">Continue to preview</span>
              <span className="text-[1.2vw] leading-none">→</span>
              <motion.span
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.8, delay: 1.8, repeat: Infinity }}
                className="absolute inset-0 rounded-md"
                style={{ border: `0.15vw solid ${ACCENT}` }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom strip: other channels (20% of remaining height) ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.65 }}
        className="flex-1 mt-[1vw] flex flex-col justify-center"
      >
        <div
          className="text-[1.1vw] uppercase tracking-[0.22em] text-white/45 mb-[0.45vw]"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          Other ways to send data
        </div>
        <div className="flex items-center gap-[0.7vw] flex-wrap">
          {[
            { icon: "📧", label: "Forward to inbox@assetcentral.ai", mono: true,  delay: 1.8 },
            { icon: "💬", label: "Snap a photo on WhatsApp",          mono: false, delay: 1.92 },
            { icon: "✏️", label: "Enter manually",                   mono: false, delay: 2.04 },
          ].map((p) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: p.delay }}
              className="inline-flex items-center gap-[0.45vw] px-[0.7vw] py-[0.35vw] rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="text-[1.2vw] leading-none">{p.icon}</span>
              <span
                className="text-[1.1vw] text-white/75"
                style={{
                  fontFamily: p.mono
                    ? "var(--font-mono, monospace)"
                    : "var(--font-sans, sans-serif)",
                }}
              >
                {p.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ── Scene 33: Step 3 — AI structures the data ───────────────────────────────
function SceneStep3AIStructures() {
  // Rebuilt 2026-06 to mirror the PREVIEW phase of the live SpreadsheetImporter:
  // auto-inferred defaults pills strip up top, then a column-mapped preview
  // table with per-column confidence + per-row checkboxes (low-confidence row
  // un-ticked), then primary "Import 4 of 5" CTA at the bottom.
  const DEFAULTS = [
    { label: "Country",    value: "🇦🇪 UAE",     conf: 94 },
    { label: "Currency",   value: "USD",         conf: 98 },
    { label: "Asset type", value: "Apartment",   conf: 91 },
    { label: "Status",     value: "Let",         conf: 88 },
  ];

  const COLUMNS = [
    { key: "check",    label: "",          conf: null, align: "center" as const, w: "0.5fr" },
    { key: "address",  label: "Address",   conf: 96,   align: "left"   as const, w: "2fr"   },
    { key: "type",     label: "Type",      conf: 91,   align: "left"   as const, w: "1fr"   },
    { key: "rent",     label: "Annual rent", conf: 94, align: "right"  as const, w: "1.1fr" },
    { key: "mortgage", label: "Mortgage",  conf: 92,   align: "right"  as const, w: "1.1fr" },
    { key: "yield",    label: "Net yield", conf: 89,   align: "right"  as const, w: "1fr"   },
  ];

  const ROWS = [
    { check: true,  address: "12 Marina Mansions, Dubai", type: "Apartment", rent: "$38,500", mortgage: "$370k @ 6.5%", yld: "6.4%", warn: false, delay: 0.85 },
    { check: true,  address: "JVC Studio, Dubai",         type: "Apartment", rent: "$32,000", mortgage: "$210k @ 5.9%", yld: "7.1%", warn: false, delay: 0.95 },
    { check: true,  address: "44 Canary Wharf, London",   type: "Apartment", rent: "$28,750", mortgage: "$510k @ 4.2%", yld: "4.1%", warn: false, delay: 1.05 },
    { check: true,  address: "8 Plaka Penthouse, Athens", type: "Apartment", rent: "$36,200", mortgage: "$420k @ 3.8%", yld: "5.8%", warn: false, delay: 1.15 },
    { check: false, address: "Unit ??, line 12 of sheet",  type: "—",         rent: "—",        mortgage: "—",            yld: "—",    warn: true,  delay: 1.25 },
  ];

  const gridCols = COLUMNS.map((c) => c.w).join(" ");

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={3} label="Your PA structures it" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-[1vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Your PA maps the columns and infers the defaults.
      </motion.div>

      {/* ── Top strip: AI inferred defaults ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-lg border border-white/10 bg-white/[0.04] p-[0.8vw] mb-[1vw] flex items-center gap-[1vw] flex-wrap"
      >
        <div
          className="inline-flex items-center gap-[0.4vw] text-[1.05vw] uppercase tracking-[0.18em] text-white/55"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <motion.span
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="inline-block w-[0.45vw] h-[0.45vw] rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          AI inferred defaults
        </div>
        {DEFAULTS.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            className="inline-flex items-center gap-[0.45vw] rounded-full px-[0.65vw] py-[0.25vw]"
            style={{
              backgroundColor: `${POSITIVE}1f`,
              border: `1px solid ${POSITIVE}44`,
              fontFamily: "var(--font-sans, sans-serif)",
            }}
          >
            <svg width="1.05vw" height="1.05vw" viewBox="0 0 24 24" fill="none" stroke={POSITIVE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12 L10 17 L19 8" />
            </svg>
            <span className="text-[1.1vw]" style={{ color: "rgba(255,255,255,0.55)" }}>
              {d.label}:
            </span>
            <span className="text-[1.15vw]" style={{ color: "white", fontWeight: 600 }}>
              {d.value}
            </span>
            <span
              className="text-[0.9vw] tabular-nums"
              style={{ color: POSITIVE, fontFamily: "var(--font-mono, monospace)" }}
            >
              {d.conf}%
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Main panel: spreadsheet preview table ─────────────────────── */}
      <div className="flex-1 rounded-xl bg-white shadow-2xl overflow-hidden flex flex-col min-h-0">
        {/* Toolbar — phase indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="px-[1.4vw] py-[0.65vw] border-b border-gray-200 flex items-center justify-between"
          style={{ backgroundColor: "#f8f9fb", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <div className="flex items-center gap-[0.5vw] text-[1.1vw]">
            <span className="text-gray-400">portfolio.xlsx</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-900 font-semibold">Preview &amp; map columns</span>
          </div>
          <div className="flex items-center gap-[0.5vw] text-[1vw] uppercase tracking-wider">
            {[
              { label: "Upload",  done: true,  active: false },
              { label: "Preview", done: false, active: true  },
              { label: "Result",  done: false, active: false },
            ].map((p, i) => (
              <div key={p.label} className="flex items-center gap-[0.4vw]">
                <span
                  className="inline-flex items-center justify-center w-[1.4vw] h-[1.4vw] rounded-full text-[0.9vw]"
                  style={{
                    backgroundColor: p.active ? ACCENT : p.done ? `${POSITIVE}22` : "transparent",
                    color: p.active ? "white" : p.done ? POSITIVE : "#9ca3af",
                    border: p.active ? "none" : p.done ? "none" : "1px solid #d1d5db",
                    fontWeight: 700,
                  }}
                >
                  {p.done ? "✓" : i + 1}
                </span>
                <span style={{ color: p.active ? "#111827" : "#9ca3af", fontWeight: p.active ? 600 : 400 }}>
                  {p.label}
                </span>
                {i < 2 && <span className="text-gray-300 ml-[0.2vw]">→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Column headers — each is a dropdown showing mapped field + confidence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="grid items-stretch gap-[0.5vw] px-[1.2vw] pt-[0.9vw] pb-[0.5vw]"
          style={{ gridTemplateColumns: gridCols }}
        >
          {COLUMNS.map((c) => (
            <div
              key={c.key}
              className="flex flex-col gap-[0.25vw]"
              style={{ alignItems: c.align === "right" ? "flex-end" : c.align === "center" ? "center" : "flex-start" }}
            >
              {c.key === "check" ? (
                <div
                  className="w-[1.25vw] h-[1.25vw] rounded-sm flex items-center justify-center"
                  style={{ backgroundColor: ACCENT }}
                >
                  <svg width="65%" height="65%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12 L10 17 L19 8" />
                  </svg>
                </div>
              ) : (
                <>
                  <div
                    className="text-[0.85vw] uppercase tracking-[0.16em] text-gray-400"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    Map to
                  </div>
                  <div
                    className="rounded-md border border-gray-200 bg-white px-[0.55vw] py-[0.3vw] inline-flex items-center gap-[0.45vw]"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    <span className="text-[1.1vw] text-gray-900" style={{ fontWeight: 600 }}>
                      {c.label}
                    </span>
                    {c.conf != null && (
                      <span
                        className="text-[0.85vw] tabular-nums px-[0.35vw] py-[0.05vw] rounded-full"
                        style={{
                          backgroundColor: `${ACCENT}1f`,
                          color: ACCENT,
                          fontFamily: "var(--font-mono, monospace)",
                          fontWeight: 600,
                        }}
                      >
                        {c.conf}%
                      </span>
                    )}
                    <svg width="0.85vw" height="0.85vw" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M6 9 L12 15 L18 9" />
                    </svg>
                  </div>
                </>
              )}
            </div>
          ))}
        </motion.div>

        {/* Data rows */}
        <div className="px-[1.2vw] pb-[0.7vw] flex-1 overflow-hidden">
          {ROWS.map((r) => (
            <motion.div
              key={r.address}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: r.delay }}
              className="grid items-center gap-[0.5vw] px-[0.4vw] py-[0.5vw] text-[1.15vw] tabular-nums border-b border-gray-100"
              style={{
                gridTemplateColumns: gridCols,
                fontFamily: "var(--font-sans, sans-serif)",
                color: r.warn ? "#9ca3af" : "#1f2937",
                backgroundColor: r.warn ? `${WARNING}08` : "transparent",
              }}
            >
              {/* Checkbox */}
              <div className="flex items-center justify-center">
                <div
                  className="w-[1.25vw] h-[1.25vw] rounded-sm flex items-center justify-center"
                  style={{
                    backgroundColor: r.check ? ACCENT : "white",
                    border: r.check ? "none" : "1.5px solid #d1d5db",
                  }}
                >
                  {r.check && (
                    <svg width="65%" height="65%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12 L10 17 L19 8" />
                    </svg>
                  )}
                </div>
              </div>
              {/* Address column */}
              <div className="flex items-center gap-[0.4vw] truncate" style={{ fontWeight: r.warn ? 400 : 600, color: r.warn ? "#9ca3af" : "#111827" }}>
                <span className="truncate">{r.address}</span>
                {r.warn && (
                  <span
                    className="shrink-0 inline-flex items-center gap-[0.25vw] text-[0.9vw] uppercase tracking-wider px-[0.4vw] py-[0.08vw] rounded-full"
                    style={{ backgroundColor: `${WARNING}1f`, color: WARNING, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
                  >
                    <svg width="0.9vw" height="0.9vw" viewBox="0 0 24 24" fill="none" stroke={WARNING} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 3 L22 21 L2 21 Z M12 10 L12 15 M12 18 L12 18" />
                    </svg>
                    Skip · low confidence
                  </span>
                )}
              </div>
              <div className="text-gray-600">{r.type}</div>
              <div className="text-right">{r.rent}</div>
              <div className="text-right text-gray-600">{r.mortgage}</div>
              <div className="text-right" style={{ color: r.warn ? "#9ca3af" : POSITIVE, fontWeight: 600 }}>
                {r.yld}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer with primary import CTA */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.55 }}
          className="px-[1.4vw] py-[0.8vw] border-t border-gray-200 flex items-center justify-between"
          style={{ backgroundColor: "#f8f9fb", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <div className="flex items-center gap-[0.6vw] text-[1.1vw]">
            <span className="text-gray-500">5 rows detected ·</span>
            <span className="text-gray-900 font-semibold">4 ticked for import</span>
            <span className="text-gray-300">·</span>
            <span style={{ color: WARNING, fontWeight: 600 }}>1 skipped</span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.7 }}
            className="rounded-md px-[1.1vw] py-[0.55vw] inline-flex items-center gap-[0.45vw] shadow-lg relative"
            style={{ backgroundColor: ACCENT, color: "white" }}
          >
            <span className="text-[1.2vw] font-semibold">Import 4 of 5</span>
            <span className="text-[1.2vw] leading-none">→</span>
            <motion.span
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.8, delay: 2.0, repeat: Infinity }}
              className="absolute inset-0 rounded-md"
              style={{ border: `0.15vw solid ${ACCENT}` }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Scene 34: Step 4 — See the key numbers ──────────────────────────────────
// Rebuilt 2026-06 to match the current logged-in dashboard:
//   greeting strip → PropertyTable (7-col with totals + collapsible rows)
//   → AIGuidancePanel (Ask / Guide / Help tabs + prompt chips)
//   → AlertStrip (red-badged "3 things need attention this quarter")
//   → floating Ask button (bottom-right).
function SceneStep4Dashboard() {
  // 4 property rows + a totals row. Yield values get green tinting in
  // the column; the second row is the "expanded" one with a sub-row.
  const ROWS = [
    { name: "Marina Mansions",  loc: "Dubai",  type: "Apartment", status: "Let", value: "$530k",  yield: "6.4%", cashflow: "+$7.7k",  expanded: false, delay: 0.85 },
    { name: "JVC Studio",       loc: "Dubai",  type: "Apartment", status: "STR", value: "$290k",  yield: "7.1%", cashflow: "+$4.2k",  expanded: true,  delay: 0.95,
      sub: "Rent $38.5k · Mortgage $370k · Operator fee 4% verified" },
    { name: "London Flat",      loc: "London", type: "Apartment", status: "Let", value: "$740k",  yield: "4.1%", cashflow: "+$3.1k",  expanded: false, delay: 1.05 },
    { name: "Athens Penthouse", loc: "Athens", type: "Apartment", status: "Let", value: "$620k",  yield: "5.8%", cashflow: "+$4.8k",  expanded: false, delay: 1.15 },
  ];
  const PROMPT_CHIPS = [
    "Which property is dragging my yield?",
    "What's my next rent review?",
    "How should I refinance?",
    "Sell vs hold on London Flat?",
  ];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={4} label="See the key numbers" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-[1vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Your portfolio in one view.
      </motion.div>

      {/* Faux app frame */}
      <div className="flex-1 rounded-xl bg-white shadow-2xl flex flex-col overflow-hidden relative min-h-0">
        {/* ── Greeting strip ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="px-[1.4vw] py-[0.7vw] border-b border-gray-200 flex items-center justify-between"
          style={{ backgroundColor: "#f8f9fb", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <div className="flex items-center gap-[0.5vw] text-[1.15vw]">
            <span className="text-gray-900 font-semibold">Good morning, Sarah</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500">6 properties</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400">Updated 2 minutes ago</span>
          </div>
          <div
            className="inline-flex items-center gap-[0.4vw] px-[0.6vw] py-[0.25vw] rounded-full text-[1.05vw]"
            style={{ backgroundColor: `${ACCENT}12`, color: ACCENT }}
          >
            <span className="font-semibold tabular-nums">$3.2M portfolio</span>
            <span style={{ color: `${ACCENT}80` }}>·</span>
            <span className="tabular-nums">6.1% net yield</span>
          </div>
        </motion.div>

        {/* ── PropertyTable ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="px-[1.4vw] pt-[1vw] pb-[0.4vw]"
        >
          {/* Column header */}
          <div
            className="grid grid-cols-[1.5fr_0.9fr_0.9fr_0.7fr_0.8fr_0.8fr_0.9fr] gap-[0.6vw] px-[0.4vw] pb-[0.4vw] border-b border-gray-200 text-[0.95vw] uppercase tracking-wider text-gray-400"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            <div>Property</div>
            <div>Location</div>
            <div>Type</div>
            <div>Status</div>
            <div className="text-right">Value</div>
            <div className="text-right">Net yield</div>
            <div className="text-right">Cashflow</div>
          </div>

          {/* Totals row */}
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="grid grid-cols-[1.5fr_0.9fr_0.9fr_0.7fr_0.8fr_0.8fr_0.9fr] gap-[0.6vw] items-center px-[0.4vw] py-[0.55vw] text-[1.15vw] tabular-nums rounded-md mt-[0.3vw]"
            style={{
              backgroundColor: `${ACCENT}0c`,
              borderLeft: `0.2vw solid ${ACCENT}`,
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            <div className="flex items-center gap-[0.4vw]">
              <span style={{ color: ACCENT }}>All properties</span>
              <span
                className="text-[0.9vw] px-[0.35vw] py-[0.08vw] rounded-full"
                style={{ backgroundColor: `${ACCENT}1a`, color: ACCENT, fontWeight: 600 }}
              >
                6
              </span>
            </div>
            <div className="text-gray-300">—</div>
            <div className="text-gray-300">—</div>
            <div className="text-gray-300">—</div>
            <div className="text-right">$3.2M</div>
            <div className="text-right" style={{ color: POSITIVE }}>6.1%</div>
            <div className="text-right" style={{ color: POSITIVE }}>+$28.4k/yr</div>
          </motion.div>

          {/* Individual property rows */}
          {ROWS.map((r) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: r.delay }}
              className="rounded-md"
            >
              <div
                className="grid grid-cols-[1.5fr_0.9fr_0.9fr_0.7fr_0.8fr_0.8fr_0.9fr] gap-[0.6vw] items-center px-[0.4vw] py-[0.55vw] text-[1.2vw] tabular-nums border-b border-gray-100"
                style={{ fontFamily: "var(--font-sans, sans-serif)", color: "#1f2937" }}
              >
                <div className="flex items-center gap-[0.35vw]">
                  <motion.svg
                    animate={r.expanded ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ duration: 0.4, delay: r.delay + 0.25 }}
                    width="1vw" height="1vw" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
                  >
                    <path d="M9 6 L15 12 L9 18" />
                  </motion.svg>
                  <span style={{ fontWeight: 600, color: "#111827" }}>{r.name}</span>
                </div>
                <div className="text-gray-600">{r.loc}</div>
                <div className="text-gray-600">{r.type}</div>
                <div>
                  <span
                    className="text-[0.95vw] uppercase tracking-wider px-[0.4vw] py-[0.1vw] rounded-full"
                    style={{
                      backgroundColor: r.status === "STR" ? `${WARNING}1a` : `${POSITIVE}1a`,
                      color: r.status === "STR" ? WARNING : POSITIVE,
                    }}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="text-right">{r.value}</div>
                <div className="text-right" style={{ color: POSITIVE, fontWeight: 600 }}>{r.yield}</div>
                <div className="text-right" style={{ color: POSITIVE }}>{r.cashflow}</div>
              </div>
              {/* Expanded sub-row */}
              {r.expanded && r.sub && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4, delay: r.delay + 0.3 }}
                  className="px-[1.7vw] py-[0.4vw] text-[1.05vw] text-gray-500 border-b border-gray-100 flex items-center gap-[0.5vw]"
                  style={{ backgroundColor: "#f8f9fb", fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  <svg width="0.9vw" height="0.9vw" viewBox="0 0 24 24" fill="none" stroke={POSITIVE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12 L10 17 L19 8" />
                  </svg>
                  <span>{r.sub}</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ── AIGuidancePanel — tabbed Ask / Guide / Help ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.35 }}
          className="mx-[1.4vw] mt-[0.8vw] rounded-lg border border-gray-200 p-[0.8vw]"
          style={{ backgroundColor: "#fbfcff" }}
        >
          {/* Tab pills */}
          <div className="flex items-center gap-[0.4vw] mb-[0.6vw]">
            {[
              { label: "Ask",   active: true  },
              { label: "Guide", active: false },
              { label: "Help",  active: false },
            ].map((t) => (
              <div
                key={t.label}
                className="text-[1.05vw] px-[0.8vw] py-[0.3vw] rounded-full"
                style={{
                  backgroundColor: t.active ? ACCENT : "transparent",
                  color: t.active ? "white" : "#6b7280",
                  border: t.active ? "none" : "1px solid #e5e7eb",
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontWeight: t.active ? 600 : 400,
                }}
              >
                {t.label}
              </div>
            ))}
            <div className="flex-1" />
            <div
              className="text-[0.95vw] text-gray-400"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Your CEO is reading…
            </div>
          </div>

          {/* Input */}
          <div
            className="rounded-md border border-gray-200 px-[0.7vw] py-[0.5vw] bg-white flex items-center gap-[0.5vw]"
          >
            <span style={{ color: ACCENT, fontSize: "1.3vw" }}>✨</span>
            <span
              className="text-[1.15vw] text-gray-400 flex-1"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Ask anything about your portfolio…
            </span>
            <span
              className="text-[0.95vw] text-gray-400 px-[0.4vw] py-[0.1vw] rounded border border-gray-200"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              ⌘ K
            </span>
          </div>

          {/* Prompt chips */}
          <div className="mt-[0.5vw] flex items-center gap-[0.4vw] flex-wrap">
            {PROMPT_CHIPS.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 1.5 + i * 0.07 }}
                className="text-[1vw] px-[0.55vw] py-[0.25vw] rounded-full border border-gray-200 text-gray-600 bg-white"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {c}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── AlertStrip ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.85 }}
          className="mx-[1.4vw] mt-[0.6vw] mb-[1vw] rounded-lg px-[0.8vw] py-[0.55vw]"
          style={{
            backgroundColor: `${NEGATIVE}0a`,
            border: `1px solid ${NEGATIVE}33`,
          }}
        >
          <div
            className="flex items-center gap-[0.4vw] mb-[0.4vw]"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block w-[0.5vw] h-[0.5vw] rounded-full"
              style={{ backgroundColor: NEGATIVE }}
            />
            <span
              className="text-[1.1vw] uppercase tracking-wider"
              style={{ color: NEGATIVE, fontWeight: 600 }}
            >
              3 things need attention this quarter
            </span>
          </div>
          <div className="flex items-center gap-[0.4vw] flex-wrap">
            {[
              "Marina · Rate reset in 47 days",
              "JVC · Operator fee +2pp vs contract",
              "London · Service charge invoice due",
            ].map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 2.0 + i * 0.1 }}
                className="text-[1vw] px-[0.55vw] py-[0.2vw] rounded-full bg-white border"
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  color: "#7f1d1d",
                  borderColor: `${NEGATIVE}44`,
                }}
              >
                {a}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Floating Ask button (bottom-right of the frame) ─────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[1.4vw] bottom-[1.4vw] w-[3.4vw] h-[3.4vw] rounded-full flex items-center justify-center shadow-xl"
          style={{ backgroundColor: ACCENT }}
        >
          <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12 A9 9 0 0 1 12 21 L4 21 L4 13 A9 9 0 1 1 21 12 Z" />
            <path d="M8 11 L16 11 M8 14 L13 14" />
          </svg>
          <motion.span
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2.6 }}
            className="absolute inset-0 rounded-full"
            style={{ border: `0.2vw solid ${ACCENT}` }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// Helpers from the old Scene 4 (KpiSparkline / KpiRing / KpiIcon) were
// removed when SceneStep4Dashboard was rebuilt as a PropertyTable +
// AIGuidancePanel + AlertStrip layout — they had no other callers.

// ── Scene 35: Step 5 — Choose the right tool ────────────────────────────────
// Each tool card carries: colour-coded icon, name, description, a "what
// this answers" sample question, and a mini preview of what the tool
// actually outputs (bar chart, big number, scenarios, comparison ring etc).
// Reads as a real product tools menu, not a flat list of strings.
function SceneStep5Tools() {
  // Rebuilt 2026-06 to mirror /dashboard/calculators:
  //   • 4 live residential tiles (LIVE badges)
  //   • 2 SOON tiles (Residential IRR, Retrofit cost)
  //   • collapsed "Commercial calculators" disclosure (2 items: Office IRR, Office retrofit)
  //   • Recent runs mini-table at the bottom with 3 rows + "Import as asset" pill CTAs.

  const LIVE_TILES = [
    { name: "Mortgage",     sub: "Compare loan terms",            iconKind: "mortgage", delay: 0.45 },
    { name: "Short-term rental yield", sub: "Compare to long-let", iconKind: "str",      delay: 0.55 },
    { name: "Ownership",    sub: "Own vs rent vs co-own",         iconKind: "ownership", delay: 0.65 },
    { name: "Off-plan",     sub: "Roll-up returns over handover", iconKind: "offplan",  delay: 0.75 },
  ];

  const SOON_TILES = [
    { name: "Residential IRR", sub: "Project 5-10yr IRR",         iconKind: "irr",      delay: 0.95 },
    { name: "Retrofit cost",   sub: "EPC uplift modelling",       iconKind: "retrofit", delay: 1.05 },
  ];

  const RECENT = [
    { tool: "Mortgage",   asset: "Marina Mansions", result: "$370k @ 6.5%",       date: "14 Apr", import: true,  delay: 1.55 },
    { tool: "STR yield",  asset: "JVC Studio",      result: "7.1% net",            date: "12 Apr", import: false, delay: 1.7  },
    { tool: "Ownership",  asset: "—",                result: "Own better by $42k/yr", date: "8 Apr",  import: true,  delay: 1.85 },
  ];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={5} label="Choose the right tool" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-[1vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Pick a calculator. Import the run as a new asset.
      </motion.div>

      <div className="flex-1 rounded-xl bg-white shadow-2xl overflow-hidden flex flex-col min-h-0">
        {/* Header strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="px-[1.4vw] py-[0.7vw] border-b border-gray-200 flex items-end justify-between"
          style={{ backgroundColor: "#f8f9fb", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <div>
            <div className="text-[0.95vw] uppercase tracking-[0.22em] text-gray-400">
              Calculators
            </div>
            <div
              className="text-[1.85vw] text-gray-900 leading-tight mt-[0.1vw]"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              Residential calculators
            </div>
          </div>
          <div className="text-[1.05vw] text-gray-500 pb-[0.2vw]">
            4 live <span className="text-gray-300">·</span> 2 coming soon <span className="text-gray-300">·</span> 2 commercial
          </div>
        </motion.div>

        <div className="px-[1.4vw] py-[1vw] flex-1 flex flex-col gap-[1vw] overflow-hidden">
          {/* Live tile grid — 3 columns, 4 tiles (3 + 1 wrap) */}
          <div className="grid grid-cols-3 gap-[0.7vw]">
            {LIVE_TILES.map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: t.delay }}
                className="rounded-lg border border-gray-200 bg-white p-[0.7vw] flex items-start gap-[0.6vw] relative"
              >
                <div
                  className="shrink-0 w-[2.4vw] h-[2.4vw] rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${ACCENT}15` }}
                >
                  <CalcIcon kind={t.iconKind} colour={ACCENT} />
                </div>
                <div className="flex-1 min-w-0 pr-[2.5vw]">
                  <div
                    className="text-[1.35vw] text-gray-900 leading-tight"
                    style={{ fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-[1vw] text-gray-500 leading-snug mt-[0.1vw]"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {t.sub}
                  </div>
                </div>
                <span
                  className="absolute top-[0.5vw] right-[0.5vw] text-[0.8vw] uppercase tracking-wider px-[0.4vw] py-[0.08vw] rounded-full"
                  style={{
                    backgroundColor: ACCENT,
                    color: "white",
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontWeight: 700,
                  }}
                >
                  LIVE
                </span>
              </motion.div>
            ))}
          </div>

          {/* Soon row — 2 tiles, faded */}
          <div className="grid grid-cols-3 gap-[0.7vw]">
            {SOON_TILES.map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.55, y: 0 }}
                transition={{ duration: 0.45, delay: t.delay }}
                className="rounded-lg border border-gray-200 bg-gray-50 p-[0.7vw] flex items-start gap-[0.6vw] relative"
              >
                <div
                  className="shrink-0 w-[2.4vw] h-[2.4vw] rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                >
                  <CalcIcon kind={t.iconKind} colour="#9ca3af" />
                </div>
                <div className="flex-1 min-w-0 pr-[2.5vw]">
                  <div
                    className="text-[1.35vw] text-gray-700 leading-tight"
                    style={{ fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-[1vw] text-gray-500 leading-snug mt-[0.1vw]"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {t.sub}
                  </div>
                </div>
                <span
                  className="absolute top-[0.5vw] right-[0.5vw] text-[0.8vw] uppercase tracking-wider px-[0.4vw] py-[0.08vw] rounded-full"
                  style={{
                    backgroundColor: "#e5e7eb",
                    color: "#6b7280",
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontWeight: 700,
                  }}
                >
                  SOON
                </span>
              </motion.div>
            ))}
            {/* Commercial collapsed disclosure occupies the 3rd cell */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.65, y: 0 }}
              transition={{ duration: 0.45, delay: 1.15 }}
              className="rounded-lg border border-dashed border-gray-300 bg-white p-[0.7vw] flex flex-col"
            >
              <div className="flex items-center justify-between mb-[0.3vw]">
                <span
                  className="text-[1.05vw] uppercase tracking-[0.18em] text-gray-500"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  Commercial
                </span>
                <span className="text-[1.05vw] text-gray-400" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                  ▾ expand
                </span>
              </div>
              <div className="flex flex-col gap-[0.2vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                <span className="text-[1vw] text-gray-600">• Office IRR</span>
                <span className="text-[1vw] text-gray-600">• Office retrofit</span>
              </div>
            </motion.div>
          </div>

          {/* Recent runs mini-table */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="rounded-lg border border-gray-200 bg-white overflow-hidden flex-1 min-h-0 flex flex-col"
          >
            <div
              className="px-[0.9vw] py-[0.5vw] border-b border-gray-100 flex items-center justify-between"
              style={{ backgroundColor: "#f8f9fb" }}
            >
              <div
                className="text-[1.1vw] uppercase tracking-[0.18em] text-gray-500"
                style={{ fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
              >
                Recent runs
              </div>
              <div
                className="text-[0.95vw] text-gray-400"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                Last 7 days
              </div>
            </div>
            <div
              className="grid items-center gap-[0.5vw] px-[0.9vw] py-[0.35vw] text-[0.85vw] uppercase tracking-wider text-gray-400 border-b border-gray-100"
              style={{ gridTemplateColumns: "1fr 1.4fr 1.7fr 0.8fr 1fr", fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <div>Tool</div>
              <div>Asset</div>
              <div>Net result</div>
              <div>Date</div>
              <div className="text-right">Action</div>
            </div>
            {RECENT.map((r) => (
              <motion.div
                key={r.tool + r.asset}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: r.delay }}
                className="grid items-center gap-[0.5vw] px-[0.9vw] py-[0.5vw] text-[1.05vw] border-b border-gray-100 last:border-0"
                style={{ gridTemplateColumns: "1fr 1.4fr 1.7fr 0.8fr 1fr", fontFamily: "var(--font-sans, sans-serif)", color: "#374151" }}
              >
                <div style={{ color: ACCENT, fontWeight: 600 }}>{r.tool}</div>
                <div className="text-gray-700">{r.asset}</div>
                <div className="text-gray-900 tabular-nums" style={{ fontWeight: 600 }}>{r.result}</div>
                <div className="text-gray-500 tabular-nums">{r.date}</div>
                <div className="text-right">
                  {r.import ? (
                    <span
                      className="inline-block text-[0.9vw] uppercase tracking-wider px-[0.55vw] py-[0.18vw] rounded-md"
                      style={{
                        backgroundColor: ACCENT,
                        color: "white",
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontWeight: 700,
                      }}
                    >
                      Import as asset
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-[0.2vw] text-[0.95vw] text-gray-500"
                      style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                    >
                      linked →
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Calculator tile icons — minimal stroke glyphs reused across LIVE + SOON tiles.
function CalcIcon({ kind, colour }: { kind: string; colour: string }) {
  const props = {
    width: "55%",
    height: "55%",
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: colour,
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "mortgage":
      return (<svg {...props}><path d="M3 11 L12 4 L21 11" /><path d="M5 10 L5 20 L19 20 L19 10" /><path d="M10 20 L10 14 L14 14 L14 20" /></svg>);
    case "str":
      return (<svg {...props}><path d="M3 12 L3 19 L21 19 L21 12" /><path d="M3 12 L6 8 L18 8 L21 12" /><path d="M7 12 L11 12 M13 12 L17 12" /></svg>);
    case "ownership":
      return (<svg {...props}><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M3 20 C3 16 5 14 8 14 C11 14 13 16 13 20" /><path d="M11 20 C11 16 13 14 16 14 C19 14 21 16 21 20" /></svg>);
    case "offplan":
      return (<svg {...props}><rect x="4" y="9" width="6" height="12" /><rect x="14" y="4" width="6" height="17" /><path d="M2 21 L22 21" /></svg>);
    case "irr":
      return (<svg {...props}><path d="M3 17 L9 11 L13 14 L21 5" /><path d="M21 5 L15 5 M21 5 L21 11" /></svg>);
    case "retrofit":
      return (<svg {...props}><path d="M12 3 L12 21" /><path d="M5 8 L12 3 L19 8" /><path d="M7 12 L17 12 M7 16 L17 16" /></svg>);
    default:
      return null;
  }
}

// ── Scene 36: Step 6 — Compare scenarios ────────────────────────────────────
// Rebuilt 2026-06 to mirror the live LeversPanel + target-yield selector
// inside the portfolio page:
//   • portfolio header with target-yield input + current portfolio yield
//   • 2x2 grid of four levers (Rent uplift / Refinance / Switch to STR /
//     Hold or sell), each with a slider/toggle/comparison + impact line + a
//     checkbox to "Apply"
//   • bottom stacked-bar projection: current 6.1% → with-levers 7.4%
function SceneStep6Scenarios() {
  const LEVERS = [
    {
      n: 1,
      title: "Rent uplift",
      // Slider control set at "+8%"
      ctrl: "slider" as const,
      ctrlValue: 0.55,
      ctrlLabel: "+8%",
      ctrlCaption: "Below market by 12%",
      impact: "+ $3.2k/yr · yield +0.4pp",
      applied: true,
      delay: 0.45,
    },
    {
      n: 2,
      title: "Refinance",
      ctrl: "compare" as const,
      ctrlValue: "6.5% APR → 5.8% APR",
      ctrlCaption: "Marina rate resets in 47d",
      impact: "− $2.2k/yr interest · yield +0.3pp",
      applied: false,
      delay: 0.6,
    },
    {
      n: 3,
      title: "Switch to short-term let",
      ctrl: "toggle" as const,
      ctrlValue: "Long-let → STR",
      ctrlCaption: "JVC Studio · 78% occupancy",
      impact: "+ $6.65k/yr · yield +0.9pp",
      applied: true,
      delay: 0.75,
    },
    {
      n: 4,
      title: "Hold or sell",
      ctrl: "bars" as const,
      ctrlValue: ["Sell now · $570k", "Hold · Y5 · $660k"],
      ctrlCaption: "London Flat 5y projection",
      impact: "Hold: + $87k over 5y",
      applied: false,
      delay: 0.9,
    },
  ];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={6} label="Compare scenarios" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-[1vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Pull the levers. See the new yield.
      </motion.div>

      <div className="flex-1 rounded-xl bg-white shadow-2xl overflow-hidden flex flex-col min-h-0">
        {/* ── Portfolio header strip ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="px-[1.4vw] py-[0.8vw] border-b border-gray-200 flex items-center justify-between"
          style={{ backgroundColor: "#f8f9fb", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <div className="flex items-center gap-[0.5vw] text-[1.15vw]">
            <span className="text-gray-900 font-semibold">Portfolio</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500">4 properties</span>
          </div>

          {/* Target yield input — central */}
          <div className="flex items-center gap-[0.5vw]">
            <span className="text-[0.95vw] uppercase tracking-wider text-gray-400">
              Target yield
            </span>
            <div
              className="inline-flex items-center gap-[0.4vw] rounded-md border-2 px-[0.6vw] py-[0.25vw] bg-white"
              style={{ borderColor: ACCENT, boxShadow: `0 0 0 0.2vw ${ACCENT}1f` }}
            >
              <span
                className="text-[1.3vw] tabular-nums"
                style={{ color: NAVY, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
              >
                7.0%
              </span>
              <div className="flex flex-col leading-none">
                <svg width="0.7vw" height="0.6vw" viewBox="0 0 24 24" fill={ACCENT} aria-hidden>
                  <path d="M12 6 L20 18 L4 18 Z" />
                </svg>
                <svg width="0.7vw" height="0.6vw" viewBox="0 0 24 24" fill="#9ca3af" aria-hidden>
                  <path d="M12 18 L20 6 L4 6 Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right: portfolio yield + delta */}
          <div className="flex items-center gap-[0.5vw]">
            <span className="text-[0.95vw] uppercase tracking-wider text-gray-400">
              Portfolio yield
            </span>
            <span
              className="text-[1.4vw] tabular-nums"
              style={{ color: NAVY, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
            >
              6.1%
            </span>
            <span
              className="text-[0.95vw] tabular-nums px-[0.4vw] py-[0.1vw] rounded-full"
              style={{ backgroundColor: `${WARNING}1f`, color: WARNING, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
            >
              Δ −0.9pp
            </span>
          </div>
        </motion.div>

        {/* ── Four levers — 2x2 grid ─────────────────────────────────────── */}
        <div className="px-[1.4vw] pt-[1vw] pb-[0.8vw] flex-1 grid grid-cols-2 grid-rows-2 gap-[0.8vw] min-h-0">
          {LEVERS.map((l) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: l.delay }}
              className="rounded-lg border p-[0.85vw] flex flex-col relative"
              style={{
                backgroundColor: l.applied ? `${ACCENT}08` : "#fbfcff",
                borderColor: l.applied ? `${ACCENT}55` : "#e5e7eb",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-[0.5vw]">
                <div className="flex items-center gap-[0.4vw]">
                  <span
                    className="text-[0.85vw] uppercase tracking-[0.18em]"
                    style={{ color: ACCENT, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
                  >
                    Lever {l.n}
                  </span>
                  <span
                    className="text-[1.25vw] text-gray-900 leading-none"
                    style={{ fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
                  >
                    · {l.title}
                  </span>
                </div>
                {/* Apply checkbox */}
                <div className="flex items-center gap-[0.35vw]">
                  <div
                    className="w-[1.15vw] h-[1.15vw] rounded-sm flex items-center justify-center"
                    style={{
                      backgroundColor: l.applied ? ACCENT : "white",
                      border: l.applied ? "none" : "1.5px solid #d1d5db",
                    }}
                  >
                    {l.applied && (
                      <svg width="65%" height="65%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12 L10 17 L19 8" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-[0.95vw] uppercase tracking-wider"
                    style={{
                      color: l.applied ? ACCENT : "#9ca3af",
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontWeight: 600,
                    }}
                  >
                    Apply
                  </span>
                </div>
              </div>

              {/* Control area (varies by type) */}
              <div className="flex-1 flex flex-col gap-[0.35vw] justify-center">
                {l.ctrl === "slider" && (
                  <div>
                    <div className="flex items-baseline justify-between mb-[0.25vw]">
                      <span
                        className="text-[0.9vw] uppercase tracking-wider text-gray-400"
                        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        Uplift
                      </span>
                      <span
                        className="text-[1.7vw] tabular-nums leading-none"
                        style={{ color: ACCENT, fontFamily: "var(--font-display, serif)" }}
                      >
                        {l.ctrlLabel}
                      </span>
                    </div>
                    {/* Slider track + thumb */}
                    <div
                      className="relative h-[0.55vw] rounded-full overflow-visible"
                      style={{ backgroundColor: "#e5e7eb" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${l.ctrlValue * 100}%` }}
                        transition={{ duration: 0.9, delay: l.delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-0 bottom-0 rounded-full"
                        style={{ backgroundColor: ACCENT }}
                      />
                      <motion.div
                        initial={{ left: 0, opacity: 0 }}
                        animate={{ left: `${l.ctrlValue * 100}%`, opacity: 1 }}
                        transition={{ duration: 0.9, delay: l.delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-1/2 w-[1.15vw] h-[1.15vw] rounded-full bg-white"
                        style={{
                          marginLeft: "-0.575vw",
                          marginTop: "-0.575vw",
                          border: `2.5px solid ${ACCENT}`,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }}
                      />
                    </div>
                  </div>
                )}
                {l.ctrl === "compare" && (
                  <div>
                    <div
                      className="text-[0.9vw] uppercase tracking-wider text-gray-400 mb-[0.2vw]"
                      style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                    >
                      Refinance to
                    </div>
                    <div
                      className="text-[1.55vw] tabular-nums leading-tight"
                      style={{ fontFamily: "var(--font-display, serif)", color: NAVY }}
                    >
                      6.5% <span className="text-gray-400">→</span> <span style={{ color: ACCENT }}>5.8%</span> APR
                    </div>
                  </div>
                )}
                {l.ctrl === "toggle" && (
                  <div>
                    <div
                      className="text-[0.9vw] uppercase tracking-wider text-gray-400 mb-[0.25vw]"
                      style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                    >
                      Letting type
                    </div>
                    <div className="inline-flex items-center gap-[0.5vw]">
                      <span
                        className="text-[1.15vw] px-[0.5vw] py-[0.2vw] rounded-md text-gray-400"
                        style={{ fontFamily: "var(--font-sans, sans-serif)", backgroundColor: "#f3f4f6" }}
                      >
                        Long-let
                      </span>
                      <span className="text-gray-300 text-[1.2vw]">→</span>
                      <span
                        className="text-[1.15vw] px-[0.5vw] py-[0.2vw] rounded-md"
                        style={{
                          fontFamily: "var(--font-sans, sans-serif)",
                          backgroundColor: ACCENT,
                          color: "white",
                          fontWeight: 600,
                        }}
                      >
                        STR
                      </span>
                    </div>
                  </div>
                )}
                {l.ctrl === "bars" && Array.isArray(l.ctrlValue) && (
                  <div className="flex items-end gap-[0.6vw]" style={{ height: "3vw" }}>
                    {(l.ctrlValue as string[]).map((label, i) => (
                      <div key={label} className="flex-1 flex flex-col items-center gap-[0.2vw]">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: i === 0 ? "60%" : "100%" }}
                          transition={{ duration: 0.6, delay: l.delay + 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full rounded-t-md"
                          style={{
                            backgroundColor: i === 0 ? "#d1d5db" : POSITIVE,
                            minHeight: "8px",
                          }}
                        />
                        <span
                          className="text-[0.85vw] uppercase tracking-wider"
                          style={{ color: i === 0 ? "#9ca3af" : "#374151", fontFamily: "var(--font-sans, sans-serif)" }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div
                  className="text-[0.9vw] text-gray-400"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {l.ctrlCaption}
                </div>
              </div>

              {/* Impact line — bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: l.delay + 0.55 }}
                className="mt-[0.5vw] pt-[0.45vw] border-t flex items-center justify-between"
                style={{ borderTopColor: "rgba(0,0,0,0.06)" }}
              >
                <span
                  className="text-[0.9vw] uppercase tracking-wider text-gray-400"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  Impact
                </span>
                <span
                  className="text-[1.15vw] tabular-nums"
                  style={{
                    color: POSITIVE,
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontWeight: 600,
                  }}
                >
                  {l.impact}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom: portfolio yield projection bar ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="px-[1.4vw] py-[0.8vw] border-t border-gray-200"
          style={{ backgroundColor: "#f8f9fb" }}
        >
          <div className="flex items-center gap-[0.8vw]">
            <span
              className="text-[1vw] uppercase tracking-wider text-gray-500"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Projected portfolio yield
            </span>
            {/* Stacked horizontal bar */}
            <div className="flex-1 flex items-center gap-[0.5vw]">
              <span
                className="text-[1.15vw] tabular-nums"
                style={{ color: "#6b7280", fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
              >
                6.1%
              </span>
              <div
                className="relative flex-1 h-[1.1vw] rounded-md overflow-hidden"
                style={{ backgroundColor: "#e5e7eb" }}
              >
                {/* Current portion (~ 6.1 / 7.4 = ~82%) */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 0.9, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 bottom-0"
                  style={{ backgroundColor: "#9ca3af" }}
                />
                {/* With-levers extension (positive) */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "18%" }}
                  transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 bottom-0"
                  style={{ left: "82%", backgroundColor: POSITIVE }}
                />
              </div>
              <span
                className="text-[1.3vw] tabular-nums"
                style={{ color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
              >
                7.4%
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.25 }}
                className="inline-flex items-center gap-[0.2vw] text-[1vw] tabular-nums px-[0.45vw] py-[0.15vw] rounded-full"
                style={{ backgroundColor: `${POSITIVE}1a`, color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
              >
                <svg width="0.95vw" height="0.95vw" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 4 L20 14 L14 14 L14 20 L10 20 L10 14 L4 14 Z" />
                </svg>
                Δ +1.3pp
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Scene 37: Step 7 — AI explains what the numbers mean ────────────────────
function SceneStep7AIInsights() {
  // Five categorised decision columns — colour-coded by category.
  const CATEGORIES = [
    {
      key: "improve",
      label: "Improve",
      count: 2,
      tone: POSITIVE,
      items: ["Marina Mansions", "London Flat"],
      delay: 0.85,
    },
    {
      key: "refi",
      label: "Refinance",
      count: 1,
      tone: ACCENT,
      items: ["Athens Penthouse"],
      delay: 0.95,
    },
    {
      key: "hold",
      label: "Hold",
      count: 2,
      tone: WARNING,
      items: ["JVC Studio", "Marina Mansions"],
      delay: 1.05,
    },
    {
      key: "sell",
      label: "Sell / Review",
      count: 1,
      tone: NEGATIVE,
      items: ["London Flat"],
      delay: 1.15,
    },
    {
      key: "acquire",
      label: "Acquire",
      count: 0,
      tone: POSITIVE,
      items: [],
      delay: 1.25,
    },
  ];

  const ACTIONS = [
    {
      n: "01",
      property: "Marina Mansions",
      lead: "Rate reset in 47 days.",
      strong: "Refinance may save ~$2.2k/yr.",
      tail: "Review with your lender.",
      tone: ACCENT,
      delay: 1.55,
    },
    {
      n: "02",
      property: "JVC Studio",
      lead: "Operator fees appear 2pp above contract.",
      strong: "Reviewing the contract may recover ~$1.1k/yr.",
      tail: "",
      tone: WARNING,
      delay: 1.75,
    },
    {
      n: "03",
      property: "London Flat",
      lead: "Rent appears 12% below market.",
      strong: "A rent review at renewal may add ~$3.2k/yr.",
      tail: "",
      tone: POSITIVE,
      delay: 1.95,
    },
  ];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={7} label="Your CEO ranks the actions" />

      {/* Board-report frame */}
      <div className="flex-1 rounded-xl bg-white shadow-2xl flex flex-col overflow-hidden min-h-0">
        {/* ── Cover band ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="px-[1.5vw] py-[1vw] flex items-end justify-between"
          style={{ background: `linear-gradient(90deg, ${NAVY} 0%, #14182f 100%)` }}
        >
          <div>
            <div
              className="text-[0.95vw] uppercase tracking-[0.28em] text-white/45"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              AssetCentral · Board Report
            </div>
            <div
              className="text-[2.4vw] text-white leading-tight mt-[0.15vw]"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              Portfolio review · Q3 2026
            </div>
          </div>
          <div className="flex items-center gap-[0.45vw] flex-wrap justify-end max-w-[44%]">
            {[
              { l: "6 properties",         tone: "white" },
              { l: "Data confidence: 92%", tone: POSITIVE },
              { l: "Net yield: 6.1%",      tone: POSITIVE },
              { l: "Cashflow: +$28.4k/yr", tone: POSITIVE },
            ].map((p, i) => (
              <motion.div
                key={p.l}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                className="text-[1vw] px-[0.55vw] py-[0.2vw] rounded-full"
                style={{
                  backgroundColor: p.tone === "white" ? "rgba(255,255,255,0.1)" : `${p.tone}22`,
                  color: p.tone === "white" ? "white" : p.tone,
                  fontFamily: "var(--font-sans, sans-serif)",
                  border: p.tone === "white" ? "1px solid rgba(255,255,255,0.15)" : `1px solid ${p.tone}40`,
                }}
              >
                {p.l}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Section: Categorised decisions ─────────────────────────── */}
        <div className="px-[1.5vw] pt-[1vw]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex items-baseline justify-between mb-[0.5vw]"
          >
            <div
              className="text-[1.55vw] text-gray-900"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              Categorised decisions
            </div>
            <div
              className="text-[0.95vw] uppercase tracking-wider text-gray-400"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              6 properties · 6 calls
            </div>
          </motion.div>
          <div className="grid grid-cols-5 gap-[0.6vw]">
            {CATEGORIES.map((c) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: c.delay }}
                className="rounded-lg border p-[0.6vw] flex flex-col"
                style={{
                  backgroundColor: `${c.tone}08`,
                  borderColor: `${c.tone}33`,
                }}
              >
                {/* Header pill — label + count badge */}
                <div className="flex items-center justify-between mb-[0.45vw]">
                  <span
                    className="text-[0.95vw] uppercase tracking-[0.18em]"
                    style={{ color: c.tone, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="text-[0.9vw] tabular-nums px-[0.35vw] py-[0.05vw] rounded-full"
                    style={{
                      backgroundColor: c.tone,
                      color: "white",
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontWeight: 700,
                    }}
                  >
                    {c.count}
                  </span>
                </div>
                {/* Per-asset chips OR empty-state dash */}
                <div className="flex flex-col gap-[0.25vw]">
                  {c.items.length === 0 ? (
                    <div
                      className="text-[1.1vw] text-gray-400 text-center py-[0.5vw]"
                      style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                    >
                      —
                    </div>
                  ) : (
                    c.items.map((it) => (
                      <div
                        key={it}
                        className="text-[1vw] px-[0.45vw] py-[0.2vw] rounded-md truncate"
                        style={{
                          backgroundColor: "white",
                          color: "#1f2937",
                          border: `1px solid ${c.tone}22`,
                          fontFamily: "var(--font-sans, sans-serif)",
                        }}
                      >
                        {it}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Section: Top recommended actions ───────────────────────── */}
        <div className="px-[1.5vw] pt-[1vw] flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.45 }}
            className="flex items-baseline justify-between mb-[0.5vw]"
          >
            <div
              className="text-[1.55vw] text-gray-900"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              Top recommended actions
            </div>
            <div
              className="text-[0.95vw] uppercase tracking-wider text-gray-400"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Ranked by potential yield impact
            </div>
          </motion.div>
          <div className="flex flex-col gap-[0.5vw]">
            {ACTIONS.map((a) => (
              <motion.div
                key={a.n}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: a.delay }}
                className="rounded-lg border border-gray-200 px-[0.8vw] py-[0.6vw] flex items-start gap-[0.7vw]"
                style={{
                  backgroundColor: "#fbfcff",
                  borderLeft: `0.25vw solid ${a.tone}`,
                }}
              >
                {/* Number */}
                <div
                  className="shrink-0 text-[1.7vw] tabular-nums leading-none mt-[0.1vw]"
                  style={{ color: a.tone, fontFamily: "var(--font-display, serif)", fontWeight: 600 }}
                >
                  {a.n}.
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[1.25vw] text-gray-900 leading-snug"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    <span style={{ fontWeight: 600 }}>{a.property}</span>
                    <span className="text-gray-400"> — </span>
                    <span>{a.lead}</span>{" "}
                    <span style={{ fontWeight: 600, color: a.tone }}>{a.strong}</span>
                    {a.tail && <> <span>{a.tail}</span></>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Toolbar ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.2 }}
          className="px-[1.5vw] py-[0.7vw] flex items-center justify-between border-t border-gray-200 mt-[0.6vw]"
          style={{ backgroundColor: "#f8f9fb", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <span className="text-[1.1vw] text-gray-500">← Back to dashboard</span>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.35 }}
            className="rounded-md px-[1vw] py-[0.45vw] inline-flex items-center gap-[0.45vw] shadow"
            style={{ backgroundColor: ACCENT, color: "white" }}
          >
            <svg width="1.1vw" height="1.1vw" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 2 L18 2 L18 9 L21 9 L21 17 L18 17 L18 22 L6 22 L6 17 L3 17 L3 9 L6 9 Z" />
              <path d="M9 13 L15 13 M9 17 L15 17" />
            </svg>
            <span className="text-[1.15vw] font-semibold">Print / Save as PDF</span>
          </motion.div>
        </motion.div>

        {/* ── Compliance footer ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.5 }}
          className="px-[1.5vw] py-[0.4vw] text-[0.85vw] text-gray-400 text-center border-t border-gray-100"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          Decision support based on portfolio data. AssetCentral does not provide investment advice.
        </motion.div>
      </div>
    </div>
  );
}

// ── Scene 38: Step 8 — Export / share ───────────────────────────────────────
// Rebuilt 2026-06 to mirror /dashboard/reports — the rendered Portfolio
// report (ac-report HTML) with a toolbar above showing "Print / Save as PDF"
// + "Email link". Letter-paper visual treatment with a navy cover band.
function SceneStep8Export() {
  // 12 months of cashflow ($ thousands) — modest upward trend.
  const REPORT_BARS = [2.3, 2.4, 2.5, 2.4, 2.5, 2.6, 2.5, 2.6, 2.5, 2.7, 2.6, 2.8];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={8} label="Export a clear report" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-[2.4vw] text-white leading-tight mb-[1vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Print, save as PDF, or share the link.
      </motion.div>

      {/* ── Toolbar strip ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-lg border border-white/10 bg-white/[0.04] px-[1.1vw] py-[0.65vw] flex items-center justify-between mb-[1vw]"
      >
        <div className="flex items-center gap-[0.5vw]">
          <svg width="1.4vw" height="1.4vw" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="5" y="3" width="14" height="18" rx="1.5" />
            <path d="M8 8 L16 8 M8 12 L16 12 M8 16 L13 16" />
          </svg>
          <div>
            <div
              className="text-[1.4vw] text-white leading-tight"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              Portfolio report
            </div>
            <div
              className="text-[0.95vw] text-white/45"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Q3 2026 · 4 properties · 92% data confidence
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[0.5vw]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="rounded-md px-[0.8vw] py-[0.4vw] inline-flex items-center gap-[0.4vw] shadow-lg"
            style={{ backgroundColor: ACCENT, color: "white", fontFamily: "var(--font-sans, sans-serif)" }}
          >
            <svg width="1.05vw" height="1.05vw" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 2 L18 2 L18 9 L21 9 L21 17 L18 17 L18 22 L6 22 L6 17 L3 17 L3 9 L6 9 Z" />
              <path d="M9 13 L15 13 M9 17 L15 17" />
            </svg>
            <span className="text-[1.05vw] font-semibold">Print / Save as PDF</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="rounded-md px-[0.8vw] py-[0.4vw] inline-flex items-center gap-[0.4vw]"
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              fontFamily: "var(--font-sans, sans-serif)",
            }}
          >
            <svg width="1.05vw" height="1.05vw" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 6 L21 6 L21 18 L3 18 Z M3 6 L12 13 L21 6" />
            </svg>
            <span className="text-[1.05vw]">Email link</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Rendered report (letter-paper) ──────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="rounded-md bg-white shadow-2xl overflow-hidden flex flex-col"
          style={{ width: "78%", maxHeight: "100%" }}
        >
          {/* ── Cover band ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="px-[1.5vw] py-[1.1vw]"
            style={{ background: `linear-gradient(90deg, ${NAVY} 0%, #14182f 100%)` }}
          >
            <div
              className="text-[0.85vw] uppercase tracking-[0.28em] text-white/45"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              AssetCentral · Portfolio Report
            </div>
            <div
              className="text-[2vw] text-white leading-tight mt-[0.15vw] mb-[0.55vw]"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              Q3 2026 · S. Reynolds
            </div>
            <div className="flex items-center gap-[0.4vw] flex-wrap">
              {[
                { l: "4 properties",         tone: "white"  },
                { l: "$3.2M total",          tone: "white"  },
                { l: "6.1% net yield",       tone: POSITIVE },
                { l: "Data confidence 92%",  tone: POSITIVE },
              ].map((p, i) => (
                <motion.div
                  key={p.l}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 + i * 0.07 }}
                  className="text-[0.9vw] px-[0.5vw] py-[0.18vw] rounded-full"
                  style={{
                    backgroundColor: p.tone === "white" ? "rgba(255,255,255,0.1)" : `${p.tone}22`,
                    color: p.tone === "white" ? "white" : p.tone,
                    fontFamily: "var(--font-sans, sans-serif)",
                    border: p.tone === "white" ? "1px solid rgba(255,255,255,0.15)" : `1px solid ${p.tone}40`,
                  }}
                >
                  {p.l}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Report body */}
          <div className="px-[1.5vw] pt-[1vw] pb-[0.8vw] flex flex-col gap-[0.7vw]">
            {/* ── Section 1: Portfolio snapshot ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05 }}
            >
              <div
                className="text-[0.8vw] uppercase tracking-[0.2em] text-gray-400 mb-[0.3vw]"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                01 · Portfolio snapshot
              </div>
              {/* KPI strip */}
              <div className="grid grid-cols-4 gap-[0.5vw] mb-[0.55vw]">
                {[
                  { l: "Properties",  v: "4",      tone: "#111827", sub: "" },
                  { l: "Total value", v: "$3.2M",  tone: "#111827", sub: "" },
                  { l: "Net yield",   v: "6.1%",   tone: POSITIVE,  sub: "" },
                  { l: "Cashflow",    v: "+$28.4k",tone: POSITIVE,  sub: "/yr" },
                ].map((k) => (
                  <div
                    key={k.l}
                    className="rounded-md px-[0.55vw] py-[0.4vw]"
                    style={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                  >
                    <div
                      className="text-[0.75vw] uppercase tracking-wider text-gray-500"
                      style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                    >
                      {k.l}
                    </div>
                    <div className="flex items-baseline gap-[0.2vw] mt-[0.1vw]">
                      <span
                        className="text-[1.4vw] tabular-nums leading-none"
                        style={{ fontFamily: "var(--font-display, serif)", color: k.tone }}
                      >
                        {k.v}
                      </span>
                      {k.sub && (
                        <span
                          className="text-[0.75vw] text-gray-500"
                          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                        >
                          {k.sub}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Cashflow sparkline */}
              <div
                className="rounded-md px-[0.7vw] py-[0.5vw]"
                style={{ backgroundColor: "rgba(0,0,0,0.025)" }}
              >
                <div className="flex items-baseline justify-between mb-[0.3vw]">
                  <span
                    className="text-[0.8vw] uppercase tracking-wider text-gray-500"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    Monthly cashflow · 12 months
                  </span>
                  <span
                    className="text-[0.85vw] tabular-nums"
                    style={{ color: POSITIVE, fontFamily: "var(--font-mono, monospace)" }}
                  >
                    + $8.5k YoY
                  </span>
                </div>
                <div className="flex items-end gap-[0.18vw]" style={{ height: "2.2vw" }}>
                  {REPORT_BARS.map((v, i) => {
                    const h = (v / Math.max(...REPORT_BARS)) * 100;
                    return (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 1.2 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 rounded-t-sm"
                        style={{ backgroundColor: ACCENT, minHeight: "2px" }}
                      />
                    );
                  })}
                </div>
                <div
                  className="flex justify-between text-[0.7vw] text-gray-400 mt-[0.2vw]"
                  style={{ fontFamily: "var(--font-mono, monospace)" }}
                >
                  <span>Jul &rsquo;25</span>
                  <span>Jun &rsquo;26</span>
                </div>
              </div>
            </motion.div>

            {/* ── Section 2: Per-country breakdown ──────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.75 }}
            >
              <div
                className="text-[0.8vw] uppercase tracking-[0.2em] text-gray-400 mb-[0.3vw]"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                02 · Per-country breakdown
              </div>
              <div className="rounded-md border border-gray-200 overflow-hidden">
                {[
                  { flag: "🇦🇪", country: "UAE",    n: "2 props", value: "$820k", yld: "6.8%", tone: POSITIVE },
                  { flag: "🇬🇧", country: "UK",     n: "1 prop",  value: "$740k", yld: "4.1%", tone: WARNING  },
                  { flag: "🇬🇷", country: "Greece", n: "1 prop",  value: "$620k", yld: "5.8%", tone: POSITIVE },
                ].map((r, i) => (
                  <motion.div
                    key={r.country}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.9 + i * 0.08 }}
                    className="grid items-center gap-[0.5vw] px-[0.7vw] py-[0.4vw] text-[1vw] tabular-nums border-b border-gray-100 last:border-0"
                    style={{ gridTemplateColumns: "0.5fr 1.5fr 1fr 1fr 1fr", fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    <span className="text-[1.4vw]">{r.flag}</span>
                    <span className="text-gray-900" style={{ fontWeight: 600 }}>{r.country}</span>
                    <span className="text-gray-500">{r.n}</span>
                    <span className="text-gray-900 text-right">{r.value}</span>
                    <span className="text-right" style={{ color: r.tone, fontWeight: 600 }}>{r.yld}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Section 3: Top performers ─────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              <div
                className="text-[0.8vw] uppercase tracking-[0.2em] text-gray-400 mb-[0.3vw]"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                03 · Top performers
              </div>
              <div className="flex items-center gap-[0.5vw]">
                <div
                  className="flex-1 rounded-md px-[0.7vw] py-[0.45vw] flex items-center gap-[0.5vw]"
                  style={{ backgroundColor: `${POSITIVE}10`, border: `1px solid ${POSITIVE}33` }}
                >
                  <span
                    className="text-[0.8vw] uppercase tracking-wider"
                    style={{ color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
                  >
                    Top
                  </span>
                  <span className="text-[1.05vw] text-gray-900" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                    JVC Studio
                  </span>
                  <span className="text-gray-300 text-[1vw]">·</span>
                  <span
                    className="text-[1.1vw] tabular-nums ml-auto"
                    style={{ color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
                  >
                    7.1%
                  </span>
                </div>
                <div
                  className="flex-1 rounded-md px-[0.7vw] py-[0.45vw] flex items-center gap-[0.5vw]"
                  style={{ backgroundColor: `${WARNING}10`, border: `1px solid ${WARNING}33` }}
                >
                  <span
                    className="text-[0.8vw] uppercase tracking-wider"
                    style={{ color: WARNING, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
                  >
                    Watch
                  </span>
                  <span className="text-[1.05vw] text-gray-900" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                    London Flat
                  </span>
                  <span className="text-gray-300 text-[1vw]">·</span>
                  <span
                    className="text-[1.1vw] tabular-nums ml-auto"
                    style={{ color: WARNING, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 700 }}
                  >
                    4.1%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Footer disclaimer ─────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.55 }}
              className="text-[0.75vw] text-gray-400 text-center pt-[0.4vw] border-t"
              style={{ borderTopColor: "rgba(0,0,0,0.06)", fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Decision support based on portfolio data. AssetCentral does not provide investment advice.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Scene 39: Closing ───────────────────────────────────────────────────────
// Tutorial close (Scene 39). Previously a 5-line strap card —
// "Real data. / Better decisions. / Higher yield." + underline + CTA
// + URL line — which used the same visual template as
// SceneTutorialWelcome (Scene 30) and made the closing read as a
// repeat of the opening. The "Real data / Better decisions / Higher
// yield" line is still spoken in audio; we just don't render it
// again on screen here (the sibling /demo/60 "What is AssetCentral?"
// video already carries that strap visually at its own close).
//
// New treatment recaps the eight-step journey the viewer has just
// taken — eight check-circles ticking complete left-to-right with a
// drawing accent connector — then resolves to the CTA + offer.
function SceneTutorialClose() {
  const steps = [
    "Add",
    "Upload",
    "Structure",
    "Numbers",
    "Tool",
    "Compare",
    "Rank",
    "Report",
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[6%]">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[1.05vw] uppercase tracking-[0.3em] text-white/45 mb-[2.2vw]"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Eight steps. One workflow.
      </motion.div>

      {/* Eight check-circles connected by an accent rail */}
      <div className="relative flex items-start justify-center gap-[1.4vw] mb-[3vw]">
        {/* Connector rail behind the circles — draws left → right as
            the checks tick in. Positioned to sit through the centre
            of the circle row. */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[1.5vw] left-[2vw] right-[2vw] h-[2px]"
          style={{ backgroundColor: ACCENT + "55", transformOrigin: "left" }}
        />
        {steps.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.18, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            <div
              className="w-[3vw] h-[3vw] rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: ACCENT }}
            >
              <svg viewBox="0 0 20 20" className="w-[1.6vw] h-[1.6vw]" fill="none" stroke="white" strokeWidth="3">
                <path d="M5 10 L9 14 L15 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              className="text-[0.95vw] text-white/55 mt-[0.6vw] tracking-wide"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[3.5vw] text-white leading-tight tracking-tight"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Add your first property.
      </motion.div>

      {/* URL + offer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.4 }}
        className="mt-[1.4vw] text-[1.85vw] text-white"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        AssetCentral.ai
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.9 }}
        className="mt-[0.5vw] text-[1.2vw] text-white/55"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Free for up to 3 properties · No card required
      </motion.div>
    </div>
  );
}
