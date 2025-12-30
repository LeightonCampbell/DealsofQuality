import ServicePage from "@/components/ServicePage";
import { Video } from "lucide-react";

const VideoDoorbells = () => (
  <ServicePage
    title="Video Doorbell Installation"
    metaTitle="Video Doorbell Installation | Ring, Nest | Deals Of Quality"
    metaDescription="Professional video doorbell installation. Ring, Nest, Arlo and more. Same-day service available."
    metaKeywords="video doorbell, Ring installation, Nest doorbell, smart doorbell"
    rating={4.8}
    reviewCount={892}
    price="$99"
    icon={Video}
    category="Smart Home"
    includedServices={[
      "Remove existing doorbell",
      "Install video doorbell",
      "Connect to WiFi network",
      "Set up mobile app",
      "Configure motion zones"
    ]}
    faqs={[
      { question: "Do I need existing doorbell wiring?", answer: "Wired doorbells work best, but we can also install battery-powered options." },
      { question: "What brands do you support?", answer: "We install Ring, Nest, Arlo, Eufy, and all major brands." }
    ]}
  />
);

export default VideoDoorbells;
