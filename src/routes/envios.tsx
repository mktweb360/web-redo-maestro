import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FREE_SHIPPING, formatPrice } from "@/lib/catalog";
import { breadcrumbLd, faqLd, seo } from "@/lib/seo";

type Question = {
  q: string;
  a: string;
  /** Pendiente de confirmar con Pingolino: no entra en el schema. */ pending?: boolean;
};

const questions: Question[] = [
  {
    q: "¿Cuánto cuesta el envío?",
    a: `El envío es gratis en pedidos desde ${formatPrice(FREE_SHIPPING)}. Para importes menores, el coste se muestra en el pago antes de confirmar el pedido.`,
  },
  {
    q: "¿Cómo pago?",
    a: "El pago se hace en el checkout seguro de Shopify, con los métodos de pago que se muestran al finalizar la compra.",
  },
  {
    q: "¿Cómo personalizo mi pieza?",
    a: "En las piezas personalizables encontrarás el campo «Nombre a bordar» en la ficha del producto: escríbelo tal y como quieres que se borde (máximo 14 caracteres). El nombre llega al taller junto con tu pedido.",
  },
  {
    q: "¿Cuándo tendré mi pedido?",
    a: "Cada pieza se cose a mano y las personalizadas se bordan para cada pedido. Te indicaremos el plazo de confección al confirmar el pedido y lo enviamos en cuanto está listo.",
    pending: true,
  },
  {
    q: "¿Cómo se cuidan las piezas?",
    a: "Encontrarás los cuidados en la ficha de cada producto cuando estén confirmados. Si tienes dudas antes de lavar una pieza bordada, escríbenos y te orientamos.",
    pending: true,
  },
  {
    q: "¿Se aceptan devoluciones?",
    a: "La política de devoluciones está pendiente de publicación. Las piezas personalizadas se hacen a medida para cada pedido, por lo que tienen condiciones específicas.",
    pending: true,
  },
  {
    q: "¿Puedo pedir algo especial?",
    a: "Sí. Para consultar una combinación de telas, una personalización o una idea de encargo, escribe al taller desde la página de contacto.",
  },
];

export const Route = createFileRoute("/envios")({
  head: () =>
    seo({
      title: "Envíos, pagos y preguntas frecuentes",
      description: `Envío gratis desde ${formatPrice(FREE_SHIPPING)}, pago seguro con Shopify, personalización con nombre bordado y encargos especiales en Pingolino Handmade.`,
      path: "/envios",
      jsonLd: [
        faqLd(questions.filter((x) => !x.pending).map((x) => [x.q, x.a])),
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Ayuda", path: "/envios" },
        ]),
      ],
    }),
  component: Faq,
});

function Faq() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:grid md:grid-cols-[.8fr_1.2fr] md:gap-16 md:py-20 lg:gap-24 lg:px-12">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="section-kicker">Comprar con tranquilidad</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.83] tracking-tight md:text-7xl">
            Envíos y
            <br />
            <i className="font-medium text-primary">preguntas.</i>
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-[1.8] text-muted-foreground">
            Lo que conviene saber antes de elegir una pieza hecha a mano: envíos, pago,
            personalización y encargos.
          </p>
          <Link
            to="/contacto"
            className="mt-7 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
          >
            Preguntar al taller <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-9 divide-y divide-border border-y border-border md:mt-0">
          {questions.map(({ q, a }, index) => (
            <details key={q} className="group py-5" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-5 font-display text-2xl sm:text-3xl">
                {q}
                <span className="font-sans text-lg text-accent-strong transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl pr-8 text-sm leading-[1.8] text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
