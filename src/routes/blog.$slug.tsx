import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { formatDate, getPost, getProduct, readingTime, type PostBlock } from "@/lib/catalog";
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
              mainEntityOfPage: absoluteUrl(path),
              author: { "@type": "Person", name: p.author, url: absoluteUrl("/nosotros") },
              publisher: { "@id": ORG_ID, "@type": "Organization", name: BRAND.name },
            },
            breadcrumbLd([
              { name: "Inicio", path: "/" },
              { name: "Blog", path: "/blog" },
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
      <div className="py-32 text-center">
        <h1 className="font-display text-5xl">Artículo no encontrado</h1>
        <Link to="/blog" className="mt-6 inline-block underline">
          Volver al blog
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
          className="underline decoration-accent underline-offset-4"
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
      return <h2 className="pt-6 font-display text-4xl leading-tight">{block.text}</h2>;
    case "h3":
      return <h3 className="pt-2 text-xl font-semibold">{block.text}</h3>;
    case "ul":
      return (
        <ul className="list-disc space-y-1 pl-6">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
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
  return (
    <SiteLayout>
      <article className="mx-auto max-w-4xl px-5 py-16">
        <nav aria-label="Migas de pan" className="text-sm text-muted-foreground">
          <Link to="/blog">← Blog</Link>
        </nav>
        {post.draft && (
          <p className="mt-6 border border-accent bg-secondary px-4 py-3 text-sm">
            Borrador pendiente de revisión: no se muestra en el blog ni se indexa.
          </p>
        )}
        <p className="mt-8 text-xs uppercase tracking-widest text-accent-strong">
          {post.category}
          {post.datePublished && (
            <>
              {" · "}
              <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
            </>
          )}
          {" · "}
          {readingTime(post)} de lectura
        </p>
        <h1 className="mt-5 font-display text-5xl leading-[0.98] md:text-7xl">{post.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
        <p className="mt-4 text-sm">
          Por{" "}
          <Link to="/nosotros" className="underline underline-offset-4">
            {post.author}
          </Link>
          , fundadora de {BRAND.name}
        </p>
        <img
          src={post.image}
          alt={post.title}
          width={1536}
          height={1024}
          fetchPriority="high"
          className="mt-12 aspect-[16/10] w-full object-cover"
        />
        <div className="mx-auto mt-12 max-w-2xl space-y-5 text-lg leading-relaxed">
          {(() => {
            const used = new Set<string>();
            return post.blocks.map((b, i) => <Block key={i} block={b} used={used} />);
          })()}
        </div>
      </article>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5">
          <h2 className="font-display text-4xl">Piezas relacionadas</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
