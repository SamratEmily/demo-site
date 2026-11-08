import { z } from "zod";
import { imageSizeOf, readJsonEntries, type JsonEntry } from "./content-files";
import {
  httpsUrl,
  icon,
  imagePath,
  inOrder,
  list,
  optionalHttpsUrl,
  optionalObject,
  optionalText,
  order,
  pairLists,
  pairOptional,
  parseContent,
  text,
} from "./content-schema";
import { productStatuses, type Product, type Screenshot } from "./types";

/**
 * Products live in content/products/<slug>.json, edited in the CMS.
 * "en" holds every field; "bn" holds the Bangla translations only.
 * Product names, links, icons and technologies stay in English.
 */
const step = z.object({ title: text(80), description: text(400) });
const result = z.object({ value: text(40), label: text(160) });
const faqItem = z.object({ question: text(200), answer: text(1200) });

const english = z.object({
  order,
  name: text(80),
  status: z.enum(productStatuses, `must be one of: ${productStatuses.join(", ")}`),
  icon,
  url: optionalHttpsUrl,
  category: text(80),
  summary: text(400),
  problem: optionalText(1500),
  howItWorks: list(step),
  features: z
    .array(z.object({ icon, title: text(80), description: text(400) }), "must be a list")
    .min(1, "needs at least one feature"),
  screenshot: optionalObject({ src: imagePath, alt: text(400) }),
  gallery: list(
    z.object({
      src: imagePath,
      uiLang: z.enum(["en", "bn"], "must be en or bn"),
      caption: text(120),
      alt: text(400),
    }),
  ),
  video: optionalObject({
    src: httpsUrl,
    durationSeconds: z.number("must be a number").int().positive(),
    description: optionalText(300),
  }),
  audience: list(text(200)),
  technologies: list(text(40)),
  results: list(result),
  faq: list(faqItem),
});

const bangla = z.object({
  category: text(80),
  summary: text(400),
  problem: optionalText(1500),
  howItWorks: list(step),
  features: list(z.object({ title: text(80), description: text(400) })),
  screenshot: optionalObject({ src: imagePath.optional(), alt: text(400) }),
  gallery: list(z.object({ caption: text(120), alt: text(400) })),
  video: optionalObject({ description: optionalText(300) }),
  audience: list(text(200)),
  results: list(result),
  faq: list(faqItem),
});

type English = z.output<typeof english>;
type Bangla = z.output<typeof bangla>;

function screenshot(en: English, bn: Bangla, file: string): Screenshot | undefined {
  if (!en.screenshot) return undefined;
  if (!bn.screenshot) {
    throw new Error(`content/${file}: "screenshot" needs a Bangla description (alt text).`);
  }
  const bnSrc = bn.screenshot.src ?? en.screenshot.src;
  const size = imageSizeOf(en.screenshot.src, file);
  const bnSize = imageSizeOf(bnSrc, file);
  if (size.width !== bnSize.width || size.height !== bnSize.height) {
    throw new Error(
      `content/${file}: the English and Bangla screenshots must be the same size ` +
        `(${size.width}×${size.height} and ${bnSize.width}×${bnSize.height}).`,
    );
  }
  return {
    src: { en: en.screenshot.src, bn: bnSrc },
    ...size,
    alt: { en: en.screenshot.alt, bn: bn.screenshot.alt },
  };
}

function toProduct({ slug, file, ...raw }: JsonEntry) {
  const en = parseContent(english, raw.en, `${file} (English)`);
  const bn = parseContent(bangla, raw.bn, `${file} (Bangla)`);
  const pair = (a: string, b: string) => ({ en: a, bn: b });
  const steps = (a: z.output<typeof step>, b: z.output<typeof step>) => ({
    title: pair(a.title, b.title),
    description: pair(a.description, b.description),
  });

  const product: Product = {
    slug,
    name: en.name,
    status: en.status,
    icon: en.icon,
    url: en.url,
    category: pair(en.category, bn.category),
    summary: pair(en.summary, bn.summary),
    problem: pairOptional(en.problem, bn.problem, file, "problem"),
    howItWorks: pairLists(en.howItWorks, bn.howItWorks, file, "howItWorks", steps),
    features: pairLists(en.features, bn.features, file, "features", (a, b) => ({
      icon: a.icon,
      ...steps(a, b),
    })),
    screenshot: screenshot(en, bn, file),
    gallery: pairLists(en.gallery, bn.gallery, file, "gallery", (a, b) => ({
      src: a.src,
      ...imageSizeOf(a.src, file),
      uiLang: a.uiLang,
      caption: pair(a.caption, b.caption),
      alt: pair(a.alt, b.alt),
    })),
    video: en.video && {
      src: en.video.src,
      durationSeconds: en.video.durationSeconds,
      description: pairOptional(
        en.video.description,
        bn.video?.description,
        file,
        "video.description",
      ),
    },
    audience: pairLists(en.audience, bn.audience, file, "audience", pair),
    technologies: en.technologies,
    results: pairLists(en.results, bn.results, file, "results", (a, b) => ({
      value: pair(a.value, b.value),
      label: pair(a.label, b.label),
    })),
    faq: pairLists(en.faq, bn.faq, file, "faq", (a, b) => ({
      question: pair(a.question, b.question),
      answer: pair(a.answer, b.answer),
    })),
  };
  return { order: en.order, key: en.name, value: product };
}

/** All products, in the order set by their "order" field (then by name). */
export const products: Product[] = inOrder(readJsonEntries("products").map(toProduct));

if (products.length === 0) throw new Error("content/products: add at least one product.");

/** The first live product is featured on the Home page. */
export const spotlightProduct = products.find((p) => p.status === "live") ?? products[0];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
