"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  BanknoteIcon, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Star,
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';

// Enhanced floating elements component with improved visuals and tech aesthetic
const FloatingElements = () => {
  // Definir gradientes e formas
  const gradients = [
    'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(147, 197, 253, 0.15))',
    'linear-gradient(45deg, rgba(224, 93, 0, 0.07), rgba(251, 146, 60, 0.07))',
    'linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(110, 231, 183, 0.05))',
    'linear-gradient(45deg, rgba(79, 70, 229, 0.1), rgba(165, 180, 252, 0.1))',
    'linear-gradient(45deg, rgba(6, 182, 212, 0.08), rgba(125, 211, 252, 0.08))',
  ];
  
  // Definir o tipo de elemento para tipar corretamente
  interface FloatingElement {
    width: string;
    height: string;
    left: string;
    top: string;
    filter: string;
    background: string;
    zIndex: number;
    opacity: number;
    transform: string;
    borderRadius: string;
  }
  
  // Use useState com valores fixos para SSR
  const [elements, setElements] = useState<FloatingElement[]>(() => {
    // Retornar posições fixas para SSR
    return [
      {
        width: "100px",
        height: "80px",
        left: "70%",
        top: "40%",
        filter: "blur(40px)",
        background: gradients[0],
        zIndex: 0,
        opacity: 0.15,
        transform: "translateX(0px) translateY(0px) scale(1) rotate(0deg)",
        borderRadius: "100%"
      },
      {
        width: "80px",
        height: "180px",
        left: "40%",
        top: "60%",
        filter: "blur(40px)",
        background: gradients[1],
        zIndex: 0,
        opacity: 0.12,
        transform: "translateX(0px) translateY(0px) scale(1) rotate(0deg)",
        borderRadius: "12px"
      },
      {
        width: "120px",
        height: "100px",
        left: "20%",
        top: "30%",
        filter: "blur(40px)",
        background: gradients[2],
        zIndex: 0,
        opacity: 0.18,
        transform: "translateX(0px) translateY(0px) scale(1) rotate(0deg)",
        borderRadius: "24px"
      },
      {
        width: "90px",
        height: "90px",
        left: "60%",
        top: "70%",
        filter: "blur(40px)",
        background: gradients[3],
        zIndex: 0,
        opacity: 0.2,
        transform: "translateX(0px) translateY(0px) scale(1) rotate(0deg)",
        borderRadius: "4px"
      },
      {
        width: "150px",
        height: "100px",
        left: "30%",
        top: "50%",
        filter: "blur(40px)",
        background: gradients[4],
        zIndex: 0,
        opacity: 0.25,
        transform: "translateX(0px) translateY(0px) scale(1) rotate(0deg)",
        borderRadius: "100%"
      },
    ];
  });
  
  // Gera novos valores aleatórios apenas no cliente após a hidratação
  useEffect(() => {
    // Função para gerar valores aleatórios
    const generateRandomElements = (): FloatingElement[] => {
      return Array(8).fill(null).map((_, i) => {
        const borderRadiusTypes = ["100%", "12px", "24px", "4px"];
        const borderRadius = borderRadiusTypes[i % borderRadiusTypes.length];
        
        return {
          width: `${Math.random() * 150 + 50}px`,
          height: `${Math.random() * 150 + 50}px`,
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`,
          filter: 'blur(40px)',
          background: gradients[i % gradients.length],
          zIndex: 0,
          opacity: Math.random() * 0.3 + 0.1,
          transform: `translateX(${Math.random() * 50 - 25}px) translateY(${Math.random() * 50 - 25}px) scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 30}deg)`,
          borderRadius
        };
      });
    };
    
    // Atualiza os elementos com valores aleatórios no cliente
    setElements(generateRandomElements());
  }, [gradients]);

  return (
    <>
      {elements.map((style, index) => (
        <motion.div
          key={`floating-element-${index}`}
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        >
          <div
            className={`absolute opacity-80`}
            style={{
              ...style,
              borderRadius: style.borderRadius
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

// Enhanced MarkedText with white text
const MarkedText = ({ children }: { children: React.ReactNode }) => {
  const [startAnimation, setStartAnimation] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <span className="relative inline-flex flex-col">
      {/* Changed to white text as requested */}
      <span className="relative z-10 font-extrabold text-white">{children}</span>
      
      {/* Refined underline with better positioning */}
      <div className="absolute bottom-0 left-0 w-full h-3 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path
            d="M0,5 Q25,9 50,5 T100,5"
            fill="none"
            stroke="#E05D00"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="110"
            strokeDashoffset={startAnimation ? "0" : "110"}
            className="transition-all duration-1000 ease-out"
            style={{ opacity: startAnimation ? 1 : 0 }}
          />
        </svg>
      </div>
    </span>
  );
};

// Enhanced Spotlight Badge with orange colors
const SpotlightBadge = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className="relative inline-flex items-center justify-center font-extrabold"
    style={{ marginBottom: '0.125rem', marginTop: '0.125rem' }}
  >
    {/* Text content with proper z-index */}
    <span className="relative z-20 px-4 py-1 text-orange-900">{children}</span>
    
    {/* Base background with gradient */}
    <span className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-50 rounded-lg border border-orange-200/50 shadow-lg z-10"></span>
    
    {/* Pulse effect with contained animation */}
    <motion.span
      className="absolute inset-0 rounded-lg z-0 overflow-hidden"
      animate={{
        boxShadow: [
          "0 0 0 0px rgba(234, 88, 12, 0)",
          "0 0 0 8px rgba(234, 88, 12, 0.1)",
          "0 0 0 0px rgba(234, 88, 12, 0)"
        ]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop"
      }}
    />
  </motion.span>
);

// Completely redesigned testimonial carousel with stunning visuals
const TestimonialCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Carlos S.",
      location: "São Paulo",
      text: "Incrível! Em apenas 30 minutos o dinheiro caiu na minha conta. Resolveu minha emergência quando mais precisei!",
      rating: 5
    },
    {
      id: 2,
      name: "Fernanda L.",
      location: "Rio de Janeiro",
      text: "Nome negativado e consegui empréstimo na hora! Processo super rápido e sem burocracia. Recomendo demais!",
      rating: 5
    },
    {
      id: 3,
      name: "Paulo M.",
      location: "Belo Horizonte",
      text: "Tentei em 3 bancos e negaram. Na Credios foi aprovado em minutos! Atendimento nota 10!",
      rating: 5
    },
    {
      id: 4,
      name: "Roberta K.",
      location: "Salvador",
      text: "Empréstimo na conta de luz salvou meu mês. Simples, rápido e as parcelas cabem perfeitamente no meu orçamento.",
      rating: 5
    },
    {
      id: 5,
      name: "Marcelo T.",
      location: "Brasília",
      text: "Do cadastro ao dinheiro na conta foram só 45 minutos! Experiência incrível e sem complicação.",
      rating: 5
    }
  ];

  useEffect(() => {
    // Only auto-advance when not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentTestimonialIndex((prev) => 
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  // For mobile, use automatic scrolling approach
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="w-full overflow-hidden px-4 py-6">
        <div 
          className="testimonial-carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={carouselRef}
        >
          <div 
            className={`testimonial-track flex ${isHovered ? 'pause-animation' : 'animate-testimonial-scroll'}`}
          >
            {/* First copy of testimonials */}
            {testimonials.map((testimonial) => (
              <div 
                key={`t1-${testimonial.id}`} 
                className="testimonial-slide flex-shrink-0 mx-4 w-80 bg-gradient-to-br from-white to-orange-50 rounded-xl border border-orange-100 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 relative overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100/50 rounded-full -translate-y-10 translate-x-10 z-0"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-100/30 rounded-full translate-y-8 -translate-x-8 z-0"></div>
                
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-orange-200 opacity-50">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                
                <div className="flex items-center mb-3 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 font-medium italic mb-4 relative z-10">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-auto relative z-10">
                  <p className="font-bold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
            
            {/* Second copy for infinite animation */}
            {testimonials.map((testimonial) => (
              <div 
                key={`t2-${testimonial.id}`} 
                className="testimonial-slide flex-shrink-0 mx-4 w-80 bg-gradient-to-br from-white to-orange-50 rounded-xl border border-orange-100 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 relative overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100/50 rounded-full -translate-y-10 translate-x-10 z-0"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-100/30 rounded-full translate-y-8 -translate-x-8 z-0"></div>
                
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-orange-200 opacity-50">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                
                <div className="flex items-center mb-3 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 font-medium italic mb-4 relative z-10">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-auto relative z-10">
                  <p className="font-bold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Enhanced desktop version 
  return (
    <div className="w-full py-6">
      <div className="max-w-xl mx-auto relative">
        {/* Background pattern */}
        <div className="absolute inset-0 -m-10 bg-orange-50/50 rounded-3xl -z-10 transform rotate-3"></div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonialIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white to-orange-50 rounded-xl border border-orange-100 shadow-lg p-8 flex flex-col relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/30 rounded-full -translate-y-16 translate-x-16 z-0"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-100/20 rounded-full translate-y-12 -translate-x-12 z-0"></div>
            
            {/* Quote icon */}
            <div className="absolute top-6 right-6 text-orange-200">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
            </div>
            
            <div className="flex items-center mb-3 relative z-10">
              {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current text-amber-400" />
              ))}
            </div>
            
            <p className="text-slate-700 text-lg font-medium italic mb-6 relative z-10">
              &ldquo;{testimonials[currentTestimonialIndex].text}&rdquo;
            </p>
            
            <div className="mt-auto relative z-10 border-t border-orange-100 pt-4 flex items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 mr-4">
                <span className="font-bold text-lg">{testimonials[currentTestimonialIndex].name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-bold text-slate-800">{testimonials[currentTestimonialIndex].name}</p>
                <p className="text-sm text-slate-500">{testimonials[currentTestimonialIndex].location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots - improved spacing and interaction */}
        <div className="flex justify-center mt-6 space-x-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonialIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                index === currentTestimonialIndex ? 'bg-orange-500 shadow-md' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Trust Stats with orange color scheme
const TrustStatsCard = ({ 
  number, 
  text, 
  icon: Icon, 
  delay = 0 
}: { 
  number: string;
  text: string;
  icon: React.ElementType;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        delay: delay,
        duration: 0.5 
      }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 15px 30px -10px rgba(234, 88, 12, 0.15)",
        scale: 1.02
      }}
      className="bg-white rounded-lg border border-orange-100 shadow-md p-6 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
    >
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 -translate-x-16 -translate-y-16 bg-orange-50 rounded-full opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-12 translate-y-12 bg-orange-50 rounded-full opacity-40"></div>
      
      {/* Icon with animation */}
      <motion.div 
        className="relative z-10 mb-3"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring" }}
      >
        <motion.div 
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-full border border-orange-200/50 shadow-inner"
          whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-7 w-7 text-orange-600" />
        </motion.div>
      </motion.div>
      
      {/* Number with counter effect */}
      <motion.p 
        className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mb-2 relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.3 }}
      >
        {number}
      </motion.p>
      
      <motion.p 
        className="text-slate-600 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4 }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

// Enhanced features with orange color scheme
const FeatureItem = ({ 
  icon: Icon, 
  text 
}: { 
  icon: React.ElementType;
  text: string;
}) => (
  <motion.div 
    className="flex items-center flex-col sm:flex-row bg-white rounded-lg shadow-md py-4 px-4 sm:py-3 sm:px-6 border border-orange-100 cursor-pointer"
    whileHover={{ y: -3, boxShadow: "0 8px 20px -4px rgba(234, 88, 12, 0.15)" }}
    whileTap={{ y: -1, boxShadow: "0 4px 8px -2px rgba(234, 88, 12, 0.1)" }}
    transition={{ type: "spring", stiffness: 500, damping: 15 }}
  >
    <motion.div 
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600 mb-2 sm:mb-0 sm:mr-4 border border-orange-200/30 shadow-inner"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 700, damping: 15 }}
    >
      <Icon className="w-5 h-5" />
    </motion.div>
    <span className="text-slate-700 text-center sm:text-left font-medium">{text}</span>
  </motion.div>
);

// Enhanced CTA Button with more obvious hover effects
const CtaButton = ({ 
  icon: Icon, 
  children, 
  primary = false 
}: { 
  icon: React.ElementType;
  children: React.ReactNode;
  primary?: boolean;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className="w-full sm:w-auto"
    >
      <Button 
        className={`relative group ${
          primary 
            ? "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600" 
            : "bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
        } ${primary ? 'text-white' : 'text-orange-600'} h-14 sm:h-16 px-6 sm:px-10 text-base sm:text-lg font-medium rounded-xl overflow-hidden transition-all duration-300 shadow-lg w-full sm:w-auto cursor-pointer hover:shadow-xl`}
      >
        <span className={`relative z-10 flex items-center`}>
          <Icon className={`mr-3 h-5 w-5 transition-transform group-hover:translate-x-1 duration-300`} />
          <span>{children}</span>
        </span>
        
        {/* Enhanced effects with more obvious hover interaction */}
        {primary ? (
          <>
            {/* Primary button shine effect */}
            <span className="absolute top-0 right-0 h-full w-16 transform translate-x-16 bg-gradient-to-l from-orange-700/0 via-white/20 to-white/0 skew-x-30 transition-transform group-hover:translate-x-0 duration-700"></span>
            {/* Click ripple effect */}
            <span className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/5 group-active:bg-white/10 transition-colors duration-200"></span>
            {/* Bottom highlight on hover */}
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </>
        ) : (
          <>
            {/* Secondary button effects */}
            <span className="absolute inset-0 w-full h-full bg-orange-500/0 group-hover:bg-orange-500/5 group-active:bg-orange-500/10 transition-colors duration-200"></span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            <span className="absolute top-0 right-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300"></span>
          </>
        )}
      </Button>
    </motion.div>
  );
};

// Updated hero section with more impactful copy and the word "empréstimo" in H1
const HomeHero = () => {
  // Ref for scroll animations
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Enhanced parallax effects
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Trust stats with icons - updated data
  const trustStats = [
    { id: 1, number: "R$ 50 milhões", text: "em empréstimos liberados", icon: BanknoteIcon },
    { id: 2, number: "15k+", text: "brasileiros transformados", icon: Users },
    { id: 3, number: "2h", text: "máximo para receber", icon: Clock },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/10 to-slate-50 py-20 md:py-32 cursor-default"
    >
      {/* Enhanced background effects with parallax */}
      <motion.div 
        className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" 
        style={{ opacity: bgOpacity, y: bgY }}
      />
      
      {/* Refined floating elements with better visuals */}
      <FloatingElements />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          style={{ y: titleY }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          {/* Enhanced category badge */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 font-medium text-sm border border-orange-200/50 shadow-sm">
              <ShieldCheck className="w-4 h-4 mr-2" />
              <span>Dinheiro sem burocracia</span>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-2 flex"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </motion.span>
            </span>
          </motion.div>
          
          {/* Enhanced typography with better visual hierarchy and updated copy */}
          <div className="space-y-6 mb-12">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-800 leading-tight"
            >
              O <MarkedText>empréstimo rápido</MarkedText> que acredita em <SpotlightBadge>você</SpotlightBadge>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Desbloqueie o crédito que você merece <span className="font-semibold text-orange-800">mesmo com nome negativado</span>. 
              Processo 100% digital, aprovação em minutos e dinheiro na conta em até 2 horas!
            </motion.p>
          </div>
          
          {/* Enhanced features with better visual treatment and updated copy */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12 max-w-3xl mx-auto"
          >
            <FeatureItem 
              icon={Clock} 
              text="Resposta em até 5 minutos" 
            />
            <FeatureItem 
              icon={CheckCircle} 
              text="Sem consulta ao SPC/Serasa" 
            />
            <FeatureItem 
              icon={BanknoteIcon} 
              text="Dinheiro na conta em 2h" 
            />
          </motion.div>
          
          {/* Enhanced CTA buttons with better mobile presentation */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
          >
            <CtaButton icon={BanknoteIcon} primary>
              Simular Empréstimo FGTS
            </CtaButton>
            
            <CtaButton icon={Zap}>
              Crédito na Conta de Luz
            </CtaButton>
          </motion.div>

          {/* Small extra prompt for engagement with updated copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="max-w-sm mx-auto bg-orange-50 rounded-lg border border-orange-100 p-3 flex items-center"
          >
            <span className="flex-1 text-sm text-orange-700 font-medium">
              Aprovação em minutos, sem complicações!
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="h-4 w-4 text-orange-700" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced trust and authority section with updated copy */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Por que milhares de brasileiros escolhem a Credios</h2>
          
          {/* Enhanced trust stats with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {trustStats.map((stat, index) => (
              <TrustStatsCard
                key={stat.id}
                number={stat.number}
                text={stat.text}
                icon={stat.icon}
                delay={0.1 + index * 0.2}
              />
            ))}
          </div>
          
          {/* Enhanced testimonial carousel */}
          <TestimonialCarousel />
        </motion.div>
      </div>

      {/* Animations and styles */}
      <style jsx global>{`
        @keyframes testimonial-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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
        
        .pause-animation {
          animation-play-state: paused;
        }
        
        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239fa6b2' fill-opacity='0.1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* For the skewed highlight effect in primary CTA */
        .skew-x-30 {
          transform: skewX(-30deg);
        }

        /* Focus styles for accessibility */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #f97316;
          outline-offset: 2px;
        }

        /* Improved touch targets for mobile */
        @media (max-width: 640px) {
          button, 
          .testimonial-carousel-container {
            min-height: 44px;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeHero;