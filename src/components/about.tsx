"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Building, 
  Award, 
  CheckCircle, 
  Calendar, 
  BarChart, 
  Heart,
  LightbulbIcon,
  Handshake,
  Smartphone
} from 'lucide-react';

// Componente para títulos com gradiente
const GradientTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <h2 className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 ${className}`}>
      {children}
    </h2>
  );
};

// Componente para seções
const Section: React.FC<{ 
  title: string; 
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ title, subtitle, icon, children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      className={`mb-16 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <GradientTitle className="text-2xl md:text-3xl mb-1">{title}</GradientTitle>
          {subtitle && <p className="text-slate-600">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
};

// Componente para cards de valores
const ValueCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}> = ({ title, description, icon, delay }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-md border border-slate-100 flex flex-col"
    >
      <div className="flex items-center mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3">
          {icon}
        </div>
        <h3 className="font-bold text-xl text-slate-800">{title}</h3>
      </div>
      <p className="text-slate-600">{description}</p>
    </motion.div>
  );
};

// Componente para cards de produtos
const ProductCard: React.FC<{
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  action: string;
  delay: number;
  href: string;
}> = ({ title, description, features, icon, action, delay, href }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-6 shadow-md border border-slate-100 h-full"
    >
      <div className="flex items-center mb-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mr-3">
          {icon}
        </div>
        <h3 className="font-bold text-xl text-slate-800">{title}</h3>
      </div>
      <p className="text-slate-600 mb-4">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={href}>
        <Button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg">
          {action}
        </Button>
      </Link>
    </motion.div>
  );
};

// Componente para um marco na timeline
const TimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
  delay: number;
}> = ({ year, title, description, delay }) => {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="relative pl-10 pb-10 border-l-2 border-blue-200 last:border-transparent last:pb-0"
    >
      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
      <div className="font-bold text-blue-600 text-lg">{year}</div>
      <h3 className="font-bold text-slate-800 text-xl mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </motion.div>
  );
};

const SobreCredios: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-blue-50/50 py-16 md:py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-blue-grid [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-20"></div>
      
      {/* Elementos decorativos com animação */}
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-300/20 to-purple-300/30 blur-3xl"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1
        }}
        className="absolute -bottom-24 -left-24 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 blur-3xl"
      ></motion.div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Cabeçalho da página */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          {/* Badge */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium text-sm border border-blue-200/50 shadow-sm">
              <Building className="w-4 h-4 mr-2" />
              Sobre a Credios
            </span>
          </motion.div>
          
          {/* Título e subtítulo */}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight mb-4"
          >
            Democratizando o acesso ao crédito no Brasil
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            A Credios nasceu para transformar a forma como os brasileiros acessam crédito, 
            oferecendo soluções financeiras inovadoras, transparentes e inclusivas.
          </motion.p>
        </motion.div>
        
        {/* Quem somos */}
        <Section 
          title="Quem Somos" 
          icon={<Building className="w-5 h-5" />}
          delay={0.7}
        >
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-slate-100 max-w-3xl mx-left">
            <p className="text-slate-700 mb-4">
              A Credios é uma plataforma de crédito digital focada em empréstimos pessoais que 
              atua como correspondente bancário, comercializando produtos de instituições 
              financeiras consolidadas no mercado brasileiro.
            </p>
            <p className="text-slate-700 mb-4">
              Fundada com a missão de simplificar o acesso ao crédito, especialmente para 
              brasileiros de classe C, D e E, a Credios utiliza tecnologia avançada para 
              oferecer um processo totalmente digital, rápido e sem burocracia - disponível 
              24 horas por dia, 7 dias por semana.
            </p>
            <p className="text-slate-700">
              Nossa plataforma permite que o cliente faça toda a contratação de forma 
              rápida e segura diretamente pelo celular, recebendo seu crédito em poucas horas. 
              Acreditamos que o acesso a soluções financeiras justas e transparentes é um 
              direito de todos os brasileiros.
            </p>
          </div>
        </Section>
        
        {/* Missão, Visão e Valores */}
        <Section 
          title="Nossa Missão, Visão e Valores" 
          icon={<Award className="w-5 h-5" />}
          delay={0.9}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard 
              title="Missão" 
              description="Democratizar o acesso ao crédito no Brasil, proporcionando soluções financeiras acessíveis e inclusivas, mesmo para quem enfrenta restrições no sistema financeiro tradicional."
              icon={<LightbulbIcon className="w-5 h-5" />}
              delay={1.0}
            />
            <ValueCard 
              title="Visão" 
              description="Ser reconhecida como a principal plataforma digital de crédito inclusivo do Brasil, transformando positivamente a vida financeira de milhões de brasileiros."
              icon={<BarChart className="w-5 h-5" />}
              delay={1.1}
            />
            <ValueCard 
              title="Valores" 
              description="Transparência, acessibilidade, inovação, simplicidade e foco no cliente são os princípios que guiam todas as nossas decisões e ações."
              icon={<Heart className="w-5 h-5" />}
              delay={1.2}
            />
          </div>
        </Section>
        
        {/* Nossos Produtos */}
        <Section 
          title="Nossos Produtos" 
          subtitle="Soluções financeiras acessíveis para todos os brasileiros"
          icon={<ShieldCheck className="w-5 h-5" />}
          delay={1.3}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductCard 
              title="Empréstimo na Conta de Luz" 
              description="Uma solução inovadora que utiliza sua fatura de energia elétrica como garantia, disponibilizando crédito mesmo para quem possui restrições."
              features={[
                "Até R$ 3.300 em crédito",
                "Sem consulta ao SPC/Serasa",
                "Parcelas incluídas na conta de luz",
                "Contratação 100% digital",
                "Aprovação rápida sem burocracia"
              ]}
              icon={<Zap className="w-6 h-6" />}
              action="Saiba mais sobre o Empréstimo na Conta de Luz"
              delay={1.4}
              href="/emprestimo-na-conta-de-luz"
            />
            <ProductCard 
              title="Empréstimo FGTS" 
              description="Antecipe seu saque-aniversário do FGTS com as melhores taxas do mercado, comparando ofertas de diversos bancos parceiros em um só lugar."
              features={[
                "Simulação entre diversos bancos",
                "Melhores taxas garantidas",
                "Crédito no PIX em minutos",
                "Contratação 100% digital",
                "Parcelas descontadas do FGTS"
              ]}
              icon={<Calendar className="w-6 h-6" />}
              action="Saiba mais sobre o Empréstimo FGTS"
              delay={1.5}
              href="/emprestimo-fgts"
            />
          </div>
        </Section>
        
        {/* Diferenciais */}
        <Section 
          title="Nossos Diferenciais" 
          icon={<Award className="w-5 h-5" />}
          delay={1.6}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md border border-slate-100"
            >
              <h3 className="font-bold text-xl text-slate-800 mb-3 flex items-center">
                <Smartphone className="w-5 h-5 text-blue-600 mr-2" />
                100% Digital
              </h3>
              <p className="text-slate-600">
                Todo o processo de solicitação, análise e contratação é realizado digitalmente, 
                sem necessidade de deslocamento ou impressão de documentos. Basta ter um 
                smartphone para acessar nossos serviços a qualquer hora do dia ou da noite.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md border border-slate-100"
            >
              <h3 className="font-bold text-xl text-slate-800 mb-3 flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                Rapidez e Simplicidade
              </h3>
              <p className="text-slate-600">
                Processos simplificados e análise automatizada que permitem aprovação em 
                minutos e liberação do crédito em até 24 horas. Acreditamos que burocracia 
                excessiva não deveria ser um obstáculo para quem precisa de crédito.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md border border-slate-100"
            >
              <h3 className="font-bold text-xl text-slate-800 mb-3 flex items-center">
                <ShieldCheck className="w-5 h-5 text-blue-600 mr-2" />
                Crédito Inclusivo
              </h3>
              <p className="text-slate-600">
                Desenvolvemos produtos que possibilitam acesso ao crédito mesmo para pessoas 
                que enfrentam restrições no sistema financeiro tradicional, como negativados 
                ou pessoas sem comprovação de renda formal.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md border border-slate-100"
            >
              <h3 className="font-bold text-xl text-slate-800 mb-3 flex items-center">
                <Handshake className="w-5 h-5 text-blue-600 mr-2" />
                Parceria com Instituições Sólidas
              </h3>
              <p className="text-slate-600">
                Trabalhamos em parceria com instituições financeiras consolidadas no mercado, 
                garantindo a segurança e conformidade de todas as nossas operações, sempre 
                de acordo com as regulamentações do Banco Central do Brasil.
              </p>
            </motion.div>
          </div>
        </Section>
        
        {/* Nossa História */}
        <Section 
          title="Nossa Trajetória" 
          subtitle="Conheça os marcos importantes da história da Credios"
          icon={<Clock className="w-5 h-5" />}
          delay={2.1}
        >
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-slate-100">
            <div className="max-w-3xl ml-4">
              <TimelineItem 
                year="2020" 
                title="Fundação da Credios" 
                description="Nascemos com a missão de revolucionar o mercado de crédito, focando em soluções digitais para brasileiros com acesso limitado ao sistema financeiro tradicional."
                delay={2.2}
              />
              <TimelineItem 
                year="2021" 
                title="Lançamento do Empréstimo na Conta de Luz" 
                description="Lançamos nosso produto pioneiro em parceria com a Crefaz, possibilitando empréstimos utilizando a fatura de energia como garantia."
                delay={2.3}
              />
              <TimelineItem 
                year="2022" 
                title="Expansão para Novos Estados" 
                description="Ampliamos nossa atuação para 9 estados brasileiros, atingindo milhares de clientes com nossas soluções de crédito inclusivo."
                delay={2.4}
              />
              <TimelineItem 
                year="2023" 
                title="Lançamento do Empréstimo FGTS" 
                description="Incluímos em nosso portfólio a antecipação do saque-aniversário do FGTS, com um sistema inovador de comparação de taxas entre diversos bancos."
                delay={2.5}
              />
              <TimelineItem 
                year="Hoje" 
                title="Impacto Nacional" 
                description="Seguimos crescendo, inovando e transformando a vida financeira de brasileiros em todo o país, com mais de 10.000 clientes atendidos e 97% de satisfação."
                delay={2.6}
              />
            </div>
          </div>
        </Section>
        
        {/* CTA Final */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-white rounded-xl p-8 shadow-lg border border-blue-100 mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Faça parte da transformação financeira
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Conheça nossas soluções de crédito e descubra como a Credios pode ajudar você 
            a conquistar seus objetivos financeiros com simplicidade e segurança.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/emprestimo-na-conta-de-luz">
              <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 h-12 font-medium rounded-xl shadow-md flex items-center justify-center">
                <Zap className="mr-2 h-5 w-5" />
                <span>Empréstimo na Conta de Luz</span>
              </Button>
            </Link>
            <Link href="/emprestimo-fgts">
              <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 h-12 font-medium rounded-xl shadow-md flex items-center justify-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>Empréstimo FGTS</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Estilos */}
      <style jsx global>{`
        .bg-blue-grid {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%234285F4' stroke-opacity='0.15' stroke-width='1'%3E%3Crect width='100' height='100' x='0' y='0' rx='2'/%3E%3Cpath d='M0 25h100M0 50h100M0 75h100M25 0v100M50 0v100M75 0v100'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
          50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.4); }
        }
        
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default SobreCredios;