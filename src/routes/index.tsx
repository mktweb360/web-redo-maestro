import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, Heart, Scissors, Sparkles, Truck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { posts, products, shopCategories } from "@/lib/catalog";
import taller from "@/assets/pingolino/taller.jpg";
import materiales from "@/assets/pingolino/materiales.jpg";
import bolsaPlayaHero from "@/assets/pingolino/bolsa-playa-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pingolino Handmade — Piezas hechas para acompañar" },
      { name: "description", content: "Mantas, mochilas y accesorios textiles cosidos a mano en España. Pequeñas piezas para acompañar grandes comienzos." },
      { property: "og:title", content: "Pingolino Handmade — Piezas hechas para acompañar" },
      { property: "og:description", content: "Costura artesanal para la vida real: piezas textiles bonitas, prácticas y llenas de historia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const craftNotes = [
  { icon: Scissors, title: "Una a una", text: "Cada pieza pasa por las manos de Sherezhade." },
  { icon: Sparkles, title: "A tu manera", text: "Algunas se bordan con el nombre que elijas." },
  { icon: Heart, title: "Para vivirlas", text: "Textiles pensados para acompañar lo cotidiano." },
  { icon: Truck, title: "Envío gratis", text: "En pedidos de 50 € o más." },
];

function Home() {
  const categoriesWithProducts = shopCategories
    .map((category) => ({ category, product: products.find((product) => product.category === category.name) }))
    .filter((item): item is { category: (typeof shopCategories)[number]; product: (typeof products)[number] } => Boolean(item.product));
  const featured = [
    products.find((product) => product.slug === "manta-arrullo-volantes-rosa"),
    products.find((product) => product.slug === "mochila-infantil-algodon"),
    products.find((product) => product.slug === "corona-cumpleanos-personalizada"),
    products.find((product) => product.slug === "portatoallitas-porta-panales"),
  ].filter((product): product is (typeof products)[number] => Boolean(product));

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-5 sm:px-8 md:pb-16 md:pt-8 lg:px-12 lg:pt-10">
        <div className="grid items-center gap-7 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 xl:gap-16">
          <div className="order-2 max-w-xl pb-4 lg:order-1 lg:py-12">
            <p className="eyebrow-label"><span className="eyebrow-dot" /> Un pequeño taller · España</p>
            <h1 className="mt-5 font-display text-[clamp(3.35rem,7.6vw,7rem)] leading-[0.79] tracking-[-0.045em]">Hecho para<br /><i className="font-medium text-primary">acompañar.</i></h1>
            <p className="mt-7 max-w-md text-[15px] leading-[1.75] text-muted-foreground sm:text-base">Hay días que se quedan para siempre. Cada pieza Pingolino nace en el taller, cosida despacio para estar en medio de los vuestros.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link to="/tienda" className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5">Ver las piezas <ArrowRight size={15} /></Link>
              <Link to="/nosotros" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:text-accent">Conocer a Sherezhade</Link>
            </div>
            <div className="mt-9 flex items-center gap-3 border-t border-border/80 pt-5">
              <div className="flex -space-x-2" aria-hidden="true"><span className="grid size-8 place-items-center rounded-full border-2 border-background bg-secondary font-display text-sm">p</span><span className="grid size-8 place-items-center rounded-full border-2 border-background bg-cover-accent/50 font-display text-sm italic">h</span><span className="grid size-8 place-items-center rounded-full border-2 border-background bg-primary/15 text-[9px]">✦</span></div>
              <p className="text-[11px] leading-snug text-muted-foreground">Un nombre bordado.<br /><span className="font-medium text-foreground">Una pieza que ya es suya.</span></p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="hero-photo-frame relative aspect-[4/3] overflow-hidden bg-secondary/80 p-2.5 sm:p-4 md:p-5">
              <img src={bolsaPlayaHero} alt="Bolsa de playa de cuadros vichy cosida en el taller de Pingolino" className="h-full w-full object-contain" fetchPriority="high" />
              <span className="absolute bottom-5 left-5 bg-background/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm md:bottom-7 md:left-7">Piezas para vivirlas</span>
              <Link to="/$slug" params={{ slug: "bolsa-playa-vichy" }} className="absolute bottom-5 right-5 grid size-10 place-items-center rounded-full bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:bottom-7 md:right-7" aria-label="Descubrir bolsa de playa"><ArrowDownRight size={19} strokeWidth={1.5} /></Link>
            </div>
            <div className="mt-2 flex justify-between px-1 text-[9px] uppercase tracking-[0.15em] text-muted-foreground"><span>Textiles con historia</span><span>01 / Pingolino</span></div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/75 bg-card">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 py-7 sm:px-8 md:grid-cols-4 md:py-8 lg:px-12">
          {craftNotes.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className={`flex gap-3 py-3 md:py-0 ${index % 2 ? "pl-4 sm:pl-8 md:pl-6 lg:pl-10" : ""} ${index > 1 ? "border-t border-border/75 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0 lg:pl-10" : ""} ${index === 1 ? "md:border-l md:border-border/75" : ""}`}>
              <Icon size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent" />
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.1em]">{title}</p><p className="mt-1 max-w-[180px] text-xs leading-relaxed text-muted-foreground">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-28">
        <div className="section-heading-row">
          <div><p className="section-kicker">Pequeños grandes días</p><h2 className="mt-3 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">¿Qué momento<br className="hidden sm:block" /> viene ahora?</h2></div>
          <p className="max-w-[290px] pb-1 text-sm leading-relaxed text-muted-foreground">Piezas creadas para ir contigo, desde los primeros días hasta las historias que todavía no han pasado.</p>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:gap-5">
          {categoriesWithProducts.map(({ category, product }, index) => (
            <Link key={category.slug} to="/$slug" params={{ slug: category.slug }} className={`category-tile group relative overflow-hidden bg-secondary ${index === 0 ? "col-span-2 aspect-[1.75/1] md:col-span-1 md:aspect-[0.78/1]" : "aspect-[0.78/1]"}`}>
              <img src={product.images[0]} alt={category.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-background sm:p-5">
                <div><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-background/75">{category.eyebrow}</p><p className="mt-1.5 font-display text-2xl leading-none sm:text-3xl">{category.name}</p></div>
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-background/50 transition-all group-hover:bg-background group-hover:text-foreground"><ArrowRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="section-heading-row">
            <div><p className="section-kicker">Del taller a casa</p><h2 className="mt-3 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">Hecho con tiempo.<br /><i className="font-medium text-primary">Hecho para durar.</i></h2></div>
            <Link to="/tienda" className="group inline-flex items-center gap-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em]">Explorar todas las piezas <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5 md:gap-y-14">
            {featured.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-0 px-5 py-16 sm:px-8 md:grid-cols-[1fr_0.88fr] md:items-center md:gap-14 md:py-24 lg:px-12 lg:gap-24">
        <div className="relative order-2 mt-8 md:order-1 md:mt-0">
          <img src={taller} alt="Las manos de Sherezhade preparando una pieza artesanal" loading="lazy" className="aspect-[1.2/1] w-full object-cover" />
          <span className="absolute -bottom-4 -right-2 max-w-[190px] bg-background px-4 py-3 font-display text-xl italic shadow-sm sm:-right-4">Cada puntada cuenta algo.</span>
        </div>
        <div className="order-1 md:order-2 md:py-8">
          <p className="section-kicker">La persona detrás de cada puntada</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">Un proyecto que empezó en casa.</h2>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.8] text-muted-foreground">«Me llamo Sherezhade y soy mamá de tres pequeños». La costura fue primero un refugio y una pasión autodidacta. Cuando llegó su tercer hijo, decidió dar el paso y convertir esa ilusión en Pingolino Handmade.</p>
          <p className="mt-4 max-w-lg text-sm leading-[1.8] text-muted-foreground">Hoy, cada manta, bolso y accesorio se sigue creando de la misma manera: con calma, escogiendo tejidos que también llevaría a casa.</p>
          <Link to="/nosotros" className="mt-7 inline-flex items-center gap-2 border-b border-foreground/50 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent">Leer nuestra historia <ArrowRight size={14} /></Link>
          <img src={materiales} alt="Textiles y materiales seleccionados para confeccionar piezas Pingolino" loading="lazy" className="mt-9 hidden aspect-[2/1] w-full object-cover md:block" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-5 border-t border-border pt-8">
          <div><p className="section-kicker">Lecturas para acompañar</p><h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">Desde el diario</h2></div>
          <Link to="/blog" className="hidden items-center gap-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:inline-flex">Ver el diario <ArrowRight size={14} /></Link>
        </div>
        <div className="grid gap-7 md:grid-cols-3 md:gap-5">
          {posts.map((post, index) => (
            <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className={`editorial-story group ${index === 0 ? "md:col-span-2 md:grid md:grid-cols-[1.15fr_.85fr] md:gap-6" : ""}`}>
              <div className="overflow-hidden bg-secondary"><img src={post.image} alt="" loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] ${index === 0 ? "aspect-[1.4/1] h-full" : "aspect-[1.65/1]"}`} /></div>
              <div className={`${index === 0 ? "md:flex md:flex-col md:justify-center" : ""} pt-4`}>
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-accent">{post.category} <span className="px-1.5 text-border">/</span> {post.date}</p>
                <h3 className="mt-2 font-display text-3xl leading-[0.98] tracking-tight group-hover:text-primary sm:text-[32px]">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em]">Leer · {post.readTime} <ArrowRight size={13} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-5 mb-4 overflow-hidden bg-primary text-primary-foreground sm:mx-8 lg:mx-12">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1fr_auto] md:items-center md:py-12 lg:px-14">
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/65">Una pieza empieza con una idea</p><h2 className="mt-3 max-w-2xl font-display text-4xl leading-[0.95] sm:text-5xl">¿La imaginamos juntas?</h2><p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/75">Para elegir un tejido, pedir una personalización o simplemente preguntar, Sherezhade está al otro lado.</p></div>
          <Link to="/contacto" className="inline-flex w-fit items-center gap-3 rounded-full bg-background px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-foreground transition-transform hover:-translate-y-0.5">Escribir al taller <ArrowRight size={15} /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
