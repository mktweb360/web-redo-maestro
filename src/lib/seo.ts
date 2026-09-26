import { BRAND, DEFAULT_DESCRIPTION, SITE_URL, absoluteUrl } from "./site";

type Meta = Record<string, unknown>;

export type SeoInput = {
  /** Título completo de la página (sin la marca: se añade automáticamente si cabe). */
  title: string;
  description?: string;
  /** Ruta relativa canónica, p. ej. "/mantas-bebe-personalizadas". */
  path: string;
  image?: string | undefined;
  imageAlt?: string | undefined;
  type?: "website" | "product" | "article";
  noindex?: boolean;
  /** Bloques JSON-LD adicionales. */
  jsonLd?: Record<string, unknown>[];
};

const BRAND_SUFFIX = " | Pingolino";

/** Añade la marca al final solo si el título resultante no supera ~60 caracteres. */
export const withBrand = (title: string) =>
  title.includes("Pingolino") || title.length + BRAND_SUFFIX.length > 62
    ? title
    : `${title}${BRAND_SUFFIX}`;

export const DEFAULT_OG_IMAGE = "/og-pingolino.jpg";

export function seo(input: SeoInput) {
  const title = withBrand(input.title);
  const description = input.description ?? DEFAULT_DESCRIPTION;
  const url = absoluteUrl(input.path);
  const image = absoluteUrl(input.image ?? DEFAULT_OG_IMAGE);
  const meta: Meta[] = [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: BRAND.name },
    { property: "og:locale", content: "es_ES" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    {
      property: "og:type",
      content:
        input.type === "article" ? "article" : input.type === "product" ? "product" : "website",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
  if (input.imageAlt) meta.push({ property: "og:image:alt", content: input.imageAlt });
  meta.push({
    name: "robots",
    content: input.noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
  });
  for (const block of input.jsonLd ?? []) meta.push({ "script:ld+json": block });

  return {
    meta,
    links: input.noindex ? [] : [{ rel: "canonical", href: url }],
  };
}

/* ---------- JSON-LD ---------- */

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationLd() {
  const sameAs = Object.values(BRAND.social);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND.name,
    alternateName: "Pingolino",
    url: SITE_URL,
    description:
      "Taller artesanal español que cose a mano mantas, arrullos, mochilas de guardería, neceseres, portatoallitas y coronas de cumpleaños, personalizables con nombre bordado.",
    email: BRAND.email,
    telephone: BRAND.phone,
    founder: { "@type": "Person", name: BRAND.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address.street,
      postalCode: BRAND.address.postalCode,
      addressLocality: BRAND.address.locality,
      addressRegion: BRAND.address.region,
      addressCountry: BRAND.address.country,
    },
    areaServed: { "@type": "Country", name: "España" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: BRAND.email,
      telephone: BRAND.phone,
      availableLanguage: ["es"],
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BRAND.name,
    inLanguage: "es-ES",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: readonly (readonly [string, string])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
