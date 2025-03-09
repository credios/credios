"use client";
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BanknoteIcon, Zap } from 'lucide-react';

const HomeHero: React.FC = () => {
  const solutionRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    // Animation for the solution highlight
    if (solutionRef.current) {
      setTimeout(() => {
        solutionRef.current?.classList.add('animate-highlight');
      }, 300);
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24">
      {/* Grid Background Pattern - more subtle */}
      <div 
        className="absolute inset-0 opacity-3" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #e0e7ff 1px, transparent 1px), 
                           linear-gradient(to bottom, #e0e7ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-14">
          {/* Main Heading - Fixed typography to prevent overlap */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-2 leading-tight">
            A <span 
                ref={solutionRef}
                className="text-blue-600 transition-all duration-700" 
              >melhor solução</span> de crédito
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            para <span className="bg-blue-100 px-3 py-1 rounded-md inline-block">brasileiros</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empréstimos simples, rápidos e sem burocracia. Receba o dinheiro na sua conta 
            em até 24h, mesmo para quem está negativado.
          </p>
          
          {/* CTA Buttons - Both with visible colors and better spacing */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <BanknoteIcon className="mr-2 h-5 w-5" />
              Empréstimo FGTS
            </Button>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Zap className="mr-2 h-5 w-5" />
              Empréstimo na Conta de Luz
            </Button>
          </div>
        </div>
        
        {/* Trust Indicator Text */}
        <div className="text-center mb-10">
          <p className="text-gray-700 font-medium">
            A solução de crédito escolhida por milhares de brasileiros
          </p>
        </div>
        
        {/* Logo placeholders - now proper image placeholders */}
        <div className="flex flex-wrap justify-center items-center gap-8 px-4">
          {/* These will be replaced with actual images */}
          <div className="h-12 w-32 bg-gray-50 rounded-md flex items-center justify-center border border-gray-100"></div>
          <div className="h-12 w-32 bg-gray-50 rounded-md flex items-center justify-center border border-gray-100"></div>
          <div className="h-12 w-32 bg-gray-50 rounded-md flex items-center justify-center border border-gray-100"></div>
          <div className="h-12 w-32 bg-gray-50 rounded-md flex items-center justify-center border border-gray-100"></div>
          <div className="h-12 w-32 bg-gray-50 rounded-md flex items-center justify-center border border-gray-100"></div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes highlightAnimation {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-highlight {
          background: linear-gradient(90deg, #4f46e5 0%, #3b82f6 50%, #4f46e5 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: highlightAnimation 3s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default HomeHero;