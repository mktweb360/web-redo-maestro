import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { formatDate, posts, readingTime } from "@/lib/catalog";
import { breadcrumbLd, seo } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: "Blog: guías y regalos para bebés y familias",
      description:
        "Guías prácticas para familias con bebé, ideas de regalo y lo que pasa en el taller de Pingolino Handmade.",
      path: "/blog",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog de Pingolino Handmade",
          url: absoluteUrl("/blog"),
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.datePublished,
          })),
        },
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      ],
    }),
  component: Blog,
});

function Blog() {
  const first = posts[0];
  if (!first) return null;
  const rest = posts.slice(1);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
          Guías, regalos y taller
        </p>
        <h1 className="mt-3 font-display text-6xl leading-none md:text-8xl">Diario del taller</h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Guías prácticas para el día a día con un bebé e ideas para regalar.
        </p>
        <Link
          to="/blog/$slug"
          params={{ slug: first.slug }}
          className="group mt-14 grid items-center gap-10 border-y border-border py-10 md:grid-cols-[1.15fr_.85fr]"
        >
          <img
            src={first.image}
            alt={first.title}
            width={1536}
            height={1024}
            className="aspect-[4/3] w-full object-cover transition duration-1000 group-hover:scale-[1.015]"
          />
          <div className="md:px-6">
            <p className="text-xs uppercase tracking-widest text-accent-strong">
              {first.category} · {readingTime(first)} de lectura
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight group-hover:text-primary md:text-5xl">
              {first.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{first.excerpt}</p>
            <p className="mt-6 text-sm underline underline-offset-4">Leer artículo</p>
          </div>
        </Link>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {rest.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                decoding="async"
                width={1536}
                height={1024}
                className="aspect-[16/10] w-full object-cover"
              />
              <p className="mt-4 text-xs uppercase tracking-widest text-accent-strong">
                {p.category} · <time dateTime={p.datePublished}>{formatDate(p.datePublished)}</time>
              </p>
              <h2 className="mt-2 font-display text-3xl group-hover:text-primary">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
