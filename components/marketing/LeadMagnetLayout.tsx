import Link from "next/link";
import { LeadMagnetForm } from "./LeadMagnetForm";

type Props = {
  magnet: string;
  magnetName: string;
  downloadPath: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  insideHeading: string;
  insideBullets: string[];
  whoFor: string;
  pageCount: number;
};

export function LeadMagnetLayout({
  magnet,
  magnetName,
  downloadPath,
  eyebrow,
  title,
  subtitle,
  insideHeading,
  insideBullets,
  whoFor,
  pageCount,
}: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-12 lg:pt-20 pb-20">
        <nav
          className="text-[12.5px] text-[var(--color-muted)] mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link href="/" className="hover:text-[var(--color-accent)]">
            Home
          </Link>{" "}
          ›{" "}
          <Link href="/resources" className="hover:text-[var(--color-accent)]">
            Resources
          </Link>{" "}
          › <span className="text-[var(--color-ink)]">{magnetName}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
          {/* Copy */}
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {eyebrow}
            </p>
            <h1
              className="text-[36px] lg:text-[48px] leading-[1.05] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>
            <p
              className="mt-5 text-[17px] leading-[1.55] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {subtitle}
            </p>

            <div
              className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:p-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div
                className="text-[16px] font-semibold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {insideHeading}
              </div>
              <ul className="space-y-2 text-[14.5px] leading-[1.55] text-[var(--color-ink)]">
                {insideBullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-navy)] flex-shrink-0"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span>📄 PDF · {pageCount} pages</span>
              <span aria-hidden>·</span>
              <span>Free</span>
              <span aria-hidden>·</span>
              <span>No card required</span>
            </div>

            <p
              className="mt-8 text-[14px] text-[var(--color-muted)] leading-[1.55]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <strong className="text-[var(--color-ink)]">Who this is for:</strong> {whoFor}
            </p>
          </div>

          {/* Form */}
          <aside className="lg:sticky lg:top-24">
            <LeadMagnetForm
              magnet={magnet}
              magnetName={magnetName}
              downloadPath={downloadPath}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
