import Header from "@/features/landing/components/Header";
import Hero from "@/features/landing/components/Hero";
import Features from "@/features/landing/components/Features";
import Statistics from "@/features/landing/components/Statistics";
import AiFeatures from "@/features/landing/components/AiFeatures";
import EfficiencyBenefits from "@/features/landing/components/EfficiencyBenefits";
import WorkerManagement from "@/features/landing/components/WorkerManagement";
import Cta from "@/features/landing/components/Cta";
import Footer from "@/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <EfficiencyBenefits />
        <WorkerManagement />
        <AiFeatures />
        <Statistics />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
