/** @format */

import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: 'Scott Zhang - My Journey',
  description: 'A story of perseverance and success in job hunting',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
