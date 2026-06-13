import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBadge } from "@/app/components/product-badge";
import { ProductCTA } from "@/app/components/product-cta";
import { Footer } from "@/app/components/footer";
import { CATEGORIES, PRODUCTS, getDiscountPercent } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.slug === product.category);

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercent = getDiscountPercent(
    product.price,
    product.originalPrice,
  );

  return (
    <>
      <div className="bg-white px-6 pt-8 md:px-10">
        <nav className="font-condensed mx-auto flex max-w-7xl items-center gap-2 text-sm font-semibold uppercase tracking-widest">
          <Link href="/" className="underline underline-offset-4">
            Inicio
          </Link>
          {category && (
            <>
              <span className="text-zinc-400">/</span>
              <Link
                href={`/collections/${category.slug}`}
                className="underline underline-offset-4"
              >
                {category.label}
              </Link>
            </>
          )}
        </nav>
      </div>

      <section className="bg-white px-6 py-10 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:gap-16">
          {/* Gallery */}
          <div className="grid gap-4 sm:grid-cols-2">
            {product.images.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100"
              >
                <Image
                  src={src}
                  alt={`${product.title} - imagen ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            {product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <ProductBadge
                    key={`${badge.label}-${badge.variant}`}
                    label={badge.label}
                    variant={badge.variant}
                  />
                ))}
              </div>
            )}

            <h1 className="font-heading text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
              {product.title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-zinc-500">
              <span className="text-amber-400">
                {"★".repeat(Math.round(product.rating))}
              </span>
              <span className="text-zinc-400">
                ({product.reviewCount} reseñas)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-heading text-3xl font-bold">
                ${product.price.toLocaleString("es-MX")} MXN
              </span>
              {hasDiscount && (
                <span className="text-lg text-zinc-400 line-through">
                  ${product.originalPrice!.toLocaleString("es-MX")} MXN
                </span>
              )}
              {discountPercent && (
                <span className="font-condensed text-sm font-semibold uppercase text-sale">
                  -{discountPercent}%
                </span>
              )}
            </div>

            {product.colors.length > 0 && (
              <div>
                <p className="font-condensed text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Colores
                </p>
                <div className="mt-2 flex items-center gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color.name}
                      className="flex items-center gap-1.5"
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-zinc-300"
                        style={{ backgroundColor: color.hex }}
                        aria-hidden
                      />
                      <span className="font-body text-sm text-zinc-600">
                        {color.name}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-2 max-w-xs">
              <ProductCTA product={product} className="py-3 text-sm" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
