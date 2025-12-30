import ServicePage from "@/components/ServicePage";
import { Home } from "lucide-react";

const Roofing = () => (
  <ServicePage
    title="Roofing Services"
    metaTitle="Roofing Services | Roof Repair & Replacement | Deals Of Quality"
    metaDescription="Professional roofing services including repairs, replacements, and inspections. Quality materials and expert installation to protect your home."
    metaKeywords="roofing services, roof repair, roof replacement, roof installation, roof inspection, roofing contractor"
    price="$299"
    priceNote="starting at"
    icon={Home}
    category="Home Services"
    includedServices={[
      "Roof inspection and assessment",
      "Roof repair and patching",
      "Complete roof replacement",
      "Gutter installation and repair",
      "Roof leak detection and repair",
      "Shingle and tile work",
      "Roof maintenance services"
    ]}
    faqs={[
      { question: "How do I know if I need a roof repair or replacement?", answer: "We provide free inspections to assess your roof's condition and recommend the best solution. Age, damage extent, and material condition all factor into the decision." },
      { question: "What types of roofing materials do you work with?", answer: "We work with asphalt shingles, tile, metal, slate, and flat roof materials." },
      { question: "Do you offer warranties?", answer: "Yes, we offer warranties on both materials and workmanship to protect your investment." }
    ]}
  />
);

export default Roofing;
