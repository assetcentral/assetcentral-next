"use client";

import { useCurrency } from "./CurrencyProvider";

export type CashflowMonth = {
  label: string;
  /** Income (rent) in EUR — positive. */
  rent: number;
  /** Recurring costs (mortgage + opex) in EUR — positive value, drawn below zero. */
  mortgage: number;
  /** One-off costs (stage payments, capex) in EUR — positive value, drawn below mortgage. */
  capex?: number;
};

type Annotation = { label: string; note: string };

type Props = {
  months: CashflowMonth[];
  height?: number;
  /** Show month labels on the X axis. */
  showLabels?: boolean;
  /** Show Y-axis tick labels + horizontal gridlines. Default true (compact: false). */
  showYAxis?: boolean;
  /** Compact mode for mini-mockups: no bars, no legend, no stats. */
  compact?: boolean;
  /** Title rendered above the chart. */
  title?: string;
  subtitle?: string;
  /** Annotate any month whose label is in this map. */
  annotations?: Record<string, Annotation>;
};

function net(m: CashflowMonth): number {
  return m.rent - m.mortgage - (m.capex ?? 0);
}

/** Tick step: pick a clean round step (€2k, €5k, etc.) that yields 4–6 ticks. */
function computeTicks(min: number, max: number): number[] {
  const range = max - min;
  const niceSteps = [100, 200, 500, 1000, 2000, 2500, 5000, 10_000, 20_000, 50_000, 100_000];
  const target = 5;
  let step = niceSteps[niceSteps.length - 1];
  for (const s of niceSteps) {
    if (range / s <= target + 1) {
      step = s;
      break;
    }
  }
  const tMax = Math.ceil(max / step) * step;
  const tMin = Math.floor(min / step) * step;
  const ticks: number[] = [];
  for (let t = tMin; t <= tMax; t += step) ticks.push(t);
  return ticks;
}

/** Trailing 3-month average of net cashflow. */
function trailingAvg(months: CashflowMonth[]): number[] {
  return months.map((_, i) => {
    const start = Math.max(0, i - 2);
    const slice = months.slice(start, i + 1).map(net);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

export function CashflowChart({
  months,
  height = 280,
  showLabels = true,
  showYAxis,
  compact = false,
  title,
  subtitle,
  annotations = {},
}: Props) {
  const { format } = useCurrency();
  const yAxisOn = (showYAxis ?? !compact) && months.length > 0;
  const richMode = !compact;

  const W = 560;
  const padLeft = yAxisOn ? 60 : 8;
  const padRight = 14;
  const padTop = richMode ? 20 : 12;
  const padBottom = showLabels ? 26 : 8;

  const innerW = W - padLeft - padRight;
  const innerH = height - padTop - padBottom;

  const nets = months.map(net);
  const yMax = Math.max(0, ...months.map((m) => m.rent));
  const yMin = Math.min(0, ...months.map((m) => -(m.mortgage + (m.capex ?? 0))));
  const ticks = computeTicks(yMin, yMax);
  const tickMax = Math.max(...ticks);
  const tickMin = Math.min(...ticks);
  const yRange = tickMax - tickMin || 1;

  const yFromValue = (v: number) => padTop + ((tickMax - v) / yRange) * innerH;
  const xFromIndex = (i: number) => {
    if (months.length === 1) return padLeft + innerW / 2;
    return padLeft + (i / (months.length - 1)) * innerW;
  };
  const zeroY = yFromValue(0);
  const zeroPct = ((zeroY - padTop) / innerH) * 100;

  const barWidth = richMode ? Math.max(4, Math.min(14, innerW / months.length / 3.2)) : 0;
  const halfBar = barWidth / 2;

  const points = months.map((m, i) => ({
    x: xFromIndex(i),
    y: yFromValue(net(m)),
    eur: net(m),
    label: m.label,
    rent: m.rent,
    mortgage: m.mortgage,
    capex: m.capex ?? 0,
  }));

  const linePath =
    "M " + points.map((p, i) => (i === 0 ? `${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(" ");

  const areaPath =
    `M ${points[0].x},${zeroY} ` +
    points.map((p) => `L ${p.x},${p.y}`).join(" ") +
    ` L ${points[points.length - 1].x},${zeroY} Z`;

  const trailing = trailingAvg(months);
  const trailingPath =
    "M " +
    trailing
      .map((v, i) => (i === 0 ? `${xFromIndex(i)},${yFromValue(v)}` : `L ${xFromIndex(i)},${yFromValue(v)}`))
      .join(" ");

  const gradientId = `cf-area-${Math.round(zeroPct * 100)}`;

  // Quarter dividers between Mar/Apr, Jun/Jul, Sep/Oct (indexes 3, 6, 9)
  const dividers = [3, 6, 9].filter((i) => i < months.length).map((i) => {
    const between = (xFromIndex(i - 1) + xFromIndex(i)) / 2;
    return { x: between, label: ["Q2", "Q3", "Q4"][[3, 6, 9].indexOf(i)] };
  });

  // Summary stats
  const stats = {
    avg: nets.reduce((a, b) => a + b, 0) / Math.max(1, nets.length),
    best: Math.max(...nets),
    worst: Math.min(...nets),
    total: nets.reduce((a, b) => a + b, 0),
  };

  return (
    <div>
      {(title || subtitle) && (
        <div
          className="mb-3 flex items-start justify-between gap-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div>
            {title && (
              <h4 className="text-[15px] font-semibold text-[var(--color-ink)] leading-tight">
                {title}
              </h4>
            )}
            {subtitle && (
              <p className="text-[12px] text-[var(--color-muted)] mt-1">{subtitle}</p>
            )}
          </div>
          {richMode && (
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--color-muted)] justify-end">
              <LegendItem swatch={<Swatch color="var(--color-positive)" />} label="Rent in" />
              <LegendItem swatch={<Swatch color="var(--color-negative)" />} label="Mortgage" />
              <LegendItem swatch={<Swatch color="var(--color-warning)" />} label="Capex / stage" />
              <LegendItem
                swatch={<LineSwatch color="var(--color-navy)" />}
                label="Net (line)"
              />
              <LegendItem
                swatch={<LineSwatch color="var(--color-muted)" dashed />}
                label="3-mo avg"
              />
            </ul>
          )}
        </div>
      )}

      <svg
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: `${height}px` }}
        role="img"
        aria-label="Monthly cashflow chart"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1={padTop}
            x2="0"
            y2={padTop + innerH}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--color-positive)" stopOpacity="0.22" />
            <stop offset={`${Math.max(0, zeroPct - 0.001)}%`} stopColor="var(--color-positive)" stopOpacity="0.10" />
            <stop offset={`${Math.min(100, zeroPct + 0.001)}%`} stopColor="var(--color-negative)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--color-negative)" stopOpacity="0.22" />
          </linearGradient>
          <pattern id="cf-capex-pattern" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <rect width="2" height="4" fill="var(--color-warning)" opacity="0.85" />
          </pattern>
        </defs>

        {/* Quarter dividers (subtle vertical lines) */}
        {richMode &&
          dividers.map((d) => (
            <g key={d.label}>
              <line
                x1={d.x}
                x2={d.x}
                y1={padTop}
                y2={padTop + innerH}
                stroke="var(--color-border)"
                strokeOpacity="0.7"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              <text
                x={d.x}
                y={padTop - 6}
                textAnchor="middle"
                fontSize="9"
                fill="var(--color-muted)"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {d.label}
              </text>
            </g>
          ))}

        {/* Y gridlines */}
        {yAxisOn &&
          ticks.map((t) => (
            <line
              key={t}
              x1={padLeft}
              x2={W - padRight}
              y1={yFromValue(t)}
              y2={yFromValue(t)}
              stroke="var(--color-border)"
              strokeOpacity={t === 0 ? 1 : 0.45}
              strokeWidth="1"
              strokeDasharray={t === 0 ? "3 3" : "0"}
            />
          ))}

        {/* Zero baseline if Y labels off */}
        {!yAxisOn && (
          <line
            x1={padLeft}
            x2={W - padRight}
            y1={zeroY}
            y2={zeroY}
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}

        {/* Y tick labels */}
        {yAxisOn &&
          ticks.map((t) => (
            <text
              key={t}
              x={padLeft - 8}
              y={yFromValue(t)}
              textAnchor="end"
              dominantBaseline="central"
              fontSize="10"
              fill="var(--color-muted)"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {format(t, { short: true })}
            </text>
          ))}

        {/* Stacked bars (rich mode only) */}
        {richMode &&
          points.map((p) => {
            const rentTop = yFromValue(p.rent);
            const mortgageBottom = yFromValue(-p.mortgage);
            const capexBottom = yFromValue(-(p.mortgage + p.capex));
            return (
              <g key={`bar-${p.label}`}>
                {/* rent above zero */}
                <rect
                  x={p.x - halfBar}
                  y={rentTop}
                  width={barWidth}
                  height={Math.max(0, zeroY - rentTop)}
                  fill="var(--color-positive)"
                  fillOpacity="0.78"
                  rx="1.5"
                />
                {/* mortgage below zero */}
                <rect
                  x={p.x - halfBar}
                  y={zeroY}
                  width={barWidth}
                  height={Math.max(0, mortgageBottom - zeroY)}
                  fill="var(--color-negative)"
                  fillOpacity="0.72"
                  rx="1.5"
                />
                {/* capex stacked below mortgage */}
                {p.capex > 0 && (
                  <rect
                    x={p.x - halfBar}
                    y={mortgageBottom}
                    width={barWidth}
                    height={Math.max(0, capexBottom - mortgageBottom)}
                    fill="url(#cf-capex-pattern)"
                    stroke="var(--color-warning)"
                    strokeWidth="0.5"
                    rx="1.5"
                  />
                )}
              </g>
            );
          })}

        {/* Split area under the net line */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Trailing 3-month average (dashed) */}
        {richMode && (
          <path
            d={trailingPath}
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3 4"
            opacity="0.75"
          />
        )}

        {/* Net line */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-navy)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Markers */}
        {points.map((p, i) => {
          const isNeg = p.eur < 0;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={isNeg ? 4 : 3}
              fill={isNeg ? "var(--color-negative)" : "white"}
              stroke={isNeg ? "var(--color-negative)" : "var(--color-navy)"}
              strokeWidth="1.6"
            />
          );
        })}

        {/* Annotations */}
        {points.map((p) => {
          const ann = annotations[p.label];
          if (!ann) return null;
          const isNeg = p.eur < 0;
          const valueY = isNeg ? p.y + 16 : p.y - 12;
          const noteY = isNeg ? valueY + 13 : valueY - 13;
          return (
            <g key={`ann-${p.label}`}>
              <line
                x1={p.x}
                x2={p.x}
                y1={p.y}
                y2={valueY + (isNeg ? -8 : 8)}
                stroke={isNeg ? "var(--color-negative)" : "var(--color-navy)"}
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.7"
              />
              <text
                x={p.x}
                y={valueY}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={isNeg ? "var(--color-negative)" : "var(--color-navy)"}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {format(p.eur, { short: true })}
              </text>
              <text
                x={p.x}
                y={noteY}
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--color-muted)"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {ann.note}
              </text>
            </g>
          );
        })}

        {/* Month labels */}
        {showLabels && (
          <g>
            {points.map((p, i) => (
              <text
                key={i}
                x={p.x}
                y={height - 6}
                textAnchor="middle"
                fontSize="10"
                fill="var(--color-muted)"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {p.label}
              </text>
            ))}
          </g>
        )}
      </svg>

      {richMode && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ fontFamily: "var(--font-sans)" }}>
          <StatBlock label="Avg / month" value={format(stats.avg, { short: true })} tone={stats.avg >= 0 ? "positive" : "negative"} />
          <StatBlock label="Best month" value={format(stats.best, { short: true })} tone="positive" />
          <StatBlock label="Worst month" value={format(stats.worst, { short: true })} tone={stats.worst < 0 ? "negative" : "neutral"} />
          <StatBlock label="12-month net" value={format(stats.total, { short: true })} tone={stats.total >= 0 ? "positive" : "negative"} />
        </div>
      )}
    </div>
  );
}

function Swatch({ color }: { color: string }) {
  return <span className="inline-block w-3 h-3 rounded-sm" style={{ background: color }} />;
}

function LineSwatch({ color, dashed }: { color: string; dashed?: boolean }) {
  return (
    <svg width="14" height="6" aria-hidden>
      <line
        x1="0"
        y1="3"
        x2="14"
        y2="3"
        stroke={color}
        strokeWidth="1.8"
        strokeDasharray={dashed ? "2 2" : "0"}
      />
    </svg>
  );
}

function LegendItem({
  swatch,
  label,
}: {
  swatch: React.ReactNode;
  label: string;
}) {
  return (
    <li className="inline-flex items-center gap-1.5">
      {swatch}
      <span>{label}</span>
    </li>
  );
}

function StatBlock({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "positive" | "negative" | "neutral";
}) {
  const valueColor =
    tone === "positive"
      ? "text-[var(--color-positive)]"
      : tone === "negative"
        ? "text-[var(--color-negative)]"
        : "text-[var(--color-ink)]";
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-white p-2.5">
      <div className="text-[10px] uppercase tracking-[0.10em] text-[var(--color-muted)] leading-tight">
        {label}
      </div>
      <div className={`num text-[15px] font-semibold mt-0.5 leading-tight ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}
