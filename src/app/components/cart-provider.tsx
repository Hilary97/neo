"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { getItemCount, getSubtotal, type Cart, type CartLineInput } from "@/lib/cart";
import {
  cartStore,
  getCartSnapshot,
  getServerCartSnapshot,
  hydrateCart,
  subscribeCart,
} from "@/lib/cart-store";

interface CartContextValue {
  cart: Cart;
  /** Unidades totales, para el contador del header y del botón flotante. */
  itemCount: number;
  subtotal: number;
  /** false hasta que se leyó localStorage: evita parpadeo de contador en 0. */
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: CartLineInput) => void;
  updateQuantity: (
    productId: string,
    color: string | null,
    quantity: number,
  ) => void;
  removeItem: (productId: string, color: string | null) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { cart, hydrated } = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    hydrateCart();
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((input: CartLineInput) => {
    cartStore.addItem(input);
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback(
    (productId: string, color: string | null, quantity: number) => {
      cartStore.updateQuantity(productId, color, quantity);
    },
    [],
  );

  const removeItem = useCallback((productId: string, color: string | null) => {
    cartStore.removeItem(productId, color);
  }, []);

  const clear = useCallback(() => {
    cartStore.clear();
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      itemCount: getItemCount(cart),
      subtotal: getSubtotal(cart),
      hydrated,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    }),
    [
      cart,
      hydrated,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    ],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return context;
}
