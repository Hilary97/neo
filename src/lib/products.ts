/* ─── Tipos de Producto ─── */

export type BadgeVariant =
  | "best-seller"
  | "limited-edition"
  | "sale"
  | "new"
  | "pre-order"
  | "kit";

export interface ProductBadge {
  label: string;
  variant: BadgeVariant;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

/* ─── Categorías de Temporada ───
 * Definidas en /data/<temporada>.json. Cada categoría es libre (string):
 * para sumar o quitar categorías entre temporadas, alcanza con editar el JSON.
 */
export interface Category {
  /** Identificador usado en Product.category y en /collections/[slug] */
  slug: string;
  /** Nombre corto para badges/nav (ej. featured-categories) */
  label: string;
  /** Título de la página de colección */
  title: string;
  /** Bajada de la página de colección */
  subtitle: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  images: string[];
  badges: ProductBadge[];
  price: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  /** Debe matchear el `slug` de alguna entrada en CATEGORIES */
  category: string;
  /** Si es false, el producto no aparece en la sección "Productos en Stock" del home */
  inStock: boolean;
  /* URL del Link de Pago de Mercado Pago (creado manualmente en el dashboard MP).
     Si está ausente o vacío, la card cae al CTA de WhatsApp. */
  mercadoPagoLink?: string;
  /* Si es true, la card muestra además el botón de PayPal (Smart Buttons,
     pago client-side sin backend). Ver src/app/components/paypal-button.tsx. */
  paypalEnabled?: boolean;
}

/* ─── Productos de Temporada ───
 * Los datos viven en /data/<temporada>.json.
 * Para cambiar de temporada, actualizá este import.
 */

import seasonData from "../../data/hot-sale-2026.json";

export const CATEGORIES = seasonData.categories as Category[];
export const PRODUCTS = seasonData.products as Product[];

export function getDiscountedPrice(product: Product): number {
  return product.price;
}

export function getDiscountPercent(
  price: number,
  originalPrice: number | null
): number | null {
  if (!originalPrice) return null;
  return Math.round((1 - price / originalPrice) * 100);
}
