// Full-bleed recording route — kept outside the (marketing) group so there's
// no nav / footer. Use ?record=1 to also hide the bottom controls for clean
// screen-capture of the central 16:9 canvas.

import type { Metadata } from "next";
import {
  ExplainerVideoV2,
  SHOTS_60,
} from "@/components/marketing/ExplainerVideoV2";

export const metadata: Metadata = {
  title: "AssetCentral — Explainer (full-bleed) | AssetCentral",
  description: "Full-bleed view of the AssetCentral 88-second explainer for screen recording.",
  robots: { index: false, follow: false },
};

export default function Demo60FullPage() {
  return (
    <ExplainerVideoV2
      shots={SHOTS_60}
      subtitles={[]}
      audioSrc="/demo-vo-60.mp3"
      totalMs={88000}
      variantLabel="88 seconds · Kristen · ElevenLabs"
    />
  );
}
