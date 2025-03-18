"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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

// Lucide icons
import {
  CheckCircle2,
  Zap,
  FileCheck,
  ArrowRight,
  Star,
  Clock,
  Calendar,
  MessageCircle,
  AlertCircle,
  AtSign,
  Info,
  PlugZap,
  BadgeCheck,
  ShieldCheck,
  CircleDollarSign,
  Percent,
  CreditCard,
  Smartphone,
  CheckCheck,
  PiggyBank,
  AlarmClockCheck,
  LucideProps,
} from "lucide-react";

// Social media icons
import { 
  Facebook, 
  Instagram,
} from "lucide-react";

// Custom WhatsApp icon
const WhatsApp = (props: LucideProps) => (
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

// Google icon
const Google = (props: LucideProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

// Verified badge component
const VerifiedBadge = () => (
  <span className="inline-flex items-center justify-center bg-green-100 text-green-700 text-xs font-medium rounded-full px-2 py-0.5">
    <CheckCircle2 className="h-3 w-3 mr-1" />
    <span>Verificado</span>
  </span>
);

// Types/Interfaces
interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "amber" | "green" | "indigo" | "orange";
}

interface StepItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string[];
  duration?: string;
}

interface FAQItem {
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
  profession?: string;
}

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: "blue" | "amber" | "green" | "indigo" | "orange";
}

// Data
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: <PlugZap className="h-8 w-8" />,
    title: "Sem comprovação de renda",
    description: "Aprovamos seu empréstimo sem necessidade de comprovar renda, perfeito para autônomos e informais.",
    color: "blue",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Aprovação imediata",
    description: "Análise automatizada e resposta em minutos. Quando aprovado, o dinheiro cai direto na sua conta.",
    color: "amber",
  },
  {
    icon: <CircleDollarSign className="h-8 w-8" />,
    title: "Até R$ 3.300",
    description: "Valor ideal para quitar dívidas, reformar a casa, investir no seu negócio ou realizar um sonho.",
    color: "green",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "100% seguro",
    description: "Empresa autorizada pelo Banco Central. Seus dados estão protegidos com a máxima segurança.",
    color: "indigo",
  },
];

const HOW_IT_WORKS: StepItem[] = [
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Simule online",
    description: "Faça sua simulação gratuitamente em apenas 2 minutos, sem sair de casa e sem compromisso.",
    details: ["Processo 100% digital", "Sem consulta ao SPC/Serasa", "Simulação instantânea"],
    duration: "2 min",
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Envie seus documentos",
    description: "Mande uma foto do seu RG ou CNH e uma conta de luz recente em seu nome pelo próprio celular.",
    details: ["Apenas documento pessoal", "Conta de luz no seu nome", "Fotos pelo celular"],
    duration: "5 min",
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: "Aprovação rápida",
    description: "Nossa análise é automatizada e você receberá uma resposta em minutos, sem precisar esperar.",
    details: ["Análise automatizada", "Sem burocracia", "Resposta em minutos"],
    duration: "15 min",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Receba via PIX",
    description: "Após aprovação, o dinheiro é enviado para sua conta bancária via PIX em até 24 horas.",
    details: ["Transferência via PIX", "Dinheiro em até 24h", "Sem taxas adicionais"],
    duration: "Em até 24h",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Como funciona o empréstimo na conta de luz?",
    answer: "O empréstimo na conta de luz é uma modalidade que usa sua fatura de energia como garantia. O valor do empréstimo é aprovado com base na sua conta de luz e o pagamento é feito em parcelas mensais incluídas diretamente na sua fatura de energia elétrica, simplificando todo o processo. Não é necessário comprovação de renda, o que torna este empréstimo ideal para autônomos e trabalhadores informais.",
  },
  {
    question: "Quais documentos preciso apresentar?",
    answer: "Você precisará apenas de seu documento pessoal (RG ou CNH) e uma conta de luz recente em seu nome. Não é necessário comprovar renda, o que torna o processo muito mais simples, especialmente para autônomos e trabalhadores informais. A documentação simplificada e a análise automatizada permitem que todo o processo seja realizado em poucos minutos pelo seu celular.",
  },
  {
    question: "O empréstimo pode ser negado? Por quais motivos?",
    answer: "Sim, o empréstimo pode ser negado principalmente se a conta de luz não estiver no seu nome, se houver irregularidades na titularidade, se houver pendências de pagamento nas últimas contas de energia ou se você já tiver atingido o limite de crédito disponível para o seu perfil. Nossa análise não considera consultas ao SPC/Serasa, o que aumenta suas chances de aprovação.",
  },
  {
    question: "Como funciona o pagamento das parcelas?",
    answer: "O pagamento é extremamente prático: as parcelas são incluídas mensalmente na sua fatura de energia elétrica. Isso significa que você tem uma despesa fixa e previsível, sem se preocupar com datas de vencimento adicionais. Ao pagar sua conta de luz normalmente, você já está quitando sua parcela do empréstimo, evitando esquecimentos e simplificando sua organização financeira.",
  },
  {
    question: "Em quanto tempo o dinheiro cai na conta?",
    answer: "Após a aprovação, que ocorre em minutos, o dinheiro é enviado via Pix e geralmente cai na conta em até 24 horas. A grande maioria dos nossos clientes consegue receber o valor no mesmo dia da solicitação do empréstimo. O sistema totalmente automatizado garante agilidade em todas as etapas do processo, desde a solicitação até o recebimento do valor.",
  },
  {
    question: "Posso pagar antecipadamente e ter desconto?",
    answer: "Sim! Você pode antecipar o pagamento das parcelas a qualquer momento e receber um desconto proporcional nos juros. Para isso, basta entrar em contato com nosso atendimento e solicitar a antecipação. Oferecemos condições especiais para quitação antecipada, permitindo que você economize e fique livre da dívida mais rapidamente.",
  },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Carlos Silva",
    profession: "Motorista de Aplicativo",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    comment: "Processo super rápido! Em menos de 1 hora o dinheiro já estava na minha conta. Usei para fazer a revisão do meu carro que uso para trabalhar. Recomendo demais!",
    source: "google",
    date: "15/02/2024",
  },
  {
    name: "Maria Oliveira",
    profession: "Vendedora Autônoma",
    location: "São Paulo, SP",
    rating: 5,
    comment: "Nunca consegui empréstimo em banco por ser autônoma. Na Credios foi super fácil, só precisei da minha conta de luz e já fui aprovada! O dinheiro caiu na hora na minha conta.",
    source: "facebook",
    date: "03/03/2024",
  },
  {
    name: "João Pereira",
    profession: "Eletricista",
    location: "Belo Horizonte, MG",
    rating: 4,
    comment: "Precisava comprar ferramentas novas para trabalhar e o empréstimo na conta de luz foi a solução. Processo simples e aprovação no mesmo dia. Parcelas justas na conta de luz.",
    source: "whatsapp",
    date: "27/02/2024",
  },
  {
    name: "Ana Santos",
    profession: "Cabeleireira",
    location: "Salvador, BA",
    rating: 5,
    comment: "Reformei meu salão de beleza graças à Credios. O atendimento foi excelente e o valor caiu na conta rapidinho. Super recomendo para quem é autônomo como eu!",
    source: "instagram",
    date: "10/03/2024",
  },
];

const STATS: StatItem[] = [
  {
    value: "R$3.300",
    label: "Valor máximo disponível",
    icon: <CircleDollarSign className="h-6 w-6" />,
    color: "green"
  },
  {
    value: "15 min",
    label: "Tempo médio de aprovação",
    icon: <AlarmClockCheck className="h-6 w-6" />,
    color: "blue"
  },
  {
    value: "24h",
    label: "Prazo máximo para receber",
    icon: <Clock className="h-6 w-6" />,
    color: "amber"
  },
  {
    value: "98%",
    label: "Taxa de aprovação",
    icon: <CheckCheck className="h-6 w-6" />,
    color: "green"
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  },
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

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6 } 
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6 } 
  },
};

const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: { duration: 1.5, repeat: Infinity }
};

// Helper components
const SectionTitle = ({ 
  title, 
  subtitle,
  centered = true,
  className = "",
  badge,
}: { 
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  badge?: string;
}) => {
  return (
    <motion.div 
      className={`mb-12 ${centered ? "text-center" : ""} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
    >
      {badge && (
        <Badge className="mb-4 bg-blue-100 text-blue-700 py-1.5 px-4 rounded-full shadow-sm">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className={`h-1.5 w-24 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full ${centered ? "mx-auto" : ""} mb-4`}></div>
      {subtitle && <p className="text-gray-600 max-w-2xl mx-auto text-lg">{subtitle}</p>}
    </motion.div>
  );
};

// Main component
const AdvantagesSection = () => {
  // References for sections (for animations)
  const introRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  // States for testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Auto play for testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, TESTIMONIALS.length]);

  // Helper function for testimonials to render star ratings
  const renderStars = (rating: number) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-gray-300"}`}
          fill={i < rating ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ));

  // Helper function to render social media source
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

  return (
    <>
      {/* Initial Call/Introduction Section */}
      <section 
        ref={introRef} 
        className="py-16 bg-white relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-40 w-96 h-96 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-50 opacity-40 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <motion.div 
                className="flex-1"
                variants={slideInLeft}
              >
                <Badge className="mb-3 bg-blue-100 text-blue-700 py-1.5 px-4 rounded-full">
                  Empréstimo Facilitado
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
                  Dinheiro rápido 
                  <span className="block mt-1 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    sem burocracia
                  </span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Com o <span className="font-medium text-blue-600">Empréstimo na Conta de Luz</span>, você recebe 
                  até <span className="font-bold text-blue-700">R$3.300,00</span> rapidamente, sem precisar comprovar 
                  renda e com parcelas incluídas diretamente na sua fatura de energia.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: "Sem consulta ao SPC/Serasa" },
                    { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: "Parcelas na conta de luz" },
                    { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: "Dinheiro em até 24h" },
                    { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: "Sem comprovação de renda" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                      {item.icon}
                      <span className="text-gray-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="https://simulador.credios.com.br/page/simulador/credito-pessoal/crefaz/678405c92b0581736705481?_gl=1*1h00axu*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  >
                    Simular Agora
                    <motion.div animate={pulseAnimation}>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex-1 relative"
                variants={slideInRight}
              >
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 mix-blend-overlay"></div>
                  <Image
                    src="/images/image003.jpg" // This would need to be updated with the actual image path
                    alt="Empréstimo na Conta de Luz - Rápido e sem burocracia"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Overlay elements */}
                  <motion.div 
                    className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3"
                    animate={pulseAnimation}
                  >
                    <div className="text-sm text-gray-700">Até</div>
                    <div className="text-xl font-bold text-blue-600">R$ 3.300</div>
                  </motion.div>
                </div>
                
                {/* Floating info cards */}
                <motion.div 
                  className="absolute -bottom-5 -right-5 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border border-blue-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-green-100 p-2 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Autorizado</div>
                    <div className="text-xs text-gray-500">Banco Central</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-5 -left-5 bg-white rounded-lg shadow-lg p-4 border border-blue-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">Aprovação Rápida</span>
                  </div>
                  <div className="text-xs text-gray-600">Em minutos, sem burocracia</div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Stats section */}
            <motion.div 
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {STATS.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className={`bg-white p-5 rounded-xl shadow-md border border-${stat.color}-100 hover:shadow-lg transition-all duration-300 group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className={`text-2xl font-bold text-gray-800 group-hover:text-${stat.color}-600 transition-colors`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Advantages Section */}
      <section 
        ref={advantagesRef} 
        className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
        id="vantagens"
      >
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle 
            title="Vantagens do Empréstimo na Conta de Luz" 
            subtitle="Conheça os benefícios que fazem deste empréstimo a melhor opção para quem precisa de dinheiro rápido."
            badge="Benefícios Exclusivos"
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {ADVANTAGES.map((advantage, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full bg-${advantage.color}-100 text-${advantage.color}-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {advantage.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {advantage.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {advantage.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Additional value proposition */}
          <motion.div 
            className="mt-16 max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-blue-100 rounded-full p-4 text-blue-600 flex-shrink-0">
                <Info className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Ideal para momentos em que você precisa de recursos rápidos
                </h3>
                <p className="text-gray-600 mb-4">
                  O empréstimo na conta de luz é perfeito para quem precisa de dinheiro com agilidade, 
                  sem enfrentar a burocracia dos bancos tradicionais. É especialmente indicado para 
                  trabalhadores autônomos, informais e microempreendedores que desejam:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {[
                    "Quitar dívidas com juros altos",
                    "Fazer reformas em casa",
                    "Investir no próprio negócio",
                    "Comprar equipamentos",
                    "Cobrir despesas emergenciais",
                    "Aproveitar oportunidades"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <CreditCard className="h-3.5 w-3.5 mr-1" /> Sem consulta ao SPC/Serasa
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <Clock className="h-3.5 w-3.5 mr-1" /> Resposta em minutos
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <Percent className="h-3.5 w-3.5 mr-1" /> Taxas competitivas
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={howItWorksRef} 
        className="py-16 bg-white relative overflow-hidden"
        id="como-funciona"
      >
        {/* Background elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-50 opacity-30 blur-3xl"></div>
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Como Funciona o Empréstimo na Conta de Luz" 
            subtitle="Um processo simples, rápido e totalmente digital, sem complicações ou burocracia."
            badge="Passo a Passo"
          />
          
          <div className="max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Connector line between steps */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute top-16 bottom-0 left-6 w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-blue-400 to-blue-300 z-0"></div>
                )}
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 relative z-10 hover:shadow-lg transition-all duration-300 mb-8 group">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        {step.icon}
                      </div>
                      {step.duration && (
                        <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1.5 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <Clock className="h-3 w-3" />
                          {step.duration}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        <span className="text-blue-500 mr-2">{index + 1}.</span>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                      {step.details && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
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
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef} 
        className="py-16 bg-gradient-to-b from-gray-50 to-blue-50 relative overflow-hidden"
        id="depoimentos"
      >
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle 
            title="O Que Dizem Nossos Clientes" 
            subtitle="Veja a experiência de quem já contratou o Empréstimo na Conta de Luz e transformou suas finanças."
            badge="Depoimentos Verificados"
          />
          
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-12"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Testimonial Cards */}
              <div className="relative flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <Card className="shadow-lg border border-blue-100 overflow-hidden bg-white">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Left side - testimonial info */}
                          <div className="p-6 md:p-8 flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 text-white flex items-center justify-center font-bold shadow-md">
                                  {TESTIMONIALS[activeTestimonial].name
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")
                                    .substring(0, 2)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1 text-base font-medium text-gray-800">
                                    {TESTIMONIALS[activeTestimonial].name}
                                    <VerifiedBadge />
                                  </div>
                                  {TESTIMONIALS[activeTestimonial].profession && (
                                    <div className="text-xs font-medium text-gray-600">
                                      {TESTIMONIALS[activeTestimonial].profession}
                                    </div>
                                  )}
                                  <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <AtSign className="h-3 w-3 text-gray-400" />
                                    {TESTIMONIALS[activeTestimonial].location}
                                  </div>
                                </div>
                              </div>
                              <div className="flex">
                                {renderStars(TESTIMONIALS[activeTestimonial].rating)}
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <div className="text-blue-600 text-4xl font-serif mb-2">&ldquo;</div>
                              <p className="text-gray-700 text-lg italic mb-2">
                                {TESTIMONIALS[activeTestimonial].comment}
                              </p>
                              <div className="text-blue-600 text-4xl font-serif text-right">&rdquo;</div>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                              <SocialSourceDisplay source={TESTIMONIALS[activeTestimonial].source} />
                              
                              {TESTIMONIALS[activeTestimonial].date && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>{TESTIMONIALS[activeTestimonial].date}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Right side - illustration */}
                          <div className="hidden md:block w-1/3 bg-gradient-to-br from-blue-100 to-blue-50 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative w-full h-full">
                                <Image
                                  src="/images/image009.jpg" // Replace with actual image
                                  alt="Depoimentos Credios"
                                  fill
                                  className="object-cover opacity-10"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                  <Badge className="mb-3 bg-blue-100 text-blue-700 rounded-full">
                                    Histórias Reais
                                  </Badge>
                                  <div className="text-xl font-bold text-blue-700 mb-2">
                                    +30.000
                                  </div>
                                  <div className="text-sm text-blue-600 mb-4">
                                    clientes satisfeitos
                                  </div>
                                  <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                      <div
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-blue-400 flex items-center justify-center text-xs font-bold text-white"
                                      >
                                        {String.fromCharCode(65 + i)}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation Controls */}
                <div className="flex justify-center gap-3 mt-8">
                  {TESTIMONIALS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveTestimonial(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeTestimonial
                          ? "bg-blue-500 w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Ver depoimento ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Junte-se aos milhares de clientes que já transformaram suas finanças com o 
                Empréstimo na Conta de Luz. Processo simples, rápido e sem burocracia!
              </p>
              
              <Link href="https://simulador.credios.com.br/page/simulador/credito-pessoal/crefaz/678405c92b0581736705481?_gl=1*1h00axu*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2">
                <Button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Quero Simular Também
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={faqRef} 
        className="py-16 bg-white"
        id="faq"
      >
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Dúvidas Frequentes" 
            subtitle="Encontre respostas para as perguntas mais comuns sobre o Empréstimo na Conta de Luz."
            badge="Perguntas e Respostas"
          />
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:bg-blue-50 group">
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <span className="text-base font-medium text-gray-800 group-hover:text-gray-900">
                          {item.question}
                        </span>
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
            
            {/* Support Info */}
            <motion.div
              className="mt-8 p-4 border border-dashed border-blue-300 rounded-xl bg-blue-50 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <PiggyBank className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-blue-700 font-medium">Ainda tem dúvidas sobre o empréstimo?</p>
              <p className="text-blue-600 text-sm mt-1 mb-3">Nossa equipe de especialistas está disponível para ajudar</p>
              <Link href="https://wa.me/552130300606?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  className="border-blue-400 text-blue-600 hover:bg-blue-100 rounded-full transition-colors cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Falar com um Especialista
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-10 bg-[url('/images/wave-pattern.svg')] bg-repeat-x opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-10 bg-[url('/images/wave-pattern.svg')] bg-repeat-x opacity-10 transform rotate-180"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="mb-4 bg-white/20 text-white py-1.5 px-4 backdrop-blur-sm">
                DINHEIRO QUANDO VOCÊ PRECISA
              </Badge>
            </motion.div>
            
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="block mb-2">Simule seu Empréstimo</span>
              <span className="text-4xl md:text-5xl text-amber-300 drop-shadow-md">Sem Compromisso</span>
            </motion.h2>
            
            <motion.p
              className="text-white/90 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Aprovação rápida, dinheiro na conta em minutos e parcelas que cabem no seu bolso.
              Tudo isso <span className="font-bold">sem consulta ao SPC/Serasa</span> e 
              <span className="font-bold"> sem comprovação de renda</span>. 
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8"
            >
                              <div className="flex flex-wrap justify-center items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-amber-300" />
                  <span>Resposta em minutos</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 hidden sm:block"></div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-amber-300" />
                  <span>Processo 100% digital</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 hidden sm:block"></div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-amber-300" />
                  <span>Dinheiro em até 24h</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AdvantagesSection;