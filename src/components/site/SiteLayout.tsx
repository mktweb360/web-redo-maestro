import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Menu, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import {
  FREE_SHIPPING,
  formatPrice,
  productImageAlt,
  productsInCategory,
  shopCategories,
} from "@/lib/catalog";
import { BRAND } from "@/lib/site";

const nav = [
  { to: "/tienda", label: "Tienda" },
  { to: "/nosotros", label: "Nuestra historia" },
  { to: "/blog", label: "Blog" },
  { to: "/envios", label: "Envíos y FAQ" },
  { to: "/contacto", label: "Contacto" },
] as const;

const shopNav = shopCategories.filter((c) => productsInCategory(c).length > 0);

export function SiteLayout({
  children,
  headerOverlay = false,
}: {
  children: ReactNode;
  headerOverlay?: boolean;
}) {
  const [menu, setMenu] = useState(false);
  const cart = useCart();

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <div
        className={
          headerOverlay ? "absolute inset-x-0 top-0 z-40 text-primary-foreground" : undefined
        }
      >
        <div
          className={
            headerOverlay
              ? "border-b border-primary-foreground/25 bg-foreground/30 px-4 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.22em]"
              : "bg-primary px-4 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-primary-foreground"
          }
        >
          Envío gratis desde {formatPrice(FREE_SHIPPING)} <span className="mx-2 opacity-50">•</span>{" "}
          Hecho a mano en España
        </div>
        <header
          className={
            headerOverlay
              ? "border-b border-primary-foreground/25 bg-foreground/15 backdrop-blur-[2px]"
              : "sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md"
          }
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
            <Link
              to="/"
              className="min-w-0 shrink-0 font-display text-[clamp(1.55rem,2.5vw,2.1rem)] leading-none"
              aria-label="Pingolino Handmade — inicio"
            >
              Pingolino{" "}
              <span
                className={headerOverlay ? "italic text-cover-accent" : "italic text-accent-strong"}
              >
                handmade
              </span>
            </Link>
            <div className="flex items-center justify-end gap-2 lg:gap-7">
              <nav
                aria-label="Principal"
                className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.14em] lg:flex"
              >
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={
                      headerOverlay ? "hover:text-cover-accent" : "hover:text-accent-strong"
                    }
                    activeProps={{
                      className: headerOverlay ? "text-cover-accent" : "text-accent-strong",
                    }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <button
                onClick={() => cart.setOpen(true)}
                className="relative grid size-11 shrink-0 place-items-center transition-transform hover:scale-105"
                aria-label={`Abrir cesta (${cart.count} ${cart.count === 1 ? "artículo" : "artículos"})`}
              >
                <ShoppingBag size={22} />
                {cart.count > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] text-accent-foreground">
                    {cart.count}
                  </span>
                )}
              </button>
              <button
                className="grid size-11 place-items-center lg:hidden"
                aria-label="Abrir menú"
                aria-expanded={menu}
                onClick={() => setMenu(true)}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {menu && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-background p-6 text-foreground lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
        >
          <button
            aria-label="Cerrar menú"
            className="grid size-11 place-items-center"
            onClick={() => setMenu(false)}
          >
            <X />
          </button>
          <nav className="mt-6 flex flex-col gap-5 font-display text-4xl" aria-label="Menú móvil">
            <Link to="/" onClick={() => setMenu(false)}>
              Inicio
            </Link>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Categorías
          </p>
          <nav className="mt-4 flex flex-col gap-3 text-lg" aria-label="Categorías">
            {shopNav.map((c) => (
              <Link
                key={c.slug}
                to="/$slug"
                params={{ slug: c.slug }}
                onClick={() => setMenu(false)}
              >
                {c.title}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main id="contenido">{children}</main>

      <footer className="mt-28 bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-[1.3fr_.7fr_.7fr_.7fr] lg:px-8">
          <div>
            <p className="max-w-xl font-display text-5xl leading-none md:text-6xl">
              Historias pequeñas,
              <br />
              <em className="text-cover-accent">recuerdos enormes.</em>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-80">
              Taller artesanal de textiles para bebés y familias. Cosido a mano en España.
            </p>
            <Link
              to="/tienda"
              className="mt-8 inline-flex items-center gap-3 border-b border-background/50 pb-2 text-xs font-semibold uppercase tracking-[0.14em]"
            >
              Ver la tienda <ArrowRight size={15} />
            </Link>
          </div>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Categorías">
            <p className="mb-2 text-xs uppercase tracking-widest opacity-70">Tienda</p>
            {shopNav.map((c) => (
              <Link
                key={c.slug}
                to="/$slug"
                params={{ slug: c.slug }}
                className="opacity-85 hover:opacity-100"
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Información">
            <p className="mb-2 text-xs uppercase tracking-widest opacity-70">Información</p>
            {nav.slice(1).map((n) => (
              <Link key={n.to} to={n.to} className="opacity-85 hover:opacity-100">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 text-sm">
            <p className="mb-2 text-xs uppercase tracking-widest opacity-70">Contacto</p>
            <a href={`mailto:${BRAND.email}`} className="opacity-85 hover:opacity-100">
              {BRAND.email}
            </a>
            <a href={BRAND.phoneHref} className="opacity-85 hover:opacity-100">
              {BRAND.phone}
            </a>
            {BRAND.social["tiktok"] && (
              <a
                href={BRAND.social["tiktok"]}
                target="_blank"
                rel="noopener"
                className="opacity-85 hover:opacity-100"
              >
                TikTok @pingolinohandmade
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-background/15 px-5 py-5 text-center text-xs opacity-80">
          <span>
            © {new Date().getFullYear()} {BRAND.name}
          </span>
          <Link to="/envios">Envíos y devoluciones</Link>
          <a href={BRAND.privacyPolicyUrl} rel="noopener">
            Política de privacidad
          </a>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}

function CartDrawer() {
  const cart = useCart();
  const { open, setOpen } = cart;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, setOpen]);

  if (!cart.open) return null;
  const left = FREE_SHIPPING - cart.subtotal;
  const progress = Math.min(100, Math.round((cart.subtotal / FREE_SHIPPING) * 100));
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-foreground/40"
      onClick={() => cart.setOpen(false)}
    >
      <aside
        className="flex h-full w-full max-w-md flex-col bg-background"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Tu cesta"
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-3xl">Tu cesta</h2>
          <button
            ref={closeRef}
            aria-label="Cerrar cesta"
            className="grid size-11 place-items-center"
            onClick={() => cart.setOpen(false)}
          >
            <X />
          </button>
        </div>
        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground">Tu cesta está vacía.</p>
            <Link
              to="/tienda"
              onClick={() => cart.setOpen(false)}
              className="mt-4 bg-primary px-6 py-3 text-sm text-primary-foreground"
            >
              Ver la tienda
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-muted px-5 py-3 text-xs">
              {left > 0 ? (
                <>
                  Te faltan <strong>{formatPrice(left)}</strong> para el envío gratis.
                </>
              ) : (
                <>
                  ¡Tienes <strong>envío gratis</strong>!
                </>
              )}
              <div className="mt-2 h-1 w-full bg-background" aria-hidden="true">
                <div className="h-1 bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {cart.lines.map((l, i) => (
                <li
                  key={`${l.slug}-${l.option ?? ""}-${l.personalization ?? ""}`}
                  className="flex gap-4 py-4"
                >
                  <img
                    src={l.product.images[0]}
                    alt={productImageAlt(l.product, 0)}
                    className="h-20 w-20 object-cover"
                    width={80}
                    height={80}
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{l.product.name}</p>
                    {l.option && <p className="text-xs text-muted-foreground">{l.option}</p>}
                    {l.personalization && (
                      <p className="text-xs text-muted-foreground">
                        Nombre a bordar: {l.personalization}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-1">
                      <button
                        className="grid size-9 place-items-center"
                        aria-label={`Quitar una unidad de ${l.product.name}`}
                        onClick={() => cart.update(i, l.qty - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span aria-live="polite">{l.qty}</span>
                      <button
                        className="grid size-9 place-items-center"
                        aria-label={`Añadir una unidad de ${l.product.name}`}
                        onClick={() => cart.update(i, l.qty + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm">{formatPrice(l.qty * l.product.price)}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-border p-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <strong>{formatPrice(cart.subtotal)}</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Los gastos de envío se calculan en el pago.
              </p>
              <a
                href={cart.checkoutUrl}
                className="mt-4 flex w-full items-center justify-center gap-2 bg-primary py-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground hover:bg-foreground"
              >
                <Lock size={14} /> Finalizar compra
              </a>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Pago seguro procesado por Shopify.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
