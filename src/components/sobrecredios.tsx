"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  CheckCircle, 
  Shield, 
  TrendingUp, 
  Users, 
  Banknote,
  ArrowRight
} from "lucide-react";

// Biblioteca para animação de contagem
import CountUp from "react-countup";

// Componentes shadcn/ui
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Definição das interfaces
interface MediaOutlet {
  name: string;
  logo: string;
  link: string;
  description: string;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Logos dos veículos de mídia onde a Credios apareceu
const MEDIA_OUTLETS: MediaOutlet[] = [
  {
    name: "Valor Econômico",
    logo: "/images/media/valor-economico.svg",
    link: "https://valor.globo.com/search/?q=credios",
    description: "Matéria sobre o crescimento da Credios no mercado de crédito",
  },
  {
    name: "Exame",
    logo: "/images/media/exame.svg",
    link: "https://exame.com/search/credios",
    description: "Entrevista com CEO sobre o futuro das fintechs no Brasil",
  },
  {
    name: "CNN Brasil",
    logo: "/images/media/cnn-brasil.svg",
    link: "https://www.cnnbrasil.com.br/search/?q=credios",
    description: "Reportagem sobre inclusão financeira e empréstimos digitais",
  },
  {
    name: "InfoMoney",
    logo: "/images/media/infomoney.svg",
    link: "https://www.infomoney.com.br/search/?q=credios",
    description: "Análise do modelo de negócios da Credios",
  },
  {
    name: "Estadão",
    logo: "/images/media/estadao.svg",
    link: "https://www.estadao.com.br/busca/credios",
    description: "Reportagem sobre o crescimento do setor de fintechs",
  },
];

// Funcionalidades/diferenciais da plataforma
const FEATURES: Feature[] = [
  {
    title: "Segurança garantida",
    description: "Criptografia de ponta a ponta e conformidade com as normas do Banco Central",
    icon: <Shield className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Aprovação rápida",
    description: "Análise de crédito instantânea com decisão em poucos minutos",
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Atendimento humanizado",
    description: "Suporte dedicado via WhatsApp para tirar todas as suas dúvidas",
    icon: <Users className="w-6 h-6 text-blue-500" />,
  },
];

// Componente de logo animado
const AnimatedLogo: React.FC<{ media: MediaOutlet }> = ({ media }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-4 h-20 flex items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
    >
      <Image
        src={media.logo}
        alt={media.name}
        width={120}
        height={40}
        className="object-contain max-h-12"
      />
      <div className="absolute inset-0 bg-blue-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xs font-medium text-center px-2">
          {media.description}
        </p>
      </div>
    </motion.div>
  );
};

// Componente de métrica com contador animado
const MetricCounter: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: React.ReactNode;
}> = ({ value, suffix = "", prefix = "", label, icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-3 bg-blue-100 p-3 rounded-full">
        {icon || <Banknote className="w-6 h-6 text-blue-600" />}
      </div>
      <div className="flex items-baseline">
        <span className="text-blue-600 text-lg mr-1">{prefix}</span>
        <span className="text-3xl font-bold text-gray-800">
          {isInView ? (
            <CountUp 
              end={value} 
              duration={2.5} 
              separator="." 
              decimal="," 
              decimals={suffix === "milhões" ? 0 : 0}
            />
          ) : "0"}
        </span>
        <span className="text-blue-600 text-lg ml-1">{suffix}</span>
      </div>
      <p className="text-gray-600 mt-1 max-w-[200px]">{label}</p>
    </motion.div>
  );
};

// Componente de recurso com ícone
const FeatureItem: React.FC<{ feature: Feature; delay: number }> = ({ feature, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-colors"
    >
      <div className="bg-blue-100 p-2 rounded-full mr-4">
        {feature.icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </motion.div>
  );
};

// Componente SobreCredios
const SobreCredios: React.FC = () => {
  const [activeTab, setActiveTab] = useState("sobre");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  
  // Animação para o mockup do celular
  const phoneVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        delay: 0.3
      }
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 -mt-20 -z-10">
          <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
            <defs>
              <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-blue-100" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
        </div>
        
        <div className="absolute bottom-0 left-0 -mb-20 -z-10">
          <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
            <defs>
              <pattern id="85737c0e-0916-41d7-917f-596dc7edfa28" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-blue-100" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa28)" />
          </svg>
        </div>
        
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
              Sobre Nós
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              O Que É a <span className="text-blue-600">Credios</span>?
            </h2>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna esquerda: Informações sobre a Credios */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Tabs defaultValue="sobre" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 bg-gray-100/80 grid grid-cols-3 p-1">
                <TabsTrigger 
                  value="sobre" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  Nossa Missão
                </TabsTrigger>
                <TabsTrigger 
                  value="como-funciona" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  Como Funciona
                </TabsTrigger>
                <TabsTrigger 
                  value="diferenciais" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  Diferenciais
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="sobre" className="text-gray-700 space-y-4">
                <p className="text-lg">
                  Somos uma plataforma digital de empréstimos. Nosso objetivo é 
                  <span className="font-semibold"> SIMPLIFICAR</span> a jornada do crédito pessoal. 
                  Conectamos você aos nossos bancos parceiros, 
                  <span className="text-orange-500 font-medium"> que são rigorosamente selecionados</span>, 
                  de forma rápida e com total segurança.
                </p>
                <p className="text-lg">
                  Depois, é só você escolher o empréstimo com as melhores condições e fazer a 
                  contratação direto do seu celular!
                </p>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <MetricCounter 
                    value={10000}
                    suffix="+"
                    label="Pessoas que já contrataram um empréstimo na plataforma da Credios"
                    icon={<Users className="w-6 h-6 text-blue-600" />}
                  />
                  <MetricCounter 
                    value={50}
                    prefix="R$ "
                    suffix=" milhões +"
                    label="Total em operações de crédito já aprovadas em nossa plataforma"
                    icon={<Banknote className="w-6 h-6 text-blue-600" />}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="como-funciona" className="space-y-6">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <span className="font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Simulação rápida</h3>
                      <p className="text-gray-600">
                        Faça sua simulação em menos de 2 minutos e veja as opções disponíveis para você.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <span className="font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Análise inteligente</h3>
                      <p className="text-gray-600">
                        Nossa tecnologia conecta você com os bancos mais adequados ao seu perfil.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <span className="font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Contratação digital</h3>
                      <p className="text-gray-600">
                        Todo o processo é 100% digital. Faça tudo pelo seu celular, sem burocracia.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <span className="font-bold text-blue-600">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Recebimento rápido</h3>
                      <p className="text-gray-600">
                        Após a aprovação, o dinheiro cai na sua conta em poucas horas.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="diferenciais" className="space-y-4">
                <div className="space-y-6">
                  {FEATURES.map((feature, index) => (
                    <FeatureItem 
                      key={feature.title} 
                      feature={feature} 
                      delay={index * 0.1}
                    />
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-6"
                  >
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white" 
                      size="lg"
                    >
                      Simular empréstimo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Coluna direita: Mockup do aplicativo */}
          <motion.div
            variants={phoneVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-80 h-auto">
              {/* Círculos decorativos */}
              <div className="absolute -top-20 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-xl z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-100 rounded-full opacity-50 blur-xl z-0"></div>
              
              {/* Efeito de brilho difuso azulado no fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/30 opacity-80 blur-3xl rounded-full transform scale-125 z-0"></div>
              
              {/* Imagem do mockup sem bordas */}
              <Image
                src="/images/app-mockup.png"
                alt="Aplicativo Credios"
                width={380}
                height={770}
                className="relative z-10"
                quality={100}
              />
              
              {/* Badge flutuante */}
              <div className="absolute -right-16 top-1/3 bg-white rounded-lg shadow-lg py-2 px-3 z-20 hidden lg:block">
                <div className="flex items-center">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Aprovação imediata</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Seção 'Credios na Mídia' */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold">
              A <span className="bg-blue-100 px-2 py-1 rounded text-blue-600">Credios</span> na Mídia
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Nossa missão de democratizar o acesso ao crédito tem sido reconhecida pelas principais 
              publicações financeiras do Brasil.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {MEDIA_OUTLETS.map((media) => (
              <AnimatedLogo key={media.name} media={media} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreCredios;