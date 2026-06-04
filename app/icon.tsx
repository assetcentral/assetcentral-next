// 192×192 branded icon used by the web app manifest.
// Same look as apple-icon — navy gradient, white "AC".
import { ImageResponse } from "next/og";

// Required under `output: 'export'` — bake the PNG at build time.
export const dynamic = "force-static";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 92,
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
