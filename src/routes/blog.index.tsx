import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { formatDate, posts, readingTime } from "@/lib/catalog";
import { breadcrumbLd, seo } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: "El diario: guías y regalos para bebés y familias",
      description:
        "Guías prácticas para la llegada de un bebé, el día a día con peques y regalos que se recuerdan, desde el taller de Pingolino Handmade.",
      path: "/blog",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "El diario de Pingolino Handmade",
          url: absoluteUrl("/blog"),
          inLanguage: "es-ES",
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.datePublished,
          })),
        },
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Diario", path: "/blog" },
        ]),
      ],
    }),
  component: Blog,
});

function Blog() {
  const [lead, ...rest] = posts;
  return (
    <SiteLayout>
      <section className="bg-secondary">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16 lg:px-12">
          <p className="section-kicker">Maternidad · paseo · regalos</p>
          <div className="mt-4 grid items-end gap-5 md:grid-cols-[1fr_.52fr] md:gap-10">
            <h1 className="font-display text-6xl leading-[0.81] tracking-tight sm:text-7xl md:text-8xl">
              El diario
              <br />
              <i className="font-medium text-primary">Pingolino.</i>
            </h1>
            <p className="max-w-md pb-1 text-sm leading-[1.8] text-muted-foreground sm:text-base">
              Guías prácticas para cada etapa e ideas de regalo, escritas por Sherezhade entre
              puntada y puntada.
            </p>
          </div>
        </div>
      </section>
      {lead && (
        <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 md:py-14 lg:px-12">
          <Link
            to="/blog/$slug"
            params={{ slug: lead.slug }}
            className="group grid overflow-hidden bg-card md:grid-cols-[1.08fr_.92fr]"
          >
            <div className="overflow-hidden bg-background">
              <img
                src={lead.image}
                alt={lead.title}
                width={1536}
                height={1024}
                fetchPriority="high"
                className="aspect-[1.35/1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 md:px-12 md:py-12">
              <span className="section-kicker">
                Lo último · {lead.category} ·{" "}
                <time dateTime={lead.datePublished}>{formatDate(lead.datePublished)}</time>
              </span>
              <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-tight sm:text-5xl">
                {lead.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {lead.excerpt}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em]">
                Leer artículo · {readingTime(lead)}{" "}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </section>
      )}
      {rest.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 md:pb-24 lg:px-12">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="section-kicker">Más lecturas</h2>
            <p className="text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
              {posts.length} artículos
            </p>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group grid grid-cols-[.9fr_1.1fr] gap-4 border-b border-border pb-6 sm:gap-6"
              >
                <div className="overflow-hidden bg-secondary">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={768}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="section-kicker">
                    {post.category} ·{" "}
                    <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-[0.98] sm:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-3 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                    <Clock3 size={12} /> {readingTime(post)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
