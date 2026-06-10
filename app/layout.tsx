import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EstateFlow Pro Foundation',
  description: 'Multi-role real estate operating system foundation',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
