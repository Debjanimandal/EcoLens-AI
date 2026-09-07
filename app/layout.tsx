import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EcoLens AI — Turning Photos into Climate Action",
  description:
    "Upload a photo of your environment and instantly receive a visual climate audit: mitigation strategies, adaptation plans, and ROI analysis powered by AI.",
  keywords: [
    "climate action",
    "AI",
    "environment",
    "carbon footprint",
    "sustainability",
    "Gemini AI",
  ],
  openGraph: {
    title: "EcoLens AI",
    description: "Turning Photos into Climate Action",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
