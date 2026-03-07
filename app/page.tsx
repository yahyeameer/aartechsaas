import { HorizonHeroSection } from "@/components/ui/horizon-hero-section";
import { Global3DBackground } from "@/components/ui/global-3d-background";
import { Services } from "@/components/home/Services";
import { Work } from "@/components/home/Work";
import { Contact } from "@/components/home/Contact";
import { AIChatBubble } from "@/components/ui/AIChatBubble";
import { TrustedMarquee } from "@/components/home/TrustedMarquee";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 relative min-h-screen">
      <Global3DBackground />
      <HorizonHeroSection />
      <TrustedMarquee />
      <Services />
      <Work />
      <Contact />
      <AIChatBubble />
    </div>
  );
}
