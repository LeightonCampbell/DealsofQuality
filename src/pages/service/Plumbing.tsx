import ServicePage from "@/components/ServicePage";
import { Wrench } from "lucide-react";

const Plumbing = () => (
  <ServicePage
    title="Plumbing Services"
    metaTitle="Plumbing Services | Licensed Plumbers | Deals Of Quality"
    metaDescription="Professional plumbing services for repairs, installations, and emergencies. Licensed plumbers available 24/7 for all your plumbing needs."
    metaKeywords="plumbing services, plumber, plumbing repair, leak repair, drain cleaning, water heater"
    price="$99"
    priceNote="service call"
    icon={Wrench}
    category="Home Services"
    includedServices={[
      "Leak detection and repair",
      "Drain cleaning and unclogging",
      "Fixture installation and repair",
      "Water heater installation and repair",
      "Pipe repair and replacement",
      "Toilet and sink repairs",
      "Emergency plumbing service"
    ]}
    faqs={[
      { question: "Are your plumbers licensed?", answer: "Yes, all our plumbers are licensed and insured professionals with extensive experience." },
      { question: "Do you offer emergency service?", answer: "Yes, we offer 24/7 emergency plumbing service for urgent issues like burst pipes and major leaks." },
      { question: "What types of plumbing work do you handle?", answer: "We handle all residential plumbing including repairs, installations, water heaters, drain cleaning, and fixture work." }
    ]}
  />
);

export default Plumbing;
