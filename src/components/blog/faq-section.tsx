// components/blog/faq-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const faqs = [
    {
      question: "Como funciona o empréstimo na conta de luz?",
      answer: "É um empréstimo que utiliza sua fatura de energia como garantia. As parcelas são incluídas diretamente na sua conta de luz mensal, facilitando o pagamento."
    },
    {
      question: "Preciso comprovar renda para contratar?",
      answer: "Não é necessário comprovar renda para o empréstimo na conta de luz. Basta ser o titular da conta de energia."
    },
    {
      question: "Quanto posso solicitar de empréstimo?",
      answer: "Você pode solicitar até R$ 3.300,00 pelo empréstimo na conta de luz, dependendo da sua análise de crédito."
    },
    {
      question: "Em quanto tempo o dinheiro cai na conta?",
      answer: "Após a aprovação, o dinheiro é depositado em sua conta em até 1 dia útil, podendo ser ainda mais rápido via PIX."
    }
  ];
  
  return (
    <div className="mb-20">
      <div className="text-center mb-10">
        {/* Título com ícone decorativo */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-pale flex items-center justify-center">
              <HelpCircle size={18} className="text-blue-primary" />
            </div>
            <h2 className="text-2xl font-bold text-blue-dark">Perguntas Frequentes</h2>
          </div>
        </div>
        <p className="text-gray-text max-w-2xl mx-auto">
          Tire suas dúvidas sobre empréstimos, crédito pessoal e finanças
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full border border-gray-medium/30 hover:border-blue-light/50 transition-colors shadow-sm hover:shadow-md">
              <CardHeader className="border-b border-gray-medium/20 bg-gray-light/80">
                <div className="flex items-center gap-3">
                  {/* Indicador numérico com fundo laranja */}
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-pale flex items-center justify-center text-orange-dark font-semibold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-lg text-blue-dark">{faq.question}</h3>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-text">{faq.answer}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Botão "Ver mais perguntas" */}
      <div className="flex justify-center mt-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a href="/perguntas-frequentes" className="inline-flex items-center px-5 py-2.5 rounded-full text-blue-primary hover:text-blue-dark bg-blue-pale hover:bg-blue-pale/70 transition-colors font-medium">
            Ver mais perguntas frequentes
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}