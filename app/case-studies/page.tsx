import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CaseStudyList } from "@/components/sections/CaseStudyList";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/shared/Container";
import { quoteHref } from "@/content/navigation";
import { caseStudiesPage } from "@/content/pages";
import { getCaseStudies } from "@/lib/case-studies";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: "/case-studies",
    title: caseStudiesPage.title,
    description: caseStudiesPage.metaDescription,
  });
}

export default async function CaseStudiesPage() {
  const t = await getTranslations();
  const studies = getCaseStudies();

  return (
    <>
      <PageHeader
        id="case-studies-title"
        title={caseStudiesPage.title}
        intro={caseStudiesPage.intro}
      />
      <Container className="pb-8">
        {studies.length > 0 ? (
          <CaseStudyList studies={studies} />
        ) : (
          <p className="max-w-2xl border-t pt-8 text-lead">{caseStudiesPage.emptyNote}</p>
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
