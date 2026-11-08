import { z } from "zod";
import { contentIcons } from "./types";

/**
 * Zod building blocks for content edited in the CMS (/admin). Every content
 * file is checked with these at build time, so a mistake fails `npm run build`
 * (and the Cloudflare preview of a CMS draft) instead of breaking the live site.
 * Messages appear in the build log, so they say what to fix.
 */

/** Required text, trimmed. */
export const text = (max: number) =>
  z
    .string("must be text")
    .trim()
    .min(1, "can't be empty")
    .max(max, `must be ${max} characters or fewer`);

/** Optional text; the CMS saves an empty field as "" or leaves it out. */
export const optionalText = (max: number) =>
  z
    .string("must be text")
    .trim()
    .max(max, `must be ${max} characters or fewer`)
    .nullish()
    .transform((value) => value || undefined);

/** Text where empty means "not set yet" (hidden on the site). */
export const blankable = (max: number, pattern?: { regex: RegExp; message: string }) =>
  z
    .string("must be text")
    .trim()
    .max(max, `must be ${max} characters or fewer`)
    .nullish()
    .transform((value) => value ?? "")
    .refine((value) => !value || !pattern || pattern.regex.test(value), pattern?.message);

/** A list that may be missing or null in the file. */
export const list = <T extends z.ZodType>(item: T) =>
  z
    .array(item, "must be a list")
    .nullish()
    .transform((value) => value ?? []);

/** An optional group of fields: missing, null or all-empty means "not set". */
export const optionalObject = <T extends z.ZodRawShape>(shape: T) =>
  z.preprocess((value) => (isBlankObject(value) ? undefined : value), z.object(shape).optional());

function isBlankObject(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((v) => v === null || v === undefined || v === "");
}

export const patterns = {
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "must be an email address like name@example.com",
  },
  /** E.164, the format WhatsApp and tel: links need. */
  phone: {
    regex: /^\+[1-9]\d{7,14}$/,
    message: "must be an international number like +8801XXXXXXXXX (no spaces or dashes)",
  },
  https: { regex: /^https:\/\/\S+$/, message: "must be a full https:// address" },
  slug: {
    regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    message: "must be lowercase English letters, numbers and dashes",
  },
} as const;

export const httpsUrl = z
  .string("must be text")
  .trim()
  .regex(patterns.https.regex, patterns.https.message);

export const optionalHttpsUrl = blankable(500, patterns.https).transform(
  (value) => value || undefined,
);

/** A file under /public, e.g. an upload from the CMS (/uploads/photo.webp). */
export const imagePath = z
  .string("must be an image path")
  .trim()
  .regex(
    /^\/(?!\/)[^\s?#]+\.(?:webp|avif|png|jpe?g|svg)$/i,
    "must be an image under /public, like /uploads/photo.webp",
  );

/** YYYY-MM-DD. YAML frontmatter turns an unquoted date into a Date object. */
export const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z
    .string("must be a date")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "must be a date like 2026-01-31")
    .refine((value) => !Number.isNaN(Date.parse(value)), "must be a real date"),
);

/** Position in lists; lower numbers come first. */
export const order = z
  .number("must be a number")
  .int("must be a whole number")
  .nullish()
  .transform((value) => value ?? 1000);

export const icon = z.enum(contentIcons, `must be one of: ${contentIcons.join(", ")}`);

/** Parses one language of a content file, or fails the build with every problem listed. */
export function parseContent<T extends z.ZodType>(
  schema: T,
  data: unknown,
  file: string,
): z.output<T> {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  const problems = result.error.issues.map((issue) => {
    const field = issue.path.map((p) => (typeof p === "number" ? `[${p + 1}]` : `.${String(p)}`));
    return `  - "${field.join("").replace(/^\./, "") || "(file)"}" ${issue.message}`;
  });
  throw new Error(`content/${file} has problems:\n${problems.join("\n")}`);
}

/** Pairs English and Bangla list items; both languages must have the same number. */
export function pairLists<E, B, R>(
  en: E[],
  bn: B[],
  file: string,
  field: string,
  combine: (en: E, bn: B) => R,
): R[] {
  if (en.length !== bn.length) {
    throw new Error(
      `content/${file}: "${field}" has ${en.length} item(s) in English but ${bn.length} in Bangla. ` +
        "Add or remove items so both languages have the same list, in the same order.",
    );
  }
  return en.map((item, i) => combine(item, bn[i]));
}

/** An optional translated field: if English is set, Bangla must be too. */
export function pairOptional(
  en: string | undefined,
  bn: string | undefined,
  file: string,
  field: string,
): { en: string; bn: string } | undefined {
  if (!en && !bn) return undefined;
  if (!en || !bn) {
    throw new Error(
      `content/${file}: "${field}" is filled in ${en ? "English" : "Bangla"} only. ` +
        "Fill it in both languages, or clear both.",
    );
  }
  return { en, bn };
}

/** Sorts by the "order" field, then by `key` so equal orders stay stable. */
export function inOrder<T>(items: { order: number; key: string; value: T }[]): T[] {
  return items
    .sort((a, b) => a.order - b.order || a.key.localeCompare(b.key))
    .map(({ value }) => value);
}
