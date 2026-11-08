import { z } from "zod";
import { blogTags } from "@/content/blog-tags";
import { routing, type Locale } from "@/i18n/routing";
import { imageSizeOf } from "./content-files";
import { imagePath, isoDate, list, optionalObject, parseContent, text } from "./content-schema";
import { readLocalizedMdx, type MdxFile } from "./mdx-files";
import type { BlogPost, BlogPostMeta, TocItem } from "./types";
import { slugify } from "./utils";

/**
 * Blog posts live in content/blog/<slug>.<locale>.mdx, edited in the CMS.
 * Frontmatter is checked at build time. The date, tags, cover image and
 * draft flag come from the English file; the Bangla file holds the
 * translated title, summary, author, cover description and body.
 * Posts with `draft: true` are shown by `npm run dev` only and are left out
 * of `npm run build`, so they never reach production.
 */
const includeDrafts = process.env.NODE_ENV !== "production";
const wordsPerMinute = 200;

const tagSlugs = Object.keys(blogTags);
const tag = z.string().refine((value) => tagSlugs.includes(value), {
  message: `must be a tag from content/blog-tags.ts (${tagSlugs.join(", ")})`,
});
/** Empty alt marks a decorative cover. */
const coverAlt = z
  .string()
  .trim()
  .max(300)
  .nullish()
  .transform((value) => value ?? "");

const english = z.object({
  title: text(120),
  summary: text(300),
  date: isoDate,
  author: text(80),
  tags: list(tag),
  cover: optionalObject({ src: imagePath, alt: coverAlt }),
  draft: z
    .boolean("must be true or false")
    .nullish()
    .transform((value) => value === true),
});

const bangla = z.object({
  title: text(120),
  summary: text(300),
  author: text(80),
  cover: optionalObject({ alt: coverAlt }),
});

function parseMeta(files: Record<Locale, MdxFile>): Record<Locale, BlogPostMeta> {
  const en = parseContent(english, files.en.data, files.en.file);
  const bn = parseContent(bangla, files.bn.data, files.bn.file);
  const cover = en.cover && { src: en.cover.src, ...imageSizeOf(en.cover.src, files.en.file) };
  const shared = { date: en.date, tags: en.tags, draft: en.draft };

  return {
    en: {
      ...shared,
      title: en.title,
      summary: en.summary,
      author: en.author,
      cover: cover && { ...cover, alt: en.cover?.alt ?? "" },
    },
    bn: {
      ...shared,
      title: bn.title,
      summary: bn.summary,
      author: bn.author,
      cover: cover && { ...cover, alt: bn.cover?.alt ?? "" },
    },
  };
}

/** Body text without code blocks, used for the reading time. */
function readingMinutes(body: string): number {
  const text = body.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`[\]()-]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

/**
 * Level-2 and level-3 headings. Only plain-text headings are listed, because
 * MdxContent gives ids to plain-text headings only.
 */
function tableOfContents(body: string): TocItem[] {
  const withoutCode = body.replace(/```[\s\S]*?```/g, "");
  return [...withoutCode.matchAll(/^(#{2,3})\s+(.+?)\s*$/gm)]
    .filter(([, , title]) => !/[*_`[\]<]/.test(title))
    .map(([, hashes, title]) => ({
      id: slugify(title),
      title,
      level: hashes.length === 2 ? 2 : 3,
    }));
}

const posts = new Map<string, Record<Locale, BlogPost>>();
for (const [slug, files] of readLocalizedMdx("blog")) {
  // /blog/tags/… is reserved for tag pages.
  if (slug === "tags") throw new Error('content/blog: "tags" cannot be used as a post slug.');
  const meta = parseMeta(files);
  if (meta.en.draft && !includeDrafts) continue;
  const entry = {} as Record<Locale, BlogPost>;
  for (const locale of routing.locales) {
    const { body } = files[locale];
    entry[locale] = {
      slug,
      meta: meta[locale],
      body,
      readingMinutes: readingMinutes(body),
      toc: tableOfContents(body),
    };
  }
  posts.set(slug, entry);
}

/** Published posts (plus drafts in development), newest first. */
export function getPosts(locale: Locale): BlogPost[] {
  return [...posts.values()]
    .map((entry) => entry[locale])
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getPost(slug: string, locale: Locale): BlogPost | undefined {
  return posts.get(slug)?.[locale];
}

export const postSlugs = [...posts.keys()];

/** Tags used by at least one visible post, in the order of content/blog-tags.ts. */
export function usedTags(): string[] {
  const used = new Set(getPosts(routing.defaultLocale).flatMap((post) => post.meta.tags));
  return Object.keys(blogTags).filter((tag) => used.has(tag));
}

/** Up to `limit` other posts, ranked by shared tags, then by date. */
export function relatedPosts(post: BlogPost, locale: Locale, limit = 3): BlogPost[] {
  return getPosts(locale)
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({
      other,
      shared: other.meta.tags.filter((tag) => post.meta.tags.includes(tag)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || b.other.meta.date.localeCompare(a.other.meta.date))
    .slice(0, limit)
    .map(({ other }) => other);
}

export type BlogRoute =
  { kind: "index" } | { kind: "tag"; tag: string } | { kind: "post"; post: BlogPost };

/**
 * Every page under /blog, for the optional catch-all route. The index always
 * exists, so the route never has zero pages (static export forbids that),
 * even when all posts are drafts.
 */
export function blogPaths(): string[][] {
  return [[], ...postSlugs.map((slug) => [slug]), ...usedTags().map((tag) => ["tags", tag])];
}

export function resolveBlogPath(path: string[] | undefined, locale: Locale): BlogRoute | null {
  const [first, second, ...rest] = path ?? [];
  if (rest.length > 0) return null;
  if (first === undefined) return { kind: "index" };
  if (first === "tags")
    return second && usedTags().includes(second) ? { kind: "tag", tag: second } : null;
  const post = second === undefined ? getPost(first, locale) : undefined;
  return post ? { kind: "post", post } : null;
}
