import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cootrasec — Transporte ejecutivo en Colombia",
  description:
    "Soluciones de transporte empresarial seguras, eficientes y confiables: rutas, flota ejecutiva, seguimiento GPS y liquidaciones claras."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
