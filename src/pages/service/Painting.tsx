import ServicePage from "@/components/ServicePage";
import { Paintbrush } from "lucide-react";

const Painting = () => (
  <ServicePage
    title="Painting Services"
    metaTitle="Professional Painting Services | Interior & Exterior | Deals Of Quality"
    metaDescription="Expert interior and exterior painting services. Quality paint, professional application, and attention to detail for your home."
    metaKeywords="painting services, house painting, interior painting, exterior painting, professional painters"
    price="$299"
    priceNote="starting at"
    icon={Paintbrush}
    category="Home Services"
    includedServices={[
      "Interior and exterior painting",
      "Color consultation",
      "Surface preparation and priming",
      "Clean, professional finish",
      "Furniture and floor protection",
      "Cleanup after completion",
      "Touch-up service"
    ]}
    faqs={[
      { question: "Do you provide the paint?", answer: "We can provide high-quality paint or work with paint you've selected. We'll help you choose the right products for your project." },
      { question: "How long does a painting project take?", answer: "Project duration depends on size and scope. A typical interior room takes 1-2 days, while exterior projects may take 3-5 days." },
      { question: "Do you paint cabinets and furniture?", answer: "Yes, we offer specialized painting services for cabinets, furniture, and trim work." }
    ]}
  />
);

export default Painting;
