import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Update this if the live domain ever changes — it feeds canonical URLs,
// Open Graph tags, the sitemap and robots.txt.
export const SITE_URL = "https://toporderdigital.com.au";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "ignore",
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
