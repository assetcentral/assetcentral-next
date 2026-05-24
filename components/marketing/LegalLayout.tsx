export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-24">
        <h1
          className="text-[40px] lg:text-[48px] leading-[1.05] text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
        <p
          className="mt-3 text-[13px] text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Last updated {lastUpdated}
        </p>

        <div
          className="prose-legal mt-10 space-y-6 text-[15.5px] leading-[1.65] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {children}
        </div>
      </div>
    </article>
  );
}
