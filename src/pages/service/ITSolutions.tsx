import ServicePage from "@/components/ServicePage";
import { Server } from "lucide-react";

const ITSolutions = () => (
  <ServicePage
    title="Business IT Solutions"
    metaTitle="Business IT Solutions | Managed IT Services | Deals Of Quality"
    metaDescription="Professional IT solutions for businesses. Network, security, and support."
    metaKeywords="business IT, managed IT, IT support, small business tech"
    rating={4.9}
    reviewCount={145}
    price="$199"
    priceNote="consultation"
    icon={Server}
    category="Business Services"
    includedServices={[
      "IT infrastructure assessment",
      "Network setup and security",
      "Cloud migration assistance",
      "Employee device setup",
      "Ongoing support options"
    ]}
    faqs={[
      { question: "Do you offer ongoing IT support?", answer: "Yes, we offer monthly support plans tailored to your business needs." },
      { question: "Can you help with cloud migration?", answer: "Yes, we assist with moving to cloud services like Google Workspace and Microsoft 365." }
    ]}
  />
);

export default ITSolutions;
