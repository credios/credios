import AdvantagesSection from "@/components/advantagessection";
import HeroSection from "@/components/herosection";
import SimuladorEmprestimoNaContaDeLuz from "@/components/simuladoremprestimonacontadeluz";
import SobreCredios from "@/components/sobrecredios";
import Testemunhos from "@/components/testemunhos";

export default function Home() {
  return (
    <>
    <HeroSection />
    <AdvantagesSection />
    <Testemunhos />
    <SobreCredios />
    <SimuladorEmprestimoNaContaDeLuz />
    </>
  );
}
