import ServicePage from "@/components/ServicePage";
import { Speaker } from "lucide-react";

const SurroundSound = () => (
  <ServicePage
    title="Surround Sound Installation"
    metaTitle="Surround Sound Installation | 5.1 & 7.1 Setup | Deals Of Quality"
    metaDescription="Professional surround sound installation. 5.1, 7.1 and Atmos systems."
    metaKeywords="surround sound, 5.1 speaker setup, 7.1 audio, Dolby Atmos"
    rating={4.8}
    reviewCount={423}
    price="$199"
    icon={Speaker}
    category="Audio & Video"
    includedServices={[
      "Position and mount speakers",
      "Run speaker wire",
      "Connect to receiver",
      "Calibrate audio levels",
      "Hide cables"
    ]}
    faqs={[
      { question: "What speaker configurations do you support?", answer: "We install 5.1, 7.1, 5.1.2, 7.1.4 and other Dolby Atmos configurations." },
      { question: "Can you run wires through walls?", answer: "Yes, we can run speaker wire in-wall for a clean installation." }
    ]}
  />
);

export default SurroundSound;
