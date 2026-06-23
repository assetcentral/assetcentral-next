// Sample data for the /model, /monitor and /manage pillar pages.
//
// These are illustrative numbers — never live, never personalised.
// The visuals that consume them must clearly label the output as
// "Example portfolio" or "Sample AssetCentral output" and include
// the compliance note exported below. Treat the figures as a
// design system, not a source of truth.

export type DebtRisk = "Low" | "Medium" | "High";
export type ActionStatus =
  | "To do"
  | "In progress"
  | "Waiting"
  | "Draft";
export type DocStatus = "Requested" | "Missing" | "Uploaded" | "Needed";
export type Priority = "High" | "Medium" | "Low";
export type AiTone = "neutral" | "positive" | "watch";
export type AgentKey = "CIO" | "CFO" | "CEO" | "COO" | "PA";

export const EXAMPLE_DISCLAIMER =
  "Example only. AssetCentral provides decision-support tools and information, not financial, tax, legal or investment advice.";

// ────────────────────────────────────────────────────────────────
// /model — the property we model end-to-end
// ────────────────────────────────────────────────────────────────

export const SAMPLE_PROPERTY = {
  name: "Dubai Marina Apartment",
  type: "2-bed apartment",
  currency: "AED",
  inputs: [
    { label: "Current value", value: "AED 2,350,000", kind: "value" as const },
    { label: "Annual rent", value: "AED 145,000", kind: "income" as const },
    { label: "Mortgage balance", value: "AED 920,000", kind: "debt" as const },
    { label: "Service charges", value: "AED 28,000", kind: "cost" as const },
    { label: "Management fees", value: "AED 7,250", kind: "cost" as const },
    {
      label: "Estimated net income before debt",
      value: "AED 109,750",
      kind: "calc" as const,
    },
    { label: "Gross yield", value: "6.2%", kind: "calc" as const },
    { label: "Net yield before debt", value: "4.7%", kind: "calc" as const },
  ],
  context: [
    { label: "Purchase price", value: "AED 1,850,000" },
    { label: "Occupancy", value: "96%" },
  ],
};

export interface ScenarioRow {
  label: string;
  cashflow12m: number;
  cashflowDisplay: string;
  fiveYear: string;
  fiveYearWeight: number; // 0–1 for the bar
  risk: string;
  aiView: string;
  aiTone: AiTone;
}

export const SAMPLE_SCENARIOS: ScenarioRow[] = [
  {
    label: "Hold as-is",
    cashflow12m: 42_000,
    cashflowDisplay: "AED 42,000",
    fiveYear: "Moderate",
    fiveYearWeight: 0.5,
    risk: "Service charge increase",
    aiView: "Monitor",
    aiTone: "neutral",
  },
  {
    label: "Refinance",
    cashflow12m: 58_000,
    cashflowDisplay: "AED 58,000",
    fiveYear: "Moderate",
    fiveYearWeight: 0.6,
    risk: "Rate availability",
    aiView: "Review offers",
    aiTone: "positive",
  },
  {
    label: "Improve and raise rent",
    cashflow12m: 64_000,
    cashflowDisplay: "AED 64,000",
    fiveYear: "Higher",
    fiveYearWeight: 0.8,
    risk: "Capex execution",
    aiView: "Model capex",
    aiTone: "positive",
  },
  {
    label: "Sell and reinvest",
    cashflow12m: 0,
    cashflowDisplay: "AED 0 income",
    fiveYear: "Depends on reinvestment",
    fiveYearWeight: 0.45,
    risk: "Exit price",
    aiView: "Compare alternatives",
    aiTone: "watch",
  },
];

export const MODEL_DATA_COMPLETENESS = {
  readiness: 82,
  complete: [
    "Rent",
    "Purchase price",
    "Mortgage balance",
    "Service charges",
  ],
  missing: [
    "Latest valuation",
    "Current mortgage rate",
    "Tenancy end date",
  ],
};

export interface RoleContribution {
  agent: AgentKey;
  fullName: string;
  body: string;
}

export const MODEL_ROLE_CONTRIBUTIONS: RoleContribution[] = [
  {
    agent: "CIO",
    fullName: "Chief Investment Officer",
    body: "Runs the multi-year underwrite — hold, sell, refinance, reposition — with unlevered and levered IRR per scenario.",
  },
  {
    agent: "CFO",
    fullName: "Chief Financial Officer",
    body: "Stress-tests each scenario for DSCR, rate-shock at +200bps and capital runway under voids or capex.",
  },
  {
    agent: "CEO",
    fullName: "Chief Executive Officer",
    body: "Ranks the scenarios against portfolio priorities and writes the IC memo if you need to raise.",
  },
  {
    agent: "PA",
    fullName: "Personal Assistant",
    body: "Parses inbound documents (PDF, image, Excel, voice) and files every source so the model is audit-ready.",
  },
];

// ────────────────────────────────────────────────────────────────
// /monitor — a sample 5-property portfolio under continuous watch
// ────────────────────────────────────────────────────────────────

export interface PortfolioRow {
  property: string;
  location: string;
  netYield: number;
  monthlyCashflowDisplay: string;
  occupancy: number;
  debtRisk: DebtRisk;
  dataCompleteness: number;
  alert: string;
}

export const SAMPLE_PORTFOLIO: PortfolioRow[] = [
  {
    property: "Dubai Marina Apt",
    location: "Dubai, UAE",
    netYield: 4.7,
    monthlyCashflowDisplay: "AED 3,500",
    occupancy: 96,
    debtRisk: "Medium",
    dataCompleteness: 82,
    alert: "Refinance review",
  },
  {
    property: "Downtown Dubai Apt",
    location: "Dubai, UAE",
    netYield: 5.6,
    monthlyCashflowDisplay: "AED 5,200",
    occupancy: 98,
    debtRisk: "Low",
    dataCompleteness: 91,
    alert: "Rent benchmark due",
  },
  {
    property: "JVC Townhouse",
    location: "Dubai, UAE",
    netYield: 6.1,
    monthlyCashflowDisplay: "AED 7,100",
    occupancy: 94,
    debtRisk: "Low",
    dataCompleteness: 88,
    alert: "Service charges rising",
  },
  {
    property: "London Flat",
    location: "London, UK",
    netYield: 3.2,
    monthlyCashflowDisplay: "£420",
    occupancy: 100,
    debtRisk: "High",
    dataCompleteness: 76,
    alert: "Mortgage reset soon",
  },
  {
    property: "Abu Dhabi Apt",
    location: "Abu Dhabi, UAE",
    netYield: 5.0,
    monthlyCashflowDisplay: "AED 4,250",
    occupancy: 92,
    debtRisk: "Medium",
    dataCompleteness: 69,
    alert: "Missing lease document",
  },
];

export const SAMPLE_KPIS = [
  { label: "Portfolio value", value: "AED 12.8m", note: "across 5 properties" },
  { label: "Average net yield", value: "5.1%", note: "monthly recalculation" },
  {
    label: "Monthly cash flow",
    value: "AED 24,700",
    note: "after debt service",
  },
  {
    label: "Actions requiring attention",
    value: "7",
    note: "open across the portfolio",
  },
] as const;

export interface AlertRow {
  trigger: string;
  checks: string;
  example: string;
}

export const SAMPLE_ALERTS: AlertRow[] = [
  {
    trigger: "Loan reset",
    checks: "Mortgage date and current cost",
    example: "Mortgage review due in 90 days",
  },
  {
    trigger: "Rent review",
    checks: "Rent vs. last known rent and lease date",
    example: "Rent benchmark needed",
  },
  {
    trigger: "Vacancy risk",
    checks: "Tenancy end date and occupancy",
    example: "Lease expires in 63 days",
  },
  {
    trigger: "Cost increase",
    checks: "Service charges and recurring expenses",
    example: "Service charges up 12%",
  },
  {
    trigger: "Missing data",
    checks: "Incomplete property profile",
    example: "Mortgage rate missing",
  },
  {
    trigger: "Underperformance",
    checks: "Yield below portfolio average",
    example: "Net yield 1.9% below average",
  },
];

export const CFO_MONITORING_WATCHLIST = [
  "Net yield",
  "Cash flow",
  "Debt",
  "Liquidity",
  "Refinancing dates",
  "Costs",
] as const;

export const COO_MONITORING_WATCHLIST = [
  "Lease expiry",
  "Occupancy",
  "Property manager performance",
  "Maintenance",
  "Documents",
  "Action execution",
] as const;

// ────────────────────────────────────────────────────────────────
// /manage — actions, the workflow that produces them, deliverables
// ────────────────────────────────────────────────────────────────

export interface ActionRow {
  priority: Priority;
  action: string;
  property: string;
  owner: AgentKey;
  reason: string;
  impact: string;
  status: ActionStatus;
}

export const SAMPLE_ACTIONS: ActionRow[] = [
  {
    priority: "High",
    action: "Request refinance terms",
    property: "London Flat",
    owner: "CFO",
    reason: "Mortgage reset in 90 days",
    impact: "Protect £420/month cash flow",
    status: "In progress",
  },
  {
    priority: "High",
    action: "Benchmark rent",
    property: "Downtown Dubai Apt",
    owner: "COO",
    reason: "Lease renewal approaching",
    impact: "Potential AED 9,000/year uplift",
    status: "To do",
  },
  {
    priority: "Medium",
    action: "Upload lease document",
    property: "Abu Dhabi Apt",
    owner: "PA",
    reason: "Missing tenancy data",
    impact: "Complete monitoring profile",
    status: "Waiting",
  },
  {
    priority: "Medium",
    action: "Model renovation case",
    property: "JVC Townhouse",
    owner: "CIO",
    reason: "Rent upside opportunity",
    impact: "Test AED 75,000 capex",
    status: "To do",
  },
  {
    priority: "Low",
    action: "Review sale scenario",
    property: "Dubai Marina Apt",
    owner: "CEO",
    reason: "Equity concentration",
    impact: "Compare exit vs. hold",
    status: "Draft",
  },
];

export const MANAGEMENT_WORKFLOW = [
  {
    step: "Insight detected",
    body: "A monitor fires — drift, alert, anomaly, threshold crossed.",
    agent: "CFO" as const,
  },
  {
    step: "AI team reviews",
    body: "CFO, CIO and COO look at the same signal from different angles.",
    agent: "CIO" as const,
  },
  {
    step: "Priority assigned",
    body: "The CEO ranks it against portfolio priorities for the quarter.",
    agent: "CEO" as const,
  },
  {
    step: "Task created",
    body: "An action lands in the queue with owner, reason and expected impact.",
    agent: "PA" as const,
  },
  {
    step: "Owner approves",
    body: "You stay in control. Nothing is acted on without you saying yes.",
    agent: "CEO" as const,
  },
  {
    step: "Action tracked",
    body: "The PA chases follow-ups, documents and status until the task closes.",
    agent: "PA" as const,
  },
  {
    step: "Portfolio impact reviewed",
    body: "The CFO measures the result against the expected impact.",
    agent: "CFO" as const,
  },
];

export const CEO_WEEKLY_BRIEFING = [
  "Refinance review required for London Flat before the mortgage reset.",
  "Rent benchmark recommended for Downtown Dubai before lease renewal.",
  "Abu Dhabi Apt has incomplete tenancy data, reducing monitoring accuracy.",
  "JVC Townhouse may justify a renovation scenario if rent uplift exceeds target threshold.",
  "Dubai Marina has high trapped equity and should be reviewed in the next quarterly strategy session.",
];

export interface MissingDocRow {
  item: string;
  property: string;
  why: string;
  owner: AgentKey;
  status: DocStatus;
}

export const SAMPLE_MISSING_DOCS: MissingDocRow[] = [
  {
    item: "Latest mortgage statement",
    property: "London Flat",
    why: "Required for refinance model",
    owner: "PA",
    status: "Requested",
  },
  {
    item: "Tenancy agreement",
    property: "Abu Dhabi Apt",
    why: "Required for lease monitoring",
    owner: "PA",
    status: "Missing",
  },
  {
    item: "Service charge statement",
    property: "JVC Townhouse",
    why: "Required for net yield",
    owner: "CFO",
    status: "Uploaded",
  },
  {
    item: "Broker valuation",
    property: "Dubai Marina Apt",
    why: "Required for sell scenario",
    owner: "CIO",
    status: "Needed",
  },
];

export const BEFORE_AC = [
  "Spreadsheet out of date",
  "Documents in emails and WhatsApp",
  "No clear action list",
  "Decisions made property by property",
  "Hard to see what matters first",
];

export const WITH_AC = [
  "Structured portfolio data",
  "AI-generated priorities",
  "Clear action owner",
  "Missing information tracked",
  "Decisions linked to financial impact",
  "Portfolio-level view",
];
