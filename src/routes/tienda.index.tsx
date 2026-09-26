import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { products, productsInCategory, shopCategories } from "@/lib/catalog";
import { breadcrumbLd, seo } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/tienda/")({
  head: () =>
    seo({
      title: "Tienda: textiles para bebé hechos a mano",
      description:
        "Todo el catálogo de Pingolino Handmade: mantas y arrullos, mochilas de guardería, neceseres, portatoallitas, coronas de cumpleaños y bolsos de tela.",
      path: "/tienda",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Tienda Pingolino Handmade",
          url: absoluteUrl("/tienda"),
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: products.length,
            itemListElement: products.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/${p.slug}`),
              name: p.name,
            })),
          },
        },
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Tienda", path: "/tienda" },
        ]),
      ],
    }),
  component: Shop,
});

function Shop() {
  const [sort, setSort] = useState("destacados");
  let list = products;
  if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
            Colección artesanal
          </p>
          <div className="mt-4 grid items-end gap-6 md:grid-cols-[1fr_.7fr]">
            <h1 className="font-display text-6xl leading-none md:text-8xl">La tienda</h1>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Mantas, mochilas, neceseres y coronas cosidos a mano en España. Muchas piezas se
              personalizan con el nombre bordado.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <div className="flex flex-wrap gap-2">
            <Link
              to="/tienda"
              className="border-b border-foreground px-1 py-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground"
            >
              Todo
            </Link>
            {shopCategories
              .filter((c) => c.inShopNav && productsInCategory(c).length > 0)
              .map((category) => (
                <Link
                  key={category.slug}
                  to="/$slug"
                  params={{ slug: category.slug }}
                  className="border-b border-transparent px-1 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground hover:border-border hover:text-foreground"
                >
                  {category.name}
                </Link>
              ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-border bg-background px-3 py-2 text-sm"
            aria-label="Ordenar"
          >
            <option value="destacados">Destacados</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {list.length} productos
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 2} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
