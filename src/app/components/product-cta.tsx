"use client";

import { cn } from "@/lib/cn";
import { PayPalButton } from "./paypal-button";
import type { Product } from "@/lib/products";

interface ProductCTAProps {
  product: Product;
  className?: string;
}

const ctaClassName =
  "w-full rounded-full bg-black py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-[0.98]";

/* CTA único: prioridad Mercado Pago > PayPal > WhatsApp (nunca más de una opción) */
export function ProductCTA({ product, className }: ProductCTAProps) {
  const hasPaymentLink = Boolean(product.mercadoPagoLink);
  const hasPayPal = !hasPaymentLink && Boolean(product.paypalEnabled);

  if (hasPaymentLink) {
    return (
      <a
        href={product.mercadoPagoLink!}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(ctaClassName, className)}
      >
        Comprar
      </a>
    );
  }

  if (hasPayPal) {
    return <PayPalButton amount={product.price} />;
  }

  const whatsappHref = `https://wa.me/523312724005?text=${encodeURIComponent(
    `Me interesa el producto: ${product.title} - $${product.price.toLocaleString("es-MX")} MXN\n\nVer imagen: ${product.images[0]}`,
  )}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(ctaClassName, className)}
    >
      Solicitar
    </a>
  );
}
