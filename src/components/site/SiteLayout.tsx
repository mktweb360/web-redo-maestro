import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Menu, Minus, Plus, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING, formatPrice } from "@/lib/catalog";

const nav = [
  { to: "/tienda", label: "Tienda" },
  { to: "/nosotros", label: "Nuestra historia" },
  { to: "/blog", label: "Blog" },
  { to: "/envios", label: "Envíos y FAQ" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const cart = useCart();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-primary px-4 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-primary-foreground">
        Envío gratis desde {formatPrice(FREE_SHIPPING)} <span className="mx-2 opacity-50">•</span> Hecho a mano en España
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[44px_minmax(0,1fr)_44px] items-center px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <button className="grid size-10 place-items-center lg:hidden" aria-label="Abrir menú" onClick={() => setMenu(true)}>
            <Menu size={22} />
          </button>
          <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.14em] lg:flex">
            {nav.slice(0, 2).map((n) => (
              <Link key={n.to} to={n.to} className="hover:text-accent" activeProps={{ className: "text-accent" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/" className="min-w-0 text-center font-display text-[clamp(1.55rem,2.5vw,2.1rem)] leading-none">
            Pingolino <span className="italic text-accent">handmade</span>
          </Link>
          <div className="flex items-center justify-end gap-7">
            <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.14em] lg:flex">
              {nav.slice(2).map((n) => (
                <Link key={n.to} to={n.to} className="hover:text-accent" activeProps={{ className: "text-accent" }}>{n.label}</Link>
              ))}
            </nav>
          <button onClick={() => cart.setOpen(true)} className="relative grid size-10 shrink-0 place-items-center transition-transform hover:scale-105" aria-label="Abrir carrito">
            <ShoppingBag size={22} />
            {cart.count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] text-accent-foreground">
                {cart.count}
              </span>
            )}
          </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-50 bg-background p-6 md:hidden">
          <button aria-label="Cerrar menú" onClick={() => setMenu(false)}><X /></button>
          <nav className="mt-10 flex flex-col gap-6 font-display text-4xl">
            <Link to="/" onClick={() => setMenu(false)}>Inicio</Link>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)}>{n.label}</Link>
            ))}
          </nav>
        </div>
      )}

      <main>{children}</main>

      <footer className="mt-28 bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-[1.5fr_.6fr_.6fr] lg:px-8">
          <div>
            <p className="max-w-xl font-display text-5xl leading-none md:text-6xl">Historias pequeñas,<br/><em className="text-cover-accent">recuerdos enormes.</em></p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-70">Novedades del taller, nuevas telas y piezas pensadas para regalar.</p>
            <form className="mt-8 flex max-w-md border-b border-background/40" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Tu correo electrónico" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-background/50" />
              <button className="grid size-11 place-items-center" aria-label="Suscribirme"><ArrowRight size={18}/></button>
            </form>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="mb-2 text-xs uppercase tracking-widest opacity-60">Explora</p>
            {nav.map((n) => <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100">{n.label}</Link>)}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="mb-2 text-xs uppercase tracking-widest opacity-60">Síguenos</p>
            <span className="flex items-center gap-2 opacity-80"><Instagram size={16} /> Instagram</span>
            <span className="flex items-center gap-2 opacity-80"><Facebook size={16} /> Facebook</span>
            <span className="opacity-80">TikTok</span>
          </div>
        </div>
        <div className="border-t border-background/15 px-5 py-5 text-center text-xs opacity-60">
          © 2026 Pingolino Handmade · Términos · Privacidad · Envíos y devoluciones
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
  const left = FREE_SHIPPING - cart.subtotal;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/40" onClick={() => cart.setOpen(false)}>
      <aside className="flex h-full w-full max-w-md flex-col bg-background" onClick={(e) => e.stopPropagation()} aria-label="Carrito">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-3xl">Tu cesta</h2>
          <button aria-label="Cerrar carrito" onClick={() => cart.setOpen(false)}><X /></button>
        </div>
        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <p className="font-display text-4xl">¡Gracias!</p>
            <p className="mt-3 text-sm text-muted-foreground">Este es un pago de demostración. En la web final aquí se conectará la pasarela de pago segura.</p>
            <button className="mt-6 bg-primary px-6 py-3 text-sm text-primary-foreground" onClick={() => { setDone(false); cart.setOpen(false); }}>Seguir explorando</button>
          </div>
        ) : cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground">Tu cesta está vacía.</p>
            <Link to="/tienda" onClick={() => cart.setOpen(false)} className="mt-4 bg-primary px-6 py-3 text-sm text-primary-foreground">Ver la tienda</Link>
          </div>
        ) : (
          <>
            <div className="bg-muted px-5 py-3 text-xs">
              {left > 0 ? <>Te faltan <strong>{formatPrice(left)}</strong> para el envío gratis.</> : <>¡Tienes <strong>envío gratis</strong>!</>}
            </div>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {cart.lines.map((l, i) => (
                <li key={i} className="flex gap-4 py-4">
                  <img src={l.product.images[0]} alt={l.product.name} className="h-20 w-20 object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{l.product.name}</p>
                    {l.personalization && <p className="text-xs text-muted-foreground">Nombre: {l.personalization}</p>}
                    <div className="mt-2 flex items-center gap-3">
                      <button aria-label="Quitar uno" onClick={() => cart.update(i, l.qty - 1)}><Minus size={14} /></button>
                      <span>{l.qty}</span>
                      <button aria-label="Añadir uno" onClick={() => cart.update(i, l.qty + 1)}><Plus size={14} /></button>
                    </div>
                  </div>
                  <p className="text-sm">{formatPrice(l.qty * l.product.price)}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-border p-5">
              <div className="flex justify-between text-sm"><span>Subtotal</span><strong>{formatPrice(cart.subtotal)}</strong></div>
              <button className="mt-4 w-full bg-primary py-3 text-sm text-primary-foreground" onClick={() => { cart.clear(); setDone(true); }}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
