import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  formatPrice,
  getCategoryForProduct,
  productImage,
  productImageAlt,
  productSrcSet,
  type Product,
} from "@/lib/catalog";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const category = getCategoryForProduct(product);
  const src = product.images[0];
  return (
    <Link to="/$slug" params={{ slug: product.slug }} className="group block min-w-0">
      <div className="product-card-image relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={productImage(src, 600)}
          srcSet={productSrcSet(src, [300, 450, 600, 900])}
          sizes="(min-width: 1024px) 23vw, (min-width: 768px) 31vw, 48vw"
          alt={productImageAlt(product, 0)}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={600}
          height={750}
          className="h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.025] sm:p-3"
        />
        <span className="absolute left-3 top-3 bg-background/90 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
          {category?.name ?? product.category}
        </span>
        {product.personalizable && (
          <span className="absolute bottom-3 left-3 bg-background/90 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em]">
            Con su nombre
          </span>
        )}
        {!product.available && (
          <span className="absolute right-3 top-3 bg-foreground px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-background">
            Agotado
          </span>
        )}
        <span
          className="product-arrow absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-background text-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-primary group-hover:text-primary-foreground"
          aria-hidden="true"
        >
          <ArrowUpRight size={17} strokeWidth={1.6} />
        </span>
      </div>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 border-t border-border/80 pt-3">
        <div className="min-w-0">
          <h3 className="font-display text-[21px] leading-[1.05] transition-colors group-hover:text-primary sm:text-[23px]">
            {product.name}
          </h3>
          {product.subtitle && (
            <p className="mt-1.5 truncate text-xs text-muted-foreground">{product.subtitle}</p>
          )}
        </div>
        <p className="whitespace-nowrap pt-0.5 text-sm font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
