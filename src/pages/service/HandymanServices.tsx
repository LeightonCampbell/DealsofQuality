import ServicePage from "@/components/ServicePage";
import { Wrench } from "lucide-react";

const HandymanServices = () => (
  <ServicePage
    title="Handyman Services"
    metaTitle="Handyman Services | Home Repairs & Maintenance | Deals Of Quality"
    metaDescription="Professional handyman services for home repairs, installations, and maintenance. Trusted local professionals for all your home improvement needs."
    metaKeywords="handyman services, home repairs, handyman near me, home maintenance, fix it services"
    price="$79"
    priceNote="starting at"
    icon={Wrench}
    category="Home Services"
    includedServices={[
      "Furniture assembly and installation",
      "Hanging pictures and mirrors",
      "Door and window repairs",
      "Drywall patching and repair",
      "Cabinet and shelf installation",
      "Minor plumbing and electrical fixes",
      "General home maintenance"
    ]}
    faqs={[
      { question: "What types of repairs do you handle?", answer: "We handle a wide range of home repairs including furniture assembly, hanging items, door repairs, drywall work, and minor plumbing or electrical tasks." },
      { question: "Do you offer same-day service?", answer: "Yes, we offer same-day and next-day service depending on availability in your area." },
      { question: "Are your handymen licensed and insured?", answer: "Yes, all our professionals are carefully vetted, licensed where required, and fully insured for your peace of mind." }
    ]}
  />
);

export default HandymanServices;
