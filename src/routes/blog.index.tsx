import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { posts } from "@/lib/catalog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Pingolino Handmade" },
      { name: "description", content: "Guías, ideas de regalo y el día a día de nuestro taller de costura artesanal." },
      { property: "og:title", content: "Blog — Pingolino Handmade" },
      { property: "og:description", content: "Historias del taller, guías de tejidos e ideas para regalar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});

function Blog() {
  const first = posts[0]!;
  const rest = posts.slice(1);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 py-14">
        <h1 className="font-display text-6xl md:text-7xl">Diario del taller</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">Guías prácticas, ideas para regalar y lo que pasa entre hilos y tejidos.</p>
        <Link to="/blog/$slug" params={{ slug: first.slug }} className="group mt-12 grid items-center gap-8 md:grid-cols-2">
          <img src={first.image} alt={first.title} className="aspect-[4/3] w-full object-cover" />
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">{first.category} · {first.readTime}</p>
            <h2 className="mt-3 font-display text-5xl leading-tight group-hover:text-primary">{first.title}</h2>
            <p className="mt-4 text-muted-foreground">{first.excerpt}</p>
            <p className="mt-6 text-sm underline underline-offset-4">Leer artículo</p>
          </div>
        </Link>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {rest.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <img src={p.image} alt={p.title} className="aspect-[16/10] w-full object-cover" />
              <p className="mt-4 text-xs uppercase tracking-widest text-accent">{p.category} · {p.date}</p>
              <h2 className="mt-2 font-display text-3xl group-hover:text-primary">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
