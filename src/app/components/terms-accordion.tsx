"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-condensed text-lg uppercase tracking-wide">
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={cn("shrink-0 transition-transform duration-300", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300",
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="font-body text-sm leading-relaxed text-zinc-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TermsAccordion() {
  return (
    <section id="terms" className="scroll-mt-24 bg-white px-6 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading mb-8 text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Términos y Condiciones
        </h2>

        <AccordionItem title="¿Cómo obtener mi descuento?">
          <ol className="ml-4 list-decimal space-y-2">
            <li>
              Agrega los productos que quieras a tu carrito. Los descuentos
              directos ya están aplicados.
            </li>
            <li>
              El descuento extra de 15%, 20%, 25% se aplica automáticamente a
              tu carrito al alcanzar el monto mínimo.
            </li>
            <li>
              El hasta 45% OFF se logra comprando productos con descuentos
              directos y superando el monto de $4,500 mxn en tu carrito.
            </li>
            <li>
              El descuento extra en carrito no es acumulable con otros códigos
              de descuento.
            </li>
          </ol>
        </AccordionItem>

        <AccordionItem title="MSI con Mercado Pago">
          <p>
            Para obtener los 9 MSI el monto mínimo de compra es de $1,000 mxn.
          </p>
          <p className="mt-2">
            Promoción válida del 22 de Mayo al 2 de Junio de 2026.
          </p>
        </AccordionItem>

        <AccordionItem title="Promoción Mercado Pago*">
          <div className="space-y-2">
            <p>
              Ingresa el código <strong>HSALEMP</strong> logueándote en el
              checkout de Mercado Pago.
            </p>
            <p>
              Para obtener el 15% OFF el monto mínimo de compra es de $2,000
              mxn. Con un tope de descuento de $1,000 mxn.
            </p>
            <p>Aplica para Mercado Pago, BBVA, Banamex, HSBC, AMEX, Afirme, Inbursa y Openbank.</p>
            <ul className="ml-4 list-disc text-xs text-zinc-500">
              <li>Bonificaciones bancarias (sólo aplican en OP): BBVA, Banamex, HSBC y Klar</li>
              <li>Cashback en Point: pagando con Tarjeta de Crédito Mercado Pago (física)</li>
            </ul>
            <p className="text-xs text-zinc-500">
              Promoción válida del 25 de Mayo al 2 de Junio de 2026.
            </p>
          </div>
        </AccordionItem>
      </div>
    </section>
  );
}
