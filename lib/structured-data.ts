import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageUrl } from "./seo";
import { activeSocialLinks, settings } from "./settings";

/**
 * JSON-LD (schema.org) for search engines. Only facts from content/ are
 * used, and empty settings are left out rather than guessed.
 */

/** Other JSON-LD blocks point at the organization with this id. */
export const organizationId = `${site.url}/#organization`;

export const organizationRef = { "@id": organizationId };

/** On every page (app/[locale]/layout.tsx). Contact details come from content/settings.json. */
export function organizationJsonLd(locale: Locale) {
  const { company, contact } = settings;
  const address = contact.address[locale];
  const contactPoint =
    contact.email || contact.phone
      ? {
          "@type": "ContactPoint",
          contactType: "customer support",
          ...(contact.email ? { email: contact.email } : {}),
          ...(contact.phone ? { telephone: contact.phone } : {}),
          availableLanguage: ["English", "Bengali"],
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    legalName: company.legalName,
    url: site.url,
    logo: `${site.url}/brand/beacon-soft-logo-500.png`,
    description: site.description[locale],
    ...(company.founded ? { foundingDate: company.founded } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(address
      ? { address: { "@type": "PostalAddress", streetAddress: address, addressCountry: "BD" } }
      : {}),
    ...(contactPoint ? { contactPoint } : {}),
    ...(activeSocialLinks.length > 0 ? { sameAs: activeSocialLinks.map((s) => s.url) } : {}),
  };
}

/** Matches the visible breadcrumbs on detail pages. `path` is without the locale. */
export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: pageUrl(locale, item.path),
    })),
  };
}
