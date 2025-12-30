import ServicePage from "@/components/ServicePage";
import { Router } from "lucide-react";

const RouterSetup = () => (
  <ServicePage
    title="Router Setup & Installation"
    metaTitle="Router Setup | WiFi Installation | Deals Of Quality"
    metaDescription="Professional router setup and WiFi configuration. Fast, secure network."
    metaKeywords="router setup, WiFi installation, network setup, internet"
    rating={4.8}
    reviewCount={678}
    price="$89"
    icon={Router}
    category="WiFi & Network"
    includedServices={[
      "Install and position router",
      "Configure WiFi network",
      "Set up security settings",
      "Connect your devices",
      "Optimize for speed"
    ]}
    faqs={[
      { question: "Do you set up mesh systems?", answer: "Yes, we install and configure mesh WiFi systems like Eero, Google WiFi, and Orbi." },
      { question: "Can you help with ISP setup?", answer: "We configure your router to work with any internet service provider." }
    ]}
  />
);

export default RouterSetup;
