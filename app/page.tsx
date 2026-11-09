import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { AiDevelopment } from "@/components/sections/AiDevelopment";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeTeam } from "@/components/sections/HomeTeam";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProductList } from "@/components/sections/ProductList";
import { ProductSpotlight } from "@/components/sections/ProductSpotlight";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Testimonials } from "@/components/sections/Testimonials";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return pageMetadata({
    path: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
    absoluteTitle: true,
  });
}

export default async function HomePage() {
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
