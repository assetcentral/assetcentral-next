// Branded 180×180 apple-touch-icon, baked to a PNG at build time.
// Pinned to home screens on iOS — shows white "AC" on the brand navy.
import { ImageResponse } from "next/og";

// Required under `output: 'export'` — bake the PNG at build time.
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        AC
      </div>
    ),
    { ...size },
  );
}
