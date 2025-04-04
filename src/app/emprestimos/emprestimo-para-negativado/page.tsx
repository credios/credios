"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Componentes do shadcn/ui
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Estilos globais para garantir que todos elementos clicáveis tenham cursor pointer
const globalStyles = `
  a, button, .cursor-pointer, [role="button"], 
  .accordion-trigger, .card-clickable, .hover-pointer,
  [class*="hover:"], [class*="group-hover:"] {
    cursor: pointer !important;
  }
`;

// Ícones do Lucide
import {
  CheckCircle2,
  Zap,
  FileCheck,
  ArrowRight,
  Star,
  User,
  Clock,
  LucideProps,
  ThumbsUp,
  Calendar,
  MessageCircle,
  ChevronRight,
  AlertCircle,
  AtSign,
  Info,
  PlugZap,
  LockKeyhole,
  BadgeCheck,
  Banknote,
  Building,
  AlertOctagon,
  Landmark,
  RefreshCcw,
  Eye,
  Wallet,
  ShieldAlert
} from "lucide-react";

// Ícones de Redes Sociais
import { 
  Instagram, 
  Facebook, 
} from "lucide-react";

// Interface personalizada para ícone do WhatsApp
const WhatsApp = (props: LucideProps) => (
  <svg
    fill="#25D366"
    height="20"
    width="20"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 308 308"
    {...props}
  >
    <g id="XMLID_468_">
      <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
        c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
        c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
        c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
        c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
        c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
        c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
        c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
        c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
        C233.168,179.508,230.845,178.393,227.904,176.981z"/>
      <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
        c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
        c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
        M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
        l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
        c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
        C276.546,215.678,222.799,268.994,156.734,268.994z"/>
    </g>
  </svg>
);

// Interface para ícone do Google
const Google = (props: LucideProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

// Verificado badge component
const VerifiedBadge = () => (
  <span className="inline-flex items-center justify-center bg-green-100 text-green-700 text-xs font-medium rounded-full px-2 py-0.5">
    <CheckCircle2 className="h-3 w-3 mr-1" />
    <span>Verificado</span>
  </span>
);

// Interfaces
interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  action?: string;
  actionUrl?: string;
  stats?: { value: string; label: string }[];
  backgroundColor?: string;
  accentColor?: string;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string[];
  duration?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface TestimonialItem {
  name: string;
  location: string;
  rating: number;
  comment: string;
  source: "whatsapp" | "instagram" | "facebook" | "google";
  date?: string;
  url?: string;
}

interface LoanOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  url: string;
  highlighted?: boolean;
  badge?: string;
  available: boolean;
}

// Dados do empréstimo para negativados
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: <AlertOctagon className="h-8 w-8 text-red-500" />,
    title: "Para Quem Está com Nome Restrito",
    description:
      "Acesso a crédito mesmo com restrições no SPC/Serasa. Não precisa esperar a limpeza de seu nome para ter o dinheiro que precisa agora.",
    highlight: "SEM CONSULTA",
    action: "Ver Soluções",
    actionUrl: "#solucoes-negativados",
    stats: [{ value: "100%", label: "Chance de Aprovação" }],
    backgroundColor: "from-red-50 to-orange-50",
    accentColor: "red",
  },
  {
    icon: <PlugZap className="h-8 w-8 text-amber-500" />,
    title: "Empréstimo na Conta de Luz",
    description:
      "Use sua fatura de energia como garantia e obtenha até R$ 3.300 de crédito imediato. Contratação simples, pelo celular, sem burocracia!",
    highlight: "APROVAÇÃO FÁCIL",
    action: "Simular Agora",
    actionUrl: "/emprestimo-na-conta-de-luz",
    stats: [{ value: "R$ 3.300", label: "Limite Máximo" }],
    backgroundColor: "from-amber-50 to-yellow-50",
    accentColor: "yellow",
  },
  {
    icon: <ShieldAlert className="h-8 w-8 text-blue-500" />,
    title: "Sem Comprovar Renda",
    description:
      "Não exigimos holerites ou declarações de imposto. A aprovação é baseada apenas na titularidade da conta de luz ou no saldo do FGTS.",
    highlight: "FÁCIL",
    action: "Como Funciona",
    actionUrl: "#como-funciona",
    stats: [{ value: "5 MIN", label: "Análise Rápida" }],
    backgroundColor: "from-blue-50 to-indigo-50",
    accentColor: "blue",
  },
  {
    icon: <Zap className="h-8 w-8 text-green-500" />,
    title: "Dinheiro Rápido na Conta",
    description:
      "Receba o valor aprovado via Pix em questão de minutos após a contratação. Solução imediata para suas emergências financeiras.",
    highlight: "PIX",
    action: "Solicitar Agora",
    actionUrl: "/emprestimos",
    stats: [{ value: "15 MIN", label: "Média de Liberação" }],
    backgroundColor: "from-green-50 to-emerald-50",
    accentColor: "green",
  },
];

// Como funciona o empréstimo para negativados
const HOW_IT_WORKS: ProcessStep[] = [
  {
    title: "Escolha a Modalidade Adequada",
    description: "Selecione entre as opções disponíveis para negativados, como empréstimo na conta de luz ou antecipação do FGTS, conforme seu perfil.",
    icon: <Eye className="h-6 w-6" />,
    details: ["Sem consulta ao SPC/Serasa", "Opções específicas para negativados", "Análise personalizada"],
    duration: "2 min",
  },
  {
    title: "Envie a Documentação Básica",
    description: "Basta ter seu documento pessoal (RG ou CNH) e uma fatura de energia recente em seu nome para solicitar o crédito.",
    icon: <FileCheck className="h-6 w-6" />,
    details: ["Apenas documentos essenciais", "Processo simplificado", "Sem papelada excessiva"],
    duration: "5 min",
  },
  {
    title: "Aprovação Garantida",
    description: "Por usar sua conta de luz como garantia, a aprovação é rápida e sem análise de crédito tradicional, ideal para quem está negativado.",
    icon: <BadgeCheck className="h-6 w-6" />,
    details: ["Sem verificação de score", "Aprovação em minutos", "Sem fiador ou avalista"],
    duration: "Até 15 min",
  },
  {
    title: "Receba o Dinheiro na Conta",
    description: "O valor aprovado é enviado diretamente para sua conta via Pix, com liberação no mesmo dia da contratação.",
    icon: <Banknote className="h-6 w-6" />,
    details: ["Transferência imediata", "Sem taxas adicionais", "Disponível 24h/7 dias"],
    duration: "No mesmo dia",
  },
];

// FAQ sobre empréstimo para negativados
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Negativado pode mesmo conseguir empréstimo na Credios?",
    answer:
      "Sim! A Credios oferece alternativas específicas para pessoas com restrições no nome. Nossos produtos como o Empréstimo na Conta de Luz não realizam consulta ao SPC/Serasa, o que permite aprovação mesmo para quem está negativado. A análise é baseada apenas na titularidade da conta de energia, não no seu histórico de crédito.",
  },
  {
    question: "Qual o valor máximo que posso conseguir estando negativado?",
    answer:
      "Mesmo estando negativado, você pode conseguir até R$ 3.300 com o Empréstimo na Conta de Luz da Credios. O valor aprovado depende de fatores específicos como o histórico de pagamento da sua conta de energia e a distribuidora da sua região. Para empréstimo com FGTS, o valor está vinculado ao seu saldo disponível no fundo.",
  },
  {
    question: "Preciso comprovar renda para obter empréstimo estando negativado?",
    answer:
      "Não! Esta é uma das principais vantagens dos empréstimos da Credios para negativados. Não exigimos comprovação de renda, holerite ou declarações. O empréstimo na conta de luz utiliza apenas a fatura de energia como garantia, e o empréstimo FGTS usa o seu saldo como referência, sem necessidade de comprovar rendimentos atuais.",
  },
  {
    question: "Como funciona o pagamento do empréstimo na conta de luz?",
    answer:
      "O pagamento é feito de forma extremamente prática: as parcelas são incluídas mensalmente na sua fatura de energia elétrica. Isso significa que você não precisa se preocupar com boletos adicionais ou datas de vencimento diferentes. Ao pagar sua conta de luz normalmente, você já está quitando seu empréstimo.",
  },
  {
    question: "Em quanto tempo o dinheiro cai na conta de uma pessoa negativada?",
    answer:
      "O processo é surpreendentemente rápido, mesmo para negativados. Após a aprovação, que acontece em minutos, o dinheiro é enviado via Pix e geralmente cai na conta em menos de 15 minutos. Muitos clientes relatam recebimento quase imediato, o que torna esta opção ideal para emergências financeiras.",
  },
  {
    question: "Estar negativado influencia a taxa de juros do empréstimo?",
    answer:
      "Diferentemente dos bancos tradicionais, nas modalidades específicas para negativados da Credios, sua situação cadastral não influencia diretamente as taxas. Oferecemos taxas padronizadas para todos os clientes que se qualificam, independentemente de estarem ou não com restrições no nome. Isso garante um tratamento justo e transparente.",
  },
  {
    question: "Posso fazer outro empréstimo na Credios enquanto ainda estou pagando o atual?",
    answer:
      "Sim, é possível realizar um refinanciamento do seu empréstimo atual ou, em alguns casos, contratar um novo empréstimo em paralelo. Isso dependerá da sua capacidade de pagamento e do histórico de pagamentos do empréstimo atual. Entre em contato com nossos consultores para analisar as possibilidades específicas para o seu caso.",
  },
];

// Depoimentos de clientes negativados
const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Ricardo Souza",
    location: "Fortaleza, CE",
    rating: 5,
    comment:
      "Estava com nome sujo e precisando urgente de dinheiro para pagar o tratamento do meu filho. Tentei em todo lugar e só negativas. Na Credios, consegui R$ 2.800 em menos de 1 hora. Salvou minha vida!",
    source: "whatsapp",
    date: "10/02/2024",
    url: "#"
  },
  {
    name: "Márcia Santos",
    location: "Salvador, BA",
    rating: 5,
    comment:
      "Negativada há 3 anos por conta de um divórcio complicado. Precisava reformar meu pequeno salão de beleza e consegui o empréstimo na conta de luz super rápido. Processo simples e sem burocracia!",
    source: "facebook",
    date: "05/03/2024",
    url: "#"
  },
  {
    name: "Paulo Roberto",
    location: "Recife, PE",
    rating: 4,
    comment:
      "Meu nome estava no Serasa e precisava de um dinheiro para aproveitar uma oportunidade de negócio. O empréstimo na conta de luz foi a única solução que encontrei. Em 20 minutos o dinheiro caiu na conta!",
    source: "google",
    date: "22/02/2024",
    url: "#"
  },
  {
    name: "Tatiane Oliveira",
    location: "Goiânia, GO",
    rating: 5,
    comment:
      "Perdi meu emprego e acabei negativando. Precisava de dinheiro para um curso profissionalizante e a Credios foi a única que me deu chance. Processo 100% online e sem perguntas sobre meu nome sujo.",
    source: "instagram",
    date: "15/03/2024",
    url: "#"
  },
];

// Opções de empréstimo para negativados (diretório)
const LOAN_OPTIONS: LoanOption[] = [
  {
    id: "conta-luz",
    title: "Empréstimo na Conta de Luz para Negativados",
    description: "Use sua conta de energia como garantia e consiga até R$3.300, sem consulta ao SPC/Serasa.",
    icon: <PlugZap className="h-6 w-6" />,
    color: "yellow",
    url: "/emprestimo-na-conta-de-luz",
    highlighted: true,
    badge: "MAIS FÁCIL",
    available: true,
  },
  {
    id: "fgts",
    title: "Antecipação do FGTS para Negativados",
    description: "Antecipe seu saque-aniversário mesmo com restrições no nome.",
    icon: <Calendar className="h-6 w-6" />,
    color: "blue",
    url: "/emprestimo-fgts",
    highlighted: true,
    available: true,
  },
  {
    id: "garantias",
    title: "Empréstimo com Garantias para Negativados",
    description: "Utilize um bem como garantia e consiga valores maiores mesmo estando negativado.",
    icon: <LockKeyhole className="h-6 w-6" />,
    color: "green",
    url: "https://credios.com.br",
    available: false,
  },
  {
    id: "terceiros",
    title: "Empréstimo com Aval de Terceiros",
    description: "Consiga crédito usando um avalista com nome limpo como garantia.",
    icon: <User className="h-6 w-6" />,
    color: "purple",
    url: "https://credios.com.br",
    available: false,
  },
  {
    id: "online",
    title: "Microcrédito Online para Negativados",
    description: "Pequenos valores com aprovação facilitada, mesmo para quem está com nome sujo.",
    icon: <Wallet className="h-6 w-6" />,
    color: "orange",
    url: "/emprestimo-na-conta-de-luz",
    available: true,
  },
  {
    id: "credito-consignado",
    title: "Crédito Consignado para Negativados",
    description: "Para servidores públicos, aposentados e pensionistas, mesmo com restrições.",
    icon: <Landmark className="h-6 w-6" />,
    color: "teal",
    url: "/emprestimos/emprestimo-consignado",
    available: true,
  },
];

// Componente para SEO
const SEOHead = () => (
  <Head>
    <title>Empréstimo Para Negativado | Aprovação Mesmo Com Nome Sujo | Credios</title>
    <meta 
      name="description" 
      content="Empréstimo para negativado com aprovação garantida! Sem consulta ao SPC/Serasa, receba até R$ 3.300 usando sua conta de luz como garantia. Simule agora!" 
    />
    <meta name="keywords" content="empréstimo para negativado, empréstimo nome sujo, crédito para negativados, empréstimo sem consulta SPC, empréstimo na conta de luz para negativados, empréstimo com restrição" />
    <meta property="og:title" content="Empréstimo Para Negativado | Aprovação Mesmo Com Nome Sujo | Credios" />
    <meta property="og:description" content="Empréstimo para negativado com aprovação garantida! Sem consulta ao SPC/Serasa. Simule agora!" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://credios.com.br/emprestimo-negativados" />
    <meta property="og:image" content="https://credios.com.br/images/og-emprestimo-negativados.jpg" />
    <script type="application/ld+json">
      {`{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Empréstimo Para Negativado Credios",
        "description": "Empréstimo para pessoas com restrições no nome, sem consulta ao SPC/Serasa",
        "category": "Empréstimo Pessoal",
        "offers": {
          "@type": "Offer",
          "price": "1000.00",
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock"
        },
        "interestRate": {
          "@type": "QuantitativeValue",
          "value": "3.99",
          "minValue": "3.99",
          "maxValue": "6.99"
        },
        "loanTerm": {
          "@type": "QuantitativeValue",
          "minValue": "6",
          "maxValue": "12",
          "unitCode": "MON"
        },
        "areaServed": "BR",
        "provider": {
          "@type": "Organization",
          "name": "Credios",
          "logo": "https://credios.com.br/logo.png",
          "url": "https://credios.com.br"
        }
      }`}
    </script>
    <script type="application/ld+json">
      {`{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          ${FAQ_ITEMS.map(item => `{
            "@type": "Question",
            "name": "${item.question}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${item.answer}"
            }
          }`).join(',')}
        ]
      }`}
    </script>
  </Head>
);

// Animações
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};

// Hero Section para Negativados
const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      {/* Elementos de fundo decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-red-300 opacity-10 blur-3xl"></div>
        <div className="absolute top-40 -left-10 w-80 h-80 rounded-full bg-orange-300 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-amber-300 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            <motion.div variants={slideInLeft}>
              <Badge className="mb-6 bg-gradient-to-r from-red-400 to-orange-500 text-white py-1.5 px-6 flex items-center gap-1.5 rounded-full shadow-sm">
                <AlertOctagon className="h-4 w-4" />
                <span className="font-medium">Para quem está com nome negativado</span>
              </Badge>
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 leading-tight"
              variants={slideInLeft}
            >
              Empréstimo Para Negativado 
              <span className="block mt-2 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                Sem Consulta ao SPC/Serasa
                <span className="inline-block ml-1 relative">
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl"
              variants={slideInLeft}
            >
              <span className="font-medium">Negativado também merece uma chance!</span> Consiga até R$ 3.300 usando sua conta de luz como garantia, sem verificação de crédito e com aprovação em minutos.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              variants={slideInLeft}
            >
              <Link href="/emprestimos">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 font-semibold flex items-center gap-2"
                  aria-label="Simule seu empréstimo para negativado agora"
                >
                  <span>Simular Agora Mesmo</span>
                  <motion.div animate={pulseAnimation}>
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </Link>
              <Link href="#como-funciona">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  aria-label="Saiba como funciona o empréstimo para negativados"
                >
                  Veja Como Funciona
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 text-sm text-gray-500"
              variants={slideInLeft}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-red-100 to-orange-200 flex items-center justify-center text-xs font-bold text-orange-600"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 font-semibold">4.8/5</span>
                </div>
                <div>Mais de 50 mil clientes negativados aprovados</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 hidden md:block relative"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
          >
            {/* Card flutuante de rápida aprovação */}
            <motion.div 
              className="absolute -top-8 -left-8 bg-white rounded-xl shadow-xl p-4 z-20 border border-gray-100"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertOctagon className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-red-700">Nome com restrição?</span>
              </div>
              <div className="text-xs text-gray-500">Sem problemas!</div>
              <div className="text-lg font-bold text-gray-900">100% Aprovado</div>
            </motion.div>

            {/* Card flutuante de valor */}
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 z-20 border border-gray-100"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-700">Crédito Disponível</span>
              </div>
              <div className="text-xs text-gray-500">Valor máximo</div>
              <div className="text-lg font-bold text-gray-900">R$ 3.300,00</div>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-2xl"></div>
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl"></div>
              <Image
                src="/images/image005.jpg" // Substitua pela sua imagem real
                alt="Empréstimo para negativado sem consulta ao SPC/Serasa"
                width={500}
                height={450}
                className="rounded-2xl relative z-10"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,53.3C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

// Componentes Reutilizáveis
const SectionHeading = ({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}) => (
  <motion.div
    className="mb-12 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={fadeIn}
  >
    {badge && (
      <Badge className="mb-4 bg-gradient-to-r from-red-200 to-orange-100 text-orange-700 py-1.5 px-4 rounded-full shadow-sm">
        {badge}
      </Badge>
    )}
    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
      {title}
    </h2>
    <div className="h-1.5 w-24 bg-gradient-to-r from-red-300 to-orange-400 rounded-full mx-auto mb-4"></div>
    <p className="text-gray-600 max-w-2xl mx-auto text-lg">{description}</p>
  </motion.div>
);

// Card de vantagens com design aprimorado
const AdvantageCard = ({
  item,
  index,
}: {
  item: AdvantageItem;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const colorMap: Record<string, string> = {
    red: "group-hover:from-red-500 group-hover:to-red-600",
    yellow: "group-hover:from-amber-500 group-hover:to-amber-600",
    green: "group-hover:from-green-500 group-hover:to-green-600",
    blue: "group-hover:from-blue-500 group-hover:to-blue-600",
  };

  const accentColorKey = (item.accentColor || "red") as keyof typeof colorMap;
  const accentColor = colorMap[accentColorKey];

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card
        className={`h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden bg-gradient-to-br ${item.backgroundColor} hover:bg-white cursor-pointer`}
      >
        {/* Efeito de glassmorphism no hover */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Overlay de cor no hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-10`}
        ></div>

        <CardHeader className="relative z-20">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
            {item.highlight && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-1.5 px-3 group-hover:bg-white group-hover:text-orange-600 transition-all duration-300 rounded-full shadow-sm">
                {item.highlight}
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl font-bold mt-4 group-hover:text-white transition-colors duration-300">
            {item.title}
          </CardTitle>
          <CardDescription className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
            {item.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-20">
          {item.stats && (
            <div className="grid grid-cols-1 gap-3 mt-3">
              {item.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/90 p-3 rounded-lg group-hover:bg-white/20 transition-all duration-300 shadow-sm"
                >
                  <p className="text-2xl font-bold text-orange-600 group-hover:text-white transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="relative z-20">
          {item.action && item.actionUrl && (
            <Link href={item.actionUrl} className="w-full">
              <Button 
                variant="ghost" 
                className="text-orange-600 hover:text-orange-700 group-hover:text-white font-medium cursor-pointer flex items-center gap-1 w-full justify-between hover:bg-transparent transition-all duration-300 rounded-lg"
                aria-label={item.action}
              >
                <span>{item.action}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Carrossel de depoimentos
const TestimonialCarousel = () => {
  const [position, setPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (carouselRef.current) {
      const items = carouselRef.current.querySelectorAll(".testimonial-item");
      if (items.length > 0) setItemWidth(items[0].clientWidth + 16);
    }

    // Animação do carrossel com pausa no hover
    const interval = setInterval(() => {
      if (!isPaused) {
        setPosition((prev) => {
          const newPos = prev - 1;
          const resetPoint = -(itemWidth * TESTIMONIALS.length);
          return newPos <= resetPoint ? 0 : newPos;
        });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [itemWidth, isPaused]);

  const renderStars = (rating: number) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill={i < rating ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ));

  // Componente para renderizar o ícone correto da plataforma com o nome
  const SocialSourceDisplay = ({ source, className = "" }: { source: string, className?: string }) => {
    switch (source) {
      case 'whatsapp':
        return (
          <div className={`flex items-center gap-1.5 ${className}`}>
            <WhatsApp className="h-5 w-5" />
            <span className="text-xs italic">via WhatsApp</span>
          </div>
        );
      case 'instagram':
        return (
          <div className={`flex items-center gap-1.5 ${className}`}>
            <Instagram className="h-5 w-5 text-pink-500" />
            <span className="text-xs italic">via Instagram</span>
          </div>
        );
      case 'facebook':
        return (
          <div className={`flex items-center gap-1.5 ${className}`}>
            <Facebook className="h-5 w-5 text-blue-500" />
            <span className="text-xs italic">via Facebook</span>
          </div>
        );
      case 'google':
        return (
          <div className={`flex items-center gap-1.5 ${className}`}>
            <Google className="h-5 w-5" />
            <span className="text-xs italic">via Google</span>
          </div>
        );
      default:
        return null;
    }
  };

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="relative py-6">
      <div 
        className="overflow-hidden" 
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-300 ease-linear"
          style={{ transform: `translateX(${position}px)` }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="testimonial-item px-2"
              style={{ minWidth: "320px" }}
            >
              <Card className="h-full border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-orange-400 text-white flex items-center justify-center font-bold relative overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                        {testimonial.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .substring(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-base font-medium text-gray-800">
                          {testimonial.name}
                        </div>
                        <CardDescription className="text-xs flex items-center gap-1">
                          <AtSign className="h-3 w-3 text-gray-400" />
                          {testimonial.location}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm italic">&quot;{testimonial.comment}&quot;</p>
                </CardContent>
                <CardFooter className="text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t pt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <SocialSourceDisplay source={testimonial.source} />
                    <VerifiedBadge />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{testimonial.date}</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Controles de navegação */}
      <div className="flex justify-center gap-1 mt-6">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === Math.abs(position) % TESTIMONIALS.length ? 'bg-red-500 w-6' : 'bg-gray-300'}`}
            onClick={() => setPosition(-index * itemWidth)}
            aria-label={`Ver depoimento ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Como funciona com design melhorado
const HowItWorksSection = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-red-50 to-amber-50 relative overflow-hidden" id="como-funciona">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-200 opacity-10 blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-red-200 opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title="Como Funciona o Empréstimo Para Negativado"
          description="Um processo simples e acessível, especialmente pensado para quem enfrenta restrições de crédito."
          badge="Passo a Passo"
        />
        <div className="max-w-4xl mx-auto space-y-8">
          {HOW_IT_WORKS.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Linha conectora entre os passos */}
              {index < HOW_IT_WORKS.length - 1 && (
                <div className="absolute top-16 bottom-0 left-6 w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-red-400 to-orange-400 z-0"></div>
              )}
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-red-100 relative z-10 hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-orange-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    {step.duration && (
                      <div className="mt-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full flex items-center gap-1.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        <Clock className="h-3 w-3" />
                        {step.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                      <span className="text-orange-500 mr-2">{index + 1}.</span>
                      {step.title}
                    </h4>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                    {step.details && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.details.map((detail, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg group-hover:bg-red-50 transition-colors"
                          >
                            <CheckCircle2 className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" /> 
                            <span className="group-hover:text-gray-700 transition-colors">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Elemento final do processo */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 px-6 rounded-full flex items-center gap-2 shadow-lg">
              <ThumbsUp className="h-5 w-5" />
              <span className="font-medium">Pronto! Dinheiro na sua conta mesmo estando negativado</span>
            </div>
          </motion.div>
        </div>
        
        {/* CTA dentro da seção */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link href="/simulador">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Simular empréstimo para negativado agora"
            >
              Simular Valor Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Processo 100% digital | Mesmo com nome negativado | Aprovação em minutos
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Diretório de opções de empréstimo para negativados
const LoanOptionsDirectory = () => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(categoryRef, { once: true, margin: "-50px" });

  // Função para obter as classes de cor
  const getColorClasses = (color: string, type: "bg" | "text" | "border" | "hover" | "gradient") => {
    const colorMap: Record<string, Record<string, string>> = {
      yellow: {
        bg: "bg-amber-100",
        text: "text-amber-600",
        border: "border-amber-200",
        hover: "hover:bg-amber-600 hover:text-white",
        gradient: "from-amber-500 to-amber-600",
      },
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "hover:bg-blue-600 hover:text-white",
        gradient: "from-blue-500 to-blue-600",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-200",
        hover: "hover:bg-green-600 hover:text-white",
        gradient: "from-green-500 to-green-600",
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-200",
        hover: "hover:bg-red-600 hover:text-white",
        gradient: "from-red-500 to-red-600",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        border: "border-purple-200",
        hover: "hover:bg-purple-600 hover:text-white",
        gradient: "from-purple-500 to-purple-600",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-200",
        hover: "hover:bg-orange-600 hover:text-white",
        gradient: "from-orange-500 to-orange-600",
      },
      teal: {
        bg: "bg-teal-100",
        text: "text-teal-600",
        border: "border-teal-200",
        hover: "hover:bg-teal-600 hover:text-white",
        gradient: "from-teal-500 to-teal-600",
      },
    };

    return colorMap[color]?.[type] || "";
  };

  // Card para cada opção de empréstimo
  const LoanOptionCard = ({ option }: { option: LoanOption }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
      <motion.div
        ref={cardRef}
        variants={fadeIn}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <Link href={option.url} className="block h-full">
          <Card
            className={`group h-full overflow-hidden border border-gray-200/50 ${
              option.highlighted
                ? "shadow-md hover:shadow-xl"
                : "shadow-sm hover:shadow-lg"
            } transition-all duration-300 relative cursor-pointer card-clickable`}
          >
            {/* Card header with gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(
                option.color,
                "gradient"
              )} opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-10`}
            />

            {/* Not available overlay */}
            {!option.available && (
              <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-white p-6 text-center">
                <Clock className="h-10 w-10 mb-3 text-gray-300" />
                <p className="text-xl font-bold mb-2">Em Breve</p>
                <p className="text-sm text-gray-300">
                  Este produto estará disponível em breve. Aguarde novidades!
                </p>
              </div>
            )}

            {option.badge && (
              <div className="absolute top-0 right-0 z-20">
                <Badge
                  className={`m-3 py-1 px-3 ${getColorClasses(
                    option.color,
                    "bg"
                  )} ${getColorClasses(option.color, "text")} group-hover:bg-white`}
                >
                  {option.badge}
                </Badge>
              </div>
            )}

            <CardHeader className="relative z-20">
              <div
                className={`w-14 h-14 rounded-full ${getColorClasses(
                  option.color,
                  "bg"
                )} ${getColorClasses(
                  option.color,
                  "text"
                )} flex items-center justify-center mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors duration-300`}
              >
                {option.icon}
              </div>
              <CardTitle className="text-xl text-gray-900 group-hover:text-white transition-colors duration-300">
                {option.title}
              </CardTitle>
              <CardDescription className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                {option.description}
              </CardDescription>
            </CardHeader>

            <CardFooter className="relative z-20 pt-0">
              <div className="flex items-center text-sm font-medium text-gray-600 group-hover:text-white transition-colors duration-300">
                <span>Conhecer Detalhes</span>
                <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </CardFooter>
          </Card>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="py-20 bg-white" id="solucoes-negativados">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Opções de Empréstimo Para Negativado"
          description="Mesmo com nome sujo, você tem alternativas! Conheça todas as modalidades disponíveis para quem está com restrições no SPC/Serasa."
          badge="Soluções Exclusivas"
        />

        <motion.div
          ref={categoryRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {LOAN_OPTIONS.map((option) => (
            <LoanOptionCard key={option.id} option={option} />
          ))}
        </motion.div>

        {/* Informação adicional */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto p-6 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl shadow-sm border border-red-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-white rounded-full p-3 shadow-sm">
              <Info className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Superando as Barreiras do Nome Negativado
              </h3>
              <p className="text-gray-600 mb-4">
                Estar com o nome negativado não significa ficar sem opções de crédito. Diferente dos bancos tradicionais, 
                a Credios oferece soluções alternativas que não dependem de score no SPC/Serasa, permitindo que você tenha 
                acesso ao dinheiro que precisa mesmo em momentos difíceis.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-white/80 text-red-600 border-red-200">
                  <AlertOctagon className="h-3.5 w-3.5 mr-1" /> 40% dos brasileiros estão negativados
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-amber-600 border-amber-200">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> 98% de taxa de aprovação
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-green-600 border-green-200">
                  <RefreshCcw className="h-3.5 w-3.5 mr-1" /> Recupere seu crédito
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// FAQ com schema markup
const FAQSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Dúvidas Sobre Empréstimo Para Negativado"
          description="Tire suas dúvidas sobre como conseguir crédito mesmo estando com restrições no nome."
          badge="Perguntas Frequentes"
        />
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  data-faq-item
                >
                  <AccordionTrigger className="px-5 py-4 hover:bg-red-50 cursor-pointer group accordion-trigger">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <span className="text-base font-medium text-gray-800 group-hover:text-gray-900">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-1 text-gray-600 bg-gradient-to-r from-red-50/50 to-white">
                    <div className="flex gap-3">
                      <div className="w-6 flex-shrink-0"></div>
                      <div>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
          
          {/* Suporte para negativados */}
          <motion.div
            className="mt-8 p-4 border border-dashed border-red-300 rounded-xl bg-red-50 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AlertOctagon className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <p className="text-red-700 font-medium">Ainda tem dúvidas sobre empréstimo para negativado?</p>
            <p className="text-red-600 text-sm mt-1 mb-3">Nossa equipe especializada em crédito para negativados está online agora</p>
            <Link href="/contato-negativado">
              <Button 
                variant="outline" 
                className="border-red-400 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                aria-label="Entrar em contato com um especialista em crédito para negativados"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Falar com um Especialista
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Seção de depoimentos
const TestimonialsSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-red-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-orange-200 opacity-10 blur-3xl"></div>
      <div className="absolute -top-20 -left-40 w-80 h-80 rounded-full bg-red-200 opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Histórias Reais"
          title="O Que Dizem Nossos Clientes Negativados"
          description="Pessoas que estavam com nome sujo e conseguiram crédito com a Credios. Veja como ajudamos a resolver suas necessidades financeiras."
        />
        <TestimonialCarousel />
      </div>
    </div>
  );
};

// CTA Final aprimorado
const FinalCTA = () => (
  <div className="py-20 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 relative overflow-hidden">
    {/* Elementos decorativos */}
    <div className="absolute top-0 left-0 w-full h-10 bg-[url('/images/wave-pattern.svg')] bg-repeat-x opacity-10"></div>
    <div className="absolute bottom-0 left-0 w-full h-10 bg-[url('/images/wave-pattern.svg')] bg-repeat-x opacity-10 transform rotate-180"></div>
    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-yellow-300 opacity-20 blur-3xl"></div>
    <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-red-300 opacity-20 blur-3xl"></div>
    
    <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white/10 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-white/20"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-white/20 text-white py-1.5 px-4 backdrop-blur-sm">
            NEGATIVADO TEM CRÉDITO
          </Badge>
        </motion.div>
        
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="block mb-2">Não Deixe o Nome Sujo</span>
          <span className="text-5xl md:text-6xl text-yellow-300 drop-shadow-md">Impedir Seus Planos</span>
        </motion.h3>
        
        <motion.p
          className="text-white/90 mb-8 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Mais de <span className="font-bold underline decoration-yellow-300">50 mil brasileiros negativados</span> já
          conseguiram crédito com a Credios. Tenha o dinheiro que precisa <span className="font-bold">hoje mesmo</span>,
          sem burocracia ou verificação de score.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
            <div className="flex items-center gap-3 text-white">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-red-500 bg-white flex items-center justify-center text-xs font-bold text-red-500"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">8 negativados aprovados</p>
                <p className="text-xs opacity-80">nos últimos 30 minutos</p>
              </div>
            </div>
          </div>
          
          <Link href="/emprestimos">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 rounded-full px-10 py-7 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-bold flex items-center gap-2"
              aria-label="Simular empréstimo para negativado agora"
            >
              <span>Solicite Seu Crédito Agora</span>
              <motion.div 
                animate={{ 
                  x: [0, 5, 0],
                  transition: { repeat: Infinity, duration: 1.5 }
                }}
              >
                <ArrowRight className="h-6 w-6" />
              </motion.div>
            </Button>
          </Link>
          
          <div className="mt-6 flex items-center justify-center gap-3 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-yellow-300" />
              <span>Sem consulta SPC</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-yellow-300" />
              <span>Aprovação garantida</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-yellow-300" />
              <span>Pix em minutos</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

// Estatísticas sobre negativados no Brasil
const StatsSection = () => (
  <div className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <SectionHeading
        title="Negativado no Brasil: Você Não Está Sozinho"
        description="Entenda os números da negativação no país e por que a Credios está comprometida em oferecer soluções acessíveis."
        badge="Dados Importantes"
      />

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
      >
        {[
          { 
            value: "66 milhões", 
            label: "Brasileiros Negativados", 
            icon: <User className="h-6 w-6" />,
            color: "red", 
            description: "Cerca de 40% da população adulta"
          },
          { 
            value: "R$ 290 bilhões", 
            label: "Total de Dívidas", 
            icon: <Banknote className="h-6 w-6" />,
            color: "amber",
            description: "Valor acumulado em inadimplência" 
          },
          { 
            value: "71%", 
            label: "Dívidas com Bancos", 
            icon: <Building className="h-6 w-6" />,
            color: "blue",
            description: "Principal motivo de negativação" 
          },
          { 
            value: "98%", 
            label: "Taxa de Aprovação", 
            icon: <BadgeCheck className="h-6 w-6" />,
            color: "green",
            description: "Dos nossos clientes negativados" 
          },
        ].map((stat, index) => (
          <motion.div 
            key={index}
            variants={fadeIn}
            className={`bg-${stat.color}-50 rounded-xl border border-${stat.color}-100 p-5 shadow-sm hover:shadow-md transition-all group`}
          >
            <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center mx-auto mb-3 text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div className="text-center">
              <div className={`text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-${stat.color}-600 transition-colors mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-700 mb-2">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fonte das informações */}
      <div className="text-center mt-8 text-sm text-gray-500">
        Fonte: Serasa Experian e CNDL/SPC Brasil (2024)
      </div>
    </div>
  </div>
);

// Botão de WhatsApp Fixo
const FloatingWhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 drop-shadow-xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 300 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a 
              href="https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20informações%20sobre%20empréstimo%20para%20negativado" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div 
                className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full overflow-hidden p-0 shadow-lg border-2 border-white"
                animate={{ 
                  width: isHovered ? 'auto' : '60px',
                  paddingLeft: isHovered ? '20px' : '0px',
                  paddingRight: isHovered ? '20px' : '0px'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-[60px] h-[60px] flex items-center justify-center flex-shrink-0">
                  <WhatsApp className="h-8 w-8" />
                </div>
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.span 
                      className="font-medium whitespace-nowrap pr-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      Falar com Consultor
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Atendimento rápido via WhatsApp</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

// Componente Principal
export default function EmprestimoNegativados() {
  return (
    <section className="w-full overflow-hidden font-sans">
      {/* Estilos Globais */}
      <style jsx global>{globalStyles}</style>
      
      {/* SEO Metadata */}
      <SEOHead />
      
      {/* Botão de WhatsApp Fixo */}
      <FloatingWhatsAppButton />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Estatísticas sobre negativados */}
      <StatsSection />

      {/* Vantagens do empréstimo para negativados */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-red-100 opacity-50 blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-amber-100 opacity-50 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading
            badge="Vantagens"
            title="Por Que Escolher a Credios Para Conseguir Crédito Negativado?"
            description="Nós entendemos as dificuldades de quem está com nome sujo e oferecemos soluções reais e acessíveis."
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {ADVANTAGES.map((item, index) => (
              <AdvantageCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Como funciona */}
      <HowItWorksSection />

      {/* Diretório de opções para negativados */}
      <LoanOptionsDirectory />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA Final */}
      <FinalCTA />
    </section>
  );
}