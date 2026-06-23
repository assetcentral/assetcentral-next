// Agent SEO landing pages — central data source.
//
// One config object per agent feeds the shared <AgentSeoPage> template.
// Each page (/ai-property-ceo, …-cio, …-cfo, …-coo, …-pa) is a thin
// wrapper that imports its config and the template. Keeping all the
// copy here means a single file owns the editorial voice across the
// five surfaces, and the page wrappers stay small enough to read at a
// glance.
//
// All copy is owner-facing — no AI hype, no jargon, no claims of
// financial/tax advice. Compliance language ("decision support",
// "may", "based on available data") is baked into the FAQ answers.

export type AgentSlug =
  | "ai-property-ceo"
  | "ai-property-cio"
  | "ai-property-cfo"
  | "ai-property-coo"
  | "ai-property-pa";

/** Pillar mapping — drives the in-page "How this agent contributes
 *  to Model / Monitor / Manage" section and the cross-link block. */
export type Pillar = "Model" | "Monitor" | "Manage" | "Coordinate";

export interface AgentSeoConfig {
  /** Route segment, e.g. "ai-property-cfo". */
  slug: AgentSlug;
  /** Three-letter acronym used in the hero eyebrow + the role badge. */
  acronym: "CEO" | "CIO" | "CFO" | "COO" | "PA";
  /** Full role title — "Chief Investment Officer". */
  roleTitle: string;
  /** Hero H1. */
  h1: string;
  /** Hero subheadline (one or two sentences). */
  subheadline: string;
  /** SEO <title>. */
  metaTitle: string;
  /** SEO meta description. */
  metaDescription: string;
  /** Portrait file under /public/team/. */
  portraitSrc: string;
  /** Tailwind class fragments wired to the per-role CSS variables. */
  accent: {
    /** Hero left-edge bar + chip background. e.g. var(--color-cfo-mid) */
    midVar: string;
    tintVar: string;
    deepVar: string;
  };
  /** Pillar(s) the agent contributes to. */
  pillars: Pillar[];
  /** One-sentence narrative for the pillar-mapping block. */
  pillarRationale: string;
  /** 4-6 sentence explanation of what the agent does, owner language. */
  roleExplanation: string;
  /** 7 short capabilities for the "What this agent helps with" grid. */
  capabilities: string[];
  /** 4 example owner questions for the "Ask your AI [ROLE]" block. */
  exampleQuestions: string[];
  /** A realistic illustrative output. Renders inside a quote-card. */
  exampleOutput: string;
  /** 4-6 FAQs for the FAQ section + JSON-LD schema. */
  faqs: { question: string; answer: string }[];
}

const DISCLAIMER =
  "AssetCentral provides decision-support tools and information. It does not provide financial, tax, legal or investment advice.";

const ALL_COUNTRIES_LINE =
  "AssetCentral supports portfolios held across multiple countries and currencies — the property model normalises each property to your reporting currency for portfolio-level metrics.";

// ── CEO ─────────────────────────────────────────────────────────────────────
const CEO: AgentSeoConfig = {
  slug: "ai-property-ceo",
  acronym: "CEO",
  roleTitle: "Chief Executive Officer",
  h1: "AI Property CEO for portfolio strategy",
  subheadline:
    "Your AssetCentral CEO ranks priorities across your portfolio AND writes the board-grade investment memos and bank-ready credit packs — the structural authority a fund brings to every lender conversation, for a private portfolio of 2 to 50 properties.",
  metaTitle: "AI Property CEO for Portfolio Strategy + Bank Memos | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property CEO, helping owners with 2 to 50 properties rank priorities AND package board-grade investment memos and bank-ready credit pages for lenders and partners.",
  portraitSrc: "/team/ceo.webp",
  accent: {
    midVar: "var(--color-ceo-mid)",
    tintVar: "var(--color-ceo-tint)",
    deepVar: "var(--color-ceo-deep)",
  },
  pillars: ["Manage"],
  pillarRationale:
    "The CEO sits at the Manage pillar — the agent that turns the team's modelling and monitoring into ranked decisions internally, and into investment memos and credit packs externally.",
  roleExplanation:
    "Owning 2–50 properties usually means more open decisions than time to think them through — and when a bank, IC or equity partner asks for a polished portfolio view, you scramble to assemble one. Your AssetCentral CEO does both jobs. Internally, it synthesises what the CIO, CFO, COO and PA have surfaced into a short, ranked decision list. Externally, it packages the same underlying work into board-grade investment memos and lender-ready credit packs — the structure of a corporate fund's IC submission, the format a commercial lender is expecting. You stay the decision-maker; the CEO removes the noise around it and writes the memo when you need to raise.",
  capabilities: [
    "Portfolio strategy and priority ranking",
    "Decision briefings ahead of meetings",
    "Capital deployment ranking",
    "Action ranking by yield impact",
    "Board-grade investment memos (IC submission format)",
    "Bank-ready credit packs (lender-formatted)",
    "Equity partner / co-investment decks",
  ],
  exampleQuestions: [
    "What are the top three priorities across my portfolio?",
    "Package a credit pack for the London refi conversation.",
    "Write the IC memo for the Manchester acquisition.",
    "Where should I focus capital this quarter?",
  ],
  exampleOutput:
    "Your CEO has prepared a lender-ready credit pack for the London refi conversation: portfolio overview (8 assets, AED 12.8m AUM, 5.1% blended net yield), current debt stack with maturity ladder, the CFO's stress test at +200bps, the CIO's hold vs. release-equity scenario, and a cover memo framing the asks. The same week's internal priorities are ranked alongside: (1) sign the refi pack and submit, (2) close out the Manchester rent review, (3) confirm Dubai handover option before month-end.",
  faqs: [
    {
      question: "What is an AI Property CEO?",
      answer:
        "An AI Property CEO is the strategy layer in AssetCentral's five-agent property team. It synthesises the modelling, monitoring and operational signal from the other four agents into a ranked list of decisions: what to do next, what to defer, and what is genuinely a risk worth your attention this week.",
    },
    {
      question: "Does the CEO make decisions for me?",
      answer:
        "No. The CEO presents ranked options with the reasoning behind each one, including the trade-offs. You make the call. Every decision is presented as decision support, not autopilot.",
    },
    {
      question: "How does the CEO know what's important across my portfolio?",
      answer:
        "Each of your AssetCentral agents writes its findings into a shared portfolio model — yield, cash flow, lease state, debt position, market data. The CEO ranks across that shared model using rules that prioritise live financial risk (rate resets, lease expiries) over slower-moving optimisation work.",
    },
    {
      question: "Is this for one property or a portfolio?",
      answer:
        "Both — but the CEO earns its keep most clearly once you hold 3–4 properties. With a single property the priorities are usually obvious. Above that, the volume of competing actions is what the CEO is built to triage.",
    },
    {
      question: "Does AssetCentral give investment or financial advice?",
      answer: DISCLAIMER,
    },
  ],
};

// ── CIO ─────────────────────────────────────────────────────────────────────
const CIO: AgentSeoConfig = {
  slug: "ai-property-cio",
  acronym: "CIO",
  roleTitle: "Chief Investment Officer",
  h1: "AI Property CIO for investment modelling",
  subheadline:
    "Your AssetCentral CIO runs multi-year institutional-grade underwriting on every property — unlevered vs. levered IRR, repositioning scenarios (long-let vs. short-let), and the break-even assumptions that decide whether capital deploys or waits.",
  metaTitle: "AI Property CIO for Multi-Year Underwriting | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property CIO, helping owners with 2 to 50 properties run multi-year underwriting, unlevered vs. levered IRR, and asset-repositioning scenarios on every capital decision.",
  portraitSrc: "/team/cio.webp",
  accent: {
    midVar: "var(--color-cio-mid)",
    tintVar: "var(--color-cio-tint)",
    deepVar: "var(--color-cio-deep)",
  },
  pillars: ["Model"],
  pillarRationale:
    "The CIO sits at the Model pillar — the agent that builds and pressure-tests every capital decision against institutional-grade underwriting before you deploy.",
  roleExplanation:
    "Capital decisions on a private property portfolio usually get made on instinct because the modelling is too painful. The CIO does institutional-grade underwriting for you: multi-year hold vs. sell with unlevered AND levered IRR side-by-side, a refinance scenario at three different rates, a renovation that lifts rent by 8%, a repositioning from long-let to short-let with seasonality factored in. Each one returns IRR, equity multiple, cash-on-cash and the break-even assumption. The discipline is the point — only deals that survive institutional underwriting reach your capital.",
  capabilities: [
    "Multi-year underwriting on hold and acquisition",
    "Unlevered vs. levered IRR side-by-side",
    "Hold versus sell scenarios",
    "Refinance versus retain modelling",
    "Long-let vs. short-let repositioning",
    "Capital allocation across the portfolio",
    "Trapped equity analysis",
  ],
  exampleQuestions: [
    "Should I sell or hold this property?",
    "What's the unlevered vs. levered IRR on this scenario?",
    "Which acquisition scenario has the best return?",
    "Should I switch from long-term rental to short-term rental?",
  ],
  exampleOutput:
    "Your CIO has run a five-year underwrite on the Marina property. Hold: 9.4% levered IRR / 6.1% unlevered, assuming rent grows 5% per year and the refinance lands below 4.6%. Sell at the current comparable: 7.1% IRR after costs and tax. Repositioning to short-let (operator-led, 28% gross uplift, 5% vacancy and ops drag): 11.2% levered IRR, but with a stricter cash-flow profile in the soft season. Inflection point on hold: 2.1% annual rent growth.",
  faqs: [
    {
      question: "What is an AI Property CIO?",
      answer:
        "An AI Property CIO is the investment-modelling layer in AssetCentral's five-agent property team. It runs the scenarios — hold, sell, refinance, renovate, acquire — and returns IRR, equity multiple, cash-on-cash and the underlying assumptions so you can read the numbers behind every capital decision.",
    },
    {
      question: "Can AssetCentral model an acquisition I haven't bought yet?",
      answer:
        "Yes. Add the property as a prospective acquisition with the address, asking price and expected rent. The CIO models it alongside your existing portfolio and returns the return profile, the capital required, and the impact on your overall yield blend.",
    },
    {
      question: "What if I don't have all the inputs for a scenario?",
      answer:
        "The CIO uses market data and your portfolio's existing benchmarks to fill in the gaps — current local rates, comparable rents, typical service charges — and flags every assumption so you can override the ones that matter to your situation.",
    },
    {
      question: "Does the CIO handle multiple currencies?",
      answer: ALL_COUNTRIES_LINE,
    },
    {
      question: "Does AssetCentral give investment advice?",
      answer: DISCLAIMER,
    },
  ],
};

// ── CFO ─────────────────────────────────────────────────────────────────────
const CFO: AgentSeoConfig = {
  slug: "ai-property-cfo",
  acronym: "CFO",
  roleTitle: "Chief Financial Officer",
  h1: "AI Property CFO for rental portfolio cash flow",
  subheadline:
    "Your AssetCentral CFO monitors real net yield and cash flow — and aggressively stress-tests every position. DSCR per property, rate-shock at +200bps, six-month void scenarios, capex spikes. The portfolio stays defensively insulated, not just visible.",
  metaTitle: "AI Property CFO for Cash Flow + Stress-Testing | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property CFO, helping owners with 2 to 50 properties monitor net yield AND stress-test against rate jumps, voids and capex — DSCR, capital runway, refinance window.",
  portraitSrc: "/team/cfo.webp",
  accent: {
    midVar: "var(--color-cfo-mid)",
    tintVar: "var(--color-cfo-tint)",
    deepVar: "var(--color-cfo-deep)",
  },
  pillars: ["Model", "Monitor"],
  pillarRationale:
    "The CFO sits across Model and Monitor — modelling each property's financial position and then aggressively stress-testing it against the macro shocks that catch private investors flat-footed.",
  roleExplanation:
    "Most private investors look at their portfolio's financial picture once a year, when the accountant sends a statement. By then the underperforming property has been underperforming for ten months — and a 200bps rate rise at the next reset is twelve months from cornering them. Your AssetCentral CFO holds the live picture (net yield per property, cash flow, debt position, liquidity headroom) AND runs the institutional stress tests: DSCR per property and at portfolio level, rate-shock at +100/+200/+300bps at the next refinance window, six-month void on the biggest unit, a service-charge special call. Ask 'what's my real yield?' and 'what happens if rates jump 2%?' — the CFO answers both.",
  capabilities: [
    "Net yield per property and blended across the portfolio",
    "Cash-flow monitoring month by month",
    "DSCR per property and at portfolio level",
    "Rate-shock stress tests at +100/+200/+300 bps",
    "Capital runway forecast under voids + capex shocks",
    "Mortgage tracking with refinance-window countdowns",
    "Refinance readiness — what to fix before approaching a lender",
  ],
  exampleQuestions: [
    "What is my real net yield?",
    "What's my DSCR if rates jump 200bps at the next reset?",
    "How many months of runway do I have if rent drops 20%?",
    "Which property should I refinance first?",
  ],
  exampleOutput:
    "Your CFO has stress-tested the portfolio for the next twelve months. Today's DSCR is 1.42 at portfolio level — comfortable. At +200bps shock against the two loans resetting in the next nine months, blended DSCR drops to 1.11 with the London flat falling below the lender's 1.20 covenant. Six-month void on the biggest unit + a £18k Brighton capex call takes runway from 14 months to 6. Action queue: open the London refi conversation now, shore up cash before the Brighton works begin.",
  faqs: [
    {
      question: "What is an AI Property CFO?",
      answer:
        "An AI Property CFO is the financial-monitoring layer in AssetCentral's five-agent property team. It calculates real net yield, tracks cash flow, watches mortgage and debt positions, and surfaces which property is dragging the portfolio blend before the annual statement makes it obvious.",
    },
    {
      question: "Can AssetCentral calculate net yield?",
      answer:
        "Yes — net yield is calculated per property and blended across the portfolio in your reporting currency. Inputs include rent received, vacancy, service charges, management fees, insurance, repairs, ground rent and any other operating costs you've recorded. The headline figure separates gross yield from true net yield, so you can see what's eating the difference.",
    },
    {
      question: "Can I track mortgages and refinancing dates?",
      answer:
        "Yes. Each property's mortgage product, rate, term, LTV and fixed-rate end date sits on the property record. The CFO surfaces upcoming resets ahead of time so you have months to act, not weeks.",
    },
    {
      question: "Is this for landlords or property managers?",
      answer:
        "AssetCentral is built for the owner — the person on the deed, paying the mortgage and taking the rental income. Property managers handle operations; the CFO is your view across what those operations produce financially, regardless of who manages each property day-to-day.",
    },
    {
      question: "Can I use AssetCentral for properties in different countries?",
      answer: ALL_COUNTRIES_LINE,
    },
    {
      question: "Does AssetCentral give financial or tax advice?",
      answer: DISCLAIMER,
    },
  ],
};

// ── COO ─────────────────────────────────────────────────────────────────────
const COO: AgentSeoConfig = {
  slug: "ai-property-coo",
  acronym: "COO",
  roleTitle: "Chief Operations Officer",
  h1: "AI Property COO for property operations",
  subheadline:
    "Your AssetCentral COO runs continuous variance tracking — actuals vs. the original underwriting — and maps lease-rollover concentration so the portfolio never faces a simultaneous vacancy cliff. Yield drift stops before it turns into a cash-flow crisis.",
  metaTitle: "AI Property COO for Asset Management + Variance Tracking | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property COO — the 24/7 asset manager that reconciles monthly actuals against underwriting, maps lease-rollover concentration, and stops yield drift before it compounds.",
  portraitSrc: "/team/coo.webp",
  accent: {
    midVar: "var(--color-coo-mid)",
    tintVar: "var(--color-coo-tint)",
    deepVar: "var(--color-coo-deep)",
  },
  pillars: ["Monitor", "Manage"],
  pillarRationale:
    "The COO sits across Monitor and Manage — the 24/7 watchdog that reconciles every property's live performance against the underwriting forecast and turns each variance into an action.",
  roleExplanation:
    "Yield doesn't usually leak through one big problem — it leaks through five small ones, and the worst of them is when six leases roll in the same quarter and you didn't see it coming. Your AssetCentral COO reconciles monthly actuals against the original underwriting forecast (variance tracking, line by line), maps lease-rollover concentration so a simultaneous vacancy cliff is impossible to walk into, monitors property-manager performance and maintenance follow-through, and ranks every operational signal by yield impact. Systemic experience, not heroics — the institutional discipline that stops yield drift before it compounds.",
  capabilities: [
    "Variance tracking — actuals vs. underwriting, line by line",
    "Lease-rollover concentration mapping (vacancy-cliff prevention)",
    "Lease expiry monitoring with renewal lead times",
    "Occupancy tracking and vacancy alerts",
    "Property manager performance — response time and outcomes",
    "Maintenance follow-up and ticket-status visibility",
    "Action execution — turning flags into follow-throughs",
  ],
  exampleQuestions: [
    "Which leases expire in the next 90 days?",
    "Show me variance to underwriting across the portfolio.",
    "Where is my lease-rollover concentration risk?",
    "Which managers are slipping on response time?",
  ],
  exampleOutput:
    "Your COO has reconciled the month's actuals against the underwriting. Three variances worth your attention: (1) Birmingham service charge is 14% above the underwritten figure — well above the 4% portfolio drift. (2) Marina manager's response time has slipped from 8 to 22 hours; tracking toward a Q3 occupancy event. (3) Lease-rollover concentration: 4 of 8 leases now roll inside a 12-week window in Q1 2027 — start the renewal conversations now or stagger expiry on the next two re-lets.",
  faqs: [
    {
      question: "What is an AI Property COO?",
      answer:
        "An AI Property COO is the operations layer in AssetCentral's five-agent property team. It monitors leases, occupancy, maintenance and property-manager performance across your portfolio, and turns operational drift into ranked action items.",
    },
    {
      question: "Does the COO replace my property manager?",
      answer:
        "No. Your property manager handles day-to-day operations on the ground. The COO is your view across every manager's work — what's been done, what's overdue, where response times are slipping, and where costs are out of line with the rest of the portfolio.",
    },
    {
      question: "Can I track tenants and lease dates?",
      answer:
        "Yes. Tenancy records hold start and end dates, rent, deposit, break clauses and renewal terms. The COO flags upcoming expiries with enough lead time to negotiate a renewal or start the re-letting process.",
    },
    {
      question: "Does the COO send messages to tenants or managers?",
      answer:
        "AssetCentral surfaces what needs doing and can draft messages for your review. Sending and follow-through stays with you or your manager — the COO doesn't act on the portfolio without your sign-off.",
    },
    {
      question: "Is this for landlords or property managers?",
      answer:
        "AssetCentral is built for the owner. The COO gives you the view across every property and every manager so you can hold operations to account without checking five different agent portals.",
    },
    {
      question: "Does AssetCentral give legal advice on lease matters?",
      answer: DISCLAIMER,
    },
  ],
};

// ── PA ──────────────────────────────────────────────────────────────────────
const PA: AgentSeoConfig = {
  slug: "ai-property-pa",
  acronym: "PA",
  roleTitle: "Personal Assistant",
  h1: "AI Property PA for property documents and tasks",
  subheadline:
    "Your AssetCentral PA sits at the gateway of your data stream — WhatsApp, email, desktop uploads. It intercepts every scanned tenancy, every 50-page brokerage PDF, every messy Excel rent roll, parses the unstructured content and hands organised data to the rest of the C-suite. Zero manual data-entry lag.",
  metaTitle: "AI Property PA for Document Intake + Parsing | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property PA — the intake clerk that intercepts every inbound document (WhatsApp, email, PDF, Excel, voice), parses the unstructured content, and feeds clean data to your AI C-suite.",
  portraitSrc: "/team/pa.webp",
  accent: {
    midVar: "var(--color-pa-mid)",
    tintVar: "var(--color-pa-tint)",
    deepVar: "var(--color-pa-deep)",
  },
  pillars: ["Manage", "Coordinate"],
  pillarRationale:
    "The PA sits at the gateway of the data stream — the intake clerk that turns inbound chaos (PDF, image, voice, Excel, WhatsApp) into clean, structured records the rest of the team can act on.",
  roleExplanation:
    "Most of the friction in running a property portfolio is administrative chaos. A 50-page brokerage PDF lands in your inbox. A scanned tenancy comes in over WhatsApp. A raw Excel rent roll forwarded from your property manager. A voice note from a contractor. Your AssetCentral PA intercepts every one of these at the gateway, runs unstructured-data parsing, cleans the formatting, extracts the relevant fields (dates, amounts, parties, terms), and files it against the right property — so the rest of your AI team works from clean, structured data. Information asymmetry resolved. Zero manual data-entry lag.",
  capabilities: [
    "Intercepts every inbound document (WhatsApp, email, file, voice)",
    "Unstructured-data parsing (PDF, image, Excel, voice notes)",
    "Field extraction — dates, amounts, parties, terms",
    "Files parsed records to the right property automatically",
    "Reminders for renewals, payments and key dates",
    "Missing-information flags — what the team still needs",
    "Routes any question to the right AI specialist",
  ],
  exampleQuestions: [
    "What documents are missing from my portfolio?",
    "Parse this brokerage PDF and file it.",
    "Remind me about upcoming lease expiries.",
    "Summarise the next actions across my team.",
  ],
  exampleOutput:
    "Your PA has processed this week's inbound: 14 documents in (3 PDFs, 6 WhatsApp images, 2 rent-roll Excels, 1 voice note, 2 emailed statements), 14 parsed and filed. Two documents still missing for full model coverage: the latest service-charge statement on Brighton and the EPC on Edinburgh — chase emails drafted for your review. Three reminders fire in the next 30 days; Your CFO has three flags, your COO has two, and your CIO has one model ready for your review.",
  faqs: [
    {
      question: "What is an AI Property PA?",
      answer:
        "An AI Property PA is the coordination layer in AssetCentral's five-agent property team. It keeps every document organised, every task on track, every reminder firing on time, and routes any question you have to the right specialist agent — CIO, CFO, COO or CEO — rather than making you choose.",
    },
    {
      question: "How do documents get into AssetCentral?",
      answer:
        "Forward them to your personal AssetCentral email address, drop them onto the dashboard, send them via WhatsApp, or upload a folder. The PA reads each document, extracts the relevant fields (dates, amounts, parties, terms) and files it against the right property.",
    },
    {
      question: "Can the PA draft emails on my behalf?",
      answer:
        "Yes — for renewal letters, manager queries, payment reminders, and similar routine correspondence. Every draft is presented for your review before sending; the PA doesn't act on your portfolio without your sign-off.",
    },
    {
      question: "Does the PA handle reminders across calendars?",
      answer:
        "Reminders fire inside AssetCentral and via email at the lead time you set. Calendar integrations are on the roadmap; for now the daily briefing surfaces everything firing in the next 7 days.",
    },
    {
      question: "Does AssetCentral give tax or legal advice?",
      answer: DISCLAIMER,
    },
  ],
};

export const AGENTS: Record<AgentSlug, AgentSeoConfig> = {
  "ai-property-ceo": CEO,
  "ai-property-cio": CIO,
  "ai-property-cfo": CFO,
  "ai-property-coo": COO,
  "ai-property-pa": PA,
};

/** Stable list ordering for cross-link blocks — CEO first, PA last. */
export const AGENT_SLUGS: AgentSlug[] = [
  "ai-property-ceo",
  "ai-property-cio",
  "ai-property-cfo",
  "ai-property-coo",
  "ai-property-pa",
];
