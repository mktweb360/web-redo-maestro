import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { formatPrice, getProduct, products } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/tienda/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Producto no encontrado" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const d = p.description[1] ?? p.description[0] ?? p.name;
    return {
      meta: [
        { title: `${p.name} — Pingolino Handmade` },
        { name: "description", content: d.slice(0, 155) },
        { property: "og:title", content: `${p.name} — Pingolino Handmade` },
        { property: "og:description", content: d.slice(0, 155) },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-5xl">Este producto ya no está disponible</h1>
        <Link to="/tienda" className="mt-6 inline-block underline">Volver a la tienda</Link>
      </div>
    </SiteLayout>
  );
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const cart = useCart();
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).concat(products.filter((x) => x.category !== p.category)).slice(0, 4);
  const [lead, ...rest] = p.description;
  const bullets = rest.filter((t) => t.length < 70);
  const paras = rest.filter((t) => t.length >= 70);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-5 py-10">
        <nav className="text-xs text-muted-foreground">
          <Link to="/">Inicio</Link> / <Link to="/tienda">Tienda</Link> / <Link to="/tienda" search={{ categoria: p.category }}>{p.category}</Link>
        </nav>
        <div className="mt-6 grid gap-12 md:grid-cols-2">
          <div>
            <img key={img} src={p.images[img]} alt={p.name} className="aspect-[4/5] w-full object-cover" />
            {p.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {p.images.map((src, i) => (
                  <button key={src} onClick={() => setImg(i)} aria-label={`Ver foto ${i + 1}`} className={`aspect-square overflow-hidden ${i === img ? "ring-2 ring-primary" : "opacity-70"}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-xs uppercase tracking-widest text-accent">{p.category}</p>
            <h1 className="mt-3 font-display text-5xl leading-tight">{p.name}</h1>
            {p.subtitle && <p className="mt-2 text-muted-foreground">{p.subtitle}</p>}
            <p className="mt-5 text-2xl">{formatPrice(p.price)}</p>
            <p className="mt-6 leading-relaxed">{lead}</p>

            {p.personalizable && (
              <label className="mt-8 block">
                <span className="text-sm font-medium">Nombre a bordar (opcional)</span>
                <input value={name} maxLength={14} onChange={(e) => setName(e.target.value)} placeholder="Ej.: Lucía"
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
                className="flex-1 bg-primary py-4 text-sm text-primary-foreground disabled:opacity-40">
                {p.available ? `Añadir a la cesta · ${formatPrice(p.price * qty)}` : "Agotado — avísame"}
              </button>
            </div>

            <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
              {["Hecho a mano en España", "Envío gratis desde 50 €", "Empaquetado listo para regalar"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check size={16} className="text-primary" />{t}</li>
              ))}
            </ul>

            <details className="mt-6 border-t border-border pt-4" open>
              <summary className="cursor-pointer font-medium">Descripción</summary>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {paras.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </details>
            {bullets.length > 0 && (
              <details className="mt-4 border-t border-border pt-4">
                <summary className="cursor-pointer font-medium">Características</summary>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
              </details>
            )}
            <details className="mt-4 border-y border-border py-4">
              <summary className="cursor-pointer font-medium">Envío y cuidados</summary>
              <p className="mt-3 text-sm text-muted-foreground">Al ser piezas cosidas por encargo, preparamos tu pedido en pocos días. Lavar a mano o en programa delicado a 30 °C.</p>
            </details>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="font-display text-4xl">También te puede gustar</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((r) => <ProductCard key={r.slug} product={r} />)}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
