import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CaseStudyList } from "@/components/sections/CaseStudyList";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/shared/Container";
import { quoteHref } from "@/content/navigation";
import { caseStudiesPage } from "@/content/pages";
import { routing } from "@/i18n/routing";
import { getCaseStudies } from "@/lib/case-studies";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/case-studies">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata({
    locale,
    path: "/case-studies",
    title: caseStudiesPage.title[locale],
    description: caseStudiesPage.metaDescription[locale],
  });
}

export default async function CaseStudiesPage({ params }: PageProps<"/[locale]/case-studies">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const studies = getCaseStudies(locale);

  return (
    <>
      <PageHeader
        id="case-studies-title"
        title={caseStudiesPage.title[locale]}
        intro={caseStudiesPage.intro[locale]}
      />
      <Container className="pb-8">
        {studies.length > 0 ? (
          <CaseStudyList studies={studies} />
        ) : (
          <p className="max-w-2xl border-t pt-8 text-lead">{caseStudiesPage.emptyNote[locale]}</p>
        )}
      </Container>
      <CtaPanel
        id="case-studies-cta-title"
        title={t("caseStudies.ctaTitle")}
        body={t("caseStudies.ctaBody")}
        action={{ href: quoteHref, label: t("header.getQuote") }}
      />
    </>
  );
}
