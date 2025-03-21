import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import GoogleTagManager from "@/app/components/GoogleTagManager";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Credios | Crédito Rápido e Fácil",
    template: "%s | Credios"
  },
  description: "Credios - Crédito rápido e fácil para você que precisa de dinheiro agora",
  keywords: "empréstimo,crédito,dinheiro,empréstimo online,crédito rápido",
  metadataBase: new URL(process.env.SITE_URL || 'https://credios.com.br'),
  openGraph: {
    type: 'website',
    siteName: 'Credios',
    title: 'Credios | Crédito Rápido e Fácil',
    description: 'Credios - Crédito rápido e fácil para você que precisa de dinheiro agora',
    images: ['/logo.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credios | Crédito Rápido e Fácil',
    description: 'Credios - Crédito rápido e fácil para você que precisa de dinheiro agora',
    images: ['/logo.svg'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#4e1ac3', // Ajuste para a cor principal do seu site
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  authors: [{ name: 'Credios' }],
  publisher: 'Credios',
  category: 'Empréstimos e Crédito',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  verification: {
    // Adicionar somente se você tiver estes códigos de verificação
    // google: 'seu-código-de-verificação',
    // yandex: 'seu-código-de-verificação',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
        {GTM_ID && <GoogleTagManager GTM_ID={GTM_ID} />}
        <SpeedInsights />
      </body>
    </html>
  );
}