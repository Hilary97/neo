import Image from "next/image";

interface FeaturedCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  align?: "left" | "right";
}

function FeaturedCard({
  title,
  description,
  imageUrl,
  href,
}: FeaturedCardProps) {
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
        {/* Makeup */}
        <div className="mb-8">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-heading text-4xl font-bold uppercase leading-none tracking-tight md:text-5xl">
              Makeup
            </h2>
            <a
              href="/collections/shop-all-beauty"
              className="font-condensed hidden text-sm font-semibold uppercase tracking-widest underline underline-offset-4 md:block"
            >
              Ver todo
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FeaturedCard
              title="Labial rojo intenso"
              description="Descubre nuestro lip combo"
              imageUrl="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"
              href="/products/lip-combo"
            />
            <FeaturedCard
              title="Kit 2 Máscaras"
              description="El dúo que transforma tus pestañas"
              imageUrl="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
              href="/products/kit-el-corral-2-mascaras"
            />
          </div>

          <a
            href="/collections/shop-all-beauty"
            className="font-condensed mt-5 inline-block text-sm font-semibold uppercase tracking-widest underline underline-offset-4 md:hidden"
          >
            Ver todo Makeup
          </a>
        </div>

        {/* Fashion */}
        <div className="mt-16">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-heading text-4xl font-bold uppercase leading-none tracking-tight md:text-5xl">
              Fashion
            </h2>
            <a
              href="/collections/shop-all-fashion"
              className="font-condensed hidden text-sm font-semibold uppercase tracking-widest underline underline-offset-4 md:block"
            >
              Ver todo
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FeaturedCard
              title="Wabi Bum Bag"
              description="Conoce nuestra bolsa más vendida"
              imageUrl="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
              href="/products/wabi-bum-bag"
            />
            <FeaturedCard
              title="Cosmetiquera"
              description="La cosmetiquera que le cabe todo"
              imageUrl="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
              href="/products/cosmetiquera-sarelly-creativo-lab"
            />
          </div>

          <a
            href="/collections/shop-all-fashion"
            className="font-condensed mt-5 inline-block text-sm font-semibold uppercase tracking-widest underline underline-offset-4 md:hidden"
          >
            Ver todo Fashion
          </a>
        </div>

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
