import { Metadata } from "next";
import HeroFgts from "@/components/herofgts";
import SobreCredios from "@/components/sobrecredios";
import CrediosFgtsPage from "@/components/corpofgts";
import { JsonLd } from "@/components/SEO/JsonLd";

// --- METADADOS (Mantidos com WWW) ---
export const metadata: Metadata = {
  title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
  description: "Antecipe o saque-aniversário do seu FGTS com as melhores taxas do mercado...",
  // ... (resto dos metadados como na versão anterior, com www) ...
   authors: [{ name: "Credios" }],
   openGraph: { /* ... com www ... */ },
   twitter: { /* ... com www ... */ },
   robots: { /* ... */ },
   alternates: { canonical: "https://www.credios.com.br/emprestimo-fgts" }, // WWW
   viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD PRINCIPAL: @type: Product (Verificar implementação cuidadosa) ---
const productFgtsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product", // Tipo correto
  "name": "Empréstimo FGTS - Antecipação Saque-Aniversário",
  "description": "Antecipação do saque-aniversário do FGTS com contratação 100% digital...",
  "image": "https://www.credios.com.br/images/emprestimo-fgts-og.jpg", // WWW
  "url": "https://www.credios.com.br/emprestimo-fgts", // WWW
  "brand": {
    "@type": "Organization",
    "name": "Credios"
  },
  "provider": {
     "@type": "Organization",
     "name": "Credios",
     "url": "https://www.credios.com.br" // WWW
  },
  "logo": "https://www.credios.com.br/images/logo.png", // WWW

  // --- PROPRIEDADES ESSENCIAIS - VERIFICAR SE ESTÃO PRESENTES E CORRETAS NA IMPLEMENTAÇÃO ---
  "offers": { // <-- OBRIGATÓRIO (ou review/aggregateRating)
    "@type": "Offer",
    "priceCurrency": "BRL",
    "price": "20000.00",
    "availability": "https://schema.org/OnlineOnly",
    "areaServed": { "@type": "Country", "name": "BR" },
    "url": "https://www.credios.com.br/emprestimo-fgts", // WWW
    "seller": { "@type": "Organization", "name": "Credios" }
  },
  "aggregateRating": { // <-- OBRIGATÓRIO (ou offers/review)
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "ratingCount": "120",
    "itemReviewed": {
      "@type": "Product", // Deve ser Product
      "name": "Empréstimo FGTS - Antecipação Saque-Aniversário",
      "url": "https://www.credios.com.br/emprestimo-fgts" // WWW
    }
  },
  "review": [ // <-- OBRIGATÓRIO (ou offers/aggregateRating) - Presente aqui
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Marcelo Santos" },
      "datePublished": "2023-07-10",
      "reviewBody": "Consegui antecipar meu FGTS com muita facilidade...",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "itemReviewed": {
        "@type": "Product", // Deve ser Product
        "name": "Empréstimo FGTS - Antecipação Saque-Aniversário",
        "url": "https://www.credios.com.br/emprestimo-fgts" // WWW
      }
    },
    // ... (restante das reviews com itemReviewed @type: Product) ...
     {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Juliana Ferreira" },
      "datePublished": "2023-08-03",
      "reviewBody": "Melhor taxa do mercado...",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "itemReviewed": { "@type": "Product", "name": "Empréstimo FGTS - Antecipação Saque-Aniversário", "url": "https://www.credios.com.br/emprestimo-fgts" }
    },
     {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ricardo Oliveira" },
      "datePublished": "2023-09-15",
      "reviewBody": "Atendimento muito bom...",
      "reviewRating": { "@type": "Rating", "ratingValue": "4" },
      "itemReviewed": { "@type": "Product", "name": "Empréstimo FGTS - Antecipação Saque-Aniversário", "url": "https://www.credios.com.br/emprestimo-fgts" }
    }
  ]
  // --- FIM DAS PROPRIEDADES ESSENCIAIS ---
};

// --- SCHEMA FAQ (Mantido) ---
const faqJsonLd = { /* ... seu schema FAQ ... */ };

// --- SCHEMA HOWTO (Mantido) ---
const processJsonLd = { /* ... seu schema HowTo ... */ };

export default function EmprestimoFGTS() {
  return (
    <>
      {/* Implementar CUIDADOSAMENTE os JSON-LD */}
      <JsonLd data={productFgtsJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={processJsonLd} />

      {/* Componentes da página */}
      <HeroFgts />
      <CrediosFgtsPage />
      <SobreCredios />
    </>
  );
}