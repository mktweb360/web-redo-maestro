import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./catalog";
import { SHOPIFY_DOMAIN } from "./site";

type Line = {
  slug: string;
  qty: number;
  personalization?: string | undefined;
  option?: string | undefined;
};
export type CartLine = Line & { product: Product; variantId: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, qty?: number, personalization?: string, option?: string) => void;
  update: (index: number, qty: number) => void;
  clear: () => void;
  checkoutUrl: string;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "pingolino-cart";

const variantFor = (product: Product, option?: string) =>
  product.options.find((o) => o.label === option)?.shopifyVariantId ?? product.shopifyVariantId;

const base64Url = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/**
 * Enlace permanente de carrito de Shopify (cart permalink):
 * https://{tienda}.myshopify.com/cart/{variante}:{cantidad},...
 * Documentación: https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks
 *
 * - `properties` (Base64 URL) solo se aplica a la PRIMERA línea: se usa para su bordado.
 * - Todos los bordados se envían además como `attributes[...]`, que Shopify muestra
 *   en los detalles del pedido, para que ninguno se pierda con varias líneas.
 */
export function buildCheckoutUrl(lines: CartLine[]): string {
  if (lines.length === 0) return "";
  // Las líneas personalizadas primero, para que la primera lleve su bordado como propiedad.
  const ordered = [...lines].sort(
    (a, b) => Number(Boolean(b.personalization)) - Number(Boolean(a.personalization)),
  );
  const items = ordered.map((l) => `${l.variantId}:${l.qty}`).join(",");
  const params = new URLSearchParams();
  const first = ordered[0];
  if (first?.personalization)
    params.set(
      "properties",
      base64Url(JSON.stringify({ "Nombre a bordar": first.personalization })),
    );
  ordered.forEach((l, i) => {
    if (l.personalization) {
      const label = `Bordado ${i + 1} · ${l.product.name}${l.option ? ` (${l.option})` : ""}`;
      params.set(`attributes[${label}]`, l.personalization);
    }
  });
  params.set("attributes[Origen]", "pingolinohandmade.com");
  return `https://${SHOPIFY_DOMAIN}/cart/${items}?${params.toString()}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Line[];
      // Descarta líneas de productos que ya no existen o cambiaron de slug.
      setRaw(Array.isArray(stored) ? stored.filter((l) => getProduct(l.slug)) : []);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(raw));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [raw, ready]);

  const lines: CartLine[] = raw.flatMap((l) => {
    const product = getProduct(l.slug);
    return product ? [{ ...l, product, variantId: variantFor(product, l.option) }] : [];
  });

  const value: CartCtx = {
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
    open,
    setOpen,
    add: (slug, qty = 1, personalization, option) => {
      setRaw((prev) => {
        const i = prev.findIndex(
          (l) => l.slug === slug && l.personalization === personalization && l.option === option,
        );
        if (i >= 0) return prev.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { slug, qty, personalization, option }];
      });
      setOpen(true);
    },
    update: (index, qty) =>
      setRaw((prev) =>
        qty <= 0
          ? prev.filter((_, j) => j !== index)
          : prev.map((l, j) => (j === index ? { ...l, qty } : l)),
      ),
    clear: () => setRaw([]),
    checkoutUrl: buildCheckoutUrl(lines),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
