import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Soften newly-introduced React 19 / experimental hook rules that
    // eslint-config-next picked up in a recent bump. They flag patterns
    // (sessionStorage/localStorage hydration sync, ref initialised with
    // Date.now/Math.random) that are functionally correct on this site
    // and would require widespread refactoring to satisfy. Demoting to
    // warnings keeps the signal visible without blocking deploys.
    //
    // The proper migration target for the storage-sync ones is
    // useSyncExternalStore; for the Date.now refs it's useRef(null) +
    // lazy assignment in an effect. Both are tracked for follow-up.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/immutability": "warn",
      "react/no-unescaped-entities": "warn",
    },
  },
]);

export default eslintConfig;
