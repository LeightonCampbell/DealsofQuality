import ServicePage from "@/components/ServicePage";
import { Square } from "lucide-react";

const DrywallInstallation = () => (
  <ServicePage
    title="Drywall Installation and Repair"
    metaTitle="Drywall Installation & Repair | Professional Finishing | Deals Of Quality"
    metaDescription="Expert drywall installation, repair, and finishing services. Smooth walls and ceilings with professional texture matching."
    metaKeywords="drywall installation, drywall repair, drywall finishing, texture matching, wall repair"
    price="$199"
    priceNote="starting at"
    icon={Square}
    category="Home Services"
    includedServices={[
      "New drywall installation",
      "Drywall repair and patching",
      "Texture matching",
      "Sanding and smoothing",
      "Priming and preparation",
      "Tape and mud application",
      "Ceiling drywall work"
    ]}
    faqs={[
      { question: "Can you match existing texture?", answer: "Yes, our professionals can match most texture patterns including orange peel, knockdown, and smooth finishes." },
      { question: "How long until I can paint after drywall work?", answer: "Typically 24-48 hours after final sanding, depending on humidity and drying conditions." },
      { question: "Do you handle ceiling drywall?", answer: "Yes, we install and repair drywall on both walls and ceilings." }
    ]}
  />
);

export default DrywallInstallation;
