import { z } from "zod";
import { readJsonEntries, type JsonEntry } from "./content-files";
import { icon, inOrder, list, order, pairLists, parseContent, text } from "./content-schema";
import type { Service } from "./types";

/**
 * Services live in content/services/<slug>.json, edited in the CMS.
 * "en" holds every field; "bn" holds the Bangla translations only.
 */
const english = z.object({
  order,
  icon,
  title: text(80),
  summary: text(200),
  description: text(1200),
  included: list(text(200)),
  technologies: list(text(40)),
});

const bangla = z.object({
  title: text(80),
  summary: text(200),
  description: text(1200),
  included: list(text(200)),
});

function toService({ slug, file, ...raw }: JsonEntry) {
  const en = parseContent(english, raw.en, `${file} (English)`);
  const bn = parseContent(bangla, raw.bn, `${file} (Bangla)`);
  const service: Service = {
    slug,
    icon: en.icon,
    title: { en: en.title, bn: bn.title },
    summary: { en: en.summary, bn: bn.summary },
    description: { en: en.description, bn: bn.description },
    included: pairLists(en.included, bn.included, file, "included", (a, b) => ({ en: a, bn: b })),
    technologies: en.technologies,
  };
  return { order: en.order, key: en.title, value: service };
}

/** All services, in the order set by their "order" field. */
export const services: Service[] = inOrder(readJsonEntries("services").map(toService));
