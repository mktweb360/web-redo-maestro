import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Scissors, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ORG_ID, breadcrumbLd, seo } from "@/lib/seo";
import { BRAND } from "@/lib/site";
import neceser from "@/assets/pingolino/neceser.jpg";
import corona from "@/assets/pingolino/corona.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () =>
    seo({
      title: "Nuestra historia: el taller de Sherezhade",
      description:
        "Soy Sherezhade, mamá de tres y costurera autodidacta. Así nació Pingolino Handmade, un taller donde cada pieza se cose a mano.",
      path: "/nosotros",
      image: neceser,
      imageAlt: "Neceser de vichy amarillo con el nombre Lucía bordado, de Pingolino Handmade",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Nuestra historia — Pingolino Handmade",
          about: { "@id": ORG_ID },
          mainEntity: {
            "@type": "Person",
            name: BRAND.founder,
            jobTitle: "Fundadora y costurera",
            worksFor: { "@id": ORG_ID },
          },
        },
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Nuestra historia", path: "/nosotros" },
        ]),
      ],
    }),
  component: About,
});

const values = [
  {
    icon: Scissors,
    title: "Hecho a mano",
    copy: "Cada pieza se cose una a una. Sin producción en serie.",
  },
  {
    icon: Sparkles,
    title: "Tejidos elegidos",
    copy: "Tejidos que Sherezhade usaría para sus propios hijos: algodón, muselina, borreguito y vichy.",
  },
  {
    icon: Heart,
    title: "Con una historia",
    copy: "Un nombre bordado convierte una pieza práctica en un recuerdo.",
  },
];

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1440px] px-5 pb-8 pt-12 sm:px-8 md:pb-12 md:pt-20 lg:px-12">
        <div className="grid gap-7 md:grid-cols-[1fr_.7fr] md:items-end md:gap-12">
          <div>
            <p className="section-kicker">La persona detrás de cada puntada</p>
            <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.8] tracking-tight sm:text-7xl md:text-8xl">
              Un sueño pequeño.
              <br />
              <i className="font-medium text-primary">Puntada a puntada.</i>
            </h1>
          </div>
          <p className="max-w-md pb-1 text-sm leading-[1.8] text-muted-foreground">
            Pingolino Handmade nació alrededor de una máquina de coser, una familia y las ganas de
            hacer algo propio, despacito.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden bg-secondary">
          <img
            src={neceser}
            alt="Neceser de vichy amarillo con el nombre Lucía bordado, cosido por Sherezhade"
            width={1200}
            height={800}
            fetchPriority="high"
            className="aspect-[1.7/1] w-full object-cover sm:aspect-[2.1/1]"
          />
          <span className="absolute bottom-3 left-3 bg-background/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] sm:bottom-5 sm:left-5">
            Cosido en el taller · España
          </span>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[.72fr_1.28fr] md:gap-16 md:py-20 lg:px-12">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="section-kicker">Una historia personal</p>
          <p className="mt-4 font-display text-4xl leading-[1.02] text-primary sm:text-5xl">
            «Me llamo Sherezhade y soy mamá de tres pequeños».
          </p>
        </div>
        <div className="space-y-5 text-[15px] leading-[1.9] text-foreground/85">
          <p>
            Desde niña me ha apasionado coser. Nunca fui a una escuela de costura: todo lo que sé lo
            he aprendido sola, con paciencia, práctica y muchísima ilusión.
          </p>
          <p>
            Durante años la costura fue mi refugio. Con el nacimiento de mi tercer hijo, que tiene
            autismo, entendí que no siempre hay que esperar al “momento perfecto” para hacer aquello
            que te hace feliz. Así nació Pingolino Handmade.
          </p>
          <p>
            Cada bolso, manta o portatoallitas que sale del taller lo confecciono yo, con calma,
            eligiendo tejidos que usaría para mis propios hijos.
          </p>
          <p>
            Muchas de las personas que confían en mí también son mamás de niños con alguna
            discapacidad o necesidad especial. Compartimos experiencias, inquietudes y una forma muy
            especial de entender la maternidad, y saber que mis creaciones las acompañan le da a
            este proyecto todavía más sentido.
          </p>
          <p>
            Pingolino es un pequeño sueño hecho realidad, construido puntada a puntada, con el deseo
            de crear productos bonitos, prácticos y duraderos para momentos importantes.
          </p>
          <p className="pt-2 font-display text-3xl italic text-primary">
            Gracias por estar aquí y por dar valor al trabajo hecho con las manos y con el corazón.
          </p>
        </div>
      </section>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 md:grid-cols-3 md:gap-6 md:py-16 lg:px-12">
          {values.map(({ icon: Icon, title, copy }, index) => (
            <div key={title} className="border-t border-primary/35 pt-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-accent-strong">0{index + 1}</span>
                <Icon size={18} className="text-primary" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-display text-3xl">{title}</h2>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] items-center gap-7 px-5 py-14 sm:px-8 md:grid-cols-[.9fr_1.1fr] md:gap-14 md:py-20 lg:px-12">
        <img
          src={corona}
          alt="Corona de cumpleaños de tela con el número y el nombre bordados"
          width={1200}
          height={1600}
          loading="lazy"
          decoding="async"
          className="aspect-[1.25/1] w-full object-cover"
        />
        <div>
          <p className="section-kicker">De nuestras manos, a las tuyas</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] sm:text-6xl">
            Bienvenida a esta pequeña familia.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-[1.8] text-muted-foreground">
            Cada pedido es una oportunidad para hacer algo bonito y útil. Gracias por apoyar la
            artesanía y las cosas pensadas para durar.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
            <Link
              to="/tienda"
              className="inline-flex items-center gap-2 border-b border-foreground pb-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
            >
              Descubrir las creaciones <ArrowRight size={14} />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 border-b border-border pb-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
            >
              Leer el diario
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
