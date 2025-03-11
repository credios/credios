// app/api/enviar-formulario/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
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

// Função para salvar arquivos
async function saveFormFile(file: File, name: string): Promise<string> {
  try {
    // Validar arquivo
    const validationError = validateFile(file);
    if (validationError) {
      throw new Error(validationError);
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Criar pasta se não existir
    const uploadDir = join(process.cwd(), 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Erro ao criar diretório:', error);
      throw new Error('Erro ao criar diretório para salvar arquivos');
    }
    
    const filename = `${name}-${Date.now()}.${file.name.split('.').pop()}`;
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    return filepath;
  } catch (error) {
    console.error('Erro ao salvar arquivo:', error);
    throw error;
  }
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
    
    // Processar arquivos com tratamento de erro
    const arquivos: { tipo: string; caminho: string }[] = [];
    
    try {
      if (documentoFrente) {
        const caminho = await saveFormFile(documentoFrente, 'doc-frente');
        arquivos.push({ tipo: 'Documento (Frente)', caminho });
      }
      
      if (documentoVerso) {
        const caminho = await saveFormFile(documentoVerso, 'doc-verso');
        arquivos.push({ tipo: 'Documento (Verso)', caminho });
      }
      
      if (faturaEnergia) {
        const caminho = await saveFormFile(faturaEnergia, 'fatura');
        arquivos.push({ tipo: 'Fatura de Energia', caminho });
      }
    } catch (error) {
      console.error('Erro ao processar arquivos:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: error instanceof Error 
            ? error.message 
            : 'Erro ao processar os arquivos. Verifique o tamanho e formato dos arquivos.' 
        },
        { status: 400 }
      );
    }
    
    // Capturar cliente ID se fornecido na URL
    const clienteId = formData.get('clienteId') as string | null;
    const clienteNome = formData.get('clienteNome') as string | null;
    
    // Adicionando informações do cliente no assunto do email, se disponíveis
    const emailSubject = clienteId 
      ? `Novo formulário de empréstimo - ${nomeCompleto} (ID: ${clienteId})`
      : `Novo formulário de empréstimo - ${nomeCompleto}`;
    
    // Enviar email com os dados
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
          <p>Os arquivos foram salvos no servidor. Veja os caminhos abaixo:</p>
          <ul>
            ${arquivos.map(arq => `<li>${arq.tipo}: ${arq.caminho}</li>`).join('')}
          </ul>
        `,
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      // Não retornamos erro aqui, pois o form já foi processado, apenas logamos o erro
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