import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SkipLink } from "@/components/shared/SkipLink";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { JsonLd } from "@/components/shared/JsonLd";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { organizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");

  return {
    metadataBase: new URL(site.url),
    title: { default: t("metaTitle"), template: `%s | ${site.name}` },
    description: t("metaDescription"),
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
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
          <JsonLd data={organizationJsonLd()} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
