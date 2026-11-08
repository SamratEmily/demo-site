import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Build-time readers for content edited in the CMS. Server-only: these use
 * the file system, so import them from Server Components and lib/ only.
 */
export interface JsonEntry {
  slug: string;
  /** Path under content/, for error messages. */
  file: string;
  en: unknown;
  bn: unknown;
}

const slugFile = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.json$/;

/**
 * Reads content/<folder>/<slug>.json. The CMS stores both languages in one
 * file: { "en": { ...fields }, "bn": { ...translated fields } }.
 */
export function readJsonEntries(folder: string): JsonEntry[] {
  const directory = path.join(process.cwd(), "content", folder);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => {
      const file = `${folder}/${name}`;
      const match = slugFile.exec(name);
      if (!match) {
        throw new Error(
          `content/${file}: file names must be lowercase English letters, numbers and dashes.`,
        );
      }
      return { slug: match[1], file, ...readLocales(file) };
    });
}

/** Reads a single CMS-managed JSON file with { en, bn } at the top. */
export function readLocales(file: string): { en: unknown; bn: unknown } {
  const text = fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`content/${file} is not valid JSON.`);
  }
  if (typeof data !== "object" || data === null || !("en" in data)) {
    throw new Error(`content/${file} must have an "en" section (and a "bn" section).`);
  }
  return { en: data.en, bn: "bn" in data ? data.bn : {} };
}

export interface ImageSize {
  width: number;
  height: number;
}

const sizes = new Map<string, ImageSize>();

/**
 * Pixel size of an image in /public, read from the file so editors never
 * type it. The size is used to reserve space and avoid layout shift.
 */
export function imageSizeOf(src: string, file: string): ImageSize {
  const cached = sizes.get(src);
  if (cached) return cached;

  const location = path.join(process.cwd(), "public", decodeURI(src));
  if (!location.startsWith(path.join(process.cwd(), "public") + path.sep)) {
    throw new Error(`content/${file}: image "${src}" must be inside /public.`);
  }
  if (!fs.existsSync(location)) {
    throw new Error(`content/${file}: image "${src}" was not found in /public.`);
  }
  const { width, height } = imageSize(fs.readFileSync(location));
  if (!width || !height) throw new Error(`content/${file}: can't read the size of "${src}".`);

  const size = { width, height };
  sizes.set(src, size);
  return size;
}
