import { Metadata } from "next";
import Emprestimos from "@/components/emprestimos";
import { JsonLd } from "@/components/SEO/JsonLd";

// Metadados para SEO
export const metadata: Metadata = {
  title: "Empréstimos Online | Opções para Todos os Perfis | Credios",
  description: "Compare e solicite empréstimos online para seu perfil: conta de luz, FGTS, cartão de crédito, consignado, pessoal e para negativados. Aprovação rápida e 100% digital.",
  keywords: "empréstimos online, crédito pessoal, empréstimo conta de luz, empréstimo FGTS, empréstimo para negativados, empréstimo consignado, empréstimo no cartão de crédito",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimos Online | Compare e Escolha a Melhor Opção | Credios",
    description: "Descubra as melhores opções de empréstimo para seu perfil. Aprovação rápida, processo 100% digital e ótimas taxas. Compare e solicite agora!",
    url: "https://credios.com.br/emprestimos",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        url: "https://credios.com.br/images/emprestimos-og.jpg",
        width: 1200,
        height: 630,
        alt: "Soluções de Empréstimos Online Credios",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimos Online | Compare e Escolha a Melhor Opção | Credios",
    description: "Descubra as melhores opções de empréstimo para seu perfil. Processo 100% digital e ótimas taxas.",
    images: ["https://credios.com.br/images/emprestimos-og.jpg"],
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
    canonical: "https://credios.com.br/emprestimos",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para organização e produtos financeiros
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Credios",
  "url": "https://credios.com.br",
  "logo": "https://credios.com.br/logo.png",
  "description": "Plataforma digital de empréstimos com soluções personalizadas para cada necessidade",
  "sameAs": [
    "https://www.facebook.com/credios",
    "https://www.instagram.com/credios",
    "https://api.whatsapp.com/send?phone=552130300606"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+552130300606",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rio de Janeiro",
    "addressRegion": "RJ",
    "addressCountry": "BR"
  }
};

// Schema JSON-LD para ItemList (lista de produtos)
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Empréstimo na Conta de Luz",
        "url": "https://credios.com.br/emprestimo-na-conta-de-luz",
        "description": "Use sua conta de energia para conseguir até R$3.300, mesmo com nome negativado",
        "provider": {
          "@type": "Organization",
          "name": "Credios"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Empréstimo FGTS",
        "url": "https://credios.com.br/emprestimo-fgts",
        "description": "Antecipe seu saque-aniversário do FGTS com as melhores condições do mercado",
        "provider": {
          "@type": "Organization",
          "name": "Credios"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Empréstimo no Cartão de Crédito",
        "url": "https://credios.com.br/emprestimo-no-cartao-de-credito",
        "description": "Transforme seu limite em dinheiro na conta em minutos, com taxas a partir de 1,99% a.m.",
        "provider": {
          "@type": "Organization",
          "name": "Credios"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Empréstimo para Negativados",
        "url": "https://credios.com.br/emprestimos/emprestimo-para-negativado",
        "description": "Soluções de crédito específicas para quem está com restrições no nome",
        "provider": {
          "@type": "Organization",
          "name": "Credios"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Service",
        "name": "Empréstimo Consignado",
        "url": "https://credios.com.br/emprestimos/emprestimo-consignado",
        "description": "Crédito com desconto em folha para aposentados, pensionistas e servidores públicos",
        "provider": {
          "@type": "Organization",
          "name": "Credios"
        }
      }
    }
  ]
};

// Schema JSON-LD para WebPage com breadcrumb
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Empréstimos Online | Credios",
  "description": "Compare e solicite diferentes modalidades de empréstimos online para seu perfil. Aprovação rápida e 100% digital.",
  "url": "https://credios.com.br/emprestimos",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://credios.com.br"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Empréstimos",
        "item": "https://credios.com.br/emprestimos"
      }
    ]
  }
};

export default function EmprestimosPage() {
  return (
    <>
      {/* JSON-LD para SEO */}
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={webPageJsonLd} />
      
      {/* Componente principal da página */}
      <Emprestimos />
    </>
  );
}