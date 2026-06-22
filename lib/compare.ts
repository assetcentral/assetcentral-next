// /compare/* — central data source for the comparison landing pages.
//
// One config per comparison feeds the shared <ComparisonPage> template
// at /compare/[slug]. The index at /compare/ pulls the same configs to
// render the 5-card grid. Keeping the editorial copy in one file means
// the five surfaces stay consistent and the page wrappers stay one-line.
//
// Positioning, per the task brief:
//   "Spreadsheets and tools help you store information.
//    AssetCentral helps turn property data into decisions."
//
// Compliance language baked into every page (hero + FAQ):
//   "AssetCentral provides decision-support tools and information.
//    It does not provide financial, tax, legal or investment advice."

export type CompareSlug =
  | "assetcentral-vs-spreadsheets"
  | "assetcentral-vs-property-management-software"
  | "assetcentral-vs-accounting-software"
  | "assetcentral-vs-broker-valuation"
  | "assetcentral-vs-family-office";

export interface CompareConfig {
  /** Route segment under /compare/. */
  slug: CompareSlug;
  /** Short label used in nav breadcrumbs + cross-link cards. */
  shortLabel: string;
  /** What's being compared to AssetCentral (sentence-case). */
  otherName: string;
  /** Card text on the /compare/ index page. */
  cardText: string;
  /** CTA label on the index card. */
  cardCta: string;
  /** Detail-page SEO title. */
  metaTitle: string;
  /** Detail-page meta description. */
  metaDescription: string;
  /** Detail-page H1. */
  h1: string;
  /** Hero subheadline — one or two sentences. */
  subheadline: string;
  /** Two-or-three-sentence positioning block above the table. */
  positioning: string;
  /** Bullet list of the other tool's typical strengths/limits. */
  otherPoints: string[];
  /** Bullet list of AssetCentral's contributions on the same axis. */
  acPoints: string[];
  /** Optional clarifier — fairness/compliance note (e.g. "AssetCentral
   *  does not replace professional valuation advice"). Rendered as a
   *  muted block below the positioning. */
  clarify?: string;
  /** Summary comparison table — 9 standard dimensions. */
  summaryRows: {
    dimension: string;
    other: string;
    assetcentral: string;
  }[];
  /** "When to use each option" pair. */
  whenToUse: { useOther: string; useAc: string };
  /** Example owner scenario — short, realistic. */
  scenario: { title: string; body: string };
  /** 5-7 FAQs feeding both the on-page accordion and the JSON-LD. */
  faqs: { question: string; answer: string }[];
  /** Primary hero CTA label. */
  ctaPrimary: string;
}

const DISCLAIMER =
  "AssetCentral provides decision-support tools and information. It does not provide financial, tax, legal or investment advice.";

// ── 1. SPREADSHEETS ─────────────────────────────────────────────────────────
const SPREADSHEETS: CompareConfig = {
  slug: "assetcentral-vs-spreadsheets",
  shortLabel: "vs Spreadsheets",
  otherName: "Spreadsheets",
  cardText:
    "Spreadsheets are flexible but fragile. AssetCentral structures property data, monitors performance and helps identify what to do next.",
  cardCta: "Compare with spreadsheets",
  metaTitle:
    "AssetCentral vs Spreadsheets for Property Portfolio Management",
  metaDescription:
    "Compare AssetCentral with spreadsheets for managing property portfolios. See how AI helps owners model returns, monitor cash flow and manage actions.",
  h1: "AssetCentral vs spreadsheets for property owners",
  subheadline:
    "Spreadsheets store information. AssetCentral turns property data into decisions — with structured records, live yield, scenario modelling and an AI team that interprets the portfolio.",
  positioning:
    "Spreadsheets are flexible but fragile. They are useful for recording data, but poor at keeping portfolio information live, structured and decision-ready. The minute a rent changes, a rate resets or a service-charge demand arrives, the file drifts out of date — and the decisions that depend on it drift with it.",
  otherPoints: [
    "Manual updates every time something changes",
    "Easy to break formulas across linked sheets",
    "Hard to attach and track documents alongside the data",
    "No automatic missing-data detection",
    "Poor collaboration — emailed copies multiply",
    "No built-in decision logic",
    "No AI team to interpret the portfolio for you",
  ],
  acPoints: [
    "Structured property records per asset",
    "Live yield and cash-flow visibility across the portfolio",
    "Scenario modelling for hold, sell, refinance and acquire",
    "Missing-data prompts when the model is incomplete",
    "Action tracking with follow-up reminders",
    "AI team interpretation of every number",
    "Portfolio-level priorities ranked by yield impact",
  ],
  summaryRows: [
    {
      dimension: "Primary purpose",
      other: "Free-form data recording",
      assetcentral: "Property portfolio intelligence + decision support",
    },
    {
      dimension: "Best for",
      other: "One property, low complexity",
      assetcentral: "2–50 properties, mixed currencies, mixed jurisdictions",
    },
    {
      dimension: "Strengths",
      other: "Flexible layout, low cost",
      assetcentral: "Structured data + AI team + scenario modelling",
    },
    {
      dimension: "Limitations",
      other: "Manual upkeep, fragile formulas",
      assetcentral: "Not a free-form tool — works against a structured property model",
    },
    {
      dimension: "Owner decision support",
      other: "None — you build the logic yourself",
      assetcentral: "Ranked priorities + suggested next actions",
    },
    {
      dimension: "AI support",
      other: "None",
      assetcentral: "Five-agent AI team — CIO, CFO, CEO, COO, PA",
    },
    {
      dimension: "Portfolio visibility",
      other: "What you remember to update",
      assetcentral: "Live yield, cash flow, debt and occupancy",
    },
    {
      dimension: "Scenario modelling",
      other: "Manual formulas per scenario",
      assetcentral: "Hold/sell/refinance/acquire scenarios built in",
    },
    {
      dimension: "Action tracking",
      other: "Notes column, easy to lose",
      assetcentral: "Tasks, reminders and follow-ups",
    },
  ],
  whenToUse: {
    useOther:
      "Use spreadsheets when you have one property and want maximum flexibility, or when you need a quick one-off calculation outside any structured model.",
    useAc:
      "Use AssetCentral when you manage several properties and need a clear, live view of performance, risk and the next action across the whole portfolio.",
  },
  scenario: {
    title: "A UAE owner with 8 properties",
    body:
      "A UAE owner has 8 properties across Dubai and Abu Dhabi. Rent, mortgage, service charges and tenancy dates are scattered across three spreadsheets, a forwarded email folder and a stack of PDFs. AssetCentral structures the portfolio into one model, flags every missing field (purchase date on three properties, rate-reset date on two), calculates net yield per asset and across the blend, and highlights which two properties are dragging the yield average and why.",
  },
  faqs: [
    {
      question: "Is AssetCentral better than a spreadsheet for property portfolios?",
      answer:
        "For one property, a spreadsheet can be fine. For 2–50 properties — especially across multiple cities, currencies or tax regimes — AssetCentral structures the data, keeps it live, and adds the layer a spreadsheet cannot: an AI team that interprets the numbers and surfaces what to act on first.",
    },
    {
      question: "Can I import my existing spreadsheet into AssetCentral?",
      answer:
        "Yes. The import wizard accepts Excel and CSV — even messy ones with merged cells, footer rows or inconsistent columns. AI maps your columns to AssetCentral's property model, shows you the mapping for review, and confirms each row before saving.",
    },
    {
      question: "What if I don't have all the inputs a structured model needs?",
      answer:
        "AssetCentral fills gaps from market data (rates, comparable rents, typical service charges) and flags every assumption so you can override the ones that matter. You don't need a complete dataset to start — the PA prompts for missing fields as you go.",
    },
    {
      question: "Will I still need spreadsheets after switching?",
      answer:
        "For one-off scratch work, probably yes — spreadsheets remain useful for ad-hoc analysis. For your portfolio-of-record, AssetCentral replaces the spreadsheet that was being asked to do too much.",
    },
    {
      question: "Is AssetCentral safe to use with sensitive property data?",
      answer:
        "Property records are stored in your private AssetCentral account, encrypted in transit and at rest, and never shared with third parties without your action.",
    },
    {
      question: "Does AssetCentral give financial or tax advice?",
      answer: DISCLAIMER,
    },
  ],
  ctaPrimary: "Move beyond spreadsheets",
};

// ── 2. PROPERTY MANAGEMENT SOFTWARE ─────────────────────────────────────────
const PMS: CompareConfig = {
  slug: "assetcentral-vs-property-management-software",
  shortLabel: "vs Property Management Software",
  otherName: "Property management software",
  cardText:
    "Property management software is often built for tenant operations. AssetCentral is built for owner-side portfolio intelligence.",
  cardCta: "Compare with property management software",
  metaTitle: "AssetCentral vs Property Management Software for Owners",
  metaDescription:
    "Property management software helps manage tenants and operations. AssetCentral helps owners understand portfolio returns, cash flow and investment decisions.",
  h1: "AssetCentral vs property management software",
  subheadline:
    "Property management software is built for the manager-side workflow — tenants, tickets, rent collection. AssetCentral is built for the owner-side question: what is this portfolio worth, how is it performing, and what should I do next?",
  positioning:
    "Traditional property management software is often built for property managers, letting agents or operational workflows. AssetCentral is built for the owner's portfolio intelligence layer. The two solve different problems for different people — and the cleanest setup usually has both.",
  otherPoints: [
    "Tenant operations and tenant communication",
    "Maintenance tickets and contractor dispatch",
    "Rent collection and arrears chasing",
    "Letting-agent workflows and listing management",
    "Unit-level operations and occupancy logging",
  ],
  acPoints: [
    "Owner-side performance view across every property",
    "Net yield and cash flow per property and blended",
    "Debt and refinance tracking with rate-reset alerts",
    "Investment modelling — hold, sell, refinance, acquire",
    "Portfolio priorities ranked by yield impact",
    "AI family-office team available 24/7",
  ],
  clarify:
    "AssetCentral can complement property management software. It does not necessarily replace operational property management systems — keep your manager's tools for ticket dispatch and tenant comms, and use AssetCentral to see the owner-side picture across every property.",
  summaryRows: [
    {
      dimension: "Primary purpose",
      other: "Operating the property day-to-day",
      assetcentral: "Understanding the portfolio's owner-side performance",
    },
    {
      dimension: "Best for",
      other: "Property managers and letting agents",
      assetcentral: "Owners and investors with 2–50 properties",
    },
    {
      dimension: "Strengths",
      other: "Tenant ops, tickets, rent collection",
      assetcentral: "Yield, debt, scenarios, ranked priorities",
    },
    {
      dimension: "Limitations",
      other: "Limited portfolio-level insight for owners",
      assetcentral: "Doesn't dispatch contractors or chase arrears",
    },
    {
      dimension: "Owner decision support",
      other: "Operational reporting only",
      assetcentral: "Ranked actions across the portfolio",
    },
    {
      dimension: "AI support",
      other: "Rare — mostly rule-based automations",
      assetcentral: "Five-agent AI team interpreting your portfolio",
    },
    {
      dimension: "Portfolio visibility",
      other: "Unit-level, manager-side",
      assetcentral: "Portfolio-level, owner-side",
    },
    {
      dimension: "Scenario modelling",
      other: "Generally not included",
      assetcentral: "Built in — hold, sell, refinance, acquire",
    },
    {
      dimension: "Action tracking",
      other: "Operational tickets",
      assetcentral: "Investment + financial + operational actions",
    },
  ],
  whenToUse: {
    useOther:
      "Use property management software when you have a single property manager handling tenant operations on your behalf, or you self-manage and need a system of record for tickets, rent and contractors.",
    useAc:
      "Use AssetCentral when you want one owner-side view across every property — regardless of which manager, agent or tool handles operations on each individual asset.",
  },
  scenario: {
    title: "An owner with three different managers",
    body:
      "An owner with six properties uses three different managers — one for the two Dubai units, one for the London flat, and self-management for three Lisbon apartments. Each manager has their own portal, their own format and their own report cycle. AssetCentral pulls the relevant statements, leases and rent data from all three into one owner-side model — the COO flags response-time drift on one manager, the CFO calculates blended net yield, and the CEO ranks the next three actions.",
  },
  faqs: [
    {
      question: "Does AssetCentral replace property management software?",
      answer:
        "Not for tenant operations. Property management software handles the manager-side workflow — tenant comms, tickets, rent collection. AssetCentral handles the owner-side question — what's the portfolio worth, what's it earning, what to do next. Most owners keep both.",
    },
    {
      question: "Can AssetCentral talk to my property manager's system?",
      answer:
        "AssetCentral reads statements, leases, invoices and rent reports — drop them onto the dashboard, forward them by email or upload via WhatsApp. The PA extracts the data into the property model. Native integrations with the larger property management platforms are on the roadmap.",
    },
    {
      question: "Is AssetCentral for landlords or for property managers?",
      answer:
        "Owners. AssetCentral is built for the person on the deed, paying the mortgage and taking the rental income. Property managers handle the day-to-day operations on the ground; the CFO and COO give you the view across every manager's work without checking five different agent portals.",
    },
    {
      question: "What if I self-manage?",
      answer:
        "AssetCentral still earns its keep — self-managers often need the portfolio-level view more than anyone, because there's no manager between them and the data. The COO surfaces operational drift, the CFO holds the live yield, and the PA keeps documents in one place.",
    },
    {
      question: "Does AssetCentral handle tenant communication?",
      answer:
        "Not directly. The PA can draft messages for renewal letters or manager queries, but sending stays with you or your manager. AssetCentral doesn't act on the portfolio without your sign-off.",
    },
    {
      question: "Does AssetCentral give financial advice?",
      answer: DISCLAIMER,
    },
  ],
  ctaPrimary: "See the owner-side portfolio layer",
};

// ── 3. ACCOUNTING SOFTWARE ──────────────────────────────────────────────────
const ACCOUNTING: CompareConfig = {
  slug: "assetcentral-vs-accounting-software",
  shortLabel: "vs Accounting Software",
  otherName: "Accounting software",
  cardText:
    "Accounting software records what happened. AssetCentral helps interpret what the numbers mean for property decisions.",
  cardCta: "Compare with accounting software",
  metaTitle: "AssetCentral vs Accounting Software for Property Owners",
  metaDescription:
    "Accounting software records transactions. AssetCentral helps property owners interpret portfolio performance, model scenarios and manage return-improving actions.",
  h1: "AssetCentral vs accounting software",
  subheadline:
    "Accounting software tells you what happened financially. AssetCentral helps you understand what it means for property-level and portfolio-level decisions — and what to do about it next.",
  positioning:
    "Accounting software tells you what happened financially — last quarter's profit and loss, the year's tax return, the historical transaction record. AssetCentral helps you understand what those numbers mean for property-level and portfolio-level decisions, and turns them into a ranked next-action list.",
  otherPoints: [
    "Bookkeeping and double-entry transaction records",
    "Tax-preparation support and statutory reporting",
    "Profit and loss across the business",
    "Historical financial reporting",
    "Receipts, invoices and bank reconciliation",
  ],
  acPoints: [
    "Property-level return analysis (net yield, IRR, cash-on-cash)",
    "Live cash-flow visibility per property and blended",
    "Scenario modelling — hold, sell, refinance, acquire",
    "Debt and refinancing impact on portfolio yield",
    "Operational and financial action list",
    "Owner decision support via the AI team",
  ],
  clarify:
    "AssetCentral is not a replacement for accounting software or professional tax advice. Keep your accounting system for the books and your accountant for tax — and use AssetCentral as the decision-support and portfolio intelligence layer on top.",
  summaryRows: [
    {
      dimension: "Primary purpose",
      other: "Bookkeeping + tax preparation",
      assetcentral: "Owner decision support + portfolio intelligence",
    },
    {
      dimension: "Best for",
      other: "Compliance and statutory reporting",
      assetcentral: "Investment decisions across 2–50 properties",
    },
    {
      dimension: "Strengths",
      other: "Audit trail, tax-ready records",
      assetcentral: "Forward-looking scenarios + AI interpretation",
    },
    {
      dimension: "Limitations",
      other: "Backward-looking, no decision logic",
      assetcentral: "Not a books-of-record system",
    },
    {
      dimension: "Owner decision support",
      other: "P&L and balance sheet only",
      assetcentral: "Ranked actions per property and portfolio-wide",
    },
    {
      dimension: "AI support",
      other: "Limited — mostly receipt-OCR",
      assetcentral: "Five-agent AI team — CFO leads on the financial picture",
    },
    {
      dimension: "Portfolio visibility",
      other: "Aggregate financials",
      assetcentral: "Per-property yield, cash flow and equity",
    },
    {
      dimension: "Scenario modelling",
      other: "Not included",
      assetcentral: "Built in — hold, sell, refinance, acquire",
    },
    {
      dimension: "Action tracking",
      other: "Bills-to-pay reminders",
      assetcentral: "Investment + operational + financial actions",
    },
  ],
  whenToUse: {
    useOther:
      "Use accounting software for bookkeeping, tax preparation and statutory reporting. Your accountant or finance team needs it; your tax authority requires the audit trail.",
    useAc:
      "Use AssetCentral to interpret what those financial numbers mean for property decisions — which asset to refinance first, which one is dragging the yield blend, where the next capital should land.",
  },
  scenario: {
    title: "A landlord with accountant-ready books and no portfolio view",
    body:
      "A landlord with 5 properties has clean books in Xero — every transaction reconciled, the annual return filed on time. But when she asks 'which property should I refinance first?' or 'is the Manchester unit really under-renting?' the accounting system can only show last year's P&L. AssetCentral takes the same transaction data and turns it into a live yield-per-property view, flags the rate-reset window on the Manchester mortgage, and ranks the next three actions for the quarter.",
  },
  faqs: [
    {
      question: "Does AssetCentral replace accounting software?",
      answer:
        "No. Accounting software handles the books and the tax return — keep yours. AssetCentral sits on top as the decision-support layer, turning what the accountant records into a forward-looking portfolio view.",
    },
    {
      question: "Can AssetCentral export to my accountant?",
      answer:
        "Yes — portfolio summaries, per-property financial reports and cashflow exports can be generated as PDF or Word documents and shared with your accountant. AssetCentral doesn't push entries into your books; that path stays with your accounting system.",
    },
    {
      question: "Does AssetCentral handle VAT or corporation tax?",
      answer:
        "AssetCentral captures VAT on operator statements where it appears, and surfaces structural tax considerations (ownership-comparator calculator, country tax rules in the resources hub). It does not file returns or provide tax advice — that stays with your accountant.",
    },
    {
      question: "Is AssetCentral useful if I already have a strong accountant?",
      answer:
        "Yes — the two roles don't overlap. An accountant closes the books and prepares the return. AssetCentral helps you see, ahead of time, which decisions are coming up and how to model them. Most users find the conversation with their accountant gets sharper once AssetCentral is in the loop.",
    },
    {
      question: "What about property-specific accounting features like rent ledgers?",
      answer:
        "Rent ledgers, vacancy logs and operator statements all live on each property's record. They feed the CFO's net-yield calculation and the COO's lease tracking, alongside the broader portfolio model.",
    },
    {
      question: "Does AssetCentral give tax advice?",
      answer: DISCLAIMER,
    },
  ],
  ctaPrimary: "Turn property numbers into decisions",
};

// ── 4. BROKER VALUATION ─────────────────────────────────────────────────────
const BROKER: CompareConfig = {
  slug: "assetcentral-vs-broker-valuation",
  shortLabel: "vs Broker Valuation",
  otherName: "Broker valuation",
  cardText:
    "Broker valuations estimate sale price. AssetCentral helps model hold, sell, refinance and improve scenarios.",
  cardCta: "Compare with broker valuation",
  metaTitle: "AssetCentral vs Broker Valuation for Property Owners",
  metaDescription:
    "Broker valuations estimate sale price. AssetCentral helps property owners compare hold, sell, refinance and improve scenarios using portfolio data.",
  h1: "AssetCentral vs broker valuation",
  subheadline:
    "A broker valuation answers one question — what might this property sell for? AssetCentral helps you answer the question that comes next: should I actually sell it, or hold, refinance or improve it?",
  positioning:
    "A broker valuation is useful, but it usually answers one question: what might this property sell for? AssetCentral helps owners understand whether selling, holding, refinancing or improving the property makes sense in the wider portfolio — and uses the broker's number as one input among several, not the whole answer.",
  otherPoints: [
    "Estimated sale price for this property",
    "Local market feedback from a transacting agent",
    "Transaction-focused — written to sell",
    "Useful when an exit decision is already taken",
    "Comparable-driven, point-in-time",
  ],
  acPoints: [
    "Hold-versus-sell scenario modelling",
    "Refinance impact on cash flow and equity",
    "Net yield comparison if rent rises 5% vs flat",
    "Equity released and reinvestment assumptions",
    "Portfolio impact — what selling does to the blend",
    "Action plan if you decide to sell, or to hold",
  ],
  clarify:
    "AssetCentral does not replace professional valuation advice. It helps owners use the broker's valuation as one input inside a broader decision model that includes yield, debt, equity, opportunity cost and portfolio impact.",
  summaryRows: [
    {
      dimension: "Primary purpose",
      other: "Estimate sale price",
      assetcentral: "Model whether to sell, hold, refinance or improve",
    },
    {
      dimension: "Best for",
      other: "Owners actively planning a sale",
      assetcentral: "Owners weighing options before deciding",
    },
    {
      dimension: "Strengths",
      other: "Local market knowledge, comparable evidence",
      assetcentral: "Side-by-side scenarios with portfolio impact",
    },
    {
      dimension: "Limitations",
      other: "One number, one decision lens",
      assetcentral: "Does not replace the broker's market view",
    },
    {
      dimension: "Owner decision support",
      other: "Limited — focused on sale path",
      assetcentral: "Full decision matrix across all four options",
    },
    {
      dimension: "AI support",
      other: "None",
      assetcentral: "CIO models scenarios, CFO computes the financial impact",
    },
    {
      dimension: "Portfolio visibility",
      other: "Single-asset focus",
      assetcentral: "Portfolio-level — what each option does to the blend",
    },
    {
      dimension: "Scenario modelling",
      other: "Not included",
      assetcentral: "Hold, sell, refinance, improve — with IRR + cash-on-cash",
    },
    {
      dimension: "Action tracking",
      other: "Not included",
      assetcentral: "Next-step list per scenario",
    },
  ],
  whenToUse: {
    useOther:
      "Use a broker valuation when you are close to a sale decision and need a market-grounded number for an asking price or negotiation.",
    useAc:
      "Use AssetCentral before the broker call to weigh up the alternatives — selling, refinancing, improving rents — and to understand which path produces the best outcome for the whole portfolio, not just this asset.",
  },
  scenario: {
    title: "A Dubai Marina apartment with a broker valuation in hand",
    body:
      "A Dubai Marina apartment receives a broker valuation of AED 2.1M. AssetCentral takes that number as one input and models four scenarios side-by-side: sell at the valuation and reinvest the equity in a JVC two-bedroom; refinance against the equity and keep the rental income; hold without changes and review in 24 months; or improve the unit with a fit-out targeting 12% higher rent. Each scenario returns IRR, cash-on-cash and the impact on portfolio blended yield. The owner sees that refinance-and-hold produces the strongest five-year return at current rates — and the broker's number stays useful as a benchmark.",
  },
  faqs: [
    {
      question: "Can AssetCentral replace a broker valuation?",
      answer:
        "No. A broker brings local market knowledge and transaction experience that an AI model can't replicate. AssetCentral uses the broker's valuation as one input among several when modelling whether selling is the right call versus holding, refinancing or improving.",
    },
    {
      question: "Does AssetCentral predict property prices?",
      answer:
        "AssetCentral surfaces comparable market data and rent benchmarks to pressure-test the assumptions in your scenarios. It does not produce a single point-estimate sale price — that's the broker's job. The output is the decision around the price, not the price itself.",
    },
    {
      question: "What inputs do I need to model a sale decision?",
      answer:
        "At minimum: current rent, mortgage balance and rate, the broker valuation (or a market estimate), and a target hold period. AssetCentral fills the gaps from your portfolio data and market benchmarks, and flags every assumption you can override.",
    },
    {
      question: "Can I compare selling versus refinancing?",
      answer:
        "Yes — the CIO runs both scenarios side-by-side over a 5-year horizon: capital released, cash-on-cash, IRR, portfolio yield impact and the assumption set. The output reads as a decision matrix, not a single number.",
    },
    {
      question: "Does AssetCentral connect to brokers directly?",
      answer:
        "Not yet. You enter the broker valuation manually or paste their report into the property record; the PA extracts the relevant figures. Direct broker integrations are on the roadmap.",
    },
    {
      question: "Does AssetCentral give investment advice?",
      answer: DISCLAIMER,
    },
  ],
  ctaPrimary: "Model the decision before you sell",
};

// ── 5. FAMILY OFFICE ────────────────────────────────────────────────────────
const FAMILY_OFFICE: CompareConfig = {
  slug: "assetcentral-vs-family-office",
  shortLabel: "vs Family Office",
  otherName: "Traditional family office",
  cardText:
    "Traditional family office support is expensive and human-led. AssetCentral gives smaller private owners an AI-native property team.",
  cardCta: "Compare with family office",
  metaTitle: "AssetCentral vs Family Office for Property Owners",
  metaDescription:
    "AssetCentral gives private property owners access to AI-native portfolio support inspired by family office disciplines: modelling, monitoring and managing property decisions.",
  h1: "AssetCentral vs a traditional family office",
  subheadline:
    "Traditional family office support has historically been available only to very wealthy individuals. AssetCentral applies the same disciplines — Model, Monitor, Manage — through an AI-native team available to private owners with 2 to 50 properties.",
  positioning:
    "Traditional family office support is usually available only to very wealthy individuals or large portfolios — typically high seven or eight-figure asset bases and up. AssetCentral gives private owners with 2 to 50 properties access to an AI-native version of the same professional disciplines: modelling decisions, monitoring performance and managing actions.",
  otherPoints: [
    "Human advisers and analysts",
    "Bespoke service, relationship-led",
    "Significant cost — often six figures per year",
    "Built for very large wealth bases",
    "Custom reporting cycles, in-person reviews",
  ],
  acPoints: [
    "AI-native five-agent property team",
    "Monthly subscription pricing (Individual €19, Pro €49)",
    "Structured portfolio data per property",
    "Model, Monitor, Manage workflows built in",
    "Available to smaller private owners",
    "Designed for 2 to 50 properties",
  ],
  clarify:
    "AssetCentral is not a legal, tax or investment adviser, and does not replace human professional advice on individual transactions. It provides decision-support tools and an AI operating layer for property portfolio management — bringing family-office-style discipline to private owners who would not otherwise have access.",
  summaryRows: [
    {
      dimension: "Primary purpose",
      other: "Bespoke wealth management",
      assetcentral: "AI-native property portfolio operating layer",
    },
    {
      dimension: "Best for",
      other: "Very large wealth bases",
      assetcentral: "Private owners with 2–50 properties",
    },
    {
      dimension: "Strengths",
      other: "Human judgement, full-service",
      assetcentral: "Always available, scales with the portfolio",
    },
    {
      dimension: "Limitations",
      other: "Expensive, relationship-dependent",
      assetcentral: "Does not replace professional advisers on individual transactions",
    },
    {
      dimension: "Owner decision support",
      other: "Full-service, bespoke",
      assetcentral: "Ranked decisions across the portfolio",
    },
    {
      dimension: "AI support",
      other: "Increasingly used internally",
      assetcentral: "Five-agent AI team is the product",
    },
    {
      dimension: "Portfolio visibility",
      other: "Curated, on review cycle",
      assetcentral: "Live, every day",
    },
    {
      dimension: "Scenario modelling",
      other: "On request, human-built",
      assetcentral: "Built in — hold, sell, refinance, acquire",
    },
    {
      dimension: "Action tracking",
      other: "Discussed in quarterly review",
      assetcentral: "Live action list, ranked + tracked",
    },
  ],
  whenToUse: {
    useOther:
      "Use a traditional family office if you have a complex multi-asset-class wealth base, significant private equity or trust structures, and the budget for a dedicated human team.",
    useAc:
      "Use AssetCentral if you own 2 to 50 properties as a private investor, want the same disciplines a family office brings to property, and need it at a monthly subscription price.",
  },
  scenario: {
    title: "A private investor with 12 properties below family-office scale",
    body:
      "A private investor with 12 properties across the UK, Portugal and the UAE has been quoted £40,000+ a year for a small family office to oversee the portfolio. AssetCentral gives the same disciplines through an AI team: the CIO models hold/sell/refinance scenarios on demand, the CFO tracks net yield and rate-reset windows, the COO watches occupancy and lease expiries, the PA keeps documents and reminders in one place, and the CEO ranks the week's three priorities — all on the €49/month tier.",
  },
  faqs: [
    {
      question: "Is AssetCentral a family office?",
      answer:
        "AssetCentral is an AI-native property operating layer that applies family-office disciplines — modelling, monitoring and managing — to private owners with 2 to 50 properties. It is not a regulated family office and does not provide bespoke human advisory services.",
    },
    {
      question: "Who is AssetCentral built for?",
      answer:
        "Private owners and investors managing approximately 2 to 50 properties — across single or multiple cities, currencies and ownership structures. Both self-managers and owners working with external managers benefit; AssetCentral sits at the owner's portfolio layer regardless.",
    },
    {
      question: "What does AssetCentral cost?",
      answer:
        "From €19/month for the Individual tier (up to 3 properties), €49/month for Pro (up to 50 properties), and €199/month for Team (2–5 users). Every tier includes a 7-day free trial, no card required.",
    },
    {
      question: "Will AssetCentral replace my accountant, lawyer or broker?",
      answer:
        "No. AssetCentral is the portfolio-intelligence layer; your accountant, lawyer and broker remain the professional advisers for tax, legal and transaction work. The product is built to make those professional conversations sharper, not to replace them.",
    },
    {
      question: "Is the AI making investment decisions for me?",
      answer:
        "No. The AI team presents ranked options with the reasoning behind each one, including the trade-offs. You make the call. Every output is decision support, not autopilot.",
    },
    {
      question: "Does AssetCentral give legal or tax advice?",
      answer: DISCLAIMER,
    },
  ],
  ctaPrimary: "Meet your AI property family office",
};

export const COMPARISONS: Record<CompareSlug, CompareConfig> = {
  "assetcentral-vs-spreadsheets": SPREADSHEETS,
  "assetcentral-vs-property-management-software": PMS,
  "assetcentral-vs-accounting-software": ACCOUNTING,
  "assetcentral-vs-broker-valuation": BROKER,
  "assetcentral-vs-family-office": FAMILY_OFFICE,
};

/** Stable ordering for index page + cross-link cards. */
export const COMPARISON_SLUGS: CompareSlug[] = [
  "assetcentral-vs-spreadsheets",
  "assetcentral-vs-property-management-software",
  "assetcentral-vs-accounting-software",
  "assetcentral-vs-broker-valuation",
  "assetcentral-vs-family-office",
];
