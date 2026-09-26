import { createFileRoute, redirect } from "@tanstack/react-router";
import { getProduct } from "@/lib/catalog";
import { redirectMap } from "@/lib/redirects";

// URLs antiguas /tienda/{producto} → /{producto} (301)
export const Route = createFileRoute("/tienda/$slug")({
  loader: ({ params }) => {
    const current = getProduct(params.slug)
      ? `/${params.slug}`
      : redirectMap.get(`/${params.slug.toLowerCase()}`);
    throw redirect({ href: current ?? "/tienda", statusCode: 301 });
  },
  component: () => null,
});
