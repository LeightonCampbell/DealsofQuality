import ServicePage from "@/components/ServicePage";
import { Sun } from "lucide-react";

const SolarPanelInstallation = () => (
  <ServicePage
    title="Solar Panel Installation"
    metaTitle="Solar Panel Installation | Residential Solar Systems | Deals Of Quality"
    metaDescription="Professional solar panel installation for your home. Reduce energy costs with quality solar systems and expert installation."
    metaKeywords="solar panel installation, solar panels, solar energy, residential solar, solar installation"
    price="Contact Us"
    priceNote="for quote"
    icon={Sun}
    category="Home Services"
    includedServices={[
      "Solar system design and consultation",
      "Solar panel installation",
      "Inverter installation",
      "Electrical connections and permits",
      "System testing and activation",
      "Warranty and monitoring setup",
      "Financing assistance"
    ]}
    faqs={[
      { question: "How much can I save with solar panels?", answer: "Savings vary based on your energy usage, roof orientation, and local electricity rates. We provide detailed estimates during consultation." },
      { question: "Do you handle permits and inspections?", answer: "Yes, we handle all necessary permits, inspections, and utility interconnections for your solar installation." },
      { question: "What warranties do you offer?", answer: "We offer warranties on equipment and workmanship, typically 25 years on panels and 10 years on inverters." }
    ]}
  />
);

export default SolarPanelInstallation;
