import { z } from "zod";
import raw from "@/content/settings.json";
import { blankable, parseContent, patterns } from "./content-schema";
import { socialPlatforms, type Settings } from "./types";

/**
 * Loads content/settings.json (edited in the CMS as "Site settings") and
 * checks it at build time, so a mistake fails `npm run build` instead of
 * breaking the live site. Empty values mean "not set yet" and are hidden.
 */
const mapEmbed = {
  regex: /^https:\/\/www\.google\.com\/maps\/embed\?\S+$/,
  message: "must be a Google Maps embed link (https://www.google.com/maps/embed?…)",
};

const schema = z.object({
  site: z.object({
    url: z
      .string("must be text")
      .trim()
      .regex(
        /^https:\/\/[a-z0-9.-]+(?::\d+)?\/?$/i,
        "must be the site's address, like https://example.com (no path)",
      ),
  }),
  company: z.object({
    legalName: z.string().trim().min(1, "can't be empty").max(120),
    founded: blankable(4, { regex: /^\d{4}$/, message: 'must be a year like "2021"' }),
    registration: blankable(80),
  }),
  contact: z.object({
    email: blankable(254, patterns.email),
    careersEmail: blankable(254, patterns.email),
    phone: blankable(16, patterns.phone),
    address: blankable(300),
    officeHours: blankable(200),
    mapEmbedUrl: blankable(2000, mapEmbed),
  }),
  whatsapp: z.object({
    number: blankable(16, patterns.phone),
    greeting: blankable(200),
  }),
  social: z
    .array(
      z.object({
        platform: z.enum(socialPlatforms, `must be one of: ${socialPlatforms.join(", ")}`),
        url: blankable(300, patterns.https),
      }),
      "must be a list",
    )
    .nullish()
    .transform((value) => value ?? []),
});

export const settings: Settings = parseContent(schema, raw, "settings.json");

/** wa.me link with a pre-filled greeting, or null when no number is set. */
export function whatsappLink(greeting: string): string | null {
  const digits = settings.whatsapp.number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(greeting)}`;
}

/** Social links that have a URL filled in. */
export const activeSocialLinks = settings.social.filter((s) => s.url);

/** Address for job applications: the careers email, else the main email, else none. */
export const careersEmail = settings.contact.careersEmail || settings.contact.email;
