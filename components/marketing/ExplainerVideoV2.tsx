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

// 67-second beginner tutorial — "How to Use AssetCentral in 60 Seconds".
// Step-labeled walkthrough: welcome → add property → upload/manual →
// AI structures → dashboard → tools → scenarios → AI insights → export
// → closing. Designed to play silent in the browser (the page passes the
// `silent` prop) so the user can layer their own VO + music externally.
//
// Timing tuned for comfortable reading: each scene gets 6–8s so a first-
// time viewer has time to read the step label + see the action without
// feeling rushed.
export const SHOTS_GET_STARTED: Shot[] = [
  // Timings aligned to the Kristen VO at /public/demo-vo-get-started.mp3.
  // Each scene starts ~500ms BEFORE Kristen says its matching sentence —
  // so the visual is on-screen before the voice talks about it, rather
  // than the voice rushing ahead of the visual.
  //
  // Sentence start estimates (audio internal time):
  //   Welcome     0:00.5   Step 5     0:39.0
  //   Step 1      0:06.0   Step 6     0:47.5
  //   Step 2      0:13.0   Step 7     0:56.0
  //   Step 3      0:23.0   Step 8     1:04.0
  //   Step 4      0:31.0   Closing    1:11.0   (→ end at 1:21.0)
  //
  // Scene boundaries = (next sentence start) − 0.5s. Closing scene
  // absorbs the ~4s tail of silence at the end of the audio file.
  { id: 30, duration:  5500 }, // Welcome      (0.0 → 5.5)
  { id: 31, duration:  7000 }, // Step 1       (5.5 → 12.5)
  { id: 32, duration: 10000 }, // Step 2       (12.5 → 22.5)
  { id: 33, duration:  8000 }, // Step 3       (22.5 → 30.5)
  { id: 34, duration:  8000 }, // Step 4       (30.5 → 38.5)
  { id: 35, duration:  8500 }, // Step 5       (38.5 → 47.0)
  { id: 36, duration:  8500 }, // Step 6       (47.0 → 55.5)
  { id: 37, duration:  8000 }, // Step 7       (55.5 → 63.5)
  { id: 38, duration:  7000 }, // Step 8       (63.5 → 70.5)
  { id: 39, duration: 10500 }, // Closing      (70.5 → 81.0)
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
        Your AI real estate return platform.
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
  const OVERVIEW: MenuItem[] = [
    { key: "dashboard", label: "Dashboard",  icon: "dashboard" },
    { key: "properties", label: "Properties", icon: "properties", badge: "0", active: true },
    { key: "cashflow",  label: "Cashflow",   icon: "cashflow" },
    { key: "documents", label: "Documents",  icon: "documents" },
    { key: "reports",   label: "Reports",    icon: "reports" },
    { key: "alerts",    label: "Alerts",     icon: "alerts" },
  ];
  const TOOLS: MenuItem[] = [
    { key: "irr",      label: "IRR Calculator", icon: "irr" },
    { key: "rent",     label: "Rent Review",    icon: "rent" },
    { key: "holdsell", label: "Hold / Sell",    icon: "holdsell" },
    { key: "refi",     label: "Refinance",      icon: "refi" },
    { key: "market",   label: "Market data",    icon: "market" },
  ];
  const ACCOUNT: MenuItem[] = [
    { key: "settings", label: "Settings", icon: "settings" },
    { key: "team",     label: "Team",     icon: "team" },
  ];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={1} label="Add your property" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[3vw] text-white leading-tight mb-[1.5vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Start by adding one property.
      </motion.div>

      {/* Product chrome */}
      <div className="flex-1 rounded-xl bg-white shadow-2xl overflow-hidden flex">
        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <div className="w-[18%] border-r border-gray-200 bg-gray-50 flex flex-col">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="px-[1vw] py-[1vw] border-b border-gray-200 flex items-center gap-[0.5vw]"
          >
            <div
              className="w-[1.6vw] h-[1.6vw] rounded-md flex items-center justify-center text-white text-[1.45vw] font-semibold"
              style={{ backgroundColor: "#0a0e27", fontFamily: "var(--font-sans, sans-serif)" }}
            >
              AC
            </div>
            <div style={{ fontFamily: "var(--font-display, serif)" }}>
              <div className="text-[1.6vw] text-gray-900 leading-none">
                AssetCentral<span style={{ color: ACCENT }}>.ai</span>
              </div>
            </div>
          </motion.div>

          {/* User card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="px-[1vw] py-[0.7vw] border-b border-gray-200 flex items-center gap-[0.5vw]"
          >
            <div
              className="w-[1.4vw] h-[1.4vw] rounded-full inline-flex items-center justify-center text-white text-[1.25vw] font-semibold"
              style={{ backgroundColor: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              JH
            </div>
            <div className="min-w-0">
              <div className="text-[1.35vw] text-gray-900 truncate" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                James Harvey
              </div>
              <div className="text-[1.2vw] text-gray-500" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                Pro plan
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="flex-1 pt-[0.7vw] overflow-hidden">
            <SidebarSection heading="Overview" items={OVERVIEW} delay={0.5} />
            <SidebarSection heading="Tools"    items={TOOLS}    delay={0.95} />
            <SidebarSection heading="Account"  items={ACCOUNT}  delay={1.35} />
          </div>
        </div>

        {/* ── Main panel ──────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="px-[1.5vw] py-[0.8vw] border-b border-gray-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-[0.5vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              <span className="text-[1.4vw] text-gray-400">Dashboard</span>
              <span className="text-[1.4vw] text-gray-300">/</span>
              <span className="text-[1.5vw] text-gray-900 font-semibold">Properties</span>
            </div>
            <div className="flex items-center gap-[0.6vw]">
              {/* Search pill */}
              <div
                className="flex items-center gap-[0.4vw] px-[0.6vw] py-[0.3vw] rounded-md bg-gray-100 text-gray-400"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                <span className="text-[1.45vw]">⌕</span>
                <span className="text-[1.3vw]">Search properties</span>
              </div>
              {/* Bell */}
              <div className="w-[1.2vw] h-[1.2vw] inline-flex items-center justify-center text-gray-500 relative">
                <span className="text-[1.55vw]">⌃</span>
                <span
                  className="absolute -top-[0.1vw] -right-[0.1vw] w-[0.4vw] h-[0.4vw] rounded-full"
                  style={{ backgroundColor: NEGATIVE }}
                />
              </div>
              {/* Avatar */}
              <div
                className="w-[1.4vw] h-[1.4vw] rounded-full inline-flex items-center justify-center text-white text-[1.25vw] font-semibold"
                style={{ backgroundColor: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
              >
                JH
              </div>
            </div>
          </motion.div>

          {/* Page body */}
          <div className="flex-1 p-[1.5vw] flex flex-col">
            {/* Page title */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-[1vw]"
            >
              <div
                className="text-[2.25vw] text-gray-900 leading-tight"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                Welcome, James.
              </div>
              <div
                className="text-[1.5vw] text-gray-500 mt-[0.2vw]"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                Let&rsquo;s set up your first property.
              </div>
            </motion.div>

            {/* KPI strip — zeroed-out so it's clearly pre-data */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="grid grid-cols-3 gap-[0.8vw] mb-[1.2vw]"
            >
              {[
                { label: "Properties",      value: "0",   sub: "Add to begin" },
                { label: "Annual rent",     value: "—",   sub: "Pending data" },
                { label: "Portfolio yield", value: "—",   sub: "Pending data" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-lg border border-gray-200 px-[1vw] py-[0.7vw] bg-gray-50/50"
                >
                  <div
                    className="text-[1.25vw] uppercase tracking-wider text-gray-400"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {k.label}
                  </div>
                  <div
                    className="text-[2.25vw] text-gray-900 leading-none mt-[0.2vw] tabular-nums"
                    style={{ fontFamily: "var(--font-display, serif)" }}
                  >
                    {k.value}
                  </div>
                  <div
                    className="text-[1.25vw] text-gray-500 mt-[0.3vw]"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {k.sub}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Add-property CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center relative"
              style={{ borderColor: `${ACCENT}55`, backgroundColor: `${ACCENT}06` }}
            >
              {/* House icon */}
              <div
                className="w-[2.8vw] h-[2.8vw] rounded-full inline-flex items-center justify-center mb-[0.8vw]"
                style={{ backgroundColor: `${ACCENT}18` }}
              >
                <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
                  <path d="M3 21 L3 10 L12 3 L21 10 L21 21 Z" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 21 L9 14 L15 14 L15 21" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div
                className="text-[2.05vw] text-gray-900 mb-[0.3vw]"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                Add your first property
              </div>
              <div
                className="text-[1.5vw] text-gray-500 mb-[1vw] max-w-[60%] text-center"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                Address, purchase price, rent, financing, ownership — start with what you have.
              </div>
              {/* Big button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="rounded-lg px-[1.8vw] py-[0.8vw] text-[1.65vw] font-semibold inline-flex items-center gap-[0.5vw] shadow-lg relative"
                style={{ backgroundColor: ACCENT, color: "white", fontFamily: "var(--font-sans, sans-serif)" }}
              >
                <span className="text-[1.95vw] leading-none">+</span>
                Add property
                <motion.span
                  animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.8, delay: 1.8, repeat: Infinity }}
                  className="absolute inset-0 rounded-lg"
                  style={{ border: `0.18vw solid ${ACCENT}` }}
                />
              </motion.div>

              {/* Hint chips for the 4 channels */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="mt-[1.2vw] flex items-center gap-[0.5vw] flex-wrap justify-center"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {[
                  "Upload a file",
                  "Forward an email",
                  "Send via WhatsApp",
                  "Enter manually",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-[1.3vw] text-gray-600 px-[0.6vw] py-[0.25vw] rounded-full bg-white border border-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>

              {/* Cursor click */}
              <Cursor x="52%" y="74%" delay={2.3} />
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
  const CARDS = [
    {
      title: "Upload a file",
      desc: "Rent roll, lease, mortgage statement, Excel or PDF.",
      meta: ".pdf · .xlsx · .csv · .docx",
      iconPath: "M12 16 L12 4 M6 10 L12 4 L18 10 M4 16 L4 20 L20 20 L20 16",
      iconColor: ACCENT,
      iconBg: `${ACCENT}15`,
      delay: 0.4,
    },
    {
      title: "Enter manually",
      desc: "Step-by-step form. No spreadsheets required.",
      meta: "About 2 minutes",
      iconPath: "M4 6 L20 6 M4 12 L20 12 M4 18 L14 18",
      iconColor: ACCENT,
      iconBg: `${ACCENT}15`,
      delay: 0.55,
    },
    {
      title: "Forward an email",
      desc: "Each property gets its own inbox — statements file themselves.",
      meta: "marina@in.assetcentral.ai",
      iconPath: "M3 6 L21 6 L21 18 L3 18 Z M3 6 L12 13 L21 6",
      iconColor: ACCENT,
      iconBg: `${ACCENT}15`,
      delay: 0.7,
      mono: true,
    },
    {
      title: "Send via WhatsApp",
      desc: "Snap a photo of an invoice or receipt on your phone — AI files it.",
      meta: "Photos · voice notes · PDFs",
      // WhatsApp speech-bubble glyph
      iconPath: "M5 19 L7 15 A8 8 0 1 1 9 17 Z",
      iconColor: "#16a34a",
      iconBg: "rgba(22,163,74,0.12)",
      delay: 0.85,
    },
  ];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={2} label="Add your data" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[3vw] text-white leading-tight mb-[1.5vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Four ways to add data. Use whichever you already use.
      </motion.div>
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-[1.2vw]">
        {CARDS.map((c) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: c.delay, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl bg-white shadow-2xl p-[1.5vw] flex items-center gap-[1.2vw]"
          >
            <div
              className="shrink-0 w-[4vw] h-[4vw] rounded-full flex items-center justify-center"
              style={{ backgroundColor: c.iconBg }}
            >
              <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none">
                <path
                  d={c.iconPath}
                  stroke={c.iconColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[2.15vw] text-gray-900 mb-[0.3vw] leading-tight"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                {c.title}
              </div>
              <div
                className="text-[1.6vw] text-gray-500 leading-snug"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {c.desc}
              </div>
              <div
                className="mt-[0.6vw] text-[1.45vw] text-gray-400"
                style={{
                  fontFamily: c.mono
                    ? "var(--font-mono, monospace)"
                    : "var(--font-sans, sans-serif)",
                }}
              >
                {c.meta}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Scene 33: Step 3 — AI structures the data ───────────────────────────────
function SceneStep3AIStructures() {
  // Each input file carries source + size + date + a parsing-progress
  // value (1 = complete). Progress bars draw to 100% as the scan line
  // sweeps, making the page feel actively processing rather than static.
  const INPUTS = [
    { name: "tenancy-contract.pdf",   src: "Gmail",     srcColour: "#ea4335", size: "412 KB", date: "12 May", fields: 5, delay: 0.45 },
    { name: "rent-roll-Q2.xlsx",      src: "Email",     srcColour: "#4f6ef7", size: "38 KB",  date: "08 May", fields: 3, delay: 0.65 },
    { name: "mortgage-statement.pdf", src: "Drive",     srcColour: "#34a853", size: "1.2 MB", date: "30 Apr", fields: 4, delay: 0.85 },
    { name: "ac-invoice-photo.jpg",   src: "WhatsApp",  srcColour: "#25d366", size: "2.4 MB", date: "22 Apr", fields: 2, delay: 1.05 },
    { name: "operator-report.pdf",    src: "Upload",    srcColour: "#9ca3af", size: "856 KB", date: "15 Apr", fields: 6, delay: 1.25 },
    { name: "service-charge-q1.pdf",  src: "Email",     srcColour: "#4f6ef7", size: "224 KB", date: "12 Apr", fields: 2, delay: 1.45 },
  ];

  // Structured fields grouped by category. Each group carries its own
  // completeness % so the viewer sees the AI has covered every section.
  const GROUPS = [
    {
      heading: "Property",
      delay: 2.2,
      completeness: 100,
      fields: [
        { label: "Address",        value: "12 Marina Mansions, Dubai", conf: 100 },
        { label: "Purchase price", value: "AED 1,950,000",             conf: 98  },
        { label: "Acquisition",    value: "14 Mar 2024",               conf: 100 },
      ],
    },
    {
      heading: "Tenancy",
      delay: 2.8,
      completeness: 98,
      fields: [
        { label: "Annual rent",    value: "AED 142,000",       conf: 99, accent: true },
        { label: "Tenant",         value: "S. Reynolds",       conf: 96 },
        { label: "Lease ends",     value: "31 May 2027",       conf: 100 },
      ],
    },
    {
      heading: "Financing & costs",
      delay: 3.4,
      completeness: 95,
      fields: [
        { label: "Mortgage",       value: "AED 1,365,000 · 4.2%", conf: 97 },
        { label: "Service charge", value: "AED 18,400 / yr",      conf: 94 },
      ],
    },
  ];

  const totalFields = INPUTS.reduce((acc, f) => acc + f.fields, 0);

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={3} label="AI structures your data" />
      {/* Headline + processing-stats banner */}
      <div className="flex items-end justify-between gap-[1.5vw] mb-[1.2vw] flex-wrap">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[3vw] text-white leading-tight max-w-[55%]"
          style={{ fontFamily: "var(--font-display, serif)" }}
        >
          Scattered information becomes a clear investment view.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-[1.2vw]"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          {[
            { v: `${INPUTS.length}`, l: "Files in" },
            { v: `${totalFields}`,   l: "Fields out" },
            { v: "1.4s",             l: "Process time" },
            { v: "97%",              l: "Avg confidence" },
          ].map((s, i) => (
            <div
              key={s.l}
              className="text-right"
              style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none", paddingLeft: i > 0 ? "1.2vw" : "0" }}
            >
              <div
                className="text-[2.05vw] tabular-nums leading-none"
                style={{ color: i === 3 ? POSITIVE : "white", fontFamily: "var(--font-display, serif)" }}
              >
                {s.v}
              </div>
              <div className="text-[1.25vw] uppercase tracking-wider text-white/45 mt-[0.2vw]">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex-1 grid grid-cols-[1.05fr_auto_1.15fr] gap-[1.2vw] items-stretch min-h-0">
        {/* ── Left — inbox of raw inputs ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-[1.1vw] flex flex-col"
        >
          <div className="flex items-center justify-between mb-[0.7vw]">
            <div className="text-[1.4vw] uppercase tracking-wider text-white/45" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              Your inputs
            </div>
            <div
              className="inline-flex items-center gap-[0.3vw] text-[1.25vw] px-[0.5vw] py-[0.1vw] rounded-full"
              style={{ backgroundColor: `${ACCENT}1f`, color: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="inline-block w-[0.35vw] h-[0.35vw] rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              Parsing
            </div>
          </div>
          <div className="space-y-[0.5vw]">
            {INPUTS.map((f) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: f.delay }}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-[0.65vw]"
              >
                <div className="flex items-center gap-[0.7vw]">
                  {/* Document thumbnail */}
                  <div
                    className="shrink-0 w-[1.9vw] h-[2.3vw] rounded-sm relative flex flex-col gap-[0.15vw] p-[0.25vw]"
                    style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                  >
                    <div className="h-[0.18vw] rounded-sm w-[80%]" style={{ backgroundColor: "rgba(0,0,0,0.25)" }} />
                    <div className="h-[0.18vw] rounded-sm w-[60%]" style={{ backgroundColor: "rgba(0,0,0,0.18)" }} />
                    <div className="h-[0.18vw] rounded-sm w-[90%]" style={{ backgroundColor: "rgba(0,0,0,0.18)" }} />
                    <div className="h-[0.18vw] rounded-sm w-[50%] mt-auto" style={{ backgroundColor: "rgba(0,0,0,0.18)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-[0.4vw]">
                      <div className="text-[1.45vw] text-white truncate" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                        {f.name}
                      </div>
                      <span
                        className="shrink-0 text-[0.85vw] tabular-nums px-[0.4vw] py-[0.08vw] rounded-full"
                        style={{ backgroundColor: `${POSITIVE}25`, color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        +{f.fields}
                      </span>
                    </div>
                    <div className="flex items-center gap-[0.4vw] mt-[0.15vw]">
                      <span
                        className="text-[1.2vw] uppercase tracking-wider px-[0.4vw] py-[0.08vw] rounded-full"
                        style={{ backgroundColor: f.srcColour + "33", color: f.srcColour, fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        {f.src}
                      </span>
                      <span className="text-[1.2vw] text-white/45" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                        {f.size}
                      </span>
                      <span className="text-[1.2vw] text-white/30">·</span>
                      <span className="text-[1.2vw] text-white/45" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                        {f.date}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Parsing progress bar — animates from 0 → 100% */}
                <div
                  className="mt-[0.45vw] h-[0.25vw] rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.9, delay: f.delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: POSITIVE }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Centre — AI processing pillar ─────────────────────────── */}
        <div className="flex flex-col items-center justify-center gap-[0.6vw]">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            className="px-[1vw] py-[0.45vw] rounded-full text-[1.5vw] font-semibold shadow-lg"
            style={{ backgroundColor: ACCENT, color: "white", fontFamily: "var(--font-sans, sans-serif)" }}
          >
            AI
          </motion.div>
          {/* Animated downward scan line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="relative w-[2px] h-[8vw] rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(79,110,247,0.18)" }}
          >
            <motion.div
              className="absolute left-0 right-0 h-[20%] rounded-full"
              style={{ background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)` }}
              animate={{ top: ["-20%", "100%"] }}
              transition={{ duration: 1.4, delay: 2.0, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.9 }}
            width="32" height="32" viewBox="0 0 24 24" fill="none"
          >
            <path d="M12 4 L12 20 M6 14 L12 20 L18 14" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.0 }}
            className="text-[1.25vw] uppercase tracking-wider text-white/45 text-center max-w-[6vw]"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            Reads · classifies · links
          </motion.div>
        </div>

        {/* ── Right — structured property record ────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-[1.1vw] flex flex-col"
        >
          <div className="flex items-center justify-between mb-[0.6vw]">
            <div className="text-[1.4vw] uppercase tracking-wider text-white/45" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              Structured property
            </div>
            <div
              className="inline-flex items-center gap-[0.3vw] text-[1.25vw] px-[0.5vw] py-[0.15vw] rounded-full"
              style={{ backgroundColor: `${POSITIVE}25`, color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              <svg width="1.25vw" height="1.25vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12 L10 17 L19 8" />
              </svg>
              Ready
            </div>
          </div>
          <div className="space-y-[0.7vw]">
            {GROUPS.map((g) => (
              <motion.div
                key={g.heading}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: g.delay }}
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Group header strip */}
                <div
                  className="flex items-center justify-between px-[0.7vw] py-[0.4vw]"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-center gap-[0.5vw]">
                    <span
                      className="text-[1.25vw] uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans, sans-serif)" }}
                    >
                      {g.heading}
                    </span>
                    <span
                      className="text-[0.85vw] tabular-nums"
                      style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono, monospace)" }}
                    >
                      {g.fields.length} fields
                    </span>
                  </div>
                  <div className="flex items-center gap-[0.5vw]">
                    <div
                      className="w-[3vw] h-[0.35vw] rounded-full overflow-hidden"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${g.completeness}%` }}
                        transition={{ duration: 1.0, delay: g.delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: POSITIVE }}
                      />
                    </div>
                    <span
                      className="text-[0.85vw] tabular-nums"
                      style={{ color: POSITIVE, fontFamily: "var(--font-mono, monospace)" }}
                    >
                      {g.completeness}%
                    </span>
                  </div>
                </div>
                {/* Fields */}
                <div>
                  {g.fields.map((r, fi) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between px-[0.7vw] py-[0.35vw]"
                      style={{
                        borderTop: fi > 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        backgroundColor: r.accent ? `${ACCENT}0d` : "transparent",
                      }}
                    >
                      <span
                        className="text-[1.45vw] text-white/55"
                        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        {r.label}
                      </span>
                      <div className="flex items-center gap-[0.5vw]">
                        <span
                          className="text-[0.85vw] tabular-nums px-[0.35vw] py-[0.05vw] rounded-full"
                          style={{
                            backgroundColor: r.conf === 100 ? `${POSITIVE}25` : "rgba(255,255,255,0.08)",
                            color: r.conf === 100 ? POSITIVE : "rgba(255,255,255,0.55)",
                            fontFamily: "var(--font-mono, monospace)",
                          }}
                        >
                          {r.conf}%
                        </span>
                        <span
                          className="text-[1.55vw] tabular-nums"
                          style={{
                            fontFamily: "var(--font-sans, sans-serif)",
                            color: r.accent ? ACCENT : "rgba(255,255,255,0.92)",
                            fontWeight: r.accent ? 600 : 400,
                          }}
                        >
                          {r.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Scene 34: Step 4 — See the key numbers ──────────────────────────────────
// Each KPI card now carries: icon, label, hero number, comparison delta,
// trend sparkline / status indicator, and a context line ("vs target"
// or "YoY +0.4 pp"). Reads as a real product dashboard tile.
function SceneStep4Dashboard() {
  // Each KPI now carries a full "tile worth of content":
  //   • Period pill (top-right) — gives temporal context
  //   • Icon + label header
  //   • Big hero number
  //   • Unit + sub-line
  //   • Comparison delta with directional icon
  //   • Sub-metrics breakdown (e.g. Gross / Costs / Net) — reads like a real dashboard
  //   • Sparkline / ring / status visual
  //   • Footer status line ("Healthy · last updated 2h ago")
  const KPIS = [
    {
      label: "Annual rent",
      value: "AED 142k",
      unit: "/ year · gross",
      delay: 0.6,
      accent: "#0a0e27",
      period: "12 months",
      compare: "+ AED 8k YoY",
      compareTone: POSITIVE,
      icon: "rent",
      // 12-month rent trend — gentle climb to current
      trend: [128, 130, 132, 135, 138, 138, 140, 140, 142, 142, 142, 142],
      target: 145,
      subMetrics: [
        { label: "Monthly",    value: "AED 11,833" },
        { label: "Per sqft",   value: "AED 142" },
      ],
      status: { text: "On track", tone: POSITIVE },
    },
    {
      label: "Net yield",
      value: "5.8%",
      unit: "after every cost",
      delay: 0.85,
      accent: POSITIVE,
      period: "12 months",
      compare: "vs target 6.0%",
      compareTone: WARNING,
      icon: "yield",
      trend: [5.2, 5.3, 5.4, 5.5, 5.5, 5.6, 5.7, 5.7, 5.7, 5.8, 5.8, 5.8],
      target: 6.0,
      subMetrics: [
        { label: "Gross",      value: "7.3%" },
        { label: "Costs drag", value: "−1.5 pp" },
      ],
      status: { text: "Below target", tone: WARNING },
    },
    {
      label: "Annual cashflow",
      value: "AED 28.4k",
      unit: "post-debt service",
      delay: 1.1,
      accent: POSITIVE,
      period: "12 months",
      compare: "+ AED 3.1k YoY",
      compareTone: POSITIVE,
      icon: "cashflow",
      trend: [2.0, 2.1, 2.3, 2.4, 2.3, 2.4, 2.5, 2.3, 2.4, 2.5, 2.4, 2.7],
      target: 30,
      subMetrics: [
        { label: "Income",     value: "AED 142k" },
        { label: "Debt + ops", value: "AED 113.6k" },
      ],
      status: { text: "Healthy", tone: POSITIVE },
    },
    {
      label: "Occupancy",
      value: "100%",
      unit: "Tenanted · S. Reynolds",
      delay: 1.35,
      accent: POSITIVE,
      period: "12 months",
      compare: "0 voids in last 24 mo",
      compareTone: POSITIVE,
      icon: "occupancy",
      ring: 100,
      subMetrics: [
        { label: "Lease ends",   value: "31 May 2027" },
        { label: "Renewal",      value: "in 14 months" },
      ],
      status: { text: "Stable", tone: POSITIVE },
    },
    {
      label: "5yr IRR",
      value: "12.4%",
      unit: "modelled · base case",
      delay: 1.6,
      accent: POSITIVE,
      period: "5 years",
      compare: "+1.6 pp vs peer median",
      compareTone: POSITIVE,
      icon: "irr",
      trend: [9.8, 10.2, 10.7, 11.0, 11.3, 11.5, 11.8, 12.0, 12.1, 12.2, 12.3, 12.4],
      target: 12,
      subMetrics: [
        { label: "Cap appr.",    value: "+2.8%/yr" },
        { label: "Leveraged",    value: "65% LTV" },
      ],
      status: { text: "Above peers", tone: POSITIVE },
    },
    {
      label: "Risk flags",
      value: "1",
      unit: "Action required",
      delay: 1.85,
      accent: WARNING,
      period: "Live",
      compare: "Mortgage rate reset",
      compareTone: WARNING,
      icon: "alert",
      subMetrics: [
        { label: "Severity",  value: "Medium" },
        { label: "Due",       value: "in 90 days" },
      ],
      status: { text: "Review needed", tone: WARNING },
    },
  ];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={4} label="See the key numbers" />
      <div className="flex items-baseline justify-between mb-[1.5vw]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[3vw] text-white leading-tight"
          style={{ fontFamily: "var(--font-display, serif)" }}
        >
          Your property dashboard.
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-[0.5vw] text-[1.35vw] text-white/55"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="inline-block w-[0.4vw] h-[0.4vw] rounded-full"
            style={{ backgroundColor: POSITIVE }}
          />
          Live · updated just now
        </motion.div>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-[1.1vw]">
        {KPIS.map((k) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: k.delay }}
            className="rounded-xl bg-white shadow-lg p-[1.1vw] flex flex-col relative overflow-hidden"
          >
            {/* Left accent stripe */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[0.25vw]"
              style={{ backgroundColor: k.accent }}
            />
            {/* Header row: icon + label, period pill */}
            <div className="flex items-start justify-between mb-[0.5vw] pl-[0.5vw]">
              <div className="flex items-center gap-[0.5vw]">
                <KpiIcon kind={k.icon} colour={k.accent} />
                <div
                  className="text-[1.35vw] uppercase tracking-wider text-gray-500"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {k.label}
                </div>
              </div>
              <div
                className="text-[0.85vw] uppercase tracking-wider px-[0.45vw] py-[0.15vw] rounded-full"
                style={{
                  backgroundColor: "rgba(0,0,0,0.05)",
                  color: "rgba(0,0,0,0.5)",
                  fontFamily: "var(--font-sans, sans-serif)",
                }}
              >
                {k.period}
              </div>
            </div>
            {/* Big number + delta */}
            <div className="pl-[0.5vw] flex items-baseline gap-[0.7vw]">
              <span
                className="text-[2.6vw] tabular-nums leading-none"
                style={{ fontFamily: "var(--font-display, serif)", color: k.accent }}
              >
                {k.value}
              </span>
              <span
                className="inline-flex items-center gap-[0.25vw] text-[1.3vw] tabular-nums"
                style={{ color: k.compareTone, fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {k.compareTone === POSITIVE && (
                  <svg width="1.25vw" height="1.25vw" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 4 L20 14 L14 14 L14 20 L10 20 L10 14 L4 14 Z" />
                  </svg>
                )}
                {k.compareTone === WARNING && (
                  <svg width="1.3vw" height="1.3vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 3 L22 21 L2 21 Z" />
                    <path d="M12 10 L12 15" />
                  </svg>
                )}
                {k.compare}
              </span>
            </div>
            <div
              className="text-[1.3vw] text-gray-500 mt-[0.3vw] pl-[0.5vw]"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {k.unit}
            </div>

            {/* Sub-metrics breakdown */}
            <div className="mt-[0.9vw] pl-[0.5vw] grid grid-cols-2 gap-[0.5vw]">
              {k.subMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-md px-[0.5vw] py-[0.4vw]"
                  style={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                >
                  <div
                    className="text-[0.78vw] uppercase tracking-wider"
                    style={{ color: "rgba(0,0,0,0.45)", fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {m.label}
                  </div>
                  <div
                    className="text-[1.35vw] tabular-nums mt-[0.05vw]"
                    style={{ color: "rgba(0,0,0,0.85)", fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Trend / ring / pill visual — grows to fill remaining card height */}
            <div className="mt-[0.8vw] pl-[0.5vw] flex-1 flex flex-col justify-center">
              {k.trend && (
                <KpiSparkline
                  series={k.trend}
                  colour={k.accent}
                  delay={k.delay + 0.3}
                  target={k.target}
                />
              )}
              {k.ring !== undefined && (
                <KpiRing pct={k.ring} colour={k.accent} delay={k.delay + 0.3} />
              )}
              {!k.trend && k.ring === undefined && (
                <div className="space-y-[0.6vw]">
                  {/* Risk severity bar */}
                  <div>
                    <div className="flex items-baseline justify-between mb-[0.2vw]">
                      <span
                        className="text-[0.78vw] uppercase tracking-wider text-gray-500"
                        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        Severity (3-tier)
                      </span>
                      <span
                        className="text-[0.85vw] tabular-nums"
                        style={{ color: k.accent, fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        Medium
                      </span>
                    </div>
                    <div className="flex gap-[0.3vw]">
                      {["Low", "Medium", "High"].map((t, i) => (
                        <motion.div
                          key={t}
                          initial={{ opacity: 0, scaleX: 0.8 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.4, delay: k.delay + 0.5 + i * 0.1 }}
                          className="flex-1 h-[0.6vw] rounded-full"
                          style={{
                            backgroundColor: i === 1 ? k.accent : "rgba(0,0,0,0.08)",
                            transformOrigin: "left",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Countdown bar */}
                  <div>
                    <div className="flex items-baseline justify-between mb-[0.2vw]">
                      <span
                        className="text-[0.78vw] uppercase tracking-wider text-gray-500"
                        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        Time to act
                      </span>
                      <span
                        className="text-[0.85vw] tabular-nums"
                        style={{ color: k.accent, fontFamily: "var(--font-sans, sans-serif)" }}
                      >
                        90 days
                      </span>
                    </div>
                    <div
                      className="h-[0.6vw] rounded-full overflow-hidden"
                      style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1.0, delay: k.delay + 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: k.accent }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer status */}
            <div
              className="mt-auto pt-[0.7vw] pl-[0.5vw] flex items-center justify-between border-t"
              style={{ borderTopColor: "rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-[0.35vw]">
                <span
                  className="inline-block w-[0.35vw] h-[0.35vw] rounded-full"
                  style={{ backgroundColor: k.status.tone }}
                />
                <span
                  className="text-[0.85vw] uppercase tracking-wider"
                  style={{ color: k.status.tone, fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {k.status.text}
                </span>
              </div>
              <span
                className="text-[0.78vw]"
                style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-sans, sans-serif)" }}
              >
                Just now
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Sparkline used inside dashboard KPI cards.
//
// Reveal animation uses an animated clipPath rectangle (width 0 → 100)
// instead of stroke pathLength. pathLength is unreliable with
// vectorEffect="non-scaling-stroke" because the browser computes the
// path's total length BEFORE applying the stroke scaling, which produces
// a mismatched dasharray — visually that's "broken / incomplete" lines.
// clipPath is rock-solid because it operates in viewBox-space directly.
//
// Renders (all inside the clipped group except dot + target line):
//   • Filled area under the curve
//   • Line on top
// Outside the clip:
//   • Dashed target line (no animation gate on this)
//   • End-point dot + soft ring
function KpiSparkline({
  series,
  colour,
  delay,
  target,
}: {
  series: number[];
  colour: string;
  delay: number;
  target?: number;
}) {
  const clipId = useId();
  // Include target in min/max so the dashed line always sits inside the chart.
  const min = Math.min(...series, target ?? series[0]);
  const max = Math.max(...series, target ?? series[0]);
  const range = max - min || 1;
  // ViewBox: 100 wide × 40 tall (taller than before so the line has more
  // vertical room to breathe inside the bigger chart frame).
  const pts = series.map((v, i) => ({
    x: (i / (series.length - 1)) * 100,
    y: 40 - ((v - min) / range) * 32 - 4,
  }));
  const linePath = `M ${pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L ")}`;
  const fillPath = `${linePath} L 100,40 L 0,40 Z`;
  const targetY = target !== undefined ? 40 - ((target - min) / range) * 32 - 4 : null;
  const endPt = pts[pts.length - 1];
  // Format a value for the min/max labels — % values keep one decimal,
  // anything else uses no decimals so axis labels stay compact.
  const fmt = (v: number) => (v < 100 ? v.toFixed(1) : Math.round(v).toLocaleString());

  return (
    <div className="w-full flex flex-col">
      {/* Axis label row — Y-axis max (top right) */}
      <div className="flex items-baseline justify-between mb-[0.2vw]">
        <span
          className="text-[0.75vw] uppercase tracking-wider text-gray-400"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          12-month trend
        </span>
        <span
          className="text-[0.78vw] tabular-nums"
          style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono, monospace)" }}
        >
          {fmt(max)}
        </span>
      </div>

      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: "5.5vw", minHeight: "60px", overflow: "visible" }}
        aria-hidden
      >
        <defs>
          <clipPath id={`spark-${clipId}`}>
            <motion.rect
              x="0"
              y="-4"
              height="48"
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
            />
          </clipPath>
          {/* Subtle vertical fade so the fill area transitions nicely to bg */}
          <linearGradient id={`sparkfill-${clipId}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={colour} stopOpacity="0.22" />
            <stop offset="100%" stopColor={colour} stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines for visual context */}
        <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="38" x2="100" y2="38" stroke="rgba(0,0,0,0.06)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />

        {/* Clipped group — fill + line both revealed left-to-right */}
        <g clipPath={`url(#spark-${clipId})`}>
          <path d={fillPath} fill={`url(#sparkfill-${clipId})`} stroke="none" />
          <path
            d={linePath}
            fill="none"
            stroke={colour}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Data-point dots along the line — fills out the chart visually */}
          {pts.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="1.4"
              fill={colour}
              fillOpacity="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.4 + i * 0.04 }}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* Target line — dashed horizontal at the target value (not clipped) */}
        {targetY !== null && (
          <motion.line
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.7 }}
            x1="0"
            y1={targetY}
            x2="100"
            y2={targetY}
            stroke="rgba(0,0,0,0.32)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* End-point dot — pops in after the reveal completes */}
        <motion.circle
          cx={endPt.x}
          cy={endPt.y}
          r="3"
          fill={colour}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 1.15, ease: [0.16, 1, 0.3, 1] }}
          vectorEffect="non-scaling-stroke"
        />
        <motion.circle
          cx={endPt.x}
          cy={endPt.y}
          r="5"
          fill="none"
          stroke={colour}
          strokeWidth="1.4"
          strokeOpacity="0.4"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 1.25 }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* X-axis label row — month markers */}
      <div className="flex items-baseline justify-between mt-[0.2vw]">
        <span
          className="text-[0.78vw] tabular-nums"
          style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono, monospace)" }}
        >
          Jun
        </span>
        <span
          className="text-[0.78vw] tabular-nums"
          style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono, monospace)" }}
        >
          {fmt(min)}
        </span>
        <span
          className="text-[0.78vw] tabular-nums"
          style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono, monospace)" }}
        >
          May
        </span>
      </div>
    </div>
  );
}

// Circular progress ring — used for occupancy, target progress etc.
function KpiRing({ pct, colour, delay }: { pct: number; colour: string; delay: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);
  return (
    <div className="flex items-center gap-[1vw]">
      {/* Big ring with the % in the centre */}
      <div className="relative shrink-0" style={{ width: "5vw", height: "5vw", minWidth: "56px", minHeight: "56px" }}>
        <svg width="100%" height="100%" viewBox="0 0 72 72" aria-hidden className="absolute inset-0">
          <circle cx="36" cy="36" r={radius} stroke="rgba(0,0,0,0.07)" strokeWidth="6" fill="none" />
          <motion.circle
            cx="36" cy="36" r={radius}
            stroke={colour}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
            transform="rotate(-90 36 36)"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center text-[1.45vw] tabular-nums"
          style={{ color: colour, fontFamily: "var(--font-display, serif)" }}
        >
          {pct}%
        </div>
      </div>
      {/* Detail column to the right of the ring */}
      <div className="flex-1">
        <div
          className="text-[0.78vw] uppercase tracking-wider text-gray-500"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          Lease tracking
        </div>
        <div
          className="text-[1.2vw] mt-[0.15vw]"
          style={{ color: colour, fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600 }}
        >
          On time
        </div>
        <div
          className="text-[0.85vw] text-gray-500 mt-[0.2vw]"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          No voids in last 24 mo
        </div>
      </div>
    </div>
  );
}

// Inline icon set for KPI cards.
function KpiIcon({ kind, colour }: { kind: string; colour: string }) {
  const props = {
    width: "1.1vw",
    height: "1.1vw",
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: colour,
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "rent":
      return (<svg {...props}><path d="M4 10 L4 21 L20 21 L20 10" /><path d="M2 10 L12 3 L22 10" /><path d="M10 21 L10 14 L14 14 L14 21" /></svg>);
    case "yield":
      return (<svg {...props}><circle cx="12" cy="12" r="9" /><path d="M9 13 L11 15 L15 9" /></svg>);
    case "cashflow":
      return (<svg {...props}><path d="M4 17 L9 12 L13 16 L20 8" /><path d="M14 8 L20 8 L20 14" /></svg>);
    case "occupancy":
      return (<svg {...props}><circle cx="12" cy="8" r="3" /><path d="M5 21 C5 17 8 15 12 15 C16 15 19 17 19 21" /></svg>);
    case "irr":
      return (<svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 14 L7 17 M12 9 L12 17 M17 11 L17 17" /></svg>);
    case "alert":
      return (<svg {...props}><path d="M12 3 L22 21 L2 21 Z" /><path d="M12 10 L12 15" /><circle cx="12" cy="18" r="0.4" fill={colour} stroke="none" /></svg>);
    default:
      return null;
  }
}

// ── Scene 35: Step 5 — Choose the right tool ────────────────────────────────
// Each tool card carries: colour-coded icon, name, description, a "what
// this answers" sample question, and a mini preview of what the tool
// actually outputs (bar chart, big number, scenarios, comparison ring etc).
// Reads as a real product tools menu, not a flat list of strings.
function SceneStep5Tools() {
  const TOOLS = [
    {
      name: "IRR Calculator",
      desc: "Project long-term returns",
      question: "What will my 5-year return be?",
      icon: "irr",
      colour: ACCENT,
      preview: "irr",
      delay: 0.55,
    },
    {
      name: "Rent Review",
      desc: "Test rent uplifts on cashflow",
      question: "Should I raise the rent at renewal?",
      icon: "rent",
      colour: POSITIVE,
      preview: "rent",
      delay: 0.75,
    },
    {
      name: "Hold / Sell",
      desc: "Model exit vs continued hold",
      question: "Should I sell now, or hold 5 more years?",
      icon: "holdsell",
      colour: ACCENT,
      preview: "holdsell",
      delay: 0.95,
    },
    {
      name: "Refinance",
      desc: "Compare rates and lenders",
      question: "What if I refinance at a lower rate?",
      icon: "refi",
      colour: POSITIVE,
      preview: "refi",
      delay: 1.15,
    },
    {
      name: "STR vs Long-let",
      desc: "Short-term vs annual let",
      question: "Will Airbnb beat my long-term tenant?",
      icon: "str",
      colour: WARNING,
      preview: "str",
      delay: 1.35,
    },
    {
      name: "Portfolio Dashboard",
      desc: "Roll-up across all properties",
      question: "How is my whole portfolio performing?",
      icon: "portfolio",
      colour: ACCENT,
      preview: "portfolio",
      delay: 1.55,
    },
  ];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={5} label="Choose the right tool" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[3vw] text-white leading-tight mb-[1.5vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Pick a tool for the question you need to answer.
      </motion.div>
      <div className="flex-1 grid grid-cols-3 gap-[1vw]">
        {TOOLS.map((t) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: t.delay }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-[1vw] flex flex-col relative overflow-hidden"
          >
            {/* Header row — icon tile + name */}
            <div className="flex items-start gap-[0.7vw] mb-[0.5vw]">
              <div
                className="shrink-0 w-[2.4vw] h-[2.4vw] rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${t.colour}22` }}
              >
                <ToolIcon kind={t.icon} colour={t.colour} />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[1.8vw] text-white leading-tight"
                  style={{ fontFamily: "var(--font-display, serif)" }}
                >
                  {t.name}
                </div>
                <div
                  className="text-[1.35vw] text-white/55 leading-snug mt-[0.15vw]"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {t.desc}
                </div>
              </div>
            </div>
            {/* Sample question */}
            <div
              className="rounded-md px-[0.7vw] py-[0.45vw] mb-[0.6vw] italic"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <span
                className="text-[1.4vw] text-white/65"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                &ldquo;{t.question}&rdquo;
              </span>
            </div>
            {/* Mini preview of the tool's output — flex-1 so it grows to fill
                the remaining card height (rather than sitting flush to the
                bottom with empty space above it) */}
            <div className="flex-1 flex flex-col justify-end pt-[0.4vw]">
              <ToolPreview kind={t.preview} colour={t.colour} delay={t.delay + 0.3} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Each tool gets a bespoke mini-visualisation: number, bars, scenarios,
// ring etc. Kept tight (about 3vw tall) so cards stay scannable.
function ToolPreview({ kind, colour, delay }: { kind: string; colour: string; delay: number }) {
  switch (kind) {
    case "irr":
      // Filled-area bar chart showing IRR build-up year by year.
      // 5 vertical bars (Y1-Y5) with the hero number on the right.
      // Bars give substantial vertical presence and the value at the
      // top of each bar lets the viewer read the curve at a glance.
      return (
        <div className="space-y-[0.5vw]">
          <div className="flex items-baseline justify-between">
            <div
              className="text-[1.25vw] uppercase tracking-wider text-white/40"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              5-year IRR build-up
            </div>
            <div
              className="text-[2.4vw] tabular-nums leading-none"
              style={{ color: colour, fontFamily: "var(--font-display, serif)" }}
            >
              12.4%
            </div>
          </div>
          {/* Bar chart with value labels on top */}
          <div className="flex items-end justify-between gap-[0.5vw]" style={{ height: "4.5vw" }}>
            {[
              { v: 8.0,  label: "Y1" },
              { v: 9.5,  label: "Y2" },
              { v: 10.7, label: "Y3" },
              { v: 11.6, label: "Y4" },
              { v: 12.4, label: "Y5", peak: true },
            ].map((b, i) => {
              const h = (b.v / 14) * 100;
              return (
                <div key={b.label} className="flex-1 flex flex-col items-center gap-[0.2vw]">
                  <span
                    className="text-[1vw] tabular-nums"
                    style={{ color: b.peak ? colour : "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono, monospace)" }}
                  >
                    {b.v.toFixed(1)}%
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.7, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-t-md"
                    style={{ backgroundColor: b.peak ? colour : `${colour}77`, minHeight: "8px" }}
                  />
                  <span
                    className="text-[1vw] uppercase tracking-wider text-white/40"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {b.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    case "rent":
      // Vertical column-pair: Current vs Uplifted. Thicker bars,
      // bigger value labels above each column, supporting delta + new
      // rent per month detail row. Fills the card much better than
      // the previous horizontal bars.
      return (
        <div className="space-y-[0.5vw]">
          <div className="flex items-end justify-around gap-[0.8vw]" style={{ height: "4.5vw" }}>
            {[
              { label: "Current", v: 65, value: "142k", accent: false },
              { label: "Uplifted", v: 100, value: "156k", accent: true },
            ].map((c, i) => (
              <div key={c.label} className="flex-1 flex flex-col items-center gap-[0.2vw]">
                <span
                  className="text-[1.2vw] tabular-nums"
                  style={{ color: c.accent ? colour : "rgba(255,255,255,0.65)", fontFamily: "var(--font-display, serif)" }}
                >
                  AED {c.value}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${c.v}%` }}
                  transition={{ duration: 0.8, delay: delay + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-t-md"
                  style={{ backgroundColor: c.accent ? colour : "rgba(255,255,255,0.25)", minHeight: "8px" }}
                />
                <span
                  className="text-[1vw] uppercase tracking-wider text-white/45"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.5 }}
            className="flex items-center justify-between rounded-md px-[0.6vw] py-[0.3vw]"
            style={{ backgroundColor: `${POSITIVE}1a`, border: `1px solid ${POSITIVE}40` }}
          >
            <span
              className="text-[1.1vw] uppercase tracking-wider"
              style={{ color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Uplift impact
            </span>
            <span
              className="text-[1.25vw] tabular-nums"
              style={{ color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              + AED 14k / yr
            </span>
          </motion.div>
        </div>
      );
    case "holdsell":
      // Hold vs sell — vertical bar pair showing projected value, with
      // verdict pill + delta gap. Same visual language as the other
      // tools so the card layouts feel consistent.
      return (
        <div className="space-y-[0.5vw]">
          <div className="flex items-end justify-around gap-[0.8vw]" style={{ height: "4.5vw" }}>
            {[
              { label: "Sell now", v: 60, value: "2.10M", accent: false },
              { label: "Hold · Y5", v: 100, value: "2.42M", accent: true },
            ].map((c, i) => (
              <div key={c.label} className="flex-1 flex flex-col items-center gap-[0.2vw]">
                <span
                  className="text-[1.2vw] tabular-nums"
                  style={{ color: c.accent ? colour : "rgba(255,255,255,0.65)", fontFamily: "var(--font-display, serif)" }}
                >
                  AED {c.value}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${c.v}%` }}
                  transition={{ duration: 0.8, delay: delay + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-t-md"
                  style={{ backgroundColor: c.accent ? colour : "rgba(255,255,255,0.25)", minHeight: "8px" }}
                />
                <span
                  className="text-[1vw] uppercase tracking-wider text-white/45"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.5 }}
            className="flex items-center justify-between rounded-md px-[0.6vw] py-[0.3vw]"
            style={{ backgroundColor: `${POSITIVE}1a`, border: `1px solid ${POSITIVE}40` }}
          >
            <span
              className="text-[1.1vw] uppercase tracking-wider"
              style={{ color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Verdict
            </span>
            <span
              className="text-[1.25vw] tabular-nums"
              style={{ color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Hold · + AED 320k
            </span>
          </motion.div>
        </div>
      );
    case "refi":
      // Rate comparison as vertical bars (same visual language as the
      // other tools) + savings chip below. The shorter "New" bar makes
      // the lower rate obvious at a glance.
      return (
        <div className="space-y-[0.5vw]">
          <div className="flex items-end justify-around gap-[0.8vw]" style={{ height: "4.5vw" }}>
            {[
              { label: "Current", rate: "4.2%", v: 100, accent: false },
              { label: "New",     rate: "3.6%", v: 78,  accent: true },
            ].map((r, i) => (
              <div key={r.label} className="flex-1 flex flex-col items-center gap-[0.2vw]">
                <span
                  className="text-[1.2vw] tabular-nums"
                  style={{ color: r.accent ? colour : "rgba(255,255,255,0.65)", fontFamily: "var(--font-display, serif)" }}
                >
                  {r.rate}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${r.v}%` }}
                  transition={{ duration: 0.9, delay: delay + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-t-md"
                  style={{ backgroundColor: r.accent ? colour : "rgba(255,255,255,0.25)", minHeight: "8px" }}
                />
                <span
                  className="text-[1vw] uppercase tracking-wider text-white/45"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {r.label}
                </span>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.55 }}
            className="flex items-center justify-between rounded-md px-[0.6vw] py-[0.3vw]"
            style={{ backgroundColor: `${POSITIVE}1a`, border: `1px solid ${POSITIVE}40` }}
          >
            <span
              className="text-[1.1vw] uppercase tracking-wider"
              style={{ color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              Savings
            </span>
            <span
              className="text-[1.25vw] tabular-nums"
              style={{ color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              − AED 8.2k / yr
            </span>
          </motion.div>
        </div>
      );
    case "str":
      // Seasonal STR bars with a dashed long-let baseline overlaid.
      // Bars now taller (5vw) with peak/trough month labels at top so
      // the seasonal story reads from a glance.
      return (
        <div className="space-y-[0.45vw]">
          <div className="flex items-baseline justify-between">
            <span
              className="text-[1.2vw] uppercase tracking-wider text-white/45"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              STR monthly · vs long-let
            </span>
            <span
              className="text-[1.3vw] tabular-nums"
              style={{ color: colour, fontFamily: "var(--font-sans, sans-serif)" }}
            >
              + AED 24.4k / yr
            </span>
          </div>
          <div className="relative flex items-end gap-[0.18vw]" style={{ height: "4.8vw" }}>
            {/* Long-let baseline — dashed horizontal at ~55% height */}
            <div
              className="absolute left-0 right-0 z-10 pointer-events-none"
              style={{
                bottom: "55%",
                borderTop: "1.5px dashed rgba(255,255,255,0.35)",
              }}
            />
            <div
              className="absolute right-0 z-20 text-[0.95vw]"
              style={{
                bottom: "calc(55% + 0.2vw)",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              long-let
            </div>
            {[80, 72, 60, 45, 35, 30, 40, 50, 60, 70, 85, 95].map((h, i) => {
              const aboveBaseline = h >= 55;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 rounded-t-sm"
                  style={{
                    backgroundColor: aboveBaseline ? colour : `${colour}55`,
                    minHeight: "3px",
                  }}
                />
              );
            })}
          </div>
          <div
            className="flex items-baseline justify-between text-[1vw] text-white/35"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>
        </div>
      );
    case "portfolio":
      // Roll-up across N properties. Replaced the previous flat-dot
      // strip with per-property vertical yield bars — each bar's
      // height reflects the property's relative yield, colour-coded
      // for healthy vs flagged. A dashed portfolio-average line sits
      // at 5.8% so the user sees instantly which properties are
      // pulling the average up vs down. More informative at the same
      // footprint.
      return (
        <div className="space-y-[0.35vw]">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[1.2vw] uppercase tracking-wider text-white/40" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>Portfolio yield</div>
              <div className="text-[2.15vw] tabular-nums leading-none mt-[0.1vw]" style={{ color: colour, fontFamily: "var(--font-display, serif)" }}>5.8%</div>
            </div>
            <div className="text-right">
              <div className="text-[1.2vw] uppercase tracking-wider text-white/40" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>Equity</div>
              <div className="text-[1.55vw] tabular-nums mt-[0.1vw]" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans, sans-serif)" }}>AED 4.2m</div>
            </div>
          </div>
          {/* Per-property yield bars — taller now with the yield % above
              each bar. Dashed line marks the portfolio average so the
              flagged underperformers (amber) are obvious. */}
          <div className="space-y-[0.3vw]">
            <div className="relative flex items-end gap-[0.25vw]" style={{ height: "4vw" }}>
              {/* Portfolio avg dashed line at ~65% */}
              <div
                className="absolute left-0 right-0 z-10 pointer-events-none"
                style={{ bottom: "65%", borderTop: "1.5px dashed rgba(255,255,255,0.35)" }}
              />
              <div
                className="absolute right-0 z-20 text-[0.9vw]"
                style={{
                  bottom: "calc(65% + 0.2vw)",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                avg 5.8%
              </div>
              {[
                { h: 85, yield: "7.2%", flagged: false },
                { h: 78, yield: "6.6%", flagged: false },
                { h: 72, yield: "6.1%", flagged: false },
                { h: 30, yield: "2.4%", flagged: true },
                { h: 80, yield: "6.8%", flagged: false },
                { h: 76, yield: "6.4%", flagged: false },
                { h: 35, yield: "2.8%", flagged: true },
                { h: 82, yield: "7.0%", flagged: false },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${p.h}%`, opacity: 1 }}
                  transition={{ duration: 0.5, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 rounded-t-sm"
                  style={{ backgroundColor: p.flagged ? WARNING : POSITIVE, minHeight: "3px" }}
                />
              ))}
            </div>
            <div className="flex items-baseline justify-between text-[1vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>P1 → P8 by yield</span>
              <span style={{ color: WARNING }}>2 flagged</span>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function ToolIcon({ kind, colour }: { kind: string; colour: string }) {
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
    case "irr":
      return (<svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 14 L7 17 M12 9 L12 17 M17 11 L17 17" /></svg>);
    case "rent":
      return (<svg {...props}><path d="M4 10 L4 21 L20 21 L20 10" /><path d="M2 10 L12 3 L22 10" /></svg>);
    case "holdsell":
      return (<svg {...props}><circle cx="12" cy="12" r="9" /><path d="M9 13 L11 15 L15 9" /></svg>);
    case "refi":
      return (<svg {...props}><path d="M4 8 L20 8 M16 4 L20 8 L16 12" /><path d="M20 16 L4 16 M8 12 L4 16 L8 20" /></svg>);
    case "str":
      return (<svg {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12 L21 12" /><path d="M12 3 A12 12 0 0 1 12 21 A12 12 0 0 1 12 3" /></svg>);
    case "portfolio":
      return (<svg {...props}><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>);
    default:
      return null;
  }
}

// ── Scene 36: Step 6 — Compare scenarios ────────────────────────────────────
// Each card is a rich, lived-in scenario card:
//   • Top accent stripe (grey for base, green for positive scenarios)
//   • Hero "Net yield" number with up/down arrow + delta pill
//   • Horizontal comparison bars (yield / cashflow / IRR) showing magnitude
//     relative to the strongest scenario in the set
//   • Inputs section with icons + highlighted changed values
//   • Mini 12-month cashflow sparkline at the bottom, animated draw-in
interface ScenarioInput { label: string; value: string; highlight?: boolean }
interface ScenarioOutput {
  label: string;
  value: string;
  delta: string | null;
  /** Numeric portion used for the comparison bar magnitude. */
  numeric: number;
}
interface Scenario {
  name: string;
  sub: string;
  tone: "neutral" | "positive";
  delay: number;
  inputs: ScenarioInput[];
  outputs: ScenarioOutput[];
  /** 12 deterministic values for the cashflow sparkline (in AED/month). */
  cashflowSeries: number[];
}
function SceneStep6Scenarios() {
  const SCENARIOS: Scenario[] = [
    {
      name: "Base case",
      sub: "Today's rent · no changes",
      tone: "neutral",
      delay: 0.5,
      inputs: [
        { label: "Annual rent",     value: "AED 142,000" },
        { label: "Occupancy",       value: "12 months" },
        { label: "Service charge",  value: "AED 18,400" },
      ],
      outputs: [
        { label: "Net yield",       value: "5.8%",       delta: null, numeric: 5.8 },
        { label: "Annual cashflow", value: "AED 28,400", delta: null, numeric: 28400 },
        { label: "5yr IRR",         value: "12.4%",      delta: null, numeric: 12.4 },
      ],
      // Flat-ish monthly cashflow with seasonal dips (lease anniversary, voids)
      cashflowSeries: [2300, 2350, 2400, 2450, 2300, 2200, 2350, 2400, 2450, 2380, 2300, 2520],
    },
    {
      name: "Improved rent",
      sub: "Uplift to market at next renewal",
      tone: "positive",
      delay: 1.0,
      inputs: [
        { label: "Annual rent",     value: "AED 156,000", highlight: true },
        { label: "Occupancy",       value: "12 months" },
        { label: "Service charge",  value: "AED 18,400" },
      ],
      outputs: [
        { label: "Net yield",       value: "6.6%",       delta: "+0.8 pp",       numeric: 6.6 },
        { label: "Annual cashflow", value: "AED 40,200", delta: "+ AED 11.8k",   numeric: 40200 },
        { label: "5yr IRR",         value: "13.9%",      delta: "+1.5 pp",       numeric: 13.9 },
      ],
      // Step up at month 4 (renewal date), then steady at higher level
      cashflowSeries: [2300, 2350, 2400, 3350, 3400, 3380, 3420, 3450, 3400, 3470, 3500, 3580],
    },
    {
      name: "Switch to STR",
      sub: "Short-term let · operator-managed",
      tone: "positive",
      delay: 1.5,
      inputs: [
        { label: "Annual rent",     value: "AED 198,000", highlight: true },
        { label: "Occupancy",       value: "78%",         highlight: true },
        { label: "Operator fee",    value: "20%" },
      ],
      outputs: [
        { label: "Net yield",       value: "7.4%",       delta: "+1.6 pp",       numeric: 7.4 },
        { label: "Annual cashflow", value: "AED 52,800", delta: "+ AED 24.4k",   numeric: 52800 },
        { label: "5yr IRR",         value: "15.1%",      delta: "+2.7 pp",       numeric: 15.1 },
      ],
      // STR seasonality: high in winter (Q1, Q4), dip in summer
      cashflowSeries: [5800, 5500, 4900, 3800, 3200, 2800, 3100, 3500, 4200, 5100, 5900, 6400],
    },
  ];

  // Max values across the set — used to size the comparison bars relative
  // to the strongest scenario. Adds a small headroom (×1.05) so the leader
  // doesn't fully fill its bar (looks pinned/awkward at 100%).
  const maxYield     = Math.max(...SCENARIOS.map((s) => s.outputs[0].numeric)) * 1.05;
  const maxCashflow  = Math.max(...SCENARIOS.map((s) => s.outputs[1].numeric)) * 1.05;
  const maxIrr       = Math.max(...SCENARIOS.map((s) => s.outputs[2].numeric)) * 1.05;
  const maxes        = [maxYield, maxCashflow, maxIrr];

  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={6} label="Compare scenarios" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[3vw] text-white leading-tight mb-[1.5vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Same property. Three test cases. Compared in one view.
      </motion.div>
      <div className="flex-1 grid grid-cols-3 gap-[1.2vw]">
        {SCENARIOS.map((s, i) => {
          const isPositive = s.tone === "positive";
          const accentTone = isPositive ? POSITIVE : "rgba(255,255,255,0.35)";
          const yieldOut = s.outputs[0];
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: s.delay }}
              className="relative rounded-xl flex flex-col overflow-hidden"
              style={{
                background: isPositive
                  ? `linear-gradient(180deg, ${POSITIVE}14 0%, rgba(255,255,255,0.025) 60%)`
                  : "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 60%)",
                border: isPositive ? `1px solid ${POSITIVE}40` : "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Top accent stripe — 6px high band along the top edge */}
              <div
                className="h-[0.4vw] w-full"
                style={{ backgroundColor: accentTone }}
              />

              <div className="p-[1.2vw] flex-1 flex flex-col">
                {/* ── Header ─────────────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-[0.4vw]">
                  <div className="flex items-center gap-[0.4vw]">
                    <span
                      className="inline-flex items-center justify-center w-[1.4vw] h-[1.4vw] rounded-full text-[1.3vw] font-semibold"
                      style={{
                        backgroundColor: isPositive ? POSITIVE : "rgba(255,255,255,0.12)",
                        color: "white",
                        fontFamily: "var(--font-sans, sans-serif)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-[1.3vw] uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        color: isPositive ? POSITIVE : "rgba(255,255,255,0.5)",
                      }}
                    >
                      Scenario {i + 1}
                    </span>
                  </div>
                  {isPositive && (
                    <div
                      className="inline-flex items-center gap-[0.25vw] text-[1.25vw] uppercase tracking-wider px-[0.5vw] py-[0.15vw] rounded-full"
                      style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        backgroundColor: POSITIVE,
                        color: "white",
                      }}
                    >
                      <svg width="1.25vw" height="1.25vw" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 4 L20 14 L14 14 L14 20 L10 20 L10 14 L4 14 Z" />
                      </svg>
                      vs base
                    </div>
                  )}
                </div>
                <div
                  className="text-[2.15vw] text-white leading-tight"
                  style={{ fontFamily: "var(--font-display, serif)" }}
                >
                  {s.name}
                </div>
                <div
                  className="text-[1.45vw] text-white/55 mb-[1vw]"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {s.sub}
                </div>

                {/* ── Hero number: Net yield ───────────────────────────── */}
                <div
                  className="rounded-lg p-[0.9vw] mb-[1vw]"
                  style={{
                    backgroundColor: isPositive ? `${POSITIVE}1a` : "rgba(255,255,255,0.05)",
                    border: isPositive ? `1px solid ${POSITIVE}33` : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="text-[1.25vw] uppercase tracking-wider text-white/45 mb-[0.15vw]"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    Net yield
                  </div>
                  <div className="flex items-baseline gap-[0.6vw]">
                    <span
                      className="text-[3.7vw] tabular-nums leading-none"
                      style={{
                        fontFamily: "var(--font-display, serif)",
                        color: isPositive ? POSITIVE : "white",
                      }}
                    >
                      {yieldOut.value}
                    </span>
                    {yieldOut.delta && (
                      <span
                        className="inline-flex items-center gap-[0.2vw] text-[1.45vw] tabular-nums"
                        style={{
                          fontFamily: "var(--font-sans, sans-serif)",
                          color: POSITIVE,
                        }}
                      >
                        <svg width="1.3vw" height="1.3vw" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12 4 L20 14 L14 14 L14 20 L10 20 L10 14 L4 14 Z" />
                        </svg>
                        {yieldOut.delta}
                      </span>
                    )}
                  </div>
                </div>

                {/* ── Comparison bars ──────────────────────────────────── */}
                <div className="mb-[1vw] space-y-[0.5vw]">
                  {s.outputs.map((o, oi) => {
                    const pct = Math.max(6, Math.min(100, (o.numeric / maxes[oi]) * 100));
                    return (
                      <div key={o.label}>
                        <div className="flex items-baseline justify-between mb-[0.15vw]">
                          <span
                            className="text-[1.25vw] uppercase tracking-wider text-white/50"
                            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                          >
                            {oi === 0 ? "Yield" : oi === 1 ? "Cashflow" : "5yr IRR"}
                          </span>
                          <span
                            className="text-[1.45vw] tabular-nums"
                            style={{
                              fontFamily: "var(--font-sans, sans-serif)",
                              color: "white",
                            }}
                          >
                            {o.value}
                          </span>
                        </div>
                        <div
                          className="h-[0.5vw] rounded-full overflow-hidden"
                          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.9, delay: s.delay + 0.5 + oi * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: accentTone }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── Inputs strip ─────────────────────────────────────── */}
                <div
                  className="rounded-lg p-[0.7vw] mb-[0.7vw]"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="text-[1.2vw] uppercase tracking-wider text-white/40 mb-[0.3vw]"
                    style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    Inputs
                  </div>
                  <div className="space-y-[0.15vw]">
                    {s.inputs.map((r) => (
                      <div key={r.label} className="flex items-center justify-between">
                        <span
                          className="inline-flex items-center gap-[0.35vw] text-[1.35vw] text-white/55"
                          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                        >
                          <span
                            className="inline-block w-[0.35vw] h-[0.35vw] rounded-full"
                            style={{ backgroundColor: r.highlight ? ACCENT : "rgba(255,255,255,0.25)" }}
                          />
                          {r.label}
                        </span>
                        <span
                          className="text-[1.45vw] tabular-nums"
                          style={{
                            fontFamily: "var(--font-sans, sans-serif)",
                            color: r.highlight ? ACCENT : "rgba(255,255,255,0.92)",
                            fontWeight: r.highlight ? 600 : 400,
                          }}
                        >
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Cashflow sparkline (12-month projection) ─────────── */}
                <div className="mt-auto">
                  <div className="flex items-baseline justify-between mb-[0.3vw]">
                    <span
                      className="text-[1.2vw] uppercase tracking-wider text-white/40"
                      style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                    >
                      Cashflow · 12 months
                    </span>
                    <span
                      className="text-[1.25vw] tabular-nums"
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        color: accentTone,
                      }}
                    >
                      avg {Math.round(s.cashflowSeries.reduce((a, b) => a + b, 0) / 12).toLocaleString()}
                    </span>
                  </div>
                  <CashflowSparkline
                    series={s.cashflowSeries}
                    colour={accentTone}
                    delay={s.delay + 0.9}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Animated 12-bar cashflow sparkline. Bars draw upward from the baseline
// with a staggered delay so the eye reads the trend left-to-right.
function CashflowSparkline({
  series,
  colour,
  delay,
}: {
  series: number[];
  colour: string;
  delay: number;
}) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  // Format AED-style amounts: ≥1000 → "1.2k", otherwise → raw
  const fmt = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : Math.round(v).toString();
  return (
    <div className="w-full">
      {/* Top row — max value annotation right-aligned */}
      <div className="flex items-baseline justify-between mb-[0.25vw]">
        <span
          className="text-[0.7vw] uppercase tracking-wider text-white/45"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          Monthly · AED
        </span>
        <span
          className="text-[0.8vw] tabular-nums"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono, monospace)" }}
        >
          {fmt(max)}
        </span>
      </div>
      {/* Bars + dashed mid-line baseline indicator */}
      <div className="relative flex items-end justify-between gap-[0.18vw]" style={{ height: "4vw", minHeight: "44px" }}>
        {/* Mid baseline — visually anchors the bars */}
        <div
          className="absolute left-0 right-0"
          style={{ top: "50%", height: "1px", background: "rgba(255,255,255,0.08)" }}
        />
        {series.map((v, i) => {
          const h = Math.max(10, (v / max) * 100);
          return (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${h}%`, opacity: 1 }}
              transition={{
                duration: 0.55,
                delay: delay + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex-1 rounded-t-sm relative z-10"
              style={{ backgroundColor: colour, minHeight: "3px" }}
            />
          );
        })}
      </div>
      {/* Bottom row — min value + period label */}
      <div className="flex items-baseline justify-between mt-[0.25vw]">
        <span
          className="text-[0.7vw] tabular-nums"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono, monospace)" }}
        >
          {fmt(min)}
        </span>
        <span
          className="text-[0.7vw] uppercase tracking-wider text-white/35"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          Jun &rsquo;25 → May &rsquo;26
        </span>
      </div>
    </div>
  );
}

// ── Scene 37: Step 7 — AI explains what the numbers mean ────────────────────
function SceneStep7AIInsights() {
  const INSIGHTS = [
    {
      heading: "Review the rent level",
      detail: "Current rent sits ~8% below comparable Dubai Marina 2-beds. Consider an uplift at next renewal.",
      delay: 0.6,
    },
    {
      heading: "STR may improve income",
      detail: "Switching to short-term let could lift annual cashflow by ~AED 24,400. Operator due-diligence advised.",
      delay: 1.4,
    },
    {
      heading: "Refinance worth modelling",
      detail: "If new rate is below 3.8%, refinancing improves IRR by ~1.2 percentage points over 5 years.",
      delay: 2.2,
    },
  ];
  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={7} label="AI explains the numbers" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[3vw] text-white leading-tight mb-[2vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Real recommendations, not just data.
      </motion.div>
      <div className="flex-1 flex flex-col gap-[1vw]">
        {INSIGHTS.map((r) => (
          <motion.div
            key={r.heading}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: r.delay }}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-[1.3vw] flex items-start gap-[1vw]"
          >
            <div
              className="shrink-0 w-[2.5vw] h-[2.5vw] rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${ACCENT}25` }}
            >
              <span
                className="text-[1.85vw] font-semibold"
                style={{ color: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
              >
                AI
              </span>
            </div>
            <div>
              <div
                className="text-[2.05vw] text-white mb-[0.3vw]"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                {r.heading}
              </div>
              <div
                className="text-[1.65vw] text-white/60 leading-snug"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {r.detail}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Scene 38: Step 8 — Export / share ───────────────────────────────────────
function SceneStep8Export() {
  // Cashflow mini-chart bars for the in-report visualisation.
  const REPORT_BARS = [2.3, 2.4, 2.5, 2.4, 2.5, 2.6, 2.5, 2.6, 2.5, 2.7, 2.6, 2.8];
  return (
    <div className="absolute inset-0 pt-[5%] pb-[5%] px-[8%] flex flex-col">
      <StepBadge n={8} label="Export a clear report" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[3vw] text-white leading-tight mb-[1.2vw]"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Share with your advisor, lender, or partners.
      </motion.div>
      <div className="flex-1 grid grid-cols-[1.5fr_1fr] gap-[1.5vw] items-stretch min-h-0">
        {/* ── LEFT — Rich, multi-section report preview ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-xl bg-white shadow-2xl flex flex-col overflow-hidden relative"
        >
          {/* Top brand strip — co-branded with agency */}
          <div
            className="px-[1.5vw] py-[0.9vw] flex items-center justify-between"
            style={{ background: `linear-gradient(90deg, ${NAVY} 0%, #14182f 100%)` }}
          >
            <div className="flex items-center gap-[0.8vw]">
              <div
                className="w-[2vw] h-[2vw] rounded-md flex items-center justify-center text-white text-[1.05vw] font-semibold"
                style={{ backgroundColor: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
              >
                AC
              </div>
              <div>
                <div className="text-[1.6vw] text-white leading-none" style={{ fontFamily: "var(--font-display, serif)" }}>
                  Property Report
                </div>
                <div className="text-[1vw] text-white/55 mt-[0.2vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                  AssetCentral · Q2 2026
                </div>
              </div>
            </div>
            <div className="text-right">
              <div
                className="text-[0.95vw] uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans, sans-serif)" }}
              >
                Prepared for
              </div>
              <div className="text-[1.2vw] text-white mt-[0.1vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                S. Reynolds · Owner
              </div>
            </div>
          </div>

          <div className="p-[1.2vw] flex-1 flex flex-col gap-[0.9vw]">
            {/* Property header */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-end justify-between"
            >
              <div>
                <div
                  className="text-[0.95vw] uppercase tracking-wider text-gray-400"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  Subject property
                </div>
                <div
                  className="text-[2vw] text-gray-900 mt-[0.1vw] leading-tight"
                  style={{ fontFamily: "var(--font-display, serif)" }}
                >
                  12 Marina Mansions, Dubai
                </div>
                <div
                  className="text-[1.1vw] text-gray-500 mt-[0.2vw]"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  2-bed · 1,100 sqft · Acquired Mar 2024
                </div>
              </div>
              <div className="text-right">
                <div className="text-[0.95vw] uppercase tracking-wider text-gray-400" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                  Verdict
                </div>
                <div
                  className="inline-flex items-center gap-[0.35vw] text-[1.1vw] uppercase tracking-wider px-[0.5vw] py-[0.2vw] rounded-md mt-[0.2vw]"
                  style={{ backgroundColor: `${POSITIVE}1a`, color: POSITIVE, fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  <span className="inline-block w-[0.4vw] h-[0.4vw] rounded-full" style={{ backgroundColor: POSITIVE }} />
                  Hold &amp; uplift rent
                </div>
              </div>
            </motion.div>

            {/* KPI row */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="grid grid-cols-4 gap-[0.6vw]"
            >
              {[
                { l: "Net yield",    v: "5.8%",          tone: POSITIVE },
                { l: "Cashflow",     v: "AED 28.4k",     sub: "/yr",     tone: POSITIVE },
                { l: "5yr IRR",      v: "12.4%",         tone: POSITIVE },
                { l: "Risk",         v: "1",             sub: "flag",    tone: WARNING },
              ].map((k) => (
                <div
                  key={k.l}
                  className="rounded-md px-[0.7vw] py-[0.55vw]"
                  style={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                >
                  <div className="text-[0.9vw] uppercase tracking-wider text-gray-500" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                    {k.l}
                  </div>
                  <div className="flex items-baseline gap-[0.25vw] mt-[0.1vw]">
                    <span className="text-[1.6vw] tabular-nums leading-none" style={{ fontFamily: "var(--font-display, serif)", color: k.tone }}>
                      {k.v}
                    </span>
                    {k.sub && <span className="text-[0.85vw] text-gray-500" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>{k.sub}</span>}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Cashflow chart section */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="rounded-md px-[0.9vw] py-[0.7vw]"
              style={{ backgroundColor: "rgba(0,0,0,0.025)" }}
            >
              <div className="flex items-baseline justify-between mb-[0.4vw]">
                <span className="text-[1vw] uppercase tracking-wider text-gray-500" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                  Monthly cashflow · 12 months
                </span>
                <span className="text-[0.95vw] tabular-nums" style={{ color: POSITIVE, fontFamily: "var(--font-mono, monospace)" }}>
                  + AED 31.2k YoY
                </span>
              </div>
              <div className="flex items-end gap-[0.18vw]" style={{ height: "3vw" }}>
                {REPORT_BARS.map((v, i) => {
                  const h = (v / Math.max(...REPORT_BARS)) * 100;
                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: 1.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 rounded-t-sm"
                      style={{ backgroundColor: ACCENT, minHeight: "2px" }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[0.85vw] text-gray-400 mt-[0.25vw]" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                <span>Jun &rsquo;25</span>
                <span>May &rsquo;26</span>
              </div>
            </motion.div>

            {/* Recommended actions strip */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="grid grid-cols-3 gap-[0.5vw] mt-auto"
            >
              {[
                { n: 1, t: "Uplift rent at renewal", v: "+ AED 11.8k/yr", tone: POSITIVE },
                { n: 2, t: "Review mortgage rate",   v: "Reset in 90d",    tone: WARNING  },
                { n: 3, t: "Consider STR scenario",  v: "+ AED 24.4k/yr",  tone: POSITIVE },
              ].map((a) => (
                <div key={a.n} className="flex items-start gap-[0.4vw]">
                  <span
                    className="inline-flex items-center justify-center shrink-0 w-[1.3vw] h-[1.3vw] rounded-full text-white text-[0.85vw] font-semibold"
                    style={{ backgroundColor: a.tone, fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {a.n}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[0.95vw] text-gray-900 leading-tight" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                      {a.t}
                    </div>
                    <div className="text-[0.85vw] tabular-nums mt-[0.1vw]" style={{ color: a.tone, fontFamily: "var(--font-sans, sans-serif)" }}>
                      {a.v}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-[0.3vw] pt-[0.5vw] border-t" style={{ borderTopColor: "rgba(0,0,0,0.06)" }}>
              <span className="text-[0.85vw] text-gray-400" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                Generated 27 May 2026 · 14 pages
              </span>
              <span className="text-[0.85vw] text-gray-400" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                AssetCentral.ai
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT — Share + export panel ──────────────────────────── */}
        <div className="flex flex-col gap-[0.9vw] min-h-0">
          {/* Format options */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-[0.9vw]"
          >
            <div className="text-[1vw] uppercase tracking-wider text-white/45 mb-[0.5vw]" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
              Export format
            </div>
            <div className="grid grid-cols-3 gap-[0.4vw]">
              {[
                { l: "PDF",   active: true },
                { l: "Excel", active: false },
                { l: "Link",  active: false },
              ].map((f) => (
                <div
                  key={f.l}
                  className="text-center py-[0.6vw] rounded-md text-[1.05vw]"
                  style={{
                    backgroundColor: f.active ? ACCENT : "rgba(255,255,255,0.05)",
                    color: f.active ? "white" : "rgba(255,255,255,0.65)",
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontWeight: f.active ? 600 : 400,
                    border: f.active ? "none" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {f.l}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recipients */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-[0.9vw] flex-1 min-h-0 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-[0.5vw]">
              <div className="text-[1vw] uppercase tracking-wider text-white/45" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                Share with
              </div>
              <div
                className="text-[0.85vw] px-[0.4vw] py-[0.1vw] rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans, sans-serif)" }}
              >
                3 recipients
              </div>
            </div>
            <div className="space-y-[0.4vw]">
              {[
                { name: "S. Reynolds",   role: "Owner / client",       avatar: "SR", colour: "#4f6ef7" },
                { name: "M. Anand",      role: "Investment advisor",   avatar: "MA", colour: "#16a34a" },
                { name: "Emirates NBD",  role: "Lender (refi review)", avatar: "EN", colour: "#9ca3af" },
              ].map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + i * 0.12 }}
                  className="flex items-center gap-[0.6vw] rounded-md px-[0.5vw] py-[0.45vw]"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="shrink-0 w-[1.7vw] h-[1.7vw] rounded-full inline-flex items-center justify-center text-white text-[0.85vw] font-semibold"
                    style={{ backgroundColor: p.colour, fontFamily: "var(--font-sans, sans-serif)" }}
                  >
                    {p.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[1.1vw] text-white truncate" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                      {p.name}
                    </div>
                    <div className="text-[0.9vw] text-white/45 truncate" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
                      {p.role}
                    </div>
                  </div>
                  <svg width="1vw" height="1vw" viewBox="0 0 24 24" fill="none" stroke={POSITIVE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12 L10 17 L19 8" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Primary CTA + secondary action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="rounded-lg px-[1.2vw] py-[0.9vw] inline-flex items-center justify-center gap-[0.6vw] shadow-lg"
            style={{ backgroundColor: ACCENT, color: "white", fontFamily: "var(--font-sans, sans-serif)" }}
          >
            <svg width="1.3vw" height="1.3vw" viewBox="0 0 24 24" fill="none">
              <path d="M12 4 L12 16 M6 10 L12 16 L18 10 M4 20 L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[1.35vw] font-semibold">Export &amp; send report</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className="text-[0.95vw] text-white/50 text-center"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            Co-branded with your agency · Encrypted link
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Scene 39: Closing ───────────────────────────────────────────────────────
function SceneTutorialClose() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[6%]">
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
        className="h-px mt-[2vw]"
        style={{ backgroundColor: "rgba(255,255,255,0.25)", width: "20%" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="mt-[1.5vw] text-[2.15vw] text-white"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Start with one property today.
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className="mt-[0.6vw] text-[1.75vw] text-white/50"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        AssetCentral.ai · Free to try · No card required
      </motion.div>
    </div>
  );
}
