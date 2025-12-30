import ServicePage from "@/components/ServicePage";
import { Gamepad2 } from "lucide-react";

const GamingSetup = () => (
  <ServicePage
    title="Gaming Console Setup"
    metaTitle="Gaming Console Setup | PS5, Xbox, Nintendo | Deals Of Quality"
    metaDescription="Professional gaming console setup. Optimize display and network settings."
    metaKeywords="gaming setup, PS5 setup, Xbox setup, Nintendo Switch, gaming"
    rating={4.8}
    reviewCount={234}
    price="$79"
    icon={Gamepad2}
    category="Audio & Video"
    includedServices={[
      "Connect console to TV",
      "Configure display settings",
      "Set up online account",
      "Optimize network connection",
      "Install system updates"
    ]}
    faqs={[
      { question: "What consoles do you support?", answer: "We set up PlayStation, Xbox, Nintendo Switch, and gaming PCs." },
      { question: "Can you optimize for competitive gaming?", answer: "Yes, we configure low-latency settings for optimal gaming performance." }
    ]}
  />
);

export default GamingSetup;
