import ServicePage from "@/components/ServicePage";
import { Zap } from "lucide-react";

const Electrical = () => (
  <ServicePage
    title="Electrical Services"
    metaTitle="Electrical Services | Licensed Electricians | Deals Of Quality"
    metaDescription="Professional electrical services from licensed electricians. Installations, repairs, upgrades, and electrical safety inspections."
    metaKeywords="electrical services, electrician, electrical repair, electrical installation, wiring, electrical panel"
    price="$99"
    priceNote="service call"
    icon={Zap}
    category="Home Services"
    includedServices={[
      "Electrical panel upgrades",
      "Outlet and switch installation",
      "Lighting installation",
      "Ceiling fan installation",
      "Electrical troubleshooting and repair",
      "Safety inspections",
      "Code compliance work"
    ]}
    faqs={[
      { question: "Are your electricians licensed?", answer: "Yes, all our electricians are licensed, bonded, and insured for your safety and peace of mind." },
      { question: "Do you handle permits for electrical work?", answer: "Yes, we handle all necessary permits and ensure work meets local electrical codes." },
      { question: "What electrical services do you offer?", answer: "We handle installations, repairs, panel upgrades, lighting, outlets, switches, and electrical safety inspections." }
    ]}
  />
);

export default Electrical;
