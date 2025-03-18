"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import { JsonLd } from "@/components/SEO/JsonLd";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Estilos globais para garantir que todos elementos clicáveis tenham cursor pointer
const globalStyles = `
  a, button, .cursor-pointer, [role="button"], 
  .accordion-trigger, .card-clickable, .hover-pointer,
  [class*="hover:"], [class*="group-hover:"] {
    cursor: pointer !important;
  }
  
  html {
    scroll-behavior: smooth;
  }
`;

// Ícones do Lucide
import {
  CheckCircle2,
  Zap,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Star,
  Percent,
  User,
  Clock,
  LucideProps,
  ThumbsUp,
  Calendar,
  Phone,
  MessageCircle,
  ChevronRight,
  AlertCircle,
  AtSign,
  Info,
  BadgeCheck,
  AlertTriangle,
  Banknote,
  Building,
  Briefcase,
  Landmark,
  Calculator,
  BookCheck,
  Users,
  HeartPulse,
  PiggyBank,
  ShieldPlus,
  Send,
  Mail,
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
  profileType?: string;
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

interface EligibilityGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
  benefits: string[];
  maxValue?: string;
  installments?: string;
  rate?: string;
  color: string;
}

interface FormData {
  fullName: string;
  cpf: string;
  email: string;
  whatsapp: string;
}

// Dados do Empréstimo Consignado
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: <Percent className="h-8 w-8 text-blue-500" />,
    title: "Menores Taxas do Mercado",
    description:
      "Com as menores taxas de juros entre todas as modalidades de crédito pessoal, o consignado oferece economia real e prestações acessíveis.",
    highlight: "ECONÔMICO",
    action: "Ver Taxas",
    actionUrl: "#contato-form",
    stats: [{ value: "1,30%", label: "Taxa média ao mês" }],
    backgroundColor: "from-blue-50 to-indigo-50",
    accentColor: "blue",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
    title: "Segurança e Transparência",
    description:
      "Desconto automático na folha de pagamento ou benefício, sem risco de esquecimento. Processo 100% transparente e regulamentado.",
    highlight: "GARANTIDO",
    action: "Como Funciona",
    actionUrl: "#contato-form",
    stats: [{ value: "100%", label: "Digital e seguro" }],
    backgroundColor: "from-green-50 to-emerald-50",
    accentColor: "green",
  },
  {
    icon: <Banknote className="h-8 w-8 text-teal-500" />,
    title: "Valores Maiores Aprovados",
    description:
      "Consegue valores mais altos com aprovação facilitada. Ideal para grandes projetos como reforma da casa, compra de veículo ou quitação de dívidas.",
    highlight: "VALORES ALTOS",
    action: "Simular Agora",
    actionUrl: "#contato-form",
    stats: [{ value: "R$ 150 mil", label: "Limite máximo" }],
    backgroundColor: "from-teal-50 to-cyan-50",
    accentColor: "teal",
  },
  {
    icon: <Clock className="h-8 w-8 text-purple-500" />,
    title: "Prazos Estendidos",
    description:
      "Parcele em até 84 vezes (7 anos), o que permite prestações menores e mais adequadas ao seu orçamento, facilitando o planejamento financeiro.",
    highlight: "ATÉ 84X",
    action: "Calcular Parcelas",
    actionUrl: "#contato-form",
    stats: [{ value: "7 anos", label: "Prazo máximo" }],
    backgroundColor: "from-purple-50 to-fuchsia-50",
    accentColor: "purple",
  },
];

// Como funciona o empréstimo consignado
const HOW_IT_WORKS: ProcessStep[] = [
  {
    title: "Solicite Sua Simulação",
    description: "Preencha seus dados básicos em nosso simulador online para verificar valores, prazos e taxas disponíveis para o seu perfil.",
    icon: <Calculator className="h-6 w-6" />,
    details: ["Processo 100% digital", "Sem taxa de consulta", "Simulação em 2 minutos"],
    duration: "2 min",
  },
  {
    title: "Envie a Documentação",
    description: "Após aprovar a simulação, envie os documentos necessários (RG/CPF, comprovante de residência e contracheque) através da nossa plataforma.",
    icon: <FileCheck className="h-6 w-6" />,
    details: ["Upload direto pelo celular", "Verificação rápida", "Documentação simplificada"],
    duration: "5 min",
  },
  {
    title: "Assinatura Digital",
    description: "Receba o contrato para assinatura digital, sem necessidade de reconhecimento de firma ou burocracia com cartórios.",
    icon: <BookCheck className="h-6 w-6" />,
    details: ["Assinatura fácil pelo celular", "Totalmente online", "Válido juridicamente"],
    duration: "3 min",
  },
  {
    title: "Receba o Dinheiro",
    description: "Após a confirmação da reserva de margem, o valor contratado será depositado diretamente na sua conta via PIX ou TED.",
    icon: <Banknote className="h-6 w-6" />,
    details: ["Valor na conta em até 2 dias úteis", "Sem taxa de transferência", "Acompanhamento em tempo real"],
    duration: "24-48h",
  },
];

// FAQ sobre empréstimo consignado
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O que é empréstimo consignado?",
    answer:
      "O empréstimo consignado é uma modalidade de crédito onde as parcelas são descontadas diretamente na folha de pagamento, aposentadoria ou pensão do solicitante. Por oferecer mais segurança aos bancos, conta com as menores taxas do mercado. Está disponível para servidores públicos (federais, estaduais e municipais), aposentados e pensionistas do INSS, e colaboradores de empresas privadas conveniadas.",
  },
  {
    question: "Quais as vantagens do consignado em relação a outros empréstimos?",
    answer:
      "O consignado oferece diversas vantagens: taxas de juros significativamente menores (em média 1,30% ao mês, enquanto empréstimos pessoais regulares podem chegar a 5%); aprovação facilitada mesmo para quem tem restrições no nome; prazos mais longos de pagamento (até 84 meses); valor de crédito maior; e o desconto automático na folha, que evita inadimplência e atrasos.",
  },
  {
    question: "Quanto posso comprometer da minha renda com o consignado?",
    answer:
      "A legislação estabelece limites para proteção do consumidor: aposentados e pensionistas do INSS podem comprometer até 45% do benefício, sendo 35% para empréstimo consignado e 10% para cartão de crédito consignado. Servidores públicos geralmente têm margem de 30% a 40%, dependendo do órgão ou esfera de governo. Funcionários de empresas privadas seguem as regras estabelecidas em acordo com o empregador, normalmente entre 30% e 35% do salário.",
  },
  {
    question: "Posso fazer consignado se estiver com nome sujo ou negativado?",
    answer:
      "Sim! Esta é uma das grandes vantagens do consignado. Como o pagamento é descontado diretamente da folha ou benefício, o risco para a instituição financeira é muito menor. Por isso, mesmo pessoas com restrições no SPC/Serasa conseguem aprovação. Na Credios, não realizamos consulta ao SPC/Serasa para empréstimos consignados, o que aumenta significativamente suas chances de aprovação mesmo com score baixo.",
  },
  {
    question: "Aposentado ou pensionista do INSS pode solicitar empréstimo consignado?",
    answer:
      "Sim! Aposentados e pensionistas do INSS têm direito ao consignado, desde que o benefício seja de caráter permanente. O limite de comprometimento da renda é de 45% do valor do benefício (35% para empréstimo e 10% para cartão consignado). Para solicitar, é necessário que o benefício esteja ativo há pelo menos 3 meses. Benefícios assistenciais como BPC/LOAS e auxílio-doença temporário não permitem contratação de consignado.",
  },
  {
    question: "Quais documentos são necessários para solicitar consignado na Credios?",
    answer:
      "A documentação é simples: documento de identidade com foto (RG ou CNH); CPF; comprovante de residência recente (até 90 dias); e contracheque ou extrato de benefício recente. Para servidores públicos, é necessário o último contracheque. Para aposentados e pensionistas do INSS, o extrato do benefício pode ser obtido pelo site ou aplicativo Meu INSS. Todo o processo de envio de documentos é feito de forma digital, pelo celular ou computador.",
  },
  {
    question: "Em quanto tempo o dinheiro do consignado cai na conta?",
    answer:
      "Na Credios, trabalhamos para que o processo seja o mais rápido possível. Após a aprovação e assinatura digital do contrato, o valor é depositado em até 2 dias úteis, dependendo da instituição pagadora (INSS, órgão público ou empresa privada). Para aposentados do INSS, o tempo médio é de 1 a 2 dias úteis. Para servidores públicos, pode variar de 2 a 5 dias úteis, dependendo da agilidade do órgão na confirmação da reserva de margem.",
  },
  {
    question: "Posso antecipar as parcelas ou quitar o empréstimo consignado?",
    answer:
      "Sim! Na Credios, você pode solicitar a qualquer momento a antecipação de parcelas ou quitação total do contrato, com redução proporcional de juros. Para isso, basta entrar em contato com nosso atendimento solicitando o valor atualizado para quitação. Não cobramos taxa de antecipação, o que significa economia real para você ao quitar antecipadamente seu contrato.",
  },
];

// Animações
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};

// Componente de formulário de contato com formsubmit.co
const ContactForm = () => {
  const [formState, setFormState] = useState<FormData>({
    fullName: "",
    cpf: "",
    email: "",
    whatsapp: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };
  
  const handleBlur = () => {
    setActiveField(null);
  };
  
  // Formatação de CPF
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };
  
  // Formatação de telefone
  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };
  
  // Verifica se o formulário está preenchido
  const isFormFilled = formState.fullName && formState.cpf && formState.email && formState.whatsapp;
  
  return (
    <motion.div 
      id="contato-form" 
      className="bg-white rounded-xl shadow-2xl overflow-hidden border border-blue-100 transform transition-all hover:shadow-blue-200/40"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white relative overflow-hidden">
        {/* Padrão de fundo */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '180px 180px'
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Solicite Sua Simulação Gratuita</h3>
          </div>
          <p className="opacity-90 ml-12">
            Preencha o formulário e nossa equipe entrará em contato em até 1 hora com as melhores condições para você.
          </p>
        </div>
      </div>
      
      {isSuccess ? (
        <motion.div 
          className="p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CheckCircle className="h-10 w-10" />
          </motion.div>
          <h4 className="text-2xl font-bold text-gray-800 mb-3">Solicitação Enviada com Sucesso!</h4>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Recebemos seus dados e entraremos em contato em até 1 hora para oferecermos as melhores condições de empréstimo consignado para você.
          </p>
          <Badge className="bg-blue-100 text-blue-700 py-2 px-4 text-sm">
            <Phone className="h-4 w-4 mr-2" />
            Aguarde nosso contato em até 1 hora
          </Badge>
        </motion.div>
      ) : (
        <form 
          action="https://formsubmit.co/seu-email@exemplo.com" 
          method="POST"
          onSubmit={() => {
            setIsSubmitting(true);
            // O formsubmit.co lidará com o envio,
            // mas podemos mostrar nosso estado de sucesso após a submissão
            setTimeout(() => {
              setIsSuccess(true);
              setIsSubmitting(false);
            }, 1000);
          }}
          className="p-8 space-y-6"
        >
          {/* Campos ocultos para configuração do formsubmit.co */}
          <input type="hidden" name="_subject" value="Nova solicitação de Empréstimo Consignado" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          {typeof window !== 'undefined' && <input type="hidden" name="_next" value={window.location.href} />}
          
          <div className="space-y-6">
            <div className={`transition-all duration-300 ${activeField === 'fullName' ? 'transform -translate-y-1' : ''}`}>
              <Label htmlFor="fullName" className="text-gray-700 font-medium flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full ${activeField === 'fullName' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'} flex items-center justify-center mr-2 transition-colors duration-300`}>
                  <User className="h-4 w-4" />
                </div>
                Nome Completo
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Digite seu nome completo"
                  className={`pl-4 py-6 text-base bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 ${activeField === 'fullName' ? 'ring-2 ring-blue-500 border-blue-500 bg-white' : 'hover:bg-gray-100'} transition-all`}
                  value={formState.fullName}
                  onChange={handleChange}
                  onFocus={() => handleFocus('fullName')}
                  onBlur={handleBlur}
                  required
                />
                {formState.fullName && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
            
            <div className={`transition-all duration-300 ${activeField === 'cpf' ? 'transform -translate-y-1' : ''}`}>
              <Label htmlFor="cpf" className="text-gray-700 font-medium flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full ${activeField === 'cpf' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'} flex items-center justify-center mr-2 transition-colors duration-300`}>
                  <BadgeCheck className="h-4 w-4" />
                </div>
                CPF
              </Label>
              <div className="relative">
                <Input
                  id="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  className={`pl-4 py-6 text-base bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 ${activeField === 'cpf' ? 'ring-2 ring-blue-500 border-blue-500 bg-white' : 'hover:bg-gray-100'} transition-all`}
                  value={formState.cpf}
                  onChange={(e) => {
                    const formattedValue = formatCPF(e.target.value);
                    setFormState(prev => ({ ...prev, cpf: formattedValue }));
                  }}
                  onFocus={() => handleFocus('cpf')}
                  onBlur={handleBlur}
                  maxLength={14}
                  required
                />
                {formState.cpf && formState.cpf.length === 14 && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
            
            <div className={`transition-all duration-300 ${activeField === 'email' ? 'transform -translate-y-1' : ''}`}>
              <Label htmlFor="email" className="text-gray-700 font-medium flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full ${activeField === 'email' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'} flex items-center justify-center mr-2 transition-colors duration-300`}>
                  <Mail className="h-4 w-4" />
                </div>
                E-mail
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  className={`pl-4 py-6 text-base bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 ${activeField === 'email' ? 'ring-2 ring-blue-500 border-blue-500 bg-white' : 'hover:bg-gray-100'} transition-all`}
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                />
                {formState.email && formState.email.includes('@') && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
            
            <div className={`transition-all duration-300 ${activeField === 'whatsapp' ? 'transform -translate-y-1' : ''}`}>
              <Label htmlFor="whatsapp" className="text-gray-700 font-medium flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full ${activeField === 'whatsapp' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'} flex items-center justify-center mr-2 transition-colors duration-300`}>
                  <WhatsApp className="h-4 w-4" />
                </div>
                Telefone WhatsApp
              </Label>
              <div className="relative">
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="(00) 00000-0000"
                  className={`pl-4 py-6 text-base bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 ${activeField === 'whatsapp' ? 'ring-2 ring-blue-500 border-blue-500 bg-white' : 'hover:bg-gray-100'} transition-all`}
                  value={formState.whatsapp}
                  onChange={(e) => {
                    const formattedValue = formatPhone(e.target.value);
                    setFormState(prev => ({ ...prev, whatsapp: formattedValue }));
                  }}
                  onFocus={() => handleFocus('whatsapp')}
                  onBlur={handleBlur}
                  maxLength={15}
                  required
                />
                {formState.whatsapp && formState.whatsapp.length >= 14 && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
            <ShieldCheck className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <span>
              Seus dados estão protegidos e não serão compartilhados. Ao enviar, você concorda em receber contato da nossa equipe.
            </span>
          </div>
          
          <motion.div 
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              type="submit" 
              className={`w-full py-6 text-base font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${isFormFilled ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              disabled={isSubmitting || !isFormFilled}
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Solicitar Simulação Gratuita</span>
                </>
              )}
            </Button>
            
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Resposta em até 1 hora</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <span>100% Seguro</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <BadgeCheck className="h-4 w-4 text-blue-500" />
                <span>Aprovação rápida</span>
              </div>
            </div>
          </motion.div>
        </form>
      )}
    </motion.div>
  );
};

// Hero Section para Empréstimo Consignado com Formulário
const HeroSection = () => {
  // Track mouse position for parallax effect
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position for parallax effect
  const backgroundX = useTransform(mouseX, [-300, 300], [10, -10]);
  const backgroundY = useTransform(mouseY, [-300, 300], [10, -10]);
  
  const circle1X = useTransform(mouseX, [-300, 300], [20, -20]);
  const circle1Y = useTransform(mouseY, [-300, 300], [20, -20]);
  
  const circle2X = useTransform(mouseX, [-300, 300], [-20, 20]);
  const circle2Y = useTransform(mouseY, [-300, 300], [-20, 20]);
  
  // Update mouse position when mouse moves
  useEffect(() => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);
  
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="relative py-24 overflow-hidden rounded-3xl mb-12"
  style={{ 
    background: 'linear-gradient(135deg, #1a44b8, #3563eb, #4e7bf9, #60a5fa)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
  }}
>
  {/* Animated gradient background */}
  <motion.div className="absolute inset-0 z-0"
    style={{ x: backgroundX, y: backgroundY }}>
    <div 
      className="absolute inset-0 bg-gradient-to-br from-blue-800/30 via-blue-600/20 to-indigo-600/10 backdrop-blur-[1px]"
      style={{ backgroundSize: '200% 200%', animation: 'gradientAnimation 15s ease infinite' }}
    />
  </motion.div>
  
  {/* Pattern overlay */}
  <div className="absolute inset-0 z-0 opacity-5 mix-blend-overlay" 
       style={{ 
         backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1.5\'/%3E%3C/g%3E%3C/svg%3E")',
         backgroundSize: '20px 20px'
       }}
  />
      
      {/* Floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Floating circles with parallax effect */}
        <motion.div 
          className="absolute top-[-50px] right-[10%] w-32 h-32 rounded-full bg-blue-300/30 blur-md"
          animate={{
            y: [0, 15, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse" as const,
              ease: 'easeInOut'
            }
          }}
          style={{ x: circle1X, y: circle1Y }}
        />
        <motion.div 
          className="absolute bottom-[-80px] left-[10%] w-96 h-96 rounded-full bg-indigo-200/30 blur-md"
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: 7,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }
          }}
          style={{ x: circle2X, y: circle2Y }}
        />
        
        {/* Additional decorative elements */}
        <motion.div 
          className="absolute top-[30%] left-[5%] w-6 h-6 rounded-full bg-white/40"
          animate={{
            scale: [1, 1.2, 1],
            transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        <motion.div 
          className="absolute top-[20%] right-[20%] w-4 h-4 rounded-full bg-indigo-300/50"
          animate={{
            scale: [1, 1.3, 1],
            transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
          }}
        />
        <motion.div 
          className="absolute bottom-[25%] right-[10%] w-5 h-5 rounded-full bg-blue-100/50"
          animate={{
            scale: [1, 1.2, 1],
            transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-blue-700 font-medium mb-6 shadow-md">
                <Percent className="h-4 w-4" />
                <span>As menores taxas do mercado</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Empréstimo Consignado 
              <span className="block mt-2 text-blue-100">
                Taxas a partir de 1,25% ao mês
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl drop-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="font-medium">Solução ideal para servidores públicos, aposentados e pensionistas.</span> Liberação rápida, processo 100% online e aprovação mesmo para negativados.
            </motion.p>

            <motion.div
  className="flex flex-wrap gap-4 mb-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.5 }}
>
  <Button
    size="lg"
    className="bg-white text-blue-700 hover:bg-blue-50 rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 font-semibold flex items-center gap-2 border-2 border-white"
    aria-label="Simule seu empréstimo consignado agora"
    onClick={scrollToForm}
  >
    <span>Simular Agora Mesmo</span>
    <motion.div animate={pulseAnimation}>
      <ArrowRight className="h-5 w-5" />
    </motion.div>
  </Button>
  <Button
    variant="outline"
    size="lg"
    className="border-2 border-white bg-blue-600/30 backdrop-blur-sm text-white hover:bg-white hover:text-blue-700 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
    aria-label="Saiba como funciona o empréstimo consignado"
    onClick={scrollToForm}
  >
    Veja Como Funciona
  </Button>
</motion.div>

            <motion.div 
              className="flex items-center gap-4 text-sm text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-xs font-bold text-white"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-300" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-300" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-300" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-300" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-300" />
                  <span className="ml-1 font-semibold">4.8/5</span>
                </div>
                <div>Mais de 100 mil clientes satisfeitos</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>
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
      
      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </motion.div>
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
      <Badge className="mb-4 bg-gradient-to-r from-blue-200 to-indigo-100 text-indigo-700 py-1.5 px-4 rounded-full shadow-sm">
        {badge}
      </Badge>
    )}
    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
      {title}
    </h2>
    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full mx-auto mb-4"></div>
    <p className="text-gray-600 max-w-2xl mx-auto text-lg">{description}</p>
  </motion.div>
);
// Grupos elegíveis para consignado
const ELIGIBILITY_GROUPS: EligibilityGroup[] = [
  {
    id: "federal",
    title: "Servidores Públicos Federais",
    icon: <Briefcase className="h-6 w-6" />,
    description: "Servidores ativos e inativos do Executivo, Legislativo e Judiciário federal.",
    badge: "MELHORES TAXAS",
    benefits: [
      "Taxa a partir de 1,25% ao mês",
      "Até 84 meses para pagar",
      "Comprometimento de até 35% da renda",
      "Liberação em 48h"
    ],
    maxValue: "R$ 150.000,00",
    installments: "Até 84x",
    rate: "A partir de 1,25% a.m.",
    color: "green"
  },
  {
    id: "inss",
    title: "Aposentados e Pensionistas INSS",
    icon: <HeartPulse className="h-6 w-6" />,
    description: "Beneficiários do INSS com benefícios permanentes.",
    badge: "MAIS RÁPIDO",
    benefits: [
      "Taxa a partir de 1,30% ao mês",
      "Até 84 meses para pagar",
      "Comprometimento de até 45% do benefício",
      "Liberação em 24h"
    ],
    maxValue: "R$ 120.000,00",
    installments: "Até 84x",
    rate: "A partir de 1,30% a.m.",
    color: "blue"
  },
  {
    id: "estadual",
    title: "Servidores Públicos Estaduais",
    icon: <Building className="h-6 w-6" />,
    description: "Funcionários dos governos estaduais, secretarias e autarquias.",
    benefits: [
      "Taxa a partir de 1,35% ao mês",
      "Até 72 meses para pagar",
      "Comprometimento de até 30% da renda",
      "Liberação em 72h"
    ],
    maxValue: "R$ 100.000,00",
    installments: "Até 72x",
    rate: "A partir de 1,35% a.m.",
    color: "amber"
  },
  {
    id: "municipal",
    title: "Servidores Públicos Municipais",
    icon: <Landmark className="h-6 w-6" />,
    description: "Funcionários das prefeituras e órgãos municipais conveniados.",
    benefits: [
      "Taxa a partir de 1,40% ao mês",
      "Até 72 meses para pagar",
      "Comprometimento de até 30% da renda",
      "Liberação em 72h"
    ],
    maxValue: "R$ 80.000,00",
    installments: "Até 72x",
    rate: "A partir de 1,40% a.m.",
    color: "purple"
  },
  {
    id: "militares",
    title: "Militares das Forças Armadas",
    icon: <ShieldPlus className="h-6 w-6" />,
    description: "Militares da ativa, reserva e pensionistas das Forças Armadas.",
    benefits: [
      "Taxa a partir de 1,30% ao mês",
      "Até 84 meses para pagar",
      "Comprometimento de até 35% da renda",
      "Liberação em 48h"
    ],
    maxValue: "R$ 120.000,00",
    installments: "Até 84x",
    rate: "A partir de 1,30% a.m.",
    color: "red"
  },
  {
    id: "privado",
    title: "Funcionários de Empresas Privadas",
    icon: <Users className="h-6 w-6" />,
    description: "Colaboradores de empresas privadas conveniadas.",
    benefits: [
      "Taxa a partir de 1,45% ao mês",
      "Até 60 meses para pagar",
      "Comprometimento conforme convênio",
      "Liberação em 72h"
    ],
    maxValue: "R$ 50.000,00",
    installments: "Até 60x",
    rate: "A partir de 1,45% a.m.",
    color: "teal"
  },
];

// Outras opções de crédito oferecidas pela Credios
const LOAN_OPTIONS: LoanOption[] = [
  {
    id: "conta-luz",
    title: "Empréstimo na Conta de Luz",
    description: "Use sua conta de energia como garantia e consiga até R$3.300, sem consulta ao SPC/Serasa.",
    icon: <Zap className="h-6 w-6" />,
    color: "yellow",
    url: "#contato-form",
    highlighted: true,
    badge: "POPULAR",
    available: true,
  },
  {
    id: "fgts",
    title: "Antecipação do FGTS",
    description: "Antecipe seu saque-aniversário mesmo com restrições no nome.",
    icon: <Calendar className="h-6 w-6" />,
    color: "blue",
    url: "#contato-form",
    highlighted: true,
    available: true,
  },
  {
    id: "pessoal",
    title: "Empréstimo Pessoal",
    description: "Crédito para qualquer finalidade com análise facilitada.",
    icon: <User className="h-6 w-6" />,
    color: "green",
    url: "#contato-form",
    available: true,
  },
  {
    id: "negativado",
    title: "Empréstimo para Negativados",
    description: "Opções de crédito mesmo para quem está com restrições no nome.",
    icon: <AlertTriangle className="h-6 w-6" />,
    color: "red",
    url: "#contato-form",
    available: true,
  },
];

// Vantagens comparativas do consignado
const COMPARISON_DATA = [
  {
    type: "Empréstimo Consignado",
    rate: "1,30% a.m.",
    annualRate: "16,77% a.a.",
    approval: "Facilitada",
    maxTerm: "84 meses",
    negativeAllowed: "Sim",
    instalmentType: "Desconto automático em folha"
  },
  {
    type: "Empréstimo Pessoal",
    rate: "4,50% a.m.",
    annualRate: "69,59% a.a.",
    approval: "Análise de crédito",
    maxTerm: "36 meses",
    negativeAllowed: "Não",
    instalmentType: "Boleto ou débito em conta"
  },
  {
    type: "Cartão de Crédito",
    rate: "12,00% a.m.",
    annualRate: "289,60% a.a.",
    approval: "Análise rigorosa",
    maxTerm: "24 meses",
    negativeAllowed: "Não",
    instalmentType: "Fatura mensal"
  },
  {
    type: "Cheque Especial",
    rate: "8,00% a.m.",
    annualRate: "151,82% a.a.",
    approval: "Análise rigorosa",
    maxTerm: "N/A",
    negativeAllowed: "Não",
    instalmentType: "Débito automático"
  }
];

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
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 text-white flex items-center justify-center font-bold relative overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                        {testimonial.name
                          .split(" ")
                          .map((part: string) => part[0])
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
                        {testimonial.profileType && (
                          <Badge variant="outline" className="mt-1 text-xs bg-blue-50 text-blue-600 border-blue-200">
                            {testimonial.profileType}
                          </Badge>
                        )}
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
        {TESTIMONIALS.map((_: TestimonialItem, index: number) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === Math.abs(position) % TESTIMONIALS.length ? 'bg-blue-500 w-6' : 'bg-gray-300'}`}
            onClick={() => setPosition(-index * itemWidth)}
            aria-label={`Ver depoimento ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Comparativo de taxas
const ComparisonSection = () => {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Compare e Economize com o Empréstimo Consignado"
          description="Veja como o consignado oferece condições muito mais vantajosas que outras modalidades de crédito."
          badge="Comparativo"
        />
        
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="min-w-full"
          >
            <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-4 px-6 text-left">Modalidade de Crédito</th>
                  <th className="py-4 px-6 text-center">Taxa Mensal</th>
                  <th className="py-4 px-6 text-center">Taxa Anual</th>
                  <th className="py-4 px-6 text-center">Aprovação</th>
                  <th className="py-4 px-6 text-center">Prazo Máximo</th>
                  <th className="py-4 px-6 text-center">Aceita Negativado</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`${index === 0 ? 'bg-blue-50' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="py-4 px-6 border-b border-gray-200">
                      <div className="font-medium text-gray-800">
                        {index === 0 && <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full ml-2">Recomendado</span>}
                        {item.type}
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 text-center">
                      <span className={`font-bold ${index === 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.rate}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 text-center">
                      <span className={`${index === 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.annualRate}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 text-center">
                      {item.approval}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 text-center">
                      {item.maxTerm}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 text-center">
                      {item.negativeAllowed === "Sim" ? (
                        <span className="inline-flex items-center bg-green-100 text-green-600 text-sm px-2 py-1 rounded-full">
                          <CheckCircle className="h-4 w-4 mr-1" /> Sim
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full">
                          <AlertCircle className="h-4 w-4 mr-1" /> Não
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-sm text-gray-500 text-center"
          >
            <p>
              Taxas de juros aproximadas com base nas médias de mercado em março/2025.
              As taxas do consignado podem variar conforme a instituição financeira, prazo e perfil do cliente.
            </p>
          </motion.div>
        </div>
        
        {/* Exemplo de economia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-xl shadow-md border border-blue-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <PiggyBank className="mr-2 h-6 w-6 text-blue-500" />
            Exemplo de Economia Real
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <p className="font-medium text-red-700 mb-2">Empréstimo Pessoal: R$ 20.000</p>
              <ul className="space-y-1 text-gray-600">
                <li className="flex justify-between">
                  <span>Taxa:</span>
                  <span className="font-medium">4,50% ao mês</span>
                </li>
                <li className="flex justify-between">
                  <span>Prazo:</span>
                  <span className="font-medium">36x de R$ 949,80</span>
                </li>
                <li className="flex justify-between border-t border-red-200 mt-2 pt-2">
                  <span>Total pago:</span>
                  <span className="font-bold text-red-700">R$ 34.192,80</span>
                </li>
                <li className="flex justify-between">
                  <span>Juros pagos:</span>
                  <span className="font-bold text-red-700">R$ 14.192,80</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="font-medium text-green-700 mb-2">Empréstimo Consignado: R$ 20.000</p>
              <ul className="space-y-1 text-gray-600">
                <li className="flex justify-between">
                  <span>Taxa:</span>
                  <span className="font-medium">1,30% ao mês</span>
                </li>
                <li className="flex justify-between">
                  <span>Prazo:</span>
                  <span className="font-medium">36x de R$ 687,43</span>
                </li>
                <li className="flex justify-between border-t border-green-200 mt-2 pt-2">
                  <span>Total pago:</span>
                  <span className="font-bold text-green-700">R$ 24.747,48</span>
                </li>
                <li className="flex justify-between">
                  <span>Juros pagos:</span>
                  <span className="font-bold text-green-700">R$ 4.747,48</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
            <p className="text-lg font-bold text-blue-700">
              Economia com o consignado: <span className="text-green-600">R$ 9.445,32</span> <span className="text-sm font-normal">(66,5% menos juros)</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Com o consignado, você paga muito menos juros e tem parcelas menores para o mesmo valor contratado!
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <Button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Quero economizar com o consignado
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

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
    purple: "group-hover:from-purple-500 group-hover:to-purple-600",
    teal: "group-hover:from-teal-500 group-hover:to-teal-600",
  };

  const accentColorKey = (item.accentColor || "blue") as keyof typeof colorMap;
  const accentColor = colorMap[accentColorKey];
  
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="h-full"
      onClick={scrollToForm}
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
              <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-1.5 px-3 group-hover:bg-white group-hover:text-indigo-600 transition-all duration-300 rounded-full shadow-sm">
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
                  <p className="text-2xl font-bold text-indigo-600 group-hover:text-white transition-colors duration-300">
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
          {item.action && (
            <Button 
              variant="ghost" 
              className="text-indigo-600 hover:text-indigo-700 group-hover:text-white font-medium cursor-pointer flex items-center gap-1 w-full justify-between hover:bg-transparent transition-all duration-300 rounded-lg"
              aria-label={item.action}
              onClick={scrollToForm}
            >
              <span>{item.action}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Grupos elegíveis para consignado
const EligibilityGroupsSection = () => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(categoryRef, { once: true, margin: "-50px" });
  
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Função para obter as classes de cor
  const getColorClasses = (color: string, type: "bg" | "text" | "border" | "hover" | "gradient") => {
    const colorMap: Record<string, Record<string, string>> = {
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
      amber: {
        bg: "bg-amber-100",
        text: "text-amber-600",
        border: "border-amber-200",
        hover: "hover:bg-amber-600 hover:text-white",
        gradient: "from-amber-500 to-amber-600",
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

  return (
    <div className="py-20 bg-white" id="quem-pode">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Quem Pode Solicitar Empréstimo Consignado"
          description="Conheça todos os grupos elegíveis e as condições especiais para cada perfil."
          badge="Elegibilidade"
        />

        <motion.div
          ref={categoryRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {ELIGIBILITY_GROUPS.map((group) => (
            <motion.div
              key={group.id}
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="h-full"
              onClick={scrollToForm}
            >
              <Card className="h-full border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer">
                <div className={`h-2 ${getColorClasses(group.color, "bg")}`}></div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div 
                      className={`w-14 h-14 rounded-full ${getColorClasses(group.color, "bg")} ${getColorClasses(group.color, "text")} flex items-center justify-center group-hover:scale-110 transition-all duration-200`}
                    >
                      {group.icon}
                    </div>
                    {group.badge && (
                      <Badge className={`${getColorClasses(group.color, "bg")} ${getColorClasses(group.color, "text")}`}>
                        {group.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4 text-xl">{group.title}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Detalhes do empréstimo */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {group.maxValue && (
                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                          <div className="text-xs text-gray-500">Valor máximo</div>
                          <div className={`font-bold ${getColorClasses(group.color, "text")}`}>{group.maxValue}</div>
                        </div>
                      )}
                      {group.installments && (
                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                          <div className="text-xs text-gray-500">Parcelas</div>
                          <div className={`font-bold ${getColorClasses(group.color, "text")}`}>{group.installments}</div>
                        </div>
                      )}
                      {group.rate && (
                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                          <div className="text-xs text-gray-500">Taxa</div>
                          <div className={`font-bold ${getColorClasses(group.color, "text")}`}>{group.rate}</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Benefícios */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Benefícios exclusivos:</h4>
                      <ul className="space-y-1">
                        {group.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className={`h-4 w-4 ${getColorClasses(group.color, "text")}`} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full bg-gradient-to-r ${getColorClasses(group.color, "gradient")} text-white hover:opacity-90`} 
                    aria-label={`Simular empréstimo consignado para ${group.title}`}
                    onClick={scrollToForm}
                  >
                    Simular Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Informação adicional */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-white rounded-full p-3 shadow-sm">
              <Info className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Limitação de Margem Consignável
              </h3>
              <p className="text-gray-600 mb-4">
                Para proteger o consumidor, a lei estabelece limites para o valor das parcelas do empréstimo consignado. 
                Essa limitação é chamada de &quot;margem consignável&quot; e varia dependendo do grupo ao qual você pertence. 
                O valor da parcela não pode comprometer mais do que o percentual definido do seu salário ou benefício.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-white/80 text-blue-600 border-blue-200">
                  <Users className="h-3.5 w-3.5 mr-1" /> Aposentados INSS: até 45% do benefício
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-indigo-600 border-indigo-200">
                  <Briefcase className="h-3.5 w-3.5 mr-1" /> Servidores públicos: 30% a 40%
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-purple-600 border-purple-200">
                  <Building className="h-3.5 w-3.5 mr-1" /> Empresas privadas: 30% a 35%
                </Badge>
              </div>
              
              <div className="mt-6 text-center">
                <Button
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Verificar sua margem disponível
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
// Como funciona com design melhorado
const HowItWorksSection = () => {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden" id="como-funciona">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-200 opacity-10 blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-blue-200 opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title="Como Funciona o Empréstimo Consignado"
          description="Um processo simples e rápido, projetado para oferecer a melhor experiência aos nossos clientes."
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
                <div className="absolute top-16 bottom-0 left-6 w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-blue-400 to-indigo-400 z-0"></div>
              )}
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 relative z-10 hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    {step.duration && (
                      <div className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full flex items-center gap-1.5 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                        <Clock className="h-3 w-3" />
                        {step.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      <span className="text-indigo-500 mr-2">{index + 1}.</span>
                      {step.title}
                    </h4>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                    {step.details && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.details.map((detail, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors"
                          >
                            <CheckCircle2 className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" /> 
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
              <span className="font-medium">Pronto! Dinheiro na sua conta com as menores taxas do mercado</span>
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
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Simular empréstimo consignado agora"
            onClick={scrollToForm}
          >
            Simular Valor Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-3 text-sm text-gray-500">
            Processo 100% digital | Mesmo com nome negativado | Aprovação em minutos
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Seção de depoimentos
const TestimonialsSection = () => {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-200 opacity-10 blur-3xl"></div>
      <div className="absolute -top-20 -left-40 w-80 h-80 rounded-full bg-blue-200 opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Histórias Reais"
          title="O Que Dizem Nossos Clientes"
          description="Veja como o empréstimo consignado da Credios ajudou milhares de brasileiros a realizarem seus projetos com as melhores condições do mercado."
        />
        <TestimonialCarousel />
        
        {/* Stats banner */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-4xl font-bold text-blue-600">R$ 1.5 bi+</div>
            <div className="text-gray-600 text-sm mt-1">Em crédito liberado</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-4xl font-bold text-blue-600">100 mil+</div>
            <div className="text-gray-600 text-sm mt-1">Clientes satisfeitos</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-4xl font-bold text-blue-600">4.8/5</div>
            <div className="text-gray-600 text-sm mt-1">Avaliação média</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-4xl font-bold text-blue-600">98%</div>
            <div className="text-gray-600 text-sm mt-1">Taxa de aprovação</div>
          </motion.div>
        </motion.div>
        
        {/* CTA após estatísticas */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all duration-300"
            aria-label="Simular seu empréstimo consignado"
            onClick={scrollToForm}
          >
            Quero fazer parte dessas estatísticas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

// FAQ com schema markup
const FAQSection = () => {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Dúvidas Sobre Empréstimo Consignado"
          description="Tire suas dúvidas sobre o empréstimo com as menores taxas do mercado."
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
                  <AccordionTrigger className="px-5 py-4 hover:bg-blue-50 cursor-pointer group accordion-trigger">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <span className="text-base font-medium text-gray-800 group-hover:text-gray-900">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-1 text-gray-600 bg-gradient-to-r from-blue-50/50 to-white">
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
          
          {/* Suporte para dúvidas */}
          <motion.div
            className="mt-8 p-4 border border-dashed border-blue-300 rounded-xl bg-blue-50 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AlertCircle className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <p className="text-blue-700 font-medium">Ainda tem dúvidas sobre empréstimo consignado?</p>
            <p className="text-blue-600 text-sm mt-1 mb-3">Nossa equipe especializada está disponível para esclarecer todas as suas dúvidas</p>
            <Button 
              variant="outline" 
              className="border-blue-400 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
              aria-label="Entrar em contato com um especialista em crédito consignado"
              onClick={scrollToForm}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Falar com um Especialista
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Outras opções de empréstimo
const OtherOptionsSection = () => {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="py-20 bg-gray-50" id="outras-opcoes">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Outras Soluções de Crédito Credios"
          description="Conheça todas as nossas opções de empréstimo para diferentes perfis e necessidades."
          badge="Nossos Produtos"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {LOAN_OPTIONS.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="h-full"
              onClick={scrollToForm}
            >
              <Card className="h-full border border-gray-200 shadow hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="h-1 bg-blue-400"></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {option.icon}
                    </div>
                    {option.badge && (
                      <Badge className="bg-blue-100 text-blue-600 border-blue-200">
                        {option.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-3">{option.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-indigo-600 transition-colors">
                    <span>Conhecer mais</span>
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* About Credios */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-3 shadow-sm">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Sobre a Credios
              </h3>
              <p className="text-gray-600 mb-3">
                A Credios é uma plataforma de crédito digital focada em oferecer as melhores soluções financeiras para diferentes perfis de clientes. Como correspondente bancário, trabalhamos com as principais instituições financeiras do país para garantir as taxas mais competitivas e processos simples e digitais.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa missão é democratizar o acesso ao crédito de qualidade para todos os brasileiros, com transparência, segurança e tecnologia. Já ajudamos mais de 100 mil pessoas a conquistarem seus objetivos financeiros.
              </p>
              <Button 
                variant="outline" 
                className="text-blue-600 border-blue-300"
                onClick={scrollToForm}
              >
                Conheça nossas condições
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
// Botão de WhatsApp Fixo
const FloatingWhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
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
            <motion.div 
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={scrollToForm}
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
                      Simular Consignado
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Simule seu consignado agora mesmo!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

// CTA Final aprimorado
const FinalCTA = () => {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="py-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-10 bg-[url('/images/wave-pattern.svg')] bg-repeat-x opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-[url('/images/wave-pattern.svg')] bg-repeat-x opacity-10 transform rotate-180"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
      
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
              MENORES TAXAS DO MERCADO
            </Badge>
          </motion.div>
          
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="block mb-2">Economize com o</span>
            <span className="text-5xl md:text-6xl text-blue-100 drop-shadow-md">Empréstimo Consignado</span>
          </motion.h3>
          
          <motion.p
            className="text-white/90 mb-8 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Mais de <span className="font-bold underline decoration-blue-300">100 mil brasileiros</span> já
            escolheram a Credios para realizar seu empréstimo consignado. Contrate com <span className="font-bold">as menores taxas</span>,
            prazo estendido e atendimento 100% digital e personalizado.
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
                      className="w-8 h-8 rounded-full border-2 border-blue-400 bg-white flex items-center justify-center text-xs font-bold text-blue-600"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">12 consignados aprovados</p>
                  <p className="text-xs opacity-80">nos últimos 30 minutos</p>
                </div>
              </div>
            </div>
            
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 py-7 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-bold flex items-center gap-2"
              aria-label="Simular empréstimo consignado agora"
              onClick={scrollToForm}
            >
              <span>Simule Seu Consignado Agora</span>
              <motion.div 
                animate={{ 
                  x: [0, 5, 0],
                  transition: { repeat: Infinity, duration: 1.5 }
                }}
              >
                <ArrowRight className="h-6 w-6" />
              </motion.div>
            </Button>
            
            <div className="mt-6 flex items-center justify-center gap-3 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-blue-200" />
                <span>Aprovação para negativados</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-blue-200" />
                <span>Taxas a partir de 1,25%</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-blue-200" />
                <span>100% online</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Constante de depoimentos para a seção de carrossel
const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Carlos Oliveira",
    location: "São Paulo, SP",
    rating: 5,
    comment: "Processo rápido e descomplicado. Consegui meu empréstimo consignado em tempo recorde sem burocracia.",
    source: "google",
    date: "15/03/2024"
  },
  {
    name: "Maria Santos",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    comment: "Atendimento excelente e taxas realmente mais baixas que outros bancos. Recomendo!",
    source: "whatsapp",
    date: "10/03/2024"
  },
  {
    name: "José Silva",
    location: "Belo Horizonte, MG",
    rating: 5,
    comment: "Melhor experiência que já tive com empréstimo consignado. Tudo digital e sem dor de cabeça.",
    source: "facebook",
    date: "05/03/2024",
    profileType: "Aposentado"
  }
];

// Metadados para SEO
export const metadata = {
  title: "Empréstimo Consignado | Menores Taxas do Mercado | Credios",
  description: "Empréstimo consignado com as menores taxas do mercado! Ideal para servidores públicos, aposentados e pensionistas. Simule online em 2 minutos. Aprovado mesmo para negativados!",
  keywords: "empréstimo consignado, consignado INSS, consignado servidor público, crédito consignado, empréstimo com desconto em folha, consignado aposentado, menor taxa consignado, empréstimo consignado online",
  authors: [{ name: "Credios" }],
  openGraph: {
    title: "Empréstimo Consignado | Menores Taxas do Mercado | Credios",
    description: "Empréstimo consignado com taxas a partir de 1,25% ao mês. Ideal para servidores públicos, aposentados e pensionistas. Simule agora!",
    url: "https://credios.com.br/emprestimos/emprestimo-consignado",
    siteName: "Credios - Soluções de Crédito Digital",
    images: [
      {
        url: "https://credios.com.br/images/og-emprestimo-consignado.jpg",
        width: 1200,
        height: 630,
        alt: "Empréstimo Consignado Credios",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empréstimo Consignado | Credios",
    description: "Empréstimo consignado com as menores taxas do mercado. Aprovação facilitada para servidores, aposentados e pensionistas.",
    images: ["https://credios.com.br/images/og-emprestimo-consignado.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://credios.com.br/emprestimos/emprestimo-consignado",
  },
  viewport: "width=device-width, initial-scale=1",
};

// Schema JSON-LD para produto financeiro
const financialProductJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Empréstimo Consignado Credios",
  "description": "Empréstimo consignado com as menores taxas do mercado para servidores públicos, aposentados e pensionistas do INSS.",
  "category": "Empréstimo Consignado",
  "url": "https://credios.com.br/emprestimos/emprestimo-consignado",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2024-12-31",
    "seller": {
      "@type": "Organization",
      "name": "Credios"
    }
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "value": "1.25",
    "minValue": "1.25",
    "maxValue": "1.45",
    "unitText": "PERCENT"
  },
  "loanTerm": {
    "@type": "QuantitativeValue",
    "minValue": "12",
    "maxValue": "84",
    "unitCode": "MON"
  },
  "areaServed": "BR",
  "provider": {
    "@type": "Organization",
    "name": "Credios",
    "logo": "https://credios.com.br/logo.png",
    "url": "https://credios.com.br"
  }
};

// Schema JSON-LD para FAQ
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é empréstimo consignado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O empréstimo consignado é uma modalidade de crédito onde as parcelas são descontadas diretamente na folha de pagamento, aposentadoria ou pensão. Por oferecer mais segurança aos bancos, conta com as menores taxas do mercado, a partir de 1,25% ao mês."
      }
    },
    {
      "@type": "Question",
      "name": "Quem pode solicitar empréstimo consignado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Podem solicitar: servidores públicos federais, estaduais e municipais; aposentados e pensionistas do INSS; militares das Forças Armadas; e funcionários de empresas privadas conveniadas."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o prazo máximo do empréstimo consignado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O prazo máximo é de até 84 meses (7 anos) para servidores federais e aposentados do INSS, podendo variar conforme o convênio ou órgão."
      }
    }
  ]
};

// Schema JSON-LD para avaliações
const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "FinancialProduct",
    "name": "Empréstimo Consignado Credios",
    "description": "Empréstimo consignado com as menores taxas do mercado"
  },
  "ratingValue": "4.8",
  "bestRating": "5",
  "worstRating": "1",
  "ratingCount": "50000",
  "reviewCount": "42500"
};

// Schema JSON-LD para breadcrumbs
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
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
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Empréstimo Consignado",
      "item": "https://credios.com.br/emprestimos/emprestimo-consignado"
    }
  ]
};

// Componente Principal
export default function EmprestimoConsignado() {
  const scrollToForm = () => {
    if (typeof window !== 'undefined') { // Verificação de ambiente
      const formElement = document.getElementById('contato-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  useEffect(() => {
    // Verifica se há um hash #contato na URL e rola para o formulário
    if (typeof window !== 'undefined' && window.location.hash === '#contato') {
      scrollToForm();
    }
  }, []);
  
  return (
    <>
      {/* JSON-LD para SEO */}
      <JsonLd data={financialProductJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={reviewsJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      
      {/* Resto do seu componente atual */}
      <section className="w-full overflow-hidden font-sans">
        {/* Estilos Globais */}
        <style jsx global>{globalStyles}</style>
        
        {/* Botão de WhatsApp Fixo */}
        <FloatingWhatsAppButton />
        
        {/* Hero Section */}
        <HeroSection />

        {/* Vantagens do empréstimo consignado */}
        <div className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
          <div className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-indigo-100 opacity-50 blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <SectionHeading
              badge="Vantagens"
              title="Por Que Escolher o Empréstimo Consignado?"
              description="Conheça os diferenciais que fazem do consignado a melhor opção de crédito do mercado."
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

        {/* Comparativo de taxas */}
        <ComparisonSection />

        {/* Grupos elegíveis para consignado */}
        <EligibilityGroupsSection />

        {/* Como funciona */}
        <HowItWorksSection />

        {/* Depoimentos */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />
        
        {/* Outras opções de empréstimo */}
        <OtherOptionsSection />

        {/* CTA Final */}
        <FinalCTA />
      </section>
    </>
  );
}