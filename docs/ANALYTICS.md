# Web Analytics Setup

The marketing site uses **Plausible Analytics** as the primary metrics system, and supports verification meta tags for **Google Search Console** and **Bing Webmaster Tools** for SEO analytics.

This file documents what's tracked, how to set it up, and what to look at weekly.

## Why Plausible (and not Google Analytics 4)

The original product brief required a privacy-first analytics stack with no cookie banner needed in the EU. Plausible delivers that — no cookies, no personal data, no tracking across sites — at the cost of being a paid service (€9/month for the smallest plan after the 30-day trial) and lacking the deep funnel features of GA4. For a marketing site of this size, the trade-off is sensible: faster page loads, no cookie consent UI, and a much cleaner data model.

If at some point you need session recording, heatmaps, or richer funnels and are willing to add a cookie banner, **Microsoft Clarity** (free) pairs well with Plausible. Don't mix Plausible + GA4 — you'll get conflicting numbers and confuse the team.

## Initial setup (do this once)

1. **Sign up at https://plausible.io** and add `assetcentral.ai` as a site. Pick a plan (the free 30-day trial converts to a paid plan; no action means it stops collecting after 30 days).
2. The script tag is already in `app/layout.tsx`:
   ```html
   <script defer data-domain="assetcentral.ai" src="https://plausible.io/js/script.outbound-links.tagged-events.js"></script>
   ```
   The `outbound-links` and `tagged-events` extensions are bundled into this script — no additional setup.
3. **Verify it works.** Visit https://assetcentral.ai/ from a real browser. Within ~30 seconds you should see the visit in Plausible's dashboard. If you're testing locally, set `data-domain="localhost"` on the script in dev to avoid polluting production data.
4. **Configure goals.** In Plausible, **Site Settings → Goals → Add a goal**. Add one Custom Event goal per event name listed below.

## Events tracked

### Auto-tracked (via `tagged-events` extension)

Any DOM element with a `plausible-event-name=*` class fires a custom event when clicked. Already tagged across the site:

| Event name | Where it fires | Props |
|---|---|---|
| `signup_cta_click` | Hero CTA, Nav, Final CTA, Sticky CTA | `location` (hero, nav, final, sticky) |
| `lead_magnet_card_click` | Homepage Lead Magnets section cards | none |
| `lead_magnet_submit` | The form submit button on `/downloads/*` | `magnet` (slug) |
| `lead_magnet_download` | The final "Download PDF" button on the success state | none |
| `save_result_submit` | The "Email me this result" button on each calculator | none |
| `newsletter+inline` | The inline newsletter submit button in resource articles | none |

### Fired programmatically (via `lib/plausible.ts` → `plausibleEvent()`)

| Event name | Where it fires | Props |
|---|---|---|
| `calculator_open` | On mount of any `/calculators/*` page (via `CalcOpenTracker`) | `calc` (slug, e.g. `mortgage`, `irr`) |
| `resource_read` | On mount of any `/resources/*` article page (via `ArticleReadTracker`) | `slug` |
| `scroll_depth` | When user scrolls past 25/50/75/100% on resource articles and calculator pages | `pct` (25, 50, 75, 100), `page` (path) |

### Goals to configure in Plausible (recommended)

Add these as Custom Event goals so they show up in the dashboard's Goal Conversions section:

- `signup_cta_click` — the primary conversion. Filter by `location` to see which CTA placement converts best.
- `calculator_open` — engagement with free tools. Filter by `calc` to see which calculator is most popular.
- `resource_read` — content engagement. Filter by `slug` to see best-performing articles.
- `scroll_depth` — content depth. Filter by `pct=100` to see articles read all the way through.
- `lead_magnet_submit` — email captures from gated PDFs. Filter by `magnet` to compare conversion of the two magnets.
- `save_result_submit` — high-intent leads. These users actively used a calculator.

Also configure a **Pageview goal** for `/signup` (= trial intent on the dashboard app, once that's deployed).

## Other analytics surfaces

### Google Search Console

Tracks organic search performance (impressions, clicks, average position, query-level data). Critical for the SEO work we've done.

1. Add `assetcentral.ai` as a domain property at https://search.google.com/search-console
2. Pick "HTML tag" verification, copy the value out of the `<meta name="google-site-verification" content="...">` snippet
3. Set the env var in Netlify: **Site configuration → Environment variables → Add a single variable**
   - Key: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - Value: the verification code (without the meta-tag wrapper)
4. Trigger a deploy. The verification tag will render in the `<head>` of every page. Click "Verify" in Search Console.

### Bing Webmaster Tools

Same flow as Search Console. Bing accounts for ~5–10% of UK/UAE search traffic — worth setting up for the residual SEO data.

1. Add the site at https://www.bing.com/webmasters
2. Pick "Meta tag" verification, copy the `content` value
3. Set env var `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Netlify
4. Deploy → verify

### Netlify dashboard

Your hosting provider also reports basic metrics (build duration, bandwidth, function invocations, form submissions). Form submissions for lead capture are in **Forms → lead** in the Netlify dashboard. Export to CSV from there or pipe to a webhook to push leads into a CRM / email automation.

## Weekly metrics to watch (suggested cadence)

Block 30 minutes on Monday morning. Look at:

### Traffic
- **Unique visitors (last 7d)** in Plausible. Trend vs prior 7d. Is the site growing?
- **Top referrer sources.** Which sites/channels drive traffic? Look for big drops in major referrers and unexpected new ones.
- **Top entry pages.** What's pulling people in? If organic search is working, the resource articles should be in the top 5.
- **UTM-tagged campaigns.** If you run paid traffic, the `utm_source` / `utm_campaign` filters in Plausible show conversion by campaign.

### Engagement
- **`scroll_depth` goal, filter `pct=100`.** Counts of full reads per article. Articles with high opens but low full reads need a structural rewrite.
- **`calculator_open` goal.** Which calculator is most popular? The list reveals what people actually came to do.
- **Average visit duration on resource articles.** Below 90s usually means the headline didn't deliver.

### Conversion
- **`signup_cta_click` goal.** Filter by `location` prop. Hero vs final-CTA vs sticky — which placement converts best?
- **`lead_magnet_submit` goal.** How many emails are being captured per week? Is the conversion rate of lead-magnet card clicks → submits healthy (>20%)?
- **`save_result_submit` goal.** Calculator users who give up an email. These are the highest-intent leads — they should funnel into a sales touchpoint within 24 hours.

### Search (after Search Console is set up)
- **Total clicks (last 28d)** trend. Organic growth?
- **Queries you're ranking for.** Surprises are valuable — sometimes you'll rank for things you didn't target.
- **Pages with high impressions + low CTR.** Usually a title/meta description rewrite opportunity.
- **Pages with high CTR + low position.** These are climbing — invest more content in the same topic.

## Things this setup does NOT do

Documented honestly so the team knows the gaps:

- **No individual session recording.** Use Microsoft Clarity (with cookie banner) if you need this.
- **No A/B testing built in.** Plausible has a feature flag UI but it's limited; for proper A/B testing use a feature-flag service (e.g. GrowthBook, PostHog) — both require cookies.
- **No e-commerce / revenue tracking** beyond the events listed above. Once the dashboard app is live and Stripe is wired up, fire a `subscription_started` event with the plan and amount as props.
- **No cross-device user identification.** Plausible deliberately doesn't track users across sessions — by design. If you need identity, you need a different tool (and a cookie banner).
- **No real-time alerting.** Plausible's UI is dashboard-only; for "alert me if traffic drops 50%" set up a separate uptime / synthetic monitoring tool (UptimeRobot, Better Uptime, etc.).

## Verifying tracking is working

Open the deployed site in an incognito window with the browser DevTools Network tab open. Filter for `plausible.io`. You should see:

- `plausible.io/api/event` POST on every pageview (the `event` field is `pageview`)
- A second POST with `event: "calculator_open"` (or `resource_read`) when you open a calculator or article
- Additional POSTs at scroll-depth milestones (25 / 50 / 75 / 100)
- A POST with the matching event name when you click any tagged button

If none of these fire, the most common causes are: (a) Plausible domain not configured at plausible.io, (b) an ad-blocker on your browser (~20% of visitors block analytics — your reported numbers will under-count by that much, which is fine for trends), (c) the script wasn't included in the latest deploy. The script tag rendering can be confirmed by viewing source of any deployed page and searching for `plausible.io`.
