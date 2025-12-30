import ServicePage from "@/components/ServicePage";
import { DoorOpen } from "lucide-react";

const WindowDoorReplacement = () => (
  <ServicePage
    title="Window and Door Replacement"
    metaTitle="Window & Door Replacement | Professional Installation | Deals Of Quality"
    metaDescription="Expert window and door replacement services. Energy-efficient options, precise installation, and improved home security."
    metaKeywords="window replacement, door replacement, window installation, door installation, energy efficient windows"
    price="$399"
    priceNote="starting at"
    icon={DoorOpen}
    category="Home Services"
    includedServices={[
      "Window replacement and installation",
      "Door replacement and installation",
      "Energy-efficient upgrades",
      "Proper sealing and insulation",
      "Hardware and lock installation",
      "Trim and finishing work",
      "Cleanup and debris removal"
    ]}
    faqs={[
      { question: "Do you provide windows and doors?", answer: "We can help you select and order windows/doors, or install units you've already purchased." },
      { question: "How long does window/door replacement take?", answer: "A typical window replacement takes 1-2 hours per window. Door replacement usually takes 2-4 hours." },
      { question: "Can you help with energy-efficient options?", answer: "Yes, we can recommend and install energy-efficient windows and doors that help reduce heating and cooling costs." }
    ]}
  />
);

export default WindowDoorReplacement;
