import ServicePage from "@/components/ServicePage";
import { Sparkles } from "lucide-react";

const HouseCleaning = () => (
  <ServicePage
    title="House Cleaning Services"
    metaTitle="House Cleaning Services | Professional Cleaning | Deals Of Quality"
    metaDescription="Professional house cleaning services. Regular cleaning, deep cleaning, move-in/move-out cleaning. Reliable, insured cleaners for your home."
    metaKeywords="house cleaning, home cleaning, maid service, cleaning services, deep cleaning"
    price="$149"
    priceNote="starting at"
    icon={Sparkles}
    category="Home Services"
    includedServices={[
      "Regular house cleaning",
      "Deep cleaning services",
      "Move-in/move-out cleaning",
      "Kitchen and bathroom cleaning",
      "Dusting and vacuuming",
      "Window cleaning",
      "Eco-friendly cleaning options"
    ]}
    faqs={[
      { question: "How often can I schedule cleaning?", answer: "We offer one-time, weekly, bi-weekly, and monthly cleaning schedules to fit your needs." },
      { question: "Do I need to provide cleaning supplies?", answer: "We bring all necessary supplies and equipment. You can also request eco-friendly cleaning products." },
      { question: "Are your cleaners insured?", answer: "Yes, all our cleaning professionals are bonded and insured for your protection." }
    ]}
  />
);

export default HouseCleaning;
