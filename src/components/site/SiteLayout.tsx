import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Menu, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING, formatPrice } from "@/lib/catalog";

const nav = [
  { to: "/tienda", label: "Tienda" },
  { to: "/nosotros", label: "La historia" },
  { to: "/blog", label: "Diario" },
  { to: "/envios", label: "Ayuda" },
] as const;

export function SiteLayout({ children }: { children: ReactNode; headerOverlay?: boolean }) {
  const [menu, setMenu] = useState(false);
  const cart = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-primary px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-primary-foreground sm:text-[11px]">
        Hecho en nuestro pequeño taller <span className="mx-2 opacity-60">·</span> Envío gratis desde {formatPrice(FREE_SHIPPING)}
      </div>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-8 lg:px-12">
          <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Pingolino Handmade, inicio">
            <span className="grid size-9 place-items-center rounded-full border border-primary/40 font-display text-[22px] italic text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">p</span>
            <span className="font-display text-[22px] leading-none tracking-[-0.035em] sm:text-[25px]">pingolino <i className="font-normal text-accent">handmade</i></span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:text-accent" activeProps={{ className: "nav-link py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent" }}>{item.label}</Link>
            ))}
            <Link to="/contacto" className="rounded-full border border-primary/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-primary hover:text-primary-foreground">Hablemos</Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => cart.setOpen(true)} className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary" aria-label={`Abrir cesta${cart.count ? `, ${cart.count} artículos` : ""}`}>
              <ShoppingBag size={19} strokeWidth={1.6} />
              <span className="absolute -right-0.5 -top-0.5 grid min-h-[17px] min-w-[17px] place-items-center rounded-full bg-accent px-1 text-[9px] font-semibold text-accent-foreground">{cart.count}</span>
            </button>
            <button className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary lg:hidden" aria-label="Abrir menú" aria-expanded={menu} onClick={() => setMenu(true)}><Menu size={21} strokeWidth={1.6} /></button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-[60] bg-background p-6 md:p-9 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú principal">
          <div className="flex items-center justify-between border-b border-border pb-5">
            <Link to="/" onClick={() => setMenu(false)} className="font-display text-2xl">pingolino <i className="text-accent">handmade</i></Link>
            <button aria-label="Cerrar menú" onClick={() => setMenu(false)} className="grid size-10 place-items-center rounded-full border border-border"><X size={19} /></button>
          </div>
          <nav className="mt-10 flex flex-col" aria-label="Navegación móvil">
            {[{ to: "/", label: "Inicio" }, ...nav, { to: "/contacto", label: "Contacto" }].map((item, index) => (
              <Link key={item.to} to={item.to} onClick={() => setMenu(false)} className="flex items-baseline gap-4 border-b border-border py-4 font-display text-4xl tracking-tight"><span className="font-sans text-[10px] text-accent">0{index + 1}</span>{item.label}</Link>
            ))}
          </nav>
          <p className="absolute bottom-8 left-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Coser despacio · vivirlo todo</p>
        </div>
      )}

      <main>{children}</main>

      <footer className="mt-24 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.35fr_.65fr_.75fr] md:gap-10 md:py-20 lg:px-12">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/65">Un correo de vez en cuando</p>
            <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.95] md:text-6xl">Novedades cosidas<br /><i className="font-normal text-cover-accent">con cariño.</i></h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/75">Nuevas telas, piezas del taller e ideas para acompañar los días pequeños.</p>
            <p className="mt-5 text-xs text-primary-foreground/55">La suscripción está en modo demostración y aún no recoge direcciones.</p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/55">Descubre</p>
            {nav.map((item) => <Link key={item.to} to={item.to} className="w-fit text-primary-foreground/85 transition-colors hover:text-cover-accent">{item.label}</Link>)}
            <Link to="/contacto" className="w-fit text-primary-foreground/85 transition-colors hover:text-cover-accent">Contacto</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/55">Pingolino</p>
            <Link to="/nosotros" className="w-fit text-primary-foreground/85 hover:text-cover-accent">Una historia familiar</Link>
            <Link to="/envios" className="w-fit text-primary-foreground/85 hover:text-cover-accent">Envíos y preguntas</Link>
            <span className="mt-3 flex items-center gap-2 text-primary-foreground/85"><Instagram size={15} /> @pingolinohandmade</span>
            <span className="text-xs text-primary-foreground/55">Redes y datos de contacto sujetos a confirmación</span>
          </div>
        </div>
        <div className="border-t border-primary-foreground/15 px-5 py-5 text-center text-[10px] tracking-wide text-primary-foreground/55 sm:px-8 md:flex md:items-center md:justify-between md:text-left lg:px-12">
          <span>© {new Date().getFullYear()} Pingolino Handmade · Hecho a mano en España</span>
          <span className="mt-2 block md:mt-0">Tienda y formularios de esta propuesta: demostración, sin pagos ni envíos activos</span>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}

function CartDrawer() {
  const cart = useCart();
  const [done, setDone] = useState(false);
  if (!cart.open) return null;
  const left = Math.max(0, FREE_SHIPPING - cart.subtotal);

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-foreground/40 backdrop-blur-[2px]" onClick={() => { cart.setOpen(false); setDone(false); }}>
      <aside className="flex h-full w-full max-w-[440px] flex-col bg-background shadow-2xl" onClick={(event) => event.stopPropagation()} aria-label="Cesta de la compra" role="dialog" aria-modal="true">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Tu selección</p><h2 className="mt-1 font-display text-3xl">La cesta <span className="text-muted-foreground">({cart.count})</span></h2></div>
          <button aria-label="Cerrar cesta" onClick={() => { cart.setOpen(false); setDone(false); }} className="grid size-10 place-items-center rounded-full border border-border hover:bg-secondary"><X size={18} /></button>
        </div>
        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-secondary font-display text-3xl text-primary">✓</span>
            <p className="mt-6 font-display text-4xl">Gracias por imaginarlo.</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">Este checkout es solo una demostración; no se ha procesado ningún pago ni pedido.</p>
            <button className="mt-7 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground" onClick={() => { setDone(false); cart.setOpen(false); }}>Seguir explorando</button>
          </div>
        ) : cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={26} strokeWidth={1.4} className="text-accent" />
            <p className="mt-5 font-display text-3xl">Aún no hay nada aquí.</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">Cuando una pieza te encuentre, guárdala en tu cesta.</p>
            <Link to="/tienda" onClick={() => cart.setOpen(false)} className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs font-semibold uppercase tracking-[0.12em]">Descubrir la tienda <ArrowRight size={14} /></Link>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 text-xs text-muted-foreground">{left > 0 ? <>Te faltan <strong className="text-foreground">{formatPrice(left)}</strong> para el envío gratis.</> : <>Esta cesta incluye <strong className="text-primary">envío gratis.</strong></>}</div>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {cart.lines.map((line, index) => (
                <li key={`${line.slug}-${index}`} className="flex gap-4 py-5">
                  <img src={line.product.images[0]} alt={line.product.name} className="h-24 w-[76px] bg-muted object-cover" />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-medium leading-snug">{line.product.name}</p>
                    {line.personalization && <p className="mt-1 text-xs text-muted-foreground">Bordado: {line.personalization}</p>}
                    <div className="mt-3 inline-flex items-center gap-3 border border-border px-2 py-1.5">
                      <button aria-label="Quitar una unidad" onClick={() => cart.update(index, line.qty - 1)}><Minus size={13} /></button><span className="min-w-4 text-center text-xs">{line.qty}</span><button aria-label="Añadir una unidad" onClick={() => cart.update(index, line.qty + 1)}><Plus size={13} /></button>
                    </div>
                  </div>
                  <p className="whitespace-nowrap text-sm">{formatPrice(line.qty * line.product.price)}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-6 py-5">
              <div className="flex justify-between text-sm"><span>Subtotal</span><strong>{formatPrice(cart.subtotal)}</strong></div>
              <p className="mt-1 text-xs text-muted-foreground">Impuestos y envío calculados al confirmar.</p>
              <button className="mt-5 w-full rounded-full bg-primary py-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-accent" onClick={() => { cart.clear(); setDone(true); }}>Continuar · demostración</button>
              <p className="mt-3 text-center text-[10px] text-muted-foreground">Sin pasarela de pago conectada.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
