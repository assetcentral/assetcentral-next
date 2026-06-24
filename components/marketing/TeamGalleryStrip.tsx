// TeamGalleryStrip — reusable "5 portraits in a row" component.
//
// Split out of MeetTheTeamSection so the team faces can appear on
// pages other than the homepage (notably /features, /how-it-works
// and /pricing) without dragging the homepage's hero copy, CTAs,
// MMM chips and "Call My Team" strap along with them.
//
// Same data shape, same per-role accent palette, same click-through
// to the per-agent SEO pages. Render is intentionally compact: 5
// equal-width portrait cards with a coloured role band, optional
// eyebrow/heading above and an optional centred caption below.

import Image from "next/image";
import Link from "next/link";

interface Agent {
  acronym: "CIO" | "CFO" | "CEO" | "COO" | "PA";
  fullTitle: string;
  href: string;
  shortFunction: string;
  avatarSrc: string;
  bandClass: string;
  featured?: boolean;
}

const TEAM: Agent[] = [
  {
    acronym: "CIO",
    fullTitle: "Chief Investment Officer",
    href: "/ai-property-cio",
    shortFunction: "Underwrites every deal — multi-year IRR, levered vs. unlevered, repositioning scenarios.",
    avatarSrc: "/team/cio.webp",
    bandClass: "bg-[color:var(--color-cio-mid)]",
  },
  {
    acronym: "CFO",
    fullTitle: "Chief Financial Officer",
    href: "/ai-property-cfo",
    shortFunction: "Stress-tests DSCR, cash flow and capital runway against rate jumps and capex shocks.",
    avatarSrc: "/team/cfo.webp",
    bandClass: "bg-[color:var(--color-cfo-mid)]",
  },
  {
    acronym: "CEO",
    fullTitle: "Chief Executive Officer",
    href: "/ai-property-ceo",
    shortFunction: "Ranks priorities and writes the bank-ready credit packs lenders take seriously.",
    avatarSrc: "/team/ceo.webp",
    bandClass: "bg-[color:var(--color-ceo-mid)]",
    featured: true,
  },
  {
    acronym: "COO",
    fullTitle: "Chief Operations Officer",
    href: "/ai-property-coo",
    shortFunction: "Tracks variance vs. underwriting and the lease-rollover concentrations behind vacancy cliffs.",
    avatarSrc: "/team/coo.webp",
    bandClass: "bg-[color:var(--color-coo-mid)]",
  },
  {
    acronym: "PA",
    fullTitle: "Personal Assistant",
    href: "/ai-property-pa",
    shortFunction: "Intercepts every PDF, email, voice note and rent roll — parses, cleans and files it.",
    avatarSrc: "/team/pa.webp",
    bandClass: "bg-[color:var(--color-pa-mid)]",
  },
];

export function TeamGalleryStrip({
  eyebrow = "Your AI property team",
  heading,
  body,
  caption = "Five experts already briefed on your portfolio. Tap a face to read what each one does.",
  background = "surface",
}: {
  /** Small uppercase label above the heading. Pass "" to hide. */
  eyebrow?: string;
  /** Optional H2 above the portraits. Pass nothing to skip. */
  heading?: string;
  /** Optional body paragraph between heading and grid. */
  body?: string;
  /** Optional italic caption under the grid. Pass "" to hide. */
  caption?: string;
  /** Background colour — "surface" (default), "white", or "navy"
   *  for the dark variant used on the pricing page. */
  background?: "surface" | "white" | "navy";
}) {
  const bg =
    background === "navy"
      ? "bg-[color:var(--color-navy)] text-white"
      : background === "white"
        ? "bg-white"
        : "bg-[color:var(--color-surface)]";
  const eyebrowColour =
    background === "navy"
      ? "text-[color:var(--color-accent)]"
      : "text-[color:var(--color-accent)]";
  const headingColour =
    background === "navy" ? "text-white" : "text-[color:var(--color-navy)]";
  const bodyColour =
    background === "navy"
      ? "text-white/80"
      : "text-[color:var(--color-ink)]";
  const captionColour =
    background === "navy"
      ? "text-white/70"
      : "text-[color:var(--color-muted)]";

  return (
    <section
      aria-label="The AssetCentral AI property team"
      className={`${bg} py-14 lg:py-20`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {(eyebrow || heading || body) && (
          <div className="mx-auto max-w-3xl text-center mb-10 lg:mb-12">
            {eyebrow && (
              <p
                className={`text-[12px] uppercase tracking-[0.14em] font-semibold mb-3 ${eyebrowColour}`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className={`text-[30px] lg:text-[40px] leading-[1.1] ${headingColour}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {heading}
              </h2>
            )}
            {body && (
              <p
                className={`mt-4 text-[15.5px] lg:text-[17px] leading-[1.55] ${bodyColour}`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {body}
              </p>
            )}
          </div>
        )}

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-stretch">
          {TEAM.map((agent) => (
            <li key={agent.acronym} className={agent.featured ? "lg:-my-3" : ""}>
              <AgentCard agent={agent} darkBg={background === "navy"} />
            </li>
          ))}
        </ul>

        {caption && (
          <p
            className={`mt-6 text-center text-[12.5px] italic ${captionColour}`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}

function AgentCard({ agent, darkBg }: { agent: Agent; darkBg: boolean }) {
  const featured = agent.featured ?? false;
  // On navy backgrounds the card border defaults to a faint white so
  // it reads as a card; on light backgrounds we use the standard
  // border token. The featured (CEO) card always uses its tier colour.
  const baseBorder = darkBg ? "border border-white/15" : "border border-[color:var(--color-border)]";
  const featuredBorder = "border-2 border-[color:var(--color-ceo-mid)] shadow-lg";
  return (
    <Link
      href={agent.href}
      className={
        "group flex flex-col h-full rounded-xl bg-white overflow-hidden transition-shadow shadow-sm hover:shadow-md " +
        (featured ? featuredBorder : `${baseBorder} hover:border-[color:var(--color-navy)]`)
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
      <div
        className={`${agent.bandClass} px-3 py-2.5 text-white text-[12px] lg:text-[12.5px] font-semibold leading-snug`}
      >
        {agent.fullTitle}
      </div>
      <p
        className="flex-1 px-3 py-2.5 text-[12px] leading-[1.5] text-[color:var(--color-ink)] bg-white"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {agent.shortFunction}
      </p>
    </Link>
  );
}
