import type { APIRoute } from "astro";

/**
 * Sitemap, generated at build time.
 *
 * This used to be @astrojs/sitemap, but that package tracks the current major
 * of Astro and broke against Astro 4. Seven pages don't justify a dependency
 * that can break the build on a version bump.
 *
 * Add new pages to this list when you add them to src/pages.
 * 404 is deliberately excluded — it shouldn't be indexed.
 */
const routes = ["/", "/work", "/pricing", "/about", "/contact", "/privacy", "/terms"];

export const GET: APIRoute = ({ site }) => {
  const origin = String(site ?? "https://toporderdigital.com.au").replace(/\/$/, "");
  const lastmod = new Date().toISOString().split("T")[0];

  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${origin}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
