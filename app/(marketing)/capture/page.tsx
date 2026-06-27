// Capture — first stage of the five-stage framework. Owns the SEO and
// ad-funnel for "property data capture" / "ingest property data"
// intent. Sister pages: /structure, /model, /monitor, /manage.
//
// Structure mirrors /model so the five pillar pages read as a set —
// hero, why-it-matters, ingestion channels, what we catch, next pillar
// nav, final CTA.

import type { Metadata } from "next";
import Link from "next/link";
import { PillarFaq } from "@/components/marketing/PillarFaq";

const TITLE = "Capture Property Data Automatically | AssetCentral";
const DESCRIPTION =
  "Forward an email, photograph an invoice, drop a spreadsheet, talk to your team. Your Personal Assistant catches every property input and routes it to the right asset — no typing.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/capture" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
};

const INGESTION_PATHS = [
  {
    icon: "🎙",
    label: "Voice",
    body:
      "Call your AI team and talk through a new property. Address, beds, rent, mortgage — Personal Assistant fills the rest from market data.",
  },
  {
    icon: "✉",
    label: "Email + WhatsApp",
    body:
      "Forward agent invoices, mortgage statements, lease renewals. AI extracts the key dates and amounts; everything filed against the right asset.",
  },
  {
    icon: "📊",
    label: "Spreadsheet",
    body:
      "Paste in your existing portfolio. AI maps the columns even when the headers are non-standard — review before commit.",
  },
  {
    icon: "📷",
    label: "Photo + document",
    body:
      "Snap a photo of a paper bill, drop a PDF, upload a CSV. The vault structures it; the alerts feed off the data the moment it lands.",
  },
] as const;

const WHAT_WE_CATCH = [
  "Property address + photos + handover docs",
  "Mortgage statements + rate changes",
  "Lease agreements + rent reviews",
  "Operator statements (short-term rental + agency)",
  "Service charges + capex invoices",
  "Utility bills + maintenance receipts",
  "Insurance + tax notices",
  "Currency-conversion notes + cross-border statements",
] as const;

const NAVY = "#1a1a2e";

export default function CapturePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Stage 01 · Capture
          </p>
          <h1
            className="text-[44px] lg:text-[60px] leading-[1.05] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Capture every input. No typing.
          </h1>
          <p
            className="mt-6 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Forward an email. Photograph an invoice. Drop a spreadsheet. Talk to
            your AI team by phone. Your Personal Assistant catches every scrap
            of property data and routes it to the right asset — before anything
            is asked of you.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup?plan=individual_monthly&intent=direct"
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] px-5 py-3 rounded-md bg-[var(--color-navy)] text-white text-[15px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Add your first property →
            </Link>
            <Link
              href="/demo/60"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[15px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch the explainer
            </Link>
          </div>
          <p
            className="mt-4 text-[13px] text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            From €19/month. 7-day free trial on every tier, no card required.
          </p>
        </div>
      </section>

      {/* ── Definition intro (200 words) — owns the "What is property
           data capture?" type informational query in search. Sits
           right under the hero so the SERP definition box pulls from
           here. ── */}
      <section
        aria-label="What is property data capture?"
        className="bg-white border-t border-[color:var(--color-border)]"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-12 lg:py-16">
          <h2
            className="text-[22px] lg:text-[26px] leading-[1.2] text-[color:var(--color-navy)] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What is property data capture?
          </h2>
          <p
            className="mt-4 text-[15.5px] lg:text-[16.5px] leading-[1.7] text-[color:var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Property data capture is the process of getting every piece of
            information about a property &mdash; address, purchase price, mortgage,
            tenancy, statements, invoices, photographs &mdash; into one place where
            it can be measured against. For most private landlords, capture
            happens slowly and incompletely: a service-charge invoice that sits
            in an email inbox for six weeks, a rent-review email that arrives on
            holiday, a mortgage statement that gets archived without being
            checked against the previous month. Each missed input is a decision
            made without the right context. Modern property capture moves the
            work off the owner and onto an AI Personal Assistant that accepts
            inputs through whichever channel suits the moment &mdash; voice,
            email, WhatsApp, photo, spreadsheet upload &mdash; extracts the dates
            and amounts, files them against the right asset and starts the
            downstream clock. Capture is the first of the five stages in the
            AssetCentral framework (Capture &middot; Structure &middot; Model
            &middot; Monitor &middot; Manage) because every later stage
            &mdash; modelling, alerting, action ranking &mdash; depends on the
            data being there in the first place.
          </p>
        </div>
      </section>

      {/* ── Why capture matters ──────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The portfolio you can&rsquo;t see is the one that costs you.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Every missed input is a decision made without context. A mortgage
            statement that sits in an inbox for a week. A service-charge invoice
            you never opened. A rent review that lapses because the email landed
            on holiday. Capture solves the bottleneck before it forms — your PA
            takes the input through any channel, files it, and starts the
            downstream clock the moment it arrives.
          </p>
        </div>
      </section>

      {/* ── Ingestion paths ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Four ways in
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Use whichever channel suits the moment.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INGESTION_PATHS.map((p) => (
              <div
                key={p.label}
                className="rounded-xl border border-[var(--color-border)] bg-white p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="text-[28px] leading-none" aria-hidden>{p.icon}</div>
                <div
                  className="mt-3 text-[18px] text-[var(--color-navy)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.label}
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--color-ink)]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we catch ────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What capture handles
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] text-[var(--color-navy)] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Eight input streams. One asset record.
          </h2>
          <ul
            className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {WHAT_WE_CATCH.map((line) => (
              <li key={line} className="flex items-start gap-2 leading-[1.5]">
                <span aria-hidden className="text-[var(--color-accent)] shrink-0 mt-[2px]">›</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ + JSON-LD FAQPage schema ───────────────────────────── */}
      <PillarFaq
        faqs={[
          {
            q: "What kinds of property data can AssetCentral capture?",
            a: "Address and ownership details, mortgage statements and rate changes, lease agreements and rent reviews, operator and agency statements, service-charge and capex invoices, utility bills, maintenance receipts, insurance and tax notices, and cross-border currency-conversion notes. Anything that arrives by email, WhatsApp, photo, PDF, CSV or voice gets parsed and filed against the right asset.",
          },
          {
            q: "Do I need to type any of this in manually?",
            a: "No. Capture is designed around the channels you already use. Forward an email and your AI Personal Assistant extracts dates and amounts. Photograph a paper invoice and the image is OCR'd into structured fields. Drop a CSV from your existing portfolio and the column mapping is handled for you. Voice intake means you can call your AI team and dictate a new property without typing.",
          },
          {
            q: "How fast does an input become visible in the portfolio?",
            a: "Most inputs are filed within seconds of arriving. A forwarded email triggers the extraction immediately, with the asset record updated and downstream alerts re-evaluated in the same minute. Photographed documents take a few extra seconds for OCR. Spreadsheet imports run through a review-before-commit step so you can verify the column mapping before anything is saved.",
          },
          {
            q: "What happens to the data after capture?",
            a: "It moves through the next four stages of the framework. Structure normalises the inputs into a clean asset record (multi-currency, country-aware). Model runs the underwriting (yield, IRR, scenarios). Monitor watches for drift and triggers alerts. Manage turns the alerts into ranked actions you and your team can execute. Capture is the gate; once it's open, the rest happens automatically.",
          },
          {
            q: "Is voice intake really practical, or is it a gimmick?",
            a: "It's practical for the use cases owners actually have. Adding a new property while walking through it, dictating a rent change you just agreed by phone, asking what the current cashflow is on a specific asset — all of these are faster spoken than typed. The voice line is connected to the same five AI agents who run every other stage, so a voice instruction becomes a structured asset update in the same database your dashboard reads.",
          },
        ]}
      />

      {/* ── Next stage nav ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: NAVY }} className="text-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-white/55 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Next stage
          </p>
          <h2
            className="text-[28px] lg:text-[40px] leading-[1.1] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Once it&rsquo;s captured, it gets structured.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-white/75 max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Capture handles the messy in. Structure turns it into a clean,
            comparable asset record — multi-currency, country-aware, ready for
            every downstream stage.
          </p>
          <div
            className="mt-7 flex flex-wrap gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/structure"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-white text-[var(--color-navy)] text-[14.5px] font-medium hover:bg-white/90 transition-colors"
            >
              How Structure works →
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-white/20 text-white text-[14.5px] font-medium hover:bg-white/5 transition-colors"
            >
              See the full journey
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-24 text-center">
          <h2
            className="text-[32px] lg:text-[44px] leading-[1.08] text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stop typing. Start capturing.
          </h2>
          <p
            className="mt-5 text-[16px] lg:text-[18px] leading-[1.65] text-[var(--color-muted)] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free for up to 3 properties. No card. You forward what you have,
            the agents do the rest.
          </p>
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-[var(--color-navy)] text-white text-[14.5px] font-medium hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Add your first property
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-ink)] text-[14.5px] font-medium hover:border-[var(--color-navy)] transition-colors"
            >
              Try the calculators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
