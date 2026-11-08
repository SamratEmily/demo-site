import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

/**
 * /manifest.webmanifest, generated at build time: name and icons when the
 * site is added to a phone's home screen. The colour is the deep navy of the
 * logo tile (app/icon.svg); the manifest can't read CSS variables.
 */
const logoNavy = "#0b2a5b";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Beacon Soft",
    description: site.description.en,
    lang: routing.defaultLocale,
    start_url: `/${routing.defaultLocale}/`,
    scope: "/",
    display: "browser",
    background_color: logoNavy,
    theme_color: logoNavy,
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
      {
        src: "/icons/icon-maskable-512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
  };
}
