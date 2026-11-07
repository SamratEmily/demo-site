import { blogTags } from "@/content/blog-tags";
import { routing, type Locale } from "@/i18n/routing";
import { fieldReader, readLocalizedMdx, type MdxFile } from "./mdx-files";
import type { BlogPost, BlogPostMeta, TocItem } from "./types";
import { slugify } from "./utils";

/**
 * Blog posts live in content/blog/<slug>.<locale>.mdx. Frontmatter is checked
 * at build time. Posts with `draft: true` are shown by `npm run dev` only and
 * are left out of `npm run build`, so they never reach production.
 */
const includeDrafts = process.env.NODE_ENV !== "production";
const wordsPerMinute = 200;

function date(value: unknown, field: string, fail: (f: string, e: string) => never): string {
  // YAML turns an unquoted 2026-01-31 into a Date.
  const text = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  if (typeof text !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    fail(field, "a date like 2026-01-31");
  }
  return text as string;
}

function parseMeta({ file, data }: MdxFile): BlogPostMeta {
  const { fail, str } = fieldReader(file);

  const tags = data.tags ?? [];
  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string" || !blogTags[tag])) {
    fail("tags", `a list of tags from content/blog-tags.ts (${Object.keys(blogTags).join(", ")})`);
  }
  if (data.draft !== undefined && typeof data.draft !== "boolean") fail("draft", "true or false");

  let cover: BlogPostMeta["cover"];
  if (data.cover !== undefined) {
    const c = (data.cover ?? {}) as Record<string, unknown>;
    const width = c.width;
    const height = c.height;
    if (typeof width !== "number" || typeof height !== "number") {
      fail("cover", "{ src, width, height, alt } with numeric width and height");
    }
    const src = str(c, "src", "cover.");
    // Empty alt is allowed: it marks a decorative cover.
    if (typeof c.alt !== "string") fail("cover.alt", 'a description, or "" for a decorative image');
    if (!src.startsWith("/")) fail("cover.src", "a path under /public, starting with /");
    cover = {
      src,
      width: width as number,
      height: height as number,
      alt: (c.alt as string).trim(),
    };
  }

  return {
    title: str(data, "title"),
    summary: str(data, "summary"),
    date: date(data.date, "date", fail),
    author: str(data, "author"),
    tags: tags as string[],
    cover,
    draft: data.draft === true,
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
  const entry = {} as Record<Locale, BlogPost>;
  for (const locale of routing.locales) {
    const { body } = files[locale];
    entry[locale] = {
      slug,
      meta: parseMeta(files[locale]),
      body,
      readingMinutes: readingMinutes(body),
      toc: tableOfContents(body),
    };
  }
  // A post is a draft if either language version is marked as one.
  const draft = routing.locales.some((locale) => entry[locale].meta.draft);
  if (draft && !includeDrafts) continue;
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
