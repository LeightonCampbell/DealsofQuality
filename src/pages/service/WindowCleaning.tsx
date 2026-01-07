import ServicePage from "@/components/ServicePage";
import { Square } from "lucide-react";

const WindowCleaning = () => (
  <ServicePage
    title="Window Cleaning Services"
    metaTitle="Window Cleaning | Interior & Exterior Window Cleaning | Deals Of Quality"
    metaDescription="Professional window cleaning services for interior and exterior windows. Streak-free results, safe cleaning solutions, and regular maintenance plans available."
    metaKeywords="window cleaning, window washer, interior window cleaning, exterior window cleaning, window maintenance"
    price="$79"
    priceNote="starting at"
    icon={Square}
    category="Home Services"
    includedServices={[
      "Interior window cleaning",
      "Exterior window cleaning",
      "Window frame and sill cleaning",
      "Screen cleaning",
      "Streak-free results",
      "Safe, eco-friendly cleaning solutions",
      "Regular maintenance plans available"
    ]}
    faqs={[
      { question: "Do you clean both interior and exterior windows?", answer: "Yes, we provide comprehensive window cleaning for both interior and exterior surfaces, including frames and sills." },
      { question: "How often should windows be cleaned?", answer: "We recommend professional window cleaning every 3-6 months, or more frequently for high-traffic areas or homes with pets." },
      { question: "Do you use safe cleaning products?", answer: "Yes, we use eco-friendly, streak-free cleaning solutions that are safe for your family and pets." }
    ]}
  />
);

export default WindowCleaning;
