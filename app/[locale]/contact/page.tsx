import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/shared/Container";
import { budgetRanges, otherInterest } from "@/content/contact";
import { contactPage } from "@/content/pages";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { settings } from "@/lib/settings";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata({
    locale,
    path: "/contact",
    title: contactPage.title[locale],
    description: contactPage.metaDescription[locale],
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  // Labels are resolved here, so the client form only receives plain strings.
  const interestGroups = [
    {
      label: t("servicesGroup"),
      options: services.map((s) => ({ value: s.slug, label: s.title[locale] })),
    },
    {
      label: t("productsGroup"),
      options: products.map((p) => ({ value: p.slug, label: p.name })),
    },
  ];

  return (
    <>
      <PageHeader
        id="contact-title"
        title={contactPage.title[locale]}
        intro={contactPage.intro[locale]}
      />
      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-12 border-t pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <ContactForm
            interestGroups={interestGroups}
            interestExtra={[{ value: otherInterest.value, label: otherInterest.label[locale] }]}
            budgetOptions={budgetRanges.map((b) => ({ value: b.value, label: b.label[locale] }))}
            fallbackEmail={settings.contact.email}
          />
          <ContactDetails />
        </div>
      </Container>
    </>
  );
}
