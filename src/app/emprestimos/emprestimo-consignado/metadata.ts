import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empréstimo Consignado | Menores Taxas do Mercado | Credios",
  description: "Empréstimo consignado com as menores taxas do mercado! Ideal para servidores públicos, aposentados e pensionistas do INSS. Aprovação mesmo para negativados. Simule online em 2 minutos.",
  keywords: "empréstimo consignado, consignado INSS, consignado servidor público, crédito consignado, empréstimo com desconto em folha, consignado aposentado, menor taxa consignado, empréstimo consignado online",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo Consignado | Menores Taxas do Mercado | Credios",
    description: "Empréstimo consignado com taxas a partir de 1,25% ao mês. Ideal para servidores públicos, aposentados e pensionistas. Simule agora!",
    url: "https://credios.com.br/emprestimos/emprestimo-consignado",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        url: "https://credios.com.br/images/og-emprestimo-consignado.jpg",
        width: 1200,
        height: 630,
        alt: "Empréstimo Consignado Credios",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimo Consignado | Credios",
    description: "Empréstimo consignado com as menores taxas do mercado. Aprovação facilitada para servidores, aposentados e pensionistas.",
    images: ["https://credios.com.br/images/og-emprestimo-consignado.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://credios.com.br/emprestimos/emprestimo-consignado",
  },
  viewport: "width=device-width, initial-scale=1",
}; 