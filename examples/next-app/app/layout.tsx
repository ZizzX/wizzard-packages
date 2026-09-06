import type { ReactNode } from 'react';

export const metadata = { title: 'wizzard: Next.js App Router fixture' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
