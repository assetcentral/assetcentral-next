// Tiny client-side helper for cookie-consent state.
//
// We use ONE flag rather than per-category granular consent because the
// only cookied trackers on this site are Google Ads (advertising +
// remarketing). Plausible is genuinely cookieless and doesn't need
// gating. So:
//   • marketing  = accepted  → Google Ads gtag.js loads + sets cookies
//   • marketing  = rejected  → Google Ads never loads
//   • marketing  = undecided → banner shown, gtag.js doesn't load until
//                              the user picks something
//
// State lives in localStorage so the choice persists across visits.
// LocalStorage itself isn't a "cookie" under PECR/GDPR — it's
// first-party client state — so storing the consent decision in it is
// fine without consent for that storage.
//
// Custom event "ac-consent-change" lets components (gtag loader, "Manage
// preferences" button, etc.) react when the user changes their mind
// without needing a context provider.

const STORAGE_KEY = 'ac_cookie_consent_v1'
const CHANGE_EVENT = 'ac-consent-change'

export type ConsentState = 'accepted' | 'rejected' | 'undecided'

export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return 'undecided'
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === 'accepted' || v === 'rejected') return v
    return 'undecided'
  } catch {
    // localStorage disabled (private mode, etc.) — default to rejected
    // so we never load advertising cookies for someone who couldn't
    // express a preference.
    return 'rejected'
  }
}

export function writeConsent(value: 'accepted' | 'rejected'): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Best effort. If we can't persist, the choice still applies for
    // this session via the change event below.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: value }))
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: 'undecided' }))
}

/** Subscribe to consent-state changes. Returns an unsubscribe fn. */
export function onConsentChange(cb: (state: ConsentState) => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<ConsentState>).detail
    cb(detail ?? readConsent())
  }
  window.addEventListener(CHANGE_EVENT, handler)
  return () => window.removeEventListener(CHANGE_EVENT, handler)
}
