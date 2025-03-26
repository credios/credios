import { Metadata } from "next";
import HeroFgts from "@/components/herofgts";
import SobreCredios from "@/components/sobrecredios";
import CrediosFgtsPage from "@/components/corpofgts";
import { JsonLd } from "@/components/SEO/JsonLd";

// --- METADADOS (Mantidos com WWW) ---
export const metadata: Metadata = {
  title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
  description: "Antecipe o saque-aniversário do seu FGTS com as melhores taxas do mercado. Dinheiro rápido, processo 100% digital, sem comprometer sua renda mensal. Simule agora!",
  // ... (keywords, authors, openGraph com www, twitter com www, robots, alternates com www, viewport) ...
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
    description: "Antecipe até R$ 20.000 do seu saque-aniversário com as melhores taxas...",
    url: "https://www.credios.com.br/emprestimo-fgts", // WWW
    siteName: "Credios - Soluções de Crédito Digital",
    images: [ { url: "https://www.credios.com.br/images/emprestimo-fgts-og.jpg", width: 1200, height: 630, alt: "Empréstimo FGTS Credios" } ], // WWW
    locale: "pt_BR", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
    description: "Antecipe seu saque-aniversário com as melhores taxas...",
    images: ["https://www.credios.com.br/images/emprestimo-fgts-og.jpg"], // WWW
  },
   robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, }, },
   alternates: { canonical: "https://www.credios.com.br/emprestimo-fgts" }, // WWW
   viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD PRINCIPAL: REVERTIDO PARA @type: Product COM itemReviewed ---
const productFgtsJsonLd = {
  "@context": "https://schema.org",
  // --- TIPO REVERTIDO ---
  "@type": "Product",
  "name": "Empréstimo FGTS - Antecipação Saque-Aniversário", // Nome estilo produto
  "description": "Antecipação do saque-aniversário do FGTS com contratação 100% digital. Melhores taxas e dinheiro rápido na conta via PIX.",
   // Adicionando uma imagem (use a URL correta da sua imagem OG ou outra relevante)
  "image": "https://www.credios.com.br/images/emprestimo-fgts-og.jpg", // WWW
  "url": "https://www.credios.com.br/emprestimo-fgts", // WWW
  "brand": { // Brand é padrão para Product
    "@type": "Organization", // Usar Organization é mais robusto que apenas Brand
    "name": "Credios"
  },
   // Provider/Seller (Opcional se já tem Brand, mas pode reforçar)
  "provider": {
     "@type": "Organization",
     "name": "Credios",
     "url": "https://www.credios.com.br" // WWW
  },
   "logo": "https://www.credios.com.br/images/logo.png", // WWW - Logo da marca/provider
   // Offers é padrão para Product
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
     // Usando 'price' para indicar o valor máximo, como no seu código antigo que funcionava.
     // Alternativamente, use priceSpecification: { maxPrice: 20000 }
    "price": "20000.00", // Valor máximo
    "availability": "https://schema.org/OnlineOnly", // Disponibilidade online
    "areaServed": { // Área coberta pela oferta
      "@type": "Country",
      "name": "BR"
    },
     "url": "https://www.credios.com.br/emprestimo-fgts", // URL da oferta/produto
     "seller": { // Quem vende/oferece
        "@type": "Organization",
        "name": "Credios"
      }
  },
   // AggregateRating com itemReviewed CORRETO
   "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "ratingCount": "120", // Ou reviewCount
    "itemReviewed": { // Aponta para o Product principal
      // --- TIPO CORRIGIDO ---
      "@type": "Product",
      "name": "Empréstimo FGTS - Antecipação Saque-Aniversário",
      "url": "https://www.credios.com.br/emprestimo-fgts" // WWW
    }
  },
  // Reviews individuais com itemReviewed CORRETO
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Marcelo Santos" },
      "datePublished": "2023-07-10",
      "reviewBody": "Consegui antecipar meu FGTS com muita facilidade...",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "itemReviewed": { // Aponta para o Product principal
        // --- TIPO CORRIGIDO ---
        "@type": "Product",
        "name": "Empréstimo FGTS - Antecipação Saque-Aniversário",
        "url": "https://www.credios.com.br/emprestimo-fgts" // WWW
      }
    },
    // ... (restante das reviews com a mesma estrutura de itemReviewed @type: Product) ...
     {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Juliana Ferreira" },
      "datePublished": "2023-08-03",
      "reviewBody": "Melhor taxa do mercado para antecipação do FGTS...",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "itemReviewed": {
        "@type": "Product",
        "name": "Empréstimo FGTS - Antecipação Saque-Aniversário",
        "url": "https://www.credios.com.br/emprestimo-fgts"
      }
    },
     {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ricardo Oliveira" },
      "datePublished": "2023-09-15",
      "reviewBody": "Atendimento muito bom e processo rápido...",
      "reviewRating": { "@type": "Rating", "ratingValue": "4" },
      "itemReviewed": {
        "@type": "Product",
        "name": "Empréstimo FGTS - Antecipação Saque-Aniversário",
        "url": "https://www.credios.com.br/emprestimo-fgts"
      }
    }
  ]
};

// --- SCHEMA FAQ (Mantido) ---
const faqJsonLd = { /* ... seu schema FAQ ... */ };

// --- SCHEMA HOWTO (Mantido) ---
const processJsonLd = { /* ... seu schema HowTo ... */ };

export default function EmprestimoFGTS() {
  return (
    <>
      {/* JSON-LD para SEO */}
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