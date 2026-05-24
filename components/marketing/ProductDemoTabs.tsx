"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AlertBadge } from "./AlertBadge";
import { CashflowChart } from "./CashflowChart";
import { Money } from "./CurrencyProvider";
import { YieldBadge } from "./YieldBadge";

type TabKey = "portfolio" | "cashflow" | "intelligence" | "pa";

type Tab = {
  key: TabKey;
  label: string;
  caption: string;
};

const tabs: Tab[] = [
  {
    key: "portfolio",
    label: "Portfolio",
    caption:
      "Your entire portfolio — yield, debt, cashflow, documents — in one view. Every asset, every country, one base currency.",
  },
  {
    key: "cashflow",
    label: "Cashflow",
    caption:
      "Every payment due across every asset, 12 months ahead. No surprises. No missed stage payments.",
  },
  {
    key: "intelligence",
    label: "Intelligence",
    caption:
      "AssetCentral tells you what to do — not just what's happening. Every recommendation is backed by your actual numbers.",
  },
  {
    key: "pa",
    label: "Your PA",
    caption:
      "Forward a WhatsApp. Email a statement. Photo an invoice. AssetCentral reads it, extracts the data, and updates your portfolio. No manual entry.",
  },
];

export function ProductDemoTabs() {
  const [active, setActive] = useState<TabKey>("portfolio");
  const current = tabs.find((t) => t.key === active)!;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How it works
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What your Real Estate PA does
          </h2>
        </div>

        {/* Tab bar — horizontal scroll at narrow widths, no wrap */}
        <div className="mt-10 border-b border-[var(--color-border)] overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-1 w-max">
            {tabs.map((t) => {
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`relative px-4 lg:px-5 min-h-[48px] text-[14px] whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-[var(--color-navy)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  }`}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {t.label}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute left-0 right-0 -bottom-px h-0.5 bg-[var(--color-navy)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="min-h-[520px] min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {active === "portfolio" && <PortfolioPanel />}
                {active === "cashflow" && <CashflowPanel />}
                {active === "intelligence" && <IntelligencePanel />}
                {active === "pa" && <PaPanel />}
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="lg:sticky lg:top-24">
            <p
              className="text-[15px] leading-[1.6] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {current.caption}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Tab 1: Portfolio ----------------------- */

type Row = {
  flag: string;
  name: string;
  type: "Long-let" | "STR" | "Off-plan";
  netYield: string;
  netYieldTone: "positive" | "warning" | "negative";
  monthlyEur?: number;
  monthlyOverride?: string;
  monthlyTone?: "negative" | "positive";
  ltv: string;
  ltvTone: "positive" | "warning" | "negative";
  loanMatures: string;
  loanTone?: "positive" | "warning";
  docs: number;
};

const portfolioRows: Row[] = [
  {
    flag: "🇦🇪",
    name: "Dubai Marina Apt 1",
    type: "Long-let",
    netYield: "6.1%",
    netYieldTone: "positive",
    monthlyEur: 3120,
    monthlyTone: "positive",
    ltv: "62%",
    ltvTone: "positive",
    loanMatures: "May 2029",
    loanTone: "positive",
    docs: 14,
  },
  {
    flag: "🇦🇪",
    name: "Dubai Marina Apt 2",
    type: "STR",
    netYield: "5.4%",
    netYieldTone: "positive",
    monthlyEur: 2140,
    monthlyTone: "positive",
    ltv: "71%",
    ltvTone: "positive",
    loanMatures: "Jul 2027",
    loanTone: "warning",
    docs: 22,
  },
  {
    flag: "🇬🇷",
    name: "Athens Kolonaki",
    type: "Long-let",
    netYield: "3.9%",
    netYieldTone: "warning",
    monthlyEur: -180,
    monthlyTone: "negative",
    ltv: "84%",
    ltvTone: "negative",
    loanMatures: "Jan 2028",
    loanTone: "positive",
    docs: 9,
  },
  {
    flag: "🇫🇷",
    name: "Paris 8e",
    type: "Long-let",
    netYield: "4.2%",
    netYieldTone: "positive",
    monthlyEur: 2180,
    monthlyTone: "positive",
    ltv: "55%",
    ltvTone: "positive",
    loanMatures: "Mar 2031",
    loanTone: "positive",
    docs: 11,
  },
  {
    flag: "🇵🇹",
    name: "Lisbon Apt",
    type: "Off-plan",
    netYield: "—",
    netYieldTone: "warning",
    monthlyOverride: "Handover Q1 2027",
    ltv: "—",
    ltvTone: "warning",
    loanMatures: "—",
    docs: 6,
  },
];

const typeStyles: Record<Row["type"], string> = {
  "Long-let": "bg-slate-100 text-[var(--color-ink)]",
  STR: "bg-indigo-50 text-[var(--color-accent)]",
  "Off-plan": "bg-amber-50 text-[var(--color-warning)]",
};

function PortfolioPanel() {
  return (
    <DeviceFrame title="Portfolio · 5 assets · base EUR">
      {/* Mobile: stacked cards */}
      <div className="sm:hidden p-4 space-y-2">
        {portfolioRows.map((r) => (
          <article
            key={r.name}
            className="rounded-lg border border-[var(--color-border)] bg-white p-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <header className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[16px] leading-none" aria-hidden>
                  {r.flag}
                </span>
                <span className="text-[13px] truncate text-[var(--color-ink)] font-semibold">
                  {r.name}
                </span>
              </div>
              <span
                className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10.5px] font-medium shrink-0 ${typeStyles[r.type]}`}
              >
                {r.type}
              </span>
            </header>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[12.5px]">
              <dt className="text-[var(--color-muted)]">Net yield</dt>
              <dd className="text-right num">
                <YieldBadge tone={r.netYieldTone}>{r.netYield}</YieldBadge>
              </dd>
              <dt className="text-[var(--color-muted)]">Monthly</dt>
              <dd
                className={`text-right num ${
                  r.monthlyTone === "negative"
                    ? "text-[var(--color-negative)]"
                    : "text-[var(--color-ink)]"
                }`}
              >
                {r.monthlyOverride ?? (r.monthlyEur != null ? <Money eur={r.monthlyEur} /> : "—")}
              </dd>
              <dt className="text-[var(--color-muted)]">LTV</dt>
              <dd className="text-right num">
                {r.ltv === "—" ? (
                  <span className="text-[var(--color-muted)]">—</span>
                ) : (
                  <YieldBadge tone={r.ltvTone}>{r.ltv}</YieldBadge>
                )}
              </dd>
              <dt className="text-[var(--color-muted)]">Loan matures</dt>
              <dd className="text-right num">
                {r.loanMatures === "—" ? (
                  <span className="text-[var(--color-muted)]">—</span>
                ) : r.loanTone === "warning" ? (
                  <YieldBadge tone="warning">{r.loanMatures}</YieldBadge>
                ) : (
                  <span className="text-[var(--color-ink)]">{r.loanMatures}</span>
                )}
              </dd>
              <dt className="text-[var(--color-muted)]">Docs</dt>
              <dd className="text-right num text-[var(--color-ink)]">{r.docs}</dd>
            </dl>
          </article>
        ))}
      </div>

      {/* sm+: full table */}
      <div className="hidden sm:block p-5">
        <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
          <div
            className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.95fr_0.6fr_0.85fr_0.5fr] gap-2 px-3 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)] text-[10.5px] uppercase tracking-wider text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}
          >
            <div>Asset</div>
            <div>Type</div>
            <div className="text-right">Net yield</div>
            <div className="text-right">Monthly</div>
            <div className="text-right">LTV</div>
            <div className="text-right">Loan matures</div>
            <div className="text-right">Docs</div>
          </div>
          {portfolioRows.map((r, i) => (
            <div
              key={r.name}
              className={`grid grid-cols-[1.6fr_0.7fr_0.8fr_0.95fr_0.6fr_0.85fr_0.5fr] gap-2 items-center px-3 py-2.5 text-[12.5px] ${
                i < portfolioRows.length - 1 ? "border-b border-[var(--color-border)]" : ""
              }`}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[15px] leading-none" aria-hidden>
                  {r.flag}
                </span>
                <span className="truncate text-[var(--color-ink)] font-medium">{r.name}</span>
              </div>
              <div>
                <span
                  className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10.5px] font-medium ${typeStyles[r.type]}`}
                >
                  {r.type}
                </span>
              </div>
              <div className="text-right num">
                <YieldBadge tone={r.netYieldTone}>{r.netYield}</YieldBadge>
              </div>
              <div
                className={`text-right num ${
                  r.monthlyTone === "negative"
                    ? "text-[var(--color-negative)]"
                    : "text-[var(--color-ink)]"
                }`}
              >
                {r.monthlyOverride ?? (r.monthlyEur != null ? <Money eur={r.monthlyEur} /> : "—")}
              </div>
              <div className="text-right num">
                {r.ltv === "—" ? (
                  <span className="text-[var(--color-muted)]">—</span>
                ) : (
                  <YieldBadge tone={r.ltvTone}>{r.ltv}</YieldBadge>
                )}
              </div>
              <div className="text-right num">
                {r.loanMatures === "—" ? (
                  <span className="text-[var(--color-muted)]">—</span>
                ) : r.loanTone === "warning" ? (
                  <YieldBadge tone="warning">{r.loanMatures}</YieldBadge>
                ) : (
                  <span className="text-[var(--color-ink)]">{r.loanMatures}</span>
                )}
              </div>
              <div className="text-right num text-[var(--color-muted)]">{r.docs}</div>
            </div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}

/* ----------------------- Tab 2: Cashflow ----------------------- */

const months = [
  { label: "Jan", rent: 9_500, mortgage: 3_300 },
  { label: "Feb", rent: 9_600, mortgage: 3_200 },
  { label: "Mar", rent: 9_400, mortgage: 3_500 },
  { label: "Apr", rent: 9_700, mortgage: 3_200 },
  { label: "May", rent: 9_500, mortgage: 3_400 },
  { label: "Jun", rent: 9_500, mortgage: 3_200 },
  { label: "Jul", rent: 9_400, mortgage: 3_400 },
  { label: "Aug", rent: 9_400, mortgage: 3_500, capex: 9_000 },
  { label: "Sep", rent: 9_500, mortgage: 3_300 },
  { label: "Oct", rent: 9_600, mortgage: 3_200 },
  { label: "Nov", rent: 9_500, mortgage: 3_300 },
  { label: "Dec", rent: 9_800, mortgage: 3_200 },
];

function CashflowPanel() {
  return (
    <DeviceFrame title="Cashflow · next 12 months">
      <div className="p-5 space-y-4">
        <AlertBadge severity="warning">
          Portfolio cashflow goes negative in August — stage payment + mortgage on same month. Review your options.
        </AlertBadge>

        <div className="rounded-lg border border-[var(--color-border)] p-4">
          <CashflowChart
            months={months}
            height={300}
            title="Monthly net cashflow"
            subtitle="Rent in (green) · mortgage and one-offs out (red / hatched) · net line in navy · 3-month trailing average dashed"
            annotations={{ Aug: { label: "Aug", note: "Stage payment" } }}
          />
        </div>

        <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
          <div
            className="px-4 py-2.5 bg-[var(--color-surface)] border-b border-[var(--color-border)] text-[12px] text-[var(--color-ink)] font-medium"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            August — <Money eur={-3100} /> net
          </div>
          <ul
            className="divide-y divide-[var(--color-border)] text-[13px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <li className="px-4 py-2.5 flex justify-between items-center">
              <span className="text-[var(--color-ink)]">
                <span aria-hidden>🇵🇹</span> Lisbon Apt — stage payment
              </span>
              <span className="num text-[var(--color-negative)]">
                <Money eur={-21300} />
              </span>
            </li>
            <li className="px-4 py-2.5 flex justify-between items-center">
              <span className="text-[var(--color-ink)]">
                <span aria-hidden>🇦🇪</span> Dubai Marina Apt 2 — mortgage
              </span>
              <span className="num text-[var(--color-negative)]">
                <Money eur={-3420} />
              </span>
            </li>
            <li className="px-4 py-2.5 flex justify-between items-center">
              <span className="text-[var(--color-ink)]">Other rent inflows</span>
              <span className="num text-[var(--color-positive)]">
                +<Money eur={21620} />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </DeviceFrame>
  );
}

/* ----------------------- Tab 3: Intelligence ----------------------- */

type Reco = {
  flag: string;
  asset: string;
  signalTone: "positive" | "warning" | "negative";
  signalLabel: string;
  insight: React.ReactNode;
  upside?: React.ReactNode;
  action: string;
};

const recos: Reco[] = [
  {
    flag: "🇦🇪",
    asset: "Dubai Marina Apt 1",
    signalTone: "warning",
    signalLabel: "Below market",
    insight: (
      <>
        4.1% vs 5.8% area average — rent is <Money eur={150} />/month below market.
      </>
    ),
    upside: (
      <>
        +<Money eur={1815} />/yr
      </>
    ),
    action: "Prepare rent review",
  },
  {
    flag: "🇦🇪",
    asset: "Dubai Marina Apt 2",
    signalTone: "warning",
    signalLabel: "Rate reverting",
    insight: (
      <>
        Fixed rate reverts in 47 days — monthly payment increases by <Money eur={320} />.
      </>
    ),
    action: "Refinancing pack ready to generate",
  },
  {
    flag: "🇫🇷",
    asset: "Paris 8e",
    signalTone: "positive",
    signalLabel: "Sell signal",
    insight:
      "Unrealised gain 22%, yield on equity 2.9%. Capital working harder elsewhere.",
    action: "Run exit analysis",
  },
];

function IntelligencePanel() {
  return (
    <DeviceFrame title="Intelligence · 3 recommendations">
      <ul className="divide-y divide-[var(--color-border)]">
        {recos.map((r) => (
          <li key={r.asset} className="p-5">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[16px]" aria-hidden>
                  {r.flag}
                </span>
                <span
                  className="text-[14px] font-medium text-[var(--color-ink)] truncate"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {r.asset}
                </span>
              </div>
              <YieldBadge tone={r.signalTone}>{r.signalLabel}</YieldBadge>
            </div>
            <p
              className="text-[14px] leading-[1.55] text-[var(--color-ink)] mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {r.insight}
            </p>
            <div className="flex items-center justify-between gap-4">
              {r.upside ? (
                <span
                  className="text-[12.5px] num text-[var(--color-positive)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Monthly upside · {r.upside}
                </span>
              ) : (
                <span />
              )}
              <button
                className="text-[12.5px] font-medium text-[var(--color-accent)] hover:underline"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {r.action} →
              </button>
            </div>
          </li>
        ))}
      </ul>
    </DeviceFrame>
  );
}

/* ----------------------- Tab 4: Your PA ----------------------- */

function PaPanel() {
  return (
    <DeviceFrame title="Your PA · data ingestion">
      <div className="p-5 grid gap-4 lg:grid-cols-2">
        {/* Left: forwarding inputs */}
        <div className="space-y-3">
          <div
            className="rounded-lg border border-[var(--color-border)] p-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-100 text-emerald-700 text-[13px] font-semibold"
              >
                WA
              </span>
              <span className="text-[13px] font-semibold text-[var(--color-ink)]">
                Forward to WhatsApp
              </span>
            </div>
            <div className="text-[12.5px] text-[var(--color-muted)] mb-3">
              Forward documents, statements, invoices, or photos to AssetCentral.
            </div>
            <div className="num text-[13px] px-3 py-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-ink)]">
              +971 50 555 0142
            </div>
          </div>

          <div
            className="rounded-lg border border-[var(--color-border)] p-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-indigo-100 text-[var(--color-accent)] text-[14px]"
              >
                ✉
              </span>
              <span className="text-[13px] font-semibold text-[var(--color-ink)]">
                Or email to
              </span>
            </div>
            <div className="num text-[13px] px-3 py-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-ink)]">
              inbox@assetcentral.ai
            </div>
            <div className="mt-3 text-[12px] text-[var(--color-muted)]">
              PDF, image, DOCX, XLSX, EML — all parsed.
            </div>
          </div>

          <div
            className="rounded-lg border border-dashed border-[var(--color-border)] p-4 text-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <div className="text-[12.5px] text-[var(--color-muted)]">
              Or drag-and-drop a file
            </div>
          </div>
        </div>

        {/* Right: AI extraction result */}
        <div
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block w-2 h-2 rounded-full bg-[var(--color-positive)] animate-pulse"
              />
              <span className="text-[11.5px] uppercase tracking-wider text-[var(--color-muted)]">
                Just processed · 2 min ago
              </span>
            </div>
            <span className="text-[11px] text-[var(--color-muted)] num">conf. 98%</span>
          </div>

          <div className="text-[13.5px] font-semibold text-[var(--color-ink)] mb-1">
            Statement from Maison Privée — March 2026
          </div>
          <div className="text-[12px] text-[var(--color-muted)] mb-3">
            STR operator statement · 3 properties · 1 attachment
          </div>

          <ul className="space-y-1.5 text-[12.5px] text-[var(--color-ink)]">
            <ExtractRow label="Properties" value="3" />
            <ExtractRow label="Night bookings" value="47" />
            <ExtractRow label="Gross revenue" value={<Money eur={9670} />} />
            <ExtractRow label="Commission" value={<Money eur={2420} />} />
            <ExtractRow label="Commission rate" value="25.0%" />
            <ExtractRow
              label="Net to owner"
              value={<Money eur={7250} />}
              tone="positive"
            />
          </ul>

          <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
            <span className="text-[11.5px] text-[var(--color-muted)]">
              Imported to cashflow calendar
            </span>
            <span className="text-[11.5px] text-[var(--color-positive)] font-medium">✓ Done</span>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

function ExtractRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  tone?: "positive";
}) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-[var(--color-muted)]">{label}</span>
      <span
        className={`num ${tone === "positive" ? "text-[var(--color-positive)] font-semibold" : "text-[var(--color-ink)]"}`}
      >
        {value}
      </span>
    </li>
  );
}

/* ----------------------- Shared device frame ----------------------- */

function DeviceFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_20px_50px_-25px_rgba(15,23,42,0.25)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-5 h-5 rounded-md bg-[var(--color-navy)] text-white text-[10px] flex items-center justify-center font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AC
          </span>
          <span
            className="text-[13px] font-medium text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
        </div>
      </div>
      {children}
    </div>
  );
}
