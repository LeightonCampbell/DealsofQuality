import ServicePage from "@/components/ServicePage";
import { Sprout } from "lucide-react";

const SmartIrrigationInstallation = () => (
  <ServicePage
    title="Smart Irrigation Installation"
    metaTitle="Smart Irrigation Installation | Smart Sprinkler Systems | Deals Of Quality"
    metaDescription="Professional smart irrigation system installation. Automated sprinkler systems with weather-based scheduling to save water and maintain a healthy lawn."
    metaKeywords="smart irrigation, smart sprinkler system, irrigation installation, automated sprinklers, smart lawn watering"
    price="$299"
    priceNote="starting at"
    icon={Sprout}
    category="Outdoor Services"
    includedServices={[
      "Smart irrigation controller installation",
      "Zone programming and setup",
      "Weather sensor integration",
      "Mobile app setup and training",
      "Sprinkler head installation",
      "Valve and timer installation",
      "System testing and optimization"
    ]}
    faqs={[
      { question: "How much water can a smart irrigation system save?", answer: "Smart irrigation systems can save 20-50% on water usage by adjusting schedules based on weather conditions and soil moisture levels." },
      { question: "Can I control my smart irrigation system from my phone?", answer: "Yes, most smart irrigation systems include mobile apps that allow you to control schedules, monitor usage, and receive alerts from anywhere." },
      { question: "Do you install new systems or upgrade existing ones?", answer: "We do both - install complete new smart irrigation systems or upgrade your existing system with smart controllers and sensors." }
    ]}
  />
);

export default SmartIrrigationInstallation;
