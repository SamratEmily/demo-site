import { getProduct } from "@/content/products";
import { routing, type Locale } from "@/i18n/routing";
import { fieldReader, readLocalizedMdx, type MdxFile } from "./mdx-files";
import type { CaseStudy, CaseStudyMeta } from "./types";

/**
 * Case studies live in content/case-studies/<slug>.<locale>.mdx. Frontmatter
 * is checked at build time so a typo fails `npm run build`.
 */
function parseMeta({ file, data }: MdxFile): CaseStudyMeta {
  const { fail, str } = fieldReader(file);

  const results = data.results ?? [];
  if (!Array.isArray(results)) fail("results", "a list of { value, label }");
  const product = data.product;
  if (product !== undefined && (typeof product !== "string" || !getProduct(product))) {
    fail("product", "the slug of a product in content/products");
  }
  const quote = data.quote as Record<string, unknown> | undefined;

  return {
    title: str(data, "title"),
    summary: str(data, "summary"),
    client: str(data, "client"),
    industry: str(data, "industry"),
    product: product as string | undefined,
    duration: str(data, "duration"),
    results: (results as unknown[]).map((item, i) => {
      const entry = (item ?? {}) as Record<string, unknown>;
      return {
        value: str(entry, "value", `results[${i}].`),
        label: str(entry, "label", `results[${i}].`),
      };
    }),
    quote: quote
      ? {
          text: str(quote, "text", "quote."),
          name: str(quote, "name", "quote."),
          role: str(quote, "role", "quote."),
        }
      : undefined,
  };
}

const studies = new Map<string, Record<Locale, CaseStudy>>();
for (const [slug, files] of readLocalizedMdx("case-studies")) {
  const entry = {} as Record<Locale, CaseStudy>;
  for (const locale of routing.locales) {
    entry[locale] = { slug, meta: parseMeta(files[locale]), body: files[locale].body };
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
