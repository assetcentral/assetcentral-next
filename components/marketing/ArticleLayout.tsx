import Link from "next/link";
import { ArticleReadTracker } from "@/components/analytics/ArticleReadTracker";
import { ScrollDepth } from "@/components/analytics/ScrollDepth";

type Related = { slug: string; title: string };

export function ArticleLayout({
  slug,
  title,
  description,
  date,
  readMins,
  related,
  children,
}: {
  /** Article slug used for analytics (e.g. "mortgage-types-explained"). */
  slug?: string;
  title: string;
  description: string;
  date: string;
  readMins: number;
  related: Related[];
  children: React.ReactNode;
}) {
  return (
    <>
      {slug ? <ArticleReadTracker slug={slug} /> : null}
      {slug ? <ScrollDepth page={`/resources/${slug}`} /> : null}
      <article className="bg-white">
        <div className="mx-auto max-w-[680px] px-6 lg:px-8 pt-16 lg:pt-20 pb-16">
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
            </Link>
          </nav>

          <h1
            className="text-[36px] lg:text-[44px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>

          <p
            className="mt-4 text-[18px] leading-[1.55] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {description}
          </p>

          <div
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--color-muted)] pb-8 border-b border-[var(--color-border)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>AssetCentral editorial team</span>
            <span aria-hidden>·</span>
            <span>{date}</span>
            <span aria-hidden>·</span>
            <span>{readMins} min read</span>
          </div>

          <div
            className="prose-ac mt-10 space-y-6 text-[16.5px] leading-[1.7] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {children}
          </div>
        </div>
      </article>

      <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-14">
          <h2
            className="text-[22px] text-[var(--color-navy)] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            More guides
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/resources/${r.slug}`}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5 hover:border-[var(--color-navy)] transition"
              >
                <div
                  className="text-[15px] font-semibold text-[var(--color-navy)] leading-tight"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {r.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[24px] lg:text-[26px] leading-[1.2] text-[var(--color-navy)] mt-12 mb-3"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-7 rounded-lg border-l-4 border-[var(--color-accent)] bg-[var(--color-surface)] px-5 py-4 text-[15.5px] leading-[1.6] text-[var(--color-ink)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </div>
  );
}

export function CtaBox({
  href,
  label,
  blurb,
}: {
  href: string;
  label: string;
  blurb: string;
}) {
  return (
    <div className="mt-12 rounded-2xl bg-[var(--color-navy)] text-white p-6 lg:p-8">
      <p
        className="text-[18px] leading-[1.45] mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {blurb}
      </p>
      <Link
        href={href}
        className="inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-white text-[var(--color-navy)] text-[14px] font-semibold hover:bg-slate-100 transition-colors"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label} →
      </Link>
    </div>
  );
}
