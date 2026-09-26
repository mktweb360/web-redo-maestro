<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture

- The redesign pitch deck lives at `/propuesta` (`src/routes/propuesta.tsx`), data-driven so slides and navigation stay synced.
- The storefront uses `src/data/products.json` (real catalog with Shopify handles/variant IDs) and `src/lib/catalog.ts` as single source for products, categories and blog posts. The cart (`src/lib/cart.tsx`) hands off to **Shopify checkout via cart permalinks** (embroidery names travel as line-item properties + order attributes). Never add a fake/demo checkout or invented business data (emails, phones, reviews, dates).
- SEO/GEO infrastructure: `src/lib/seo.ts` (meta + JSON-LD), `src/lib/site.ts` (verified business data, env), `src/lib/redirects.ts` (301s from the old Shopify URLs, applied in `src/server.ts`), and server routes `/sitemap.xml`, `/robots.txt`, `/llms.txt`. Keep new pages on the `seo()` helper. Product photos come from the Shopify CDN: always render them through `productImage()` / `productSrcSet()` (resized with `?width=`), never the raw original. See `docs/SEO-GEO-CRO.md`.
- The storefront uses one editorial boutique system across every route: Cormorant Garamond display type, Karla body type, and the existing sage/clay/ink semantic palette, so commerce and editorial pages feel like one brand.
- Product categories and products use flat, indexable `/$slug` URLs with unique copy, metadata, and self-referencing canonicals; legacy `/tienda/...` URLs permanently redirect so search authority is preserved.
