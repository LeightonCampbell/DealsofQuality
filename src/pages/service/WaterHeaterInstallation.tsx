import ServicePage from "@/components/ServicePage";
import { Droplets } from "lucide-react";

const WaterHeaterInstallation = () => (
  <ServicePage
    title="Water Heater Installation and Repair"
    metaTitle="Water Heater Installation & Repair | Tank & Tankless | Deals Of Quality"
    metaDescription="Professional water heater installation and repair services. Tank and tankless water heaters with expert installation and warranty protection."
    metaKeywords="water heater installation, water heater repair, tankless water heater, hot water heater"
    price="$599"
    priceNote="starting at"
    icon={Droplets}
    category="Home Services"
    includedServices={[
      "Water heater installation",
      "Tankless water heater installation",
      "Water heater repair",
      "Leak detection and repair",
      "Water heater replacement",
      "Permit handling",
      "Warranty coverage"
    ]}
    faqs={[
      { question: "How do I know if I need a new water heater?", answer: "Signs include age (over 10 years), frequent repairs, inconsistent hot water, leaks, or rust-colored water. We can assess your current unit." },
      { question: "Tankless vs traditional water heater?", answer: "Tankless heaters are more energy-efficient and provide endless hot water but cost more upfront. We can help you choose based on your needs and budget." },
      { question: "How long does water heater installation take?", answer: "Most water heater installations take 2-4 hours including removal of the old unit and installation of the new one." }
    ]}
  />
);

export default WaterHeaterInstallation;
