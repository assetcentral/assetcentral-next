import type { Metadata, Viewport } from "next";
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

// Viewport — sets the address-bar / status-bar tint to the brand navy on
// supporting browsers (Android Chrome, iOS Safari standalone). Lives on
// its own export per the Next 16 split: themeColor moved off Metadata.
export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://assetcentral.ai"),
  title: {
    default: "AI Agent Team for Property Yield — AssetCentral",
    template: "%s | AssetCentral",
  },
  description:
    "Five AI agents on your portfolio of 2 to 50 properties. Real data, better decisions, higher yield. Built for private property investors. From €49/month.",
  openGraph: {
    type: "website",
    siteName: "AssetCentral",
    // Note: do NOT hardcode an OG image URL here — Next 16 picks up the
    // global app/opengraph-image.tsx and injects og:image automatically.
    // Setting images here would override that and force the placeholder
    // path everywhere.
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
  logo: "https://assetcentral.ai/opengraph-image.png",
  email: "hello@assetcentral.ai",
  description:
    "AI agent team for private property investors. Your CEO, Finance Manager, Market Analyst, Operations Manager and Portfolio Personal Assistant work together to identify practical actions to improve yield across multi-country portfolios of 2 to 50 properties.",
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
