import { ProductCard } from "./product-card";
import { PRODUCTS } from "@/lib/products";

interface ProductGridProps {
  id?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
  category?: "makeup" | "fashion";
  showViewAll?: boolean;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function ProductGrid({
  id,
  title = "Productos en Stock",
  subtitle = "Los productos de temporada.",
  limit = 8,
  category,
  showViewAll = false,
  viewAllHref = "/collections/shop-all",
  viewAllLabel = "ver todo",
}: ProductGridProps) {
  const products = category
    ? PRODUCTS.filter((p) => p.category === category).slice(0, limit)
    : PRODUCTS.slice(0, limit);

  return (
    <section
      id={id}
      className="scroll-mt-24 bg-white px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          {title && (
            <h2 className="font-heading text-4xl font-bold uppercase leading-none tracking-tight md:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-body mt-3 text-sm text-zinc-500">{subtitle}</p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View All */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <a
              href={viewAllHref}
              className="font-condensed inline-block rounded-full border-2 border-black px-12 py-3 text-sm font-semibold uppercase tracking-widest transition-all hover:bg-black hover:text-white"
            >
              {viewAllLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
