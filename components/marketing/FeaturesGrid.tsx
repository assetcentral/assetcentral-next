import Link from "next/link";

type Feature = {
  name: string;
  body: string;
  icon: React.ReactNode;
};

function Icon({ paths }: { paths: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths}
    </svg>
  );
}

const features: Feature[] = [
  {
    name: "Real net yield",
    body: "Gross rent minus vacancy, costs, mortgage, tax. The number that actually matters, per asset and across the portfolio.",
    icon: (
      <Icon
        paths={
          <>
            <path d="M3 17l4-4 4 4 6-6 4 4" />
            <path d="M3 21h18" />
          </>
        }
      />
    ),
  },
  {
    name: "Loan tracker",
    body: "Every mortgage, rate reversion date, maturity, and monthly payment. Alerts 90 days before action is needed.",
    icon: (
      <Icon
        paths={
          <>
            <rect x="3" y="6" width="18" height="14" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 3v4" />
            <path d="M16 3v4" />
          </>
        }
      />
    ),
  },
  {
    name: "Cashflow calendar",
    body: "Every payment due, 12 months ahead, across all assets and currencies. Stage payments, mortgages, capex, rent — one view.",
    icon: (
      <Icon
        paths={
          <>
            <path d="M3 21h18" />
            <rect x="5" y="11" width="3" height="8" />
            <rect x="10.5" y="7" width="3" height="12" />
            <rect x="16" y="13" width="3" height="6" />
          </>
        }
      />
    ),
  },
  {
    name: "Document vault",
    body: "Upload contracts, leases, invoices. AI extracts key dates and amounts automatically. Nothing to type.",
    icon: (
      <Icon
        paths={
          <>
            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <path d="M14 3v6h6" />
          </>
        }
      />
    ),
  },
  {
    name: "Data ingestion",
    body: "Forward a WhatsApp, email a statement, photograph an invoice. AssetCentral reads it and updates your portfolio automatically.",
    icon: (
      <Icon
        paths={
          <>
            <path d="M21 12a9 9 0 1 1-3.5-7.1" />
            <polyline points="21 4 21 10 15 10" />
          </>
        }
      />
    ),
  },
  {
    name: "Operator checker",
    body: "Verify STR and property management statements. Know if your 25% commission is producing 25% worth of bookings.",
    icon: (
      <Icon
        paths={
          <>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
            <path d="M8.5 11.5l2 2 4-4" />
          </>
        }
      />
    ),
  },
  {
    name: "Portfolio reports",
    body: "Lender-ready refinancing packs, investor presentations, tax reports. Generated in minutes from your portfolio data.",
    icon: (
      <Icon
        paths={
          <>
            <path d="M4 4h12l4 4v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <path d="M16 4v4h4" />
            <path d="M8 13h8" />
            <path d="M8 17h6" />
          </>
        }
      />
    ),
  },
  {
    name: "Multi-currency",
    body: "AED, EUR, GBP, USD across your portfolio. Everything converts to your base currency automatically. Exchange rates updated daily.",
    icon: (
      <Icon
        paths={
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a13 13 0 0 1 0 18" />
            <path d="M12 3a13 13 0 0 0 0 18" />
          </>
        }
      />
    ),
  },
];

export function FeaturesGrid() {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What&rsquo;s inside
          </p>
          <h2
            className="text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Eight things that come with your portfolio workspace.
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <article
              key={f.name}
              className="rounded-xl border border-[var(--color-border)] bg-white p-5"
            >
              <div className="w-9 h-9 rounded-md bg-[var(--color-navy)] text-white flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3
                className="text-[17px] font-semibold leading-tight text-[var(--color-navy)] mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {f.name}
              </h3>
              <p
                className="text-[13.5px] leading-[1.55] text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {f.body}
              </p>
            </article>
          ))}
        </div>

        <p
          className="mt-8 text-[14.5px] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          And more — acquisition simulation, sell vs hold analysis, market radar, team access.{" "}
          <Link
            href="/features"
            className="text-[var(--color-accent)] font-medium hover:underline"
          >
            See all features →
          </Link>
        </p>
      </div>
    </section>
  );
}
