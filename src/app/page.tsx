import { Metadata } from "next";
import HomeHero from "@/components/homehero";
import CrediosProducts from "@/components/corpohome";
import { JsonLd } from "@/components/SEO/JsonLd";

// Metadados para SEO
export const metadata: Metadata = {
  title: "Credios | Crédito Digital para Todos | Empréstimo para Negativados",
  description: "Credios oferece empréstimos na conta de luz e antecipação de FGTS, mesmo para negativados. Crédito rápido e fácil, 100% digital, aprovação em minutos e dinheiro via PIX.",
  keywords: "Credios, empréstimo digital, crédito para negativados, antecipação FGTS, empréstimo na conta de luz, crédito rápido, nome sujo, empréstimo sem burocracia",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Credios | Crédito Digital Facilitado para Todos",
    description: "Empréstimos na conta de luz e antecipação de FGTS, ideal para negativados. Crédito rápido e fácil, 100% digital com aprovação em minutos e dinheiro via PIX.",
    url: "https://credios.com.br",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        url: "https://credios.com.br/images/credios-og.jpg",
        width: 1200,
        height: 630,
        alt: "Credios - Soluções de Crédito Digital",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credios | Crédito Digital para Todos",
    description: "Empréstimos na conta de luz e antecipação de FGTS, ideal para negativados. Crédito rápido, 100% digital com aprovação em minutos.",
    images: ["https://credios.com.br/images/credios-og.jpg"],
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
    canonical: "https://credios.com.br",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para a página inicial
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Credios",
  "url": "https://credios.com.br",
  "logo": "https://credios.com.br/images/logo.png",
  "description": "Plataforma de crédito digital focada em soluções para quem precisa de crédito rápido e fácil, mesmo com restrições no nome.",
  "sameAs": [
    "https://www.facebook.com/credios",
    "https://www.instagram.com/credios",
    "https://api.whatsapp.com/send?phone=552130300606"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+552130300606",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rio de Janeiro",
    "addressRegion": "RJ",
    "addressCountry": "BR"
  }
};

// Schema JSON-LD para produtos
const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "FinancialProduct",
        "name": "Empréstimo na Conta de Luz",
        "description": "Empréstimo usando sua conta de energia elétrica como garantia, com aprovação mesmo para negativados.",
        "url": "https://credios.com.br/emprestimo-conta-luz",
        "provider": {
          "@type": "Organization",
          "name": "Credios"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "FinancialProduct",
        "name": "Empréstimo FGTS",
        "description": "Antecipe seu saque-aniversário do FGTS com as melhores taxas do mercado.",
        "url": "https://credios.com.br/emprestimo-fgts",
        "provider": {
          "@type": "Organization",
          "name": "Credios"
        }
      }
    }
  ]
};

// Schema JSON-LD para avaliações
const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "Organization",
    "name": "Credios"
  },
  "ratingValue": "4.8",
  "bestRating": "5",
  "worstRating": "1",
  "ratingCount": "10000"
};

export default function Home() {
  return (
    <>
      {/* JSON-LD para SEO */}
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={productsJsonLd} />
      <JsonLd data={reviewsJsonLd} />
      
      {/* Componentes da página */}
      <HomeHero />
      <CrediosProducts />
    </>
  );
}