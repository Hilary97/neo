"use client";

import { useState } from "react";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductCTA } from "./product-cta";
import type { Product } from "@/lib/products";

/**
 * Isla cliente de la página de producto: elige variante y ofrece los dos
 * caminos — carrito (con el checkout por WhatsApp del drawer) y compra directa
 * con ProductCTA (link de pago de MP / PayPal / WhatsApp de un solo producto).
 */
export function ProductPurchase({ product }: { product: Product }) {
  const [color, setColor] = useState<string | null>(
    product.colors[0]?.name ?? null,
  );

  return (
    <div className="flex flex-col gap-4">
      {product.colors.length > 0 && (
        <div>
          <p className="font-condensed text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Colores
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {product.colors.map((option) => {
              const selected = option.name === color;

              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setColor(option.name)}
                  aria-pressed={selected}
                  className="flex items-center gap-1.5"
                >
                  <span
                    className={`h-6 w-6 rounded-full border transition-all ${
                      selected
                        ? "border-black ring-2 ring-black ring-offset-2 ring-offset-white"
                        : "border-zinc-300"
                    }`}
                    style={{ backgroundColor: option.hex }}
                    aria-hidden
                  />
                  <span
                    className={`font-body text-sm ${
                      selected ? "text-black" : "text-zinc-600"
                    }`}
                  >
                    {option.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex max-w-xs flex-col gap-2">
        <AddToCartButton
          product={product}
          color={color}
          className="border border-black bg-transparent py-3 text-black hover:bg-black/5"
        />
        <ProductCTA product={product} className="py-3 text-sm" />
      </div>
    </div>
  );
}
