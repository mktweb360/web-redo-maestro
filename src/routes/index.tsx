import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Scissors, Sparkles, Truck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { getCategory, posts, products, productsInCategory } from "@/lib/catalog";
import { seo } from "@/lib/seo";
import corona from "@/assets/pingolino/corona.jpg";
import neceser from "@/assets/pingolino/neceser.jpg";
import bolsaPlayaHero from "@/assets/pingolino/bolsa-playa-hero.webp";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Regalos personalizados para bebé hechos a mano | Pingolino",
      description:
        "Mantas y arrullos, mochilas de guardería, neceseres y coronas de cumpleaños cosidos a mano en España y personalizados con el nombre bordado.",
      path: "/",
    }),
  component: Home,
});

const featured = [
  "mantas-bebe-personalizadas",
  "mochilas-guarderia-personalizadas",
  "coronas-cumpleanos-personalizadas",
  "neceseres-portatoallitas-bebe",
].flatMap((slug) => {
  const c = getCategory(slug);
  const first = c ? productsInCategory(c)[0] : undefined;
  return c && first ? [{ category: c, image: first.images[0] }] : [];
});

function Home() {
  return (
    <SiteLayout>
      <section className="overflow-hidden bg-card">
        <div className="relative md:min-h-[690px] lg:min-h-[760px]">
          <img
            src={bolsaPlayaHero}
            alt="Bolsa de playa vichy de Pingolino Handmade junto a una piscina"
            width={1376}
            height={768}
            fetchPriority="high"
            className="aspect-video w-full object-cover object-center md:absolute md:inset-0 md:h-full md:aspect-auto"
          />
          <div className="relative bg-card px-5 py-12 md:flex md:min-h-[690px] md:w-[43%] md:items-end md:bg-gradient-to-r md:from-card md:from-80% md:to-transparent md:px-8 md:pb-16 lg:min-h-[760px] lg:w-[40%] lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-10 lg:pb-20">
            <div className="reveal-up max-w-lg">
              <h1 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
                Regalos personalizados para bebé · Hechos a mano en España
              </h1>
              <p className="mt-5 font-display text-6xl leading-[0.86] md:text-[4.8rem] lg:text-[5.8rem]">
                Hecho a mano,
                <br />
                <em className="font-medium text-accent-strong">pensado para crecer.</em>
              </p>
              <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Piezas textiles únicas, cosidas con calma y personalizadas para acompañar a los más
                pequeños durante mucho tiempo.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                <Link
                  to="/tienda"
                  className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent-strong"
                >
                  Descubrir la colección <ArrowRight size={15} />
                </Link>
                <Link
                  to="/nosotros"
                  className="inline-flex items-center border-b border-border pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent-strong"
                >
                  Nuestra historia
                </Link>
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
            return (
              <div key={i} className="flex items-center gap-3 border-l border-accent pl-4">
                <I size={19} className="shrink-0 text-accent-strong" />
                <span>{t as string}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
          Encuentra su pieza
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Compra por momento</h2>
          <Link
            to="/$slug"
            params={{ slug: "regalos-personalizados-bebe" }}
            className="text-sm underline underline-offset-4"
          >
            Ideas de regalo personalizado
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {featured.map(({ category, image }) => (
            <Link
              key={category.slug}
              to="/$slug"
              params={{ slug: category.slug }}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={image}
                alt={category.title}
                loading="lazy"
                decoding="async"
                width={600}
                height={800}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-transparent p-5 pt-16 font-display text-2xl leading-tight text-background md:text-3xl">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
              Últimas creaciones
            </p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">Novedades del taller</h2>
          </div>
          <Link to="/tienda" className="text-sm underline underline-offset-4">
            Ver todo
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-28 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 lg:px-8">
          <img
            src={corona}
            alt="Corona de cumpleaños de tela con número y nombre bordado, de Pingolino Handmade"
            loading="lazy"
            decoding="async"
            width={1200}
            height={1600}
            className="aspect-[4/5] w-full object-cover"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] opacity-70">Nuestra historia</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.98] md:text-6xl">
              “Cada pieza sale de mis manos, con calma y cuidando cada detalle.”
            </h2>
            <p className="mt-6 opacity-80">
              Soy Sherezhade, mamá de tres. Aprendí a coser sola, por pura ilusión, y con el
              nacimiento de mi tercer hijo decidí convertir esa pasión en Pingolino.
            </p>
            <Link
              to="/nosotros"
              className="mt-8 inline-block border border-primary-foreground px-7 py-4 text-sm"
            >
              Leer la historia completa
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-5xl">Personalízalo en tres pasos</h2>
          <ol className="mt-8 space-y-6">
            {[
              "Elige tu pieza personalizable.",
              "Escribe el nombre que quieres bordar.",
              "La cosemos a mano y te la enviamos.",
            ].map((s, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-display text-4xl text-accent-strong">0{i + 1}</span>
                <p className="pt-2">{s}</p>
              </li>
            ))}
          </ol>
        </div>
        <img
          src={neceser}
          alt="Neceser de vichy amarillo con el nombre Lucía bordado"
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
          className="aspect-[4/3] w-full object-cover"
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-5xl">Del blog</h2>
          <Link to="/blog" className="text-sm underline underline-offset-4">
            Todos los artículos
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="mt-4 text-xs uppercase tracking-widest text-accent-strong">
                {p.category}
              </p>
              <h3 className="mt-2 font-display text-2xl group-hover:text-primary">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
