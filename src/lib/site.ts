/**
 * Datos de negocio y configuración global del sitio.
 *
 * Fuente de los datos de contacto: política de privacidad publicada en
 * pingolinohandmade.com (rastreo del 26/09/2026). Cualquier dato que no esté
 * verificado se deja vacío a propósito: el sitio no debe inventar información.
 */

const env = import.meta.env as Record<string, string | undefined>;

/** Dominio público definitivo (sin barra final). */
export const SITE_URL = (env["VITE_SITE_URL"] ?? "https://pingolinohandmade.com").replace(
  /\/$/,
  "",
);

/**
 * Tienda Shopify que procesa el pago. Se usa el dominio .myshopify.com porque
 * el dominio principal pasará a servir esta web. Configurable por entorno.
 */
export const SHOPIFY_DOMAIN = env["VITE_SHOPIFY_DOMAIN"] ?? "ycsp2t-ba.myshopify.com";

/** Contenedor de Google Tag Manager (opcional). Vacío = no se carga nada. */
export const GTM_ID = env["VITE_GTM_ID"] ?? "";

export const BRAND = {
  name: "Pingolino Handmade",
  legalName: "", // PENDIENTE: titular o razón social (aviso legal)
  taxId: "", // PENDIENTE: NIF
  founder: "Sherezhade",
  email: "info@pingolinohandmade.com",
  phone: "+34 615 67 17 96",
  phoneHref: "tel:+34615671796",
  address: {
    street: "Calle Pardillo 40",
    postalCode: "45215",
    locality: "Toledo",
    region: "Toledo",
    country: "ES",
  },
  /** Solo perfiles verificados. Añadir Instagram/Facebook cuando la clienta los confirme. */
  social: {
    tiktok: "https://www.tiktok.com/@pingolinohandmade",
  } as Record<string, string>,
  freeShippingFrom: 50,
  privacyPolicyUrl: `https://ycsp2t-ba.myshopify.com/policies/privacy-policy`,
} as const;

export const DEFAULT_DESCRIPTION =
  "Mantas, arrullos, mochilas de guardería, neceseres y coronas de cumpleaños cosidos a mano en España y personalizados con el nombre bordado.";

export const absoluteUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
