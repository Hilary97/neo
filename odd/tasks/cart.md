# Cart — carrito de compras para la landing Hot Sale 2026

Feature branch: `feat/cart` · Documento de especificación que leen los workers: leé hasta `## Log`.

## Specs

**S1** — Pedido del usuario, verbatim:

> Vamos a gregar la funcinalidad de carrito

**S2** — Checkout del carrito: **WhatsApp con el pedido completo**. El carrito arma UN mensaje con todos los ítems,
cantidades, variantes y total. Cero backend. Opción elegida por el usuario, verbatim: `WhatsApp con el pedido completo`.

Formato aprobado (preview aceptado por el usuario):

```
Hola! Quiero pedir:

1x Taza NEO Blanca — $249 MXN
   Color: Blanco
2x Termo Acero 500ml — $698 MXN
   Color: Negro

TOTAL: $947 MXN
Envío: gratis (>$1,000)
```

**S3** — Forma: **drawer lateral** que entra desde la derecha, sobre la página, con overlay.
Verbatim: `Drawer lateral (recomendado)`.

**S4** — Disparador: **ambos** — header sticky nuevo con icono + contador, y botón flotante en mobile.
Verbatim: `Ambos (header + flotante mobile)`.

**S5** — Persistencia en `localStorage` (decisión del agente, ver L3). Un payload inválido, de otra versión o
corrupto no rompe la página: el carrito arranca vacío y el storage no se pisa hasta la próxima mutación real.

**S6** — Reparto de CTAs. Las cards pasan a un único CTA `Agregar al carrito`. La página de producto
(`/products/[slug]`) **conserva** `ProductCTA` (compra directa MP / PayPal / WhatsApp) y suma `Agregar al carrito`.
`product-cta.tsx` no se modifica.

**S7** — Dinero y formato: moneda MXN, `toLocaleString("es-MX")`, precios tomados de `Product.price`.
Umbral de envío gratis: **$1,000 MXN** (ya declarado en la metadata del sitio). Línea de envío del mensaje:

- subtotal ≥ 1000 → `Envío: gratis`
- subtotal < 1000 → `Envío: gratis desde $1,000 MXN`

No se inventa costo de envío ni se declara gratis un pedido que no llega al umbral (ver L6).

Formato de línea: `<cantidad>x <título> — $<total de línea> MXN`, y si hay variante, una línea siguiente con
sangría `   Color: <nombre>`. El importe de la línea es `cantidad * precio unitario`.

## Tasks

| ID | Tarea | Specs | Ruta | Commit |
|----|-------|-------|------|--------|
| T1 | Lógica pura del carrito + tests (`node --test`) | S2,S5,S7 | inline | `ea3c54f` |
| T2 | Provider + persistencia | S5 | inline | `c492279` |
| T3 | Drawer UI con líneas, cantidades, subtotal y botón WhatsApp | S2,S3,S7 | inline | `5742e69` |
| T4 | Header sticky + botón flotante mobile, montados en `layout.tsx` | S4 | inline | `c009296` |
| T5 | Card: único CTA `Agregar al carrito`, variante de color seleccionable | S6 | inline | `4be7f9d` |
| T6 | Página de producto: `Agregar al carrito` junto a `ProductCTA` | S6 | inline | `4be7f9d` |
| T7 | Docs (`AGENTS.md`) + build + lint + smoke | S1-S7 | inline | `1bdc653` |

Estado: **6/6 tareas cerradas y verificadas**.

## Delivery

Rama `feat/cart`, 6 commits sobre `main` (`a61bc48`, que ya incluye GSAP), ~1.430 líneas autoradas. Cada commit
es un slice revisable por separado (las fronteras están en la columna *Commit* de la tabla de Tasks). Publicar
esto como un PR único supera la guía de ~400 líneas para proteger el foco de review: la forma de entrega (PR
único o PRs encadenados) queda a decisión del usuario. No se hizo push ni se abrió PR.

## Log

**L1** (usuario, verbatim): `Vamos a gregar la funcinalidad de carrito`

**L2** (decisión del usuario, vía `ask_user_question`): checkout = `WhatsApp con el pedido completo`;
forma = `Drawer lateral (recomendado)`; disparador = `Ambos (header + flotante mobile)`.

**L3** (decisión del agente): persistencia en `localStorage` con parseo defensivo; el payload se versiona para
poder descartar formatos viejos sin migración.

**L4** (decisión del agente): las cards no pierden la compra directa porque la página de producto la conserva
(S6); así el link de pago por producto sigue siendo alcanzable y el carrito no destruye comportamiento existente.

**L5** (hallazgo de exploración): no existe header en `layout.tsx`; hay 3 de 22 productos con `inStock: true`,
así que el home muestra 3 cards. No se toca el stock en esta feature.

**L6** (corrección de spec, agente): el preview aprobado mostraba `Envío: gratis (>$1,000)` sobre un ejemplo de
$947 MXN. Un umbral de envío gratis no puede afirmarse como cumplido cuando el subtotal no lo alcanza, así que S7
se reescribe con la línea condicional. El resto del formato del mensaje no cambia.

**L7** (verificación, agente): `npm test` 18/18 pass; `npm run build` OK (23 rutas SSG prerenderizadas);
`npm run lint` sin errores nuevos (quedan 2 errores previos en `featured-categories.tsx` y `payment-promo.tsx`,
archivos no tocados por esta feature); smoke contra `next start` — `/`, `/products/Taza-Magica`,
`/collections/shop-all` responden 200, ruta inexistente 404, el drawer no aparece en el HTML del server, las cards
tienen `Agregar al carrito` y la página de producto conserva `Solicitar`. La corrección del lint
`set-state-in-effect` se resolvió moviendo la hidratación a un store externo (`cart-store.ts`).

**L8** (reconciliación con el remoto, agente): `origin/main` había avanzado con `8d63564 feat: add GSAP product
card motion`, que extrajo el markup de la card a `product-card-motion.tsx` (370 líneas) y dejó `product-card.tsx`
como wrapper de 11 líneas. `feat/cart` quedó sobre una base vieja, así que se rebasó sobre `main` (`a61bc48`):
se salteó el commit `chore` (su contenido ya estaba en main) y la integración del carrito —`AddToCartButton`
más selector de color— se re-aplicó **dentro de `product-card-motion.tsx`**, respetando las animaciones GSAP y
`prefers-reduced-motion`. El estado local `selectedColor` se llama así para no chocar con el `color` del map.
Al rebasar, el commit de lint de los `<a>` quedó obsoleto: `origin/main` ya los había arreglado, por lo que
`npm run lint` ahora es verde sin errores previos.
