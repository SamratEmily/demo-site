import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { ProductArt } from "@/components/shared/ProductArt";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { hostname } from "@/lib/utils";
import { demoRequestHref } from "@/content/navigation";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const t = useTranslations();
  const locale = useLocale();
  const shot = product.screenshot;
  const showVisit = product.status === "live" && product.url;

  return (
    <section aria-labelledby="product-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-56 -left-56 -z-10 size-[36rem] bg-[radial-gradient(closest-side,var(--beam),transparent)]"
      />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs
          items={[
            { label: t("product.allProducts"), href: "/products" },
            { label: product.name, lang: "en" },
          ]}
        />
        <div className="mt-6 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <StatusBadge status={product.status} />
            <h1 id="product-title" className="mt-4 text-h1" lang="en">
              {product.name}
            </h1>
            <p className="mt-2 text-lead font-medium text-muted-foreground">
              {product.category[locale]}
            </p>
            <p className="mt-6 max-w-xl text-lead">{product.summary[locale]}</p>
            <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
              <ButtonLink href={demoRequestHref(product.slug)} size="lg">
                {t("product.requestDemo")}
              </ButtonLink>
              {showVisit && product.url ? (
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

          {shot ? (
            <BrowserFrame address={product.url ? hostname(product.url) : undefined}>
              <Image
                src={shot.src[locale]}
                width={shot.width}
                height={shot.height}
                alt={shot.alt[locale]}
                preload
                loading="eager"
                sizes="(min-width: 1024px) 600px, 100vw"
                className="block h-auto w-full"
              />
            </BrowserFrame>
          ) : (
            <ProductArt icon={product.icon} />
          )}
        </div>
      </Container>
    </section>
  );
}
