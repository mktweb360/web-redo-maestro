import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Pingolino Handmade" },
      { name: "description", content: "Escríbenos para encargos personalizados, dudas sobre pedidos o colaboraciones." },
      { property: "og:title", content: "Contacto — Pingolino Handmade" },
      { property: "og:description", content: "Hablemos de tu pieza personalizada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-16 md:grid-cols-2">
        <div>
          <h1 className="font-display text-6xl md:text-7xl">Hablemos.</h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">¿Buscas un encargo especial, un tejido concreto o tienes dudas sobre tu pedido? Te respondemos personalmente.</p>
          <ul className="mt-10 space-y-5">
            <li className="flex items-center gap-3"><Mail className="text-accent" /> hola@pingolinohandmade.com</li>
            <li className="flex items-center gap-3"><MessageCircle className="text-accent" /> WhatsApp para encargos</li>
            <li className="flex items-center gap-3"><Instagram className="text-accent" /> @pingolinohandmade</li>
          </ul>
        </div>
        {sent ? (
          <div className="grid place-items-center bg-muted p-10 text-center">
            <div><p className="font-display text-4xl">¡Mensaje recibido!</p><p className="mt-3 text-muted-foreground">Te contestaremos lo antes posible.</p></div>
          </div>
        ) : (
          <form className="space-y-5 bg-muted p-8" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {[["Nombre", "text"], ["Correo electrónico", "email"]].map(([l, t]) => (
              <label key={l} className="block text-sm">{l}
                <input required type={t} className="mt-2 w-full border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
              </label>
            ))}
            <label className="block text-sm">Motivo
              <select className="mt-2 w-full border border-input bg-background px-4 py-3">
                <option>Encargo personalizado</option><option>Duda sobre un pedido</option><option>Colaboraciones</option><option>Otro</option>
              </select>
            </label>
            <label className="block text-sm">Mensaje
              <textarea required rows={5} className="mt-2 w-full border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
            </label>
            <button className="w-full bg-primary py-4 text-sm text-primary-foreground">Enviar mensaje</button>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
