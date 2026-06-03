import Link from "next/link";
import { ScrollDepth } from "@/components/analytics/ScrollDepth";
import { CalcOpenTracker } from "@/components/analytics/CalcOpenTracker";
import { StickyCta } from "./StickyCta";
import { calculatorBreadcrumb } from "@/lib/schema";

type Related = { slug: string; name: string; blurb: string };

const allCalcs: Record<string, Related> = {
  mortgage: {
    slug: "mortgage",
    name: "Mortgage Calculator",
    blurb: "Country-aware: monthly payment, transfer tax, LTV limits.",
  },
  irr: {
    slug: "irr",
    name: "IRR Calculator",
    blurb: "Model return over any hold period.",
  },
  "str-yield": {
    slug: "str-yield",
    name: "Short-term Rental Yield Calculator",
    blurb: "Compare short-term vs long-term rental income.",
  },
  retrofit: {
    slug: "retrofit",
    name: "Retrofit Cost Calculator",
    blurb: "Estimate upgrade costs vs yield improvement.",
  },
  ownership: {
    slug: "ownership",
    name: "Ownership Comparator",
    blurb: "Outright vs mortgaged — which is better?",
  },
};

export function CalculatorShell({
  slug,
  title,
  subtitle,
  children,
  interpret,
  doesNotInclude,
}: {
  slug: keyof typeof allCalcs;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  interpret: string[];
  doesNotInclude: string;
}) {
  const related = (Object.values(allCalcs) as Related[]).filter((c) => c.slug !== slug);
  const calcName = allCalcs[slug]?.name ?? title;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorBreadcrumb(slug, calcName)) }}
      />
      <CalcOpenTracker calc={slug} />
      <ScrollDepth page={`/calculators/${slug}`} />
      <StickyCta
        message="Track this in your full portfolio. Free for up to 3 properties."
        threshold={0.35}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-10 lg:pt-14 pb-6">
          <nav
            className="text-[12.5px] text-[var(--color-muted)] mb-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link href="/" className="hover:text-[var(--color-accent)]">
              Home
            </Link>{" "}
            ›{" "}
            <Link href="/calculators" className="hover:text-[var(--color-accent)]">
              Calculators
            </Link>{" "}
            › <span className="text-[var(--color-ink)]">{title}</span>
          </nav>
          <h1
            className="text-[40px] lg:text-[52px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          <p
            className="mt-4 text-[16.5px] lg:text-[18px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pb-16">
          <div
            className="mb-6 rounded-md border-l-4 border-[var(--color-warning)] bg-amber-50 px-4 py-3 text-[13px] leading-[1.55] text-amber-900"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <strong>Not financial advice.</strong> This calculator is for
            informational use. Outputs depend entirely on the assumptions you enter.
            It is not financial, tax, legal, mortgage, or investment advice. Consult a
            qualified, licensed adviser in your jurisdiction before any property,
            financing, or tax decision.
          </div>
          {children}
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-14 grid lg:grid-cols-2 gap-10">
          <div>
            <h2
              className="text-[22px] text-[var(--color-navy)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How to interpret your results
            </h2>
            <ul
              className="space-y-2 text-[14.5px] leading-[1.55] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {interpret.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-navy)] flex-shrink-0"
                  />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2
              className="text-[22px] text-[var(--color-navy)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What this doesn&rsquo;t include
            </h2>
            <p
              className="text-[14.5px] leading-[1.6] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {doesNotInclude}
            </p>
            <div
              className="mt-5 rounded-lg border border-[var(--color-border)] bg-white p-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div className="text-[14px] font-semibold text-[var(--color-navy)] mb-1">
                Save this result
              </div>
              <p className="text-[13px] text-[var(--color-muted)] mb-3">
                Create a free account to save this result and import it into your portfolio later.
              </p>
              <Link
                href="/signup?plan=pro_monthly&intent=direct"
                className="inline-flex items-center text-[13.5px] font-medium px-4 py-2 rounded-md bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] transition-colors"
              >
                Subscribe now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16">
          <h2
            className="text-[22px] text-[var(--color-navy)] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Related calculators
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5 hover:border-[var(--color-navy)] transition"
              >
                <div
                  className="text-[15px] font-semibold text-[var(--color-navy)] mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.name}
                </div>
                <div
                  className="text-[13px] text-[var(--color-muted)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.blurb}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
