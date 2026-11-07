import raw from "@/content/settings.json";
import { socialPlatforms, type Localized, type Settings, type SocialLink } from "./types";

/**
 * Loads content/settings.json and checks its shape at build time, so a typo
 * in the JSON fails `npm run build` instead of breaking the live site.
 */
function fail(path: string, expected: string): never {
  throw new Error(`content/settings.json: "${path}" must be ${expected}.`);
}

function str(value: unknown, path: string): string {
  if (typeof value !== "string") fail(path, 'a string (use "" if unknown)');
  return value.trim();
}

function email(value: unknown, path: string): string {
  const v = str(value, path);
  if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) fail(path, "an email address, or empty");
  return v;
}

function localized(value: unknown, path: string): Localized {
  if (typeof value !== "object" || value === null) fail(path, "an object with en and bn");
  const v = value as Record<string, unknown>;
  return { en: str(v.en, `${path}.en`), bn: str(v.bn, `${path}.bn`) };
}

function social(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) fail("social", "a list");
  return value.map((item: unknown, i) => {
    const v = (item ?? {}) as Record<string, unknown>;
    const platform = str(v.platform, `social[${i}].platform`);
    if (!socialPlatforms.includes(platform as SocialLink["platform"])) {
      fail(`social[${i}].platform`, `one of: ${socialPlatforms.join(", ")}`);
    }
    const url = str(v.url, `social[${i}].url`);
    if (url && !url.startsWith("https://")) fail(`social[${i}].url`, "an https:// URL or empty");
    return { platform: platform as SocialLink["platform"], url };
  });
}

function parse(data: unknown): Settings {
  const d = (data ?? {}) as Record<string, unknown>;
  const company = (d.company ?? {}) as Record<string, unknown>;
  const contact = (d.contact ?? {}) as Record<string, unknown>;
  const whatsapp = (d.whatsapp ?? {}) as Record<string, unknown>;

  const number = str(whatsapp.number, "whatsapp.number");
  if (number && !/^\+?\d{8,15}$/.test(number.replace(/[\s-]/g, ""))) {
    fail("whatsapp.number", "an international number like +8801XXXXXXXXX, or empty");
  }

  const founded = str(company.founded, "company.founded");
  if (founded && !/^\d{4}$/.test(founded)) fail("company.founded", 'a year like "2021", or empty');

  return {
    company: {
      legalName: str(company.legalName, "company.legalName"),
      founded,
      registration: str(company.registration, "company.registration"),
    },
    contact: {
      email: email(contact.email, "contact.email"),
      careersEmail: email(contact.careersEmail, "contact.careersEmail"),
      phone: str(contact.phone, "contact.phone"),
      address: localized(contact.address, "contact.address"),
      officeHours: localized(contact.officeHours, "contact.officeHours"),
    },
    whatsapp: { number, greeting: localized(whatsapp.greeting, "whatsapp.greeting") },
    social: social(d.social),
  };
}

export const settings: Settings = parse(raw);

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
