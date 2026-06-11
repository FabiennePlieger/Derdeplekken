import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "%s · Derdeplekken.nl",
    default: "Derdeplekken.nl – Vind een plek om te verblijven in jouw stad",
  },
  description:
    "Ontdek gratis en betaalbare derde plekken in Nederlandse steden. Bibliotheken, buurtcentra en parken waar je altijd welkom bent.",
  metadataBase: new URL("https://derdeplekken.nl"),
  openGraph: {
    siteName: "Derdeplekken.nl",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
