import { Metadata } from "next";
import HeroFgts from "@/components/herofgts";
import SobreCredios from "@/components/sobrecredios";
import CrediosFgtsPage from "@/components/corpofgts";
import { JsonLd } from "@/components/SEO/JsonLd";

// --- METADADOS ATUALIZADOS COM WWW ---
export const metadata: Metadata = {
  title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
  description: "Antecipe o saque-aniversário do seu FGTS com as melhores taxas do mercado. Dinheiro rápido, processo 100% digital, sem comprometer sua renda mensal. Simule agora!",
  keywords: "empréstimo FGTS, antecipação saque-aniversário, empréstimo digital, melhores taxas FGTS, antecipação FGTS sem comprometer renda, crédito FGTS aprovação rápida, empréstimo rápido FGTS, antecipação FGTS online",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo FGTS | Antecipação do Saque-Aniversário | Credios",
    description: "Antecipe até R$ 20.000 do seu saque-aniversário com as melhores taxas. Compare bancos, escolha a melhor oferta e receba no mesmo dia via PIX. Simule agora!",
    // URL com WWW
    url: "https://www.credios.com.br/emprestimo-fgts",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        // URL com WWW (verifique se existe)
        url: "https://www.credios.com.br/images/emprestimo-fgts-og.jpg",
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
     // URL com WWW (verifique se existe)
    images: ["https://www.credios.com.br/images/emprestimo-fgts-og.jpg"],
  },
  robots: {
    index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, },
  },
  alternates: {
    // URL com WWW
    canonical: "https://www.credios.com.br/emprestimo-fgts",
  },
  viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD PRINCIPAL: ALTERADO PARA @type: Product ---
const productFgtsJsonLd = {
  "@context": "https://schema.org",
  // --- MUDANÇA PRINCIPAL ---
  "@type": "Product",
  // --- FIM DA MUDANÇA ---
  "name": "Empréstimo FGTS Credios",
  "description": "Antecipação do saque-aniversário do FGTS com as melhores taxas do mercado. Dinheiro rápido, processo 100% digital, sem comprometer sua renda mensal.",
  // URL com WWW
  "url": "https://www.credios.com.br/emprestimo-fgts",
  // Logo com WWW (se aplicável)
  "logo": "https://www.credios.com.br/images/logo.png",
  // Adicionando Brand (recomendado para Product)
   "brand": {
    "@type": "Organization",
    "name": "Credios"
  },
   // Provider pode ser usado como 'seller' ou 'manufacturer' em Product, mantendo Organization
   "provider": { // Ou "seller"
    "@type": "Organization",
    "name": "Credios",
     // URL com WWW
    "url": "https://www.credios.com.br",
  },
  // Offers é compatível com Product
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
    // 'price' em Offer geralmente indica um preço fixo.
    // Para um valor máximo, usar priceSpecification pode ser melhor, mas 'price' pode funcionar.
    "price": "20000", // Mantido, mas interprete como valor máximo possível talvez
    "availability": "https://schema.org/OnlineOnly", // Alterado de InStock
     "areaServed": { // Movido para dentro de Offers (mais comum para Product)
      "@type": "Country",
      "name": "Brasil",
    },
    // "validFrom": "2023-01-01", // Pode manter ou remover
  },
  // 'interestRate' e 'feesAndCommissionsSpecification' não são padrão para Product, removidos para evitar warnings.

  // Review continua compatível
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Marcelo Santos" },
      "datePublished": "2023-07-10",
      "reviewBody": "Consegui antecipar meu FGTS com muita facilidade...",
      // --- ADICIONADO itemReviewed ---
      "itemReviewed": {
        "@type": "Product", // Corresponde ao tipo principal
        "name": "Empréstimo FGTS Credios",
        "url": "https://www.credios.com.br/emprestimo-fgts" // URL com WWW
      }
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Juliana Ferreira" },
      "datePublished": "2023-08-03",
      "reviewBody": "Melhor taxa do mercado para antecipação do FGTS...",
      // --- ADICIONADO itemReviewed ---
       "itemReviewed": {
        "@type": "Product",
        "name": "Empréstimo FGTS Credios",
        "url": "https://www.credios.com.br/emprestimo-fgts"
      }
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Ricardo Oliveira" },
      "datePublished": "2023-09-15",
      "reviewBody": "Atendimento muito bom e processo rápido...",
       // --- ADICIONADO itemReviewed ---
       "itemReviewed": {
        "@type": "Product",
        "name": "Empréstimo FGTS Credios",
        "url": "https://www.credios.com.br/emprestimo-fgts"
      }
    }
  ],
  // AggregateRating continua compatível
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "ratingCount": "120",
    // --- ADICIONADO itemReviewed (e tipo ajustado) ---
    "itemReviewed": {
        "@type": "Product", // Corresponde ao tipo principal
        "name": "Empréstimo FGTS Credios",
        "url": "https://www.credios.com.br/emprestimo-fgts" // URL com WWW
      }
    // reviewCount removido por redundância com ratingCount
  },
};

// --- Schema JSON-LD para FAQ (sem alterações, exceto URLs internas se houver) ---
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    // ... (Mantenha suas perguntas e respostas) ...
    // Exemplo de verificação de URL interna:
     {
       "@type": "Question",
       "name": "O empréstimo afeta meu score de crédito?",
       "acceptedAnswer": {
         "@type": "Answer",
         "text": "Não...",
       },
     },
  ],
};

// --- Schema JSON-LD para Process (HowTo) (sem alterações, exceto URLs internas) ---
const processJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como antecipar o saque-aniversário do FGTS",
  "description": "Processo passo a passo para antecipar seu saque-aniversário do FGTS pela Credios",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Simulação personalizada",
      "text": "Informe seu CPF...",
       // URL com WWW (verifique se existe)
      "image": "https://www.credios.com.br/images/steps/step1.jpg",
       // URL com WWW
      "url": "https://www.credios.com.br/emprestimo-fgts#simulacao",
    },
    {
      "@type": "HowToStep",
      "name": "Documentação digital",
      "text": "Envie seus documentos...",
       // URL com WWW (verifique se existe)
      "image": "https://www.credios.com.br/images/steps/step2.jpg",
       // URL com WWW
      "url": "https://www.credios.com.br/emprestimo-fgts#documentacao",
    },
     {
      "@type": "HowToStep",
      "name": "Escolha do banco",
      "text": "Compare as ofertas...",
       // URL com WWW (verifique se existe)
      "image": "https://www.credios.com.br/images/steps/step3.jpg",
      // URL com WWW
      "url": "https://www.credios.com.br/emprestimo-fgts#banco",
    },
     {
      "@type": "HowToStep",
      "name": "Dinheiro no PIX",
      "text": "Após a aprovação...",
      // URL com WWW (verifique se existe)
      "image": "https://www.credios.com.br/images/steps/step4.jpg",
      // URL com WWW
      "url": "https://www.credios.com.br/emprestimo-fgts#dinheiro",
    },
  ],
  "totalTime": "PT30M", // Tempo total estimado
};

export default function EmprestimoFGTS() {
  return (
    <>
      {/* JSON-LD para SEO */}
      {/* Passando o schema principal renomeado */}
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