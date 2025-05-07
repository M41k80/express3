import { AuthProvider } from '@/app/context/AuthContext'; 

import { Geist, Geist_Mono, Nunito, Lato } from 'next/font/google';
import './globals.css';

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

export const metadata = {
  title: 'SaludIA',
  description: 'App de gestión de salud y entrenamiento personal',
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
