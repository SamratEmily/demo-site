import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { AiDevelopment } from "@/components/sections/AiDevelopment";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeTeam } from "@/components/sections/HomeTeam";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProductList } from "@/components/sections/ProductList";
import { ProductSpotlight } from "@/components/sections/ProductSpotlight";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Testimonials } from "@/components/sections/Testimonials";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "home" });
  return pageMetadata({
    locale,
    path: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <ServicesOverview />
      <ProductSpotlight />
      <ProductList />
      <ProcessSteps />
      <AiDevelopment />
      <HomeTeam />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
