import type { NavItem } from "@/lib/types";
import { products } from "./products";

/** Top navigation. Labels live in messages/*.json under "nav". */
export const mainNav: NavItem[] = [
  { labelKey: "products", href: "/products" },
  { labelKey: "services", href: "/services" },
  { labelKey: "caseStudies", href: "/case-studies" },
  { labelKey: "about", href: "/about" },
  { labelKey: "blog", href: "/blog" },
];

/** Footer "Company" column. */
export const companyNav: NavItem[] = [
  { labelKey: "about", href: "/about" },
  { labelKey: "careers", href: "/careers" },
  { labelKey: "blog", href: "/blog" },
  { labelKey: "contact", href: "/contact" },
];

export const productHref = (slug: string) => `/products/${slug}` as const;

/** Footer product links, derived from content/products.ts. */
export const productNav = products.map((p) => ({ name: p.name, href: productHref(p.slug) }));

export const legalNav = [
  { labelKey: "privacy", href: "/privacy" },
  { labelKey: "terms", href: "/terms" },
] as const;

export const quoteHref = "/contact";

/** Contact page with the product preselected (read client-side on /contact). */
export const demoRequestHref = (slug: string) => ({
  pathname: "/contact" as const,
  query: { product: slug },
});

/** Contact page with the service preselected (read client-side on /contact). */
export const serviceQuoteHref = (slug: string) => ({
  pathname: "/contact" as const,
  query: { service: slug },
});

export const caseStudyHref = (slug: string) => `/case-studies/${slug}` as const;

export const blogHref = "/blog";
export const blogPostHref = (slug: string) => `/blog/${slug}` as const;
export const blogTagHref = (tag: string) => `/blog/tags/${tag}` as const;
