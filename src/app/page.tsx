import { Hero } from "@/app/components/hero";
// import { DiscountTiers } from "@/app/components/discount-tiers";
import { ProductGrid } from "@/app/components/product-grid";
import { FeaturedCategories } from "@/app/components/featured-categories";
// import { PaymentPromo } from "@/app/components/payment-promo";
import { TermsAccordion } from "@/app/components/terms-accordion";
import { Newsletter } from "@/app/components/newsletter";
import { Footer } from "@/app/components/footer";

export default function Home() {
  return (
    <>
      {/* 1. Hero — fondo negro, tagline, CTA */}
      <Hero />

      {/* 2. Discount Tiers — escalonados $1,500/$3,000/$4,500 */}
      {/* <DiscountTiers /> */}

      {/* 3. Product Grid — "Productos en Oferta" */}
      <ProductGrid
        id="products"
        limit={8}
        onlyInStock
        showViewAll
        viewAllLabel="ver todo"
      />

      {/* 4. Featured Categories — Makeup + Fashion */}
      <FeaturedCategories />

      {/* 5. Payment Promo — Mercado Pago */}
      {/* <PaymentPromo /> */}

      {/* 6. Términos y Condiciones — Acordeón */}
      <TermsAccordion />

      {/* 7. Newsletter */}
      <Newsletter />

      {/* 8. Footer */}
      <Footer />
    </>
  );
}
