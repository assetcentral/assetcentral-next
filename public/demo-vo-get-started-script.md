# Voice-over script — /demo/get-started

**Title**: How to Use AssetCentral in 60 Seconds
**Target runtime**: ~70 seconds spoken (matches `totalMs={70000}` and the SHOTS_GET_STARTED timeline)
**Voice**: Kristen (ElevenLabs), calm and professional. Same settings as /demo/60.
**Tone**: Beginner-friendly, confident, direct. No jargon. Reads like a senior advisor explaining the product over coffee.

The video currently plays silent + autoplay. Once you record the VO, swap `silent` for `audioSrc="/demo-vo-get-started.mp3"` on the embed at `app/(marketing)/demo/get-started/page.tsx`.

---

## ▶ Paste this into ElevenLabs

```
Welcome to AssetCentral. Here's how to get going in sixty seconds.

Start with one property. Click Add Property and tell us a few basic details.

Use whatever you have. Upload a file, enter the details manually, forward an email, or snap a photo on WhatsApp.

AI reads it all, structures the data, and turns scattered information into a clear investment view.

See the key numbers instantly. Rent, yield, cashflow, IRR — and any risks that need attention.

Pick the right tool. Calculate IRR, test a rent review, model a refinance, or compare short-term let.

Compare scenarios. See how a rent uplift or a switch to short-term let affects your real return.

AI doesn't just show data. It explains what the numbers mean — and what you could do next.

Export a clear report — for yourself, your advisor, your lender, or your investment partners.

Real data. Better decisions. Better returns. Start with one property — at AssetCentral dot AI.
```

---

## ⏱ Scene-by-scene timing

| Scene | Window      | Visual                              | VO line |
|-------|-------------|-------------------------------------|---------|
| 1     | 0–6s        | Welcome — title card                | "Welcome to AssetCentral. Here's how to get going in sixty seconds." |
| 2     | 6–14s       | Step 1 — Properties dashboard with Add Property CTA | "Start with one property. Click Add Property and tell us a few basic details." |
| 3     | 14–22.5s    | Step 2 — Four input cards (Upload / Manual / Email / WhatsApp) | "Use whatever you have. Upload a file, enter the details manually, forward an email, or snap a photo on WhatsApp." |
| 4     | 22.5–30s    | Step 3 — Inputs flow into structured property fields | "AI reads it all, structures the data, and turns scattered information into a clear investment view." |
| 5     | 30–37.5s    | Step 4 — KPI dashboard with sub-metrics + sparklines | "See the key numbers instantly. Rent, yield, cashflow, IRR — and any risks that need attention." |
| 6     | 37.5–44.5s  | Step 5 — Six tool cards with previews | "Pick the right tool. Calculate IRR, test a rent review, model a refinance, or compare short-term let." |
| 7     | 44.5–52s    | Step 6 — Three scenario comparison cards with bars + sparklines | "Compare scenarios. See how a rent uplift or a switch to short-term let affects your real return." |
| 8     | 52–59s      | Step 7 — Three AI insight cards | "AI doesn't just show data. It explains what the numbers mean — and what you could do next." |
| 9     | 59–65.5s    | Step 8 — Co-branded report preview + share panel | "Export a clear report — for yourself, your advisor, your lender, or your investment partners." |
| 10    | 65.5–70s    | Closing — Real data / Better decisions / Better returns | "Real data. Better decisions. Better returns. Start with one property — at AssetCentral dot AI." |

---

## 🎙 Recording notes

- **Pace**: ~140 words per minute (Kristen's natural mid-tempo). Total copy is ~170 words → ~73s spoken. The closing CTA can land slightly into the silent outro buffer if needed.
- **Pause between sentences**: a beat (~0.3s) between scenes feels natural and gives the visuals room to land.
- **Hard stops**: full stops after "decisions" and "returns" in the closing — don't link them. The pauses are the point.
- **Pronunciations**:
  - "AssetCentral" → as one word ("asset-central"), no hyphen pause
  - "IRR" → say each letter ("eye-arr-arr"), not "irr"
  - "AED" → spell it out only if you need; otherwise the visual carries the currency
  - "AssetCentral dot AI" in the closing — spell out "dot AI" as words, not as the URL symbol

---

## After recording

1. Save the file as **`demo-vo-get-started.mp3`** in `assetcentral-next/public/`
2. Open `app/(marketing)/demo/get-started/page.tsx`
3. On the `<ExplainerVideoV2>` embed, **remove** `silent` + `autoplay` and **add** `audioSrc="/demo-vo-get-started.mp3"`
4. Note the actual audio duration from your recording. If it's significantly different from 70 seconds, tell me and I'll retime `SHOTS_GET_STARTED` in `ExplainerVideoV2.tsx` to match.
5. Rebuild + redeploy:
   ```powershell
   cd "C:\Users\james.harvey\Documents\Claude\Projects\Asset Central\assetcentral-next"
   npm run build
   npx netlify deploy --prod --no-build --dir=out
   ```

---

## 📝 If you want to tweak the script

- **Tighter (~60s)**: drop scene 6's tool list ("Calculate IRR, test a rent review...") down to "Calculate IRR, test refinance, compare short-term let." Saves ~3s.
- **Punchier closing**: replace the final line with just "Real data. Better decisions. Better returns. **Start free at AssetCentral dot AI.**" Adds urgency.
- **More confident tone**: change "Click Add Property and tell us a few basic details" → "Click Add Property. We'll guide you through the basics." Less obsequious.
- **Different focus per audience**: if running ads to brokers, the closing could swap to "Built for owners, advisors, and brokers. Start free at AssetCentral dot AI." But the current copy is intentionally owner-first.

Each tweak is one search-and-replace in the block above — re-record only the changed sentence and splice in ElevenLabs.
