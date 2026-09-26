import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import { formatPrice, getCategory, getCategoryByName, getProduct, products, shopCategories } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (category) return { kind: "category" as const, category };
    const product = getProduct(params.slug);
    if (product) return { kind: "product" as const, product };
    throw notFound();
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Página no encontrada — Pingolino Handmade" },
          { name: "description", content: "La página que buscas no está disponible." },
          { property: "og:title", content: "Página no encontrada — Pingolino Handmade" },
          { property: "og:description", content: "La página que buscas no está disponible." },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const url = `/${params.slug}`;
    if (loaderData.kind === "category") {
      const { category } = loaderData;
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
    }
    const product = loaderData.product;
    const description = product.description[1] ?? product.description[0] ?? product.name;
    return {
      meta: [
        { title: `${product.name} — Pingolino Handmade` },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — Pingolino Handmade` },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: CatalogNotFound,
  component: CatalogPage,
});

function CatalogNotFound() {
  return (
    <SiteLayout>
      <div className="px-5 py-32 text-center">
        <h1 className="font-display text-5xl">Esta página no existe</h1>
        <Link to="/tienda" className="mt-6 inline-block border-b border-foreground pb-1">Ver toda la tienda</Link>
      </div>
    </SiteLayout>
  );
}

function CatalogPage() {
  const data = Route.useLoaderData();
  return data.kind === "category" ? <CategoryPage category={data.category} /> : <ProductPage product={data.product} />;
}

function CategoryPage({ category }: { category: (typeof shopCategories)[number] }) {
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
              <Link key={item.slug} to="/$slug" params={{ slug: item.slug }}
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

function ProductPage({ product: p }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const cart = useCart();
  const category = getCategoryByName(p.category);
  const related = products.filter((item) => item.slug !== p.slug && item.category === p.category).concat(products.filter((item) => item.category !== p.category)).slice(0, 4);
  const [lead, ...rest] = p.description;
  const bullets = rest.filter((text) => text.length < 70);
  const paragraphs = rest.filter((text) => text.length >= 70);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <nav className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Inicio</Link> / <Link to="/tienda">Tienda</Link> / {category ? <Link to="/$slug" params={{ slug: category.slug }}>{p.category}</Link> : p.category}
        </nav>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-20">
          <div>
            <img key={img} src={p.images[img]} alt={p.name} className="aspect-[4/5] w-full bg-muted object-cover" />
            {p.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {p.images.map((src, index) => (
                  <button key={src} onClick={() => setImg(index)} aria-label={`Ver foto ${index + 1}`} className={`aspect-square overflow-hidden ${index === img ? "ring-2 ring-primary" : "opacity-70"}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{p.category}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.98] md:text-6xl">{p.name}</h1>
            {p.subtitle && <p className="mt-2 text-muted-foreground">{p.subtitle}</p>}
            <p className="mt-6 text-xl">{formatPrice(p.price)}</p>
            <p className="mt-7 border-t border-border pt-6 leading-relaxed text-muted-foreground">{lead}</p>

            {p.personalizable && (
              <label className="mt-8 block">
                <span className="text-sm font-medium">Nombre a bordar (opcional)</span>
                <input value={name} maxLength={14} onChange={(event) => setName(event.target.value)} placeholder="Ej.: Lucía"
                  className="mt-2 w-full border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                <span className="mt-1 block text-xs text-muted-foreground">Máximo 14 caracteres. Revisamos cada bordado antes de enviarlo.</span>
              </label>
            )}

            <div className="mt-6 flex gap-3">
              <div className="flex items-center gap-4 border border-input px-4">
                <button aria-label="Menos" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button>
                <span>{qty}</span>
                <button aria-label="Más" onClick={() => setQty(qty + 1)}><Plus size={14} /></button>
              </div>
              <button disabled={!p.available} onClick={() => cart.add(p.slug, qty, name.trim() || undefined)}
                className="flex-1 bg-primary py-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-foreground disabled:opacity-40">
                {p.available ? `Añadir a la cesta · ${formatPrice(p.price * qty)}` : "Agotado — avísame"}
              </button>
            </div>

            <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
              {["Hecho a mano en España", "Envío gratis desde 50 €", "Empaquetado listo para regalar"].map((text) => (
                <li key={text} className="flex items-center gap-2"><Check size={16} className="text-primary" />{text}</li>
              ))}
            </ul>

            <details className="mt-6 border-t border-border pt-4" open>
              <summary className="cursor-pointer font-medium">Descripción</summary>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {paragraphs.map((text, index) => <p key={index}>{text}</p>)}
              </div>
            </details>
            {bullets.length > 0 && (
              <details className="mt-4 border-t border-border pt-4">
                <summary className="cursor-pointer font-medium">Características</summary>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}</ul>
              </details>
            )}
            <details className="mt-4 border-y border-border py-4">
              <summary className="cursor-pointer font-medium">Envío y cuidados</summary>
              <p className="mt-3 text-sm text-muted-foreground">Al ser piezas cosidas por encargo, preparamos tu pedido en pocos días. Lavar a mano o en programa delicado a 30 °C.</p>
            </details>
          </div>
        </div>

        <section className="mt-28 border-t border-border pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Sigue descubriendo</p>
          <h2 className="mt-3 font-display text-5xl">También te puede gustar</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((item) => <ProductCard key={item.slug} product={item} />)}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}