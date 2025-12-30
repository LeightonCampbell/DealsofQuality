import ServicePage from "@/components/ServicePage";
import { Speaker } from "lucide-react";

const SoundbarInstallation = () => (
  <ServicePage
    title="Soundbar Installation"
    metaTitle="Soundbar Installation | Professional Setup | Deals Of Quality"
    metaDescription="Professional soundbar mounting and setup. Wall-mounted or shelf placement with optimal audio configuration."
    metaKeywords="soundbar installation, soundbar mounting, audio setup, TV audio"
    rating={4.8}
    reviewCount={412}
    price="$69"
    icon={Speaker}
    category="TV Mounting & Home Theater"
    includedServices={[
      "Mount soundbar below or above TV",
      "Connect to TV via HDMI ARC or optical",
      "Configure audio settings",
      "Cable management",
      "Demonstrate features"
    ]}
    faqs={[
      { question: "Can you mount any soundbar brand?", answer: "Yes, we install all major soundbar brands including Sonos, Bose, Samsung, LG, and more." },
      { question: "Do I need a special mount?", answer: "Many soundbars include mounting hardware. If not, we can provide a universal mount at an additional cost." }
    ]}
  />
);

export default SoundbarInstallation;
