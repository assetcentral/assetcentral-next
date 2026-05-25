import Link from "next/link";

const magnets = [
  {
    href: "/downloads/portfolio-health-checklist",
    eyebrow: "Quarterly review",
    title: "Portfolio Health Checklist",
    blurb:
      "24 checks every private owner should run quarterly. Per-asset, portfolio-wide, plus an action-priority framework.",
    pages: 4,
  },
  {
    href: "/downloads/off-plan-handover-decision-tree",
    eyebrow: "Decision tree",
    title: "Off-plan Handover Decision Tree",
    blurb:
      "Stage payment due, cash tight. Four options, three decision questions, documents each path needs.",
    pages: 4,
  },
];

export function LeadMagnetsSection() {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free downloads
          </p>
          <h2
            className="text-[32px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Two free PDFs. No fluff.
          </h2>
          <p
            className="mt-3 text-[16px] leading-[1.55] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Practical, specific, and printable. Email to download — we&rsquo;ll send the PDF and add you to the monthly newsletter.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {magnets.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="plausible-event-name=lead_magnet_card_click group relative rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-8 hover:border-[var(--color-navy)] hover:shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] transition flex flex-col"
            >
              <p
                className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-accent)] mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {m.eyebrow}
              </p>
              <h3
                className="text-[22px] lg:text-[24px] leading-[1.15] text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {m.title}
              </h3>
              <p
                className="text-[14.5px] leading-[1.6] text-[var(--color-ink)] flex-1"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {m.blurb}
              </p>
              <div
                className="mt-5 flex items-center justify-between text-[13px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span className="text-[var(--color-muted)]">📄 PDF · {m.pages} pages</span>
                <span className="text-[var(--color-accent)] font-medium group-hover:underline">
                  Get the PDF →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
