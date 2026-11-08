# Beacon Soft Ltd. website

The company website for Beacon Soft Ltd., in English (`/en`) and Bangla (`/bn`).
It is a static site: Next.js builds every page to plain HTML in `out/`, and
Cloudflare Pages serves it. The only server code is three small Cloudflare Pages
Functions: the contact form and the content manager login.

- **Stack:** Next.js (App Router, static export), TypeScript (strict), Tailwind CSS,
  shadcn/ui, next-intl, next-themes, react-hook-form with zod, Decap CMS.
- **Rules for working on the code:** [`CLAUDE.md`](CLAUDE.md). Read it first.
- **Content still missing before launch:** [`TODO.md`](TODO.md).
- **Using the content manager:** [`docs/ADMIN.md`](docs/ADMIN.md).

## Contents

- [Run it locally](#run-it-locally)
- [Project structure](#project-structure)
- [How content works](#how-content-works)
- [The admin panel](#the-admin-panel)
- [Environment variables](#environment-variables)
- [Deploying on Cloudflare Pages](#deploying-on-cloudflare-pages)

## Run it locally

You need Node.js 20.9 or newer (22 LTS recommended) and npm.

```sh
npm install
cp .env.example .env.local   # Turnstile test key, so the contact form renders
npm run dev                  # http://localhost:3000
```

`npm run dev` doesn't run the Pages Functions, so the contact form can't send in dev.
To test the real thing (static files, `_headers`, `_redirects` and the functions together):

```sh
cp .dev.vars.example .dev.vars   # fill in the secrets you want to test
npm run build                    # writes the site to out/
npm run preview:functions        # http://localhost:8788 (Wrangler)
```

For a quick look at the static build without the functions, run `npm run preview`.

### Scripts

| Command                     | What it does                                                                |
| --------------------------- | --------------------------------------------------------------------------- |
| `npm run dev`               | Development server with hot reload. Shows blog drafts.                      |
| `npm run build`             | Checks all content and builds the static site to `out/`. Leaves out drafts. |
| `npm run preview`           | Serves `out/` as plain static files.                                        |
| `npm run preview:functions` | Serves `out/` with Cloudflare's local runtime, including `functions/`.      |
| `npm run cms:local`         | Local content manager backend (see [The admin panel](#the-admin-panel)).    |
| `npm run lint`              | ESLint; fails on any warning.                                               |
| `npm run typecheck`         | TypeScript check.                                                           |
| `npm run format`            | Formats code with Prettier (`format:check` only checks).                    |
| `npm run todos`             | Lists `[TODO: …]` placeholders left in content and code.                    |

Before every commit: `npm run lint`, `npm run typecheck`, `npm run format:check` and
`npm run build` must all pass.

## Project structure

```
app/
  [locale]/            Pages for /en and /bn: home, products, services,
                       case-studies, about, blog, careers, contact
  layout.tsx, page.tsx Root layout and the "/" fallback (redirects to /en/)
  sitemap.ts, robots.ts, manifest.ts   Generated at build time
  not-found.tsx        404 page
components/
  ui/                  shadcn/ui primitives
  sections/            Page sections (HomeHero, ProductRows, ContactForm, …)
  shared/              Header, footer, logo, language switcher, theme toggle, …
content/               All site text and data (see "How content works")
messages/              en.json, bn.json: interface labels (buttons, nav, form)
lib/                   Content loaders with zod checks, types, SEO and JSON-LD
                       helpers, utilities
i18n/                  next-intl routing and setup
functions/api/         Cloudflare Pages Functions
  contact.ts           Contact form: checks input and Turnstile, sends with Resend
  auth.ts, callback.ts Content manager login with GitHub
public/
  _headers             Security headers (CSP etc.) and caching
  _redirects           "/" → "/en/"
  admin/               Content manager (index.html, config.yml)
  images/, og/, icons/, brand/   Images, social share images, app icons
  uploads/             Images uploaded in the content manager
docs/ADMIN.md          Content manager guide and one-time setup
brand/                 Original brand files (not published)
```

## How content works

No marketing text lives in components. It's in three places:

1. **`content/`, edited in the content manager.** These files are JSON or Markdown, and
   each holds both languages:
   - `settings.json`: site address, company details, contact details, WhatsApp, social
     links.
   - `products/`, `services/`, `team/`, `testimonials/`, `careers/`: one `<slug>.json`
     per entry, shaped `{ "en": { …all fields }, "bn": { …translated fields } }`.
     Shared fields such as images, links and order come from `en`.
   - `blog/` and `case-studies/`: one Markdown file per language, `<slug>.en.mdx` and
     `<slug>.bn.mdx`.
2. **`content/*.ts`, changed in code only:** `site.ts`, `home.ts`, `pages.ts`,
   `values.ts`, `process.ts`, `contact.ts`, `tech-stack.ts`, `blog-tags.ts` and
   `navigation.ts`. Text there uses `{ en: "…", bn: "…" }`.
3. **`messages/en.json` and `messages/bn.json`:** short interface labels such as buttons,
   navigation and form errors.

**Content is checked at build time.** The loaders in `lib/` (`settings.ts`,
`products.ts`, `services.ts`, `blog.ts`, …) check every file with zod: required fields,
email and phone formats, `https://` links, that images exist, and that English and
Bangla lists match. A mistake stops `npm run build` with a message naming the file and
field, so a broken edit never reaches the live site.

A few more rules:

- **Empty settings are hidden**, not shown as blanks. For example, the WhatsApp button
  appears only once a number is set.
- **Don't invent facts.** Anything not yet confirmed (client names, figures, dates) is a
  visible `[TODO: …]` placeholder, listed in `TODO.md`.
- **Product and technology names stay in English** on Bangla pages.
- **Blog drafts:** a post with `draft: true` appears in `npm run dev` only.

When you add a field to a CMS-managed collection, change the loader schema in `lib/` and
`public/admin/config.yml` together.

## The admin panel

The content manager is [Decap CMS](https://decapcms.org) at `/admin/` on the live site.
Editors sign in with their GitHub account and need Write access to the repository.
Saving opens a pull request, and Cloudflare builds a preview of it. Pressing **Publish**
merges it into `main`, and Cloudflare deploys the live site in about 2–3 minutes. Every
change is a Git commit, so it can be reviewed and undone.

- **Configuration:** `public/admin/config.yml` (collections, fields, help text).
  `public/admin/index.html` loads a pinned Decap version with an integrity hash.
- **Login:** `functions/api/auth.ts` and `functions/api/callback.ts`, using a GitHub
  OAuth app. The secret stays in Cloudflare.
- **Editing locally without GitHub:** run `npm run cms:local` and `npm run dev`, then
  open <http://localhost:3000/admin/index.html>. Changes are written straight to your
  working copy.

[`docs/ADMIN.md`](docs/ADMIN.md) covers the one-time setup (GitHub OAuth app, Cloudflare
variables, editor access) and how editors use it day to day.

## Environment variables

None of these are in the repository. Local copies go in `.env.local` and `.dev.vars`,
which are gitignored; production values are set in Cloudflare.

| Name                             | Type               | Used in                                              | What it is                                                                                                                                                                                       |
| -------------------------------- | ------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public, build time | `components/sections/ContactForm.tsx`                | Turnstile site key. Written into the page at build time, so set it as a build variable. Without it, the form says it can't send messages. Local: `.env.local` (from `.env.example`).             |
| `TURNSTILE_SECRET`               | Secret, runtime    | `functions/api/contact.ts`                           | Turnstile secret key, used to verify the spam check on the server.                                                                                                                               |
| `RESEND_API_KEY`                 | Secret, runtime    | `functions/api/contact.ts`                           | Resend API key for sending contact form emails.                                                                                                                                                  |
| `CONTACT_TO_EMAIL`               | Secret, runtime    | `functions/api/contact.ts`                           | Where enquiries are delivered. Separate several addresses with commas.                                                                                                                           |
| `CONTACT_FROM_EMAIL`             | Optional, runtime  | `functions/api/contact.ts`                           | Sender, e.g. `Beacon Soft website <website@beaconsoft.com.bd>`. Must be on a domain verified in Resend. If empty, Resend's test sender is used, which only delivers to the Resend account owner. |
| `GITHUB_CLIENT_ID`               | Text, runtime      | `functions/api/auth.ts`, `functions/api/callback.ts` | GitHub OAuth app client ID for the content manager login.                                                                                                                                        |
| `GITHUB_CLIENT_SECRET`           | Secret, runtime    | `functions/api/callback.ts`                          | GitHub OAuth app client secret.                                                                                                                                                                  |
| `NODE_VERSION`                   | Build setting      | Cloudflare build only                                | Node.js version for the Cloudflare build, e.g. `22`.                                                                                                                                             |
| `NODE_ENV`                       | Set by Next.js     | `lib/blog.ts`                                        | Not set by hand. Blog drafts are included only when it isn't `production` (`npm run dev`).                                                                                                       |

Local runtime secrets go in `.dev.vars` (from `.dev.vars.example`), which
`npm run preview:functions` reads. Turnstile has test keys that always pass; they're
listed in both example files.

## Deploying on Cloudflare Pages

The site deploys from GitHub (`Beacon-Soft-Ltd/beacon-softltd-website`). Every push to
`main` deploys the live site, and every other branch (including content manager drafts)
gets a preview address.

### First-time setup

1. **Create the project.** Cloudflare dashboard → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git** → choose the repository.
2. **Build settings:**
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: leave empty
3. **Variables** (Settings → **Variables and Secrets**, Production environment; repeat
   for Preview if previews should send mail):
   - `NODE_VERSION` = `22`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - Secrets: `TURNSTILE_SECRET`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
     `GITHUB_CLIENT_SECRET`
   - Text: `GITHUB_CLIENT_ID`, `CONTACT_FROM_EMAIL`

   Then redeploy, because variables only apply to new deployments.

4. **Custom domain.** Under **Custom domains**, add the production domain. It must match
   `site.url` in `content/settings.json` and the URLs in `public/admin/config.yml`; the
   build fails if those two differ.
5. **Outside services:**
   - Add the domain to the Turnstile widget.
   - Verify the domain in Resend.
   - Create the GitHub OAuth app with callback `https://<domain>/api/callback`
     ([`docs/ADMIN.md`](docs/ADMIN.md), "One-time setup").

### What Cloudflare does on each deploy

1. Runs `npm run build`. This checks all content, generates every page in both
   languages, the sitemap, `robots.txt` and the manifest, and writes them to `out/`.
2. Publishes `out/` with its `_headers` (security headers, caching) and `_redirects`
   (`/` → `/en/`).
3. Deploys `functions/api/*` as Pages Functions at `/api/contact`, `/api/auth` and
   `/api/callback`.

If the build fails (usually a content mistake), the live site stays on the last good
deployment. The build log names the file and field. To undo a bad deploy, use
**Deployments** → an earlier deployment → **Rollback**, or revert the commit on GitHub.

### After the first deploy

Work through the "Before launch" and "SEO after launch" sections of `TODO.md`:

- Send a test message through the contact form.
- Log in to `/admin/` and publish a small change.
- Submit the sitemap to Google Search Console.
- Run PageSpeed Insights on a few pages.
