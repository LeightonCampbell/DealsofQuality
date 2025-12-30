import ServicePage from "@/components/ServicePage";
import { Wifi } from "lucide-react";

const DeadZoneElimination = () => (
  <ServicePage
    title="WiFi Dead Zone Elimination"
    metaTitle="WiFi Dead Zones | Range Extender Setup | Deals Of Quality"
    metaDescription="Eliminate WiFi dead zones. Range extenders and mesh network setup."
    metaKeywords="WiFi dead zones, range extender, mesh WiFi, WiFi coverage"
    rating={4.8}
    reviewCount={367}
    price="$119"
    icon={Wifi}
    category="WiFi & Network"
    includedServices={[
      "Survey WiFi coverage",
      "Identify dead zones",
      "Install extenders/mesh nodes",
      "Configure seamless roaming",
      "Verify full coverage"
    ]}
    faqs={[
      { question: "What's the best solution for dead zones?", answer: "Mesh WiFi systems provide the best coverage. We'll recommend the right solution for your home." },
      { question: "How many extenders do I need?", answer: "It depends on your home size. We'll assess and recommend the optimal number." }
    ]}
  />
);

export default DeadZoneElimination;
