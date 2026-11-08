import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
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
import { productHref, quoteHref } from "@/content/navigation";
import { productsPage } from "@/content/pages";
import { products } from "@/content/products";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { hostname } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata({
    locale,
    path: "/products",
    title: productsPage.title[locale],
    description: productsPage.metaDescription[locale],
  });
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  const live = products.filter((p) => p.status === "live");
  const inDevelopment = products.filter((p) => p.status !== "live");

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
            title={productsPage.title[locale]}
            intro={productsPage.intro[locale]}
          />
        </Container>
      </section>

      {live.length > 0 ? (
        <Section labelledBy="live-title">
          <h2 id="live-title" className="sr-only">
            {productsPage.liveTitle[locale]}
          </h2>
          <ul className="flex flex-col gap-16">
            {live.map((product) => (
              <li
                key={product.slug}
                className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
              >
                {product.screenshot ? (
                  <BrowserFrame address={product.url ? hostname(product.url) : undefined}>
                    <Image
                      src={product.screenshot.src[locale]}
                      width={product.screenshot.width}
                      height={product.screenshot.height}
                      alt={product.screenshot.alt[locale]}
                      preload
                      loading="eager"
                      sizes="(min-width: 1024px) 620px, 100vw"
                      className="block h-auto w-full"
                    />
                  </BrowserFrame>
                ) : (
                  <ProductArt icon={product.icon} />
                )}
                <div>
                  <StatusBadge status={product.status} />
                  <h3 className="mt-3 text-h2" lang="en">
                    <Link
                      href={productHref(product.slug)}
                      className="inline-flex min-h-11 items-center hover:underline focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-muted-foreground">{product.category[locale]}</p>
                  <p className="mt-5 text-lead">{product.summary[locale]}</p>
                  <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
                    <ButtonLink href={productHref(product.slug)} size="lg">
                      {t("product.viewProduct", { name: product.name })}
                    </ButtonLink>
                    {product.url ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ size: "lg", variant: "outline" })}
                      >
                        {t("product.visit", { domain: hostname(product.url) })}
                        <ArrowUpRight className="size-5" aria-hidden />
                        <span className="sr-only">({t("common.externalLink")})</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {inDevelopment.length > 0 ? (
        <Section labelledBy="in-development-title" tone="muted">
          <SectionHeading
            id="in-development-title"
            title={productsPage.inDevelopmentTitle[locale]}
            intro={productsPage.inDevelopmentIntro[locale]}
          />
          <div className="mt-10">
            <ProductRows products={inDevelopment} />
          </div>
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
