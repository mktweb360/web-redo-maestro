import productsData from "@/data/products.json";
import { shopCategories } from "./catalog";
import { BRAND } from "./site";

/**
 * Redirecciones 301 permanentes.
 *
 * 1. URLs de la tienda Shopify actual (pingolinohandmade.com, rastreo 26/09/2026)
 *    → nuevas URLs. Conservan la autoridad y los enlaces existentes al cambiar de web.
 * 2. Slugs usados en la propuesta de Lovable → slugs definitivos por palabra clave.
 */

type RawProduct = {
  slug: string;
  legacySlugs: string[];
  shopifyHandle: string;
  hidden: boolean;
  options: { shopifyHandle: string }[];
};
const raw = productsData as RawProduct[];

const map = new Map<string, string>();
const add = (from: string, to: string) => {
  if (from !== to) map.set(from.toLowerCase(), to);
};

for (const p of raw) {
  const target = p.hidden ? "/mantas-bebe-personalizadas" : `/${p.slug}`;
  add(`/products/${p.shopifyHandle}`, target);
  for (const o of p.options) add(`/products/${o.shopifyHandle}`, target);
  for (const legacy of p.legacySlugs) add(`/${legacy}`, target);
}

for (const c of shopCategories) for (const legacy of c.legacySlugs) add(`/${legacy}`, `/${c.slug}`);

const fixed: Record<string, string> = {
  // Productos de ejemplo de la plantilla de Shopify (eliminados)
  "/products/baby-and-toddler-example-product-1": "/tienda",
  "/products/baby-and-toddler-example-product-2": "/tienda",
  "/products/baby-and-toddler-example-product-3": "/tienda",
  // Colecciones y páginas de Shopify
  "/collections/all": "/tienda",
  "/collections": "/tienda",
  "/collections/frontpage": "/tienda",
  "/collections/baby-and-toddler-example-products": "/tienda",
  "/collections/mochilas-infantiles": "/mochilas-guarderia-personalizadas",
  "/pages/mochila-infantil": "/mochilas-guarderia-personalizadas",
  "/pages/contact": "/contacto",
  "/blogs/noticias": "/blog",
  "/search": "/tienda",
  "/cart": "/tienda",
};
for (const [from, to] of Object.entries(fixed)) add(from, to);

/** Devuelve el destino de una redirección permanente o `null`. */
export function resolveRedirect(pathname: string): string | null {
  let path: string;
  try {
    path = decodeURIComponent(pathname).toLowerCase();
  } catch {
    path = pathname.toLowerCase();
  }
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  const direct = map.get(path);
  if (direct) return direct;

  // /blogs/noticias/{handle} → /blog/{handle} (mismos slugs)
  const blog = /^\/blogs\/noticias\/([^/]+)$/.exec(path);
  if (blog?.[1]) return `/blog/${blog[1]}`;

  // /collections/{x}/products/{handle} → ficha
  const nested = /^\/collections\/[^/]+\/products\/([^/]+)$/.exec(path);
  if (nested?.[1]) return map.get(`/products/${nested[1]}`) ?? "/tienda";

  // Cualquier otra colección o producto antiguo desconocido
  if (/^\/(collections|products)\//.test(path)) return "/tienda";
  if (path === "/policies/privacy-policy") return BRAND.privacyPolicyUrl;
  if (path.startsWith("/policies/")) return "/envios";

  // Barra final: /tienda/ → /tienda
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);

  return null;
}

export const redirectMap = map;
