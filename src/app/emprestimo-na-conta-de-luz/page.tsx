import { Metadata } from "next";
import AdvantagesSection from "@/components/advantagessection";
import HeroSection from "@/components/herosection";
import { JsonLd } from "@/components/SEO/JsonLd";

// --- METADADOS (Mantidos com WWW) ---
export const metadata: Metadata = {
  title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
  description: "Solicite empréstimo na conta de luz com aprovação imediata...",
  // ... (resto dos metadados como na versão anterior, com www) ...
   authors: [{ name: "Credios" }],
   openGraph: { /* ... com www ... */ },
   twitter: { /* ... com www ... */ },
   robots: { /* ... */ },
   alternates: { canonical: "https://www.credios.com.br/emprestimo-na-conta-de-luz" }, // WWW
   viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD PRINCIPAL: @type: Product (Verificar implementação cuidadosa) ---
const productContaLuzJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product", // Tipo correto
  "name": "Empréstimo na Conta de Luz",
  "description": "Empréstimo pessoal com garantia na fatura de energia elétrica...",
  "image": "https://cdn.prod.website-files.com/677096e27c3c8331cff29391/67c1dcd28a15baff9aa6a7f9_emprestimo-conta-de-luz-2.webp", // Verificar URL
  "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz", // WWW
  "brand": {
    "@type": "Organization",
    "name": "Credios"
  },
  "logo": "https://www.credios.com.br/images/logo.png", // WWW

  // --- PROPRIEDADES ESSENCIAIS - VERIFICAR SE ESTÃO PRESENTES E CORRETAS NA IMPLEMENTAÇÃO ---
  "offers": { // <-- OBRIGATÓRIO (ou review/aggregateRating)
    "@type": "Offer",
    "priceCurrency": "BRL",
    "price": "3300.00",
    "availability": "https://schema.org/OnlineOnly",
     "areaServed": {
       "@type": "AdministrativeArea",
       "name": [ "BA", "CE", "PE", "RN", "GO", "SP", "RJ", "PR", "RS" ]
     },
      "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz", // WWW
     "seller": { "@type": "Organization", "name": "Credios" }
  },
  "aggregateRating": { // <-- OBRIGATÓRIO (ou offers/review)
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "100", // Ou ratingCount
    "bestRating": "5",
    "itemReviewed": {
      "@type": "Product", // Deve ser Product
      "name": "Empréstimo na Conta de Luz",
      "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz" // WWW
    }
  }
  // "review": [] // Não havia reviews individuais nesta página no último código, mantido assim. Se houver, adicionar aqui.
  // --- FIM DAS PROPRIEDADES ESSENCIAIS ---
};

// Se tiver FAQ para esta página:
// const faqContaLuzJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", ... };

export default function EmprestimoNaContaDeLuz() {
  return (
    <>
      {/* Implementar CUIDADOSAMENTE os JSON-LD */}
      <JsonLd data={productContaLuzJsonLd} />
      {/* Se tiver FAQ: <JsonLd data={faqContaLuzJsonLd} /> */}

      {/* Seções do corpo da página */}
      <HeroSection />
      <AdvantagesSection />
    </>
  );
}