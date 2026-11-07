import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
import { spotlightProduct } from "@/content/products";
import { routing } from "@/i18n/routing";
import { hostname } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";

/** The same screen in both languages, overlapped: shows the bilingual UI at a glance. */
function BilingualScreens() {
  const locale = useLocale();
  const shot = spotlightProduct.screenshot;
  if (!shot) return null;
  // Current language in front.
  const [back, front] = [...routing.locales].sort((a) => (a === locale ? 1 : -1));

  return (
    <div className="relative pr-[10%] pb-[14%]">
      {[back, front].map((lang, i) => (
        <BrowserFrame
          key={lang}
          className={i === 1 ? "absolute right-0 bottom-0 w-[90%]" : "opacity-90"}
        >
          <Image
            src={shot.src[lang]}
            width={shot.width}
            height={shot.height}
            alt={shot.alt[lang]}
            lang={lang}
            sizes="(min-width: 1024px) 560px, 90vw"
            className="block h-auto w-full"
          />
        </BrowserFrame>
      ))}
    </div>
  );
}

export function ProductSpotlight() {
  const t = useTranslations();
  const locale = useLocale();
  const product = spotlightProduct;

  return (
    <Section
      labelledBy="spotlight-title"
      tone="deep"
      className="relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-cyan/60 before:to-transparent"
    >
      <SectionHeading id="spotlight-title" title={home.spotlight.title[locale]} />

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-h2" lang="en">
              {product.name}
            </h3>
            <StatusBadge status={product.status} />
          </div>
          <p className="mt-1 text-muted-foreground">{product.category[locale]}</p>
          <p className="mt-6 text-lead">{product.summary[locale]}</p>
          <p className="mt-4 flex items-center gap-2 text-muted-foreground">
            <ContentIcon name="languages" className="size-5 shrink-0" />
            {home.spotlight.languagesNote[locale]}
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

        <BilingualScreens />
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
