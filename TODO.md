# Content TODOs

Every placeholder or missing fact on the site, and where to fill it in. Run
`npm run todos` to find `[TODO: ...]` markers left in the code.

Empty values in `content/settings.json` are **hidden** on the site (never shown as
"TODO" to visitors), and empty optional product sections are hidden too, so they
are tracked here instead.

## Facts to provide or confirm

| What's missing                    | File                               | Notes                                                                                           |
| --------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| Production domain                 | `content/site.ts`                  | `site.url`, used for canonical URLs, sitemap and social previews                                |
| Contact email                     | `content/settings.json`            | See "Found on garibecho.com" below                                                              |
| Phone number                      | `content/settings.json`            | See "Found on garibecho.com" below                                                              |
| Office address (en + bn)          | `content/settings.json`            | See "Found on garibecho.com" below                                                              |
| Office hours (en + bn)            | `content/settings.json`            | `contact.officeHours`                                                                           |
| WhatsApp number                   | `content/settings.json`            | `whatsapp.number`; floating button appears once set                                             |
| GitHub / LinkedIn / Facebook URLs | `content/settings.json`            | `social[].url`; icons appear once set (must be `https://`)                                      |
| Gari Becho technology stack       | `content/products/gari-becho.ts`   | `technologies` is empty, so "Built with" is hidden                                              |
| Gari Becho results                | `content/products/gari-becho.ts`   | `results` is empty; add only figures you can back up                                            |
| Products 2–5: everything          | `content/products/placeholders.ts` | Status "In development", summary, problem, features, audience are placeholders. No screenshots. |
| Testimonials                      | `content/testimonials.ts`          | Empty; section hidden until real, approved quotes are added                                     |

### Found on garibecho.com (not yet used, needs confirmation)

Gari Becho's contact section lists: email `beaconsoftld@gmail.com`, phone and WhatsApp
`+8801973249268`, address "Pallabi, Mirpur 12, Dhaka - 1216", support hours "24 hours".
The email there is spelled `beaconsoft**ld**`, not `beaconsoft**ltd**`; check which is correct.

## Copy to review

| What                      | File                                                           | Notes                                                               |
| ------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| All Bangla text           | `content/**/*.ts`, `messages/bn.json`, `content/settings.json` | First drafts, need a native-speaker review                          |
| Home page copy            | `content/home.ts`                                              | Headline, section intros, closing call to action                    |
| Products page copy        | `content/pages.ts`                                             | Intro and "In development" note                                     |
| Gari Becho page copy      | `content/products/gari-becho.ts`                               | Problem, audience and FAQ answers (from garibecho.com and the demo) |
| Service descriptions      | `content/services.ts`                                          | Confirm the six services and what each includes                     |
| Process step descriptions | `content/process.ts`                                           | Confirm promises (written scope, training, monitoring)              |

## Media

| What                   | File / source                                      | Notes                                                                                                                                               |
| ---------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gari Becho demo video  | `https://garibecho.com/videos/gari-becho-demo.mp4` | Played from garibecho.com, loaded only on click. At ~0:26 it shows an unfinished box: "Screenshot: Balance after payment". Fix in the source video. |
| Gari Becho screenshots | `public/images/products/gari-becho/*.webp`         | Frames from the demo video (cursor visible in some). Replace with direct app screenshots for sharper images.                                        |
| Brand originals        | `brand/`                                           | Avatar and social covers you supplied. The site logo (`components/shared/LighthouseMark.tsx`) and icons are redrawn from the avatar.                |
| Product OG images      | `public/og/`                                       | Only a default share image exists. Per-page images can be added in the SEO step.                                                                    |

## Notes for later steps

- **Security headers (`public/_headers`):** the CSP must allow `media-src https://garibecho.com`
  for the demo video to play.
- **Contact page:** must read `?product=<slug>` client-side and preselect the product
  (links already point to `/contact/?product=gari-becho` etc.).
