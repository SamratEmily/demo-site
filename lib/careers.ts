import { z } from "zod";
import { readJsonEntries, type JsonEntry } from "./content-files";
import {
  inOrder,
  isoDate,
  list,
  optionalText,
  order,
  pairLists,
  parseContent,
  text,
} from "./content-schema";
import { employmentTypes, type JobOpening, type Localized } from "./types";

/**
 * Open positions live in content/careers/<slug>.json, edited in the CMS.
 * While there are none, the Careers page shows "Send us your CV" with the
 * careers email from content/settings.json. Remove a position once it is filled.
 * Only English is required: a Bangla field left empty shows the English text on
 * /bn, so a job can be posted before it is translated.
 */
const english = z.object({
  order,
  title: text(100),
  type: z.enum(employmentTypes, `must be one of: ${employmentTypes.join(", ")}`),
  location: text(100),
  summary: text(600),
  responsibilities: z.array(text(300), "must be a list").min(1, "needs at least one item"),
  requirements: list(text(300)),
  niceToHave: list(text(300)),
  deadline: isoDate.nullish().or(z.literal("")),
});

const bangla = z.preprocess(
  (value) => value ?? {},
  z.object({
    title: optionalText(100),
    location: optionalText(100),
    summary: optionalText(600),
    responsibilities: list(text(300)),
    requirements: list(text(300)),
    niceToHave: list(text(300)),
  }),
);

function toOpening({ slug, file, ...raw }: JsonEntry) {
  const en = parseContent(english, raw.en, `${file} (English)`);
  const bn = parseContent(bangla, raw.bn, `${file} (Bangla)`);
  const pair = (a: string, b: string | undefined): Localized => ({ en: a, bn: b || a });
  // An untranslated list uses the English items; a partly translated one must match.
  const items = (field: "responsibilities" | "requirements" | "niceToHave") =>
    bn[field].length === 0
      ? en[field].map((item) => pair(item, undefined))
      : pairLists(en[field], bn[field], file, field, pair);

  const opening: JobOpening = {
    slug,
    title: pair(en.title, bn.title),
    type: en.type,
    location: pair(en.location, bn.location),
    summary: pair(en.summary, bn.summary),
    responsibilities: items("responsibilities"),
    requirements: items("requirements"),
    niceToHave: items("niceToHave"),
    deadline: en.deadline || undefined,
  };
  return { order: en.order, key: slug, value: opening };
}

/** Open positions, in the order set by their "order" field. */
export const openings: JobOpening[] = inOrder(readJsonEntries("careers").map(toOpening));
