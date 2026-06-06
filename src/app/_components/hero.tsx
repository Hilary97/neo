import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-black px-6 text-center text-white md:min-h-[85vh]">
      {/* Background texture/gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6">
        {/* HS Logo */}
        <div className="mb-4">
          <Image
            src="https://res.cloudinary.com/dj223b5lo/image/upload/v1780773268/1B796156-17F5-4DD4-97C9-6419C2BD8F1C_1_105_c_sg48ma.jpg"
            alt="Hot Sale 2026"
            width={320}
            height={96}
            className="h-auto w-64 object-contain md:w-80"
            priority
          />
        </div>

        {/* Tagline */}
        <h1 className="font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-7xl lg:text-8xl"></h1>
        <p className="font-condensed text-xl uppercase tracking-[0.15em] text-zinc-400 md:text-2xl">
          Haciendo realidad lo que imaginas
        </p>

        {/* Date */}
        <p className="mt-2 font-body text-sm text-zinc-500 md:text-base">
          Del 25 de Mayo al 2 de Junio
        </p>

        {/* CTA */}
        <a
          href="#products"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-10 py-3.5 font-condensed text-base font-semibold uppercase tracking-widest text-black transition-all hover:bg-zinc-200 active:scale-[0.97]"
        >
          Ver más
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="animate-bounce"
          >
            <path
              d="M8 3v10m0 0l-4-4m4 4l4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* TyC Link */}
        <a
          href="#terms"
          className="mt-2 text-xs uppercase tracking-widest text-zinc-600 underline underline-offset-4 hover:text-zinc-400"
        >
          Consulta TyC
        </a>
      </div>
    </section>
  );
}
