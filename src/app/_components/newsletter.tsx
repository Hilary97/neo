"use client";

export function Newsletter() {
  return (
    <section className="bg-black px-6 py-14 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-4xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
          Regístrate y recibe noticias, lanzamientos y promociones exclusivas.
        </h2>

        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Correo electrónico"
            className="flex-1 rounded-full bg-white px-6 py-3.5 font-body text-sm text-black placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            required
          />
          <button
            type="submit"
            className="rounded-full bg-white px-10 py-3.5 font-condensed text-sm font-semibold uppercase tracking-widest text-black transition-all hover:bg-zinc-200"
          >
            Suscribir
          </button>
        </form>
      </div>
    </section>
  );
}
