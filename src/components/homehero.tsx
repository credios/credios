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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const HomeHero: React.FC = () => {
  const { ref: heroRef, controls: heroControls } = useInView();
  const { ref: statsRef, controls: statsControls } = useInView(0.2);

  return (
    <header className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20" aria-labelledby="main-heading">
      {/* Professional gradient background with refined geometric pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        {/* Enhanced geometric pattern overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234273c7' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Enhanced lighting effects with stronger visibility */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/15 blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-400/15 blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
        
        {/* Additional accent lighting */}
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[80px]"></div>
        <div className="absolute bottom-1/4 right-1/5 w-[250px] h-[250px] rounded-full bg-blue-300/10 blur-[60px]"></div>
        
        {/* Subtle spotlight effect */}
        <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 radial-blue"></div>
        
        {/* Fine top border accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"></div>
        
        {/* Additional fine pattern overlay for texture */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={heroRef}
          variants={stagger}
          initial="hidden"
          animate={heroControls}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Refined Badge */}
          <motion.div variants={fadeInUp} className="inline-flex mb-5">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/10">
              <Clock size={14} className="text-blue-200" />
              <span>Crédito aprovado em minutos</span>
            </span>
          </motion.div>
          
          {/* SEO-optimized Main Headline */}
          <motion.h1 
            id="main-heading"
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.1]"
          >
            Empréstimo simplificado <span className="text-blue-100 font-normal">para todos os brasileiros</span>
          </motion.h1>
          
          {/* Refined Subheadline */}
          <motion.p 
            variants={fadeInUp}
            className="text-blue-100 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            A Credios é uma plataforma de crédito digital que conecta você às melhores opções de empréstimo, com processos 100% online e sem burocracia.
          </motion.p>
          
          {/* Clean, Distinctive Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            {/* Empréstimo na Conta de Luz Button */}
            <Button 
              asChild
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-12 px-6 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 group border border-orange-400"
            >
              <Link href="/emprestimo-na-conta-de-luz">
                <Zap className="mr-2 h-4 w-4 text-white" />
                <span>Empréstimo na Conta de Luz</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </Button>
            
            {/* Empréstimo FGTS Button */}
            <Button 
              asChild
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 px-6 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-500"
            >
              <Link href="/emprestimo-fgts">
                <BanknoteIcon className="mr-2 h-4 w-4 text-white" />
                <span>Empréstimo FGTS</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Compact, Meaningful Stats Row */}
        <motion.div
          ref={statsRef}
          variants={stagger}
          initial="hidden"
          animate={statsControls}
          className="grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <motion.div 
            variants={fadeInUp}
            className="p-4 text-center relative cursor-default"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-blue-200" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">10k+</h2>
            <p className="text-blue-200 text-sm">Clientes satisfeitos</p>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="p-4 text-center relative cursor-default"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-200" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">5 min</h2>
            <p className="text-blue-200 text-sm">Tempo de aprovação</p>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="p-4 text-center relative cursor-default"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-200" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">100%</h2>
            <p className="text-blue-200 text-sm">Digital e sem burocracia</p>
          </motion.div>
        </motion.div>
        
        {/* Trust Badges - Positioned below stats for better fold fit */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={heroControls}
          className="flex flex-wrap items-center justify-center gap-3 text-blue-100 mt-6"
        >
          <div className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm cursor-default">
            <ShieldCheck size={14} className="text-blue-200" />
            <span className="text-xs font-medium">Site 100% seguro</span>
          </div>
          <div className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm cursor-default">
            <Zap size={14} className="text-blue-200" />
            <span className="text-xs font-medium">Sem burocracia</span>
          </div>
        </motion.div>
      </div>
      
      {/* CSS for additional enhancements */}
      <style jsx>{`
        .radial-blue {
          background: radial-gradient(circle at center, rgba(96, 165, 250, 0.15) 0%, transparent 70%);
        }
        
        @media (max-width: 640px) {
          .radial-blue {
            background: radial-gradient(circle at center, rgba(96, 165, 250, 0.15) 0%, transparent 60%);
          }
        }
      `}</style>
    </header>
  );
};

export default HomeHero;