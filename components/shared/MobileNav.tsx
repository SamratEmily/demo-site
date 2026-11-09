"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { quoteHref } from "@/content/navigation";
import { ButtonLink } from "./ButtonLink";
import { MainNav } from "./MainNav";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Mobile menu (below lg). Radix Dialog handles focus trapping, Esc to close,
 * and returning focus to the menu button.
 */
export function MobileNav() {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("openMenu")}>
          <Menu className="size-6" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        className="w-full gap-0 p-0 sm:max-w-sm"
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <SheetTitle className="text-base font-semibold">{t("menuTitle")}</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label={t("closeMenu")}>
              <X className="size-6" aria-hidden />
            </Button>
          </SheetClose>
        </div>

        <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-4 py-6">
          <MainNav layout="stack" onNavigate={close} />

          <dl className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-muted-foreground">{t("theme")}</dt>
              <dd>
                <ThemeToggle />
              </dd>
            </div>
          </dl>
        </div>

        <div className="border-t p-4">
          <ButtonLink href={quoteHref} size="lg" className="w-full" onClick={close}>
            {t("getQuote")}
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
