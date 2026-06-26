// /how-it-works — the journey page.
//
// Restructured around the five-stage AssetCentral framework that the
// homepage MessyInClearOutSection introduces:
//
//   Capture → Structure → Model → Monitor → Manage
//
// Each stage has a lead agent and one or two "what you actually do"
// steps mapped underneath, so the page reads both as the product
// taxonomy (5 stages, what each does, which agent owns it) and as
// the user journey (7 things you actually do, in order).
//
// Anchor ids are kept stable from the prior 7-step ladder so the
// "How it works" nav dropdown still scrolls to the right place. DO
// NOT rename the existing ids without updating Nav.tsx in lockstep.

import type { Metadata } from "next";
import Link from "next/link";
import { TeamGalleryStrip } from "@/components/marketing/TeamGalleryStrip";

export const metadata: Metadata = {
  title: "How AssetCentral Works",
  description:
    "Five stages: Capture → Structure → Model → Monitor → Manage. From a free AI property check to a full portfolio family-office layer, run by your five AI agents.",
  alternates: { canonical: "/how-it-works" },
};

interface Step {
  /** Anchor id — matches the href on the How it works nav dropdown. */
  id: string;
  /** Display number within the journey ladder (1-7). */
  n: number;
  /** Eyebrow label, e.g. "Free" or "Individual" — pricing tier the
   *  step belongs to. */
  eyebrow: string;
  /** H2 step title. */
  title: string;
  /** Body paragraph. Plain English. */
  body: string;
  /** Per-step CTAs. */
  ctas: { label: string; href: string; variant?: "primary" | "ghost" }[];
  /** Tier this step belongs to — colour-codes the step number chip. */
  tier: "free" | "individual" | "pro";
}

interface Stage {
  /** Anchor id for the stage block. */
  id: string;
  /** Stage number "01"…"05". */
  n: string;
  /** Stage name — Capture / Structure / Model / Monitor / Manage. */
  name: string;
  /** One-line description of what this stage does. */
  oneLiner: string;
  /** Lead agent acronym + display name. */
  agent: { acronym: string; name: string; bandClass: string };
  /** The steps from the journey ladder that live inside this stage. */
  steps: Step[];
}

const STAGES: Stage[] = [
  {
    id: "capture",
    n: "01",
    name: "Capture",
    oneLiner: "Get every scrap of property data into one place — automatically.",
    agent: {
      acronym: "PA",
      name: "Personal Assistant",
      bandClass: "bg-[color:var(--color-pa-mid)]",
    },
    steps: [
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
        body: "Use the relevant free calculator to capture the basic numbers: payment, yield, cash flow, return or break-even point. All eight Level 1 tools include a 3-row stress test that shows how the numbers move under rate, rent or vacancy shocks.",
        ctas: [
          { label: "See the free calculators →", href: "/calculators", variant: "primary" },
        ],
        tier: "free",
      },
    ],
  },
  {
    id: "structure",
    n: "02",
    name: "Structure",
    oneLiner: "Turn raw inputs into a clean, comparable property record.",
    agent: {
      acronym: "CFO",
      name: "Chief Financial Officer",
      bandClass: "bg-[color:var(--color-cfo-mid)]",
    },
    steps: [
      {
        id: "ai-check",
        n: 3,
        eyebrow: "Step 3 · Free",
        title: "Get a free AI property check",
        body: "AssetCentral structures your inputs into a clean read — Attractive, Borderline or Risky — plus the key number, the single biggest red flag and one suggested next move. Same engine the Individual and Pro tiers run on every property.",
        ctas: [
          { label: "See example analysis", href: "/#example-analysis", variant: "ghost" },
          { label: "Run a free check →", href: "/check", variant: "primary" },
        ],
        tier: "free",
      },
    ],
  },
  {
    id: "model",
    n: "03",
    name: "Model",
    oneLiner: "Project the decision forward across rate, rent and growth scenarios.",
    agent: {
      acronym: "CIO",
      name: "Chief Investment Officer",
      bandClass: "bg-[color:var(--color-cio-mid)]",
    },
    steps: [
      {
        id: "full-report",
        n: 4,
        eyebrow: "Step 4 · Individual",
        title: "Unlock the full report when the decision gets serious",
        body: "When you're seriously evaluating one property, the Individual trial unlocks the full property decision report: 10-year cash-flow forecast, scenario analysis across rate / rent / capital growth, sell-vs-hold + refinance modelling, PDF and Word export. 7-day trial, no card.",
        ctas: [
          { label: "Try Individual free for 7 days →", href: "/signup?plan=individual_monthly", variant: "primary" },
        ],
        tier: "individual",
      },
      {
        id: "save-compare",
        n: 5,
        eyebrow: "Step 5 · Individual",
        title: "Save and compare properties",
        body: "Save the property, run another one, then compare them side by side. Individual holds up to three saved properties and gives you the full decision report on each. Build a record of decisions so you can show the working when you act.",
        ctas: [
          { label: "See pricing →", href: "/pricing", variant: "ghost" },
        ],
        tier: "individual",
      },
    ],
  },
  {
    id: "monitor",
    n: "04",
    name: "Monitor",
    oneLiner: "Watch yield, cash flow, debt and risk across the portfolio — live.",
    agent: {
      acronym: "CEO",
      name: "Chief Executive",
      bandClass: "bg-[color:var(--color-ceo-mid)]",
    },
    steps: [
      {
        id: "portfolio",
        n: 6,
        eyebrow: "Step 6 · Pro",
        title: "Move into portfolio control",
        body: "Once you own multiple properties, AssetCentral monitors the full portfolio for you: real-time net-yield tracking, 22 alert types across rent, debt and voids, document vault with AI extraction. For owners with 2–50 properties.",
        ctas: [
          { label: "Explore Pro →", href: "/pricing", variant: "primary" },
        ],
        tier: "pro",
      },
    ],
  },
  {
    id: "manage",
    n: "05",
    name: "Manage",
    oneLiner: "Turn the monitoring into recommended actions — and execute them with the team.",
    agent: {
      acronym: "COO",
      name: "Chief Operations Officer",
      bandClass: "bg-[color:var(--color-coo-mid)]",
    },
    steps: [
      {
        id: "ai-team",
        n: 7,
        eyebrow: "Step 7 · Pro",
        title: "Talk to your AI property team",
        body: "When a recommended action gets complex, your AI property team helps you think it through like a professional owner. Five agents — Chief Investment Officer (modelling), Chief Financial Officer (cash flow + debt), Chief Operations Officer (leases + operators), Personal Assistant (documents + reminders), Chief Executive (strategy + ranked priorities).",
        ctas: [
          { label: "Meet the team →", href: "/features", variant: "primary" },
        ],
        tier: "pro",
      },
    ],
  },
];

const TIER_CHIP: Record<Step["tier"], { bg: string; text: string }> = {
  free: { bg: "rgba(22, 163, 74, 0.10)", text: "var(--color-positive)" },
  individual: { bg: "rgba(79, 110, 247, 0.10)", text: "var(--color-accent)" },
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

      {/* ── Five-stage strip — the parent narrative the homepage
           MessyInClearOutSection introduces. Sits above the journey
           ladder so the reader sees the taxonomy before the steps. ── */}
      <section
        aria-label="The five stages of AssetCentral"
        className="bg-[color:var(--color-surface)] border-t border-[color:var(--color-border)] py-12 lg:py-16"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] font-semibold mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The five stages
          </p>
          <h2
            className="text-[26px] lg:text-[34px] leading-[1.15] text-[color:var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Messy property information goes in.{" "}
            <span className="text-[color:var(--color-accent)] italic">Clear property intelligence comes out.</span>
          </h2>
          <ol
            className="mt-7 grid sm:grid-cols-2 lg:grid-cols-5 gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {STAGES.map((s) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  className="block h-full rounded-lg border border-[color:var(--color-border)] bg-white p-4 transition hover:border-[color:var(--color-navy)]"
                >
                  <p className="num text-[11px] text-[color:var(--color-accent)] font-semibold tracking-[0.14em]">{s.n}</p>
                  <p className="mt-1 text-[16px] font-semibold text-[color:var(--color-navy)]">{s.name}</p>
                  <p className="mt-1.5 text-[12.5px] leading-[1.45] text-[color:var(--color-muted)]">{s.oneLiner}</p>
                  <p
                    className={`${s.agent.bandClass} mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-white text-[10.5px] font-semibold`}
                  >
                    <span className="font-bold tracking-wide">{s.agent.acronym}</span>
                    <span className="opacity-90">·</span>
                    <span className="opacity-95">{s.agent.name}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Stages → steps ladder. Each stage is a numbered block;
           the user-journey steps live inside it. Anchor ids are
           preserved from the prior 7-step page so Nav.tsx deep links
           still work. ── */}
      <section className="bg-white border-t border-[color:var(--color-border)] py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="space-y-16 lg:space-y-20">
            {STAGES.map((stage) => (
              <StageBlock key={stage.id} stage={stage} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team faces — the same five agents owning the five stages
           above. Sits between the ladder and the bottom strap so the
           reader puts faces to the acronyms before the closing CTA. ── */}
      <TeamGalleryStrip
        eyebrow="One agent per stage"
        heading="The five agents who run the five stages."
        body="PA captures. CFO structures. CIO models. CEO monitors. COO manages. Click any face to read the per-agent detail page."
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

// Renders one of the 5 stages: stage header + steps that live inside it.
// The anchor id (e.g. #capture) targets the stage; each step keeps its
// own id (#run-the-numbers, #ai-check, …) for backwards compatibility
// with the Nav dropdown links.
function StageBlock({ stage }: { stage: Stage }) {
  return (
    <article
      id={stage.id}
      className="scroll-mt-24"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Stage header — big stage number + name + agent chip. */}
      <header className="grid sm:grid-cols-[auto_1fr] gap-5 lg:gap-8 items-start">
        <div
          className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center font-semibold text-[20px] lg:text-[24px] flex-shrink-0 bg-[color:var(--color-navy)] text-white"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden
        >
          {stage.n}
        </div>
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] font-semibold mb-1.5"
          >
            Stage {stage.n}
          </p>
          <h2
            className="text-[30px] lg:text-[40px] leading-[1.1] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {stage.name}
          </h2>
          <p className="mt-2.5 text-[16px] lg:text-[17.5px] leading-[1.55] text-[color:var(--color-ink)] max-w-2xl">
            {stage.oneLiner}
          </p>
          <p
            className={`${stage.agent.bandClass} mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-white text-[12px] font-semibold`}
          >
            <span aria-hidden className="opacity-80">Led by</span>
            <span className="font-bold tracking-wide">{stage.agent.acronym}</span>
            <span className="opacity-90">·</span>
            <span className="font-normal opacity-95">{stage.agent.name}</span>
          </p>
        </div>
      </header>

      {/* What you actually do inside this stage. */}
      <div className="mt-10 space-y-10 lg:pl-24">
        {stage.steps.map((step) => (
          <StepBlock key={step.id} step={step} />
        ))}
      </div>
    </article>
  );
}

function StepBlock({ step }: { step: Step }) {
  const chip = TIER_CHIP[step.tier];
  return (
    <div
      id={step.id}
      className="grid sm:grid-cols-[auto_1fr] gap-5 lg:gap-8 items-start scroll-mt-24"
    >
      {/* Step number chip — tier-coloured. */}
      <div
        className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-semibold text-[18px] lg:text-[20px] flex-shrink-0"
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
        <h3
          className="text-[22px] lg:text-[26px] leading-[1.2] text-[color:var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {step.title}
        </h3>
        <p className="mt-2.5 text-[15px] lg:text-[16px] leading-[1.6] text-[color:var(--color-ink)] max-w-2xl">
          {step.body}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
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
    </div>
  );
}
