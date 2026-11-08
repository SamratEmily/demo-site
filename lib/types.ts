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
  company: {
    legalName: string;
    /** Year the company was founded, e.g. "2021". */
    founded: string;
    /** Company registration or trade licence number. */
    registration: string;
  };
  contact: {
    email: string;
    /** Where CVs go; falls back to `email` when empty. */
    careersEmail: string;
    /** International format, e.g. +8801XXXXXXXXX */
    phone: string;
    address: Localized;
    officeHours: Localized;
    /** Google Maps embed URL (Share → Embed a map → src). Empty hides the map. */
    mapEmbedUrl: string;
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
  | "clipboard"
  | "layers"
  | "gauge"
  | "repeat"
  | "handshake";

export interface Service {
  slug: string;
  icon: ContentIconName;
  title: Localized;
  /** One sentence, used on the Home page. */
  summary: Localized;
  /** A short paragraph, used on the Services page. */
  description: Localized;
  /** What the client gets. */
  included: Localized[];
  /** Typical technologies; names stay in English. */
  technologies: string[];
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

/** A principle we work by (About page). */
export interface CompanyValue {
  icon: ContentIconName;
  title: Localized;
  description: Localized;
}

/** Only add real people who agreed to be listed. */
export interface TeamMember {
  name: Localized;
  role: Localized;
  /** Path under /public; square, at least 320×320. Optional. */
  photo?: string;
  linkedin?: string;
}

/** Frontmatter of content/case-studies/<slug>.<locale>.mdx */
export interface CaseStudyMeta {
  title: string;
  /** One or two sentences for the index page and meta description. */
  summary: string;
  client: string;
  industry: string;
  /** Slug of a product in content/products, if the project used one. */
  product?: string;
  duration: string;
  /** Measured outcomes; only add results you can back up. */
  results: { value: string; label: string }[];
  /** Client quote; leave out until you have written permission. */
  quote?: { text: string; name: string; role: string };
}

export interface CaseStudy {
  slug: string;
  meta: CaseStudyMeta;
  /** MDX body: challenge, solution and results sections. */
  body: string;
}

/** Frontmatter of content/blog/<slug>.<locale>.mdx */
export interface BlogPostMeta {
  title: string;
  /** One or two sentences for the index, meta description and social previews. */
  summary: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  author: string;
  /** Tag slugs defined in content/blog-tags.ts. */
  tags: string[];
  cover?: { src: string; width: number; height: number; alt: string };
  /** Drafts appear in `npm run dev` only, never in the production build. */
  draft: boolean;
}

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  body: string;
  readingMinutes: number;
  toc: TocItem[];
}

export type EmploymentType = "full-time" | "part-time" | "contract" | "internship";

/** An open position on the Careers page. Remove it once it is filled. */
export interface JobOpening {
  slug: string;
  title: Localized;
  type: EmploymentType;
  location: Localized;
  summary: Localized;
  responsibilities: Localized[];
  requirements: Localized[];
  niceToHave?: Localized[];
  /** Last day to apply, YYYY-MM-DD. Optional. */
  deadline?: string;
}
