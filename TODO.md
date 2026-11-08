# Content TODOs

Every placeholder or missing fact on the site, and where to fill it in. Run
`npm run todos` to find `[TODO: ...]` markers left in the code.

Most of these can now be filled in through the content manager at `/admin` (see
`docs/ADMIN.md`); the CMS name is given in brackets, e.g. **[CMS: Site settings]**.

Empty values in `content/settings.json` are **hidden** on the site (never shown as
"TODO" to visitors), and empty optional product sections are hidden too, so they
are tracked here instead.

## `[TODO]` markers in files

These placeholders are in the files themselves. Those marked **visible** show on the
live site as written, so fill them in or remove the page before launch.

| File                                     | Placeholders                                                              | Visible? |
| ---------------------------------------- | ------------------------------------------------------------------------- | -------- |
| `content/case-studies/gari-becho.en.mdx` | 3 result figures, 3 paragraphs (client details, rollout, results)         | **Yes**  |
| `content/case-studies/gari-becho.bn.mdx` | The same 6 placeholders in Bangla                                         | **Yes**  |
| `content/contact.ts`                     | Comment: confirm the budget ranges and currency in the contact form       | No       |
| `content/pages.ts`                       | Comment in `aboutPage`: add the founding year and how the company started | No       |

Run `npm run todos` to list them with line numbers.

## Facts to provide or confirm

| What's missing                      | File                                           | Notes                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production domain                   | `content/settings.json` [CMS: Site settings]   | `site.url`, used for canonical URLs, sitemap and social previews                                                                                                                                                                                                                                                                                                                 |
| Contact email                       | `content/settings.json` [CMS: Site settings]   | See "Found on garibecho.com" below                                                                                                                                                                                                                                                                                                                                               |
| Phone number                        | `content/settings.json`                        | See "Found on garibecho.com" below                                                                                                                                                                                                                                                                                                                                               |
| Office address (en + bn)            | `content/settings.json`                        | See "Found on garibecho.com" below                                                                                                                                                                                                                                                                                                                                               |
| Office hours (en + bn)              | `content/settings.json`                        | `contact.officeHours`                                                                                                                                                                                                                                                                                                                                                            |
| WhatsApp number                     | `content/settings.json`                        | `whatsapp.number`; floating button appears once set                                                                                                                                                                                                                                                                                                                              |
| GitHub / LinkedIn / Facebook URLs   | `content/settings.json`                        | `social[].url`; icons appear once set (must be `https://`)                                                                                                                                                                                                                                                                                                                       |
| Gari Becho technology stack         | `content/products/gari-becho.json` [CMS]       | `technologies` is empty, so "Built with" is hidden                                                                                                                                                                                                                                                                                                                               |
| Gari Becho results                  | `content/products/gari-becho.json` [CMS]       | `results` is empty; add only figures you can back up                                                                                                                                                                                                                                                                                                                             |
| Products 2–5: everything            | `content/products/*.json` (all but Gari Becho) | Status "In development", summary, problem, features, audience are placeholders. No screenshots.                                                                                                                                                                                                                                                                                  |
| Testimonials                        | `content/testimonials/` [CMS: Testimonials]    | Empty; section hidden until real, approved quotes are added                                                                                                                                                                                                                                                                                                                      |
| Founding year, registration no.     | `content/settings.json`                        | `company.founded`, `company.registration`; shown on About once set                                                                                                                                                                                                                                                                                                               |
| Team members                        | `content/team/` [CMS: Team]                    | Empty; "Our team" on About is hidden until real people (with consent) are added                                                                                                                                                                                                                                                                                                  |
| Careers email                       | `content/settings.json`                        | `contact.careersEmail` (falls back to `contact.email`). Until one is set, Careers sends people to the contact page instead of an email link                                                                                                                                                                                                                                      |
| Open positions                      | `content/careers/` [CMS: Careers]              | Empty, so Careers shows "Send us your CV". Add real openings only                                                                                                                                                                                                                                                                                                                |
| Blog posts                          | `content/blog/`                                | Only a sample post, marked `draft: true`, so the live blog is empty. Review it and set `draft: false` to publish, or delete it                                                                                                                                                                                                                                                   |
| Company story details               | `content/pages.ts` (`aboutPage`)               | Add founding year and how the company started; check the story is accurate                                                                                                                                                                                                                                                                                                       |
| Office map                          | `content/settings.json`                        | `contact.mapEmbedUrl`: Google Maps → Share → Embed a map → copy the `src` URL. Map is hidden until set                                                                                                                                                                                                                                                                           |
| Gari Becho case study               | `content/case-studies/gari-becho.{en,bn}.mdx`  | 3 result figures and 3 `[TODO]` paragraphs (client and duration filled in: own SaaS product, 2 years). **These placeholders are visible on the page**; fill in or remove the case study before launch. The body describes a client rollout: confirm it happened as written. No client quote until you have written permission.                                                   |
| Privacy policy and terms of service | not created yet                                | The site collects names, emails and phone numbers through the contact form, so a privacy policy is recommended. The text needs the company's (ideally a lawyer's) approval, so it wasn't written for you. The footer links were removed because the pages don't exist; add `app/[locale]/privacy` and `app/[locale]/terms` and put the links back in `SiteFooter.tsx` when ready |

### Found on garibecho.com (not yet used, needs confirmation)

Gari Becho's contact section lists: email `beaconsoftld@gmail.com`, phone and WhatsApp
`+8801973249268`, address "Pallabi, Mirpur 12, Dhaka - 1216", support hours "24 hours".
The email there is spelled `beaconsoft**ld**`, not `beaconsoft**ltd**`; check which is correct.

## Copy to review

| What                      | File                                                                                                | Notes                                                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| All Bangla text           | `content/**/*.ts`, `content/**/*.json` (`"bn"` sections), `content/**/*.bn.mdx`, `messages/bn.json` | Complete and reviewed for consistency, but written by AI: have a native speaker read it before launch. See "Bangla translation decisions" below |
| Home page copy            | `content/home.ts`                                                                                   | Headline, section intros, closing call to action                                                                                                |
| Products page copy        | `content/pages.ts`                                                                                  | Intro and "In development" note                                                                                                                 |
| Gari Becho page copy      | `content/products/gari-becho.json`                                                                  | Problem, audience and FAQ answers (from garibecho.com and the demo)                                                                             |
| Service descriptions      | `content/services/*.json`                                                                           | Confirm the six services, descriptions, "What's included" lists and technologies                                                                |
| About page copy           | `content/pages.ts`, `content/values.ts`                                                             | Intro, story, mission and the five value descriptions                                                                                           |
| Process step descriptions | `content/process.ts`                                                                                | Confirm promises (written scope, training, monitoring)                                                                                          |
| Blog sample post          | `content/blog/custom-or-ready-made.{en,bn}.mdx`                                                     | General advice, no facts or figures; check you agree with it                                                                                    |
| Careers copy              | `content/pages.ts` (`careersPage`), `messages/*.json` (`careers`)                                   | Intro, and the promise "We reply to every application"                                                                                          |
| Contact page copy         | `content/pages.ts` (`contactPage`), `messages/*.json` (`contact`)                                   | Intro and form labels                                                                                                                           |
| Budget ranges             | `content/contact.ts`                                                                                | `[TODO]`: confirm the ranges and that BDT (৳) is the right currency for overseas visitors                                                       |

### Bangla translation decisions (check these first)

Choices made for the Bangla pages. If you change one, change it everywhere so the
site stays consistent.

| Decision                                                                                                                                       | Where                                                             | Uncertain?                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Names stay in English: products (Gari Becho…), technologies (Laravel, WordPress…), brands (WhatsApp, GitHub), "API", "CMS", "DevOps"           | everywhere                                                        | No (project rule)                                                                                                                                                 |
| **"Clean Architecture"** kept in English as a technical term; the other four values are translated ("নিরাপত্তা সবার আগে", …)                   | `content/values.ts`                                               | **Yes:** keep English, or use "ক্লিন আর্কিটেকচার"?                                                                                                                |
| Common English loanwords used where they are what people say: প্রোডাক্ট, সার্ভিস, ফিচার, ডেমো, কোটেশন, মেসেজ, সফটওয়্যার, ক্লায়েন্ট, ইনভেস্টর | everywhere                                                        | **Yes:** some readers may prefer পণ্য, সেবা, বৈশিষ্ট্য, বার্তা. Previously the site mixed সেবা/সার্ভিস and বার্তা/মেসেজ; it now uses সার্ভিস and মেসেজ throughout |
| Bangla digits on Bangla pages (০১, ৪৫ সেকেন্ড, ৭ নভেম্বর ২০২৬); phone numbers, emails and prices in screenshots unchanged                      | `lib/utils.ts` (`formatNumber`, `formatDate`), `messages/bn.json` | No                                                                                                                                                                |
| Process step titles simplified for non-technical readers: "প্রয়োজন বোঝা" (Discover), "লাইভ করা" (Deploy)                                      | `content/process.ts`                                              | Minor                                                                                                                                                             |
| "FAQ" → "সচরাচর জিজ্ঞাসিত প্রশ্ন"; "Visit garibecho.com" → "garibecho.com-এ যান"                                                               | `messages/bn.json`                                                | No                                                                                                                                                                |
| Theme options "লাইট" / "ডার্ক" / "ডিভাইস অনুযায়ী"                                                                                             | `messages/bn.json`                                                | Minor                                                                                                                                                             |
| Bangla is formal-polite (আপনি) throughout                                                                                                      | everywhere                                                        | No                                                                                                                                                                |

## Media

| What                   | File / source                                        | Notes                                                                                                                                                |
| ---------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gari Becho demo video  | `https://garibecho.com/videos/gari-becho-demo.mp4`   | Played from garibecho.com, loaded only on click. At ~0:26 it shows an unfinished box: "Screenshot: Balance after payment". Fix in the source video.  |
| Gari Becho screenshots | `public/images/products/gari-becho/*.webp`           | Frames from the demo video (cursor visible in some). Replace with direct app screenshots for sharper images.                                         |
| Brand originals        | `brand/`                                             | Avatar and social covers you supplied. The site logo (`components/shared/LighthouseMark.tsx`) and icons are redrawn from the avatar.                 |
| Blog cover             | `public/images/blog/custom-or-ready-made/cover.webp` | Generated brand illustration (lighthouse at night). Replace with a post-specific image if you like.                                                  |
| Product OG images      | `public/og/products/<slug>.<locale>.png`             | Generated from the product name, category and screenshot. A product added in the CMS uses `public/og/default.png` until a developer makes its image. |

## Before launch: contact form setup

The form does not work until these are set (see `.dev.vars.example` and `.env.example`):

1. **Turnstile:** Cloudflare dashboard → Turnstile → add a widget for the production domain.
   Set the site key as build variable `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Pages → Settings →
   Variables, "build" environment; it is baked into the page at build time) and the secret
   as `TURNSTILE_SECRET`. Without the site key, the form shows "The form can't send
   messages right now".
2. **Resend:** create an API key → `RESEND_API_KEY` (secret). Verify your domain in Resend
   and set `CONTACT_FROM_EMAIL` (e.g. `Beacon Soft website <website@yourdomain>`); until
   then emails come from `onboarding@resend.dev`, which only delivers to the Resend
   account owner.
3. **Recipient:** `CONTACT_TO_EMAIL` (secret; comma-separate several addresses).
4. Send a test message from the live site after deploying.

## Before launch: content manager (/admin) setup

The content manager can't log in until these are done (details in `docs/ADMIN.md`,
"One-time setup"):

1. **Domain:** confirm the production domain. It must be the same in
   `content/settings.json` (`site.url`) and `public/admin/config.yml` (`base_url`,
   `site_url`, `display_url`); both currently say `https://beaconsoft.com.bd`. The build
   fails if they differ.
2. **GitHub OAuth app** under the Beacon-Soft-Ltd organization, callback URL
   `https://<domain>/api/callback`.
3. **Cloudflare variables:** `GITHUB_CLIENT_ID` (text) and `GITHUB_CLIENT_SECRET`
   (secret), Production environment; then redeploy.
4. **Editors:** give each editor Write access to `Beacon-Soft-Ltd/beacon-softltd-website`.
5. **Preview link:** check that "View Preview" appears in the editor for a draft. It
   relies on `preview_context: Cloudflare Pages` matching Cloudflare's GitHub status
   name; if it doesn't appear, adjust `preview_context` or use the link in Cloudflare's
   pull request comment.
6. Log in at `/admin/`, make a small test change, publish it and check the live site.

## SEO after launch

1. **Search Console:** verify the domain in Google Search Console and Bing Webmaster
   Tools, then submit `https://<domain>/sitemap.xml`.
2. **Organization details:** the Organization JSON-LD on every page shows only what
   Site settings holds. Fill in email, phone, address and social links so search
   engines get them too.
3. **Product rich results:** Google shows software rich results only with a price
   (`offers`) or ratings. None are listed, because we have no confirmed prices or
   reviews. Add them only if real.
4. **Gari Becho meta description:** the English summary (`content/products/gari-becho.json`)
   is 174 characters, so Google will cut it off at about 155. Shorten it if you like.
5. **New products:** ask a developer to make the product's share image
   (`public/og/products/<slug>.en.png` and `.bn.png`, 1200 × 630).
6. **Check social previews:** paste a few page links into the Facebook Sharing Debugger
   and LinkedIn Post Inspector after launch.

## Security headers and performance (`public/_headers`)

1. **Adding something external** (a video host, analytics, a chat widget): its origin
   must be added to the Content-Security-Policy in `public/_headers`, or the browser
   blocks it. Allowed now: Turnstile (`challenges.cloudflare.com`), the Google Maps
   embed (`www.google.com`) and the Gari Becho demo video (`garibecho.com`).
2. **Known CSP limits:** `script-src` allows `'unsafe-inline'` because Next.js static
   export writes page data and the theme script inline (no per-request nonce is
   possible without a server). `/admin/*` allows `'unsafe-eval'` because Decap CMS
   doesn't load without it (tested). Both are documented in the file.
3. **HSTS preload:** `Strict-Transport-Security` is one year without `preload`. Add
   `includeSubDomains; preload` only once every subdomain of beaconsoft.com.bd serves
   HTTPS.
4. **Lighthouse below 90:** `/bn/` (Bangla home) on mobile scores 87 in Performance
   (LCP 3.9 s under simulated slow 4G). The Bangla font files (about 80 KB) are only
   found after the CSS loads; next/font can't preload them on `/bn` alone. All other
   tested pages score 90+ on mobile and 100 on desktop. Re-check on the live site
   with PageSpeed Insights, which uses Cloudflare's real network.
