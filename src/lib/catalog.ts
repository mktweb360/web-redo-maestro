import productsData from "@/data/products.json";
import taller from "@/assets/pingolino/taller.jpg";
import materiales from "@/assets/pingolino/materiales.jpg";
import neceser from "@/assets/pingolino/neceser.jpg";

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
export const categories = ["Todo", "Mantas", "Mochilas", "Bolsos", "Paseo", "Neceseres", "Celebraciones"];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

export const FREE_SHIPPING = 50;

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: { heading?: string; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "como-elegir-manta-bebe",
    title: "Cómo elegir la manta perfecta para tu bebé según la estación",
    excerpt: "Waffle, muselina o borreguito: qué tejido conviene en cada época del año y cómo acertar con el regalo.",
    category: "Guías",
    date: "12 sept 2026",
    readTime: "4 min",
    image: materiales,
    body: [
      { text: "Una manta acompaña al bebé en la cuna, el carrito y los primeros paseos. Por eso el tejido importa tanto como el diseño." },
      { heading: "Primavera y verano: waffle y muselina", text: "El algodón waffle es ligero y transpirable. Combinado con muselina, abriga lo justo sin dar calor y se lava con facilidad." },
      { heading: "Otoño e invierno: algodón con borreguito", text: "Un exterior de algodón con reverso de borreguito mantiene el calor en los días fríos sin perder suavidad al tacto." },
      { heading: "El tamaño que más se usa", text: "75x100 cm es la medida más versátil: cabe en el capazo, cubre al bebé en la silla y sirve durante muchos meses." },
      { heading: "Un detalle que la hace suya", text: "Bordar el nombre convierte una manta práctica en un recuerdo que la familia guarda durante años." },
    ],
  },
  {
    slug: "detras-de-cada-puntada",
    title: "Detrás de cada puntada: así se hace una pieza Pingolino",
    excerpt: "Desde la elección del tejido hasta el bordado final, te enseñamos el proceso artesanal de nuestro taller.",
    category: "Taller",
    date: "2 sept 2026",
    readTime: "5 min",
    image: taller,
    body: [
      { text: "Cada pieza se cose a mano, una a una, en un pequeño taller familiar. No hay producción en serie: hay tiempo y cuidado." },
      { heading: "1. Elegir el tejido", text: "Seleccionamos algodones suaves y resistentes, los mismos que usaríamos para nuestros propios hijos." },
      { heading: "2. Cortar y coser", text: "Cada patrón se corta a mano y se cose con remates reforzados para aguantar el uso diario y los lavados." },
      { heading: "3. Personalizar", text: "Si la pieza lleva nombre, se borda al final. Revisamos cada letra antes de preparar el envío." },
      { heading: "4. Preparar tu pedido", text: "Empaquetamos con mimo, listo para regalar. Tu pedido sale de nuestras manos directamente a tu casa." },
    ],
  },
  {
    slug: "ideas-regalo-canastilla",
    title: "Ideas de regalo para una canastilla que no se olvida",
    excerpt: "Piezas útiles, bonitas y personalizadas para sorprender a las familias que acaban de crecer.",
    category: "Regalos",
    date: "20 ago 2026",
    readTime: "3 min",
    image: neceser,
    body: [
      { text: "El mejor regalo para un recién nacido es el que se usa cada día y, además, emociona al abrirlo." },
      { heading: "Una manta con su nombre", text: "Práctica desde el primer día y con un bordado que la convierte en recuerdo." },
      { heading: "Un neceser o portatoallitas", text: "Ayuda a mantener el bolso del carrito ordenado. Las familias lo agradecen desde la primera salida." },
      { heading: "Pensando en más adelante", text: "Una corona de cumpleaños personalizada acompaña cada celebración, año tras año, con su número intercambiable." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
