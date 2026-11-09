import { z } from "zod";
import { readJsonEntries, type JsonEntry } from "./content-files";
import { inOrder, isoDate, list, order, parseContent, text } from "./content-schema";
import { employmentTypes, type JobOpening } from "./types";

/**
 * Open positions live in content/careers/<slug>.json, edited in the CMS.
 * While there are none, the Careers page shows "Send us your CV" with the
 * careers email from content/settings.json. Remove a position once it is filled.
 */
const schema = z.object({
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

function toOpening({ slug, file, data }: JsonEntry) {
  const { order, deadline, ...fields } = parseContent(schema, data, file);
  const opening: JobOpening = { slug, ...fields, deadline: deadline || undefined };
  return { order, key: slug, value: opening };
}

/** Open positions, in the order set by their "order" field. */
export const openings: JobOpening[] = inOrder(readJsonEntries("careers").map(toOpening));
