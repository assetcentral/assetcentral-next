type Severity = "info" | "warning" | "critical";

const severityStyles: Record<Severity, { wrap: string; dot: string }> = {
  info: {
    wrap: "border-slate-200 bg-white text-[var(--color-ink)]",
    dot: "bg-[var(--color-accent)]",
  },
  warning: {
    wrap: "border-amber-200 bg-amber-50 text-amber-900",
    dot: "bg-[var(--color-warning)]",
  },
  critical: {
    wrap: "border-red-200 bg-red-50 text-red-900",
    dot: "bg-[var(--color-negative)]",
  },
};

export function AlertBadge({
  severity = "info",
  children,
  className = "",
}: {
  severity?: Severity;
  children: React.ReactNode;
  className?: string;
}) {
  const styles = severityStyles[severity];
  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-[12px] ${styles.wrap} ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${styles.dot}`} aria-hidden />
      <span className="truncate">{children}</span>
    </div>
  );
}
