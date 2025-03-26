import { Metadata } from "next";
import AdvantagesSection from "@/components/advantagessection"; // Verifique este componente
import HeroSection from "@/components/herosection"; // Verifique este componente
import { JsonLd } from "@/components/SEO/JsonLd"; // Verifique a implementação deste componente

// --- METADADOS (Mantidos com WWW) ---
export const metadata: Metadata = {
  title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
  description: "Solicite empréstimo na conta de luz com aprovação rápida, mesmo negativado. Contrate online e pague junto com sua fatura de energia. Simule agora!",
  authors: [{ name: "Credios" }],
  openGraph: {
      title: "Empréstimo na Conta de Luz | Dinheiro Rápido | Credios",
      description: "Precisando de dinheiro? Empréstimo na conta de luz com taxas competitivas e aprovação facilitada. Até R$ 3.300.",
      url: "https://www.credios.com.br/emprestimo-na-conta-de-luz",
      siteName: "Credios",
      images: [
          {
              // Verifique se esta URL está correta e acessível
              url: "https://cdn.prod.website-files.com/677096e27c3c8331cff29391/67c1dcd28a15baff9aa6a7f9_emprestimo-conta-de-luz-2.webp",
              width: 1200, // Ajuste se necessário
              height: 630, // Ajuste se necessário
              alt: "Mulher sorrindo usando celular para simular empréstimo na conta de luz",
          },
      ],
      locale: "pt_BR",
      type: "website",
  },
  twitter: {
      card: "summary_large_image",
      title: "Empréstimo na Conta de Luz | Dinheiro Rápido | Credios",
      description: "Precisando de dinheiro? Empréstimo na conta de luz com taxas competitivas e aprovação facilitada.",
      // Verifique se esta URL está correta e acessível
      images: ["https://cdn.prod.website-files.com/677096e27c3c8331cff29391/67c1dcd28a15baff9aa6a7f9_emprestimo-conta-de-luz-2.webp"],
      creator: "@credios", // Se tiver
  },
   robots: { // Mantido como no exemplo anterior
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: "https://www.credios.com.br/emprestimo-na-conta-de-luz" },
  viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD PRINCIPAL: @type: Product ---
// ATENÇÃO: O erro original indicava falta de offers/review/aggregateRating,
// mas o código JÁ POSSUÍA 'offers' e 'aggregateRating'. Se o erro persistir,
// o problema provavelmente está no componente <JsonLd /> ou em schemas 'Product'
// gerados pelos componentes <HeroSection /> ou <AdvantagesSection />.
const productContaLuzJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product", // Ou "Service" ou "FinancialProduct", dependendo da especificidade desejada
  "name": "Empréstimo na Conta de Luz",
  "description": "Empréstimo pessoal com débito na fatura de energia elétrica. Rápido, fácil e disponível mesmo para negativados em algumas regiões.",
   // Verifique se esta URL está correta e acessível
  "image": "https://cdn.prod.website-files.com/677096e27c3c8331cff29391/67c1dcd28a15baff9aa6a7f9_emprestimo-conta-de-luz-2.webp",
  "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz",
  "brand": {
    "@type": "Organization",
    "name": "Credios"
  },
  "logo": "https://www.credios.com.br/images/logo.png",
  "provider": { // Adicionado para indicar quem fornece o serviço
       "@type": "Organization",
       "name": "Credios", // Ou o nome do parceiro financeiro, se aplicável
       "url": "https://www.credios.com.br"
    },

  // --- PROPRIEDADES ESSENCIAIS ---

  // Reestruturado para AggregateOffer e priceSpecification (Exemplo)
  "offers": {
    "@type": "AggregateOffer", // Mais adequado para empréstimos com condições variáveis
    "priceCurrency": "BRL",
    // "lowPrice": "500.00", // Exemplo: Valor mínimo do empréstimo
    "highPrice": "3300.00", // Exemplo: Valor máximo do empréstimo (pode ser usado aqui ou como parte de 'loanAmount')
    "offerCount": 1, // Ajuste se houver múltiplas variantes
    "availability": "https://schema.org/OnlineOnly",
    "areaServed": { // Mantido como estava
       "@type": "AdministrativeArea",
       // Verifique se estes são os locais corretos onde o serviço é oferecido
       "name": [ "BA", "CE", "PE", "RN", "GO", "SP", "RJ", "PR", "RS" ]
     },
    "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz",
    "seller": { "@type": "Organization", "name": "Credios" },
    // Exemplo de especificação de taxa (AJUSTE OS VALORES REAIS)
     "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceType": "InterestRate",
        "price": "14.9", // Exemplo: Taxa de juros a partir de (valor numérico como string ou number)
        "priceCurrency": "BRL",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": 1,
          "unitText": "mês" // Ou use unitCode: "MON"
        }
     },
     // Poderia adicionar também "loanTerm" para o prazo, "loanAmount" para o montante
  },

  // Alterado reviewCount para ratingCount
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "100", // <-- ALTERADO de reviewCount para ratingCount (padrão schema.org)
    "bestRating": "5",
    // "itemReviewed" não é estritamente necessário aqui se já está no Product principal
  },

  // Se tiver reviews individuais para esta página, adicione a propriedade "review": [{...}, {...}] aqui.
  // "review": [ { "@type": "Review", ... } ]

  // --- FIM DAS PROPRIEDADES ESSENCIAIS ---
};

// Se tiver FAQ para esta página:
// const faqContaLuzJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", ... };

export default function EmprestimoNaContaDeLuz() {
  return (
    <>
      {/* --- JSON-LD --- */}
      {/* Passo 1: Verifique se este componente funciona como esperado */}
      <JsonLd data={productContaLuzJsonLd} />
      {/* Se tiver FAQ: <JsonLd data={faqContaLuzJsonLd} /> */}

      {/* --- Componentes da página --- */}
      {/* Passo 2: Verifique se <HeroSection/> ou <AdvantagesSection/> geram schemas 'Product' */}
      <HeroSection />
      <AdvantagesSection />
    </>
  );
}