"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Calculator as CalculatorIcon,
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
    title: "Simulação",
    description: "Veja quanto você pode receber com apenas seu CPF",
    icon: <Calculator className="h-6 w-6" />,
    details: [
      "Insira seu CPF para consulta sem impacto no score",
      "Resultado personalizado e instantâneo",
      "Possibilidade de ajustar o valor solicitado"
    ],
    duration: "30 segundos"
  },
  {
    title: "Documentação",
    description: "Apenas fotos do seu documento e conta de luz recente",
    icon: <FileCheck className="h-6 w-6" />,
    details: [
      "RG ou CNH (frente e verso) em boa qualidade",
      "Conta de luz do último mês como titular",
      "Não precisa de comprovante de renda"
    ],
    duration: "2 minutos"
  },
  {
    title: "Análise",
    description: "Avaliação automatizada com Inteligência Artificial",
    icon: <Search className="h-6 w-6" />,
    details: [
      "Validação das informações sem burocracia",
      "Sem contato com atendentes ou gerentes",
      "Sistema seguro e à prova de fraudes"
    ],
    duration: "5 minutos"
  },
  {
    title: "Recebimento",
    description: "Dinheiro liberado via PIX diretamente na sua conta",
    icon: <CreditCard className="h-6 w-6" />,
    details: [
      "Transferência via PIX em minutos",
      "Sem taxa de transferência ou IOF",
      "Confirmação por e-mail e SMS"
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
    question: "Como as parcelas são cobradas?",
    answer: "As parcelas são incluídas diretamente na sua fatura mensal de energia elétrica, simplificando seu orçamento. Esse método facilita o pagamento e evita a necessidade de boletos adicionais, lembretes ou aplicativos extra para gerenciar os pagamentos.",
    keywords: ["cobrança", "pagamento", "energia"]
  },
  {
    question: "Qual o prazo máximo para pagamento?",
    answer: "Você pode parcelar seu empréstimo em até 12 vezes (12 meses), com valores que se adaptam ao seu orçamento mensal. As parcelas têm valor fixo, sem reajustes de inflação ou variações que podem comprometer seu planejamento financeiro.",
    keywords: ["parcelas", "prazo", "meses"]
  },
  {
    question: "Preciso estar adimplente com a concessionária?",
    answer: "Sim, é necessário estar com as contas de luz em dia para solicitar o empréstimo. Isso garante que seu contrato com a concessionária esteja ativo e regular, permitindo a inclusão das parcelas nas faturas futuras de energia elétrica.",
    keywords: ["adimplente", "dívida", "conta"]
  },
  {
    question: "Quais documentos são necessários para contratar?",
    answer: "Precisamos apenas de uma foto do seu documento de identidade (RG ou CNH) e uma cópia de sua conta de luz mais recente, onde você consta como titular. Não solicitamos comprovante de renda, holerite, extratos bancários ou outros documentos normalmente exigidos por instituições financeiras tradicionais.",
    keywords: ["documentos", "contratação", "identidade"]
  },
  {
    question: "O que acontece se eu não pagar a conta de luz?",
    answer: "O não pagamento da conta de luz, que inclui a parcela do empréstimo, pode levar a penalidades conforme regras da concessionária, incluindo multa, juros, negativação e possibilidade de corte do serviço. Recomendamos sempre manter seus pagamentos em dia para evitar transtornos.",
    keywords: ["inadimplência", "atraso", "penalidade"]
  },
  {
    question: "Consigo antecipar as parcelas do empréstimo?",
    answer: "Sim, você pode antecipar o pagamento das parcelas a qualquer momento, recebendo desconto proporcional nos juros. Para isso, entre em contato com nosso atendimento para solicitar um boleto de quitação com o valor atualizado e instruções de pagamento.",
    keywords: ["antecipação", "quitação", "desconto"]
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

// CTA card redesenhado e mais limpo
const ActionCtaCard = () => {
  return (
    <motion.div
      className="bg-cream-50 rounded-xl overflow-hidden border border-amber-100 shadow-md"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="p-5 relative">
        {/* Background gradient shape */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[linear-gradient(135deg,#FEF6E4_0%,#FFFAF0_100%)] -z-10"></div>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-orange-400/20 -z-10 translate-x-1/3 -translate-y-1/3 blur-xl"></div>
        
        {/* Content container */}
        <div className="flex flex-col items-center">
          {/* Image with circular crop */}
          <div className="relative mb-3 rounded-full w-40 h-40 overflow-hidden bg-orange-400/30 border-4 border-white">
            <Image
              src="/images/woman-smiling.png" 
              alt="Cliente satisfeita com empréstimo"
              fill
              className="object-cover object-center"
            />
          </div>
          
          {/* Badge "Aprovação em minutos" */}
          <div className="mb-3">
            <Badge className="bg-green-100 text-green-700 border-0 px-2.5 py-1.5 font-medium text-sm flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Aprovação em minutos
            </Badge>
          </div>
          
          {/* CTA Content */}
          <div className="text-center mb-3">
            <h3 className="text-xl font-bold mb-2">Pronto para começar?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Simule agora e descubra quanto você pode receber
            </p>
            
            {/* Button */}
            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-6 rounded-lg shadow-md">
              Simular sem compromisso
            </Button>
            
            {/* Disclaimer */}
            <p className="text-xs text-gray-500 mt-3 flex items-center justify-center">
              <AlertCircle className="h-3 w-3 mr-1.5" /> 
              Consulta não afeta seu score de crédito
            </p>
          </div>
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
            <Button 
              variant="ghost" 
              className="pl-0 text-orange-600 hover:text-orange-700 hover:bg-transparent group-hover:text-white font-medium transition-colors duration-300"
            >
              {item.action} 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ProcessStepCard = ({ 
  step, 
  index, 
  isLast = false,
  isExpanded,
  toggleStep,
}: { 
  step: ProcessStep, 
  index: number,
  isLast?: boolean,
  isExpanded: boolean,
  toggleStep: () => void,
}) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Linha conectora */}
      {!isLast && (
        <div className="absolute left-5 top-8 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-orange-100 hidden md:block"></div>
      )}
      
      <div className={`relative mb-5 last:mb-0 ${isExpanded ? 'z-10' : ''}`}>
        <Card className={`border border-gray-100 transition-all duration-300 ${isExpanded ? 'shadow-md' : 'shadow'}`}>
          <div className="p-4 flex items-start gap-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${isExpanded ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500 border border-orange-300'}`}>
              {step.icon}
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-semibold flex items-center text-gray-800">
                    <span className="mr-1.5 text-orange-500 font-bold">0{index + 1}.</span> 
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {step.description}
                  </p>
                  
                  {step.duration && (
                    <Badge variant="outline" className="mt-1.5 text-xs bg-orange-50 text-orange-600 border-orange-200 px-2 py-0">
                      <Clock className="h-3 w-3 mr-1" /> {step.duration}
                    </Badge>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleStep}
                  className="rounded-full h-7 w-7 p-0 ml-1"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? "Fechar detalhes" : "Ver detalhes"}
                >
                  <ChevronDown className={`h-4 w-4 text-orange-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && step.details && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0 pb-3 px-4 bg-orange-50/50">
                  <Separator className="mb-3 mt-0" />
                  <ul className="space-y-1.5">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start text-xs text-gray-700">
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </motion.div>
  );
};

const StatesOverview = () => {
  return (
    <motion.div
      className="mt-6 pt-4 border-t border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h4 className="text-base font-semibold mb-4 flex items-center">
        <MapPin className="mr-2 h-4 w-4 text-orange-500" />
        Cobertura por Estado
      </h4>
      
      <div className="bg-white rounded-xl border border-gray-100 shadow-inner p-3">
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {AVAILABLE_STATES.map((state) => (
            <Badge 
              key={state.name} 
              variant="outline" 
              className="bg-gray-50 hover:bg-orange-50 border-gray-200 py-1.5 justify-center text-gray-700 transition-colors duration-200"
            >
              {state.name}
            </Badge>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3 flex items-center">
        <Info className="h-3.5 w-3.5 mr-1.5 text-orange-400" />
        A disponibilidade pode variar conforme a concessionária de energia da sua região.
      </p>
    </motion.div>
  );
};

const FaqAccordion = ({ 
  items, 
  expandedIndex, 
  setExpandedIndex,
}: {
  items: FaqItem[],
  expandedIndex: number | null,
  setExpandedIndex: React.Dispatch<React.SetStateAction<number | null>>,
}) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          viewport={{ once: true }}
          className="overflow-hidden"
        >
          <Card className={`border overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'shadow-md' : 'shadow-sm'}`}>
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className={`w-full p-4 flex justify-between items-center text-left font-medium transition-colors duration-300 ${
                expandedIndex === index ? "bg-orange-50/70" : "bg-white hover:bg-gray-50"
              }`}
              aria-expanded={expandedIndex === index}
            >
              <span className={`text-base transition-colors duration-300 ${expandedIndex === index ? "text-orange-700" : "text-gray-800"}`}>
                {item.question}
              </span>
              <div className={`flex-shrink-0 ml-4 p-1 rounded-full transition-colors duration-300 ${
                expandedIndex === index ? "bg-orange-200" : "bg-gray-100"
              }`}>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180 text-orange-600" : "text-gray-500"
                  }`} 
                />
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <CardContent className="px-4 pt-0 pb-4">
                    <Separator className="mb-3 mt-1" />
                    <p className="text-sm text-gray-700 leading-relaxed">{item.answer}</p>
                    
                    {item.keywords && (
                      <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5">
                        {item.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-gray-100/80 text-gray-700 hover:bg-gray-200 transition-colors text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// CTA card para simulação
const SimulationCta = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-blue-700 flex items-center">
          <CalculatorIcon className="mr-2 h-5 w-5 text-blue-600" />
          Simule seu empréstimo agora
        </CardTitle>
        <CardDescription className="text-blue-600/80">
          Descubra em segundos quanto você pode receber
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-white/70 rounded-lg p-3 shadow-sm border border-blue-100 mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Valor disponível:</span>
            <Badge className="bg-blue-100 text-blue-700 border-none">Até R$ 3.300</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Parcelas:</span>
            <Badge className="bg-blue-100 text-blue-700 border-none">Até 12x</Badge>
          </div>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Simular sem compromisso
        </Button>
        <p className="text-xs text-blue-700/70 mt-2 flex items-center justify-center">
          <CheckCircle2 className="h-3 w-3 mr-1" /> 
          Sem impacto no seu score de crédito
        </p>
      </CardContent>
    </Card>
  );
};

export default function AdvantagesSection() {
  // Estado para controlar a seção ativa
  const [activeSection, setActiveSection] = useState<string>("vantagens");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  
  // Estado para verificar se estamos em desktop
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Referência para a seção de conteúdo
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Efeito para verificar o tamanho da tela e atualizar quando houver resize
  useEffect(() => {
    // Função para checar se estamos em viewport desktop
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };
    
    // Verificação inicial
    checkIsDesktop();
    
    // Adicionar event listener para atualizar em caso de redimensionamento
    window.addEventListener('resize', checkIsDesktop);
    
    // Cleanup do event listener
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);
  
  // Efeito para rolar suavemente para o conteúdo quando trocar de seção no mobile
  useEffect(() => {
    if (!isDesktop && contentRef.current) {
      // Espera um pouco para a animação começar antes de rolar
      setTimeout(() => {
        const yOffset = -80; // Ajuste para compensar a altura do header fixo
        const y = (contentRef.current?.getBoundingClientRect().top ?? 0) + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 150);
    }
  }, [activeSection, isDesktop]);

  // Função para alternar as seções
  const changeSection = (section: string) => {
    setActiveSection(section);
  };

  return (
    <section className="w-full py-14 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Elementos decorativos de background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-10 blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-10 blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/4"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-100 rounded-full opacity-10 blur-3xl -z-10"></div>
        
        {/* Título da seção principal */}
        <SectionHeading 
          badge="Solução financeira inovadora"
          title="Empréstimo na Conta de Luz"
          description="A maneira mais inteligente para conseguir o crédito que você precisa, sem complicações."
        />
        
        {/* Desktop: Tabs de navegação */}
        {isDesktop ? (
          <Tabs defaultValue="vantagens" className="mb-10">
            <div className="flex justify-center">
              <TabsList className="mb-12 bg-white p-1.5 rounded-xl shadow-md border border-gray-100">
                <TabsTrigger 
                  value="vantagens" 
                  className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 px-6 py-2.5 rounded-lg transition-all hover:bg-orange-50/50"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Vantagens
                </TabsTrigger>
                <TabsTrigger 
                  value="como-funciona" 
                  className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 px-6 py-2.5 rounded-lg transition-all hover:bg-orange-50/50"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Como Funciona
                </TabsTrigger>
                <TabsTrigger 
                  value="perguntas" 
                  className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 px-6 py-2.5 rounded-lg transition-all hover:bg-orange-50/50"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Perguntas Frequentes
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Conteúdo das tabs desktop */}
            <TabsContent value="vantagens" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Cards de vantagens */}
                {ADVANTAGES.map((item, index) => (
                  <AdvantageCard key={index} item={item} index={index} />
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="como-funciona" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Etapas do processo para desktop - coluna ajustada para 2/3 */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full mr-3">
                      <Zap className="h-4 w-4" />
                    </span>
                    Processo simplificado em 4 etapas
                  </h3>

                  <div className="relative space-y-0">
                    {HOW_IT_WORKS.map((step, index) => (
                      <ProcessStepCard 
                        key={index}
                        step={step}
                        index={index}
                        isLast={index === HOW_IT_WORKS.length - 1}
                        isExpanded={expandedStep === index}
                        toggleStep={() => setExpandedStep(expandedStep === index ? null : index)}
                      />
                    ))}
                  </div>

                  <StatesOverview />
                </div>

                {/* Imagem e Call-to-action para desktop */}
                <div className="lg:col-span-1 self-start sticky top-24">
                  <ActionCtaCard />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="perguntas" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-5">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                      <span className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full mr-3">
                        <AlertCircle className="h-4 w-4" />
                      </span>
                      Perguntas Frequentes
                    </h3>
                    
                    <p className="text-gray-600 text-sm">
                      Encontre respostas para as dúvidas mais comuns sobre o empréstimo na conta de luz.
                    </p>
                  </div>
                  
                  <FaqAccordion 
                    items={FAQ_ITEMS}
                    expandedIndex={expandedFaq}
                    setExpandedIndex={setExpandedFaq}
                  />
                </div>
                
                <div className="lg:col-span-1 space-y-5">
                  {/* Substituir por CTA de simulação mantendo estilo azul */}
                  <SimulationCta />
                  
                  {/* Benefits overview */}
                  <Card className="border shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-bold">Benefícios</CardTitle>
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
                          <li key={index} className="flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-green-50 rounded-full flex items-center justify-center">
                              {item.icon}
                            </div>
                            <span className="text-sm">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          // Mobile: Tabs verticais com nova UI
          <div className="space-y-6">
            {/* Navegação de tabs para mobile - redesenhada com interação visual */}
            <Card className="border border-gray-200 shadow-md overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-gray-200">
                {[
                  { id: "vantagens", label: "Vantagens", icon: <ThumbsUp className="h-4 w-4" /> },
                  { id: "como-funciona", label: "Como Funciona", icon: <Zap className="h-4 w-4" /> },
                  { id: "perguntas", label: "Perguntas", icon: <AlertCircle className="h-4 w-4" /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => changeSection(tab.id)}
                    className={`py-4 px-2 text-sm font-medium transition-all flex flex-col items-center gap-1.5 active:bg-orange-100 ${
                      activeSection === tab.id
                        ? "bg-orange-50 text-orange-600 border-b-2 border-orange-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`${activeSection === tab.id ? "bg-orange-100" : "bg-gray-100"} p-2 rounded-full transition-colors`}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Conteúdo das tabs mobile */}
            <div ref={contentRef} className="mt-4">
              <AnimatePresence mode="wait">
                {/* Conteúdo da tab Vantagens - Mobile */}
                {activeSection === "vantagens" && (
                  <motion.div
                    key="vantagens"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {ADVANTAGES.map((item, index) => (
                      <Card key={index} className="bg-white border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 mt-0.5 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-sm">
                              {item.icon}
                            </div>
                            <div>
                              <div className="flex items-start justify-between">
                                <CardTitle className="text-base font-bold">
                                  {item.title}
                                </CardTitle>
                                {item.highlight && (
                                  <Badge className="ml-2 bg-orange-500 text-white border-0 text-xs">
                                    {item.highlight}
                                  </Badge>
                                )}
                              </div>
                              <CardDescription className="mt-1 text-gray-600 text-sm">
                                {item.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        
                        {item.stats && (
                          <CardContent className="py-2">
                            <div className="grid grid-cols-2 gap-2">
                              {item.stats.map((stat, i) => (
                                <div key={i} className="bg-gray-50 p-2 rounded-lg">
                                  <p className="text-lg font-bold text-orange-600">
                                    {stat.value}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {stat.label}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        )}
                        
                        {item.action && (
                          <CardFooter className="pt-0 pb-3">
                            <Button 
                              variant="ghost" 
                              className="p-0 h-auto text-orange-500 hover:text-orange-600 hover:bg-transparent text-sm font-medium"
                            >
                              {item.action} <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                            </Button>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                    
                    {/* CTA card após os cartões */}
                    <Card className="bg-gradient-to-r from-orange-100 to-amber-100 border-0 shadow-md p-4 mt-6">
                      <CardContent className="p-0 text-center">
                        <h4 className="text-base font-semibold mb-2">Pronto para começar?</h4>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                          Simular sem compromisso
                        </Button>
                        <p className="text-xs text-gray-600 mt-2 flex items-center justify-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> 
                          Consulta não afeta seu score de crédito
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Conteúdo da tab Como Funciona - Mobile (otimizado) */}
                {activeSection === "como-funciona" && (
                  <motion.div
                    key="como-funciona"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <Card className="bg-white border-gray-100 shadow-sm overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-orange-500" />
                          Como funciona o empréstimo
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Processo rápido e sem burocracia
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0 pb-3">
                        <div className="space-y-3">
                          {HOW_IT_WORKS.map((step, index) => (
                            <div key={index} className="flex gap-2.5">
                              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200 shadow-sm mt-0.5">
                                <span className="text-orange-600 font-bold text-xs">{index + 1}</span>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h4 className="text-sm font-semibold text-gray-800">
                                    {step.title}
                                    {step.duration && (
                                      <Badge variant="outline" className="ml-2 text-xs bg-orange-50 text-orange-600 border-orange-200 px-1.5 py-0">
                                        {step.duration}
                                      </Badge>
                                    )}
                                  </h4>
                                </div>
                                <p className="text-xs text-gray-600 mt-0.5">{step.description}</p>
                                
                                {step.details && (
                                  <details className="mt-1">
                                    <summary className="text-xs text-orange-600 font-medium cursor-pointer">
                                      Ver detalhes
                                    </summary>
                                    <ul className="mt-1.5 space-y-1 pl-2 text-xs text-gray-600 border-l-2 border-orange-100">
                                      {step.details.map((detail, i) => (
                                        <li key={i} className="flex items-start">
                                          <CheckCircle className="h-3 w-3 mr-1 text-orange-500 mt-0.5 flex-shrink-0" />
                                          <span>{detail}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </details>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Estados disponíveis - mobile otimizado */}
                    <Card className="bg-white border-gray-100 shadow-sm overflow-hidden">
                      <CardHeader className="pb-1">
                        <CardTitle className="text-sm font-semibold flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                          Estados disponíveis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-1.5">
                          {AVAILABLE_STATES.map((state, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700 text-xs">
                              {state.name}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 flex items-start">
                          <Info className="h-3 w-3 mr-1 mt-0.5 text-orange-400 flex-shrink-0" />
                          Disponibilidade varia conforme a concessionária de energia.
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* CTA para mobile */}
                    <div className="mt-4">
                      <ActionCtaCard />
                    </div>
                  </motion.div>
                )}

                {/* Conteúdo da tab Perguntas - Mobile */}
                {activeSection === "perguntas" && (
                  <motion.div
                    key="perguntas"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="space-y-3">
                      {FAQ_ITEMS.slice(0, 3).map((item, index) => (
                        <Card key={index} className="shadow-sm">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className={`w-full p-3 flex justify-between items-center text-left ${
                              expandedFaq === index ? "bg-orange-50" : "bg-white"
                            }`}
                          >
                            <span className={`${expandedFaq === index ? "text-orange-600" : "text-gray-800"} text-sm font-medium pr-2`}>
                              {item.question}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 flex-shrink-0 transition-transform ${
                                expandedFaq === index ? "rotate-180 text-orange-500" : "text-gray-400"
                              }`} 
                            />
                          </button>
                          <AnimatePresence>
                            {expandedFaq === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <CardContent className="pt-0">
                                  <Separator className="my-2" />
                                  <p className="text-xs text-gray-600">
                                    {item.answer}
                                  </p>
                                </CardContent>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      ))}
                    </div>
                    
                    {/* CTA de simulação para a seção de perguntas mobile */}
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg text-white border-0">
                      <CardContent className="p-4">
                        <h4 className="text-lg font-bold mb-2">Simule seu empréstimo</h4>
                        <p className="text-sm text-white/90 mb-3">
                          Descubra quanto você pode receber sem compromisso
                        </p>
                        <Button variant="secondary" size="lg" className="w-full bg-white text-blue-600 hover:bg-white/90">
                          Simular agora
                        </Button>
                        <p className="text-xs text-white/80 mt-2 flex items-center justify-center">
                          <ShieldCheck className="h-3 w-3 mr-1" /> Sem impacto no seu score
                        </p>
                      </CardContent>
                    </Card>
                    
                    <p className="text-center text-sm text-gray-500">
                      Ainda tem dúvidas? <Button variant="link" className="p-0 h-auto font-medium">Fale conosco</Button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Nota informativa renovada */}
        <motion.div 
          className="mt-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 shadow-sm p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-blue-700 text-sm mb-1">Disponibilidade regional</h4>
                <p className="text-xs text-blue-700/80">
                  O crédito na conta de luz é uma parceria da Credios com a Crefaz e está disponível na 
                  maioria das cidades dos estados listados. Consulte disponibilidade durante a simulação.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}