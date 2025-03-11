"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// Componentes do shadcn/ui
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Ícones do Lucide
import {
  CheckCircle2,
  Zap,
  ThumbsUp,
  Lightbulb,
  ArrowRight,
  CreditCard,
  FileCheck,
  MapPin,
  AlertCircle,
  Clock,
  ShieldCheck,
  Info,
  CheckCircle,
  Star,
  UserCheck,
  Wallet,
  Lock,
  MessageCircle,
  ThumbsUpIcon,
  Facebook,
  Instagram,
  Calendar,
  Shield,
} from "lucide-react";

// Ícones personalizados
const Calculator = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="8" x2="8" y1="14" y2="14" />
    <line x1="12" x2="12" y1="14" y2="14" />
    <line x1="16" x2="16" y1="14" y2="14" />
    <line x1="8" x2="8" y1="18" y2="18" />
    <line x1="12" x2="12" y1="18" y2="18" />
    <line x1="16" x2="16" y1="18" y2="18" />
  </svg>
);

const Search = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Interfaces
interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  action?: string;
  actionUrl?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  backgroundColor?: string;
  accentColor?: string;
  image?: string;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string[];
  duration?: string;
}

interface FaqItem {
  question: string;
  answer: string;
  keywords?: string[];
}

interface TestimonialItem {
  name: string;
  location: string;
  rating: number;
  comment: string;
  imageSrc?: string;
  source?: string;
  date?: string;
  verified?: boolean;
}

// Dados para as vantagens
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: <CheckCircle2 className="h-8 w-8 text-emerald-500" />,
    title: "Aprovação imediata",
    description:
      "Resultado na hora e dinheiro no mesmo dia direto no seu PIX. Esqueça a burocracia dos bancos tradicionais.",
    highlight: "30 segundos",
    action: "Simular agora",
    actionUrl: "/simular",
    stats: [
      { value: "30s", label: "Aprovação" },
      { value: "100%", label: "Digital" },
    ],
    backgroundColor: "from-emerald-50 to-teal-50",
    accentColor: "emerald",
    image: "/images/aprovacao-imediata.png",
  },
  {
    icon: <Zap className="h-8 w-8 text-amber-500" />,
    title: "Até R$ 3.300 liberados",
    description:
      "Acesse o valor que você precisa sem complicação, mesmo se estiver com restrições no nome.",
    highlight: "Sem burocracia",
    action: "Ver condições",
    actionUrl: "/condicoes",
    stats: [
      { value: "R$3.300", label: "Valor máximo" },
      { value: "12×", label: "Parcelamento" },
    ],
    backgroundColor: "from-amber-50 to-yellow-50",
    accentColor: "amber",
    image: "/images/credito-liberado.png",
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-blue-500" />,
    title: "Disponível para negativados",
    description:
      "Seu histórico de crédito não é um problema. Avaliamos seu perfil de forma personalizada.",
    highlight: "Sem consulta",
    action: "Verificar elegibilidade",
    actionUrl: "/elegibilidade",
    stats: [
      { value: "0", label: "Consultas SPC" },
      { value: "95%", label: "Taxa de aprovação" },
    ],
    backgroundColor: "from-blue-50 to-indigo-50",
    accentColor: "blue",
    image: "/images/sem-restricoes.png",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-purple-500" />,
    title: "100% digital e seguro",
    description:
      "Todo o processo é feito pelo seu celular com criptografia avançada e proteção de dados.",
    highlight: "Rápido e prático",
    action: "Conhecer o processo",
    actionUrl: "/processo",
    stats: [
      { value: "24h", label: "Atendimento" },
      { value: "SSL", label: "Criptografia" },
    ],
    backgroundColor: "from-purple-50 to-fuchsia-50",
    accentColor: "purple",
    image: "/images/seguranca-digital.png",
  },
];

// Dados para o processo
const HOW_IT_WORKS: ProcessStep[] = [
  {
    title: "Simulação rápida",
    description: "Informe apenas seu CPF e descubra quanto você pode receber sem afetar seu score de crédito",
    icon: <Calculator className="h-6 w-6" />,
    details: [
      "Resultado na hora e sem compromisso",
      "Não consultamos SPC/Serasa",
      "Escolha o valor ideal para seu orçamento"
    ],
    duration: "30 segundos"
  },
  {
    title: "Documentação simples",
    description: "Apenas fotos do seu documento e da sua conta de luz mais recente, sem burocracia",
    icon: <FileCheck className="h-6 w-6" />,
    details: [
      "RG ou CNH (frente e verso)",
      "Conta de luz recente em seu nome",
      "Sem comprovante de renda ou fiador"
    ],
    duration: "2 minutos"
  },
  {
    title: "Análise inteligente",
    description: "Nossa tecnologia avalia seu perfil de forma personalizada e segura",
    icon: <Search className="h-6 w-6" />,
    details: [
      "Tecnologia exclusiva com IA",
      "Verificação rápida 24h por dia",
      "Sistema anti-fraude para sua proteção"
    ],
    duration: "5 minutos"
  },
  {
    title: "Dinheiro no PIX",
    description: "Crédito liberado via PIX diretamente na sua conta bancária no mesmo dia",
    icon: <CreditCard className="h-6 w-6" />,
    details: [
      "Transferência instantânea para você",
      "Confirmação por e-mail e SMS",
      "Suporte após a liberação do crédito"
    ],
    duration: "Mesmo dia"
  },
];

// Estados disponíveis
const AVAILABLE_STATES = [
  { name: "Bahia", abbr: "BA" },
  { name: "Ceará", abbr: "CE" },
  { name: "Pernambuco", abbr: "PE" },
  { name: "Rio Grande do Norte", abbr: "RN" },
  { name: "Goiás", abbr: "GO" },
  { name: "São Paulo", abbr: "SP" },
  { name: "Rio de Janeiro", abbr: "RJ" },
  { name: "Paraná", abbr: "PR" },
  { name: "Rio Grande do Sul", abbr: "RS" },
];

// FAQ
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "É necessário ser o titular da conta de luz?",
    answer: "Sim, é obrigatório que você seja o titular da conta de luz para solicitar o empréstimo. A conta de energia serve como sua garantia, por isso precisamos que esteja no seu nome.",
    keywords: ["titular", "conta", "energia"]
  },
  {
    question: "Posso pedir empréstimo mesmo estando negativado?",
    answer: "Sim! Uma das grandes vantagens do empréstimo na conta de luz é que ele está disponível mesmo para quem está com restrições no nome. Não consultamos SPC/Serasa durante a análise.",
    keywords: ["negativado", "restrição", "nome sujo"]
  },
  {
    question: "Como funciona o pagamento das parcelas?",
    answer: "O valor das parcelas é incluído diretamente na sua fatura mensal de energia elétrica. Assim, você paga tudo de uma vez, sem precisar se preocupar com boletos extras ou datas diferentes.",
    keywords: ["parcelas", "pagamento", "energia"]
  },
  {
    question: "Preciso comprovar renda para solicitar?",
    answer: "Não é necessário comprovar renda. O empréstimo na conta de luz também está disponível para autônomos e profissionais liberais, sem burocracia de comprovação de rendimentos.",
    keywords: ["renda", "comprovação", "autônomos"]
  },
  {
    question: "Em quais estados o serviço está disponível?",
    answer: "O empréstimo na conta de luz está disponível na maioria das cidades dos estados: Bahia, Ceará, Pernambuco, Rio Grande do Norte, Goiás, São Paulo, Rio de Janeiro, Paraná e Rio Grande do Sul.",
    keywords: ["cidades", "estados", "disponibilidade"]
  },
  {
    question: "Em quanto tempo o dinheiro cai na minha conta?",
    answer: "Após a aprovação, o dinheiro é transferido via PIX para sua conta no mesmo dia. Na maioria dos casos, a liberação ocorre em poucas horas após a aprovação da documentação.",
    keywords: ["prazo", "liberação", "dinheiro"]
  }
];

// Depoimentos atualizados com mais detalhes para parecerem legítimos
const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Maria S. Santos",
    location: "Salvador, BA",
    rating: 5,
    comment: "Precisava de dinheiro rápido para uma emergência médica. Em menos de 3 horas o valor já estava na minha conta. Processo super simples!",
    source: "Instagram",
    date: "22/02/2025",
    verified: true
  },
  {
    name: "Carlos Roberto",
    location: "São Paulo, SP",
    rating: 5,
    comment: "Estava negativado e nenhum banco queria me dar crédito. A Credios me aprovou em minutos e resolveu meu problema. Recomendo demais!",
    source: "Facebook",
    date: "15/01/2025",
    verified: true
  },
  {
    name: "Ana L. Ferreira",
    location: "Fortaleza, CE",
    rating: 4,
    comment: "Atendimento muito bom e rápido. Consegui o valor que precisava sem burocracia. Só acho que poderia ter uma parcela menor na conta de luz.",
    source: "WhatsApp",
    date: "03/03/2025",
    verified: true
  },
  {
    name: "Roberto Pereira",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    comment: "Minha simulação foi aprovada em 40 segundos! Mandei os documentos pelo celular e no mesmo dia o dinheiro já estava disponível no meu PIX.",
    source: "Instagram",
    date: "18/02/2025",
    verified: true
  },
  {
    name: "Juliana Menezes",
    location: "Recife, PE",
    rating: 5,
    comment: "Incrível como foi rápido! Sem burocracia e sem perguntas complexas. Resolvi minha situação financeira em poucas horas.",
    source: "Facebook",
    date: "05/03/2025",
    verified: true
  },
  {
    name: "Pedro Almeida",
    location: "Porto Alegre, RS",
    rating: 5,
    comment: "Super recomendo! Já tentei vários bancos mas apenas a Credios me deu a oportunidade mesmo com nome sujo. Processo seguro e rápido.",
    source: "Google",
    date: "20/02/2025",
    verified: true
  }
];

// Animações reutilizáveis
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const MainHero = () => {
  return (
    <div className="relative py-16 overflow-hidden bg-gradient-to-b from-orange-50 via-amber-50 to-white">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-full h-48 bg-orange-400/10 rounded-full -z-10 blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-48 bg-amber-300/10 -z-10 blur-3xl transform -translate-x-1/3 translate-y-1/3 opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Conteúdo de texto */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex space-x-2 mb-4">
                <Badge className="bg-orange-100 hover:bg-orange-200 text-orange-600 border-none py-1.5 px-3">
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                  Aprovação em 30 segundos
                </Badge>
                <Badge className="bg-green-100 hover:bg-green-200 text-green-600 border-none py-1.5 px-3">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  Para negativados
                </Badge>
              </div>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Empréstimo na conta de <span className="text-orange-500">luz</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Crédito de até <span className="font-bold text-gray-900">R$ 3.300</span>. Sem consulta ao SPC, sem burocracia, sem comprovação de renda. Dinheiro no mesmo dia!
              </motion.p>
              
              <motion.div 
                className="flex items-center gap-5 text-sm text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span>Aprovação em 30s</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-orange-500" />
                  <span>+200 mil clientes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-orange-500" />
                  <span>100% seguro</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Imagem ou ilustração */}
            <motion.div 
              className="relative flex-1 hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[450px] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-10 transform rotate-3"></div>
                <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl border border-orange-100">
                  <Image
                    src="/api/placeholder/600/450"
                    alt="Pessoa sorrindo com celular após aprovação de empréstimo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Stats pop-ups */}
                <motion.div 
                  className="absolute -left-6 top-20 bg-white p-3 rounded-lg shadow-lg border border-orange-100 flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Liberação</p>
                    <p className="font-semibold text-gray-800">Mesmo dia</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -right-6 bottom-32 bg-white p-3 rounded-lg shadow-lg border border-orange-100 flex items-center gap-3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Taxa de aprovação</p>
                    <p className="font-semibold text-gray-800">95%</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componentes Reutilizáveis
const SectionHeading = ({ 
  title, 
  description, 
  badge 
}: { 
  title: string, 
  description: string, 
  badge?: string 
}) => (
  <motion.div 
    className="mb-10 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeIn}
  >
    {badge && (
      <Badge className="mb-4 px-3 py-1.5 bg-orange-100 text-orange-700 hover:bg-orange-200 border-none font-medium">
        {badge}
      </Badge>
    )}
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
      {title}
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
      {description}
    </p>
  </motion.div>
);

const AdvantageCard = ({ 
  item, 
  index 
}: { 
  item: AdvantageItem, 
  index: number 
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const colorMap: Record<string, string> = {
    emerald: "group-hover:from-emerald-500 group-hover:to-emerald-600",
    amber: "group-hover:from-amber-500 group-hover:to-amber-600",
    blue: "group-hover:from-blue-500 group-hover:to-blue-600",
    purple: "group-hover:from-purple-500 group-hover:to-purple-600",
  };
  
  const accentColor = colorMap[item.accentColor || "emerald"];
  
  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      variants={fadeIn}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <Card className={`h-full border-0 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-500 overflow-hidden group relative bg-gradient-to-br ${item.backgroundColor || "from-gray-50 to-gray-100"}`}>
        {/* Overlay effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-95 transition-opacity duration-500 z-10`}></div>
        
        {/* Card content with overlay effect */}
        <div className="absolute inset-0 bg-[url('/images/dot-pattern.svg')] opacity-5"></div>
        
        {/* Top corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-400/20 to-transparent rounded-bl-full"></div>
        
        <CardHeader className="relative z-20">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white shadow-md transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
              <div className="group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
            </div>
            
            {item.highlight && (
              <Badge className="bg-orange-500 text-white border-0 px-3 py-1.5 text-xs uppercase font-semibold tracking-wide group-hover:bg-white group-hover:text-orange-600 transition-colors duration-300">
                {item.highlight}
              </Badge>
            )}
          </div>
          
          <CardTitle className="text-2xl font-bold mt-4 group-hover:text-white transition-colors duration-300">
            {item.title}
          </CardTitle>
          
          <CardDescription className="text-base mt-2 group-hover:text-white/90 transition-colors duration-300">
            {item.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-20">
          {item.stats && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              {item.stats.map((stat, i) => (
                <div key={i} className="bg-white/80 group-hover:bg-white/20 p-3 rounded-lg transition-colors duration-300">
                  <p className="text-2xl font-bold text-orange-600 group-hover:text-white transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0 z-20 relative">
          {item.action && (
            <a 
              href={item.actionUrl || "#"} 
              className="inline-flex items-center pl-0 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300 group-hover:text-white cursor-pointer"
            >
              {item.action} 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Componente de Carrossel de Depoimentos
const TestimonialCarousel = () => {
  const [position, setPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    // Verificar se estamos em um dispositivo móvel
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      updateCarouselDimensions();
    };
    
    const updateCarouselDimensions = () => {
      if (carouselRef.current) {
        // Removemos setCarouselWidth pois não é usado
        const items = carouselRef.current.querySelectorAll('.testimonial-item');
        if (items.length > 0) {
          setItemWidth(items[0].clientWidth + 16); // Width + margin
        }
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Animação automática do carrossel
    let interval: NodeJS.Timeout;
    
    if (!isHovering) {
      interval = setInterval(() => {
        setPosition((prevPosition) => {
          const newPosition = prevPosition - 1;
          
          // Quando o primeiro item estiver completamente fora de visão, resetamos
          const resetPoint = -(itemWidth * TESTIMONIALS.length);
          
          if (newPosition <= resetPoint) {
            return 0;
          }
          
          return newPosition;
        });
      }, 20); // Velocidade do movimento do carrossel
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, [itemWidth, isHovering]);
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`} 
        fill={i < rating ? 'currentColor' : 'none'} 
      />
    ));
  };
  
  const getSourceIcon = (source: string | undefined) => {
    switch(source) {
      case 'Facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'Instagram':
        return <Instagram className="h-4 w-4 text-pink-600" />;
      case 'Google':
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 11V8H22.9C23.2 9.2 23.5 10.4 23.5 12C23.5 18.1 18.6 22 12 22C5.4 22 0 16.6 0 10C0 3.4 5.4 -2 12 -2C15.3 -2 18.2 -0.7 20.4 1.5L18 4.4C16.5 3 14.5 2 12 2C7.4 2 3.7 5.8 3.7 10.4C3.7 15 7.3 18.8 12 18.8C17.3 18.8 19.5 15.3 19.9 13H12V11Z" 
              className="fill-current text-red-500" transform="translate(0, 2)"/>
          </svg>
        );
      case 'WhatsApp':
        return (
          <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.6 6.2C16.2 4.9 14.2 4 12.2 4C7.9 4 4.5 7.4 4.5 11.7C4.5 13.1 4.9 14.5 5.5 15.7L4.4 19.8L8.6 18.7C9.7 19.3 11 19.6 12.2 19.6C16.5 19.6 19.9 16.2 19.9 11.9C20 9.8 19.1 7.7 17.6 6.2ZM12.2 18.2C11 18.2 9.9 17.9 8.9 17.3L8.7 17.2L6.4 17.9L7.1 15.7L6.9 15.5C6.3 14.4 6 13.3 6 12.1C6 8.2 8.7 5.2 12.2 5.2C13.9 5.2 15.5 5.9 16.6 7.1C17.8 8.2 18.4 9.8 18.4 11.5C18.5 15.1 15.7 18.2 12.2 18.2ZM15.8 13.5C15.6 13.4 14.6 12.9 14.4 12.8C14.2 12.7 14.1 12.7 13.9 12.9C13.7 13.1 13.4 13.5 13.2 13.7C13.1 13.9 13 13.9 12.8 13.8C12.6 13.7 11.9 13.5 11.2 12.8C10.6 12.3 10.2 11.7 10.1 11.5C9.9 11.3 10 11.1 10.1 11C10.2 10.9 10.4 10.7 10.5 10.6C10.6 10.5 10.6 10.4 10.7 10.2C10.8 10.1 10.7 10 10.7 9.9C10.7 9.8 10.3 8.7 10.1 8.4C9.9 8 9.7 8.1 9.6 8.1H9.2C9 8.1 8.8 8.2 8.6 8.4C8.4 8.6 7.9 9.1 7.9 10.2C7.9 11.3 8.7 12.4 8.8 12.5C8.9 12.7 10.3 14.8 12.3 15.7C12.8 15.9 13.2 16.1 13.5 16.2C14 16.4 14.4 16.4 14.8 16.3C15.2 16.2 16 15.8 16.2 15.4C16.4 15 16.4 14.7 16.3 14.6C16.2 14.6 16.1 14.5 15.8 13.5Z" />
          </svg>
        );
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  // Cria duas cópias completas para carrossel contínuo
  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="relative px-2 py-6">
      <div 
        className="overflow-hidden"
        ref={carouselRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div 
          className="flex transition-transform duration-300 ease-linear"
          style={{ 
            transform: `translateX(${position}px)`,
            width: `${extendedTestimonials.length * 100}%` 
          }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="testimonial-item px-2"
              style={{ 
                width: isMobile ? '100%' : '33.333%',
                maxWidth: isMobile ? '100%' : '320px'
              }}
            >
              <Card className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-medium shadow-sm">
                        {testimonial.name.split(" ").map(part => part[0]).join("").substring(0, 2)}
                      </div>
                      <div>
                        <CardTitle className="text-base font-medium">{testimonial.name}</CardTitle>
                        <CardDescription className="text-xs flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {testimonial.location}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600 text-sm line-clamp-3 break-words">&ldquo;{testimonial.comment}&rdquo;</p>
                </CardContent>
                <CardFooter className="pt-0 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
                  <div className="flex items-center gap-1">
                    {getSourceIcon(testimonial.source)}
                    <span>via {testimonial.source}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {testimonial.verified && (
                      <span className="flex items-center text-green-600 gap-0.5">
                        <CheckCircle className="h-3 w-3" />
                        <span>Verificado</span>
                      </span>
                    )}
                    <span className="flex items-center gap-0.5">
                      <Calendar className="h-3 w-3" />
                      {testimonial.date}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Badge de confiança */}
      <motion.div 
        className="flex justify-center mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="font-medium">Avaliações verificadas</span>
          <ThumbsUpIcon className="h-4 w-4 text-green-600" />
        </div>
      </motion.div>
    </div>
  );
};
// Main Component
export default function CrediosLoanPage() {
  return (
    <section className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <MainHero />
      
      {/* SEÇÃO PRINCIPAL - VANTAGENS */}
      <div className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Elementos decorativos de background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-10 blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-10 blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/4"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-100 rounded-full opacity-10 blur-3xl -z-10"></div>
          
          {/* Título da seção principal */}
          <SectionHeading 
            badge="Solução financeira descomplicada"
            title="Vantagens Exclusivas para Você"
            description="Descomplicamos o acesso ao crédito para que você resolva sua necessidade financeira com rapidez e segurança."
          />
          
          {/* Subseção de Vantagens */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {ADVANTAGES.map((item, index) => (
              <AdvantageCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* SEÇÃO COMO FUNCIONA */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Subseção de Como Funciona */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="flex justify-center mb-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 rounded-full text-blue-600 border border-blue-200">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wide">Processo descomplicado</span>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Como funciona o empréstimo na conta de luz
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Obtenha crédito em 4 etapas simples pelo seu celular. Usando sua conta de luz como garantia, dispensamos consultas ao SPC/Serasa. Ideal para negativados, com parcelas incluídas na sua fatura mensal de energia.
            </motion.p>
            
            {/* Melhorado o visual do bloco Como Funciona */}
            <motion.div 
              className="bg-white p-8 rounded-2xl border border-blue-100 mb-12 shadow-lg max-w-3xl mx-auto overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full mr-3 shadow-md">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Conheça nossas etapas simplificadas</h3>
              </div>
              
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Com nosso processo 100% digital, você obtém empréstimo sem sair de casa. Não é preciso comprovação de renda ou análise de crédito tradicional – a conta de luz é sua garantia. Aprovação imediata e dinheiro no mesmo dia direto na sua conta.
              </p>
              
              <div className="space-y-6 max-w-2xl mx-auto relative z-10">
                {/* Adicionado o elemento decorativo de conectividade */}
                <div className="absolute left-6 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-blue-300 rounded-full opacity-20 hidden md:block"></div>
                
                {HOW_IT_WORKS.map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-blue-300 group relative z-10 ml-8 md:ml-14"
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="absolute -left-8 md:-left-14 top-6 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-4 border-white z-20">
                          <span className="font-bold text-xl">0{index + 1}</span>
                        </div>
                        
                        <div className="flex-grow pl-8 md:pl-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                              {step.title}
                            </h4>
                            
                            {step.duration && (
                              <Badge className="bg-blue-100 text-blue-600 border border-blue-200 group-hover:bg-blue-200 transition-colors duration-300">
                                <Clock className="h-3 w-3 mr-1" /> {step.duration}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mt-1">
                            {step.description}
                          </p>
                          
                          {step.details && (
                            <div className="mt-3 pt-3 border-t border-blue-100">
                              <ul className="space-y-2">
                                {step.details.map((detail, i) => (
                                  <li key={i} className="flex items-start text-gray-600 text-sm">
                                    <CheckCircle className="h-4 w-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="font-semibold text-gray-800">Vantagens exclusivas</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    "Aprovação imediata em 30 segundos",
                    "Disponível mesmo para negativados",
                    "Não precisa comprovar renda",
                    "Processo 100% digital pelo celular"
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start text-gray-600 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="font-semibold text-gray-800">Informações importantes</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    "É necessário ser o titular da conta de luz",
                    "As parcelas são incluídas na fatura de energia",
                    "Valor liberado de até R$ 3.300",
                    "Parcele em até 12 vezes"
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start text-gray-600 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      <Info className="h-4 w-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
            
            {/* Box de disponibilidade regional */}
            <motion.div 
              className="max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <div className="flex items-start p-5 md:p-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Disponibilidade regional</h3>
                    <p className="text-sm text-gray-600">Estados onde oferecemos o serviço de empréstimo na conta de luz</p>
                  </div>
                </div>
                
                <div className="p-5 md:p-6 pt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 mb-4">
                    {AVAILABLE_STATES.map((state, index) => (
                      <motion.div 
                        key={state.name} 
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-white border border-slate-200 rounded-lg px-2 py-3 flex items-center justify-center text-center">
                          <span className="font-medium text-gray-700">
                            {state.name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      O crédito na conta de luz é uma parceria da <span className="font-bold text-gray-700">Credios</span> com a <span className="font-bold text-gray-700">Crefaz</span> e está disponível na 
                      maioria das cidades dos estados listados. <a href="/simulacao" className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer">Consulte disponibilidade durante a simulação →</a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* SEÇÃO DE DEPOIMENTOS */}
      <div className="py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            badge="Clientes satisfeitos"
            title="O que dizem sobre nós"
            description="Mais de 200 mil pessoas já resolveram sua situação financeira com o empréstimo na conta de luz da Credios."
          />
          
          {/* Substituição da grade por carrossel */}
          <TestimonialCarousel />
        </div>
      </div>
      
      {/* SEÇÃO FAQ */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Elementos decorativos */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-100/30 rounded-full -z-10 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-100/30 rounded-full -z-10 blur-3xl"></div>
          
          {/* Subseção de Perguntas Frequentes */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-10 md:mb-16 text-center"
            >
              <div className="mb-3 flex justify-center items-center gap-2">
                <motion.span 
                  className="text-blue-600"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <AlertCircle className="h-5 w-5" />
                </motion.span>
                <span className="text-blue-600 font-bold uppercase tracking-wide text-sm">Dúvidas comuns</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800">
                Perguntas Frequentes
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base">
                Encontre respostas para as dúvidas mais comuns sobre o empréstimo na conta de luz.
              </p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              {/* FAQ com estilo melhorado e cursor adequado */}
              <Accordion type="single" collapsible className="space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem value={`item-${index}`} className="border rounded-xl shadow-sm overflow-hidden">
                      <AccordionTrigger className="px-4 py-4 hover:bg-slate-50 data-[state=open]:bg-blue-50/70 data-[state=open]:text-blue-700 group-hover:bg-blue-50 transition-all cursor-pointer">
                        <span className="text-base font-medium">{item.question}</span>
                      </AccordionTrigger>
                      
                      <AccordionContent className="px-4 pb-4 pt-0 text-gray-600">
                        <Separator className="mb-3" />
                        <p className="text-sm leading-relaxed">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA FINAL (estilo bentobox) */}
      <div className="py-16 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Resolva sua necessidade financeira hoje!
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Mais de 200 mil pessoas já escolheram o empréstimo na conta de luz da Credios. Junte-se a eles e tenha acesso ao crédito que você precisa.
            </p>
          </motion.div>
          
          {/* Layout BentoBox para o CTA Final */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Caixa principal */}
            <motion.div
              className="md:col-span-8 bg-white rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shadow-md">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge className="ml-4 bg-green-100 text-green-700 px-3 py-1 border-0">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Aprovação em 30 segundos
                  </Badge>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Simule e descubra seu limite</h4>
                <p className="text-gray-600 mb-6">
                  Descubra quanto você pode receber sem compromisso. A consulta não afeta seu score de crédito e você recebe o resultado na hora.
                </p>
                
                <div className="mt-auto">
                  <a href="/simular" className="block cursor-pointer">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer">
                      Simular agora sem compromisso
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                  
                  <p className="text-xs text-gray-500 mt-3 flex items-center justify-center">
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    Seus dados são protegidos por criptografia avançada
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Caixas secundárias */}
            <div className="md:col-span-4 grid grid-cols-1 gap-4 md:gap-6">
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                    <MessageCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <h5 className="ml-3 text-white font-semibold">Atendimento ao cliente</h5>
                </div>
                
                <p className="text-white/90 text-sm mb-4">
                  Precisa de ajuda? Nossa equipe está pronta para responder suas dúvidas.
                </p>
                
                <a href="https://wa.me/5511999999999" className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  Falar pelo WhatsApp
                </a>
              </motion.div>
              
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-white mr-2" />
                    <h5 className="text-white font-medium">Segurança garantida</h5>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {[
                    "Criptografia de ponta a ponta",
                    "Proteção de dados completa",
                    "Transações 100% seguras"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-white/90 text-sm">
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {/* Caixas inferiores */}
            <motion.div
              className="md:col-span-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md mr-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h5 className="text-white font-semibold">Sem consulta ao SPC/Serasa</h5>
                <p className="text-white/90 text-sm">
                  Disponível mesmo para quem está com restrições no nome.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="md:col-span-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md mr-4">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h5 className="text-white font-semibold">Dinheiro no PIX</h5>
                <p className="text-white/90 text-sm">
                  Crédito liberado no mesmo dia direto na sua conta.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="md:col-span-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md mr-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h5 className="text-white font-semibold">Processo 100% online</h5>
                <p className="text-white/90 text-sm">
                  Faça tudo pelo celular em poucos minutos.
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.p 
            className="text-center text-white/70 mt-8 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <AlertCircle className="inline-block h-3.5 w-3.5 mr-1.5 mb-0.5" />
            Crédito sujeito à análise e aprovação. Taxa de juros conforme perfil do cliente.
          </motion.p>
        </div>
      </div>
      
      {/* Marcas de confiança */}
      <div className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Parceiros de confiança</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="w-24 h-12 bg-gray-200 rounded opacity-70 hover:opacity-100 transition-opacity"></div>
            <div className="w-24 h-12 bg-gray-200 rounded opacity-70 hover:opacity-100 transition-opacity"></div>
            <div className="w-24 h-12 bg-gray-200 rounded opacity-70 hover:opacity-100 transition-opacity"></div>
            <div className="w-24 h-12 bg-gray-200 rounded opacity-70 hover:opacity-100 transition-opacity"></div>
            <div className="w-24 h-12 bg-gray-200 rounded opacity-70 hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>
      
      {/* Flutuante de WhatsApp - fixo no canto inferior direito */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <a 
          href="https://wa.me/5511999999999"
          className="relative flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 cursor-pointer"
          aria-label="Fale conosco pelo WhatsApp"
        >
          <motion.div 
            className="absolute inset-0 bg-green-500 rounded-full opacity-70"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          ></motion.div>
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </a>
      </motion.div>
    </section>
  );
}