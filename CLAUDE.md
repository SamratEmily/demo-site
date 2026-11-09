# Beacon Soft Ltd. — Website Engineering Rules

These rules apply to every task in this repository. Read them before writing code.
If a request conflicts with these rules, say so and ask before proceeding.

## 1. Project context

- Official company website for Beacon Soft Ltd., a software company in Bangladesh.
- Audience: business owners and decision-makers (often non-technical) in Bangladesh
  and abroad who want to hire us or use our products.
- Primary job of the site: build trust and get people to contact us or request a demo.
- Products: Gari Becho (live, https://garibecho.com), Inventory Management System,
  IELTS Platform, Laundry POS System, Onushilon360 (university admission website).
- Hosting target: Cloudflare Pages with Next.js static export. Contact form runs as a
  Cloudflare Pages Function in `functions/`.

## 2. Tech stack (do not add alternatives without asking)

- Next.js (App Router), TypeScript (strict), Tailwind CSS, shadcn/ui, lucide-react.
- next-intl for English (default, at the root: `/`, `/about`) and Bangla (`/bn`, `/bn/about`).
  English pages are built by the thin wrappers in `app/(default)/`, which reuse the
  `app/[locale]/` pages; `app/[locale]/` itself only builds `/bn`. Old `/en/...` URLs
  redirect to the root (`public/_redirects`).
- next-themes for light/dark mode.
- react-hook-form + zod for forms.
- MDX for blog posts and case studies.
- Framer Motion only where motion has a clear purpose (see Design rules).
- Before installing any new dependency, explain why it is needed and its bundle cost.

## 3. Static export constraints (must never break)

- `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`.
- Not allowed: server actions, `app/api` route handlers, middleware, `cookies()`,
  `headers()`, ISR/revalidate, runtime image optimization, anything needing a Node server.
- Every dynamic route must have `generateStaticParams`.
- `npm run build` must succeed and produce `out/` after every task.

## 4. Folder structure

```
app/[locale]/...        pages (thin: compose components, fetch content)
components/ui/          shadcn/ui primitives (don't edit unless necessary)
components/sections/    page sections (Hero, Services, ProductGrid, ...)
components/shared/      Header, Footer, LanguageSwitcher, ThemeToggle, ...
content/                ALL site content. Edited in the CMS (/admin), stored as
                        { en: {...}, bn: {...} } JSON or <slug>.<locale>.mdx:
                        settings.json, products/, services/, team/,
                        testimonials/, careers/ (<slug>.json), blog/,
                        case-studies/. Code-only: site.ts, home.ts, pages.ts,
                        values.ts, process.ts, blog-tags.ts, navigation.ts
messages/               en.json, bn.json (UI strings only)
lib/                    utilities, types, seo helpers; content loaders with zod
                        schemas (products.ts, services.ts, settings.ts, ...)
                        that validate CMS content at build time
functions/api/          Cloudflare Pages Functions (contact form, CMS login)
public/                 images, icons, og images; admin/ (Decap CMS config),
                        uploads/ (CMS media)
docs/                   ADMIN.md (how to set up and use the CMS)
```

CMS-managed content changes need both the loader schema in `lib/` and
`public/admin/config.yml` updated together (see docs/ADMIN.md).

## 5. TypeScript and code style

- `strict: true`. No `any`, no `@ts-ignore`; use `unknown` and narrow it.
- Define types for all content in `lib/types.ts`; content files must satisfy them.
- Server Components by default. Add `"use client"` only for interactivity
  (menus, forms, theme toggle, carousels), and keep client components small.
- Components: PascalCase files, one component per file, props typed with an
  interface, named exports (default export only where Next.js requires it).
- Functions small and single-purpose. No dead code, no commented-out code,
  no `console.log` in committed code.
- Use `cn()` helper for conditional classes. No inline `style` unless unavoidable.
- Prefer composition over prop explosions; max ~6 props before rethinking.
- ESLint and Prettier must pass with zero warnings.

## 6. Content rules (critical)

- Never hardcode marketing text inside components. Text lives in `content/`
  (structured data) or `messages/` (UI labels like buttons and nav).
- Bilingual content uses `{ en: string; bn: string }`.
- NEVER invent client names, statistics, testimonials, team members, awards,
  certifications, prices, phone numbers, or addresses. Use `[TODO: ...]`
  placeholders and keep `TODO.md` updated with every placeholder and its file.
- Product names and technology names stay in English on Bangla pages.

## 7. Writing and copy

- Write for the end user in plain, specific language. Describe what a product
  does, not marketing hype. Avoid "revolutionary", "cutting-edge", "seamless",
  "unleash", "empower", "next-level".
- Active voice, sentence case for headings and buttons.
- Buttons say exactly what happens: "Request a demo", "Send message",
  "Visit Gari Becho" — not "Submit" or "Learn more" everywhere.
- Errors explain what went wrong and how to fix it. No vague messages.
- Bangla copy must be natural, professional Bangla, not word-for-word translation.

## 8. Design rules

- Brand colors: navy #0F172A, deep blue #1E3A8A, cyan accent #06B6D4.
  Define all colors as CSS variables with light and dark values; never use raw
  hex values inside components.
- One or two typefaces maximum, chosen deliberately, plus a Bangla font
  (Hind Siliguri or Noto Sans Bengali) applied on `/bn`.
- Set a clear type scale and spacing scale in the Tailwind config and use only those.
- Body text line length under ~75 characters.
- Avoid generic template look:
  - not every section as a grid of identical rounded cards with the same shadow;
  - no ALL-CAPS eyebrow label above every heading;
  - no numbered markers (01/02/03) unless the content is a real sequence
    (our 6-step process is one);
  - no fade-up animation on every section. Use one meaningful motion moment,
    plus motion that responds to user actions.
- Let the products be the hero: real screenshots and the Gari Becho demo
  video are more convincing than abstract illustrations.
- Visual hierarchy: one clear primary action per section.
- Respect `prefers-reduced-motion`.

## 9. Responsive and accessibility (minimum quality floor)

- Mobile-first. Test at 360px, 768px, 1024px, 1440px. No horizontal scrolling.
- Semantic HTML: one `h1` per page, ordered headings, `nav`, `main`, `footer`,
  `section` with headings.
- All interactive elements keyboard accessible with visible focus styles.
- Color contrast WCAG AA in both themes.
- All images have meaningful `alt` (empty `alt=""` for decorative ones).
- Form fields have labels, error messages linked with `aria-describedby`.
- Touch targets at least 44×44px.
- `lang` attribute set correctly (`en` / `bn`).

## 10. Performance

- Target Lighthouse 90+ in Performance, Accessibility, Best Practices, SEO.
- Images: WebP/AVIF, explicit width and height, `loading="lazy"` below the fold,
  hero image prioritized. Keep images under ~200 KB where possible.
- Fonts: `next/font`, `display: swap`, only needed weights and subsets.
- Keep client JavaScript small; don't ship large libraries for small effects.
- No layout shift (CLS near 0): reserve space for media and embeds.
- Embed videos and maps lazily (load on interaction or when visible).

## 11. SEO

- Every page: unique title and description in both languages, canonical URL,
  hreflang alternates, Open Graph and Twitter metadata.
- `sitemap.xml` and `robots.txt` generated at build time.
- JSON-LD: Organization (all pages), SoftwareApplication (product pages),
  Article (blog), BreadcrumbList where useful.
- Clean, readable slugs in English.
- Site URL comes from one value, `site.url` in `content/settings.json` (read via
  `site.url` from `content/site.ts`), never hardcoded. `next.config.ts` checks it
  matches `public/admin/config.yml`.

## 12. Security

- No secrets in the repo or in client code. Secrets only as Cloudflare
  environment variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `TURNSTILE_SECRET`,
  `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (CMS login).
- The CMS config (`public/admin/config.yml`) must never have fields for secrets.
- Contact function: validate input with zod on the server side too, verify
  Turnstile token, limit field lengths, escape content in emails, return
  generic error messages to the client.
- External links use `rel="noopener noreferrer"`.
- Add security headers via `public/_headers` (CSP, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy, frame-ancestors).

## 13. Git workflow

- Small, focused commits using Conventional Commits:
  `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`.
- One task = one logical change. Don't refactor unrelated code during a task.
- Never commit `node_modules`, `.next`, `out`, or `.env*` files.

## 14. How to work on each task

1. Restate the task in one or two sentences and list the files you will touch.
2. For design-heavy tasks, propose the plan (layout, colors, type) before coding.
3. Implement only what the task asks.
4. Run `npm run lint` and `npm run build`; fix every error and warning.
5. Check the result at mobile and desktop widths, in light and dark mode,
   in English (`/`) and Bangla (`/bn`).
6. Report: what changed, files touched, any new TODO placeholders, anything
   you were unsure about.

## 15. Definition of done

- [ ] Build and lint pass with zero errors and warnings
- [ ] Works in English (`/`) and Bangla (`/bn`), light and dark, mobile and desktop
- [ ] No hardcoded text in components; no invented facts
- [ ] Accessible: keyboard, focus, contrast, alt text, headings
- [ ] Metadata present for any new page
- [ ] `TODO.md` updated
