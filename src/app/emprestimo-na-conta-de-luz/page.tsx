import { Metadata } from "next";
import AdvantagesSection from "@/components/advantagessection";
import HeroSection from "@/components/herosection";
import { JsonLd } from "@/components/SEO/JsonLd";

// Metadados para SEO - mantidos como estão
export const metadata: Metadata = {
  title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
  description: "Solicite empréstimo na conta de luz com aprovação imediata. Até R$ 3.300 sem consulta SPC/Serasa. Receba via PIX em até 24h e pague nas faturas de energia.",
  keywords: "empréstimo na conta de luz, crédito pela conta de energia, empréstimo sem SPC, nome sujo, empréstimo rápido, empréstimo aprovação imediata",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
    description: "Solicite empréstimo usando sua conta de luz como garantia. Aprovação imediata mesmo com nome negativado. Receba até R$ 3.300 via PIX em até 24h.",
    url: "https://credios.com.br/emprestimo-na-conta-de-luz",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        url: "https://credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg",
        width: 1200,
        height: 630,
        alt: "Empréstimo na Conta de Luz Credios",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
    description: "Solicite empréstimo usando sua conta de luz. Aprovação imediata mesmo com nome negativado. Receba via PIX em até 24h.",
    images: ["https://credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://credios.com.br/emprestimo-na-conta-de-luz",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para FinancialProduct (com AggregateRating)
const financialProductJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Empréstimo na Conta de Luz Credios",
  "description": "Empréstimo usando conta de luz como garantia, sem consulta ao SPC/Serasa, com aprovação em minutos e valores de até R$ 3.300.",
  "url": "https://credios.com.br/emprestimo-na-conta-de-luz",
  "provider": {
    "@type": "Organization",
    "name": "Credios",
    "url": "https://credios.com.br",
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
    "price": "3300",
    "availability": "https://schema.org/InStock",
    "validFrom": "2023-01-01", // Adicionei uma data de validade para a oferta
  },
  "areaServed": {
    "@type": "GeoShape",
    "description": "Bahia, Ceará, Pernambuco, Rio Grande do Norte, Goiás, São Paulo, Rio de Janeiro, Paraná e Rio Grande do Sul",
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "value": "3.99",
    "minValue": "3.99",
    "maxValue": "6.99",
    "unitText": "percent", // Adicionei a unidade para maior clareza
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "100", // Mantido como está
  },
};

// Removido o schema Review, já que AggregateRating já cobre as avaliações

export default function EmprestimoNaContaDeLuz() {
  return (
    <>
      {/* Adicionando apenas o schema FinancialProduct */}
      <JsonLd data={financialProductJsonLd} />

      {/* Componente Hero (banner principal) */}
      <HeroSection />

      {/* Componente de conteúdo principal */}
      <AdvantagesSection />
    </>
  );
}