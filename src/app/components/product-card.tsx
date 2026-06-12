"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductBadge } from "./product-badge";
import { PayPalButton } from "./paypal-button";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const hasSecondImage = product.images.length > 1;
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const hasPaymentLink = Boolean(product.mercadoPagoLink);
  const hasPayPal = !hasPaymentLink && Boolean(product.paypalEnabled);
  const whatsappHref = `https://wa.me/523312724005?text=${encodeURIComponent(
    `Me interesa el producto: ${product.title} - $${product.price.toLocaleString("es-MX")} MXN\n\nVer imagen: ${product.images[0]}`,
  )}`;

  return (
    <article
      className="group flex flex-col gap-3 opacity-0 animate-in"
      style={{
        animation: `fadeUp 0.5s ease ${index * 0.08}s forwards`,
      }}
    >
      {/* Image Container */}
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100"
        onMouseEnter={() => hasSecondImage && setImgIndex(1)}
        onMouseLeave={() => setImgIndex(0)}
      >
        <Image
          src={product.images[imgIndex]}
          alt={product.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="absolute right-2 top-2 z-10 flex flex-col gap-1.5">
            {product.badges.map((badge) => (
              <ProductBadge
                key={`${badge.label}-${badge.variant}`}
                label={badge.label}
                variant={badge.variant}
              />
            ))}
          </div>
        )}

        {/* Color Swatches on Image */}
        {product.colors.length > 0 && (
          <div className="absolute bottom-3 left-3 z-10 flex gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                className="h-5 w-5 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110"
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-1">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="text-amber-400">
            {"★".repeat(Math.round(product.rating))}
          </span>
          <span className="text-zinc-400">({product.reviewCount})</span>
        </div>

        {/* Title */}
        <h3 className="font-condensed text-lg font-semibold uppercase leading-tight tracking-wide">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-xl font-bold">
            ${product.price.toLocaleString("es-MX")} MXN
          </span>
          {hasDiscount && (
            <span className="text-sm text-zinc-400 line-through">
              ${product.originalPrice!.toLocaleString("es-MX")} MXN
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="mt-1 flex items-center gap-1">
            {product.colors.map((color) => (
              <button
                key={color.name}
                className="h-4 w-4 rounded-full border border-zinc-300"
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
          </div>
        )}

        {/* CTA único: prioridad Mercado Pago > PayPal > WhatsApp (nunca más de una opción) */}
        {hasPaymentLink ? (
          <a
            href={product.mercadoPagoLink!}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full rounded-full bg-black py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
          >
            Comprar
          </a>
        ) : hasPayPal ? (
          <PayPalButton amount={product.price} />
        ) : (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full rounded-full bg-black py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
          >
            Solicitar
          </a>
        )}
      </div>
    </article>
  );
}
