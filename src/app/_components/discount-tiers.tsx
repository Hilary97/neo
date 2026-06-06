export function DiscountTiers() {
  return (
    <section className="bg-white px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Direct Discounts */}
        <div className="mb-14 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-zinc-500">
            Descuentos directos
          </p>
          <h2 className="font-heading mt-2 text-5xl font-bold uppercase leading-none tracking-tight md:text-6xl">
            Hasta -30% OFF
          </h2>
          <p className="font-body mt-3 text-sm text-zinc-500">
            en productos seleccionados
          </p>
          <a
            href="#products"
            className="font-condensed mt-4 inline-block text-sm font-semibold uppercase tracking-widest underline underline-offset-4"
          >
            VER PRODUCTOS
          </a>
        </div>

        {/* Extra Discounts */}
        <div className="border-t border-zinc-200 pt-14 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-zinc-500">
            Descuentos Extras
          </p>
          <p className="font-condensed mt-1 text-base uppercase tracking-wider text-zinc-600">
            Se aplican automáticamente en tu carrito
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {/* Tier 1 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 transition-all hover:border-zinc-300 hover:shadow-sm">
              <p className="font-body text-xs uppercase tracking-[0.15em] text-zinc-400">
                Desde $1,500 mxn
              </p>
              <p className="font-heading mt-2 text-5xl font-bold leading-none">
                15%
              </p>
              <p className="font-condensed mt-1 text-sm uppercase tracking-wider">
                OFF en tu compra
              </p>
            </div>

            {/* Tier 2 */}
            <div className="rounded-2xl border-2 border-black bg-black p-8 text-white transition-all hover:shadow-lg">
              <p className="font-body text-xs uppercase tracking-[0.15em] text-zinc-400">
                Desde $3,000 mxn
              </p>
              <p className="font-heading mt-2 text-5xl font-bold leading-none">
                20%
              </p>
              <p className="font-condensed mt-1 text-sm uppercase tracking-wider text-zinc-300">
                OFF en tu compra
              </p>
            </div>

            {/* Tier 3 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 transition-all hover:border-zinc-300 hover:shadow-sm">
              <p className="font-body text-xs uppercase tracking-[0.15em] text-zinc-400">
                Desde $4,500 mxn
              </p>
              <p className="font-heading mt-2 text-5xl font-bold leading-none">
                25%
              </p>
              <p className="font-condensed mt-1 text-sm uppercase tracking-wider">
                OFF en tu compra
              </p>
            </div>
          </div>

          {/* Free Shipping */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 17a2 2 0 100 4 2 2 0 000-4zm0 0h14M5 17V5h14v12M7 17h10" />
              <path d="M9 17V7h6l4 4v6" />
            </svg>
            <span className="font-condensed text-sm uppercase tracking-wider">
              Envío gratis a partir de $1,000 MXN
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
