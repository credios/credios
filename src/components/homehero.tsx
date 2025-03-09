"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BanknoteIcon, Zap, ShieldCheck } from 'lucide-react';

// Componente de título com a animação de marcação
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
      <span className="relative z-10 text-blue-700 font-extrabold">{children}</span>
      {/* Linha de marcação animada */}
      <div className="absolute bottom-1 left-0 w-full h-3 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path
            d="M0,5 Q25,9 50,5 T100,5"
            fill="none"
            stroke="#FFDE59"
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

// Lista de parceiros com logos reais
const PARTNERS = [
  { 
    id: 1,
    name: 'Banco Central',
    icon: '🏦',
    width: 'w-32'
  },
  { 
    id: 2,
    name: 'Caixa Econômica',
    icon: '🏛️',
    width: 'w-36'
  },
  { 
    id: 3,
    name: 'Banco do Brasil',
    icon: '🌟',
    width: 'w-32'
  },
  { 
    id: 4,
    name: 'Febraban',
    icon: '📊',
    width: 'w-28'
  },
  { 
    id: 5,
    name: 'Serasa',
    icon: '📝',
    width: 'w-28'
  }
];

// Lista de benefícios refinados
const BENEFITS = [
  { id: 1, text: 'Aprovação em minutos', icon: 'clock' },
  { id: 2, text: 'Sem consulta ao SPC/Serasa', icon: 'shield' },
  { id: 3, text: 'Dinheiro na conta em 24h', icon: 'money' },
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
            className="mb-10"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium text-sm border border-blue-200/50 shadow-sm">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Crédito confiável e rápido
            </span>
          </motion.div>
          
          {/* Tipografia moderna e refinada */}
          <div className="space-y-6 mb-12">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-800 leading-tight"
            >
              A <MarkedText>melhor solução</MarkedText> de crédito para <SpotlightBadge>brasileiros</SpotlightBadge>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Empréstimos simples, rápidos e sem burocracia. Receba o dinheiro na sua conta 
              em até 24h, mesmo para quem está negativado.
            </motion.p>
          </div>
          
          {/* Lista de benefícios aprimorada */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12"
          >
            {BENEFITS.map((benefit) => (
              <div key={benefit.id} className="flex items-center">
                {benefit.icon === 'clock' && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 mr-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
                {benefit.icon === 'shield' && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 mr-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 3L4 7V11C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 11V7L12 3Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
                {benefit.icon === 'money' && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 8H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M2 16H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
                <span className="text-slate-700">{benefit.text}</span>
              </div>
            ))}
          </motion.div>
          
          {/* Botões CTA com interações aprimoradas */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              className="relative group bg-blue-600 hover:bg-blue-700 text-white h-14 px-6 sm:px-8 text-base font-medium rounded-xl overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                <BanknoteIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
                <span>Empréstimo FGTS</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 group-active:opacity-90 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:bg-blue-400 transition-transform origin-left duration-300"></span>
            </Button>
            
            <Button 
              className="relative group bg-blue-600 hover:bg-blue-700 text-white h-14 px-6 sm:px-8 text-base font-medium rounded-xl overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                <Zap className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
                <span>Empréstimo na Conta de Luz</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 group-active:opacity-90 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:bg-blue-400 transition-transform origin-left duration-300"></span>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Indicador de confiança */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-slate-600 font-medium mb-8">
            <span className="inline-block border-b border-slate-200 pb-2">Instituições que confiam em nossos serviços</span>
          </p>
          
          {/* Logos de parceiros */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-2">
            {PARTNERS.map((partner) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + partner.id * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
                className={`${partner.width} h-16 bg-white rounded-lg border border-slate-200 shadow-sm flex items-center justify-center px-4 py-2 transition-all duration-300`}
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-2">{partner.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{partner.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animação do marcador */}
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
      `}</style>
    </section>
  );
};

export default HomeHero;