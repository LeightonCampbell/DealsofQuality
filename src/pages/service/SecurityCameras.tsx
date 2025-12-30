import ServicePage from "@/components/ServicePage";
import { Camera } from "lucide-react";

const SecurityCameras = () => (
  <ServicePage
    title="Security Camera Installation"
    metaTitle="Security Camera Installation | Indoor & Outdoor | Deals Of Quality"
    metaDescription="Professional security camera installation. Indoor, outdoor, and cloud storage setup."
    metaKeywords="security cameras, surveillance, Arlo, Ring camera, home security"
    rating={4.9}
    reviewCount={756}
    price="$129"
    icon={Camera}
    category="Home Security"
    includedServices={[
      "Identify optimal camera locations",
      "Mount and install camera",
      "Connect to WiFi network",
      "Set up mobile app",
      "Configure motion zones and alerts"
    ]}
    faqs={[
      { question: "Do you install wired cameras?", answer: "Yes, we install both wired and wireless security cameras." },
      { question: "Can you set up cloud recording?", answer: "Yes, we configure cloud storage services for all major camera brands." }
    ]}
  />
);

export default SecurityCameras;
