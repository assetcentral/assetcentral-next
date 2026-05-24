"use client";

import { AlertBadge } from "./AlertBadge";
import { CashflowChart } from "./CashflowChart";
import { Money } from "./CurrencyProvider";
import { YieldBadge } from "./YieldBadge";

export function MiniFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <span
          className="text-[11.5px] font-medium text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {title}
        </span>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)]" />
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function PortfolioMini() {
  const rows: { flag: string; name: string; yield_: string; tone: "positive" | "warning" | "negative" }[] = [
    { flag: "🇦🇪", name: "Dubai Marina 1", yield_: "6.1%", tone: "positive" },
    { flag: "🇦🇪", name: "Dubai Marina 2 (STR)", yield_: "5.4%", tone: "positive" },
    { flag: "🇬🇷", name: "Athens Kolonaki", yield_: "3.9%", tone: "warning" },
    { flag: "🇫🇷", name: "Paris 8e", yield_: "4.2%", tone: "positive" },
    { flag: "🇵🇹", name: "Lisbon (off-plan)", yield_: "—", tone: "warning" },
    { flag: "🇬🇧", name: "London Hackney", yield_: "5.0%", tone: "positive" },
  ];
  return (
    <MiniFrame title="6 assets · base currency">
      <ul style={{ fontFamily: "var(--font-sans)" }}>
        {rows.map((r, i) => (
          <li
            key={r.name}
            className={`flex items-center justify-between py-2 text-[12.5px] ${
              i < rows.length - 1 ? "border-b border-[var(--color-border)]" : ""
            }`}
          >
            <span className="flex items-center gap-2 text-[var(--color-ink)] min-w-0">
              <span className="text-[14px]" aria-hidden>
                {r.flag}
              </span>
              <span className="truncate">{r.name}</span>
            </span>
            <YieldBadge tone={r.tone}>{r.yield_}</YieldBadge>
          </li>
        ))}
      </ul>
    </MiniFrame>
  );
}

export function LoanMini() {
  return (
    <MiniFrame title="Loan · Dubai Marina 2">
      <div style={{ fontFamily: "var(--font-sans)" }}>
        <div className="flex justify-between text-[12.5px] text-[var(--color-ink)] mb-1">
          <span>
            <Money eur={358_000} short /> principal
          </span>
          <span className="num text-[var(--color-muted)]">3.99% fixed</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--color-border)] overflow-hidden flex">
          <div className="bg-[var(--color-positive)]" style={{ width: "42%" }} />
          <div className="bg-[var(--color-warning)]" style={{ width: "8%" }} />
          <div className="bg-[var(--color-border)]" style={{ width: "50%" }} />
        </div>
        <div className="flex justify-between text-[10.5px] text-[var(--color-muted)] mt-1.5">
          <span>Today</span>
          <span>Reverts in 52d</span>
          <span>Matures 2029</span>
        </div>
        <div className="mt-4">
          <AlertBadge severity="warning">
            Fixed rate reverts in 52 days — monthly payment +<Money eur={320} />
          </AlertBadge>
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px] text-[var(--color-muted)]">
          <span>Refinancing pack</span>
          <span className="text-[var(--color-accent)] font-medium">Ready to generate →</span>
        </div>
      </div>
    </MiniFrame>
  );
}

export function CashflowMini() {
  const months: { label: string; rent: number; mortgage: number; capex?: number }[] = [
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
  return (
    <MiniFrame title="Cashflow · next 12 months">
      <CashflowChart
        months={months}
        height={260}
        title="Monthly net cashflow"
        subtitle="Rent (green) · costs (red) · capex hatched · net line + 3-mo avg dashed"
        annotations={{ Aug: { label: "Aug", note: "Stage payment" } }}
      />
      <div className="mt-3">
        <AlertBadge severity="warning">August — stage payment + mortgage on same month</AlertBadge>
      </div>
    </MiniFrame>
  );
}

export function YieldOptMini() {
  return (
    <MiniFrame title="Yield optimisation">
      <div style={{ fontFamily: "var(--font-sans)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12.5px] text-[var(--color-ink)] flex items-center gap-1.5">
            <span aria-hidden>🇦🇪</span> Dubai Marina Apt 1
          </span>
          <YieldBadge tone="warning">Below market</YieldBadge>
        </div>
        <div className="rounded-lg bg-[var(--color-surface)] p-3 text-[12px]">
          <div className="flex justify-between">
            <span className="text-[var(--color-muted)]">Your rent</span>
            <span className="num text-[var(--color-ink)]">
              <Money eur={2115} />/mo
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[var(--color-muted)]">Area median</span>
            <span className="num text-[var(--color-ink)]">
              <Money eur={2266} />/mo
            </span>
          </div>
          <div className="flex justify-between mt-1.5 pt-1.5 border-t border-[var(--color-border)]">
            <span className="text-[var(--color-positive)] font-semibold">Monthly upside</span>
            <span className="num text-[var(--color-positive)] font-semibold">
              +<Money eur={151} />/mo
            </span>
          </div>
        </div>
        <button
          className="mt-3 text-[12px] font-medium text-[var(--color-accent)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Prepare rent review →
        </button>
      </div>
    </MiniFrame>
  );
}

export function OperatorMini() {
  return (
    <MiniFrame title="Operator check · March 2026">
      <div style={{ fontFamily: "var(--font-sans)" }} className="text-[12.5px]">
        <div className="text-[var(--color-ink)] mb-2 font-medium">STR Agency — 3 properties</div>
        <ul className="space-y-1">
          <li className="flex justify-between">
            <span className="text-[var(--color-muted)]">Gross revenue</span>
            <span className="num">
              <Money eur={9670} />
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--color-muted)]">Commission</span>
            <span className="num">
              <Money eur={2420} />
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--color-muted)]">Rate (charged)</span>
            <span className="num">25.0%</span>
          </li>
          <li className="flex justify-between text-[var(--color-warning)]">
            <span>Occupancy vs market</span>
            <span className="num">−6 pts</span>
          </li>
          <li className="flex justify-between text-[var(--color-warning)]">
            <span>ADR vs comparable units</span>
            <span className="num">−8%</span>
          </li>
        </ul>
        <div className="mt-3">
          <AlertBadge severity="warning">
            Statement underperforms market — review with operator
          </AlertBadge>
        </div>
      </div>
    </MiniFrame>
  );
}

export function RefinanceMini() {
  return (
    <MiniFrame title="Refinancing pack">
      <div
        className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] aspect-[3/4] flex flex-col p-5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          AssetCentral
        </span>
        <span className="text-[20px] leading-[1.1] text-[var(--color-navy)]">Refinancing Pack</span>
        <span
          className="mt-1 text-[12px] text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Dubai Marina Apt 2 · 2026
        </span>
        <div className="flex-1" />
        <ul
          className="text-[11px] space-y-1 text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <li>· Rent roll</li>
          <li>· Valuation evidence</li>
          <li>· DSCR calculation</li>
          <li>· Comparable transactions</li>
        </ul>
      </div>
    </MiniFrame>
  );
}

export function IngestionMini() {
  return (
    <MiniFrame title="Data ingestion">
      <div className="grid gap-2.5" style={{ fontFamily: "var(--font-sans)" }}>
        <div className="rounded-md border border-[var(--color-border)] p-2.5 flex items-center gap-2">
          <span className="inline-flex w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 text-[11px] font-semibold items-center justify-center">
            WA
          </span>
          <span className="text-[12px] text-[var(--color-ink)]">Forward to +971 50 555 0142</span>
        </div>
        <div className="rounded-md border border-[var(--color-border)] p-2.5 flex items-center gap-2">
          <span className="inline-flex w-6 h-6 rounded-md bg-indigo-100 text-[var(--color-accent)] text-[12px] items-center justify-center">
            ✉
          </span>
          <span className="num text-[12px] text-[var(--color-ink)]">inbox@assetcentral.ai</span>
        </div>
        <div className="rounded-md bg-[var(--color-surface)] p-2.5 text-[11.5px] text-[var(--color-ink)]">
          <span className="font-semibold">Just processed</span> · STR statement · 3 properties · imported
        </div>
      </div>
    </MiniFrame>
  );
}

export function AlertsMini() {
  return (
    <MiniFrame title="Alert centre">
      <div className="space-y-2">
        <AlertBadge severity="warning">
          Fixed rate reverts in 52 days · Dubai Marina 2
        </AlertBadge>
        <AlertBadge severity="critical">
          Stage payment due in 47 days · <Money eur={21_400} />
        </AlertBadge>
        <AlertBadge severity="warning">
          Rent below market · Dubai Marina 1 · +<Money eur={151} />/mo
        </AlertBadge>
        <AlertBadge severity="info">
          Insurance expires in 90 days · Athens Kolonaki
        </AlertBadge>
      </div>
    </MiniFrame>
  );
}

export function ScoreMini() {
  return (
    <MiniFrame title="Portfolio score">
      <div className="flex items-center gap-6" style={{ fontFamily: "var(--font-sans)" }}>
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" stroke="var(--color-border)" strokeWidth="10" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="var(--color-positive)"
              strokeWidth="10"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40 * 0.72} ${2 * Math.PI * 40}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="num text-[24px] font-semibold text-[var(--color-ink)] leading-none">72</span>
            <span className="text-[10px] text-[var(--color-muted)] mt-1">of 100</span>
          </div>
        </div>
        <ul className="text-[11.5px] space-y-1 text-[var(--color-ink)]">
          <li>+ Yield 14 pts above benchmark</li>
          <li>− Leverage 84% on 1 asset</li>
          <li>− Cashflow negative in 1 month</li>
          <li>+ All loans &gt;90d from action</li>
        </ul>
      </div>
    </MiniFrame>
  );
}

export function SellHoldMini() {
  return (
    <MiniFrame title="Sell vs hold · Paris 8e">
      <div style={{ fontFamily: "var(--font-sans)" }} className="text-[12px]">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-md bg-[var(--color-surface)] p-2.5">
            <div className="text-[10.5px] text-[var(--color-muted)] uppercase tracking-wider">
              Hold (NPV)
            </div>
            <div className="num text-[16px] font-semibold mt-1 text-[var(--color-ink)]">
              <Money eur={612_000} short />
            </div>
          </div>
          <div className="rounded-md bg-emerald-50 border border-emerald-100 p-2.5">
            <div className="text-[10.5px] text-[var(--color-positive)] uppercase tracking-wider">
              Sell now (NPV)
            </div>
            <div className="num text-[16px] font-semibold mt-1 text-[var(--color-positive)]">
              <Money eur={684_000} short />
            </div>
          </div>
        </div>
        <div className="flex justify-between text-[11.5px] mb-2">
          <span className="text-[var(--color-muted)]">Break-even sale price</span>
          <span className="num text-[var(--color-ink)]">
            <Money eur={1_080_000} short />
          </span>
        </div>
        <YieldBadge tone="positive">Sell within 12 months</YieldBadge>
      </div>
    </MiniFrame>
  );
}

export function AcquisitionMini() {
  return (
    <MiniFrame title="Acquisition simulator">
      <div style={{ fontFamily: "var(--font-sans)" }} className="grid grid-cols-3 gap-2 text-[11px]">
        <div className="rounded-md bg-[var(--color-surface)] p-2.5">
          <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Bear</div>
          <div className="num text-[14px] font-semibold text-[var(--color-warning)] mt-0.5">+0.3%</div>
        </div>
        <div className="rounded-md bg-emerald-50 border border-emerald-100 p-2.5">
          <div className="text-[10px] text-[var(--color-positive)] uppercase tracking-wider">Base</div>
          <div className="num text-[14px] font-semibold text-[var(--color-positive)] mt-0.5">+0.6%</div>
        </div>
        <div className="rounded-md bg-[var(--color-surface)] p-2.5">
          <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Bull</div>
          <div className="num text-[14px] font-semibold text-[var(--color-positive)] mt-0.5">+0.9%</div>
        </div>
        <div className="col-span-3 text-[11px] text-[var(--color-muted)] mt-1.5">
          Blended portfolio yield impact of adding a Marbella villa (<Money eur={480_000} short />, 5.4% gross).
        </div>
      </div>
    </MiniFrame>
  );
}
