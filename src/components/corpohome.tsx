"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link"


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
  Wallet,
  ArrowRight,
  MapPin,
  AlertCircle,
  Clock,
  ShieldCheck,
  Info,
  CheckCircle,
  Star,
  UserCheck,
  Lock,
  MessageCircle,
  ThumbsUpIcon,
  Facebook,
  Instagram,
  Shield,
  Building,
  Briefcase,
  Calculator,
  Smartphone,
  CreditCardIcon,
  Award,
  Clock3,
  DollarSign,
  Bolt,
} from "lucide-react";

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
  product?: string;
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
  category?: string;
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
  product?: string;
}

interface ProductFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  buttonText: string;
  buttonUrl: string;
  bgClass: string;
  stats: {
    value: string;
    label: string;
  }[];
}

// Dados para as vantagens
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: <Zap className="h-8 w-8 text-amber-500" />,
    title: "Atendimento 24h",
    description:
      "Nossos serviços funcionam 24 horas por dia, 7 dias por semana, permitindo que você solicite seu empréstimo a qualquer momento.",
    highlight: "100% Digital",
    action: "Conheça a Credios",
    actionUrl: "/sobre",
    stats: [
      { value: "24/7", label: "Disponibilidade" },
      { value: "100%", label: "Online" },
    ],
    backgroundColor: "from-amber-50 to-yellow-50",
    accentColor: "amber",
    image: "/images/image001.jpg",
  },
  {
    icon: <Smartphone className="h-8 w-8 text-emerald-500" />,
    title: "Processo simplificado",
    description:
      "Contratação rápida e descomplicada, direto pelo seu celular. Sem filas, sem burocracia e sem precisar sair de casa.",
    highlight: "Fácil e rápido",
    action: "Veja como funciona",
    actionUrl: "/como-funciona",
    stats: [
      { value: "5min", label: "Contratação" },
      { value: "0", label: "Burocracia" },
    ],
    backgroundColor: "from-emerald-50 to-teal-50",
    accentColor: "emerald",
    image: "/images/processo-simplificado.png",
  },
  {
    icon: <CreditCardIcon className="h-8 w-8 text-blue-500" />,
    title: "Crédito acessível",
    description:
      "Opções de crédito adequadas para quem precisa, mesmo sem comprovação de renda. Inclusão financeira para todos os brasileiros.",
    highlight: "Inclusivo",
    action: "Descubra opções",
    actionUrl: "/produtos",
    stats: [
      { value: "R$ 3,3 mil", label: "Até na conta de luz" },
      { value: "R$ 20 mil", label: "Até no FGTS" },
    ],
    backgroundColor: "from-blue-50 to-indigo-50",
    accentColor: "blue",
    image: "/images/credito-acessivel.png",
  },
  {
    icon: <Shield className="h-8 w-8 text-purple-500" />,
    title: "Segurança garantida",
    description:
      "Seus dados estão protegidos com a mais alta tecnologia de segurança digital. Todas as transações são criptografadas e seguras.",
    highlight: "Protegido",
    action: "Ver política de privacidade",
    actionUrl: "/privacidade",
    stats: [
      { value: "100%", label: "Criptografado" },
      { value: "Seguro", label: "Ambiente" },
    ],
    backgroundColor: "from-purple-50 to-fuchsia-50",
    accentColor: "purple",
    image: "/images/seguranca-garantida.png",
  },
];

// Produtos principais
const MAIN_PRODUCTS: ProductFeature[] = [
  {
    icon: (
      <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm p-2">
        <Bolt className="h-8 w-8 text-white" strokeWidth={2.5} />
      </div>
    ),
    title: "Empréstimo na Conta de Luz",
    description: "Crédito pessoal usando sua fatura de energia como garantia. Ideal para quem não possui conta em banco ou tem restrições de crédito.",
    highlight: "Nosso carro-chefe",
    buttonText: "Simular na Conta de Luz",
    buttonUrl: "/simular-conta-luz",
    bgClass: "from-yellow-400 to-amber-500",
    stats: [
      { value: "R$ 3.300", label: "Valor máximo" },
      { value: "Sem", label: "Comprovação de renda" },
      { value: "12×", label: "Parcelamento" },
    ]
  },
  {
    icon: (
      <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm p-2">
        <Wallet className="h-8 w-8 text-white" strokeWidth={2.5} />
      </div>
    ),
    title: "Antecipação do FGTS",
    description: "Receba hoje o valor de seus saques-aniversário futuros, com as melhores taxas do mercado e sem comprometer sua renda mensal.",
    highlight: "Taxas competitivas",
    buttonText: "Simular FGTS",
    buttonUrl: "/simular-fgts",
    bgClass: "from-blue-400 to-indigo-500",
    stats: [
      { value: "R$ 20.000", label: "Valor máximo" },
      { value: "1,49%", label: "Taxa a partir de" },
      { value: "10×", label: "Saques antecipados" },
    ]
  }
];

// Dados para o processo simplificado
const HOW_IT_WORKS: ProcessStep[] = [
  {
    title: "Simulação e escolha",
    description: "Simule qualquer um de nossos produtos e encontre as melhores ofertas do mercado",
    icon: <Calculator className="h-6 w-6" />,
    details: [
      "Simulação gratuita em menos de 2 minutos",
      "Melhores taxas do mercado comparadas para você",
      "Opções disponíveis mesmo para negativados"
    ],
    duration: "2 minutos"
  },
  {
    title: "Contratação digital",
    description: "Todo o processo é feito pelo celular, sem papel, sem burocracia e sem sair de casa",
    icon: <Smartphone className="h-6 w-6" />,
    details: [
      "Tire fotos dos documentos pelo celular",
      "Assinatura digital do contrato",
      "Atendimento disponível 24 horas por dia"
    ],
    duration: "5 minutos"
  },
  {
    title: "Dinheiro na conta",
    description: "Após aprovação, o dinheiro é enviado via PIX diretamente para sua conta em questão de minutos",
    icon: <DollarSign className="h-6 w-6" />,
    details: [
      "Sem taxas de transferência",
      "Aprovação normalmente no mesmo dia",
      "Acompanhe todo o processo pelo aplicativo"
    ],
    duration: "Mesmo dia"
  }
];

// FAQ
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O que é a Credios?",
    answer: "A Credios é uma plataforma de crédito digital que atua como correspondente bancário, conectando pessoas a soluções financeiras. Oferecemos empréstimos na conta de luz e antecipação do FGTS de forma 100% digital, com atendimento 24h por dia, 7 dias por semana, pelo celular.",
    keywords: ["credios", "plataforma", "correspondente"],
    category: "empresa"
  },
  {
    question: "Como a Credios garante a segurança dos meus dados?",
    answer: "Utilizamos tecnologia de criptografia avançada para proteger todos os seus dados pessoais e financeiros. Nossas conexões são seguras (HTTPS) e seguimos rigorosamente a Lei Geral de Proteção de Dados (LGPD). Todos os parceiros financeiros da Credios são instituições autorizadas pelo Banco Central do Brasil.",
    keywords: ["segurança", "dados", "criptografia"],
    category: "empresa"
  },
  {
    question: "Quais documentos preciso para solicitar um empréstimo na Credios?",
    answer: "Para o empréstimo na conta de luz, você precisará de um documento de identificação com foto (RG ou CNH) e sua conta de luz mais recente. Para a antecipação do FGTS, é necessário documento de identificação e estar com a modalidade saque-aniversário ativada. Todo o processo é feito pelo celular, sem necessidade de enviar documentos físicos.",
    keywords: ["documentos", "requisitos", "solicitação"],
    category: "empresa"
  },
  {
    question: "O que é o empréstimo na conta de luz?",
    answer: "É um empréstimo pessoal em que você utiliza a sua fatura de energia elétrica como garantia. Basta você ser o titular da sua conta de luz para poder contratar até R$ 3.300,00, sem burocracia e sem necessidade de comprovar renda. As parcelas serão incluídas na sua fatura mensal de energia.",
    keywords: ["conta de luz", "fatura", "energia"],
    category: "conta-luz"
  },
  {
    question: "Em quais estados o empréstimo na conta de luz está disponível?",
    answer: "Atualmente, o empréstimo na conta de luz está disponível na maioria das cidades dos seguintes estados: Bahia, Ceará, Pernambuco, Rio Grande do Norte, Goiás, São Paulo, Rio de Janeiro, Paraná e Rio Grande do Sul. A disponibilidade pode variar de acordo com a distribuidora de energia da sua região.",
    keywords: ["estados", "disponibilidade", "regiões"],
    category: "conta-luz"
  },
  {
    question: "O que é o empréstimo com garantia do FGTS?",
    answer: "É uma modalidade de empréstimo que utiliza os saques-aniversário futuros do seu FGTS como garantia. Você consegue antecipar até 10 parcelas do saque-aniversário, recebendo o valor hoje, e as parcelas são quitadas automaticamente com seus saques anuais futuros.",
    keywords: ["saque-aniversário", "garantia", "FGTS"],
    category: "fgts"
  },
  {
    question: "Quais são as taxas de juros praticadas pela Credios?",
    answer: "A Credios trabalha com diversas instituições financeiras parceiras, cada uma com suas próprias taxas. Para o empréstimo na conta de luz, as taxas são fixadas pela financeira Crefaz. Já para antecipação do FGTS, comparamos as ofertas de vários bancos para você escolher a melhor condição, com taxas a partir de 1,49% ao mês. Você pode verificar as taxas exatas fazendo uma simulação gratuita em nosso site.",
    keywords: ["taxas", "juros", "condições"],
    category: "empresa"
  },
  {
    question: "Como faço para acompanhar minha solicitação de empréstimo?",
    answer: "Você pode acompanhar todo o processo através do nosso aplicativo ou site, na área 'Minha Conta'. Além disso, enviamos atualizações por e-mail e SMS em cada etapa do processo, desde a aprovação até a liberação do dinheiro. Nosso atendimento também está disponível 24h por dia, 7 dias por semana, para tirar suas dúvidas.",
    keywords: ["acompanhamento", "status", "solicitação"],
    category: "empresa"
  }
];

// Depoimentos
const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Ricardo Almeida",
    location: "Belo Horizonte, MG",
    rating: 5,
    comment: "Processo super rápido! Consegui R$ 8.000 em menos de 2 horas, sem burocracia. A Credios comparou as taxas de vários bancos e escolhi a melhor.",
    source: "Facebook",
    date: "15/02/2025",
    verified: true,
    product: "FGTS"
  },
  {
    name: "Carla Mendes",
    location: "São Paulo, SP",
    rating: 5,
    comment: "Precisava de dinheiro para reformar minha casa. A antecipação do FGTS foi a solução perfeita, não comprometeu meu salário e consegui taxas muito melhores que no banco.",
    source: "Instagram",
    date: "03/01/2025",
    verified: true,
    product: "FGTS"
  },
  {
    name: "Amanda Oliveira",
    location: "Salvador, BA",
    rating: 5,
    comment: "Nunca imaginei que seria tão fácil conseguir um empréstimo usando minha conta de luz! Solicitei de noite e no dia seguinte o dinheiro já estava na minha conta. Recomendo muito!",
    source: "Google",
    date: "05/02/2025",
    verified: true,
    product: "Conta de Luz"
  },
  {
    name: "José Carlos",
    location: "Fortaleza, CE",
    rating: 4,
    comment: "O empréstimo na conta de luz foi perfeito para mim, que precisava de dinheiro rápido e não tinha carteira assinada. Em menos de 24h resolvi meu problema financeiro.",
    source: "WhatsApp",
    date: "12/03/2025",
    verified: true,
    product: "Conta de Luz"
  },
  {
    name: "Marcelo Souza",
    location: "Brasília, DF",
    rating: 5,
    comment: "Estava precisando de dinheiro para abrir meu negócio. Consegui antecipar 10 parcelas do meu FGTS com uma taxa excelente. Super recomendo!",
    source: "Facebook",
    date: "05/02/2025",
    verified: true,
    product: "FGTS"
  },
  {
    name: "Patrícia Oliveira",
    location: "Curitiba, PR",
    rating: 5,
    comment: "Processo 100% digital, fiz tudo pelo celular. A Credios ofereceu a taxa mais baixa do mercado e o suporte foi incrível do início ao fim.",
    source: "Instagram",
    date: "20/01/2025",
    verified: true,
    product: "FGTS"
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

// Hero principal
const MainHero = () => {
  return (
    <div className="relative py-16 overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-full h-48 bg-blue-400/10 rounded-full -z-10 blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-48 bg-indigo-300/10 -z-10 blur-3xl transform -translate-x-1/3 translate-y-1/3 opacity-60"></div>
      
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
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-600 border-none py-1.5 px-3">
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                  100% Digital
                </Badge>
                <Badge className="bg-green-100 hover:bg-green-200 text-green-600 border-none py-1.5 px-3">
                  <Clock3 className="h-3.5 w-3.5 mr-1.5" />
                  Atendimento 24h
                </Badge>
                <Badge className="bg-amber-100 hover:bg-amber-200 text-amber-600 border-none py-1.5 px-3">
                  <Smartphone className="h-3.5 w-3.5 mr-1.5" />
                  Pelo Celular
                </Badge>
              </div>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Crédito <span className="text-blue-500">simples</span> e <span className="text-blue-500">rápido</span> para todos
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Empréstimo na conta de luz e antecipação do FGTS com a melhor experiência digital. Dinheiro na conta em até 24h, processo 100% pelo celular.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                >
                  Pedir agora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 rounded-full px-8 py-6 text-lg cursor-pointer"
                >
                  Nossos produtos
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap items-center gap-5 text-sm text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>Liberação rápida</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-blue-500" />
                  <span>+100 mil clientes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-blue-500" />
                  <span>100% seguro</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span>Excelência no atendimento</span>
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-10 transform rotate-3"></div>
                <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl border border-blue-100">
                  <Image
                    src="/images/image001.jpg"
                    alt="Pessoa usando celular para solicitar empréstimo pela Credios"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Stats pop-ups */}
                <motion.div 
                  className="absolute -left-6 top-20 bg-white p-3 rounded-lg shadow-lg border border-blue-100 flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Processo</p>
                    <p className="font-semibold text-gray-800">100% Digital</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -right-6 bottom-32 bg-white p-3 rounded-lg shadow-lg border border-blue-100 flex items-center gap-3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Aprovação</p>
                    <p className="font-semibold text-gray-800">Em minutos</p>
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

// Componente para exibir os produtos principais
const ProductsSection = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-5">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none font-medium py-2 px-4 text-sm rounded-full">
            <Zap className="h-4 w-4 mr-2" />
            Nossas soluções
          </Badge>
        </div>
        
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          Produtos financeiros para você
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          Soluções de crédito adaptadas às suas necessidades, com processo 100% digital e aprovação rápida.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          {MAIN_PRODUCTS.map((product, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="h-full group cursor-pointer"
            >
              <a href={product.buttonUrl} className="block h-full">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white relative">
                  {/* Barra colorida superior */}
                  <div className={`h-2.5 w-full bg-gradient-to-r ${product.bgClass}`}></div>
                  
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <Badge className="bg-blue-100 text-blue-700 group-hover:bg-blue-200 border-none font-medium py-1.5 px-3 transition-colors duration-300">
                      {product.highlight}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pt-8">
                    <div className="flex mb-5">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-r ${product.bgClass} shadow-md group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-300`}>
                        <div className="text-white">
                          {product.icon}
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {product.title}
                    </CardTitle>
                    
                    <CardDescription className="text-base mt-3 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {product.stats.map((stat, i) => (
                        <div 
                          key={i} 
                          className="bg-gray-50 group-hover:bg-gray-100 p-4 rounded-lg border border-gray-100 transition-all duration-300"
                        >
                          <p className="text-xl font-bold text-gray-800">
                            {stat.value}
                          </p>
                          <p className="text-xs text-gray-500">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t border-gray-100 pt-5">
                    <div 
                      className={`w-full flex items-center justify-center py-3.5 px-4 rounded-lg bg-gradient-to-r ${product.bgClass} text-white font-semibold group-hover:shadow-md transition-all duration-300 cursor-pointer`}
                    >
                      {product.buttonText}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardFooter>
                </Card>
              </a>
            </motion.div>
          ))}
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
      <Badge className="mb-4 px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none font-medium">
        {badge}
      </Badge>
    )}
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
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
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-bl-full"></div>
        
        <CardHeader className="relative z-20">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white shadow-md transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
              <div className="group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
            </div>
            
            {item.highlight && (
              <Badge className="bg-blue-500 text-white border-0 px-3 py-1.5 text-xs uppercase font-semibold tracking-wide group-hover:bg-white group-hover:text-blue-600 transition-colors duration-300">
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
                  <p className="text-2xl font-bold text-blue-600 group-hover:text-white transition-colors duration-300">
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
              className="inline-flex items-center pl-0 text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 group-hover:text-white cursor-pointer hover:underline"
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
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-medium shadow-sm">
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
                    {testimonial.product && (
                      <Badge className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-sm font-normal">
                        {testimonial.product}
                      </Badge>
                    )}
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
export default function CorpoHome() {
  // Estado para controlar a categoria selecionada no FAQ
  const [faqCategory, setFaqCategory] = useState("Todos");
  
  // Função para filtrar os itens do FAQ com base na categoria selecionada
  const filteredFAQItems = useMemo(() => {
    if (faqCategory === "Todos") {
      return FAQ_ITEMS;
    } else {
      const categoryMap: Record<string, string> = {
        "Sobre a Credios": "empresa",
        "Conta de Luz": "conta-luz",
        "FGTS": "fgts"
      };
      
      // Verifica se a categoria existe no mapa
      if (faqCategory in categoryMap) {
        return FAQ_ITEMS.filter(item => item.category === categoryMap[faqCategory as keyof typeof categoryMap]);
      }
      
      return FAQ_ITEMS;
    }
  }, [faqCategory]);
  return (
    <section className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <MainHero />
      
      {/* PRODUTOS PRINCIPAIS */}
      <ProductsSection />
      
      {/* SEÇÃO PRINCIPAL - VANTAGENS */}
      <div className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Elementos decorativos de background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-10 blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full opacity-10 blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/4"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-100 rounded-full opacity-10 blur-3xl -z-10"></div>
          
          {/* Título da seção principal */}
          <SectionHeading 
            badge="Por que escolher a Credios"
            title="Vantagens da nossa plataforma"
            description="Descubra por que mais de 100 mil pessoas já escolheram a Credios para obter crédito de forma rápida, segura e descomplicada."
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
              Como funciona a Credios
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Do início ao fim, todo o processo é feito pelo seu celular, sem burocracia e com aprovação rápida. Você recebe o dinheiro na conta em até 24 horas.
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
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Quatro passos simples para obter seu crédito</h3>
              </div>
              
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                A Credios torna o processo de obtenção de crédito simples e rápido. Todo o procedimento pode ser concluído pelo seu celular, sem necessidade de documentação física ou visitas a agências.
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
                    "Processo 100% digital pelo celular",
                    "Liberação do dinheiro em até 24h",
                    "Atendimento 24 horas por dia",
                    "Segurança e privacidade garantidas"
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
                    "Todos os dados protegidos pela LGPD",
                    "Taxas e condições transparentes",
                    "Aprovação sujeita a análise de crédito",
                    "Suporte técnico disponível 24/7"
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
            
            {/* Box de bancos parceiros */}
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
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Parceiros financeiros</h3>
                    <p className="text-sm text-gray-600">Trabalhamos com instituições financeiras regulamentadas pelo Banco Central</p>
                  </div>
                </div>
                
                <div className="p-5 md:p-6 pt-0">
                  <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <motion.div 
                        key={index} 
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-center shadow-sm">
                          <div className="w-20 h-10 bg-gray-200 rounded"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      A <span className="font-bold text-gray-700">Credios</span> atua como correspondente bancário, conectando você às melhores instituições financeiras do mercado. <a href="/parceiros" className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer hover:underline">Conheça nossos parceiros →</a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* SEÇÃO DE DEPOIMENTOS */}
      <div className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            badge="Clientes satisfeitos"
            title="O que dizem sobre a Credios"
            description="Mais de 100 mil pessoas já utilizaram nossa plataforma para obter crédito. Veja o que nossos clientes estão falando."
          />
          
          {/* Carrossel de depoimentos */}
          <TestimonialCarousel />
        </div>
      </div>
      
      {/* SEÇÃO FAQ */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Elementos decorativos */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-100/30 rounded-full -z-10 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-indigo-100/30 rounded-full -z-10 blur-3xl"></div>
          
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
                Encontre respostas para as dúvidas mais comuns sobre a Credios e nossos produtos de crédito.
              </p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              {/* Filtro de categorias */}
              <motion.div 
                className="flex flex-wrap justify-center gap-2 mb-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                {["Todos", "Sobre a Credios", "Conta de Luz", "FGTS"].map((category) => (
                  <button 
                    key={category}
                    className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                      faqCategory === category 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 hover:shadow-sm'
                    }`}
                    onClick={() => setFaqCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
              
              {/* FAQ com estilo melhorado e filtragem funcional */}
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem value={`item-${index}`} className="border rounded-xl shadow-sm overflow-hidden hover:border-blue-200 transition-all duration-300">
                      <AccordionTrigger className="px-4 py-4 hover:bg-slate-50 data-[state=open]:bg-blue-50/70 data-[state=open]:text-blue-700 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center">
                          {item.category === "empresa" && (
                            <Badge className="mr-3 bg-blue-100 text-blue-700 border-none py-1 px-2">Credios</Badge>
                          )}
                          {item.category === "conta-luz" && (
                            <Badge className="mr-3 bg-amber-100 text-amber-700 border-none py-1 px-2">Conta de Luz</Badge>
                          )}
                          {item.category === "fgts" && (
                            <Badge className="mr-3 bg-indigo-100 text-indigo-700 border-none py-1 px-2">FGTS</Badge>
                          )}
                          <span className="text-base font-medium text-left">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="px-4 pb-6 pt-2 text-gray-600 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <Separator className="mb-4" />
                        <p className="text-sm leading-relaxed">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
                
                {filteredFAQItems.length === 0 && (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Info className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhuma pergunta encontrada nesta categoria.</p>
                    <button
                      onClick={() => setFaqCategory("Todos")}
                      className="mt-2 text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      Ver todas as perguntas
                    </button>
                  </motion.div>
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA FINAL (estilo bentobox) */}
      <div className="py-16 bg-gradient-to-r from-blue-500 to-indigo-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Crédito acessível e sem burocracia
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Escolha a solução que melhor atende suas necessidades e solicite agora mesmo. Todo o processo é feito pelo celular!
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
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shadow-md">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className="ml-4 bg-green-100 text-green-700 px-3 py-1 border-0">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    100% pelo celular
                  </Badge>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Escolha a melhor opção para você</h4>
                <p className="text-gray-600 mb-6">
                  Temos soluções de crédito para diferentes necessidades. Faça uma simulação gratuita e descubra quanto você pode receber.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border border-amber-100 rounded-xl bg-amber-50">
                    <div className="flex items-center mb-2">
                      <Bolt className="h-5 w-5 text-amber-500 mr-2" />
                      <h5 className="font-semibold text-gray-800">Conta de Luz</h5>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Até R$ 3.300 usando sua fatura como garantia.</p>
                    <a href="/emprestimo-na-conta-de-luz" className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center cursor-pointer">
                      Simular agora
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </div>
                  
                  <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
                    <div className="flex items-center mb-2">
                      <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                      <h5 className="font-semibold text-gray-800">FGTS</h5>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Antecipe saques-aniversário até R$ 20.000.</p>
                    <a href="/emprestimo-fgts" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center cursor-pointer">
                      Simular agora
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <a href="/produtos" className="block cursor-pointer">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer">
                      Conhecer todos os produtos
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
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h5 className="ml-3 text-white font-semibold">Atendimento personalizado</h5>
                </div>
                
                <p className="text-white/90 text-sm mb-4">
                  Dúvidas sobre nossos produtos? Nossa equipe está disponível 24h para ajudar você.
                </p>
                
                <a href="https://wa.me/5511999999999" className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  Falar com consultor
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
                    <h5 className="text-white font-medium">Por que escolher a Credios</h5>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {[
                    "Processo 100% digital pelo celular",
                    "Atendimento 24h todos os dias",
                    "Dinheiro na conta em até 24h"
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
                <Bolt className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h5 className="text-white font-semibold">Empréstimo na Conta de Luz</h5>
                <p className="text-white/90 text-sm">
                  Até R$ 3.300 sem consulta ao SPC/Serasa.
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
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h5 className="text-white font-semibold">Antecipação do FGTS</h5>
                <p className="text-white/90 text-sm">
                  Até R$ 20.000 sem comprometer seu salário.
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
                <Smartphone className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h5 className="text-white font-semibold">100% Digital</h5>
                <p className="text-white/90 text-sm">
                  Todo processo pelo celular, sem sair de casa.
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
            Empréstimos sujeitos a análise e aprovação. Consulte condições específicas para cada produto.
          </motion.p>
        </div>
      </div>
      
      {/* Marcas de confiança */}
      <div className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Instituições parceiras</p>
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