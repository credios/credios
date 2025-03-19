import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Interface para o corpo da requisição
interface FormData {
  nome: string;
  telefone: string;
  cidade: string;
  titular: string;
  valorAprovado: string;
  dataHora: string;
  tipoFormulario: string;
}

export async function POST(request: Request) {

  try {
    // Obter dados do formulário
    const formData: FormData = await request.json();
    const { nome, telefone, cidade, titular, valorAprovado, dataHora, tipoFormulario } = formData;

    // Validar dados
    if (!nome || !telefone || !cidade) {
      return NextResponse.json(
        { success: false, message: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      );
    }

    // Configurar transporte de e-mail (SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Boolean(process.env.EMAIL_SECURE) || false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar e-mail
    const mailOptions = {
      from: `"Simulador Credios" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'recebimento@credios.com.br',
      subject: `Nova simulação de ${tipoFormulario} - ${nome}`,
      html: `
        <h1>Nova simulação de empréstimo</h1>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Campo</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Valor</th>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Nome</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${nome}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Telefone</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${telefone}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Cidade</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${cidade}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>É Titular da Conta</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${titular}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Valor Aprovado</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong style="color: #22c55e;">${valorAprovado}</strong></td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Tipo de Formulário</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${tipoFormulario}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Data e Hora</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${dataHora}</td>
          </tr>
        </table>
        <p style="color: #666;">Este e-mail foi enviado automaticamente pelo sistema de simulação do site da Credios.</p>
      `,
    };

    // Tentar enviar o e-mail
    await transporter.sendMail(mailOptions);

    // Resposta de sucesso
    return NextResponse.json(
      { success: true, message: 'E-mail enviado com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    
    // Resposta de erro
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao processar a solicitação', 
        details: String(error) 
      },
      { status: 500 }
    );
  }
}