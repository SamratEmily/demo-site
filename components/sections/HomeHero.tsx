import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { DemoVideo } from "@/components/shared/DemoVideo";
import { home } from "@/content/home";
import { quoteHref } from "@/content/navigation";
import { spotlightProduct } from "@/lib/products";
import { hostname } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";

/** Decorative beacon beam: sweeps once from the top-left onto the product. */
function BeaconBeam() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-4 size-[180vmax] origin-top-left animate-beam-sweep bg-[conic-gradient(from_104deg_at_0_0,transparent_0deg,var(--beam)_7deg,transparent_15deg)] [mask-image:radial-gradient(circle_at_0_0,black_15%,transparent_60%)] sm:left-8" />
      <div className="absolute -top-40 -left-40 size-96 bg-[radial-gradient(closest-side,var(--beam),transparent)]" />
    </div>
  );
}

export function HomeHero() {
  const t = useTranslations();
  const locale = useLocale();
  const product = spotlightProduct;
  const shot = product.screenshot;

  return (
    <section aria-labelledby="hero-title" className="relative isolate">
      <BeaconBeam />
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-24">
        <div>
          <h1 id="hero-title" className="text-display">
            {home.hero.title[locale]}
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted-foreground">{home.hero.intro[locale]}</p>
          <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
            <ButtonLink href={quoteHref} size="lg">
              {t("header.getQuote")}
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="outline">
              {t("home.seeProducts")}
            </ButtonLink>
          </div>
        </div>

        {shot ? (
          <figure>
            <BrowserFrame address={product.url ? hostname(product.url) : undefined}>
              {product.video ? (
                <DemoVideo
                  videoSrc={product.video.src}
                  poster={{
                    src: shot.src[locale],
                    width: shot.width,
                    height: shot.height,
                    alt: shot.alt[locale],
                  }}
                  playLabel={t("home.playDemo", {
                    name: product.name,
                    seconds: product.video.durationSeconds,
                  })}
                  videoLabel={t("home.videoLabel", { name: product.name })}
                  fallbackLabel={t("home.videoFallback")}
                  preload
                />
              ) : (
                <Image
                  src={shot.src[locale]}
                  width={shot.width}
                  height={shot.height}
                  alt={shot.alt[locale]}
                  preload
                  fetchPriority="high"
                  loading="eager"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="block h-auto w-full"
                />
              )}
            </BrowserFrame>
            <figcaption className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <StatusBadge status={product.status} />
              <span>{home.hero.caption[locale]}</span>
            </figcaption>
          </figure>
        ) : null}
      </Container>
    </section>
  );
}
