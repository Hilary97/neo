import { ProductCardMotion } from "./product-card-motion";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return <ProductCardMotion product={product} index={index} />;
}
