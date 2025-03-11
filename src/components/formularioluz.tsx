"use client";
import React, { useState, ChangeEvent, FormEvent, KeyboardEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Upload, Info, Shield, Clock, FileCheck, ArrowRight, AlertCircle,  Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useSearchParams } from 'next/navigation';

// Definição dos tipos
interface FormData {
  nomeCompleto: string;
  documentoFrente: File | null;
  documentoVerso: File | null;
  faturaEnergia: File | null;
  banco: string;
  agencia: string;
  numeroConta: string;
  digitoConta: string;
  tipoConta: string;
  referencia1Nome: string;
  referencia1Telefone: string;
  referencia2Nome: string;
  referencia2Telefone: string;
  concordaTermos: boolean;
}

interface FormErrors {
  nomeCompleto?: string;
  documentoFrente?: string;
  documentoVerso?: string;
  faturaEnergia?: string;
  banco?: string;
  agencia?: string;
  numeroConta?: string;
  digitoConta?: string;
  referencia1Nome?: string;
  referencia1Telefone?: string;
  referencia2Nome?: string;
  referencia2Telefone?: string;
  concordaTermos?: string;
}

interface FileUploadProps {
  label: string;
  name: string;
  explanation: string;
  value: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isUploading?: boolean;
}

// Constantes
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB em bytes

const FormularioLuz = () => {
  // States para gerenciar os parâmetros da URL
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [clienteNome, setClienteNome] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
  // Capturar parâmetros da URL de forma segura
  useEffect(() => {
    if (searchParams) {
      setClienteId(searchParams.get('cliente'));
      setClienteNome(searchParams.get('nome'));
    }
  }, [searchParams]);

  const [progress, setProgress] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // States para controle de upload de cada arquivo
  const [uploadingFrente, setUploadingFrente] = useState<boolean>(false);
  const [uploadingVerso, setUploadingVerso] = useState<boolean>(false);
  const [uploadingFatura, setUploadingFatura] = useState<boolean>(false);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: '',
    documentoFrente: null,
    documentoVerso: null,
    faturaEnergia: null,
    banco: '',
    agencia: '',
    numeroConta: '',
    digitoConta: '',
    tipoConta: 'corrente',
    referencia1Nome: '',
    referencia1Telefone: '',
    referencia2Nome: '',
    referencia2Telefone: '',
    concordaTermos: false
  });
  
  // Validação de arquivo
  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `O arquivo excede o tamanho máximo de 2MB. Tamanho atual: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return 'Formato de arquivo não suportado. Use JPG, PNG ou PDF.';
    }
    
    return null;
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file' && files?.[0]) {
      const file = files[0];
      
      // Validar o arquivo antes de processar
      const fileError = validateFile(file);
      if (fileError) {
        setErrors(prev => ({ ...prev, [name]: fileError }));
        return;
      }
      
      // Limpar erro se existir
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name as keyof FormErrors];
          return newErrors;
        });
      }
      
      // Definir estado de upload
      if (name === 'documentoFrente') setUploadingFrente(true);
      if (name === 'documentoVerso') setUploadingVerso(true);
      if (name === 'faturaEnergia') setUploadingFatura(true);
      
      // Simular verificação do arquivo (em produção, esta etapa poderia pré-processar o arquivo)
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          [name]: file
        }));
        
        // Finalizar estado de upload
        if (name === 'documentoFrente') setUploadingFrente(false);
        if (name === 'documentoVerso') setUploadingVerso(false);
        if (name === 'faturaEnergia') setUploadingFatura(false);
      }, 1000); // Simulação de 1 segundo para verificação do arquivo
      
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Validação por etapa
  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (currentStep === 1) {
      if (!formData.nomeCompleto.trim()) {
        newErrors.nomeCompleto = "Nome completo é obrigatório";
      }
    } else if (currentStep === 2) {
      if (!formData.documentoFrente) {
        newErrors.documentoFrente = "A foto da frente do documento é obrigatória";
      }
      if (!formData.documentoVerso) {
        newErrors.documentoVerso = "A foto do verso do documento é obrigatória";
      }
      if (!formData.faturaEnergia) {
        newErrors.faturaEnergia = "A foto da fatura de energia é obrigatória";
      }
    } else if (currentStep === 3) {
      if (!formData.banco.trim()) {
        newErrors.banco = "Nome do banco é obrigatório";
      }
      if (!formData.agencia.trim()) {
        newErrors.agencia = "Agência é obrigatória";
      }
      if (!formData.numeroConta.trim()) {
        newErrors.numeroConta = "Número da conta é obrigatório";
      }
      if (!formData.digitoConta.trim()) {
        newErrors.digitoConta = "Dígito da conta é obrigatório";
      }
      if (!formData.referencia1Nome.trim()) {
        newErrors.referencia1Nome = "Nome da 1ª referência é obrigatório";
      }
      if (!formData.referencia1Telefone.trim()) {
        newErrors.referencia1Telefone = "Telefone da 1ª referência é obrigatório";
      }
      if (!formData.referencia2Nome.trim()) {
        newErrors.referencia2Nome = "Nome da 2ª referência é obrigatório";
      }
      if (!formData.referencia2Telefone.trim()) {
        newErrors.referencia2Telefone = "Telefone da 2ª referência é obrigatório";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step < totalSteps && validateStep(step)) {
      const newStep = step + 1;
      setStep(newStep);
      setProgress((newStep / totalSteps) * 100);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);
      setProgress((newStep / totalSteps) * 100);
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar o último passo
    if (!validateStep(totalSteps)) {
      return;
    }
    
    if (!formData.concordaTermos) {
      setErrors(prev => ({...prev, concordaTermos: "Você precisa concordar com os termos para continuar"}));
      return;
    }
    
    // Limpar erros e definir estado de submissão
    setSubmitError(null);
    setIsSubmitting(true);
    
    try {
      // Criar FormData para enviar os arquivos
      const data = new FormData();
      
      // Adicionar campos de texto
      data.append('nomeCompleto', formData.nomeCompleto);
      data.append('banco', formData.banco);
      data.append('agencia', formData.agencia);
      data.append('numeroConta', formData.numeroConta);
      data.append('digitoConta', formData.digitoConta);
      data.append('tipoConta', formData.tipoConta);
      data.append('referencia1Nome', formData.referencia1Nome);
      data.append('referencia1Telefone', formData.referencia1Telefone);
      data.append('referencia2Nome', formData.referencia2Nome);
      data.append('referencia2Telefone', formData.referencia2Telefone);
      
      // Adicionar identificação do cliente (se disponível na URL)
      if (clienteId) data.append('clienteId', clienteId);
      if (clienteNome) data.append('clienteNome', clienteNome);
      
      // Adicionar arquivos
      if (formData.documentoFrente) data.append('documentoFrente', formData.documentoFrente);
      if (formData.documentoVerso) data.append('documentoVerso', formData.documentoVerso);
      if (formData.faturaEnergia) data.append('faturaEnergia', formData.faturaEnergia);
      
      // Enviar dados para a API com timeout para evitar hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos timeout
      
      const response = await fetch('/api/enviar-formulario', {
        method: 'POST',
        body: data,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao processar formulário.');
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Mostrar modal de sucesso
        setShowSuccessModal(true);
      } else {
        // Tratar erro de resposta
        setSubmitError(result.message || 'Erro ao enviar formulário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      if (error instanceof Error) {
        setSubmitError(error.message || 'Erro na conexão. Por favor, tente novamente em alguns instantes.');
      } else {
        setSubmitError('Erro inesperado. Por favor, tente novamente em alguns instantes.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    // Prevenir submit ao pressionar Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      if (step < totalSteps) {
        handleNextStep();
      }
    }
  };
  
  // Função para exibir o upload de arquivo
  const FileUpload = ({ label, name, explanation, value, onChange, error, isUploading = false }: FileUploadProps) => (
    <div className="mb-6 w-full">
      <Label htmlFor={name} className="text-base font-medium text-gray-800 mb-1 block">
        {label}
      </Label>
      <div className="relative">
        <motion.div 
          whileHover={{ scale: isUploading ? 1 : 1.02 }}
          className={`border-2 border-dashed rounded-lg p-6 text-center ${isUploading ? 'cursor-wait' : 'cursor-pointer'} hover:border-blue-500 transition-colors ${value ? 'border-green-500 bg-green-50' : error ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
        >
          <input
            type="file"
            id={name}
            name={name}
            onChange={onChange}
            className={`absolute inset-0 w-full h-full opacity-0 ${isUploading ? 'cursor-wait' : 'cursor-pointer'}`}
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            disabled={isUploading}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                <p className="text-sm font-medium text-blue-700">Verificando arquivo...</p>
              </>
            ) : value ? (
              <>
                <CheckCircle className="h-10 w-10 text-green-500" />
                <p className="text-sm font-medium text-green-700">Arquivo selecionado</p>
                <p className="text-xs text-gray-500">{value.name}</p>
                <p className="text-xs text-gray-500">
                  {(value.size / (1024 * 1024)).toFixed(2)}MB
                </p>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-blue-500" />
                <p className="text-sm font-medium">Clique ou arraste o arquivo aqui</p>
                <p className="text-xs text-gray-500">Formatos aceitos: JPG, PNG, PDF</p>
                <p className="text-xs text-gray-500">Tamanho máximo: 2MB</p>
              </>
            )}
          </div>
        </motion.div>
      </div>
      {error ? (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      ) : (
        <p className="mt-2 text-xs text-gray-500 flex items-start gap-1">
          <Info className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
          {explanation}
        </p>
      )}
    </div>
  );
  
  // Modal de sucesso
  const SuccessModal = () => (
    <AnimatePresence>
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Contratação Enviada!</h2>
              
              <p className="text-gray-600 mb-6">
                Recebemos seus dados com sucesso! Em breve você receberá um SMS com mais informações sobre o seu empréstimo.
              </p>
              
              <div className="w-full bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Próximos passos:</span> Sua solicitação será analisada pela financeira e você receberá uma confirmação em até 48 horas.
                </p>
              </div>
              
              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                Entendi
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <div className="p-6 md:p-8">
          {/* Logo e cabeçalho */}
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo da Credios - Substituir pela imagem real */}
              <div className="bg-blue-600 text-white font-bold text-2xl py-2 px-4 rounded-lg mb-4">
                CREDIOS
              </div>
            </motion.div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Complete sua contratação de crédito</h1>
            <p className="text-gray-600 mt-2">
              Seu crédito de até <span className="font-bold text-green-600">R$ 3.300,00</span> está pré-aprovado!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Finalize em menos de 5 minutos e receba rapidamente na sua conta
            </p>
            
            {/* Barra de progresso */}
            <div className="w-full mt-6">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Dados</span>
                <span>Documentos</span>
                <span>Banco</span>
                <span>Finalizar</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
          
          {/* Modal de sucesso */}
          <SuccessModal />
          
          {/* Erro de submissão */}
          {submitError && (
            <Card className="mb-6 bg-red-50 border-red-200">
              <CardContent className="p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700 font-medium">Erro ao enviar formulário</p>
                  <p className="text-xs text-red-600">{submitError}</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            {/* Step 1: Dados Pessoais */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                  Seus dados pessoais
                </h2>
                
                <div className="mb-6">
                  <Label htmlFor="nomeCompleto" className="text-base font-medium text-gray-800 mb-1 block">
                    Nome Completo
                  </Label>
                  <Input
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                    className={`w-full ${errors.nomeCompleto ? 'border-red-300' : ''}`}
                  />
                  {errors.nomeCompleto ? (
                    <p className="mt-1 text-xs text-red-500">{errors.nomeCompleto}</p>
                  ) : (
                    <p className="mt-1 text-xs text-gray-500 flex items-start gap-1">
                      <Info className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
                      Este deve ser o mesmo nome que consta na sua conta de luz
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  >
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Documentos */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                  Seus documentos
                </h2>
                
                <Card className="mb-6 bg-blue-50 border-blue-200">
                  <CardContent className="p-4 flex gap-3">
                    <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Seus dados estão protegidos</p>
                      <p className="text-xs text-gray-600">Utilizamos criptografia de ponta a ponta para garantir a segurança das suas informações</p>
                    </div>
                  </CardContent>
                </Card>
                
                <FileUpload
                  label="Foto do documento de identificação (Frente)"
                  name="documentoFrente"
                  explanation="Seu documento é necessário para confirmar sua identidade e prevenir fraudes."
                  value={formData.documentoFrente}
                  onChange={handleChange}
                  error={errors.documentoFrente}
                  isUploading={uploadingFrente}
                />
                
                <FileUpload
                  label="Foto do documento de identificação (Verso)"
                  name="documentoVerso"
                  explanation="Para validação completa do documento e confirmação da sua identidade."
                  value={formData.documentoVerso}
                  onChange={handleChange}
                  error={errors.documentoVerso}
                  isUploading={uploadingVerso}
                />
                
                <FileUpload
                  label="Foto da fatura de energia (Completa)"
                  name="faturaEnergia"
                  explanation="Necessária para confirmar que você é o titular da conta e para calcular o valor disponível para empréstimo."
                  value={formData.faturaEnergia}
                  onChange={handleChange}
                  error={errors.faturaEnergia}
                  isUploading={uploadingFatura}
                />
                
                <div className="flex justify-between mt-8">
                  <Button 
                    type="button" 
                    onClick={handlePrevStep}
                    variant="outline"
                    className="border-gray-300 cursor-pointer"
                  >
                    Voltar
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    disabled={uploadingFrente || uploadingVerso || uploadingFatura}
                  >
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Dados Bancários */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">3</span>
                  Dados Bancários
                </h2>
                
                <p className="text-sm text-gray-600 mb-4">
                  Informe os dados da conta onde você deseja receber o valor do empréstimo
                </p>
                
                <div className="mb-4">
                  <Label htmlFor="banco" className="text-base font-medium text-gray-800 mb-1 block">
                    Banco
                  </Label>
                  <Input
                    id="banco"
                    name="banco"
                    value={formData.banco}
                    onChange={handleChange}
                    placeholder="Nome do banco"
                    className={`w-full ${errors.banco ? 'border-red-300' : ''}`}
                  />
                  {errors.banco && <p className="mt-1 text-xs text-red-500">{errors.banco}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="agencia" className="text-base font-medium text-gray-800 mb-1 block">
                      Agência
                    </Label>
                    <Input
                      id="agencia"
                      name="agencia"
                      value={formData.agencia}
                      onChange={handleChange}
                      placeholder="Ex: 0001"
                      className={`w-full ${errors.agencia ? 'border-red-300' : ''}`}
                    />
                    {errors.agencia && <p className="mt-1 text-xs text-red-500">{errors.agencia}</p>}
                  </div>
                  <div>
                    <Label htmlFor="numeroConta" className="text-base font-medium text-gray-800 mb-1 block">
                      Número da Conta
                    </Label>
                    <Input
                      id="numeroConta"
                      name="numeroConta"
                      value={formData.numeroConta}
                      onChange={handleChange}
                      placeholder="Número da conta"
                      className={`w-full ${errors.numeroConta ? 'border-red-300' : ''}`}
                    />
                    {errors.numeroConta && <p className="mt-1 text-xs text-red-500">{errors.numeroConta}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="digitoConta" className="text-base font-medium text-gray-800 mb-1 block">
                      Dígito da Conta
                    </Label>
                    <Input
                      id="digitoConta"
                      name="digitoConta"
                      value={formData.digitoConta}
                      onChange={handleChange}
                      placeholder="Ex: 5"
                      className={`w-full ${errors.digitoConta ? 'border-red-300' : ''}`}
                    />
                    {errors.digitoConta && <p className="mt-1 text-xs text-red-500">{errors.digitoConta}</p>}
                  </div>
                  <div>
                    <Label className="text-base font-medium text-gray-800 mb-1 block">
                      Tipo de Conta
                    </Label>
                    <RadioGroup
                      value={formData.tipoConta}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, tipoConta: value }))}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="corrente" id="corrente" />
                        <Label htmlFor="corrente" className="cursor-pointer">Corrente</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="poupanca" id="poupanca" />
                        <Label htmlFor="poupanca" className="cursor-pointer">Poupança</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <p className="mt-1 text-xs text-gray-500 flex items-start gap-1 mb-6">
                  <Info className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
                  Os dados bancários são necessários para que possamos enviar o valor do empréstimo diretamente à sua conta
                </p>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Referências Pessoais
                </h3>
                
                <p className="text-sm text-gray-600 mb-4">
                  Informe 2 contatos para referência (podem ser parentes)
                </p>
                
                <div className="mb-4">
                  <Label htmlFor="referencia1Nome" className="text-base font-medium text-gray-800 mb-1 block">
                    Nome da 1ª Referência
                  </Label>
                  <Input
                    id="referencia1Nome"
                    name="referencia1Nome"
                    value={formData.referencia1Nome}
                    onChange={handleChange}
                    placeholder="Digite o nome completo"
                    className={`w-full ${errors.referencia1Nome ? 'border-red-300' : ''}`}
                  />
                  {errors.referencia1Nome && <p className="mt-1 text-xs text-red-500">{errors.referencia1Nome}</p>}
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="referencia1Telefone" className="text-base font-medium text-gray-800 mb-1 block">
                    Telefone da 1ª Referência
                  </Label>
                  <Input
                    id="referencia1Telefone"
                    name="referencia1Telefone"
                    value={formData.referencia1Telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className={`w-full ${errors.referencia1Telefone ? 'border-red-300' : ''}`}
                  />
                  {errors.referencia1Telefone && <p className="mt-1 text-xs text-red-500">{errors.referencia1Telefone}</p>}
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="referencia2Nome" className="text-base font-medium text-gray-800 mb-1 block">
                    Nome da 2ª Referência
                  </Label>
                  <Input
                    id="referencia2Nome"
                    name="referencia2Nome"
                    value={formData.referencia2Nome}
                    onChange={handleChange}
                    placeholder="Digite o nome completo"
                    className={`w-full ${errors.referencia2Nome ? 'border-red-300' : ''}`}
                  />
                  {errors.referencia2Nome && <p className="mt-1 text-xs text-red-500">{errors.referencia2Nome}</p>}
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="referencia2Telefone" className="text-base font-medium text-gray-800 mb-1 block">
                    Telefone da 2ª Referência
                  </Label>
                  <Input
                    id="referencia2Telefone"
                    name="referencia2Telefone"
                    value={formData.referencia2Telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className={`w-full ${errors.referencia2Telefone ? 'border-red-300' : ''}`}
                  />
                  {errors.referencia2Telefone && <p className="mt-1 text-xs text-red-500">{errors.referencia2Telefone}</p>}
                </div>
                
                <p className="mt-1 text-xs text-gray-500 flex items-start gap-1">
                  <Info className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
                  As referências são uma exigência do banco e não serão contatadas, exceto em caso de necessidade
                </p>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    type="button" 
                    onClick={handlePrevStep}
                    variant="outline"
                    className="border-gray-300 cursor-pointer"
                  >
                    Voltar
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  >
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* Step 4: Revisão e Finalização */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">4</span>
                  Finalizar Contratação
                </h2>
                
                <Card className="mb-6 bg-green-50 border-green-200">
                  <CardContent className="p-4 flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Falta pouco!</p>
                      <p className="text-xs text-gray-600">Finalize seu cadastro para receber o crédito rapidamente</p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium text-gray-800">Informações importantes:</h3>
                  
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Após finalizar, a financeira enviará um SMS com mais informações sobre o empréstimo
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <FileCheck className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Seu contrato passará por uma análise de crédito
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      As parcelas do empréstimo serão cobradas diretamente na sua fatura de energia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 mb-8">
                  <input
                    type="checkbox"
                    id="concordaTermos"
                    name="concordaTermos"
                    checked={formData.concordaTermos}
                    onChange={handleChange}
                    className="mt-1 cursor-pointer"
                  />
                  <Label htmlFor="concordaTermos" className="text-sm text-gray-700 cursor-pointer">
                    Confirmo que li e concordo com os <a href="#" className="text-blue-600 underline">Termos e Condições</a> e <a href="#" className="text-blue-600 underline">Política de Privacidade</a>
                  </Label>
                </div>
                {errors.concordaTermos && <p className="mt-1 mb-4 text-xs text-red-500">{errors.concordaTermos}</p>}
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    onClick={handlePrevStep}
                    variant="outline"
                    className="border-gray-300 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    Voltar
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </div>
                    ) : 'Finalizar Contratação'}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioLuz;