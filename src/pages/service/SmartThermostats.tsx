import ServicePage from "@/components/ServicePage";
import { Thermometer } from "lucide-react";

const SmartThermostats = () => (
  <ServicePage
    title="Smart Thermostat Installation"
    metaTitle="Smart Thermostat Installation | Nest, Ecobee | Deals Of Quality"
    metaDescription="Professional smart thermostat installation. Nest, Ecobee, Honeywell and more. Same-day service available."
    metaKeywords="smart thermostat, Nest installation, Ecobee setup, smart home"
    rating={4.9}
    reviewCount={534}
    price="$99"
    icon={Thermometer}
    category="Smart Home"
    includedServices={[
      "Remove existing thermostat",
      "Install smart thermostat",
      "Connect to WiFi network",
      "Configure app and settings",
      "Demonstrate features"
    ]}
    faqs={[
      { question: "What brands do you install?", answer: "We install all major brands including Nest, Ecobee, Honeywell, and more." },
      { question: "Is my HVAC system compatible?", answer: "Most systems are compatible. Our tech will verify compatibility before installation." }
    ]}
  />
);

export default SmartThermostats;
