/* ─── Store del carrito (cliente) ───
 * Store externo mínimo para que el carrito se lea con `useSyncExternalStore`:
 * así la hidratación desde localStorage no dispara setState dentro de un effect
 * y el snapshot del server es estable.
 */

import {
  CART_STORAGE_KEY,
  addLine,
  clearCart,
  createEmptyCart,
  parseCart,
  removeLine,
  serializeCart,
  setQuantity,
  type Cart,
  type CartLineInput,
} from "./cart";

export interface CartSnapshot {
  cart: Cart;
  /** false hasta que se leyó localStorage. */
  hydrated: boolean;
}

const INITIAL_SNAPSHOT: CartSnapshot = {
  cart: createEmptyCart(),
  hydrated: false,
};

let snapshot: CartSnapshot = INITIAL_SNAPSHOT;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function persist(cart: Cart) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, serializeCart(cart));
  } catch {
    // Modo privado o storage lleno: el carrito sigue andando en memoria.
  }
}

function commit(cart: Cart) {
  snapshot = { cart, hydrated: snapshot.hydrated };
  persist(cart);
  emit();
}

export function subscribeCart(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCartSnapshot(): CartSnapshot {
  return snapshot;
}

export function getServerCartSnapshot(): CartSnapshot {
  return INITIAL_SNAPSHOT;
}

/** Lee localStorage una única vez, del lado del cliente. */
export function hydrateCart() {
  if (snapshot.hydrated || typeof window === "undefined") return;

  snapshot = {
    cart: parseCart(window.localStorage.getItem(CART_STORAGE_KEY)),
    hydrated: true,
  };
  emit();
}

export const cartStore = {
  addItem(input: CartLineInput) {
    commit(addLine(snapshot.cart, input));
  },
  updateQuantity(productId: string, color: string | null, quantity: number) {
    commit(setQuantity(snapshot.cart, productId, color, quantity));
  },
  removeItem(productId: string, color: string | null) {
    commit(removeLine(snapshot.cart, productId, color));
  },
  clear() {
    commit(clearCart());
  },
};
