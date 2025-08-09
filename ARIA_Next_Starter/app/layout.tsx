import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "ARIA Intelligence AI",
  description: "Advanced Relationship Intelligence Framework",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-[rgba(212,175,55,0.25)]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-display text-2xl">
              <span className="gold-gradient">ARIA</span> Intelligence
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/products" className="hover:underline">Products</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-[rgba(212,175,55,0.25)]">
          <div className="max-w-6xl mx-auto px-4 py-8 footer">
            © {new Date().getFullYear()} ARIA Intelligence AI. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
