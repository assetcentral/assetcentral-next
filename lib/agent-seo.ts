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
    "Your AssetCentral CEO ranks priorities across your property portfolio, frames the call you actually need to make, and keeps the team aligned on the small set of decisions that move yield.",
  metaTitle: "AI Property CEO for Portfolio Strategy | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property CEO, helping owners with 2 to 50 properties model, monitor and manage portfolio strategy, priorities and capital decisions.",
  portraitSrc: "/team/ceo.webp",
  accent: {
    midVar: "var(--color-ceo-mid)",
    tintVar: "var(--color-ceo-tint)",
    deepVar: "var(--color-ceo-deep)",
  },
  pillars: ["Manage"],
  pillarRationale:
    "The CEO sits at the Manage pillar — the agent that turns the team's modelling and monitoring into ranked decisions you can actually act on.",
  roleExplanation:
    "Owning 2–50 properties usually means more open decisions than time to think them through. Refinance the London flat now or wait? Sell the underperformer or hold and renovate? Where should next year's deposit go? Your AssetCentral CEO synthesises what the CIO, CFO, COO and PA have surfaced into a short, ranked decision list — what to do this week, this month, this quarter, and why each item sits where it does. You stay the decision-maker; the CEO removes the noise around it.",
  capabilities: [
    "Portfolio strategy",
    "Priority setting across all properties",
    "Decision briefings ahead of meetings",
    "Capital deployment ranking",
    "Risk focus — where to look first",
    "Action ranking by yield impact",
    "Portfolio direction over a 12-month view",
  ],
  exampleQuestions: [
    "What are the top three priorities across my portfolio?",
    "What should I do next?",
    "Which actions have the greatest impact on my yield?",
    "Where should I focus capital this quarter?",
  ],
  exampleOutput:
    "Your CEO has ranked this week's three priorities: (1) Refinance the London flat — its fixed period ends in 9 weeks and the rate-reset gap is the largest single yield risk on the portfolio. (2) Push through the rent review on the Manchester property — current rent sits 11% below local comparables. (3) Decide on the Dubai off-plan handover option before the developer's deadline next month.",
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
    "Your AssetCentral CIO runs the hold-versus-sell, refinance-versus-retain and acquisition models behind every capital decision — with IRR, equity multiple and trapped-equity figures you can read off the page.",
  metaTitle: "AI Property CIO for Investment Modelling | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property CIO, helping owners with 2 to 50 properties model returns, allocate capital and pressure-test hold, sell, refinance and acquisition scenarios.",
  portraitSrc: "/team/cio.webp",
  accent: {
    midVar: "var(--color-cio-mid)",
    tintVar: "var(--color-cio-tint)",
    deepVar: "var(--color-cio-deep)",
  },
  pillars: ["Model"],
  pillarRationale:
    "The CIO sits at the Model pillar — the agent that builds and pressure-tests the scenarios capital decisions rest on.",
  roleExplanation:
    "Capital decisions on a private property portfolio usually get made on instinct because the modelling is too painful. The CIO does the modelling for you: a five-year hold versus sell, a refinance scenario at three different rates, a renovation that lifts rent by 8% — each one returns IRR, equity multiple, cash-on-cash and the break-even assumption. When you ask 'should I sell?' the CIO gives you the number behind the answer, not just the answer.",
  capabilities: [
    "Hold versus sell scenarios",
    "Refinance versus retain modelling",
    "Renovation return scenarios",
    "Acquisition modelling on prospective buys",
    "Capital allocation across the portfolio",
    "IRR, equity multiple, cash-on-cash",
    "Trapped equity analysis",
  ],
  exampleQuestions: [
    "Should I sell or hold this property?",
    "Where is my equity underperforming?",
    "Which acquisition scenario has the best return?",
    "Should I switch from long-term rental to short-term rental?",
  ],
  exampleOutput:
    "Your CIO has modelled a five-year hold versus a sale on the Marina property. Holding produces a 9.4% IRR if rent grows 5% per year and the refinance lands below 4.6%. Selling at the current comparable price returns a 7.1% IRR after costs and tax. The hold case becomes weaker if rents stay flat — the inflection point sits at 2.1% annual rent growth.",
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
    "Your AssetCentral CFO monitors real net yield, cash flow, debt, costs and liquidity across your property portfolio — and tells you which property is dragging the blend before the year-end statement does.",
  metaTitle: "AI Property CFO for Rental Portfolio Cash Flow | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property CFO, helping owners with 2 to 50 properties monitor net yield, cash flow, mortgages, costs and refinance windows across their portfolio.",
  portraitSrc: "/team/cfo.webp",
  accent: {
    midVar: "var(--color-cfo-mid)",
    tintVar: "var(--color-cfo-tint)",
    deepVar: "var(--color-cfo-deep)",
  },
  pillars: ["Model", "Monitor"],
  pillarRationale:
    "The CFO sits across Model and Monitor — building the financial model per property and then watching it live, flagging the moment a number drifts off target.",
  roleExplanation:
    "Most private investors look at their portfolio's financial picture once a year, when the accountant sends a statement. By then the underperforming property has been underperforming for ten months. Your AssetCentral CFO holds the live financial picture: net yield per property, blended yield across the portfolio, cash flow this month, debt outstanding, mortgage rates and reset dates, service-charge drift, and the liquidity headroom you have for the next opportunity or repair bill. Ask 'what's my real yield?' and the answer accounts for every line item — not the gross headline you'd get from a letting agent.",
  capabilities: [
    "Net yield calculation per property and across the portfolio",
    "Cash-flow monitoring month by month",
    "Mortgage and debt review with reset dates",
    "Budget versus actual on operating costs",
    "Expense tracking with anomaly flags",
    "Liquidity forecasting over the next 12 months",
    "Refinance readiness — what to fix before approaching a lender",
  ],
  exampleQuestions: [
    "What is my real net yield?",
    "Which property has the weakest cash flow?",
    "What happens if my mortgage rate increases by 1.5 percentage points?",
    "Which property should I refinance first?",
  ],
  exampleOutput:
    "Your CFO has identified that the Brighton property has a net yield 2.3 percentage points below the portfolio average. Financing costs and service charges absorb 46% of rental income — well above the 31% portfolio average. Next step: review refinancing options on this property's mortgage and benchmark current rent against comparable two-bedroom flats in the same postcode.",
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
    "Your AssetCentral COO tracks leases, occupancy, maintenance and property-manager performance — and flags the small operational problems that quietly erode yield.",
  metaTitle: "AI Property COO for Property Operations | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property COO, helping owners with 2 to 50 properties track leases, occupancy, maintenance and operational risk across their property portfolio.",
  portraitSrc: "/team/coo.webp",
  accent: {
    midVar: "var(--color-coo-mid)",
    tintVar: "var(--color-coo-tint)",
    deepVar: "var(--color-coo-deep)",
  },
  pillars: ["Monitor", "Manage"],
  pillarRationale:
    "The COO sits across Monitor and Manage — watching every property's operational state and then turning what it sees into action items the team or your manager can follow through on.",
  roleExplanation:
    "Yield doesn't usually leak through one big problem — it leaks through five small ones. A lease that quietly expired into a periodic. A property manager who answered four emails late this quarter. A boiler that's been on the brink for six months. Your AssetCentral COO tracks every one of these signals across every property, ranks them by yield impact, and flags the small operational problems before they compound into a vacant unit or a bad review.",
  capabilities: [
    "Lease expiry monitoring with renewal lead times",
    "Occupancy tracking and vacancy alerts",
    "Property manager performance across response time and outcomes",
    "Maintenance follow-up and ticket-status visibility",
    "Cost leakage detection on operating expenses",
    "Action execution — turning flags into follow-throughs",
    "Operational risk per property and across the portfolio",
  ],
  exampleQuestions: [
    "Which leases expire in the next 90 days?",
    "Which property has operational issues right now?",
    "Which actions are overdue across my managers?",
    "Where is occupancy below my target?",
  ],
  exampleOutput:
    "Your COO has flagged three operational items this week: (1) Two leases expire in the next 60 days — the Manchester and Bristol units — and neither tenant has confirmed renewal. (2) The Birmingham property's service charge has risen 14% year-on-year, well above the 4% portfolio average. (3) The Marina manager's average response time on maintenance tickets has slipped from 8 to 22 hours over the last quarter.",
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
    "Your AssetCentral PA keeps your property documents organised, tasks on track, reminders firing on time, and routes any question to the right AI specialist on your team.",
  metaTitle: "AI Property PA for Property Documents and Tasks | AssetCentral",
  metaDescription:
    "Meet AssetCentral's AI Property PA, helping owners with 2 to 50 properties keep documents, tasks, reminders and briefings organised across the portfolio.",
  portraitSrc: "/team/pa.webp",
  accent: {
    midVar: "var(--color-pa-mid)",
    tintVar: "var(--color-pa-tint)",
    deepVar: "var(--color-pa-deep)",
  },
  pillars: ["Manage", "Coordinate"],
  pillarRationale:
    "The PA sits at the Manage pillar and coordinates across the team — making sure the right document is to hand, the right reminder fires, and any question lands with the right specialist agent.",
  roleExplanation:
    "Most of the friction in running a property portfolio isn't strategic — it's organisational. A tenancy contract you can't find when the renewal comes up. A service-charge demand sitting in a forwarded email. A reminder you set six months ago that never fired. Your AssetCentral PA holds every property document, every task, every reminder and every briefing in one place — and when you ask a question, routes it to the right specialist on your AI team rather than making you choose.",
  capabilities: [
    "Document organisation per property and across the portfolio",
    "Task creation and follow-through",
    "Reminders for renewals, payments and key dates",
    "Missing-information flags — what the team still needs",
    "Briefing preparation ahead of meetings or calls",
    "Email and report draft generation for your review",
    "Routing questions to the right AI specialist on your team",
  ],
  exampleQuestions: [
    "What documents are missing from my portfolio?",
    "Prepare my monthly portfolio briefing.",
    "Remind me about upcoming lease expiries.",
    "Summarise the next actions across my team.",
  ],
  exampleOutput:
    "Your PA has prepared your monthly briefing. Two documents are missing: the latest service-charge statement on the Brighton flat and the EPC certificate on the Edinburgh property. Three reminders fire in the next 30 days: the Manchester lease renewal decision, the London mortgage rate reset and the Dubai handover deadline. Your CFO has three flags, your COO has two, and your CIO has one model ready for your review.",
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
