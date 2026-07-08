const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1am2y9EuFW/?mibextid=wwXIfr",
    bg: "bg-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/neoestudioss?igsh=Y2x2bmJ5Z2o1NmY=",
    bg: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47a4.9 4.9 0 0 0-1.77 1.15A4.9 4.9 0 0 0 2.53 5.45c-.25.64-.42 1.37-.47 2.43C2 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43a4.9 4.9 0 0 0 1.15 1.77 4.9 4.9 0 0 0 1.77 1.15c.64.25 1.37.42 2.43.47C8.94 22 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47a4.9 4.9 0 0 0 1.77-1.15 4.9 4.9 0 0 0 1.15-1.77c.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77A4.9 4.9 0 0 0 18.55 2.53c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2Zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.2 1.85.34.47.18.8.4 1.15.75s.57.68.75 1.15c.14.36.3.87.34 1.85.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.2 1.5-.34 1.85-.18.47-.4.8-.75 1.15s-.68.57-1.15.75c-.36.14-.87.3-1.85.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.2-1.85-.34a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.14-.36-.3-.87-.34-1.85C3.81 14.99 3.8 14.67 3.8 12s.01-2.99.06-4.04c.04-.98.2-1.5.34-1.85.18-.47.4-.8.75-1.15s.68-.57 1.15-.75c.36-.14.87-.3 1.85-.34C9.01 3.81 9.33 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3Zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7Zm5.36-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    bg: "bg-black border border-zinc-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          fill="#25F4EE"
          d="M16.6 5.82a4.28 4.28 0 0 1-2.5-3.32V2h-3.4v14.4a2.6 2.6 0 1 1-1.84-2.49v-3.45a5.97 5.97 0 1 0 5.24 5.94V9.1a7.65 7.65 0 0 0 4.5 1.45V7.15c-.68 0-1.35-.2-1.99-.47Z"
          transform="translate(-.3 -.15)"
        />
        <path
          fill="#FE2C55"
          d="M16.3 5.67a4.28 4.28 0 0 1-2.5-3.32V2h-3.4v14.4a2.6 2.6 0 1 1-1.84-2.49v-3.45a5.97 5.97 0 1 0 5.24 5.94V9.1a7.65 7.65 0 0 0 4.5 1.45V7.15c-.68 0-1.35-.2-2-.47Z"
          transform="translate(.3 .15)"
        />
        <path
          fill="#fff"
          d="M16 5.75a4.28 4.28 0 0 1-2.5-3.32V2h-3.4v14.4a2.6 2.6 0 1 1-1.84-2.49v-3.45a5.97 5.97 0 1 0 5.24 5.94V9.1a7.65 7.65 0 0 0 4.5 1.45V7.15c-.68 0-1.35-.2-2-.47Z"
        />
      </svg>
    ),
  },
];

export function Newsletter() {
  return (
    <section className="bg-black px-6 py-14 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-4xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
          Síguenos en todas nuestras redes sociales para que no te pierdas de
          todos nuestros productos nuevos.
        </h2>

        <div className="mt-10 flex items-center justify-center gap-6 md:gap-10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`flex h-17 w-17 items-center justify-center rounded-full text-white transition-transform hover:scale-110 md:h-28 md:w-28 ${social.bg}`}
            >
              <span className="[&_svg]:h-10 [&_svg]:w-10 md:[&_svg]:h-14 md:[&_svg]:w-14">
                {social.icon}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
