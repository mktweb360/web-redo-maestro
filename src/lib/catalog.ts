import productsData from "@/data/products.json";
import postsData from "@/data/posts.json";

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  category: string;
  available: boolean;
  personalizable: boolean;
  description: string[];
  images: string[];
};

export const products = productsData as Product[];

export type ShopCategory = {
  name: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  metaDescription: string;
};

export const shopCategories: ShopCategory[] = [
  {
    name: "Mantas",
    slug: "mantas-bebe",
    title: "Mantas para bebé hechas a mano",
    eyebrow: "Suavidad para sus primeros días",
    description: "Mantas de algodón, waffle, muselina y borreguito confeccionadas artesanalmente para la cuna, el carrito y los primeros paseos. Diseños suaves, duraderos y pensados para regalar.",
    metaDescription: "Mantas para bebé hechas a mano en España: algodón, waffle, muselina y borreguito para cuna y carrito. Descubre la colección Pingolino.",
  },
  {
    name: "Mochilas",
    slug: "mochilas-infantiles",
    title: "Mochilas infantiles personalizadas",
    eyebrow: "Su primera mochila, solo suya",
    description: "Mochilas infantiles de algodón, ligeras y cómodas para la guardería, el colegio o la merienda. Personalízalas con su nombre para que cada peque reconozca la suya.",
    metaDescription: "Mochilas infantiles personalizadas con nombre, hechas a mano en algodón. Ideales para guardería, educación infantil y merienda.",
  },
  {
    name: "Bolsos",
    slug: "bolsos-artesanales",
    title: "Bolsos artesanales de tela",
    eyebrow: "Compañeros para cada día",
    description: "Bolsas de playa y tote bags cosidas a mano con tejidos resistentes y diseños atemporales. Piezas amplias, ligeras y prácticas para acompañarte dentro y fuera de casa.",
    metaDescription: "Bolsos artesanales de tela, tote bags y bolsas de playa hechas a mano en España con tejidos resistentes y diseños únicos.",
  },
  {
    name: "Paseo",
    slug: "accesorios-paseo-bebe",
    title: "Accesorios para el paseo del bebé",
    eyebrow: "Todo a mano, también fuera de casa",
    description: "Accesorios textiles para organizar el carrito y llevar los imprescindibles del bebé con comodidad. Confeccionados a mano para resistir el ritmo de cada día.",
    metaDescription: "Accesorios para el paseo del bebé hechos a mano: piezas textiles prácticas para organizar el carrito y llevar todo lo necesario.",
  },
  {
    name: "Neceseres",
    slug: "neceseres-personalizados",
    title: "Neceseres personalizados hechos a mano",
    eyebrow: "Pequeños imprescindibles",
    description: "Neceseres de tela confeccionados artesanalmente para guardar productos del bebé, cosmética o accesorios. Un regalo útil, bonito y preparado con mucho mimo.",
    metaDescription: "Neceseres personalizados y artesanales de tela, hechos a mano en España. Regalos prácticos para bebé, mamá y el día a día.",
  },
  {
    name: "Celebraciones",
    slug: "coronas-cumpleanos",
    title: "Coronas de cumpleaños personalizadas",
    eyebrow: "Un ritual para recordar cada año",
    description: "Coronas de cumpleaños infantiles hechas a mano y personalizadas para convertir su día en un recuerdo especial. Diseños textiles pensados para acompañar muchas celebraciones.",
    metaDescription: "Coronas de cumpleaños personalizadas para niños, hechas a mano en tela. Un recuerdo artesanal para celebrar año tras año.",
  },
];

export const categories = ["Todo", ...shopCategories.map((category) => category.name)];
export const getCategory = (slug: string) => shopCategories.find((category) => category.slug === slug);
export const getCategoryByName = (name: string) => shopCategories.find((category) => category.name === name);
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
export const FREE_SHIPPING = 50;

export type PostBlock = { heading?: string; text?: string; list?: string[] };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  image: string;
  body: PostBlock[];
};

export const posts = postsData as Post[];
export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
