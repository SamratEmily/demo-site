import { z } from "zod";
import { routing, type Locale } from "@/i18n/routing";
import { list, optionalObject, parseContent, text } from "./content-schema";
import { readLocalizedMdx, type MdxFile } from "./mdx-files";
import { getProduct } from "./products";
import type { CaseStudy, CaseStudyMeta } from "./types";

/**
 * Case studies live in content/case-studies/<slug>.<locale>.mdx, edited in
 * the CMS. Frontmatter is checked at build time so a mistake fails
 * `npm run build`. The linked product comes from the English file.
 */
const product = z
  .string()
  .trim()
  .nullish()
  .transform((value) => value || undefined)
  .refine((value) => value === undefined || getProduct(value) !== undefined, {
    message: "must be the slug of a product in content/products",
  });

const translated = {
  title: text(120),
  summary: text(300),
  client: text(120),
  industry: text(80),
  duration: text(80),
  results: list(z.object({ value: text(40), label: text(160) })),
  quote: optionalObject({ text: text(600), name: text(80), role: text(80) }),
};

const english = z.object({ ...translated, product });
const bangla = z.object(translated);

function parseMeta(files: Record<Locale, MdxFile>): Record<Locale, CaseStudyMeta> {
  const en = parseContent(english, files.en.data, files.en.file);
  const bn = parseContent(bangla, files.bn.data, files.bn.file);
  return { en, bn: { ...bn, product: en.product } };
}

const studies = new Map<string, Record<Locale, CaseStudy>>();
for (const [slug, files] of readLocalizedMdx("case-studies")) {
  const meta = parseMeta(files);
  const entry = {} as Record<Locale, CaseStudy>;
  for (const locale of routing.locales) {
    entry[locale] = { slug, meta: meta[locale], body: files[locale].body };
  }
  studies.set(slug, entry);
}

export const caseStudySlugs = [...studies.keys()];

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return [...studies.values()].map((entry) => entry[locale]);
}

export function getCaseStudy(slug: string, locale: Locale): CaseStudy | undefined {
  return studies.get(slug)?.[locale];
}
