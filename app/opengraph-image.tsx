// Branded global OG image — baked to a real PNG at build time as part of
// the static export. Next.js will serve it at /opengraph-image.png and
// auto-inject the appropriate <meta property="og:image"> tag site-wide
// unless a route-specific opengraph-image overrides it.
//
// Why this exists: prior to this file the site referenced /og-image.png
// in metadata across multiple pages but no actual asset existed in
// public/. Sharing a link surfaced a broken-image placeholder on every
// social platform. Generated here keeps the brand colours / typography
// in sync with the rest of the site without us having to maintain a
// separate Photoshop file.
import { ImageResponse } from "next/og";

// Required under `output: 'export'` — without this the route handler is
// treated as dynamic and the static export build fails. Forces Next to
// bake the PNG once at build time and emit it into ./out/.
export const dynamic = "force-static";

export const alt = "AssetCentral — AI Agent Team for Property Yield";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #2A4373 100%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Brand strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#0f0f1f",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            AC
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: -0.5,
            }}
          >
            AssetCentral
          </div>
        </div>

        {/* Hero */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Real data. Better decisions. Higher yield.
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 920,
            }}
          >
            Your AI agent team for property yield.
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            color: "rgba(255,255,255,0.75)",
            fontSize: 22,
          }}
        >
          <span>Five specialists. €49 / mo.</span>
          <span style={{ fontWeight: 600, color: "white" }}>
            assetcentral.ai
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
