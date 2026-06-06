import Image from "next/image";

export function PaymentPromo() {
  return (
    <section className="bg-white px-6 pb-16 md:px-10 md:pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-center md:p-12">
          {/* Mercado Pago Logo */}
          <div className="mb-6 flex justify-center">
            <Image
              src="https://placehold.co/240x80/00a650/fff?text=Mercado+Pago"
              alt="Mercado Pago"
              width={200}
              height={67}
              className="h-auto w-40 object-contain md:w-48"
            />
          </div>

          <h2 className="font-heading text-4xl font-bold uppercase leading-none tracking-tight md:text-5xl">
            Hasta 15% OFF
          </h2>

          <p className="font-body mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
            En compras desde $2,000 MXN usando el cupón{" "}
            <span className="font-bold uppercase tracking-wider text-black">
              HSALEMP
            </span>{" "}
            y pagando con Mercado Pago
          </p>

          <a
            href="#terms"
            className="font-condensed mt-3 inline-block text-xs uppercase tracking-widest text-zinc-500 underline underline-offset-4"
          >
            Consulta TyC
          </a>

          <div className="mt-8">
            <a
              href="/collections/shop-all"
              className="font-condensed inline-block rounded-full bg-black px-14 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-zinc-800"
            >
              Ver Descuentos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
