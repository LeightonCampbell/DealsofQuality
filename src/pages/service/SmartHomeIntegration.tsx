import ServicePage from "@/components/ServicePage";
import { Zap } from "lucide-react";

const SmartHomeIntegration = () => (
  <ServicePage
    title="Smart Home Integration"
    metaTitle="Smart Home Integration | Alexa, Google Home | Deals Of Quality"
    metaDescription="Professional smart home integration. Connect all your devices for seamless automation."
    metaKeywords="smart home integration, home automation, Alexa setup, Google Home"
    rating={4.8}
    reviewCount={312}
    price="$149"
    icon={Zap}
    category="Smart Home"
    includedServices={[
      "Assess existing smart devices",
      "Configure hub/controller",
      "Connect all compatible devices",
      "Set up automation routines",
      "Train on voice commands"
    ]}
    faqs={[
      { question: "What systems do you integrate?", answer: "We work with Alexa, Google Home, Apple HomeKit, SmartThings, and more." },
      { question: "Can you connect devices from different brands?", answer: "Yes, we specialize in creating unified experiences across different ecosystems." }
    ]}
  />
);

export default SmartHomeIntegration;
