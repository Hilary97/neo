/* ─── Carrito ───
 * Lógica pura, sin React ni DOM: se testea con `node --test` (ver cart.test.ts).
 * La UI vive en src/app/components/cart-*.tsx y sólo consume estas funciones.
 */

export const CART_VERSION = 1 as const;
export const CART_STORAGE_KEY = "neo.cart.v1";

/** Tope por línea para que un click repetido no arme un pedido absurdo. */
export const MAX_QUANTITY = 10;

/** Umbral de envío gratis declarado en la metadata del sitio ($1,000 MXN). */
export const FREE_SHIPPING_THRESHOLD = 1000;

/** WhatsApp de la tienda, el mismo que usa product-cta.tsx para "Solicitar". */
export const WHATSAPP_PHONE = "523312724005";

const MAX_LINES = 50;

/** Lo que necesita el carrito para representar un producto. */
export interface CartLineInput {
  productId: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  /** Variante elegida (nombre del color) o null si el producto no tiene colores. */
  color: string | null;
}

export interface CartLine extends CartLineInput {
  quantity: number;
}

export interface Cart {
  version: typeof CART_VERSION;
  lines: CartLine[];
}

export function createEmptyCart(): Cart {
  return { version: CART_VERSION, lines: [] };
}

function sameLine(line: CartLine, productId: string, color: string | null) {
  return line.productId === productId && line.color === color;
}

function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(Math.max(Math.trunc(quantity), 1), MAX_QUANTITY);
}

/** Suma una unidad (o `quantity`) al carrito, mergeando por producto + variante. */
export function addLine(
  cart: Cart,
  input: CartLineInput,
  quantity = 1,
): Cart {
  const amount = clampQuantity(quantity);
  const index = cart.lines.findIndex((line) =>
    sameLine(line, input.productId, input.color),
  );

  if (index === -1) {
    if (cart.lines.length >= MAX_LINES) return cart;
    return {
      ...cart,
      lines: [...cart.lines, { ...input, quantity: amount }],
    };
  }

  const lines = cart.lines.map((line, i) =>
    i === index
      ? { ...line, quantity: Math.min(line.quantity + amount, MAX_QUANTITY) }
      : line,
  );

  return { ...cart, lines };
}

/** Fija la cantidad de una línea. Cantidad <= 0 la elimina. */
export function setQuantity(
  cart: Cart,
  productId: string,
  color: string | null,
  quantity: number,
): Cart {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return removeLine(cart, productId, color);
  }

  return {
    ...cart,
    lines: cart.lines.map((line) =>
      sameLine(line, productId, color)
        ? { ...line, quantity: clampQuantity(quantity) }
        : line,
    ),
  };
}

/** Quita una línea puntual; el resto del carrito queda igual. */
export function removeLine(
  cart: Cart,
  productId: string,
  color: string | null,
): Cart {
  const lines = cart.lines.filter(
    (line) => !sameLine(line, productId, color),
  );

  if (lines.length === cart.lines.length) return cart;

  return { ...cart, lines };
}

export function clearCart(): Cart {
  return createEmptyCart();
}

/** Unidades totales (la suma de cantidades, no de líneas). */
export function getItemCount(cart: Cart): number {
  return cart.lines.reduce((total, line) => total + line.quantity, 0);
}

export function getSubtotal(cart: Cart): number {
  return cart.lines.reduce(
    (total, line) => total + line.price * line.quantity,
    0,
  );
}

export function formatPrice(value: number): string {
  return value.toLocaleString("es-MX");
}

function buildShippingLine(subtotal: number): string {
  return subtotal >= FREE_SHIPPING_THRESHOLD
    ? "Envío: gratis"
    : `Envío: gratis desde $${formatPrice(FREE_SHIPPING_THRESHOLD)} MXN`;
}

/**
 * Arma el pedido completo para WhatsApp. Un carrito vacío devuelve "" :
 * no hay pedido que mandar. La UI decide el encodeURIComponent.
 */
export function buildWhatsAppMessage(cart: Cart): string {
  if (cart.lines.length === 0) return "";

  const subtotal = getSubtotal(cart);

  const itemLines = cart.lines.flatMap((line) => {
    const head = `${line.quantity}x ${line.title} — $${formatPrice(
      line.price * line.quantity,
    )} MXN`;
    return line.color ? [head, `   Color: ${line.color}`] : [head];
  });

  return [
    "Hola! Quiero pedir:",
    "",
    ...itemLines,
    "",
    `TOTAL: $${formatPrice(subtotal)} MXN`,
    buildShippingLine(subtotal),
  ].join("\n");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toLine(value: unknown): CartLine | null {
  if (!isRecord(value)) return null;

  const { productId, slug, title, image, price, color, quantity } = value;

  if (
    typeof productId !== "string" ||
    typeof slug !== "string" ||
    typeof title !== "string" ||
    typeof image !== "string" ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0 ||
    typeof quantity !== "number" ||
    !Number.isFinite(quantity) ||
    quantity < 1 ||
    (color !== null && typeof color !== "string")
  ) {
    return null;
  }

  return {
    productId,
    slug,
    title,
    image,
    price,
    color: color as string | null,
    quantity: Math.min(Math.max(Math.trunc(quantity), 1), MAX_QUANTITY),
  };
}

/**
 * Parsea el payload guardado en localStorage. Cualquier cosa rara (JSON roto,
 * versión de otro formato, líneas mal formadas) degrada a lo que sea válido:
 * nunca tira, para no romper el render del carrito.
 */
export function parseCart(raw: string | null | undefined): Cart {
  if (!raw) return createEmptyCart();

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return createEmptyCart();
  }

  if (!isRecord(parsed) || parsed.version !== CART_VERSION) {
    return createEmptyCart();
  }

  if (!Array.isArray(parsed.lines)) return createEmptyCart();

  const lines = parsed.lines
    .map(toLine)
    .filter((line): line is CartLine => line !== null)
    .slice(0, MAX_LINES);

  return { version: CART_VERSION, lines };
}

export function serializeCart(cart: Cart): string {
  return JSON.stringify(cart);
}
