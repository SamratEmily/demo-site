# Content manager (/admin)

The website has a content manager at **https://beaconsoft.com.bd/admin/** (Decap CMS).
Use it to change contact details, products, services, team, testimonials, job openings,
blog posts and case studies without touching code.

Every change is saved to GitHub. Nothing goes live until someone presses **Publish**,
and every published change can be undone.

- [How it works](#how-it-works)
- [One-time setup](#one-time-setup) (developer or account owner)
- [Logging in](#logging-in)
- [Editing and publishing](#editing-and-publishing)
- [Images](#images)
- [When a change doesn't appear](#when-a-change-doesnt-appear)
- [Rolling back a change](#rolling-back-a-change)
- [For developers](#for-developers)

## How it works

```
You edit in /admin  →  Save: a draft (a pull request on GitHub)
                    →  Cloudflare builds a preview of the draft
                    →  Publish: the draft is merged into main
                    →  Cloudflare builds and deploys the live site (about 2–3 minutes)
```

Before anything is deployed, the build checks all content: required fields, email and
phone formats and image files. If something is wrong, the
build stops and **the live site stays as it was**. See
[When a change doesn't appear](#when-a-change-doesnt-appear).

## One-time setup

You need admin access to the GitHub repository `Beacon-Soft-Ltd/beacon-softltd-website`
and to the Cloudflare Pages project.

### 1. Check the site address

The content manager only logs in on the live domain. These three must be the same address
(currently `https://beaconsoft.com.bd`):

- **Website address** in Site settings (`site.url` in `content/settings.json`), which
  every canonical link, sitemap entry and social preview is built from
- `base_url`, `site_url` and `display_url` in `public/admin/config.yml`
- the URLs in the GitHub OAuth app (next step)

The build stops with a clear message if the first two don't match, so change them
together, in one commit.

### 2. Create the GitHub OAuth app

1. On GitHub, open the **Beacon-Soft-Ltd** organization → **Settings** → **Developer
   settings** → **OAuth Apps** → **New OAuth App**. (Creating it under the organization
   keeps it working if a person leaves.)
2. Fill in:
   - **Application name:** Beacon Soft website content manager
   - **Homepage URL:** `https://beaconsoft.com.bd`
   - **Authorization callback URL:** `https://beaconsoft.com.bd/api/callback`
   - Leave **Enable Device Flow** unticked.
3. Press **Register application**.
4. Copy the **Client ID**.
5. Press **Generate a new client secret** and copy the secret right away; GitHub shows it
   only once. Don't paste it into any file, chat or email: it goes straight into Cloudflare.

If the organization restricts third-party apps (**Organization settings → Third-party
access → OAuth application policy**), approve this app there, or approve it the first time
someone logs in.

### 3. Add the environment variables in Cloudflare

Cloudflare dashboard → **Workers & Pages** → the website project → **Settings** →
**Variables and Secrets** → **Add**, for the **Production** environment:

| Name                   | Type   | Value                         |
| ---------------------- | ------ | ----------------------------- |
| `GITHUB_CLIENT_ID`     | Text   | The Client ID from step 2     |
| `GITHUB_CLIENT_SECRET` | Secret | The client secret from step 2 |

Then redeploy: **Deployments** → the latest production deployment → **⋯** → **Retry
deployment**. The variables are read by `functions/api/auth.ts` and
`functions/api/callback.ts`; they are never in the repository or sent to the browser.

The contact form uses separate variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
`TURNSTILE_SECRET`); see `TODO.md`.

### 4. Check the Cloudflare build settings

**Settings → Build**:

- **Production branch:** `main`
- **Preview branches:** all non-production branches (the default). Each CMS draft
  then gets its own preview address.

### 5. Give editors access

Each editor needs their own GitHub account with **Write** access to the repository
(**Repository → Settings → Collaborators and teams**). Remove access when someone leaves.
To change a person's access, change it on GitHub; the content manager has no separate
user list.

## Logging in

1. Open **https://beaconsoft.com.bd/admin/**.
2. Press **Login with GitHub**. A small GitHub window opens.
3. The first time, GitHub asks you to authorize the app. Press **Authorize**.
4. The window closes and the content manager opens.

If the window says "GitHub login didn't work", close it and try again. If it keeps
happening, check the setup steps above; the details are in the Cloudflare function log
(**Deployments → the deployment → Functions → Real-time logs**).

## Editing and publishing

### Change something

1. Choose a collection on the left, e.g. **Products**, then the entry, e.g. **Gari Becho**.
   **Site settings** holds the contact details, WhatsApp number and social links.
2. Make your changes. The grey text under each field explains what goes there.
3. Press **Save**. The change is now a **draft**: saved on GitHub, not on the live site.
   You can close the browser and continue later.

### Review it

Open **Workflow** at the top. Drafts move through three columns:

| Column        | Meaning                                |
| ------------- | -------------------------------------- |
| **Drafts**    | Being written                          |
| **In review** | Ready for someone else to check        |
| **Ready**     | Checked and approved; can be published |

Drag a card to the next column, or use **Status** in the editor. To see the draft as it
will look on the site, wait a few minutes after saving for Cloudflare to build it, then
press **Check for Preview** and **View Preview** in the editor. If no preview link
appears, open the pull request on GitHub: Cloudflare's comment there has the preview
link.

### Publish it

In the editor, set **Status** to **Ready**, then press **Publish → Publish now**.
The live site updates about 2–3 minutes later.

### Add or remove entries

- **New entry:** open the collection and press **New** (e.g. **New Blog post**). The
  page address is made from the name or title when you first save it, and
  doesn't change afterwards.
- **Delete:** open the entry and press **Delete**. Like other changes, the deletion goes
  live when published.
- **Order:** products, services, testimonials and job openings have an **Order**
  number. Lower numbers appear first.
- **Team priority:** team members have a **Priority** number instead. Higher numbers
  appear first (for example CEO 105, CTO 104, then 103, …). The Team list in the content
  manager shows each priority and is sorted the same way as the About page.
- **Blog drafts:** a blog post with **Draft** switched on never appears on the live
  site, even after publishing. Switch it off when the post is ready.

### Rules that keep the site trustworthy

- Only add facts you can back up: no invented figures, clients or quotes.
- Testimonials, client quotes and team members only with the person's written permission.
- Never type passwords, API keys or other secrets into any field: everything here is
  saved to GitHub.

## Images

- Upload images with the image field (**Choose an image**). They are saved to
  `public/uploads/` and appear on the site as `/uploads/<file name>`.
- Use **WebP**, under **200 KB**, at the size the hint suggests (e.g. 1440 px wide
  for screenshots). Convert with https://squoosh.app if needed.
- Give each image a short file name in English, e.g. `gari-becho-invoice.webp`.
- Write an **image description** saying what the image shows, for people who can't see
  it. Leave it empty only for purely decorative images (allowed for blog covers).
- Images inside blog post text aren't supported yet; use the cover image.

## When a change doesn't appear

If the live site hasn't changed 5 minutes after publishing, the build probably found a
problem and stopped. The live site keeps showing the last good version.

1. Cloudflare dashboard → the project → **Deployments**. The failed deployment is marked
   **Failed**.
2. Open it and read the end of the build log. The message names the file and the field,
   for example:

   ```
   content/settings.json has problems:
     - "contact.phone" must be an international number like +8801XXXXXXXXX (no spaces or dashes)
   ```

3. Fix it in the content manager and publish again.

A failed **preview** (before publishing) shows the same messages. Fix those first.

## Rolling back a change

Every published change is a commit on GitHub, so nothing is lost.

**Quickest: put the previous version back live.** Cloudflare dashboard → the project →
**Deployments** → the last good production deployment → **⋯** → **Rollback to this
deployment**. The site switches back within seconds. Then undo the content change as
below; otherwise the next publish deploys it again.

**Undo the content change.** On GitHub, open **Pull requests → Closed** and find the
pull request for the change (titled like `chore(content): update Products "gari-becho"`).
Press **Revert**, then **Create pull request**, then **Merge**. The site redeploys
without the change.

**Throw away a draft that isn't published.** Open it in the content manager and press
**Delete unpublished changes** (or **Delete unpublished entry** for a new one).

## For developers

- **Config:** `public/admin/config.yml`. Decap is loaded in `public/admin/index.html`
  from unpkg, pinned to an exact version with a Subresource Integrity hash.
- **Validation:** content is checked with zod at build time by the loaders in `lib/`
  (`settings.ts`, `products.ts`, `services.ts`, `team.ts`, `testimonials.ts`,
  `careers.ts`, `blog.ts`, `case-studies.ts`; shared rules in `content-schema.ts`).
  When you add or change a field, change the loader schema and `config.yml` together.
  Select options in `config.yml` (icons, statuses, employment types, blog tags) must
  match `lib/types.ts` and `content/blog-tags.ts`.
- **Storage:** one JSON file per entry (`<slug>.json`); blog posts and case studies are
  `<slug>.mdx` with frontmatter. Bodies are rendered as Markdown, not MDX,
  so CMS text can't run code at build time.
- **Prettier** ignores CMS-written content (`.prettierignore`); zod checks it instead.
- **Login flow:** `functions/api/auth.ts` → GitHub → `functions/api/callback.ts`, shared
  code in `lib/cms-oauth.ts`. A random `state` in a `__Host-` HttpOnly cookie protects
  against login CSRF. The callback page sends the token with `postMessage` to `site.url`'s
  origin only, after the CMS window on that origin answers. It has a nonce-based CSP and
  `no-store`. No token or secret is logged.
- **Editing locally without GitHub:** run `npm run cms:local` (starts `decap-server`) and
  `npm run dev`, then open http://localhost:3000/admin/index.html. Changes are written
  straight to your working copy. On localhost, `local_backend: true` in `config.yml`
  makes Decap use this local server instead of GitHub.
- **Testing the login functions:** `npm run build`, then
  `npx --yes wrangler@4 pages dev out --local-protocol https --binding GITHUB_CLIENT_ID=… --binding GITHUB_CLIENT_SECRET=…`.
  The functions redirect any other origin to `site.url`, so send `Host: beaconsoft.com.bd`
  when testing with curl. A full login only works on the live domain.
- **Upgrading Decap CMS:** pick a version at least two weeks old, then update the version
  and the hash in `public/admin/index.html`:

  ```sh
  curl -sL https://unpkg.com/decap-cms@X.Y.Z/dist/decap-cms.js \
    | openssl dgst -sha384 -binary | openssl base64 -A
  ```

  Then test with `npm run cms:local` before deploying.

- **Security headers:** `public/_headers` gives `/admin/*` its own Content-Security-Policy
  (Decap from `https://unpkg.com`, the GitHub API, `'unsafe-eval'`, which Decap needs).
  If a new Decap version loads from another address, add it there. Don't set
  `Cross-Origin-Opener-Policy: same-origin` on `/admin/*` or `/api/callback`, or the
  login popup can't reach the editor.
