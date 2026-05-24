"use client";

import { useEffect } from "react";
import { plausibleEvent } from "@/lib/plausible";

/**
 * Fires a `calculator_open` Plausible event on mount with the calculator slug
 * as a prop. Useful as a Goal in Plausible to track which calculator is most
 * popular and where users drop off.
 */
export function CalcOpenTracker({ calc }: { calc: string }) {
  useEffect(() => {
    plausibleEvent("calculator_open", { calc });
  }, [calc]);

  return null;
}
