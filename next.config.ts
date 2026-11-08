import { readFileSync } from "node:fs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { site } from "./content/site";

/**
 * The CMS login only works on the domain in public/admin/config.yml, so it
 * must match site.url (content/settings.json). Fail the build if it doesn't.
 */
function checkCmsDomain() {
  const config = readFileSync("public/admin/config.yml", "utf8");
  for (const key of ["base_url", "site_url", "display_url"]) {
    const value = new RegExp(`^\\s*${key}:\\s*(\\S+)`, "m").exec(config)?.[1];
    if (value?.replace(/\/$/, "") !== site.url) {
      throw new Error(
        `public/admin/config.yml: ${key} is "${value}" but the site address in ` +
          `content/settings.json is "${site.url}". Update ${key} (see docs/ADMIN.md).`,
      );
    }
  }
}
checkCmsDomain();

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Fully static site for Cloudflare Pages — no server runtime.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
