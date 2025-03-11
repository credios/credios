// app/api/enviar-formulario/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

// Constantes
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB em bytes
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

// Função para validar arquivo
function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return `O arquivo excede o tamanho máximo de 2MB`;
  }
  
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return 'Formato de arquivo não suportado. Use JPG, PNG ou PDF.';
  }
  
  return null;
}

// Configuração do transporte de email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Receber os dados do formulário
    const formData = await request.formData();
    
    // Processar campos de texto
    const nomeCompleto = formData.get('nomeCompleto') as string;
    const banco = formData.get('banco') as string;
    const agencia = formData.get('agencia') as string;
    const numeroConta = formData.get('numeroConta') as string;
    const digitoConta = formData.get('digitoConta') as string;
    const tipoConta = formData.get('tipoConta') as string;
    const referencia1Nome = formData.get('referencia1Nome') as string;
    const referencia1Telefone = formData.get('referencia1Telefone') as string;
    const referencia2Nome = formData.get('referencia2Nome') as string;
    const referencia2Telefone = formData.get('referencia2Telefone') as string;
    
    // Validar dados básicos
    if (!nomeCompleto || !banco || !agencia || !numeroConta || !digitoConta || !tipoConta ||
        !referencia1Nome || !referencia1Telefone || !referencia2Nome || !referencia2Telefone) {
      return NextResponse.json(
        { success: false, message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Processar arquivos
    const documentoFrente = formData.get('documentoFrente') as File;
    const documentoVerso = formData.get('documentoVerso') as File;
    const faturaEnergia = formData.get('faturaEnergia') as File;
    
    // Validar arquivos
    if (!documentoFrente || !documentoVerso || !faturaEnergia) {
      return NextResponse.json(
        { success: false, message: 'Todos os documentos são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Validar os arquivos
    const validationErrors = [];
    const docFrenteError = validateFile(documentoFrente);
    const docVersoError = validateFile(documentoVerso);
    const faturaError = validateFile(faturaEnergia);
    
    if (docFrenteError) validationErrors.push(`Documento (Frente): ${docFrenteError}`);
    if (docVersoError) validationErrors.push(`Documento (Verso): ${docVersoError}`);
    if (faturaError) validationErrors.push(`Fatura de Energia: ${faturaError}`);
    
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, message: validationErrors.join('. ') },
        { status: 400 }
      );
    }
    
    // Preparar arquivos para envio por email
    const docFrenteBuffer = Buffer.from(await documentoFrente.arrayBuffer());
    const docVersoBuffer = Buffer.from(await documentoVerso.arrayBuffer());
    const faturaBuffer = Buffer.from(await faturaEnergia.arrayBuffer());
    
    // Capturar cliente ID se fornecido na URL
    const clienteId = formData.get('clienteId') as string | null;
    const clienteNome = formData.get('clienteNome') as string | null;
    
    // Adicionando informações do cliente no assunto do email, se disponíveis
    const emailSubject = clienteId 
      ? `Novo formulário de empréstimo - ${nomeCompleto} (ID: ${clienteId})`
      : `Novo formulário de empréstimo - ${nomeCompleto}`;
    
    // Enviar email com os dados e arquivos anexados
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@credios.com.br',
        to: process.env.EMAIL_TO || 'contato@credios.com.br',
        subject: emailSubject,
        html: `
          <h1>Novo formulário recebido</h1>
          ${clienteId ? `<p><strong>ID do Cliente:</strong> ${clienteId}</p>` : ''}
          ${clienteNome ? `<p><strong>Nome Original do Cliente:</strong> ${clienteNome}</p>` : ''}
          
          <h2>Dados Pessoais</h2>
          <p><strong>Nome:</strong> ${nomeCompleto}</p>
          
          <h2>Dados Bancários</h2>
          <p><strong>Banco:</strong> ${banco}</p>
          <p><strong>Agência:</strong> ${agencia}</p>
          <p><strong>Conta:</strong> ${numeroConta}-${digitoConta}</p>
          <p><strong>Tipo de Conta:</strong> ${tipoConta}</p>
          
          <h2>Referências</h2>
          <p><strong>Referência 1:</strong> ${referencia1Nome} - ${referencia1Telefone}</p>
          <p><strong>Referência 2:</strong> ${referencia2Nome} - ${referencia2Telefone}</p>
          
          <h2>Arquivos</h2>
          <p>Os arquivos foram anexados a este email.</p>
        `,
        attachments: [
          {
            filename: `doc-frente-${nomeCompleto}.${documentoFrente.name.split('.').pop()}`,
            content: docFrenteBuffer
          },
          {
            filename: `doc-verso-${nomeCompleto}.${documentoVerso.name.split('.').pop()}`,
            content: docVersoBuffer
          },
          {
            filename: `fatura-${nomeCompleto}.${faturaEnergia.name.split('.').pop()}`,
            content: faturaBuffer
          }
        ]
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return NextResponse.json(
        { success: false, message: 'Erro ao enviar email com os documentos. Por favor, tente novamente.' },
        { status: 500 }
      );
    }
    
    // Retornar sucesso
    return NextResponse.json({ 
      success: true, 
      message: 'Formulário recebido com sucesso!' 
    });
    
  } catch (error) {
    console.error('Erro ao processar formulário:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar formulário. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}