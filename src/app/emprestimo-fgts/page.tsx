import { Metadata } from "next";
import HeroFgts from "@/components/herofgts";
import SobreCredios from "@/components/sobrecredios";
import CrediosFgtsPage from "@/components/corpofgts";
import { JsonLd } from "@/components/SEO/JsonLd";

// --- METADADOS (JÁ COM WWW NAS VERSÕES ANTERIORES, MANTIDO) ---
export const metadata: Metadata = {
  title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
  description: "Antecipe o saque-aniversário do seu FGTS com as melhores taxas do mercado. Dinheiro rápido, processo 100% digital, sem comprometer sua renda mensal. Simule agora!",
  keywords: "empréstimo FGTS, antecipação saque-aniversário, empréstimo digital, melhores taxas FGTS, antecipação FGTS sem comprometer renda, crédito FGTS aprovação rápida, empréstimo rápido FGTS, antecipação FGTS online",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
    description: "Antecipe até R$ 20.000 do seu saque-aniversário com as melhores taxas. Compare bancos, escolha a melhor oferta e receba no mesmo dia via PIX. Simule agora!",
    url: "https://www.credios.com.br/emprestimo-fgts", // WWW
    siteName: "Credios - Soluções de Crédito Digital",
    images: [ { url: "https://www.credios.com.br/images/emprestimo-fgts-og.jpg", /*...*/ } ], // WWW
    locale: "pt_BR", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
    description: "Antecipe seu saque-aniversário com as melhores taxas. Compare ofertas e receba no mesmo dia via PIX.",
    images: ["https://www.credios.com.br/images/emprestimo-fgts-og.jpg"], // WWW
  },
  robots: { /* ... */ },
  alternates: { canonical: "https://www.credios.com.br/emprestimo-fgts" }, // WWW
  viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD PRINCIPAL: ALTERADO PARA @type: Service ---
const serviceFgtsJsonLd = {
  "@context": "https://schema.org",
  // --- MUDANÇA PRINCIPAL ---
  "@type": "Service",
  // --- FIM DA MUDANÇA ---
  "name": "Antecipação Saque-Aniversário FGTS (Empréstimo)", // Nome focado no serviço
  "serviceType": "Serviço de Crédito com Garantia FGTS", // Tipo específico do serviço
  "description": "Serviço online para antecipação do saque-aniversário do FGTS com taxas competitivas. Contratação digital e recebimento rápido via PIX.",
  "url": "https://www.credios.com.br/emprestimo-fgts", // WWW
  "provider": { // Essencial para Service
    "@type": "Organization",
    "name": "Credios",
    "url": "https://www.credios.com.br", // WWW
    "logo": "https://www.credios.com.br/images/logo.png" // WWW
  },
   "brand": { // Marca do serviço/provider
    "@type": "Organization",
    "name": "Credios"
  },
   "areaServed": { // Área de cobertura do serviço
    "@type": "Country",
    "name": "BR" // Código ISO 3166-1 alpha-2 para Brasil
  },
  // Offers descreve a oferta do serviço (não o "produto" em si)
  "offers": {
    "@type": "Offer",
    "itemOffered": { // Linka explicitamente a oferta ao serviço
        "@type": "Service",
        "name": "Antecipação Saque-Aniversário FGTS (Empréstimo)"
    },
    "priceCurrency": "BRL",
    // Não há um "preço" fixo, então omitimos 'price'. Poderia usar priceSpecification para taxas, mas simplificamos.
    "availability": "https://schema.org/OnlineOnly",
    "areaServed": { "@type": "Country", "name": "BR" }, // Pode repetir ou referenciar a principal
  },
   // AggregateRating e Review mantidos para valor semântico, mas SEM expectativa de Rich Snippet de estrelas
   "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "ratingCount": "120",
    "itemReviewed": { // Aponta para o Service principal
      // --- TIPO ALTERADO ---
      "@type": "Service",
      "name": "Antecipação Saque-Aniversário FGTS (Empréstimo)",
      "url": "https://www.credios.com.br/emprestimo-fgts" // WWW
    }
  },
  "review": [ // Reviews individuais
    {
      "@type": "Review",
      /* ... author, datePublished, reviewBody ... */
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "itemReviewed": { // Aponta para o Service principal
        // --- TIPO ALTERADO ---
        "@type": "Service",
        "name": "Antecipação Saque-Aniversário FGTS (Empréstimo)",
        "url": "https://www.credios.com.br/emprestimo-fgts" // WWW
      }
    },
    {
      "@type": "Review",
       /* ... author, datePublished, reviewBody ... */
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "itemReviewed": { // Aponta para o Service principal
         // --- TIPO ALTERADO ---
        "@type": "Service",
        "name": "Antecipação Saque-Aniversário FGTS (Empréstimo)",
        "url": "https://www.credios.com.br/emprestimo-fgts" // WWW
      }
    },
     {
      "@type": "Review",
       /* ... author, datePublished, reviewBody ... */
      "reviewRating": { "@type": "Rating", "ratingValue": "4" },
      "itemReviewed": { // Aponta para o Service principal
         // --- TIPO ALTERADO ---
        "@type": "Service",
        "name": "Antecipação Saque-Aniversário FGTS (Empréstimo)",
        "url": "https://www.credios.com.br/emprestimo-fgts" // WWW
      }
    }
  ]
};

// --- SCHEMA FAQ (Mantido, URLs já devem estar OK) ---
const faqJsonLd = { /* ... seu schema FAQ ... */ };

// --- SCHEMA HOWTO (Mantido, URLs já devem estar OK) ---
const processJsonLd = { /* ... seu schema HowTo ... */ };

export default function EmprestimoFGTS() {
  return (
    <>
      {/* JSON-LD para SEO */}
      {/* Passando o schema principal renomeado */}
      <JsonLd data={serviceFgtsJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={processJsonLd} />

      {/* Componentes da página */}
      <HeroFgts />
      <CrediosFgtsPage />
      <SobreCredios />
    </>
  );
}