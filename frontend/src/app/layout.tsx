import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Väsen Estética | Medicina Estética y Bienestar",
  description: "Centro de medicina estética y bienestar. Tratamientos faciales, corporales, aparatología avanzada, masajes y más. Reservá tu turno hoy.",
  keywords: "estética, medicina estética, tratamientos faciales, aparatología, masajes, depilación láser, bienestar",
  openGraph: {
    title: "Väsen Estética | Medicina Estética y Bienestar",
    description: "Centro de medicina estética y bienestar premium. Tratamientos de última generación.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
