import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Empréstimo Consignado | Crédito com Desconto em Folha | Credios',
  description: 'Empréstimo consignado com as melhores taxas do mercado. Desconto em folha para servidores públicos, aposentados e pensionistas do INSS. Aprovação rápida e segura.',
  alternates: {
    canonical: 'https://www.credios.com.br/emprestimos/emprestimo-consignado',
  },
}

export default function EmprestimoConsignadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}