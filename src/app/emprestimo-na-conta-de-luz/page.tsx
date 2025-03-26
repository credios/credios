import { Metadata } from "next";
import AdvantagesSection from "@/components/advantagessection"; // Certifique-se que o caminho está correto
import HeroSection from "@/components/herosection"; // Certifique-se que o caminho está correto
import { JsonLd } from "@/components/SEO/JsonLd"; // Certifique-se que o caminho está correto

// Metadados para SEO - mantidos como estavam no original
export const metadata: Metadata = {
  title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
  description: "Solicite empréstimo na conta de luz com aprovação imediata. Até R$ 3.300 sem consulta SPC/Serasa. Receba via PIX em até 24h e pague nas faturas de energia.",
  keywords: "empréstimo na conta de luz, crédito pela conta de energia, empréstimo sem SPC, nome sujo, empréstimo rápido, empréstimo aprovação imediata",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
    description: "Solicite empréstimo usando sua conta de luz como garantia. Aprovação imediata mesmo com nome negativado. Receba até R$ 3.300 via PIX em até 24h.",
    url: "https://credios.com.br/emprestimo-na-conta-de-luz",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        url: "https://credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg", // Verifique se esta imagem existe
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
    images: ["https://credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg"], // Verifique se esta imagem existe
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
    canonical: "https://credios.com.br/emprestimo-na-conta-de-luz",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para FinancialProduct com AggregateRating (CORRIGIDO E MELHORADO)
const financialProductJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Empréstimo na Conta de Luz Credios",
  "description": "Empréstimo usando conta de luz como garantia, sem consulta ao SPC/Serasa, com aprovação em minutos e valores de até R$ 3.300.",
  "url": "https://credios.com.br/emprestimo-na-conta-de-luz",
  "provider": {
    "@type": "Organization",
    "name": "Credios",
    "url": "https://credios.com.br",
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
    // Usando 'amount' para representar o valor máximo do empréstimo
    "amount": {
      "@type": "MonetaryAmount",
      "currency": "BRL",
      "maxValue": 3300
    },
    "availability": "https://schema.org/OnlineOnly", // Mais adequado para produto digital
    "validFrom": "2023-01-01", // Atualize se necessário
  },
  "areaServed": {
    "@type": "AdministrativeArea", // Usando AdministrativeArea para clareza
    "name": [ // Lista de nomes dos estados onde o serviço está disponível
        "Bahia",
        "Ceará",
        "Pernambuco",
        "Rio Grande do Norte",
        "Goiás",
        "São Paulo",
        "Rio de Janeiro",
        "Paraná",
        "Rio Grande do Sul"
    ]
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "minValue": 3.99, // Valor mínimo da taxa
    "maxValue": 6.99, // Valor máximo da taxa
    "unitText": "percent per month", // Especificando que a taxa é mensal (ajuste se for anual: "percent per year")
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9", // O valor da avaliação média
    "bestRating": "5",    // A maior nota possível (geralmente 5)
    "ratingCount": "100", // O número total de avaliações
    // --- CORREÇÃO ESSENCIAL ---
    "itemReviewed": {
      "@type": "FinancialProduct", // Especifica o tipo do item avaliado
      "name": "Empréstimo na Conta de Luz Credios", // Nome do item avaliado (deve corresponder ao nome principal)
      "url": "https://credios.com.br/emprestimo-na-conta-de-luz" // URL do item avaliado
    }
    // --- FIM DA CORREÇÃO ---
  },
  // Propriedade 'brand' recomendada
  "brand": {
    "@type": "Organization",
    "name": "Credios"
  },
  // Propriedade 'loanTerm' recomendada (se aplicável)
  // "loanTerm": {
  //   "@type": "QuantitativeValue",
  //   "minValue": 6,
  //   "maxValue": 24,
  //   "unitCode": "MON" // Código para meses (ou ANN para anos)
  // }
};

// Componente da página
export default function EmprestimoNaContaDeLuz() {
  return (
    <>
      {/* Inclui o JSON-LD corrigido no head da página */}
      <JsonLd data={financialProductJsonLd} />

      {/* Seções do corpo da página (mantidas como no original) */}
      <HeroSection />
      <AdvantagesSection />

      {/* Adicione aqui outras seções ou conteúdo da sua página, se houver */}
    </>
  );
}