import ServicePage from "@/components/ServicePage";
import { TreePine } from "lucide-react";

const Landscaping = () => (
  <ServicePage
    title="Landscaping Services"
    metaTitle="Landscaping Services | Lawn Care & Design | Deals Of Quality"
    metaDescription="Professional landscaping services. Design, installation, maintenance, and lawn care to create beautiful outdoor spaces."
    metaKeywords="landscaping, lawn care, landscape design, garden design, yard maintenance, landscaping contractor"
    price="$149"
    priceNote="starting at"
    icon={TreePine}
    category="Home Services"
    includedServices={[
      "Landscape design and planning",
      "Plant and tree installation",
      "Lawn installation and sodding",
      "Mulching and edging",
      "Irrigation system installation",
      "Ongoing maintenance",
      "Seasonal cleanup"
    ]}
    faqs={[
      { question: "Do you offer ongoing maintenance?", answer: "Yes, we offer weekly, bi-weekly, and monthly maintenance plans including mowing, trimming, and seasonal care." },
      { question: "Can you help with landscape design?", answer: "Yes, we provide landscape design services to create beautiful, functional outdoor spaces tailored to your preferences." },
      { question: "What time of year is best for landscaping?", answer: "Spring and fall are ideal for new installations, though we provide services year-round including winter maintenance." }
    ]}
  />
);

export default Landscaping;
