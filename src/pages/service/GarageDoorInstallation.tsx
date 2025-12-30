import ServicePage from "@/components/ServicePage";
import { DoorClosed } from "lucide-react";

const GarageDoorInstallation = () => (
  <ServicePage
    title="Garage Door Installation and Repair"
    metaTitle="Garage Door Installation & Repair | Professional Service | Deals Of Quality"
    metaDescription="Expert garage door installation and repair services. New doors, openers, springs, and tracks. Safe, reliable operation for your garage."
    metaKeywords="garage door installation, garage door repair, garage door opener, garage door springs"
    price="$299"
    priceNote="starting at"
    icon={DoorClosed}
    category="Home Services"
    includedServices={[
      "Garage door installation",
      "Garage door opener installation",
      "Spring and cable repair",
      "Track alignment and repair",
      "Garage door panel replacement",
      "Safety sensor adjustment",
      "Emergency repair service"
    ]}
    faqs={[
      { question: "How long do garage doors last?", answer: "With proper maintenance, quality garage doors typically last 15-30 years. Springs may need replacement every 7-10 years." },
      { question: "Do you offer emergency garage door repair?", answer: "Yes, we offer emergency service for broken springs, doors off track, or other urgent issues." },
      { question: "Can you help me choose a new garage door?", answer: "Yes, we can help you select the right style, material, and features for your home and budget." }
    ]}
  />
);

export default GarageDoorInstallation;
