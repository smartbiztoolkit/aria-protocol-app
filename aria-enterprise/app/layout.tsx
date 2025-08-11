import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ARIA Protocol — Relationship Intelligence',
  description: 'Premium psychology-based tools for authentic connection.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
