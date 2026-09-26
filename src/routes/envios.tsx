import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/envios")({
  head: () => ({
    meta: [
      { title: "Envíos y preguntas frecuentes — Pingolino Handmade" },
      { name: "description", content: "Plazos de confección, envíos, personalización, cuidados y devoluciones de Pingolino Handmade." },
      { property: "og:title", content: "Envíos y FAQ — Pingolino Handmade" },
      { property: "og:description", content: "Todo lo que necesitas saber antes de hacer tu pedido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

const faqs = [
  ["¿Cuánto cuesta el envío?", "El envío es gratis en pedidos desde 50 €. Para importes menores, el coste se muestra antes de pagar."],
  ["¿Cuánto tarda en llegar mi pedido?", "Cada pieza se cose por encargo. Te indicaremos el plazo de confección al confirmar el pedido y el envío se hace en cuanto está lista."],
  ["¿Cómo personalizo mi pieza?", "En los productos personalizables encontrarás un campo para escribir el nombre. Revisamos cada bordado antes de enviarlo."],
  ["¿Cómo lavo mis productos?", "Recomendamos lavado a mano o en programa delicado a 30 °C, del revés y sin secadora."],
  ["¿Puedo devolver un producto?", "Los productos sin personalizar pueden devolverse en perfecto estado. Las piezas personalizadas, al ser únicas, no admiten devolución salvo defecto."],
  ["¿Hacéis encargos especiales?", "Sí. Escríbenos desde la página de contacto y te contamos tejidos y posibilidades."],
];

function Faq() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-6xl">Envíos y preguntas frecuentes</h1>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map(([q, a]) => (
            <details key={q} className="py-5">
              <summary className="cursor-pointer font-display text-2xl">{q}</summary>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">Condiciones propuestas para validar con Pingolino antes de publicar.</p>
      </section>
    </SiteLayout>
  );
}
