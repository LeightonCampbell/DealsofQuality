import ServicePage from "@/components/ServicePage";
import { Wrench } from "lucide-react";

const CustomSolutions = () => (
  <ServicePage
    title="Custom Tech Solutions"
    metaTitle="Custom Tech Solutions | Specialized Services | Deals Of Quality"
    metaDescription="Custom technology solutions tailored to your specific needs. Contact us for a quote."
    metaKeywords="custom tech, specialized services, tech solutions, custom installation"
    rating={4.9}
    reviewCount={98}
    price="Contact Us"
    priceNote="for custom quote"
    icon={Wrench}
    category="Business Services"
    includedServices={[
      "Consultation and assessment",
      "Custom solution design",
      "Professional installation",
      "Testing and verification",
      "Training and support"
    ]}
    faqs={[
      { question: "What custom services do you offer?", answer: "We handle unique tech challenges from custom AV setups to specialized business systems." },
      { question: "How do I get a quote?", answer: "Contact us with your requirements and we'll provide a detailed quote within 24 hours." }
    ]}
  />
);

export default CustomSolutions;
