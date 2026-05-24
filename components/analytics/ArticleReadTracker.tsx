"use client";

import { useEffect } from "react";
import { plausibleEvent } from "@/lib/plausible";

/**
 * Fires a `resource_read` Plausible event on mount, with the article slug as
 * a prop. Combined with ScrollDepth, lets you measure both who started an
 * article and who actually read most of it.
 */
export function ArticleReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    plausibleEvent("resource_read", { slug });
  }, [slug]);

  return null;
}
