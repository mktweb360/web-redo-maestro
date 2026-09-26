import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCategory } from "@/lib/catalog";
import { redirectMap } from "@/lib/redirects";

// URLs antiguas /tienda/categoria/{categoria} → /{categoria} (301)
export const Route = createFileRoute("/tienda/categoria/$categoria")({
  loader: ({ params }) => {
    const slug = params.categoria.toLowerCase();
    const current = getCategory(slug) ? `/${slug}` : redirectMap.get(`/${slug}`);
    throw redirect({ href: current ?? "/tienda", statusCode: 301 });
  },
  component: () => null,
});
