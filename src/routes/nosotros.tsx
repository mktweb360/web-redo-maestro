import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import taller from "@/assets/pingolino/taller.jpg";
import materiales from "@/assets/pingolino/materiales.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nuestra historia — Pingolino Handmade" },
      { name: "description", content: "Soy Sherezhade, mamá de tres. Así nació Pingolino Handmade, un taller familiar de costura artesanal." },
      { property: "og:title", content: "Nuestra historia — Pingolino Handmade" },
      { property: "og:description", content: "Un pequeño sueño construido puntada a puntada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Nuestra historia</p>
        <h1 className="mt-5 font-display text-6xl leading-tight md:text-7xl">Un pequeño sueño, construido puntada a puntada.</h1>
      </section>
      <img src={taller} alt="El taller de Pingolino" className="mx-auto aspect-[21/9] w-full max-w-7xl object-cover px-5" />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_2fr]">
        <p className="font-display text-4xl leading-tight text-primary">“Me llamo Sherezhade y soy mamá de tres pequeños.”</p>
        <div className="space-y-5 text-lg leading-relaxed">
          <p>Desde niña me ha apasionado coser. Nunca fui a una escuela de costura: todo lo que sé lo he aprendido sola, con paciencia, práctica y muchísima ilusión.</p>
          <p>Durante años la costura fue mi refugio. Con el nacimiento de mi tercer hijo, que tiene autismo, entendí que no siempre hay que esperar al “momento perfecto” para hacer aquello que te hace feliz. Así nació Pingolino Handmade.</p>
          <p>Cada bolso, manta o portatoallitas que sale del taller lo confecciono yo, con calma, eligiendo tejidos que usaría para mis propios hijos.</p>
          <p>Muchas de las familias que confían en mí también tienen peques con alguna necesidad especial. Saber que mis creaciones las acompañan le da a este proyecto todavía más sentido.</p>
        </div>
      </section>
      <section className="bg-muted">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-3">
          {[
            ["Hecho a mano", "Cada pieza se cose una a una. Sin producción en serie."],
            ["Tejidos que cuidan", "Algodones suaves, transpirables y seguros para la piel de los peques."],
            ["Pensado para durar", "Piezas prácticas que acompañan el día a día y se convierten en recuerdo."],
          ].map(([t, d]) => (
            <div key={t}><h2 className="font-display text-3xl">{t}</h2><p className="mt-3 text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
        <img src={materiales} alt="Materiales" className="aspect-[4/3] w-full object-cover" />
        <div>
          <h2 className="font-display text-5xl">Bienvenida a esta pequeña familia.</h2>
          <p className="mt-4 text-muted-foreground">Gracias por apoyar la artesanía y dar valor al trabajo hecho con las manos y con el corazón.</p>
          <Link to="/tienda" className="mt-8 inline-block bg-primary px-7 py-4 text-sm text-primary-foreground">Ver las creaciones</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
