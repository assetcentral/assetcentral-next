// "What is AssetCentral?" — the longer 120-second explainer that opens
// with the funds-vs-private-owner contrast and lands on "Real data.
// Better decisions. Higher yield."
//
// /demo still serves the original 45-second Charlotte version. This v2
// route lives in parallel so the original isn't lost while the new one
// is iterated on. Promote to /demo by swapping the import in app/demo/page.tsx.

import type { Metadata } from "next";
import { ExplainerVideoV2 } from "@/components/marketing/ExplainerVideoV2";

export const metadata: Metadata = {
  title: "What is AssetCentral? | AssetCentral",
  description:
    "120-second product explainer for AssetCentral. Renders full-bleed for screen recording into video assets.",
  robots: { index: false, follow: false },
};

export default function DemoV2Page() {
  return <ExplainerVideoV2 />;
}
