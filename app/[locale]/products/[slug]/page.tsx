import { Check } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { ProductFaq } from "@/components/sections/ProductFaq";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductHero } from "@/components/sections/ProductHero";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { DemoVideo } from "@/components/shared/DemoVideo";
import { FeatureList } from "@/components/shared/FeatureList";
import { JsonLd } from "@/components/shared/JsonLd";
import { NumberedSteps } from "@/components/shared/NumberedSteps";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { demoRequestHref } from "@/content/navigation";
import { getProduct, products } from "@/content/products";
import { site } from "@/content/site";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata, pageUrl } from "@/lib/seo";
import type { Product } from "@/lib/types";
import { hostname } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!hasLocale(routing.locales, locale) || !product) return {};

  return pageMetadata({
    locale,
    path: `/products/${slug}`,
    title: `${product.name}: ${product.category[locale]}`,
    description: product.summary[locale],
  });
}

function productJsonLd(product: Product, locale: Locale, productsLabel: string) {
  const url = pageUrl(locale, `/products/${product.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: product.name,
        description: product.summary[locale],
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: product.status === "live" && product.url ? product.url : url,
        inLanguage: ["en", "bn"],
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        ...(product.screenshot
          ? { screenshot: `${site.url}${product.screenshot.src[locale]}` }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: productsLabel,
            item: pageUrl(locale, "/products"),
          },
          { "@type": "ListItem", position: 2, name: product.name, item: url },
        ],
      },
    ],
  };
}

interface PageSection {
  id: string;
  title: string;
  intro?: string;
  deep?: boolean;
  content: ReactNode;
}

export default async function ProductPage({ params }: PageProps<"/[locale]/products/[slug]">) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!hasLocale(routing.locales, locale) || !product) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  // Optional sections are skipped when the content file leaves them empty.
  const sections: PageSection[] = [];

  if (product.problem) {
    sections.push({
      id: "problem",
      title: t("product.problem"),
      content: <p className="max-w-3xl text-lead">{product.problem[locale]}</p>,
    });
  }
  if (product.howItWorks?.length) {
    sections.push({
      id: "how-it-works",
      title: t("product.howItWorks"),
      content: (
        <NumberedSteps
          steps={product.howItWorks}
          columns={product.howItWorks.length === 4 ? 4 : 3}
        />
      ),
    });
  }
  if (product.features.length) {
    sections.push({
      id: "features",
      title: t("product.features"),
      content: <FeatureList features={product.features} />,
    });
  }
  if (product.gallery?.length) {
    sections.push({
      id: "screenshots",
      title: t("product.screenshots"),
      content: <ProductGallery images={product.gallery} />,
    });
  }
  if (product.video && product.screenshot) {
    sections.push({
      id: "demo",
      title: t("product.demoVideo"),
      intro: product.video.description?.[locale],
      deep: true,
      content: (
        <BrowserFrame
          address={product.url ? hostname(product.url) : undefined}
          className="mx-auto max-w-4xl"
        >
          <DemoVideo
            videoSrc={product.video.src}
            poster={{
              src: product.screenshot.src[locale],
              width: product.screenshot.width,
              height: product.screenshot.height,
              alt: product.screenshot.alt[locale],
            }}
            playLabel={t("home.playDemo", {
              name: product.name,
              seconds: product.video.durationSeconds,
            })}
            videoLabel={t("home.videoLabel", { name: product.name })}
            fallbackLabel={t("home.videoFallback")}
          />
        </BrowserFrame>
      ),
    });
  }
  if (product.audience?.length) {
    sections.push({
      id: "audience",
      title: t("product.audience"),
      content: (
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {product.audience.map((item) => (
            <li key={item.en} className="flex gap-3 border-t py-4">
              <Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
              {item[locale]}
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (product.technologies?.length) {
    sections.push({
      id: "technologies",
      title: t("product.technologies"),
      content: (
        <ul className="flex flex-wrap gap-2" lang="en">
          {product.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border bg-background px-2.5 py-1 font-mono text-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (product.results?.length) {
    sections.push({
      id: "results",
      title: t("product.results"),
      content: (
        <dl className="grid gap-8 sm:grid-cols-3">
          {product.results.map((result) => (
            <div key={result.label.en} className="border-t-2 border-primary pt-4">
              <dt className="text-sm text-muted-foreground">{result.label[locale]}</dt>
              <dd className="mt-1 text-h2 font-semibold">{result.value[locale]}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }
  if (product.faq?.length) {
    sections.push({
      id: "faq",
      title: t("product.faq"),
      content: <ProductFaq items={product.faq} />,
    });
  }

  // Alternate muted/default backgrounds; the demo band is always navy.
  let alternate = 0;

  return (
    <>
      <JsonLd data={productJsonLd(product, locale, t("product.allProducts"))} />
      <ProductHero product={product} />
      {sections.map((section) => {
        const tone = section.deep ? "deep" : alternate++ % 2 === 0 ? "muted" : "default";
        return (
          <Section key={section.id} labelledBy={`${section.id}-title`} tone={tone}>
            <SectionHeading
              id={`${section.id}-title`}
              title={section.title}
              intro={section.intro}
            />
            <div className="mt-10">{section.content}</div>
          </Section>
        );
      })}
      <CtaPanel
        id="product-cta-title"
        title={t("product.ctaTitle", { name: product.name })}
        body={
          product.status === "live"
            ? t("product.ctaBody")
            : t("product.ctaBodyInDevelopment", { name: product.name })
        }
        action={{ href: demoRequestHref(product.slug), label: t("product.requestDemo") }}
      />
    </>
  );
}
