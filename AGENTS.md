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
| Next.js     | 16.2.6    | Turbopack por defecto, App Router, output estático |
| React       | 19.2.4    | React Compiler estable |
| Tailwind    | 4.x       | PostCSS, `@theme` inline directives |
| TypeScript  | 5.x       | Strict mode |
| clsx        | ^2.1.1    | Conditional classnames |
| tailwind-merge | ^3.6.0 | Merging Tailwind classes via `cn()` |

## Breaking Changes (Next.js 16 vs 15)

- Turbopack es el bundler default (no configurable fácilmente)
- `middleware.ts` → `proxy.ts` (renombrado)
- `next/lint` eliminado, usar ESLint directamente
- Async Request APIs son fully enforced (params, searchParams son Promises siempre)
- `remotePatterns` en `next.config.ts` es obligatorio para imágenes externas

## Arquitectura

- **App Router**: Todo dentro de `src/app/`
- **Server Components**: Por defecto. Solo se marca "use client" cuando se necesita interactividad (event handlers, hooks)
- **Componentes**: En `src/app/_components/` (convención Next.js de componentes privados)
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

### Badges (ProductBadge)

- `sale`: Fondo `--color-sale`, texto blanco — "HASTA -55% OFF"
- `best-seller`: Fondo `--color-best-seller`, texto blanco — "BEST SELLER"
- `new`: Fondo `--color-new`, texto blanco — "NEW"
- `limited`: Fondo `--color-limited`, texto negro — "EDICIÓN LIMITADA"
- `preorder`: Fondo `--color-preorder`, texto blanco — "PRE-VENTA"

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
    │   └── _components/         ← Componentes privados de la landing
    │       ├── hero.tsx         ← Hero: fondo negro, tagline, CTA
    │       ├── discount-tiers.tsx ← Escala de descuentos 15%/20%/25% + envío gratis
    │       ├── product-card.tsx ← Card de producto con hover, badges, precios
    │       ├── product-grid.tsx ← Grid responsive 2/3/4 cols con fadeUp
    │       ├── featured-categories.tsx ← Makeup + Fashion hero cards
    │       ├── payment-promo.tsx ← Mercado Pago promo con cupón HSALEMP
    │       ├── terms-accordion.tsx ← Acordeón de Términos y Condiciones
    │       ├── newsletter.tsx   ← Formulario newsletter (use client)
    │       ├── product-badge.tsx ← Sistema de badges con variantes
    │       └── footer.tsx       ← Footer negro con links y redes
    └── lib/
        ├── cn.ts                ← cn() utility (clsx + tailwind-merge)
        └── products.ts          ← Tipos y datos importados de data/*.json
```

## Componentes — Detalle

### layout.tsx
- Fuentes: Oswald (headings), Barlow Condensed (nav), Inter (body) vía `next/font/google`
- SEO: `metadata` export con title, description, open graph
- Body con clases de font y scroll-smooth

### page.tsx
Server Component. Orden de secciones:
1. Hero
2. DiscountTiers
3. FeaturedCategories
4. ProductGrid
5. PaymentPromo
6. TermsAccordion
7. Newsletter
8. Footer

### product-card.tsx
- Imagen con hover effect (escala 105%)
- Badge superpuesto (esquina superior izquierda)
- Precios: tachado (original) + precio Hot Sale
- Selector de colores (círculos)
- Rating con estrellas
- Botón "COMPRAR"

### product-grid.tsx
- Wrapper que recibe `products: Product[]`
- Grid responsive: 2 cols (mobile) → 3 cols (tablet) → 4 cols (desktop)
- Cada card animada con fadeUp (efecto escalonado vía `style={{ animationDelay }}`)

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
- `Product` type: id, name, brand, category, price, originalPrice, image, badge, colors, rating, description
- `PRODUCTS: Product[]` — array desde `data/hot-sale-2026.json` (8 productos makeup + fashion)
- `getDiscountedPrice()` y `getDiscountPercent()` — helpers de precios

Para cambiar de temporada:
1. Subí las imágenes nuevas a Cloudinary
2. Creá `data/nueva-temporada.json` con la nueva estructura
3. Cambiá el import en `src/lib/products.ts` al nuevo JSON
4. `npm run build` → deploy

## Build

- Output estático (next build genera `out/`)
- `npm run dev` para desarrollo con Turbopack
- `npm run build` para build de producción

## Issues Conocidos / Gotchas

1. **Server Components + Event Handlers**: No se pueden usar onClick/onSubmit en Server Components. Si un componente necesita interactividad, agregar "use client" al ARCHIVO.
2. **remotePatterns**: Toda imagen externa (placehold.co, images.unsplash.com, res.cloudinary.com) debe estar configurada en `next.config.ts > images.remotePatterns`.
3. **Google Fonts**: Usar `next/font/google` en layout.tsx para las fuentes, no solo CSS import.
4. **Tailwind 4**: Usar `@theme inline` en globals.css para tokens. No hay `tailwind.config.ts` en Tailwind 4.
5. **Build con imágenes**: Si una imagen externa no está en remotePatterns, el build falla en producción.

## Próximos Pasos Posibles

- [ ] Agregar más productos mock
- [ ] Implementar filtros por categoría
- [ ] Agregar carrito (Drawer/Sidebar)
- [ ] Integrar API de Mercado Pago
- [ ] Agregar animaciones con Framer Motion
- [ ] Tests E2E con Playwright
- [ ] Página de producto individual
- [ ] Header sticky con navegación
- [ ] Responsive refinements
- [ ] SEO: sitemap, robots.txt, metadata dinámica
<!-- END:neo-project-context -->
