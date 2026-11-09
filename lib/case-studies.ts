import { z } from "zod";
import { list, optionalObject, parseContent, text } from "./content-schema";
import { readMdx } from "./mdx-files";
import { getProduct } from "./products";
import type { CaseStudy } from "./types";

/**
 * Case studies live in content/case-studies/<slug>.mdx, edited in the CMS.
 * Frontmatter is checked at build time so a mistake fails `npm run build`.
 */
const product = z
  .string()
  .trim()
  .nullish()
  .transform((value) => value || undefined)
  .refine((value) => value === undefined || getProduct(value) !== undefined, {
    message: "must be the slug of a product in content/products",
  });

const schema = z.object({
  title: text(120),
  summary: text(300),
  client: text(120),
  industry: text(80),
  product,
  duration: text(80),
  results: list(z.object({ value: text(40), label: text(160) })),
  quote: optionalObject({ text: text(600), name: text(80), role: text(80) }),
});

const studies = new Map<string, CaseStudy>();
for (const [slug, { file, data, body }] of readMdx("case-studies")) {
  studies.set(slug, { slug, meta: parseContent(schema, data, file), body });
}

export const caseStudySlugs = [...studies.keys()];

export function getCaseStudies(): CaseStudy[] {
  return [...studies.values()];
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return studies.get(slug);
}
