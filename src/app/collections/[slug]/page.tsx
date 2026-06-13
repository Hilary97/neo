import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/app/components/product-grid";
import { Footer } from "@/app/components/footer";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

const SHOP_ALL_SLUG = "shop-all";

export function generateStaticParams() {
  return [
    { slug: SHOP_ALL_SLUG },
    ...CATEGORIES.map((category) => ({ slug: category.slug })),
  ];
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category && slug !== SHOP_ALL_SLUG) notFound();

  return (
    <>
      <div className="bg-white px-6 pt-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="font-condensed inline-block text-sm font-semibold uppercase tracking-widest underline underline-offset-4"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>

      <ProductGrid
        title={category?.title ?? "Shop All"}
        subtitle={category?.subtitle ?? "Todos los productos de la temporada."}
        category={category?.slug}
        limit={PRODUCTS.length}
      />

      <Footer />
    </>
  );
}
