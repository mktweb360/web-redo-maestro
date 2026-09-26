import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/tienda/$slug" params={{ slug: product.slug }} className="group block min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img src={product.images[0]} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.035]" />
        {product.images[1] && (
          <img src={product.images[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100" />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.personalizable && <span className="bg-background/95 px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em]">Personalizable</span>}
          {!product.available && <span className="bg-foreground px-2 py-1 text-[10px] uppercase tracking-wider text-background">Agotado</span>}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-t border-border pt-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">{product.category}</p>
          <h3 className="mt-1 font-display text-2xl leading-none transition-colors group-hover:text-primary">{product.name}</h3>
        </div>
        <p className="whitespace-nowrap text-sm">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
