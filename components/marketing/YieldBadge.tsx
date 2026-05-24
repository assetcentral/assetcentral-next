type Tone = "positive" | "warning" | "negative" | "neutral";

const toneStyles: Record<Tone, string> = {
  positive: "bg-green-50 text-[var(--color-positive)] border-green-200",
  warning: "bg-amber-50 text-[var(--color-warning)] border-amber-200",
  negative: "bg-red-50 text-[var(--color-negative)] border-red-200",
  neutral: "bg-slate-50 text-[var(--color-muted)] border-slate-200",
};

export function YieldBadge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${toneStyles[tone]} ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </span>
  );
}
