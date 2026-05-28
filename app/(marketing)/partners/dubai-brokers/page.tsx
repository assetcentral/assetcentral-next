// Vertical landing page for Dubai real estate brokers. Sibling to the
// general /partners pitch — same partner program, but positioned for
// brokers specifically: their motivations, their client questions, their
// commercial opportunity.
//
// Form posts via Netlify Forms — the hidden inputs at the top of the form
// element are what Netlify's build-time scanner picks up. Submissions
// land in the Netlify dashboard under Forms > "dubai-brokers-partner".

import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "AssetCentral Broker Partner Program — Dubai";
const DESCRIPTION =
  "Earn partner income by introducing Dubai property owners and investors to AI-powered portfolio analysis. Re-engage clients, identify likely sellers, and offer professional portfolio reviews — all subject to partner terms.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/partners/dubai-brokers" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const NAVY = "#1a1a2e";
const ACCENT = "#4f6ef7";

// ── Content arrays ──────────────────────────────────────────────────────

const CLIENT_QUESTIONS = [
  "Should I sell or hold?",
  "Is my rent too low?",
  "Should I switch to short-term rental?",
  "Can I refinance?",
  "Which property is underperforming?",
  "What is my real portfolio return?",
];

const FEATURES = [
  { title: "Rent and yield analysis",          note: "Real net yield per property, after every cost." },
  { title: "Cashflow and return view",          note: "12-month forecast and live actual cashflow." },
  { title: "STR vs long-term comparison",       note: "Model annual let against short-term operator scenarios." },
  { title: "Hold / sell analysis",              note: "Modelled IRR for continued hold vs exit at today's price." },
  { title: "Refinance scenarios",               note: "Test new rates, lenders, and loan structures." },
  { title: "Portfolio dashboard",               note: "Cross-property roll-up: yield, exposure, risk flags." },
  { title: "AI-generated investment insights",  note: "Plain-English actions, not raw data dumps." },
  { title: "Exportable client reports",         note: "PDF-ready reviews for advisor or lender conversations." },
];

const PARTNER_BENEFITS = [
  { title: "Earn partner income",            note: "Eligible introductions earn referral or partner income, subject to partner terms." },
  { title: "Re-engage dormant clients",      note: "A free portfolio review is a credible reason to re-open every old conversation." },
  { title: "Identify likely sellers",        note: "Clients whose data shows underperformance often become listing opportunities." },
  { title: "Support rental + STR decisions", note: "Help owners pick the right strategy with modelled scenarios, not gut feel." },
  { title: "Co-branded portfolio reports",   note: "Agency-branded reports available on eligible partner tiers." },
  { title: "Stronger owner relationships",   note: "Data-led advice keeps you closer to high-value owners year-round." },
];

const HOW_IT_WORKS = [
  { n: 1, title: "Introduce an investor client",     note: "Submit a client introduction via your partner portal or by email." },
  { n: 2, title: "AssetCentral analyses the data",   note: "We structure rents, costs, debt and market data into a clear view." },
  { n: 3, title: "Client receives clear insights",   note: "Plain-language report covering yield, cashflow, risks and options." },
  { n: 4, title: "You stay close — and earn",        note: "You stay in the relationship loop and earn partner income on eligible conversions." },
];

const USE_CASES = [
  { title: "Off-plan investors",                  note: "Facing handover decisions, payment schedules, or resale timing." },
  { title: "Sell-or-hold owners",                 note: "Owners weighing exit at today's price vs continued hold." },
  { title: "Long-let vs STR landlords",           note: "Landlords considering short-term rental as an alternative income strategy." },
  { title: "Multi-property owners",               note: "Scattered data across PDFs, portals and spreadsheets that needs one view." },
  { title: "Refinance candidates",                note: "Owners exploring rate-reset, lender switch, or capital release." },
  { title: "Underperforming properties",          note: "Assets quietly losing money — but no clear data showing why." },
];

const PARTNER_MODELS = [
  {
    name: "Referral Partner",
    audience: "Individual brokers",
    pitch: "Earn from eligible introductions you bring to AssetCentral.",
    badge: "Most common",
  },
  {
    name: "Agency Partner",
    audience: "Broker teams",
    pitch: "Shared workspace for the team, co-branded client reports.",
    badge: null,
  },
  {
    name: "Portfolio Review Partner",
    audience: "Investment-focused brokers",
    pitch: "Run paid portfolio reviews as a service alongside your brokerage.",
    badge: null,
  },
  {
    name: "Strategic Partner",
    audience: "Larger agencies",
    pitch: "Custom commercial terms, deeper integration, joint marketing.",
    badge: "By invitation",
  },
];

// ── Page ────────────────────────────────────────────────────────────────

export default function DubaiBrokersPage() {
  return (
    <div className="bg-white text-[#1a1a2e]">
      {/* Sticky mobile CTA bar — visible only at <md */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 px-4 py-3 flex gap-2">
        <a
          href="#apply"
          className="flex-1 inline-flex items-center justify-center min-h-[44px] rounded-md text-white text-sm font-semibold"
          style={{ backgroundColor: ACCENT }}
        >
          Apply to become a partner
        </a>
        <a
          href="mailto:partners@assetcentral.ai?subject=Dubai%20broker%20partner%20demo"
          className="inline-flex items-center justify-center min-h-[44px] rounded-md border border-gray-300 text-sm font-medium px-3"
        >
          Demo
        </a>
      </div>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: NAVY }}
      >
        {/* Subtle radial gradient for premium feel */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(79,110,247,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(79,110,247,0.12), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24 text-white">
          <p
            className="text-[12px] uppercase tracking-[0.28em] text-white/55 mb-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Broker partner program · Dubai
          </p>
          <h1
            className="text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.05] tracking-tight max-w-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join the AssetCentral Broker Partner Program.
          </h1>
          <p
            className="mt-6 text-[18px] sm:text-[20px] lg:text-[22px] leading-[1.5] text-white/85 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Earn partner income by introducing Dubai property owners and investors
            to AI-powered portfolio analysis.
          </p>
          <p
            className="mt-5 text-[15px] sm:text-[17px] leading-[1.6] text-white/65 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Help your clients understand rent, yield, cashflow, STR potential,
            refinance options and hold/sell scenarios — while you stay close to
            the relationship and create new commercial opportunities.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <a
              href="#apply"
              className="inline-flex items-center justify-center min-h-[52px] rounded-md text-white px-7 text-[15px] font-semibold transition-colors"
              style={{ backgroundColor: ACCENT }}
            >
              Apply to become a partner →
            </a>
            <a
              href="mailto:partners@assetcentral.ai?subject=Dubai%20broker%20partner%20demo"
              className="inline-flex items-center justify-center min-h-[52px] rounded-md border border-white/25 text-white px-7 text-[15px] font-medium hover:bg-white/5 transition-colors"
            >
              Book a partner demo
            </a>
          </div>
          <p
            className="mt-7 text-[13px] text-white/50"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            For Dubai brokers advising property investors, landlords and
            multi-unit owners.
          </p>

          {/* Placeholder dashboard visual */}
          <div className="mt-12 lg:mt-16 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur p-4 shadow-2xl max-w-4xl">
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* ── 2. Problem ──────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The problem
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your investor clients are asking harder questions.
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-gray-600 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Most brokers have the relationship, but not always the tools to answer
            these questions with structured data and clear scenarios.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CLIENT_QUESTIONS.map((q, i) => (
              <div
                key={q}
                className="rounded-lg border border-gray-200 bg-gray-50/60 px-5 py-4 flex items-start gap-3"
              >
                <span
                  className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: `${ACCENT}15`, color: ACCENT, fontFamily: "var(--font-sans)" }}
                >
                  {i + 1}
                </span>
                <span
                  className="text-[15px] lg:text-[16px] text-gray-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;{q}&rdquo;
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Solution ─────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The solution
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight max-w-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AssetCentral turns property data into client-ready investment insights.
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-gray-600 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Upload or enter property information. AssetCentral structures the data,
            analyses performance, compares scenarios and creates clear reports
            brokers can use with their investor clients.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-md inline-flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${ACCENT}15` }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                </div>
                <div
                  className="text-[16px] text-gray-900 mb-1.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {f.title}
                </div>
                <div
                  className="text-[13.5px] text-gray-600 leading-snug"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {f.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Partner income ───────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Your commercial opportunity
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight max-w-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Create a new revenue stream from your investor network.
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-gray-600 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            As an AssetCentral broker partner, you can introduce property owners
            and investors who need better portfolio clarity. You bring the client
            relationship. AssetCentral provides the analysis platform. Together,
            we create better decisions and new commercial opportunities — subject
            to partner terms.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNER_BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-gray-200 p-6"
              >
                <div
                  className="text-[17px] text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {b.title}
                </div>
                <div
                  className="text-[14px] text-gray-600 leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {b.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. How it works ─────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="px-6 lg:px-10 py-20 lg:py-28 text-white relative overflow-hidden scroll-mt-16"
        style={{ backgroundColor: NAVY }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 70% 0%, rgba(79,110,247,0.15), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/55 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How it works
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From introduction to partner income, in four steps.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((s) => (
              <div
                key={s.n}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white text-[15px] font-semibold mb-4"
                  style={{ backgroundColor: ACCENT, fontFamily: "var(--font-sans)" }}
                >
                  {s.n}
                </div>
                <div
                  className="text-[17px] text-white mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.title}
                </div>
                <div
                  className="text-[14px] text-white/65 leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Use cases ────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Use cases
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Where brokers use AssetCentral.
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="rounded-xl border border-gray-200 bg-gray-50/60 p-5"
              >
                <div
                  className="text-[16px] text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {u.title}
                </div>
                <div
                  className="text-[13.5px] text-gray-600 leading-snug"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {u.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. First client portfolio review offer ──────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Try before you partner
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get your first client portfolio review — free.
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Bring one investor client with a small portfolio. We&rsquo;ll show how
            AssetCentral turns their property data into clear decisions — and how
            the partner model can work for your agency.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <a
              href="mailto:partners@assetcentral.ai?subject=Free%20first%20client%20portfolio%20review"
              className="inline-flex items-center justify-center min-h-[52px] rounded-md text-white px-7 text-[15px] font-semibold transition-colors"
              style={{ backgroundColor: ACCENT }}
            >
              Submit first client portfolio →
            </a>
            <a
              href="#apply"
              className="inline-flex items-center justify-center min-h-[52px] rounded-md border border-gray-300 text-gray-900 px-7 text-[15px] font-medium hover:bg-white transition-colors"
            >
              Or apply now
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. Partner models ───────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Partner tiers
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Flexible partner models.
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-gray-600 max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Choose the model that fits how you work. Final commercial terms are
            confirmed during partner onboarding.
          </p>
          {/* Card-style table — readable on mobile + desktop */}
          <div className="mt-10 rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-gray-50 px-6 py-3 text-[12px] uppercase tracking-wider text-gray-500 hidden md:grid" style={{ fontFamily: "var(--font-sans)" }}>
              <div className="md:col-span-3">Partner</div>
              <div className="md:col-span-3">Audience</div>
              <div className="md:col-span-6">What you get</div>
            </div>
            <ul className="divide-y divide-gray-200">
              {PARTNER_MODELS.map((m) => (
                <li
                  key={m.name}
                  className="grid grid-cols-1 md:grid-cols-12 px-6 py-5 gap-2 md:gap-4 items-start"
                >
                  <div className="md:col-span-3 flex items-center gap-2">
                    <span
                      className="text-[17px] text-gray-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {m.name}
                    </span>
                    {m.badge && (
                      <span
                        className="text-[10.5px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${ACCENT}15`,
                          color: ACCENT,
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <div
                    className="md:col-span-3 text-[14px] text-gray-700"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {m.audience}
                  </div>
                  <div
                    className="md:col-span-6 text-[14px] text-gray-600 leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {m.pitch}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 9. Why now ──────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Why now
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Dubai investors need clearer data now.
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-gray-700"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Many Dubai owners are managing off-plan payment schedules, changing
            rental strategies, refinancing questions and portfolio decisions.
            Brokers who bring data-led advice can create stronger client
            relationships and identify more opportunities.
          </p>
        </div>
      </section>

      {/* ── 10. Final CTA + Form ────────────────────────────────────────── */}
      {/* Anchor IDs: #apply (primary) and #demo (alias) both land here —
          the form supports both partner applications and "book a demo"
          enquiries via the secondary mailto below the submit button. */}
      <section
        id="apply"
        className="px-6 lg:px-10 py-20 lg:py-28 text-white relative overflow-hidden scroll-mt-16"
        style={{ backgroundColor: NAVY }}
      >
        <span id="demo" className="block -mt-20 pt-20" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% 100%, rgba(79,110,247,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.25em] text-white/55 mb-4 text-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Apply
          </p>
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Become an AssetCentral broker partner.
          </h2>
          <p
            className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-white/75 text-center max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Turn your investor network into a data-led advisory and partner
            revenue opportunity.
          </p>

          {/* Netlify Form — picked up at build time via data-netlify="true".
              The hidden form-name input ensures Netlify routes the submission.
              The honeypot bot-field is a spam guard: real users leave it empty;
              automated bots tend to fill every visible input. */}
          <form
            name="dubai-brokers-partner"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/partners/dubai-brokers/thanks"
            className="mt-10 rounded-2xl bg-white text-gray-900 p-6 sm:p-8 shadow-2xl"
          >
            <input type="hidden" name="form-name" value="dubai-brokers-partner" />
            <p className="hidden">
              <label>Don&rsquo;t fill this out: <input name="bot-field" /></label>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="First name"  name="first_name"  required />
              <FormField label="Last name"   name="last_name"   required />
              <FormField label="Agency name" name="agency"      colSpan="full" />
              <FormField label="Email"       name="email"       type="email"  required />
              <FormField label="Phone / WhatsApp" name="phone"  type="tel" />
              <FormField
                label="Number of investor clients (approx.)"
                name="client_count"
                colSpan="full"
              />
              <FormField
                label="Typical client profile"
                name="client_profile"
                placeholder="e.g. Dubai Marina owners, expat investors, off-plan portfolios..."
                colSpan="full"
              />
              <div className="sm:col-span-2">
                <label
                  className="block text-[13px] text-gray-700 mb-1.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Interested in
                </label>
                <select
                  name="partner_type"
                  required
                  defaultValue=""
                  className="w-full min-h-[44px] rounded-md border border-gray-300 px-3 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/40 focus:border-[#4f6ef7]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <option value="" disabled>Choose a partner model</option>
                  <option value="referral">Referral Partner</option>
                  <option value="agency">Agency Partner</option>
                  <option value="portfolio_review">Portfolio Review Partner</option>
                  <option value="strategic">Strategic Partner</option>
                  <option value="not_sure">Not sure yet — open to a conversation</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  className="block text-[13px] text-gray-700 mb-1.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Anything else? (optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Anything we should know about you or your clients."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/40 focus:border-[#4f6ef7]"
                  style={{ fontFamily: "var(--font-sans)" }}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <p
                className="text-[12px] text-gray-500"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Subject to partner terms. We&rsquo;ll reply within 2 business days.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center min-h-[52px] rounded-md text-white px-8 text-[15px] font-semibold transition-colors"
                style={{ backgroundColor: ACCENT, fontFamily: "var(--font-sans)" }}
              >
                Apply to become a partner
              </button>
            </div>
          </form>

          <p
            className="mt-8 text-center text-[13px] text-white/55"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Prefer a conversation first?{" "}
            <a
              href="mailto:partners@assetcentral.ai?subject=Dubai%20broker%20partner%20demo"
              className="underline hover:text-white"
            >
              Book a partner demo
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────

function FormField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  colSpan,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  colSpan?: "full";
}) {
  return (
    <div className={colSpan === "full" ? "sm:col-span-2" : ""}>
      <label
        htmlFor={name}
        className="block text-[13px] text-gray-700 mb-1.5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}{required && <span className="text-[#dc2626]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full min-h-[44px] rounded-md border border-gray-300 px-3 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/40 focus:border-[#4f6ef7]"
        style={{ fontFamily: "var(--font-sans)" }}
      />
    </div>
  );
}

// Placeholder dashboard visual in the hero. Stylised KPIs + a property
// row to suggest the real product without faking screenshots.
function DashboardMock() {
  return (
    <div className="rounded-lg bg-white text-gray-900 overflow-hidden">
      <div className="px-4 sm:px-5 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-gray-400" style={{ fontFamily: "var(--font-sans)" }}>
            AssetCentral
          </span>
          <span className="text-[11px] text-gray-300">/</span>
          <span className="text-[12px] font-semibold text-gray-900" style={{ fontFamily: "var(--font-sans)" }}>
            Portfolio
          </span>
        </div>
        <div
          className="text-[11px] text-gray-500"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          James H. · Pro
        </div>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100">
        {[
          { l: "Portfolio yield", v: "5.8%",        sub: "after costs",   colour: "#16a34a" },
          { l: "Annual cashflow", v: "AED 412k",    sub: "post-debt",     colour: "#16a34a" },
          { l: "5yr IRR",         v: "13.4%",       sub: "modelled",      colour: "#16a34a" },
          { l: "Risk flags",      v: "3",           sub: "rate resets",   colour: "#d97706" },
        ].map((k) => (
          <div key={k.l} className="bg-white p-4">
            <div className="text-[10.5px] uppercase tracking-wider text-gray-400" style={{ fontFamily: "var(--font-sans)" }}>
              {k.l}
            </div>
            <div
              className="text-[22px] tabular-nums leading-none mt-1"
              style={{ fontFamily: "var(--font-display)", color: k.colour }}
            >
              {k.v}
            </div>
            <div className="text-[10.5px] text-gray-500 mt-1" style={{ fontFamily: "var(--font-sans)" }}>
              {k.sub}
            </div>
          </div>
        ))}
      </div>
      {/* Property row */}
      <div className="border-t border-gray-100 px-4 sm:px-5 py-4">
        <div className="text-[10.5px] uppercase tracking-wider text-gray-400 mb-2" style={{ fontFamily: "var(--font-sans)" }}>
          Top opportunities
        </div>
        {[
          { addr: "Marina Mansions, Dubai Marina", action: "Rent uplift modelled +AED 11.8k/yr", tone: "#4f6ef7" },
          { addr: "Tower Heights, Business Bay",    action: "STR scenario +1.6 pp net yield",     tone: "#16a34a" },
          { addr: "Park View, JVC",                 action: "Rate reset in 90 days · refinance",  tone: "#d97706" },
        ].map((r) => (
          <div key={r.addr} className="flex items-center justify-between py-1.5 text-[12.5px]" style={{ fontFamily: "var(--font-sans)" }}>
            <span className="text-gray-900 truncate pr-3">{r.addr}</span>
            <span style={{ color: r.tone }} className="whitespace-nowrap">{r.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
