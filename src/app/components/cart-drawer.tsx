"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./cart-provider";
import {
  FREE_SHIPPING_THRESHOLD,
  WHATSAPP_PHONE,
  buildWhatsAppMessage,
  formatPrice,
} from "@/lib/cart";

export function CartDrawer() {
  const {
    cart,
    itemCount,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clear,
  } = useCart();

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = "cart-drawer";

  // Escape cierra y el fondo no scrollea mientras el drawer está abierto.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  const message = buildWhatsAppMessage(cart);
  const checkoutHref = message
    ? `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
    : undefined;

  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Cerrar carrito"
            onClick={closeCart}
            className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-[2px]"
          />

          <motion.aside
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <header className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wide">
                Tu carrito
                {itemCount > 0 && (
                  <span className="ml-2 font-condensed text-sm font-semibold text-zinc-500">
                    ({itemCount})
                  </span>
                )}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none transition-colors hover:bg-black/5"
              >
                ×
              </button>
            </header>

            {cart.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="font-condensed text-sm font-semibold uppercase tracking-widest text-zinc-500">
                  Carrito vacío
                </p>
                <p className="font-body text-sm text-zinc-500">
                  Todavía no agregaste nada. Mirá los productos en oferta.
                </p>
                <Link
                  href="/#products"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-black px-6 py-2.5 font-condensed text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800"
                >
                  Ver productos
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-black/5 overflow-y-auto px-5">
                  {cart.lines.map((line) => (
                    <li
                      key={`${line.productId}-${line.color ?? "sin-color"}`}
                      className="flex gap-3 py-4"
                    >
                      <Link
                        href={`/products/${line.slug}`}
                        onClick={closeCart}
                        className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100"
                      >
                        <Image
                          src={line.image}
                          alt={line.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <Link
                          href={`/products/${line.slug}`}
                          onClick={closeCart}
                          className="font-condensed text-sm font-semibold uppercase leading-tight tracking-wide hover:underline"
                        >
                          {line.title}
                        </Link>

                        {line.color && (
                          <p className="font-body text-xs text-zinc-500">
                            Color: {line.color}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between gap-2">
                          <div className="flex items-center rounded-full border border-black/15">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  line.productId,
                                  line.color,
                                  line.quantity - 1,
                                )
                              }
                              aria-label={`Quitar una unidad de ${line.title}`}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-black/5"
                            >
                              −
                            </button>
                            <span
                              aria-live="polite"
                              className="min-w-6 text-center font-condensed text-sm font-semibold"
                            >
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  line.productId,
                                  line.color,
                                  line.quantity + 1,
                                )
                              }
                              aria-label={`Agregar una unidad de ${line.title}`}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-black/5"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-heading text-sm font-bold">
                            ${formatPrice(line.price * line.quantity)} MXN
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(line.productId, line.color)}
                          className="mt-1 self-start font-body text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-sale"
                        >
                          Quitar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-black/10 px-5 py-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-condensed text-sm font-semibold uppercase tracking-widest">
                      Total
                    </span>
                    <span className="font-heading text-xl font-bold">
                      ${formatPrice(subtotal)} MXN
                    </span>
                  </div>

                  <p className="mt-1 font-body text-xs text-zinc-500">
                    {missingForFreeShipping > 0
                      ? `Te faltan $${formatPrice(missingForFreeShipping)} MXN para envío gratis`
                      : "Envío gratis en este pedido"}
                  </p>

                  {checkoutHref && (
                    <a
                      href={checkoutHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block w-full rounded-full bg-black py-3 text-center font-condensed text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
                    >
                      Finalizar por WhatsApp
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-2 w-full py-2 text-center font-body text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-black"
                  >
                    Seguir comprando
                  </button>

                  <button
                    type="button"
                    onClick={clear}
                    className="mt-1 w-full py-1 text-center font-body text-[11px] text-zinc-400 underline underline-offset-2 transition-colors hover:text-sale"
                  >
                    Vaciar carrito
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
