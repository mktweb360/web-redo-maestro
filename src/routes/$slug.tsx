import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
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
    if (!loaderData) return { meta: [{ title: "Página no encontrada — Pingolino Handmade" }, { name: "robots", content: "noindex" }] };
    const url = `/${params.slug}`;
    if (loaderData.kind === "category") {
      const category = loaderData.category;
      return { meta: [
        { title: `${category.title} — Pingolino Handmade` },
        { name: "description", content: category.metaDescription },
        { property: "og:title", content: `${category.title} — Pingolino Handmade` },
        { property: "og:description", content: category.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ], links: [{ rel: "canonical", href: url }] };
    }
    const product = loaderData.product;
    const description = product.description[1] ?? product.description[0] ?? product.name;
    return { meta: [
      { title: `${product.name} — Pingolino Handmade` },
      { name: "description", content: description.slice(0, 155) },
      { property: "og:title", content: `${product.name} — Pingolino Handmade` },
      { property: "og:description", content: description.slice(0, 155) },
      { property: "og:type", content: "product" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ], links: [{ rel: "canonical", href: url }] };
  },
  notFoundComponent: CatalogNotFound,
  component: CatalogPage,
});

function CatalogNotFound() {
  return <SiteLayout><div className="px-5 py-32 text-center"><p className="section-kicker">404 · Esta página no está por aquí</p><h1 className="mt-4 font-display text-5xl">Quizá la encontremos en la tienda.</h1><Link to="/tienda" className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs">Ver toda la tienda <ArrowRight size={14} /></Link></div></SiteLayout>;
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
  const image = list[0]?.images[0];

  return (
    <SiteLayout>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-[1440px] items-center gap-7 px-5 py-10 sm:px-8 md:grid-cols-[1.1fr_.9fr] md:py-14 lg:px-12 lg:py-16">
          <div>
            <nav className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground"><Link to="/">Inicio</Link><span className="mx-2 text-accent">/</span><Link to="/tienda">Tienda</Link><span className="mx-2 text-accent">/</span>{category.name}</nav>
            <p className="mt-9 section-kicker">{category.eyebrow}</p>
            <h1 className="mt-3 max-w-2xl font-display text-5xl leading-[0.87] tracking-tight sm:text-6xl md:text-7xl">{category.title}</h1>
            <p className="mt-5 max-w-xl text-sm leading-[1.8] text-muted-foreground">{category.description}</p>
            <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.15em]">Cosido en pequeñas series · España</p>
          </div>
          <div className="relative grid aspect-[1.24/1] place-items-center overflow-hidden bg-background/55 p-4 md:aspect-[1.05/1]">
            {image && <img src={image} alt={`Pieza de la colección ${category.name}`} className="h-full w-full object-contain" />}
            <span className="absolute bottom-3 left-3 bg-background/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em]">Colección {category.name}</span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 md:py-12 lg:px-12">
        <nav className="flex gap-2 overflow-x-auto border-b border-border pb-4" aria-label="Otras colecciones">
          {shopCategories.map((item) => <Link key={item.slug} to="/$slug" params={{ slug: item.slug }} className={`shrink-0 rounded-full border px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.11em] transition-colors ${item.slug === category.slug ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{item.name}</Link>)}
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span>{list.length} {list.length === 1 ? "pieza" : "piezas"}</span><label className="flex items-center gap-2">Ordenar <select value={sort} onChange={(event) => setSort(event.target.value)} className="border border-border bg-background px-2 py-2 text-xs text-foreground" aria-label="Ordenar productos"><option value="destacados">Destacados</option><option value="asc">Precio: menor a mayor</option><option value="desc">Precio: mayor a menor</option></select></label></div>
        {list.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 md:gap-y-14 lg:grid-cols-4">{list.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <p className="border-y border-border py-16 text-center text-sm text-muted-foreground">Estamos preparando nuevas piezas para esta colección.</p>}
        <div className="mt-16 grid gap-6 border-t border-border pt-8 md:grid-cols-[.8fr_1.2fr] md:items-start"><p className="font-display text-3xl">Lo cotidiano también merece belleza.</p><p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">Cada pieza se corta y cose de forma artesanal en España. Trabajamos con calma para cuidar los tejidos, los acabados y cada detalle del pedido.</p></div>
      </section>
    </SiteLayout>
  );
}

function ProductPage({ product }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const cart = useCart();
  const category = getCategoryByName(product.category);
  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).concat(products.filter((item) => item.category !== product.category)).slice(0, 4);
  const [lead, ...details] = product.description;
  const bulletPoints = details.filter((text) => text.length < 70);
  const paragraphs = details.filter((text) => text.length >= 70);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 md:py-10 lg:px-12">
        <nav className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground"><Link to="/">Inicio</Link><span className="mx-2 text-accent">/</span><Link to="/tienda">Tienda</Link><span className="mx-2 text-accent">/</span>{category ? <Link to="/$slug" params={{ slug: category.slug }}>{category.name}</Link> : product.category}</nav>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="min-w-0">
            <div className="grid aspect-[4/4.5] place-items-center overflow-hidden bg-secondary/65 p-4 sm:p-8"><img key={imageIndex} src={product.images[imageIndex]} alt={product.name} className="h-full w-full object-contain" fetchPriority="high" /></div>
            {product.images.length > 1 && <div className="mt-3 grid grid-cols-5 gap-2">{product.images.slice(0, 5).map((src, index) => <button key={src} onClick={() => setImageIndex(index)} aria-label={`Ver foto ${index + 1} de ${product.name}`} aria-pressed={index === imageIndex} className={`aspect-square overflow-hidden bg-secondary/65 p-1 transition-opacity ${index === imageIndex ? "ring-1 ring-primary" : "opacity-70 hover:opacity-100"}`}><img src={src} alt="" className="h-full w-full object-contain" loading="lazy" /></button>)}</div>}
          </div>
          <div className="lg:sticky lg:top-[108px] lg:self-start lg:py-3">
            <p className="section-kicker">{product.category} · Confeccionado en España</p>
            <h1 className="mt-3 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">{product.name}</h1>
            {product.subtitle && <p className="mt-3 text-sm text-muted-foreground">{product.subtitle}</p>}
            <p className="mt-6 text-lg font-medium">{formatPrice(product.price)}</p>
            <p className="mt-5 border-t border-border pt-5 text-sm leading-[1.8] text-muted-foreground">{lead}</p>
            {product.personalizable && <label className="mt-7 block"><span className="text-xs font-semibold uppercase tracking-[0.12em]">¿Qué nombre bordamos? <span className="font-normal normal-case tracking-normal text-muted-foreground">(opcional)</span></span><input value={name} maxLength={14} onChange={(event) => setName(event.target.value)} placeholder="Escribe aquí el nombre" className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" /><span className="mt-1.5 block text-[10px] text-muted-foreground">Hasta 14 caracteres. Comprueba la escritura antes de añadirla.</span></label>}
            <div className="mt-6 flex gap-3">
              <div className="flex h-12 items-center gap-4 border border-input px-3"><button aria-label="Restar una unidad" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><span className="min-w-4 text-center text-sm">{quantity}</span><button aria-label="Sumar una unidad" onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button></div>
              <button disabled={!product.available} onClick={() => cart.add(product.slug, quantity, name.trim() || undefined)} className="flex-1 bg-primary px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-45">{product.available ? `Añadir a la cesta · ${formatPrice(product.price * quantity)}` : "Agotado"}</button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 border-y border-border py-4 text-[10px] uppercase tracking-[0.1em] text-muted-foreground"><span className="flex items-center gap-2"><Check size={14} className="text-primary" /> Hecho a mano</span><span className="flex items-center gap-2"><Check size={14} className="text-primary" /> Desde 50 € envío gratis</span></div>
            <details className="mt-5 border-b border-border pb-4" open><summary className="cursor-pointer font-display text-2xl">La pieza</summary><div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{paragraphs.map((text, index) => <p key={index}>{text}</p>)}</div></details>
            {bulletPoints.length > 0 && <details className="border-b border-border py-4"><summary className="cursor-pointer font-display text-2xl">Detalles</summary><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">{bulletPoints.map((text, index) => <li key={index}>{text}</li>)}</ul></details>}
            <details className="border-b border-border py-4"><summary className="cursor-pointer font-display text-2xl">Envíos y cuidados</summary><p className="mt-3 text-sm leading-relaxed text-muted-foreground">La información de envíos, devoluciones y cuidados está pendiente de confirmación con Pingolino. Consulta la página de ayuda antes de publicar.</p></details>
          </div>
        </div>
        <section className="mt-16 border-t border-border pt-10 md:mt-24 md:pt-14">
          <p className="section-kicker">Seguir descubriendo</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Otras piezas del taller</h2>
          <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div>
        </section>
      </div>
    </SiteLayout>
  );
}
