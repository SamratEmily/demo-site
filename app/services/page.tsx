import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { Container } from "@/components/shared/Container";
import { quoteHref } from "@/content/navigation";
import { servicesPage } from "@/content/pages";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: "/services",
    title: servicesPage.title,
    description: servicesPage.metaDescription,
  });
}

export default async function ServicesPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHeader id="services-title" title={servicesPage.title} intro={servicesPage.intro}>
        <nav aria-label={t("services.onThisPage")} className="mt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {service.title}
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
        title={servicesPage.ctaTitle}
        body={servicesPage.ctaBody}
        action={{ href: quoteHref, label: t("header.getQuote") }}
      />
    </>
  );
}
