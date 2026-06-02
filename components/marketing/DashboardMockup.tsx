"use client";

import { motion } from "framer-motion";
import { AlertBadge } from "./AlertBadge";
import { CountUp } from "./CountUp";
import { Money, useCurrency } from "./CurrencyProvider";
import { YieldBadge } from "./YieldBadge";

type Asset = {
  flag: string;
  name: string;
  city: string;
  type: "Long-let" | "Short-term" | "Off-plan";
  netYield: string;
  netYieldTone: "positive" | "warning" | "negative";
  /** EUR-equivalent monthly cashflow. Use `monthlyOverride` for non-money cells. */
  monthlyEur?: number;
  monthlyOverride?: string;
  monthlyTone?: "positive" | "negative";
  ltv?: string;
  ltvTone?: "positive" | "warning" | "negative";
  loanMatures?: string;
  loanTone?: "positive" | "warning";
  docs: number;
  docsBadge?: boolean;
};

const assets: Asset[] = [
  {
    flag: "🇦🇪",
    name: "Dubai Marina Apt 1",
    city: "Dubai",
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
    city: "Dubai",
    type: "Short-term",
    netYield: "5.4%",
    netYieldTone: "positive",
    monthlyEur: 2140,
    monthlyTone: "positive",
    ltv: "71%",
    ltvTone: "positive",
    loanMatures: "Jul 2027",
    loanTone: "warning",
    docs: 22,
    docsBadge: true,
  },
  {
    flag: "🇬🇷",
    name: "Athens Kolonaki",
    city: "Athens",
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
    flag: "🇵🇹",
    name: "Lisbon Apt",
    city: "Lisbon",
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

const typeStyles: Record<Asset["type"], string> = {
  "Long-let": "bg-slate-100 text-[var(--color-ink)]",
  "Short-term": "bg-indigo-50 text-[var(--color-accent)]",
  "Off-plan": "bg-amber-50 text-[var(--color-warning)]",
};

export function DashboardMockup() {
  return (
    <div className="relative">
      {/* device frame */}
      <div className="relative rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)] overflow-hidden">
        {/* header strip */}
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
              Portfolio overview
            </span>
          </div>
          <BaseCurrencyLabel />
        </div>

        <div className="p-5 space-y-4">
          {/* KPI grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard label="Portfolio value">
              <span className="num text-[18px] font-semibold text-[var(--color-ink)]">
                <CountUp eur={3_840_000} short duration={1.2} />
              </span>
            </KpiCard>
            <KpiCard label="Blended net yield">
              <span className="num text-[18px] font-semibold text-[var(--color-positive)]">
                <CountUp to={5.2} decimals={1} duration={1.2} />%
              </span>
            </KpiCard>
            <KpiCard label="Monthly cashflow">
              <span className="num text-[18px] font-semibold text-[var(--color-ink)]">
                <CountUp eur={6_420} duration={1.2} />
              </span>
            </KpiCard>
            <KpiCard label="Total debt">
              <span className="num text-[18px] font-semibold text-[var(--color-ink)]">
                <CountUp eur={2_410_000} short duration={1.2} />
              </span>
            </KpiCard>
          </div>

          {/* alert strip — pulses once on load */}
          <motion.div
            className="grid sm:grid-cols-2 gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.015, 1] }}
              transition={{ duration: 3, delay: 1.0, times: [0, 0.5, 1] }}
            >
              <AlertBadge severity="warning">
                Fixed rate reverts in 52 days · Dubai Marina Apt 2
              </AlertBadge>
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.015, 1] }}
              transition={{ duration: 3, delay: 1.15, times: [0, 0.5, 1] }}
            >
              <AlertBadge severity="critical">
                Stage payment due in 47 days · <Money eur={21_400} />
              </AlertBadge>
            </motion.div>
          </motion.div>

          {/* asset list — stacked cards at <sm:, table at sm:+ */}
          <div className="sm:hidden space-y-2">
            {assets.map((a) => (
              <article
                key={a.name}
                className="rounded-lg border border-[var(--color-border)] bg-white p-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <header className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[16px] leading-none" aria-hidden>
                      {a.flag}
                    </span>
                    <span className="text-[13px] truncate text-[var(--color-ink)] font-semibold">
                      {a.name}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10.5px] font-medium shrink-0 ${typeStyles[a.type]}`}
                  >
                    {a.type}
                  </span>
                </header>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[12.5px]">
                  <dt className="text-[var(--color-muted)]">Net yield</dt>
                  <dd className="text-right num">
                    <YieldBadge tone={a.netYieldTone}>{a.netYield}</YieldBadge>
                  </dd>
                  <dt className="text-[var(--color-muted)]">Monthly</dt>
                  <dd
                    className={`text-right num ${
                      a.monthlyTone === "negative"
                        ? "text-[var(--color-negative)]"
                        : "text-[var(--color-ink)]"
                    }`}
                  >
                    {a.monthlyOverride ?? (a.monthlyEur != null ? <Money eur={a.monthlyEur} /> : "—")}
                  </dd>
                  <dt className="text-[var(--color-muted)]">LTV</dt>
                  <dd className="text-right num">
                    {a.ltv === "—" ? (
                      <span className="text-[var(--color-muted)]">—</span>
                    ) : (
                      <YieldBadge tone={a.ltvTone ?? "neutral"}>{a.ltv}</YieldBadge>
                    )}
                  </dd>
                  <dt className="text-[var(--color-muted)]">Docs</dt>
                  <dd className="text-right num text-[var(--color-ink)] flex items-center justify-end gap-1">
                    <span>{a.docs}</span>
                    {a.docsBadge && (
                      <span
                        className="inline-flex items-center justify-center text-[9px] font-semibold w-3.5 h-3.5 rounded-full bg-[var(--color-accent)] text-white"
                        aria-label="new documents"
                      >
                        !
                      </span>
                    )}
                  </dd>
                </dl>
              </article>
            ))}
          </div>

          {/* asset table at sm:+ */}
          <div className="hidden sm:block rounded-lg border border-[var(--color-border)] overflow-hidden">
            <div
              className="grid grid-cols-[1.6fr_0.7fr_0.9fr_0.9fr_0.6fr_0.5fr] gap-2 px-3 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)] text-[10.5px] uppercase tracking-wider text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}
            >
              <div>Asset</div>
              <div>Type</div>
              <div className="text-right">Net yield</div>
              <div className="text-right">Monthly</div>
              <div className="text-right">LTV</div>
              <div className="text-right">Docs</div>
            </div>
            {assets.map((a, i) => (
              <div
                key={a.name}
                className={`grid grid-cols-[1.6fr_0.7fr_0.9fr_0.9fr_0.6fr_0.5fr] gap-2 items-center px-3 py-2.5 text-[12.5px] ${
                  i < assets.length - 1 ? "border-b border-[var(--color-border)]" : ""
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[15px] leading-none" aria-hidden>
                    {a.flag}
                  </span>
                  <span className="truncate text-[var(--color-ink)] font-medium">{a.name}</span>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10.5px] font-medium ${typeStyles[a.type]}`}
                  >
                    {a.type}
                  </span>
                </div>
                <div className="text-right num">
                  <YieldBadge tone={a.netYieldTone}>{a.netYield}</YieldBadge>
                </div>
                <div
                  className={`text-right num ${
                    a.monthlyTone === "negative"
                      ? "text-[var(--color-negative)]"
                      : "text-[var(--color-ink)]"
                  }`}
                >
                  {a.monthlyOverride ?? (a.monthlyEur != null ? <Money eur={a.monthlyEur} /> : "—")}
                </div>
                <div className="text-right num">
                  {a.ltv === "—" ? (
                    <span className="text-[var(--color-muted)]">—</span>
                  ) : (
                    <YieldBadge tone={a.ltvTone ?? "neutral"}>{a.ltv}</YieldBadge>
                  )}
                </div>
                <div className="text-right num text-[var(--color-muted)] flex items-center justify-end gap-1">
                  <span>{a.docs}</span>
                  {a.docsBadge && (
                    <span
                      className="inline-flex items-center justify-center text-[9px] font-semibold w-3.5 h-3.5 rounded-full bg-[var(--color-accent)] text-white"
                      aria-label="new documents"
                    >
                      !
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating attribution badge. Sits inside the mockup's bottom
          edge (bottom-2) rather than below it (-bottom-3) so it doesn't
          overlap the social-proof strip that follows the hero on mobile
          viewports. Desktop layout has enough space below either way. */}
      <div
        className="absolute bottom-2 right-4 px-2.5 py-1 rounded-md bg-[var(--color-navy)] text-white text-[10px] tracking-wide shadow-md"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Live portfolio · sample data
      </div>
    </div>
  );
}

function BaseCurrencyLabel() {
  const { code } = useCurrency();
  return (
    <span
      className="text-[11px] text-[var(--color-muted)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      Base · {code}
    </span>
  );
}

function KpiCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-3">
      <div
        className="text-[10.5px] uppercase tracking-wider text-[var(--color-muted)] mb-1"
        style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}
      >
        {label}
      </div>
      <div className="leading-tight">{children}</div>
    </div>
  );
}
