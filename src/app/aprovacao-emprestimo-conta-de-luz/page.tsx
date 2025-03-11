import FormularioLuz from '@/components/formularioluz';

export const metadata = {
  title: 'Aprovação de Empréstimo na Conta de Luz | Credios',
  description: 'Complete seu cadastro para finalizar a contratação do empréstimo na conta de luz.',
};

export default function AprovacaoEmprestimoPage() {
  return (
    <main>
      <FormularioLuz />
    </main>
  );
}