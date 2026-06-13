import Image from "next/image";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

interface FeaturedCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

function FeaturedCard({ title, description, imageUrl, href }: FeaturedCardProps) {
  return (
    <a
      href={href}
      className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-100 md:aspect-square"
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
        <h3 className="font-heading text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl">
          {title}
        </h3>
        <p className="font-condensed mt-1 text-sm uppercase tracking-wider text-zinc-300">
          {description}
        </p>
        <span className="font-condensed mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] underline underline-offset-4">
          Descubre más
        </span>
      </div>
    </a>
  );
}

export function FeaturedCategories() {
  return (
    <section className="bg-white px-6 pb-16 md:px-10 md:pb-24">
      <div className="mx-auto max-w-7xl">
        {CATEGORIES.map((category, index) => {
          const featured = PRODUCTS.filter(
            (p) => p.category === category.slug,
          ).slice(0, 2);

          if (featured.length === 0) return null;

          return (
            <div key={category.slug} className={index === 0 ? "mb-8" : "mt-16"}>
              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="font-heading text-4xl font-bold uppercase leading-none tracking-tight md:text-5xl">
                  {category.label}
                </h2>
                <a
                  href={`/collections/${category.slug}`}
                  className="font-condensed hidden text-sm font-semibold uppercase tracking-widest underline underline-offset-4 md:block"
                >
                  Ver todo
                </a>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {featured.map((product) => (
                  <FeaturedCard
                    key={product.id}
                    title={product.title}
                    description={product.badges[0]?.label ?? category.subtitle}
                    imageUrl={product.images[0]}
                    href={`/products/${product.slug}`}
                  />
                ))}
              </div>

              <a
                href={`/collections/${category.slug}`}
                className="font-condensed mt-5 inline-block text-sm font-semibold uppercase tracking-widest underline underline-offset-4 md:hidden"
              >
                Ver todo {category.label}
              </a>
            </div>
          );
        })}

        {/* Shop All CTA */}
        <div className="mt-14 text-center">
          <a
            href="/collections/shop-all"
            className="font-condensed inline-block rounded-full border-2 border-black px-16 py-3.5 text-sm font-semibold uppercase tracking-widest transition-all hover:bg-black hover:text-white"
          >
            Shop All
          </a>
        </div>
      </div>
    </section>
  );
}
