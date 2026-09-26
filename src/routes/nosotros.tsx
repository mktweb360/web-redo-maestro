import { createFileRoute, Link } from "@tanstack/react-router";
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

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 py-20 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
          Nuestra historia
        </p>
        <h1 className="mt-5 font-display text-6xl leading-[0.95] md:text-8xl">
          Un pequeño sueño,
          <br />
          <em className="text-primary">construido puntada a puntada.</em>
        </h1>
      </section>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <img
          src={neceser}
          alt="Neceser de vichy amarillo con el nombre Lucía bordado, cosido por Sherezhade"
          width={1200}
          height={800}
          fetchPriority="high"
          className="aspect-[21/9] w-full object-cover"
        />
      </div>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_2fr]">
        <p className="font-display text-4xl leading-tight text-primary md:text-5xl">
          “Me llamo Sherezhade y soy mamá de tres pequeños.”
        </p>
        <div className="space-y-5 text-lg leading-relaxed">
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
            Muchas de las familias que confían en mí también tienen peques con alguna necesidad
            especial. Saber que mis creaciones las acompañan le da a este proyecto todavía más
            sentido.
          </p>
        </div>
      </section>
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-3 lg:px-8">
          {[
            ["Hecho a mano", "Cada pieza se cose una a una. Sin producción en serie."],
            [
              "Tejidos que cuidan",
              "Algodones suaves, transpirables y seguros para la piel de los peques.",
            ],
            [
              "Pensado para durar",
              "Piezas prácticas que acompañan el día a día y se convierten en recuerdo.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="border-l border-accent pl-6">
              <h2 className="font-display text-3xl">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 lg:px-8">
        <img
          src={corona}
          alt="Corona de cumpleaños de tela con el número 3 y el nombre bordado"
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
        <div>
          <h2 className="font-display text-5xl">Bienvenida a esta pequeña familia.</h2>
          <p className="mt-4 text-muted-foreground">
            Gracias por apoyar la artesanía y dar valor al trabajo hecho con las manos y con el
            corazón.
          </p>
          <Link
            to="/tienda"
            className="mt-8 inline-block bg-primary px-7 py-4 text-sm text-primary-foreground"
          >
            Ver las creaciones
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
