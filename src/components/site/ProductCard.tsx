import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/tienda/$slug" params={{ slug: product.slug }} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img src={product.images[0]} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {product.images[1] && (
          <img src={product.images[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100" />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.personalizable && <span className="bg-background px-2 py-1 text-[10px] uppercase tracking-wider">Personalizable</span>}
          {!product.available && <span className="bg-foreground px-2 py-1 text-[10px] uppercase tracking-wider text-background">Agotado</span>}
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-display text-xl leading-tight">{product.name}</h3>
        </div>
        <p className="whitespace-nowrap text-sm">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
