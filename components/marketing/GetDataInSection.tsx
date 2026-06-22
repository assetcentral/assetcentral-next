// "Get started — send us your data" — the 5-channel ingestion strip
// that mirrors the in-app MegaIngestionCTA on the dashboard. Sits
// right under the team hero so a visitor's next question after "who
// works for you?" is answered immediately: "and here's how to start
// — five ways to get the data in, your team does the rest".
//
// Voice + WhatsApp pick up the PA pink accent because those two
// channels route to the Personal Assistant. Email, File upload,
// Manual use the navy primary accent because they're neutral
// ingestion paths.
//
// Voice ships with a small "Coming soon" badge — the runtime is
// behind a feature flag in the app — but the copy positions it as
// "your PA calls YOU" rather than "we'll call when ready", so the
// value proposition reads regardless of launch date.

const CHANNELS: ReadonlyArray<{
  key: string;
  name: string;
  blurb: string;
  accent: "pa" | "navy";
  badge?: string;
  icon: React.ReactNode;
}> = [
  {
    key: "voice",
    name: "Voice",
    blurb: "Your Personal Assistant calls you to gather everything.",
    accent: "pa",
    badge: "Coming soon",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    key: "whatsapp",
    name: "WhatsApp",
    blurb: "Snap a photo, your Personal Assistant does the rest.",
    accent: "pa",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    key: "email",
    name: "Email",
    blurb: "Forward a statement to your private inbox address.",
    accent: "navy",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    key: "file",
    name: "File upload",
    blurb: "Drop a PDF, statement or spreadsheet.",
    accent: "navy",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    key: "manual",
    name: "Manual",
    blurb: "Type the basics yourself in 2 minutes.",
    accent: "navy",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
];

export function GetDataInSection() {
  return (
    <section
      id="get-data-in"
      aria-label="Get started — send us your data"
      className="bg-[color:var(--color-surface)] py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-[40px] font-semibold text-[color:var(--color-navy)] leading-[1.1] tracking-tight max-w-4xl">
          Get started to make more yield — send us your data and we do the rest.
        </h2>
        <p className="mt-4 text-base md:text-lg text-[color:var(--color-muted)] max-w-3xl leading-relaxed">
          Five ways to send it in: voice, WhatsApp, email, file upload or manual entry.
          Rough numbers are fine — your AI team fills the gaps.
        </p>

        {/* Compare-options bridge — surfaces the /compare hub right at
            the point a visitor is thinking about how their current setup
            (spreadsheets, accounting software, broker valuations) maps
            onto AssetCentral. Quiet inline link, not a hero band. */}
        <p className="mt-4 text-[14.5px] text-[color:var(--color-muted)]">
          Still using spreadsheets, accounting software or broker valuations to
          make portfolio decisions?{" "}
          <a
            href="/compare/"
            className="font-semibold text-[color:var(--color-accent)] hover:underline"
          >
            Compare AssetCentral with other options →
          </a>
        </p>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CHANNELS.map((c) => (
            <li
              key={c.key}
              className="relative bg-white border border-[color:var(--color-border)] rounded-xl p-5"
            >
              {c.badge && (
                <span className="absolute top-3 right-3 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 tracking-wide uppercase">
                  {c.badge}
                </span>
              )}
              <div
                className={
                  c.accent === "pa"
                    ? "text-[color:var(--color-pa-mid)]"
                    : "text-[color:var(--color-navy)]"
                }
                aria-hidden
              >
                {c.icon}
              </div>
              <div className="mt-3 text-base font-semibold text-[color:var(--color-ink)]">
                {c.name}
              </div>
              <p className="mt-1.5 text-sm text-[color:var(--color-muted)] leading-snug">
                {c.blurb}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
