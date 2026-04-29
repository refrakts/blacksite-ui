import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Blacksite UI — Palantir-inspired components",
  description:
    "A ShadCN-style component registry built around Palantir's tactical-dashboard design language.",
  metadataBase: new URL("https://blacksite-ui.dev"),
  openGraph: {
    title: "Blacksite UI",
    description: "Palantir-inspired component registry",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-svh bg-background font-sans antialiased">{children}</body>
    </html>
  );
}
