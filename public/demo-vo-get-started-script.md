# Voice-over script — /demo/get-started

Target runtime: ~88 seconds spoken + 5s silent intro = ~93s total.
Voice: Kristen (ElevenLabs), same settings as /demo/60.

## Paste into ElevenLabs as a single text block

> **Note**: Don't include the bracketed direction notes when pasting — those are
> for you, not Kristen. Use a 5-second silence at the very start (insert `<break time="5.0s" />` in ElevenLabs if available, otherwise leave the welcome scene's 5s window as your intro lead-in).

Setting up your first property takes minutes. Here are four ways to get going.

Type in your address. AssetCentral pulls market rents, comps, and ownership data automatically.

Or upload a document. Drag in a lease, a mortgage statement, an invoice — and AI reads the dates, amounts, and terms.

Every property gets its own inbox address. Forward your rent statements there, and they file themselves.

On the go, snap a photo on WhatsApp. It lands in the right property in seconds.

Once your data's in, you see real net yield, monthly cashflow, and debt status — per property, and across your whole portfolio.

AssetCentral watches your portfolio. Rate resets ninety days out. Voids. Covenant breaches — surfaced before they cost you.

Ask AI any question. Should I sell this property? It models real returns and gives you a straight answer.

Real data. Better decisions. Better returns. Start free — no card required.

## Scene-by-scene timing (target)

| Scene | Window | VO line |
|---|---|---|
| 1 — Welcome | 0–5s | (silent) |
| 2 — Type address | 5–14s | "Setting up your first property takes minutes. Here are four ways to get going. Type in your address. AssetCentral pulls market rents, comps, and ownership data automatically." |
| 3 — Upload doc | 14–24s | "Or upload a document. Drag in a lease, a mortgage statement, an invoice — and AI reads the dates, amounts, and terms." |
| 4 — Email forward | 24–34s | "Every property gets its own inbox address. Forward your rent statements there, and they file themselves." |
| 5 — WhatsApp | 34–44s | "On the go, snap a photo on WhatsApp. It lands in the right property in seconds." |
| 6 — Dashboard output | 44–55s | "Once your data's in, you see real net yield, monthly cashflow, and debt status — per property, and across your whole portfolio." |
| 7 — Alerts output | 55–65s | "AssetCentral watches your portfolio. Rate resets ninety days out. Voids. Covenant breaches — surfaced before they cost you." |
| 8 — AI insight | 65–76s | "Ask AI any question. Should I sell this property? It models real returns and gives you a straight answer." |
| 9 — Closing CTA | 76–88s | "Real data. Better decisions. Better returns. Start free — no card required." |

## After recording

1. Save as `demo-vo-get-started.mp3` in `assetcentral-next/public/`
2. Run the build/deploy from the marketing site root
3. Note the actual audio duration (Kristen tends to land ~88-92s for this length of copy) and adjust `totalMs` on the embed if needed
