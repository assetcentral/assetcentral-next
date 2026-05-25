import Link from "next/link";

type Calc = {
  slug: string;
  name: string;
  blurb: string;
};

const calcs: Calc[] = [
  {
    slug: "mortgage",
    name: "Mortgage Calculator",
    blurb: "Country rules for 10 markets — GCC (UAE, Oman, Saudi), UK, EU.",
  },
  {
    slug: "irr",
    name: "IRR Calculator",
    blurb: "Model your return over any hold period.",
  },
  {
    slug: "str-yield",
    name: "STR Yield Calculator",
    blurb: "Compare short-term vs long-term rental income.",
  },
  {
    slug: "retrofit",
    name: "Retrofit Cost Calculator",
    blurb: "Estimate upgrade costs vs yield improvement.",
  },
  {
    slug: "ownership",
    name: "Ownership Comparator",
    blurb: "Outright vs mortgaged — which is better?",
  },
];

export function CalculatorsCta() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free tools
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start with our free tools
          </h2>
          <p
            className="mt-4 text-[16.5px] leading-[1.6] text-[var(--color-muted)] max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Our calculators are free, always. No account required. Used by thousands of investors to evaluate properties before they buy.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {calcs.map((c) => (
            <Link
              key={c.slug}
              href={`/calculators/${c.slug}`}
              className="group rounded-xl border border-[var(--color-border)] bg-white p-5 hover:border-[var(--color-navy)] hover:shadow-[0_15px_40px_-25px_rgba(15,23,42,0.25)] transition"
            >
              <h3
                className="text-[17px] font-semibold leading-tight text-[var(--color-navy)] mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {c.name}
              </h3>
              <p
                className="text-[13.5px] leading-[1.55] text-[var(--color-muted)] mb-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {c.blurb}
              </p>
              <span
                className="text-[13px] font-medium text-[var(--color-accent)] group-hover:underline"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Use free →
              </span>
            </Link>
          ))}
        </div>

        <p
          className="mt-8 text-[14px] text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Saved a result you like? Import it directly into your portfolio — no re-entry needed.
        </p>
      </div>
    </section>
  );
}
