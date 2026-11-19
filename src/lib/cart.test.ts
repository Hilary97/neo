import assert from "node:assert/strict";
import { test } from "node:test";

import {
  FREE_SHIPPING_THRESHOLD,
  MAX_QUANTITY,
  addLine,
  buildWhatsAppMessage,
  createEmptyCart,
  getItemCount,
  getSubtotal,
  parseCart,
  removeLine,
  setQuantity,
  type CartLineInput,
} from "./cart.ts";

const taza: CartLineInput = {
  productId: "p-taza",
  slug: "taza-neo-blanca",
  title: "Taza NEO Blanca",
  image: "https://example.test/taza.jpg",
  price: 249,
  color: "Blanco",
};

const termo: CartLineInput = {
  productId: "p-termo",
  slug: "termo-acero-500ml",
  title: "Termo Acero 500ml",
  image: "https://example.test/termo.jpg",
  price: 349,
  color: "Negro",
};

test("addLine agrega una línea con cantidad 1", () => {
  const cart = addLine(createEmptyCart(), taza);

  assert.equal(cart.lines.length, 1);
  assert.equal(cart.lines[0].quantity, 1);
  assert.equal(cart.lines[0].title, taza.title);
  assert.equal(cart.lines[0].price, taza.price);
  assert.equal(cart.lines[0].color, "Blanco");
});

test("addLine del mismo producto y color incrementa la cantidad sin duplicar la línea", () => {
  const cart = addLine(addLine(createEmptyCart(), taza), taza);

  assert.equal(cart.lines.length, 1);
  assert.equal(cart.lines[0].quantity, 2);
});

test("addLine del mismo producto con otro color crea una línea separada", () => {
  const cart = addLine(addLine(createEmptyCart(), taza), {
    ...taza,
    color: "Negro",
  });

  assert.equal(cart.lines.length, 2);
  assert.deepEqual(
    cart.lines.map((line) => line.color),
    ["Blanco", "Negro"],
  );
});

test("addLine no supera MAX_QUANTITY", () => {
  let cart = createEmptyCart();
  for (let i = 0; i < MAX_QUANTITY + 3; i += 1) cart = addLine(cart, taza);

  assert.equal(cart.lines[0].quantity, MAX_QUANTITY);
});

test("setQuantity a 0 elimina la línea", () => {
  const cart = setQuantity(addLine(createEmptyCart(), taza), "p-taza", "Blanco", 0);

  assert.equal(cart.lines.length, 0);
});

test("setQuantity a negativo elimina la línea", () => {
  const cart = setQuantity(addLine(createEmptyCart(), taza), "p-taza", "Blanco", -4);

  assert.equal(cart.lines.length, 0);
});

test("setQuantity acota al máximo permitido", () => {
  const cart = setQuantity(addLine(createEmptyCart(), taza), "p-taza", "Blanco", 99);

  assert.equal(cart.lines[0].quantity, MAX_QUANTITY);
});

test("removeLine elimina sólo la línea indicada y deja el resto intacto", () => {
  const cart = removeLine(
    addLine(addLine(createEmptyCart(), taza), termo),
    "p-taza",
    "Blanco",
  );

  assert.equal(cart.lines.length, 1);
  assert.equal(cart.lines[0].productId, "p-termo");
  assert.equal(cart.lines[0].quantity, 1);
});

test("removeLine de un producto inexistente no altera el carrito", () => {
  const original = addLine(createEmptyCart(), taza);
  const cart = removeLine(original, "p-inexistente", null);

  assert.deepEqual(cart, original);
});

test("getItemCount suma cantidades y getSubtotal suma cantidad por precio", () => {
  const cart = addLine(addLine(createEmptyCart(), taza), termo);

  assert.equal(getItemCount(cart), 2);
  assert.equal(getSubtotal(cart), 249 + 349);
});

test("getSubtotal de un carrito vacío es 0", () => {
  assert.equal(getSubtotal(createEmptyCart()), 0);
  assert.equal(getItemCount(createEmptyCart()), 0);
});

test("buildWhatsAppMessage arma el pedido completo con variantes y total", () => {
  const cart = addLine(addLine(createEmptyCart(), taza), termo);

  assert.equal(
    buildWhatsAppMessage(cart),
    [
      "Hola! Quiero pedir:",
      "",
      "1x Taza NEO Blanca — $249 MXN",
      "   Color: Blanco",
      "1x Termo Acero 500ml — $349 MXN",
      "   Color: Negro",
      "",
      "TOTAL: $598 MXN",
      "Envío: gratis desde $1,000 MXN",
    ].join("\n"),
  );
});

test("buildWhatsAppMessage usa el total de línea y declara envío gratis sobre el umbral", () => {
  const cart = setQuantity(
    addLine(addLine(createEmptyCart(), taza), termo),
    "p-termo",
    "Negro",
    2,
  );

  const message = buildWhatsAppMessage(cart);

  assert.equal(getSubtotal(cart), 947);
  assert.equal(
    message,
    [
      "Hola! Quiero pedir:",
      "",
      "1x Taza NEO Blanca — $249 MXN",
      "   Color: Blanco",
      "2x Termo Acero 500ml — $698 MXN",
      "   Color: Negro",
      "",
      "TOTAL: $947 MXN",
      "Envío: gratis desde $1,000 MXN",
    ].join("\n"),
  );

  const freeShipping = buildWhatsAppMessage(
    setQuantity(cart, "p-termo", "Negro", 3),
  );
  assert.match(freeShipping, /^Envío: gratis$/m);
  assert.equal(FREE_SHIPPING_THRESHOLD, 1000);
});

test("buildWhatsAppMessage omite la línea de color cuando no hay variante", () => {
  const message = buildWhatsAppMessage(addLine(createEmptyCart(), { ...taza, color: null }));

  assert.match(message, /^1x Taza NEO Blanca — \$249 MXN$/m);
  assert.doesNotMatch(message, /Color:/);
});

test("buildWhatsAppMessage de un carrito vacío no produce un pedido", () => {
  assert.equal(buildWhatsAppMessage(createEmptyCart()), "");
});

test("parseCart recupera un carrito serializado válido", () => {
  const cart = addLine(addLine(createEmptyCart(), taza), termo);

  assert.deepEqual(parseCart(JSON.stringify(cart)), cart);
});

test("parseCart descarta payloads inválidos sin romper", () => {
  assert.deepEqual(parseCart(null), createEmptyCart());
  assert.deepEqual(parseCart(""), createEmptyCart());
  assert.deepEqual(parseCart("{no es json"), createEmptyCart());
  assert.deepEqual(parseCart('{"version":99,"lines":[]}'), createEmptyCart());
  assert.deepEqual(parseCart('{"version":1,"lines":"nope"}'), createEmptyCart());
});

test("parseCart descarta líneas con forma inválida y conserva las válidas", () => {
  const parsed = parseCart(
    JSON.stringify({
      version: 1,
      lines: [
        {
          productId: "p-taza",
          slug: "taza-neo-blanca",
          title: "Taza NEO Blanca",
          image: "https://example.test/taza.jpg",
          price: 249,
          color: "Blanco",
          quantity: 2,
        },
        { productId: "roto", price: "gratis", quantity: 1 },
      ],
    }),
  );

  assert.equal(parsed.lines.length, 1);
  assert.equal(parsed.lines[0].productId, "p-taza");
  assert.equal(parsed.lines[0].quantity, 2);
});
