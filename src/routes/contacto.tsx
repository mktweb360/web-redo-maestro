import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, Music2, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ORG_ID, breadcrumbLd, seo } from "@/lib/seo";
import { BRAND } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  validateSearch: (search: Record<string, unknown>): { producto?: string } =>
    typeof search["producto"] === "string" ? { producto: search["producto"].slice(0, 120) } : {},
  head: () =>
    seo({
      title: "Contacto y encargos personalizados",
      description: `Escribe al taller para encargos personalizados, dudas sobre tu pedido o colaboraciones: ${BRAND.email} · ${BRAND.phone}.`,
      path: "/contacto",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contacto — Pingolino Handmade",
          about: { "@id": ORG_ID },
        },
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto" },
        ]),
      ],
    }),
  component: Contact,
});

const reasons = [
  "Una pieza personalizada",
  "Una duda sobre un pedido",
  "Una duda sobre el catálogo",
  "Una colaboración",
  "Otra cosa",
] as const;

const field =
  "mt-2 w-full border border-input bg-background px-4 py-3 text-sm font-normal outline-none focus:border-primary";

function Contact() {
  const { producto } = Route.useSearch();
  const [opened, setOpened] = useState(false);

  // Sin backend de formularios: el mensaje se abre en el correo del cliente con todo prerrellenado.
  // Sustituir por un servicio de formularios (o la app de Shopify) cuando se decida.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = String(data.get("nombre") ?? "");
    const motivo = String(data.get("motivo") ?? "");
    const mensaje = String(data.get("mensaje") ?? "");
    const subject = `${motivo}${producto ? ` · ${producto}` : ""} — ${nombre}`;
    const body = `${mensaje}\n\n— ${nombre}`;
    window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-[1440px] gap-9 px-5 py-12 sm:px-8 md:grid-cols-[.8fr_1.2fr] md:gap-12 md:py-20 lg:gap-20 lg:px-12">
        <div className="md:pt-5">
          <p className="section-kicker">Atención cercana</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.82] tracking-tight md:text-8xl">
            Hablemos.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-muted-foreground">
            ¿Buscas un encargo especial, quieres saber más de una tela o tienes una duda sobre
            alguna pieza? Cuéntame qué tienes en mente y te respondo personalmente.
          </p>
          <ul className="mt-9 space-y-4 border-t border-border pt-7 text-sm">
            <li>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 hover:underline">
                <Mail className="text-accent-strong" size={17} aria-hidden="true" /> {BRAND.email}
              </a>
            </li>
            <li>
              <a href={BRAND.phoneHref} className="flex items-center gap-3 hover:underline">
                <Phone className="text-accent-strong" size={17} aria-hidden="true" /> {BRAND.phone}
              </a>
            </li>
            {BRAND.social["tiktok"] && (
              <li>
                <a
                  href={BRAND.social["tiktok"]}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 hover:underline"
                >
                  <Music2 className="text-accent-strong" size={17} aria-hidden="true" /> TikTok ·
                  @pingolinohandmade
                </a>
              </li>
            )}
          </ul>
        </div>
        <form
          className="border border-border bg-card p-6 sm:p-9 md:p-10"
          onSubmit={onSubmit}
          aria-describedby="contacto-ayuda"
        >
          <p className="section-kicker">Cuéntanos un poquito</p>
          <h2 className="mt-3 font-display text-4xl">¿En qué te ayudamos?</h2>
          {producto && (
            <p className="mt-3 border-l-2 border-accent bg-secondary/70 px-3 py-2 text-xs">
              Consulta sobre: <strong>{producto}</strong>
            </p>
          )}
          <label className="mt-7 block text-xs font-semibold" htmlFor="contact-name">
            Tu nombre
            <input
              id="contact-name"
              name="nombre"
              required
              type="text"
              autoComplete="name"
              className={field}
              placeholder="Nombre"
            />
          </label>
          <label className="mt-5 block text-xs font-semibold" htmlFor="contact-reason">
            ¿De qué hablamos?
            <select
              id="contact-reason"
              name="motivo"
              defaultValue={producto ? "Una pieza personalizada" : reasons[0]}
              className={field}
            >
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="mt-5 block text-xs font-semibold" htmlFor="contact-message">
            Tu mensaje
            <textarea
              id="contact-message"
              name="mensaje"
              required
              rows={5}
              defaultValue={producto ? `Hola, me interesa "${producto}". ` : ""}
              className={`${field} resize-y`}
              placeholder="Cuéntanos tu idea…"
            />
          </label>
          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-foreground">
            Escribir por correo <ArrowRight size={14} />
          </button>
          <p id="contacto-ayuda" className="mt-3 text-xs text-muted-foreground" aria-live="polite">
            {opened
              ? `Se ha abierto tu aplicación de correo con el mensaje preparado. Si no se abre, escríbenos a ${BRAND.email}.`
              : "Al enviar se abrirá tu aplicación de correo con el mensaje preparado."}
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}
