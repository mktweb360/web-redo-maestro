import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/lib/catalog";

export const Route = createFileRoute("/tienda/")({
  validateSearch: z.object({ categoria: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Tienda — Pingolino Handmade" },
      { name: "description", content: "Mantas para bebé, mochilas infantiles, bolsos, neceseres y coronas de cumpleaños hechos a mano y personalizables." },
      { property: "og:title", content: "Tienda — Pingolino Handmade" },
      { property: "og:description", content: "Todo el catálogo artesanal de Pingolino, con precios y personalización." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { categoria = "Todo" } = Route.useSearch();
  const [sort, setSort] = useState("destacados");
  let list = categoria === "Todo" ? products : products.filter((p) => p.category === categoria);
  if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 py-14">
        <h1 className="font-display text-6xl md:text-7xl">La tienda</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">Cada pieza se cose por encargo en nuestro taller. Muchas se pueden personalizar con el nombre que elijas.</p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c} to="/tienda" search={c === "Todo" ? {} : { categoria: c }}
                className={`px-4 py-2 text-sm ${c === categoria ? "bg-foreground text-background" : "border border-border hover:border-foreground"}`}>
                {c}
              </Link>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-border bg-background px-3 py-2 text-sm" aria-label="Ordenar">
            <option value="destacados">Destacados</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{list.length} productos</p>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </SiteLayout>
  );
}
