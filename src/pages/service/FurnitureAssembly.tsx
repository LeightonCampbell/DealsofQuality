import ServicePage from "@/components/ServicePage";
import { Hammer } from "lucide-react";

const FurnitureAssembly = () => (
  <ServicePage
    title="Furniture Assembly"
    metaTitle="Furniture Assembly Services | Professional Assembly | Deals Of Quality"
    metaDescription="Professional furniture assembly services. Expert technicians to assemble your furniture quickly and correctly. Same-day service available."
    metaKeywords="furniture assembly, furniture assembly service, ikea assembly, furniture setup, assembly service"
    price="$75"
    priceNote="starting at"
    icon={Hammer}
    category="Home Services"
    includedServices={[
      "IKEA and flat-pack furniture assembly",
      "Bed frame and mattress setup",
      "Desk and office furniture assembly",
      "Bookshelf and storage unit assembly",
      "Outdoor furniture assembly",
      "Furniture disassembly and reassembly",
      "Furniture repair and adjustments"
    ]}
    faqs={[
      { question: "How long does furniture assembly take?", answer: "Most furniture assembly jobs take 1-3 hours depending on the complexity and size of the furniture." },
      { question: "Do I need to provide tools?", answer: "No, our professionals bring all necessary tools and equipment for the assembly." },
      { question: "Do you assemble all furniture brands?", answer: "Yes, we assemble furniture from all major brands including IKEA, Wayfair, Amazon, and more." }
    ]}
  />
);

export default FurnitureAssembly;
