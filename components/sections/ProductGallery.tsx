import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import type { GalleryImage } from "@/lib/types";

interface ProductGalleryProps {
  images: GalleryImage[];
}

function Shot({ image, portrait }: { image: GalleryImage; portrait: boolean }) {
  const t = useTranslations("product");
  const locale = useLocale();
  const picture = (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt[locale]}
      sizes={portrait ? "(min-width: 1024px) 280px, 70vw" : "(min-width: 1024px) 420px, 100vw"}
      className="block h-auto w-full"
    />
  );

  return (
    <figure>
      {portrait ? (
        <div className="mx-auto max-w-72 overflow-hidden rounded-[1.75rem] border-4 border-brand-navy shadow-2xl shadow-brand-navy/20">
          {picture}
        </div>
      ) : (
        <BrowserFrame>{picture}</BrowserFrame>
      )}
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
        <span className="font-medium">{image.caption[locale]}</span>
        <a
          href={image.src}
          className="inline-flex min-h-11 items-center text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
        >
          {t("openFullSize")}
        </a>
      </figcaption>
    </figure>
  );
}

/** Real screenshots: landscape screens in a grid, phone screens in a side column. */
export function ProductGallery({ images }: ProductGalleryProps) {
  const landscape = images.filter((i) => i.width >= i.height);
  const portrait = images.filter((i) => i.width < i.height);

  return (
    <div
      className={
        portrait.length > 0
          ? "grid gap-10 lg:grid-cols-[minmax(0,2.6fr)_minmax(0,1fr)] lg:items-start"
          : undefined
      }
    >
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {landscape.map((image) => (
          <Shot key={image.src} image={image} portrait={false} />
        ))}
      </div>
      {portrait.length > 0 ? (
        <div className="grid gap-10">
          {portrait.map((image) => (
            <Shot key={image.src} image={image} portrait />
          ))}
        </div>
      ) : null}
    </div>
  );
}
