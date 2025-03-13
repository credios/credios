// components/blog/animated-card.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export default function AnimatedCard({ children, index, className = '' }: AnimatedCardProps) {
  // Variante para animação com cor de destaque
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      transition: { 
        delay: index * 0.1, 
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275] // Easing animado
      }
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      {children}
    </motion.div>
  );
}