'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
  Clock,
  LucideProps,
  ThumbsUp,
  MessageCircle,
  AlertCircle,
  PlugZap,
  BadgeCheck,
  Banknote,
  Receipt,
  PiggyBank,
  Shield,
  Check,
  Users,
  Calculator,
  HelpCircle,
  Calendar,
  AtSign
} from "lucide-react";

// Interface personalizada para ícone do WhatsApp
const WhatsAppIcon = (props: LucideProps) => (
  <svg
    fill="#25D366"
    height="20"
    width="20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 308 308"
    {...props}
  >
    <g>
      <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
        c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
        c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
        c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
        c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
        c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
        c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
        c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
        c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
        C233.168,179.508,230.845,178.393,227.904,176.981z"/>
      <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
        c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
        c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
        M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
        l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
        c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
        C276.546,215.678,222.799,268.994,156.734,268.994z"/>
    </g>
  </svg>
);

// Interfaces
interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  ctaText?: string;
  ctaUrl?: string;
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

// Animações
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ==========================================
// DADOS DO CONTEÚDO
// ==========================================

// Principais vantagens
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: <PlugZap className="h-8 w-8 text-amber-500" />,
    title: "Até R$ 3.300 usando sua fatura de energia",
    description:
      "Utilize sua conta de luz como garantia e obtenha crédito imediato, sem comprometer seu salário ou benefícios.",
    highlight: "EXCLUSIVO",
    ctaText: "Simular Agora",
    ctaUrl: "/simulacao",
  },
  {
    icon: <BadgeCheck className="h-8 w-8 text-blue-500" />,
    title: "Aprovação Facilitada",
    description:
      "Sem análise de score ou consulta ao SPC/Serasa. A aprovação é baseada apenas na titularidade da conta de energia.",
    highlight: "SEM BUROCRACIA",
    ctaText: "Verificar Elegibilidade",
    ctaUrl: "/elegibilidade",
  },
  {
    icon: <Zap className="h-8 w-8 text-orange-500" />,
    title: "Dinheiro Rápido via PIX",
    description:
      "Processo 100% digital, pelo celular. Após aprovação, receba o dinheiro em até 24 horas via PIX em sua conta.",
    highlight: "RÁPIDO",
    ctaText: "Como Funciona",
    ctaUrl: "#como-funciona",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Pagamento Facilitado",
    description:
      "As parcelas são incluídas diretamente na sua fatura de energia elétrica mensal, sem boletos adicionais para gerenciar.",
    highlight: "PRÁTICO",
    ctaText: "Ver Exemplos",
    ctaUrl: "/exemplos",
  },
];

// Como funciona o empréstimo na conta de luz
const HOW_IT_WORKS: ProcessStep[] = [
  {
    title: "Simulação Rápida Online",
    description: "Insira seus dados básicos e verifique em segundos o valor pré-aprovado disponível para você com base na sua região e distribuidora de energia.",
    icon: <Calculator className="h-6 w-6" />,
    details: ["Simulação gratuita", "Sem compromisso", "Resultado imediato"],
    duration: "2 min",
  },
  {
    title: "Envie seus Documentos",
    description: "Basta enviar fotos do seu documento pessoal (RG ou CNH) e de uma fatura de energia recente em seu nome.",
    icon: <FileCheck className="h-6 w-6" />,
    details: ["Apenas documentos essenciais", "Processo pelo celular", "Envio rápido e seguro"],
    duration: "3 min",
  },
  {
    title: "Análise e Aprovação",
    description: "Nossa equipe verifica a titularidade da conta e aprova seu empréstimo rapidamente, sem checagem de score ou histórico financeiro.",
    icon: <BadgeCheck className="h-6 w-6" />,
    details: ["Sem consulta ao SPC/Serasa", "Aprovação expressa", "Sem comprovação de renda"],
    duration: "5 min",
  },
  {
    title: "Receba o Dinheiro via PIX",
    description: "Após aprovação, o valor é transferido via PIX para sua conta bancária, com liberação em até 24 horas.",
    icon: <Banknote className="h-6 w-6" />,
    details: ["Transferência via PIX", "Sem taxas adicionais", "Disponível 24h/7 dias"],
    duration: "Até 24h",
  },
];

// FAQ sobre empréstimo na conta de luz
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quem pode solicitar o empréstimo na conta de luz?",
    answer:
      "Qualquer pessoa que seja titular de uma conta de energia elétrica, com pelo menos 6 meses de histórico de pagamento, pode solicitar o empréstimo. É necessário ser maior de 18 anos e possuir CPF regularizado. A modalidade está disponível para clientes das principais distribuidoras nos estados da Bahia, Ceará, Pernambuco, Rio Grande do Norte, Goiás, São Paulo, Rio de Janeiro, Paraná e Rio Grande do Sul."
  },
  {
    question: "Qual o valor máximo que posso solicitar?",
    answer:
      "Você pode solicitar até R$ 3.300, dependendo da sua localidade e distribuidora de energia. O valor aprovado leva em consideração o histórico de pagamento da sua conta de luz e outros fatores específicos da sua região. Durante a simulação online, você verá exatamente quanto pode solicitar."
  },
  {
    question: "Posso conseguir o empréstimo mesmo estando com nome negativado?",
    answer:
      "Sim! Este é um dos principais diferenciais do Empréstimo na Conta de Luz da Credios. Não realizamos consulta ao SPC/Serasa, pois a aprovação é baseada apenas na titularidade da conta de energia e no histórico de pagamentos da fatura, não no seu histórico de crédito."
  },
  {
    question: "Como funcionam os pagamentos do empréstimo?",
    answer:
      "Os pagamentos são feitos diretamente na sua fatura de energia elétrica. As parcelas são incluídas mensalmente na sua conta de luz, junto com o valor do consumo. Isso torna o pagamento prático, sem necessidade de lembrar datas ou gerenciar boletos adicionais."
  },
  {
    question: "Em quanto tempo o dinheiro cai na minha conta?",
    answer:
      "O processo de aprovação é rápido, geralmente ocorrendo em menos de 10 minutos. Após a aprovação, o dinheiro é enviado via PIX e cai na sua conta em até 24 horas, podendo ocorrer em poucos minutos em alguns casos."
  },
  {
    question: "Preciso comprovar renda para conseguir o empréstimo?",
    answer:
      "Não é necessário comprovar renda. A aprovação é baseada apenas na titularidade da conta de energia elétrica e no histórico de pagamentos da fatura, o que torna o processo muito mais simples e acessível, especialmente para trabalhadores autônomos ou informais."
  }
];

// Depoimentos de clientes
const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Carlos Eduardo",
    location: "Salvador, BA",
    rating: 5,
    comment:
      "Precisava de dinheiro para uma emergência médica e consegui R$ 2.500 em menos de 24 horas. Tudo pelo celular, sem burocracia. As parcelas estão vindo na conta de luz como prometido.",
    source: "whatsapp",
    date: "15/03/2024",
    url: "#"
  },
  {
    name: "Maria Aparecida",
    location: "Fortaleza, CE",
    rating: 5,
    comment:
      "Sou autônoma e sempre tenho dificuldade com empréstimos por não ter como comprovar renda. Com a Credios foi super tranquilo, só precisei da conta de luz e meu RG. Recomendo muito!",
    source: "facebook",
    date: "28/02/2024",
    url: "#"
  },
  {
    name: "José Antônio",
    location: "São Paulo, SP",
    rating: 4,
    comment:
      "Estava com nome no Serasa e precisava de dinheiro para reformar meu pequeno comércio. Este foi o único empréstimo que consegui. O dinheiro caiu na minha conta via PIX no dia seguinte.",
    source: "google",
    date: "05/03/2024",
    url: "#"
  },
  {
    name: "Luciana Silva",
    location: "Recife, PE",
    rating: 5,
    comment:
      "Achei que era golpe no início, parecia bom demais! Mas é tudo verdade. Fiz pelo celular mesmo, mandei a conta de luz e meus documentos. Em poucas horas o dinheiro já estava na minha conta.",
    source: "instagram",
    date: "10/03/2024",
    url: "#"
  },
];

// ==========================================
// COMPONENTES DA SEÇÃO
// ==========================================

// 1. WHAT IS - O que é o empréstimo na conta de luz
const WhatIsLoanSection = () => {
  return (
    <section className="pt-10 pb-0 bg-gradient-to-b from-white to-blue-50/30" id="o-que-e">
      <div className="container mx-auto px-4">
        <div className="relative rounded-xl overflow-hidden">
          {/* Background com efeito de gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-blue-50/30 to-orange-50/40"></div>
          
          <div className="relative z-10 py-8 px-6 md:py-12 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                {/* Título principal com estilo mais impactante */}
                <div className="mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" itemProp="name">
                    Empréstimo na <span className="text-orange-500">Conta de Luz</span>
                  </h1>
                  <div className="h-1.5 w-20 bg-blue-500 mb-4 rounded-full"></div>
                  <p className="text-lg md:text-xl font-medium text-gray-700">
                    Até <span className="text-orange-500 font-bold">R$ 3.300</span> usando sua fatura de energia como garantia
                  </p>
              </div>
              
                {/* Lista de vantagens rápidas */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-gray-700">Sem consulta ao SPC/Serasa</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-gray-700">Aprovação facilitada sem comprovação de renda</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-gray-700">Dinheiro via PIX em até 24 horas</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-gray-700">Parcelas incluídas diretamente na sua conta de luz</p>
                  </div>
                </div>
                
                {/* Status e CTA */}
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/70 backdrop-blur-sm p-4 rounded-lg mb-2 border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-sm font-medium flex items-center cursor-pointer">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Disponível agora
                    </div>
                    <div className="text-sm text-gray-600 flex items-center cursor-pointer">
                      <Users className="h-4 w-4 mr-1 text-orange-500" />
                      <span>12 pessoas solicitando nos últimos 30min</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/simulacao">
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 h-auto cursor-pointer"
                        aria-label="Simular empréstimo na conta de luz"
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        Simular Agora
                      </Button>
                    </Link>
                    <Link href="#como-funciona">
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 h-auto cursor-pointer"
                        aria-label="Ver como funciona o empréstimo na conta de luz"
                      >
                        Saiba mais
                      </Button>
                    </Link>
                </div>
                </div>
                </div>
              
              {/* Lado direito - Ilustração */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-amber-100 via-blue-50 to-orange-50 rounded-full overflow-hidden shadow-lg flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <PlugZap className="h-16 w-16 text-amber-500 mb-2" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">Até R$ 3.300</p>
                      <p className="text-sm text-gray-700">usando sua conta de luz</p>
                      <div className="mt-4">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">
                          95% de aprovação
                        </Badge>
                </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cards - Informações em destaque */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Card className="border-blue-100 hover:border-blue-300 transition-colors shadow-sm bg-white/80 backdrop-blur-sm cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Clock className="h-5 w-5" />
                    <CardTitle className="text-base">Digital & Rápido</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Contratação 100% pelo celular, sem sair de casa. Envie documentos e receba via PIX.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-100 hover:border-blue-300 transition-colors shadow-sm bg-white/80 backdrop-blur-sm cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Shield className="h-5 w-5" />
                    <CardTitle className="text-base">Nome Negativado? OK!</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Empréstimo acessível mesmo com restrições de crédito. Sem consulta ao SPC/Serasa.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-100 hover:border-blue-300 transition-colors shadow-sm bg-white/80 backdrop-blur-sm cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Receipt className="h-5 w-5" />
                    <CardTitle className="text-base">Parcelas na Fatura</CardTitle>
              </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Pagamento facilitado com parcelas incluídas na sua conta de energia mensal.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-100 hover:border-blue-300 transition-colors shadow-sm bg-white/80 backdrop-blur-sm cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-orange-600">
                    <PiggyBank className="h-5 w-5" />
                    <CardTitle className="text-base">Sem Comprovação</CardTitle>
          </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Não exigimos comprovação de renda. Perfeito para autônomos e informais.
                  </p>
                </CardContent>
              </Card>
        </div>
      </div>
    </div>
      </div>
    </section>
  );
};

// 2. ADVANTAGES - Vantagens do empréstimo na conta de luz
const AdvantagesSectionContent = () => {
  // SectionHeading reutilizável
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
    className="mb-10 text-center"
    initial="hidden"
    whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    variants={fadeIn}
  >
    {badge && (
        <Badge className="mb-3 bg-amber-100 text-amber-700 py-1 px-3 rounded-full cursor-pointer">
        {badge}
      </Badge>
    )}
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
      {title}
    </h2>
      <div className="h-1 w-16 bg-orange-500 mx-auto mb-4 rounded-full"></div>
      <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
  </motion.div>
);

  // Card de vantagem individual
  const AdvantageCard = ({
    item,
    index,
  }: {
    item: AdvantageItem;
    index: number;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="h-full cursor-pointer"
      >
        <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                {item.icon}
              </div>
              {item.highlight && (
                <Badge className="bg-orange-100 text-orange-700 border-none cursor-pointer">
                  {item.highlight}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-bold mt-2 text-gray-900">
              {item.title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {item.description}
            </CardDescription>
          </CardHeader>
          
          <CardFooter className="pt-0">
            {item.ctaText && item.ctaUrl && (
              <Link href={item.ctaUrl} className="w-full">
                <Button 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-700 font-medium w-full justify-between hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  };
  
  return (
    <section className="py-12 bg-gray-50" id="vantagens">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            badge="Vantagens"
            title="Por Que Escolher o Empréstimo na Conta de Luz?"
            description="Confira os diferenciais desta modalidade de crédito que está transformando o acesso a empréstimos pessoais no Brasil."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((item, index) => (
              <AdvantageCard key={index} item={item} index={index} />
            ))}
          </div>
          
          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="bg-white p-4 rounded-lg text-center border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <p className="text-2xl font-bold text-blue-600">95%</p>
              <p className="text-sm text-gray-600">Taxa de Aprovação</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center border border-orange-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <p className="text-2xl font-bold text-orange-600">24h</p>
              <p className="text-sm text-gray-600">Tempo Médio de Liberação</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <p className="text-2xl font-bold text-blue-600">+30 mil</p>
              <p className="text-sm text-gray-600">Clientes Satisfeitos</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center border border-orange-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <p className="text-2xl font-bold text-orange-600">9 estados</p>
              <p className="text-sm text-gray-600">Disponíveis no Brasil</p>
            </div>
          </div>
          
          {/* CTA após vantagens */}
          <div className="mt-10 text-center">
            <Link href="/simulacao">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full h-auto shadow-sm cursor-pointer"
                aria-label="Simular empréstimo agora"
              >
                Simular Empréstimo Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Sem compromisso | Consulta rápida | Resultado imediato
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 3. HOW IT WORKS - Como funciona o empréstimo
const HowItWorksSection = () => {
  // SectionHeading reutilizável
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
      className="mb-10 text-center"
    initial="hidden"
    whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    variants={fadeIn}
  >
      {badge && (
        <Badge className="mb-3 bg-amber-100 text-amber-700 py-1 px-3 rounded-full cursor-pointer">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
      {title}
    </h2>
      <div className="h-1 w-16 bg-blue-500 mx-auto mb-4 rounded-full"></div>
      <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
  </motion.div>
);
  
  return (
    <section className="py-12 bg-amber-50" id="como-funciona">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            badge="Passo a Passo"
            title="Como Funciona o Empréstimo na Conta de Luz"
            description="Um processo simples e rápido para conseguir crédito usando apenas sua conta de energia elétrica."
          />
          
          <div className="space-y-6">
            {HOW_IT_WORKS.map((step, index) => (
    <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative cursor-pointer"
              >
                {/* Linha conectora */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute top-14 bottom-0 left-6 w-0.5 h-[calc(100%+1rem)] bg-amber-200 z-0"></div>
                )}
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-amber-100 relative z-10 hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm">
                        {step.icon}
              </div>
                      {step.duration && (
                        <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {step.duration}
            </div>
            )}
          </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        <span className="text-orange-500 mr-2">{index + 1}.</span>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      {step.details && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                              <CheckCircle2 className="h-4 w-4 text-blue-500" /> 
                              <span>{detail}</span>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-green-500 text-white p-3 px-6 rounded-full flex items-center gap-2 shadow-sm cursor-pointer">
                <ThumbsUp className="h-5 w-5" />
                <span className="font-medium">Pronto! Dinheiro na sua conta em até 24 horas</span>
              </div>
    </motion.div>
          </div>
          
          {/* CTA após o como funciona */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/simulacao">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-sm h-auto cursor-pointer"
                aria-label="Solicitar empréstimo na conta de luz agora"
              >
                Solicitar Empréstimo Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Processo 100% digital | Sem consulta SPC/Serasa | Dinheiro em até 24h
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 4. TESTIMONIALS - Carrossel de depoimentos
const TestimonialsSection = () => {
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
    }, 300000);

    return () => clearInterval(interval);
  }, [itemWidth, isPaused]);

  const renderStars = (rating: number) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
      <Star 
        key={i} 
          className={`h-3 w-3 sm:h-4 sm:w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill={i < rating ? "currentColor" : "none"}
          strokeWidth={1.5}
      />
    ));

  // Componente para renderizar o ícone correto da plataforma com o nome
  const SocialSourceDisplay = ({ source, className = "" }: { source: string, className?: string }) => {
    switch (source) {
      case 'whatsapp':
        return (
          <div className={`flex items-center gap-1 ${className}`}>
            <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs italic">via WhatsApp</span>
          </div>
        );
      case 'instagram':
        return (
          <div className={`flex items-center gap-1 ${className}`}>
            <AtSign className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
            <span className="text-xs italic">via Instagram</span>
          </div>
        );
      case 'facebook':
        return (
          <div className={`flex items-center gap-1 ${className}`}>
            <AtSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            <span className="text-xs italic">via Facebook</span>
          </div>
        );
      case 'google':
        return (
          <div className={`flex items-center gap-1 ${className}`}>
            <AtSign className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            <span className="text-xs italic">via Google</span>
          </div>
        );
      default:
        return null;
    }
  };

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  // SectionHeading reutilizável
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
      className="mb-10 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
    >
      {badge && (
        <Badge className="mb-3 bg-amber-100 text-amber-700 py-1 px-3 rounded-full cursor-pointer">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
        {title}
      </h2>
      <div className="h-1 w-16 bg-blue-500 mx-auto mb-4 rounded-full"></div>
      <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      <div className="flex items-center justify-center mt-4">
        <div className="flex mr-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} fill="currentColor" className="h-4 w-4 text-yellow-400" />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-900">4.9/5</span>
        <span className="ml-1 text-xs text-gray-500">(328 avaliações)</span>
      </div>
    </motion.div>
  );

  return (
    <section className="py-12 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-orange-200 opacity-10 blur-3xl"></div>
      <div className="absolute -top-20 -left-40 w-80 h-80 rounded-full bg-blue-200 opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            badge="Experiências Reais"
            title="O Que Dizem Nossos Clientes"
            description="Pessoas que utilizaram o empréstimo na conta de luz e compartilharam suas experiências."
          />
          
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
                    className="testimonial-item px-2 cursor-pointer"
                    style={{ minWidth: "280px", maxWidth: "320px" }}
                  >
                    <Card className="h-full border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white group">
                      <CardHeader className="p-4 sm:p-6">
                  <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-orange-400 text-white flex items-center justify-center font-bold relative overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                              {testimonial.name
                                .split(" ")
                                .map((part) => part[0])
                                .join("")
                                .substring(0, 2)}
                      </div>
                      <div>
                              <div className="flex items-center gap-1 text-sm sm:text-base font-medium text-gray-800">
                                {testimonial.name}
                              </div>
                              <div className="text-xs flex items-center gap-1 text-gray-500">
                                <AtSign className="h-3 w-3 text-gray-400" />
                          {testimonial.location}
                      </div>
                              <div className="flex mt-1">{renderStars(testimonial.rating)}</div>
                    </div>
                          </div>
                          <div className="bg-green-100 px-2 py-0.5 rounded text-xs text-green-700 font-medium">
                            Verificado
                    </div>
                  </div>
                </CardHeader>
                      <CardContent className="px-4 sm:px-6 pb-2 pt-0">
                        <p className="text-gray-600 text-xs sm:text-sm italic">&quot;{testimonial.comment}&quot;</p>
                </CardContent>
                      <CardFooter className="text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t pt-3 px-4 sm:px-6 pb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <SocialSourceDisplay source={testimonial.source} />
                        </div>
                        
                  <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
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
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${index === Math.abs(position) % TESTIMONIALS.length ? 'bg-orange-500 w-5 sm:w-6' : 'bg-gray-300'}`}
                  onClick={() => setPosition(-index * itemWidth)}
                  aria-label={`Ver depoimento ${index + 1}`}
                ></button>
              ))}
        </div>
    </div>
        </div>
      </div>
    </section>
  );
};

// 5. FAQ - Perguntas frequentes
const FAQSection = () => {
  // SectionHeading reutilizável
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
      className="mb-10 text-center"
            initial="hidden"
            whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
    >
      {badge && (
        <Badge className="mb-3 bg-amber-100 text-amber-700 py-1 px-3 rounded-full cursor-pointer">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
        {title}
      </h2>
      <div className="h-1 w-16 bg-blue-500 mx-auto mb-4 rounded-full"></div>
      <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          </motion.div>
  );
  
  return (
    <section className="py-12 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            badge="Perguntas Frequentes"
            title="Dúvidas Sobre o Empréstimo na Conta de Luz"
            description="Tire suas dúvidas sobre como conseguir crédito usando sua fatura de energia como garantia."
          />
          
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
            <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white cursor-pointer"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-orange-50 data-[state=open]:bg-orange-50 transition-colors">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-4 w-4" />
                        </div>
                      <span className="text-base font-medium text-gray-800">{item.question}</span>
                          </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-1 text-gray-600 bg-orange-50/30">
                    <div className="flex gap-3">
                      <div className="w-6 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm text-gray-600">{item.answer}</p>
                            </div>
                        </div>
                  </AccordionContent>
                </AccordionItem>
                  </motion.div>
                ))}
          </Accordion>
            
          {/* Suporte */}
            <motion.div 
            className="mt-8 p-4 border border-dashed border-blue-300 rounded-lg bg-blue-50 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
            <h3 className="text-blue-700 font-medium mb-2">Ainda tem dúvidas sobre o empréstimo na conta de luz?</h3>
            <p className="text-blue-600 text-sm mb-4">Nossa equipe está disponível para ajudar</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contato">
                <Button 
                  variant="outline" 
                  className="border-orange-400 text-orange-600 hover:bg-orange-100 rounded-full transition-colors cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Falar com um Especialista
                </Button>
              </Link>
              <Link href="/ajuda">
                <Button 
                  variant="outline" 
                  className="border-blue-400 text-blue-600 hover:bg-blue-100 rounded-full transition-colors cursor-pointer"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Central de Ajuda
                </Button>
              </Link>
                </div>
            </motion.div>
            
          {/* FAQ Schema (escondido, apenas para SEO) */}
          <div className="hidden" itemScope itemType="https://schema.org/FAQPage">
            {FAQ_ITEMS.map((item, index) => (
              <div 
                key={index}
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <meta itemProp="name" content={item.question} />
                <div 
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                >
                  <meta itemProp="text" content={item.answer} />
                        </div>
              </div>
                    ))}
                  </div>
                  </div>
                </div>
    </section>
  );
};

// 6. CTA - Chamada para ação final
const FinalCTA = () => (
  <section className="py-12 bg-gradient-to-r from-blue-500 via-amber-500 to-orange-500 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-10 bg-white/10"></div>
    <div className="absolute bottom-0 left-0 w-full h-10 bg-white/10"></div>
    
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
            <motion.div
          initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
              viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20"
        >
          <Badge className="mb-3 bg-white/20 text-white py-1 px-3 backdrop-blur-sm cursor-pointer">
            CRÉDITO RÁPIDO E FÁCIL
          </Badge>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            <span className="block mb-2">Precisa de Dinheiro Agora?</span>
            <span className="text-5xl text-white drop-shadow-md">
              Use sua <span className="text-yellow-100">Conta de Luz</span>
            </span>
              </h2>
          
          <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
            Mais de <span className="font-bold underline decoration-yellow-200">30 mil brasileiros</span> já
            conseguiram crédito usando a conta de luz como garantia. Tenha o dinheiro que precisa <span className="font-bold">em até 24 horas</span>.
          </p>
          
          <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block cursor-pointer">
            <div className="flex items-center gap-3 text-white">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-orange-500 bg-white flex items-center justify-center text-xs font-bold text-orange-500"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
            </div>
              <div className="text-left">
                <p className="text-sm font-medium">12 empréstimos aprovados</p>
                <p className="text-xs opacity-80">nos últimos 30 minutos</p>
          </div>
        </div>
      </div>
      
          <Link href="/simulacao">
            <Button
              className="bg-white text-blue-600 hover:bg-yellow-50 rounded-full px-8 py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-bold h-auto cursor-pointer"
              aria-label="Solicitar seu crédito agora"
            >
              <span>Solicite Seu Crédito Agora</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
          </Link>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-1 cursor-pointer">
              <CheckCircle2 className="h-4 w-4 text-yellow-200" />
              <span>Sem consulta SPC</span>
                </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-1 cursor-pointer">
              <CheckCircle2 className="h-4 w-4 text-yellow-200" />
              <span>Aprovação facilitada</span>
              </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-1 cursor-pointer">
              <CheckCircle2 className="h-4 w-4 text-yellow-200" />
              <span>Pix em até 24h</span>
                  </div>
                </div>
              </motion.div>
                  </div>
                </div>
  </section>
);

// Botão flutuante de WhatsApp
const FloatingWhatsAppButton = () => {
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
            <Link 
              href="/whatsapp" 
              className="flex items-center bg-green-500 text-white rounded-full p-3 shadow-lg border-2 border-white hover:bg-green-600 transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Fale com um consultor via WhatsApp</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
            </motion.div>
  );
};

// Componente Principal que integra todas as seções
const AdvantagesSection = () => {
  return (
    <section className="w-full overflow-hidden font-sans">
      {/* Estilos Globais */}
      <style jsx global>{globalStyles}</style>
      
      {/* Botão de WhatsApp Fixo */}
      <FloatingWhatsAppButton />
      
      {/* 1. O que é o empréstimo na conta de luz */}
      <WhatIsLoanSection />
      
      {/* 2. Vantagens do empréstimo na conta de luz */}
      <AdvantagesSectionContent />
      
      {/* 3. Como funciona o empréstimo */}
      <HowItWorksSection />
      
      {/* 4. Depoimentos */}
      <TestimonialsSection />
      
      {/* 5. FAQ */}
      <FAQSection />
      
      {/* 6. CTA Final */}
      <FinalCTA />
      
      {/* SEO Schema e metadados (invisíveis) */}
      <div className="hidden" itemScope itemType="https://schema.org/FinancialProduct">
        <meta itemProp="name" content="Empréstimo na Conta de Luz Credios" />
        <meta itemProp="description" content="Empréstimo usando conta de luz como garantia, sem consulta ao SPC/Serasa, com aprovação em minutos e valores de até R$ 3.300." />
        <meta itemProp="url" content="https://credios.com.br/emprestimo-conta-luz" />
        <div itemProp="provider" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="Credios" />
          <meta itemProp="url" content="https://credios.com.br" />
          </div>
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="BRL" />
          <meta itemProp="price" content="3300" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
        </div>
        <div itemProp="areaServed" itemScope itemType="https://schema.org/GeoShape">
          <meta itemProp="description" content="Bahia, Ceará, Pernambuco, Rio Grande do Norte, Goiás, São Paulo, Rio de Janeiro, Paraná e Rio Grande do Sul" />
      </div>
        <div itemProp="interestRate" itemScope itemType="https://schema.org/QuantitativeValue">
          <meta itemProp="value" content="3.99" />
          <meta itemProp="minValue" content="3.99" />
          <meta itemProp="maxValue" content="6.99" />
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;