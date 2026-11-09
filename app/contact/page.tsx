import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/shared/Container";
import { budgetRanges, otherInterest } from "@/content/contact";
import { contactPage } from "@/content/pages";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { settings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: "/contact",
    title: contactPage.title,
    description: contactPage.metaDescription,
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  // Labels are resolved here, so the client form only receives plain strings.
  const interestGroups = [
    {
      label: t("servicesGroup"),
      options: services.map((s) => ({ value: s.slug, label: s.title })),
    },
    {
      label: t("productsGroup"),
      options: products.map((p) => ({ value: p.slug, label: p.name })),
    },
  ];

  return (
    <>
      <PageHeader id="contact-title" title={contactPage.title} intro={contactPage.intro} />
      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-12 border-t pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <ContactForm
            interestGroups={interestGroups}
            interestExtra={[{ value: otherInterest.value, label: otherInterest.label }]}
            budgetOptions={budgetRanges.map((b) => ({ value: b.value, label: b.label }))}
            fallbackEmail={settings.contact.email}
          />
          <ContactDetails />
        </div>
      </Container>
    </>
  );
}
