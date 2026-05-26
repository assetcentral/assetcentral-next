"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/demo/get-started", label: "Get started" },
  { href: "/demo/60", label: "Watch" },
  { href: "/features", label: "Features" },
  { href: "/calculators", label: "Calculators" },
  { href: "/pricing", label: "Pricing" },
  { href: "/partners", label: "Partners" },
  { href: "/resources", label: "Resources" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when viewport widens past mobile
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background,border,backdrop-filter] duration-200 ${
        scrolled || open
          ? "bg-white/95 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-10 h-16">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-display text-xl text-[var(--color-navy)]"
          aria-label="AssetCentral.ai — home"
        >
          <span
            aria-hidden
            className="inline-block w-6 h-6 rounded-md bg-[var(--color-navy)] text-white text-[11px] font-semibold flex items-center justify-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AC
          </span>
          <span>
            AssetCentral<span className="text-[var(--color-accent)]">.ai</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-sm px-3 py-2 text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="plausible-event-name=signup_cta_click plausible-event-location=nav hidden sm:inline-flex items-center text-sm font-medium px-4 py-2 rounded-md bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Start free trial
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel + backdrop */}
      {open && (
        <>
          {/* tap-outside backdrop — sits BELOW the menu panel but covers rest of screen */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 top-16 bg-[var(--color-navy)]/20 backdrop-blur-[1px] z-40"
          />
          <div
            id="mobile-menu"
            className="md:hidden absolute left-0 right-0 top-full border-t border-[var(--color-border)] bg-white shadow-lg z-50"
          >
            <nav
              className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[48px] px-3 rounded-md text-[15px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[48px] px-3 rounded-md text-[15px] text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center min-h-[48px] px-4 rounded-md text-[15px] font-medium bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] transition-colors"
                >
                  Start free trial
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
