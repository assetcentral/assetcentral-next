// Tight 60-second cut for the website hero. Same scene library + visual
// system as /demo/v2; different SHOTS + SUBTITLES selection + a 60s VO file.
// Use this for embedding on the homepage / pricing page / press kits where
// 120s is too long.

import type { Metadata } from "next";
import {
  ExplainerVideoV2,
  SHOTS_60,
  SUBTITLES_60,
} from "@/components/marketing/ExplainerVideoV2";

export const metadata: Metadata = {
  title: "AssetCentral — 60-second explainer | AssetCentral",
  description:
    "60-second product explainer for AssetCentral. Renders full-bleed for screen recording into video assets.",
  robots: { index: false, follow: false },
};

export default function Demo60Page() {
  return (
    <ExplainerVideoV2
      shots={SHOTS_60}
      subtitles={SUBTITLES_60}
      audioSrc="/demo-vo-60.wav"
      totalMs={60000}
      variantLabel="60 seconds · British voiceover · placeholder"
    />
  );
}
