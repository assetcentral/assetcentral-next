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
      // items-start (not items-center) + relative dot positioning so a
      // two-line wrap looks tidy: the dot stays aligned with the first
      // line of text instead of vertically centring across both lines.
      // leading-[1.4] gives wrapped lines enough air without bloating
      // single-line badges. min-w-0 lets the badge shrink in a grid
      // without forcing horizontal overflow.
      className={`flex items-start gap-2 rounded-md border px-3 py-2 text-[12px] leading-[1.4] min-w-0 ${styles.wrap} ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <span
        className={`inline-block w-1.5 h-1.5 mt-1.5 rounded-full shrink-0 ${styles.dot}`}
        aria-hidden
      />
      <span className="min-w-0">{children}</span>
    </div>
  );
}
