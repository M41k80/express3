import { AuthProvider } from '@/app/context/AuthContext'; 

import { Geist, Geist_Mono, Nunito, Lato } from 'next/font/google';
import './globals.css';
// import { image } from 'html2canvas/dist/types/css/types/image';
import type { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'BalanceIA',
  description: 'BalanceIA es una plataforma inteligente...',
  keywords: ['BalanceIA', 'salud', 'alimentación saludable', 'ejercicio', 'inteligencia artificial', 'bienestar', 'vida equilibrada'],
  authors: [{ name: 'BalanceIA', url: 'https://balanceia.com' }],
  openGraph: {
    title: 'BalanceIA',
    description: 'Transforma tu salud con inteligencia artificial...',
    url: 'https://balanceia.com',
    siteName: 'BalanceIA',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/Logo-Balance-IA.png',
        width: 1200,
        height: 630,
        alt: 'BalanceIA Logo',
        type: 'image/png',
      },
    ],
  },
};


  


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${lato.variable} antialiased`}>
        <AuthProvider>  
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
