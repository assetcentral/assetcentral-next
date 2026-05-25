import Link from "next/link";

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/calculators", label: "Calculators" },
      { href: "/pricing", label: "Pricing" },
      { href: "/resources", label: "Changelog" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/resources", label: "All guides" },
      { href: "/resources/net-yield-vs-gross-yield", label: "Net yield guide" },
      { href: "/resources/str-operator-performance-check", label: "STR operator check" },
      { href: "/downloads/portfolio-health-checklist", label: "Free: Health Checklist" },
      { href: "/downloads/off-plan-handover-decision-tree", label: "Free: Handover Tree" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "mailto:hello@assetcentral.ai", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {columns.map((col) => (
            <div key={col.heading}>
              <div
                className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-3"
                style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.08em" }}
              >
                {col.heading}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div
              className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-3"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.08em" }}
            >
              Start
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center min-h-[44px] text-sm font-medium px-4 rounded-md bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start free trial
            </Link>
            <div className="mt-3">
              <Link
                href="/login"
                className="text-sm text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Log in
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t border-[var(--color-border)] text-xs leading-[1.6] text-[var(--color-muted)] space-y-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div>
            © 2026 AssetCentral. Built for owners, not institutions.
          </div>
          <div>
            AssetCentral is software for tracking and analysing property portfolios. Information and outputs on this site and in the product are not financial, tax, legal, or investment advice. Always consult a qualified, licensed adviser before making any property, tax, or financing decision. See our{" "}
            <Link href="/terms" className="underline">
              terms
            </Link>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
