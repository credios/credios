"use client";

import React, { useState, useEffect, useRef, SVGProps } from "react";
import Script from 'next/script';
import { motion, useScroll } from "framer-motion";
import HeroSection from "@/components/herosection"; // Make sure this path matches your actual component location
import { 
  Shield, 
  BadgeCheck, 
  Clock, 
  CheckCircle, 
  Star, 
  FileCheck, 
  CreditCard, 
  Zap,
  X,
  Check,
  ArrowRight,
  BarChart,
  TrendingDown,
  UserCheck,
  Lightbulb,
  CheckCircle2,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Import EmblaCarousel - you'll need to install this
// npm install embla-carousel-react embla-carousel-autoplay
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Custom icons for social platforms
// Interface personalizada para ícone do WhatsApp
const WhatsApp = (props: SVGProps<SVGSVGElement>) => (
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
    <g id="XMLID468">
      <path id="XMLID469" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
        c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
        c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
        c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
        c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
        c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
        c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
        c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
        c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
        C233.168,179.508,230.845,178.393,227.904,176.981z"/>
      <path id="XMLID470" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
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
const Google = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

// Custom SVG for Facebook icon
const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Custom SVG for Instagram icon
const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#FFDC80" />
      <stop offset="10%" stopColor="#FCAF45" />
      <stop offset="30%" stopColor="#F77737" />
      <stop offset="50%" stopColor="#F56040" />
      <stop offset="70%" stopColor="#FD1D1D" />
      <stop offset="90%" stopColor="#E1306C" />
      <stop offset="100%" stopColor="#C13584" />
    </linearGradient>
    <path fill="url(#instagram-gradient)" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/>
  </svg>
);

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return { ref, isIntersecting };
};

const LandingLuz001: React.FC = () => {
    
  // Animation controls for scrolling sections
  const { ref: benefitsRef, isIntersecting: benefitsInView } = useIntersectionObserver({
    threshold: 0.2,
  });

  const { ref: featuresRef, isIntersecting: featuresInView } = useIntersectionObserver({
    threshold: 0.2,
  });

  const { ref: howItWorksRef, isIntersecting: howItWorksInView } = useIntersectionObserver({
    threshold: 0.2,
  });

  // Remove unused mobile detection
  const [, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Set up carousel for testimonials
  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    skipSnaps: false
  }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  // Remove unused scroll animation
  useScroll(); // Keep the hook call to maintain scroll functionality

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 500 
      }
    }
  };

  // Updated the order of steps based on the request
  const howItWorksSteps = [
    {
      number: "01",
      title: "Simule seu empréstimo",
      description: "Descubra quanto você já tem pré-aprovado em segundos",
      icon: <UserCheck className="h-8 w-8 text-blue-600" />
    },
    {
      number: "02",
      title: "Envie seus documentos",
      description: "Apenas RG/CNH e sua última conta de luz paga",
      icon: <FileCheck className="h-8 w-8 text-blue-600" />
    },
    {
      number: "03",
      title: "Receba sua aprovação",
      description: "Nossa análise é rápida e você saberá na hora se foi aprovado",
      icon: <BadgeCheck className="h-8 w-8 text-blue-600" />
    },
    {
      number: "04",
      title: "Receba o dinheiro",
      description: "O valor cai na sua conta no mesmo dia",
      icon: <CreditCard className="h-8 w-8 text-blue-600" />
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      location: "São Paulo, SP",
      text: "Precisava de um dinheiro rápido para resolver um problema na minha casa. Em menos de 2 horas, o dinheiro já estava na minha conta. Sem burocracia, sem complicação!",
      rating: 5,
      source: "Google",
      verified: true,
      icon: <Google className="h-5 w-5" />
    },
    {
      name: "Ana Rodrigues",
      location: "Salvador, BA",
      text: "Mesmo com meu nome negativado, consegui o empréstimo. As parcelas caem direto na conta de luz, o que facilita muito para mim. Recomendo para todos!",
      rating: 5,
      source: "Facebook",
      verified: true,
      icon: <FacebookIcon className="h-5 w-5" />
    },
    {
      name: "José Pereira",
      location: "Fortaleza, CE",
      text: "Achei que não ia conseguir por estar no Serasa, mas em 24h o dinheiro estava na minha conta. O processo foi todo pelo celular, muito prático!",
      rating: 5,
      source: "Instagram",
      verified: true,
      icon: <InstagramIcon className="h-5 w-5" />
    },
    {
      name: "Maria Oliveira",
      location: "Rio de Janeiro, RJ",
      text: "Perfeito! Sem comprovar renda e com parcelas que cabem no meu bolso. Pagar pela conta de luz é muito mais tranquilo. Já indiquei para toda minha família.",
      rating: 5,
      source: "Google",
      verified: true,
      icon: <Google className="h-5 w-5" />
    },
    {
      name: "Roberto Santos",
      location: "Recife, PE",
      text: "A Credios me salvou em um momento difícil. Processo rápido, atendimento excelente e dinheiro na conta no mesmo dia. Não podia ser melhor!",
      rating: 5,
      source: "WhatsApp",
      verified: true,
      icon: <WhatsApp className="h-5 w-5" />
    }
  ];

  const benefits = [
    {
      title: "Dinheiro rápido na conta",
      description: "Receba até R$3.300 na sua conta em poucas horas após aprovação",
      icon: <Zap className="h-10 w-10 text-orange-500" />
    },
    {
      title: "Nome negativado? Aprovado!",
      description: "Empréstimo garantido mesmo para quem está com restrições no CPF",
      icon: <TrendingDown className="h-10 w-10 text-orange-500" />
    },
    {
      title: "Zero comprovação de renda",
      description: "Esqueça holerites e extratos bancários, seu empréstimo é aprovado sem burocracia",
      icon: <BarChart className="h-10 w-10 text-orange-500" />
    },
    {
      title: "Pagamento na conta de luz",
      description: "Parcelas mensais descontadas diretamente na sua fatura de energia",
      icon: <Lightbulb className="h-10 w-10 text-orange-500" />
    }
  ];

  const faqs = [
    {
      question: "Quem pode solicitar o empréstimo na conta de luz?",
      answer: "Qualquer pessoa maior de 18 anos, titular da conta de energia elétrica, que esteja em dia com o pagamento das últimas contas. Mesmo com nome negativado, você pode solicitar."
    },
    {
      question: "Qual o valor máximo que posso solicitar?",
      answer: "O valor máximo é de R$3.300,00, mas o valor aprovado depende da análise de crédito e da sua região."
    },
    {
      question: "Em quanto tempo o dinheiro cai na conta?",
      answer: "Na maioria dos casos, o dinheiro é liberado no mesmo dia, após a aprovação do seu cadastro. O processo é 100% digital e rápido."
    },
    {
      question: "Preciso comprovar renda?",
      answer: "Não! Uma das grandes vantagens do nosso empréstimo é que não exigimos comprovação de renda. Sua conta de luz serve como garantia."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "As parcelas são cobradas diretamente na sua fatura mensal de energia elétrica, o que torna o pagamento muito mais prático e você nunca esquece de pagar."
    },
    {
      question: "O que acontece se eu não pagar?",
      answer: "O não pagamento pode acarretar em negativação do nome e, em casos extremos, corte do fornecimento de energia. Recomendamos sempre manter os pagamentos em dia."
    },
    {
      question: "Minha cidade está na área de cobertura?",
      answer: "Atendemos diversos municípios nos estados da Bahia, Ceará, Pernambuco, Rio Grande do Norte, Goiás, São Paulo, Rio de Janeiro, Paraná e Rio Grande do Sul. Faça uma simulação para verificar a disponibilidade na sua cidade."
    },
    {
      question: "Quais documentos preciso apresentar?",
      answer: "Apenas seus documentos pessoais (RG ou CNH) e sua última conta de luz paga. Todo o processo é feito online, sem necessidade de ir a uma agência."
    }
  ];

  // Readd scrollToHero function
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Adicione essa constante antes do return:
  const googleAdsId = 'AW-16944100859';

  return (
    <>
    {/* Google Ads Global Site Tag - Primeiro script que carrega o gtag.js */}
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
      strategy="afterInteractive"
    />
    
    {/* Google Ads Configuration - Segundo script que configura o gtag */}
    <Script id="google-ads-config" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAdsId}');
      `}
    </Script>
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Main Content */}
      <div>
        {/* Hero Section (Your existing component) */}
        <HeroSection />

        {/* Social Proof Section */}
        <section className="py-10 px-4 bg-white relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 overflow-hidden opacity-5">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div 
              className="flex flex-col items-center text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 py-1.5 px-3 text-sm font-medium">
                CREDIOS É CONFIÁVEL
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Mais de 20 mil brasileiros já realizaram o sonho do crédito
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Somos uma empresa autorizada pelo Banco Central, oferecendo soluções financeiras rápidas e sem burocracia para quem mais precisa.
              </p>
            </motion.div>

            {/* Stats and Trust Badges */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 flex flex-col items-center text-center cursor-default shadow-sm border border-blue-100"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)" }}
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">20mil+</div>
                <div className="text-sm text-gray-600">Clientes satisfeitos</div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 flex flex-col items-center text-center cursor-default shadow-sm border border-yellow-100"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.1), 0 10px 10px -5px rgba(245, 158, 11, 0.04)" }}
              >
                <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">4.8/5</div>
                <div className="text-sm text-gray-600">Avaliação média</div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 flex flex-col items-center text-center cursor-default shadow-sm border border-green-100"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)" }}
              >
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">Aprovação de crédito</div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 flex flex-col items-center text-center cursor-default shadow-sm border border-purple-100"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)" }}
              >
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">24h</div>
                <div className="text-sm text-gray-600">Liberação do dinheiro</div>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 md:gap-10 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full py-2 px-4 border border-blue-200 cursor-default shadow-sm">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-800">Regulado pelo Banco Central</span>
              </div>
              
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-green-100 rounded-full py-2 px-4 border border-green-200 cursor-default shadow-sm">
                <BadgeCheck className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-800">Processo 100% seguro</span>
              </div>
              
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full py-2 px-4 border border-amber-200 cursor-default shadow-sm">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-medium text-gray-800">Liberação no mesmo dia</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section with Animated Cards */}
        <section 
          ref={benefitsRef}
          className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute top-0 right-0 w-96 h-96 transform translate-x-1/3 -translate-y-1/3 text-blue-300 opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M37.5,-64.1C47.9,-56.1,55.2,-43.9,62.6,-31.1C70.1,-18.2,77.8,-4.6,75.7,7.2C73.5,19,61.6,29,50.4,36.8C39.1,44.6,28.6,50.2,17.1,54.8C5.6,59.4,-6.9,63,-20.2,62.8C-33.5,62.6,-47.7,58.5,-56.4,49.2C-65.1,39.9,-68.4,25.5,-71.8,10.3C-75.3,-4.9,-79,-21,-75.3,-35.7C-71.6,-50.4,-60.5,-63.7,-46.7,-70.8C-32.9,-78,-16.5,-79.1,-0.9,-77.7C14.6,-76.4,29.2,-72.5,37.5,-64.1Z" transform="translate(100 100)" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-96 h-96 transform -translate-x-1/3 translate-y-1/3 text-orange-300 opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M37.5,-64.1C47.9,-56.1,55.2,-43.9,62.6,-31.1C70.1,-18.2,77.8,-4.6,75.7,7.2C73.5,19,61.6,29,50.4,36.8C39.1,44.6,28.6,50.2,17.1,54.8C5.6,59.4,-6.9,63,-20.2,62.8C-33.5,62.6,-47.7,58.5,-56.4,49.2C-65.1,39.9,-68.4,25.5,-71.8,10.3C-75.3,-4.9,-79,-21,-75.3,-35.7C-71.6,-50.4,-60.5,-63.7,-46.7,-70.8C-32.9,-78,-16.5,-79.1,-0.9,-77.7C14.6,-76.4,29.2,-72.5,37.5,-64.1Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-2 bg-gradient-to-r from-orange-100 to-amber-200 text-orange-800 border-0 py-1.5 px-3 text-sm font-medium">
                VANTAGENS EXCLUSIVAS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                Por que escolher o Empréstimo na Conta de Luz?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Uma solução financeira pensada para quem precisa de dinheiro rápido, mesmo com nome negativado, sem comprovação de renda e com pagamento facilitado.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-default"
                  variants={cardVariants}
                  whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-200 rounded-full flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white py-4 px-8 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300"
                onClick={scrollToHero}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="flex items-center gap-2"
                >
                  Simular Meu Empréstimo
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section with Comparisons */}
        <section 
          ref={featuresRef}
          className="py-16 px-4 bg-white relative overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-2 bg-gradient-to-r from-blue-100 to-indigo-200 text-blue-800 border-0 py-1.5 px-3 text-sm font-medium">
                DIFERENCIAL CREDIOS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                Compare e veja por que somos a melhor opção
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nosso empréstimo na conta de luz oferece vantagens que nenhum empréstimo tradicional consegue igualar, especialmente para quem está com nome negativado.
              </p>
            </motion.div>

            {/* Comparison Table */}
            <motion.div 
              className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                <div className="col-span-1 font-medium text-gray-500">Características</div>
                <div className="col-span-1 font-bold text-blue-600">Empréstimo na Conta de Luz</div>
                <div className="col-span-1 font-medium text-gray-700">Empréstimo Tradicional</div>
              </div>
              
              <div className="divide-y divide-gray-200">
                <div className="grid grid-cols-3 p-4 hover:bg-blue-50/20 transition-colors">
                  <div className="col-span-1 font-medium text-gray-700">Negativado</div>
                  <div className="col-span-1 text-green-600 font-medium flex items-center"><Check className="h-5 w-5 mr-1" /> Aprovado</div>
                  <div className="col-span-1 text-red-500 font-medium flex items-center"><X className="h-5 w-5 mr-1" /> Reprovado</div>
                </div>
                
                <div className="grid grid-cols-3 p-4 hover:bg-blue-50/20 transition-colors">
                  <div className="col-span-1 font-medium text-gray-700">Comprovação de renda</div>
                  <div className="col-span-1 text-green-600 font-medium flex items-center"><Check className="h-5 w-5 mr-1" /> Dispensada</div>
                  <div className="col-span-1 text-red-500 font-medium flex items-center"><X className="h-5 w-5 mr-1" /> Obrigatória</div>
                </div>
                
                <div className="grid grid-cols-3 p-4 hover:bg-blue-50/20 transition-colors">
                  <div className="col-span-1 font-medium text-gray-700">Prazo de aprovação</div>
                  <div className="col-span-1 text-green-600 font-medium flex items-center"><Check className="h-5 w-5 mr-1" /> Imediato</div>
                  <div className="col-span-1 text-gray-700">Até 7 dias</div>
                </div>
                
                <div className="grid grid-cols-3 p-4 hover:bg-blue-50/20 transition-colors">
                  <div className="col-span-1 font-medium text-gray-700">Burocracia</div>
                  <div className="col-span-1 text-green-600 font-medium flex items-center"><Check className="h-5 w-5 mr-1" /> Mínima</div>
                  <div className="col-span-1 text-gray-700">Alta</div>
                </div>
                
                <div className="grid grid-cols-3 p-4 hover:bg-blue-50/20 transition-colors">
                  <div className="col-span-1 font-medium text-gray-700">Facilidade de pagamento</div>
                  <div className="col-span-1 text-green-600 font-medium flex items-center"><Check className="h-5 w-5 mr-1" /> Na conta de luz</div>
                  <div className="col-span-1 text-gray-700">Boleto separado</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 px-8 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300"
                onClick={scrollToHero}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="flex items-center gap-2"
                >
                  Ver Quanto Posso Receber
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section 
          ref={howItWorksRef}
          className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <svg viewBox="0 0 1000 1000" className="absolute top-0 left-0 w-full h-full opacity-5">
              <circle r="45" cx="400" cy="400" fill="currentColor" className="text-blue-500" />
              <circle r="40" cx="500" cy="600" fill="currentColor" className="text-blue-500" />
              <circle r="35" cx="800" cy="400" fill="currentColor" className="text-blue-500" />
              <circle r="50" cx="700" cy="700" fill="currentColor" className="text-blue-500" />
              <circle r="35" cx="300" cy="700" fill="currentColor" className="text-blue-500" />
            </svg>
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div 
              className="text-center mb-12 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 py-1.5 px-3 text-sm font-medium">
                PROCESSO SIMPLIFICADO
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-4">
                Como funciona o empréstimo na conta de luz?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nosso processo foi desenhado para ser o mais simples e rápido possível, permitindo que você resolva sua situação financeira em poucas horas.
              </p>
            </motion.div>

            {/* Steps */}
            <motion.div 
              className="relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate={howItWorksInView ? "visible" : "hidden"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {howItWorksSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative cursor-default"
                    variants={cardVariants}
                    custom={index}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      borderColor: "rgba(59, 130, 246, 0.5)"
                    }}
                  >
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-md">
                      {step.number}
                    </div>
                    
                    {/* Line connecting steps (except the last one) */}
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 left-full w-8 border-t-2 border-dashed border-blue-300 z-0" style={{ width: "calc(100% - 3rem)" }}></div>
                    )}
                    
                    <div className="mb-4 mt-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white py-4 px-8 rounded-xl text-lg font-bold shadow-lg shadow-orange-500/20 hover:shadow-xl cursor-pointer transition-all duration-300 border-0"
                onClick={scrollToHero}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center gap-2"
                >
                  Começar Minha Simulação Agora
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Carousel Section - Enhanced version */}
        <section className="py-16 px-4 bg-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute top-0 left-0 w-96 h-96 transform -translate-x-1/3 -translate-y-1/3 text-orange-300 opacity-5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M37.5,-64.1C47.9,-56.1,55.2,-43.9,62.6,-31.1C70.1,-18.2,77.8,-4.6,75.7,7.2C73.5,19,61.6,29,50.4,36.8C39.1,44.6,28.6,50.2,17.1,54.8C5.6,59.4,-6.9,63,-20.2,62.8C-33.5,62.6,-47.7,58.5,-56.4,49.2C-65.1,39.9,-68.4,25.5,-71.8,10.3C-75.3,-4.9,-79,-21,-75.3,-35.7C-71.6,-50.4,-60.5,-63.7,-46.7,-70.8C-32.9,-78,-16.5,-79.1,-0.9,-77.7C14.6,-76.4,29.2,-72.5,37.5,-64.1Z" transform="translate(100 100)" />
            </svg>
            <svg className="absolute bottom-0 right-0 w-96 h-96 transform translate-x-1/3 translate-y-1/3 text-blue-300 opacity-5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M37.5,-64.1C47.9,-56.1,55.2,-43.9,62.6,-31.1C70.1,-18.2,77.8,-4.6,75.7,7.2C73.5,19,61.6,29,50.4,36.8C39.1,44.6,28.6,50.2,17.1,54.8C5.6,59.4,-6.9,63,-20.2,62.8C-33.5,62.6,-47.7,58.5,-56.4,49.2C-65.1,39.9,-68.4,25.5,-71.8,10.3C-75.3,-4.9,-79,-21,-75.3,-35.7C-71.6,-50.4,-60.5,-63.7,-46.7,-70.8C-32.9,-78,-16.5,-79.1,-0.9,-77.7C14.6,-76.4,29.2,-72.5,37.5,-64.1Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-2 bg-gradient-to-r from-orange-100 to-amber-200 text-orange-800 border-0 py-1.5 px-3 text-sm font-medium">
                HISTÓRIAS REAIS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600 mb-4">
                O que nossos clientes estão dizendo
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Milhares de brasileiros já conseguiram resolver seus problemas financeiros com o empréstimo na conta de luz. Confira alguns depoimentos.
              </p>
            </motion.div>

            {/* Testimonials Carousel - Enhanced Version */}
            <div className="overflow-hidden mt-8" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 first:pl-0"
                  >
                    <motion.div 
                      className="h-full"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-gradient-to-br from-white to-gray-50 p-1 rounded-2xl shadow-xl h-full">
                        <div className="bg-white rounded-xl h-full overflow-hidden border border-gray-100 relative">
                          {/* Colorful top accent based on source */}
                          <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                          
                          <div className="p-6">
                            {/* Quote icon */}
                            <div className="absolute top-4 right-4 opacity-20">
                              <Quote className="h-10 w-10 text-blue-300" />
                            </div>
                            
                            {/* Header with user info and verification */}
                            <div className="flex items-start mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <span className="text-blue-600 font-bold">{testimonial.name.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
                                <p className="text-gray-500 text-sm">{testimonial.location}</p>
                                <div className="flex items-center mt-1 gap-2">
                                  <div className="flex">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                  </div>
                                  
                                  {testimonial.verified && (
                                    <span className="inline-flex items-center bg-green-100 text-green-700 text-xs font-medium rounded-full px-2 py-0.5">
                                      <CheckCircle2 className="h-3 w-3 mr-1" />
                                      <span>Verificado</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Testimonial text */}
                            <div className="mb-4">
                              <p className="text-gray-700 relative pl-0 italic">
                                &ldquo;{testimonial.text}&rdquo;
                              </p>
                            </div>
                            
                            {/* Source footer */}
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                              <span className="text-xs text-gray-500">Cliente desde 2024</span>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 mr-1">via</span>
                                {testimonial.icon}
                                <span className="text-xs font-medium text-gray-700">{testimonial.source}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators for mobile (optional) */}
            <div className="flex justify-center gap-2 mt-8 md:hidden">
              {testimonials.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
            
            {/* CTA Button */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 px-8 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300"
                onClick={scrollToHero}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="flex items-center gap-2"
                >
                  Quero esse empréstimo também
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/30 to-transparent"></div>
          </div>
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-2 bg-gradient-to-r from-blue-100 to-indigo-200 text-blue-800 border-0 py-1.5 px-3 text-sm font-medium">
                DÚVIDAS FREQUENTES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-4">
                Perguntas e respostas
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Encontre respostas para as dúvidas mais comuns sobre nosso empréstimo na conta de luz. Se precisar de mais esclarecimentos, estamos à disposição.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`} className="border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 hover:border-blue-300">
                    <AccordionTrigger className="px-6 py-4 hover:bg-blue-50/30 text-left font-medium text-gray-900 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-gray-700 bg-gradient-to-r from-white to-blue-50/30">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Bento Box Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="p-8 md:p-12 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <svg className="absolute top-0 right-0 w-96 h-96 transform translate-x-1/3 -translate-y-1/3 opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" d="M37.5,-64.1C47.9,-56.1,55.2,-43.9,62.6,-31.1C70.1,-18.2,77.8,-4.6,75.7,7.2C73.5,19,61.6,29,50.4,36.8C39.1,44.6,28.6,50.2,17.1,54.8C5.6,59.4,-6.9,63,-20.2,62.8C-33.5,62.6,-47.7,58.5,-56.4,49.2C-65.1,39.9,-68.4,25.5,-71.8,10.3C-75.3,-4.9,-79,-21,-75.3,-35.7C-71.6,-50.4,-60.5,-63.7,-46.7,-70.8C-32.9,-78,-16.5,-79.1,-0.9,-77.7C14.6,-76.4,29.2,-72.5,37.5,-64.1Z" transform="translate(100 100)" />
                  </svg>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                  <div className="text-white">
                    <Badge className="mb-4 bg-white/20 text-white border-0 py-1.5 px-3 backdrop-blur-sm">
                      APROVEITE ESTA OPORTUNIDADE
                    </Badge>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Resolva sua situação financeira <span className="text-yellow-300">ainda hoje!</span>
                    </h2>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <p className="text-blue-100">Empréstimo garantido mesmo com nome negativado no SPC/Serasa</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <p className="text-blue-100">Sem necessidade de comprovação de renda</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <p className="text-blue-100">Dinheiro na sua conta em até 24 horas após aprovação</p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <p className="text-blue-100">Parcelas acessíveis diretamente na sua conta de luz</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">Empréstimo de até</h3>
                      <div className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-300">R$ 3.300,00</div>
                      <p className="mb-6 text-blue-100">Simulação rápida, gratuita e sem compromisso</p>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white py-5 px-8 rounded-xl text-xl font-bold shadow-lg shadow-orange-500/20 hover:shadow-xl cursor-pointer transition-all duration-300 border-0"
                          onClick={scrollToHero}
                        >
                          <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center justify-center gap-2"
                          >
                            SIMULAR AGORA
                            <ArrowRight className="h-5 w-5" />
                          </motion.span>
                        </Button>
                      </motion.div>
                      
                      <p className="mt-4 text-sm text-blue-200">Não fazemos consulta ao SPC/Serasa</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <motion.a 
          href="https://api.whatsapp.com/send?phone=552130300606&text=Ol%C3%A1,%20quero%20saber%20mais%20sobre%20o%20empr%C3%A9stimo%20na%20conta%20de%20luz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-full p-4 shadow-lg cursor-pointer transition-all duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Contato por WhatsApp"
        >
          <WhatsApp width="28" height="28" />
        </motion.a>
      </div>
    </div>
    </>
  );
};

export default LandingLuz001;