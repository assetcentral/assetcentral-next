"use client";

import Link from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";

// Nav order:
//   • Watch — the 60-second explainer; first stop for a first-time
//     visitor (lowest commitment).
//   • Product (dropdown) — the three-pillar framework: Model /
//     Monitor / Manage. "All features" sits at the bottom of the
//     dropdown as the exhaustive view.
//   • Calculators / Pricing / Partners / Resources — the rest of the
//     product surface.
//
// "Get started" was folded into "Watch" in the 2026-06 simplification —
// the two video entry points were doing the same first-step job. The
// signup CTA in the right-hand actions handles the conversion-action
// side; visitors who want to see the product land on /demo/60.

type FlatLink = { href: string; label: string; kind?: "flat" };
type DropdownGroup = {
  kind: "dropdown";
  label: string;
  items: { href: string; label: string; description?: string }[];
};
type NavItem = FlatLink | DropdownGroup;

const navItems: NavItem[] = [
  { href: "/demo/60", label: "Watch", kind: "flat" },
  { href: "/#how-it-works", label: "How it works", kind: "flat" },
  {
    kind: "dropdown",
    label: "Product",
    items: [
      {
        href: "/model",
        label: "Model",
        description: "Every property, on paper, in 10 minutes.",
      },
      {
        href: "/monitor",
        label: "Monitor",
        description: "Catch the drift before it costs you.",
      },
      {
        href: "/manage",
        label: "Manage",
        description: "Make the call the agents would make.",
      },
      {
        href: "/features",
        label: "All features",
        description: "Every surface and capability in one page.",
      },
    ],
  },
  { href: "/calculators", label: "Calculators", kind: "flat" },
  { href: "/pricing", label: "Pricing", kind: "flat" },
  { href: "/partners", label: "Partners", kind: "flat" },
  { href: "/resources", label: "Resources", kind: "flat" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Desktop dropdown open state — keyed by the dropdown label. Only one
  // can be open at a time (we only have one dropdown for now, but keying
  // by label keeps the code extensible without restructuring later).
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Mobile expanded-group state — same shape.
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

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

  // Close the desktop dropdown on Escape, on click-outside, and when the
  // user clicks any link inside it (handled by the Link onClick below).
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [openDropdown]);

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

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) =>
            item.kind === "dropdown" ? (
              <DesktopDropdown
                key={item.label}
                ref={item.label === openDropdown ? dropdownRef : null}
                item={item}
                isOpen={openDropdown === item.label}
                onOpen={() => setOpenDropdown(item.label)}
                onClose={() => setOpenDropdown(null)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setOpenDropdown(null)}
                className="text-sm text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-sm px-3 py-2 text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Log in
          </Link>
          {/* Nav CTA is the direct-subscribe path (Subscribe now) as of
              2026-06. Previously offered "Start free trial" — but the
              principal call-to-action site-wide is now Subscribe, with
              the trial demoted to a secondary fallback inside the
              pricing cards / final CTA / signup page. Keep the trial
              reachable from those pages; in the nav it would compete
              with the primary intent and dilute conversion. */}
          <Link
            href="/signup?plan=pro_monthly&intent=direct"
            className="plausible-event-name=signup_cta_click plausible-event-location=nav_direct hidden sm:inline-flex items-center text-sm font-medium px-4 py-2 rounded-md bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Subscribe now
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
              className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {navItems.map((item) =>
                item.kind === "dropdown" ? (
                  <MobileGroup
                    key={item.label}
                    item={item}
                    isOpen={openMobileGroup === item.label}
                    onToggle={() =>
                      setOpenMobileGroup((cur) =>
                        cur === item.label ? null : item.label,
                      )
                    }
                    onLinkClick={() => setOpen(false)}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center min-h-[48px] px-3 rounded-md text-[15px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[48px] px-3 rounded-md text-[15px] text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
                >
                  Log in
                </Link>
                {/* Mobile nav matches desktop — direct subscribe is the
                    principal CTA. See note on the desktop button above. */}
                <Link
                  href="/signup?plan=pro_monthly&intent=direct"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center min-h-[48px] px-4 rounded-md text-[15px] font-medium bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] transition-colors"
                >
                  Subscribe now
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

// ── Desktop dropdown ───────────────────────────────────────────────────
//
// Hover-on-enter, click-to-toggle. Closes on Escape / click-outside
// (wired in the parent useEffect). Each item shows label + 1-line
// description for at-a-glance comprehension — the dropdown is
// information-dense by design since visitors land here looking for the
// framework, not a one-word menu of features.

interface DesktopDropdownProps {
  item: DropdownGroup;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function DesktopDropdownInner(
  { item, isOpen, onOpen, onClose }: DesktopDropdownProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {item.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          aria-hidden
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M5 7.5 1.5 3.5h7L5 7.5Z" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[320px] rounded-xl border border-[var(--color-border)] bg-white shadow-xl p-2"
          // Pad the top with a transparent overlay so the user can move
          // from the button to the menu without the mouseLeave firing
          // (the gap would otherwise trigger close).
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {item.items.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={onClose}
              className="block px-3 py-2.5 rounded-md hover:bg-[var(--color-surface)] transition-colors"
            >
              <div className="text-[14px] font-medium text-[var(--color-navy)]">
                {sub.label}
              </div>
              {sub.description && (
                <div className="text-[12.5px] leading-[1.4] text-[var(--color-muted)] mt-0.5">
                  {sub.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// React.forwardRef wrapper — keeps the parent able to wire a click-outside
// detector via the dropdownRef ref. Explicit displayName so React DevTools
// and any ESLint react/display-name rule (Vercel's preset triggers on it
// even when the local Next build skips lint) are happy.
const DesktopDropdown = forwardRef(DesktopDropdownInner);
DesktopDropdown.displayName = "DesktopDropdown";

// ── Mobile collapsible group ───────────────────────────────────────────

function MobileGroup({
  item,
  isOpen,
  onToggle,
  onLinkClick,
}: {
  item: DropdownGroup;
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between min-h-[48px] px-3 rounded-md text-[15px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)] transition-colors"
      >
        <span>{item.label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 10 10"
          fill="currentColor"
          aria-hidden
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M5 7.5 1.5 3.5h7L5 7.5Z" />
        </svg>
      </button>
      {isOpen && (
        <div className="ml-3 pl-3 border-l border-[var(--color-border)] mt-1 mb-1 flex flex-col gap-0.5">
          {item.items.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={onLinkClick}
              className="flex items-center min-h-[44px] px-3 rounded-md text-[14px] text-[var(--color-ink)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)] transition-colors"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

