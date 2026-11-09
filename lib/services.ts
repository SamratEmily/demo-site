import { z } from "zod";
import { readJsonEntries, type JsonEntry } from "./content-files";
import { icon, inOrder, list, order, parseContent, text } from "./content-schema";
import type { Service } from "./types";

/** Services live in content/services/<slug>.json, edited in the CMS. */
const schema = z.object({
  order,
  icon,
  title: text(80),
  summary: text(200),
  description: text(1200),
  included: list(text(200)),
  technologies: list(text(40)),
});

function toService({ slug, file, data }: JsonEntry) {
  const { order, ...fields } = parseContent(schema, data, file);
  const service: Service = { slug, ...fields };
  return { order, key: fields.title, value: service };
}

/** All services, in the order set by their "order" field. */
export const services: Service[] = inOrder(readJsonEntries("services").map(toService));
