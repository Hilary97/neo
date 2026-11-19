"use client";

import { useCart } from "./cart-provider";

interface CartTriggerProps {
  className?: string;
}

export function CartCountBadge({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <span
      aria-hidden
      className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sale px-1 font-condensed text-[11px] font-bold leading-none text-white"
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

/** Icono de carrito del header. */
export function CartHeaderButton({ className }: CartTriggerProps) {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir carrito${itemCount > 0 ? ` (${itemCount} productos)` : ""}`}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 ${className ?? ""}`}
    >
      <CartIcon />
      <CartCountBadge count={itemCount} />
    </button>
  );
}

/** Disparador flotante para mobile: alcanzable con el pulgar. */
export function CartFloatingTrigger() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir carrito${itemCount > 0 ? ` (${itemCount} productos)` : ""}`}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-black px-5 py-3 font-condensed text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-black/25 transition-all hover:bg-zinc-800 active:scale-95 md:hidden"
    >
      <span className="relative flex">
        <CartIcon />
        <CartCountBadge count={itemCount} />
      </span>
      Carrito
      {itemCount > 0 && (
        <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[11px] leading-none">
          {itemCount}
        </span>
      )}
    </button>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.55L21 8H6" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
    </svg>
  );
}
