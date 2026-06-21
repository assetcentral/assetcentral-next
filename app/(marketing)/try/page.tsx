import type { Metadata } from "next";
import Link from "next/link";
import { CallMeBackForm } from "@/components/marketing/CallMeBackForm";

const TITLE = "Get a call from your AI property team — AssetCentral";
const DESCRIPTION =
  "Free 2-minute call from your AI property team. No signup. Punch in your number, verify by text, the call arrives in under a minute.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/try" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const BULLETS = [
  {
    title: "Two minutes",
    body:
      "Your CEO opens. Tell them about one property. They hand off to the CIO and CFO for an instant read.",
  },
  {
    title: "No signup before the call",
    body:
      "We text you a code, then the call arrives. You only sign up afterwards if you want your team to keep working.",
  },
  {
    title: "Your data stays yours",
    body:
      "What you say on the demo isn't saved to a portfolio. If you decide to sign up, you add your properties from scratch.",
  },
];

export default function TryPage() {
  return (
    <section
      aria-label="Get a call from your AI property team"
      className="relative w-full bg-gradient-to-b from-[#0f172a] via-[#1a1a2e] to-[#1a1a2e] py-12 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-100 text-[11px] sm:text-xs font-medium tracking-wide mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            Live AI property team
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Hear what your AI team sounds like.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-blue-100/80 max-w-2xl mx-auto">
            Two minutes. Free. They&apos;ll ask about one of your properties, then your CEO,
            CIO and CFO will tell you what they&apos;d look at first.
          </p>
        </div>

        <CallMeBackForm variant="page" />

        <ul className="mt-12 grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {BULLETS.map((b) => (
            <li
              key={b.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="text-sm font-semibold text-white">{b.title}</div>
              <p className="mt-1 text-xs text-white/70 leading-relaxed">{b.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-white/50">
          Already have an account?{" "}
          <Link
            href="https://app.assetcentral.ai/login"
            className="text-blue-300 underline hover:text-blue-200"
          >
            Sign in to call your team from the dashboard
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
