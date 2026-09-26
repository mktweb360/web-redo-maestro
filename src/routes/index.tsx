import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Scissors, Sparkles, Truck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { getCategoryByName, posts, products } from "@/lib/catalog";
import taller from "@/assets/pingolino/taller.jpg";
import materiales from "@/assets/pingolino/materiales.jpg";
import bolsaPlayaHero from "@/assets/pingolino/bolsa-playa-hero.jpg";

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
  return (
    <SiteLayout>
      <section className="overflow-hidden bg-card">
        <div className="relative md:min-h-[690px] lg:min-h-[760px]">
          <img src={bolsaPlayaHero} alt="Bolsa de playa vichy de Pingolino Handmade junto a una piscina" className="aspect-video w-full object-cover object-center md:absolute md:inset-0 md:h-full md:aspect-auto" />
          <div className="relative bg-card px-5 py-12 md:flex md:min-h-[690px] md:w-[43%] md:items-end md:bg-gradient-to-r md:from-card md:from-80% md:to-transparent md:px-8 md:pb-16 lg:min-h-[760px] lg:w-[40%] lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-10 lg:pb-20">
            <div className="reveal-up max-w-lg">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Taller familiar artesanal · España</p>
              <h1 className="mt-5 font-display text-6xl leading-[0.86] md:text-[4.8rem] lg:text-[5.8rem]">
                Hecho a mano,<br/><em className="font-medium text-accent">pensado para crecer.</em>
              </h1>
              <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Piezas textiles únicas, cosidas con calma y personalizadas para acompañar a los más pequeños durante mucho tiempo.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                <Link to="/tienda" className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent">Descubrir la colección <ArrowRight size={15}/></Link>
                <Link to="/nosotros" className="inline-flex items-center border-b border-border pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent">Nuestra historia</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 text-sm lg:grid-cols-4 lg:px-8">
          {[
            [Scissors, "Cosido a mano, pieza a pieza"],
            [Sparkles, "Personalización con nombre"],
            [Heart, "Tejidos suaves y seguros"],
            [Truck, "Envío gratis desde 50 €"],
          ].map(([Icon, t], i) => {
            const I = Icon as typeof Heart;
            return <div key={i} className="flex items-center gap-3 border-l border-accent pl-4"><I size={19} className="shrink-0 text-accent" /><span>{t as string}</span></div>;
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Encuentra su pieza</p>
        <h2 className="mt-3 font-display text-5xl md:text-6xl">Compra por momento</h2>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {cats.map((c) => {
            const p = products.find((x) => x.slug === c.slug);
            const category = getCategoryByName(c.name);
            if (!p || !category) return null;
            return (
              <Link key={c.name} to="/tienda/categoria/$categoria" params={{ categoria: category.slug }} className="group relative aspect-[3/4] overflow-hidden">
                <img src={p.images[0]} alt={c.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-transparent p-5 pt-16 font-display text-3xl text-background">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Últimas creaciones</p><h2 className="mt-3 font-display text-5xl md:text-6xl">Novedades del taller</h2></div>
          <Link to="/tienda" className="text-sm underline underline-offset-4">Ver todo</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {products.slice(0, 8).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="mt-28 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 lg:px-8">
          <img src={taller} alt="Taller de Pingolino" className="aspect-[4/5] w-full object-cover" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] opacity-70">Nuestra historia</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.98] md:text-6xl">“Cada pieza sale de mis manos, con calma y cuidando cada detalle.”</h2>
            <p className="mt-6 opacity-80">Soy Sherezhade, mamá de tres. Aprendí a coser sola, por pura ilusión, y con el nacimiento de mi tercer hijo decidí convertir esa pasión en Pingolino.</p>
            <Link to="/nosotros" className="mt-8 inline-block border border-primary-foreground px-7 py-4 text-sm">Leer la historia completa</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 lg:px-8">
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

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
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
