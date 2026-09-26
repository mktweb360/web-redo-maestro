import { createFileRoute } from "@tanstack/react-router";
import { Mail, Music2, Phone } from "lucide-react";
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
      description: `Escríbenos para encargos personalizados, dudas sobre tu pedido o colaboraciones: ${BRAND.email} · ${BRAND.phone}.`,
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
  "Encargo personalizado",
  "Duda sobre un pedido",
  "Colaboraciones",
  "Otro",
] as const;

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
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 md:grid-cols-[.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
            Atención personal
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">Hablemos.</h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            ¿Buscas un encargo especial, un tejido concreto o tienes dudas sobre tu pedido? Te
            respondemos personalmente.
          </p>
          <ul className="mt-10 space-y-5">
            <li>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 hover:underline">
                <Mail className="text-accent-strong" aria-hidden="true" /> {BRAND.email}
              </a>
            </li>
            <li>
              <a href={BRAND.phoneHref} className="flex items-center gap-3 hover:underline">
                <Phone className="text-accent-strong" aria-hidden="true" /> {BRAND.phone}
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
                  <Music2 className="text-accent-strong" aria-hidden="true" /> TikTok
                  @pingolinohandmade
                </a>
              </li>
            )}
          </ul>
        </div>
        <form className="space-y-6 border border-border bg-card p-7 md:p-10" onSubmit={onSubmit}>
          <label className="block text-sm">
            Nombre
            <input
              name="nombre"
              required
              type="text"
              autoComplete="name"
              className="mt-2 w-full border border-input bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </label>
          <label className="block text-sm">
            Motivo
            <select
              name="motivo"
              defaultValue={producto ? "Encargo personalizado" : reasons[0]}
              className="mt-2 w-full border border-input bg-background px-4 py-3"
            >
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Mensaje
            <textarea
              name="mensaje"
              required
              rows={5}
              defaultValue={producto ? `Hola, me interesa "${producto}". ` : ""}
              className="mt-2 w-full border border-input bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </label>
          <button className="w-full bg-primary py-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground">
            Escribir por correo
          </button>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {opened
              ? `Se ha abierto tu aplicación de correo con el mensaje preparado. Si no se abre, escríbenos a ${BRAND.email}.`
              : "Al enviar se abrirá tu aplicación de correo con el mensaje preparado."}
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}
