/** Text that exists in both site languages. */
export interface Localized<T = string> {
  en: T;
  bn: T;
}

export interface SiteConfig {
  name: string;
  /** Canonical origin, no trailing slash. Used for SEO URLs. */
  url: string;
  tagline: Localized;
  description: Localized;
}

export const socialPlatforms = ["github", "linkedin", "facebook"] as const;
export type SocialPlatform = (typeof socialPlatforms)[number];

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

/** Shape of content/settings.json. Empty strings mean "not set yet": hidden on the site. */
export interface Settings {
  contact: {
    email: string;
    /** International format, e.g. +8801XXXXXXXXX */
    phone: string;
    address: Localized;
    officeHours: Localized;
  };
  whatsapp: {
    /** International format, digits only or with +; empty hides the button. */
    number: string;
    greeting: Localized;
  };
  social: SocialLink[];
}

export interface NavItem {
  /** Key in messages/*.json under "nav". */
  labelKey: "products" | "services" | "caseStudies" | "about" | "blog" | "careers" | "contact";
  href: `/${string}`;
}
