import ServicePage from "@/components/ServicePage";
import { Package } from "lucide-react";

const CabinetInstallation = () => (
  <ServicePage
    title="Cabinet Installation"
    metaTitle="Cabinet Installation | Kitchen & Bathroom Cabinets | Deals Of Quality"
    metaDescription="Professional cabinet installation for kitchens and bathrooms. Precise installation, level mounting, and hardware setup."
    metaKeywords="cabinet installation, kitchen cabinets, bathroom cabinets, cabinet mounting, cabinet assembly"
    price="$299"
    priceNote="starting at"
    icon={Package}
    category="Home Services"
    includedServices={[
      "Kitchen cabinet installation",
      "Bathroom vanity installation",
      "Cabinet leveling and alignment",
      "Hardware installation",
      "Door and drawer adjustment",
      "Sink and faucet hookup",
      "Final adjustments and cleanup"
    ]}
    faqs={[
      { question: "Do I need to provide the cabinets?", answer: "Yes, we install cabinets you've purchased. We can also help with measurements and recommendations." },
      { question: "How long does cabinet installation take?", answer: "A typical kitchen cabinet installation takes 1-2 days depending on the number of cabinets and complexity." },
      { question: "Do you handle cabinet removal?", answer: "Yes, we can remove old cabinets and prepare the space for new installation." }
    ]}
  />
);

export default CabinetInstallation;
