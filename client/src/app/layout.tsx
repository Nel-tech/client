// src/app/layout.tsx

import type { Metadata } from 'next';

import { Poppins } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers';
import { Toaster } from 'sonner';
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],

  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

// const inter = Inter({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   display: 'swap',
// });

// Your metadata remains the same
export const metadata: Metadata = {
  title: 'Tropiqk - Amplify Your Music',
  description:
    'The platform for artists to grow their audience by rewarding fans.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Step 4: Apply the new font variables to the body tag */}
      <body className={`${poppins.variable} antialiased`}>
        <QueryProvider>
          {children} <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
