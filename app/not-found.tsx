import type { Metadata } from "next";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import enMessages from "@/messages/en.json";
import bnMessages from "@/messages/bn.json";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${enMessages.notFound.title} · ${bnMessages.notFound.title}`,
  robots: { index: false },
};

// Static hosting serves a single 404.html for every unknown URL, so this page
// shows both languages instead of guessing the visitor's locale.
const versions = [
  { locale: "en", messages: enMessages },
  { locale: "bn", messages: bnMessages },
] as const;

export default function NotFound() {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-12 px-4 py-24">
            {versions.map(({ locale, messages }, index) => {
              const Heading = index === 0 ? "h1" : "h2";
              return (
                <section
                  key={locale}
                  lang={locale}
                  className={locale === "bn" ? "font-bangla leading-[1.75]" : undefined}
                >
                  <p className="font-mono text-sm text-muted-foreground">404</p>
                  <Heading className="mt-2 text-3xl font-semibold tracking-tight">
                    {messages.notFound.title}
                  </Heading>
                  <p className="mt-3 text-muted-foreground">{messages.notFound.body}</p>
                  <a
                    href={locale === "en" ? "/" : `/${locale}/`}
                    className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 font-medium text-primary-foreground hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {messages.notFound.backHome}
                  </a>
                </section>
              );
            })}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
