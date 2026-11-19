import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { ProductRows } from "@/components/sections/ProductRows";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { ProductArt } from "@/components/shared/ProductArt";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { demoRequestHref, productHref, quoteHref } from "@/content/navigation";
import { productsPage } from "@/content/pages";
import { availableProducts } from "@/lib/products";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { hostname } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: "/products",
    title: productsPage.title,
    description: productsPage.metaDescription,
  });
}

export default async function ProductsPage() {
  const t = await getTranslations();

  const [featured, ...remaining] = availableProducts;

  return (
    <>
      <section aria-labelledby="products-title" className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-56 -left-56 -z-10 size-[36rem] bg-[radial-gradient(closest-side,var(--beam),transparent)]"
        />
        <Container className="pt-16 pb-4 lg:pt-24">
          <SectionHeading
            id="products-title"
            level="h1"
            title={productsPage.title}
            intro={productsPage.intro}
          />
        </Container>
      </section>

      {featured ? (
        <Section labelledBy="available-products-title">
          <h2 id="available-products-title" className="sr-only">
            {productsPage.availableTitle}
          </h2>
          <ul className="flex flex-col gap-16">
            <li className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              {featured.screenshot ? (
                <BrowserFrame address={featured.url ? hostname(featured.url) : undefined}>
                  <Image
                    src={featured.screenshot.src}
                    width={featured.screenshot.width}
                    height={featured.screenshot.height}
                    alt={featured.screenshot.alt}
                    preload
                    fetchPriority="high"
                    loading="eager"
                    sizes="(min-width: 1024px) 620px, 100vw"
                    className="block h-auto w-full"
                  />
                </BrowserFrame>
              ) : (
                <ProductArt icon={featured.icon} />
              )}
              <div>
                <StatusBadge status={featured.status} />
                <h3 className="mt-3 text-h2">
                  <Link
                    href={productHref(featured.slug)}
                    className="inline-flex min-h-11 items-center hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {featured.name}
                  </Link>
                </h3>
                <p className="mt-1 text-muted-foreground">{featured.category}</p>
                <p className="mt-5 text-lead">{featured.summary}</p>
                <div className="mt-8 flex flex-col flex-wrap gap-3 min-[400px]:flex-row">
                  <ButtonLink href={productHref(featured.slug)} size="lg">
                    {t("product.viewProduct", { name: featured.name })}
                  </ButtonLink>
                  <ButtonLink href={demoRequestHref(featured.slug)} size="lg" variant="outline">
                    {t("product.requestDemo")}
                  </ButtonLink>
                  {featured.url ? (
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ size: "lg", variant: "outline" })}
                    >
                      {t("product.visit", { domain: hostname(featured.url) })}
                      <ArrowUpRight className="size-5" aria-hidden />
                      <span className="sr-only">({t("common.externalLink")})</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </li>
          </ul>
          {remaining.length > 0 && (
            <div className="mt-12">
              <ProductRows products={remaining} />
            </div>
          )}
        </Section>
      ) : null}

      <CtaPanel
        id="products-cta-title"
        title={t("product.customTitle")}
        body={t("product.customBody")}
        action={{ href: quoteHref, label: t("header.getQuote") }}
      />
    </>
  );
}
