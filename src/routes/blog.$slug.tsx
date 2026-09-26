import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { getPost, products } from "@/lib/catalog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Artículo no encontrado" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — Blog Pingolino` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostNotFound() {
  return (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-5xl">Artículo no encontrado</h1>
        <Link to="/blog" className="mt-6 inline-block underline">Volver al blog</Link>
      </div>
    </SiteLayout>
  );
}

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-5 py-14">
        <Link to="/blog" className="text-sm text-muted-foreground">← Blog</Link>
        <p className="mt-8 text-xs uppercase tracking-widest text-accent">{post.category} · {post.date} · {post.readTime}</p>
        <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">{post.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
        <img src={post.image} alt={post.title} className="mt-10 aspect-[16/10] w-full object-cover" />
        <div className="mt-10 space-y-6 text-lg leading-relaxed">
          {post.body.map((b, i) => (
            <div key={i}>
              {b.heading && <h2 className="mb-2 font-display text-3xl">{b.heading}</h2>}
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </article>
      <section className="mx-auto max-w-7xl px-5">
        <h2 className="font-display text-4xl">Piezas mencionadas</h2>
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </SiteLayout>
  );
}
