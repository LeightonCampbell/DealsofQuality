import ServicePage from "@/components/ServicePage";
import { Building2 } from "lucide-react";

const BusinessNetworks = () => (
  <ServicePage
    title="Business Network Setup"
    metaTitle="Business Network Setup | Commercial WiFi | Deals Of Quality"
    metaDescription="Professional business network installation. Secure, reliable commercial WiFi."
    metaKeywords="business network, commercial WiFi, office network, enterprise"
    rating={4.9}
    reviewCount={189}
    price="$199"
    icon={Building2}
    category="WiFi & Network"
    includedServices={[
      "Design network layout",
      "Install business-grade equipment",
      "Configure security settings",
      "Set up guest network",
      "Document configuration"
    ]}
    faqs={[
      { question: "Do you support multiple locations?", answer: "Yes, we can set up and maintain networks across multiple business locations." },
      { question: "Can you set up VPN access?", answer: "Yes, we configure secure remote access for your team." }
    ]}
  />
);

export default BusinessNetworks;
