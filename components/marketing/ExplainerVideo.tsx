"use client";

// 45-second self-running product explainer. 13 scenes, total 45,000ms.
// Mounts on /demo. Designed for screen-recording into a video master.
//
// Architecture:
//   - One step state, advanced by a setTimeout chain that mirrors SHOTS[].duration
//   - AnimatePresence cross-fades scenes by key={step}
//   - Each scene component runs its own internal Framer Motion choreography
//     once mounted; nothing is shared across scenes so they're easy to edit
//     in isolation
//
// Recording instructions are baked into the on-screen control row that hides
// when ?record=1 is set. See bottom of file.

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const NAVY = "#1a1a2e";
const ACCENT = "#4f6ef7";
const POSITIVE = "#16a34a";
const WARNING = "#d97706";
const NEGATIVE = "#dc2626";

// Per-shot duration in ms. Sum must equal 45,000.
const SHOTS = [
  { id: 1,  duration: 3000 }, // Documents cascade
  { id: 2,  duration: 3000 }, // Documents accelerate, multiply
  { id: 3,  duration: 4000 }, // Excel "Net Yield = ?"
  { id: 4,  duration: 4000 }, // "What's your real net yield?"
  { id: 5,  duration: 4000 }, // AssetCentral logo reveal
  { id: 6,  duration: 4000 }, // Inbox auto-tagging
  { id: 7,  duration: 4000 }, // Dashboard hero with property cards
  { id: 8,  duration: 4000 }, // 12-month cashflow line chart
  { id: 9,  duration: 3000 }, // Loan maturity timeline
  { id: 10, duration: 4000 }, // STR operator extraction
  { id: 11, duration: 3000 }, // Sell vs hold comparison
  { id: 12, duration: 3000 }, // Signup screen
  { id: 13, duration: 2000 }, // End card
];

// Subtitle cues for silent-autoplay viewing on LinkedIn / social. Synced to the
// VO timing from the shooting script. Each cue is short enough to read in its
// window (~3 wps reading comfort). Times in ms from video start.
const SUBTITLES: { from: number; to: number; text: string }[] = [
  { from:     0, to:  3500, text: "You own properties." },
  { from:  3500, to:  6000, text: "Statements arrive from every direction." },
  { from:  6000, to:  9500, text: "Rent. Mortgage. Service charges. Short-term rental reports." },
  { from:  9500, to: 14000, text: "Your spreadsheet can't keep up." },
  { from: 14000, to: 18500, text: "AssetCentral is your AI agent team for property yield." },
  { from: 18500, to: 22000, text: "Forward us your documents. We do the rest." },
  { from: 22000, to: 26000, text: "One dashboard. Every property. Every currency." },
  { from: 26000, to: 31000, text: "Real net yield. Cashflow. Debt. Loan maturity." },
  { from: 31000, to: 34500, text: "Is your short-term rental operator earning their fee?" },
  { from: 34500, to: 37000, text: "Is your mortgage about to reset?" },
  { from: 37000, to: 39000, text: "Should you sell, or hold?" },
  { from: 39000, to: 43000, text: "Built for owners of 2 to 50 properties." },
  { from: 43000, to: 45000, text: "Add your first property in 5 minutes." },
];

export function ExplainerVideo() {
  const [step, setStep] = useState(0);
  // playing stays false until the user clicks Play — browsers block
  // autoplay-with-sound, so we need an explicit gesture before the audio
  // element can play. After click, both visuals + audio start in lockstep.
  const [playing, setPlaying] = useState(false);
  const [isRecordMode, setIsRecordMode] = useState(false);
  const [showSubs, setShowSubs] = useState(true);
  const [withSound, setWithSound] = useState(true);
  // Elapsed ms — driven by a 100ms interval. Used to pick the current subtitle
  // and (when no audio) drive the scene timeline. When audio is playing, this
  // tracks audio.currentTime instead so visuals stay locked to the VO.
  const [elapsedMs, setElapsedMs] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsRecordMode(params.has("record"));
      // Subtitles on by default. ?subs=0 or ?nosubs hides them — useful when
      // an editor wants clean footage to layer their own VO + captions over.
      if (params.get("subs") === "0" || params.has("nosubs")) setShowSubs(false);
      // ?sound=0 disables the VO — visuals only. Used when an editor wants
      // to layer their own professional VO recording over the footage.
      if (params.get("sound") === "0" || params.has("nosound")) setWithSound(false);
    }
  }, []);

  // Scene advance timer
  useEffect(() => {
    if (!playing) return;
    if (step >= SHOTS.length) return;
    timerRef.current = setTimeout(() => {
      setStep((s) => s + 1);
    }, SHOTS[step].duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [step, playing]);

  // Elapsed ticker. When audio is the source of truth (withSound=true and
  // playing), we read audio.currentTime so visuals stay locked to the VO.
  // Otherwise we use wall-clock. Either way it ticks every 100ms.
  useEffect(() => {
    if (!playing) return;
    startRef.current = Date.now() - elapsedMs;
    intervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      const t = withSound && audio && !audio.paused
        ? Math.round(audio.currentTime * 1000)
        : Date.now() - startRef.current;
      setElapsedMs(t);
      if (t >= 45000 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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
      audioRef.current.play().catch(() => {
        // Autoplay blocked — visuals will still run, just no sound.
      });
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
    // Re-trigger play on next tick so the audio element has the gesture chain
    setTimeout(() => startPlayback(), 30);
  };

  // Pick the active subtitle for the current elapsed time
  const activeSubtitle = useMemo(
    () => SUBTITLES.find((s) => elapsedMs >= s.from && elapsedMs < s.to),
    [elapsedMs],
  );

  return (
    <div
      style={{ backgroundColor: NAVY }}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
    >
      {/* Voiceover audio. Preloads on page mount so audio is ready by the
          time the user clicks Play. Charlotte (en-GB, ElevenLabs Multilingual v2).
          Audio is 43s; visual timeline is 45s — final 2s holds the end-card
          silent, which reads as a deliberate beat. */}
      {withSound && (
        <audio
          ref={audioRef}
          src="/demo-vo.mp3"
          preload="auto"
          aria-hidden
        />
      )}

      {/* Subtle grain overlay for premium texture */}
      <div
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40"
      />

      {/* 16:9 canvas — sized to fit viewport, max 1920x1080 */}
      <div
        className="relative aspect-video w-full max-w-[1920px] overflow-hidden"
        style={{ maxHeight: "100vh" }}
      >
        <AnimatePresence mode="sync">
          {step < SHOTS.length && (
            <motion.div
              key={SHOTS[step].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Scene id={SHOTS[step].id} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* End state */}
        {step >= SHOTS.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Scene id={13} />
          </motion.div>
        )}

        {/* Subtitle overlay — positioned bottom 10% of canvas, safe zone
            above any LinkedIn / TikTok UI bars. Semi-transparent pill backing
            keeps text legible against any scene background. */}
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
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                  }}
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

      {/* Click-to-start overlay — required by browser autoplay policy for
          audio with sound. Covers the whole canvas before first play. */}
      {!playing && (
        <button
          onClick={startPlayback}
          className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer group"
          style={{ backgroundColor: "rgba(26,26,46,0.92)" }}
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
              className="text-white text-[18px]"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {withSound ? "Play with sound" : "Play"}
            </div>
            <div
              className="text-white/50 text-[12px]"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              45 seconds · {withSound ? "British voiceover" : "silent"}
            </div>
          </div>
        </button>
      )}

      {/* Recording controls — hidden when ?record=1 */}
      {!isRecordMode && playing && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
          <div
            className="rounded-full bg-white/10 px-4 py-2 text-[12px] text-white/80 backdrop-blur-md"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {String(Math.floor(elapsedMs / 1000)).padStart(2, "0")}:
            {String(Math.floor(elapsedMs % 1000)).padStart(3, "0")} / 45.000
          </div>
          <button
            onClick={replay}
            className="rounded-full bg-white/10 px-4 py-2 text-[12px] text-white hover:bg-white/20 backdrop-blur-md"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            ↻ Replay
          </button>
          <a
            href="/demo?record=1"
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

// ---------------------------------------------------------------------------
// Scene router
// ---------------------------------------------------------------------------

function Scene({ id }: { id: number }) {
  switch (id) {
    case 1: return <Scene1 />;
    case 2: return <Scene2 />;
    case 3: return <Scene3 />;
    case 4: return <Scene4 />;
    case 5: return <Scene5 />;
    case 6: return <Scene6 />;
    case 7: return <Scene7 />;
    case 8: return <Scene8 />;
    case 9: return <Scene9 />;
    case 10: return <Scene10 />;
    case 11: return <Scene11 />;
    case 12: return <Scene12 />;
    case 13: return <Scene13 />;
    default: return null;
  }
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

const DOCUMENTS = [
  { title: "Lease Agreement", subtitle: "Dubai Marina Apt 2", color: "#fde68a" },
  { title: "Mortgage Statement", subtitle: "HSBC · UK BTL", color: "#bfdbfe" },
  { title: "Service Charge Invoice", subtitle: "Marina Promenade OA", color: "#fecaca" },
  { title: "Short-term Rental Operator Report", subtitle: "JVC Studio · April", color: "#bbf7d0" },
  { title: "Rent Receipt", subtitle: "Athens Flat · €1,200", color: "#fed7aa" },
  { title: "Insurance Schedule", subtitle: "London Flat · annual", color: "#e9d5ff" },
  { title: "EPC Certificate", subtitle: "Bristol HMO · Rating D", color: "#fde68a" },
  { title: "WhatsApp", subtitle: "Tenant: heater broken", color: "#bbf7d0" },
];

function DocCard({
  title,
  subtitle,
  color,
}: {
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div className="w-[200px] rounded-md bg-white shadow-2xl overflow-hidden">
      <div className="h-2" style={{ backgroundColor: color }} />
      <div className="px-3 py-2.5">
        <div
          className="text-[10.5px] font-semibold text-gray-900 leading-tight"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          {title}
        </div>
        <div
          className="mt-0.5 text-[9.5px] text-gray-500 leading-tight truncate"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          {subtitle}
        </div>
      </div>
      <div className="px-3 pb-2.5 space-y-1">
        <div className="h-1 w-full bg-gray-100 rounded" />
        <div className="h-1 w-4/5 bg-gray-100 rounded" />
        <div className="h-1 w-3/5 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scenes
// ---------------------------------------------------------------------------

function Scene1() {
  // Documents cascade in from edges, settle into chaotic overlapping stack
  const docs = DOCUMENTS.slice(0, 6);
  return (
    <div className="relative w-full h-full">
      {docs.map((doc, i) => {
        const positions = [
          { x: -40, y: -30, rot: -8 },
          { x: 30, y: -40, rot: 6 },
          { x: -25, y: 20, rot: 4 },
          { x: 35, y: 15, rot: -5 },
          { x: 0, y: -10, rot: 2 },
          { x: -10, y: 30, rot: -3 },
        ];
        const p = positions[i];
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            initial={{
              x: `calc(-50% + ${p.x * 8}vw)`,
              y: `calc(-50% + ${p.y > 0 ? 110 : -110}vh)`,
              rotate: p.rot * 4,
              opacity: 0,
            }}
            animate={{
              x: `calc(-50% + ${p.x * 4}px)`,
              y: `calc(-50% + ${p.y * 4}px)`,
              rotate: p.rot,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ zIndex: i }}
          >
            <DocCard {...doc} />
          </motion.div>
        );
      })}
    </div>
  );
}

function Scene2() {
  // All 8 documents now visible. Add a subtle red alert dot top-right.
  return (
    <div className="relative w-full h-full">
      {DOCUMENTS.map((doc, i) => {
        const positions = [
          { x: -50, y: -35, rot: -10 },
          { x: 40, y: -45, rot: 7 },
          { x: -35, y: 25, rot: 5 },
          { x: 45, y: 20, rot: -6 },
          { x: -5, y: -15, rot: 2 },
          { x: -20, y: 35, rot: -4 },
          { x: 25, y: 40, rot: 8 },
          { x: 10, y: 5, rot: -2 },
        ];
        const p = positions[i];
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            initial={{
              x: `calc(-50% + ${p.x * 4}px)`,
              y: `calc(-50% + ${p.y * 4}px)`,
              rotate: p.rot,
              opacity: 1,
            }}
            animate={{
              x: `calc(-50% + ${p.x * 4.5}px)`,
              y: `calc(-50% + ${p.y * 4.5}px)`,
              rotate: p.rot * 1.05,
              opacity: 1,
            }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
            }}
            style={{ zIndex: i }}
          >
            <DocCard {...doc} />
          </motion.div>
        );
      })}
      {/* Pulsing alert dot top-right */}
      <motion.div
        className="absolute top-[12%] right-[14%]"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.2, 1], opacity: [0, 1, 1, 1] }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="relative">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: NEGATIVE }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: NEGATIVE }}
            animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function Scene3() {
  // Excel mockup with a "Net Yield = ?" cell highlighted
  const rows = [
    { name: "Dubai Marina Apt 1", rent: "AED 9,500", debt: "AED 950k", yield: "6.1%" },
    { name: "Dubai Marina Apt 2", rent: "AED 11,200", debt: "AED 1.1m", yield: "?" },
    { name: "JVC Studio", rent: "AED 5,200", debt: "AED 420k", yield: "?" },
    { name: "London Flat", rent: "£2,400", debt: "£280k", yield: "?" },
    { name: "Athens Flat", rent: "€1,200", debt: "€95k", yield: "?" },
  ];
  return (
    <motion.div
      className="bg-white rounded-md shadow-2xl overflow-hidden w-[68%] max-w-[800px]"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
        <div className="w-3 h-3 rounded-full bg-gray-300" />
        <div className="w-3 h-3 rounded-full bg-gray-300" />
        <div className="w-3 h-3 rounded-full bg-gray-300" />
        <div
          className="ml-3 text-[11px] text-gray-500"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          portfolio.xlsx
        </div>
      </div>
      <table
        className="w-full text-[13px]"
        style={{ fontFamily: "var(--font-mono, monospace)" }}
      >
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-3 py-2 font-semibold text-gray-700">Property</th>
            <th className="text-left px-3 py-2 font-semibold text-gray-700">Rent</th>
            <th className="text-left px-3 py-2 font-semibold text-gray-700">Debt</th>
            <th className="text-left px-3 py-2 font-semibold text-gray-700">Net Yield</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="px-3 py-2.5 text-gray-900">{r.name}</td>
              <td className="px-3 py-2.5 text-gray-700">{r.rent}</td>
              <td className="px-3 py-2.5 text-gray-700">{r.debt}</td>
              <td className="px-3 py-2.5">
                {r.yield === "?" ? (
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="inline-block rounded px-2 py-0.5"
                    style={{ backgroundColor: "#fee2e2", color: NEGATIVE }}
                  >
                    ?
                  </motion.span>
                ) : (
                  <span className="text-gray-700">{r.yield}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function Scene4() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center w-full px-[6%]"
    >
      <div
        className="text-white leading-[1.05] tracking-tight max-w-[85%] mx-auto"
        style={{
          fontFamily: "var(--font-display, serif)",
          fontSize: "clamp(38px, 5.4vw, 110px)",
        }}
      >
        What&rsquo;s your{" "}
        <em style={{ color: ACCENT, fontStyle: "italic" }}>real</em>{" "}
        net yield?
      </div>
    </motion.div>
  );
}

function Scene5() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-3"
      >
        <div
          className="text-[6vw] text-white leading-none tracking-tight"
          style={{ fontFamily: "var(--font-display, serif)" }}
        >
          AssetCentral
        </div>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-[2px] mt-3 mx-auto"
        style={{ backgroundColor: ACCENT, width: "30%", transformOrigin: "left" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mt-5 text-[1.8vw] text-white/70 tracking-wide"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Your AI agent team for property yield.
      </motion.div>
    </div>
  );
}

function Scene6() {
  // Inbox UI with documents flying in one by one
  const incoming = [
    { title: "Lease Agreement", tag: "Marina Apt 2 / Lease", color: ACCENT },
    { title: "Mortgage Statement", tag: "JVC Studio / Mortgage", color: POSITIVE },
    { title: "Service Charge Inv.", tag: "Marina / Service Charge", color: WARNING },
    { title: "Short-term Rental Operator Report", tag: "JVC / Operator", color: ACCENT },
    { title: "Insurance Schedule", tag: "London / Insurance", color: POSITIVE },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[60%] max-w-[720px] bg-white rounded-xl shadow-2xl overflow-hidden"
    >
      <div
        className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        <div className="text-[12px] font-semibold text-gray-900">📥 Inbox</div>
        <div className="flex items-center gap-1.5 text-[10.5px] text-gray-500">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          AI classifying
        </div>
      </div>
      <div className="p-3 space-y-1.5 min-h-[260px]">
        {incoming.map((doc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-3 rounded-md border border-gray-100 bg-gray-50/50 px-3 py-2"
          >
            <div
              className="text-[11px] font-semibold text-gray-900 flex-1"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {doc.title}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.55 }}
              className="text-[10px] font-medium px-2 py-0.5 rounded"
              style={{
                backgroundColor: doc.color + "20",
                color: doc.color,
                fontFamily: "var(--font-sans, sans-serif)",
              }}
            >
              {doc.tag}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Scene7() {
  // Dashboard hero with property cards
  const cards = [
    { flag: "🇦🇪", name: "Marina Apt 1", yield: "6.1%", value: "€420k", tone: POSITIVE },
    { flag: "🇦🇪", name: "Marina Apt 2", yield: "5.4%", value: "€465k", tone: POSITIVE },
    { flag: "🇦🇪", name: "JVC Studio", yield: "7.2%", value: "€175k", tone: POSITIVE },
    { flag: "🇬🇧", name: "London Flat", yield: "4.1%", value: "£430k", tone: WARNING },
    { flag: "🇬🇷", name: "Athens Flat", yield: "5.8%", value: "€185k", tone: POSITIVE },
    { flag: "🇫🇷", name: "Paris 2-bed", yield: "3.9%", value: "€620k", tone: WARNING },
    { flag: "🇪🇸", name: "Madrid Apt", yield: "6.5%", value: "€295k", tone: POSITIVE },
    { flag: "🇬🇧", name: "Bristol HMO", yield: "8.1%", value: "£245k", tone: POSITIVE },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-[80%] max-w-[1100px]"
    >
      <div
        className="flex items-baseline justify-between mb-5 text-white"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        <div>
          <div className="text-[12px] text-white/60 uppercase tracking-wider">Portfolio</div>
          <div className="text-[28px] mt-1" style={{ fontFamily: "var(--font-display, serif)" }}>
            €4.2M · 5.8% net yield
          </div>
        </div>
        <div className="flex gap-3 text-[11px] text-white/60">
          <span>EUR · USD · GBP · AED</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[14px]">{c.flag}</span>
              <span
                className="text-[11.5px] text-white truncate"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {c.name}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span
                className="text-[18px] font-semibold"
                style={{
                  color: c.tone,
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                {c.yield}
              </span>
              <span
                className="text-[10.5px] text-white/50"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {c.value}
              </span>
            </div>
            {/* Mini sparkline */}
            <svg viewBox="0 0 100 20" className="w-full h-3 mt-2">
              <polyline
                points="0,15 15,12 30,14 45,8 60,10 75,5 90,7 100,4"
                fill="none"
                stroke={c.tone}
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Scene8() {
  // 12-month cashflow line chart, positives above baseline, negatives below
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const values = [4200, 5800, 5100, -3200, 4900, 5300, -2400, 6100, 5400, 4800, -3800, 5200];
  const max = 6500;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[78%] max-w-[1000px] bg-white/5 backdrop-blur border border-white/10 rounded-xl p-7"
    >
      <div
        className="text-[12px] text-white/60 uppercase tracking-wider mb-1"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Portfolio cashflow · 12 months
      </div>
      <div
        className="text-[22px] text-white mb-5"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        +€38,400 net
      </div>
      <div className="relative h-[220px]">
        {/* Baseline */}
        <div
          className="absolute left-0 right-0 top-1/2 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        />
        {/* Bars */}
        <div className="absolute inset-0 flex items-center justify-between">
          {values.map((v, i) => {
            const h = Math.abs(v) / max * 100;
            const isPositive = v >= 0;
            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                  className="w-3 rounded-sm"
                  style={{
                    backgroundColor: isPositive ? POSITIVE : NEGATIVE,
                    transformOrigin: isPositive ? "bottom" : "top",
                    position: "absolute",
                    [isPositive ? "bottom" : "top"]: "50%",
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* Month labels */}
        <div
          className="absolute -bottom-7 left-0 right-0 flex justify-between text-[10px] text-white/50"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          {months.map((m, i) => (
            <span key={i} className="flex-1 text-center">{m}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Scene9() {
  // Loan maturity timeline. 4 properties, one pulses amber "47 days".
  const loans = [
    { name: "Dubai Marina Apt 1", maturity: "May 2029", remaining: "3y 1m", tone: POSITIVE },
    { name: "Dubai Marina Apt 2", maturity: "Jul 2026", remaining: "47 days", tone: WARNING, urgent: true },
    { name: "London Flat", maturity: "Sep 2028", remaining: "2y 4m", tone: POSITIVE },
    { name: "JVC Studio", maturity: "Mar 2030", remaining: "3y 10m", tone: POSITIVE },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[70%] max-w-[900px] bg-white/5 backdrop-blur border border-white/10 rounded-xl p-7"
    >
      <div
        className="text-[12px] text-white/60 uppercase tracking-wider mb-1"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Loan maturity
      </div>
      <div
        className="text-[22px] text-white mb-5"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Fixed rate reverts in 47 days · Dubai Marina Apt 2
      </div>
      <div className="space-y-3">
        {loans.map((loan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
            className="flex items-center gap-4"
          >
            <div
              className="text-[12px] text-white/80 w-44 truncate"
              style={{ fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {loan.name}
            </div>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: loan.urgent ? "8%" : `${60 + i * 8}%` }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: loan.tone }}
              />
              {loan.urgent && (
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: loan.tone, opacity: 0.3 }}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
            </div>
            <div
              className="text-[11px] w-24 text-right"
              style={{
                color: loan.tone,
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {loan.remaining}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Scene10() {
  // STR operator statement with AI extraction overlay + flagged discrepancy
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-[70%] max-w-[900px] grid grid-cols-2 gap-5"
    >
      {/* Document */}
      <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <div
            className="text-[10.5px] text-gray-500"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            operator-statement-april-2026.pdf
          </div>
        </div>
        <div className="p-4 text-[10.5px] text-gray-800" style={{ fontFamily: "var(--font-mono, monospace)" }}>
          <div className="font-semibold mb-2">JVC Studio · April 2026</div>
          <div className="space-y-1">
            <div className="flex justify-between"><span>Nights booked</span><span>21</span></div>
            <div className="flex justify-between"><span>ADR</span><span>AED 540</span></div>
            <div className="flex justify-between"><span>Gross revenue</span><span>AED 11,340</span></div>
            <div className="flex justify-between"><span>Cleaning fees</span><span>−AED 840</span></div>
            <motion.div
              className="flex justify-between"
              animate={{ backgroundColor: ["transparent", "#fee2e2", "transparent"] }}
              transition={{ duration: 1.2, delay: 1.5, repeat: 1 }}
            >
              <span>Operator fee (27%)</span>
              <span>−AED 3,062</span>
            </motion.div>
            <div className="flex justify-between border-t border-gray-200 pt-1.5 mt-1.5 font-semibold">
              <span>Net to owner</span><span>AED 7,438</span>
            </div>
          </div>
        </div>
      </div>
      {/* AI extraction panel */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-5">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center gap-2 mb-4"
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          <span
            className="text-[10.5px] text-white/60 uppercase tracking-wider"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            AI extraction · auto-verified
          </span>
        </motion.div>
        <div className="space-y-3" style={{ fontFamily: "var(--font-mono, monospace)" }}>
          {[
            { label: "Occupancy", value: "70%", tone: POSITIVE, delay: 0.6 },
            { label: "ADR vs market", value: "AED 540 (in line)", tone: POSITIVE, delay: 0.9 },
            { label: "Contract fee", value: "25%", tone: "white/60", delay: 1.2 },
            { label: "Statement fee", value: "27% · +2pp", tone: WARNING, delay: 1.5, flagged: true },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: row.delay }}
              className="flex justify-between items-center text-[12px]"
            >
              <span className="text-white/60">{row.label}</span>
              <span
                style={{
                  color: typeof row.tone === "string" && row.tone.startsWith("rgba")
                    ? row.tone
                    : (row.tone as string) === "white/60"
                      ? "rgba(255,255,255,0.6)"
                      : (row.tone as string),
                }}
              >
                {row.value}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="mt-5 rounded p-2.5 text-[11px] flex items-center gap-2"
          style={{ backgroundColor: WARNING + "20", color: WARNING, fontFamily: "var(--font-sans, sans-serif)" }}
        >
          <span>⚠</span>
          Operator fee 27% — 2pp above contract
        </motion.div>
      </div>
    </motion.div>
  );
}

function Scene11() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-[70%] max-w-[900px] grid grid-cols-2 gap-5"
    >
      {[
        {
          label: "Hold current",
          name: "Dubai Marina Apt 2",
          irr: "6.3%",
          appreciation: "2.1%",
          hours: "6/mo",
          tone: WARNING,
          tag: "Quiet underperformer",
        },
        {
          label: "Sell + replace",
          name: "JVC 2-bed (modelled)",
          irr: "10.5%",
          appreciation: "4.0%",
          hours: "3/mo",
          tone: POSITIVE,
          tag: "Trade up",
        },
      ].map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.2 }}
          className="rounded-lg p-5 border-2"
          style={{
            backgroundColor: i === 1 ? POSITIVE + "10" : "rgba(255,255,255,0.04)",
            borderColor: i === 1 ? POSITIVE : "rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="text-[10.5px] text-white/50 uppercase tracking-wider"
            style={{ fontFamily: "var(--font-sans, sans-serif)" }}
          >
            {p.label}
          </div>
          <div
            className="text-[18px] text-white mt-1"
            style={{ fontFamily: "var(--font-display, serif)" }}
          >
            {p.name}
          </div>
          <div className="mt-5 space-y-2.5" style={{ fontFamily: "var(--font-mono, monospace)" }}>
            <div className="flex justify-between text-[12px]">
              <span className="text-white/60">IRR</span>
              <span style={{ color: p.tone }}>{p.irr}</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-white/60">Capital growth</span>
              <span className="text-white/80">{p.appreciation}</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-white/60">Management</span>
              <span className="text-white/80">{p.hours}</span>
            </div>
          </div>
          <div
            className="mt-5 inline-block text-[10.5px] px-2 py-1 rounded"
            style={{
              backgroundColor: p.tone + "20",
              color: p.tone,
              fontFamily: "var(--font-sans, sans-serif)",
            }}
          >
            {p.tag}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Scene12() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[42%] max-w-[440px] bg-white rounded-xl p-8 shadow-2xl"
      style={{ fontFamily: "var(--font-sans, sans-serif)" }}
    >
      <div
        className="text-[24px] text-gray-900 mb-2"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        Start your free trial.
      </div>
      <div className="text-[13px] text-gray-500 mb-6">
        Full access for 7 days. No credit card needed.
      </div>
      <div className="space-y-3">
        <div className="border border-gray-200 rounded-md px-3 py-2.5 text-[12px] text-gray-400">
          your@email.com
        </div>
        <div className="border border-gray-200 rounded-md px-3 py-2.5 text-[12px] text-gray-400">
          Password
        </div>
        <motion.div
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-md py-3 text-center text-[14px] font-medium text-white"
          style={{ backgroundColor: NAVY }}
        >
          Start free 7-day trial
        </motion.div>
      </div>
      <div className="mt-5 text-center text-[11px] text-gray-500">
        No credit card · Cancel anytime
      </div>
    </motion.div>
  );
}

function Scene13() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[6vw] text-white leading-none tracking-tight"
        style={{ fontFamily: "var(--font-display, serif)" }}
      >
        AssetCentral
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="h-[2px] mt-3 mx-auto"
        style={{ backgroundColor: ACCENT, width: "30%", transformOrigin: "left" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 text-[1.6vw] text-white/80"
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        Add your first property in 5 minutes.
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mt-2 text-[1.2vw]"
        style={{ color: ACCENT, fontFamily: "var(--font-sans, sans-serif)" }}
      >
        assetcentral.ai
      </motion.div>
    </div>
  );
}
