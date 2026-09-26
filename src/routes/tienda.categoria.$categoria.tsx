import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getCategory, products, shopCategories } from "@/lib/catalog";

export const Route = createFileRoute("/tienda/categoria/$categoria")({
  loader: ({ params }) => {
    const category = getCategory(params.categoria);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Categoría no encontrada" }, { name: "robots", content: "noindex" }] };
    const { category } = loaderData;
    const url = `/tienda/categoria/${params.categoria}`;
    return {
      meta: [
        { title: `${category.title} — Pingolino Handmade` },
        { name: "description", content: category.metaDescription },
        { property: "og:title", content: `${category.title} — Pingolino Handmade` },
        { property: "og:description", content: category.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryNotFound() {
  return (
    <SiteLayout>
      <div className="px-5 py-32 text-center">
        <h1 className="font-display text-5xl">Esta colección no existe</h1>
        <Link to="/tienda" className="mt-6 inline-block border-b border-foreground pb-1">Ver toda la tienda</Link>
      </div>
    </SiteLayout>
  );
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const [sort, setSort] = useState("destacados");
  let list = products.filter((product) => product.category === category.name);
  if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <nav className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/">Inicio</Link> / <Link to="/tienda">Tienda</Link> / {category.name}
          </nav>
          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{category.eyebrow}</p>
          <div className="mt-4 grid items-end gap-6 md:grid-cols-[1fr_.7fr]">
            <h1 className="max-w-4xl font-display text-6xl leading-[0.9] md:text-8xl">{category.title}</h1>
            <p className="max-w-xl leading-relaxed text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <nav className="flex flex-wrap gap-x-5 gap-y-1" aria-label="Categorías de la tienda">
            <Link to="/tienda" className="border-b border-transparent px-1 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground hover:border-border hover:text-foreground">Todo</Link>
            {shopCategories.map((item) => (
              <Link key={item.slug} to="/tienda/categoria/$categoria" params={{ categoria: item.slug }}
                className={`border-b px-1 py-2 text-xs font-medium uppercase tracking-[0.12em] ${item.slug === category.slug ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"}`}>
                {item.name}
              </Link>
            ))}
          </nav>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="border border-border bg-background px-3 py-2 text-sm" aria-label="Ordenar productos">
            <option value="destacados">Destacados</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.14em] text-muted-foreground">{list.length} {list.length === 1 ? "producto" : "productos"}</p>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {list.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
        <div className="mt-20 max-w-3xl border-l border-accent pl-6">
          <h2 className="font-display text-4xl">Artesanía pensada para durar</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">Cada pieza Pingolino se corta y cose de forma artesanal en España. Trabajamos en pequeñas cantidades para cuidar los tejidos, los acabados y cada detalle de tu pedido.</p>
        </div>
      </section>
    </SiteLayout>
  );
}