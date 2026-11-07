import type { NavItem } from "@/lib/types";

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

/** Footer product links. Replaced by content/products once that exists. */
export const productNav = [
  { name: "Gari Becho", href: "/products/gari-becho" },
  { name: "Inventory Management System", href: "/products/inventory-management" },
  { name: "IELTS Platform", href: "/products/ielts-platform" },
  { name: "Laundry POS System", href: "/products/laundry-pos" },
  { name: "Onushilon360", href: "/products/onushilon360" },
] as const;

export const legalNav = [
  { labelKey: "privacy", href: "/privacy" },
  { labelKey: "terms", href: "/terms" },
] as const;

export const quoteHref = "/contact";
