// Role acronym → full-name lookup.
//
// Used by the agent cards across the marketing site (AgentYieldSection,
// MeetTheTeamSection, FeaturesGrid, TeamForPriceSection) to render the
// full role description directly under each acronym chip. Replaces the
// previous single-block glossary at the bottom of MeetTheTeamSection —
// inline placement reads faster and keeps the chip self-explanatory.
//
// Compound role labels like "Portfolio analyst / CFO" — used in the
// TeamForPriceSection price tiles — get the trailing acronym matched
// and expanded. Labels without a recognised acronym (e.g. "Concierge")
// return null so callers can skip rendering the line.

const FULL_NAMES: Record<string, string> = {
  CEO: 'Chief Executive Officer',
  CFO: 'Chief Financial Officer',
  CIO: 'Chief Information Officer',
  COO: 'Chief Operating Officer',
}

/** Return the full expansion of a role acronym chip, or null if the
 *  label doesn't contain a recognised three-letter chief-officer
 *  acronym. Accepts both standalone acronyms ("CEO") and compound
 *  labels ("Portfolio lead / CEO"). Matching is case-sensitive — the
 *  marketing site always uses uppercase chief-officer acronyms. */
export function roleFullName(role: string): string | null {
  // Standalone acronym fast path.
  if (FULL_NAMES[role]) return FULL_NAMES[role]
  // Compound label: extract the last token after either a slash or
  // whitespace and try the lookup against that.
  const match = role.match(/(?:[/\s])([A-Z]{3})$/)
  if (match && FULL_NAMES[match[1]]) return FULL_NAMES[match[1]]
  return null
}
