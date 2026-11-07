import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { Container } from "@/components/shared/Container";
import { quoteHref } from "@/content/navigation";
import { servicesPage } from "@/content/pages";
import { services } from "@/content/services";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata({
    locale,
    path: "/services",
    title: servicesPage.title[locale],
    description: servicesPage.metaDescription[locale],
  });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        id="services-title"
        title={servicesPage.title[locale]}
        intro={servicesPage.intro[locale]}
      >
        <nav aria-label={t("services.onThisPage")} className="mt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
                >
                  {service.title[locale]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <Container className="pb-8">
        {services.map((service) => (
          <ServiceDetail key={service.slug} service={service} />
        ))}
      </Container>

      <CtaPanel
        id="services-cta-title"
        title={servicesPage.ctaTitle[locale]}
        body={servicesPage.ctaBody[locale]}
        action={{ href: quoteHref, label: t("header.getQuote") }}
      />
    </>
  );
}
