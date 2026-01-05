import ServicePage from "@/components/ServicePage";
import { Lightbulb } from "lucide-react";

const LightFixtureReplacement = () => (
  <ServicePage
    title="Light Fixture Replacement"
    metaTitle="Light Fixture Replacement | Electrical Services | Deals Of Quality"
    metaDescription="Professional light fixture replacement and installation. Licensed electricians for safe and proper installation of all types of light fixtures."
    metaKeywords="light fixture replacement, light fixture installation, chandelier installation, electrical fixture, light installation"
    price="$125"
    priceNote="starting at"
    icon={Lightbulb}
    category="Electrical & Safety"
    includedServices={[
      "Chandelier installation",
      "Ceiling light fixture replacement",
      "Wall sconce installation",
      "Recessed lighting installation",
      "Outdoor light fixture installation",
      "Fixture wiring and connections",
      "Dimmer switch installation"
    ]}
    faqs={[
      { question: "Do I need a licensed electrician for light fixture replacement?", answer: "Yes, for safety and code compliance, light fixture installation should be done by a licensed electrician. We provide fully licensed professionals." },
      { question: "How long does light fixture installation take?", answer: "Most single fixture installations take 1-2 hours. Multiple fixtures or complex installations may take longer." },
      { question: "Do you provide the fixtures or do I purchase them?", answer: "You can purchase fixtures yourself, or we can help you select and provide fixtures. We handle all installation regardless." }
    ]}
  />
);

export default LightFixtureReplacement;
