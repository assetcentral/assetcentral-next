// /cookies — cookies policy + revocation control.
//
// Two jobs:
//   1. Explain what we use (Plausible cookieless, Google Ads cookies)
//      and why. Lists the actual cookie names so a privacy-aware
//      reader can verify against the cookies their browser actually
//      stores from us.
//   2. Give the user a way to change their mind after the banner —
//      <CookiePreferences /> renders a small "current status + change"
//      panel inline.

import type { Metadata } from "next";
import Link from "next/link";
import { CookiePreferences } from "@/components/marketing/CookiePreferences";

const TITLE = "Cookies policy";
const DESCRIPTION =
  "What we use, why, and how to change your preferences. AssetCentral uses Plausible (cookieless) for analytics and Google Ads cookies only with your consent.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

const NAVY = "#0a0e27";

export default function CookiesPage() {
  return (
    <div style={{ backgroundColor: NAVY }} className="text-white min-h-screen">
      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-24">
        <p
          className="text-[11px] uppercase tracking-[0.25em] text-white/45 mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          AssetCentral · Cookies
        </p>
        <h1
          className="text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Cookies policy.
        </h1>
        <p
          className="mt-6 text-[16.5px] leading-[1.65] text-white/80"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          We try to keep this short. AssetCentral uses one cookieless
          analytics tool by default, and one advertising tracker that only
          loads if you accept. That&rsquo;s it — no fingerprinting, no
          session replay, no third-party data brokers.
        </p>

        {/* Inline preferences panel — lets the user change their mind
            without trekking back through a settings menu. */}
        <CookiePreferences className="mt-8" />

        <Section title="Plausible Analytics — always on">
          <p>
            We use{" "}
            <a
              href="https://plausible.io/privacy-focused-web-analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Plausible
            </a>{" "}
            to count page views, referrers, and aggregate traffic by
            country. Plausible doesn&rsquo;t use cookies and doesn&rsquo;t
            collect personal data — no IP addresses are stored, no
            fingerprint is built. Because there are no cookies and no
            personal data, no consent is required under GDPR / PECR.
          </p>
          <p className="mt-3">
            We&rsquo;d rather know which articles get read than know who
            you are.
          </p>
        </Section>

        <Section title="Google Ads — only with your consent">
          <p>
            If you accept marketing cookies, we load Google&rsquo;s
            <code className="ac-code"> gtag.js</code> from{" "}
            <code className="ac-code">googletagmanager.com</code>. Google
            Ads then sets a small number of cookies to:
          </p>
          <ul>
            <li>
              Recognise that you&rsquo;ve visited the site before
              (remarketing — so we can show ads to people who came once
              but didn&rsquo;t sign up).
            </li>
            <li>
              Attribute a signup back to the ad you clicked on (conversion
              tracking — so we know which ads work and which don&rsquo;t).
            </li>
          </ul>
          <p className="mt-3">
            Cookies set by Google Ads typically include{" "}
            <code className="ac-code">_gcl_au</code>,{" "}
            <code className="ac-code">_gcl_aw</code>, and similar. They
            expire on Google&rsquo;s standard schedule (most within 90 days).
          </p>
          <p className="mt-3">
            If you reject, none of this loads. Your visit is invisible to
            Google. The site still works identically — Google Ads is
            purely measurement.
          </p>
        </Section>

        <Section title="Changing your mind">
          <p>
            Use the panel at the top of this page to switch between
            accept / reject any time. Your choice is stored in your
            browser&rsquo;s localStorage under{" "}
            <code className="ac-code">ac_cookie_consent_v1</code> — no
            account required. Clearing your browser data resets the
            preference and the banner reappears on your next visit.
          </p>
        </Section>

        <Section title="What about cookies inside the app?">
          <p>
            Once you sign in to{" "}
            <a
              href="https://app.assetcentral.ai"
              className="underline hover:text-white"
            >
              app.assetcentral.ai
            </a>
            , we use first-party cookies to keep you signed in (Supabase
            session tokens) and remember your dashboard preferences
            (collapse state, column order). These are essential to the
            product — without them you&rsquo;d be logged out on every
            page. They&rsquo;re covered by our{" "}
            <Link href="/privacy" className="underline hover:text-white">
              privacy policy
            </Link>
            .
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions? Email{" "}
            <a
              href="mailto:privacy@assetcentral.ai"
              className="underline hover:text-white"
            >
              privacy@assetcentral.ai
            </a>
            .
          </p>
        </Section>

        <p
          className="mt-12 text-[12px] text-white/45"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Last updated: 28 May 2026
        </p>
      </div>

      {/* Local style hook for the inline-code spans. Kept inline rather
          than a global rule because <code> doesn't appear anywhere else
          on the marketing site. */}
      <style>{`
        .ac-code {
          background: rgba(255, 255, 255, 0.08);
          padding: 1px 5px;
          border-radius: 3px;
          font-family: var(--font-mono, "JetBrains Mono", monospace);
          font-size: 0.92em;
          color: rgba(255, 255, 255, 0.92);
        }
      `}</style>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="mt-10 pt-8 border-t border-white/10"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <h2
        className="text-[22px] sm:text-[26px] leading-tight tracking-tight mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div className="text-[15px] leading-[1.7] text-white/75 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-3 [&_ul>li]:mt-1.5">
        {children}
      </div>
    </section>
  );
}
