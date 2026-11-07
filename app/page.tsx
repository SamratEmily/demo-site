import type { Metadata } from "next";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";

const target = `/${routing.defaultLocale}/`;

export const metadata: Metadata = {
  title: site.name,
  alternates: { canonical: `${site.url}${target}` },
  robots: { index: false },
};

// Cloudflare redirects "/" at the edge (public/_redirects). This static page is
// the fallback for other hosts and `npm run preview`: it works without JS.
export default function RootPage() {
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
      </head>
      <body>
        <a href={target}>{site.name}</a>
      </body>
    </html>
  );
}
