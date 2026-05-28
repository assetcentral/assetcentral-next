import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/marketing/CookieBanner";
import { ConsentedGoogleAds } from "@/components/marketing/ConsentedGoogleAds";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://assetcentral.ai"),
  title: {
    default: "AssetCentral — The AI-powered return platform for property owners",
    template: "%s | AssetCentral",
  },
  description:
    "AssetCentral is your AI-powered Real Estate PA. Track real yield, verify operator statements, manage cashflow, and make smarter decisions across your multi-country property portfolio.",
  openGraph: {
    type: "website",
    siteName: "AssetCentral",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  // Verification meta tags — set the matching env var (or hardcode the value)
  // once you've registered the property in each provider's console.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
    },
  },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AssetCentral",
  url: "https://assetcentral.ai",
  logo: "https://assetcentral.ai/og-image.png",
  email: "hello@assetcentral.ai",
  description:
    "AI-powered return platform for private property owners. Track real yield, verify operator statements, manage cashflow across multi-country portfolios.",
  legalName: "LOMOND CONSULTING FZE",
  address: {
    "@type": "PostalAddress",
    streetAddress: "P.O. Box 38984, 8th Floor, RAKFTZ Business Centre 4",
    addressLocality: "Ras Al Khaimah",
    addressCountry: "AE",
  },
  taxID: "100044129300003",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        {/* Plausible — genuinely cookieless analytics, loads unconditionally
            (no PECR/GDPR consent required for cookieless first-party traffic
            measurement). */}
        <script
          defer
          data-domain="assetcentral.ai"
          src="https://plausible.io/js/script.outbound-links.tagged-events.js"
        />
        {/* Google Ads gtag — moved into ConsentedGoogleAds (mounted at the
            bottom of <body>) which gates loading on cookie-consent state.
            Used to load unconditionally here; that was non-compliant under
            PECR + GDPR because gtag sets advertising / remarketing cookies
            without consent. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        {/* Cookie consent UI — banner shows on first visit, gates the
            Google Ads loader. Both client components; render no
            user-visible chrome unless required. */}
        <CookieBanner />
        <ConsentedGoogleAds />
      </body>
    </html>
  );
}
