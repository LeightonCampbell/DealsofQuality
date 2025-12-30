import ServicePage from "@/components/ServicePage";
import { Lock } from "lucide-react";

const SmartLocks = () => (
  <ServicePage
    title="Smart Lock Installation"
    metaTitle="Smart Lock Installation | August, Schlage | Deals Of Quality"
    metaDescription="Professional smart lock installation. August, Schlage, Yale and more. Same-day service available."
    metaKeywords="smart lock, August lock, Schlage smart lock, keyless entry"
    rating={4.9}
    reviewCount={456}
    price="$99"
    icon={Lock}
    category="Smart Home"
    includedServices={[
      "Remove existing deadbolt",
      "Install smart lock",
      "Connect to WiFi/Bluetooth",
      "Set up mobile app",
      "Program access codes"
    ]}
    faqs={[
      { question: "Will it fit my door?", answer: "Most smart locks fit standard doors. Our tech will verify compatibility before installation." },
      { question: "Can I still use a physical key?", answer: "Most smart locks include a key backup option." }
    ]}
  />
);

export default SmartLocks;
