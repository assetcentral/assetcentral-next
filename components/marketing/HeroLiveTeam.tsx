import Image from "next/image";

// HeroLiveTeam — 3-second-loop animated band showing the 5 agent
// portraits with one "speaking" at a time.
//
// Why this exists: the site's static MeetTheTeamSection row reads as
// a marketing graphic. This animated variant reads as a working
// system the user can interrupt — registers "alive" within the first
// second on the page. The phone-callback form (piece 2) sits right
// below it so curiosity converts immediately.
//
// Implementation choices:
//   • Pure CSS keyframes — no JS, no Framer Motion, no video file.
//     Works with Next.js static export, no autoplay restrictions,
//     no codec compatibility, ~5KB total.
//   • Each portrait uses the same `hero-team-pulse` keyframe with a
//     staggered animation-delay so they cycle through one at a time.
//     Negative delays start each portrait mid-animation so the loop
//     doesn't look like it's "warming up" on page load.
//   • Audio-bar visualizer under the active portrait reinforces the
//     "speaking now" signal. Four bars with offset durations so the
//     bounce feels organic, not metronomic.
//
// Placement: slot above MeetTheTeamSection or as the very first
// thing on the page. The current homepage hero is a static team
// row — this is the animated variant we're A/B-ready to replace it
// with.

const AGENTS = [
  { key: "ceo", role: "CEO",  name: "Yield",   subtitle: "Frames the call", delay: "0s"   },
  { key: "cio", role: "CIO",  name: "Markets", subtitle: "Walks the numbers", delay: "-0.6s" },
  { key: "cfo", role: "CFO",  name: "Finance", subtitle: "Cashflow + tax",  delay: "-1.2s" },
  { key: "coo", role: "COO",  name: "Ops",     subtitle: "Tracks the doing", delay: "-1.8s" },
  { key: "pa",  role: "PA",   name: "Personal", subtitle: "Schedules + recall", delay: "-2.4s" },
];

export function HeroLiveTeam() {
  return (
    <section
      aria-label="Your AI property team — live"
      className="relative w-full bg-gradient-to-b from-[#0f172a] via-[#1a1a2e] to-[#1a1a2e] py-10 sm:py-14"
    >
      {/* Keyframes scoped to this component. The 3s cycle × 5 portraits
          = 0.6s "talking" per portrait. 20%-80% holds the active state
          for 1.2s of the 3s loop = enough to feel like a sentence. */}
      <style>{`
        @keyframes hero-team-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(79, 110, 247, 0);
          }
          16%, 24% {
            transform: scale(1.06);
            box-shadow: 0 0 0 6px rgba(79, 110, 247, 0.30),
                        0 0 32px 4px rgba(79, 110, 247, 0.45);
          }
        }
        @keyframes hero-team-label {
          0%, 100% { opacity: 0.45; }
          16%, 24% { opacity: 1; }
        }
        @keyframes hero-team-bar-a {
          0%, 100% { transform: scaleY(0.30); }
          50%      { transform: scaleY(1.00); }
        }
        @keyframes hero-team-bar-b {
          0%, 100% { transform: scaleY(0.50); }
          50%      { transform: scaleY(0.80); }
        }
        .hero-team-portrait {
          animation: hero-team-pulse 3s cubic-bezier(.4,0,.2,1) infinite;
          will-change: transform;
        }
        .hero-team-label {
          animation: hero-team-label 3s cubic-bezier(.4,0,.2,1) infinite;
        }
        .hero-team-bar {
          transform-origin: bottom;
        }
        .hero-team-bar-1 { animation: hero-team-bar-a 0.55s ease-in-out infinite alternate; }
        .hero-team-bar-2 { animation: hero-team-bar-b 0.40s ease-in-out infinite alternate; }
        .hero-team-bar-3 { animation: hero-team-bar-a 0.62s ease-in-out infinite alternate; }
        .hero-team-bar-4 { animation: hero-team-bar-b 0.48s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .hero-team-portrait,
          .hero-team-label,
          .hero-team-bar { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-100 text-[11px] sm:text-xs font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            On a call right now
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Your AI property team. Talking through a real portfolio.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-blue-100/80 max-w-xl mx-auto">
            Five specialists. One conversation. Always on, never billable.
          </p>
        </div>

        {/* Portrait band — flex row, responsive sizes. The animation
            is symmetrical so the row stays centred at every scale. */}
        <div className="flex justify-center items-end gap-3 sm:gap-6 md:gap-10">
          {AGENTS.map((a) => (
            <div
              key={a.key}
              className="flex flex-col items-center"
              style={{ width: "min(100%, 140px)" }}
            >
              <div
                className="hero-team-portrait relative rounded-full overflow-hidden border-2 border-white/20"
                style={{
                  width: "clamp(54px, 14vw, 96px)",
                  height: "clamp(54px, 14vw, 96px)",
                  animationDelay: a.delay,
                }}
              >
                <Image
                  src={`/team/${a.key}.webp`}
                  alt={`${a.role} portrait`}
                  fill
                  sizes="(max-width: 640px) 14vw, 96px"
                  className="object-cover"
                  priority={a.key === "ceo"}
                />
              </div>

              {/* Audio-bar visualizer — only "shows" via opacity tied
                  to the same delay as the portrait, so it appears
                  active when the portrait is the speaking one. */}
              <div
                className="hero-team-label mt-2 sm:mt-3 flex items-end gap-[2px] h-3"
                style={{ animationDelay: a.delay }}
              >
                <div className="hero-team-bar hero-team-bar-1 w-[2px] h-full bg-blue-400 rounded-full" />
                <div className="hero-team-bar hero-team-bar-2 w-[2px] h-full bg-blue-400 rounded-full" />
                <div className="hero-team-bar hero-team-bar-3 w-[2px] h-full bg-blue-400 rounded-full" />
                <div className="hero-team-bar hero-team-bar-4 w-[2px] h-full bg-blue-400 rounded-full" />
              </div>

              <div
                className="hero-team-label mt-1.5 text-center"
                style={{ animationDelay: a.delay }}
              >
                <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-blue-200">
                  {a.role}
                </div>
                <div className="hidden sm:block text-[10px] text-white/60 leading-tight mt-0.5">
                  {a.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
