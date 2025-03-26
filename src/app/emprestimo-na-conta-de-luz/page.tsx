import { Metadata } from "next";
import AdvantagesSection from "@/components/advantagessection";
import HeroSection from "@/components/herosection";
import { JsonLd } from "@/components/SEO/JsonLd";

// --- METADADOS (JÁ COM WWW NAS VERSÕES ANTERIORES, MANTIDO) ---
export const metadata: Metadata = {
  title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
  description: "Solicite empréstimo na conta de luz com aprovação imediata. Até R$ 3.300 sem consulta SPC/Serasa. Receba via PIX em até 24h e pague nas faturas de energia.",
  keywords: "empréstimo na conta de luz, crédito pela conta de energia, empréstimo sem SPC, nome sujo, empréstimo rápido, empréstimo aprovação imediata",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
    description: "Solicite empréstimo usando sua conta de luz como garantia. Aprovação imediata mesmo com nome negativado. Receba até R$ 3.300 via PIX em até 24h.",
    url: "https://www.credios.com.br/emprestimo-na-conta-de-luz", // WWW
    siteName: "Credios - Soluções de Crédito Digital",
    images: [ { url: "https://www.credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg", /*...*/ } ], // WWW
    locale: "pt_BR", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimo na Conta de Luz | Até R$ 3.300 | Credios",
    description: "Solicite empréstimo usando sua conta de luz. Aprovação imediata mesmo com nome negativado. Receba via PIX em até 24h.",
    images: ["https://www.credios.com.br/images/emprestimo-na-conta-de-luz-og.jpg"], // WWW
  },
  robots: { /* ... */ },
  alternates: { canonical: "https://www.credios.com.br/emprestimo-na-conta-de-luz" }, // WWW
  viewport: "width=device-width, initial-scale=1",
};

// --- SCHEMA JSON-LD ATUALIZADO PARA @type: Service E COM WWW ---
const serviceContaLuzJsonLd = {
  "@context": "https://schema.org",
  // --- MUDANÇA PRINCIPAL ---
  "@type": "Service",
  // --- FIM DA MUDANÇA ---
  "name": "Empréstimo Pessoal na Conta de Luz", // Nome focado no serviço
  "serviceType": "Serviço de Crédito Pessoal com Débito em Fatura de Energia", // Tipo específico
  "description": "Serviço de empréstimo pessoal online com pagamento facilitado através da fatura de energia elétrica. Valores de até R$ 3.300, mesmo para negativados.",
  "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz", // WWW
  "provider": { // Essencial para Service
    "@type": "Organization",
    "name": "Credios",
    "url": "https://www.credios.com.br", // WWW
    "logo": "https://www.credios.com.br/images/logo.png" // WWW (adicionei o logo como exemplo)
  },
  "brand": { // Marca do serviço/provider
    "@type": "Organization",
    "name": "Credios"
  },
  "areaServed": { // Área de cobertura específica deste serviço
    "@type": "AdministrativeArea", // Usando lista de estados
    "name": [
         "Bahia", "Ceará", "Pernambuco", "Rio Grande do Norte", "Goiás",
         "São Paulo", "Rio de Janeiro", "Paraná", "Rio Grande do Sul"
    ]
  },
  // Offers descreve a oferta do serviço
  "offers": {
    "@type": "Offer",
    "itemOffered": { // Linka explicitamente a oferta ao serviço
        "@type": "Service",
        "name": "Empréstimo Pessoal na Conta de Luz"
    },
    "priceCurrency": "BRL",
    // Poderíamos usar priceSpecification para indicar o range de valores (min/max), taxas, etc.
    // Exemplo com valor máximo:
    "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "BRL",
        "maxPrice": 3300,
        "valueAddedTaxIncluded": true, // Ou false, se aplicável
        "description": "Valor máximo do empréstimo." // Descrição opcional
    },
    "availability": "https://schema.org/OnlineOnly",
    // Referencia a areaServed principal ou repete a lista de estados
     "areaServed": {
       "@type": "AdministrativeArea",
       "name": [ "BA", "CE", "PE", "RN", "GO", "SP", "RJ", "PR", "RS" ] // Pode usar abreviações se preferir
    },
  },
  // AggregateRating mantido para valor semântico, mas SEM expectativa de Rich Snippet de estrelas
   "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "100",
    "itemReviewed": { // Aponta para o Service principal
      // --- TIPO ALTERADO ---
      "@type": "Service",
      "name": "Empréstimo Pessoal na Conta de Luz",
      "url": "https://www.credios.com.br/emprestimo-na-conta-de-luz" // WWW
    }
  },
  // Se tivesse reviews individuais, precisariam de itemReviewed apontando para Service.
};

// Componente da página
export default function EmprestimoNaContaDeLuz() {
  return (
    <>
      {/* Inclui o JSON-LD atualizado (Service com www) */}
      {/* Passando o schema principal renomeado */}
      <JsonLd data={serviceContaLuzJsonLd} />

      {/* Seções do corpo da página */}
      <HeroSection />
      <AdvantagesSection />

      {/* Adicione aqui outras seções ou conteúdo da sua página, se houver */}
    </>
  );
}