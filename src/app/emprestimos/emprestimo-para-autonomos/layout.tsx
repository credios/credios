import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Empréstimo para Autônomos | Crédito para Profissionais Independentes | Credios',
  description: 'Soluções de crédito especiais para profissionais autônomos. Empréstimos com condições diferenciadas, aprovação rápida e sem burocracia na Credios.',
  alternates: {
    canonical: 'https://www.credios.com.br/emprestimos/emprestimo-para-autonomos',
  },
}

export default function EmprestimoAutonomosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}