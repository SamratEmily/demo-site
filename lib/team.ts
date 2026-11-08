import { z } from "zod";
import { readJsonEntries, type JsonEntry } from "./content-files";
import {
  blankable,
  imagePath,
  inOrder,
  optionalText,
  order,
  parseContent,
  text,
} from "./content-schema";
import type { TeamMember } from "./types";

/**
 * Team members live in content/team/<slug>.json, edited in the CMS. Only
 * list real people who agreed to appear on the site. The "Our team" section
 * on the About page is hidden while there are none. Only English is required:
 * an empty Bangla name or role shows the English text on /bn.
 */
const linkedin = {
  regex: /^https:\/\/(?:[a-z]{2,3}\.)?linkedin\.com\/\S+$/,
  message: "must be a LinkedIn address like https://www.linkedin.com/in/name",
};

const english = z.object({
  order,
  name: text(80),
  role: text(80),
  photo: imagePath.nullish().or(z.literal("")),
  linkedin: blankable(300, linkedin),
});

const bangla = z.preprocess(
  (value) => value ?? {},
  z.object({ name: optionalText(80), role: optionalText(80) }),
);

function toMember({ file, ...raw }: JsonEntry) {
  const en = parseContent(english, raw.en, `${file} (English)`);
  const bn = parseContent(bangla, raw.bn, `${file} (Bangla)`);
  const member: TeamMember = {
    name: { en: en.name, bn: bn.name || en.name },
    role: { en: en.role, bn: bn.role || en.role },
    photo: en.photo || undefined,
    linkedin: en.linkedin || undefined,
  };
  // Priority: higher numbers first (CEO 105 before CTO 104), unlike other collections.
  return { order: -en.order, key: en.name, value: member };
}

export const team: TeamMember[] = inOrder(readJsonEntries("team").map(toMember));
