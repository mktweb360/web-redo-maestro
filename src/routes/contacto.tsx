import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Instagram, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Hablemos con Pingolino Handmade" },
      { name: "description", content: "Contacta con el taller de Pingolino para preguntar por las piezas, personalizaciones y encargos." },
      { property: "og:title", content: "Contacto — Pingolino Handmade" },
      { property: "og:description", content: "Una duda, una idea o un encargo especial: hablemos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-[1440px] gap-9 px-5 py-12 sm:px-8 md:grid-cols-[.8fr_1.2fr] md:gap-12 md:py-20 lg:px-12 lg:gap-20">
        <div className="md:pt-5">
          <p className="section-kicker">Atención cercana</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.82] tracking-tight md:text-8xl">Hablemos.</h1>
          <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-muted-foreground">¿Buscas un encargo especial, quieres saber más de una tela o tienes una duda sobre alguna pieza? Cuéntame qué tienes en mente.</p>
          <div className="mt-9 border-y border-border py-5 text-xs text-muted-foreground"><strong className="font-semibold text-foreground">Antes de publicar:</strong> el correo de contacto es provisional y este formulario todavía no envía mensajes.</div>
          <ul className="mt-7 space-y-4 text-sm">
            <li className="flex items-center gap-3"><Mail className="text-accent" size={17} /><span>Correo: por confirmar</span></li>
            <li className="flex items-center gap-3"><MessageCircle className="text-accent" size={17} /><span>Encargos personalizados</span></li>
            <li className="flex items-center gap-3"><Instagram className="text-accent" size={17} /><span>@pingolinohandmade</span></li>
          </ul>
          <p className="mt-8 max-w-sm text-[10px] leading-relaxed text-muted-foreground">Para poner esta página en producción, habrá que confirmar el correo, el número de contacto y el destino del formulario.</p>
        </div>
        {sent ? (
          <div className="flex min-h-[390px] items-center justify-center border border-border bg-secondary/45 px-7 py-10 text-center md:min-h-[520px]">
            <div className="max-w-sm"><p className="section-kicker">Demostración</p><p className="mt-3 font-display text-4xl">El formulario funciona como maqueta.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">No se ha enviado ni guardado ningún mensaje. Cuando se confirme el canal de contacto, se puede conectar a un servicio real.</p><button onClick={() => setSent(false)} className="mt-6 border-b border-foreground pb-1 text-xs">Volver al formulario</button></div>
          </div>
        ) : (
          <form className="border border-border bg-card p-6 sm:p-9 md:p-10" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-accent">Cuéntanos un poquito</p>
            <h2 className="mt-3 font-display text-4xl">¿En qué te ayudamos?</h2>
            <p className="mt-2 text-xs text-muted-foreground">Prueba visual; el mensaje no se envía.</p>
            <label className="mt-7 block text-xs font-semibold" htmlFor="contact-name">Tu nombre<input id="contact-name" required type="text" autoComplete="name" className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm font-normal outline-none focus:border-primary" placeholder="Nombre" /></label>
            <label className="mt-5 block text-xs font-semibold" htmlFor="contact-email">Tu correo<input id="contact-email" required type="email" autoComplete="email" className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm font-normal outline-none focus:border-primary" placeholder="nombre@ejemplo.com" /></label>
            <label className="mt-5 block text-xs font-semibold" htmlFor="contact-reason">¿De qué hablamos?<select id="contact-reason" className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm font-normal"><option>Una pieza personalizada</option><option>Una duda sobre el catálogo</option><option>Una colaboración</option><option>Otra cosa</option></select></label>
            <label className="mt-5 block text-xs font-semibold" htmlFor="contact-message">Tu mensaje<textarea id="contact-message" required rows={5} className="mt-2 w-full resize-y border border-input bg-background px-4 py-3 text-sm font-normal outline-none focus:border-primary" placeholder="Cuéntanos tu idea…" /></label>
            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-accent">Probar formulario <ArrowRight size={14} /></button>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
