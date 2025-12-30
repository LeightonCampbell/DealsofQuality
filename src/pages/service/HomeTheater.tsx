import ServicePage from "@/components/ServicePage";
import { Film } from "lucide-react";

const HomeTheater = () => (
  <ServicePage
    title="Home Theater Installation"
    metaTitle="Home Theater Installation | Professional Setup | Deals Of Quality"
    metaDescription="Complete home theater installation. Projector, screen, surround sound setup."
    metaKeywords="home theater, projector installation, theater room, entertainment system"
    rating={4.9}
    reviewCount={287}
    price="$299"
    icon={Film}
    category="Audio & Video"
    includedServices={[
      "Install projector and screen",
      "Set up AV receiver",
      "Configure surround sound",
      "Optimize picture settings",
      "Cable management"
    ]}
    faqs={[
      { question: "Do you provide the equipment?", answer: "We install customer-provided equipment or can recommend and source equipment for you." },
      { question: "How long does setup take?", answer: "A complete home theater setup typically takes 3-5 hours." }
    ]}
  />
);

export default HomeTheater;
