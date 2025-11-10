// src/app/layout.tsx

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers';
import AuthInitializer from '@/components/auth/AuthInitializer';
import { Toaster } from 'sonner';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

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
      <body className={`${poppins.variable} antialiased`}>
        <QueryProvider>
          <AuthInitializer>
            {children}
          </AuthInitializer>
          <Toaster
            position="top-right"
            expand={false}
            richColors={false}
            theme="dark"
            toastOptions={{
              classNames: {
                toast: 'bg-gray-900 border border-gray-800',
                title: 'text-white font-medium',
                description: 'text-gray-400',
                success: '!bg-[#FF6B35] !border-[#e55a2b] text-white',
                error: '!bg-red-600 !border-red-700 text-white',
                warning: '!bg-yellow-600 !border-yellow-700 text-white',
                info: '!bg-blue-600 !border-blue-700 text-white',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}