import { Metadata } from "next";
import AdvantagesSection from "@/components/advantagessection";
import HeroSection from "@/components/herosection";
import { JsonLd } from "@/components/SEO/JsonLd";

// --- METADADOS (Mantidos com WWW) ---
export const metadata: Metadata = {
  title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
  description: "Solicite empréstimo na conta de luz com aprovação imediata. Até R$ 3.300 sem consulta SPC/Serasa. Receba via PIX em até 24h e pague nas faturas de energia.",
  // ... (keywords, authors, openGraph com www, twitter com www, robots, alternates com www, viewport) ...
   authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
    description: "Solicite empréstimo usando sua conta de luz como garantia...",
    url: "https://www.credios.com.br/emprestimo-na-conta-de-luz", // WWW
    siteName: "Credios - Soluções de Crédito Digital",
    images: [ { url: "https://www.credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg", width: 1200, height: 630, alt: "Empréstimo na Conta de Luz Credios" } ], // WWW
    locale: "pt_BR", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
    description: "Solicite empréstimo usando sua conta de luz...",
    images: ["https://www.credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg"], // WWW
  },
   robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, }, },
   alternates: { canonical: "https://www.credios.com.br/emprestimo-na-conta-de-luz" }, // WWW
   viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD PRINCIPAL: REVERTIDO PARA @type: Product COM itemReviewed ---
const productContaLuzJsonLd = {
  "@context": "https://schema.org",
   // --- TIPO REVERTIDO ---
  "@type": "Product",
  "name": "Empréstimo na Conta de Luz", // Exatamente como no código antigo
  "description": "Empréstimo pessoal com garantia na fatura de energia elétrica. Contrate até R$ 3.300,00 online, sem burocracia, mesmo negativado. Parcelas na fatura de energia.",
   // Usando a URL de imagem do seu código antigo (verifique se ainda é válida ou atualize)
  "image": "https://cdn.prod.website-files.com/677096e27c3c8331cff29391/67c1dcd28a15baff9aa6a7f9_emprestimo-conta-de-luz-2.webp",
  "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz", // WWW
  "brand": { // Exatamente como no código antigo
    "@type": "Organization", // Mudado para Organization para robustez
    "name": "Credios"
  },
  "logo": "https://www.credios.com.br/images/logo.png", // WWW - Adicionado logo
   // Offers como no código antigo, mas com areaServed e seller
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
    "price": "3300.00", // Valor máximo, como antes
    "availability": "https://schema.org/OnlineOnly", // Mudado de InStock para OnlineOnly
     "areaServed": { // Área coberta pela oferta (importante adicionar)
       "@type": "AdministrativeArea",
       "name": [ "BA", "CE", "PE", "RN", "GO", "SP", "RJ", "PR", "RS" ]
     },
      "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz", // URL da oferta
     "seller": { // Quem vende/oferece
        "@type": "Organization",
        "name": "Credios"
      }
  },
  // AggregateRating com itemReviewed CORRETO
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9", // Como antes
    "reviewCount": "100", // Ajustado para o valor que você tinha no schema Service (ou use 50 como antes, se preferir)
    "bestRating": "5", // Como antes
    // "worstRating": "1", // Opcional, pode remover
    "itemReviewed": { // Aponta para o Product principal
      // --- TIPO CORRIGIDO ---
      "@type": "Product",
      "name": "Empréstimo na Conta de Luz",
      "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz" // WWW
    }
  },
   // Se tivesse reviews individuais, precisariam de itemReviewed apontando para Product.
};

// Se você tiver um Schema de FAQ para esta página, pode adicioná-lo aqui também
// const faqContaLuzJsonLd = { ... };

export default function EmprestimoNaContaDeLuz() {
  return (
    <>
      {/* Inclui o JSON-LD atualizado (Product com www e itemReviewed) */}
      <JsonLd data={productContaLuzJsonLd} />
      {/* Se tiver FAQ: <JsonLd data={faqContaLuzJsonLd} /> */}

      {/* Seções do corpo da página */}
      <HeroSection />
      <AdvantagesSection />

      {/* Adicione aqui outras seções ou conteúdo da sua página, se houver */}
    </>
  );
}