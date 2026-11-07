import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";

// Temporary placeholder home page for the project setup step.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {site.tagline[locale]}
      </h1>
      <p className="mt-6 max-w-prose text-lg text-muted-foreground">{site.description[locale]}</p>
      <p className="mt-10 font-mono text-sm text-muted-foreground">{t("setupNotice")}</p>
    </section>
  );
}
