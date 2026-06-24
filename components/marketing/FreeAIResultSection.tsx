// FreeAIResultSection — preview of what the free AI property check
// returns. Shows a single illustrative result card: property snapshot,
// the inputs, the calculator output, and the AI verdict (verdict +
// one red flag + one improvement suggestion + a single line of
// reasoning). Built to feel like the actual output the user will
// receive after running a check.
//
// All numbers are illustrative — labelled as a sample.

import Link from "next/link";

export function FreeAIResultSection() {
  return (
    <section
      id="free-ai-result"
      aria-label="What the free AI property check returns"
      className="bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* ── Section heading ─────────────────────────────────── */}
        <div className="max-w-3xl">
          <p
            className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            WHAT THE FREE CHECK RETURNS
          </p>
          <h2
            className="text-[30px] lg:text-[40px] leading-[1.1] text-[color:var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One property. One verdict. One thing to fix.
          </h2>
          <p
            className="mt-4 text-[16px] lg:text-[17px] leading-[1.6] text-[color:var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Run the numbers and AssetCentral tells you whether the property
            looks attractive, borderline or risky — with the single biggest red
            flag and the one change that would improve the deal.
          </p>
        </div>

        {/* ── Result card ─────────────────────────────────────── */}
        <article
          className="mt-10 grid lg:grid-cols-[1.05fr_1fr] gap-5 lg:gap-6 rounded-2xl border border-[color:var(--color-border)] bg-white overflow-hidden shadow-[0_18px_45px_-30px_rgba(15,23,42,0.25)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {/* LEFT — inputs + calculated numbers */}
          <div className="border-b lg:border-b-0 lg:border-r border-[color:var(--color-border)] p-6 lg:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted)] font-semibold">
                Sample free check
              </p>
              <span
                className="text-[10px] uppercase tracking-[0.1em] font-bold rounded-full px-2 py-0.5"
                style={{
                  backgroundColor: "rgba(22, 163, 74, 0.10)",
                  color: "var(--color-positive)",
                }}
              >
                Free · 60 seconds
              </span>
            </div>
            <h3
              className="mt-2 text-[20px] lg:text-[22px] leading-tight text-[color:var(--color-navy)] font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              2-bed flat · Manchester city centre
            </h3>
            <p className="mt-1 text-[13px] text-[color:var(--color-muted)]">
              You entered · purchase £285,000 · 25% deposit · 5.4% over 25 yrs
            </p>

            {/* ── Inputs + calc grid ────────────────────────── */}
            <dl className="mt-5 divide-y divide-[color:var(--color-border)] text-[14px]">
              {[
                ["Monthly mortgage payment", "£1,303"],
                ["Expected rent (you entered)", "£1,450/mo"],
                ["Service charge + ground rent", "£195/mo"],
                ["Letting + management (10%)", "£145/mo"],
                ["Maintenance reserve", "£90/mo"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3 py-2">
                  <dt className="text-[color:var(--color-muted)]">{k}</dt>
                  <dd className="text-[color:var(--color-ink)] tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            {/* ── Headline calc — clear, big, accent ────────── */}
            <div className="mt-5 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[12px] uppercase tracking-[0.1em] text-[color:var(--color-muted)] font-semibold">
                  Monthly cash flow
                </p>
                <p
                  className="text-[22px] tabular-nums font-bold"
                  style={{ color: "var(--color-negative)" }}
                >
                  −£283
                </p>
              </div>
              <p className="mt-1 text-[12.5px] text-[color:var(--color-muted)]">
                Gross yield 6.1% · Net yield 4.4% · You&rsquo;re subsidising
                the property by ~£3.4k a year.
              </p>
            </div>
          </div>

          {/* RIGHT — the AI verdict */}
          <div className="p-6 lg:p-7 bg-[color:var(--color-surface)]">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-accent)] font-semibold">
              AssetCentral AI · verdict
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex h-3 w-3 rounded-full"
                style={{ backgroundColor: "var(--color-warning)" }}
              />
              <h4
                className="text-[24px] lg:text-[26px] leading-tight text-[color:var(--color-navy)] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Borderline
              </h4>
            </div>
            <p className="mt-3 text-[14.5px] leading-[1.55] text-[color:var(--color-ink)]">
              The rent doesn&rsquo;t fully cover the mortgage and running costs
              at today&rsquo;s rate. Workable if you negotiate the price down
              or rent runs ahead of plan — risky if either moves against you.
            </p>

            {/* ── Red flag + improvement ────────────────────── */}
            <div className="mt-5 space-y-3">
              <div className="rounded-lg bg-white border border-[color:var(--color-border)] p-3.5">
                <p className="text-[10.5px] uppercase tracking-[0.1em] font-bold mb-1" style={{ color: "var(--color-negative)" }}>
                  Red flag
                </p>
                <p className="text-[13.5px] text-[color:var(--color-ink)] leading-snug">
                  At +200bps rate shock, monthly cash flow falls to{" "}
                  <strong>−£548</strong> — over £6.5k a year out of pocket.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-[color:var(--color-border)] p-3.5">
                <p className="text-[10.5px] uppercase tracking-[0.1em] font-bold mb-1" style={{ color: "var(--color-positive)" }}>
                  One thing to fix
                </p>
                <p className="text-[13.5px] text-[color:var(--color-ink)] leading-snug">
                  Negotiate price to <strong>£268k</strong> (-6%){" "}
                  <em>or</em> raise rent to{" "}
                  <strong>£1,600/mo</strong> (+10%) and the deal turns
                  cash-flow positive.
                </p>
              </div>
            </div>

            {/* ── Email gate teaser (will be wired in Phase 2) ─ */}
            <p className="mt-5 text-[12px] text-[color:var(--color-muted)] italic">
              Email gate sends the full result + a 10-year projection for
              when you&rsquo;re ready to go deeper.
            </p>
          </div>
        </article>

        {/* ── CTA + reassurance ───────────────────────────────── */}
        <div
          className="mt-9 flex flex-col sm:flex-row gap-3 items-start"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link
            href="/check"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-navy)] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[color:var(--color-navy-light)]"
          >
            Run yours now
            <span aria-hidden>→</span>
          </Link>
          <p className="text-[13.5px] text-[color:var(--color-muted)] self-center max-w-xl">
            No card. No sign-up to run the numbers. Email to save the result.
          </p>
        </div>
      </div>
    </section>
  );
}
