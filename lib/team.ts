import { z } from "zod";
import { readJsonEntries, type JsonEntry } from "./content-files";
import { blankable, imagePath, inOrder, order, parseContent, text } from "./content-schema";
import type { TeamMember } from "./types";

/**
 * Team members live in content/team/<slug>.json, edited in the CMS. Only
 * list real people who agreed to appear on the site or mark a demo profile
 * as a sample. The Home and About team sections are hidden when the list is empty.
 */
const linkedin = {
  regex: /^https:\/\/(?:[a-z]{2,3}\.)?linkedin\.com\/\S+$/,
  message: "must be a LinkedIn address like https://www.linkedin.com/in/name",
};

const schema = z.object({
  order,
  name: text(80),
  role: text(80),
  sample: z.boolean().optional(),
  photo: imagePath.nullish().or(z.literal("")),
  linkedin: blankable(300, linkedin),
});

function toMember({ file, data }: JsonEntry) {
  const en = parseContent(schema, data, file);
  const member: TeamMember = {
    name: en.name,
    role: en.role,
    sample: en.sample,
    photo: en.photo || undefined,
    linkedin: en.sample ? undefined : en.linkedin || undefined,
  };
  // Priority: higher numbers first (CEO 105 before CTO 104), unlike other collections.
  return { order: -en.order, key: en.name, value: member };
}

export const team: TeamMember[] = inOrder(readJsonEntries("team").map(toMember));
