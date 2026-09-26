import { createFileRoute } from "@tanstack/react-router";
import { formatPrice, posts, products, productsInCategory, shopCategories } from "@/lib/catalog";
import { BRAND, SITE_URL } from "@/lib/site";

/**
 * llms.txt (https://llmstxt.org): resumen del negocio para asistentes de IA.
 * Solo contiene hechos verificados; se genera a partir del catálogo real.
 */
function build(): string {
  const cats = shopCategories
    .filter((c) => productsInCategory(c).length > 0)
    .map((c) => `- [${c.title}](${SITE_URL}/${c.slug}): ${c.metaDescription}`)
    .join("\n");
  const prods = products
    .map(
      (p) =>
        `- [${p.name}](${SITE_URL}/${p.slug}) — ${formatPrice(p.price)}${p.personalizable ? " · personalizable con nombre bordado" : ""}${p.available ? "" : " · agotado"}: ${p.metaDescription}`,
    )
    .join("\n");
  const guides = posts
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.metaDescription}`)
    .join("\n");

  return `# ${BRAND.name}

> ${BRAND.name} es un pequeño taller artesanal español que cose a mano textiles para bebés y familias: mantas y arrullos, mochilas de guardería, neceseres, portatoallitas, coronas de cumpleaños y bolsos de tela. Muchas piezas se personalizan con el nombre bordado. Tienda online; envío gratis en pedidos desde ${formatPrice(BRAND.freeShippingFrom)}.

## Quién está detrás
- Fundadora y costurera: ${BRAND.founder}, madre de tres hijos y costurera autodidacta. Cada pieza la confecciona ella en su taller.
- Historia completa: ${SITE_URL}/nosotros

## Qué hace diferente a ${BRAND.name}
- Piezas cosidas a mano una a una en España, no producción en serie.
- Personalización con nombre bordado en los productos marcados como personalizables.
- Tejidos de algodón (waffle, muselina, doble gasa), borreguito y telas de vichy.

## Categorías
${cats}

## Productos
${prods}

## Guías del blog
${guides}

## Compra, envíos y contacto
- Envíos y preguntas frecuentes: ${SITE_URL}/envios
- Contacto: ${SITE_URL}/contacto · ${BRAND.email} · ${BRAND.phone}
- El pago se realiza en el checkout seguro de Shopify.
`;
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(build(), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
