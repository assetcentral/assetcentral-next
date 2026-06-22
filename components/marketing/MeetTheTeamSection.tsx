// AI Property Family Office — homepage hero section.
//
// 2026-06-22 v3 rebalance. Earlier iterations placed the voice-call
// phone form permanently in the hero, gave it equal billing with the
// product-activation CTA, and packed dense capability lists into the
// five agent cards. Result: the page read as "enter your phone to get
// a call" rather than "model, monitor and manage your portfolio."
//
// This version inverts the hierarchy:
//   1. H1 + value proposition + supporting line
//   2. Primary CTA — "Add your first property" (filled navy, dominant)
//   3. Secondary CTA — "Meet your AI team" (outline)
//   4. Compact 3-chip Model/Monitor/Manage explainer
//   5. Tertiary, collapsed-by-default voice option
//      (HeroCallCta — expands on click)
//
// Right column: 5 simplified agent cards. CEO featured / centred. No
// capability lists in the hero — each card shows role + title + ONE
// short function line. Full capability detail moved to the per-agent
// SEO pages and to later homepage sections.
//
// Column proportions: lg:col-span-5 / lg:col-span-7 (≈42% / 58%) per
// the spec — wider right column gives the 5 cards enough breathing
// room without dwarfing the value-prop column.

import Image from "next/image";
import Link from "next/link";
import { HeroCallCta } from "./HeroCallCta";

interface RoleAccent {
  band: string;
  border: string;
  dot: string;
}

interface Agent {
  acronym: "CIO" | "CFO" | "CEO" | "COO" | "PA";
  fullTitle: string;
  /** Per-agent SEO landing page. */
  href: string;
  /** ONE short function line — replaces the dense capability list
   *  the cards used to render. Per-agent detail lives on /ai-property-* */
  shortFunction: string;
  avatarSrc: string;
  accent: RoleAccent;
  /** CEO gets the central / lifted treatment in the row. */
  featured?: boolean;
}

const ACCENT_CIO: RoleAccent = {
  band: "bg-[color:var(--color-cio-mid)]",
  border: "border-[color:var(--color-cio-tint)]",
  dot: "bg-[color:var(--color-cio-mid)]",
};
const ACCENT_CFO: RoleAccent = {
  band: "bg-[color:var(--color-cfo-mid)]",
  border: "border-[color:var(--color-cfo-tint)]",
  dot: "bg-[color:var(--color-cfo-mid)]",
};
const ACCENT_CEO: RoleAccent = {
  band: "bg-[color:var(--color-ceo-mid)]",
  border: "border-[color:var(--color-ceo-mid)]",
  dot: "bg-[color:var(--color-ceo-mid)]",
};
const ACCENT_COO: RoleAccent = {
  band: "bg-[color:var(--color-coo-mid)]",
  border: "border-[color:var(--color-coo-tint)]",
  dot: "bg-[color:var(--color-coo-mid)]",
};
const ACCENT_PA: RoleAccent = {
  band: "bg-[color:var(--color-pa-mid)]",
  border: "border-[color:var(--color-pa-tint)]",
  dot: "bg-[color:var(--color-pa-mid)]",
};

const TEAM: Agent[] = [
  {
    acronym: "CIO",
    fullTitle: "Investment Modelling",
    href: "/ai-property-cio",
    shortFunction: "Models hold, sell, refinance and reinvest scenarios.",
    avatarSrc: "/team/cio.webp",
    accent: ACCENT_CIO,
  },
  {
    acronym: "CFO",
    fullTitle: "Financial Performance",
    href: "/ai-property-cfo",
    shortFunction: "Tracks yield, cash flow, debt and liquidity.",
    avatarSrc: "/team/cfo.webp",
    accent: ACCENT_CFO,
  },
  {
    acronym: "CEO",
    fullTitle: "Portfolio Strategy",
    href: "/ai-property-ceo",
    shortFunction: "Sets priorities and turns analysis into decisions.",
    avatarSrc: "/team/ceo.webp",
    accent: ACCENT_CEO,
    featured: true,
  },
  {
    acronym: "COO",
    fullTitle: "Property Operations",
    href: "/ai-property-coo",
    shortFunction: "Monitors leases, occupancy and action execution.",
    avatarSrc: "/team/coo.webp",
    accent: ACCENT_COO,
  },
  {
    acronym: "PA",
    fullTitle: "Tasks & Documents",
    href: "/ai-property-pa",
    shortFunction: "Organises documents, reminders and next steps.",
    avatarSrc: "/team/pa.webp",
    accent: ACCENT_PA,
  },
];

/** Compact M/M/M chip data — replaces the old vertical pill list with
 *  3-line descriptions. Hero stays terse; the long-form story lives
 *  on /model, /monitor, /manage. */
const MMM = [
  {
    name: "Model",
    body: "Test decisions before committing capital.",
    iconBg: "bg-[color:var(--color-disc-model)]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    name: "Monitor",
    body: "Track yield, cash flow, debt and risk.",
    iconBg: "bg-[color:var(--color-disc-monitor)]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 12h3l3-7 4 14 3-7h5" />
      </svg>
    ),
  },
  {
    name: "Manage",
    body: "Turn insights into actions and follow-up.",
    iconBg: "bg-[color:var(--color-disc-manage)]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12l4 4 10-10" />
      </svg>
    ),
  },
] as const;

// ────────────────────────────────────────────────────────────────────────────
// Main section
// ────────────────────────────────────────────────────────────────────────────
export function MeetTheTeamSection() {
  return (
    <section
      id="team"
      aria-label="Your AI property management team"
      className="bg-white pt-20 pb-16 md:pt-24 md:pb-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start lg:items-center">
          {/* ── LEFT COLUMN — value prop + CTAs + MMM chips + call link */}
          <div className="lg:col-span-5">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[58px] font-semibold text-[color:var(--color-navy)] leading-[1.05] tracking-tight">
              Your AI Property Family Office.
            </h1>
            <p className="mt-5 text-base md:text-lg text-[color:var(--color-navy)] leading-relaxed">
              An AI-native team for owners and investors managing 2 to 50 properties.
            </p>
            <p className="mt-3 text-[15px] md:text-base text-[color:var(--color-muted)] leading-relaxed max-w-xl">
              Model decisions, monitor performance and manage actions across your
              portfolio — without running everything through spreadsheets.
            </p>

            {/* ── CTAs — Add a property is the dominant action.
                 Meet your AI team is the secondary, educational action. */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup?plan=pro_monthly&intent=direct"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-navy)] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
              >
                Add your first property
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[color:var(--color-border)] bg-white px-6 py-3.5 text-[15px] font-semibold text-[color:var(--color-navy)] transition hover:border-[color:var(--color-navy)]"
              >
                Meet your AI team
              </Link>
            </div>
            <p
              className="mt-3 text-[12.5px] text-[color:var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              See your real yield and first recommendations in minutes.
            </p>

            {/* ── Compact M/M/M chips — three side-by-side, one short
                 line each. Long-form per-pillar copy lives on /model,
                 /monitor, /manage. */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MMM.map((p) => (
                <li
                  key={p.name}
                  className="rounded-xl border border-[color:var(--color-border)] bg-white p-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${p.iconBg}`}
                    >
                      {p.icon}
                    </span>
                    <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-[color:var(--color-ink)]">
                      {p.name}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[color:var(--color-muted)]">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>

            {/* ── Tertiary: voice onboarding option, collapsed by default. */}
            <HeroCallCta />
          </div>

          {/* ── RIGHT COLUMN — 5 simplified agent cards. */}
          <div className="lg:col-span-7 relative">
            <div className="hidden lg:flex items-center justify-end gap-2 -mb-1">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]"
              />
              <span
                className="font-[family-name:var(--font-display)] italic text-[color:var(--color-muted)] text-sm"
              >
                Your AI team
              </span>
            </div>

            <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-stretch">
              {TEAM.map((agent) => (
                <li key={agent.acronym} className={agent.featured ? 'lg:-my-3' : ''}>
                  <AgentCard agent={agent} />
                </li>
              ))}
            </ul>

            <p
              className="mt-5 text-center text-[12px] text-[color:var(--color-muted)] italic"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              You own the properties. Your AI team does the modelling, monitoring and managing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Single agent card — simplified hero version
// ────────────────────────────────────────────────────────────────────────────
function AgentCard({ agent }: { agent: Agent }) {
  const featured = agent.featured ?? false;
  return (
    <Link
      href={agent.href}
      className={
        "group flex flex-col h-full rounded-xl bg-white overflow-hidden transition-shadow " +
        (featured
          ? "border-2 border-[color:var(--color-ceo-mid)] shadow-lg hover:shadow-xl"
          : "border border-[color:var(--color-border)] shadow-sm hover:shadow-md hover:border-[color:var(--color-navy)]")
      }
    >
      <div className="relative aspect-[4/5] w-full bg-[color:var(--color-surface)]">
        <Image
          src={agent.avatarSrc}
          alt={`Portrait of the AssetCentral AI ${agent.fullTitle}`}
          fill
          sizes="(min-width: 1024px) 14vw, (min-width: 640px) 32vw, 48vw"
          className="object-cover"
        />
      </div>

      {/* Role band — coloured strip with acronym + title (one short
          subtitle each per the spec; no capability list in hero). */}
      <div className={`${agent.accent.band} px-3 py-2.5 text-white`}>
        <div className="text-base lg:text-lg font-bold leading-none">
          {agent.acronym}
        </div>
        <div className="text-[11px] lg:text-[11.5px] font-medium leading-tight mt-0.5 opacity-95">
          {agent.fullTitle}
        </div>
      </div>

      {/* Short function — ONE line per the spec. Detailed capability
          breakdowns live on the per-agent SEO pages
          (/ai-property-{role}). */}
      <p
        className="flex-1 px-3 py-2.5 text-[12px] leading-[1.5] text-[color:var(--color-ink)] bg-white"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {agent.shortFunction}
      </p>
    </Link>
  );
}
