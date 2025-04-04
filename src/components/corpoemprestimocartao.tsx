"use client";
// Verificado badge component
const VerifiedBadge = () => (
    <span className="inline-flex items-center justify-center bg-green-100 text-green-700 text-xs font-medium rounded-full px-2 py-0.5">
      <CheckCircle2 className="h-3 w-3 mr-1" />
      <span>Verificado</span>
    </span>
  );
  
  import React, { useState, useRef, useEffect } from "react";
  import Image from "next/image";
  import Link from "next/link";
  import Head from "next/head";
  import { motion, useInView, useScroll, useTransform } from "framer-motion";
  
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
  
  // Ícones do Lucide
  import {
    CheckCircle2,
    Zap,
    CreditCard,
    FileCheck,
    ArrowRight,
    ShieldCheck,
    Star,
    Percent,
    User,
    Clock,
    Award,
    LucideProps,
    ThumbsUp,
    Calendar,
    MessageCircle,
    Check,
    AlertCircle,
    AtSign,
    Info,
    Timer,
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
  
  // Dados expandidos com SEO e copywriting melhorados
  const ADVANTAGES: AdvantageItem[] = [
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Aprovação Ultra Rápida",
      description:
        "Dinheiro via Pix em até 5 minutos direto na sua conta. Sem burocracia, sem espera. O crédito que você precisa quando mais precisa!",
      highlight: "5 MIN",
      action: "Simular Agora",
      actionUrl: "https://simulador.credios.com.br/page/credito-pessoal/simular?_gl=1*7nv8ne*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2",
      stats: [{ value: "5 MIN", label: "Liberação Express" }],
      backgroundColor: "from-blue-50 to-indigo-50",
      accentColor: "blue",
    },
    {
      icon: <Percent className="h-8 w-8 text-green-500" />,
      title: "Taxas Imbatíveis no Mercado",
      description:
        "A partir de 1,99% ao mês, muito abaixo da média nacional. Sem taxas escondidas, sem surpresas no final. Economia real para seu bolso.",
      highlight: "1,99%",
      action: "Ver Simulação Personalizada",
      actionUrl: "https://simulador.credios.com.br/page/credito-pessoal/simular?_gl=1*7nv8ne*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2",
      stats: [{ value: "1,99%", label: "Taxa Mensal Mínima" }],
      backgroundColor: "from-green-50 to-teal-50",
      accentColor: "green",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-indigo-500" />,
      title: "100% Digital e Seguro",
      description:
        "Esqueça filas, papelada e burocracia. Todo o processo é feito pelo seu celular, com proteção de dados de nível bancário e criptografia avançada.",
      highlight: "SEGURANÇA",
      action: "Como Funciona",
      actionUrl: "https://simulador.credios.com.br/page/credito-pessoal/simular?_gl=1*7nv8ne*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2",
      stats: [{ value: "24/7", label: "Disponível Sempre" }],
      backgroundColor: "from-indigo-50 to-purple-50",
      accentColor: "indigo",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-teal-500" />,
      title: "Parcelas Flexíveis que Cabem no Bolso",
      description:
        "Escolha até 12x para pagar como preferir, adaptando o empréstimo à sua realidade financeira. Você no controle, sem comprometer seu orçamento.",
      highlight: "12x",
      action: "Calcular Parcelas",
      actionUrl: "https://simulador.credios.com.br/page/credito-pessoal/simular?_gl=1*7nv8ne*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2",
      stats: [{ value: "12x", label: "Parcelamento Máximo" }],
      backgroundColor: "from-teal-50 to-cyan-50",
      accentColor: "teal",
    },
  ];
  
  const HOW_IT_WORKS: ProcessStep[] = [
    {
      title: "Simule em 30 Segundos e Descubra Seu Limite",
      description: "Insira os dados do seu cartão e descubra instantaneamente quanto crédito você pode ter. Sem afetar seu score de crédito!",
      icon: <CreditCard className="h-6 w-6" />,
      details: ["Análise instantânea", "Sem impacto no score", "Sem compromisso"],
      duration: "30 seg",
    },
    {
      title: "Aprovação Instantânea Garantida",
      description: "Nossa tecnologia verifica seu cartão em tempo real e aprova seu crédito na hora. Sem análise manual, sem demora!",
      icon: <FileCheck className="h-6 w-6" />,
      details: ["Apenas alguns cliques", "Sistema automatizado", "Contratação 100% digital"],
      duration: "2 min",
    },
    {
      title: "Receba pelo Pix Imediatamente",
      description: "O dinheiro cai na sua conta em minutos, pronto para usar como quiser. Sem esperar dias ou horas como nos bancos tradicionais!",
      icon: <Zap className="h-6 w-6" />,
      details: ["Transferência imediata", "Disponível 24h", "Sem taxas extras"],
      duration: "Hoje mesmo",
    },
  ];
  
  const FAQ_ITEMS: FaqItem[] = [
    {
      question: "O empréstimo no cartão de crédito da Credios é realmente seguro?",
      answer:
        "Absolutamente! A Credios utiliza criptografia de nível bancário para proteger cada transação. Seus dados são armazenados em ambiente seguro, com certificações internacionais de segurança e proteção contra vazamentos. Milhares de brasileiros já confiam em nosso sistema diariamente.",
    },
    {
      question: "Quais bandeiras de cartão de crédito são aceitas para o empréstimo?",
      answer:
        "Trabalhamos com todas as principais bandeiras: Visa, Mastercard, Elo e American Express. Mesmo cartões de bancos digitais são aceitos! Basta iniciar a simulação para verificar se o seu cartão está apto para o empréstimo imediato.",
    },
    {
      question: "Qual o valor máximo de empréstimo que posso solicitar no meu cartão?",
      answer:
        "O valor disponível para empréstimo depende diretamente do seu limite disponível no cartão de crédito. Durante a simulação, nossa tecnologia verifica automaticamente e mostra quanto você pode receber, que pode chegar até 95% do seu limite disponível. Muitos clientes conseguem valores entre R$1.000 e R$15.000 rapidamente.",
    },
    {
      question: "Preciso enviar comprovantes ou documentos para solicitar o empréstimo?",
      answer:
        "Não! Todo o processo é 100% digital e simplificado. Basta inserir os dados do seu cartão, confirmar algumas informações básicas e pronto. Sem burocracia, sem papelada e sem comprovações complicadas que atrasam sua aprovação.",
    },
    {
      question: "Em quanto tempo o dinheiro do empréstimo cai na minha conta?",
      answer:
        "Nosso sistema de aprovação é instantâneo e o envio do dinheiro é feito via Pix, o que significa que você recebe o valor em minutos após a aprovação. A grande maioria dos nossos clientes relata recebimento em menos de 5 minutos! É o empréstimo mais rápido do mercado.",
    },
    {
      question: "O empréstimo no cartão de crédito afeta meu limite de compras?",
      answer:
        "Sim, o valor solicitado utiliza parte do seu limite disponível no cartão. No entanto, à medida que você paga as parcelas mensais, o limite vai sendo restabelecido gradualmente, exatamente como acontece com suas compras normais no cartão de crédito.",
    },
  ];
  
  const TESTIMONIALS: TestimonialItem[] = [
    {
      name: "Ana Silva",
      location: "São Paulo, SP",
      rating: 5,
      comment:
        "Consegui R$ 2.500 em menos de 5 minutos! Me salvou para pagar uma conta de hospital urgente. O dinheiro caiu no meu Pix quase que instantaneamente. Nunca vi um serviço tão rápido!",
      source: "google",
      date: "15/02/2024",
      url: "#"
    },
    {
      name: "João Pedro",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      comment:
        "Processo incrivelmente rápido e sem burocracia. Precisei de dinheiro urgente para consertar meu carro e em menos de 10 minutos o valor já estava disponível. Recomendo para todos!",
      source: "whatsapp",
      date: "20/02/2024",
      url: "#"
    },
    {
      name: "Maria Clara",
      location: "Belo Horizonte, MG",
      rating: 5,
      comment:
        "As taxas são realmente as melhores do mercado e o atendimento é excelente! Consegui um empréstimo no meu cartão com uma taxa muito menor que outras opções. Vou indicar para toda minha família.",
      source: "instagram",
      date: "01/03/2024",
      url: "#"
    },
    {
      name: "Carlos Eduardo",
      location: "Salvador, BA",
      rating: 5,
      comment:
        "Já tentei empréstimos em vários lugares e sempre tinha problemas com aprovação. Na Credios, fui aprovado em segundos! O dinheiro caiu na conta na mesma hora. Simplesmente incrível!",
      source: "facebook",
      date: "05/03/2024",
      url: "#"
    },
  ];
  
  // Componente para SEO
  const SEOHead = () => (
    <Head>
      <title>Empréstimo no Cartão de Crédito | Dinheiro em até 5 minutos | Credios</title>
      <meta 
        name="description" 
        content="Transforme seu limite do cartão de crédito em dinheiro na conta via Pix em até 5 minutos. Taxas a partir de 1,99% ao mês, sem burocracia e 100% online. Simule agora!" 
      />
      <meta name="keywords" content="empréstimo no cartão de crédito, crédito rápido, empréstimo online, empréstimo sem burocracia, empréstimo com cartão, empréstimo imediato" />
      <meta property="og:title" content="Empréstimo no Cartão de Crédito | Dinheiro em até 5 minutos | Credios" />
      <meta property="og:description" content="Transforme seu limite do cartão de crédito em dinheiro na conta via Pix em até 5 minutos. Simule agora!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://credios.com.br/emprestimo-cartao-credito" />
      <meta property="og:image" content="https://credios.com.br/images/og-emprestimo-cartao.jpg" />
      <script type="application/ld+json">
        {`{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "Empréstimo no Cartão de Crédito Credios",
          "description": "Empréstimo rápido utilizando o limite do cartão de crédito com aprovação em minutos",
          "category": "Empréstimo Pessoal",
          "offers": {
            "@type": "Offer",
            "price": "1000.00",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock"
          },
          "interestRate": {
            "@type": "QuantitativeValue",
            "value": "1.99",
            "minValue": "1.99",
            "maxValue": "6.99"
          },
          "loanTerm": {
            "@type": "QuantitativeValue",
            "minValue": "1",
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
  
  // Hero Section Melhorada
  const HeroSection = () => {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    
    return (
      <div className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50">
        {/* Elementos de fundo decorativos */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-orange-300 opacity-10 blur-3xl"></div>
          <div className="absolute top-40 -left-10 w-80 h-80 rounded-full bg-blue-300 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-teal-300 opacity-10 blur-3xl"></div>
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
                <Badge className="mb-6 bg-gradient-to-r from-orange-400 to-red-500 text-white py-1.5 px-6 flex items-center gap-1.5 rounded-full shadow-sm">
                  <Zap className="h-4 w-4" />
                  <span className="font-medium">Dinheiro em até 5 minutos</span>
                </Badge>
              </motion.div>
              
              <motion.h1
                className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 leading-tight"
                variants={slideInLeft}
              >
                Transforme Seu Limite em 
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent">
                  Dinheiro na Conta 
                  <span className="inline-block ml-1 relative">
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </span>
                    Agora
                  </span>
                </span>
              </motion.h1>
  
              <motion.p
                className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl"
                variants={slideInLeft}
              >
                <span className="font-medium">Sem consulta ao SPC/Serasa</span>. Receba o valor via Pix em até 5 minutos, sem burocracia ou ligações de banco. Destrave seu crédito hoje mesmo!
              </motion.p>
  
              <motion.div
                className="flex flex-wrap gap-4 mb-8"
                variants={slideInLeft}
              >
                <Link href="https://simulador.credios.com.br/page/credito-pessoal/simular?_gl=1*7nv8ne*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 font-semibold flex items-center gap-2"
                    aria-label="Simule seu empréstimo no cartão de crédito agora"
                  >
                    <span>Simule e Receba Hoje</span>
                    <motion.div animate={pulseAnimation}>
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </Link>
                <Link href="#como-funciona">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                    aria-label="Saiba como funciona o empréstimo no cartão de crédito"
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
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-xs font-bold text-orange-600"
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
                    <span className="ml-1 font-semibold">4.9/5</span>
                  </div>
                  <div>Mais de 100 mil clientes satisfeitos</div>
                </div>
              </motion.div>
            </motion.div>
  
            <motion.div
              className="flex-1 hidden md:block relative"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
            >
              {/* Card flutuante de simulação */}
              <motion.div 
                className="absolute -top-8 -left-8 bg-white rounded-xl shadow-xl p-4 z-20 border border-gray-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700">Aprovado</span>
                </div>
                <div className="text-xs text-gray-500">Valor liberado</div>
                <div className="text-lg font-bold text-gray-900">R$ 3.500,00</div>
              </motion.div>
  
              {/* Card flutuante de tempo */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 z-20 border border-gray-100"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-medium text-orange-700">Ultra Rápido</span>
                </div>
                <div className="text-xs text-gray-500">Tempo de aprovação</div>
                <div className="text-lg font-bold text-gray-900">5 minutos</div>
              </motion.div>
  
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-2xl"></div>
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl"></div>
                <Image
                  src="/images/image003.jpg" // Substitua pela sua imagem real
                  alt="Simule seu empréstimo no cartão de crédito e receba via Pix em minutos"
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
  
  // Componentes Reutilizáveis aprimorados
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
        <Badge className="mb-4 bg-gradient-to-r from-orange-200 to-orange-100 text-orange-700 py-1.5 px-4 rounded-full shadow-sm">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="h-1.5 w-24 bg-gradient-to-r from-orange-300 to-red-400 rounded-full mx-auto mb-4"></div>
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
      blue: "group-hover:from-blue-500 group-hover:to-blue-600",
      green: "group-hover:from-green-500 group-hover:to-green-600",
      indigo: "group-hover:from-indigo-500 group-hover:to-indigo-600",
      teal: "group-hover:from-teal-500 group-hover:to-teal-600",
    };
  
    const accentColorKey = (item.accentColor || "blue") as keyof typeof colorMap;
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
          className={`h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden bg-gradient-to-br ${item.backgroundColor} hover:bg-white`}
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
  
  // Carrossel de depoimentos melhorado com ícones de redes sociais
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white flex items-center justify-center font-bold relative overflow-hidden shadow-md group-hover:scale-105 transition-transform">
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
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === Math.abs(position) % TESTIMONIALS.length ? 'bg-orange-500 w-6' : 'bg-gray-300'}`}
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
      <div className="py-20 bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-hidden" id="como-funciona">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-200 opacity-10 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-blue-200 opacity-10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading
            title="Como Funciona o Empréstimo no Cartão de Crédito"
            description="Três passos simples para ter o dinheiro no seu Pix em questão de minutos."
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
                  <div className="absolute top-16 bottom-0 left-6 w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-teal-400 to-blue-400 z-0"></div>
                )}
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-teal-100 relative z-10 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        {step.icon}
                      </div>
                      {step.duration && (
                        <div className="mt-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full flex items-center gap-1.5 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <Clock className="h-3 w-3" />
                          {step.duration}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                        <span className="text-orange-500 mr-2">{index + 1}.</span>
                        {step.title}
                      </h4>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                      {step.details && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.details.map((detail, i) => (
                            <div 
                              key={i} 
                              className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg group-hover:bg-teal-50 transition-colors"
                            >
                              <CheckCircle2 className="h-4 w-4 text-teal-500 group-hover:scale-110 transition-transform" /> 
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
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-3 px-6 rounded-full flex items-center gap-2 shadow-lg">
                <ThumbsUp className="h-5 w-5" />
                <span className="font-medium">Pronto! Dinheiro na sua conta</span>
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
            <Link href="https://simulador.credios.com.br/page/credito-pessoal/simular?_gl=1*7nv8ne*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Simular empréstimo no cartão de crédito agora"
              >
                Simular Valor Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Processo 100% digital | Sem consulta ao SPC/Serasa | Aprovação em minutos
            </p>
          </motion.div>
        </div>
      </div>
    );
  };
  
  // FAQ com schema markup
  const FAQSection = () => {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Perguntas Frequentes sobre Empréstimo no Cartão"
            description="Tire suas dúvidas sobre o processo de empréstimo usando seu cartão de crédito."
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
                    <AccordionTrigger className="px-5 py-4 hover:bg-blue-50 cursor-pointer group">
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
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
            
            {/* Pergunta não encontrada */}
            <motion.div
              className="mt-8 p-4 border border-dashed border-orange-300 rounded-xl bg-orange-50 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Info className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="text-orange-700 font-medium">Ainda tem dúvidas sobre empréstimo no cartão de crédito?</p>
              <p className="text-orange-600 text-sm mt-1 mb-3">Nosso time está online agora para te ajudar</p>
              <Link href="/contato">
                <Button 
                  variant="outline" 
                  className="border-orange-400 text-orange-600 hover:bg-orange-100 rounded-full transition-colors"
                  aria-label="Entrar em contato para tirar dúvidas sobre empréstimo no cartão de crédito"
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
  
  // CTA Final aprimorado
  const FinalCTA = () => (
    <div className="py-20 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
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
              ÚLTIMAS VAGAS
            </Badge>
          </motion.div>
          
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="block mb-2">Resolva Suas Finanças</span>
            <span className="text-5xl md:text-6xl text-yellow-300 drop-shadow-md">Agora Mesmo</span>
          </motion.h3>
          
          <motion.p
            className="text-white/90 mb-8 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Mais de <span className="font-bold underline decoration-yellow-300">100 mil brasileiros</span> já desbloquearam crédito rápido no cartão.
            Tenha o valor que precisa na sua conta <span className="font-bold">ainda hoje</span>, sem burocracia.
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
                      className="w-8 h-8 rounded-full border-2 border-orange-500 bg-white flex items-center justify-center text-xs font-bold text-orange-500"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">12 pessoas solicitaram empréstimo</p>
                  <p className="text-xs opacity-80">nos últimos 30 minutos</p>
                </div>
              </div>
            </div>
            
            <Link href="https://simulador.credios.com.br/page/credito-pessoal/simular?_gl=1*7nv8ne*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 rounded-full px-10 py-7 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-bold flex items-center gap-2"
                aria-label="Simular empréstimo no cartão de crédito agora"
              >
                <span>Simule Seu Empréstimo Agora</span>
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
                <span>Aprovação em 5 min</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-yellow-300" />
                <span>Sem consulta ao SPC</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-yellow-300" />
                <span>Pix na hora</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
  
  // Seção de Vantagens aprimorada
  const AdvantagesSection = () => (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      <div className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-teal-100 opacity-50 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Vantagens"
          title="Por Que Escolher o Empréstimo no Cartão da Credios?"
          description="Descubra por que somos a opção preferida por quem precisa de dinheiro rápido e sem complicações."
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
        
        {/* Estatísticas */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
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
            { value: "100mil+", label: "Clientes Satisfeitos", icon: <User className="h-6 w-6" /> },
            { value: "4.9/5", label: "Avaliação Média", icon: <Star className="h-6 w-6" /> },
            { value: "5min", label: "Tempo Médio", icon: <Clock className="h-6 w-6" /> },
            { value: "1.99%", label: "Taxa Mínima", icon: <Award className="h-6 w-6" /> },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mx-auto mb-3 text-blue-500 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
  
  // Componente Principal com SEO e melhorias
  export default function EmprestimoCartaoPage() {
    return (
      <section className="w-full overflow-hidden font-sans">
        {/* SEO Metadata */}
        <SEOHead />
        
        {/* Hero Section */}
        <HeroSection />
  
        {/* Vantagens */}
        <AdvantagesSection />
  
        {/* Como funciona */}
        <HowItWorksSection />
  
        {/* Depoimentos */}
        <div className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-200 opacity-10 blur-3xl"></div>
          <div className="absolute -top-20 -left-40 w-80 h-80 rounded-full bg-indigo-200 opacity-10 blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <SectionHeading
              badge="Depoimentos Reais"
              title="O Que Nossos Clientes Dizem sobre o Empréstimo"
              description="Confira como ajudamos milhares de brasileiros a conseguir crédito rápido quando mais precisavam."
            />
            <TestimonialCarousel />
          </div>
        </div>
  
        {/* FAQ */}
        <FAQSection />
  
        {/* CTA Final */}
        <FinalCTA />
      </section>
    );
  }