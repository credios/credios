"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useTransform, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// Import Swiper and necessary modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Importando ícones do Lucide
import {
  CheckCircle2,
  Zap,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  Calendar,
  ThumbsUp,
  User,
  Heart,
  CheckCircle,
  Sparkles,
  ArrowUpRight,
  LightbulbIcon,
  Phone,
  Globe,
  Scale,
  Smartphone,
  AtSign,
  HomeIcon,
  DollarSign,
  BarChart
} from 'lucide-react';

// Redes sociais
import { Instagram, Facebook } from 'lucide-react';

// Interface personalizada para ícone do WhatsApp
const WhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
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

// Interface para ícone do Google
const Google = (props: React.SVGProps<SVGSVGElement>) => (
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
interface TestimonialItem {
  name: string;
  location: string;
  rating: number;
  comment: string;
  source: "whatsapp" | "instagram" | "facebook" | "google";
  date?: string;
  profileType?: string;
}

// Dados dos depoimentos
const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Carlos Oliveira",
    location: "São Paulo, SP",
    rating: 5,
    comment: "Processo rápido e descomplicado. Consegui meu empréstimo em tempo recorde sem burocracia.",
    source: "google",
    date: "15/03/2025",
    profileType: "Servidor Público"
  },
  {
    name: "Maria Santos",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    comment: "Atendimento excelente e valores realmente justos. Recomendo para todos!",
    source: "whatsapp",
    date: "10/03/2025",
    profileType: "Aposentada"
  },
  {
    name: "José Silva",
    location: "Belo Horizonte, MG",
    rating: 4,
    comment: "Melhor experiência que já tive com empréstimo. Tudo digital e sem dor de cabeça.",
    source: "facebook",
    date: "05/03/2025",
    profileType: "Autônomo"
  },
  {
    name: "Ana Pereira",
    location: "Fortaleza, CE",
    rating: 5,
    comment: "Crédito aprovado em menos de 1 dia, mesmo com meu nome negativado. Só tenho a agradecer!",
    source: "instagram",
    date: "02/03/2025",
    profileType: "Trabalhadora CLT"
  },
  {
    name: "Roberto Fernandes",
    location: "Brasília, DF",
    rating: 5,
    comment: "Paguei minhas dívidas e organizei minha vida financeira. O atendimento é ótimo e o processo muito tranquilo.",
    source: "google",
    date: "28/02/2025",
    profileType: "Empresário"
  },
  {
    name: "Luciana Mendes",
    location: "Salvador, BA",
    rating: 5,
    comment: "Já tentei empréstimo em vários lugares e sempre negavam por causa do meu nome. Com a Credios consegui na primeira tentativa!",
    source: "whatsapp",
    date: "25/02/2025",
    profileType: "Autônoma"
  },
  {
    name: "Pedro Almeida",
    location: "Recife, PE",
    rating: 5,
    comment: "Dinheiro na conta em menos de 24h. Atendimento super atencioso e processo totalmente online. Recomendo demais!",
    source: "facebook",
    date: "22/02/2025",
    profileType: "Funcionário Público"
  },
  {
    name: "Carla Rodrigues",
    location: "Curitiba, PR",
    rating: 4,
    comment: "Precisei do dinheiro com urgência para uma emergência médica e a Credios me ajudou quando mais precisei. Gratidão!",
    source: "instagram",
    date: "20/02/2025",
    profileType: "Professora"
  }
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

// Global styles para garantir cursor pointer em elementos clicáveis
const globalStyles = `
  a, button, [role="button"], 
  .cursor-pointer, .hover\\:scale-105, .hover\\:scale-110,
  .hover\\:shadow-lg, .hover\\:shadow-xl, .hover\\:shadow-2xl,
  .hover\\:bg-blue-600, .hover\\:bg-orange-600, .hover\\:bg-green-600,
  .hover\\:border-blue-500, .hover\\:border-blue-300,
  .group-hover\\:scale-110, .group-hover\\:-translate-y-1,
  .group:hover {
    cursor: pointer !important;
  }
  
  @keyframes gradientAnimation {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
  
  /* Estilos customizados para o Swiper */
  .swiper {
    width: 100%;
    padding: 20px 10px;
  }
  
  @media (min-width: 640px) {
    .swiper {
      padding: 30px 50px;
    }
  }
  
  .swiper-slide {
    height: auto;
    transition: transform 0.3s;
  }
  
  .swiper-slide-active {
    transform: scale(1.03);
  }
  
  @media (min-width: 640px) {
    .swiper-slide-active {
      transform: scale(1.05);
    }
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #3b82f6;
    background: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.2s;
  }
  
  @media (min-width: 640px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 40px;
      height: 40px;
    }
  }
  
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background: #eff6ff;
    transform: scale(1.1);
  }
  
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  @media (min-width: 640px) {
    .swiper-button-next:after,
    .swiper-button-prev:after {
      font-size: 1.2rem;
    }
  }
  
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #d1d5db;
    opacity: 0.7;
    transition: all 0.3s;
  }
  
  @media (min-width: 640px) {
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
    }
  }
  
  .swiper-pagination-bullet-active {
    width: 16px;
    border-radius: 4px;
    background: #3b82f6;
    opacity: 1;
  }
  
  @media (min-width: 640px) {
    .swiper-pagination-bullet-active {
      width: 20px;
      border-radius: 5px;
    }
  }
`;

// Componente principal
const CorpoHome: React.FC = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(benefitsRef, { once: true, margin: "-50px" });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  
  // Track mouse position for parallax effect in hero section
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position for parallax effect
  const backgroundX = useTransform(mouseX, [-300, 300], [10, -10]);
  const backgroundY = useTransform(mouseY, [-300, 300], [10, -10]);
  
  const circle1X = useTransform(mouseX, [-300, 300], [20, -20]);
  const circle1Y = useTransform(mouseY, [-300, 300], [20, -20]);
  
  // Update mouse position when mouse moves - only on desktop
  useEffect(() => {
    // Only add mouse move event listener on desktop
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Check if device is likely not mobile (window width > 768px)
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);
  
  // Função para renderizar estrelas com base na classificação
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill={i < rating ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ));
  };
  
  // Componente para exibir a origem do depoimento
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
    <main className="w-full flex flex-col items-center bg-white overflow-x-hidden">
      {/* Global styles */}
      <style jsx global>{globalStyles}</style>
      
      {/* Seção Hero - Otimizada para mobile */}
<section className="w-full px-4 py-8 sm:py-16 flex flex-col items-center relative overflow-hidden">
  {/* Background gradients and patterns */}
  <motion.div className="absolute inset-0 z-0"
    style={{ x: backgroundX, y: backgroundY }}>
    <div 
      className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50"
      style={{ backgroundSize: '200% 200%', animation: 'gradientAnimation 15s ease infinite' }}
    />
  </motion.div>
  
  {/* Pattern overlay */}
  <div className="absolute inset-0 z-0 opacity-10" 
    style={{ 
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%234338ca\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1.5\'/%3E%3C/g%3E%3C/svg%3E")',
      backgroundSize: '20px 20px'
    }}
  />
  
  {/* Floating elements */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Floating circles with parallax effect */}
    <motion.div 
      className="absolute top-[-50px] right-[10%] w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-300/30 blur-md"
      animate={{
        y: [0, 15, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: 'easeInOut'
        }
      }}
      style={{ x: circle1X, y: circle1Y }}
    />
    <motion.div 
      className="absolute bottom-[-80px] left-[10%] w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-indigo-200/30 blur-md"
      animate={{
        y: [0, -20, 0],
        transition: {
          duration: 7,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      }}
    />
  </div>
  
  <div className="container mx-auto max-w-7xl">
    <div className="flex flex-col md:flex-row items-center gap-8 px-4">
      {/* Text content - Ensuring high visibility and proper z-index */}
      <motion.div
        className="w-full md:w-1/2 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="relative z-10">
          <Badge className="mb-4 bg-blue-100 text-blue-700 py-1.5 px-3 rounded-full shadow-sm text-xs inline-block">
            CRÉDITO FACILITADO PARA TODOS
          </Badge>
        </motion.div>
        
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 leading-tight relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Crédito digital 
          <span className="block mt-2 text-blue-600">
            para quem mais precisa
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="font-medium">Empréstimos com parcelas na conta de luz ou FGTS</span>, sem burocracia, 100% digital e aprovação mesmo com nome negativado.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Botão primário */}
          <Link href="/emprestimos" passHref>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-6 py-3 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 font-semibold flex items-center gap-2 border border-orange-500 w-full sm:w-auto"
            aria-label="Simular empréstimo agora"
          >
            <span className="text-sm sm:text-base">Simular Agora</span>
            <motion.div 
              animate={pulseAnimation}
              className="bg-white/20 rounded-full p-0.5"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </Button>
          </Link>
          
          {/* Botão secundário */}
          <Link href="https://wa.me/552130300606?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor" target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="lg"
            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full px-6 py-3 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
            aria-label="Falar com consultor"
          >
            <div className="bg-blue-100 rounded-full p-0.5 mr-1">
              <WhatsApp className="h-4 w-4" />
            </div>
            <span>Falar com Consultor</span>
          </Button>
          </Link>
        </motion.div>

        <motion.div 
          className="flex items-center gap-4 text-sm text-gray-500 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-xs font-bold text-white"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
              ))}
              <span className="ml-1 font-semibold">4.8/5</span>
            </div>
            <div className="text-xs">+10 mil clientes satisfeitos</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Image container - fixed for mobile */}
      <motion.div
        className="w-full md:w-1/2 mt-8 md:mt-0"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {/* Rest of the image section here... */}
              <div className="relative max-w-md mx-auto">
                <div className="bg-white p-3 rounded-xl shadow-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  
                  {/* Image container with proper sizing */}
                  <div className="relative w-full h-48 sm:h-64 md:h-72">
                    <Image 
                      src="/images/image009.jpg" 
                      alt="Família feliz após conseguir crédito com a Credios" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-lg object-cover"
                    />
                  </div>
{/* Statistics badge optimized for mobile */}
<div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center shadow-md transform hover:scale-105 transition-transform">
                  <Zap className="h-3 w-3 mr-1" />
                  <span>Aprovação em 2min</span>
                </div>
              </div>
              
              {/* Badges redesigned for better mobile visibility */}
              <div className="absolute -bottom-3 -left-3 transform rotate-[-4deg] bg-white rounded-lg shadow-lg p-2 max-w-[65%]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-blue-100 bg-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <div className="text-[8px] sm:text-xs text-gray-500">
                      Últimas 24 horas
                    </div>
                    <div className="font-bold text-[10px] sm:text-sm text-blue-600 leading-tight">
                      127 empréstimos<br/>aprovados
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-3 -right-3 transform rotate-[4deg] bg-green-500 text-white rounded-lg shadow-lg p-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[10px] sm:text-sm leading-tight">98% de<br/>aprovação</div>
                    <div className="text-[8px] sm:text-xs text-white/80">clientes satisfeitos</div>
                  </div>
                </div>
              </div>
            </div>
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
    </section>

{/* Seção "O que é a Credios" - Revisada para mobile */}
<section className="w-full px-4 py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-indigo-800 text-white relative overflow-hidden">
{/* Background patterns */}
<div className="absolute inset-0 z-0 opacity-10" 
  style={{ 
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
    backgroundSize: '60px 60px'
  }}
/>

{/* Floating decorative elements */}
<div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
<div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>

<div className="container mx-auto relative z-10 max-w-7xl">
  {/* Mobile-first section layout */}
  <div className="flex flex-col md:flex-row items-center gap-8">
    {/* Image section - reverse order on mobile for better UX */}
    <motion.div
      className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative mx-auto max-w-md">
        {/* Container with proper sizing */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="relative w-full h-52 sm:h-64 md:h-80">
            <Image 
              src="/images/image008.jpg" 
              alt="Comunidade impactada positivamente pela Credios" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
        
        {/* Stats cards - improved for mobile */}
        <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 transform rotate-[-3deg]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Impacto Social</div>
              <div className="text-sm sm:text-lg font-bold text-gray-800">+50 mil famílias</div>
              <div className="text-xs text-gray-500">beneficiadas</div>
            </div>
          </div>
        </div>
        
        <div className="absolute -top-4 -right-4 bg-green-500 rounded-xl shadow-xl p-3 transform rotate-[3deg]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <BarChart className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-white">
              <div className="text-xs opacity-80">Crescimento</div>
              <div className="text-sm sm:text-lg font-bold">+200%</div>
              <div className="text-xs opacity-80">em 2024</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    
    {/* Text content section */}
    <motion.div
      className="w-full md:w-1/2 order-2 md:order-1"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative max-w-md mx-auto">
        <div className="absolute -top-3 -left-3 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/20 mt-6 ml-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">O que é a <span className="text-orange-400">Credios</span>?</h2>
          
          <p className="text-sm sm:text-base text-white/90 mb-4">
            A Credios é uma plataforma digital de crédito que nasce com a missão de democratizar o acesso a soluções financeiras para as classes C, D e E, provendo um serviço 100% digital, sem burocracia e com atendimento humanizado.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
              <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center mb-2">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-bold mb-1 text-sm">Nossa Missão</h3>
              <p className="text-white/80 text-xs">
                Promover inclusão financeira e transformar a vida das pessoas através de crédito consciente e acessível.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
              <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center mb-2">
                <LightbulbIcon className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-bold mb-1 text-sm">Nossa Visão</h3>
              <p className="text-white/80 text-xs">
                Ser a principal plataforma de crédito digital para as classes C, D e E, reconhecida pela simplicidade e impacto social.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors text-xs">
              <User className="h-3 w-3 mr-1" />
              Atendimento humanizado
            </Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors text-xs">
              <Smartphone className="h-3 w-3 mr-1" />
              100% digital
            </Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors text-xs">
              <Scale className="h-3 w-3 mr-1" />
              Crédito consciente
            </Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors text-xs">
              <Globe className="h-3 w-3 mr-1" />
              Impacto social
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</div>
</section>

{/* Produtos em Destaque - Mobile optimized */}
<section className="w-full px-4 py-12 sm:py-16 bg-white">
<div className="max-w-7xl mx-auto">
  <div className="text-center mb-8 sm:mb-12">
    <Badge className="mb-3 bg-blue-100 text-blue-700 py-1 px-3 rounded-full font-medium text-xs">
      SOLUÇÕES DE CRÉDITO
    </Badge>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
      Nossos Produtos
    </h2>
    <div className="h-1 w-16 sm:w-20 bg-orange-500 mx-auto mb-4 rounded-full"></div>
    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
      Conheça as soluções financeiras da Credios desenvolvidas para atender suas necessidades com as melhores condições do mercado.
    </p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Produto 1: Empréstimo na Conta de Luz */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="border-0 shadow-xl overflow-hidden group transition-all duration-300 h-full">
        <div className="h-2 bg-orange-500"></div>
        <CardContent className="p-0 h-full">
          <div className="p-4 sm:p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <Badge className="bg-orange-100 text-orange-700 py-1 px-2 text-xs font-medium shadow-sm">POPULAR</Badge>
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 group-hover:text-orange-500 transition-colors">Empréstimo na Conta de Luz</h3>
            <p className="text-sm text-gray-600 mb-4">
              Use sua conta de energia elétrica como garantia e obtenha crédito rápido, mesmo com restrições no nome.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm group-hover:bg-orange-50 transition-colors">
                <p className="text-xs text-gray-500 mb-1">Valor disponível</p>
                <p className="text-base sm:text-lg font-bold text-orange-500">Até R$ 3.300,00</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm group-hover:bg-orange-50 transition-colors">
                <p className="text-xs text-gray-500 mb-1">Prazo de pagamento</p>
                <p className="text-base sm:text-lg font-bold text-orange-500">12 meses</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">Sem consulta ao SPC/Serasa</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">Aprovação em minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">Receba via PIX instantaneamente</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <Link href="/emprestimo-na-conta-de-luz" passHref>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-sm rounded-full shadow-lg font-medium group-hover:shadow-xl transition-all flex items-center justify-center gap-2 transform group-hover:-translate-y-1 active:scale-95">
                Simular Empréstimo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
    
    {/* Produto 2: Empréstimo FGTS */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="border-0 shadow-xl overflow-hidden group transition-all duration-300 h-full">
        <div className="h-2 bg-blue-500"></div>
        <CardContent className="p-0 h-full">
          <div className="p-4 sm:p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <Badge className="bg-blue-100 text-blue-700 py-1 px-2 text-xs font-medium shadow-sm">RECOMENDADO</Badge>
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-500 transition-colors">Empréstimo FGTS</h3>
            <p className="text-sm text-gray-600 mb-4">
              Antecipe seu saque-aniversário do FGTS e receba o valor anualmente com as melhores taxas do mercado.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm group-hover:bg-blue-50 transition-colors">
                <p className="text-xs text-gray-500 mb-1">Antecipação</p>
                <p className="text-base sm:text-lg font-bold text-blue-500">Até 12 anos</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm group-hover:bg-blue-50 transition-colors">
                <p className="text-xs text-gray-500 mb-1">Taxa mensal</p>
                <p className="text-base sm:text-lg font-bold text-blue-500">A partir de 1,49%</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">Aceita negativados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">Sem comprometer renda mensal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">Contratação 100% digital</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <Link href="/emprestimo-fgts" passHref>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 text-sm rounded-full shadow-lg font-medium group-hover:shadow-xl transition-all flex items-center justify-center gap-2 transform group-hover:-translate-y-1 active:scale-95">
                Simular Empréstimo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </div>
</div>
</section>
{/* Benefícios - Mobile optimized */}
<section 
  className="w-full px-4 py-12 sm:py-16 bg-gray-50 relative overflow-hidden"
  ref={benefitsRef}
>
  {/* Background elements */}
  <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
  <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-orange-100 opacity-50 blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-8">
      <Badge className="mb-3 bg-blue-100 text-blue-700 py-1 px-3 rounded-full font-medium text-xs">
        VANTAGENS
      </Badge>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Por Que Escolher a Credios?
      </h2>
      <div className="h-1 w-16 bg-orange-500 mx-auto mb-4 rounded-full"></div>
      <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
        Oferecemos uma experiência diferenciada para que você tenha a melhor solução financeira com toda segurança e rapidez.
      </p>
    </div>
    
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Benefício 1 */}
      <motion.div 
        variants={fadeIn}
        whileHover={{ y: -8 }}
        className="h-full"
      >
        <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-gradient-to-b from-white to-blue-50">
          <CardContent className="p-4 sm:p-6 flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform transform duration-300 shadow-md">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg mb-3 group-hover:text-blue-600 transition-colors">Atendimento 24/7</CardTitle>
            <p className="text-gray-600 text-sm">
              Processo 100% digital e automatizado, disponível a qualquer hora do dia ou da noite para sua conveniência.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link href="/emprestimos" passHref>
              <Button variant="ghost" className="p-0 h-auto flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors cursor-pointer text-sm">
                <span>Saiba mais</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Benefício 2 */}
      <motion.div 
        variants={fadeIn}
        whileHover={{ y: -8 }}
        className="h-full"
      >
        <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-gradient-to-b from-white to-blue-50">
          <CardContent className="p-4 sm:p-6 flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform transform duration-300 shadow-md">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg mb-3 group-hover:text-blue-600 transition-colors">Segurança Garantida</CardTitle>
            <p className="text-gray-600 text-sm">
              Suas informações estão protegidas com a mais avançada tecnologia de criptografia e protocolos de segurança.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link href="/emprestimos" passHref>
              <Button variant="ghost" className="p-0 h-auto flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors text-sm">
                <span>Saiba mais</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Benefício 3 */}
      <motion.div 
        variants={fadeIn}
        whileHover={{ y: -8 }}
        className="h-full"
      >
        <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-gradient-to-b from-white to-blue-50">
          <CardContent className="p-4 sm:p-6 flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform transform duration-300 shadow-md">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg mb-3 group-hover:text-blue-600 transition-colors">Processo Rápido</CardTitle>
            <p className="text-gray-600 text-sm">
              Aprovação e liberação de crédito em minutos, sem filas ou burocracia para você resolver suas necessidades com agilidade.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link href="/emprestimos" passHref>
              <Button variant="ghost" className="p-0 h-auto flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors text-sm">
                <span>Saiba mais</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Benefício 4 */}
      <motion.div 
        variants={fadeIn}
        whileHover={{ y: -8 }}
        className="h-full"
      >
        <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-gradient-to-b from-white to-blue-50">
          <CardContent className="p-4 sm:p-6 flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform transform duration-300 shadow-md">
              <FileCheck className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg mb-3 group-hover:text-blue-600 transition-colors">Sem Burocracia</CardTitle>
            <p className="text-gray-600 text-sm">
              Documentação mínima necessária e processo simplificado para a sua comodidade, aprovação mesmo para negativados.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link href="/emprestimos" passHref>
              <Button variant="ghost" className="p-0 h-auto flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors text-sm">
                <span>Saiba mais</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  </div>
</section>

{/* Depoimentos - implementado com Swiper - mobile optimized */}
<section 
  className="w-full px-4 py-12 sm:py-16 bg-white relative overflow-hidden"
  ref={testimonialsRef}
>
  {/* Background decorations */}
  <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-100 opacity-30 blur-3xl"></div>
  <div className="absolute -bottom-20 -left-40 w-80 h-80 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-8">
    <Badge className="mb-3 bg-blue-100 text-blue-700 py-1 px-3 rounded-full font-medium text-xs">
        DEPOIMENTOS
      </Badge>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        O Que Nossos Clientes Dizem
      </h2>
      <div className="h-1 w-16 bg-orange-500 mx-auto mb-4 rounded-full"></div>
      <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
        Confira as experiências reais de quem já utilizou nossos serviços e transformou sua vida financeira com a Credios.
      </p>
    </div>
    
    <motion.div
      initial="hidden"
      animate={isTestimonialsInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Improved Swiper implementation for mobile */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          480: { spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="testimonial-swiper py-5 sm:py-10"
      >
        {TESTIMONIALS.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Card className="h-full border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center font-bold relative overflow-hidden shadow-md text-xs">
                      {testimonial.name
                        .split(" ")
                        .map(part => part[0])
                        .join("")
                        .substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
                        {testimonial.name}
                      </div>
                      <CardDescription className="text-xs flex items-center">
                        <AtSign className="h-3 w-3 text-gray-400 mr-1" />
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
              <CardContent className="p-4 pt-0">
                <p className="text-gray-600 text-sm italic">&quot;{testimonial.comment}&quot;</p>
              </CardContent>
              <CardFooter className="text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t pt-3 px-4 pb-4">
                <div className="flex items-center gap-2">
                  <SocialSourceDisplay source={testimonial.source} />
                  <VerifiedBadge />
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{testimonial.date}</span>
                </div>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Stats section - mobile optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-inner">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">10 mil+</div>
            <div className="text-gray-600 text-xs sm:text-sm">Clientes satisfeitos</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2 shadow-inner">
              <Star className="h-5 w-5 text-orange-500" fill="currentColor" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1">4.8/5</div>
            <div className="text-gray-600 text-xs sm:text-sm">Avaliação média</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2 shadow-inner">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">98%</div>
            <div className="text-gray-600 text-xs sm:text-sm">Taxa de aprovação</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2 shadow-inner">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">2 min</div>
            <div className="text-gray-600 text-xs sm:text-sm">Tempo de aprovação</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

{/* CTA Final - Mobile optimized */}
<section className="w-full px-4 py-12 sm:py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
  {/* Padrão de fundo */}
  <div className="absolute inset-0 opacity-10" 
    style={{ 
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      backgroundSize: '180px 180px'
    }}
  />
  
  {/* Floating decorative circles */}
  <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
  <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-8"
    >
      <Badge className="mb-4 bg-white/20 text-white py-1 px-3 rounded-full backdrop-blur-sm font-medium text-xs">
        TRANSFORME SUA VIDA FINANCEIRA
      </Badge>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Pronto para obter o crédito<br className="hidden sm:block" /> que você precisa?
      </h2>
      <p className="text-base sm:text-lg text-blue-100 mb-6 max-w-3xl mx-auto px-2">
        Simule agora mesmo e descubra quanto você pode receber com as melhores condições do mercado, mesmo se estiver com nome negativado.
      </p>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto mb-8"
    >
      {/* Botão primário otimizado para mobile */}
      <Link href="/emprestimos" passHref>
      <Button
        size="lg"
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 sm:py-4 text-sm sm:text-base rounded-full w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 font-bold px-6 flex items-center justify-center gap-2 border-2 border-orange-500"
      >
        <div className="bg-white/20 rounded-full p-1">
          <Zap className="h-4 w-4" />
        </div>
        <span>Simular Empréstimo</span>
        <motion.div animate={pulseAnimation}>
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </Button>
      </Link>
      
      {/* Botão secundário otimizado para mobile */}
      <Link href="https://wa.me/552130300606?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor" target="_blank" rel="noopener noreferrer">
      <Button
        size="lg"
        variant="outline"
        className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-600 py-3 sm:py-4 text-sm sm:text-base rounded-full w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 font-bold px-6 flex items-center justify-center gap-2"
      >
        <div className="bg-white/20 rounded-full p-1">
          <WhatsApp className="h-4 w-4" />
        </div>
        <span>Falar com Consultor</span>
      </Button>
      </Link>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/20 max-w-3xl mx-auto"
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Phone className="h-4 w-4 text-white" />
          </div>
          <div className="text-white text-sm">
            <div className="opacity-80">Atendimento</div>
            <div className="font-medium">(21) 3030-0606</div>
          </div>
        </div>
        
        <div className="hidden sm:block h-6 w-px bg-white/20"></div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <HomeIcon className="h-4 w-4 text-white" />
          </div>
          <div className="text-white text-sm">
            <div className="opacity-80">Endereço</div>
            <div className="font-medium">Rio de Janeiro, RJ</div>
          </div>
        </div>
        
        <div className="hidden sm:block h-6 w-px bg-white/20"></div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <div className="text-white text-sm">
            <div className="opacity-80">CNPJ</div>
            <div className="font-medium">55.986.282/0001-30</div>
          </div>
        </div>
      </div>
    </motion.div>
    
    <div className="flex flex-wrap justify-center gap-2 mt-8 text-center">
      <Badge className="bg-white/10 text-white py-1 px-2 backdrop-blur-sm text-xs">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Mais de 10 mil clientes
      </Badge>
      <Badge className="bg-white/10 text-white py-1 px-2 backdrop-blur-sm text-xs">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Aprovação em minutos
      </Badge>
      <Badge className="bg-white/10 text-white py-1 px-2 backdrop-blur-sm text-xs">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        100% online
      </Badge>
      <Badge className="bg-white/10 text-white py-1 px-2 backdrop-blur-sm text-xs">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Sem consulta ao SPC/Serasa
      </Badge>
    </div>
  </div>
</section>
</main>
);
};

export default CorpoHome;
   
