# Pingolino Handmade — Cambios técnicos, SEO, GEO y CRO

Rama `seo-geo-cro-manus` · Mkt Web 360 · 26/09/2026

**Base de diseño:** la propuesta editorial de Manus (PR #1, rama `manus/editorial-storefront-redesign`). Sustituye a la versión anterior de Lovable. Sobre ese diseño se ha integrado todo el trabajo técnico, SEO, GEO y CRO de este documento (antes en la rama `seo-geo-cro-mktweb360`, PR #2).

Base: rastreo del sitio actual (Shopify) del 26/09/2026 y estudio de palabras clave de Keyword Planner (España). Ambos documentos están en la carpeta de Drive del proyecto.

## 1. Arquitectura de venta (lo más importante)

La propuesta de Lovable tenía un **checkout de demostración** ("Finalizar compra" vaciaba la cesta y mostraba un "¡Gracias!" sin cobrar nada).

Ahora esta web funciona como **escaparate** y **Shopify sigue procesando el pago**:

- Cada producto lleva `shopifyVariantId` y `shopifyHandle` (`src/data/products.json`).
- "Finalizar compra" genera un [cart permalink de Shopify](https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks) hacia `https://ycsp2t-ba.myshopify.com/cart/{variante}:{cantidad},...` (`src/lib/cart.tsx`).
- **Personalización:**
  - El nombre a bordar de la primera línea viaja como propiedad del artículo (`properties`, Base64).
  - Shopify solo admite propiedades en la primera línea. Por eso **todos** los bordados viajan además como `attributes[Bordado N · Producto]` y aparecen en los detalles del pedido.
- **Mochila:** en Shopify son 2 productos (solapa azul y solapa rosa). Aquí se muestran como 1 producto con selector de color, y cada color apunta a su variante real.

### Requisitos para publicar (fuera del código)

1. **Dominio principal de Shopify:** cuando `pingolinohandmade.com` apunte a esta web, el dominio principal de Shopify debe pasar a `ycsp2t-ba.myshopify.com` o a un subdominio (p. ej. `tienda.pingolinohandmade.com`). Así los emails, el estado del pedido y la cuenta del cliente siguen funcionando.
2. **Tienda online de Shopify:** sigue existiendo. Para que no compita con esta web en Google, hay que redirigir o aplicar `noindex` a su tema. El checkout no se ve afectado.
3. **Precios y stock:** están en `products.json`. Si cambian en Shopify hay que actualizarlos aquí. El checkout siempre cobra el precio y aplica el stock de Shopify, así que un desfase no genera cobros erróneos, pero sí puede confundir al cliente.
   - *Siguiente paso recomendado:* sincronización automática con la Storefront API de Shopify (requiere crear un token en el canal Headless).
4. **Variables de entorno opcionales:**
   - `VITE_SITE_URL`: dominio público. Por defecto, `https://pingolinohandmade.com`.
   - `VITE_SHOPIFY_DOMAIN`: dominio de la tienda Shopify.
   - `VITE_GTM_ID`: contenedor de Google Tag Manager. Se carga con Consent Mode v2 en "denegado"; **hace falta un banner de cookies (CMP) antes de activarlo**.

## 2. SEO técnico

| Cambio | Archivo |
|---|---|
| Helper único de metadatos: title, description, canonical **absoluto**, OG y Twitter con imagen absoluta, `robots` | `src/lib/seo.ts` |
| JSON-LD: Organization, WebSite, Product+Offer, BreadcrumbList, CollectionPage+ItemList, FAQPage, BlogPosting con autora, AboutPage y ContactPage | `src/lib/seo.ts` y rutas |
| `sitemap.xml` dinámico con imágenes (excluye borradores y productos ocultos) | `src/routes/sitemap[.]xml.ts` |
| `robots.txt` dinámico con la línea `Sitemap` (sustituye al estático) | `src/routes/robots[.]txt.ts` |
| **Redirecciones 301** de todas las URLs de Shopify: `/products/*`, `/collections/*`, `/pages/*`, `/blogs/noticias/*`, `/policies/*` | `src/lib/redirects.ts` y `src/server.ts` |
| Redirecciones 301 de los slugs de la propuesta de Lovable a los slugs por palabra clave | `src/lib/redirects.ts` |
| Barra final → sin barra (301) | `src/lib/redirects.ts` |
| Slugs de categorías y productos alineados con el estudio de keywords | `src/lib/catalog.ts` y `products.json` |
| Nueva página hub `/regalos-personalizados-bebe` ("regalos personalizados bebé": 1.000-10.000 búsquedas/mes) | `src/lib/catalog.ts` |
| Home: H1 con la intención principal ("Regalos personalizados para bebé") | `src/routes/index.tsx` |
| `/propuesta` con `noindex` y el PDF bloqueado en robots | `src/routes/propuesta.tsx` |
| 404 en español dentro del layout, con `noindex` | `src/routes/__root.tsx` |
| Hero en WebP (1,36 MB → 63 KB), `fetchpriority`, `width`/`height` en imágenes, `loading="lazy"` | varias |
| Fotos de producto servidas desde el CDN de Shopify **redimensionadas** con `?width=` y `srcset` (un original de 1,46 MB baja a 86 KB a 600 px, comprobado el 26/09/2026). La propuesta de Manus cargaba los originales de hasta 5712 px | `productImage()` y `productSrcSet()` en `src/lib/catalog.ts` |
| Fechas del blog formateadas en hora de Madrid: evita que el servidor (UTC) y el navegador muestren días distintos y rompan la hidratación de React | `formatDate()` en `src/lib/catalog.ts` |
| `lang="es-ES"` y `theme-color` | `src/routes/__root.tsx` |

## 3. Contenido

- **Diseño de Manus:** se conserva su identidad visual (cabecera, portada, tienda con buscador y filtros, fichas, diario). Se sustituyen solo los elementos que no eran reales o no funcionaban: checkout de demostración, newsletter y formulario sin envío, correo "por confirmar", Instagram sin verificar y fotos de demostración del tema de Shopify.
- **Blog:** se publican los **3 artículos reales** de la tienda actual (mismo slug, fecha y autora), con estructura H2/H3, FAQ con schema y enlaces internos contextuales a productos.
- **Borradores:** los 3 artículos que inventó la propuesta tenían fechas ficticias y afirmaciones de proceso no verificadas. Quedan como **borrador**: no se listan, llevan `noindex` y no entran en el sitemap, hasta que la clienta los valide.
- **Imágenes de stock:** "taller.jpg" y "materiales.jpg" **no son fotos del taller**: son imágenes de demostración del tema de Shopify. Se sustituyen por fotos reales de producto y se mantienen solo en `/propuesta`.
- **Manta con bordado de Mickey Mouse** (Disney): producto `hidden: true`. No se lista, no se indexa y su URL de Shopify redirige a la categoría. Motivo: riesgo de propiedad intelectual.
- **Datos inventados eliminados:**
  - Email `hola@` (el real es `info@`).
  - "WhatsApp para encargos" sin número.
  - Instagram y Facebook sin verificar.
  - Lavado "a 30 °C, del revés".
  - "Revisamos cada bordado" y "Elige el tejido".
- **Textos de borrador de IA** eliminados de la ficha del portatoallitas.
- **Datos verificados añadidos:**
  - Medidas y edades.
  - Cuidados de la corona.
  - Composición del arrullo.
  - Ficha técnica (`facts`) por producto.

## 4. GEO

- `llms.txt` generado desde el catálogo real: qué es el negocio, quién lo hace, categorías, productos con precio y guías.
- Entidad única "Pingolino Handmade" (`Organization` con `founder`, `contactPoint`, `address` y `sameAs` solo de perfiles verificados).
- FAQ con schema en categorías, envíos y artículos.
- Autora identificable (`Person`) en artículos y en "Nuestra historia".

## 5. CRO y UX

- Checkout real (ver punto 1) y aviso "Pago seguro con Shopify".
- Barra de progreso hacia el envío gratis. Aviso de envío gratis en la ficha según el precio.
- Campo "Nombre a bordar" con contador. En móvil, el CTA fijo lleva primero al campo si aún no hay nombre.
- CTA fijo en móvil en las fichas.
- Producto agotado → "Pedir por encargo", que abre el contacto con el producto ya indicado.
- Selector de color en la mochila.
- Ficha técnica, FAQ por producto y FAQ por categoría.
- **Formulario de contacto honesto:**
  - Antes simulaba un envío ("¡Mensaje recibido!") y el mensaje se perdía.
  - Ahora abre el correo del cliente con el mensaje ya redactado.
  - *Siguiente paso:* conectar un servicio de formularios.
- Newsletter del pie retirada: no enviaba nada. Se reactiva cuando haya plataforma de email.
- Menú móvil:
  - Corregido el hueco entre 768 y 1023 px (el botón aparecía y el menú no).
  - Añadidas las categorías.
  - Se cierra con Escape.
- Cesta: se cierra con Escape, recibe el foco, bloquea el scroll del fondo y descarta líneas de productos que ya no existen.
- Accesibilidad:
  - Enlace "Saltar al contenido".
  - Migas de pan semánticas.
  - `aria-*` en los controles.
  - Botones de 44 px.
  - **Color de acento para texto con contraste AA** (`--accent-strong`, ≈5,4:1). El acento original daba 3,7:1.

## 6. Pendiente (necesita a la clienta o una decisión)

- [ ] Titular y NIF → **aviso legal**, condiciones de venta y política de devoluciones propias (hoy los enlaces apuntan a la política de privacidad de Shopify y a `/envios`). Validar con E5/E10.
- [ ] Confirmar la política de devoluciones de `/envios`: es la de la propuesta y lleva la nota "validar antes de publicar".
- [ ] ¿La manta de borreguito y el portatoallitas se personalizan? Las fotos muestran nombres bordados, pero sus textos no lo dicen. Hoy figuran como no personalizables.
- [ ] ¿El nombre a bordar es obligatorio en las piezas personalizables? Hoy es opcional.
- [ ] Fotos reales del taller y de Sherezhade para "Nuestra historia".
- [ ] Origen de las imágenes del blog: parecen generadas o de banco.
- [ ] URLs de Instagram y Facebook.
- [ ] Banner de cookies (CMP) + GA4/GTM + Search Console.
- [ ] Retirar `/propuesta` y el PDF antes del lanzamiento.
- [ ] Logo en imagen, para `Organization.logo` y el favicon.
