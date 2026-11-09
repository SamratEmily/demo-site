import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { ContentIcon } from "@/components/shared/ContentIcon";
import { FeatureList } from "@/components/shared/FeatureList";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { home } from "@/content/home";
import { productHref } from "@/content/navigation";
import { spotlightProduct } from "@/lib/products";
import { hostname } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";

/**
 * A second look at the product: its first gallery screenshot (the hero
 * already shows the main one), or the main screenshot if there is no gallery.
 */
function SpotlightScreen() {
  const image = spotlightProduct.gallery?.[0] ?? spotlightProduct.screenshot;
  if (!image) return null;

  return (
    <BrowserFrame>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes="(min-width: 1024px) 560px, 90vw"
        className="block h-auto w-full"
      />
    </BrowserFrame>
  );
}

export function ProductSpotlight() {
  const t = useTranslations();
  const product = spotlightProduct;

  return (
    <Section
      labelledBy="spotlight-title"
      tone="deep"
      className="relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-cyan/60 before:to-transparent"
    >
      <SectionHeading id="spotlight-title" title={home.spotlight.title} />

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-h2">{product.name}</h3>
            <StatusBadge status={product.status} />
          </div>
          <p className="mt-1 text-muted-foreground">{product.category}</p>
          <p className="mt-6 text-lead">{product.summary}</p>
          <p className="mt-4 flex items-center gap-2 text-muted-foreground">
            <ContentIcon name="languages" className="size-5 shrink-0" />
            {home.spotlight.languagesNote}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {product.url ? (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: "lg" })}
              >
                {t("home.visitProduct", { domain: hostname(product.url) })}
                <ArrowUpRight className="size-5" aria-hidden />
                <span className="sr-only">({t("common.externalLink")})</span>
              </a>
            ) : null}
            <ButtonLink
              href={productHref(product.slug)}
              variant="link"
              size="lg"
              className="px-0 sm:px-4"
            >
              {t("home.productFeatures", { name: product.name })}
            </ButtonLink>
          </div>
        </div>

        <SpotlightScreen />
      </div>

      {product.features.length > 0 ? (
        <div className="mt-16">
          <h3 className="text-sm font-semibold tracking-normal text-muted-foreground">
            {t("home.keyFeatures")}
          </h3>
          <FeatureList features={product.features} className="mt-4" />
        </div>
      ) : null}
    </Section>
  );
}
