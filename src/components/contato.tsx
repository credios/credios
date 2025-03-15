"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, Send, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Exemplo de implementação do FormSubmit.co seguindo a mesma lógica utilizada em herofgts.tsx
 * para enviar o formulário de contato diretamente para o seu e-mail.
 */
const Contato: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    mensagem: "",
    aceito: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      aceito: e.target.checked,
    }));
  };

  /**
   * Handler principal: ao enviar o formulário, chamamos o endpoint do FormSubmit.co,
   * passando os dados em formato JSON para envio de email automático.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Monta os dados adicionais do FormSubmit
    const formSubmitData = {
      ...formData,
      dataHora: new Date().toLocaleString("pt-BR"),
      _subject: "Novo contato - Credios",
      _captcha: "false",
      _template: "table",
      _replyto: "noreply@credios.com.br", // Ajuste conforme desejado
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/contato@credios.com.br", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formSubmitData),
      });

      // Verifica sucesso
      if (!response.ok) {
        throw new Error(`Erro no envio: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error("Falha no envio do formulário.");
      }

      // Se deu tudo certo, limpa campos e exibe mensagem de sucesso
      setSubmitSuccess(true);
      setFormData({
        nome: "",
        telefone: "",
        mensagem: "",
        aceito: false,
      });

      // Remove a mensagem de sucesso após alguns segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error: unknown) {
      console.error("Erro ao enviar formulário:", error);
      setErroEnvio(
        "Não foi possível enviar o formulário no momento. Por favor, tente novamente."
      );
      // Poderíamos tentar nova submissão ou simplesmente manter a mensagem de erro
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/10 to-blue-50/20 py-16 md:py-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-blue-grid [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-10"></div>

      {/* Elementos decorativos com animação */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-300/10 to-purple-300/20 blur-3xl"
      ></motion.div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Cabeçalho da página */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-10"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
          >
            Fale Conosco
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-slate-700 max-w-2xl mx-auto"
          >
            Estamos disponíveis para ajudar com o que você precisar.
          </motion.p>
        </motion.div>

        {/* Conteúdo - Formulário e informações de contato */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start">
            {/* Formulário de contato */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full lg:w-3/5 mb-10 lg:mb-0 lg:pr-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="nome"
                    className="block mb-2 text-slate-800 font-medium"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                    className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block mb-2 text-slate-800 font-medium"
                  >
                    Telefone (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="Seu número com DDD"
                    required
                    className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mensagem"
                    className="block mb-2 text-slate-800 font-medium"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem (opcional)"
                    rows={6}
                    className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="aceito"
                      name="aceito"
                      type="checkbox"
                      checked={formData.aceito}
                      onChange={handleCheckboxChange}
                      required
                      className="w-4 h-4 border border-slate-300 rounded accent-blue-600 cursor-pointer"
                    />
                  </div>
                  <label
                    htmlFor="aceito"
                    className="ml-2 text-slate-700 select-none"
                  >
                    Aceito receber contato da Credios via WhatsApp ou ligação
                  </label>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 h-auto rounded-lg font-medium flex items-center justify-center transition-all ${
                      isSubmitting ? "opacity-70 pointer-events-none" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar
                      </>
                    )}
                  </Button>
                </div>

                {/* Mensagem de sucesso */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 text-green-800 p-4 rounded-md flex items-center"
                  >
                    <CheckSquare className="w-5 h-5 mr-2" />
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </motion.div>
                )}

                {/* Mensagem de erro (caso ocorra no envio) */}
                {erroEnvio && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-50 text-yellow-800 p-4 rounded-md flex items-center mt-2"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.257 3.099c.366-1.36 2.186-1.36 2.553 0l.515 1.916a1 1 0 00.95.69h2a1 1 0 00.95-.69l.515-1.916c.366-1.36 2.187-1.36 2.553 0l.516 1.916a1 1 0 00.949.69h2a1 1 0 01.894.553l1.618 3.236a1 1 0 010 .894l-1.618 3.236a1 1 0 00-.894.553h-2a1 1 0 00-.949.69l-.516 1.916c-.366 1.36-2.187 1.36-2.553 0l-.515-1.916a1 1 0 00-.95-.69h-2a1 1 0 00-.95.69l-.515 1.916c-.367 1.36-2.187 1.36-2.553 0l-.515-1.916a1 1 0 00-.95-.69h-2a1 1 0 01-.894-.553l-1.618-3.236a1 1 0 010-.894l1.618-3.236a1 1 0 00.894-.553h2a1 1 0 00.95-.69l.515-1.916z"
                      />
                    </svg>
                    {erroEnvio}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Informações de contato */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-full lg:w-2/5 lg:pl-8 lg:border-l lg:border-slate-200"
            >
              <div className="space-y-12">
                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Email
                    </h3>
                    <p className="text-slate-600 mb-2">
                      Respondemos a TODOS os emails.
                    </p>
                    <Link
                      href="mailto:contato@credios.com.br"
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      contato@credios.com.br
                    </Link>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 rounded-full p-3 mr-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      WhatsApp
                    </h3>
                    <p className="text-slate-600 mb-2">
                      Atendimento rápido 24 horas.
                    </p>
                    <Link
                      href="https://wa.me/552130300606"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 font-medium hover:text-green-800 transition-colors"
                    >
                      (21) 3030-0606
                    </Link>
                  </div>
                </div>

                {/* Informações adicionais */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">
                    Horário de atendimento
                  </h3>
                  <p className="text-slate-700">
                    Segunda a Sexta: 8h às 20h <br />
                    Sábados: 9h às 15h
                  </p>
                  <div className="mt-4 pt-4 border-t border-blue-100">
                    <p className="text-slate-700 text-sm">
                      Nosso tempo médio de resposta é de até 2 horas em dias
                      úteis.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
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

export default Contato;
