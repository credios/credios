"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

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
import { Separator } from "@/components/ui/separator";

// Ícones do Lucide
import {
  CheckCircle2,
  Zap,
  ThumbsUp,
  Lightbulb,
  ArrowRight,
  CreditCard,
  FileCheck,
  MapPin,
  AlertCircle,
  DollarSign,
  Clock,
  Percent,
  Award,
  ShieldCheck,
  Info,
  ChevronDown,
  CheckCircle,
  Star,
} from "lucide-react";

// Definição dos ícones customizados
const Calculator = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="8" x2="8" y1="14" y2="14" />
    <line x1="12" x2="12" y1="14" y2="14" />
    <line x1="16" x2="16" y1="14" y2="14" />
    <line x1="8" x2="8" y1="18" y2="18" />
    <line x1="12" x2="12" y1="18" y2="18" />
    <line x1="16" x2="16" y1="18" y2="18" />
  </svg>
);

const Search = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Interfaces
interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  action?: string;
  actionUrl?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  backgroundColor?: string;
  accentColor?: string;
  image?: string;
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
  keywords?: string[];
}

// Mockup aprimorado das vantagens
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: <CheckCircle2 className="h-8 w-8 text-emerald-500" />,
    title: "Aprovação imediata",
    description:
      "Resultado na hora e dinheiro no mesmo dia. Esqueça a burocracia dos bancos tradicionais.",
    highlight: "Em segundos",
    action: "Simular agora",
    actionUrl: "/simular",
    stats: [
      { value: "30s", label: "Tempo médio de resposta" },
      { value: "100%", label: "Digital" },
    ],
    backgroundColor: "from-emerald-50 to-teal-50",
    accentColor: "emerald",
    image: "/images/aprovacao-imediata.png",
  },
  {
    icon: <Zap className="h-8 w-8 text-amber-500" />,
    title: "Até R$ 3.300,00 liberados",
    description:
      "Acesse o valor que você precisa sem complicação, mesmo se estiver com restrições no nome.",
    highlight: "Valor máximo",
    action: "Ver condições",
    actionUrl: "/condicoes",
    stats: [
      { value: "R$3.300", label: "Valor máximo" },
      { value: "12×", label: "Parcelamento" },
    ],
    backgroundColor: "from-amber-50 to-yellow-50",
    accentColor: "amber",
    image: "/images/credito-liberado.png",
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-blue-500" />,
    title: "Disponível mesmo negativado",
    description:
      "Seu histórico de crédito não é um problema. Avaliamos seu perfil de forma personalizada.",
    highlight: "Sem consulta",
    action: "Verificar elegibilidade",
    actionUrl: "/elegibilidade",
    stats: [
      { value: "0", label: "Consultas SPC/Serasa" },
      { value: "95%", label: "Taxa de aprovação" },
    ],
    backgroundColor: "from-blue-50 to-indigo-50",
    accentColor: "blue",
    image: "/images/sem-restricoes.png",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-purple-500" />,
    title: "100% digital e seguro",
    description:
      "Todo o processo é feito pelo seu celular com criptografia avançada e proteção de dados.",
    highlight: "Rápido e prático",
    action: "Conhecer o processo",
    actionUrl: "/processo",
    stats: [
      { value: "24h", label: "Atendimento" },
      { value: "SSL", label: "Criptografia" },
    ],
    backgroundColor: "from-purple-50 to-fuchsia-50",
    accentColor: "purple",
    image: "/images/seguranca-digital.png",
  },
];

// Dados aprimorados sobre o funcionamento
const HOW_IT_WORKS: ProcessStep[] = [
  {
    title: "Simulação rápida",
    description: "Informe apenas seu CPF e descubra quanto você pode receber, sem afetar seu score de crédito",
    icon: <Calculator className="h-6 w-6" />,
    details: [
      "Resultado instantâneo sem compromisso",
      "Não fazemos consulta ao SPC/Serasa",
      "Escolha o valor que melhor se adapta ao seu orçamento"
    ],
    duration: "30 segundos"
  },
  {
    title: "Documentação simplificada",
    description: "Apenas fotos do seu documento e conta de luz recente, sem burocracia",
    icon: <FileCheck className="h-6 w-6" />,
    details: [
      "RG ou CNH (frente e verso)",
      "Conta de luz mais recente onde você é o titular",
      "Não precisa de comprovante de renda ou fiador"
    ],
    duration: "2 minutos"
  },
  {
    title: "Análise inteligente",
    description: "Nossa tecnologia avalia seu perfil de forma personalizada e segura",
    icon: <Search className="h-6 w-6" />,
    details: [
      "Tecnologia exclusiva com Inteligência Artificial",
      "Verificação de elegibilidade 24h por dia",
      "Sistema anti-fraude para proteger seus dados"
    ],
    duration: "5 minutos"
  },
  {
    title: "Recebimento imediato",
    description: "Dinheiro liberado via PIX diretamente na sua conta bancária",
    icon: <CreditCard className="h-6 w-6" />,
    details: [
      "Transferência instantânea para sua conta",
      "Confirmação por e-mail e SMS",
      "Suporte contínuo após a liberação do crédito"
    ],
    duration: "Mesmo dia"
  },
];

// Estados disponíveis com dados adicionais
const AVAILABLE_STATES = [
  { name: "Bahia" },
  { name: "Ceará" },
  { name: "Pernambuco" },
  { name: "Rio Grande do Norte" },
  { name: "Goiás" },
  { name: "São Paulo" },
  { name: "Rio de Janeiro" },
  { name: "Paraná" },
  { name: "Rio Grande do Sul" },
];

// Perguntas frequentes aprimoradas
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "É necessário ser o titular da conta de luz?",
    answer: "Sim, apenas o titular da conta pode solicitar o empréstimo.",
    keywords: ["titular", "conta", "energia"]
  },
  {
    question: "É liberado para negativados?",
    answer: "Sim, mesmo que você esteja negativado o empréstimo pode ser liberado mediante a análise prévia.",
    keywords: ["negativado", "restrição", "nome sujo"]
  },
  {
    question: "A conta para depósito do crédito pode ser em nome de terceiros?",
    answer: "Não, a conta para depósito do crédito deve ser obrigatoriamente a do titular da fatura de energia.",
    keywords: ["conta", "depósito", "terceiros"]
  },
  {
    question: "Em quais cidades está disponível o empréstimo na conta de luz?",
    answer: "O empréstimo na conta de luz está disponível na maioria das cidades dos estados BAHIA, CEARÁ, PERNAMBUCO, RIO GRANDE DO NORTE, GOIÁS, SÃO PAULO, RIO DE JANEIRO, PARANÁ e RIO GRANDE DO SUL.",
    keywords: ["cidades", "estados", "disponibilidade"]
  },
  {
    question: "É necessário comprovar renda?",
    answer: "Não é necessário comprovar renda, e o empréstimo na conta de luz também está disponível para autônomos e profissionais liberais.",
    keywords: ["renda", "comprovação", "autônomos"]
  },
  {
    question: "O que é a Credios?",
    answer: "A Credios é uma fintech criada para você ter acesso fácil e rápido ao crédito que precisa. Somos parceiros dos melhores bancos do mercado e apresentamos a você as melhores ofertas para garantir as menores taxas de juros. Com a Credios, você contrata seu empréstimo de forma totalmente digital e recebe o dinheiro na sua conta sem complicações.",
    keywords: ["credios", "fintech", "empresa"]
  }
];

// Animações reutilizáveis
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// CTA card principal
const MainCtaCard = () => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto my-12"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 -z-10"></div>
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-orange-400/20 -z-10 translate-x-1/3 -translate-y-1/3 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-300/10 -z-10 -translate-x-1/3 translate-y-1/3 blur-2xl"></div>
      
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8 items-center">
        <div>
          <div className="flex mb-4">
            <Badge className="bg-green-500 text-white border-0 px-3 py-1.5 font-medium text-sm flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="h-4 w-4" />
              Aprovação em minutos
            </Badge>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">Pronto para começar?</h3>
          <p className="text-gray-600 mb-6">
            Simule agora e descubra quanto você pode receber. O processo é rápido, seguro e sem burocracia.
          </p>
          
          <a href="/simular" className="block w-full md:w-auto cursor-pointer">
            <Button className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-4 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-lg">
              Simular sem compromisso
            </Button>
          </a>
          
          <p className="text-xs text-gray-500 mt-3 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1.5" /> 
            Consulta não afeta seu score de crédito
          </p>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-md hidden md:block">
          <Image
            src="/images/woman-smiling.png" 
            alt="Cliente satisfeita com empréstimo na conta de luz"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Componentes Reutilizáveis
const SectionHeading = ({ 
  title, 
  description, 
  badge 
}: { 
  title: string, 
  description: string, 
  badge?: string 
}) => (
  <motion.div 
    className="mb-10 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeIn}
  >
    {badge && (
      <Badge className="mb-4 px-3 py-1.5 bg-orange-100 text-orange-700 hover:bg-orange-200 border-none font-medium">
        {badge}
      </Badge>
    )}
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
      {title}
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
      {description}
    </p>
  </motion.div>
);

const SubSectionHeading = ({ 
  title, 
  description, 
  eyebrow,
  icon
}: { 
  title: string, 
  description: string, 
  eyebrow?: string,
  icon?: React.ReactNode
}) => (
  <motion.div 
    className="mb-10 md:mb-16 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeIn}
  >
    {eyebrow && (
      <div className="mb-3 flex justify-center items-center gap-2">
        {icon && <span className="text-orange-500">{icon}</span>}
        <span className="text-orange-600 font-bold uppercase tracking-wide text-sm">{eyebrow}</span>
      </div>
    )}
    <h2 className="text-2xl sm:text-3xl font-bold mb-3">
      {title}
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto text-base">
      {description}
    </p>
  </motion.div>
);

const AdvantageCard = ({ 
  item, 
  index 
}: { 
  item: AdvantageItem, 
  index: number 
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const colorMap: Record<string, string> = {
    emerald: "group-hover:from-emerald-500 group-hover:to-emerald-600",
    amber: "group-hover:from-amber-500 group-hover:to-amber-600",
    blue: "group-hover:from-blue-500 group-hover:to-blue-600",
    purple: "group-hover:from-purple-500 group-hover:to-purple-600",
  };
  
  const accentColor = colorMap[item.accentColor || "emerald"];
  
  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      variants={fadeIn}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <Card className={`h-full border-0 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-500 overflow-hidden group relative bg-gradient-to-br ${item.backgroundColor || "from-gray-50 to-gray-100"}`}>
        {/* Overlay effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-95 transition-opacity duration-500 z-10`}></div>
        
        {/* Card content with overlay effect */}
        <div className="absolute inset-0 bg-[url('/images/dot-pattern.svg')] opacity-5"></div>
        
        {/* Top corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-400/20 to-transparent rounded-bl-full"></div>
        
        <CardHeader className="relative z-20">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white shadow-md transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
              <div className="group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
            </div>
            
            {item.highlight && (
              <Badge className="bg-orange-500 text-white border-0 px-3 py-1.5 text-xs uppercase font-semibold tracking-wide group-hover:bg-white group-hover:text-orange-600 transition-colors duration-300">
                {item.highlight}
              </Badge>
            )}
          </div>
          
          <CardTitle className="text-2xl font-bold mt-4 group-hover:text-white transition-colors duration-300">
            {item.title}
          </CardTitle>
          
          <CardDescription className="text-base mt-2 group-hover:text-white/90 transition-colors duration-300">
            {item.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-20">
          {item.stats && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              {item.stats.map((stat, i) => (
                <div key={i} className="bg-white/80 group-hover:bg-white/20 p-3 rounded-lg transition-colors duration-300">
                  <p className="text-2xl font-bold text-orange-600 group-hover:text-white transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0 z-20 relative">
          {item.action && (
            <a 
              href={item.actionUrl || "#"} 
              className="inline-flex items-center pl-0 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300 group-hover:text-white cursor-pointer"
            >
              {item.action} 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Main Component
export default function CrediosLoanSection() {
  // Estados
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  return (
    <section className="w-full overflow-hidden">
      {/* SEÇÃO PRINCIPAL - VANTAGENS */}
      <div className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Elementos decorativos de background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-10 blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-10 blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/4"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-100 rounded-full opacity-10 blur-3xl -z-10"></div>
          
          {/* Título da seção principal */}
          <SectionHeading 
            badge="Solução financeira inovadora"
            title="Empréstimo na Conta de Luz"
            description="A maneira mais inteligente e rápida para conseguir o crédito que você precisa, sem complicações ou burocracia."
          />
          
          {/* Subseção de Vantagens */}
          <div className="mt-16">
            <SubSectionHeading 
              eyebrow="Por que escolher a Credios" 
              icon={<Star className="h-4 w-4" />}
              title="Vantagens exclusivas para você"
              description="Descomplicamos o acesso ao crédito para que você resolva sua necessidade financeira com rapidez e segurança."
            />
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {ADVANTAGES.map((item, index) => (
                <AdvantageCard key={index} item={item} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA PRINCIPAL */}
      <MainCtaCard />
      
      {/* SEÇÃO COMO FUNCIONA */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Subseção de Como Funciona */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="flex justify-center mb-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 rounded-full text-blue-600 border border-blue-200">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wide">Processo descomplicado</span>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Como funciona o empréstimo na conta de luz
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Obtenha crédito em 4 etapas simples pelo seu celular. Usando sua conta de luz como garantia, dispensamos consultas ao SPC/Serasa. Ideal para negativados, com parcelas incluídas na sua fatura mensal de energia e disponível em 9 estados.
            </motion.p>
            
            <motion.div 
              className="bg-white p-8 rounded-2xl border border-blue-100 mb-12 shadow-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 border border-blue-200">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Conheça nossas etapas simplificadas</h3>
              </div>
              
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Com nosso processo 100% digital, você obtém empréstimo sem sair de casa. Não é preciso comprovação de renda ou análise de crédito tradicional – a conta de luz é sua garantia. Aprovação imediata e dinheiro no mesmo dia direto na sua conta.
              </p>
              
              <div className="space-y-5 max-w-2xl mx-auto">
                {HOW_IT_WORKS.map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {index < HOW_IT_WORKS.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
                    )}
                    
                    <motion.div 
                      className="bg-blue-50 border border-blue-100 rounded-xl p-5 transition-all duration-300 hover:bg-white hover:border-blue-200 hover:shadow-md group"
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 border border-blue-200 group-hover:bg-blue-200 transition-colors duration-300">
                          <span className="font-bold text-lg">0{index + 1}</span>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                              {step.title}
                            </h4>
                            
                            {step.duration && (
                              <Badge className="bg-blue-100 text-blue-600 border border-blue-200 group-hover:bg-blue-200 transition-colors duration-300">
                                <Clock className="h-3 w-3 mr-1" /> {step.duration}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mt-1">
                            {step.description}
                          </p>
                          
                          {step.details && (
                            <div className="mt-3 pt-3 border-t border-blue-100">
                              <ul className="space-y-2">
                                {step.details.map((detail, i) => (
                                  <li key={i} className="flex items-start text-gray-600 text-sm">
                                    <CheckCircle className="h-4 w-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="font-semibold text-gray-800">Vantagens exclusivas</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    "Aprovação imediata em 30 segundos",
                    "Disponível mesmo para negativados",
                    "Não precisa comprovar renda",
                    "Processo 100% digital pelo celular"
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start text-gray-600 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="font-semibold text-gray-800">Informações importantes</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    "É necessário ser o titular da conta de luz",
                    "As parcelas são incluídas na fatura de energia",
                    "Valor liberado de até R$ 3.300",
                    "Parcele em até 12 vezes"
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start text-gray-600 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      <Info className="h-4 w-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
            
            {/* Box de disponibilidade regional */}
            <motion.div 
              className="max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <div className="flex items-start p-5 md:p-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Disponibilidade regional</h3>
                    <p className="text-sm text-gray-600">Estados onde oferecemos o serviço de empréstimo na conta de luz</p>
                  </div>
                </div>
                
                <div className="p-5 md:p-6 pt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 mb-4">
                    {AVAILABLE_STATES.map((state, index) => (
                      <motion.div 
                        key={state.name} 
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-white border border-slate-200 rounded-lg px-2 py-3 flex items-center justify-center text-center">
                          <span className="font-medium text-gray-700">
                            {state.name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      O crédito na conta de luz é uma parceria da <span className="font-bold text-gray-700">Credios</span> com a <span className="font-bold text-gray-700">Crefaz</span> e está disponível na 
                      maioria das cidades dos estados listados. <a href="/simulacao" className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer">Consulte disponibilidade durante a simulação →</a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* SEÇÃO FAQ */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Elementos decorativos */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-100/30 rounded-full -z-10 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-100/30 rounded-full -z-10 blur-3xl"></div>
          
          {/* Subseção de Perguntas Frequentes */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-10 md:mb-16 text-center"
            >
              <div className="mb-3 flex justify-center items-center gap-2">
                <motion.span 
                  className="text-blue-600"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <AlertCircle className="h-5 w-5" />
                </motion.span>
                <span className="text-blue-600 font-bold uppercase tracking-wide text-sm">Dúvidas comuns</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800">
                Perguntas Frequentes
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base">
                Encontre respostas para as dúvidas mais comuns sobre o empréstimo na conta de luz.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  {FAQ_ITEMS.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="overflow-hidden"
                    >
                      <Card className={`border overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'shadow-md' : 'shadow-sm'} hover:shadow-md`}>
                        <motion.button
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                          className={`w-full p-4 flex justify-between items-center text-left font-medium transition-colors duration-300 cursor-pointer ${
                            expandedFaq === index ? "bg-blue-50/70" : "bg-white hover:bg-gray-50"
                          }`}
                          aria-expanded={expandedFaq === index}
                          whileHover={{ backgroundColor: expandedFaq === index ? "" : "rgba(243, 244, 246, 1)" }}
                        >
                          <span className={`text-base transition-colors duration-300 ${expandedFaq === index ? "text-blue-700" : "text-gray-800"}`}>
                            {item.question}
                          </span>
                          <motion.div 
                            className={`flex-shrink-0 ml-4 p-1 rounded-full transition-colors duration-300 ${
                              expandedFaq === index ? "bg-blue-200" : "bg-gray-100 hover:bg-blue-100"
                            }`}
                            animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown 
                              className={`h-4 w-4 transition-colors duration-300 ${
                                expandedFaq === index ? "text-blue-600" : "text-gray-500"
                              }`} 
                            />
                          </motion.div>
                        </motion.button>
                        
                        <AnimatePresence initial={false}>
                          {expandedFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <CardContent className="px-4 pt-0 pb-4">
                                <Separator className="mb-3 mt-1" />
                                <p className="text-sm text-gray-700 leading-relaxed">{item.answer}</p>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="border shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-bold text-blue-800 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-blue-600" />
                        Benefícios do empréstimo na conta de luz
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2.5">
                        {[
                          { icon: <Clock className="h-4 w-4 text-green-500" />, text: "Aprovação em menos de 30 segundos" },
                          { icon: <ShieldCheck className="h-4 w-4 text-green-500" />, text: "Não consulta SPC/Serasa" },
                          { icon: <DollarSign className="h-4 w-4 text-green-500" />, text: "Não precisa comprovar renda" },
                          { icon: <Percent className="h-4 w-4 text-green-500" />, text: "Taxas competitivas no mercado" },
                          { icon: <Award className="h-4 w-4 text-green-500" />, text: "Mais de 200 mil clientes satisfeitos" },
                        ].map((item, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-center gap-2.5"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-7 h-7 bg-green-50 rounded-full flex items-center justify-center">
                              {item.icon}
                            </div>
                            <span className="text-sm">{item.text}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <Separator className="my-5" />
                      
                      <p className="text-center text-sm text-gray-500">
                        Ainda tem dúvidas? <a href="/contato" className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer">Fale conosco</a>
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA SECUNDÁRIO */}
      <motion.div 
        className="py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div 
            className="bg-blue-500 rounded-xl overflow-hidden shadow-lg border border-blue-400"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="px-6 py-10 sm:px-10 sm:py-12 text-center">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold mb-3 text-white"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Resolva sua necessidade financeira hoje
              </motion.h3>
              <motion.p 
                className="text-white opacity-90 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Mais de 200 mil clientes já escolheram o empréstimo na conta de luz. Junte-se a eles e tenha acesso ao crédito que você precisa.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <a href="/simular" className="inline-block cursor-pointer">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 cursor-pointer px-8 py-3 text-lg font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                    Simular agora
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}