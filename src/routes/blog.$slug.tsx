import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { getPost, products } from "@/lib/catalog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Artículo no encontrado — Pingolino Handmade" }, { name: "robots", content: "noindex" }] };
    const post = loaderData.post;
    return { meta: [
      { title: `${post.title} — El diario Pingolino` },
      { name: "description", content: post.excerpt },
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/blog/${params.slug}` },
      { name: "twitter:card", content: "summary_large_image" },
    ], links: [{ rel: "canonical", href: `/blog/${params.slug}` }] };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostNotFound() {
  return <SiteLayout><div className="py-28 text-center"><p className="section-kicker">404 · El diario</p><h1 className="mt-4 font-display text-5xl">No encontramos este artículo.</h1><Link to="/blog" className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs"><ArrowLeft size={14} /> Volver al diario</Link></div></SiteLayout>;
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = post.category === "Paseos"
    ? products.filter((product) => product.category === "Paseo")
    : post.category === "Ideas para regalar"
      ? products.filter((product) => ["Neceseres", "Celebraciones", "Mantas"].includes(product.category))
      : products.filter((product) => product.category === "Mantas");
  const recommendations = related.length ? related.slice(0, 3) : products.slice(0, 3);

  return (
    <SiteLayout>
      <article>
        <header className="mx-auto max-w-[1440px] px-5 pb-9 pt-9 sm:px-8 md:pb-12 lg:px-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-accent"><ArrowLeft size={13} /> El diario</Link>
          <div className="mx-auto mt-10 max-w-4xl text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-accent">{post.category} <span className="px-1.5 text-border">/</span> <time dateTime={post.isoDate}>{post.date}</time></p>
            <h1 className="mt-5 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">{post.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.1em] text-muted-foreground"><Clock3 size={12} /> {post.readTime} de lectura</span>
          </div>
          <div className="mx-auto mt-9 grid aspect-[1.7/1] max-w-5xl place-items-center overflow-hidden bg-secondary p-4 sm:p-7"><img src={post.image} alt="" className="h-full w-full object-contain" /></div>
        </header>
        <div className="mx-auto max-w-3xl px-5 pb-14 sm:px-8 md:pb-20">
          <div className="space-y-6 border-t border-border pt-8 text-[15px] leading-[1.9] text-foreground/85">
            {post.body.map((block, index) => <section key={index} className={block.heading ? "pt-2" : ""}>
              {block.heading && <h2 className="mb-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">{block.heading}</h2>}
              {block.text && <p>{block.text}</p>}
              {block.list && <ul className="my-3 space-y-2 pl-5 marker:text-accent">{block.list.map((item) => <li key={item} className="pl-1">{item}</li>)}</ul>}
            </section>)}
          </div>
          <div className="mt-10 flex flex-col justify-between gap-4 border-y border-border py-5 sm:flex-row sm:items-center"><p className="font-display text-2xl">Pequeñas ideas, para días importantes.</p><Link to="/tienda" className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em]">Visitar la tienda <ArrowRight size={14} /></Link></div>
        </div>
      </article>
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 md:pb-24 lg:px-12"><p className="section-kicker">Ideas para acompañar</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Piezas del taller</h2><div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">{recommendations.map((product) => <ProductCard key={product.slug} product={product} />)}</div></section>
    </SiteLayout>
  );
}
