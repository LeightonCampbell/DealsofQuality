import ServicePage from "@/components/ServicePage";
import { Activity } from "lucide-react";

const MotionSensors = () => (
  <ServicePage
    title="Motion Sensor Installation"
    metaTitle="Motion Sensor Installation | Smart Home Security | Deals Of Quality"
    metaDescription="Professional motion sensor installation for home security and automation."
    metaKeywords="motion sensors, security sensors, smart home, automation"
    rating={4.7}
    reviewCount={234}
    price="$79"
    icon={Activity}
    category="Home Security"
    includedServices={[
      "Position sensors strategically",
      "Mount motion detectors",
      "Connect to smart home hub",
      "Configure sensitivity",
      "Set up automation rules"
    ]}
    faqs={[
      { question: "What can motion sensors trigger?", answer: "Sensors can trigger lights, cameras, alarms, and send mobile notifications." },
      { question: "Do you install outdoor sensors?", answer: "Yes, we install both indoor and outdoor motion sensors." }
    ]}
  />
);

export default MotionSensors;
