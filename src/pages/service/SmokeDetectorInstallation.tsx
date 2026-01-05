import ServicePage from "@/components/ServicePage";
import { AlertCircle } from "lucide-react";

const SmokeDetectorInstallation = () => (
  <ServicePage
    title="Smoke Detector Installation"
    metaTitle="Smoke Detector Installation | Fire Safety | Deals Of Quality"
    metaDescription="Professional smoke detector installation and testing. Ensure your home is protected with properly installed and tested smoke detectors. Licensed professionals."
    metaKeywords="smoke detector installation, smoke alarm installation, fire safety, smoke detector service, carbon monoxide detector"
    price="$99"
    priceNote="starting at"
    icon={AlertCircle}
    category="Electrical & Safety"
    includedServices={[
      "Smoke detector installation",
      "Carbon monoxide detector installation",
      "Interconnected system setup",
      "Battery replacement service",
      "Smoke detector testing",
      "Code compliance verification",
      "Hardwired detector installation"
    ]}
    faqs={[
      { question: "How many smoke detectors do I need?", answer: "Building codes typically require smoke detectors in every bedroom, outside sleeping areas, and on each level of the home. We can assess your needs." },
      { question: "Do you install hardwired or battery-operated detectors?", answer: "We install both types. Hardwired detectors with battery backup are recommended for new construction and provide better reliability." },
      { question: "How often should smoke detectors be tested?", answer: "Smoke detectors should be tested monthly and batteries replaced annually. We provide testing and maintenance services." }
    ]}
  />
);

export default SmokeDetectorInstallation;
