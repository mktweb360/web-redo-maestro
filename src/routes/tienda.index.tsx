import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import {
  FREE_SHIPPING,
  formatPrice,
  getCategoryForProduct,
  products,
  productsInCategory,
  shopCategories,
} from "@/lib/catalog";
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

const navCategories = shopCategories.filter((c) => c.inShopNav && productsInCategory(c).length > 0);
const hub = shopCategories.find((c) => !c.inShopNav && productsInCategory(c).length > 0);

function Shop() {
  const [sort, setSort] = useState("destacados");
  const [filter, setFilter] = useState("todo");
  const [query, setQuery] = useState("");
  const list = useMemo(() => {
    const category = navCategories.find((c) => c.slug === filter);
    let result = category ? productsInCategory(category) : products;
    const term = query.trim().toLocaleLowerCase("es");
    if (term)
      result = result.filter((product) =>
        `${product.name} ${product.subtitle} ${getCategoryForProduct(product)?.name ?? ""}`
          .toLocaleLowerCase("es")
          .includes(term),
      );
    if (sort === "asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "az") result = [...result].sort((a, b) => a.name.localeCompare(b.name, "es"));
    return result;
  }, [filter, query, sort]);

  return (
    <SiteLayout>
      <section className="bg-secondary">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-[72px] lg:px-12">
          <p className="section-kicker">Cosido a mano en España</p>
          <div className="mt-4 grid items-end gap-5 md:grid-cols-[1fr_.58fr] md:gap-10">
            <h1 className="font-display text-6xl leading-[0.82] tracking-tight sm:text-7xl md:text-8xl">
              La tienda
              <br />
              <i className="font-medium text-primary">de Pingolino.</i>
            </h1>
            <p className="max-w-md pb-1 text-sm leading-[1.8] text-muted-foreground sm:text-base">
              Mantas y arrullos, mochilas de guardería, neceseres, coronas de cumpleaños y bolsos de
              tela. Costura lenta, tejidos elegidos con mimo y, en muchas piezas, su nombre bordado.
            </p>
          </div>
          <nav className="mt-10 flex flex-wrap gap-2" aria-label="Colecciones">
            {[...navCategories, ...(hub ? [hub] : [])].map((category) => (
              <Link
                key={category.slug}
                to="/$slug"
                params={{ slug: category.slug }}
                className="rounded-full border border-foreground/15 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.11em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 md:py-12 lg:px-12">
        <div className="flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
            role="group"
            aria-label="Filtrar productos por colección"
          >
            {[{ slug: "todo", name: "Todo" }, ...navCategories].map(({ slug, name }) => (
              <button
                key={slug}
                onClick={() => setFilter(slug)}
                aria-pressed={filter === slug}
                className={`border-b py-2 text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors ${filter === slug ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex min-w-0 items-center border border-border bg-background px-3 sm:w-56">
              <Search size={15} className="shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Buscar una pieza"
                aria-label="Buscar productos"
                className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-xs outline-none placeholder:text-muted-foreground"
              />
            </label>
            <label className="flex items-center gap-2 border border-border bg-background px-3">
              <SlidersHorizontal size={14} className="text-muted-foreground" aria-hidden="true" />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="bg-transparent py-2.5 text-xs outline-none"
                aria-label="Ordenar productos"
              >
                <option value="destacados">Destacados</option>
                <option value="asc">Precio: menor a mayor</option>
                <option value="desc">Precio: mayor a menor</option>
                <option value="az">Nombre: A–Z</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between py-5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          <span aria-live="polite">
            {list.length} {list.length === 1 ? "pieza" : "piezas"}
          </span>
          <span className="hidden sm:inline">Cosidas en pequeñas series</span>
        </div>
        {list.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 md:gap-y-14 lg:grid-cols-4">
            {list.map((product, i) => (
              <ProductCard key={product.slug} product={product} priority={i < 2} />
            ))}
          </div>
        ) : (
          <div className="grid min-h-64 place-items-center border-y border-border text-center">
            <div>
              <p className="font-display text-3xl">No encontramos esa pieza.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("todo");
                }}
                className="mt-3 border-b border-foreground pb-1 text-xs"
              >
                Quitar filtros
              </button>
            </div>
          </div>
        )}
        <ul className="mt-16 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
          {[
            "Diseñadas y cosidas a mano en España",
            "Personalización con nombre bordado en muchas piezas",
            `Envío gratis desde ${formatPrice(FREE_SHIPPING)} · Pago seguro con Shopify`,
          ].map((text, index) => (
            <li key={text} className="flex gap-3">
              <span className="font-display text-2xl text-accent-strong">0{index + 1}</span>
              <p className="pt-1.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
