import { Metadata } from "next";
import HeroFgts from "@/components/herofgts";
import SobreCredios from "@/components/sobrecredios";
import CrediosFgtsPage from "@/components/corpofgts";
import { JsonLd } from "@/components/SEO/JsonLd"; // Verifique a implementação deste componente

// --- METADADOS (Mantidos com WWW) ---
export const metadata: Metadata = {
  title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
  description: "Antecipe o saque-aniversário do seu FGTS com as melhores taxas do mercado, contratação 100% digital e dinheiro na conta em até 24h. Simule agora!",
  authors: [{ name: "Credios" }],
  openGraph: {
      title: "Empréstimo FGTS | Antecipação Saque-Aniversário | Credios",
      description: "Antecipe seu FGTS com taxas a partir de 1,49% a.m. Contratação rápida e 100% online.",
      url: "https://www.credios.com.br/emprestimo-fgts",
      siteName: "Credios",
      images: [
          {
              url: "https://www.credios.com.br/images/emprestimo-fgts-og.jpg", // Use URL absoluta
              width: 1200,
              height: 630,
              alt: "Simulação de Empréstimo FGTS na Credios",
          },
      ],
      locale: "pt_BR",
      type: "website",
  },
  twitter: {
      card: "summary_large_image",
      title: "Empréstimo FGTS | Antecipação Saque-Aniversário | Credios",
      description: "Antecipe seu FGTS com taxas a partir de 1,49% a.m. Contratação rápida e 100% online.",
      images: ["https://www.credios.com.br/images/emprestimo-fgts-og.jpg"], // Use URL absoluta
      creator: "@credios", // Se tiver um handle do Twitter
  },
  robots: {
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
  alternates: { canonical: "https://www.credios.com.br/emprestimo-fgts" },
  viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD PRINCIPAL: @type: Product ---
// ATENÇÃO: O erro original indicava falta de offers/review/aggregateRating,
// mas o código JÁ POSSUÍA esses campos. Se o erro persistir após esta correção,
// verifique a implementação do componente <JsonLd /> ou se há outros schemas 'Product' na página.
const productFgtsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product", // Tipo correto para o serviço de empréstimo
  "name": "Empréstimo FGTS - Antecipação Saque-Aniversário",
  "description": "Antecipação do saque-aniversário do FGTS com contratação 100% digital, taxas competitivas e dinheiro rápido na conta.",
  "image": "https://www.credios.com.br/images/emprestimo-fgts-og.jpg",
  "url": "https://www.credios.com.br/emprestimo-fgts",
  "brand": {
    "@type": "Organization",
    "name": "Credios"
  },
  "provider": { // Pode ser mais específico, como "FinancialService" se aplicável
     "@type": "Organization", // Ou "FinancialService"
     "name": "Credios",
     "url": "https://www.credios.com.br"
  },
  "logo": "https://www.credios.com.br/images/logo.png",

  // --- PROPRIEDADES ESSENCIAIS ---

  // Modificado para AggregateOffer e usando priceSpecification para taxa de juros (Exemplo)
  "offers": {
    "@type": "AggregateOffer", // Use AggregateOffer para faixas de preço/taxa ou múltiplas opções
    "priceCurrency": "BRL",
    // "lowPrice": "1.49", // Exemplo: Menor taxa (opcional, mas bom)
    // "highPrice": "2.99", // Exemplo: Maior taxa (opcional)
    "offerCount": 1, // Número de variações da oferta, ajuste se necessário
    "availability": "https://schema.org/OnlineOnly",
    "areaServed": { "@type": "Country", "name": "BR" },
    "url": "https://www.credios.com.br/emprestimo-fgts", // URL específica da oferta/produto
    "seller": { "@type": "Organization", "name": "Credios" },
    // Exemplo de como especificar a taxa de juros (AJUSTE OS VALORES REAIS)
    "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceType": "InterestRate", // Indica que é uma taxa de juros
        "price": "1.49", // Exemplo: Taxa de juros a partir de (valor numérico como string ou number)
        "priceCurrency": "BRL", // Moeda
        "referenceQuantity": { // Descreve a base da taxa (ex: por mês)
          "@type": "QuantitativeValue",
          "value": 1,
          "unitText": "mês" // Ou use unitCode: "MON"
        }
     }
  },

  // Atualizado conforme solicitado
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9", // <-- ATUALIZADO
    "bestRating": "5",
    "ratingCount": "150", // <-- ATUALIZADO
    // "itemReviewed" não é necessário dentro de aggregateRating quando já está no Product principal
  },

  // Mantido com os exemplos existentes, como solicitado
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Marcelo Santos (Exemplo)" },
      "datePublished": "2023-07-10",
      "reviewBody": "Consegui antecipar meu FGTS com muita facilidade e a taxa foi ótima. Recomendo!",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      // "itemReviewed" não é necessário dentro de review quando já está no Product principal
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Juliana Ferreira (Exemplo)" },
      "datePublished": "2023-08-03",
      "reviewBody": "Melhor taxa do mercado que encontrei para antecipar o FGTS. Processo todo online.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    },
      {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ricardo Oliveira (Exemplo)" },
      "datePublished": "2023-09-15",
      "reviewBody": "Atendimento muito bom, tiraram todas as minhas dúvidas antes de contratar.",
      "reviewRating": { "@type": "Rating", "ratingValue": "4" },
    }
  ]
  // --- FIM DAS PROPRIEDADES ESSENCIAIS ---
};

// --- SCHEMA FAQ (Defina seu objeto FAQ aqui se não estiver importando) ---
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como funciona a Antecipação Saque-Aniversário FGTS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Antecipação Saque-Aniversário permite adiantar parcelas anuais do seu Saque-Aniversário FGTS. O valor é creditado na sua conta e as parcelas futuras do FGTS são usadas como garantia, sem comprometer sua renda mensal."
      }
    },
    {
      "@type": "Question",
      "name": "Quais são as taxas de juros?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As taxas de juros do Empréstimo FGTS na Credios são competitivas, a partir de 1,49% ao mês. A taxa exata depende da análise individual e do número de parcelas antecipadas."
      }
    },
    // Adicione outras perguntas frequentes aqui...
     {
      "@type": "Question",
      "name": "Quem pode contratar o Empréstimo FGTS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Qualquer trabalhador com saldo em contas ativas ou inativas do FGTS que tenha optado pela modalidade Saque-Aniversário pode contratar, desde que possua saldo suficiente para cobrir o valor do empréstimo e os encargos."
      }
    }
  ]
};

// --- SCHEMA HOWTO (Defina seu objeto HowTo aqui se não estiver importando) ---
const processJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como contratar a Antecipação Saque-Aniversário FGTS na Credios",
  "description": "Passo a passo para antecipar seu FGTS de forma rápida e online.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Simule e Escolha o Valor",
      "text": "Acesse o site da Credios, informe o valor desejado e veja as condições de antecipação.",
      "url": "https://www.credios.com.br/emprestimo-fgts#simulacao", // Link para a seção de simulação, se houver
      "image": "https://www.credios.com.br/images/step1-simulacao.jpg" // Imagem ilustrativa do passo 1
    },
    {
      "@type": "HowToStep",
      "name": "Autorize a Consulta",
      "text": "No app FGTS da Caixa, autorize a Credios (ou o banco parceiro indicado) a consultar seu saldo.",
      "image": "https://www.credios.com.br/images/step2-autorizacao.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Complete a Proposta",
      "text": "Preencha seus dados e envie a proposta online.",
      "image": "https://www.credios.com.br/images/step3-proposta.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Receba o Dinheiro",
      "text": "Após a aprovação, o dinheiro é depositado na sua conta bancária em até 24 horas úteis.",
      "image": "https://www.credios.com.br/images/step4-dinheiro.jpg"
    }
  ],
  "totalTime": "PT10M" // Tempo estimado para completar o processo (ex: 10 minutos)
};


export default function EmprestimoFGTS() {
  return (
    <>
      {/* --- JSON-LD --- */}
      {/* Verifique se este componente renderiza o script corretamente */}
      <JsonLd data={productFgtsJsonLd} />
      {/* Renderize outros schemas SE ELES NÃO ESTIVEREM JÁ INCLUÍDOS DENTRO DO Product ou se forem independentes */}
      <JsonLd data={faqJsonLd} />
      <JsonLd data={processJsonLd} />

      {/* --- Componentes da página --- */}
      <HeroFgts />
      <CrediosFgtsPage />
      <SobreCredios />
    </>
  );
}