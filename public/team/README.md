# Team avatars

Real AI-generated team photos live in this folder as `cio.webp` / `cfo.webp` /
`ceo.webp` / `coo.webp` / `pa.webp` (with matching `.png` copies as a
universal-format fallback). The marketing site's `MeetTheTeamSection` and
the in-app `AITeamAtWork` row both read these by filename.

## Replacing or regenerating

If you want to swap a portrait, generate a new image at **400×500 px
portrait crop, chest-up**, and overwrite the matching `.webp` (or `.png`).
The component code reads by filename, so no source changes are needed
unless you change the extension. Keep the role-colour gradient backgrounds
(purple / blue / navy / teal / pink) consistent across the five so the
team reads as one set.

The prompts below were used for the current set and can be re-fed into
ChatGPT image gen / Midjourney / etc. with tweaks for a regenerate.

## Image-generation prompts

These prompts are tuned for ChatGPT image gen / Midjourney. They produce
photorealistic headshots that match the role's accent colour (purple for
CIO, blue for CFO, navy for CEO, teal for COO, coral/pink for PA) so the
photos sit naturally inside the coloured card layout.

### CIO — Chief Investment Officer

```
Professional studio headshot of a confident male investment strategist
in his late 40s, short greying hair, subtle frameless glasses, sharp
charcoal suit jacket over a white shirt with a soft purple tie. Soft
lavender-to-mid-purple gradient background. Natural lighting, gentle
smile, looking slightly off-camera. Portrait crop chest-up. Calm,
analytical, sees-the-big-picture vibe. 4:5 aspect ratio.
```

### CFO — Chief Financial Officer

```
Professional studio headshot of a poised woman in her early 40s,
shoulder-length warm brown hair, no glasses, tailored navy or black
blazer over a crisp white blouse with a subtle blue accent. Soft
sky-blue to mid-blue gradient background. Natural lighting, confident
direct gaze, neutral expression. Portrait crop chest-up. Precise,
rigorous, financially literate vibe. 4:5 aspect ratio.
```

### CEO — Chief Executive Officer

```
Professional studio headshot of a distinguished male executive in his
early 50s, short silver-grey hair, clean-shaven, tailored dark charcoal
suit over a crisp white shirt with a slate-grey tie. Soft slate-grey
gradient background. Natural lighting, composed expression with the
faintest smile, looking directly at camera. Portrait crop chest-up.
Authoritative, synthesising, decision-maker vibe. 4:5 aspect ratio.
```

### COO — Chief Operations Officer

```
Professional studio headshot of a focused woman in her late 30s,
medium-length warm brown hair with a side part, no glasses, tailored
dark green or deep teal blouse, simple gold or silver stud earrings.
Soft mint-to-mid-teal gradient background. Natural lighting, watchful
attentive expression, gentle confident smile. Portrait crop chest-up.
Operationally sharp, watches-every-detail vibe. 4:5 aspect ratio.
```

### PA — Personal Assistant

```
Professional studio headshot of an organised woman in her early 30s,
dark hair pulled into a neat low bun or chignon, no glasses, soft beige
or tan blazer over a cream blouse. Soft pink-to-coral gradient
background. Natural lighting, warm welcoming smile, looking at camera.
Portrait crop chest-up. Helpful, organised, keeps-the-records-straight
vibe. 4:5 aspect ratio.
```

## Style consistency across the five

Run all five in the same session (or with the same style modifier) so
they read as a coherent team rather than five disparate photos:

- Same studio lighting (soft natural)
- Same crop tightness (chest level, shoulders visible)
- Same camera angle (eye-level, slight 5-10° off-camera direction varies)
- Same background treatment (subtle gradient in role colour)
- Same expression intensity (neutral-to-gentle-smile, never grinning)

## Licensing reminder

If you use a generative image tool, confirm the tool's terms allow
commercial use of the output. Check the licence at the time you generate;
defaults change.
