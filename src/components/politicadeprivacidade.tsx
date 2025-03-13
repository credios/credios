"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Mail, Shield, Lock, FileText, AlertCircle, Bell } from 'lucide-react';

// Componente para títulos de seção
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4 mt-8">
      {children}
    </h2>
  );
};

// Componente para parágrafos
const Paragraph: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <p className={`mb-4 text-slate-700 leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

// Componente para listas
const BulletList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <ul className="list-disc pl-6 mb-6 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-slate-700">
          {item}
        </li>
      ))}
    </ul>
  );
};

const PoliticaDePrivacidade: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/10 to-blue-50/20 py-16 md:py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-blue-grid [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-10"></div>
      
      {/* Elementos decorativos com animação */}
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-300/10 to-purple-300/20 blur-3xl"
      ></motion.div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Cabeçalho da página */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          {/* Badge */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium text-sm border border-blue-200/50 shadow-sm">
              <Shield className="w-4 h-4 mr-2" />
              Política de Privacidade
            </span>
          </motion.div>
          
          {/* Título e subtítulo */}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4"
          >
            Política de Privacidade
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Seu compromisso com a proteção e transparência no uso dos seus dados.
          </motion.p>
        </motion.div>
        
        {/* Conteúdo */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md border border-slate-100 mb-12"
        >
          <div className="prose prose-slate max-w-none">
            <Paragraph>
              Na Credios, sua privacidade é uma prioridade. Estamos comprometidos em proteger os dados pessoais 
              que você compartilha conosco e em garantir total transparência sobre como essas informações são usadas.
            </Paragraph>
            
            <SectionTitle>
              1. Coleta de Informações
            </SectionTitle>
            <Paragraph>
              Ao utilizar nossos serviços, podemos coletar os seguintes dados:
            </Paragraph>
            <BulletList 
              items={[
                "Informações pessoais, como nome, CPF e endereço de e-mail.",
                "Informações financeiras necessárias para a análise de crédito.",
                "Dados de navegação, como endereço IP, tipo de dispositivo e páginas visitadas."
              ]}
            />
            
            <SectionTitle>
              2. Uso das Informações
            </SectionTitle>
            <Paragraph>
              As informações coletadas são utilizadas para:
            </Paragraph>
            <BulletList 
              items={[
                "Processar solicitações de crédito e outros serviços financeiros.",
                "Melhorar a experiência do usuário em nosso site e plataforma digital.",
                "Enviar comunicações relevantes sobre nossos serviços, ofertas e atualizações."
              ]}
            />
            
            <SectionTitle>
              3. Compartilhamento de Informações
            </SectionTitle>
            <Paragraph>
              Compartilhamos seus dados apenas quando necessário, com:
            </Paragraph>
            <BulletList 
              items={[
                "Instituições financeiras parceiras, para análise de crédito e oferta de produtos.",
                "Provedores de serviços terceirizados que auxiliam na operação do site.",
                "Autoridades regulatórias, conforme exigido por lei."
              ]}
            />
            
            <SectionTitle>
              4. Segurança dos Dados
            </SectionTitle>
            <Paragraph>
              Adotamos medidas de segurança técnicas e organizacionais para proteger suas informações contra 
              acesso não autorizado, alteração ou destruição.
            </Paragraph>
            
            <SectionTitle>
              5. Direitos dos Usuários
            </SectionTitle>
            <Paragraph>
              Você tem o direito de:
            </Paragraph>
            <BulletList 
              items={[
                "Acessar os dados pessoais que temos sobre você.",
                "Solicitar a correção ou exclusão de dados, quando aplicável.",
                "Revogar o consentimento para o uso de suas informações pessoais."
              ]}
            />
            
            <SectionTitle>
              6. Cookies e Tecnologias Semelhantes
            </SectionTitle>
            <Paragraph>
              Utilizamos cookies para personalizar sua experiência e coletar informações de navegação.
            </Paragraph>
            
            <SectionTitle>
              7. Alterações nesta Política
            </SectionTitle>
            <Paragraph>
              Podemos atualizar esta política periodicamente. Qualquer alteração será comunicada por meio de nosso site.
            </Paragraph>
          </div>
        </motion.div>
        
        {/* Contato */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Entre em Contato</h2>
          <p className="text-slate-600 mb-2">
            Para dúvidas ou solicitações relacionadas à privacidade, entre em contato pelo e-mail:
          </p>
          <a 
            href="mailto:privacidade@credios.com.br" 
            className="text-blue-600 font-medium hover:text-blue-800 flex items-center justify-center"
          >
            <Mail className="w-4 h-4 mr-2" /> 
            privacidade@credios.com.br
          </a>
        </motion.div>
      </div>
      
      {/* Estilos */}
      <style jsx global>{`
        .bg-blue-grid {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%234285F4' stroke-opacity='0.15' stroke-width='1'%3E%3Crect width='100' height='100' x='0' y='0' rx='2'/%3E%3Cpath d='M0 25h100M0 50h100M0 75h100M25 0v100M50 0v100M75 0v100'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
};

export default PoliticaDePrivacidade;