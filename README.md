# Neo — Hot Sale Landing Page

A fully responsive, data-driven e-commerce promotional landing page built for a seasonal "Hot Sale" campaign. The project demonstrates a modern Next.js 16 architecture with the App Router, a Tailwind 4 design system, and real third-party payment integrations (Mercado Pago + PayPal) — all running as a fully static export.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

> <!-- TODO: add live deployment URL once published -->
> **Live demo:** _coming soon_

---

## Overview

Neo is the landing page for a "Hot Sale" promotional event with **Makeup**, **Fashion**, and **Wedding** product categories. It was built to be **reusable across seasonal campaigns**: swapping the product catalog, categories, and images only requires editing a single JSON file — no code changes needed.

## Features

- 🏗️ **Data-driven content** — products and categories live in `data/<season>.json`. Adding a new seasonal campaign means dropping in a new JSON file and updating one import.
- 🛍️ **Dynamic collection & product pages** — `/collections/[slug]` and `/products/[slug]` are statically generated from the season data via `generateStaticParams`.
- 💳 **Real payment integrations**:
  - **Mercado Pago** Payment Links per product
  - **PayPal Smart Buttons** (client-side, no backend, via `NEXT_PUBLIC_PAYPAL_CLIENT_ID`)
  - **WhatsApp** fallback CTA when no payment method is configured
  - Single-CTA priority logic per product card (Mercado Pago → PayPal → WhatsApp)
- 🎨 **Custom design system** — colors, fonts, badges, and animations defined as Tailwind 4 `@theme` tokens (no `tailwind.config.ts`)
- 📱 **Fully responsive** — 2 / 3 / 4 column product grid, mobile-safe layout (no horizontal overflow)
- ⚡ **Static export** — `next build` outputs a fully static `out/` directory, deployable to any static host
- 🖼️ **Cloudinary-hosted images** with Next.js Image optimization via `remotePatterns`
- ✨ **Scroll-in animations** — staggered fade-up effect on product cards

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 16.2.6** | App Router, Turbopack, static export |
| UI Library | **React 19.2.4** | Server Components by default |
| Language | **TypeScript 5** | Strict mode |
| Styling | **Tailwind CSS 4** | `@theme inline` design tokens |
| Utilities | `clsx` + `tailwind-merge` | via a shared `cn()` helper |
| Payments | Mercado Pago Payment Links, PayPal Smart Buttons SDK | |
| Images | Cloudinary | served via Next.js Image |
| Linting | ESLint 9 (flat config) | |

## Project Structure

```
neo/
├── data/
│   └── hot-sale-2026.json        # Season data: categories + products (single source of truth)
├── public/                       # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout: fonts (Oswald, Barlow Condensed, Inter), SEO metadata
│   │   ├── page.tsx                # Home page composition
│   │   ├── globals.css             # Design system tokens, base styles, animations
│   │   ├── collections/[slug]/
│   │   │   └── page.tsx            # Dynamic category collection pages (static params)
│   │   ├── products/[slug]/
│   │   │   └── page.tsx            # Dynamic product detail pages (static params)
│   │   └── components/
│   │       ├── hero.tsx               # Hero section with CTA
│   │       ├── discount-tiers.tsx     # Tiered discount scale
│   │       ├── featured-categories.tsx# Category highlight cards
│   │       ├── product-grid.tsx       # Responsive product grid w/ animations
│   │       ├── product-card.tsx       # Product card: badges, pricing, color swatches, rating, CTA
│   │       ├── product-cta.tsx        # Single-CTA logic (Mercado Pago / PayPal / WhatsApp)
│   │       ├── paypal-button.tsx      # PayPal Smart Buttons (client-side, no backend)
│   │       ├── payment-promo.tsx      # Mercado Pago promo banner
│   │       ├── product-badge.tsx      # Badge variants (sale, new, best-seller, etc.)
│   │       ├── terms-accordion.tsx    # Terms & conditions accordion
│   │       ├── newsletter.tsx         # Newsletter signup form
│   │       └── footer.tsx             # Footer with links and social
│   └── lib/
│       ├── products.ts             # Types (Product, Category) + data access + price helpers
│       └── cn.ts                   # clsx + tailwind-merge utility
├── next.config.ts                  # remotePatterns for Cloudinary images
├── eslint.config.mjs
├── postcss.config.mjs
└── tsconfig.json
```

## Architecture Highlights

### Data-driven catalog & categories
`src/lib/products.ts` exports `PRODUCTS` and `CATEGORIES`, both typed and imported directly from `data/hot-sale-2026.json`. Categories are an open-ended array (`{ slug, label, title, subtitle }`), so the home page, collection pages, and navigation all stay in sync automatically — no hardcoded category unions to maintain between seasons.

### Static dynamic routes
`/collections/[slug]` and `/products/[slug]` use `generateStaticParams` to pre-render every category and product at build time, producing a fully static site with per-product and per-category pages.

### Payment priority logic
Each `ProductCard` renders **exactly one** payment CTA, resolved in `product-cta.tsx`:

1. `mercadoPagoLink` present → **"Comprar"** (Mercado Pago checkout)
2. else if `paypalEnabled: true` → **PayPal Smart Button**
3. else → **"Solicitar"** via WhatsApp

This keeps the UI simple while supporting multiple payment rails per region/product.

## Design System

| Token | Value | Usage |
|---|---|---|
| `--background` | `#f1f0ed` | Page background |
| `--foreground` | `#000000` | Primary text |
| `--color-accent` | `#e9633f` | CTAs, highlights |
| `--color-sale` | `#9f2a21` | Sale/discount badge |
| `--color-best-seller` | `#1c80c4` | Best seller badge |
| `--color-new` | `#1ca638` | New badge |
| `--color-limited` | `#ffe49f` | Limited edition badge |

| Font | Role |
|---|---|
| **Oswald** | Headings |
| **Barlow Condensed** | Navigation, badges |
| **Inter** | Body text |

All tokens are defined via Tailwind 4's `@theme inline` directive in `src/app/globals.css`.

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server (Turbopack)
npm run dev

# Build the static production export (outputs to ./out)
npm run build

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment variables

```bash
# .env.local
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_sandbox_or_live_client_id
```

## Changing the seasonal campaign

1. Upload new product images to Cloudinary.
2. Create `data/<new-season>.json` with the new `categories` and `products`.
3. Update the import in `src/lib/products.ts`.
4. `npm run build` and deploy the generated `out/` directory.

---

Built by [Hilary97](https://github.com/Hilary97).
