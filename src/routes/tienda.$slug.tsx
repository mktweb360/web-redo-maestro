import { createFileRoute, redirect } from "@tanstack/react-router";
import { getProduct } from "@/lib/catalog";

export const Route = createFileRoute("/tienda/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    throw redirect({
      to: product ? "/$slug" : "/tienda",
      params: product ? { slug: product.slug } : {},
      statusCode: 301,
    });
  },
  component: () => null,
});
