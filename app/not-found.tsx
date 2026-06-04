// Custom 404 — renders for any unmatched URL across the entire app.
// Uses the same Nav + Footer chrome as marketing pages so visitors stay
// inside the funnel rather than bouncing. Robots are told NOT to index
// the page (it's a fallback, not content) but DO follow outbound links
// so any link equity flowing into a broken URL still reaches real
// pages.
//
// This file sits at app/not-found.tsx (root, not under any route group)
// so it catches everything — Next falls back to the root not-found for
// unmatched URLs in any segment.

import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/marketing/Footer";
import { Nav } from "@/components/marketing/Nav";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "We couldn't find that page. Try the homepage, resources, calculators or our 90-second demo.",
  robots: { index: false, follow: true },
};

const TILES = [
  {
    href: "/",
    label: "Home",
    blurb: "Start at the front door.",
  },
  {
    href: "/resources",
    label: "Resources",
    blurb: "Practical guides for serious property investors.",
  },
  {
    href: "/calculators",
    label: "Calculators",
    blurb: "Free tools — IRR, mortgage, retrofit, off-plan.",
  },
  {
    href: "/demo/60",
    label: "Demo",
    blurb: "60-second tour of what AssetCentral does.",
  },
];

const AGENTS = [
  { label: "Your CEO", href: "/features" },
  { label: "Finance Manager", href: "/features" },
  { label: "Market Analyst", href: "/features" },
  { label: "Operations Manager", href: "/features" },
  { label: "Portfolio Personal Assistant", href: "/features" },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1 overflow-x-clip">
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              404
            </p>
            <h1
              className="text-[44px] lg:text-[64px] leading-[1.04] text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Page not found.
            </h1>
            <p
              className="mt-6 text-[17px] lg:text-[19px] leading-[1.55] text-[var(--color-muted)] max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The page you were after has moved or never existed. Pick one of
              these to keep looking — or jump straight to the team.
            </p>
          </div>
        </section>

        {/* Four navigation tiles */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-14">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TILES.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-8 transition hover:border-[var(--color-navy)] hover:shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)]"
                >
                  <h2
                    className="text-[22px] lg:text-[24px] leading-[1.15] text-[var(--color-navy)] mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.label}
                  </h2>
                  <p
                    className="text-[14.5px] leading-[1.55] text-[var(--color-ink)] mb-5"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {t.blurb}
                  </p>
                  <span
                    className="inline-flex items-center text-[14px] font-medium text-[var(--color-accent)] group-hover:underline"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Go to {t.label.toLowerCase()} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Or jump to the team */}
        <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 lg:py-20">
            <p
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Or jump to the team
            </p>
            <h2
              className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Meet the five agents working on your portfolio.
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {AGENTS.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-[14.5px] text-[var(--color-navy)] hover:border-[var(--color-navy)] transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {a.label} →
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center text-[14.5px] font-medium text-[var(--color-accent)] hover:underline"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Read about why AssetCentral exists →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
