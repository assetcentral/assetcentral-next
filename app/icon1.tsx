// 512×512 large icon variant for the web app manifest.
// Lexically ordered after icon.tsx so manifest can reference both at
// /icon and /icon1 if needed. Same brand treatment.
import { ImageResponse } from "next/og";

// Required under `output: 'export'` — bake the PNG at build time.
export const dynamic = "force-static";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function IconLarge() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #2A4373 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          fontSize: 240,
          fontWeight: 700,
          letterSpacing: -6,
        }}
      >
        AC
      </div>
    ),
    { ...size },
  );
}
