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

/** Icon names available to content files. Mapped to lucide icons in components/shared/ContentIcon.tsx. */
export type ContentIconName =
  | "app-window"
  | "plug"
  | "shopping-cart"
  | "panels-top-left"
  | "wrench"
  | "server"
  | "package"
  | "receipt"
  | "calendar-clock"
  | "hand-coins"
  | "wallet"
  | "file-check"
  | "file-text"
  | "users"
  | "languages"
  | "smartphone"
  | "shield-check"
  | "car"
  | "boxes"
  | "graduation-cap"
  | "washing-machine"
  | "school"
  | "bell"
  | "printer"
  | "chart"
  | "clipboard";

export interface Service {
  slug: string;
  icon: ContentIconName;
  title: Localized;
  summary: Localized;
}

export interface Feature {
  icon: ContentIconName;
  title: Localized;
  description: Localized;
}

export interface Screenshot {
  /** Path under /public, one per language (the UI language shown in the image). */
  src: Localized;
  width: number;
  height: number;
  alt: Localized;
}

export interface GalleryImage {
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
  alt: Localized;
  caption: Localized;
  /** Language of the UI shown in the screenshot. */
  uiLang: "en" | "bn";
}

export interface ProcessStep {
  title: Localized;
  description: Localized;
}

export interface FaqItem {
  question: Localized;
  answer: Localized;
}

/** A measured outcome. Only add results you can back up. */
export interface ProductResult {
  value: Localized;
  label: Localized;
}

export type ProductStatus = "live" | "in-development";

/**
 * One product page. Optional sections are hidden on the page when empty,
 * so leave them out rather than inventing content.
 */
export interface Product {
  slug: string;
  /** Product names stay in English on Bangla pages (CLAUDE.md §6). */
  name: string;
  status: ProductStatus;
  icon: ContentIconName;
  category: Localized;
  summary: Localized;
  /** Public product website, if any. Shown only when status is `live`. */
  url?: string;
  problem?: Localized;
  howItWorks?: ProcessStep[];
  features: Feature[];
  /** Main screenshot, one per UI language. */
  screenshot?: Screenshot;
  gallery?: GalleryImage[];
  /** Video URL; loaded only when the visitor presses play. */
  video?: { src: string; durationSeconds: number; description?: Localized };
  audience?: Localized[];
  technologies?: string[];
  results?: ProductResult[];
  faq?: FaqItem[];
}

export interface TechGroup {
  area: Localized;
  /** Technology names stay in English. */
  items: string[];
}

/** Only add testimonials you have written permission to publish. */
export interface Testimonial {
  quote: Localized;
  name: string;
  role: Localized;
  company: string;
}

export interface SectionCopy {
  title: Localized;
  intro?: Localized;
}

export interface HomeContent {
  hero: {
    title: Localized;
    intro: Localized;
    caption: Localized;
  };
  services: SectionCopy;
  spotlight: SectionCopy & { languagesNote: Localized };
  products: SectionCopy;
  process: SectionCopy;
  technologies: SectionCopy;
  testimonials: SectionCopy;
  cta: SectionCopy;
}

export interface NavItem {
  /** Key in messages/*.json under "nav". */
  labelKey: "products" | "services" | "caseStudies" | "about" | "blog" | "careers" | "contact";
  href: `/${string}`;
}
