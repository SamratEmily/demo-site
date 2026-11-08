import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { companyNav, legalNav, productNav } from "@/content/navigation";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { activeSocialLinks, settings } from "@/lib/settings";
import { BrandIcon } from "./BrandIcon";
import { Container } from "./Container";
import { Logo } from "./Logo";

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center rounded text-deep-muted-foreground hover:text-deep-foreground hover:underline underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none";

interface FooterColumnProps {
  id: string;
  title: string;
  children: ReactNode;
}

function FooterColumn({ id, title, children }: FooterColumnProps) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="text-sm font-semibold tracking-normal text-deep-foreground">
        {title}
      </h2>
      <ul className="mt-3 flex flex-col">{children}</ul>
    </nav>
  );
}

interface ContactRow {
  label: string;
  value: ReactNode;
}

function ContactDetails() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const { email, phone, address, officeHours } = settings.contact;
  const candidates: (ContactRow | "" | false)[] = [
    email && {
      label: t("email"),
      value: (
        <a href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>
      ),
    },
    phone && {
      label: t("phone"),
      value: (
        <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
          {phone}
        </a>
      ),
    },
    address[locale] && { label: t("address"), value: <span>{address[locale]}</span> },
    officeHours[locale] && { label: t("officeHours"), value: <span>{officeHours[locale]}</span> },
  ];
  // Empty settings fields are skipped, so nothing unfilled reaches visitors.
  const rows = candidates.filter((row): row is ContactRow => Boolean(row));

  if (rows.length === 0) {
    return (
      <p className="mt-3 text-sm text-deep-muted-foreground">
        <Link href="/contact" className={linkClass}>
          {t("contactFallback")}
        </Link>
      </p>
    );
  }

  return (
    <dl className="mt-3 flex flex-col gap-3 text-sm">
      {rows.map(({ label, value }) => (
        <div key={label}>
          <dt className="sr-only">{label}</dt>
          <dd className="text-deep-muted-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="surface-deep">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-24">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-deep-muted-foreground">{site.tagline[locale]}</p>
        </div>

        <FooterColumn id="footer-products" title={t("footer.products")}>
          {productNav.map(({ name, href }) => (
            <li key={href}>
              <Link href={href} className={linkClass} lang="en">
                {name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn id="footer-company" title={t("footer.company")}>
          {companyNav.map(({ labelKey, href }) => (
            <li key={href}>
              <Link href={href} className={linkClass}>
                {t(`nav.${labelKey}`)}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <section aria-labelledby="footer-contact">
          <h2
            id="footer-contact"
            className="text-sm font-semibold tracking-normal text-deep-foreground"
          >
            {t("footer.contact")}
          </h2>
          <ContactDetails />
        </section>
      </Container>

      <div className="border-t border-deep-border">
        <Container className="flex flex-col gap-4 py-6 text-sm text-deep-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{t("footer.copyright", { year })}</p>

          <nav aria-label={t("footer.legal")}>
            <ul className="flex flex-wrap gap-x-6">
              {legalNav.map(({ labelKey, href }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {t(`nav.${labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {activeSocialLinks.length > 0 ? (
            <ul aria-label={t("footer.social")} className="-ml-3 flex md:ml-0">
              {activeSocialLinks.map(({ platform, url }) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t(`social.${platform}`)} (${t("common.externalLink")})`}
                    className="inline-flex size-11 items-center justify-center rounded-lg hover:text-deep-foreground focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
                  >
                    <BrandIcon name={platform} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </div>
    </footer>
  );
}
