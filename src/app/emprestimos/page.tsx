import { Metadata } from "next";
import Emprestimos from "@/components/emprestimos"; // Presumo que este componente renderize o conteúdo da página
import { JsonLd } from "@/components/SEO/JsonLd";

// Metadados para SEO (COM WWW)
export const metadata: Metadata = {
  title: "Empréstimos Online | Opções para Todos os Perfis | Credios",
  description: "Compare e solicite empréstimos online para seu perfil: conta de luz, FGTS...",
  keywords: "empréstimos online, crédito pessoal, empréstimo conta de luz, empréstimo FGTS...",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimos Online | Compare e Escolha a Melhor Opção | Credios",
    description: "Descubra as melhores opções de empréstimo para seu perfil...",
    // --- CORRIGIDO ---
    url: "https://www.credios.com.br/emprestimos",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        // --- CORRIGIDO ---
        url: "https://www.credios.com.br/images/emprestimos-og.jpg",
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
    description: "Descubra as melhores opções de empréstimo para seu perfil...",
    // --- CORRIGIDO ---
    images: ["https://www.credios.com.br/images/emprestimos-og.jpg"],
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
    canonical: "https://www.credios.com.br/emprestimos",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para organização (COM WWW)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Credios",
  // --- CORRIGIDO ---
  "url": "https://www.credios.com.br",
  // --- CORRIGIDO (ATENÇÃO AO CAMINHO '/logo.png') ---
  "logo": "https://www.credios.com.br/logo.png",
  "description": "Plataforma digital de empréstimos com soluções personalizadas...",
  "sameAs": [ // Mantidos como estão (links externos)
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

// Schema JSON-LD para ItemList (lista de produtos/serviços - COM WWW)
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  // Adicionando uma descrição para a lista
  "description": "Principais modalidades de empréstimo oferecidas pela Credios",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service", // Ou Product, se você padronizar assim
        "name": "Empréstimo na Conta de Luz",
        // --- CORRIGIDO ---
        "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz", // Usando o slug consistente das outras páginas
        "description": "Use sua conta de energia para conseguir até R$3.300...",
        "provider": { "@type": "Organization", "name": "Credios" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service", // Ou Product
        "name": "Empréstimo FGTS",
        // --- CORRIGIDO ---
        "url": "https://www.credios.com.br/emprestimo-fgts",
        "description": "Antecipe seu saque-aniversário do FGTS...",
        "provider": { "@type": "Organization", "name": "Credios" }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service", // Ou Product
        "name": "Empréstimo no Cartão de Crédito",
         // --- CORRIGIDO ---
        "url": "https://www.credios.com.br/emprestimo-no-cartao-de-credito", // Presumindo que esta URL existe
        "description": "Transforme seu limite em dinheiro na conta...",
        "provider": { "@type": "Organization", "name": "Credios" }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service", // Ou Product
        "name": "Empréstimo para Negativados",
         // --- CORRIGIDO ---
        "url": "https://www.credios.com.br/emprestimos/emprestimo-para-negativado", // Presumindo que esta URL existe
        "description": "Soluções de crédito específicas para quem está com restrições...",
        "provider": { "@type": "Organization", "name": "Credios" }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Service", // Ou Product
        "name": "Empréstimo Consignado",
        // --- CORRIGIDO ---
        "url": "https://www.credios.com.br/emprestimos/emprestimo-consignado", // Presumindo que esta URL existe
        "description": "Crédito com desconto em folha...",
        "provider": { "@type": "Organization", "name": "Credios" }
      }
    }
  ]
};

// Schema JSON-LD para WebPage com breadcrumb (COM WWW)
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Empréstimos Online | Credios",
  "description": "Compare e solicite diferentes modalidades de empréstimos online...",
  // --- CORRIGIDO ---
  "url": "https://www.credios.com.br/emprestimos",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
         // --- CORRIGIDO ---
        "item": "https://www.credios.com.br"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Empréstimos",
         // --- CORRIGIDO ---
        "item": "https://www.credios.com.br/emprestimos"
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