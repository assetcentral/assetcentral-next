// Country catalogue for the marketing site's calculator surfaces.
// Mirrors the app side (assetcentral-app/lib/countries-catalogue.ts) so
// the country picker on the marketing mortgage calculator works the
// same way as the picker on the in-app calculators:
//
//   Detailed coverage — countries with full mortgage rule modelling
//   (LTV caps, transfer-tax bands, fees, residency rules). These are the
//   eight markets that lib/mortgage-rules.ts knows about today.
//
//   Other countries — the rest of the ISO 3166-1 list. When the user
//   picks one of these the calculator falls back to a sensible
//   generic model (UK rules — most universal English-property-market
//   reference) and the picker shows a clear amber notice so the user
//   knows the result is illustrative.
//
// Adding a new full-coverage market here is a two-step:
//   1. Add the CountryRule to lib/mortgage-rules.ts (LTV, term, transfer
//      tax fn, fees, notes).
//   2. Change this catalogue entry's `coverage` from 'basic' to 'full'
//      and set `calculatorCode` to the matching CountryCode.

import type { CountryCode } from "./mortgage-rules";

export type CoverageLevel = "full" | "basic";

export interface CountryEntry {
  /** Display name shown in the dropdown. Used as the lookup key. */
  name: string;
  /** ISO 3166-1 alpha-2 code. Useful for flags. */
  iso2: string;
  /** Currency the country most commonly transacts property in. Used for
   *  the picker label on full-coverage entries. */
  currency: string;
  /** Coverage classification — drives the optgroup placement and the
   *  fallback-model notice on the calculator. */
  coverage: CoverageLevel;
  /** When coverage='full', the CountryCode key into lib/mortgage-rules.ts
   *  COUNTRY_RULES. Lets the calculator resolve the rule from the
   *  catalogue without a second string-match table. */
  calculatorCode?: CountryCode;
  /** Unicode flag emoji — shown next to full-coverage entries so the
   *  picker matches the styling of the previous 8-country select.
   *  Basic-coverage entries skip the flag to keep the long list tidy. */
  flag?: string;
}

export const COUNTRIES: CountryEntry[] = [
  // ── Full coverage — the eight markets with detailed mortgage rules.
  // Listed alphabetically here so the source is grep-friendly; the
  // picker re-sorts them at render time too.
  { name: "France",          iso2: "FR", currency: "EUR", coverage: "full", calculatorCode: "FR", flag: "🇫🇷" },
  { name: "Germany",         iso2: "DE", currency: "EUR", coverage: "full", calculatorCode: "DE", flag: "🇩🇪" },
  { name: "Greece",          iso2: "GR", currency: "EUR", coverage: "full", calculatorCode: "GR", flag: "🇬🇷" },
  { name: "Portugal",        iso2: "PT", currency: "EUR", coverage: "full", calculatorCode: "PT", flag: "🇵🇹" },
  { name: "Spain",           iso2: "ES", currency: "EUR", coverage: "full", calculatorCode: "ES", flag: "🇪🇸" },
  { name: "Switzerland",     iso2: "CH", currency: "CHF", coverage: "full", calculatorCode: "CH", flag: "🇨🇭" },
  { name: "UAE",             iso2: "AE", currency: "AED", coverage: "full", calculatorCode: "AE", flag: "🇦🇪" },
  { name: "United Kingdom",  iso2: "GB", currency: "GBP", coverage: "full", calculatorCode: "GB", flag: "🇬🇧" },

  // ── Basic coverage — full ISO 3166-1 list minus the eight above.
  // Alphabetical. Currency falls back to the country's primary legal
  // tender; for currencies we don't transact in we use a regional
  // reserve currency (EUR for most of Europe + parts of Africa, USD
  // elsewhere). Currency here is informational only — the picker
  // doesn't use it for basic-coverage entries.
  { name: "Afghanistan",                      iso2: "AF", currency: "USD", coverage: "basic" },
  { name: "Albania",                          iso2: "AL", currency: "EUR", coverage: "basic" },
  { name: "Algeria",                          iso2: "DZ", currency: "EUR", coverage: "basic" },
  { name: "Andorra",                          iso2: "AD", currency: "EUR", coverage: "basic" },
  { name: "Angola",                           iso2: "AO", currency: "USD", coverage: "basic" },
  { name: "Antigua and Barbuda",              iso2: "AG", currency: "USD", coverage: "basic" },
  { name: "Argentina",                        iso2: "AR", currency: "USD", coverage: "basic" },
  { name: "Armenia",                          iso2: "AM", currency: "EUR", coverage: "basic" },
  { name: "Australia",                        iso2: "AU", currency: "AUD", coverage: "basic" },
  { name: "Austria",                          iso2: "AT", currency: "EUR", coverage: "basic" },
  { name: "Azerbaijan",                       iso2: "AZ", currency: "USD", coverage: "basic" },
  { name: "Bahamas",                          iso2: "BS", currency: "USD", coverage: "basic" },
  { name: "Bahrain",                          iso2: "BH", currency: "USD", coverage: "basic" },
  { name: "Bangladesh",                       iso2: "BD", currency: "USD", coverage: "basic" },
  { name: "Barbados",                         iso2: "BB", currency: "USD", coverage: "basic" },
  { name: "Belarus",                          iso2: "BY", currency: "EUR", coverage: "basic" },
  { name: "Belgium",                          iso2: "BE", currency: "EUR", coverage: "basic" },
  { name: "Belize",                           iso2: "BZ", currency: "USD", coverage: "basic" },
  { name: "Benin",                            iso2: "BJ", currency: "EUR", coverage: "basic" },
  { name: "Bhutan",                           iso2: "BT", currency: "USD", coverage: "basic" },
  { name: "Bolivia",                          iso2: "BO", currency: "USD", coverage: "basic" },
  { name: "Bosnia and Herzegovina",           iso2: "BA", currency: "EUR", coverage: "basic" },
  { name: "Botswana",                         iso2: "BW", currency: "USD", coverage: "basic" },
  { name: "Brazil",                           iso2: "BR", currency: "USD", coverage: "basic" },
  { name: "Brunei",                           iso2: "BN", currency: "SGD", coverage: "basic" },
  { name: "Bulgaria",                         iso2: "BG", currency: "EUR", coverage: "basic" },
  { name: "Burkina Faso",                     iso2: "BF", currency: "EUR", coverage: "basic" },
  { name: "Burundi",                          iso2: "BI", currency: "USD", coverage: "basic" },
  { name: "Cambodia",                         iso2: "KH", currency: "USD", coverage: "basic" },
  { name: "Cameroon",                         iso2: "CM", currency: "EUR", coverage: "basic" },
  { name: "Canada",                           iso2: "CA", currency: "CAD", coverage: "basic" },
  { name: "Cape Verde",                       iso2: "CV", currency: "EUR", coverage: "basic" },
  { name: "Central African Republic",         iso2: "CF", currency: "EUR", coverage: "basic" },
  { name: "Chad",                             iso2: "TD", currency: "EUR", coverage: "basic" },
  { name: "Chile",                            iso2: "CL", currency: "USD", coverage: "basic" },
  { name: "China",                            iso2: "CN", currency: "USD", coverage: "basic" },
  { name: "Colombia",                         iso2: "CO", currency: "USD", coverage: "basic" },
  { name: "Comoros",                          iso2: "KM", currency: "EUR", coverage: "basic" },
  { name: "Costa Rica",                       iso2: "CR", currency: "USD", coverage: "basic" },
  { name: "Croatia",                          iso2: "HR", currency: "EUR", coverage: "basic" },
  { name: "Cuba",                             iso2: "CU", currency: "USD", coverage: "basic" },
  { name: "Cyprus",                           iso2: "CY", currency: "EUR", coverage: "basic" },
  { name: "Czech Republic",                   iso2: "CZ", currency: "EUR", coverage: "basic" },
  { name: "Democratic Republic of the Congo", iso2: "CD", currency: "USD", coverage: "basic" },
  { name: "Denmark",                          iso2: "DK", currency: "EUR", coverage: "basic" },
  { name: "Djibouti",                         iso2: "DJ", currency: "USD", coverage: "basic" },
  { name: "Dominica",                         iso2: "DM", currency: "USD", coverage: "basic" },
  { name: "Dominican Republic",               iso2: "DO", currency: "USD", coverage: "basic" },
  { name: "Ecuador",                          iso2: "EC", currency: "USD", coverage: "basic" },
  { name: "Egypt",                            iso2: "EG", currency: "USD", coverage: "basic" },
  { name: "El Salvador",                      iso2: "SV", currency: "USD", coverage: "basic" },
  { name: "Equatorial Guinea",                iso2: "GQ", currency: "EUR", coverage: "basic" },
  { name: "Eritrea",                          iso2: "ER", currency: "USD", coverage: "basic" },
  { name: "Estonia",                          iso2: "EE", currency: "EUR", coverage: "basic" },
  { name: "Eswatini",                         iso2: "SZ", currency: "USD", coverage: "basic" },
  { name: "Ethiopia",                         iso2: "ET", currency: "USD", coverage: "basic" },
  { name: "Fiji",                             iso2: "FJ", currency: "AUD", coverage: "basic" },
  { name: "Finland",                          iso2: "FI", currency: "EUR", coverage: "basic" },
  { name: "Gabon",                            iso2: "GA", currency: "EUR", coverage: "basic" },
  { name: "Gambia",                           iso2: "GM", currency: "USD", coverage: "basic" },
  { name: "Georgia",                          iso2: "GE", currency: "USD", coverage: "basic" },
  { name: "Ghana",                            iso2: "GH", currency: "USD", coverage: "basic" },
  { name: "Grenada",                          iso2: "GD", currency: "USD", coverage: "basic" },
  { name: "Guatemala",                        iso2: "GT", currency: "USD", coverage: "basic" },
  { name: "Guinea",                           iso2: "GN", currency: "EUR", coverage: "basic" },
  { name: "Guinea-Bissau",                    iso2: "GW", currency: "EUR", coverage: "basic" },
  { name: "Guyana",                           iso2: "GY", currency: "USD", coverage: "basic" },
  { name: "Haiti",                            iso2: "HT", currency: "USD", coverage: "basic" },
  { name: "Honduras",                         iso2: "HN", currency: "USD", coverage: "basic" },
  { name: "Hong Kong",                        iso2: "HK", currency: "HKD", coverage: "basic" },
  { name: "Hungary",                          iso2: "HU", currency: "EUR", coverage: "basic" },
  { name: "Iceland",                          iso2: "IS", currency: "EUR", coverage: "basic" },
  { name: "India",                            iso2: "IN", currency: "USD", coverage: "basic" },
  { name: "Indonesia",                        iso2: "ID", currency: "USD", coverage: "basic" },
  { name: "Iran",                             iso2: "IR", currency: "USD", coverage: "basic" },
  { name: "Iraq",                             iso2: "IQ", currency: "USD", coverage: "basic" },
  { name: "Ireland",                          iso2: "IE", currency: "EUR", coverage: "basic" },
  { name: "Israel",                           iso2: "IL", currency: "USD", coverage: "basic" },
  { name: "Italy",                            iso2: "IT", currency: "EUR", coverage: "basic" },
  { name: "Ivory Coast",                      iso2: "CI", currency: "EUR", coverage: "basic" },
  { name: "Jamaica",                          iso2: "JM", currency: "USD", coverage: "basic" },
  { name: "Japan",                            iso2: "JP", currency: "USD", coverage: "basic" },
  { name: "Jordan",                           iso2: "JO", currency: "USD", coverage: "basic" },
  { name: "Kazakhstan",                       iso2: "KZ", currency: "USD", coverage: "basic" },
  { name: "Kenya",                            iso2: "KE", currency: "USD", coverage: "basic" },
  { name: "Kuwait",                           iso2: "KW", currency: "USD", coverage: "basic" },
  { name: "Kyrgyzstan",                       iso2: "KG", currency: "USD", coverage: "basic" },
  { name: "Laos",                             iso2: "LA", currency: "USD", coverage: "basic" },
  { name: "Latvia",                           iso2: "LV", currency: "EUR", coverage: "basic" },
  { name: "Lebanon",                          iso2: "LB", currency: "USD", coverage: "basic" },
  { name: "Lesotho",                          iso2: "LS", currency: "USD", coverage: "basic" },
  { name: "Liberia",                          iso2: "LR", currency: "USD", coverage: "basic" },
  { name: "Libya",                            iso2: "LY", currency: "USD", coverage: "basic" },
  { name: "Liechtenstein",                    iso2: "LI", currency: "CHF", coverage: "basic" },
  { name: "Lithuania",                        iso2: "LT", currency: "EUR", coverage: "basic" },
  { name: "Luxembourg",                       iso2: "LU", currency: "EUR", coverage: "basic" },
  { name: "Madagascar",                       iso2: "MG", currency: "EUR", coverage: "basic" },
  { name: "Malawi",                           iso2: "MW", currency: "USD", coverage: "basic" },
  { name: "Malaysia",                         iso2: "MY", currency: "MYR", coverage: "basic" },
  { name: "Maldives",                         iso2: "MV", currency: "USD", coverage: "basic" },
  { name: "Mali",                             iso2: "ML", currency: "EUR", coverage: "basic" },
  { name: "Malta",                            iso2: "MT", currency: "EUR", coverage: "basic" },
  { name: "Mauritania",                       iso2: "MR", currency: "EUR", coverage: "basic" },
  { name: "Mauritius",                        iso2: "MU", currency: "USD", coverage: "basic" },
  { name: "Mexico",                           iso2: "MX", currency: "USD", coverage: "basic" },
  { name: "Moldova",                          iso2: "MD", currency: "EUR", coverage: "basic" },
  { name: "Monaco",                           iso2: "MC", currency: "EUR", coverage: "basic" },
  { name: "Mongolia",                         iso2: "MN", currency: "USD", coverage: "basic" },
  { name: "Montenegro",                       iso2: "ME", currency: "EUR", coverage: "basic" },
  { name: "Morocco",                          iso2: "MA", currency: "EUR", coverage: "basic" },
  { name: "Mozambique",                       iso2: "MZ", currency: "USD", coverage: "basic" },
  { name: "Myanmar",                          iso2: "MM", currency: "USD", coverage: "basic" },
  { name: "Namibia",                          iso2: "NA", currency: "USD", coverage: "basic" },
  { name: "Nepal",                            iso2: "NP", currency: "USD", coverage: "basic" },
  { name: "Netherlands",                      iso2: "NL", currency: "EUR", coverage: "basic" },
  { name: "New Zealand",                      iso2: "NZ", currency: "AUD", coverage: "basic" },
  { name: "Nicaragua",                        iso2: "NI", currency: "USD", coverage: "basic" },
  { name: "Niger",                            iso2: "NE", currency: "EUR", coverage: "basic" },
  { name: "Nigeria",                          iso2: "NG", currency: "USD", coverage: "basic" },
  { name: "North Macedonia",                  iso2: "MK", currency: "EUR", coverage: "basic" },
  { name: "Norway",                           iso2: "NO", currency: "EUR", coverage: "basic" },
  { name: "Oman",                             iso2: "OM", currency: "OMR", coverage: "basic" },
  { name: "Pakistan",                         iso2: "PK", currency: "USD", coverage: "basic" },
  { name: "Panama",                           iso2: "PA", currency: "USD", coverage: "basic" },
  { name: "Papua New Guinea",                 iso2: "PG", currency: "AUD", coverage: "basic" },
  { name: "Paraguay",                         iso2: "PY", currency: "USD", coverage: "basic" },
  { name: "Peru",                             iso2: "PE", currency: "USD", coverage: "basic" },
  { name: "Philippines",                      iso2: "PH", currency: "USD", coverage: "basic" },
  { name: "Poland",                           iso2: "PL", currency: "EUR", coverage: "basic" },
  { name: "Qatar",                            iso2: "QA", currency: "QAR", coverage: "basic" },
  { name: "Republic of the Congo",            iso2: "CG", currency: "EUR", coverage: "basic" },
  { name: "Romania",                          iso2: "RO", currency: "EUR", coverage: "basic" },
  { name: "Russia",                           iso2: "RU", currency: "USD", coverage: "basic" },
  { name: "Rwanda",                           iso2: "RW", currency: "USD", coverage: "basic" },
  { name: "Saint Kitts and Nevis",            iso2: "KN", currency: "USD", coverage: "basic" },
  { name: "Saint Lucia",                      iso2: "LC", currency: "USD", coverage: "basic" },
  { name: "San Marino",                       iso2: "SM", currency: "EUR", coverage: "basic" },
  { name: "Saudi Arabia",                     iso2: "SA", currency: "SAR", coverage: "basic" },
  { name: "Senegal",                          iso2: "SN", currency: "EUR", coverage: "basic" },
  { name: "Serbia",                           iso2: "RS", currency: "EUR", coverage: "basic" },
  { name: "Seychelles",                       iso2: "SC", currency: "USD", coverage: "basic" },
  { name: "Sierra Leone",                     iso2: "SL", currency: "USD", coverage: "basic" },
  { name: "Singapore",                        iso2: "SG", currency: "SGD", coverage: "basic" },
  { name: "Slovakia",                         iso2: "SK", currency: "EUR", coverage: "basic" },
  { name: "Slovenia",                         iso2: "SI", currency: "EUR", coverage: "basic" },
  { name: "Somalia",                          iso2: "SO", currency: "USD", coverage: "basic" },
  { name: "South Africa",                     iso2: "ZA", currency: "USD", coverage: "basic" },
  { name: "South Korea",                      iso2: "KR", currency: "USD", coverage: "basic" },
  { name: "South Sudan",                      iso2: "SS", currency: "USD", coverage: "basic" },
  { name: "Sri Lanka",                        iso2: "LK", currency: "USD", coverage: "basic" },
  { name: "Sudan",                            iso2: "SD", currency: "USD", coverage: "basic" },
  { name: "Suriname",                         iso2: "SR", currency: "USD", coverage: "basic" },
  { name: "Sweden",                           iso2: "SE", currency: "EUR", coverage: "basic" },
  { name: "Syria",                            iso2: "SY", currency: "USD", coverage: "basic" },
  { name: "Taiwan",                           iso2: "TW", currency: "USD", coverage: "basic" },
  { name: "Tajikistan",                       iso2: "TJ", currency: "USD", coverage: "basic" },
  { name: "Tanzania",                         iso2: "TZ", currency: "USD", coverage: "basic" },
  { name: "Thailand",                         iso2: "TH", currency: "THB", coverage: "basic" },
  { name: "Togo",                             iso2: "TG", currency: "EUR", coverage: "basic" },
  { name: "Trinidad and Tobago",              iso2: "TT", currency: "USD", coverage: "basic" },
  { name: "Tunisia",                          iso2: "TN", currency: "EUR", coverage: "basic" },
  { name: "Turkey",                           iso2: "TR", currency: "TRY", coverage: "basic" },
  { name: "Turkmenistan",                     iso2: "TM", currency: "USD", coverage: "basic" },
  { name: "Uganda",                           iso2: "UG", currency: "USD", coverage: "basic" },
  { name: "Ukraine",                          iso2: "UA", currency: "EUR", coverage: "basic" },
  { name: "United States",                    iso2: "US", currency: "USD", coverage: "basic" },
  { name: "Uruguay",                          iso2: "UY", currency: "USD", coverage: "basic" },
  { name: "Uzbekistan",                       iso2: "UZ", currency: "USD", coverage: "basic" },
  { name: "Vatican City",                     iso2: "VA", currency: "EUR", coverage: "basic" },
  { name: "Venezuela",                        iso2: "VE", currency: "USD", coverage: "basic" },
  { name: "Vietnam",                          iso2: "VN", currency: "USD", coverage: "basic" },
  { name: "Yemen",                            iso2: "YE", currency: "USD", coverage: "basic" },
  { name: "Zambia",                           iso2: "ZM", currency: "USD", coverage: "basic" },
  { name: "Zimbabwe",                         iso2: "ZW", currency: "USD", coverage: "basic" },
];

// Pre-sorted lists for the picker. Both groups alphabetical so the
// dropdown reads predictably regardless of the order entries appear in
// COUNTRIES above.
export const FULL_COVERAGE_COUNTRIES: CountryEntry[] = COUNTRIES
  .filter((c) => c.coverage === "full")
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

export const BASIC_COVERAGE_COUNTRIES: CountryEntry[] = COUNTRIES
  .filter((c) => c.coverage === "basic")
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

// O(1) name→entry lookup.
const BY_NAME = new Map<string, CountryEntry>(
  COUNTRIES.map((c) => [c.name, c]),
);
const BY_CODE = new Map<CountryCode, CountryEntry>(
  COUNTRIES.filter((c) => c.calculatorCode).map((c) => [
    c.calculatorCode as CountryCode,
    c,
  ]),
);

export function findCountry(name: string | null | undefined): CountryEntry | undefined {
  if (!name) return undefined;
  return BY_NAME.get(name);
}

/** Reverse lookup — given a mortgage CountryCode, return the display
 *  name as it appears in the catalogue. Used to seed the picker from
 *  the calculator's existing default. */
export function displayNameForCode(code: CountryCode): string {
  return BY_CODE.get(code)?.name ?? "United Kingdom";
}

/** Resolve a picked display name to the calculator's CountryCode. For
 *  basic-coverage countries we fall back to the supplied default
 *  (typically the previously-selected covered country, or UK as the
 *  universal residential reference). Caller is expected to read
 *  `isBasicCoverage` and render the notice. */
export function resolveCountryForCalculator(
  displayName: string,
  fallbackCode: CountryCode,
): { code: CountryCode; isBasicCoverage: boolean; entry: CountryEntry | undefined } {
  const entry = findCountry(displayName);
  if (entry?.coverage === "full" && entry.calculatorCode) {
    return { code: entry.calculatorCode, isBasicCoverage: false, entry };
  }
  return { code: fallbackCode, isBasicCoverage: true, entry };
}
