import { Metadata } from "next";
import EmprestimoCartao from "@/components/corpoemprestimocartao"; // Componente do corpo da página
import { JsonLd } from "@/components/SEO/JsonLd";

// Metadados para SEO (COM WWW)
export const metadata: Metadata = {
  title: "Empréstimo no Cartão de Crédito | Dinheiro em até 5 minutos | Credios",
  description: "Transforme seu limite do cartão de crédito em dinheiro na conta via Pix em até 5 minutos...",
  keywords: "empréstimo no cartão de crédito, crédito rápido, empréstimo online...",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo no Cartão de Crédito | Dinheiro em até 5 minutos | Credios",
    description: "Transforme seu limite do cartão de crédito em dinheiro na conta via Pix...",
    // --- CORRIGIDO ---
    url: "https://www.credios.com.br/emprestimo-no-cartao-de-credito",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        // --- CORRIGIDO ---
        url: "https://www.credios.com.br/images/og-emprestimo-no-cartao-de-credito.jpg",
        width: 1200,
        height: 630,
        alt: "Empréstimo no Cartão de Crédito Credios",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimo no Cartão de Crédito | Dinheiro em 5 minutos",
    description: "Transforme seu limite do cartão em dinheiro na conta via Pix...",
    // --- CORRIGIDO ---
    images: ["https://www.credios.com.br/images/og-emprestimo-no-cartao-de-credito.jpg"],
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
     // --- CORRIGIDO ---
    canonical: "https://www.credios.com.br/emprestimo-no-cartao-de-credito",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para FinancialProduct (COM WWW)
const finProductJsonLd = {
  "@context": "https://schema.org",
   // Considerar usar "Product" se quiser tentar obter estrelas, como nas outras páginas.
   // FinancialProduct é semanticamente mais correto, mas pode não gerar estrelas.
  "@type": "FinancialProduct",
  "name": "Empréstimo no Cartão de Crédito Credios",
  "description": "Empréstimo rápido utilizando o limite do cartão de crédito...",
  // Adicionando URL principal do produto/página
  "url": "https://www.credios.com.br/emprestimo-no-cartao-de-credito",
  "category": "Empréstimo Pessoal",
  "offers": {
    "@type": "Offer",
    // "price" aqui pode representar um valor exemplo ou máximo. Verificar semântica.
    "price": "1000.00",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/OnlineOnly" // Mudado de InStock
  },
  "interestRate": { // Taxa de juros
    "@type": "QuantitativeValue",
    "value": "1.99", // A taxa *a partir de*
    "minValue": "1.99",
    "maxValue": "6.99", // Exemplo de taxa máxima
    "unitText": "% ao mês" // Adicionando unidade para clareza
  },
  "loanTerm": { // Prazo do empréstimo
    "@type": "QuantitativeValue",
    "minValue": "1", // Mínimo de parcelas
    "maxValue": "12", // Máximo de parcelas
    "unitCode": "MON", // Código para Meses
    "unitText": "meses" // Adicionando unidade para clareza
  },
  "areaServed": { // Área de serviço
     "@type": "Country",
     "name": "BR"
  },
  "provider": { // Organização que oferece
    "@type": "Organization",
    "name": "Credios",
     // --- CORRIGIDO (ATENÇÃO AO CAMINHO '/logo.png') ---
    "logo": "https://www.credios.com.br/logo.png",
     // --- CORRIGIDO ---
    "url": "https://www.credios.com.br"
  },
   // "review" singular geralmente não é usado para rich snippets, prefira "aggregateRating".
   // Se for apenas uma review representativa, ok, mas não gerará estrelas.
   // Para estrelas, use aggregateRating com itemReviewed como fizemos nas outras páginas (e mude @type para Product).
  "review": {
    "@type": "Review",
    "reviewRating": { "@type": "Rating", "ratingValue": "4.9", "bestRating": "5" },
    "author": { "@type": "Person", "name": "Usuários Credios" }
     // Para validação, poderia adicionar "itemReviewed" aqui também,
     // apontando para o FinancialProduct/Product.
  }
   /* Exemplo se fosse usar AggregateRating para estrelas (requer @type: Product acima):
   "aggregateRating": {
     "@type": "AggregateRating",
     "ratingValue": "4.9",
     "bestRating": "5",
     "ratingCount": "500", // Número total de avaliações
     "itemReviewed": {
       "@type": "Product", // Tem que ser Product
       "name": "Empréstimo no Cartão de Crédito Credios",
       "url": "https://www.credios.com.br/emprestimo-no-cartao-de-credito"
     }
   }
   */
};

// Schema JSON-LD para FAQ (sem URLs internas para corrigir)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O empréstimo no cartão de crédito da Credios é realmente seguro?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutamente! A Credios utiliza criptografia..." }
    },
    {
      "@type": "Question",
      "name": "Quais bandeiras de cartão de crédito são aceitas...",
      "acceptedAnswer": { "@type": "Answer", "text": "Trabalhamos com todas as principais bandeiras..." }
    },
    {
      "@type": "Question",
      "name": "Qual o valor máximo de empréstimo que posso solicitar...",
      "acceptedAnswer": { "@type": "Answer", "text": "O valor disponível depende diretamente do seu limite..." }
    },
    {
      "@type": "Question",
      "name": "Em quanto tempo o dinheiro do empréstimo cai na minha conta?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nosso sistema de aprovação é instantâneo e o envio via Pix..." }
    }
  ]
};

// Schema JSON-LD para Process (HowTo) (COM WWW)
const processJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como conseguir um empréstimo no cartão de crédito",
  "description": "Processo passo a passo para obter crédito rápido usando seu cartão...",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Simule em 30 Segundos...",
      "text": "Insira os dados do seu cartão e descubra instantaneamente...",
      // --- CORRIGIDO ---
      "image": "https://www.credios.com.br/images/steps/step1.jpg",
      // --- CORRIGIDO ---
      "url": "https://www.credios.com.br/emprestimo-no-cartao-de-credito#simulacao"
    },
    {
      "@type": "HowToStep",
      "name": "Aprovação Instantânea...",
      "text": "Nossa tecnologia verifica seu cartão em tempo real...",
      // --- CORRIGIDO ---
      "image": "https://www.credios.com.br/images/steps/step2.jpg",
      // --- CORRIGIDO ---
      "url": "https://www.credios.com.br/emprestimo-no-cartao-de-credito#aprovacao"
    },
    {
      "@type": "HowToStep",
      "name": "Receba pelo Pix Imediatamente",
      "text": "O dinheiro cai na sua conta em minutos...",
       // --- CORRIGIDO ---
      "image": "https://www.credios.com.br/images/steps/step3.jpg",
       // --- CORRIGIDO ---
      "url": "https://www.credios.com.br/emprestimo-no-cartao-de-credito#recebimento"
    }
  ],
  "totalTime": "PT10M" // Tempo estimado para completar o processo
};

export default function EmprestimoNoCartaoDeCreditoPage() {
  return (
    <>
      {/* JSON-LD para SEO */}
      <JsonLd data={finProductJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={processJsonLd} />

      {/* Componente principal da página */}
      <EmprestimoCartao />
    </>
  );
}