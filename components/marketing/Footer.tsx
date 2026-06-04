import Link from "next/link";

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/calculators", label: "Calculators" },
      { href: "/pricing", label: "Pricing" },
      // Label was "Changelog" but the destination is the Resources hub
      // (guides), not a changelog. Relabelled so the link tells the
      // truth about where it sends you.
      { href: "/resources", label: "All resources" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/demo/get-started", label: "Get started (90s)" },
      { href: "/resources", label: "All guides" },
      { href: "/resources/net-yield-vs-gross-yield", label: "Net yield guide" },
      { href: "/resources/str-operator-performance-check", label: "Short-term rental operator check" },
      { href: "/downloads/portfolio-health-checklist", label: "Free: Health Checklist" },
      { href: "/downloads/off-plan-handover-decision-tree", label: "Free: Handover Tree" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/partners", label: "Partners" },
      { href: "/privacy", label: "Privacy" },
      { href: "/cookies", label: "Cookies" },
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
            {/* Footer CTA promotes the direct-subscribe path as of
                2026-06 — site-wide pattern is Subscribe now = primary,
                trial = secondary. The trial is still reachable from the
                pricing card on the homepage / /pricing. */}
            <Link
              href="/signup?plan=pro_monthly&intent=direct"
              className="inline-flex items-center justify-center min-h-[44px] text-sm font-medium px-4 rounded-md bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Subscribe now
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
            © 2026 AssetCentral.ai · Built for owners.
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
