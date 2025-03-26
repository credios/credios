import { Metadata } from "next";
import AdvantagesSection from "@/components/advantagessection"; // Certifique-se que o caminho está correto
import HeroSection from "@/components/herosection"; // Certifique-se que o caminho está correto
import { JsonLd } from "@/components/SEO/JsonLd"; // Certifique-se que o caminho está correto

// --- METADADOS ATUALIZADOS COM WWW ---
export const metadata: Metadata = {
  title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
  description: "Solicite empréstimo na conta de luz com aprovação imediata. Até R$ 3.300 sem consulta SPC/Serasa. Receba via PIX em até 24h e pague nas faturas de energia.",
  keywords: "empréstimo na conta de luz, crédito pela conta de energia, empréstimo sem SPC, nome sujo, empréstimo rápido, empréstimo aprovação imediata",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
    description: "Solicite empréstimo usando sua conta de luz como garantia. Aprovação imediata mesmo com nome negativado. Receba até R$ 3.300 via PIX em até 24h.",
    // URL canônica com www
    url: "https://www.credios.com.br/emprestimo-na-conta-de-luz",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        // URL da imagem com www (verifique se a imagem existe neste caminho)
        url: "https://www.credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg",
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
     // URL da imagem com www (verifique se a imagem existe neste caminho)
    images: ["https://www.credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg"],
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
    // URL canônica com www
    canonical: "https://www.credios.com.br/emprestimo-na-conta-de-luz",
  },
  viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD ATUALIZADO PARA LoanOrCredit E COM WWW ---
const loanOrCreditJsonLd = {
  "@context": "https://schema.org",
  // Alterado para o tipo semanticamente mais correto
  "@type": "LoanOrCredit",
  "name": "Empréstimo na Conta de Luz Credios",
  "description": "Empréstimo usando conta de luz como garantia, sem consulta ao SPC/Serasa, com aprovação em minutos e valores de até R$ 3.300.",
  // URL canônica com www
  "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz",
  // Propriedade recomendada para LoanOrCredit (ajuste se necessário, ex: ConsumerLoan)
  "loanType": "PersonalLoan",
  "amount": { // Propriedade 'amount' é importante para LoanOrCredit
    "@type": "MonetaryAmount",
    "currency": "BRL",
    "maxValue": 3300
  },
  "provider": {
    "@type": "Organization",
    "name": "Credios",
    // URL canônica com www
    "url": "https://www.credios.com.br",
  },
  "offers": { // Offers ainda relevante
    "@type": "Offer",
    "priceCurrency": "BRL", // Mantido para consistência, embora 'amount' seja mais central para Loan
    "availability": "https://schema.org/OnlineOnly",
     "areaServed": {
       "@type": "AdministrativeArea",
       "name": [
            "Bahia", "Ceará", "Pernambuco", "Rio Grande do Norte", "Goiás",
            "São Paulo", "Rio de Janeiro", "Paraná", "Rio Grande do Sul"
       ]
     },
     // "validFrom": "2023-01-01", // Pode remover se não for estritamente uma 'oferta' com data
  },
   "interestRate": { // Taxa de juros continua relevante
    "@type": "QuantitativeValue",
    "minValue": 3.99,
    "maxValue": 6.99,
    "unitText": "percent per month",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "100",
    "itemReviewed": {
      // Alterado para corresponder ao tipo principal
      "@type": "LoanOrCredit",
      "name": "Empréstimo na Conta de Luz Credios", // Nome do item avaliado
       // URL canônica com www
      "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz"
    }
  },
  "brand": { // Marca continua relevante
    "@type": "Organization",
    "name": "Credios"
  },
  // "loanTerm": { // Prazo do empréstimo (adicionar se tiver os dados)
  //   "@type": "QuantitativeValue",
  //   "minValue": 6,
  //   "maxValue": 24,
  //   "unitCode": "MON" // Meses
  // }
};

// Componente da página
export default function EmprestimoNaContaDeLuz() {
  return (
    <>
      {/* Inclui o JSON-LD atualizado (LoanOrCredit com www) */}
      <JsonLd data={loanOrCreditJsonLd} />

      {/* Seções do corpo da página */}
      <HeroSection />
      <AdvantagesSection />

      {/* Adicione aqui outras seções ou conteúdo da sua página, se houver */}
    </>
  );
}