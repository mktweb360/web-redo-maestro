import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Scissors, Sparkles, Truck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { posts, products } from "@/lib/catalog";
import taller from "@/assets/pingolino/taller.jpg";
import materiales from "@/assets/pingolino/materiales.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pingolino Handmade — Artesanía textil para bebés y familias" },
      { name: "description", content: "Mantas, mochilas, neceseres y coronas hechas a mano en España y personalizadas con el nombre de tu peque." },
      { property: "og:title", content: "Pingolino Handmade — Hecho a mano, pensado para crecer" },
      { property: "og:description", content: "Piezas textiles artesanales y personalizadas para acompañar momentos importantes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const cats = [
  { name: "Mantas", slug: "manta-arrullo-volantes-rosa" },
  { name: "Mochilas", slug: "mochila-infantil-algodon" },
  { name: "Bolsos", slug: "bolsa-playa-vichy" },
  { name: "Celebraciones", slug: "corona-cumpleanos-personalizada" },
];

function Home() {
  const hero = products.find((p) => p.slug === "manta-arrullo-volantes-rosa")!;
  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Taller familiar · Hecho en España</p>
          <h1 className="mt-5 font-display text-6xl leading-[0.95] md:text-8xl">
            Hecho a mano, <em className="text-primary">pensado para crecer.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Mantas, mochilas y accesorios cosidos uno a uno, con tejidos suaves y el nombre de tu peque bordado. Piezas que se usan cada día y se guardan para siempre.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/tienda" className="bg-primary px-7 py-4 text-sm text-primary-foreground">Descubrir la tienda</Link>
            <Link to="/nosotros" className="border border-foreground px-7 py-4 text-sm">Conocer a Sherezhade</Link>
          </div>
        </div>
        <div className="relative">
          <img src={hero.images[0]} alt={hero.name} className="aspect-[4/5] w-full object-cover" />
          <div className="absolute -bottom-6 -left-4 bg-background p-5 shadow-lg md:-left-10">
            <p className="font-display text-2xl">{hero.name}</p>
            <p className="text-sm text-muted-foreground">Con nombre bordado</p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 text-sm md:grid-cols-4">
          {[
            [Scissors, "Cosido a mano, pieza a pieza"],
            [Sparkles, "Personalización con nombre"],
            [Heart, "Tejidos suaves y seguros"],
            [Truck, "Envío gratis desde 50 €"],
          ].map(([Icon, t], i) => {
            const I = Icon as typeof Heart;
            return <div key={i} className="flex items-center gap-3"><I size={20} className="text-accent" />{t as string}</div>;
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="font-display text-5xl">Compra por momento</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {cats.map((c) => {
            const p = products.find((x) => x.slug === c.slug)!;
            return (
              <Link key={c.name} to="/tienda" search={{ categoria: c.name }} className="group relative aspect-[3/4] overflow-hidden">
                <img src={p.images[0]} alt={c.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 p-5 font-display text-3xl text-background">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-5xl">Novedades del taller</h2>
          <Link to="/tienda" className="text-sm underline underline-offset-4">Ver todo</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {products.slice(0, 8).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="mt-24 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
          <img src={taller} alt="Taller de Pingolino" className="aspect-square w-full object-cover" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] opacity-70">Nuestra historia</p>
            <h2 className="mt-4 font-display text-5xl leading-tight">“Cada pieza sale de mis manos, con calma y cuidando cada detalle.”</h2>
            <p className="mt-6 opacity-80">Soy Sherezhade, mamá de tres. Aprendí a coser sola, por pura ilusión, y con el nacimiento de mi tercer hijo decidí convertir esa pasión en Pingolino.</p>
            <Link to="/nosotros" className="mt-8 inline-block border border-primary-foreground px-7 py-4 text-sm">Leer la historia completa</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-5xl">Personalízalo en tres pasos</h2>
          <ol className="mt-8 space-y-6">
            {["Elige tu pieza y el tejido que más te guste.", "Escribe el nombre que quieres bordar.", "La cosemos a mano y te la enviamos lista para regalar."].map((s, i) => (
              <li key={i} className="flex gap-5"><span className="font-display text-4xl text-accent">0{i + 1}</span><p className="pt-2">{s}</p></li>
            ))}
          </ol>
        </div>
        <img src={materiales} alt="Tejidos y materiales" className="aspect-[4/3] w-full object-cover" />
      </section>

      <section className="mx-auto max-w-7xl px-5">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-5xl">Del blog</h2>
          <Link to="/blog" className="text-sm underline underline-offset-4">Todos los artículos</Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover" />
              <p className="mt-4 text-xs uppercase tracking-widest text-accent">{p.category}</p>
              <h3 className="mt-2 font-display text-2xl group-hover:text-primary">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
