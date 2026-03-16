import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vasen Estética | Bienestar y Belleza",
  description: "Centro de estética avanzada. Tratamientos faciales, corporales y medicina estética.",
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
