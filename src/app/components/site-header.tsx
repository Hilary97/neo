"use client";

import Link from "next/link";
import { CartHeaderButton } from "./cart-trigger";
import type { Category } from "@/lib/products";

interface SiteHeaderProps {
  categories: Category[];
}

export function SiteHeader({ categories }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:h-16 md:px-10">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-heading text-xl font-bold uppercase leading-none tracking-tight md:text-2xl"
          >
            Neo
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/collections/shop-all"
              className="font-condensed text-xs font-semibold uppercase tracking-widest text-zinc-600 transition-colors hover:text-black"
            >
              Shop All
            </Link>
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`/collections/${category.slug}`}
                className="font-condensed text-xs font-semibold uppercase tracking-widest text-zinc-600 transition-colors hover:text-black"
              >
                {category.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/#products"
            className="hidden font-condensed text-xs font-semibold uppercase tracking-widest text-zinc-600 transition-colors hover:text-black sm:block md:hidden"
          >
            Ofertas
          </Link>
          <CartHeaderButton />
        </div>
      </div>
    </header>
  );
}
