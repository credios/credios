// components/blog/hero-section.tsx
'use client';

import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BlogHeroSection() {
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
  
  // Floating animation for background elements
  const floatingAnimation = {
    y: [0, 15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: 'easeInOut'
    }
  };
  
  // Update mouse position when mouse moves
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative rounded-3xl overflow-hidden mb-12 sm:mb-16"
      style={{ background: 'linear-gradient(125deg, #2563eb, #3b82f6, #60a5fa, #93c5fd, #60a5fa, #3b82f6)' }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-500/70 to-blue-400/60"
             style={{ backgroundSize: '400% 400%', animation: 'gradientAnimation 15s ease infinite' }}/>
      </div>
      
      {/* Moving dot pattern */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          x: backgroundX,
          y: backgroundY
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Floating circles with parallax effect */}
        <motion.div 
          className="absolute top-[-50px] right-[10%] w-64 h-64 rounded-full bg-blue-300/30 blur-md"
          animate={floatingAnimation}
          style={{ x: circle1X, y: circle1Y }}
        />
        <motion.div 
          className="absolute bottom-[-80px] left-[10%] w-96 h-96 rounded-full bg-orange-200/30 blur-md"
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
          className="absolute top-[20%] right-[20%] w-4 h-4 rounded-full bg-orange-300/50"
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
      
      {/* Main content */}
      <div className="relative z-10 pt-12 pb-16 sm:pt-16 sm:pb-20 px-6 sm:px-12 md:px-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge with vibrant background */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-blue-700 font-medium mb-6 shadow-md">
            <Sparkles size={16} className="text-blue-600" />
            <span>Conteúdo atualizado semanalmente</span>
          </div>
          
          {/* Title with shadow for better readability */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-md leading-none px-4">
            Blog da Credios
          </h1>
          
          {/* Subtitle with better contrast */}
          <p className="text-lg sm:text-xl font-medium text-white/90 max-w-2xl mx-auto mb-10 drop-shadow">
            Dicas e orientações para melhorar sua vida financeira
            e conseguir o empréstimo ideal para suas necessidades
          </p>
          
          <motion.div 
            className="max-w-md mx-auto relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {/* Search field with glass effect */}
            <div className="flex items-center overflow-hidden rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg transition-all hover:shadow-xl hover:bg-white/90">
              <Search className="absolute left-4 text-blue-500" size={18} />
              <Input 
                placeholder="O que você está procurando?" 
                className="pl-12 pr-4 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base"
              />
            </div>
          </motion.div>
        </motion.div>
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
}