"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BanknoteIcon, Zap, ShieldCheck, Clock, CheckCircle, Star } from 'lucide-react';

// Componente de título com a animação de marcação sublinhada
const MarkedText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [startAnimation, setStartAnimation] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <span className="relative inline-flex flex-col">
      <span className="relative z-10 font-extrabold">{children}</span>
      {/* Linha de marcação animada */}
      <div className="absolute bottom-1 left-0 w-full h-3 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path
            d="M0,5 Q25,9 50,5 T100,5"
            fill="none"
            stroke="#E05D00"
            strokeWidth="6"
            strokeLinecap="round"
            className={`marker-path ${startAnimation ? 'animate-draw' : ''}`}
          />
        </svg>
      </div>
    </span>
  );
};

// Componente para o destaque "brasileiros"
const SpotlightBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className="relative inline-block font-extrabold"
  >
    <span className="relative z-10 px-4 py-1">{children}</span>
    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg backdrop-blur-sm border border-blue-300/30 shadow-inner z-0"></span>
  </motion.span>
);

// Componente para o carrossel de depoimentos
const TestimonialCarousel: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Carlos S.",
      location: "São Paulo",
      text: "Em menos de 24h o dinheiro caiu na minha conta. Resolveu minha situação quando mais precisei.",
      rating: 5
    },
    {
      id: 2,
      name: "Fernanda L.",
      location: "Rio de Janeiro",
      text: "Mesmo com meu nome negativado, consegui o empréstimo. Processo simples e rápido!",
      rating: 5
    },
    {
      id: 3,
      name: "Paulo M.",
      location: "Belo Horizonte",
      text: "Já tentei em vários bancos e sempre negaram. Na Credios foi aprovado em minutos.",
      rating: 5
    },
    {
      id: 4,
      name: "Roberta K.",
      location: "Salvador",
      text: "O empréstimo na conta de luz foi perfeito para mim. Parcelas que cabem no meu orçamento.",
      rating: 5
    },
    {
      id: 5,
      name: "Marcelo T.",
      location: "Brasília",
      text: "Atendimento excepcional e processo transparente. Recomendo a todos.",
      rating: 5
    }
  ];

  return (
    <div className="w-full overflow-hidden px-4 py-6">
      <div className="testimonial-carousel-container">
        <div className="testimonial-track flex animate-testimonial-scroll">
          {/* Primeira cópia dos depoimentos */}
          {testimonials.map((testimonial) => (
            <div 
              key={`t1-${testimonial.id}`} 
              className="testimonial-slide flex-shrink-0 mx-4 w-80 bg-white rounded-xl border border-blue-100 shadow-md p-6 flex flex-col"
            >
              <div className="flex items-center mb-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="mt-auto">
                <p className="font-semibold text-slate-800">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
          
          {/* Segunda cópia para animação infinita */}
          {testimonials.map((testimonial) => (
            <div 
              key={`t2-${testimonial.id}`} 
              className="testimonial-slide flex-shrink-0 mx-4 w-80 bg-white rounded-xl border border-blue-100 shadow-md p-6 flex flex-col"
            >
              <div className="flex items-center mb-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="mt-auto">
                <p className="font-semibold text-slate-800">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Estatísticas de confiança
const TrustStats = [
  { id: 1, number: "97%", text: "de satisfação dos clientes" },
  { id: 2, number: "10k+", text: "brasileiros atendidos" },
  { id: 3, number: "24h", text: "para receber o dinheiro" },
];

const HomeHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50 py-24 md:py-32">
      {/* Background refinado */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-25"></div>
      
      {/* Formas decorativas */}
      <div className="absolute top-20 right-8 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-yellow-200/20 to-blue-200/20 blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          {/* Badge de categoria aprimorado */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium text-sm border border-blue-200/50 shadow-sm">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Crédito sem burocracia
            </span>
          </motion.div>
          
          {/* Tipografia moderna e refinada com copy aprimorado */}
          <div className="space-y-6 mb-12">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-800 leading-tight"
            >
              A <MarkedText>solução financeira</MarkedText> que acredita em <SpotlightBadge>você</SpotlightBadge>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Desbloqueie o crédito que você merece – mesmo com nome negativado. 
              Processo 100% digital, aprovação em minutos e dinheiro na conta em até 24h.
            </motion.p>
          </div>
          
          {/* Benefícios aprimorados com melhor copy */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12"
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 mr-2">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-slate-700">Resposta em até 10 minutos</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 mr-2">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="text-slate-700">Sem consulta ao SPC/Serasa</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-2">
                <BanknoteIcon className="w-4 h-4" />
              </div>
              <span className="text-slate-700">Dinheiro na conta em 24h</span>
            </div>
          </motion.div>
          
          {/* Botões CTA com copy mais persuasivo */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              className="relative group bg-blue-600 hover:bg-blue-700 text-white h-14 px-6 sm:px-8 text-base font-medium rounded-xl overflow-hidden transition-all duration-300 active:scale-95 active:bg-blue-800"
            >
              <span className="relative z-10 flex items-center">
                <BanknoteIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
                <span>Simular Empréstimo FGTS</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 group-active:opacity-90 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:bg-blue-400 transition-transform origin-left duration-300"></span>
            </Button>
            
            <Button 
              className="relative group bg-blue-600 hover:bg-blue-700 text-white h-14 px-6 sm:px-8 text-base font-medium rounded-xl overflow-hidden transition-all duration-300 active:scale-95 active:bg-blue-800"
            >
              <span className="relative z-10 flex items-center">
                <Zap className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
                <span>Crédito na Conta de Luz</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 group-active:opacity-90 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:bg-blue-400 transition-transform origin-left duration-300"></span>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Nova seção de confiança e autoridade */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Por que milhares de brasileiros confiam na Credios</h2>
          
          {/* Estatísticas de confiança */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {TrustStats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 + stat.id * 0.1 }}
                className="bg-white rounded-lg border border-blue-100 shadow-sm p-6"
              >
                <p className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</p>
                <p className="text-slate-600">{stat.text}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Carrossel de depoimentos real */}
          <TestimonialCarousel />
        </motion.div>
      </div>

      {/* Animações e estilos */}
      <style jsx global>{`
        @keyframes drawMarker {
          0% {
            stroke-dashoffset: 110;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        
        .marker-path {
          stroke-dasharray: 110;
          stroke-dashoffset: 110;
          opacity: 0;
        }
        
        .animate-draw {
          animation: drawMarker 1.2s ease-in-out forwards;
        }
        
        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239fa6b2' fill-opacity='0.1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        /* Animação do carrossel de depoimentos */
        @keyframes testimonial-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .testimonial-carousel-container {
          width: 100%;
          overflow: hidden;
        }
        
        .testimonial-track {
          width: max-content;
          animation: testimonial-scroll 35s linear infinite;
        }
        
        .testimonial-track:hover {
          animation-play-state: paused;
        }
        
        /* Melhorando animação em telas menores */
        @media (max-width: 768px) {
          .testimonial-track {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeHero;