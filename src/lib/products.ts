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
  category: "makeup" | "fashion";
}

/* ─── Productos de Temporada ───
 * Los datos viven en /data/<temporada>.json.
 * Para cambiar de temporada, actualizá este import.
 */

import seasonData from "../../data/hot-sale-2026.json";

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
