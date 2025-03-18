import { Metadata } from "next";
import EmprestimoCartao from "@/components/corpoemprestimocartao";
import { JsonLd } from "@/components/SEO/JsonLd";

// Metadados para SEO
export const metadata: Metadata = {
  title: "Empréstimo no Cartão de Crédito | Dinheiro em até 5 minutos | Credios",
  description: "Transforme seu limite do cartão de crédito em dinheiro na conta via Pix em até 5 minutos. Taxas a partir de 1,99% ao mês, sem burocracia e 100% online. Simule agora!",
  keywords: "empréstimo no cartão de crédito, crédito rápido, empréstimo online, empréstimo sem burocracia, empréstimo com cartão, empréstimo imediato, dinheiro via pix",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo no Cartão de Crédito | Dinheiro em até 5 minutos | Credios",
    description: "Transforme seu limite do cartão de crédito em dinheiro na conta via Pix em até 5 minutos. Taxas a partir de 1,99% ao mês, aprovação instantânea.",
    url: "https://credios.com.br/emprestimo-no-cartao-de-credito",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        url: "https://credios.com.br/images/og-emprestimo-no-cartao-de-credito.jpg",
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
    description: "Transforme seu limite do cartão em dinheiro na conta via Pix em até 5 minutos. Simule agora!",
    images: ["https://credios.com.br/images/og-emprestimo-no-cartao-de-credito.jpg"],
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
    canonical: "https://credios.com.br/emprestimo-no-cartao-de-credito",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para FinancialProduct
const finProductJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Empréstimo no Cartão de Crédito Credios",
  "description": "Empréstimo rápido utilizando o limite do cartão de crédito com aprovação em minutos",
  "category": "Empréstimo Pessoal",
  "offers": {
    "@type": "Offer",
    "price": "1000.00",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock"
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "value": "1.99",
    "minValue": "1.99",
    "maxValue": "6.99"
  },
  "loanTerm": {
    "@type": "QuantitativeValue",
    "minValue": "1",
    "maxValue": "12",
    "unitCode": "MON"
  },
  "areaServed": "BR",
  "provider": {
    "@type": "Organization",
    "name": "Credios",
    "logo": "https://credios.com.br/logo.png",
    "url": "https://credios.com.br"
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.9",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Usuários Credios"
    }
  }
};

// Schema JSON-LD para FAQ
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O empréstimo no cartão de crédito da Credios é realmente seguro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutamente! A Credios utiliza criptografia de nível bancário para proteger cada transação. Seus dados são armazenados em ambiente seguro, com certificações internacionais de segurança e proteção contra vazamentos. Milhares de brasileiros já confiam em nosso sistema diariamente."
      }
    },
    {
      "@type": "Question",
      "name": "Quais bandeiras de cartão de crédito são aceitas para o empréstimo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trabalhamos com todas as principais bandeiras: Visa, Mastercard, Elo e American Express. Mesmo cartões de bancos digitais são aceitos! Basta iniciar a simulação para verificar se o seu cartão está apto para o empréstimo imediato."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o valor máximo de empréstimo que posso solicitar no meu cartão?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O valor disponível para empréstimo depende diretamente do seu limite disponível no cartão de crédito. Durante a simulação, nossa tecnologia verifica automaticamente e mostra quanto você pode receber, que pode chegar até 95% do seu limite disponível. Muitos clientes conseguem valores entre R$1.000 e R$15.000 rapidamente."
      }
    },
    {
      "@type": "Question",
      "name": "Em quanto tempo o dinheiro do empréstimo cai na minha conta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nosso sistema de aprovação é instantâneo e o envio do dinheiro é feito via Pix, o que significa que você recebe o valor em minutos após a aprovação. A grande maioria dos nossos clientes relata recebimento em menos de 5 minutos! É o empréstimo mais rápido do mercado."
      }
    }
  ]
};

// Schema JSON-LD para Process (HowTo)
const processJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como conseguir um empréstimo no cartão de crédito",
  "description": "Processo passo a passo para obter crédito rápido usando seu cartão de crédito",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Simule em 30 Segundos e Descubra Seu Limite",
      "text": "Insira os dados do seu cartão e descubra instantaneamente quanto crédito você pode ter. Sem afetar seu score de crédito!",
      "image": "https://credios.com.br/images/steps/step1.jpg",
      "url": "https://credios.com.br/emprestimo-no-cartao-de-credito#simulacao"
    },
    {
      "@type": "HowToStep",
      "name": "Aprovação Instantânea Garantida",
      "text": "Nossa tecnologia verifica seu cartão em tempo real e aprova seu crédito na hora. Sem análise manual, sem demora!",
      "image": "https://credios.com.br/images/steps/step2.jpg",
      "url": "https://credios.com.br/emprestimo-no-cartao-de-credito#aprovacao"
    },
    {
      "@type": "HowToStep",
      "name": "Receba pelo Pix Imediatamente",
      "text": "O dinheiro cai na sua conta em minutos, pronto para usar como quiser. Sem esperar dias ou horas como nos bancos tradicionais!",
      "image": "https://credios.com.br/images/steps/step3.jpg",
      "url": "https://credios.com.br/emprestimo-no-cartao-de-credito#recebimento"
    }
  ],
  "totalTime": "PT10M"
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