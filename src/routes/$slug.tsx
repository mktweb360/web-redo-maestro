import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Lock, Minus, Plus, Scissors, Truck } from "lucide-react";
import { useRef, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  formatPrice,
  getCategory,
  getCategoryForProduct,
  getProduct,
  productImageAlt,
  products,
  productsInCategory,
  shopCategories,
  type Product,
  type ShopCategory,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { ORG_ID, breadcrumbLd, faqLd, seo } from "@/lib/seo";
import { BRAND, absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (category && productsInCategory(category).length > 0)
      return { kind: "category" as const, category };
    const product = getProduct(params.slug);
    if (product) return { kind: "product" as const, product };
    throw notFound();
  },
  head: ({ loaderData }) => {
    if (!loaderData) return seo({ title: "Página no encontrada", path: "/404", noindex: true });
    if (loaderData.kind === "category") {
      const c = loaderData.category;
      const list = productsInCategory(c);
      return seo({
        title: c.seoTitle,
        description: c.metaDescription,
        path: `/${c.slug}`,
        image: list[0]?.images[0],
        imageAlt: c.title,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: c.title,
            description: c.metaDescription,
            url: absoluteUrl(`/${c.slug}`),
            isPartOf: { "@id": `${absoluteUrl("/")}#website` },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: list.length,
              itemListElement: list.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absoluteUrl(`/${p.slug}`),
                name: p.name,
              })),
            },
          },
          breadcrumbLd([
            { name: "Inicio", path: "/" },
            { name: "Tienda", path: "/tienda" },
            { name: c.title, path: `/${c.slug}` },
          ]),
          ...(c.faqs.length ? [faqLd(c.faqs)] : []),
        ],
      });
    }
    const p = loaderData.product;
    const category = getCategoryForProduct(p);
    return seo({
      title: p.seoTitle,
      description: p.metaDescription,
      path: `/${p.slug}`,
      image: p.images[0],
      imageAlt: productImageAlt(p, 0),
      type: "product",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": `${absoluteUrl(`/${p.slug}`)}#product`,
          name: p.name,
          description: p.metaDescription,
          image: p.images.slice(0, 6).map((src) => absoluteUrl(src)),
          sku: String(p.shopifyVariantId),
          brand: { "@type": "Brand", name: BRAND.name },
          manufacturer: { "@id": ORG_ID },
          category: category?.title,
          ...(p.facts["Material"] || p.facts["Tejido"]
            ? { material: p.facts["Material"] ?? p.facts["Tejido"] }
            : {}),
          offers: {
            "@type": "Offer",
            url: absoluteUrl(`/${p.slug}`),
            price: p.price.toFixed(2),
            priceCurrency: "EUR",
            availability: p.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": ORG_ID },
          },
        },
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Tienda", path: "/tienda" },
          ...(category ? [{ name: category.title, path: `/${category.slug}` }] : []),
          { name: p.name, path: `/${p.slug}` },
        ]),
      ],
    });
  },
  notFoundComponent: CatalogNotFound,
  component: CatalogPage,
});

function CatalogNotFound() {
  return (
    <SiteLayout>
      <div className="px-5 py-32 text-center">
        <h1 className="font-display text-5xl">Esta página no existe</h1>
        <Link to="/tienda" className="mt-6 inline-block border-b border-foreground pb-1">
          Ver toda la tienda
        </Link>
      </div>
    </SiteLayout>
  );
}

function CatalogPage() {
  const data = Route.useLoaderData();
  return data.kind === "category" ? (
    <CategoryPage category={data.category} />
  ) : (
    <ProductPage product={data.product} />
  );
}

function Breadcrumbs({
  items,
}: {
  items: { label: string; slug?: string; to?: "/" | "/tienda" }[];
}) {
  return (
    <nav
      aria-label="Migas de pan"
      className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
    >
      <ol className="flex flex-wrap gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : item.slug ? (
              <Link to="/$slug" params={{ slug: item.slug }}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function CategoryPage({ category }: { category: ShopCategory }) {
  const [sort, setSort] = useState("destacados");
  let list = productsInCategory(category);
  if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
  const others = shopCategories.filter(
    (c) => c.slug !== category.slug && productsInCategory(c).length > 0,
  );

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs
            items={[
              { label: "Inicio", to: "/" },
              { label: "Tienda", to: "/tienda" },
              { label: category.title },
            ]}
          />
          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
            {category.eyebrow}
          </p>
          <div className="mt-4 grid items-end gap-6 md:grid-cols-[1fr_.7fr]">
            <h1 className="max-w-4xl font-display text-5xl leading-[0.92] md:text-7xl lg:text-8xl">
              {category.title}
            </h1>
            <p className="max-w-xl leading-relaxed text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <nav className="flex flex-wrap gap-x-5 gap-y-1" aria-label="Categorías de la tienda">
            <Link
              to="/tienda"
              className="border-b border-transparent px-1 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground hover:border-border hover:text-foreground"
            >
              Todo
            </Link>
            {shopCategories
              .filter((c) => c.inShopNav && productsInCategory(c).length > 0)
              .map((item) => (
                <Link
                  key={item.slug}
                  to="/$slug"
                  params={{ slug: item.slug }}
                  aria-current={item.slug === category.slug ? "page" : undefined}
                  className={`border-b px-1 py-2 text-xs font-medium uppercase tracking-[0.12em] ${item.slug === category.slug ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"}`}
                >
                  {item.name}
                </Link>
              ))}
          </nav>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="border border-border bg-background px-3 py-2 text-sm"
            aria-label="Ordenar productos"
          >
            <option value="destacados">Destacados</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {list.length} {list.length === 1 ? "producto" : "productos"}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {list.map((product, i) => (
            <ProductCard key={product.slug} product={product} priority={i < 2} />
          ))}
        </div>

        {category.faqs.length > 0 && (
          <div className="mt-20 max-w-3xl">
            <h2 className="font-display text-4xl">Preguntas frecuentes</h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {category.faqs.map(([q, a]) => (
                <details key={q} className="py-5">
                  <summary className="cursor-pointer text-lg font-medium">{q}</summary>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 max-w-3xl border-l border-accent pl-6">
          <h2 className="font-display text-4xl">Artesanía pensada para durar</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Cada pieza Pingolino se corta y cose de forma artesanal en España, en pequeñas
            cantidades, cuidando los tejidos y los acabados.{" "}
            <Link to="/nosotros" className="underline underline-offset-4">
              Conoce el taller
            </Link>
            .
          </p>
        </div>

        <div className="mt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Sigue explorando
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/$slug"
                params={{ slug: c.slug }}
                className="border border-border px-4 py-2 text-sm hover:border-foreground"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

const MAX_NAME = 14;

function ProductPage({ product: p }: { product: Product }) {
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [option, setOption] = useState(p.options[0]?.label);
  const cart = useCart();
  const category = getCategoryForProduct(p);
  const related = products
    .filter((item) => item.slug !== p.slug && item.category === p.category)
    .concat(products.filter((item) => item.category !== p.category))
    .slice(0, 4);
  const [lead, ...rest] = p.description;
  const bullets = rest.filter((text) => text.length < 70);
  const paragraphs = rest.filter((text) => text.length >= 70);
  const facts = Object.entries(p.facts);

  const nameRef = useRef<HTMLInputElement>(null);
  const addToCart = () => cart.add(p.slug, qty, name.trim() || undefined, option);
  /** En móvil, si la pieza es personalizable y aún no hay nombre, lleva al campo antes de añadir. */
  const stickyAdd = () => {
    if (p.personalizable && !name.trim() && nameRef.current) {
      nameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      nameRef.current.focus({ preventScroll: true });
      return;
    }
    addToCart();
  };

  const faqs: [string, string][] = [
    ...(p.personalizable
      ? ([
          [
            "¿Cómo se personaliza?",
            `Escribe el nombre (máximo ${MAX_NAME} caracteres) en el campo "Nombre a bordar" antes de añadir la pieza a la cesta.`,
          ],
        ] as [string, string][])
      : []),
    [
      "¿Cuánto cuesta el envío?",
      `El envío es gratis en pedidos desde ${formatPrice(BRAND.freeShippingFrom)}. Para importes menores, el coste se muestra en el pago antes de confirmar.`,
    ],
    [
      "¿Cuándo lo recibo?",
      "Cada pieza se cose a mano. Te confirmamos el plazo de confección con el pedido y lo enviamos en cuanto está lista.",
    ],
    ...(p.care ? ([["¿Cómo se lava?", p.care]] as [string, string][]) : []),
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-10 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { label: "Inicio", to: "/" },
            { label: "Tienda", to: "/tienda" },
            ...(category ? [{ label: category.name, slug: category.slug }] : []),
            { label: p.name },
          ]}
        />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-20">
          <div>
            <img
              key={img}
              src={p.images[img]}
              alt={productImageAlt(p, img)}
              width={1000}
              height={1250}
              fetchPriority={img === 0 ? "high" : "auto"}
              className="aspect-[4/5] w-full bg-muted object-cover"
            />
            {p.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {p.images.map((src, index) => (
                  <button
                    key={src}
                    onClick={() => setImg(index)}
                    aria-label={`Ver foto ${index + 1} de ${p.images.length}`}
                    aria-pressed={index === img}
                    className={`aspect-square overflow-hidden ${index === img ? "ring-2 ring-primary" : "opacity-70"}`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            {category && (
              <Link
                to="/$slug"
                params={{ slug: category.slug }}
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-strong"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-4 font-display text-5xl leading-[0.98] md:text-6xl">{p.name}</h1>
            {p.subtitle && <p className="mt-2 text-muted-foreground">{p.subtitle}</p>}
            <p className="mt-6 text-2xl">{formatPrice(p.price)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {p.price >= BRAND.freeShippingFrom
                ? "Envío gratis"
                : `Envío gratis a partir de ${formatPrice(BRAND.freeShippingFrom)}`}
            </p>
            <p className="mt-7 border-t border-border pt-6 leading-relaxed text-muted-foreground">
              {lead}
            </p>

            {p.options.length > 0 && (
              <fieldset className="mt-8">
                <legend className="text-sm font-medium">Color</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.options.map((o) => (
                    <label
                      key={o.label}
                      className={`cursor-pointer border px-4 py-2 text-sm ${option === o.label ? "border-foreground bg-foreground text-background" : "border-input"}`}
                    >
                      <input
                        type="radio"
                        name="opcion"
                        value={o.label}
                        checked={option === o.label}
                        onChange={() => setOption(o.label)}
                        className="sr-only"
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {p.personalizable && (
              <label className="mt-8 block">
                <span className="text-sm font-medium">Nombre a bordar</span>
                <input
                  ref={nameRef}
                  value={name}
                  maxLength={MAX_NAME}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ej.: Lucía"
                  autoComplete="off"
                  aria-describedby="nombre-ayuda"
                  className="mt-2 w-full border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                />
                <span
                  id="nombre-ayuda"
                  className="mt-1 flex justify-between text-xs text-muted-foreground"
                >
                  <span>Escríbelo tal y como quieres que se borde.</span>
                  <span>
                    {name.length}/{MAX_NAME}
                  </span>
                </span>
              </label>
            )}

            <div className="mt-6 flex gap-3">
              <div className="flex items-center border border-input">
                <button
                  className="grid size-11 place-items-center"
                  aria-label="Quitar una unidad"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center" aria-live="polite">
                  {qty}
                </span>
                <button
                  className="grid size-11 place-items-center"
                  aria-label="Añadir una unidad"
                  onClick={() => setQty(qty + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
              {p.available ? (
                <button
                  onClick={addToCart}
                  className="flex-1 bg-primary py-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-foreground"
                >
                  Añadir a la cesta · {formatPrice(p.price * qty)}
                </button>
              ) : (
                <Link
                  to="/contacto"
                  search={{ producto: p.name }}
                  className="flex flex-1 items-center justify-center border border-foreground py-4 text-xs font-semibold uppercase tracking-[0.12em]"
                >
                  Agotado · Pedir por encargo
                </Link>
              )}
            </div>

            <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
              <li className="flex items-center gap-2">
                <Scissors size={16} className="text-primary" />
                Cosido a mano en España
              </li>
              <li className="flex items-center gap-2">
                <Truck size={16} className="text-primary" />
                Envío gratis desde {formatPrice(BRAND.freeShippingFrom)}
              </li>
              <li className="flex items-center gap-2">
                <Lock size={16} className="text-primary" />
                Pago seguro con Shopify
              </li>
            </ul>

            {facts.length > 0 && (
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-border pt-6 text-sm">
                {facts.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            <details className="mt-6 border-t border-border pt-4" open>
              <summary className="cursor-pointer font-medium">Descripción</summary>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {paragraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </details>
            {bullets.length > 0 && (
              <details className="mt-4 border-t border-border pt-4">
                <summary className="cursor-pointer font-medium">Características</summary>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </details>
            )}
            <div className="mt-4 border-y border-border">
              {faqs.map(([q, a]) => (
                <details key={q} className="border-t border-border py-4 first:border-t-0">
                  <summary className="cursor-pointer font-medium">{q}</summary>
                  <p className="mt-3 text-sm text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-28 border-t border-border pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Sigue descubriendo
          </p>
          <h2 className="mt-3 font-display text-5xl">También te puede gustar</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      </div>

      {/* CTA fija en móvil */}
      {p.available && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-border bg-background/95 px-5 py-3 backdrop-blur lg:hidden">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{p.name}</p>
            <p className="text-sm">{formatPrice(p.price * qty)}</p>
          </div>
          <button
            onClick={stickyAdd}
            className="bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground"
          >
            {p.personalizable && !name.trim() ? "Personalizar" : "Añadir a la cesta"}
          </button>
        </div>
      )}
    </SiteLayout>
  );
}
