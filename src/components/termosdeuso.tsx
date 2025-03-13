"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Check, AlertCircle, Mail, Building, BookOpen } from 'lucide-react';

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

// Componente para definições
const DefinitionItem: React.FC<{ term: string; description: string }> = ({ term, description }) => {
  return (
    <div className="mb-3">
      <p className="font-medium text-slate-800">{term}</p>
      <p className="text-slate-600 pl-4">{description}</p>
    </div>
  );
};

const TermosDeUso: React.FC = () => {
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
              <FileText className="w-4 h-4 mr-2" />
              Termos de Uso
            </span>
          </motion.div>
          
          {/* Título e subtítulo */}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4"
          >
            Termos de Uso
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Condições para utilização do nosso site e serviços
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
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-slate-800">Bem-vindo à Credios!</h2>
            </div>
            
            <Paragraph>
              Estes Termos de Uso descrevem as condições para utilização do nosso site e serviços. 
              Ao acessar ou utilizar nossos serviços, você concorda com os termos abaixo. 
              Caso não concorde, pedimos que interrompa o uso do site.
            </Paragraph>
            
            <SectionTitle>
              1. Aceitação dos Termos
            </SectionTitle>
            <Paragraph>
              Ao acessar o site da Credios, você declara que leu, entendeu e concorda com estes 
              Termos de Uso e com nossa Política de Privacidade.
            </Paragraph>
            
            <SectionTitle>
              2. Definições
            </SectionTitle>
            <div className="mb-6">
              <DefinitionItem 
                term="Credios:" 
                description="Refere-se à Credios Serviços Ltda, CNPJ 55.986.282/0001-30, responsável pela plataforma." 
              />
              <DefinitionItem 
                term="Usuário:" 
                description="Pessoa física ou jurídica que acessa e utiliza os serviços disponibilizados no site." 
              />
              <DefinitionItem 
                term="Serviços:" 
                description="Produtos financeiros, como crédito consignado e antecipação de FGTS, oferecidos pela Credios." 
              />
            </div>
            
            <SectionTitle>
              3. Uso do Site e Serviços
            </SectionTitle>
            <Paragraph>
              Você concorda em utilizar o site e os serviços da Credios de forma responsável, 
              observando as leis aplicáveis e os seguintes compromissos:
            </Paragraph>
            <BulletList 
              items={[
                "Fornecer informações verdadeiras, precisas e completas ao preencher formulários ou solicitações.",
                "Não utilizar o site para qualquer atividade ilícita ou que viole direitos de terceiros.",
                "Não realizar práticas que possam comprometer o funcionamento do site ou causar danos à Credios ou a outros usuários."
              ]}
            />
            
            <SectionTitle>
              4. Serviços Oferecidos
            </SectionTitle>
            <Paragraph>
              A Credios oferece soluções financeiras, incluindo crédito consignado e antecipação de FGTS, 
              de forma totalmente digital. Os termos específicos de cada serviço, como taxas de juros e 
              prazos de pagamento, serão detalhados no momento da contratação.
            </Paragraph>
            
            <SectionTitle>
              5. Limitação de Responsabilidade
            </SectionTitle>
            <Paragraph>
              A Credios se esforça para garantir que as informações no site sejam precisas e atualizadas. 
              No entanto, não nos responsabilizamos por:
            </Paragraph>
            <BulletList 
              items={[
                "Erros ou omissões no conteúdo.",
                "Interrupções ou falhas técnicas no site.",
                "Decisões financeiras tomadas com base nas informações fornecidas no site."
              ]}
            />
            
            <SectionTitle>
              6. Propriedade Intelectual
            </SectionTitle>
            <Paragraph>
              Todo o conteúdo do site, incluindo textos, imagens, logotipos e gráficos, é de propriedade 
              da Credios ou de seus licenciantes, e está protegido por leis de direitos autorais e 
              propriedade intelectual. O uso não autorizado desses materiais é estritamente proibido.
            </Paragraph>
            
            <SectionTitle>
              7. Modificações nos Termos
            </SectionTitle>
            <Paragraph>
              A Credios reserva-se o direito de alterar ou atualizar estes Termos de Uso a qualquer momento. 
              Recomendamos que você revise esta página periodicamente. O uso contínuo do site após 
              alterações constitui sua aceitação dos novos termos.
            </Paragraph>
            
            <SectionTitle>
              8. Rescisão de Acesso
            </SectionTitle>
            <Paragraph>
              Podemos suspender ou encerrar seu acesso ao site ou aos serviços caso haja violação 
              destes Termos de Uso, sem aviso prévio.
            </Paragraph>
          </div>
        </motion.div>
        
        {/* Conclusão e contato */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-3xl mx-auto bg-blue-50 rounded-xl p-6 shadow-md border border-blue-100 mb-8"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Conclusão</h2>
            <p className="text-slate-700 mb-4">
              Estes Termos de Uso são importantes para garantir uma experiência segura e transparente. 
              A Credios se compromete a oferecer um serviço de qualidade, sempre respeitando seus direitos como usuário.
            </p>
          </div>
        </motion.div>
        
        {/* Contato */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Contato</h2>
          <p className="text-slate-600 mb-2">
            Para dúvidas ou esclarecimentos sobre estes Termos de Uso, entre em contato conosco pelo e-mail:
          </p>
          <a 
            href="mailto:suporte@credios.com.br" 
            className="text-blue-600 font-medium hover:text-blue-800 flex items-center justify-center"
          >
            <Mail className="w-4 h-4 mr-2" /> 
            suporte@credios.com.br
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

export default TermosDeUso;