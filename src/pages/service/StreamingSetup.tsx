import ServicePage from "@/components/ServicePage";
import { Play } from "lucide-react";

const StreamingSetup = () => (
  <ServicePage
    title="Streaming Device Setup"
    metaTitle="Streaming Setup | Roku, Fire TV, Apple TV | Deals Of Quality"
    metaDescription="Professional streaming device setup. Configure all your apps and services."
    metaKeywords="streaming setup, Roku, Fire TV, Apple TV, Netflix setup"
    rating={4.7}
    reviewCount={567}
    price="$59"
    icon={Play}
    category="Audio & Video"
    includedServices={[
      "Connect streaming device",
      "Set up WiFi connection",
      "Install streaming apps",
      "Log into your accounts",
      "Demonstrate features"
    ]}
    faqs={[
      { question: "What devices do you set up?", answer: "We set up Roku, Amazon Fire TV, Apple TV, Chromecast, and smart TV apps." },
      { question: "Can you help with multiple TVs?", answer: "Yes, we can set up streaming on all TVs in your home." }
    ]}
  />
);

export default StreamingSetup;
