import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
        <script
          defer
          data-domain="assetcentral.ai"
          src="https://plausible.io/js/script.outbound-links.tagged-events.js"
        />
        {/* Google Ads global site tag — captures all marketing-site traffic for
            remarketing audiences + conversion attribution. The conversion event
            itself fires on /dashboard/welcome (app subdomain) once a paid signup
            completes, using the same AW- ID. Uses next/script so the gtag
            function binds to window reliably; plain inline <script> in App
            Router head loses the global. */}
        <Script
          id="gads-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18179673413"
        />
        <Script id="gads-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', 'AW-18179673413');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
