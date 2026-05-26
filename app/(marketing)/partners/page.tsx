// Public partner-program page. Two tracks: professional partners (B2B
// — advisors, accountants, brokers, etc.) and ambassadors / refer-a-friend
// (B2C — existing customers introducing peers).
//
// Commission numbers below are sensible-default placeholders — they can be
// changed by editing the `PRO_TIERS` and `AMBASSADOR_REWARDS` constants
// near the top of this file without touching the layout.

import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Partner with AssetCentral.ai";
const DESCRIPTION =
  "Earn from every property owner you introduce. Professional partners — accountants, IFAs, wealth managers, property managers, brokers — earn commission + recurring revenue. Existing customers refer friends for credit.";

export const metadata: Metadata = {
  title: `${TITLE} · Earn from every property owner you introduce`,
  description: DESCRIPTION,
  alternates: { canonical: "/partners" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// ── Content data (easy to edit without touching the layout) ────────────────

const PARTNER_TYPES = [
  { title: "Accountants",                  blurb: "Your clients with multi-property holdings need real numbers, not best-guess year-end estimates." },
  { title: "Independent Financial Advisors", blurb: "Property is invisible to most wealth-management platforms. AssetCentral closes the gap." },
  { title: "Wealth managers",              blurb: "Family-office level visibility for clients with portfolios under your stewardship." },
  { title: "Property managers",            blurb: "Give owners yield analytics beyond your operating statements. Builds retention." },
  { title: "Real estate brokers",          blurb: "Post-purchase touchpoint that keeps you in the relationship for the next transaction." },
  { title: "Mortgage brokers",             blurb: "Refi candidates surface naturally from rate-reset alerts. Pre-qualified pipeline." },
  { title: "Tax advisors",                 blurb: "Cleaner property data, better filings, fewer last-minute scrambles." },
  { title: "Family office consultants",    blurb: "Embed AssetCentral in the house-of-tools you assemble for your principals." },
  { title: "Property educators & coaches", blurb: "Recommend a real tool to students learning how to run a portfolio properly." },
];

const PRO_TIERS = [
  {
    plan: "Pro plan referral",
    upfront: "€100",
    recurring: "20% for 12 months",
    note: "Average lifetime value ~€450",
  },
  {
    plan: "Team plan referral",
    upfront: "€400",
    recurring: "20% for 12 months",
    note: "Average lifetime value ~€1,800",
  },
  {
    plan: "Enterprise referral",
    upfront: "Custom",
    recurring: "Negotiated revenue share",
    note: "Typically €1,000+ per closed deal",
  },
];

const AMBASSADOR_REWARDS = [
  { label: "Friend gets", value: "14-day trial · then 1 month free" },
  { label: "You get",     value: "1 month free OR €25 cash credit" },
  { label: "Paid",        value: "Once the friend completes their first paid month" },
];

const HOW_IT_WORKS_PRO = [
  { step: 1, title: "Apply",       body: "Tell us about your firm, your clients, and how AssetCentral fits. Most applications are reviewed within 2 business days." },
  { step: 2, title: "Get your kit", body: "We send you a unique referral link, a partner dashboard, and marketing materials you can co-brand if you'd like." },
  { step: 3, title: "Introduce",   body: "Share AssetCentral with the clients you advise. They sign up using your link — the attribution is tracked end-to-end." },
  { step: 4, title: "Get paid",    body: "Commissions paid monthly via bank transfer or Wise. You see every referral, every conversion, every payout in your dashboard." },
];

const FAQ = [
  { q: "How are commissions paid?",
    a: "Bank transfer or Wise, in EUR, monthly. Minimum payout €100 — smaller balances roll over to the next month." },
  { q: "When do I get paid for a new referral?",
    a: "Once the referred customer completes their first paid month. The 14-day free trial doesn't count toward commission — it has to convert." },
  { q: "Can I be both a professional partner and an ambassador?",
    a: "Yes. Different tracks for different relationships. Professional partners get better rates when referring through their firm." },
  { q: "Are there restrictions on how I market?",
    a: "Two rules. No paid-search bidding on AssetCentral-branded keywords. No spam — every prospect must have actually asked to hear from you." },
  { q: "What if my referral cancels later?",
    a: "Upfront commission stays. Recurring share continues for the months they remained subscribed within the 12-month window." },
  { q: "Do you offer white-label or reseller arrangements?",
    a: "Yes — for firms with 50+ clients we have a managed-reseller option with custom pricing and shared support. Email partners@assetcentral.ai to discuss." },
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Partner Program
          </p>
          <h1
            className="text-[44px] lg:text-[64px] leading-[1.04] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Earn from every property owner you introduce.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Two ways to partner with AssetCentral.ai — bring us your clients
            as a professional partner, or your friends as an ambassador.
            Both earn ongoing revenue.
          </p>
          <p
            className="mt-5 text-[18px] lg:text-[22px] text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Real partners. Real returns.
          </p>
        </div>
      </section>

      {/* ── Two tracks summary ──────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
            {/* Professional partners card */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-8 flex flex-col">
              <div
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Track 1 · B2B
              </div>
              <h2
                className="text-[26px] lg:text-[30px] leading-[1.1] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Professional Partners
              </h2>
              <p
                className="mt-3 text-[15px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                For accountants, IFAs, wealth managers, property managers,
                real estate brokers and any professional who advises
                multi-property owners.
              </p>
              <div
                className="mt-4 text-[13px] text-[var(--color-muted)] leading-[1.5]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Up to <strong className="text-[var(--color-ink)]">€400 per signup</strong> + <strong className="text-[var(--color-ink)]">20% recurring</strong> for 12 months.
              </div>
              <Link
                href="/partners/apply"
                className="mt-6 inline-flex items-center min-h-[44px] px-4 rounded-md bg-[var(--color-navy)] text-white text-[14px] font-medium hover:bg-[var(--color-navy-light)] transition-colors w-fit"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Apply as a partner →
              </Link>
            </div>

            {/* Ambassador card */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-7 lg:p-8 flex flex-col">
              <div
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Track 2 · Refer a friend
              </div>
              <h2
                className="text-[26px] lg:text-[30px] leading-[1.1] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ambassadors
              </h2>
              <p
                className="mt-3 text-[15px] leading-[1.6] text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                For existing AssetCentral customers who want to introduce
                friends, family or peers who own property. Like Revolut&rsquo;s
                refer-a-friend — but for owners.
              </p>
              <div
                className="mt-4 text-[13px] text-[var(--color-muted)] leading-[1.5]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <strong className="text-[var(--color-ink)]">1 month free</strong> or <strong className="text-[var(--color-ink)]">€25 cash</strong> for every friend who joins and stays.
              </div>
              <Link
                href="https://app.assetcentral.ai/dashboard/partner"
                className="mt-6 inline-flex items-center min-h-[44px] px-4 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14px] font-medium hover:border-[var(--color-navy)] transition-colors w-fit"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Find your referral link →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who can partner ─────────────────────────────────────────── */}
      <section id="professional" className="bg-white scroll-mt-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Who can partner
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            If your clients own property, you have a reason to refer.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Most professional partner relationships fall into one of these
            categories. If you don&rsquo;t see yours, email us — if you advise
            property owners we&rsquo;ll likely accept your application.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNER_TYPES.map((t) => (
              <div
                key={t.title}
                className="rounded-lg border border-[var(--color-border)] bg-white p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div
                  className="text-[16px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.title}
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--color-ink)]">
                  {t.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works (professional) ─────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How it works
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Four steps. No quotas, no exclusivity.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS_PRO.map((s) => (
              <div key={s.step} className="flex flex-col">
                <div
                  className="inline-flex w-9 h-9 rounded-full bg-[var(--color-navy)] text-white items-center justify-center text-[14px] font-semibold mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {s.step}
                </div>
                <div
                  className="text-[17px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.title}
                </div>
                <p
                  className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Remuneration (professional) ─────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What you earn
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Upfront per signup, plus recurring share.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Standard rates for professional partners — published transparently so
            you can model the economics before you apply.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {PRO_TIERS.map((t, i) => (
              <div
                key={t.plan}
                className={`rounded-xl border p-6 ${
                  i === 1
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/[0.04]"
                    : "border-[var(--color-border)] bg-white"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="text-[13px] text-[var(--color-muted)] uppercase tracking-wide">
                  {t.plan}
                </div>
                <div
                  className="mt-3 text-[28px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.upfront}
                </div>
                <div className="text-[12px] text-[var(--color-muted)]">upfront</div>
                <div
                  className="mt-4 text-[15px] text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  + {t.recurring}
                </div>
                <div className="text-[12px] text-[var(--color-muted)] mt-1">{t.note}</div>
              </div>
            ))}
          </div>

          <p
            className="mt-8 text-[13px] text-[var(--color-muted)] leading-[1.55] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Commissions are indicative for the standard partner tier. Tiered upgrades for
            high-volume partners (10+ active referrals/quarter) include higher upfront
            rates and extended recurring windows — discussed at application.
          </p>
        </div>
      </section>

      {/* ── Ambassador / refer-a-friend ─────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Refer-a-friend
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Already using AssetCentral? Refer a friend, get a month free.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Modelled on Revolut&rsquo;s refer-a-friend — but for property owners. Every
            customer has a unique referral link in their dashboard.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {AMBASSADOR_REWARDS.map((r) => (
              <div
                key={r.label}
                className="rounded-lg border border-[var(--color-border)] bg-white p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="text-[12px] uppercase tracking-wide text-[var(--color-muted)]">
                  {r.label}
                </div>
                <div className="mt-2 text-[16px] text-[var(--color-navy)]" style={{ fontFamily: "var(--font-display)" }}>
                  {r.value}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-10 rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/[0.05] p-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <div className="text-[14px] text-[var(--color-navy)] font-semibold">
              Refer 5+ people? We&rsquo;ll move you to the professional partner tier.
            </div>
            <p className="mt-2 text-[13px] text-[var(--color-ink)] leading-[1.6] max-w-2xl">
              Better economics, marketing materials, dedicated support. If your network
              keeps producing serious owners, the program reflects that.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            FAQ
          </p>
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The honest answers.
          </h2>
          <dl className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {FAQ.map((row) => (
              <div key={row.q} className="py-5">
                <dt
                  className="text-[16px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {row.q}
                </dt>
                <dd
                  className="mt-2 text-[14.5px] leading-[1.65] text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {row.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Apply / closing CTA ─────────────────────────────────────── */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-20 lg:py-28 text-center">
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built for owners. Built with the professionals who advise them.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] text-white/75 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Apply in 2 minutes. We&rsquo;ll come back within 2 business days.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/partners/apply"
              className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-white text-[var(--color-navy)] px-6 text-[14.5px] font-medium hover:bg-white/90 transition-colors"
            >
              Apply in 2 minutes →
            </Link>
            <Link
              href="https://app.assetcentral.ai/dashboard/partner"
              className="inline-flex items-center justify-center min-h-[48px] rounded-md border border-white/20 text-white px-6 text-[14.5px] font-medium hover:bg-white/5 transition-colors"
            >
              Existing customer? Find your link →
            </Link>
          </div>
          <p
            className="mt-6 text-[12px] text-white/45"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Full partner agreement supplied at application · No exclusivity required ·
            Marketing materials provided
          </p>
        </div>
      </section>
    </>
  );
}
