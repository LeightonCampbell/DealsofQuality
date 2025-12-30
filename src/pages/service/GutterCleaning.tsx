import ServicePage from "@/components/ServicePage";
import { Droplet } from "lucide-react";

const GutterCleaning = () => (
  <ServicePage
    title="Gutter Cleaning Services"
    metaTitle="Gutter Cleaning | Professional Gutter Maintenance | Deals Of Quality"
    metaDescription="Professional gutter cleaning services. Remove leaves, debris, and clogs to protect your home from water damage. Regular maintenance available."
    metaKeywords="gutter cleaning, gutter maintenance, downspout cleaning, leaf removal, gutter service"
    price="$99"
    priceNote="starting at"
    icon={Droplet}
    category="Home Services"
    includedServices={[
      "Complete gutter cleaning",
      "Downspout cleaning and unclogging",
      "Debris removal",
      "Gutter inspection",
      "Minor repair recommendations",
      "Gutter guard cleaning",
      "Annual maintenance plans"
    ]}
    faqs={[
      { question: "How often should gutters be cleaned?", answer: "We recommend cleaning gutters 2-3 times per year, typically in spring, fall, and after major storms." },
      { question: "What happens if I don't clean my gutters?", answer: "Clogged gutters can cause water damage to your roof, siding, foundation, and interior walls. Regular cleaning prevents costly repairs." },
      { question: "Do you clean gutters with guards?", answer: "Yes, we clean gutters with and without guards, and can clean the guards themselves." }
    ]}
  />
);

export default GutterCleaning;
