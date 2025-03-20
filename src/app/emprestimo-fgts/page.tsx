import { Metadata } from "next";
import HeroFgts from "@/components/herofgts";
import SobreCredios from "@/components/sobrecredios";
import CrediosFgtsPage from "@/components/corpofgts";
import { JsonLd } from "@/components/SEO/JsonLd";

// Metadados para SEO
export const metadata: Metadata = {
  title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
  description: "Antecipe o saque-aniversário do seu FGTS com as melhores taxas do mercado. Dinheiro rápido, processo 100% digital, sem comprometer sua renda mensal. Simule agora!",
  keywords: "empréstimo FGTS, antecipação saque-aniversário, empréstimo digital, melhores taxas FGTS, antecipação FGTS sem comprometer renda, crédito FGTS aprovação rápida, empréstimo rápido FGTS, antecipação FGTS online",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
    description: "Antecipe até R$ 20.000 do seu saque-aniversário com as melhores taxas. Compare bancos, escolha a melhor oferta e receba no mesmo dia via PIX. Simule agora!",
    url: "https://credios.com.br/emprestimo-fgts",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        url: "https://credios.com.br/images/emprestimo-fgts-og.jpg",
        width: 1200,
        height: 630,
        alt: "Empréstimo FGTS Credios",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
    description: "Antecipe seu saque-aniversário com as melhores taxas. Compare ofertas e receba no mesmo dia via PIX.",
    images: ["https://credios.com.br/images/emprestimo-fgts-og.jpg"],
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
    canonical: "https://credios.com.br/emprestimo-fgts",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para FinancialProduct
const finProductJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Empréstimo FGTS Credios",
  "description": "Antecipação do saque-aniversário do FGTS com as melhores taxas do mercado. Dinheiro rápido, processo 100% digital, sem comprometer sua renda mensal.",
  "url": "https://credios.com.br/emprestimo-fgts",
  "provider": {
    "@type": "Organization",
    "name": "Credios",
    "url": "https://credios.com.br",
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
    "price": "20000",
    "availability": "https://schema.org/InStock",
    "validFrom": "2023-01-01", // Adicionado para maior clareza
  },
  "areaServed": {
    "@type": "Country",
    "name": "Brasil",
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "value": "1.49",
    "minValue": "1.49",
    "maxValue": "2.99",
    "unitText": "percent", // Adicionado para especificar a unidade
  },
  "feesAndCommissionsSpecification": "Sem taxas de abertura de crédito. Juros a partir de 1,49% ao mês.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "ratingCount": "120", // Mantido como está
  },
};

// Schema JSON-LD para FAQ
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o empréstimo com garantia do FGTS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É uma modalidade de empréstimo que utiliza os saques-aniversário futuros do seu FGTS como garantia. Você consegue antecipar até 10 parcelas do saque-aniversário, recebendo o valor hoje, e as parcelas são quitadas automaticamente com seus saques anuais futuros.",
      },
    },
    {
      "@type": "Question",
      "name": "Preciso estar com a modalidade saque-aniversário ativada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, é necessário estar com a modalidade saque-aniversário ativada no seu FGTS. Caso você ainda esteja na modalidade saque-rescisão, podemos ajudá-lo a fazer a troca diretamente pelo nosso aplicativo durante o processo de contratação.",
      },
    },
    {
      "@type": "Question",
      "name": "Qual o valor máximo que posso antecipar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O valor máximo depende do seu saldo no FGTS e da quantidade de parcelas antecipadas, podendo chegar a R$ 20.000,00 para quem tem saldo suficiente. Nossa simulação calcula automaticamente o valor máximo disponível para você.",
      },
    },
    {
      "@type": "Question",
      "name": "O empréstimo afeta meu score de crédito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não, como a garantia é seu FGTS, esse tipo de empréstimo geralmente não impacta seu score de crédito e não compromete sua margem consignável em outros empréstimos. É uma linha de crédito totalmente separada do seu comprometimento de renda.",
      },
    },
  ],
};

// Schema JSON-LD para Process (HowTo)
const processJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como antecipar o saque-aniversário do FGTS",
  "description": "Processo passo a passo para antecipar seu saque-aniversário do FGTS pela Credios",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Simulação personalizada",
      "text": "Informe seu CPF e data de nascimento para descobrir quanto você pode receber antecipando seu FGTS",
      "image": "https://credios.com.br/images/steps/step1.jpg",
      "url": "https://credios.com.br/emprestimo-fgts#simulacao",
    },
    {
      "@type": "HowToStep",
      "name": "Documentação digital",
      "text": "Envie seus documentos pelo celular e autorize a consulta ao seu FGTS com apenas alguns cliques",
      "image": "https://credios.com.br/images/steps/step2.jpg",
      "url": "https://credios.com.br/emprestimo-fgts#documentacao",
    },
    {
      "@type": "HowToStep",
      "name": "Escolha do banco",
      "text": "Compare as ofertas de diferentes bancos e escolha a que oferece as melhores condições para você",
      "image": "https://credios.com.br/images/steps/step3.jpg",
      "url": "https://credios.com.br/emprestimo-fgts#banco",
    },
    {
      "@type": "HowToStep",
      "name": "Dinheiro no PIX",
      "text": "Após a aprovação, o dinheiro é transferido via PIX diretamente para sua conta em minutos",
      "image": "https://credios.com.br/images/steps/step4.jpg",
      "url": "https://credios.com.br/emprestimo-fgts#dinheiro",
    },
  ],
  "totalTime": "PT30M",
};

export default function EmprestimoFGTS() {
  return (
    <>
      {/* JSON-LD para SEO - Removido o reviewJsonLd */}
      <JsonLd data={finProductJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={processJsonLd} />

      {/* Componentes da página */}
      <HeroFgts />
      <CrediosFgtsPage />
      <SobreCredios />
    </>
  );
}