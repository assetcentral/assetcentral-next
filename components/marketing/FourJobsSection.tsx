type Job = {
  number: string;
  name: string;
  headline: string;
  tagline: string;
  bullets: string[];
  tint: "white" | "navy";
};

const jobs: Job[] = [
  {
    number: "01",
    name: "The Set-Up",
    headline: "See what's going on",
    tagline: "Most owners have never seen their real net yield.",
    bullets: [
      "Real net yield per asset — after mortgage, costs, fees, vacancy, tax",
      "Every asset in one dashboard, every currency converted automatically",
      "Cashflow calendar: every payment due, 12 months ahead",
      "Benchmarked against market data for your area",
    ],
    tint: "white",
  },
  {
    number: "02",
    name: "The Uplift",
    headline: "Improve what you earn",
    tagline:
      "Your portfolio is probably earning less than it should. Here's why — and what to do.",
    bullets: [
      "Identifies rent below the area median and quantifies the monthly upside",
      "Flags operator agreements that may be over-charging",
      "Models whether self-managing specific tasks beats the 25% commission",
      "Finds refinancing opportunities and generates the lender pack automatically",
    ],
    tint: "navy",
  },
  {
    number: "03",
    name: "The Workhorse",
    headline: "Checks the things you don't",
    tagline: "The unglamorous work that protects your returns.",
    bullets: [
      "Verifies short-term rental operator statements against expected bookings and rates",
      "Checks service charge invoices and flags anomalies",
      "Confirms rent payments are arriving on time",
      "Tracks surplus cash and flags when it should be working harder",
    ],
    tint: "navy",
  },
  {
    number: "04",
    name: "The Winners",
    headline: "Better decisions, better timing",
    tagline:
      "Real estate returns are made at the margin — by people with better information.",
    bullets: [
      "Market radar: know when comparable properties in your building or street sell",
      "Sell vs hold analysis: at what price does selling outperform holding?",
      "Acquisition simulator: see portfolio-wide impact of any new property before you buy",
      "Execution support: refinancing proposals, investor presentations, sales brochures",
    ],
    tint: "white",
  },
];

export function FourJobsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What AssetCentral does for you
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Four things a professional asset manager does. Now available to every owner.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {jobs.map((job) => (
            <JobCard key={job.number} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JobCard({ job }: { job: Job }) {
  const isNavy = job.tint === "navy";
  return (
    <article
      className={`rounded-2xl border p-7 lg:p-9 flex flex-col gap-5 ${
        isNavy
          ? "bg-[var(--color-navy)] border-[var(--color-navy)] text-white"
          : "bg-white border-[var(--color-border)] text-[var(--color-ink)]"
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span
          className={`num text-[40px] lg:text-[44px] font-semibold leading-none ${
            isNavy ? "text-white/30" : "text-[var(--color-border)]"
          }`}
        >
          {job.number}
        </span>
        <span
          className={`text-[12px] uppercase tracking-[0.12em] ${
            isNavy ? "text-white/70" : "text-[var(--color-muted)]"
          }`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {job.name}
        </span>
      </div>

      <div>
        <h3
          className={`text-[26px] lg:text-[30px] leading-[1.1] ${
            isNavy ? "text-white" : "text-[var(--color-navy)]"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {job.headline}
        </h3>
        <p
          className={`mt-2 text-[14.5px] italic ${
            isNavy ? "text-white/75" : "text-[var(--color-muted)]"
          }`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {job.tagline}
        </p>
      </div>

      <ul className="space-y-2.5">
        {job.bullets.map((b) => (
          <li
            key={b}
            className={`flex gap-3 text-[14.5px] leading-[1.5] ${
              isNavy ? "text-white/90" : "text-[var(--color-ink)]"
            }`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span
              aria-hidden
              className={`mt-2 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                isNavy ? "bg-[var(--color-accent)]" : "bg-[var(--color-navy)]"
              }`}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
