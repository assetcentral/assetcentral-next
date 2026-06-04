// /partners/apply on the marketing site — orientation landing that
// routes visitors into the in-app application form.
//
// Why this exists separately from the apply form itself:
//   • The application form needs an authenticated user (partners.user_id
//     is NOT NULL — a partner IS a user). So the form has to live on the
//     app domain, gated by login.
//   • But "apply" needs a memorable public URL the founder can put on
//     business cards / mass emails / deck slides. That URL is
//     assetcentral.ai/partners/apply.
//   • This landing bridges the two: 30-second pitch refresher + a clear
//     "sign up first if needed, then apply" path.
//
// Anyone arriving here ends up at app.assetcentral.ai/dashboard/partner/apply
// after either signing up (new) or signing in (existing user).

import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Apply to the AssetCentral partner program";
const DESCRIPTION =
  "Earn upfront + recurring commissions by introducing AssetCentral to property owners. Apply in 2 minutes — reviewed within 2 business days.";

const APP_BASE = "https://app.assetcentral.ai";
const APPLY_URL = `${APP_BASE}/dashboard/partner/apply`;
const SIGNUP_URL = `${APP_BASE}/signup?next=/dashboard/partner/apply`;

export const metadata: Metadata = {
  title: `${TITLE} | AssetCentral.ai`,
  description: DESCRIPTION,
  alternates: { canonical: "/partners/apply" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    // images inherited from the global app/opengraph-image.tsx
  },
};

export default function PartnersApplyPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 lg:pt-24 pb-10">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Partner program · Application
          </p>
          <h1
            className="text-[40px] lg:text-[56px] leading-[1.04] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Apply in 2 minutes.
          </h1>
          <p
            className="mt-5 text-[18px] leading-[1.55] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            We review applications within 2 business days. Once approved we
            email you a welcome pack with your unique referral code, marketing
            materials, and an introduction to the partner portal where you can
            track every referral and commission in real time.
          </p>
        </div>
      </section>

      {/* ── Two-path CTA ─────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-12 lg:py-16">
          <div
            className="text-[13px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            One step before the form
          </div>
          <p
            className="text-[16px] leading-[1.65] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Partners are AssetCentral accounts, so the application form lives
            inside the app. Pick whichever fits — both lead to the same
            two-minute application screen:
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {/* New user path */}
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
              <div
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                New to AssetCentral
              </div>
              <h2
                className="text-[20px] leading-[1.2] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Create a free account, then apply
              </h2>
              <p
                className="mt-2 text-[14px] leading-[1.55] text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Sign-up takes 30 seconds. You&rsquo;ll land straight on the
                partner application form — no need to navigate around the
                product first.
              </p>
              <Link
                href={SIGNUP_URL}
                className="mt-5 inline-flex items-center justify-center min-h-[44px] rounded-md bg-[var(--color-navy)] text-white px-5 text-[14px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Sign up & apply →
              </Link>
            </div>

            {/* Existing user path */}
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
              <div
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Existing customer
              </div>
              <h2
                className="text-[20px] leading-[1.2] text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Go straight to the application
              </h2>
              <p
                className="mt-2 text-[14px] leading-[1.55] text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                You&rsquo;re already signed in. The form is on the partner
                portal under <span className="font-mono text-[13px]">
                  /dashboard/partner/apply
                </span>.
              </p>
              <Link
                href={APPLY_URL}
                className="mt-5 inline-flex items-center justify-center min-h-[44px] rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] px-5 text-[14px] font-medium hover:border-[var(--color-navy)] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Open the form →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you'll be asked ─────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-12 lg:py-16">
          <h2
            className="text-[28px] lg:text-[36px] leading-[1.1] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What the form asks.
          </h2>
          <ul
            className="mt-6 space-y-3 text-[15px] leading-[1.65] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <li>
              <strong>Which track</strong> — Professional partner (B2B,
              upfront + 12mo recurring), Ambassador (refer-a-friend),
              or Enterprise (custom deal).
            </li>
            <li>
              <strong>Display name</strong> — how we show you in the
              partner portal and any co-branded materials.
            </li>
            <li>
              <strong>Company / firm</strong> — optional. For pro / enterprise
              applications.
            </li>
            <li>
              <strong>Website or LinkedIn</strong> — helps us verify the
              application without back-and-forth email.
            </li>
            <li>
              <strong>Anything we should know</strong> — your client base,
              how you&rsquo;d use the program, or any custom-deal context.
              Plain English. No marketing pitch needed.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Need to read the terms first? ────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-10 lg:py-12 text-center">
          <p
            className="text-[14px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Want to read the commission structure first?{" "}
            <Link href="/partners" className="text-[var(--color-accent)] hover:underline">
              Back to the partner program page →
            </Link>
          </p>
          <p
            className="mt-3 text-[12px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Questions before applying?{" "}
            <a href="mailto:partners@assetcentral.ai" className="underline hover:text-[var(--color-ink)]">
              partners@assetcentral.ai
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
