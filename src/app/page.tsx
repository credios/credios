import { Metadata } from "next";
import HomeHero from "@/components/homehero";
import CrediosProducts from "@/components/corpohome";
import { JsonLd } from "@/components/SEO/JsonLd";

// Metadados para SEO (COM WWW)
export const metadata: Metadata = {
  title: "Credios | Crédito Digital para Todos | Empréstimo para Negativados",
  description: "Credios oferece empréstimos na conta de luz e antecipação de FGTS, mesmo para negativados...",
  keywords: "Credios, empréstimo digital, crédito para negativados, antecipação FGTS, empréstimo na conta de luz...",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Credios | Crédito Digital Facilitado para Todos",
    description: "Empréstimos na conta de luz e antecipação de FGTS, ideal para negativados...",
    // --- CORRIGIDO ---
    url: "https://www.credios.com.br",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        // --- CORRIGIDO ---
        url: "https://www.credios.com.br/images/credios-og.jpg",
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
    description: "Empréstimos na conta de luz e antecipação de FGTS, ideal para negativados...",
    // --- CORRIGIDO ---
    images: ["https://www.credios.com.br/images/credios-og.jpg"],
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
    // --- CORRIGIDO ---
    canonical: "https://www.credios.com.br",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para a página inicial (COM WWW)
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Credios",
  // --- CORRIGIDO ---
  "url": "https://www.credios.com.br",
  // --- CORRIGIDO ---
  "logo": "https://www.credios.com.br/images/logo.png",
  "description": "Plataforma de crédito digital focada em soluções para quem precisa de crédito rápido e fácil...",
  "sameAs": [ // Mantidos como estão (links externos)
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

// Schema JSON-LD para produtos (COM WWW)
const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product", // Ou "Product" se você padronizar assim
        "name": "Empréstimo na Conta de Luz",
        "description": "Empréstimo usando sua conta de energia elétrica como garantia...",
        "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz",
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
        "@type": "Product", // Ou "Product" se você padronizar assim
        "name": "Empréstimo FGTS",
        "description": "Antecipe seu saque-aniversário do FGTS com as melhores taxas do mercado.",
        // --- CORRIGIDO ---
        "url": "https://www.credios.com.br/emprestimo-fgts",
        "provider": {
          "@type": "Organization",
          "name": "Credios"
        }
      }
    }
  ]
};

// Schema JSON-LD para avaliações (já apontava para Organization, sem URL própria a corrigir)
const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "Organization",
    // --- CORRIGIDO (Adicionando URL da Organização) ---
    "name": "Credios",
    "url": "https://www.credios.com.br" // Adiciona a URL aqui também
  },
  "ratingValue": "4.8",
  "bestRating": "5",
  "worstRating": "1",
  "ratingCount": "10000" // Verifique se este número está atualizado
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