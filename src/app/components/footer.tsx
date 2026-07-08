import Image from "next/image";

const footerLinks = {
  nosotros: {
    title: "Nosotros",
    links: [
      { label: "Tiendas Físicas", href: "#" },
      { label: "Sobre Nosotros", href: "#" },
      { label: "Trabaja con Nosotros", href: "#" },
      { label: "Contacto", href: "https://wa.me/523312724005" },
    ],
  },
  ayuda: {
    title: "Ayuda",
    links: [
      { label: "Preguntas Frecuentes", href: "#" },
      { label: "Cancelación y Devoluciones", href: "#" },
      { label: "Atención a clientes", href: "#" },
    ],
  },
  politicas: {
    title: "Política y Condiciones",
    links: [
      { label: "Términos y Condiciones", href: "#" },
      { label: "Política de Privacidad", href: "#" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-black px-6 pb-8 pt-14 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="https://res.cloudinary.com/dj223b5lo/image/upload/v1780773268/1B796156-17F5-4DD4-97C9-6419C2BD8F1C_1_105_c_sg48ma.jpg"
              alt="Logo"
              width={120}
              height={40}
              className="h-auto w-32  md:w-30"
            />
            <p className="font-condensed mt-4 text-xs uppercase tracking-widest text-zinc-500">
              ALL THE VIBES
            </p>
            <div className="mt-2 flex gap-4">
              {["Spotify", "YouTube", "Apple Music"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="font-body text-xs text-zinc-600 underline underline-offset-2 hover:text-white"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h3 className="font-condensed text-lg font-semibold uppercase tracking-wide">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("https://wa.me")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="font-body text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 md:flex-row">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              {
                label: "Facebook",
                href: "https://www.facebook.com/share/1am2y9EuFW/?mibextid=wwXIfr",
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/neoestudioss?igsh=Y2x2bmJ5Z2o1NmY=",
              },
              { label: "TikTok", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs uppercase tracking-widest text-zinc-600 transition-colors hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
          <p className="font-body text-xs text-zinc-700">&copy; 2026 SARELLY</p>
        </div>
      </div>
    </footer>
  );
}
