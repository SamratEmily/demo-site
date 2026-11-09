import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SkipLink } from "@/components/shared/SkipLink";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { JsonLd } from "@/components/shared/JsonLd";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { site } from "@/content/site";
import { prefixedLocales, routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { organizationJsonLd } from "@/lib/structured-data";
import "../globals.css";

export const dynamicParams = false;

// Only /bn here; English pages are built at the root by app/(default)/.
export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    metadataBase: new URL(site.url),
    title: { default: t("metaTitle"), template: `%s | ${site.name}` },
    description: t("metaDescription"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <ThemeProvider>
            <SkipLink />
            <SiteHeader />
            <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <SiteFooter />
            <WhatsAppButton />
          </ThemeProvider>
          <JsonLd data={organizationJsonLd(locale)} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
