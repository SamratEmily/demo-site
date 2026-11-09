import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import messages from "@/messages/en.json";

export const metadata: Metadata = {
  title: messages.notFound.title,
  robots: { index: false },
};

/** Served as 404.html for every unknown URL. */
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex flex-col py-24 lg:py-32">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-h1">{t("title")}</h1>
      <p className="mt-3 max-w-prose text-lead text-muted-foreground">{t("body")}</p>
      <ButtonLink href="/" size="lg" className="mt-8 self-start">
        {t("backHome")}
      </ButtonLink>
    </Container>
  );
}
