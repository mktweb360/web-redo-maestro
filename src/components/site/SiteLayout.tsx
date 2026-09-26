import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Menu, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import {
  FREE_SHIPPING,
  formatPrice,
  productImage,
  productImageAlt,
  productsInCategory,
  shopCategories,
} from "@/lib/catalog";
import { BRAND } from "@/lib/site";

const nav = [
  { to: "/tienda", label: "Tienda" },
  { to: "/nosotros", label: "La historia" },
  { to: "/blog", label: "Diario" },
  { to: "/envios", label: "Ayuda" },
] as const;

const shopNav = shopCategories.filter((c) => productsInCategory(c).length > 0);

export function SiteLayout({ children }: { children: ReactNode; headerOverlay?: boolean }) {
  const [menu, setMenu] = useState(false);
  const cart = useCart();

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menu]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-background focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <div className="bg-primary px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-primary-foreground sm:text-[11px]">
        Cosido a mano en España <span className="mx-2 opacity-60">·</span> Envío gratis desde{" "}
        {formatPrice(FREE_SHIPPING)}
      </div>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-8 lg:px-12">
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Pingolino Handmade, inicio"
          >
            <span
              className="grid size-9 place-items-center rounded-full border border-primary/40 font-display text-[22px] italic text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              aria-hidden="true"
            >
              p
            </span>
            <span className="font-display text-[22px] leading-none tracking-[-0.035em] sm:text-[25px]">
              pingolino <i className="font-normal text-accent-strong">handmade</i>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:text-accent-strong"
                activeProps={{
                  className:
                    "nav-link py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-strong",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="rounded-full border border-primary/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Hablemos
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => cart.setOpen(true)}
              className="relative grid size-11 place-items-center rounded-full transition-colors hover:bg-secondary"
              aria-label={`Abrir cesta (${cart.count} ${cart.count === 1 ? "artículo" : "artículos"})`}
            >
              <ShoppingBag size={19} strokeWidth={1.6} />
              {cart.count > 0 && (
                <span className="absolute right-0 top-0 grid min-h-[17px] min-w-[17px] place-items-center rounded-full bg-accent px-1 text-[9px] font-semibold text-accent-foreground">
                  {cart.count}
                </span>
              )}
            </button>
            <button
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-secondary lg:hidden"
              aria-label="Abrir menú"
              aria-expanded={menu}
              onClick={() => setMenu(true)}
            >
              <Menu size={21} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-background p-6 md:p-9 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
        >
          <div className="flex items-center justify-between border-b border-border pb-5">
            <Link to="/" onClick={() => setMenu(false)} className="font-display text-2xl">
              pingolino <i className="text-accent-strong">handmade</i>
            </Link>
            <button
              aria-label="Cerrar menú"
              onClick={() => setMenu(false)}
              className="grid size-11 place-items-center rounded-full border border-border"
            >
              <X size={19} />
            </button>
          </div>
          <nav className="mt-8 flex flex-col" aria-label="Navegación móvil">
            {[
              { to: "/", label: "Inicio" } as const,
              ...nav,
              { to: "/contacto", label: "Contacto" } as const,
            ].map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenu(false)}
                className="flex items-baseline gap-4 border-b border-border py-4 font-display text-4xl tracking-tight"
              >
                <span className="font-sans text-[10px] text-accent-strong">0{index + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-9 section-kicker">Colecciones</p>
          <nav className="mt-3 flex flex-wrap gap-2" aria-label="Colecciones">
            {shopNav.map((c) => (
              <Link
                key={c.slug}
                to="/$slug"
                params={{ slug: c.slug }}
                onClick={() => setMenu(false)}
                className="rounded-full border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em]"
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Coser despacio · vivirlo todo
          </p>
        </div>
      )}

      <main id="contenido">{children}</main>

      <footer className="mt-24 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.25fr_.6fr_.6fr_.8fr] md:gap-10 md:py-20 lg:px-12">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
              Taller artesanal · España
            </p>
            <p className="mt-4 max-w-xl font-display text-5xl leading-[0.95] md:text-6xl">
              Historias pequeñas,
              <br />
              <i className="font-normal text-cover-accent">recuerdos enormes.</i>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/80">
              Textiles para bebés y familias, cosidos a mano uno a uno. Muchos, con el nombre
              bordado.
            </p>
            <Link
              to="/tienda"
              className="mt-7 inline-flex items-center gap-2 border-b border-primary-foreground/50 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
            >
              Ver la tienda <ArrowRight size={14} />
            </Link>
          </div>
          <nav className="flex flex-col gap-3 text-sm" aria-label="Colecciones">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Colecciones
            </p>
            {shopNav.map((c) => (
              <Link
                key={c.slug}
                to="/$slug"
                params={{ slug: c.slug }}
                className="w-fit text-primary-foreground/85 transition-colors hover:text-cover-accent"
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-3 text-sm" aria-label="Pingolino">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Pingolino
            </p>
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="w-fit text-primary-foreground/85 transition-colors hover:text-cover-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="w-fit text-primary-foreground/85 transition-colors hover:text-cover-accent"
            >
              Contacto
            </Link>
          </nav>
          <div className="flex flex-col gap-3 text-sm">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Hablemos
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="w-fit break-all text-primary-foreground/85 hover:text-cover-accent"
            >
              {BRAND.email}
            </a>
            <a
              href={BRAND.phoneHref}
              className="w-fit text-primary-foreground/85 hover:text-cover-accent"
            >
              {BRAND.phone}
            </a>
            {BRAND.social["tiktok"] && (
              <a
                href={BRAND.social["tiktok"]}
                target="_blank"
                rel="noopener"
                className="w-fit text-primary-foreground/85 hover:text-cover-accent"
              >
                TikTok · @pingolinohandmade
              </a>
            )}
          </div>
        </div>
        <div className="border-t border-primary-foreground/15 px-5 py-5 text-center text-[11px] tracking-wide text-primary-foreground/75 sm:px-8 md:flex md:items-center md:justify-between md:text-left lg:px-12">
          <span>
            © {new Date().getFullYear()} {BRAND.name} · Hecho a mano en España
          </span>
          <span className="mt-2 flex justify-center gap-4 md:mt-0">
            <Link to="/envios" className="hover:text-cover-accent">
              Envíos y devoluciones
            </Link>
            <a href={BRAND.privacyPolicyUrl} rel="noopener" className="hover:text-cover-accent">
              Política de privacidad
            </a>
          </span>
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

  if (!open) return null;
  const left = Math.max(0, FREE_SHIPPING - cart.subtotal);
  const progress = Math.min(100, Math.round((cart.subtotal / FREE_SHIPPING) * 100));

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-end bg-foreground/40 backdrop-blur-[2px]"
      onClick={() => setOpen(false)}
    >
      <aside
        className="flex h-full w-full max-w-[440px] flex-col bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        aria-label="Cesta de la compra"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="section-kicker">Tu selección</p>
            <h2 className="mt-1 font-display text-3xl">
              La cesta <span className="text-muted-foreground">({cart.count})</span>
            </h2>
          </div>
          <button
            ref={closeRef}
            aria-label="Cerrar cesta"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-full border border-border hover:bg-secondary"
          >
            <X size={18} />
          </button>
        </div>
        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={26} strokeWidth={1.4} className="text-accent-strong" />
            <p className="mt-5 font-display text-3xl">Aún no hay nada aquí.</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Cuando una pieza te encuentre, guárdala en tu cesta.
            </p>
            <Link
              to="/tienda"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs font-semibold uppercase tracking-[0.12em]"
            >
              Descubrir la tienda <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 text-xs text-muted-foreground">
              {left > 0 ? (
                <>
                  Te faltan <strong className="text-foreground">{formatPrice(left)}</strong> para el
                  envío gratis.
                </>
              ) : (
                <>
                  Esta cesta incluye <strong className="text-primary">envío gratis.</strong>
                </>
              )}
              <div className="mt-2 h-1 w-full bg-secondary" aria-hidden="true">
                <div className="h-1 bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {cart.lines.map((line, index) => (
                <li
                  key={`${line.slug}-${line.option ?? ""}-${line.personalization ?? ""}`}
                  className="flex gap-4 py-5"
                >
                  <img
                    src={productImage(line.product.images[0], 200)}
                    alt={productImageAlt(line.product, 0)}
                    width={76}
                    height={96}
                    className="h-24 w-[76px] bg-secondary object-contain p-1"
                  />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-medium leading-snug">{line.product.name}</p>
                    {line.option && (
                      <p className="mt-1 text-xs text-muted-foreground">{line.option}</p>
                    )}
                    {line.personalization && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Nombre a bordar: {line.personalization}
                      </p>
                    )}
                    <div className="mt-3 inline-flex items-center gap-1 border border-border">
                      <button
                        className="grid size-9 place-items-center"
                        aria-label={`Quitar una unidad de ${line.product.name}`}
                        onClick={() => cart.update(index, line.qty - 1)}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-4 text-center text-xs" aria-live="polite">
                        {line.qty}
                      </span>
                      <button
                        className="grid size-9 place-items-center"
                        aria-label={`Añadir una unidad de ${line.product.name}`}
                        onClick={() => cart.update(index, line.qty + 1)}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <p className="whitespace-nowrap text-sm">
                    {formatPrice(line.qty * line.product.price)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-6 py-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <strong>{formatPrice(cart.subtotal)}</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Los gastos de envío se calculan en el pago.
              </p>
              <a
                href={cart.checkoutUrl}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-foreground"
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
