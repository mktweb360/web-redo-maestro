import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCategory } from "@/lib/catalog";

export const Route = createFileRoute("/tienda/categoria/$categoria")({
  loader: ({ params }) => {
    const category = getCategory(params.categoria);
    throw redirect({
      to: category ? "/$slug" : "/tienda",
      params: category ? { slug: category.slug } : {},
      statusCode: 301,
    });
  },
  component: () => null,
});