import ServicePage from "@/components/ServicePage";
import { Droplets } from "lucide-react";

const LeakDetection = () => (
  <ServicePage
    title="Leak Detection"
    metaTitle="Leak Detection Services | Water Leak Detection | Deals Of Quality"
    metaDescription="Professional leak detection services using advanced technology. Find hidden water leaks before they cause costly damage. Same-day service available."
    metaKeywords="leak detection, water leak detection, hidden leak detection, plumbing leak, leak detection service"
    price="$125"
    priceNote="starting at"
    icon={Droplets}
    category="Home Services"
    includedServices={[
      "Advanced leak detection technology",
      "Hidden pipe leak location",
      "Water meter leak testing",
      "Slab leak detection",
      "Wall and ceiling leak location",
      "Irrigation system leak detection",
      "Leak repair recommendations"
    ]}
    faqs={[
      { question: "How do you detect hidden leaks?", answer: "We use advanced technology including thermal imaging, acoustic detection, and moisture meters to locate leaks without destructive testing." },
      { question: "What are signs I might have a hidden leak?", answer: "Signs include unexplained high water bills, water stains, musty odors, warm spots on floors, or the sound of running water when fixtures are off." },
      { question: "How quickly can you detect a leak?", answer: "Most leak detection jobs are completed within 1-2 hours, and we can often provide same-day service for urgent situations." }
    ]}
  />
);

export default LeakDetection;
