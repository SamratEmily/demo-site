import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getProduct } from "@/content/products";
import { routing, type Locale } from "@/i18n/routing";
import type { CaseStudy, CaseStudyMeta } from "./types";

/**
 * Case studies live in content/case-studies/<slug>.<locale>.mdx, one file per
 * language. Frontmatter is checked at build time so a typo fails
 * `npm run build` instead of shipping a broken page.
 */
const directory = path.join(process.cwd(), "content", "case-studies");
const fileName = /^([a-z0-9-]+)\.([a-z]{2})\.mdx$/;

function fail(file: string, field: string, expected: string): never {
  throw new Error(`content/case-studies/${file}: "${field}" must be ${expected}.`);
}

function str(data: Record<string, unknown>, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) fail(file, key, "a non-empty string");
  return value.trim();
}

function results(value: unknown, file: string): CaseStudyMeta["results"] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) fail(file, "results", "a list of { value, label }");
  return value.map((item: unknown, i) => {
    const entry = (item ?? {}) as Record<string, unknown>;
    return {
      value: str(entry, "value", `${file} results[${i}]`),
      label: str(entry, "label", `${file} results[${i}]`),
    };
  });
}

function quote(value: unknown, file: string): CaseStudyMeta["quote"] {
  if (value === undefined) return undefined;
  const entry = (value ?? {}) as Record<string, unknown>;
  return {
    text: str(entry, "text", `${file} quote`),
    name: str(entry, "name", `${file} quote`),
    role: str(entry, "role", `${file} quote`),
  };
}

function parseMeta(data: Record<string, unknown>, file: string): CaseStudyMeta {
  const product = data.product;
  if (product !== undefined && (typeof product !== "string" || !getProduct(product))) {
    fail(file, "product", "the slug of a product in content/products");
  }
  return {
    title: str(data, "title", file),
    summary: str(data, "summary", file),
    client: str(data, "client", file),
    industry: str(data, "industry", file),
    product,
    duration: str(data, "duration", file),
    results: results(data.results, file),
    quote: quote(data.quote, file),
  };
}

function load(): Map<string, Partial<Record<Locale, CaseStudy>>> {
  const studies = new Map<string, Partial<Record<Locale, CaseStudy>>>();
  if (!fs.existsSync(directory)) return studies;

  for (const file of fs.readdirSync(directory).sort()) {
    const match = fileName.exec(file);
    if (!match) continue;
    const [, slug, locale] = match;
    if (!routing.locales.includes(locale as Locale)) fail(file, "locale", "en or bn");

    const { data, content } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
    const study: CaseStudy = { slug, meta: parseMeta(data, file), body: content };
    studies.set(slug, { ...studies.get(slug), [locale]: study });
  }

  for (const [slug, versions] of studies) {
    for (const locale of routing.locales) {
      if (!versions[locale]) {
        throw new Error(`content/case-studies/${slug}.${locale}.mdx is missing.`);
      }
    }
  }
  return studies;
}

const studies = load();

export const caseStudySlugs = [...studies.keys()];

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return caseStudySlugs.flatMap((slug) => studies.get(slug)?.[locale] ?? []);
}

export function getCaseStudy(slug: string, locale: Locale): CaseStudy | undefined {
  return studies.get(slug)?.[locale];
}
