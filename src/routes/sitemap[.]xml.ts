import { createFileRoute } from "@tanstack/react-router";
import { posts, productsInCategory, products, shopCategories } from "@/lib/catalog";
import { SITE_URL, absoluteUrl } from "@/lib/site";

type Entry = { loc: string; lastmod?: string; images?: string[] };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function build(): string {
  const entries: Entry[] = [
    { loc: "/" },
    { loc: "/tienda" },
    ...shopCategories
      .filter((c) => productsInCategory(c).length > 0)
      .map((c) => ({ loc: `/${c.slug}` })),
    ...products.map((p) => ({ loc: `/${p.slug}`, images: p.images.slice(0, 5) })),
    { loc: "/nosotros" },
    { loc: "/envios" },
    { loc: "/contacto" },
    { loc: "/blog" },
    ...posts.map((p) => ({
      loc: `/blog/${p.slug}`,
      lastmod: p.dateModified.slice(0, 10),
      images: [p.image],
    })),
  ];
  const body = entries
    .map((e) => {
      const imgs = (e.images ?? [])
        .map((src) => `<image:image><image:loc>${esc(absoluteUrl(src))}</image:loc></image:image>`)
        .join("");
      return `<url><loc>${esc(`${SITE_URL}${e.loc === "/" ? "/" : e.loc}`)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}${imgs}</url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(build(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
