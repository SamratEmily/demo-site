import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Reads content/<folder>/<slug>.<locale>.mdx files: one file per language,
 * and every slug must exist in every language. Runs at build time only.
 */
export interface MdxFile {
  file: string;
  data: Record<string, unknown>;
  body: string;
}

const fileName = /^([a-z0-9-]+)\.([a-z]{2})\.mdx$/;

export function readLocalizedMdx(folder: string): Map<string, Record<Locale, MdxFile>> {
  const directory = path.join(process.cwd(), "content", folder);
  const found = new Map<string, Partial<Record<Locale, MdxFile>>>();
  if (!fs.existsSync(directory)) return new Map();

  for (const file of fs.readdirSync(directory).sort()) {
    const match = fileName.exec(file);
    if (!match) continue;
    const [, slug, locale] = match;
    if (!routing.locales.includes(locale as Locale)) {
      throw new Error(`content/${folder}/${file}: the language must be one of en, bn.`);
    }
    const { data, content } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
    found.set(slug, {
      ...found.get(slug),
      [locale]: { file: `${folder}/${file}`, data, body: content },
    });
  }

  const complete = new Map<string, Record<Locale, MdxFile>>();
  for (const [slug, versions] of found) {
    for (const locale of routing.locales) {
      if (!versions[locale]) throw new Error(`content/${folder}/${slug}.${locale}.mdx is missing.`);
    }
    complete.set(slug, versions as Record<Locale, MdxFile>);
  }
  return complete;
}

/** Field checks with error messages that name the file and field. */
export function fieldReader(file: string) {
  const fail = (field: string, expected: string): never => {
    throw new Error(`content/${file}: "${field}" must be ${expected}.`);
  };
  const str = (data: Record<string, unknown>, key: string, prefix = ""): string => {
    const value = data[key];
    if (typeof value !== "string" || !value.trim()) fail(prefix + key, "a non-empty string");
    return (value as string).trim();
  };
  return { fail, str };
}
