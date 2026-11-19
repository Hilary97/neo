import type { Metadata } from "next";
import { Oswald, Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/components/cart-provider";
import { SiteHeader } from "@/app/components/site-header";
import { CartDrawer } from "@/app/components/cart-drawer";
import { CartFloatingTrigger } from "@/app/components/cart-trigger";
import { CATEGORIES } from "@/lib/products";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neo-2026",
  description:
    "Hasta -55% OFF acumulando descuentos. Del 25 de Mayo al 2 de Junio. Envío gratis desde $1,000 MXN.",
  openGraph: {
    title: "Hot Sale 2026",
    description:
      "Hasta -55% OFF acumulando descuentos. Del 25 de Mayo al 2 de Junio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${oswald.variable} ${barlowCondensed.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <SiteHeader categories={CATEGORIES} />
          {children}
          <CartDrawer />
          <CartFloatingTrigger />
        </CartProvider>
      </body>
    </html>
  );
}
