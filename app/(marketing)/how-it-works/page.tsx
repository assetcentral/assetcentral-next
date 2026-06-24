// /how-it-works — the journey page.
//
// Built as the bridge between the free B2C funnel (calculators + check)
// and the deeper Pro product (Model · Monitor · Manage + the AI team).
// Reads top-to-bottom as the seven-step ladder the user actually walks:
//
//   1 Run the numbers first        (#run-the-numbers)
//   2 Run the free calculator      (#free-calculator)
//   3 Get the free AI check        (#ai-check)
//   4 Unlock the full report       (#full-report)        — Starter
//   5 Save and compare properties  (#save-compare)       — Starter
//   6 Track your portfolio         (#portfolio)          — Pro
//   7 Talk to your AI team         (#ai-team)            — Pro
//
// Anchor ids match the "How it works" nav dropdown so each menu item
// scrolls to the matching step. The dropdown links #ai-check directly
// to step 3 — DON'T rename it without updating Nav.tsx in lockstep.
// Resist the urge to duplicate the Product page here — this is the
// journey, not the feature catalogue.

import type { Metadata } from "next";
import Link from "next/link";
import { TeamGalleryStrip } from "@/components/marketing/TeamGalleryStrip";

export const metadata: Metadata = {
  title: "How AssetCentral Works",
  description:
    "Run the numbers first. Free calculator → AI verdict → full report → saved properties → portfolio dashboard → AI property team. The seven-step ladder.",
  alternates: { canonical: "/how-it-works" },
};

interface Step {
  /** Anchor id — matches the href on the How it works nav dropdown. */
  id: string;
  /** Step number (1-7). */
  n: number;
  /** Short label rendered above the title. */
  eyebrow: string;
  /** H2. */
  title: string;
  /** Body paragraph. Plain English. */
  body: string;
  /** Per-step CTAs. */
  ctas: { label: string; href: string; variant?: "primary" | "ghost" }[];
  /** Tier this step belongs to — colour-codes the step number chip. */
  tier: "free" | "starter" | "pro";
}

const STEPS: Step[] = [
  {
    id: "run-the-numbers",
    n: 1,
    eyebrow: "Step 1 · Free",
    title: "Choose your property decision",
    body: "Buying, selling, mortgaging, refinancing, renovating, renting out or comparing a property? Start with the decision you need to check. Each route lands on the right calculator with the right inputs.",
    ctas: [
      { label: "Pick your decision →", href: "/#what-to-check", variant: "primary" },
    ],
    tier: "free",
  },
  {
    id: "free-calculator",
    n: 2,
    eyebrow: "Step 2 · Free",
    title: "Run the first numbers for free",
    body: "Use the relevant free calculator to understand the basic numbers: payment, yield, cash flow, return or break-even point. All eight Level 1 tools include a 3-row stress test that shows how the numbers move under rate, rent or vacancy shocks.",
    ctas: [
      { label: "See the free calculators →", href: "/calculators", variant: "primary" },
    ],
    tier: "free",
  },
  {
    id: "ai-check",
    n: 3,
    eyebrow: "Step 3 · Free",
    title: "Get a free AI property check",
    body: "AssetCentral gives you a simple AI view — Strong, Borderline, Weak or Risky — plus the key number, the single biggest red flag and one suggested next move. Same engine the Starter and Pro user runs on every property.",
    ctas: [
      { label: "See example analysis", href: "/#example-analysis", variant: "ghost" },
      { label: "Run a free check →", href: "/check", variant: "primary" },
    ],
    tier: "free",
  },
  {
    id: "full-report",
    n: 4,
    eyebrow: "Step 4 · Starter",
    title: "Unlock the full report when the decision gets serious",
    body: "When you're seriously evaluating one property, the Starter trial unlocks the full property decision report: 10-year cash-flow forecast, scenario analysis across rate / rent / capital growth, sell-vs-hold + refinance modelling, PDF and Word export. 7-day trial, no card.",
    ctas: [
      { label: "Try Starter free for 7 days →", href: "/signup?plan=individual_monthly", variant: "primary" },
    ],
    tier: "starter",
  },
  {
    id: "save-compare",
    n: 5,
    eyebrow: "Step 5 · Starter",
    title: "Save and compare properties",
    body: "Save the property, run another one, then compare them side by side. Starter holds up to three saved properties and gives you the full decision report on each. Build a record of decisions so you can show the working when you act.",
    ctas: [
      { label: "See pricing →", href: "/pricing", variant: "ghost" },
    ],
    tier: "starter",
  },
  {
    id: "portfolio",
    n: 6,
    eyebrow: "Step 6 · Pro",
    title: "Move into portfolio control",
    body: "Once you own multiple properties, AssetCentral becomes the place you model, monitor and manage the full portfolio. Real-time net-yield monitoring, 22 alert types across rent, debt and voids, document vault with AI extraction. For owners with 2–50 properties.",
    ctas: [
      { label: "Explore Pro →", href: "/pricing", variant: "primary" },
    ],
    tier: "pro",
  },
  {
    id: "ai-team",
    n: 7,
    eyebrow: "Step 7 · Pro",
    title: "Talk to your AI property team",
    body: "When the decision gets complex, your AI property team helps you think like a professional owner. Five agents — Chief Investment Officer (modelling), Chief Financial Officer (cash flow + debt), Chief Operations Officer (leases + operators), Personal Assistant (documents + reminders), Chief Executive (strategy + ranked priorities).",
    ctas: [
      { label: "Meet the team →", href: "/features", variant: "primary" },
    ],
    tier: "pro",
  },
];

const TIER_CHIP: Record<Step["tier"], { bg: string; text: string }> = {
  free: { bg: "rgba(22, 163, 74, 0.10)", text: "var(--color-positive)" },
  starter: { bg: "rgba(79, 110, 247, 0.10)", text: "var(--color-accent)" },
  pro: { bg: "rgba(26, 26, 46, 0.08)", text: "var(--color-navy)" },
};

export default function HowItWorksPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-white pt-16 lg:pt-24 pb-12 lg:pb-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p
            className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)] font-semibold mb-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How it works
          </p>
          <h1
            className="text-[44px] md:text-[58px] lg:text-[68px] leading-[1.02] tracking-tight text-[color:var(--color-navy)] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Run the numbers first.{" "}
            <span className="text-[color:var(--color-accent)] italic">
              Then decide with confidence.
            </span>
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[22px] leading-[1.5] text-[color:var(--color-ink)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Start with a free property check. If the decision is serious,
            unlock the full report, compare scenarios and track the property
            over time. The same engine — from one free check to full portfolio
            control.
          </p>
          <div
            className="mt-9 flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/check"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] px-6 py-3.5 rounded-md bg-[color:var(--color-navy)] text-white text-[15.5px] font-semibold shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
            >
              Check a property for free
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="#example-analysis"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] px-6 py-3.5 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] text-[15.5px] font-semibold transition hover:border-[color:var(--color-navy)]"
            >
              See example analysis
            </Link>
          </div>
        </div>
      </section>

      {/* ── Seven steps ──────────────────────────────────────────── */}
      <section className="bg-[color:var(--color-surface)] border-t border-[color:var(--color-border)] py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="space-y-12 lg:space-y-16">
            {STEPS.map((step) => (
              <StepBlock key={step.id} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team faces — keeps the AI team visible on /how-it-works
           between the 7-step ladder and the "upgrade when serious"
           bottom strap. Tier 7 of the ladder names the team; this
           strip puts faces to the names. ── */}
      <TeamGalleryStrip
        eyebrow="Step 7 in faces"
        heading="The five agents your decisions get reviewed by."
        body="When the decision is serious enough to talk through, you're talking to these five."
        background="white"
      />

      {/* ── Bottom strap ─────────────────────────────────────────── */}
      <section className="bg-[color:var(--color-navy)] text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-20 lg:py-24 text-center">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            From one property check to full portfolio control
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start free. Upgrade when the decision gets serious.
          </h2>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/check"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-white text-[color:var(--color-navy)] text-[15px] font-semibold transition hover:bg-white/90"
            >
              Check a property for free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-white/25 text-white text-[15px] font-semibold transition hover:bg-white/5"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function StepBlock({ step }: { step: Step }) {
  const chip = TIER_CHIP[step.tier];
  return (
    <article
      id={step.id}
      className="grid sm:grid-cols-[auto_1fr] gap-5 lg:gap-8 items-start scroll-mt-24"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Big numbered chip — tier-coloured. */}
      <div
        className="w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center font-semibold text-[22px] lg:text-[26px] flex-shrink-0"
        style={{ background: chip.bg, color: chip.text, fontFamily: "var(--font-display)" }}
        aria-hidden
      >
        {step.n}
      </div>

      <div>
        <p
          className="text-[11px] uppercase tracking-[0.14em] font-semibold mb-2"
          style={{ color: chip.text }}
        >
          {step.eyebrow}
        </p>
        <h2
          className="text-[26px] lg:text-[32px] leading-[1.15] text-[color:var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {step.title}
        </h2>
        <p className="mt-3 text-[15.5px] lg:text-[16.5px] leading-[1.6] text-[color:var(--color-ink)] max-w-2xl">
          {step.body}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {step.ctas.map((c) => (
            <Link
              key={c.href + c.label}
              href={c.href}
              className={
                c.variant === "primary"
                  ? "inline-flex items-center justify-center min-h-[44px] px-5 rounded-md bg-[color:var(--color-navy)] text-white text-[14px] font-semibold transition hover:bg-[color:var(--color-navy-light)]"
                  : "inline-flex items-center justify-center min-h-[44px] px-5 rounded-md border border-[color:var(--color-border)] bg-white text-[color:var(--color-navy)] text-[14px] font-semibold transition hover:border-[color:var(--color-navy)]"
              }
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
