/**
 * Programmatic Plausible event helper.
 *
 * The site loads the `tagged-events` extension of Plausible, which means most
 * conversion events fire automatically via DOM classes:
 *   <a className="plausible-event-name=signup_cta_click">…</a>
 *
 * Use this helper from client components when an event needs to fire from JS
 * (e.g. after a form submission, on a tab switch, on calculator country change).
 *
 * In Plausible's dashboard, every distinct event name appears in the "Goals"
 * section once you configure it. Props (e.g. `location: "hero"`) become
 * filterable dimensions inside each goal.
 */
export function plausibleEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as {
    plausible?: (n: string, o?: { props?: Record<string, string> }) => void;
  }).plausible;
  if (!plausible) return;
  try {
    const stringProps = props
      ? Object.fromEntries(
          Object.entries(props).map(([k, v]) => [k, String(v)]),
        )
      : undefined;
    plausible(name, stringProps ? { props: stringProps } : undefined);
  } catch {
    /* swallow — analytics never throw */
  }
}
