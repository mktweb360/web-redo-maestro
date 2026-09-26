import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Lock, Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  formatPrice,
  getCategory,
  getCategoryForProduct,
  getProduct,
  productImage,
  productImageAlt,
  productSrcSet,
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
        image: list[0] ? productImage(list[0].images[0], 1200) : undefined,
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
      image: productImage(p.images[0], 1200),
      imageAlt: productImageAlt(p, 0),
      type: "product",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": `${absoluteUrl(`/${p.slug}`)}#product`,
          name: p.name,
          description: p.metaDescription,
          image: p.images.slice(0, 6).map((src) => absoluteUrl(productImage(src, 1600))),
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
        <p className="section-kicker">404 · Esta página no está por aquí</p>
        <h1 className="mt-4 font-display text-5xl">Quizá la encontremos en la tienda.</h1>
        <Link
          to="/tienda"
          className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs"
        >
          Ver toda la tienda <ArrowRight size={14} />
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
      className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="mx-2 text-accent-strong">
                /
              </span>
            )}
            {item.to ? (
              <Link to={item.to} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : item.slug ? (
              <Link to="/$slug" params={{ slug: item.slug }} className="hover:text-foreground">
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
  const image = productsInCategory(category)[0]?.images[0];
  const navCategories = shopCategories.filter(
    (c) => (c.inShopNav || c.slug === category.slug) && productsInCategory(c).length > 0,
  );

  return (
    <SiteLayout>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-[1440px] items-center gap-7 px-5 py-10 sm:px-8 md:grid-cols-[1.1fr_.9fr] md:py-14 lg:px-12 lg:py-16">
          <div>
            <Breadcrumbs
              items={[
                { label: "Inicio", to: "/" },
                { label: "Tienda", to: "/tienda" },
                { label: category.name },
              ]}
            />
            <p className="mt-9 section-kicker">{category.eyebrow}</p>
            <h1 className="mt-3 max-w-2xl font-display text-5xl leading-[0.87] tracking-tight sm:text-6xl md:text-7xl">
              {category.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-[1.8] text-muted-foreground">
              {category.description}
            </p>
            <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.15em]">
              Cosido a mano en pequeñas series · España
            </p>
          </div>
          <div className="relative grid aspect-[1.24/1] place-items-center overflow-hidden bg-background/55 p-4 md:aspect-[1.05/1]">
            {image && (
              <img
                src={productImage(image, 900)}
                srcSet={productSrcSet(image, [500, 900, 1300])}
                sizes="(min-width: 768px) 45vw, 100vw"
                alt={`${category.title} — Pingolino Handmade`}
                width={900}
                height={860}
                fetchPriority="high"
                className="h-full w-full object-contain"
              />
            )}
            <span className="absolute bottom-3 left-3 bg-background/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em]">
              Colección {category.name}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 md:py-12 lg:px-12">
        <nav
          className="flex gap-2 overflow-x-auto border-b border-border pb-4"
          aria-label="Colecciones"
        >
          <Link
            to="/tienda"
            className="shrink-0 rounded-full border border-border px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.11em] transition-colors hover:border-primary"
          >
            Todo
          </Link>
          {navCategories.map((item) => (
            <Link
              key={item.slug}
              to="/$slug"
              params={{ slug: item.slug }}
              aria-current={item.slug === category.slug ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.11em] transition-colors ${item.slug === category.slug ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          <span>
            {list.length} {list.length === 1 ? "pieza" : "piezas"}
          </span>
          <label className="flex items-center gap-2">
            Ordenar
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="border border-border bg-background px-2 py-2 text-xs text-foreground"
              aria-label="Ordenar productos"
            >
              <option value="destacados">Destacados</option>
              <option value="asc">Precio: menor a mayor</option>
              <option value="desc">Precio: mayor a menor</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 md:gap-y-14 lg:grid-cols-4">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {category.faqs.length > 0 && (
          <div className="mt-16 grid gap-6 border-t border-border pt-8 md:grid-cols-[.8fr_1.2fr] md:gap-10">
            <div>
              <p className="section-kicker">Preguntas frecuentes</p>
              <h2 className="mt-3 font-display text-4xl leading-none">Antes de elegir</h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {category.faqs.map(([q, a]) => (
                <details key={q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-5 font-display text-2xl">
                    {q}
                    <span className="font-sans text-lg text-accent-strong transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 grid gap-6 border-t border-border pt-8 md:grid-cols-[.8fr_1.2fr] md:items-start">
          <p className="font-display text-3xl">Lo cotidiano también merece belleza.</p>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Cada pieza se corta y cose de forma artesanal en España, en pequeñas cantidades,
            cuidando los tejidos y los acabados.{" "}
            <Link to="/nosotros" className="underline underline-offset-4 hover:text-foreground">
              Conoce a Sherezhade y el taller
            </Link>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

const MAX_NAME = 14;

function ProductPage({ product: p }: { product: Product }) {
  const [option, setOption] = useState(p.options[0]?.label);
  const optionImage = (label?: string) => p.options.find((o) => o.label === label)?.image;
  const [imageIndex, setImageIndex] = useState(optionImage(p.options[0]?.label) ?? 0);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const cart = useCart();
  const category = getCategoryForProduct(p);
  const related = products
    .filter((item) => item.slug !== p.slug && item.category === p.category)
    .concat(products.filter((item) => item.category !== p.category))
    .slice(0, 4);
  const [lead, ...details] = p.description;
  const bulletPoints = details.filter((text) => text.length < 70);
  const paragraphs = details.filter((text) => text.length >= 70);
  const facts = Object.entries(p.facts);
  const current = p.images[imageIndex] ?? p.images[0];

  const chooseOption = (label: string) => {
    setOption(label);
    const index = optionImage(label);
    if (index !== undefined) setImageIndex(index);
  };
  const addToCart = () => cart.add(p.slug, quantity, name.trim() || undefined, option);
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
            `Escribe el nombre (máximo ${MAX_NAME} caracteres) en el campo "Nombre a bordar" antes de añadir la pieza a la cesta. Llega a Sherezhade junto con tu pedido.`,
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
    ...(p.care ? ([["¿Cómo se cuida?", p.care]] as [string, string][]) : []),
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-7 sm:px-8 md:pt-10 lg:px-12 lg:pb-10">
        <Breadcrumbs
          items={[
            { label: "Inicio", to: "/" },
            { label: "Tienda", to: "/tienda" },
            ...(category ? [{ label: category.name, slug: category.slug }] : []),
            { label: p.name },
          ]}
        />
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="min-w-0">
            <div className="grid aspect-[4/4.5] place-items-center overflow-hidden bg-secondary/65 p-4 sm:p-8">
              <img
                key={current}
                src={productImage(current, 1100)}
                srcSet={productSrcSet(current, [600, 900, 1100, 1500])}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt={productImageAlt(p, imageIndex)}
                width={1000}
                height={1125}
                fetchPriority="high"
                className="h-full w-full object-contain"
              />
            </div>
            {p.images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {p.images.slice(0, 10).map((src, index) => (
                  <button
                    key={src}
                    onClick={() => setImageIndex(index)}
                    aria-label={`Ver foto ${index + 1} de ${p.images.length}`}
                    aria-pressed={index === imageIndex}
                    className={`aspect-square overflow-hidden bg-secondary/65 p-1 transition-opacity ${index === imageIndex ? "ring-1 ring-primary" : "opacity-70 hover:opacity-100"}`}
                  >
                    <img
                      src={productImage(src, 200)}
                      alt=""
                      width={200}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-[108px] lg:self-start lg:py-3">
            <p className="section-kicker">
              {category ? (
                <Link to="/$slug" params={{ slug: category.slug }}>
                  {category.name}
                </Link>
              ) : (
                p.category
              )}{" "}
              · Cosido a mano en España
            </p>
            <h1 className="mt-3 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">
              {p.name}
            </h1>
            {p.subtitle && <p className="mt-3 text-sm text-muted-foreground">{p.subtitle}</p>}
            <p className="mt-6 text-lg font-medium">{formatPrice(p.price)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {p.price >= BRAND.freeShippingFrom
                ? "Envío gratis"
                : `Envío gratis a partir de ${formatPrice(BRAND.freeShippingFrom)}`}
            </p>
            <p className="mt-5 border-t border-border pt-5 text-sm leading-[1.8] text-muted-foreground">
              {lead}
            </p>

            {p.options.length > 0 && (
              <fieldset className="mt-7">
                <legend className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Color · <span className="font-normal normal-case tracking-normal">{option}</span>
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.options.map((o) => (
                    <label
                      key={o.label}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary ${option === o.label ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary"}`}
                    >
                      <input
                        type="radio"
                        name="opcion"
                        value={o.label}
                        checked={option === o.label}
                        onChange={() => chooseOption(o.label)}
                        className="sr-only"
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {p.personalizable && (
              <label className="mt-7 block">
                <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Nombre a bordar{" "}
                  <span className="font-normal normal-case tracking-normal text-muted-foreground">
                    (opcional)
                  </span>
                </span>
                <input
                  ref={nameRef}
                  value={name}
                  maxLength={MAX_NAME}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ej.: Lucía"
                  autoComplete="off"
                  aria-describedby="nombre-ayuda"
                  className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
                <span
                  id="nombre-ayuda"
                  className="mt-1.5 flex justify-between gap-4 text-[10px] text-muted-foreground"
                >
                  <span>Escríbelo tal y como quieres que se borde.</span>
                  <span>
                    {name.length}/{MAX_NAME}
                  </span>
                </span>
              </label>
            )}

            <div className="mt-6 flex gap-3">
              <div className="flex h-12 items-center border border-input">
                <button
                  className="grid size-11 place-items-center"
                  aria-label="Quitar una unidad"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="min-w-6 text-center text-sm" aria-live="polite">
                  {quantity}
                </span>
                <button
                  className="grid size-11 place-items-center"
                  aria-label="Añadir una unidad"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
              {p.available ? (
                <button
                  onClick={addToCart}
                  className="flex-1 bg-primary px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-foreground"
                >
                  Añadir a la cesta · {formatPrice(p.price * quantity)}
                </button>
              ) : (
                <Link
                  to="/contacto"
                  search={{ producto: p.name }}
                  className="flex flex-1 items-center justify-center border border-foreground px-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
                >
                  Agotado · Pedir por encargo
                </Link>
              )}
            </div>

            <ul className="mt-6 grid gap-3 border-y border-border py-4 text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:grid-cols-3">
              <li className="flex items-center gap-2">
                <Check size={14} className="shrink-0 text-primary" /> Hecho a mano
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="shrink-0 text-primary" /> Envío gratis desde{" "}
                {formatPrice(BRAND.freeShippingFrom)}
              </li>
              <li className="flex items-center gap-2">
                <Lock size={14} className="shrink-0 text-primary" /> Pago seguro con Shopify
              </li>
            </ul>

            {facts.length > 0 && (
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                {facts.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {paragraphs.length > 0 && (
              <details className="mt-5 border-b border-border pb-4" open>
                <summary className="cursor-pointer font-display text-2xl">La pieza</summary>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {paragraphs.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
              </details>
            )}
            {bulletPoints.length > 0 && (
              <details className="border-b border-border py-4">
                <summary className="cursor-pointer font-display text-2xl">Detalles</summary>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                  {bulletPoints.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              </details>
            )}
            {faqs.map(([q, a]) => (
              <details key={q} className="border-b border-border py-4">
                <summary className="cursor-pointer font-display text-2xl">{q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
            <p className="mt-4 text-xs text-muted-foreground">
              Más información en{" "}
              <Link to="/envios" className="underline underline-offset-4 hover:text-foreground">
                envíos y preguntas frecuentes
              </Link>
              .
            </p>
          </div>
        </div>

        <section className="mt-16 border-t border-border pt-10 md:mt-24 md:pt-14">
          <p className="section-kicker">Seguir descubriendo</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Otras piezas del taller</h2>
          <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
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
            <p className="truncate font-display text-lg leading-tight">{p.name}</p>
            <p className="text-xs">{formatPrice(p.price * quantity)}</p>
          </div>
          <button
            onClick={stickyAdd}
            className="bg-primary px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
          >
            {p.personalizable && !name.trim() ? "Personalizar" : "Añadir a la cesta"}
          </button>
        </div>
      )}
    </SiteLayout>
  );
}
