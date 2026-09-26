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
- The proposed storefront uses `src/data/products.json` (real catalog, images as CDN assets) and `src/lib/catalog.ts` as single source for products and blog posts; cart is client-only context in `src/lib/cart.tsx` because checkout is a demo.
- The storefront uses one editorial boutique system across every route: Cormorant Garamond display type, Karla body type, and the existing sage/clay/ink semantic palette, so commerce and editorial pages feel like one brand.
