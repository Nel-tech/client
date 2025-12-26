import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased bg-black text-foreground`}
      >
        
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />

        <QueryProvider>
          <AuthInitializer>{children}</AuthInitializer>
          <Toaster
            position="top-right"
            theme="dark"
            toastOptions={{
              classNames: {
                toast: 'bg-gray-900 border border-gray-800',
                title: 'text-white font-medium',
                description: 'text-gray-400',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
