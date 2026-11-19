<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:neo-project-context -->
# Neo — Hot Sale Landing Page

Landing page promocional para Hot Sale 2026, construida con Next.js 16 + React 19 + Tailwind 4 + TypeScript.

## Stack

| Capa        | Versión   | Notas |
|-------------|-----------|-------|
| Next.js     | 16.2.6    | Turbopack por defecto, App Router |
| React       | 19.2.4    | React Compiler estable |
| Tailwind    | 4.x       | PostCSS, `@theme` inline directives |
| TypeScript  | 5.x       | Strict mode |
| clsx        | ^2.1.1    | Conditional classnames |
| tailwind-merge | ^3.6.0 | Merging Tailwind classes via `cn()` |
| framer-motion | ^12.x   | Depth/motion: tilt, idle float, hover elevation on cards |

## Breaking Changes (Next.js 16 vs 15)

- Turbopack es el bundler default (no configurable fácilmente)
- `middleware.ts` → `proxy.ts` (renombrado)
- `next/lint` eliminado, usar ESLint directamente
- Async Request APIs son fully enforced (params, searchParams son Promises siempre)
- `remotePatterns` en `next.config.ts` es obligatorio para imágenes externas

## Arquitectura

- **App Router**: Todo dentro de `src/app/`
- **Server Components**: Por defecto. Solo se marca "use client" cuando se necesita interactividad (event handlers, hooks)
- **Componentes**: En `src/app/components/`
- **Estilos**: Tailwind 4 con `@theme inline` en `globals.css` para tokens del design system
- **Datos mock**: `data/<temporada>.json` con productos por temporada. `src/lib/products.ts` importa el JSON y exporta los tipos y funciones.
- **Imágenes**: Subidas a Cloudinary, URLs en el JSON de temporada. `res.cloudinary.com` configurado en `remotePatterns`.
- **Fuentes**: Google Fonts vía CSS (`globals.css`) — alternativa a las fuentes pagas del diseño original

## Design System

### Colores

| Token             | Valor     | Uso |
|-------------------|-----------|-----|
| `--background`    | #f1f0ed   | Fondo general |
| `--foreground`    | #000000   | Texto principal |
| `--color-dark`    | #000000   | Fondos oscuros |
| `--color-accent`  | #e9633f   | Acento (CTAs, highlights) |
| `--color-sale`    | #9f2a21   | Badge de descuento/sale |
| `--color-best-seller` | #1c80c4 | Badge best seller |
| `--color-new`     | #1ca638   | Badge nuevo |
| `--color-limited` | #ffe49f   | Badge edición limitada (fondo amarillo) |
| `--color-preorder` | #000000  | Badge pre-venta |
| `--color-bg-secondary` | #f6f4f1 | Fondos secundarios |
| `--color-footer-bg` | #000000 | Fondo del footer |

### Fuentes

| Token               | Font                | Uso |
|---------------------|---------------------|-----|
| `--font-heading`    | Oswald (sans-serif) | Headings, títulos grandes |
| `--font-condensed`  | Barlow Condensed    | Navegación, badges, texto condensado |
| `--font-body`       | Inter (sans-serif)  | Cuerpo de texto general |

### Animaciones

- `fadeUp`: Opacity 0→1 + translateY(24px→0). Se aplica vía clase `animate-in`
- `snap-carousel`: CSS scroll-snap type x mandatory para carruseles horizontales
- `FloatingCard` (`src/app/components/floating-card.tsx`, "use client"): wrapper con Framer Motion que da profundidad a tarjetas — perspective + tilt por mouse (rotateX/rotateY vía spring), float idle escalonado por `index`, sombra de contacto tintada en `--color-accent`, y hover con scale + elevación. Respeta `prefers-reduced-motion` (desactiva tilt/float, deja solo elevación estática). Usado en product-card, featured-categories, discount-tiers y payment-promo.

### Badges (ProductBadge)

`BadgeVariant` (`src/lib/products.ts`) tiene 6 variantes. Los colores están
hardcodeados en `src/app/components/product-badge.tsx` con clases Tailwind
directas — **no** consumen los tokens `--color-sale`/`--color-best-seller`/etc.
de la tabla de arriba (esos tokens quedaron sin usar tras un refactor; siguen
disponibles en `globals.css` pero hoy no están conectados a los badges):

- `sale`: `bg-sale` (sí usa el token `--color-sale`), texto blanco
- `best-seller`: `bg-blue-500`, texto blanco
- `new`: `bg-green-600`, texto blanco
- `limited-edition`: `bg-amber-200`, texto negro
- `pre-order`: `bg-black`, texto blanco
- `kit`: `bg-sale`, texto blanco

El label visible (ej. "LA MAS VENDIDA") lo define cada producto en el JSON de
temporada — el componente solo aplica el color según `variant`.

## Estructura de Archivos

```
neo/
├── AGENTS.md                    ← Contexto del proyecto (este archivo)
├── CLAUDE.md                    ← Redirige a AGENTS.md
├── next.config.ts               ← Config: remotePatterns para imágenes
├── package.json                 ← Dependencias (Next 16, React 19, Tailwind 4)
├── tsconfig.json                ← TS strict
├── postcss.config.mjs           ← PostCSS con @tailwindcss/postcss
├── eslint.config.mjs            ← ESLint flat config
├── public/                      ← Assets estáticos
└── data/                        ← JSON de productos por temporada
│   └── hot-sale-2026.json       ← Temporada activa (cambiar import en products.ts)
└── src/
    ├── app/
    │   ├── layout.tsx           ← Root layout: fonts via next/font, SEO metadata
    │   ├── page.tsx             ← Home page: composición de secciones
    │   ├── globals.css          ← Design system tokens, base, animaciones
    │   ├── favicon.ico
    │   └── components/          ← Componentes de la landing
    │       ├── hero.tsx         ← Hero: fondo negro, tagline, CTA
    │       ├── discount-tiers.tsx ← Escala de descuentos 15%/20%/25% + envío gratis
    │       ├── product-card.tsx ← Card de producto con hover, badges, precios
    │       ├── product-grid.tsx ← Grid responsive 2/3/4 cols con fadeUp
    │       ├── product-cta.tsx  ← Compra directa 1 ítem (MP / PayPal / WhatsApp), usada en la página de producto
    │       ├── product-purchase.tsx ← Isla cliente de la página de producto (color + carrito + compra directa)
    │       ├── add-to-cart-button.tsx ← Botón "Agregar al carrito"
    │       ├── cart-provider.tsx ← CartProvider / useCart()
    │       ├── cart-drawer.tsx  ← Drawer del carrito con checkout por WhatsApp
    │       ├── cart-trigger.tsx ← Icono de carrito del header + botón flotante mobile
    │       ├── site-header.tsx  ← Header sticky (logo, nav, carrito)
    │       ├── paypal-button.tsx ← Smart Button de PayPal (client-side)
    │       ├── floating-card.tsx ← Wrapper de profundidad/motion (Framer Motion)
    │       ├── featured-categories.tsx ← Hero cards por categoría (data-driven, ver CATEGORIES)
    │       ├── payment-promo.tsx ← Mercado Pago promo con cupón HSALEMP
    │       ├── terms-accordion.tsx ← Acordeón de Términos y Condiciones
    │       ├── newsletter.tsx   ← Formulario newsletter (use client)
    │       ├── product-badge.tsx ← Sistema de badges con variantes
    │       └── footer.tsx       ← Footer negro con links y redes
    └── lib/
        ├── cn.ts                ← cn() utility (clsx + tailwind-merge)
        ├── cart.ts              ← Lógica pura del carrito (testeada con node --test)
        ├── cart-store.ts        ← Store externo + persistencia en localStorage
        └── products.ts          ← Tipos y datos importados de data/*.json
```

## Componentes — Detalle

### layout.tsx
- Fuentes: Oswald (headings), Barlow Condensed (nav), Inter (body) vía `next/font/google`
- SEO: `metadata` export con title, description, open graph
- Body con clases de font y scroll-smooth
- Monta `CartProvider` > `SiteHeader` + `{children}` + `CartDrawer` + `CartFloatingTrigger`

### page.tsx
Server Component. Orden de secciones activas actualmente:
1. Hero
2. ProductGrid (`id="products"`, `limit={8}`, `onlyInStock`, `showViewAll`)
3. FeaturedCategories
4. TermsAccordion
5. Newsletter
6. Footer

`DiscountTiers` y `PaymentPromo` existen como componentes pero están comentados
(no importados) en `page.tsx` — descomentar para reactivarlos.

### product-card.tsx
- Imagen con hover effect (escala 105%); si el producto tiene 2+ imágenes, hace swap a la segunda en hover
- Badges superpuestos (esquina superior derecha, stackeados si hay varios)
- Precios: tachado (original) + precio actual
- Selector de colores (círculos, sobre la imagen y debajo del título)
- Rating con estrellas + cantidad de reviews
- CTA vía `ProductCTA` — ver "Regla de Prioridad" en Datos

### product-grid.tsx
- No recibe `products` por prop — importa `PRODUCTS` directo de `@/lib/products`
- Props: `id`, `title`, `subtitle`, `limit` (default 8), `category` (filtra por slug),
  `onlyInStock`, `showViewAll`, `viewAllHref`, `viewAllLabel`
- Grid responsive: 2 cols (mobile) → 3 cols (tablet) → 4 cols (desktop)
- Cada card animada con fadeUp (efecto escalonado vía `style={{ animationDelay }}`)
- Usado tanto en el home (`ProductGrid` general) como en `/collections/[slug]` (con `category`)

### terms-accordion.tsx
- "use client" para interactividad
- Acordeón con 4 ítems: Envíos, Métodos de pago, Cambios y devoluciones, Promociones
- Transiciones de altura suave

### newsletter.tsx
- "use client" para el form
- Input + botón "SUSCRIBIRSE"
- Maneja estado de envío (idle/loading/success/error)

### footer.tsx
- Fondo negro, texto gris claro
- 4 columnas: Categorías, Atención al Cliente, Redes Sociales, Newsletter
- Links de ejemplo (placeholder)

## Datos

`src/lib/products.ts` exporta:
- `Product` type: `id`, `title`, `slug`, `images: string[]`, `badges: ProductBadge[]`,
  `price`, `originalPrice`, `rating`, `reviewCount`, `colors`, `category`, `inStock`,
  `mercadoPagoLink?`, `paypalEnabled?`
- `Category` type: `slug` (usado en `Product.category` y `/collections/[slug]`),
  `label`, `title`, `subtitle` — categorías 100% data-driven, no hay un set fijo
  (agregar/quitar categorías es editar el JSON, no tocar código)
- `CATEGORIES: Category[]` y `PRODUCTS: Product[]` — arrays desde `data/hot-sale-2026.json`
- `getDiscountedPrice()` y `getDiscountPercent()` — helpers de precios

La temporada activa (`hot-sale-2026.json`) es de merchandising personalizado
(tazas, termos, sudaderas, copas, botellas, tarros, espejos) — no makeup/fashion.
Las categorías son las que define ese JSON en cada momento; no asumir nombres
fijos al escribir código o docs nuevos.

Para cambiar de temporada:
1. Subí las imágenes nuevas a Cloudinary
2. Creá `data/nueva-temporada.json` con la nueva estructura
3. Cambiá el import en `src/lib/products.ts` al nuevo JSON
4. `npm run build` → deploy

### Links de Pago (Mercado Pago)

Cada producto puede tener un `mercadoPagoLink` opcional: la URL de un "Link de Pago"
creado manualmente en el dashboard de vendedor de Mercado Pago. No hay backend ni
script — se pega la URL en el campo del producto en `data/hot-sale-2026.json`.

- Con link: la card muestra el botón "Comprar" → checkout de MP.
- Sin link (campo vacío): cae a PayPal o WhatsApp según la regla de prioridad de abajo.

### Botón de PayPal (Smart Buttons, sin backend)

Si `paypalEnabled: true` en un producto, la card puede mostrar un botón de PayPal
(`src/app/components/paypal-button.tsx`). Es 100% client-side: usa el SDK de
PayPal con `NEXT_PUBLIC_PAYPAL_CLIENT_ID` (variable de entorno, ver `.env.local`)
y resuelve `createOrder` / `capture` directo contra los servidores de PayPal,
sin backend propio ni Client Secret.

- Moneda actual: MXN. Si el Sandbox tira `CURRENCY_NOT_SUPPORTED`, probar con USD.
- No hay registro propio de la venta — el dashboard de PayPal es la fuente de verdad.

### Regla de Prioridad: una sola opción de compra por card

Cada `ProductCard` muestra **un único CTA**: `Agregar al carrito` (`AddToCartButton`).
El carrito es el camino de compra de la grilla.

`ProductCTA` (vive en `product-cta.tsx`) **sigue existiendo** y se usa en la página de
producto (`/products/[slug]`) para la compra directa de un solo ítem. Ahí la prioridad es:

1. `mercadoPagoLink` presente → botón "Comprar" (checkout de Mercado Pago)
2. Si no hay link de MP y `paypalEnabled: true` → botón de PayPal (Smart Buttons)
3. Si no hay ninguno de los anteriores → botón "Solicitar" por WhatsApp

Para que un producto muestre PayPal, `mercadoPagoLink` debe estar vacío o ausente.

## Carrito

Carrito client-side, sin backend ni base de datos.

| Pieza | Archivo | Rol |
|---|---|---|
| Lógica pura | `src/lib/cart.ts` | `addLine`, `setQuantity`, `removeLine`, subtotal, conteo, mensaje de WhatsApp, `parseCart` defensivo |
| Store | `src/lib/cart-store.ts` | Store externo para `useSyncExternalStore` + persistencia en `localStorage` |
| Context | `src/app/components/cart-provider.tsx` | `CartProvider` / `useCart()` |
| UI | `cart-drawer.tsx`, `site-header.tsx`, `cart-trigger.tsx`, `add-to-cart-button.tsx`, `product-purchase.tsx` | Drawer, header sticky con contador, botón flotante mobile, botón de alta, isla de la página de producto |

**Checkout:** no hay pasarela. El drawer arma **un** mensaje de WhatsApp con todos los ítems,
cantidades, variantes y total (`buildWhatsAppMessage`), y el cliente coordina el pago en el chat.
Un carrito vacío no genera pedido.

**Por qué no Mercado Pago:** los `mercadoPagoLink` son *Links de Pago* por producto, creados a mano
en el dashboard. Mercado Pago no consolida links, así que un carrito de N ítems no se puede cobrar
con ellos. Cobrar el carrito requeriría un backend (Route Handler + `MP_ACCESS_TOKEN`) creando una
preferencia de Checkout Pro. Por eso el carrito va por WhatsApp y la compra directa por MP quedó en
la página de producto.

**Persistencia:** clave `neo.cart.v1`, payload versionado. `parseCart` descarta JSON roto, versiones
desconocidas y líneas mal formadas sin romper el render.

**Reglas:** máximo 10 unidades por línea (merge por `productId` + color), 50 líneas, cantidades
no finitas o ≤ 0 quitan la línea. Envío gratis desde $1,000 MXN: el mensaje lo declara como
cumplido recién al alcanzar el umbral, nunca antes.

**Tests:** `npm test` corre `node --test` sobre `src/lib/cart.test.ts` (sin framework extra; Node
hace type-stripping nativo). Los tests cubren sólo la lógica pura — la UI se verifica con build + lint.

## Build

- `npm run dev` para desarrollo con Turbopack
- `npm run build` para build de producción (SSG/estático por página, sin `output: "export"` en `next.config.ts`)
- `npm test` para la lógica del carrito (`node --test`, sin dependencias)
- `npm run lint` (hoy falla por 2 `<a>` en `featured-categories.tsx` y `payment-promo.tsx`; deuda previa)

## Issues Conocidos / Gotchas

1. **Server Components + Event Handlers**: No se pueden usar onClick/onSubmit en Server Components. Si un componente necesita interactividad, agregar "use client" al ARCHIVO.
2. **remotePatterns**: Toda imagen externa (placehold.co, images.unsplash.com, res.cloudinary.com) debe estar configurada en `next.config.ts > images.remotePatterns`.
3. **Google Fonts**: Usar `next/font/google` en layout.tsx para las fuentes, no solo CSS import.
4. **Tailwind 4**: Usar `@theme inline` en globals.css para tokens. No hay `tailwind.config.ts` en Tailwind 4.
5. **Build con imágenes**: Si una imagen externa no está en remotePatterns, el build falla en producción.

## Próximos Pasos Posibles

- [ ] Agregar más productos mock
- [ ] Implementar filtros por categoría
- [x] Agregar carrito (Drawer/Sidebar) — ver sección "Carrito"
- [ ] Integrar API de Mercado Pago (requiere backend para Checkout Pro)
- [x] Agregar animaciones con Framer Motion (`FloatingCard` — ver Design System)
- [ ] Tests E2E con Playwright
- [x] Página de producto individual
- [x] Header sticky con navegación
- [ ] Responsive refinements
- [ ] SEO: sitemap, robots.txt, metadata dinámica
<!-- END:neo-project-context -->
