import productsData from "@/data/products.json";
import realPosts from "@/data/posts-real.json";
import corona from "@/assets/pingolino/corona.jpg";
import neceser from "@/assets/pingolino/neceser.jpg";
import imgHospital from "@/assets/blog/bolsa-hospital-parto.webp";
import imgCarrito from "@/assets/blog/que-llevar-bolsa-carrito-bebe.webp";
import imgMama from "@/assets/blog/que-regalar-mama-primeriza.webp";

/* ------------------------------------------------------------------ */
/* Productos                                                           */
/* ------------------------------------------------------------------ */

export type ProductOption = {
  label: string;
  shopifyVariantId: number;
  shopifyHandle: string;
  /** Índice de la foto de `images` que muestra esta opción. */
  image?: number;
};

export type Product = {
  slug: string;
  /** Slugs usados antes (propuesta Lovable). Se redirigen con 301. */
  legacySlugs: string[];
  /** Handle y variante en Shopify: la tienda Shopify procesa el pago. */
  shopifyHandle: string;
  shopifyVariantId: number;
  options: ProductOption[];
  name: string;
  subtitle: string;
  seoTitle: string;
  metaDescription: string;
  price: number;
  category: string;
  available: boolean;
  personalizable: boolean;
  /** Oculto del catálogo y de los buscadores (p. ej. pendiente de revisión legal). */
  hidden: boolean;
  facts: Record<string, string>;
  care: string;
  description: string[];
  images: string[];
};

const allProducts = productsData as Product[];

/** Catálogo público: excluye productos ocultos. */
export const products = allProducts.filter((p) => !p.hidden);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const productImageAlt = (p: Product, index: number) => {
  const base = p.subtitle ? `${p.name} · ${p.subtitle}` : p.name;
  return index === 0 ? `${base} — ${BRAND_NAME}` : `${base} — foto ${index + 1}`;
};

const BRAND_NAME = "Pingolino Handmade";

/**
 * Las fotos se sirven desde el CDN de Shopify, que redimensiona con `width`.
 * Los originales llegan a 5712 px y más de 1 MB: nunca se piden sin tamaño.
 */
export const productImage = (src: string | undefined, width: number) => {
  if (!src) return "";
  if (!src.startsWith("https://cdn.shopify.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("width", String(width));
  return url.toString();
};

export const productSrcSet = (
  src: string | undefined,
  widths: number[] = [400, 700, 1000, 1400],
) =>
  src?.startsWith("https://cdn.shopify.com/")
    ? widths.map((w) => `${productImage(src, w)} ${w}w`).join(", ")
    : undefined;

/* ------------------------------------------------------------------ */
/* Categorías (URLs planas /{slug})                                    */
/* ------------------------------------------------------------------ */

export type ShopCategory = {
  /** Nombre corto para menús y etiquetas. */
  name: string;
  slug: string;
  legacySlugs: string[];
  /** Categorías de producto incluidas (campo `category` del producto). */
  includes: string[];
  /** Si se indica, la página muestra solo estos productos (colecciones curadas). */
  productSlugs?: string[];
  title: string;
  seoTitle: string;
  eyebrow: string;
  description: string;
  metaDescription: string;
  faqs: [string, string][];
  /** Se muestra en el menú de categorías de la tienda. */
  inShopNav: boolean;
};

export const shopCategories: ShopCategory[] = [
  {
    name: "Mantas y arrullos",
    slug: "mantas-bebe-personalizadas",
    legacySlugs: ["mantas-bebe"],
    includes: ["Mantas"],
    title: "Mantas y arrullos para bebé",
    seoTitle: "Mantas de bebé personalizadas y arrullos hechos a mano",
    eyebrow: "Algodón, waffle, muselina y borreguito",
    description:
      "Mantas y arrullos cosidos a mano para la cuna, el capazo y el carrito. Elige tejido según la estación y, en las piezas personalizables, añade el nombre bordado para convertirla en un recuerdo.",
    metaDescription:
      "Mantas de bebé y arrullos cosidos a mano en España: algodón waffle, muselina y borreguito, 75×100 cm. Algunas, con nombre bordado.",
    faqs: [
      [
        "¿Qué medida tienen las mantas?",
        "Las mantas de la colección miden 75 × 100 cm (el arrullo con volantes, aproximadamente 75 × 100 cm), una medida pensada para cuna, capazo y carrito.",
      ],
      [
        "¿Qué tejido elijo según la estación?",
        "El algodón waffle con muselina es ligero y transpirable, útil todo el año. La manta con reverso de borreguito está pensada para los días fríos.",
      ],
      [
        "¿Se puede bordar el nombre?",
        "Sí, en las piezas marcadas como personalizables: escribe el nombre en la ficha del producto antes de añadirla a la cesta.",
      ],
    ],
    inShopNav: true,
  },
  {
    name: "Mochilas de guardería",
    slug: "mochilas-guarderia-personalizadas",
    legacySlugs: ["mochilas-infantiles"],
    includes: ["Mochilas"],
    title: "Mochilas de guardería personalizadas",
    seoTitle: "Mochilas de guardería personalizadas con nombre",
    eyebrow: "Su primera mochila, solo suya",
    description:
      "Mochilas infantiles de algodón para guardería y Educación Infantil, con el nombre bordado para que cada peque reconozca la suya. Tamaño pensado para niños de 3 a 5 años: merienda, botella de agua y una muda.",
    metaDescription:
      "Mochilas de guardería personalizadas con el nombre bordado, cosidas a mano en algodón. Para niños de 3 a 5 años: merienda, agua y muda.",
    faqs: [
      [
        "¿Para qué edad es la mochila?",
        "Está diseñada para niños de 3 a 5 años, la etapa de Educación Infantil.",
      ],
      [
        "¿Qué cabe dentro?",
        "La merienda, una botella de agua, una muda o los pequeños imprescindibles del día.",
      ],
      [
        "¿Cómo se personaliza?",
        "Escribe el nombre en la ficha del producto; lo bordamos en la solapa.",
      ],
    ],
    inShopNav: true,
  },
  {
    name: "Neceseres y portatoallitas",
    slug: "neceseres-portatoallitas-bebe",
    legacySlugs: ["neceseres-personalizados", "accesorios-paseo-bebe"],
    includes: ["Neceseres", "Paseo"],
    title: "Neceseres y portatoallitas para bebé",
    seoTitle: "Neceseres personalizados y portatoallitas para bebé",
    eyebrow: "Todo ordenado, también fuera de casa",
    description:
      "Neceseres de tela con el nombre bordado y portatoallitas para llevar pañales y toallitas en el bolso o el carrito. Piezas pequeñas, prácticas y cosidas a mano.",
    metaDescription:
      "Neceseres personalizados con nombre bordado y portatoallitas de tela para bebé, cosidos a mano en España. Para el bolso, el carrito o regalar.",
    faqs: [
      ["¿Qué cabe en el portatoallitas?", "Varias unidades de pañales y un paquete de toallitas."],
      ["¿El neceser se puede personalizar?", "Sí, el neceser lleva el nombre bordado que elijas."],
    ],
    inShopNav: true,
  },
  {
    name: "Coronas de cumpleaños",
    slug: "coronas-cumpleanos-personalizadas",
    legacySlugs: ["coronas-cumpleanos"],
    includes: ["Celebraciones"],
    title: "Coronas de cumpleaños personalizadas",
    seoTitle: "Coronas de cumpleaños de tela personalizadas",
    eyebrow: "Un ritual para cada cumpleaños",
    description:
      "Coronas de cumpleaños de tela cosidas a mano, con el nombre bordado y el número intercambiable con velcro. Se ajustan con un lazo para acompañar muchos cumpleaños.",
    metaDescription:
      "Coronas de cumpleaños de tela personalizadas con nombre bordado y número intercambiable. Ajustables de 1 a 6-7 años aprox. Hechas a mano.",
    faqs: [
      [
        "¿Hasta qué edad sirve la corona?",
        "Se ajusta con cintas y lazo; está pensada aproximadamente desde 1 año hasta 6-7 años.",
      ],
      [
        "¿Cómo se cambia el número?",
        "El número es intercambiable mediante velcro, así la misma corona sirve año tras año.",
      ],
      [
        "¿Cómo se lava?",
        "A mano o en programa delicado, sin secadora. Planchar a baja temperatura evitando el velcro y el bordado.",
      ],
    ],
    inShopNav: true,
  },
  {
    name: "Bolsos de tela",
    slug: "bolsos-de-tela",
    legacySlugs: ["bolsos-artesanales"],
    includes: ["Bolsos"],
    title: "Bolsos y tote bags de tela",
    seoTitle: "Bolsos de tela y tote bags de vichy hechos a mano",
    eyebrow: "También para mamá",
    description:
      "Tote bags y bolsas de playa de tela vichy cosidas a mano: amplias, ligeras y con asas largas para el día a día, la piscina o las escapadas.",
    metaDescription:
      "Bolsos de tela y tote bags de vichy cosidos a mano en España: bolsa de playa grande y shopper reutilizable con asas largas.",
    faqs: [],
    inShopNav: true,
  },
  {
    name: "Regalos",
    slug: "regalos-personalizados-bebe",
    legacySlugs: [],
    includes: [],
    productSlugs: [
      "arrullo-bebe-personalizado-volantes-rosa",
      "mochila-guarderia-personalizada-nombre",
      "corona-cumpleanos-personalizada-tela",
      "neceser-personalizado-nombre-bordado",
      "manta-bebe-borreguito-invierno",
      "manta-bebe-algodon-waffle-75x100",
      "portatoallitas-portapanales-bebe",
    ],
    title: "Regalos personalizados para bebés",
    seoTitle: "Regalos personalizados para bebés y recién nacidos",
    eyebrow: "Para nacimientos, canastillas y cumpleaños",
    description:
      "Ideas de regalo cosidas a mano para recién nacidos, canastillas, baby showers y primeros cumpleaños. Las piezas personalizables llevan el nombre bordado, para que el regalo se guarde durante años.",
    metaDescription:
      "Regalos personalizados para bebés y recién nacidos, cosidos a mano en España: arrullos, mantas, mochilas, neceseres y coronas con nombre.",
    faqs: [
      [
        "¿Qué regalar a un recién nacido?",
        "Una manta o un arrullo con su nombre se usa desde el primer día; un portatoallitas o un neceser ayudan a la familia en cada salida.",
      ],
      [
        "¿Y para un primer cumpleaños?",
        "La corona de cumpleaños personalizada, con número intercambiable, acompaña ese y los siguientes cumpleaños.",
      ],
    ],
    inShopNav: false,
  },
];

export const getCategory = (slug: string) => shopCategories.find((c) => c.slug === slug);
/** Categoría principal (la de navegación) a la que pertenece un producto. */
export const getCategoryForProduct = (p: Product) =>
  shopCategories.find((c) => !c.productSlugs && c.includes.includes(p.category));

export const productsInCategory = (c: ShopCategory) =>
  c.productSlugs
    ? c.productSlugs.flatMap((slug) => {
        const p = getProduct(slug);
        return p ? [p] : [];
      })
    : products.filter((p) => c.includes.includes(p.category));

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

export const FREE_SHIPPING = 50;

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export type PostBlock = { type: "p" | "h2" | "h3"; text: string } | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  /** ISO 8601. Vacío en borradores. */
  datePublished: string;
  dateModified: string;
  author: string;
  image: string;
  blocks: PostBlock[];
  faq: [string, string][];
  relatedProducts: string[];
  /** Borrador: no se lista, no se indexa y no entra en el sitemap. */
  draft: boolean;
};

const real = realPosts as unknown as Record<
  string,
  { blocks: PostBlock[]; faq: [string, string][] }
>;
const realBlocks = (slug: string) => real[slug] ?? { blocks: [], faq: [] };

const legacyBody = (body: { heading?: string; text: string }[]): PostBlock[] =>
  body.flatMap((b) => [
    ...(b.heading ? [{ type: "h2" as const, text: b.heading }] : []),
    { type: "p" as const, text: b.text },
  ]);

export const allPosts: Post[] = [
  /* --- Artículos reales publicados en pingolinohandmade.com (autora: Sherezhade) --- */
  {
    slug: "bolsa-hospital-parto-lista-completa",
    title: "Cómo preparar la bolsa del hospital para el parto: lista completa para mamá y bebé",
    seoTitle: "Bolsa del hospital para el parto: lista completa",
    metaDescription:
      "Qué llevar en la bolsa del hospital para el parto: documentación, lista para mamá, bebé y acompañante, errores frecuentes y preguntas habituales.",
    excerpt:
      "Qué llevar para mamá, para el bebé y para el acompañante, cuándo prepararla y los errores más frecuentes.",
    category: "Maternidad",
    datePublished: "2026-07-02T01:51:00+02:00",
    dateModified: "2026-07-02T01:57:42+02:00",
    author: "Sherezhade",
    image: imgHospital,
    ...realBlocks("bolsa-hospital-parto-lista-completa"),
    relatedProducts: [
      "neceser-personalizado-nombre-bordado",
      "portatoallitas-portapanales-bebe",
      "manta-bebe-algodon-waffle-75x100",
      "arrullo-bebe-personalizado-volantes-rosa",
    ],
    draft: false,
  },
  {
    slug: "que-regalar-a-una-mama-primeriza",
    title: "Qué regalar a una mamá primeriza: ideas útiles que realmente agradecerá",
    seoTitle: "Qué regalar a una mamá primeriza: ideas útiles",
    metaDescription:
      "Ideas útiles para regalar a una mamá primeriza: neceser, portatoallitas, manta suave o accesorios personalizados hechos a mano.",
    excerpt:
      "Detalles bonitos y útiles que no terminan olvidados en un cajón, y por qué un regalo hecho a mano marca la diferencia.",
    category: "Ideas para regalar",
    datePublished: "2026-07-01T03:05:03+02:00",
    dateModified: "2026-07-01T03:12:13+02:00",
    author: "Sherezhade",
    image: imgMama,
    ...realBlocks("que-regalar-a-una-mama-primeriza"),
    relatedProducts: [
      "neceser-personalizado-nombre-bordado",
      "portatoallitas-portapanales-bebe",
      "tote-bag-vichy-negra",
      "arrullo-bebe-personalizado-volantes-rosa",
    ],
    draft: false,
  },
  {
    slug: "que-llevar-bolsa-carrito-bebe",
    title: "Qué llevar en la bolsa del carrito del bebé: la guía definitiva para no olvidar nada",
    seoTitle: "Qué llevar en la bolsa del carrito del bebé: checklist",
    metaDescription:
      "Checklist de qué llevar en la bolsa del carrito del bebé, cómo organizarla por zonas, errores habituales y cómo elegir una buena bolsa.",
    excerpt:
      "Checklist completa, cómo organizar la bolsa por zonas y los accesorios que de verdad marcan la diferencia.",
    category: "Paseos",
    datePublished: "2026-06-30T11:56:09+02:00",
    dateModified: "2026-06-30T11:58:29+02:00",
    author: "Sherezhade",
    image: imgCarrito,
    ...realBlocks("que-llevar-bolsa-carrito-bebe"),
    relatedProducts: [
      "portatoallitas-portapanales-bebe",
      "manta-bebe-borreguito-invierno",
      "neceser-personalizado-nombre-bordado",
      "manta-bebe-algodon-waffle-75x100",
    ],
    draft: false,
  },

  /* --- Borradores de la propuesta: pendientes de validar con la clienta antes de publicar --- */
  {
    slug: "como-elegir-manta-bebe",
    title: "Cómo elegir la manta perfecta para tu bebé según la estación",
    seoTitle: "Cómo elegir manta de bebé: muselina, waffle o borreguito",
    metaDescription:
      "Waffle, muselina o borreguito: qué tejido de manta conviene al bebé en cada época del año.",
    excerpt:
      "Waffle, muselina o borreguito: qué tejido conviene en cada época del año y cómo acertar con el regalo.",
    category: "Guías",
    datePublished: "",
    dateModified: "",
    author: "Sherezhade",
    image: neceser,
    blocks: legacyBody([
      {
        text: "Una manta acompaña al bebé en la cuna, el carrito y los primeros paseos. Por eso el tejido importa tanto como el diseño.",
      },
      {
        heading: "Primavera y verano: waffle y muselina",
        text: "El algodón waffle es ligero y transpirable. Combinado con muselina, abriga lo justo sin dar calor y se lava con facilidad.",
      },
      {
        heading: "Otoño e invierno: algodón con borreguito",
        text: "Un exterior de algodón con reverso de borreguito mantiene el calor en los días fríos sin perder suavidad al tacto.",
      },
      {
        heading: "El tamaño que más se usa",
        text: "75x100 cm es la medida más versátil: cabe en el capazo, cubre al bebé en la silla y sirve durante muchos meses.",
      },
      {
        heading: "Un detalle que la hace suya",
        text: "Bordar el nombre convierte una manta práctica en un recuerdo que la familia guarda durante años.",
      },
    ]),
    faq: [],
    relatedProducts: [
      "manta-bebe-algodon-waffle-75x100",
      "manta-bebe-borreguito-invierno",
      "arrullo-bebe-personalizado-volantes-rosa",
    ],
    draft: true,
  },
  {
    slug: "detras-de-cada-puntada",
    title: "Detrás de cada puntada: así se hace una pieza Pingolino",
    seoTitle: "Así se hace una pieza Pingolino, puntada a puntada",
    metaDescription:
      "El proceso artesanal de una pieza Pingolino Handmade, desde el tejido hasta el bordado.",
    excerpt:
      "Desde la elección del tejido hasta el bordado final, te enseñamos el proceso artesanal de nuestro taller.",
    category: "Taller",
    datePublished: "",
    dateModified: "",
    author: "Sherezhade",
    image: corona,
    blocks: legacyBody([
      {
        text: "Cada pieza se cose a mano, una a una, en un pequeño taller familiar. No hay producción en serie: hay tiempo y cuidado.",
      },
      {
        heading: "1. Elegir el tejido",
        text: "Seleccionamos algodones suaves y resistentes, los mismos que usaríamos para nuestros propios hijos.",
      },
      {
        heading: "2. Cortar y coser",
        text: "Cada patrón se corta a mano y se cose con remates reforzados para aguantar el uso diario y los lavados.",
      },
      {
        heading: "3. Personalizar",
        text: "Si la pieza lleva nombre, se borda al final. Revisamos cada letra antes de preparar el envío.",
      },
      {
        heading: "4. Preparar tu pedido",
        text: "Empaquetamos con mimo, listo para regalar. Tu pedido sale de nuestras manos directamente a tu casa.",
      },
    ]),
    faq: [],
    relatedProducts: [],
    draft: true,
  },
  {
    slug: "ideas-regalo-canastilla",
    title: "Ideas de regalo para una canastilla que no se olvida",
    seoTitle: "Ideas de regalo para una canastilla de bebé",
    metaDescription: "Piezas útiles y personalizadas para preparar una canastilla de bebé.",
    excerpt:
      "Piezas útiles, bonitas y personalizadas para sorprender a las familias que acaban de crecer.",
    category: "Regalos",
    datePublished: "",
    dateModified: "",
    author: "Sherezhade",
    image: neceser,
    blocks: legacyBody([
      {
        text: "El mejor regalo para un recién nacido es el que se usa cada día y, además, emociona al abrirlo.",
      },
      {
        heading: "Una manta con su nombre",
        text: "Práctica desde el primer día y con un bordado que la convierte en recuerdo.",
      },
      {
        heading: "Un neceser o portatoallitas",
        text: "Ayuda a mantener el bolso del carrito ordenado. Las familias lo agradecen desde la primera salida.",
      },
      {
        heading: "Pensando en más adelante",
        text: "Una corona de cumpleaños personalizada acompaña cada celebración, año tras año, con su número intercambiable.",
      },
    ]),
    faq: [],
    relatedProducts: [
      "arrullo-bebe-personalizado-volantes-rosa",
      "neceser-personalizado-nombre-bordado",
      "corona-cumpleanos-personalizada-tela",
    ],
    draft: true,
  },
];

/** Artículos publicados, del más reciente al más antiguo. */
export const posts = allPosts
  .filter((p) => !p.draft)
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export const getPost = (slug: string) => allPosts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  iso
    ? new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Madrid",
      }).format(new Date(iso))
    : "";

export const readingTime = (post: Post) => {
  const words = post.blocks.reduce(
    (n, b) => n + (b.type === "ul" ? b.items.join(" ") : b.text).split(/\s+/).length,
    0,
  );
  return `${Math.max(1, Math.round(words / 220))} min`;
};
