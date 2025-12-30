import ServicePage from "@/components/ServicePage";
import { Bug } from "lucide-react";

const PestControl = () => (
  <ServicePage
    title="Pest Control Services"
    metaTitle="Pest Control | Ants, Roaches, Rodents | Deals Of Quality"
    metaDescription="Professional pest control services. Safe, effective treatment for ants, roaches, rodents, and other pests. Ongoing prevention plans available."
    metaKeywords="pest control, exterminator, ant control, roach control, rodent control, pest removal"
    price="$99"
    priceNote="starting at"
    icon={Bug}
    category="Home Services"
    includedServices={[
      "Ant and roach treatment",
      "Rodent control and removal",
      "Spider and pest treatment",
      "Termite inspection and treatment",
      "Preventive treatments",
      "Interior and exterior treatment",
      "Safe, family-friendly solutions"
    ]}
    faqs={[
      { question: "Are your treatments safe for pets and children?", answer: "Yes, we use EPA-approved treatments that are safe for pets and children when applied according to label directions." },
      { question: "How often do I need pest control?", answer: "We offer one-time treatments and ongoing maintenance plans. Monthly or quarterly treatments are recommended for prevention." },
      { question: "Do you offer guarantees?", answer: "Yes, we offer service guarantees and will return to retreat if pests return between scheduled visits." }
    ]}
  />
);

export default PestControl;
