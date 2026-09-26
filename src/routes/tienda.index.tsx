import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { products, shopCategories } from "@/lib/catalog";

export const Route = createFileRoute("/tienda/")({
  head: () => ({
    meta: [
      { title: "Tienda — Pingolino Handmade" },
      { name: "description", content: "Mantas para bebé, mochilas infantiles, bolsos, neceseres y coronas de cumpleaños hechos a mano y personalizables." },
      { property: "og:title", content: "Tienda — Pingolino Handmade" },
      { property: "og:description", content: "Todo el catálogo artesanal de Pingolino, con precios y personalización." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/tienda" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tienda" }],
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
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Colección artesanal</p>
          <div className="mt-4 grid items-end gap-6 md:grid-cols-[1fr_.7fr]">
            <h1 className="font-display text-6xl leading-none md:text-8xl">La tienda</h1>
            <p className="max-w-xl leading-relaxed text-muted-foreground">Cada pieza se cose por encargo en nuestro taller. Muchas se pueden personalizar con el nombre que elijas.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <div className="flex flex-wrap gap-2">
             <Link to="/tienda" className="border-b border-foreground px-1 py-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground">Todo</Link>
             {shopCategories.map((category) => (
               <Link key={category.slug} to="/$slug" params={{ slug: category.slug }}
                 className="border-b border-transparent px-1 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground hover:border-border hover:text-foreground">
                 {category.name}
               </Link>
             ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-border bg-background px-3 py-2 text-sm" aria-label="Ordenar">
            <option value="destacados">Destacados</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.14em] text-muted-foreground">{list.length} productos</p>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </SiteLayout>
  );
}
