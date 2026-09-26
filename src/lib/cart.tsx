import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./catalog";

type Line = { slug: string; qty: number; personalization?: string | undefined };
type CartCtx = {
  lines: (Line & { product: Product })[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, qty?: number, personalization?: string) => void;
  update: (index: number, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "pingolino-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setRaw(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(raw));
  }, [raw, ready]);

  const lines = raw.flatMap((l) => {
    const product = getProduct(l.slug);
    return product ? [{ ...l, product }] : [];
  });

  const value: CartCtx = {
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
    open,
    setOpen,
    add: (slug, qty = 1, personalization) => {
      setRaw((prev) => {
        const i = prev.findIndex((l) => l.slug === slug && l.personalization === personalization);
        if (i >= 0) return prev.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { slug, qty, personalization }];
      });
      setOpen(true);
    },
    update: (index, qty) =>
      setRaw((prev) => (qty <= 0 ? prev.filter((_, j) => j !== index) : prev.map((l, j) => (j === index ? { ...l, qty } : l)))),
    clear: () => setRaw([]),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
