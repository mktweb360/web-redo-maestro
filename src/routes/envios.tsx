import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FREE_SHIPPING, formatPrice } from "@/lib/catalog";

export const Route = createFileRoute("/envios")({
  head: () => ({
    meta: [
      { title: "Envíos y preguntas frecuentes — Pingolino Handmade" },
      { name: "description", content: "Información sobre el pedido, personalización y condiciones de compra de Pingolino Handmade." },
      { property: "og:title", content: "Envíos y preguntas frecuentes — Pingolino Handmade" },
      { property: "og:description", content: "Lo que conviene saber antes de elegir una pieza hecha a mano." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/envios" }],
  }),
  component: Faq,
});

const questions = [
  ["¿Cuándo tendré mi pedido?", "El plazo de confección y la estimación de entrega deben confirmarse con Pingolino antes de publicar esta información."],
  ["¿Cuánto cuesta el envío?", `La web actual anuncia envío gratis en pedidos a partir de ${formatPrice(FREE_SHIPPING)}. Los gastos para pedidos inferiores y las zonas de entrega están pendientes de confirmar.`],
  ["¿Puedo añadir un nombre?", "Algunas piezas permiten personalización con nombre bordado. Si está disponible, encontrarás un campo para escribirlo en la ficha del producto."],
  ["¿Cómo se cuidan las piezas?", "Las recomendaciones de lavado y cuidado dependen de cada tejido y deben confirmarse para cada artículo antes de publicarlas como condiciones definitivas."],
  ["¿Se aceptan devoluciones?", "La política de devoluciones y los supuestos aplicables todavía deben confirmarse con Pingolino. Esta propuesta no fija condiciones legales."],
  ["¿Puedo pedir algo especial?", "Para consultar una combinación de telas, personalización o idea de encargo, puedes escribir al taller. El formulario de esta propuesta es solo demostrativo."],
];

function Faq() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:grid md:grid-cols-[.8fr_1.2fr] md:gap-16 md:py-20 lg:px-12 lg:gap-24">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="section-kicker">Comprar con tranquilidad</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.83] tracking-tight md:text-7xl">Antes de<br /><i className="font-medium text-primary">elegir.</i></h1>
          <p className="mt-5 max-w-sm text-sm leading-[1.8] text-muted-foreground">Preguntas frecuentes sobre las piezas y el proceso. Las condiciones que requieren confirmación aparecen señaladas con claridad.</p>
          <div className="mt-7 border-l-2 border-accent bg-secondary/70 px-4 py-4 text-xs leading-relaxed"><strong className="block text-[9px] uppercase tracking-[0.15em]">Revisión necesaria</strong><span className="mt-2 block text-muted-foreground">Plazos, tarifas por debajo del mínimo, devoluciones y cuidados se deben aprobar antes del lanzamiento.</span></div>
          <Link to="/contacto" className="mt-7 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[10px] font-semibold uppercase tracking-[0.12em]">Preguntar al taller <ArrowRight size={14} /></Link>
        </div>
        <div className="mt-9 divide-y divide-border border-y border-border md:mt-0">
          {questions.map(([question, answer], index) => <details key={question} className="group py-5" open={index === 1}>
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-5 font-display text-2xl sm:text-3xl">{question}<span className="font-sans text-lg text-accent transition-transform group-open:rotate-45">+</span></summary>
            <p className="mt-3 max-w-2xl pr-8 text-sm leading-[1.8] text-muted-foreground">{answer}</p>
          </details>)}
        </div>
      </section>
    </SiteLayout>
  );
}
