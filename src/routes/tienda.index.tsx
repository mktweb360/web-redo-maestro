import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { products, shopCategories } from "@/lib/catalog";

export const Route = createFileRoute("/tienda/")({
  head: () => ({
    meta: [
      { title: "Tienda artesanal — Pingolino Handmade" },
      { name: "description", content: "Descubre el catálogo Pingolino: mantas, mochilas, bolsos, accesorios de paseo y piezas personalizadas hechas a mano." },
      { property: "og:title", content: "Tienda artesanal — Pingolino Handmade" },
      { property: "og:description", content: "Pequeñas piezas textiles, cosidas una a una en nuestro taller." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tienda" }],
  }),
  component: Shop,
});

function Shop() {
  const [sort, setSort] = useState("destacados");
  const [filter, setFilter] = useState("Todo");
  const [query, setQuery] = useState("");
  const list = useMemo(() => {
    let result = products.filter((product) => filter === "Todo" || product.category === filter);
    const term = query.trim().toLocaleLowerCase("es");
    if (term) result = result.filter((product) => `${product.name} ${product.subtitle} ${product.category}`.toLocaleLowerCase("es").includes(term));
    if (sort === "asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "az") result = [...result].sort((a, b) => a.name.localeCompare(b.name, "es"));
    return result;
  }, [filter, query, sort]);

  return (
    <SiteLayout>
      <section className="bg-secondary">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-[72px] lg:px-12">
          <p className="section-kicker">Piezas que cuentan una historia</p>
          <div className="mt-4 grid items-end gap-5 md:grid-cols-[1fr_.58fr] md:gap-10">
            <h1 className="font-display text-6xl leading-[0.82] tracking-tight sm:text-7xl md:text-8xl">La tienda<br /><i className="font-medium text-primary">de Pingolino.</i></h1>
            <p className="max-w-md pb-1 text-sm leading-[1.8] text-muted-foreground sm:text-base">Costura lenta, tejidos elegidos con mimo y detalles pensados para acompañar la vida real. Hecho en pequeñas cantidades, en España.</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {shopCategories.map((category) => (
              <Link key={category.slug} to="/$slug" params={{ slug: category.slug }} className="rounded-full border border-foreground/15 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.11em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">{category.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 md:py-12 lg:px-12">
        <div className="flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Filtrar productos por categoría">
            {["Todo", ...shopCategories.map((category) => category.name)].map((name) => (
              <button key={name} onClick={() => setFilter(name)} className={`border-b py-2 text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors ${filter === name ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{name}</button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex min-w-0 items-center border border-border bg-background px-3 sm:w-56">
              <Search size={15} className="shrink-0 text-muted-foreground" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar una pieza" aria-label="Buscar productos" className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-xs outline-none placeholder:text-muted-foreground" />
            </label>
            <label className="flex items-center gap-2 border border-border bg-background px-3"><SlidersHorizontal size={14} className="text-muted-foreground" /><select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent py-2.5 text-xs outline-none" aria-label="Ordenar productos"><option value="destacados">Destacados</option><option value="asc">Precio: menor a mayor</option><option value="desc">Precio: mayor a menor</option><option value="az">Nombre: A–Z</option></select></label>
          </div>
        </div>
        <div className="flex items-center justify-between py-5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span>{list.length} {list.length === 1 ? "pieza" : "piezas"}</span><span className="hidden sm:inline">Cosidas en pequeñas series</span></div>
        {list.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 md:gap-y-14 lg:grid-cols-4">
            {list.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        ) : (
          <div className="grid min-h-64 place-items-center border-y border-border text-center">
            <div><p className="font-display text-3xl">No encontramos esa pieza.</p><button onClick={() => { setQuery(""); setFilter("Todo"); }} className="mt-3 border-b border-foreground pb-1 text-xs">Quitar filtros</button></div>
          </div>
        )}
        <div className="mt-16 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
          {["Diseñadas y cosidas aquí", "Personalización en algunas piezas", "Envío gratuito desde 50 €"].map((text, index) => <div key={text} className="flex gap-3"><span className="font-display text-2xl text-accent">0{index + 1}</span><p className="pt-1.5 text-xs leading-relaxed text-muted-foreground">{text}</p></div>)}
        </div>
      </section>
    </SiteLayout>
  );
}
