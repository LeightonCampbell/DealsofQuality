import ServicePage from "@/components/ServicePage";
import { Square } from "lucide-react";

const SidingInstallation = () => (
  <ServicePage
    title="Siding Installation"
    metaTitle="Siding Installation | Vinyl, Fiber Cement, Wood | Deals Of Quality"
    metaDescription="Professional siding installation services. Vinyl, fiber cement, wood, and other materials to protect and beautify your home's exterior."
    metaKeywords="siding installation, vinyl siding, fiber cement siding, house siding, siding contractor"
    price="$2,999"
    priceNote="starting at"
    icon={Square}
    category="Home Services"
    includedServices={[
      "Siding material consultation",
      "Siding installation",
      "Siding repair and replacement",
      "Trim and corner installation",
      "Proper insulation and sealing",
      "Color and style selection",
      "Warranty coverage"
    ]}
    faqs={[
      { question: "What siding materials do you install?", answer: "We install vinyl, fiber cement, wood, engineered wood, and metal siding in various styles and colors." },
      { question: "How long does siding installation take?", answer: "Siding installation typically takes 3-7 days depending on the size of your home and material chosen." },
      { question: "Does new siding improve energy efficiency?", answer: "Yes, properly installed siding with adequate insulation can significantly improve your home's energy efficiency." }
    ]}
  />
);

export default SidingInstallation;
