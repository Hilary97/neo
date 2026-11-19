"use client";

import { cn } from "@/lib/cn";
import { useCart } from "./cart-provider";
import type { Product } from "@/lib/products";

interface AddToCartButtonProps {
  product: Product;
  /** Nombre del color elegido, o null si el producto no tiene variantes. */
  color?: string | null;
  className?: string;
  label?: string;
}

/** Traduce un Product al ítem mínimo que guarda el carrito. */
export function AddToCartButton({
  product,
  color = null,
  className,
  label = "Agregar al carrito",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          productId: product.id,
          slug: product.slug,
          title: product.title,
          image: product.images[0],
          price: product.price,
          color,
        })
      }
      className={cn(
        "w-full rounded-full bg-black py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-[0.98]",
        className,
      )}
    >
      {label}
    </button>
  );
}
