import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Keyword-stronger title than plain "About": flags the AI agent team
  // and the audience (private owners) so the page earns visits from
  // brand-curious search queries rather than just navigational ones.
  title: "About — AI Agent Team for Private Owners",
  // Was 220 chars; trimmed to 156 chars.
  description:
    "AssetCentral was built by an investor who hit every problem of owning property without a team behind him. An AI agent team for hands-on private owners.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-20 lg:py-28">
        <h1
          className="text-[44px] lg:text-[56px] leading-[1.05] text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Built by someone who needed it.
        </h1>

        <div
          className="mt-10 space-y-6 text-[17px] leading-[1.65] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <p>
            AssetCentral was built by an experienced entrepreneur — call him JH for now — who hit every problem of owning property and didn&rsquo;t have a family office handling it for him. Stuff scattered across spreadsheets, inboxes, and WhatsApp threads. Too many documents. Too little time. Markets going up, markets going down. Decisions that needed making while life got in the way.
          </p>
          <p>
            Being hands-on has its virtues. It also has its limits. You eventually realise no spreadsheet, however carefully maintained, keeps up with what&rsquo;s actually happening across a multi-country portfolio. Some part of the picture is always wrong — and you only find out which part when something breaks.
          </p>
          <p>
            AI changed what was possible. Documents could be read at scale. Numbers could be extracted reliably. Patterns across properties could be surfaced before they became problems. AssetCentral is what the team built once that became real — an AI team for owners who want healthy, durable returns without outsourcing their judgement to someone else.
          </p>
          <p>
            We&rsquo;re still on day 1 of what AI lets us do here. If something feels clunky, or you spot a bug, bear with us — and tell us. Every rough edge we hear about gets sharper faster than you&rsquo;d expect.
          </p>
        </div>

        <h2
          className="mt-16 text-[28px] lg:text-[34px] leading-[1.15] text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What AssetCentral does.
        </h2>

        <div
          className="mt-6 space-y-6 text-[17px] leading-[1.65] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <p>
            Five agents working on your portfolio. <strong>Your CEO</strong> ranks the highest-impact actions to improve yield. <strong>Finance Manager</strong> handles the numbers — real net yield, cashflow, debt, refinance. <strong>Market Analyst</strong> benchmarks rent and tracks comparable transactions. <strong>Operations Manager</strong> watches renewals, statements and cost anomalies. <strong>Portfolio Personal Assistant</strong> is the concierge — answers questions, organises data, sets alerts. In plain English: an AI agent team that works on your portfolio with you to identify practical actions that can improve yield.
          </p>
          <p>
            It&rsquo;s for private owners with anywhere from a second property to 50, often across multiple countries — managing their portfolio alongside a career or other business. Not first-time buyers. Not REITs. Not developers. Above 50 assets, we offer custom enterprise plans.
          </p>
        </div>

        <div className="mt-14 pt-10 border-t border-[var(--color-border)]">
          <p
            className="text-[15px] text-[var(--color-ink)] mb-3 leading-[1.6]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            If you want to know who you&rsquo;re dealing with before signing up, that&rsquo;s reasonable. JH isn&rsquo;t public about this work yet, but you can reach him directly — he reads every message.
          </p>
          <a
            href="mailto:founder@assetcentral.ai"
            className="text-[18px] font-medium text-[var(--color-accent)] hover:underline"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            founder@assetcentral.ai →
          </a>
          <p
            className="text-[13.5px] text-[var(--color-muted)] mt-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            For general questions: <a href="mailto:hello@assetcentral.ai" className="hover:text-[var(--color-accent)] underline">hello@assetcentral.ai</a>
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Add your first property
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-[var(--color-border)] text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            See what AssetCentral does →
          </Link>
        </div>
      </div>
    </article>
  );
}
