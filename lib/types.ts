export interface SiteConfig {
  name: string;
  /** Canonical origin, no trailing slash. Used for SEO URLs. */
  url: string;
  tagline: string;
  description: string;
}

export const socialPlatforms = ["github", "linkedin", "facebook"] as const;
export type SocialPlatform = (typeof socialPlatforms)[number];

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

/** Shape of content/settings.json. Empty strings mean "not set yet": hidden on the site. */
export interface Settings {
  /** The live site's address; read through `site.url` in content/site.ts. */
  site: { url: string };
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
    address: string;
    officeHours: string;
    /** Google Maps embed URL (Share → Embed a map → src). Empty hides the map. */
    mapEmbedUrl: string;
  };
  whatsapp: {
    /** International format, digits only or with +; empty hides the button. */
    number: string;
    greeting: string;
  };
  social: SocialLink[];
}

/** Icon names available to content files. Mapped to lucide icons in components/shared/ContentIcon.tsx. */
export const contentIcons = [
  "app-window",
  "plug",
  "shopping-cart",
  "panels-top-left",
  "wrench",
  "server",
  "package",
  "receipt",
  "calendar-clock",
  "hand-coins",
  "wallet",
  "file-check",
  "file-text",
  "users",
  "languages",
  "smartphone",
  "shield-check",
  "car",
  "boxes",
  "graduation-cap",
  "washing-machine",
  "school",
  "bell",
  "printer",
  "chart",
  "clipboard",
  "layers",
  "gauge",
  "repeat",
  "handshake",
] as const;
export type ContentIconName = (typeof contentIcons)[number];

export interface Service {
  slug: string;
  icon: ContentIconName;
  title: string;
  /** One sentence, used on the Home page. */
  summary: string;
  /** A short paragraph, used on the Services page. */
  description: string;
  /** What the client gets. */
  included: string[];
  /** Typical technologies. */
  technologies: string[];
}

export interface Feature {
  icon: ContentIconName;
  title: string;
  description: string;
}

export interface Screenshot {
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface GalleryImage {
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** A measured outcome. Only add results you can back up. */
export interface ProductResult {
  value: string;
  label: string;
}

export const productStatuses = ["live", "in-development"] as const;
export type ProductStatus = (typeof productStatuses)[number];

/**
 * One product page. Optional sections are hidden on the page when empty,
 * so leave them out rather than inventing content.
 */
export interface Product {
  slug: string;
  name: string;
  status: ProductStatus;
  icon: ContentIconName;
  category: string;
  summary: string;
  /** Public product website, if any. Shown only when status is `live`. */
  url?: string;
  problem?: string;
  howItWorks?: ProcessStep[];
  features: Feature[];
  /** Main screenshot. */
  screenshot?: Screenshot;
  gallery?: GalleryImage[];
  /** Video URL; loaded only when the visitor presses play. */
  video?: { src: string; durationSeconds: number; description?: string };
  audience?: string[];
  technologies?: string[];
  results?: ProductResult[];
  faq?: FaqItem[];
}

/** Only add testimonials you have written permission to publish. */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface SectionCopy {
  title: string;
  intro?: string;
}

export interface HomeContent {
  hero: {
    title: string;
    intro: string;
    caption: string;
  };
  services: SectionCopy;
  spotlight: SectionCopy & { languagesNote: string };
  products: SectionCopy;
  process: SectionCopy;
  aiDevelopment: SectionCopy & { points: CompanyValue[] };
  team: SectionCopy;
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
  title: string;
  description: string;
}

/** Only add real people who agreed to be listed. */
export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public; square, at least 320×320. Optional. */
  photo?: string;
  linkedin?: string;
}

/** Frontmatter of content/case-studies/<slug>.mdx */
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

/** Frontmatter of content/blog/<slug>.mdx */
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

export const employmentTypes = ["full-time", "part-time", "contract", "internship"] as const;
export type EmploymentType = (typeof employmentTypes)[number];

/** An open position on the Careers page. Remove it once it is filled. */
export interface JobOpening {
  slug: string;
  title: string;
  type: EmploymentType;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  /** Last day to apply, YYYY-MM-DD. Optional. */
  deadline?: string;
}
