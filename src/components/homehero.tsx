"use client";

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Clock, Zap, BanknoteIcon } from 'lucide-react';
import Link from 'next/link';

// Animation hook for viewport detection
const useInView = (threshold = 0.1) => {
  const controls = useAnimation();
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [controls, threshold]);

  return { ref, controls };
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HomeHero: React.FC = () => {
  const { ref: heroRef, controls: heroControls } = useInView();
  const { ref: statsRef, controls: statsControls } = useInView(0.2);

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Premium gradient background with subtle grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-800 overflow-hidden">
        {/* Subtle grid pattern overlay with glow */}
        <div 
          className="absolute inset-0 opacity-8" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            boxShadow: 'inset 0 0 100px rgba(255,255,255,0.05)'
          }}
        />
        
        {/* Radial dot pattern for texture */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Subtle ambient lighting effects */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-[120px] transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full bg-blue-400/10 blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
        
        {/* Subtle glowing spots */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-white/5 blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/5 w-32 h-32 rounded-full bg-white/5 blur-xl"></div>
        
        {/* Ultra-subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={heroRef}
          variants={stagger}
          initial="hidden"
          animate={heroControls}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Refined Badge */}
          <motion.div variants={fadeInUp} className="inline-flex mb-8">
            <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/10">
              <Clock size={14} className="text-blue-200" />
              <span>Crédito aprovado em minutos</span>
            </span>
          </motion.div>
          
          {/* Refined Typography for Main Headline */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1] font-sans"
          >
            Empréstimo simplificado <span className="text-blue-100 font-normal">para todos os brasileiros</span>
          </motion.h1>
          
          {/* Refined Subheadline */}
          <motion.p 
            variants={fadeInUp}
            className="text-blue-100 text-lg sm:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            A Credios é uma plataforma de crédito digital que conecta você às melhores opções de empréstimo, com processos 100% online e sem burocracia.
          </motion.p>
          
          {/* Clean, Distinctive Buttons (not boxes) */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
          >
            {/* Empréstimo na Conta de Luz Button */}
            <Button 
              asChild
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-14 px-8 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 group border border-orange-400"
            >
              <Link href="/emprestimo-conta-luz">
                <Zap className="mr-2 h-5 w-5 text-white" />
                <span>Empréstimo na Conta de Luz</span>
                <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </Button>
            
            {/* Empréstimo FGTS Button - Added the BanknoteIcon */}
            <Button 
              asChild
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-14 px-8 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-400"
            >
              <Link href="/emprestimo-fgts">
                <BanknoteIcon className="mr-2 h-5 w-5 text-white" />
                <span>Empréstimo FGTS</span>
                <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </Button>
          </motion.div>
          
          {/* Enhanced Trust Badges - Now in small boxes */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-6 text-blue-100 mb-20"
          >
            <div className="flex items-center gap-3 py-2 px-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <ShieldCheck size={16} className="text-blue-200" />
              <span className="text-sm font-medium">Site 100% seguro</span>
            </div>
            <div className="flex items-center gap-3 py-2 px-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <Zap size={16} className="text-blue-200" />
              <span className="text-sm font-medium">Sem burocracia</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Refined Statistics - Subtle with Proper Icon Contrast */}
        <motion.div
          ref={statsRef}
          variants={stagger}
          initial="hidden"
          animate={statsControls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <motion.div 
            variants={fadeInUp}
            className="relative group"
          >
            <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-8 text-center relative">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-blue-200" />
                </div>
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-2">10k+</h3>
              <p className="text-blue-200 font-medium">Clientes satisfeitos</p>
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="relative group"
          >
            <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-8 text-center relative">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-200" />
                </div>
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-2">5 min</h3>
              <p className="text-blue-200 font-medium">Tempo de aprovação</p>
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="relative group"
          >
            <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-8 text-center relative">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-200" />
                </div>
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
              <p className="text-blue-200 font-medium">Digital e sem burocracia</p>
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* CSS for additional animations */}
      <style jsx>{`
        @keyframes subtleFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .subtle-float {
          animation: subtleFloat 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HomeHero;