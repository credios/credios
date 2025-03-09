import AdvantagesSection from "@/components/advantagessection";
import HeroFGTS from "@/components/herofgts";
import HeroSection from "@/components/herosection";
import HomeHero from "@/components/homehero";
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
    <HeroFGTS />
    <HomeHero />
    </>
  );
}
