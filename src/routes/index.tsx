import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, Heart, Scissors, Sparkles, Truck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import {
  FREE_SHIPPING,
  formatDate,
  formatPrice,
  getProduct,
  posts,
  productImage,
  productSrcSet,
  productsInCategory,
  readingTime,
  shopCategories,
} from "@/lib/catalog";
import { seo } from "@/lib/seo";
import neceser from "@/assets/pingolino/neceser.jpg";
import corona from "@/assets/pingolino/corona.jpg";
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

const craftNotes = [
  { icon: Scissors, title: "Una a una", text: "Cada pieza pasa por las manos de Sherezhade." },
  { icon: Sparkles, title: "Con su nombre", text: "Muchas se bordan con el nombre que elijas." },
  { icon: Heart, title: "Para vivirlas", text: "Textiles pensados para acompañar lo cotidiano." },
  { icon: Truck, title: "Envío gratis", text: `En pedidos desde ${formatPrice(FREE_SHIPPING)}.` },
];

const categoryTiles = shopCategories
  .filter((c) => c.inShopNav)
  .flatMap((category) => {
    const first = productsInCategory(category)[0];
    return first ? [{ category, image: first.images[0] }] : [];
  });

const featured = [
  "arrullo-bebe-personalizado-volantes-rosa",
  "mochila-guarderia-personalizada-nombre",
  "corona-cumpleanos-personalizada-tela",
  "portatoallitas-portapanales-bebe",
].flatMap((slug) => {
  const p = getProduct(slug);
  return p ? [p] : [];
});

function Home() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-5 sm:px-8 md:pb-16 md:pt-8 lg:px-12 lg:pt-10">
        <div className="grid items-center gap-7 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 xl:gap-16">
          <div className="order-2 max-w-xl pb-4 lg:order-1 lg:py-12">
            <h1 className="eyebrow-label">
              <span className="eyebrow-dot" aria-hidden="true" /> Regalos personalizados para bebé ·
              Hechos a mano en España
            </h1>
            <p className="mt-5 font-display text-[clamp(3.35rem,7.6vw,7rem)] leading-[0.79] tracking-[-0.045em]">
              Hecho para
              <br />
              <i className="font-medium text-primary">acompañar.</i>
            </p>
            <p className="mt-7 max-w-md text-[15px] leading-[1.75] text-muted-foreground sm:text-base">
              Mantas, mochilas de guardería, neceseres y coronas de cumpleaños cosidos despacio en
              un pequeño taller, muchos con el nombre bordado. Para estar en medio de los vuestros
              días.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                to="/tienda"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Ver las piezas <ArrowRight size={15} />
              </Link>
              <Link
                to="/$slug"
                params={{ slug: "regalos-personalizados-bebe" }}
                className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:text-accent-strong"
              >
                Ideas de regalo
              </Link>
            </div>
            <div className="mt-9 flex items-center gap-3 border-t border-border/80 pt-5">
              <div className="flex -space-x-2" aria-hidden="true">
                <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-secondary font-display text-sm">
                  p
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-cover-accent/50 font-display text-sm italic">
                  h
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-primary/15 text-[9px]">
                  ✦
                </span>
              </div>
              <p className="text-[11px] leading-snug text-muted-foreground">
                Un nombre bordado.
                <br />
                <span className="font-medium text-foreground">Una pieza que ya es suya.</span>
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="hero-photo-frame relative aspect-[4/3] overflow-hidden bg-secondary/80 p-2.5 sm:p-4 md:p-5">
              <img
                src={bolsaPlayaHero}
                alt="Bolsa de playa de cuadros vichy cosida a mano por Pingolino Handmade"
                width={1376}
                height={768}
                fetchPriority="high"
                className="h-full w-full object-contain"
              />
              <span className="absolute bottom-5 left-5 bg-background/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm md:bottom-7 md:left-7">
                Piezas para vivirlas
              </span>
              <Link
                to="/$slug"
                params={{ slug: "bolsa-playa-vichy-grande" }}
                className="absolute bottom-5 right-5 grid size-11 place-items-center rounded-full bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:bottom-7 md:right-7"
                aria-label="Ver la bolsa de playa grande de vichy"
              >
                <ArrowDownRight size={19} strokeWidth={1.5} />
              </Link>
            </div>
            <div className="mt-2 flex justify-between px-1 text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>Textiles con historia</span>
              <span>01 / Pingolino</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/75 bg-card">
        <ul className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 py-7 sm:px-8 md:grid-cols-4 md:py-8 lg:px-12">
          {craftNotes.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className={`flex gap-3 py-3 md:py-0 ${index % 2 ? "pl-4 sm:pl-8 md:pl-6 lg:pl-10" : ""} ${index > 1 ? "border-t border-border/75 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0 lg:pl-10" : ""} ${index === 1 ? "md:border-l md:border-border/75" : ""}`}
            >
              <Icon
                size={17}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-accent-strong"
                aria-hidden="true"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em]">{title}</p>
                <p className="mt-1 max-w-[180px] text-xs leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-28">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Pequeños grandes días</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">
              ¿Qué momento
              <br className="hidden sm:block" /> viene ahora?
            </h2>
          </div>
          <p className="max-w-[290px] pb-1 text-sm leading-relaxed text-muted-foreground">
            Para la cuna, la guardería, el paseo o el primer cumpleaños.{" "}
            <Link
              to="/$slug"
              params={{ slug: "regalos-personalizados-bebe" }}
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              Ver ideas de regalo personalizado
            </Link>
            .
          </p>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:gap-5">
          {categoryTiles.map(({ category, image }, index) => (
            <Link
              key={category.slug}
              to="/$slug"
              params={{ slug: category.slug }}
              className={`category-tile group relative overflow-hidden bg-secondary ${index === 0 ? "col-span-2 aspect-[1.75/1] md:col-span-1 md:aspect-[0.78/1]" : "aspect-[0.78/1]"}`}
            >
              <img
                src={productImage(image, 700)}
                srcSet={productSrcSet(image, [400, 700, 1000])}
                sizes="(min-width: 768px) 32vw, 50vw"
                alt={category.title}
                width={700}
                height={900}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-background sm:p-5">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-background/85">
                    {category.eyebrow}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl leading-none sm:text-3xl">
                    {category.name}
                  </h3>
                </div>
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-background/50 transition-all group-hover:bg-background group-hover:text-foreground">
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">Del taller a casa</p>
              <h2 className="mt-3 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">
                Hecho con tiempo.
                <br />
                <i className="font-medium text-primary">Hecho para durar.</i>
              </h2>
            </div>
            <Link
              to="/tienda"
              className="group inline-flex items-center gap-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
            >
              Explorar todas las piezas{" "}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5 md:gap-y-14">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-0 px-5 py-16 sm:px-8 md:grid-cols-[1fr_0.88fr] md:items-center md:gap-14 md:py-24 lg:gap-24 lg:px-12">
        <div className="relative order-2 mt-8 md:order-1 md:mt-0">
          <img
            src={neceser}
            alt="Neceser de vichy amarillo con el nombre Lucía bordado, cosido por Sherezhade"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[1.2/1] w-full object-cover"
          />
          <span className="absolute -bottom-4 -right-2 max-w-[190px] bg-background px-4 py-3 font-display text-xl italic shadow-sm sm:-right-4">
            Cada puntada cuenta algo.
          </span>
        </div>
        <div className="order-1 md:order-2 md:py-8">
          <p className="section-kicker">La persona detrás de cada puntada</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">
            Un proyecto que empezó en casa.
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.8] text-muted-foreground">
            «Me llamo Sherezhade y soy mamá de tres pequeños». La costura fue primero un refugio y
            una pasión autodidacta. Cuando llegó su tercer hijo, decidió dar el paso y convertir esa
            ilusión en Pingolino Handmade.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-[1.8] text-muted-foreground">
            Hoy, cada manta, bolso y accesorio se sigue creando de la misma manera: con calma,
            escogiendo tejidos que también llevaría a casa.
          </p>
          <Link
            to="/nosotros"
            className="mt-7 inline-flex items-center gap-2 border-b border-foreground/50 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent-strong"
          >
            Leer nuestra historia <ArrowRight size={14} />
          </Link>
          <img
            src={corona}
            alt="Corona de cumpleaños de tela con nombre bordado y número intercambiable"
            width={1200}
            height={1600}
            loading="lazy"
            decoding="async"
            className="mt-9 hidden aspect-[2/1] w-full object-cover md:block"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-5 border-t border-border pt-8">
          <div>
            <p className="section-kicker">Lecturas para acompañar</p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">Desde el diario</h2>
          </div>
          <Link
            to="/blog"
            className="hidden items-center gap-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:inline-flex"
          >
            Ver el diario <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-7 md:grid-cols-3 md:gap-5">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className={`editorial-story group ${index === 0 ? "md:col-span-2 md:grid md:grid-cols-[1.15fr_.85fr] md:gap-6" : ""}`}
            >
              <div className="overflow-hidden bg-secondary">
                <img
                  src={post.image}
                  alt={post.title}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] ${index === 0 ? "aspect-[1.4/1] h-full" : "aspect-[1.65/1]"}`}
                />
              </div>
              <div className={`${index === 0 ? "md:flex md:flex-col md:justify-center" : ""} pt-4`}>
                <p className="section-kicker">
                  {post.category} <span className="px-1.5 text-border">/</span>{" "}
                  <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                </p>
                <h3 className="mt-2 font-display text-3xl leading-[0.98] tracking-tight group-hover:text-primary sm:text-[32px]">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em]">
                  Leer · {readingTime(post)} <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] sm:hidden"
        >
          Ver el diario <ArrowRight size={14} />
        </Link>
      </section>

      <section className="mx-5 mb-4 overflow-hidden bg-primary text-primary-foreground sm:mx-8 lg:mx-12">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1fr_auto] md:items-center md:py-12 lg:px-14">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/75">
              Una pieza empieza con una idea
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[0.95] sm:text-5xl">
              ¿La imaginamos juntas?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/80">
              Para elegir un tejido, pedir una personalización o simplemente preguntar, Sherezhade
              está al otro lado.
            </p>
          </div>
          <Link
            to="/contacto"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-background px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-foreground transition-transform hover:-translate-y-0.5"
          >
            Escribir al taller <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
