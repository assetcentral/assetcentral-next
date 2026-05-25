// Self-running 45-second explainer demo. Renders outside the (marketing)
// layout group so the route has no nav or footer chrome — ready for a
// 1920×1080 screen recording. The recorder can crop the central 16:9 canvas
// and ignore the page background.
//
// Sequence and timing match the shooting script in the project notes.
// Edit per-shot durations + content in ExplainerVideo.tsx.

import type { Metadata } from "next";
import { ExplainerVideo } from "@/components/marketing/ExplainerVideo";

export const metadata: Metadata = {
  title: "AssetCentral — Explainer | AssetCentral",
  description:
    "45-second product explainer for AssetCentral. Renders full-bleed for screen recording into video assets.",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <ExplainerVideo />;
}
