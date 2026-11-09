import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { CaseStudyFacts } from "@/components/sections/CaseStudyFacts";
import { CaseStudyQuote } from "@/components/sections/CaseStudyQuote";
import { CaseStudyResults } from "@/components/sections/CaseStudyResults";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { MdxContent } from "@/components/shared/MdxContent";
import { caseStudyHref, demoRequestHref, quoteHref } from "@/content/navigation";
import { caseStudySlugs, getCaseStudy } from "@/lib/case-studies";
import { productOgImage } from "@/lib/og-images";
import { getProduct } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    path: `/case-studies/${slug}`,
    title: study.meta.title,
    description: study.meta.summary,
    image: productOgImage(study.meta.product ? getProduct(study.meta.product) : undefined),
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const t = await getTranslations();
  const { meta } = study;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("caseStudies.allCaseStudies"), path: "/case-studies" },
          { name: meta.title, path: caseStudyHref(slug) },
        ])}
      />
      <section aria-labelledby="case-study-title" className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-56 -left-56 -z-10 size-[36rem] bg-[radial-gradient(closest-side,var(--beam),transparent)]"
        />
        <Container className="pt-10 pb-12 lg:pt-16 lg:pb-16">
          <Breadcrumbs
            items={[
              { label: t("caseStudies.allCaseStudies"), href: "/case-studies" },
              { label: meta.title },
            ]}
          />
          <h1 id="case-study-title" className="mt-6 max-w-4xl text-h1">
            {meta.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-muted-foreground">{meta.summary}</p>
          <CaseStudyFacts meta={meta} className="mt-10 max-w-4xl border-t pt-8" />
        </Container>
      </section>

      <CaseStudyResults results={meta.results} />

      <Container size="narrow" className="py-16 lg:py-24">
        <MdxContent source={study.body} />
      </Container>

      <CaseStudyQuote quote={meta.quote} />

      <CtaPanel
        id="case-study-cta-title"
        title={t("caseStudies.ctaTitle")}
        body={t("caseStudies.ctaBody")}
        action={
          meta.product
            ? { href: demoRequestHref(meta.product), label: t("product.requestDemo") }
            : { href: quoteHref, label: t("header.getQuote") }
        }
      />
    </>
  );
}
