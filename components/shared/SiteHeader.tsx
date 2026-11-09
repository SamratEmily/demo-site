import { useTranslations } from "next-intl";
import { quoteHref } from "@/content/navigation";
import Link from "next/link";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { HeaderShell } from "./HeaderShell";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const t = useTranslations();

  return (
    <HeaderShell>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={t("common.homeLink")}
          className="-ml-1 inline-flex min-h-11 items-center rounded-lg px-1 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Logo />
        </Link>

        <div className="hidden lg:block">
          <MainNav layout="bar" />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <ButtonLink href={quoteHref} className="hidden min-[400px]:inline-flex">
            {t("header.getQuote")}
          </ButtonLink>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}
