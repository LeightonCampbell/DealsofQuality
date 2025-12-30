import ServicePage from "@/components/ServicePage";
import { Layout } from "lucide-react";

const FlooringInstallation = () => (
  <ServicePage
    title="Flooring Installation and Repair"
    metaTitle="Flooring Installation & Repair | Hardwood, Tile, Laminate | Deals Of Quality"
    metaDescription="Professional flooring installation and repair services. Hardwood, tile, laminate, vinyl, and carpet. Expert installation with satisfaction guaranteed."
    metaKeywords="flooring installation, hardwood flooring, tile installation, laminate flooring, floor repair"
    price="$499"
    priceNote="starting at"
    icon={Layout}
    category="Home Services"
    includedServices={[
      "Hardwood flooring installation",
      "Tile and stone installation",
      "Laminate and vinyl installation",
      "Carpet installation",
      "Floor repair and refinishing",
      "Subfloor preparation",
      "Baseboard and trim installation"
    ]}
    faqs={[
      { question: "What types of flooring do you install?", answer: "We install all major flooring types including hardwood, tile, laminate, vinyl, carpet, and luxury vinyl plank (LVP)." },
      { question: "Do you remove old flooring?", answer: "Yes, we can remove old flooring and prepare the subfloor as part of the installation process." },
      { question: "How long does flooring installation take?", answer: "Installation time varies by type and square footage. Most rooms can be completed in 1-3 days." }
    ]}
  />
);

export default FlooringInstallation;
