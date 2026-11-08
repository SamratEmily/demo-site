# Content TODOs

Every placeholder or missing fact on the site, and where to fill it in. Run
`npm run todos` to find `[TODO: ...]` markers left in the code.

Empty values in `content/settings.json` are **hidden** on the site (never shown as
"TODO" to visitors), and empty optional product sections are hidden too, so they
are tracked here instead.

## Facts to provide or confirm

| What's missing                    | File                                          | Notes                                                                                                                                                                                                                                                                                      |
| --------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Production domain                 | `content/site.ts`                             | `site.url`, used for canonical URLs, sitemap and social previews                                                                                                                                                                                                                           |
| Contact email                     | `content/settings.json`                       | See "Found on garibecho.com" below                                                                                                                                                                                                                                                         |
| Phone number                      | `content/settings.json`                       | See "Found on garibecho.com" below                                                                                                                                                                                                                                                         |
| Office address (en + bn)          | `content/settings.json`                       | See "Found on garibecho.com" below                                                                                                                                                                                                                                                         |
| Office hours (en + bn)            | `content/settings.json`                       | `contact.officeHours`                                                                                                                                                                                                                                                                      |
| WhatsApp number                   | `content/settings.json`                       | `whatsapp.number`; floating button appears once set                                                                                                                                                                                                                                        |
| GitHub / LinkedIn / Facebook URLs | `content/settings.json`                       | `social[].url`; icons appear once set (must be `https://`)                                                                                                                                                                                                                                 |
| Gari Becho technology stack       | `content/products/gari-becho.ts`              | `technologies` is empty, so "Built with" is hidden                                                                                                                                                                                                                                         |
| Gari Becho results                | `content/products/gari-becho.ts`              | `results` is empty; add only figures you can back up                                                                                                                                                                                                                                       |
| Products 2–5: everything          | `content/products/placeholders.ts`            | Status "In development", summary, problem, features, audience are placeholders. No screenshots.                                                                                                                                                                                            |
| Testimonials                      | `content/testimonials.ts`                     | Empty; section hidden until real, approved quotes are added                                                                                                                                                                                                                                |
| Founding year, registration no.   | `content/settings.json`                       | `company.founded`, `company.registration`; shown on About once set                                                                                                                                                                                                                         |
| Team members                      | `content/team.ts`                             | Empty; "Our team" on About is hidden until real people (with consent) are added                                                                                                                                                                                                            |
| Careers email                     | `content/settings.json`                       | `contact.careersEmail` (falls back to `contact.email`). Until one is set, Careers sends people to the contact page instead of an email link                                                                                                                                                |
| Open positions                    | `content/careers.ts`                          | Empty, so Careers shows "Send us your CV". Add real openings only                                                                                                                                                                                                                          |
| Blog posts                        | `content/blog/`                               | Only a sample post, marked `draft: true`, so the live blog is empty. Review it and set `draft: false` to publish, or delete it                                                                                                                                                             |
| Company story details             | `content/pages.ts` (`aboutPage`)              | Add founding year and how the company started; check the story is accurate                                                                                                                                                                                                                 |
| Office map                        | `content/settings.json`                       | `contact.mapEmbedUrl`: Google Maps → Share → Embed a map → copy the `src` URL. Map is hidden until set                                                                                                                                                                                     |
| Gari Becho case study             | `content/case-studies/gari-becho.{en,bn}.mdx` | Client name, duration, 3 result figures and 3 `[TODO]` paragraphs. **These placeholders are visible on the page**; fill in or remove the case study before launch. The body describes a client rollout: confirm it happened as written. No client quote until you have written permission. |

### Found on garibecho.com (not yet used, needs confirmation)

Gari Becho's contact section lists: email `beaconsoftld@gmail.com`, phone and WhatsApp
`+8801973249268`, address "Pallabi, Mirpur 12, Dhaka - 1216", support hours "24 hours".
The email there is spelled `beaconsoft**ld**`, not `beaconsoft**ltd**`; check which is correct.

## Copy to review

| What                      | File                                                                                  | Notes                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| All Bangla text           | `content/**/*.ts`, `content/**/*.bn.mdx`, `messages/bn.json`, `content/settings.json` | Complete and reviewed for consistency, but written by AI: have a native speaker read it before launch. See "Bangla translation decisions" below |
| Home page copy            | `content/home.ts`                                                                     | Headline, section intros, closing call to action                                                                                                |
| Products page copy        | `content/pages.ts`                                                                    | Intro and "In development" note                                                                                                                 |
| Gari Becho page copy      | `content/products/gari-becho.ts`                                                      | Problem, audience and FAQ answers (from garibecho.com and the demo)                                                                             |
| Service descriptions      | `content/services.ts`                                                                 | Confirm the six services, descriptions, "What's included" lists and technologies                                                                |
| About page copy           | `content/pages.ts`, `content/values.ts`                                               | Intro, story, mission and the five value descriptions                                                                                           |
| Process step descriptions | `content/process.ts`                                                                  | Confirm promises (written scope, training, monitoring)                                                                                          |
| Blog sample post          | `content/blog/custom-or-ready-made.{en,bn}.mdx`                                       | General advice, no facts or figures; check you agree with it                                                                                    |
| Careers copy              | `content/pages.ts` (`careersPage`), `messages/*.json` (`careers`)                     | Intro, and the promise "We reply to every application"                                                                                          |
| Contact page copy         | `content/pages.ts` (`contactPage`), `messages/*.json` (`contact`)                     | Intro and form labels                                                                                                                           |
| Budget ranges             | `content/contact.ts`                                                                  | `[TODO]`: confirm the ranges and that BDT (৳) is the right currency for overseas visitors                                                       |

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

| What                   | File / source                                        | Notes                                                                                                                                               |
| ---------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gari Becho demo video  | `https://garibecho.com/videos/gari-becho-demo.mp4`   | Played from garibecho.com, loaded only on click. At ~0:26 it shows an unfinished box: "Screenshot: Balance after payment". Fix in the source video. |
| Gari Becho screenshots | `public/images/products/gari-becho/*.webp`           | Frames from the demo video (cursor visible in some). Replace with direct app screenshots for sharper images.                                        |
| Brand originals        | `brand/`                                             | Avatar and social covers you supplied. The site logo (`components/shared/LighthouseMark.tsx`) and icons are redrawn from the avatar.                |
| Blog cover             | `public/images/blog/custom-or-ready-made/cover.webp` | Generated brand illustration (lighthouse at night). Replace with a post-specific image if you like.                                                 |
| Product OG images      | `public/og/`                                         | Only a default share image exists. Per-page images can be added in the SEO step.                                                                    |

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

## Notes for later steps

- **Security headers (`public/_headers`):** the CSP must allow
  - `media-src https://garibecho.com` (Gari Becho demo video),
  - `script-src` and `frame-src https://challenges.cloudflare.com` (Turnstile),
  - `frame-src https://www.google.com` (map embed, if used),
  - `connect-src 'self'` (form posts to `/api/contact`).
- **Sitemap (SEO step):** list only published blog posts; `getPosts()` in `lib/blog.ts`
  already leaves out drafts in production builds.
