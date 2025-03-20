"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { JsonLd } from "@/components/SEO/JsonLd";

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Estilos globais para garantir que todos elementos clicáveis tenham cursor pointer
const globalStyles = `
  a, button, .cursor-pointer, [role="button"], 
  .accordion-trigger, .card-clickable, .hover-pointer,
  [class*="hover:"], [class*="group-hover:"] {
    cursor: pointer !important;
  }
`;

// Ícones do Lucide
import {
  CheckCircle2,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Calendar,
  MessageCircle,
  AlertCircle,
  AtSign,
  Building,
  BadgeCheck,
  CalendarIcon,
  ClockIcon,
  SunIcon,
  Droplet,
  Wrench,
  DollarSign,
  BarChartHorizontal,
  Tablet,
  Shield,
  Users,
  BadgePercent,
  Paintbrush,
  FileText,
  HandCoins,
  Columns,
  LineChart,
  ClipboardList,
  Wallet,
  LucideProps,
  ThumbsUp
} from "lucide-react";

// Ícones de Redes Sociais
import { 
  Instagram, 
  Facebook, 
} from "lucide-react";

// Interface personalizada para ícone do WhatsApp
const WhatsApp = (props: LucideProps) => (
  <svg
    fill="#25D366"
    height="20"
    width="20"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 308 308"
    {...props}
  >
    <g id="XMLID_468_">
      <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
        c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
        c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
        c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
        c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
        c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
        c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
        c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
        c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
        C233.168,179.508,230.845,178.393,227.904,176.981z"/>
      <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
        c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
        c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
        M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
        l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
        c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
        C276.546,215.678,222.799,268.994,156.734,268.994z"/>
    </g>
  </svg>
);

// Botão de WhatsApp Fixo
const FloatingWhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 drop-shadow-xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 300 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a 
              href="https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20informações%20sobre%20crédito%20para%20condomínios" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div 
                className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full overflow-hidden p-0 shadow-lg border-2 border-white"
                animate={{ 
                  width: isHovered ? 'auto' : '60px',
                  paddingLeft: isHovered ? '20px' : '0px',
                  paddingRight: isHovered ? '20px' : '0px'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-[60px] h-[60px] flex items-center justify-center flex-shrink-0">
                  <WhatsApp className="h-8 w-8" />
                </div>
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.span 
                      className="font-medium whitespace-nowrap pr-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      Falar com Consultor
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Atendimento rápido via WhatsApp</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

// Componente Principal
export default function CreditoCondominios() {
  return (
    <section className="w-full overflow-hidden font-sans" itemScope itemType="https://schema.org/WebPage">
      {/* Estilos Globais */}
      <style jsx global>{globalStyles}</style>
      
      {/* SEO Metadata */}
      <SEOHead />
      
      {/* Botão de WhatsApp Fixo */}
      <FloatingWhatsAppButton />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Estatísticas sobre condomínios */}
      <StatsSection />

      {/* Vantagens do crédito para condomínios */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-teal-100 opacity-50 blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-emerald-100 opacity-50 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading
            badge="Vantagens"
            title="Por Que Escolher a Credios Para O Seu Condomínio"
            description="Entendemos as necessidades específicas dos condomínios e oferecemos soluções que realmente funcionam para o seu prédio."
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {ADVANTAGES.map((item, index) => (
              <AdvantageCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Como funciona */}
      <HowItWorksSection />

      {/* Casos de uso */}
      <UseCasesSection />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA Final */}
      <FinalCTA />
    </section>
  );
}

// Interface para ícone do Google
const Google = (props: LucideProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

// Condomínio Aprovado badge component
const ApprovedBadge = () => (
  <span className="inline-flex items-center justify-center bg-teal-100 text-teal-700 text-xs font-medium rounded-full px-2 py-0.5">
    <Building className="h-3 w-3 mr-1" />
    <span>Condomínio Aprovado</span>
  </span>
);

// Interfaces
interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  action?: string;
  actionUrl?: string;
  stats?: { value: string; label: string }[];
  backgroundColor?: string;
  accentColor?: string;
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
}

interface TestimonialItem {
  name: string;
  condoName: string;
  location: string;
  rating: number;
  comment: string;
  source: "whatsapp" | "instagram" | "facebook" | "google";
  date?: string;
  url?: string;
  role?: string;
}

interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
  value?: string;
  timeframe?: string;
  color: string;
}

// Dados do crédito para condomínios
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: <Building className="h-8 w-8 text-teal-500" />,
    title: "Exclusivo para Condomínios",
    description:
      "Soluções de crédito especiais para condomínios residenciais, comerciais e mistos. Aprovação rápida, sem exigir garantias pessoais do síndico.",
    highlight: "CONDOMÍNIOS",
    action: "Ver Soluções",
    actionUrl: "#solucoes-condominios",
    stats: [{ value: "100%", label: "Digital e Ágil" }],
    backgroundColor: "from-teal-50 to-emerald-50",
    accentColor: "teal",
  },
  {
    icon: <BadgePercent className="h-8 w-8 text-cyan-500" />,
    title: "Taxas Especiais para PJ",
    description:
      "Condições exclusivas para pessoa jurídica, com taxas a partir de 1,99% ao mês. Muito mais vantajoso que empréstimos tradicionais para condomínios.",
    highlight: "1,99% a.m.",
    action: "Simular Agora",
    actionUrl: "/simular-condominios",
    stats: [{ value: "MENORES", label: "Taxas do Mercado" }],
    backgroundColor: "from-cyan-50 to-blue-50",
    accentColor: "cyan",
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-purple-500" />,
    title: "Documentação Simplificada",
    description:
      "Menos burocracia para a aprovação. Solicitamos apenas ata de assembleia, CNPJ e documentos do síndico. Sem necessidade de avalistas ou garantias pessoais.",
    highlight: "SIMPLES",
    action: "Como Funciona",
    actionUrl: "#como-funciona",
    stats: [{ value: "RÁPIDO", label: "Menos burocracia" }],
    backgroundColor: "from-purple-50 to-indigo-50",
    accentColor: "purple",
  },
  {
    icon: <LineChart className="h-8 w-8 text-blue-500" />,
    title: "Pagamento Flexível",
    description:
      "Parcele em até 60 vezes com valores que cabem no orçamento do condomínio. Sem comprometer o fluxo de caixa ou precisar aumentar a taxa condominial.",
    highlight: "60x",
    action: "Solicitar Agora",
    actionUrl: "#formulario-contato",
    stats: [{ value: "FIXAS", label: "Parcelas sem reajustes" }],
    backgroundColor: "from-blue-50 to-indigo-50",
    accentColor: "blue",
  },
];

// Como funciona o crédito para condomínios
const HOW_IT_WORKS: ProcessStep[] = [
  {
    title: "Contato e Simulação com a Credios",
    description: "O primeiro passo é entrar em contato conosco para uma simulação personalizada, onde analisamos as necessidades específicas do seu condomínio.",
    icon: <MessageCircle className="h-6 w-6" />,
    details: ["Atendimento especializado", "Simulação personalizada", "Análise prévia de viabilidade"],
    duration: "Imediato",
  },
  {
    title: "Envio da Documentação Básica",
    description: "Enviamos a proposta e orientamos sobre a documentação necessária como CNPJ do condomínio, documentos do síndico e convenção do condomínio.",
    icon: <FileText className="h-6 w-6" />,
    details: ["CNPJ do condomínio", "Documento do síndico", "Convenção do condomínio", "Últimos balancetes (opcional)"],
    duration: "5 min",
  },
  {
    title: "Aprovação em Assembleia de Condomínio",
    description: "Com a proposta em mãos, o síndico convoca uma assembleia para aprovação do crédito, definindo valor, finalidade e prazo.",
    icon: <Users className="h-6 w-6" />,
    details: ["Aprovação por maioria simples", "Registro em ata oficial", "Definição de valor e prazo"],
    duration: "Responsabilidade do condomínio",
  },
  {
    title: "Assinatura do Contrato e Liberação do Crédito",
    description: "Após a aprovação em assembleia, o contrato é assinado e o valor é depositado na conta do condomínio, pronto para os investimentos necessários.",
    icon: <DollarSign className="h-6 w-6" />,
    details: ["Assinatura digital", "Transferência para conta PJ do condomínio", "Sem taxas adicionais"],
    duration: "1 dia útil",
  },
];

// FAQ sobre crédito para condomínios
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quais documentos são necessários para o condomínio solicitar o crédito?",
    answer:
      "Para solicitar crédito, o condomínio precisa apresentar: 1) Ata da assembleia que aprovou a contratação do crédito, assinada pelos condôminos; 2) Cartão CNPJ do condomínio; 3) Documento do síndico (RG e CPF); 4) Cópia da convenção do condomínio; 5) Comprovante de endereço do condomínio. Opcionalmente, podem ser solicitados os 3 últimos balancetes para análise da saúde financeira.",
  },
  {
    question: "É necessário que todos os condôminos aprovem a solicitação do crédito?",
    answer:
      "Não é necessária aprovação unânime. Conforme a Lei 4.591/64 e o Código Civil, para a maioria das decisões financeiras, basta a aprovação por maioria simples (50% + 1) dos presentes em assembleia regularmente convocada. No entanto, é importante verificar o que diz a convenção do seu condomínio, pois ela pode estabelecer quóruns específicos para contratação de empréstimos. A ata da assembleia que aprovou a contratação do crédito deve ser apresentada como parte da documentação.",
  },
  {
    question: "O síndico precisa oferecer garantias pessoais para o empréstimo?",
    answer:
      "Não, uma das grandes vantagens do crédito para condomínios da Credios é que não exigimos garantias pessoais do síndico. A operação é totalmente vinculada ao CNPJ do condomínio, sem comprometer o CPF do síndico ou de qualquer morador individualmente. O síndico atua apenas como representante legal do condomínio, sem assumir responsabilidade financeira pessoal pela dívida.",
  },
  {
    question: "Quais são os limites de crédito disponíveis para condomínios?",
    answer:
      "Os limites de crédito variam de R$ 10.000 a R$ 500.000, dependendo do porte do condomínio, número de unidades, valor médio da taxa condominial e histórico de adimplência. Para condomínios com necessidades específicas, como instalação de energia solar ou grandes reformas estruturais, podemos avaliar limites maiores mediante análise específica. O prazo de pagamento pode ser de até 36 meses com parcelas fixas.",
  },
  {
    question: "É necessário aumentar a taxa condominial para pagar o empréstimo?",
    answer:
      "Não necessariamente. Na maioria dos casos, o empréstimo pode ser pago com o fluxo de caixa atual do condomínio, sem necessidade de aumento da taxa condominial. Em casos de investimentos em eficiência energética (como energia solar), a economia gerada frequentemente supera o valor das parcelas do empréstimo. Para obras e reformas, é possível estruturar o pagamento para adequar-se ao orçamento atual ou realizar um planejamento de aumento gradual, se necessário.",
  },
  {
    question: "Condomínios com alta inadimplência conseguem aprovação de crédito?",
    answer:
      "Condomínios com taxas de inadimplência de até 15% normalmente conseguem aprovação sem dificuldades. Para índices entre 15% e 30%, a aprovação é possível, mas pode requerer documentação adicional ou ajustes nos valores e prazos solicitados. Para condomínios com inadimplência superior a 30%, recomendamos primeiro implementar ações de redução da inadimplência antes de solicitar o crédito. A Credios pode oferecer consultoria gratuita com estratégias para melhorar a saúde financeira do condomínio.",
  },
  {
    question: "Quanto tempo leva para o condomínio receber o valor aprovado?",
    answer:
      "Após a aprovação do crédito, que geralmente ocorre em 24-48 horas após o envio da documentação completa, o valor é depositado na conta do condomínio em até 1 dia útil. Todo o processo, desde a solicitação até a liberação do crédito, geralmente leva menos de uma semana. Em casos de emergência, como necessidade de reparos urgentes, podemos agilizar o processo para liberação em até 48 horas.",
  },
  {
    question: "O crédito pode ser utilizado para qualquer finalidade?",
    answer:
      "Sim, o condomínio tem liberdade para utilizar o crédito de acordo com suas necessidades, desde que aprovado em assembleia. Os usos mais comuns incluem: instalação de energia solar, reformas estruturais, modernização de elevadores, implementação de portaria remota, rescisão de funcionários, instalação de sistemas de segurança, impermeabilização, pintura de fachada, quitação de dívidas, entre outros. É importante apenas que a finalidade esteja claramente definida na ata da assembleia.",
  },
];

// Depoimentos de clientes condomínios
const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Ricardo Almeida",
    role: "Síndico",
    condoName: "Edifício Solar das Palmeiras",
    location: "São Paulo, SP",
    rating: 5,
    comment:
      "Precisávamos urgentemente reformar a fachada do nosso prédio e a Credios foi a única que nos ofereceu uma solução rápida com taxa justa. Em menos de uma semana o dinheiro já estava na conta do condomínio e pudemos iniciar as obras.",
    source: "google",
    date: "15/02/2024",
    url: "#"
  },
  {
    name: "Fernanda Silva",
    role: "Síndica Profissional",
    condoName: "Condomínio Vista Verde",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    comment:
      "Como síndica profissional, já trabalhei com diversos bancos e financeiras. A Credios se destaca pela simplicidade no processo e rapidez na aprovação. Conseguimos crédito para instalar sistema de energia solar e já estamos economizando 60% na conta de luz.",
    source: "facebook",
    date: "03/03/2024",
    url: "#"
  },
  {
    name: "Carlos Eduardo Santos",
    role: "Conselheiro",
    condoName: "Residencial Parque das Flores",
    location: "Belo Horizonte, MG",
    rating: 4,
    comment:
      "Nosso condomínio teve uma emergência com infiltrações graves e precisávamos de capital rápido. A Credios nos atendeu num final de semana e na segunda-feira já tínhamos o dinheiro disponível. Documentação simples e atendimento excelente.",
    source: "whatsapp",
    date: "22/02/2024",
    url: "#"
  },
  {
    name: "Ana Beatriz Costa",
    role: "Administradora",
    condoName: "Conjunto Residencial Atlântico",
    location: "Salvador, BA",
    rating: 5,
    comment:
      "A implementação da portaria remota reduziu nossos custos mensais em 40%. O financiamento da Credios foi aprovado rapidamente e com parcelas que cabem no nosso orçamento sem precisar aumentar o condomínio. Recomendo a todos os condomínios!",
    source: "instagram",
    date: "10/03/2024",
    url: "#"
  },
];

// Casos de uso de crédito para condomínios
const USE_CASES: UseCase[] = [
  {
    icon: <SunIcon className="h-10 w-10" />,
    title: "Energia Solar",
    description: "Investimento em sistema fotovoltaico que gera economia imediata nas contas de energia das áreas comuns.",
    value: "Até 95% de economia",
    timeframe: "Retorno em 24-36 meses",
    color: "yellow",
  },
  {
    icon: <Paintbrush className="h-10 w-10" />,
    title: "Reforma de Fachada",
    description: "Renovação da pintura e reparos estruturais na fachada do edifício, valorizando os imóveis.",
    value: "Valorização imobiliária",
    timeframe: "Parcelamento em até 36 meses",
    color: "blue",
  },
  {
    icon: <Tablet className="h-10 w-10" />,
    title: "Portaria Remota",
    description: "Modernização do sistema de portaria com tecnologia virtual, reduzindo custos com folha de pagamento.",
    value: "Redução de até 60% nos custos",
    timeframe: "Economia mensal imediata",
    color: "purple",
  },
  {
    icon: <Columns className="h-10 w-10" />,
    title: "Modernização de Elevadores",
    description: "Atualização tecnológica ou substituição de elevadores antigos por modelos mais eficientes e seguros.",
    value: "Maior segurança e conforto",
    timeframe: "Parcelamento em até 36 meses",
    color: "teal",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Sistema de Segurança",
    description: "Instalação de câmeras, cerca elétrica, controle de acesso e outros equipamentos de segurança.",
    value: "Prevenção de ocorrências",
    timeframe: "Tranquilidade imediata",
    color: "indigo",
  },
  {
    icon: <Droplet className="h-10 w-10" />,
    title: "Impermeabilização",
    description: "Tratamento contra infiltrações em lajes, terraços, piscinas e áreas molhadas do condomínio.",
    value: "Prevenção de danos maiores",
    timeframe: "Economia com manutenções futuras",
    color: "cyan",
  },
  {
    icon: <HandCoins className="h-10 w-10" />,
    title: "Rescisões Trabalhistas",
    description: "Capital para pagamento de verbas rescisórias de funcionários sem comprometer o fluxo de caixa.",
    value: "Pagamento sem fundo de reserva",
    timeframe: "Parcelamento em até 24 meses",
    color: "red",
  },
  {
    icon: <Wrench className="h-10 w-10" />,
    title: "Manutenções Emergenciais",
    description: "Recursos para reparos urgentes em bombas d'água, geradores, sistemas elétricos e hidráulicos.",
    value: "Solução em até 48h",
    timeframe: "Tranquilidade para emergências",
    color: "orange",
  },
];

// Componente para SEO
const SEOHead = () => (
  <>
    <Head>
      <title>Crédito Para Condomínios | Financiamento com Aprovação Rápida | Credios</title>
      <meta 
        name="description" 
        content="Crédito para condomínios com aprovação em 48h e taxas a partir de 1,99% a.m. Financie energia solar, reformas e portaria remota. Sem garantias do síndico. Simule agora!" 
      />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Keywords otimizadas */}
      <meta name="keywords" content="crédito para condomínios, empréstimo para condomínios, financiamento para condomínios, crédito energia solar condomínio, reforma de fachada condomínio, portaria remota financiamento, crédito para síndicos, empréstimo condominial" />
      
      {/* Tags canônicas e idioma */}
      <link rel="canonical" href="https://credios.com.br/emprestimos/credito-para-condominios" />
      <meta property="og:locale" content="pt_BR" />
      <meta name="language" content="Portuguese" />
      
      {/* Open Graph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Crédito Para Condomínios | Financiamento com Aprovação Rápida | Credios" />
      <meta property="og:description" content="Crédito para condomínios com aprovação em 48h e taxas a partir de 1,99% a.m. Sem garantias do síndico. Simule agora!" />
      <meta property="og:url" content="https://credios.com.br/emprestimos/credito-para-condominios" />
      <meta property="og:site_name" content="Credios" />
      <meta property="og:image" content="https://credios.com.br/images/og-credito-condominios.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Crédito Para Condomínios | Financiamento com Aprovação Rápida | Credios" />
      <meta name="twitter:description" content="Crédito para condomínios com aprovação em 48h e taxas a partir de 1,99% a.m. Sem garantias do síndico. Simule agora!" />
      <meta name="twitter:image" content="https://credios.com.br/images/og-credito-condominios.jpg" />
      
      {/* Tags adicionais para SEO */}
      <meta name="author" content="Credios" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#14b8a6" />
    </Head>

    {/* Schema.org para Produto Financeiro */}
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Crédito Para Condomínios Credios",
        "description": "Soluções de financiamento para condomínios residenciais e comerciais, com foco em energia solar, reformas e modernização",
        "category": "Empréstimo Comercial",
        "offers": {
          "@type": "Offer",
          "price": "10000.00",
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2024-12-31",
          "seller": {
            "@type": "Organization",
            "name": "Credios",
            "url": "https://credios.com.br"
          }
        },
        "interestRate": {
          "@type": "QuantitativeValue",
          "value": "1.99",
          "minValue": "1.99",
          "maxValue": "2.99",
          "unitText": "PERCENT"
        },
        "loanTerm": {
          "@type": "QuantitativeValue",
          "minValue": "12",
          "maxValue": "60",
          "unitCode": "MON"
        },
        "areaServed": "BR",
        "provider": {
          "@type": "Organization",
          "name": "Credios",
          "logo": "https://credios.com.br/logo.png",
          "url": "https://credios.com.br",
          "sameAs": [
            "https://www.facebook.com/credios",
            "https://www.instagram.com/credios",
            "https://www.linkedin.com/company/credios"
          ]
        }
      }}
    />

    {/* Schema.org para FAQ */}
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }}
    />

    {/* Schema.org para Organization */}
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Credios",
        "url": "https://credios.com.br",
        "logo": "https://credios.com.br/logo.png",
        "description": "Plataforma de crédito digital especializada em soluções financeiras para condomínios",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BR"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-11-XXXX-XXXX",
          "contactType": "customer service",
          "areaServed": "BR",
          "availableLanguage": "Portuguese"
        }
      }}
    />

    {/* Schema.org para BreadcrumbList */}
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://credios.com.br"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Empréstimos",
            "item": "https://credios.com.br/emprestimos"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Crédito para Condomínios",
            "item": "https://credios.com.br/emprestimos/credito-para-condominios"
          }
        ]
      }}
    />
  </>
);

// Animações
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Hero Section para Condomínios
// Interface para o formulário de contato
interface ContactFormState {
  condoName: string;
  name: string;
  phone: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  // Estado do formulário
  const [formState, setFormState] = useState<ContactFormState>({
    condoName: "",
    name: "",
    phone: "",
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  // Handler para mudanças nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Handler para envio do formulário com FormSubmit.co
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));
    
    try {
      // Preparar dados do formulário para envio com FormSubmit
      const formSubmitData = {
        condoName: formState.condoName,
        name: formState.name,
        phone: formState.phone,
        dataHora: new Date().toLocaleString('pt-BR'),
        tipoFormulario: 'Crédito para Condomínios',
        _subject: "Nova solicitação de crédito para condomínio - Credios",
        _captcha: "false",
        _template: "table",
      };
      
      // Enviar dados para FormSubmit.co
      const response = await fetch("https://formsubmit.co/ajax/simulador@credios.com.br", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formSubmitData)
      });
      
      if (!response.ok) {
        throw new Error(`Erro no envio: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setFormState(prev => ({ 
          ...prev, 
          isSubmitting: false, 
          isSubmitted: true 
        }));
      } else {
        throw new Error(result.message || 'Falha no envio do formulário.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        error: 'Ocorreu um erro no envio do formulário. Por favor, tente novamente.' 
      }));
    }
  };
  
  return (
    <div id="formulario-contato" className="relative py-24 overflow-hidden bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50">
      {/* Elementos de fundo decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-teal-300 opacity-10 blur-3xl"></div>
        <div className="absolute top-40 -left-10 w-80 h-80 rounded-full bg-emerald-300 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-green-300 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            <motion.div variants={slideInLeft}>
              <Badge className="mb-6 bg-gradient-to-r from-teal-400 to-emerald-500 text-white py-1.5 px-6 flex items-center gap-1.5 rounded-full shadow-sm">
                <Building className="h-4 w-4" />
                <span className="font-medium">Solução financeira exclusiva para condomínios</span>
              </Badge>
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 leading-tight"
              variants={slideInLeft}
            >
              Crédito Para Condomínios
              <span className="block mt-2 bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                Aprovação Rápida e Sem Burocracia
                <span className="inline-block ml-1 relative">
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-6 max-w-xl"
              variants={slideInLeft}
            >
              <span className="font-medium">A Credios desenvolveu uma solução financeira exclusiva para condomínios,</span> entendendo as particularidades da gestão condominial. Financie energia solar, 
              reformas, portaria remota, rescisões trabalhistas e mais - sem comprometer o fluxo de caixa do seu condomínio.
            </motion.p>
            
            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl"
              variants={slideInLeft}
            >
              Taxas a partir de 1,99% a.m. com parcelas fixas 
              em até 60x e sem garantias pessoais do síndico.
            </motion.p>

            <motion.div 
              className="flex items-center gap-4 text-sm text-gray-500"
              variants={slideInLeft}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-teal-100 to-emerald-200 flex items-center justify-center text-xs font-bold text-emerald-600"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <Star fill="currentColor" className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 font-semibold">4.9/5</span>
                </div>
                <div>Mais de 500 condomínios atendidos</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 relative"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
          >
            {/* Formulário de contato */}
            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-teal-100 relative z-10 max-w-lg mx-auto"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Solicite uma simulação</h3>
              <p className="text-gray-600 mb-6">Preencha o formulário abaixo e um de nossos consultores entrará em contato em até 1 dia útil.</p>
              
              {!formState.isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="condoName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Condomínio
                    </label>
                    <input 
                      type="text" 
                      id="condoName"
                      name="condoName"
                      value={formState.condoName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ex: Condomínio Solar das Palmeiras"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Seu Nome
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ex: João Silva"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone WhatsApp
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ex: (11) 99999-9999"
                      required
                    />
                  </div>
                  
                  {formState.error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                      {formState.error}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-lg px-6 py-4 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    disabled={formState.isSubmitting}
                  >
                    {formState.isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </div>
                    ) : "Solicitar Contato"}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Ao enviar, você concorda com nossa <a href="#" className="text-teal-600 hover:underline">Política de Privacidade</a>
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Solicitação Enviada!</h4>
                  <p className="text-gray-600 mb-6">
                    Obrigado, {formState.name}! Um de nossos consultores entrará em contato com você em até 1 dia útil através do WhatsApp {formState.phone}.
                  </p>
                  <Button
                    variant="outline" 
                    className="border-teal-500 text-teal-600 hover:bg-teal-50 rounded-lg"
                    onClick={() => setFormState({
                      condoName: "",
                      name: "",
                      phone: "",
                      isSubmitting: false,
                      isSubmitted: false,
                      error: null
                    })}
                  >
                    Enviar Nova Solicitação
                  </Button>
                </div>
              )}
              
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm text-gray-600">Sem garantias do síndico</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-500" />
                  <span className="text-sm text-gray-600">100% Seguro</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Informações adicionais */}
        <div className="max-w-5xl mx-auto mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Solução Credios para Condomínios
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Desenvolvemos uma solução financeira exclusiva para condomínios brasileiros, entendendo os desafios únicos que síndicos e administradores enfrentam. Nossa proposta oferece crédito customizado para necessidades específicas como energia solar, reformas estruturais, implementação de portaria remota e muito mais - tudo com documentação simplificada e sem exigir garantias pessoais do síndico.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center p-4 bg-teal-50 rounded-xl">
                <BarChartHorizontal className="h-8 w-8 text-teal-500 mb-2" />
                <p className="font-bold text-gray-800">Taxas a partir de 1,99% a.m.</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-emerald-50 rounded-xl">
                <CalendarIcon className="h-8 w-8 text-emerald-500 mb-2" />
                <p className="font-bold text-gray-800">Parcelas em até 60x fixas</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
                <ClockIcon className="h-8 w-8 text-green-500 mb-2" />
                <p className="font-bold text-gray-800">Aprovação em até 48 horas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,53.3C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

// Componentes Reutilizáveis
const SectionHeading = ({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}) => (
  <motion.div
    className="mb-12 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={fadeIn}
  >
    {badge && (
      <Badge className="mb-4 bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 py-1.5 px-4 rounded-full shadow-sm">
        {badge}
      </Badge>
    )}
    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
      {title}
    </h2>
    <div className="h-1.5 w-24 bg-gradient-to-r from-teal-300 to-emerald-400 rounded-full mx-auto mb-4"></div>
    <p className="text-gray-600 max-w-2xl mx-auto text-lg">{description}</p>
  </motion.div>
);

// Card de vantagens com design aprimorado
const AdvantageCard = ({
  item,
  index,
}: {
  item: AdvantageItem;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const colorMap: Record<string, string> = {
    teal: "group-hover:from-teal-500 group-hover:to-teal-600",
    cyan: "group-hover:from-cyan-500 group-hover:to-cyan-600",
    purple: "group-hover:from-purple-500 group-hover:to-purple-600",
    blue: "group-hover:from-blue-500 group-hover:to-blue-600",
  };

  const accentColorKey = (item.accentColor || "teal") as keyof typeof colorMap;
  const accentColor = colorMap[accentColorKey];

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card
        className={`h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden bg-gradient-to-br ${item.backgroundColor} hover:bg-white cursor-pointer`}
      >
        {/* Efeito de glassmorphism no hover */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Overlay de cor no hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-10`}
        ></div>

        <CardHeader className="relative z-20">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
            {item.highlight && (
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-1.5 px-3 group-hover:bg-white group-hover:text-teal-600 transition-all duration-300 rounded-full shadow-sm">
                {item.highlight}
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl font-bold mt-4 group-hover:text-white transition-colors duration-300">
            {item.title}
          </CardTitle>
          <CardDescription className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
            {item.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-20">
          {item.stats && (
            <div className="grid grid-cols-1 gap-3 mt-3">
              {item.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/90 p-3 rounded-lg group-hover:bg-white/20 transition-all duration-300 shadow-sm"
                >
                  <p className="text-2xl font-bold text-teal-600 group-hover:text-white transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="relative z-20">
          {item.action && item.actionUrl && (
            <Link href={item.actionUrl} className="w-full">
              <Button 
                variant="ghost" 
                className="text-teal-600 hover:text-teal-700 group-hover:text-white font-medium cursor-pointer flex items-center gap-1 w-full justify-between hover:bg-transparent transition-all duration-300 rounded-lg"
                aria-label={item.action}
              >
                <span>{item.action}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Carrossel de depoimentos de condomínios
const TestimonialCarousel = () => {
  const [position, setPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (carouselRef.current) {
      const items = carouselRef.current.querySelectorAll(".testimonial-item");
      if (items.length > 0) setItemWidth(items[0].clientWidth + 16);
    }

    // Animação do carrossel com pausa no hover
    const interval = setInterval(() => {
      if (!isPaused) {
        setPosition((prev) => {
          const newPos = prev - 1;
          const resetPoint = -(itemWidth * TESTIMONIALS.length);
          return newPos <= resetPoint ? 0 : newPos;
        });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [itemWidth, isPaused]);

  const renderStars = (rating: number) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill={i < rating ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ));

  // Componente para renderizar o ícone correto da plataforma com o nome
  const SocialSourceDisplay = ({ source, className = "" }: { source: string, className?: string }) => {
    switch (source) {
      case 'whatsapp':
        return (
          <div className={`flex items-center gap-1.5 ${className}`}>
            <WhatsApp className="h-5 w-5" />
            <span className="text-xs italic">via WhatsApp</span>
          </div>
        );
      case 'instagram':
        return (
          <div className={`flex items-center gap-1.5 ${className}`}>
            <Instagram className="h-5 w-5 text-pink-500" />
            <span className="text-xs italic">via Instagram</span>
          </div>
        );
      case 'facebook':
        return (
          <div className={`flex items-center gap-1.5 ${className}`}>
            <Facebook className="h-5 w-5 text-blue-500" />
            <span className="text-xs italic">via Facebook</span>
          </div>
        );
      case 'google':
        return (
          <div className={`flex items-center gap-1.5 ${className}`}>
            <Google className="h-5 w-5" />
            <span className="text-xs italic">via Google</span>
          </div>
        );
      default:
        return null;
    }
  };

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="relative py-6">
      <div 
        className="overflow-hidden" 
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-300 ease-linear"
          style={{ transform: `translateX(${position}px)` }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="testimonial-item px-2"
              style={{ minWidth: "320px" }}
            >
              <Card className="h-full border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 text-white flex items-center justify-center font-bold relative overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                        {testimonial.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .substring(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-base font-medium text-gray-800">
                          {testimonial.name}
                          {testimonial.role && (
                            <Badge variant="outline" className="ml-1 text-xs bg-teal-50 text-teal-700 border-teal-200">
                              {testimonial.role}
                            </Badge>
                          )}
                        </div>
                        {testimonial.condoName && (
                          <div className="text-xs font-medium text-gray-600">{testimonial.condoName}</div>
                        )}
                        <CardDescription className="text-xs flex items-center gap-1">
                          <AtSign className="h-3 w-3 text-gray-400" />
                          {testimonial.location}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm italic">&quot;{testimonial.comment}&quot;</p>
                </CardContent>
                <CardFooter className="text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t pt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <SocialSourceDisplay source={testimonial.source} />
                    <ApprovedBadge />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{testimonial.date}</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Controles de navegação */}
      <div className="flex justify-center gap-1 mt-6">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === Math.abs(position) % TESTIMONIALS.length ? 'bg-teal-500 w-6' : 'bg-gray-300'}`}
            onClick={() => setPosition(-index * itemWidth)}
            aria-label={`Ver depoimento ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Como funciona com design melhorado
const HowItWorksSection = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50 relative overflow-hidden" id="como-funciona">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-200 opacity-10 blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-teal-200 opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title="Como Funciona o Crédito Para Condomínios"
          description="Um processo simplificado, pensado especialmente para as necessidades específicas dos condomínios."
          badge="Passo a Passo"
        />
        <div className="max-w-4xl mx-auto space-y-8">
          {HOW_IT_WORKS.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Linha conectora entre os passos */}
              {index < HOW_IT_WORKS.length - 1 && (
                <div className="absolute top-16 bottom-0 left-6 w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-teal-400 to-emerald-400 z-0"></div>
              )}
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-teal-100 relative z-10 hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    {step.duration && (
                      <div className="mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <Clock className="h-3 w-3" />
                        {step.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                      <span className="text-emerald-500 mr-2">{index + 1}.</span>
                      {step.title}
                    </h4>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                    {step.details && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.details.map((detail, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg group-hover:bg-teal-50 transition-colors"
                          >
                            <CheckCircle2 className="h-4 w-4 text-teal-500 group-hover:scale-110 transition-transform" /> 
                            <span className="group-hover:text-gray-700 transition-colors">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Elemento final do processo */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 px-6 rounded-full flex items-center gap-2 shadow-lg">
              <ThumbsUp className="h-5 w-5" />
              <span className="font-medium">Pronto! Seu condomínio com o crédito que precisa</span>
            </div>
          </motion.div>
        </div>
        
        {/* CTA dentro da seção */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link href="#formulario-contato">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              aria-label="Simular crédito para condomínio agora"
            >
              Simular Crédito Para Meu Condomínio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Processo 100% digital | Documentação simplificada | Aprovação rápida
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Casos de uso para condomínios
const UseCasesSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Onde Usar o Crédito no Seu Condomínio"
          description="Diversas possibilidades para utilizar o financiamento de acordo com as necessidades específicas do seu condomínio."
          badge="Aplicações"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.05,
                delayChildren: 0.1
              }
            }
          }}
        >
          {USE_CASES.map((useCase, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              className="h-full"
            >
              <Card className="hover:shadow-lg transition-all duration-300 h-full border bg-white flex flex-col">
                <CardHeader className={`rounded-t-lg bg-${useCase.color}-50 border-b border-${useCase.color}-100`}>
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-full bg-${useCase.color}-100 text-${useCase.color}-600 flex items-center justify-center`}>
                      {useCase.icon}
                    </div>
                  </div>
                  <CardTitle className="text-center text-lg mt-4 text-gray-800">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-grow">
                  <p className="text-sm text-gray-600 mb-4">{useCase.description}</p>
                  <div className="space-y-3">
                    {useCase.value && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-gray-700">{useCase.value}</span>
                      </div>
                    )}
                    {useCase.timeframe && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-600">{useCase.timeframe}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-xl mx-auto mb-6"
          >
            Estas são apenas algumas das aplicações mais comuns. O crédito pode ser utilizado 
            para qualquer necessidade do condomínio, desde que aprovado em assembleia.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="#formulario-contato">
              <Button
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-full px-6 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Simular Crédito Para Meu Condomínio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// FAQ com schema markup
const FAQSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Dúvidas Sobre Crédito Para Condomínios"
          description="Resposta para as perguntas mais frequentes de síndicos e administradores sobre nossas soluções financeiras."
          badge="Perguntas Frequentes"
        />
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  data-faq-item
                >
                  <AccordionTrigger className="px-5 py-4 hover:bg-teal-50 cursor-pointer group accordion-trigger">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <span className="text-base font-medium text-gray-800 group-hover:text-gray-900">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-1 text-gray-600 bg-gradient-to-r from-teal-50/50 to-white">
                    <div className="flex gap-3">
                      <div className="w-6 flex-shrink-0"></div>
                      <div>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
          
          {/* Suporte para condomínios */}
          <motion.div
            className="mt-8 p-4 border border-dashed border-teal-300 rounded-xl bg-teal-50 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Building className="h-6 w-6 text-teal-500 mx-auto mb-2" />
            <p className="text-teal-700 font-medium">Ainda tem dúvidas sobre crédito para condomínios?</p>
            <p className="text-teal-600 text-sm mt-1 mb-3">Nossa equipe especializada em crédito para condomínios está disponível agora</p>
            <Link href="/contato-condominios">
              <Button 
                variant="outline" 
                className="border-teal-400 text-teal-600 hover:bg-teal-100 rounded-full transition-colors cursor-pointer"
                aria-label="Entrar em contato com um especialista em crédito para condomínios"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Falar com um Especialista
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Seção de depoimentos
const TestimonialsSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-teal-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-200 opacity-10 blur-3xl"></div>
      <div className="absolute -top-20 -left-40 w-80 h-80 rounded-full bg-teal-200 opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Histórias Reais"
          title="O Que Dizem Nossos Clientes Condomínios"
          description="Confira como ajudamos diversos condomínios a modernizarem suas instalações e solucionarem emergências financeiras."
        />
        <TestimonialCarousel />
      </div>
    </div>
  );
};

// Estatísticas sobre condomínios no Brasil
const StatsSection = () => (
  <div className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <SectionHeading
        title="Condomínios no Brasil: Desafios e Oportunidades"
        description="Entenda a importância das soluções financeiras para o setor condominial brasileiro."
        badge="Dados Importantes"
      />

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
      >
        {[
          { 
            value: "450 mil", 
            label: "Condomínios no Brasil", 
            icon: <Building className="h-6 w-6" />,
            color: "teal", 
            description: "Segundo dados do SECOVI"
          },
          { 
            value: "R$ 60 bilhões", 
            label: "Mercado Condominial Anual", 
            icon: <Wallet className="h-6 w-6" />,
            color: "emerald",
            description: "Movimentação financeira" 
          },
          { 
            value: "74%", 
            label: "Energia nas Despesas", 
            icon: <SunIcon className="h-6 w-6" />,
            color: "yellow",
            description: "Potencial de economia" 
          },
          { 
            value: "95%", 
            label: "Taxa de Aprovação", 
            icon: <BadgeCheck className="h-6 w-6" />,
            color: "green",
            description: "Na Credios para condomínios" 
          },
        ].map((stat, index) => (
          <motion.div 
            key={index}
            variants={fadeIn}
            className={`bg-${stat.color}-50 rounded-xl border border-${stat.color}-100 p-5 shadow-sm hover:shadow-md transition-all group`}
          >
            <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center mx-auto mb-3 text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div className="text-center">
              <div className={`text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-${stat.color}-600 transition-colors mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-700 mb-2">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fonte das informações */}
      <div className="text-center mt-8 text-sm text-gray-500">
        Fonte: SECOVI, ABRASIP e Pesquisa de Mercado Condominial (2024)
      </div>
    </div>
  </div>
);

// CTA Final aprimorado
const FinalCTA = () => (
  <div className="py-20 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 relative overflow-hidden">
    {/* Elementos decorativos */}
    <div className="absolute top-0 left-0 w-full h-10 bg-[url('/images/wave-pattern.svg')] bg-repeat-x opacity-10"></div>
    <div className="absolute bottom-0 left-0 w-full h-10 bg-[url('/images/wave-pattern.svg')] bg-repeat-x opacity-10 transform rotate-180"></div>
    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-300 opacity-20 blur-3xl"></div>
    <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-teal-300 opacity-20 blur-3xl"></div>
    
    <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white/10 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-white/20"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-white/20 text-white py-1.5 px-4 backdrop-blur-sm">
            MODERNIZE SEU CONDOMÍNIO
          </Badge>
        </motion.div>
        
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="block mb-2">Invista no Futuro</span>
          <span className="text-5xl md:text-6xl text-yellow-300 drop-shadow-md">Do Seu Condomínio</span>
        </motion.h3>
        
        <motion.p
          className="text-white/90 mb-8 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Mais de <span className="font-bold underline decoration-yellow-300">500 condomínios</span> já 
          modernizaram suas instalações com o crédito da Credios. Tenha acesso a soluções financeiras 
          <span className="font-bold"> sob medida</span> para as necessidades do seu condomínio, sem burocracia 
          e com aprovação rápida.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
            <div className="flex items-center gap-3 text-white">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-teal-500 bg-white flex items-center justify-center text-xs font-bold text-teal-500"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">15 condomínios aprovados</p>
                <p className="text-xs opacity-80">nos últimos 30 dias</p>
              </div>
            </div>
          </div>
          
          <Link href="#formulario-contato">
            <Button
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-10 py-7 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-bold flex items-center gap-2 cursor-pointer"
              aria-label="Simular crédito para condomínio agora"
            >
              <span>Simule Seu Crédito Agora</span>
              <motion.div 
                animate={{ 
                  x: [0, 5, 0],
                  transition: { repeat: Infinity, duration: 1.5 }
                }}
              >
                <ArrowRight className="h-6 w-6" />
              </motion.div>
            </Button>
          </Link>
          
          <div className="mt-6 flex items-center justify-center gap-3 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-yellow-300" />
              <span>Aprovação em 48h</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-yellow-300" />
              <span>Taxas a partir de 1,99%</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-yellow-300" />
              <span>Parcelas em até 60x</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
);