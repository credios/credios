import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Empréstimo para Negativados | Crédito com Nome Sujo | Credios',
  description: 'Soluções de crédito para pessoas com restrições no nome. Empréstimo para negativados com aprovação facilitada, análise personalizada e sem consulta ao SPC/Serasa.',
  alternates: {
    canonical: 'https://www.credios.com.br/emprestimos/emprestimo-para-negativado',
  },
}

export default function EmprestimoNegativadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}