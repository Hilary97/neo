"use client";

import { useRef, useState } from "react";
import Script from "next/script";

interface PayPalOrderAmount {
  currency_code: string;
  value: string;
}

interface PayPalPurchaseUnit {
  amount: PayPalOrderAmount;
}

interface PayPalOrderData {
  intent: "CAPTURE";
  purchase_units: PayPalPurchaseUnit[];
}

interface PayPalOrderApi {
  create: (orderData: PayPalOrderData) => Promise<string>;
  capture: () => Promise<unknown>;
}

interface PayPalActions {
  order: PayPalOrderApi;
}

interface PayPalApproveData {
  orderID: string;
}

interface PayPalButtonsInstance {
  render: (container: HTMLElement) => void;
}

interface PayPalButtonsConfig {
  createOrder: (data: unknown, actions: PayPalActions) => Promise<string>;
  onApprove: (data: PayPalApproveData, actions: PayPalActions) => Promise<void>;
  onError?: (error: unknown) => void;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPalButtonsConfig) => PayPalButtonsInstance;
    };
  }
}

type PayPalStatus = "idle" | "success" | "error";

interface PayPalButtonProps {
  amount: number;
}

export function PayPalButton({ amount }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<PayPalStatus>("idle");

  const renderButton = () => {
    const container = containerRef.current;
    if (!window.paypal || !container) return;

    container.innerHTML = "";

    window.paypal
      .Buttons({
        createOrder: (_data, actions) =>
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "MXN",
                  value: amount.toFixed(2),
                },
              },
            ],
          }),
        onApprove: async (_data, actions) => {
          await actions.order.capture();
          setStatus("success");
        },
        onError: () => setStatus("error"),
      })
      .render(container);
  };

  if (status === "success") {
    return (
      <p className="mt-2 rounded-full bg-green-100 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-green-700">
        ¡Pago completado!
      </p>
    );
  }

  return (
    <div className="mt-2">
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=MXN`}
        onReady={renderButton}
      />
      <div ref={containerRef} />
      {status === "error" && (
        <p className="mt-1 text-center text-xs text-red-600">
          Hubo un problema con el pago. Intentá de nuevo.
        </p>
      )}
    </div>
  );
}
