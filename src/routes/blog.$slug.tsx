import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import {
  formatDate,
  getPost,
  getProduct,
  products,
  readingTime,
  type PostBlock,
} from "@/lib/catalog";
import { ORG_ID, breadcrumbLd, faqLd, seo } from "@/lib/seo";
import { BRAND, absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return seo({ title: "Artículo no encontrado", path: "/blog", noindex: true });
    const p = loaderData.post;
    const path = `/blog/${p.slug}`;
    return seo({
      title: p.seoTitle,
      description: p.metaDescription,
      path,
      image: p.image,
      imageAlt: p.title,
      type: "article",
      noindex: p.draft,
      jsonLd: p.draft
        ? []
        : [
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: p.title,
              description: p.metaDescription,
              image: absoluteUrl(p.image),
              datePublished: p.datePublished,
              dateModified: p.dateModified || p.datePublished,
              inLanguage: "es-ES",
              articleSection: p.category,
              mainEntityOfPage: absoluteUrl(path),
              author: { "@type": "Person", name: p.author, url: absoluteUrl("/nosotros") },
              publisher: { "@id": ORG_ID, "@type": "Organization", name: BRAND.name },
            },
            breadcrumbLd([
              { name: "Inicio", path: "/" },
              { name: "Diario", path: "/blog" },
              { name: p.title, path },
            ]),
            ...(p.faq.length ? [faqLd(p.faq)] : []),
          ],
    });
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostNotFound() {
  return (
    <SiteLayout>
      <div className="py-28 text-center">
        <p className="section-kicker">404 · El diario</p>
        <h1 className="mt-4 font-display text-5xl">No encontramos este artículo.</h1>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs"
        >
          <ArrowLeft size={14} /> Volver al diario
        </Link>
      </div>
    </SiteLayout>
  );
}

/** Enlazado interno contextual: primera mención de cada término → su página (una vez por artículo). */
const LINKS: [RegExp, string][] = [
  [/\bportatoallitas\b/i, "/portatoallitas-portapanales-bebe"],
  [/\bneceser(es)?\b/i, "/neceseres-portatoallitas-bebe"],
  [/\bmanta suave\b|\bmanta\b/i, "/mantas-bebe-personalizadas"],
  [/\bregalos? personalizados?\b|\baccesorios personalizados\b/i, "/regalos-personalizados-bebe"],
];

function linkify(text: string, used: Set<string>): ReactNode {
  for (const [re, href] of LINKS) {
    if (used.has(href)) continue;
    const m = re.exec(text);
    if (!m) continue;
    used.add(href);
    return (
      <>
        {text.slice(0, m.index)}
        <Link
          to="/$slug"
          params={{ slug: href.slice(1) }}
          className="text-foreground underline decoration-accent underline-offset-4 hover:text-primary"
        >
          {m[0]}
        </Link>
        {linkify(text.slice(m.index + m[0].length), used)}
      </>
    );
  }
  return text;
}

function Block({ block, used }: { block: PostBlock; used: Set<string> }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="pt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="pt-1 font-display text-2xl leading-tight text-foreground">{block.text}</h3>
      );
    case "ul":
      return (
        <ul className="space-y-2 pl-5 marker:text-accent list-disc">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              {linkify(item, used)}
            </li>
          ))}
        </ul>
      );
    default:
      return <p>{linkify(block.text, used)}</p>;
  }
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = post.relatedProducts.flatMap((slug) => {
    const p = getProduct(slug);
    return p ? [p] : [];
  });
  const recommendations = (related.length ? related : products).slice(0, 4);
  const used = new Set<string>();

  return (
    <SiteLayout>
      <article>
        <header className="mx-auto max-w-[1440px] px-5 pb-9 pt-9 sm:px-8 md:pb-12 lg:px-12">
          <nav aria-label="Migas de pan">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-accent-strong"
            >
              <ArrowLeft size={13} /> El diario
            </Link>
          </nav>
          {post.draft && (
            <p className="mx-auto mt-6 max-w-3xl border-l-2 border-accent bg-secondary/70 px-4 py-3 text-xs">
              Borrador pendiente de revisión: no se muestra en el diario ni se indexa.
            </p>
          )}
          <div className="mx-auto mt-10 max-w-4xl text-center">
            <p className="section-kicker">
              {post.category}
              {post.datePublished && (
                <>
                  <span className="px-1.5 text-border">/</span>
                  <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                </>
              )}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              <span>
                Por{" "}
                <Link to="/nosotros" className="text-foreground underline underline-offset-4">
                  {post.author}
                </Link>
                , fundadora de {BRAND.name}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={12} /> {readingTime(post)} de lectura
              </span>
            </p>
          </div>
          <div className="mx-auto mt-9 max-w-5xl overflow-hidden bg-secondary">
            <img
              src={post.image}
              alt={post.title}
              width={1536}
              height={1024}
              fetchPriority="high"
              className="aspect-[1.7/1] w-full object-cover"
            />
          </div>
        </header>
        <div className="mx-auto max-w-3xl px-5 pb-14 sm:px-8 md:pb-20">
          <div className="space-y-5 border-t border-border pt-8 text-[16px] leading-[1.85] text-foreground/85">
            {post.blocks.map((block, index) => (
              <Block key={index} block={block} used={used} />
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-between gap-4 border-y border-border py-5 sm:flex-row sm:items-center">
            <p className="font-display text-2xl">Pequeñas ideas, para días importantes.</p>
            <Link
              to="/tienda"
              className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em]"
            >
              Visitar la tienda <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 md:pb-24 lg:px-12">
        <p className="section-kicker">Ideas para acompañar</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Piezas del taller</h2>
        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {recommendations.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
