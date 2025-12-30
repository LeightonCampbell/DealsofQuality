import ServicePage from "@/components/ServicePage";
import { SquareStack } from "lucide-react";

const CarpetCleaning = () => (
  <ServicePage
    title="Carpet Cleaning Services"
    metaTitle="Carpet Cleaning | Professional Deep Cleaning | Deals Of Quality"
    metaDescription="Professional carpet cleaning services. Deep cleaning, stain removal, and sanitization to extend the life of your carpets."
    metaKeywords="carpet cleaning, deep carpet cleaning, carpet stain removal, professional carpet cleaning"
    price="$99"
    priceNote="starting at"
    icon={SquareStack}
    category="Home Services"
    includedServices={[
      "Deep carpet cleaning",
      "Stain removal",
      "Pet odor removal",
      "Steam cleaning",
      "Carpet protection treatment",
      "Drying assistance",
      "Upholstery cleaning (add-on)"
    ]}
    faqs={[
      { question: "How often should carpets be professionally cleaned?", answer: "We recommend professional cleaning every 6-12 months, or more frequently in high-traffic areas or homes with pets." },
      { question: "How long does carpet cleaning take?", answer: "Most carpet cleaning jobs take 2-4 hours depending on square footage and drying time." },
      { question: "Do you clean area rugs?", answer: "Yes, we clean area rugs and can arrange for specialized cleaning for delicate or valuable rugs." }
    ]}
  />
);

export default CarpetCleaning;
