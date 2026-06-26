"use client";

// Top-of-funnel B2C hero — "Run the numbers first." with orbiting metrics.
//
// 2026-06 repositioning (Phase 2). AssetCentral.ai is positioned as the
// default place people go BEFORE making any property decision — buy,
// sell, mortgage, refinance, renovate, rent out. The hero leads with
// the behavioural ask ("run the numbers first").
//
// This pass (2026-06): replace the static text-only hero with a product-
// led visual — a property card at the centre, six financial-metric
// pills orbiting around it. Pitches the product as a working tool that
// surfaces real numbers, not a brochure. Mobile stacks copy-then-visual;
// desktop runs them side-by-side.
//
// Animation: a single keyframe spins the orbit ring; each pill carries a
// counter-spin so the text stays upright. Both wrap in a
// prefers-reduced-motion query — motion-sensitive users get static
// positioning. The pills also live behind a "highlight" cycle that
// nudges each one in turn (1s focus, ~7s gap) so the surface feels
// alive without flashing. SVG illustration for the central property
// keeps the bundle light (no image asset to ship) and scales crisply
// on every viewport.
//
// Component name kept as DontBuyBlindHero for import-history reasons.

import Link from "next/link";
import { useEffect, useState } from "react";

interface OrbitMetric {
  label: string;
  value: string;
  /** Angle in degrees on the orbit circle. 0° = top, then clockwise. */
  angle: number;
  /** Tone drives the value text colour. */
  tone: "neutral" | "positive" | "negative";
}

interface RegionData {
  key: "uk" | "uae" | "ie" | "sa";
  /** IANA timezones that map to this region. Looked up via
   *  Intl.DateTimeFormat().resolvedOptions().timeZone on mount. */
  timezones: string[];
  address: { line1: string; line2: string };
  /** Property facts — separate area strings for mobile vs desktop so
   *  the row fits the narrower mobile card. */
  facts: { beds: string; baths: string; areaShort: string; areaLong: string };
  metrics: OrbitMetric[];
}

// Seven pills equally spaced around the orbit (360 / 7 ≈ 51.43° apart).
// Price sits at the top as the headline number — every other pill
// (mortgage, rent, yield, cash flow, works, refinance) follows.
const ORBIT_ANGLES = [0, 51.43, 102.86, 154.29, 205.71, 257.14, 308.57] as const;

type MetricTuple = readonly [string, string, "neutral" | "positive" | "negative"];

function buildMetrics(tuples: readonly MetricTuple[]): OrbitMetric[] {
  return tuples.map(([value, label, tone], i) => ({
    angle: ORBIT_ANGLES[i],
    value,
    label,
    tone,
  }));
}

// Region map. UK is the default — anything outside the listed
// timezones falls back to it. KPIs are plausible mid-market values
// for a typical 2- or 3-bedroom property in each region; addresses
// are deliberately fictive (Maple View doesn't exist on M20, Marina
// Heights is a made-up tower name, Liffey View has a reserved
// "XX00" postcode, Al-Olaya is a real Riyadh district but villa
// numbers are invented).
const REGION_UK: RegionData = {
  key: "uk",
  timezones: ["Europe/London"],
  address: { line1: "12 Maple View", line2: "Manchester, M20 1ZZ" },
  facts: { beds: "3", baths: "2", areaShort: "1,024 ft²", areaLong: "1,024 sq ft" },
  metrics: buildMetrics([
    ["£300k", "Price", "neutral"],
    ["£1,780", "Mortgage", "neutral"],
    ["£2,100", "Rent", "neutral"],
    ["5.6%", "Yield", "positive"],
    ["−£140", "Cash flow", "negative"],
    ["£25k", "Works", "neutral"],
    ["+£190", "Refinance", "positive"],
  ]),
};

const REGION_UAE: RegionData = {
  key: "uae",
  timezones: ["Asia/Dubai", "Asia/Abu_Dhabi", "Asia/Muscat"],
  address: { line1: "Apt 1204, Marina Heights", line2: "Dubai Marina, Dubai" },
  facts: { beds: "2", baths: "2", areaShort: "1,200 ft²", areaLong: "1,200 sq ft" },
  metrics: buildMetrics([
    ["AED 1.4m", "Price", "neutral"],
    ["AED 6,300", "Mortgage", "neutral"],
    ["AED 9,200", "Rent", "neutral"],
    ["7.5%", "Yield", "positive"],
    ["+AED 650", "Cash flow", "positive"],
    ["AED 80k", "Works", "neutral"],
    ["+AED 850", "Refinance", "positive"],
  ]),
};

const REGION_IE: RegionData = {
  key: "ie",
  timezones: ["Europe/Dublin"],
  address: { line1: "12 Liffey View", line2: "Dublin 8, D08 XX00" },
  facts: { beds: "3", baths: "2", areaShort: "1,100 ft²", areaLong: "1,100 sq ft" },
  metrics: buildMetrics([
    ["€450k", "Price", "neutral"],
    ["€2,000", "Mortgage", "neutral"],
    ["€2,400", "Rent", "neutral"],
    ["5.0%", "Yield", "positive"],
    ["−€60", "Cash flow", "negative"],
    ["€25k", "Works", "neutral"],
    ["+€150", "Refinance", "positive"],
  ]),
};

const REGION_SA: RegionData = {
  key: "sa",
  timezones: ["Asia/Riyadh", "Asia/Jeddah", "Asia/Bahrain", "Asia/Qatar"],
  address: { line1: "Villa 12, Al-Olaya District", line2: "Riyadh" },
  facts: { beds: "4", baths: "3", areaShort: "1,800 ft²", areaLong: "1,800 sq ft" },
  metrics: buildMetrics([
    ["SAR 1.5m", "Price", "neutral"],
    ["SAR 7,500", "Mortgage", "neutral"],
    ["SAR 8,500", "Rent", "neutral"],
    ["6.8%", "Yield", "positive"],
    ["+SAR 250", "Cash flow", "positive"],
    ["SAR 60k", "Works", "neutral"],
    ["+SAR 600", "Refinance", "positive"],
  ]),
};

const ALL_REGIONS: RegionData[] = [REGION_UAE, REGION_IE, REGION_SA];
const DEFAULT_REGION = REGION_UK;

/** Client-side region detection via the visitor's IANA timezone. Falls
 *  back to UK for any unknown timezone or any environment that doesn't
 *  expose Intl (very old browsers / SSR). Pure read — no network. */
function detectRegion(): RegionData {
  if (typeof Intl === "undefined") return DEFAULT_REGION;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return ALL_REGIONS.find((r) => r.timezones.includes(tz)) ?? DEFAULT_REGION;
  } catch {
    return DEFAULT_REGION;
  }
}

export function DontBuyBlindHero() {
  // Region defaults to UK so the static-exported HTML pre-renders with
  // GBP + Manchester. On mount we read the visitor's IANA timezone and
  // swap to the matching region (UAE / Ireland / Saudi) if there is one.
  // First paint may briefly flash UK content before hydration settles —
  // acceptable for a marketing hero; the alternative (SSR detection)
  // doesn't work on a static-exported Netlify build.
  const [region, setRegion] = useState<RegionData>(DEFAULT_REGION);
  useEffect(() => {
    setRegion(detectRegion());
  }, []);
  const metrics = region.metrics;

  return (
    <section
      id="run-the-numbers"
      aria-label="Run the numbers first — AssetCentral"
      className="relative overflow-hidden bg-white pt-10 lg:pt-20 pb-14 lg:pb-20"
    >
      <style>{HERO_STYLES}</style>

      {/* The grid uses three logical blocks — text-top, visual, text-bottom.
          On mobile they stack in that order so the orbit sits between
          the subheading and the CTAs (the brief asks the visual to be
          above the fold next to the CTAs, not buried below the trust
          line). On desktop the visual spans both rows on the right
          while text-top + text-bottom share the left column. */}
      <div
        className="mx-auto max-w-6xl px-6 lg:px-10 grid gap-8 lg:gap-x-12 lg:gap-y-6 items-start lg:grid-cols-[1.05fr_1fr]"
        style={{
          gridTemplateAreas: `
            "top"
            "vis"
            "bot"
          `,
        }}
      >
        <style>{GRID_AREA_DESKTOP_STYLES}</style>

        {/* ── Text top (hero / subhead / secondary headline) ──────────
             Order: the primary hero ("Make better property decisions")
             names the outcome the owner cares about; the subhead names
             the decisions in scope; the secondary headline ("Run the
             numbers first") states the behavioural ask. The accent
             italic moves with the ask so the eye still lands on the
             action verb. ── */}
        <div className="ac-hero-top">
          <h1
            className="text-[44px] md:text-[58px] lg:text-[68px] leading-[1.02] tracking-tight text-[color:var(--color-navy)] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Make better property decisions.
          </h1>

          <p
            className="mt-6 text-[17px] lg:text-[20px] leading-[1.5] text-[color:var(--color-ink)] max-w-xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Before you buy, sell, refinance, renovate or rent out, check whether
            the numbers make sense.
          </p>

          <h2
            className="mt-8 text-[26px] md:text-[34px] lg:text-[40px] leading-[1.1] tracking-tight text-[color:var(--color-navy)] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Run the numbers{" "}
            <span className="text-[color:var(--color-accent)] italic">first.</span>
          </h2>
        </div>

        {/* ── Orbit visual ─────────────────────────────────────────── */}
        {/* Mobile max-w is tight (300px) on purpose: with px-6 page
            padding the section's content area on a 375px viewport is
            ~327px wide, and the orbiting pills extend ~50px beyond
            the orbit radius before clipping at the section's
            overflow-hidden edge. 300px keeps them comfortably inside. */}
        <div
          className="ac-hero-vis relative mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[440px] aspect-square"
          aria-hidden
        >
          {/* Dashed orbit ring + arrow markers — purely decorative,
              aria-hidden so screen readers skip it. */}
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full text-[color:var(--color-accent)]/35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="orbit-arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
              </marker>
            </defs>
            <circle
              cx="200"
              cy="200"
              r="178"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="3 8"
            />
            {/* Two small arrow markers on the circle to hint at motion. */}
            <path
              d="M 200 22 A 178 178 0 0 1 354.13 130"
              fill="none"
              stroke="transparent"
              markerEnd="url(#orbit-arrow)"
            />
            <path
              d="M 200 378 A 178 178 0 0 1 45.87 270"
              fill="none"
              stroke="transparent"
              markerEnd="url(#orbit-arrow)"
            />
          </svg>

          {/* Rotating orbit ring + pills. Each pill is positioned by
              precomputed top/left percentages on a circle of radius 42%
              centred on the parent. The outer wrapper carries the
              translate(-50%, -50%) anchor; an inner wrapper carries
              the counter-rotation animation so the text stays upright
              while the ring spins. Nesting keeps the two transforms
              independent — CSS animation on the inner div can't clobber
              the inline anchor on the outer one. */}
          <div className="absolute inset-0 ac-orbit-ring">
            {metrics.map((m) => {
              const rad = (m.angle * Math.PI) / 180;
              const radius = 42; // % of parent
              const left = 50 + radius * Math.sin(rad);
              const top = 50 - radius * Math.cos(rad);
              return (
                <div
                  key={m.label}
                  className="absolute"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="ac-orbit-pill">
                    <MetricPill value={m.value} label={m.label} tone={m.tone} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central property card — sits dead-centre, doesn't rotate. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <PropertyCenterCard region={region} />
          </div>
        </div>

        {/* ── Text bottom (CTAs + trust line) ───────────────────────── */}
        <div className="ac-hero-bot">
          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/check"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] px-6 py-3.5 rounded-md bg-[color:var(--color-navy)] text-white text-[15.5px] font-semibold shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
            >
              Start free property check
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="#example-analysis"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] text-[14.5px] font-semibold transition hover:border-[color:var(--color-navy)]"
            >
              See example analysis
            </Link>
          </div>

          <p
            className="mt-5 flex items-center gap-2 text-[13px] text-[color:var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <ShieldCheck className="w-4 h-4 text-[color:var(--color-positive)]" aria-hidden />
            Free first check. No card required.
          </p>
        </div>
      </div>
    </section>
  );
}

// Desktop grid mapping — text-top and text-bottom share the left
// column; the visual spans both rows on the right. Mobile uses the
// default single-column flow defined inline (top → vis → bot).
const GRID_AREA_DESKTOP_STYLES = `
  @media (min-width: 1024px) {
    #run-the-numbers > div {
      grid-template-areas:
        "top vis"
        "bot vis" !important;
    }
  }
  .ac-hero-top { grid-area: top; }
  .ac-hero-vis { grid-area: vis; }
  .ac-hero-bot { grid-area: bot; }
`;

// ─── Sub-components ─────────────────────────────────────────────────

function MetricPill({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: OrbitMetric["tone"];
}) {
  const toneClass =
    tone === "positive"
      ? "text-[color:var(--color-positive)]"
      : tone === "negative"
        ? "text-[color:var(--color-negative)]"
        : "text-[color:var(--color-navy)]";
  return (
    <div className="flex items-center gap-2 rounded-full bg-white border border-[color:var(--color-border)] shadow-sm pl-2 pr-3 py-1.5">
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[color:var(--color-accent)]/10"
        aria-hidden
      >
        <PillIcon label={label} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[13.5px] font-semibold tabular-nums ${toneClass}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {value}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.06em] text-[color:var(--color-muted)] mt-0.5"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {label}
        </span>
      </span>
    </div>
  );
}

function PropertyCenterCard({ region }: { region: RegionData }) {
  // Photo lives in /public/property/oakfield-road.png. The CSS
  // gradient is the fallback while the file is missing;
  // `loading="eager"` because this image is above the fold and
  // `decoding="async"` lets the browser keep painting. The address
  // and facts are region-driven (see REGION_* constants up top);
  // the photo itself stays UK-default for now — swapping per region
  // is a follow-up that needs licensed/owned photos per market.
  return (
    <div className="w-[124px] sm:w-[160px] lg:w-[200px] rounded-2xl bg-white border border-[color:var(--color-border)] shadow-[0_18px_50px_-18px_rgba(15,23,42,0.18)] overflow-hidden">
      <div className="relative aspect-[5/3] bg-gradient-to-br from-[#e0e7ff] via-[#e2e8f0] to-[#f1f5f9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/property/oakfield-road.png"
          alt={`Sample property in ${region.address.line2}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="px-3 py-2.5 sm:px-3.5 sm:py-3" style={{ fontFamily: "var(--font-sans)" }}>
        <p className="text-[12.5px] sm:text-[14.5px] font-semibold text-[color:var(--color-navy)] leading-tight">
          {region.address.line1}
        </p>
        <p className="mt-0.5 text-[10.5px] sm:text-[11.5px] text-[color:var(--color-muted)]">
          {region.address.line2}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5 sm:gap-2.5 text-[9.5px] sm:text-[11px] text-[color:var(--color-muted)] whitespace-nowrap">
          <span className="inline-flex items-center gap-0.5">
            <BedIcon /> {region.facts.beds}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <BathIcon /> {region.facts.baths}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <RulerIcon />
            <span className="hidden sm:inline">{region.facts.areaLong}</span>
            <span className="sm:hidden">{region.facts.areaShort}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Inline SVG icons ───────────────────────────────────────────────

function PillIcon({ label }: { label: string }) {
  const stroke = "var(--color-accent)";
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  // Subtle role match — saves the user a glance. Falls back to a generic
  // pound sign for anything unexpected.
  switch (label.toLowerCase()) {
    case "mortgage":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "rent":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 8h16M4 16h16" />
          <path d="M8 4v16M16 4v16" />
        </svg>
      );
    case "yield":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 17l5-5 4 4 7-7" />
          <path d="M14 8h6v6" />
        </svg>
      );
    case "cash flow":
      return (
        <svg {...common} aria-hidden>
          <path d="M5 19l14-14" />
          <path d="M13 19h6v-6" />
        </svg>
      );
    case "works":
      return (
        <svg {...common} aria-hidden>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a1.4 1.4 0 0 0 2 2l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5h-1.5V8.8l2.5-2.5z" />
        </svg>
      );
    case "refinance saving":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <path d="M7 8a4 4 0 0 1 4-4h4M7 14h8M9 4v16" />
        </svg>
      );
  }
}

function BedIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 17V7m0 10v3m0-3h18v3m0-3v-5a4 4 0 0 0-4-4H7" />
      <circle cx="7" cy="12" r="2" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 12h16v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-4z" />
      <path d="M6 12V6a2 2 0 0 1 4 0" />
      <path d="M5 19l-1 2M19 19l1 2" />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 16l13-13 5 5L8 21z" />
      <path d="M7 14l2 2M10 11l2 2M13 8l2 2" />
    </svg>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// ─── Orbit animation ────────────────────────────────────────────────
//
// .ac-orbit-ring spins clockwise; .ac-orbit-pill carries an inverse
// spin so each pill's text stays upright. The pill's position on the
// circle comes from the polar transform (rotate, translate, undo) —
// the wrapper rotation then drags the whole arrangement around. Both
// animations share the same duration so the pills' rotation cancels
// the ring's, leaving them visually still (relative to the viewer)
// while sweeping around the centre.
//
// The radius is set in CSS so we can tune one number to scale the
// orbit. Pills sit just outside the central card; the marker arrows
// on the SVG ring hint at direction without being a constant motion.
//
// prefers-reduced-motion gates everything — motion-sensitive users
// see the same composition without rotation.

const HERO_STYLES = `
  @media (prefers-reduced-motion: no-preference) {
    .ac-orbit-ring {
      animation: ac-orbit-spin 60s linear infinite;
      transform-origin: 50% 50%;
    }
    .ac-orbit-pill {
      animation: ac-orbit-spin-rev 60s linear infinite;
      transform-origin: 50% 50%;
    }
  }
  @keyframes ac-orbit-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes ac-orbit-spin-rev {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
`;
