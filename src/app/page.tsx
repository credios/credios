import AdvantagesSection from "@/components/advantagessection";
import HeroSection from "@/components/herosection";
import SobreCredios from "@/components/sobrecredios";
import Testemunhos from "@/components/testemunhos";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection />
    <AdvantagesSection />
    <Testemunhos />
    <SobreCredios />
    </>
  );
}
