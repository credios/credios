import { Metadata } from "next";
import AdvantagesSection from "@/components/advantagessection"; // Certifique-se que o caminho está correto
import HeroSection from "@/components/herosection"; // Certifique-se que o caminho está correto
import { JsonLd } from "@/components/SEO/JsonLd"; // Certifique-se que o caminho está correto

// --- METADADOS (JÁ COM WWW) ---
export const metadata: Metadata = {
  title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
  description: "Solicite empréstimo na conta de luz com aprovação imediata. Até R$ 3.300 sem consulta SPC/Serasa. Receba via PIX em até 24h e pague nas faturas de energia.",
  keywords: "empréstimo na conta de luz, crédito pela conta de energia, empréstimo sem SPC, nome sujo, empréstimo rápido, empréstimo aprovação imediata",
  authors: [{ name: "Credios" }],
  openGraph: { /* ... URLs já com www ... */ },
  twitter: { /* ... URLs já com www ... */ },
  robots: { /* ... */ },
  alternates: {
    canonical: "https://www.credios.com.br/emprestimo-na-conta-de-luz",
  },
  viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD ATUALIZADO PARA @type: Product E COM WWW ---
const productContaLuzJsonLd = {
  "@context": "https://schema.org",
  // --- MUDANÇA PRINCIPAL ---
  "@type": "Product",
  // --- FIM DA MUDANÇA ---
  "name": "Empréstimo na Conta de Luz Credios",
  "description": "Empréstimo usando conta de luz como garantia, sem consulta ao SPC/Serasa, com aprovação em minutos e valores de até R$ 3.300.",
  // URL com www
  "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz",
  // Adicionando logo se disponível (use URL com www)
  // "logo": "https://www.credios.com.br/images/logo.png",
  "brand": { // Marca é padrão para Product
    "@type": "Organization",
    "name": "Credios"
  },
  "provider": { // Pode ser "seller" também
    "@type": "Organization",
    "name": "Credios",
    // URL com www
    "url": "https://www.credios.com.br",
  },
  // Offers é compatível com Product
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/OnlineOnly",
    // Definindo o valor máximo usando priceSpecification (mais semântico para Product)
    "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "BRL",
        "maxPrice": 3300 // Indica o valor máximo
        // Se houver um valor mínimo, pode usar "minPrice"
    },
     "areaServed": { // Pode ficar dentro de offers
       "@type": "AdministrativeArea",
       "name": [
            "Bahia", "Ceará", "Pernambuco", "Rio Grande do Norte", "Goiás",
            "São Paulo", "Rio de Janeiro", "Paraná", "Rio Grande do Sul"
       ]
     },
  },
  // 'loanType', 'amount' (direto no objeto), 'interestRate' removidos por não serem padrão de Product
  // AggregateRating é compatível
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "100",
    "itemReviewed": {
      // --- TIPO ALTERADO ---
      "@type": "Product", // Corresponde ao tipo principal
      "name": "Empréstimo na Conta de Luz Credios",
      // URL com www
      "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz"
    }
  },
  // Se houvesse reviews individuais aqui, precisariam do "itemReviewed" também.
};

// Componente da página
export default function EmprestimoNaContaDeLuz() {
  return (
    <>
      {/* Inclui o JSON-LD atualizado (Product com www) */}
      {/* Passando o schema principal renomeado */}
      <JsonLd data={productContaLuzJsonLd} />

      {/* Seções do corpo da página */}
      <HeroSection />
      <AdvantagesSection />

      {/* Adicione aqui outras seções ou conteúdo da sua página, se houver */}
    </>
  );
}