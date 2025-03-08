"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Definição da interface para os testimonials
interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

// Dados de exemplo para os depoimentos
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    location: "Rio de Janeiro, RJ",
    avatar: "/images/testimonials/avatar1.jpg",
    rating: 5,
    text: "Foi tudo muito rápido! Precisava de dinheiro com urgência e consegui o empréstimo na conta de luz no mesmo dia. O atendimento foi excelente e as parcelas cabem no meu orçamento.",
    service: "Empréstimo na Conta de Luz",
    date: "15 de fevereiro de 2025",
  },
  {
    id: 2,
    name: "João Pereira",
    location: "Salvador, BA",
    avatar: "/images/testimonials/avatar2.jpg",
    rating: 5,
    text: "Super recomendo! Processo totalmente digital, fiz tudo pelo celular e o dinheiro caiu na minha conta em menos de 24 horas. A Credios realmente facilita nossa vida.",
    service: "Empréstimo na Conta de Luz",
    date: "3 de março de 2025",
  },
  {
    id: 3,
    name: "Ana Costa",
    location: "São Paulo, SP",
    avatar: "/images/testimonials/avatar3.jpg",
    rating: 5,
    text: "Estava com nome negativado e achei que não conseguiria crédito em lugar nenhum. A Credios foi a única que me deu essa oportunidade. Muito satisfeita com o serviço!",
    service: "Empréstimo na Conta de Luz",
    date: "22 de janeiro de 2025",
  },
  {
    id: 4,
    name: "Carlos Mendes",
    location: "Fortaleza, CE",
    avatar: "/images/testimonials/avatar4.jpg",
    rating: 5,
    text: "Atendimento excelente! Tive todas as minhas dúvidas esclarecidas antes de contratar. As condições são muito claras e não tive nenhuma surpresa nas parcelas.",
    service: "Empréstimo na Conta de Luz",
    date: "10 de março de 2025",
  },
  {
    id: 5,
    name: "Luiza Martins",
    location: "Recife, PE",
    avatar: "/images/testimonials/avatar5.jpg",
    rating: 5,
    text: "Já é a segunda vez que utilizo os serviços da Credios e continuo impressionada com a eficiência. Processo simples, rápido e sem burocracia. Nota 10!",
    service: "Empréstimo na Conta de Luz",
    date: "5 de fevereiro de 2025",
  },
  {
    id: 6,
    name: "Roberto Almeida",
    location: "Goiânia, GO",
    avatar: "/images/testimonials/avatar6.jpg",
    rating: 5,
    text: "Precisei de um valor para uma emergência médica e a Credios me salvou. Em poucas horas eu já estava com o dinheiro disponível. Muito obrigado pela agilidade!",
    service: "Empréstimo na Conta de Luz",
    date: "28 de fevereiro de 2025",
  },
];

// Componente para exibir as estrelas da avaliação
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Componente para exibir um único depoimento
const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  isActive: boolean;
}> = ({ testimonial, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl shadow-lg p-6 flex flex-col h-full transform transition-transform ${
        isActive ? "scale-105 shadow-xl z-10" : "scale-100 opacity-90"
      }`}
    >
      <div className="flex items-start mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-100">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
          <div className="mt-1">
            <RatingStars rating={testimonial.rating} />
          </div>
        </div>
        <Quote className="h-8 w-8 text-blue-100 flex-shrink-0" />
      </div>

      <div className="flex-1">
        <p className="text-gray-700 italic leading-relaxed">{testimonial.text}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm font-medium text-blue-600">
          {testimonial.service}
        </span>
        <span className="text-xs text-gray-500">{testimonial.date}</span>
      </div>
    </motion.div>
  );
};

const Testemunhos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const itemsPerView = 3; // Número de itens visíveis por vez

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Função para voltar para o slide anterior
  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  // Configuração de autoplay para o carrossel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, activeIndex]);

  // Pausa o autoplay quando o mouse está sobre o carrossel
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  // Retoma o autoplay quando o mouse deixa o carrossel
  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Função para verificar se um índice está visível no slide atual
  const isVisibleIndex = (index: number) => {
    // Calcula índices visíveis considerando o wrapping
    const visibleIndices = Array.from({ length: itemsPerView }, (_, i) => {
      return (activeIndex + i) % TESTIMONIALS.length;
    });
    return visibleIndices.includes(index);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Elementos decorativos de background */}
        <div className="absolute top-10 right-20 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-orange-100 rounded-full opacity-30 blur-3xl -z-10"></div>

        {/* Cabeçalho da seção */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
          >
            Empréstimo na Conta de Luz é com a Credios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Veja o que falam nossos clientes
          </motion.p>
        </div>

        {/* Carrossel de depoimentos */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Botões de navegação */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
            aria-label="Ver depoimento anterior"
          >
            <ChevronLeft className="h-6 w-6 text-blue-500" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
            aria-label="Ver próximo depoimento"
          >
            <ChevronRight className="h-6 w-6 text-blue-500" />
          </button>

          {/* Slider container com efeito de máscara de opacidade nas bordas */}
          <div className="relative mx-16">
            {/* Gradientes de fade nas laterais */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

            {/* Grade de depoimentos */}
            <div className="grid grid-cols-3 gap-6 transition-all duration-500">
              <AnimatePresence mode="wait">
                {TESTIMONIALS.map((testimonial, index) => (
                  isVisibleIndex(index) && (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                      isActive={index === activeIndex}
                    />
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Indicadores de slide (dots) */}
          <div className="flex justify-center mt-10">
            {Array.from({ length: TESTIMONIALS.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 mx-1 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-blue-500 w-5"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA abaixo dos depoimentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Junte-se a milhares de clientes satisfeitos e solicite seu empréstimo
            hoje mesmo.
          </p>
          <a
            href="/simulador"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-8 rounded-md shadow-md hover:shadow-lg transition-all"
          >
            Simular meu empréstimo
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testemunhos;