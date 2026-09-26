import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { breadcrumbLd, faqLd, seo } from "@/lib/seo";

const faqs: [string, string][] = [
  [
    "¿Cuánto cuesta el envío?",
    "El envío es gratis en pedidos desde 50 €. Para importes menores, el coste se muestra en el pago antes de confirmar.",
  ],
  [
    "¿Cómo pago?",
    "El pago se hace en el checkout seguro de Shopify, con los métodos de pago que se muestran al finalizar la compra.",
  ],
  [
    "¿Cuánto tarda en llegar mi pedido?",
    "Las piezas personalizadas se bordan para cada pedido. Te indicaremos el plazo de confección al confirmar el pedido y el envío se hace en cuanto está lista.",
  ],
  [
    "¿Cómo personalizo mi pieza?",
    "En los productos personalizables encontrarás el campo «Nombre a bordar»: escríbelo tal y como quieres que se borde (máximo 14 caracteres).",
  ],
  [
    "¿Cómo lavo mis productos?",
    "Consulta los cuidados en la ficha de cada producto. Si tienes dudas antes de lavar una pieza bordada, escríbenos y te orientamos.",
  ],
  [
    "¿Puedo devolver un producto?",
    "Los productos sin personalizar pueden devolverse en perfecto estado. Las piezas personalizadas, al ser únicas, no admiten devolución salvo defecto.",
  ],
  [
    "¿Hacéis encargos especiales?",
    "Sí. Escríbenos desde la página de contacto y te contamos tejidos y posibilidades.",
  ],
];

export const Route = createFileRoute("/envios")({
  head: () =>
    seo({
      title: "Envíos, devoluciones y preguntas frecuentes",
      description:
        "Envío gratis desde 50 €, plazos de confección, personalización con nombre, cuidados y devoluciones de Pingolino Handmade.",
      path: "/envios",
      jsonLd: [
        faqLd(faqs),
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Envíos y FAQ", path: "/envios" },
        ]),
      ],
    }),
  component: Faq,
});

function Faq() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-5 py-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
          Comprar con tranquilidad
        </p>
        <h1 className="mt-4 font-display text-6xl leading-[0.95] md:text-8xl">
          Envíos y preguntas frecuentes
        </h1>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-6">
              <summary className="cursor-pointer font-display text-2xl marker:text-accent-strong md:text-3xl">
                {q}
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Condiciones propuestas para validar con Pingolino antes de publicar.
        </p>
      </section>
    </SiteLayout>
  );
}
