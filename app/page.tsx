import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Work } from "@/components/home/Work";
import { Contact } from "@/components/home/Contact";
import { AIChatBubble } from "@/components/ui/AIChatBubble";
import { TrustedMarquee } from "@/components/home/TrustedMarquee";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-[#050508]">
      <Hero />
      <TrustedMarquee />
      <Services />
      <Work />
      <Contact />
      <AIChatBubble />
    </div>
  );
}
